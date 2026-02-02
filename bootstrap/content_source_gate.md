# Content Source Mapping Gate & State Tracking

**Purpose:** Enforce content source mapping completion before document generation can proceed. This prevents AI agents from skipping the content source mapping step.

---

## Gate 1.5: Content Source Mapping Checkpoint

**Location in workflow:** After detection, before document generation (Phase 2+ for greenfield, Phase 2+ for similar, Phase 2+ for migration)

**This gate is BLOCKING:** Document generation CANNOT proceed until this gate passes.

### Gate 1.5 Conditions

All conditions must be TRUE to pass:

| # | Condition | Check | Failure Action |
|---|-----------|-------|----------------|
| 1 | Mapping file exists | `.fluxframe/detected_content_sources.md` exists | Return to content source mapping step |
| 2 | Mapping is confirmed | File contains `**Status:** ✅ Confirmed` | Present mapping to user, wait for confirmation |
| 3 | Project brief handled | If `projectBriefRequired: true` in state, then `project_brief.md` must exist | Prompt user to create project_brief.md |
| 4 | Sources logged in state | `contentSourceMapping.sourcesPerDocument` is populated | Re-run content analysis |

### Gate Check Procedure

```markdown
## Gate 1.5 Check: Content Source Mapping

**Checking prerequisites for document generation...**

### 1. Mapping File Exists
```bash
test -f .fluxframe/detected_content_sources.md && echo "✅ PASS" || echo "❌ FAIL"
```
Result: [PASS/FAIL]

### 2. Mapping Status is Confirmed
```bash
grep -q "Status.*Confirmed" .fluxframe/detected_content_sources.md && echo "✅ PASS" || echo "❌ FAIL"
```
Result: [PASS/FAIL]

### 3. Project Brief Requirement
- State shows `projectBriefRequired`: [true/false]
- If true, `project_brief.md` exists: [Yes/No]
Result: [PASS/FAIL/N/A]

### 4. Sources Logged in State
- Bootstrap state has `contentSourceMapping.sourcesPerDocument`: [Yes/No]
- At least `context_master_guide.md` has sources OR `projectBriefCreated: true`: [Yes/No]
Result: [PASS/FAIL]

---

## Gate 1.5 Result: [✅ PASS / ❌ FAIL]

[If FAIL: List failed conditions and required actions]
```

### Gate Failure Handling

**If Condition 1 fails (no mapping file):**
```markdown
❌ Gate 1.5 Failed: Content source mapping not performed.

The content source mapping step was skipped. This step is REQUIRED before
document generation to ensure we extract content from the right files.

**Action Required:** Return to Step [0.5/1.4.5/1.5] and perform content source mapping.
```

**If Condition 2 fails (not confirmed):**
```markdown
❌ Gate 1.5 Failed: Content sources not confirmed by user.

The content source mapping exists but hasn't been confirmed. User review
is REQUIRED to ensure we're extracting from the correct files.

**Action Required:** Present `.fluxframe/detected_content_sources.md` to user
and wait for explicit confirmation.
```

**If Condition 3 fails (project brief needed):**
```markdown
❌ Gate 1.5 Failed: Project brief required but not created.

No documentation describing project purpose was found, and user hasn't
created `project_brief.md` yet.

**Action Required:**
1. Prompt user to create `project_brief.md` in project root
2. Wait for confirmation that file is created
3. Re-scan and update content source mapping
4. Return to Gate 1.5 check
```

**If Condition 4 fails (state not updated):**
```markdown
❌ Gate 1.5 Failed: Bootstrap state not updated with content sources.

Content source mapping may have been done but wasn't recorded in bootstrap state.

**Action Required:** Update `.fluxframe-bootstrap-state.json` with content
source mapping information, then retry gate check.
```

---

## Bootstrap State Schema Additions

Add to `.fluxframe-bootstrap-state.json`:

