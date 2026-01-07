# Bootstrap Instructions for AI Assistants

**Purpose:** Unified entry point for AI assistants (Claude/Roo/Cline/Antigravity) to set up FluxFrame for any project - whether new or existing.

**When to use:** When a user wants to add FluxFrame to their project. This works for:
- 🆕 **New projects** with no existing workflow
- 🔄 **Existing projects** with AI workflows (Cline, Claude Code, etc.)
- 📚 **Existing projects** with documentation (ADRs, wikis, bug fixes, etc.)

**Key Innovation:** Detection-first approach - analyze what exists before asking questions.

---

## How This Works

```
┌─────────────────────────────────────────────────────────────────┐
│                    BOOTSTRAP PROCESS                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Phase 0: Prerequisites                                         │
│     ↓                                                           │
│  Phase 1: DETECTION (scan project, classify)                    │
│     ↓                                                           │
│  Phase 2: ROUTE to appropriate workflow                         │
│     │                                                           │
│     ├──→ GREENFIELD    → bootstrap/greenfield_workflow.md       │
│     ├──→ SIMILAR       → bootstrap/similar_workflow.md          │
│     └──→ MIGRATION     → bootstrap/migration_workflow.md        │
│     ↓                                                           │
│  Phase 3: EXECUTE workflow                                      │
│     ↓                                                           │
│  Phase 4: VALIDATION & handoff                                  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Phase 0: Prerequisites

Before starting bootstrap, ensure:

1. ✅ User has confirmed they want to use FluxFrame
2. ✅ You have access to the project directory (can list files)
3. ✅ User has provided a project brief OR you can analyze existing code
4. ✅ You have read this entire document

**If user just says "bootstrap" or "set up FluxFrame":**
- Proceed to Phase 1 (Detection)
- Detection will reveal what exists
- Questions will be based on what's missing

---

## Phase 1: Detection

**CRITICAL:** Always detect before asking questions. This prevents redundant questions and ensures appropriate workflow.

### Step 1.1: Scan Project Root

Check for these items in the project:

**AI Rules (indicates existing workflow):**
- `.clinerules/` or `.clinerules` (Cline)
- `AGENTS.md` (Universal)
- `CLAUDE.md` or `.claude/` (Claude Code)
- `.roomodes` or `.roo/` (Roo Code)
- `GEMINI.md` (Antigravity)
- `.cursorrules` (Cursor)
- `.github/copilot-instructions.md` (Copilot)

**Documentation (indicates existing structure):**
- `project_docs/` (FluxFrame standard)
- `docs/` (Common)
- `documentation/` (Alternative)
- `wiki/` (Wiki-style)
- `ADRs/` or `decisions/` (Architecture Decision Records)

**Change History:**
- `bug_fixes/` or `fixes/` (Fix documentation)
- `RFCs/` (Request for Comments)
- `CHANGELOG.md` (Change log)

**Patterns:**
- `patterns/` (Pattern library)
- `conventions/` or `styleguide/` (Coding conventions)

**Project Config:**
- `package.json`, `pyproject.toml`, `Cargo.toml`, etc.
- `README.md`

### Step 1.2: Analyze Content (Level B)

For items found, read and understand:
- What rules/workflows are defined?
- What documentation structure exists?
- What's valuable to preserve?
- How similar to FluxFrame?

See `bootstrap/detection_guide.md` for detailed detection instructions.

### Step 1.3: Classify Scenario

Use this decision tree:

```
Has existing AI rules with structured workflows?
├─ YES → Is structure similar to FluxFrame?
│        ├─ YES → SIMILAR_WORKFLOW
│        └─ NO  → Has substantial docs? 
│                 ├─ YES → MIGRATION
│                 └─ NO  → GREENFIELD (replace minimal rules)
└─ NO  → Has substantial documentation?
         ├─ YES → MIGRATION
         └─ NO  → GREENFIELD
```

**Classification Definitions:**

| Classification | Characteristics |
|---------------|-----------------|
| **GREENFIELD** | No AI rules (or only minimal), no structured docs, fresh start |
| **SIMILAR_WORKFLOW** | Has AI rules with workflows/patterns, similar to FluxFrame approach |
| **MIGRATION** | Has documentation structure different from FluxFrame, needs adaptation |

### Step 1.4: Present Detection Results

Show user what you found:

```markdown
## Project State Detection

### Detected
- **AI Rules:** [what was found]
- **Documentation:** [what was found]
- **Patterns:** [what was found]
- **Bug Fixes:** [what was found]
- **Project Info:** [name, stack from config files]

### Classification: [GREENFIELD / SIMILAR_WORKFLOW / MIGRATION]

**Reasoning:** [brief explanation]

Shall I proceed with the [classification] workflow?
```

Wait for user confirmation before proceeding.

---

## Phase 2: Route to Workflow

Based on classification, proceed to the appropriate workflow file:

### If GREENFIELD

**File:** `bootstrap/greenfield_workflow.md`

**What happens:**
1. Ask questions about project (only what's missing from detection)
2. Generate complete FluxFrame setup from scratch
3. Create all documentation, AI rules, MCP server

**Questions to ask (if not detected):**
- Project name and purpose
- Technology stack
- AI tools to use
- API contract approach (if applicable)
- Verification environment

### If SIMILAR_WORKFLOW

**File:** `bootstrap/similar_workflow.md`

**What happens:**
1. Inventory existing setup
2. Diff against FluxFrame templates
3. For each significant difference, ask user: keep/replace/merge
4. Preserve user customizations
5. Add missing FluxFrame components
6. Create backup before changes

**Key principle:** Default is REPLACE, but identify differences first and ask about each.

### If MIGRATION

**File:** `bootstrap/migration_workflow.md`

**What happens:**
1. Deep analysis of existing documentation
2. Map to FluxFrame equivalents
3. For each category, ask user: copy/migrate/reference
4. Execute migration based on preferences
5. Generate FluxFrame configuration
6. Establish AI workflow
7. Create backup before changes

**Key principle:** Preserve existing valuable content, integrate with FluxFrame.

---

## Phase 3: Execute Workflow

Follow the detailed steps in the appropriate workflow file.

**Common elements across all workflows:**

### AI Tools Selection

Ask early (if not detected):
```
Which AI coding tools will you use with this project?