```json
{
  "scenario": "GREENFIELD|SIMILAR_WORKFLOW|MIGRATION",
  "phase": "detection|content_sources|questionnaire|generation|finalization",
  "startedAt": "2026-02-02T10:00:00Z",

  "contentSourceMapping": {
    "status": "pending|in_progress|confirmed",
    "startedAt": null,
    "confirmedAt": null,
    "confirmedBy": "user",

    "projectBriefRequired": false,
    "projectBriefCreated": false,
    "projectBriefPath": null,

    "filesAnalyzed": [
      {
        "path": "README.md",
        "analyzedAt": "2026-02-02T10:05:00Z",
        "contentTypes": ["project_purpose", "tech_stack"]
      }
    ],

    "sourcesPerDocument": {
      "context_master_guide.md": {
        "sources": [
          {
            "file": "README.md",
            "content": "project_purpose",
            "location": "lines 1-30",
            "confidence": "high"
          },
          {
            "file": "project_brief.md",
            "content": "vision_goals",
            "location": "full file",
            "confidence": "high"
          }
        ],
        "gaps": [],
        "status": "ready"
      },
      "technical_status.md": {
        "sources": [],
        "gaps": ["current_state", "known_issues"],
        "status": "no_sources"
      },
      "ROADMAP.md": {
        "sources": [
          {
            "file": "TODO.md",
            "content": "planned_features",
            "location": "full file",
            "confidence": "medium"
          }
        ],
        "gaps": [],
        "status": "ready"
      },
      "patterns/ui_patterns.md": {
        "sources": [],
        "gaps": [],
        "status": "create_empty"
      },
      "patterns/api_patterns.md": {
        "sources": [],
        "gaps": [],
        "status": "create_empty"
      },
      "patterns/data_patterns.md": {
        "sources": [],
        "gaps": [],
        "status": "create_empty"
      },
      "patterns/infra_patterns.md": {
        "sources": [],
        "gaps": [],
        "status": "create_empty"
      },
      "api_contract_standards.md": {
        "sources": [],
        "gaps": [],
        "status": "not_applicable"
      }
    },

    "userNotes": "User confirmed sources, added project_brief.md"
  },

  "gates": {
    "gate1_detection": {
      "passed": true,
      "passedAt": "2026-02-02T10:02:00Z"
    },
    "gate1_5_content_sources": {
      "passed": false,
      "passedAt": null,
      "failureReason": null,
      "attempts": 0
    },
    "gate2_backup": {
      "passed": false,
      "passedAt": null
    }
  }
}
```

### State Status Values

**`contentSourceMapping.status`:**
- `pending` - Content source mapping not started
- `in_progress` - Analysis underway, not yet presented to user
- `confirmed` - User has reviewed and confirmed the mapping

**`sourcesPerDocument[doc].status`:**
- `ready` - Has confirmed sources, ready for generation
- `no_sources` - No sources found, will create from scratch or ask user
- `create_empty` - Expected to be empty (e.g., patterns in greenfield)
- `not_applicable` - Document not needed for this project

---

## State Update Points

### When to Update Bootstrap State

| Event | State Update |
|-------|--------------|
| Start content analysis | `contentSourceMapping.status = "in_progress"`, `startedAt = now()` |
| Analyze a file | Add to `filesAnalyzed[]` |
| Map content to document | Update `sourcesPerDocument[doc].sources[]` |
| Identify gap | Add to `sourcesPerDocument[doc].gaps[]` |
| Determine project brief needed | `projectBriefRequired = true` |
| User creates project_brief.md | `projectBriefCreated = true`, `projectBriefPath = "project_brief.md"` |
| User confirms mapping | `status = "confirmed"`, `confirmedAt = now()` |
| Gate 1.5 passes | `gates.gate1_5_content_sources.passed = true`, `passedAt = now()` |
| Gate 1.5 fails | `gates.gate1_5_content_sources.failureReason = "[reason]"`, `attempts++` |

### State Update Code Pattern

When updating state during content source mapping:

```javascript
// Read current state
const state = JSON.parse(fs.readFileSync('.fluxframe-bootstrap-state.json'));

// Update content source mapping
state.contentSourceMapping = state.contentSourceMapping || {};
state.contentSourceMapping.status = 'in_progress';
state.contentSourceMapping.startedAt = new Date().toISOString();

// Add analyzed file
state.contentSourceMapping.filesAnalyzed = state.contentSourceMapping.filesAnalyzed || [];
state.contentSourceMapping.filesAnalyzed.push({
  path: 'README.md',
  analyzedAt: new Date().toISOString(),
  contentTypes: ['project_purpose', 'tech_stack']
});

// Update sources for a document
state.contentSourceMapping.sourcesPerDocument = state.contentSourceMapping.sourcesPerDocument || {};
state.contentSourceMapping.sourcesPerDocument['context_master_guide.md'] = {
  sources: [
    { file: 'README.md', content: 'project_purpose', location: 'lines 1-30', confidence: 'high' }
  ],
  gaps: [],
  status: 'ready'
};

// Write state
fs.writeFileSync('.fluxframe-bootstrap-state.json', JSON.stringify(state, null, 2));
```

---

## Integration with Existing Gates

### Gate Sequence

```
Gate 1: Detection Complete
    ↓
Gate 1.5: Content Source Mapping ← NEW
    ↓
Gate 2: Pre-Bootstrap Backup
    ↓
[Document Generation]
    ↓
Gate 3: Pre-Finalization Validation
    ↓
Finalization
```

### Gate 1.5 Position in Each Workflow

**Greenfield:**
```
Phase 0.5 (Content Source Mapping)
    ↓
Gate 1.5 Check ← HERE
    ↓
Step 1 (Create Directory Structure)
```

**Similar Workflow:**
```
Step 1.5 (Content Source Mapping)
    ↓
Gate 1.5 Check ← HERE
    ↓
Phase 2 (Diff Against FluxFrame)
```

**Migration:**
```
Step 1.4.5 (Content Source Mapping)
    ↓
Gate 1.5 Check ← HERE
    ↓
Step 1.5 (Detect Existing Infrastructure)
```

---

## Validation Checklist Additions

Add to `bootstrap/validation_checklist.md`:

### Pre-Generation Validation (Gate 1.5)

```markdown
## Gate 1.5: Content Source Mapping Validation

Before proceeding to document generation, verify:

### Required Files
- [ ] `.fluxframe/detected_content_sources.md` exists
- [ ] File status shows "Confirmed" (not "Awaiting user review")

### Bootstrap State
- [ ] `.fluxframe-bootstrap-state.json` exists
- [ ] `contentSourceMapping.status` is "confirmed"
- [ ] `gates.gate1_5_content_sources.passed` is true

### Project Brief (if required)
- [ ] If `projectBriefRequired: true`, then `project_brief.md` exists in project root
- [ ] `project_brief.md` contains required sections (What, Why, Who, Goals)
- [ ] Content source mapping updated to include project_brief.md

### Source Coverage
- [ ] `context_master_guide.md` has sources OR project_brief.md created
- [ ] Each document in mapping has status (ready/no_sources/create_empty/not_applicable)
- [ ] User has acknowledged any gaps

### Gate Result
- [ ] All conditions pass → Proceed to document generation
- [ ] Any condition fails → Return to content source mapping, do NOT proceed
```

---

## Finalization Validation Additions

Add to finalization validation:

```markdown
## Content Source Usage Validation

Before finalizing bootstrap, verify content sources were actually used:

### Extraction Verification
- [ ] For each document with `status: ready`, confirm sources were read during generation
- [ ] Any document generated from sources should note its sources in comments/metadata

### Mapping Cleanup
- [ ] `.fluxframe/detected_content_sources.md` will be removed with `.fluxframe/` directory
- [ ] Source mapping preserved in `bootstrap_decisions.md` for reference

### State Verification
- [ ] `contentSourceMapping.status` is "confirmed"
- [ ] `gates.gate1_5_content_sources.passed` is true
- [ ] If `projectBriefRequired`, `projectBriefCreated` is also true
```

---

## Error Recovery

### If Bootstrap Interrupted After Content Source Mapping

On resume, check state:

```javascript
const state = JSON.parse(fs.readFileSync('.fluxframe-bootstrap-state.json'));

if (state.contentSourceMapping?.status === 'confirmed' &&
    state.gates?.gate1_5_content_sources?.passed) {
  // Content source mapping complete, can proceed to document generation
  console.log('Resuming: Content sources confirmed, proceeding to generation');
} else if (state.contentSourceMapping?.status === 'in_progress') {
  // Was in middle of content source mapping
  console.log('Resuming: Content source mapping in progress, continuing analysis');
} else {
  // Content source mapping not started
  console.log('Resuming: Starting content source mapping');
}
```

### If User Needs to Re-do Content Source Mapping

Allow user to request re-scan:

```markdown
User: "I added more documentation files, can you re-scan?"

Agent:
1. Reset state: `contentSourceMapping.status = 'in_progress'`
2. Reset gate: `gates.gate1_5_content_sources.passed = false`
3. Re-run content analysis
4. Present updated mapping for confirmation
5. Re-check Gate 1.5
```