1. Claude Code (Anthropic's CLI tool)
2. Roo Code (VS Code extension with modes)
3. Cline (VS Code extension)
4. Google Antigravity
5. Multiple (specify which)
6. Other / Universal AGENTS.md only
```

For each selected tool, determine integration level:
- **Full integration** - Tool-specific config with all features
- **Basic** - Symlink to AGENTS.md

### Documentation Location

```
Where should project documentation live?

1. Standard: `project_docs/` at root (recommended)
2. Use existing: `[detected_path]/`
3. Custom: Specify your preferred path
```

### Verification Environment

```
How will changes be verified before marking complete?

1. Localhost - Run locally (e.g., localhost:3000)
2. Preview Environment - CI creates ephemeral previews
3. Staging Server - Deploy to specific staging URL
4. Production - Deploy directly (with feature flags)
```

---

## Phase 4: Validation & Handoff

After workflow execution, validate:

### Universal Checklist

- [ ] AGENTS.md created with project context
- [ ] Tool-specific rules created (based on selection)
- [ ] Documentation structure in place
- [ ] MCP server configured and tested
- [ ] All paths consistent across files
- [ ] No placeholders remaining

### Present Summary

```markdown
## FluxFrame Bootstrap Complete!

### Configuration Created

**Documentation:** `[docs_path]/`
- context_master_guide.md - Single source of truth
- technical_status.md - Project status
- implementation_plan.md - Roadmap
- patterns/ - Pattern library
- workflows/ - Development protocols
- bug_fixes/ - Change documentation

**AI Rules:**
- AGENTS.md - Universal baseline
- [Tool-specific files based on selection]

**MCP Server:** `mcp-server.js`

### [If applicable] What Was Preserved
- [List preserved customizations]
- [List preserved documentation]

### [If applicable] Backup Location
`.fluxframe-backup/[timestamp]/`

### Next Steps

1. Review generated documentation
2. Test MCP server: `npm run mcp`
3. Define Cycle 1.1 in implementation_plan.md
4. Start developing with FluxFrame workflow!

### Quick Reference

- **Start a cycle:** Define in implementation_plan.md, follow cycle_workflow.md
- **Fix a bug:** Use change_request_protocol.md
- **Add a pattern:** Document in patterns/ following template
- **Update status:** Keep technical_status.md current
```

---

## Target Output

A successfully bootstrapped project will have:

```
[project root]/
├── [docs_location]/
│   ├── context_master_guide.md      # Single source of truth
│   ├── technical_status.md          # Real-time project state
│   ├── implementation_plan.md       # Roadmap & cycles
│   ├── api_contract_standards.md    # API enforcement (if applicable)
│   ├── patterns/                    # Pattern library
│   │   ├── README.md
│   │   └── [domain]_patterns.md
│   ├── workflows/                   # Development protocols
│   │   ├── README.md
│   │   ├── cycle_workflow.md
│   │   └── change_request_protocol.md
│   └── bug_fixes/                   # Change documentation
│
├── AGENTS.md                        # Universal AI baseline
├── [tool-specific rules]            # Based on selection
├── mcp-server.js                    # Context provider
└── package.json                     # With MCP dependency
```

---

## Quick Reference: Questions by Scenario

### GREENFIELD Questions

| Question | When to Ask |
|----------|-------------|
| Project name | Not in package.json/README |
| Project purpose | Not clear from description |
| Tech stack | Not detectable from files |
| Architecture type | Not clear from structure |
| API contract approach | Has backend/API |
| AI tools | Always |
| Verification environment | Always |
| Docs location | Always (offer default) |

### SIMILAR_WORKFLOW Questions

| Question | When to Ask |
|----------|-------------|
| Keep/replace/merge | For each significant rule difference |
| Missing components | For each FluxFrame feature not present |
| Preserve customizations | When custom rules detected |

### MIGRATION Questions

| Question | When to Ask |
|----------|-------------|
| Copy/migrate/reference | For each documentation category |
| Docs location | If existing location differs from FluxFrame standard |
| AI tools | Always |
| Handle existing rules | If minimal rules exist |

---

## Troubleshooting

### Detection finds nothing but project has files

Check if you have permission to read the project directory. Ask user to confirm file locations.

### User wants to start over despite existing setup

Classify as GREENFIELD but:
1. Suggest backup first
2. Confirm user wants to replace existing
3. Proceed with greenfield workflow

### Existing rules conflict with FluxFrame

Follow SIMILAR_WORKFLOW approach:
1. Identify each conflict
2. Ask user preference
3. Document why FluxFrame recommends its approach
4. Respect user's final decision

### User's documentation is scattered

In MIGRATION workflow:
1. Map all locations
2. Ask if consolidation is desired
3. Can reference multiple locations if user prefers

---

## Related Files

- `bootstrap/detection_guide.md` - Detailed detection instructions
- `bootstrap/greenfield_workflow.md` - New project setup
- `bootstrap/similar_workflow.md` - Upgrade existing workflow
- `bootstrap/migration_workflow.md` - Adapt existing documentation
- `bootstrap/project_questionnaire.md` - Question reference
- `bootstrap/validation_checklist.md` - Final validation

---

**End of Bootstrap Instructions**
