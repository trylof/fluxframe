# Migration Workflow Bootstrap

**Purpose:** Adapt existing project documentation to FluxFrame structure while preserving valuable content.

**When to use:** Project was classified as `MIGRATION` - it has existing documentation (ADRs, wikis, bug fixes, etc.) in a different structure than FluxFrame, and may or may not have AI rules.

**Goal:** Integrate existing documentation into FluxFrame workflow, ask user preferences for each category (copy, migrate, or reference), establish AI-assisted development workflow.

---

## Prerequisites

Before starting this workflow:
- ✅ Detection phase complete (see `detection_guide.md`)
- ✅ Project classified as `MIGRATION`
- ✅ User confirmed they want to proceed
- ✅ You have identified existing documentation structure

---

## CRITICAL: Never Make Assumptions

**This section overrides all other guidance. Follow these rules absolutely.**

### Required Questions CANNOT Be Skipped

The following questions are **MANDATORY** regardless of what you detect or infer:

- **Q8 (Environment Map)** - Even if you detect Docker, CI configs, or deployment files, you MUST ask the user to confirm their environment setup
- **Q9 (Config/Secrets Management)** - Even if you detect .env files, you MUST ask about their secrets strategy
- **Q10 (Infrastructure as Code)** - Even if you detect Terraform files, you MUST confirm IaC approach
- **Q11 (Observability/Log Access)** - You MUST present this option and let user decide

### Never Assume User Preferences

- **NEVER** decide on behalf of the user what to include or exclude
- **NEVER** skip a question because you think you know the answer
- **NEVER** log a decision that the user didn't explicitly make
- **NEVER** assume the user wants "light migration" or "reference only"
- **ALWAYS** present the FULL FluxFrame option first, then alternatives
- **ALWAYS** explain what each option includes vs excludes

### Full vs Partial Migration Requirement

Before suggesting any migration approach, you MUST:
1. Show what a **FULL** FluxFrame bootstrap includes
2. Show what the user's **existing** setup already has
3. Show the **GAP** between the two
4. For **EACH** gap item, ask: "Would you like to add this?"

Do NOT assume the user wants the "minimal change" approach. Always present full migration as the first option.

### When Presenting Options

For every configuration choice:
1. **Explain what it does** - What will this option add to their project?
2. **Show alternatives** - What are the other options?
3. **Wait for explicit choice** - Do not proceed until user responds
4. **Confirm understanding** - Repeat back what they chose

### If User Gives Vague Answer

If user says "whatever works", "you decide", or similar:
```
I need your explicit decision on this. Here's why [question] matters:
[Explain impact]

Please choose one of the options above.
```

### Decision Logging Rules

- **ONLY** log decisions the user explicitly made
- The `reasoning` field must contain the USER's stated reasoning, not your inference
- If user didn't provide reasoning, ASK for it before logging
- **NEVER** log "assumed because user didn't answer" or "skipped for efficiency"
- Unconfirmed items must remain pending, not logged as decisions

---

## Decision Logging (IMPORTANT)

**Throughout this bootstrap process, you MUST log decisions with their reasoning.**

Migration involves many decisions about how to handle existing documentation (Copy, Migrate, or Reference). To ensure these decisions persist beyond the conversation context and can be referenced later, use the `log_decision` MCP tool.

### When to Log Decisions

Log a decision whenever:
- User chooses Copy/Migrate/Reference for a documentation category
- Documentation location decisions are made
- Infrastructure or environment choices are made (Q8-Q10)
- Browser automation configuration choices are made
- Log access integration decisions are made
- AI tools and integration level are selected
- Any special handling for existing content is decided

### How to Log Decisions

```
log_decision({
  category: "migration",  // See categories below
  decision: "Reference ADRs from AGENTS.md and document_catalog.md instead of migrating",
  reasoning: "ADRs serve a different purpose (recording WHY decisions were made) than FluxFrame docs (WHAT to do). Team actively uses ADR process and wants to continue.",
  alternatives: ["Copy ADR content into patterns/", "Migrate ADRs to FluxFrame structure"],
  implications: "AGENTS.md and document_catalog.md will link to ADRs directory. Team continues existing ADR workflow for architectural decisions."
})
```

### Decision Categories for Migration

- `scenario` - Why classified as MIGRATION
- `migration` - Copy/Migrate/Reference decisions per doc category
- `docs_location` - Where FluxFrame docs will live
- `infrastructure` - Environment setup, platforms
- `config_management` - Secrets, configuration approach
- `iac` - Infrastructure as Code tooling
- `verification` - Where to verify changes
- `browser_automation` - Browser testing configuration
- `log_access` - Observability configuration
- `ai_tools` - AI assistant selection
- `existing_rules` - How to handle existing AI rules (if any)
- `custom` - Any other decisions

### Syncing Decisions to File

After completing Phase 2 (User Preferences) and at the end of bootstrap, call:
```
sync_decisions_to_file({ docsDir: "project_docs" })
```

This writes all logged decisions to `{{DOCS_DIR}}/bootstrap_decisions.md`.

---

## Workflow Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                MIGRATION WORKFLOW BOOTSTRAP                      │
├─────────────────────────────────────────────────────────────────┤
│  Phase 1: Deep analysis of existing documentation               │
│  Phase 2: Present findings and get user preferences             │
│  Phase 3: Execute migration based on preferences                │
│  Phase 4: Generate FluxFrame configuration                      │
│  Phase 5: Establish AI workflow                                 │
│  Phase 6: Validation and handoff                                │
└─────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Deep Analysis

### Step 1.1: Map Existing Documentation

Create a complete map of all documentation:

```markdown
## Documentation Inventory

### Primary Documentation Location
- **Path:** [docs/, documentation/, wiki/, etc.]
- **Structure:** [flat / hierarchical / wiki-style / ADR-based]
- **Total files:** [count]

### Documentation Categories Found

#### Architecture & Design
- **Location:** [path]
- **Files:** [list]
- **Format:** [ADR / RFC / free-form / etc.]
- **Sample topics:** [list 3-5 topics covered]

#### Technical Reference
- **Location:** [path]
- **Files:** [list]
- **Includes:** [API docs / schema / configuration / etc.]

#### Project Status & Planning
- **Location:** [path]
- **Files:** [list]
- **Includes:** [roadmap / changelog / release notes / etc.]

#### Bug Fixes & Changes
- **Location:** [path]
- **Files:** [count and format]
- **Structure:** [dated / numbered / categorized / etc.]

#### Patterns & Conventions
- **Location:** [path]
- **Files:** [list]
- **Categories:** [list if organized]

#### Other Documentation
- [List any other categories found]
```

### Step 1.2: Analyze Content Quality

For each category, assess:

**Completeness:**
- Does it cover what it claims to cover?
- Are there obvious gaps?

**Currency:**
- When was it last updated?
- Does it reflect current codebase?

**Format:**
- Is it well-structured?
- Is it easily searchable/navigable?

**Value:**
- Is this information that should be preserved?
- Would it be effort to recreate?

### Step 1.3: Identify FluxFrame Equivalents

Map existing docs to FluxFrame structure:

```markdown
## FluxFrame Mapping

| Your Documentation | FluxFrame Equivalent | Compatibility |
|-------------------|---------------------|---------------|
| `docs/architecture/OVERVIEW.md` | `AGENTS.md` + `document_catalog.md` | Partial - needs expansion |
| `docs/ADRs/` | Could inform `patterns/` | Different purpose - reference |
| `docs/STATUS.md` | `technical_status.md` | Good match - migrate |
| `docs/api/` | `api_contract_standards.md` | Partial - needs structuring |
| `CHANGELOG.md` | Part of `technical_status.md` | Reference |
| `docs/conventions/` | `patterns/` | Good match - migrate |
| `fixtures/` or `test_data/` | `seed_data/` | Migrate or symlink |
| `user_research/`, `market_research/`, `specs/` | `reference_library/` | Migrate or reference |
| None found | `ROADMAP.md` | Create new |
| None found | `workflows/` | Create new |
| None found | `reference_library/` | Create new |
```

**Note on Reference Library:**
The Reference Library stores DESCRIPTIVE information (real-world context, user research, external inputs) as opposed to PRESCRIPTIVE documentation (patterns, workflows). If the project has existing user research, market analysis, correspondence archives, or external specifications, these should be considered for migration to `reference_library/`.

### Step 1.4: Identify Content for Each FluxFrame Document

**AGENTS.md needs:**
- Project overview (from: ___)
- Architecture decisions (from: ___)
- Tech stack details (from: ___)
- Key workflows (from: ___)

**document_catalog.md needs:**
- Core context document index (from: ___)
- Document locations and descriptions (from: ___)

**completion_protocol.md needs:**
- Task completion checklists (from: ___)
- Update procedures (from: ___)

**templates/change_request.md needs:**
- Change request template (from: ___)

**technical_status.md needs:**
- Current capabilities (from: ___)
- Recent changes (from: ___)
- Known issues (from: ___)
- Architecture status (from: ___)

**patterns/ needs:**
- Coding conventions (from: ___)
- Architecture patterns (from: ___)
- UI patterns (from: ___)
- API patterns (from: ___)

**seed_data/ needs:**
- Test fixtures (from: ___)
- Sample data for AI context (from: ___ or create new)
- Data factories (from: ___)
- Data schemas (from: ___ or infer from models)

**reference_library/ needs:**
- User research/feedback (from: ___ or create new)
- Market research/competitor analysis (from: ___ or create new)
- Domain knowledge/terminology (from: ___ or create new)
- External specifications (from: ___ or create new)
- Correspondence archives (from: ___ or create new)

### Step 1.4.5: Content Source Mapping (REQUIRED)

**Purpose:** Migration projects have the most documentation to process. Create an explicit mapping of what content should be extracted from existing docs. This is separate from organizational decisions (archive/migrate/reference) - those come in Phase 2.

**Critical Distinction:**
- **Step 1.3 (FluxFrame Mapping):** Identifies structural equivalents (your docs → FluxFrame docs)
- **Step 1.4.5 (Content Source Mapping):** Identifies specific content to extract from each file
- **Phase 2.2-2.8 (User Preferences):** Determines organizational fate of files

**Why This Order:**
Content source mapping happens BEFORE user preferences because:
1. We need to know what's IN the files to present good migration options
2. User can make better archive/migrate/reference decisions knowing what content will be extracted
3. During generation, we need confirmed sources regardless of organizational decision

#### Step 1.4.5.1: Deep Content Analysis

For **every documentation file** discovered in Phase 1.1-1.4, perform comprehensive content analysis.

**CRITICAL:** Do NOT rely on filenames. Real projects have non-obvious naming:
- A `NOTES.md` might contain architecture decisions
- A `meeting-2024-03-15.md` might have the only record of project goals
- A `README.md` might cover purpose, roadmap, AND known issues in one file

**Read each file and classify content by target FluxFrame document:**

| Content Type | Signals to Look For | Target Document |
|--------------|---------------------|-----------------|
| Project purpose/vision | "what is this", "why", "goals", "mission" | AGENTS.md |
| Architecture decisions | "we chose", "architecture", "design" | AGENTS.md |
| Tech stack details | "stack", "technologies", "built with" | AGENTS.md |
| Current state | "status", "works", "implemented" | technical_status.md |
| Known issues | "issues", "bugs", "limitations", "debt" | technical_status.md |
| Recent changes | "changed", "updated", "fixed" | technical_status.md |
| Future plans | "roadmap", "planned", "todo", "backlog" | ROADMAP.md |
| Conventions | "conventions", "patterns", "how we", "always" | patterns/ |
| API docs | "endpoint", "request", "response", "schema" | api_contract_standards.md |

**For each file, record:**

```markdown
### [filename]
**Path:** [full path]
**Last Modified:** [date]
**Structure:** [single topic / mixed content / comprehensive]

**Content Found:**

| Content Type | Location in File | Target FluxFrame Doc | Confidence |
|--------------|------------------|---------------------|------------|
| Project purpose | Lines 1-30 | AGENTS.md | High |
| Architecture | Lines 50-120 | AGENTS.md | High |
| Known issues | Lines 200-250 | technical_status.md | Medium |
| Future plans | "Roadmap" section | ROADMAP.md | High |

**File spans multiple target docs:** Yes/No
**Quality Assessment:** Current / Outdated / Partial
```

#### Step 1.4.5.2: Handle Migration-Specific Cases

**Case: Wiki-Style Documentation**

```markdown
## Wiki Content Analysis

**Wiki location:** [path]
**Total pages:** [N]

**Content Distribution:**

| Topic | Pages Covering It | Primary Source | Secondary Sources |
|-------|-------------------|----------------|-------------------|
| Project purpose | index.md, about.md | about.md | index.md (summary) |
| Architecture | architecture.md, decisions/*.md | architecture.md | decisions/ (details) |

**Recommendation:** Use primary sources for extraction; archive entire wiki for reference.
```

**Case: ADR-Based Documentation**

```markdown
## ADR Content Analysis

ADRs document WHY decisions were made (descriptive).
FluxFrame patterns document WHAT to do (prescriptive).

| ADR | Decision Topic | Extract For | Notes |
|-----|----------------|-------------|-------|
| ADR-001 | Database choice | AGENTS.md (rationale) | Context only |
| ADR-003 | API style | api_patterns.md (pattern basis) | Informs pattern |

**Recommendation:** Extract decision context; reference ADR directory for history.
```

**Case: Fragmented/Scattered Documentation**

```markdown
## Fragmented Content Analysis

| Content Type | Found In | Quality | Completeness |
|--------------|----------|---------|--------------|
| Project purpose | README.md (partial), kickoff.md, slack-export.txt | Mixed | 60% |
| Architecture | design-sketch.md, PR comments | Low | 40% |
| Current status | (not documented) | N/A | 0% |

**Recommendation:** Present to user; may need project_brief.md creation.
```

#### Step 1.4.5.3: Generate Content Source Mapping File

Create `.fluxframe/detected_content_sources.md`:

```markdown
# Detected Content Sources

**Generated:** [timestamp]
**Project:** {{PROJECT_NAME}}
**Scenario:** MIGRATION
**Status:** Awaiting user review

---

## Overview

This is a MIGRATION project with existing documentation. I've analyzed all files
to map what content should be extracted for each FluxFrame document.

**This mapping is separate from organizational decisions:**
- A file marked "MIGRATE" organizationally will have its content extracted here first
- A file marked "ARCHIVE" may still be used as a content source
- A file marked "REFERENCE" means we link rather than extract

---

## For AGENTS.md

**What this document needs:**
- Project purpose, vision, goals
- Target users and value proposition
- High-level architecture overview
- Tech stack and rationale
- Core workflows (adapted to FluxFrame)

**Sources identified:**

| File | Content | Lines/Section | Confidence | Org Fate (TBD) |
|------|---------|---------------|------------|----------------|
| [file] | [content type] | [location] | [H/M/L] | [Phase 2] |

**Gaps:** [any missing content types]

---

## For document_catalog.md

**What this document needs:**
- Index of all core context documents
- Document locations and descriptions
- Cross-references between documents

**Sources identified:**

| File | Content | Lines/Section | Confidence | Org Fate (TBD) |
|------|---------|---------------|------------|----------------|
| [file] | [content type] | [location] | [H/M/L] | [Phase 2] |

**Gaps:** [any missing content types]

---

## For completion_protocol.md

**What this document needs:**
- Task completion checklists
- Document update procedures after changes

**Sources identified:**

| File | Content | Lines/Section | Confidence | Org Fate (TBD) |
|------|---------|---------------|------------|----------------|
| [file] | [content type] | [location] | [H/M/L] | [Phase 2] |

**Gaps:** [any missing content types]

---

## For templates/change_request.md

**What this document needs:**
- Change request template structure

**Sources identified:**

| File | Content | Lines/Section | Confidence | Org Fate (TBD) |
|------|---------|---------------|------------|----------------|
| [file] | [content type] | [location] | [H/M/L] | [Phase 2] |

**Gaps:** [any missing content types]

---

## For technical_status.md

**What this document needs:**
- Current capabilities and limitations
- Architecture implementation status
- Recent changes
- Known issues and technical debt

**Sources identified:**

| File | Content | Lines/Section | Confidence | Org Fate (TBD) |
|------|---------|---------------|------------|----------------|
| [file] | [content type] | [location] | [H/M/L] | [Phase 2] |

**Gaps:** [gaps]

---

## For ROADMAP.md

**What this document needs:**
- Planned features
- Prioritized backlog
- Milestones and timeline
- Future vision

**Sources identified:**

| File | Content | Lines/Section | Confidence | Org Fate (TBD) |
|------|---------|---------------|------------|----------------|
| [file] | [content type] | [location] | [H/M/L] | [Phase 2] |

**Note:** Will adapt to FluxFrame two-tier planning system.

---

## For patterns/

**Sources identified:**

| File | Content | Target Pattern Doc | Confidence |
|------|---------|-------------------|------------|
| [file] | [content] | [ui/api/data/infra]_patterns.md | [H/M/L] |

---

## Summary

| Target Document | Sources | Confidence | Gaps |
|-----------------|---------|------------|------|
| AGENTS.md | [N] files | [avg] | [gaps] |
| document_catalog.md | [N] files | [avg] | [gaps] |
| completion_protocol.md | [N] files | [avg] | [gaps] |
| templates/change_request.md | [N] files | [avg] | [gaps] |
| technical_status.md | [N] files | [avg] | [gaps] |
| ROADMAP.md | [N] files | [avg] | [gaps] |
| patterns/ | [N] files | [avg] | [gaps] |

---

## Your Review (BEFORE Phase 2)

Please confirm this content mapping BEFORE we discuss organizational decisions:

1. **Sources correct?** For each target document, are the sources right?
2. **Missing sources?** Files I should include?
3. **Wrong sources?** Files I should NOT extract from?

**Why review now?** Understanding what content will be extracted helps you make
better organizational decisions in Phase 2 (archive/migrate/reference).
```

#### Step 1.4.5.4: Present and Confirm Before Phase 2

```markdown
## Content Source Review (Pre-Phase 2)

Before we discuss how to handle your existing documentation, please confirm
where I should get content for each FluxFrame document.

📄 **Full mapping:** `.fluxframe/detected_content_sources.md`

**Quick Summary:**

| FluxFrame Document | Main Sources | Gaps |
|--------------------|--------------|------|
| AGENTS.md | [list] | [gaps] |
| document_catalog.md | [list] | [gaps] |
| completion_protocol.md | [list] | [gaps] |
| templates/change_request.md | [list] | [gaps] |
| technical_status.md | [list] | [gaps] |
| ROADMAP.md | [list] | [gaps] |
| patterns/ | [list] | [gaps] |

**Why this matters for Phase 2:**
- Files fully used as content sources → good candidates for ARCHIVE
- Files with unique value beyond extraction → consider REFERENCE
- Files I can't easily extract from → may need MIGRATE with manual review

**Questions:**
1. Sources look correct?
2. Any files to add/remove?
3. Ready to proceed to Phase 2 (organizational preferences)?
```

**Wait for user confirmation before proceeding to Phase 2.**

#### Step 1.4.5.5: Handle Missing Project Brief (BLOCKING)

If no sources were found for project purpose/vision/goals, this is a **blocking** issue even for migration projects.

```markdown
## Project Brief Required

Despite having existing documentation, I couldn't find clear sources describing
your project's core purpose, vision, or goals.

I found documentation about [what was found], but nothing that clearly states
what this project IS and WHY it exists.

**Please create a project brief:**

1. Create `project_brief.md` in your project root
2. Include:
   - What is this project? (1-3 sentences)
   - Why does it exist? (problem it solves)
   - Who is it for? (target users)
   - What are the main goals?
   - Tech stack
   - Current status

3. Let me know when ready

**Location:** Project root (next to README.md)

**Note:** Your existing documentation may INFORM this brief - feel free to
consolidate scattered purpose statements into this single source of truth.
```

**After user creates project_brief.md:**
1. Re-scan and analyze the new file
2. Update `.fluxframe/detected_content_sources.md`
3. Present updated mapping for confirmation
4. Then proceed to Phase 2

#### Step 1.4.5.6: Update and Confirm

After user review:
1. Update `.fluxframe/detected_content_sources.md` with any changes
2. Set status to "Confirmed"
3. Log decision:

```
log_decision({
  category: "content_sources",
  decision: "Content source mapping confirmed for migration",
  reasoning: "[User's confirmation notes]",
  sources_confirmed: [list],
  sources_added: [any additions],
  gaps_acknowledged: [any gaps]
})
```

**Proceed to Gate 1.5 check, then Step 1.5 (Infrastructure Detection) and Phase 2.**

---

## Gate 1.5: Content Source Mapping Checkpoint

**BLOCKING:** This gate must pass before proceeding to infrastructure detection and Phase 2.

### Gate Check

```markdown
## Gate 1.5 Check: Content Source Mapping

### Condition 1: Mapping File Exists
[ ] `.fluxframe/detected_content_sources.md` exists

### Condition 2: Status is Confirmed
[ ] File status shows "✅ Confirmed" (not "Awaiting user review")

### Condition 3: Project Brief Handled
[ ] If `projectBriefRequired: true` in state → `project_brief.md` exists
[ ] Or: Project purpose sources were found in existing files

### Condition 4: State Updated
[ ] `.fluxframe-bootstrap-state.json` has `contentSourceMapping.status = "confirmed"`

---

**GATE RESULT:** [✅ PASS / ❌ FAIL]
```

### If Gate Fails

**DO NOT PROCEED TO STEP 1.5.** Return to the failed step:

- **Condition 1 failed:** Return to Step 1.4.5.3 (Generate mapping file)
- **Condition 2 failed:** Return to Step 1.4.5.4 (User review checkpoint)
- **Condition 3 failed:** Return to Step 1.4.5.5 (Create project_brief.md)
- **Condition 4 failed:** Update bootstrap state, then re-check

### On Gate Pass

Update bootstrap state:
```json
{
  "gates": {
    "gate1_5_content_sources": {
      "passed": true,
      "passedAt": "[timestamp]"
    }
  }
}
```

Then proceed to Step 1.5.

---

### Step 1.5: Detect Existing Infrastructure

Analyze the codebase for infrastructure configuration:

```markdown
## Infrastructure Detection

### Configuration Files Found
- [ ] `.env.example` or `.env.template` - Environment variables
- [ ] `docker-compose.yml` - Container orchestration
- [ ] `.github/workflows/` or `.gitlab-ci.yml` - CI/CD configuration
- [ ] `terraform/` or `infra/` - Infrastructure as Code
- [ ] `vercel.json`, `netlify.toml`, `railway.json` - Platform configs
- [ ] Cloud provider configs (AWS, GCP, Azure)

### Seed Data / Test Fixtures Found
- [ ] `seed_data/` - FluxFrame standard location
- [ ] `fixtures/` or `__fixtures__/` - Common test fixtures location
- [ ] `test_data/` or `testdata/` - Alternative test data location
- [ ] `seeds/` or `db/seeds/` - Database seeding location
- [ ] `mocks/` or `__mocks__/` - Mock data location
- [ ] `factories/` - Factory functions location
- [ ] Within test directories (`tests/fixtures/`, `spec/fixtures/`, etc.)

**Seed Data Assessment:**
- **Format:** [JSON/YAML/SQL/Code-based/Mixed]
- **Coverage:** [Which entities have fixtures?]
- **Quality:** [Well-organized or scattered?]
- **Test integration:** [How do tests import fixtures?]

### Inferred Environments
Based on detected files and configs:

| Environment | Evidence | Status |
|-------------|----------|--------|
| Development | [file or "assumed localhost"] | [Likely exists] |
| Testing/CI | [CI config found or "not detected"] | [Exists/Unknown] |
| Staging | [config found or "not detected"] | [Exists/Unknown] |
| Production | [config found or "not detected"] | [Exists/Unknown] |

### Hosting Platforms Detected
- **Frontend:** [Vercel/Netlify/other/unknown]
- **Backend:** [Railway/Heroku/AWS/other/unknown]
- **Database:** [managed service or self-hosted]

### CI/CD Pipeline
- **Platform:** [GitHub Actions/GitLab CI/other/none]
- **Deployment:** [Automated/Manual/Unknown]

**Note:** This is preliminary detection. Will confirm with user in Phase 2.5.
```

---

## Phase 2: User Preferences

### Step 2.1: Present Analysis

Show user what you found:

```markdown
## Documentation Analysis Results

I analyzed your existing documentation and found:

### Summary
- **Total documentation files:** [N]
- **Last updated:** [date range]
- **Structure type:** [ADR-based / Wiki / Free-form / etc.]

### Key Findings

**Well-suited for FluxFrame integration:**
- [List docs that map well]

**Needs adaptation:**
- [List docs that need restructuring]

**Valuable but different purpose:**
- [List docs to reference rather than migrate]

**Missing (will create from FluxFrame templates):**
- [List FluxFrame docs that have no equivalent]
```

### Step 2.2: Ask Preferences for Each Category

For each documentation category, ask:

```markdown
### Your Decision: [Category Name]

**What I found:** [Description of existing docs]

**FluxFrame equivalent:** [What this would become]

**Options:**

1. **Copy** - Keep your files where they are, copy relevant content into FluxFrame docs
   - Pros: Preserves original, have both versions
   - Cons: Potential for drift between copies

2. **Migrate** - Move content into FluxFrame structure, update/improve format
   - Pros: Clean integration, follows FluxFrame conventions
   - Cons: Original location will have moved/redirected

3. **Reference** - Keep your files, FluxFrame docs will link to them
   - Pros: No duplication, preserves your structure
   - Cons: Two documentation systems to maintain, may not follow FluxFrame workflow

Your choice for [Category] (1/2/3)?
```

### Step 2.3: Ask About Documentation Location

```markdown
### Documentation Location

Your current documentation is in: `[detected_path]/`

FluxFrame standard location is: `project_docs/`

Options:

1. **Use FluxFrame standard** - Create `project_docs/`, new docs go there
2. **Use your location** - Keep `[detected_path]/`, FluxFrame docs go there
3. **Parallel structure** - Keep both, link between them

Your choice (1/2/3)?
```

### Step 2.4: Record All Preferences

```markdown
## Migration Preferences

### Documentation Location
- **Decision:** [1/2/3]
- **Path to use:** [resulting path]

### Category Preferences

| Category | Decision | Source | Destination |
|----------|----------|--------|-------------|
| Architecture | [Copy/Migrate/Reference] | [source path] | [destination] |
| Conventions | [Copy/Migrate/Reference] | [source path] | [destination] |
| Bug Fixes | [Copy/Migrate/Reference] | [source path] | [destination] |
| Status | [Copy/Migrate/Reference] | [source path] | [destination] |
| [etc.] | | | |

### New Documents to Create
- [ ] `document_catalog.md` - [Create/Adapt existing]
- [ ] `completion_protocol.md` - [Create/Adapt existing]
- [ ] `templates/change_request.md` - [Create/Adapt existing]
- [ ] `technical_status.md` - [Create/Adapt existing]
- [ ] `ROADMAP.md` - [Create]
- [ ] `patterns/` - [Create/Adapt existing]
- [ ] `workflows/` - [Create]
```

---

## Phase 2.5: Infrastructure & Environment Strategy

**Purpose:** Confirm detected infrastructure and gather environment strategy information.

### Step 2.5.1: Present Infrastructure Findings

Present the infrastructure detection results from Phase 1.5:

```markdown
## Infrastructure & Environment Assessment

Based on analyzing your codebase, here's what I found:

### Detected Configuration
[Show infrastructure detection summary from Phase 1.5]

### Questions to Confirm Setup

I need to confirm your environment strategy to properly configure FluxFrame documentation.
```

### Step 2.5.2: Ask Infrastructure Questions

**Ask Q8-Q10 from project_questionnaire.md:**

Follow the same questionnaire format as similar_workflow Phase 2.5:
- **Q8:** Environment Map (Dev/Test/Staging/Prod status and platforms)
- **Q9:** Configuration & Secrets Management approach
- **Q10:** Infrastructure as Code tooling preferences

### Step 2.5.3: Record Infrastructure Preferences

```markdown
## Infrastructure Configuration Recorded

| Question | Answer | Notes |
|----------|--------|-------|
| Development | [Status/Platform] | [notes] |
| Testing/CI | [Status/Platform] | [notes] |
| Staging | [Status/Platform] | [notes] |
| Production | [Status/Platform] | [notes] |
| Config Management | [Choice] | [notes] |
| IaC Tooling | [Choice] | [notes] |

**Impact on Migration:**
- Environments marked "Needs Setup" will be added to ROADMAP.md
- Infrastructure section will be populated in technical_status.md with Environment Matrix
- infra_patterns.md will be created from template
```

---

## Phase 2.6: Gap Analysis (REQUIRED)

**Purpose:** Before proceeding to migration, show the user what a FULL FluxFrame setup includes versus what they already have.

**CRITICAL:** This phase ensures the user understands what they might be missing and explicitly chooses what to include.

### Step 2.6.1: Present Full FluxFrame Overview

Show the user what a complete FluxFrame bootstrap includes:

```markdown
## What Full FluxFrame Bootstrap Includes

Before we proceed with migration, here's what a complete FluxFrame setup provides. I'll then show what you already have and what's missing.

### Core Documentation
- [ ] `AGENTS.md` - Single source of truth for project context
- [ ] `document_catalog.md` - Index of all core context documents
- [ ] `completion_protocol.md` - Task completion checklists and update procedures
- [ ] `templates/change_request.md` - Change request template
- [ ] `technical_status.md` - Real-time project state tracking
- [ ] `ROADMAP.md` - Development roadmap with cycles
- [ ] `api_contract_standards.md` - API type safety enforcement (if applicable)
- [ ] `bootstrap_decisions.md` - Record of all setup decisions with reasoning

### Pattern Library

> [!IMPORTANT]
> **All pattern files are REQUIRED placeholders.** Projects evolve—a local-only project today may need infrastructure tomorrow. Since bootstrap instructions are removed after completion, all pattern files must exist from the start. Create each with "Status: Placeholder" content when not currently applicable.

- [ ] `patterns/README.md` - Pattern index and methodology **(REQUIRED)**
- [ ] `patterns/ui_patterns.md` - UI component patterns **(REQUIRED - placeholder if no frontend)**
- [ ] `patterns/api_patterns.md` - API endpoint patterns **(REQUIRED - placeholder if no backend)**
- [ ] `patterns/data_patterns.md` - Database patterns **(REQUIRED - placeholder if no database)**
- [ ] `patterns/infra_patterns.md` - Infrastructure & deployment patterns **(REQUIRED)**

### Workflows

> [!NOTE]
> Workflow files define the FluxFrame methodology and are required for consistent development practices.

- [ ] `workflows/cycle_workflow.md` - Development cycle methodology **(REQUIRED)**
- [ ] `workflows/change_request_protocol.md` - Bug fix and change tracking **(REQUIRED)**

### AI Configuration
- [ ] `AGENTS.md` - Universal AI baseline rules
- [ ] Tool-specific rules (CLAUDE.md, .clinerules/, .roomodes, etc.)
- [ ] MCP server configuration

### Infrastructure Documentation
- [ ] Environment matrix (dev/test/staging/prod)
- [ ] Secrets management documentation
- [ ] IaC configuration (if applicable)

### Reference Library (Descriptive Context)
- [ ] `reference_library/README.md` - Index and philosophy **(REQUIRED)**
- [ ] `reference_library/archived_documents/` - Documents preserved during bootstrap **(REQUIRED)**
  - [ ] `archived_documents/archive_manifest.md` - Metadata for all archived files
  - [ ] `archived_documents/roadmaps/` - Previous roadmap files
  - [ ] `archived_documents/status/` - Previous status documents
  - [ ] `archived_documents/architecture/` - Previous architecture docs
  - [ ] `archived_documents/briefings/` - Project briefs and requirements
  - [ ] `archived_documents/rules/` - Previous AI rule files
- [ ] `reference_library/open_questions/` - Research topics and unanswered questions
- [ ] `reference_library/correspondence/` - Emails, meeting notes, stakeholder input
- [ ] `reference_library/user_research/` - Interviews, feedback, usage scenarios
- [ ] `reference_library/market_research/` - Competitor analysis, industry reports
- [ ] `reference_library/domain_knowledge/` - Expert input, terminology, business context
- [ ] `reference_library/specifications/` - External specs, PDFs, partner documentation

### Optional Features
- [ ] Browser automation setup (Claude Chrome, Puppeteer)
- [ ] Log access configuration (observability)
```

### Step 2.6.2: Show What User Already Has

```markdown
## What Your Current Setup Has

Based on my analysis of your existing documentation:

### Existing Components
[For each item above, mark as:]
- ✅ **Has:** [component] - [brief description of what exists]
- ⚠️ **Partial:** [component] - [what's there, what's missing]
- ❌ **Missing:** [component]

### Summary
- **Complete:** [N] components (can be migrated/referenced)
- **Partial:** [N] components (can be enhanced)
- **Missing:** [N] components (will be created)
```

### Step 2.6.3: Present Gap Analysis

```markdown
## Gap Analysis: What You're Missing

Based on comparing your setup to full FluxFrame, here are the gaps:

### Missing Components

| # | Component | What It Provides | Your Choice |
|---|-----------|------------------|-------------|
| 1 | [Component] | [Brief description of value] | Add / Skip |
| 2 | [Component] | [Brief description of value] | Add / Skip |
| ... | ... | ... | ... |

### Components That Can Be Enhanced

| # | Component | Your Current Version | FluxFrame Enhancement | Your Choice |
|---|-----------|---------------------|----------------------|-------------|
| 1 | [Component] | [What you have] | [What FluxFrame adds] | Migrate / Reference Only |
| ... | ... | ... | ... | ... |

---

**Important:** For each item above, I need your explicit decision:

1. **Missing components:** Should I add this? (Yes/No)
2. **Existing components:** Should I migrate (copy/adapt content) or just reference your existing docs?

Please respond with your choices for each numbered item, or say "Add all missing" / "Migrate all" if you want the full migration.
```

### Step 2.6.4: Record Gap Decisions

**Wait for user response.** Do not proceed until user has made explicit choices.

For each decision, log it:
```
log_decision({
  category: "gap_analysis",
  decision: "[Add/Skip/Migrate/Reference] [Component]",
  reasoning: "[User's stated reason]",
  alternatives: ["Add", "Skip", "Migrate", "Reference only"],
  implications: "[What this means for their setup]"
})
```

**If user says "you decide" or gives vague answer:**
```
I need your explicit decision for each component. This ensures your FluxFrame setup matches your actual needs.

Let me explain why each matters:
- [Component 1]: [Detailed explanation of value]
- [Component 2]: [Detailed explanation of value]
...

Please choose for each: Add/Skip (missing) or Migrate/Reference (existing)?
```

---

## Phase 2.7: Future State (Planned & Aspirational) - OPTIONAL

**Purpose:** After gap analysis, capture what the user intends to build beyond what's being migrated.

**When to ask:** Always offer this after Phase 2.6, but user can skip.

### Step 2.7.1: Introduce Future State Capture

```markdown
## Looking Ahead

Before we execute the migration, I'd like to understand what you're **planning** for the future.

FluxFrame works best when it can prepare for your project's evolution. We'll capture two types of future items:

1. **PLANNED (Soon):** Things you're actively planning to add
   → FluxFrame will create placeholder patterns and cycle entries
   → Ready for you to implement when the time comes

2. **ASPIRATIONAL (Someday):** Nice-to-have items, no rush
   → Documented in "Future Considerations" section only
   → No active preparation, just for future reference

Would you like to capture your future plans? (yes/skip)
```

### Step 2.7.2: Gather Planned Items (Tier 2)

**If user says yes:**

```markdown
Based on your current setup and migration decisions, what are you **actively planning** to add soon?

**Current state (being migrated):**
- Existing documentation: [list key docs being migrated]
- Infrastructure: [summarize from Phase 2.5]
- Gaps identified: [list from Phase 2.6]

**What are you planning to add soon?** (Select all that apply)

□ Any "Skip" items from gap analysis you'll add later
□ Additional environments (staging, production, etc.)
□ CI/CD pipeline
□ Infrastructure as Code
□ Monitoring/observability
□ Other: _______________
□ Nothing planned right now
```

**For each selected item, log it:**
```
log_future_item({
  tier: "planned",
  category: "[infrastructure/environment/feature]",
  intention: "[what they selected]",
  timeframe: "soon",
  fluxframeImpact: "[how this affects patterns/workflows]",
  placeholder: "[what to create now]"
})
```

### Step 2.7.3: Gather Aspirational Items (Tier 3)

```markdown
Any **nice-to-have** items you'd like documented for the future?

These won't get active preparation - just recorded in your implementation plan's "Future Considerations" section for when you're ready.

□ Advanced monitoring/alerting
□ Multi-region deployment
□ Performance optimization
□ Feature flags system
□ Other: _______________
□ Nothing to document
```

**Log each as tier: "aspirational"**

### Step 2.7.4: If User Skips

```
log_decision({
  category: "future_state",
  decision: "User chose to skip future state capture",
  reasoning: "User wants to focus on migration only",
  implications: "FluxFrame configured based on migration. User can add future items to ROADMAP.md later."
})
```

---

## Phase 2.8: Document Archival Decisions (REQUIRED)

**Purpose:** Get explicit user decisions on which existing documents should be archived to reference_library.

**CRITICAL:** This phase is REQUIRED for MIGRATION workflows. Documents are NEVER deleted or overwritten without explicit user consent and archival.

### Step 2.8.1: Present Documents for Archival Review

Based on the documentation inventory from Phase 1, present documents that may need archival:

```markdown
## Document Archival Review

During the documentation analysis, I found files that may contain valuable context.
When you choose **MIGRATE** for a document category, the original files will be
**archived** (not deleted) to `reference_library/archived_documents/`.

**Documents Identified:**

| # | File | Location | Type | Your Decision (COPY/MIGRATE/REFERENCE) | Archive If Migrate? |
|---|------|----------|------|---------------------------------------|---------------------|
| 1 | [filename] | [path] | [type] | [from Phase 2] | Yes (automatic) |
| 2 | [filename] | [path] | [type] | [from Phase 2] | Yes (automatic) |

**Additional Documents Not Yet Categorized:**

These documents were found but don't fit standard categories:

| # | File | Location | Recommendation | Your Decision |
|---|------|----------|----------------|---------------|
| 1 | [filename] | [path] | Archive / Keep | [user choice] |

**Existing AI Rules (will be backed up automatically):**

| File | Current Location | Will Archive To |
|------|------------------|-----------------|
| [rule file] | [path] | reference_library/archived_documents/rules/ |

---

**For uncategorized documents, tell me:**
- "Archive [#]" - Move to appropriate archive subfolder
- "Keep [#]" - Leave in current location
- "Archive all uncategorized" - Archive everything not yet categorized
```

### Step 2.8.2: Confirm Archive Categories

For each document being archived, confirm the category:

```markdown
You chose to archive: **[filename]**

Based on its content, I'll place it in: `reference_library/archived_documents/[type]/`

Archived name: `[original_name]_archived_[YYYY-MM-DD].md`

Categories available:
- `roadmaps/` - Roadmaps, backlogs, planning docs
- `status/` - Status tracking, changelogs
- `architecture/` - Architecture, design, technical decisions
- `briefings/` - Project briefs, PRDs, requirements
- `rules/` - AI rule configurations

Is `[type]/` correct? (yes / use [different category])
```

### Step 2.8.3: Record Archival Decisions

Log each archival decision:

```
log_decision({
  category: "archival",
  decision: "Archive [filename] to reference_library/archived_documents/[type]/",
  reasoning: "[User's reason or 'Part of MIGRATE decision for [category]']",
  alternatives: ["Keep in place", "Reference only"],
  implications: "Document preserved in archive with metadata"
})
```

### Step 2.8.4: Summarize Archival Plan

```markdown
## Complete Archival Plan

**From MIGRATE Decisions (automatic archival):**
| Original | Category | Archived As |
|----------|----------|-------------|
| [file] | [type] | [archived_name] |

**Additional Documents to Archive:**
| Original | Category | Archived As |
|----------|----------|-------------|
| [file] | [type] | [archived_name] |

**Documents Kept in Place:**
| File | Location | Reason |
|------|----------|--------|
| [file] | [path] | [reason] |

**AI Rules Backup:**
All existing AI rules will be backed up before activation.

Proceed with this archival plan? (yes/modify)
```

**Note:** Archival is executed during Phase 7 (Finalization) to ensure atomicity.

---

## Phase 3: Execute Migration

> [!CRITICAL]
> **USE CONFIRMED CONTENT SOURCE MAPPING**
>
> Before generating any FluxFrame document, you MUST:
> 1. Read `.fluxframe/detected_content_sources.md` (confirmed in Step 1.4.5)
> 2. For the document you're generating, identify confirmed sources
> 3. Read each source file
> 4. Extract the specific content mapped to that document
> 5. Then generate the FluxFrame document with extracted content
>
> | FluxFrame Document | Use Sources From Mapping |
> |-------------------|--------------------------|
> | AGENTS.md | [confirmed sources for this doc] |
> | document_catalog.md | [confirmed sources for this doc] |
> | completion_protocol.md | [confirmed sources for this doc] |
> | templates/change_request.md | [confirmed sources for this doc] |
> | technical_status.md | [confirmed sources for this doc] |
> | ROADMAP.md | [confirmed sources for this doc] |
> | patterns/* | [confirmed sources for each pattern file] |
> | api_contract_standards.md | [confirmed sources for this doc] |
>
> **Why:** The content source mapping was confirmed by the user in Step 1.4.5.
> It tells you exactly which files contain which content. Use it.
>
> **Timing:** Documents marked for MIGRATE/ARCHIVE are moved during Phase 7.
> If you don't extract content using the mapping NOW, it will only exist in the archive.
>
> **For COPY decisions:** Content is duplicated, original stays - still read using mapping.
> **For MIGRATE decisions:** Content moves to FluxFrame format - extract first, archive later.
> **For REFERENCE decisions:** Content stays in place - link to it, but extract context.

### Step 3.1: Create Backup

```bash
# Create backup of existing documentation
mkdir -p .fluxframe-backup/$(date +%Y%m%d_%H%M%S)/docs
cp -r [detected_docs_path]/* .fluxframe-backup/$(date +%Y%m%d_%H%M%S)/docs/

# Backup any existing AI rules
cp -r .clinerules/ .fluxframe-backup/$(date +%Y%m%d_%H%M%S)/ 2>/dev/null || true
cp .cursorrules .fluxframe-backup/$(date +%Y%m%d_%H%M%S)/ 2>/dev/null || true
```

### Step 3.2: Create Directory Structure

Based on location decision:

```bash
# If using FluxFrame standard
mkdir -p project_docs/{patterns,workflows,roadmap,bugs}
mkdir -p project_docs/reference_library/{archived_documents,open_questions,correspondence,user_research,market_research,domain_knowledge,specifications}
mkdir -p project_docs/reference_library/archived_documents/{roadmaps,status,architecture,briefings,rules}

# If using existing location
mkdir -p [detected_path]/{patterns,workflows,roadmap,bugs}
mkdir -p [detected_path]/reference_library/{archived_documents,open_questions,correspondence,user_research,market_research,domain_knowledge,specifications}
mkdir -p [detected_path]/reference_library/archived_documents/{roadmaps,status,architecture,briefings,rules}
```

### Step 3.3: Process Each Category

For each category, based on user's decision:

#### If COPY:

```markdown
**Copy Process for [Category]:**

1. Create target file in FluxFrame location
2. Extract relevant content from source files
3. Restructure into FluxFrame format
4. Add FluxFrame-specific sections
5. Original files remain untouched

**Source:** `[original_path]`
**Target:** `[fluxframe_path]`
**Content extracted:**
- [List what was copied]
```

#### If MIGRATE:

```markdown
**Migration Process for [Category]:**

1. **Read all source files** (CRITICAL - do this NOW, before finalization)
2. Transform content to FluxFrame format
3. Write to FluxFrame location
4. Record archival decision in bootstrap state (file will be archived during finalization)
5. Original files are ARCHIVED (not deleted) during Phase 7 finalization

**Source:** `[original_path]`
**Target:** `[fluxframe_path]`
**Archive destination:** `reference_library/archived_documents/[type]/`
**Content extracted:**
- [List key content migrated to FluxFrame docs]
```

> [!NOTE]
> **Archival vs Deletion:** MIGRATE no longer deletes files. Files are moved to
> `reference_library/archived_documents/` with timestamps and metadata during
> Phase 7 (Finalization). This preserves historical context while cleaning up
> the project structure.

#### If REFERENCE:

```markdown
**Reference Process for [Category]:**

1. Keep source files unchanged
2. In FluxFrame documents, add references:
   ```markdown
   ## [Section]
   
   See existing documentation: `[path to original]`
   
   **Summary:** [Brief summary of what's there]
   ```
3. Ensure links work and are maintainable

**Source (kept):** `[original_path]`
**FluxFrame reference:** `[where reference is added]`
```

### Step 3.4: Create FluxFrame Core Documents

**FIRST: Read Content Source Mapping**

For each document, consult `.fluxframe/detected_content_sources.md` to get confirmed sources:

```markdown
## Generating [document_name]

**From content source mapping:**
Confirmed sources for [document_name]:
- [source 1]: [content to extract - lines/sections]
- [source 2]: [content to extract]

**Reading and extracting...**
```

For each FluxFrame document, based on migration decisions AND content source mapping:

#### AGENTS.md

```markdown
# Creating AGENTS.md

**Sources from mapping (.fluxframe/detected_content_sources.md):**
- [Confirmed source 1]: [specific content mapped]
- [Confirmed source 2]: [specific content mapped]

**Reading confirmed sources...**

**Sections to populate:**

1. **Project Identity**
   - Source: [where to get this]
   - Content: [extract or ask user]

2. **Architecture Overview**
   - Source: [where to get this]
   - Content: [extract or ask user]

3. **Core Context Documents**
   - Generated based on final structure

4. **Development Workflow**
   - From FluxFrame template (new)
   - Adapted for project specifics

5. **Pattern-Driven Development**
   - From FluxFrame template
   - Reference existing conventions: [path]
```

#### document_catalog.md

```markdown
# Creating document_catalog.md

**Sources from mapping (.fluxframe/detected_content_sources.md):**
- [Confirmed source 1]: [specific content mapped]

**Reading confirmed sources...**

**Sections to populate:**

1. **Core Context Documents Index**
   - Generated based on final structure

2. **Document Locations and Descriptions**
   - Source: [where to get this]
```

#### completion_protocol.md

```markdown
# Creating completion_protocol.md

**Sources from mapping (.fluxframe/detected_content_sources.md):**
- [Confirmed source 1]: [specific content mapped]

**Reading confirmed sources...**

**Sections to populate:**

1. **Task Completion Checklists**
   - From FluxFrame template (new)
   - Adapted for project specifics

2. **Document Update Procedures**
   - From FluxFrame template (new)
```

#### templates/change_request.md

```markdown
# Creating templates/change_request.md

**Sections to populate:**

1. **Change Request Template**
   - From FluxFrame template (new)
```

#### technical_status.md

```markdown
# Creating technical_status.md

**Sources being used:**
- [List source documents - STATUS.md, CHANGELOG, etc.]

**Sections to populate:**

1. **Current State**
   - Extracted from: [source]
   - Or: Ask user for current status

2. **Architecture Status**
   - Extracted from: [source]
   - Or: Inferred from codebase

3. **Recently Changed**
   - From: CHANGELOG / git history / existing status doc
   - Format: Adapt to FluxFrame structure

4. **Known Issues**
   - From: Issue tracker / existing docs
   - Format: Adapt to FluxFrame structure
```

#### patterns/

```markdown
# Creating patterns directory

**Migration strategy based on user choice:**

**If COPY from conventions/:**
- Copy convention docs
- Restructure to pattern format
- Add FluxFrame pattern metadata

**If MIGRATE from conventions/:**
- Transform to pattern format
- Create pattern index
- Redirect original location

**If REFERENCE:**
- Create pattern index
- Link to existing conventions
- Add FluxFrame-specific pattern workflow

**FluxFrame patterns to add (regardless):**
- Pattern template
- How to document patterns guide
```

### Step 3.5: Handle Bug Fixes / Change History

Special handling for existing bug fix documentation:

```markdown
## Bug Fix Migration

**Found:** [N] files in [location]

**Options presented to user:**

1. **Import into FluxFrame bugs/**
   - Copy/move files to `{{DOCS_DIR}}/bugs/`
   - Optionally reformat to FluxFrame template

2. **Keep in place, reference in FluxFrame**
   - Add reference in AGENTS.md and document_catalog.md
   - Create index in bugs/ pointing to original

3. **Archive and start fresh**
   - Archive existing to `archive/bugs/`
   - Start fresh with FluxFrame format

**User chose:** [option]

**Execution:**
[Based on choice, execute migration]
```

---

## Phase 4: Generate FluxFrame Configuration

### Step 4.1: Determine AI Tools

Ask user (if not already known):

```markdown
Which AI coding tools will you use?

1. Claude Code
2. Roo Code
3. Cline
4. Google Antigravity
5. Multiple (specify)
6. Other / Universal AGENTS.md only
```

### Step 4.2: Handle Existing AI Rules

If minimal AI rules exist (e.g., `.cursorrules`):

```markdown
I found existing AI rules: `.cursorrules`

Content:
```
[show content]
```

This appears to be [minimal/project-specific].

Options:
1. **Replace** - Use FluxFrame rules, discard existing
2. **Incorporate** - Add your rules to FluxFrame structure
3. **Keep separate** - Maintain both (may cause conflicts)

Your choice?
```

### Step 4.3: Generate AI Rules (to Staging Directory)

**CRITICAL: Generate to staging, NOT final locations**

During bootstrap, temporary "bootstrap-resume" rules exist at the final locations (CLAUDE.md, .clinerules, etc.). These tell the AI to continue bootstrap on restart.

To prevent project rules from interfering with bootstrap completion, generate ALL AI rules to a staging directory. They will be moved to final locations during Phase 7 (Cleanup).

**Staging directory:** `.fluxframe-pending/`

```bash
mkdir -p .fluxframe-pending
```

Create appropriate AI rules pointing to migrated/created documentation:

**`.fluxframe-pending/AGENTS.md` always created with:**
- Project context from migrated docs
- References to documentation in final locations
- FluxFrame workflows
- Links to patterns (however they're stored)

**Tool-specific rules (save to `.fluxframe-pending/`):**
- `.fluxframe-pending/CLAUDE.md` (if Claude Code)
- `.fluxframe-pending/.clinerules/` (if Cline Full)
- `.fluxframe-pending/.roomodes` (if Roo Code Full)
- `.fluxframe-pending/GEMINI.md` (if Antigravity)
- Based on user's tool selection
- Paths match migration decisions
- Full or basic integration as chosen

**Why staging?**
- Bootstrap-resume rules remain active throughout bootstrap
- Prevents project rules from interfering with bootstrap flow
- AI assistant continues to see "bootstrap in progress" instructions
- All rules are activated simultaneously during cleanup for clean transition

### Step 4.4: Generate MCP Server

Create MCP server configured for:
- Documentation path (based on location decision)
- Pattern library location
- Bug fixes location
- Any custom paths from migration

### Step 4.4.5: Seed Data Migration (ALWAYS)

**Purpose:** Ensure project has FluxFrame-standard seed data structure, migrating existing fixtures if found.

**If seed data/fixtures were found in Phase 1.5:**

Present migration options based on what was detected:

```markdown
## Seed Data Migration Options

I found existing test fixtures/seed data:
- Location(s): [DETECTED_LOCATIONS]
- Format: [FORMAT]
- Entities covered: [LIST]

**Migration Options:**

1. **Full Migration** - Move all fixtures to seed_data/ with FluxFrame organization
   - Preserves existing data
   - Reorganizes into fixtures/, samples/, factories/, schemas/
   - Updates test imports (may require code changes)

2. **Copy & Reorganize** - Copy to seed_data/, keep originals
   - Both locations coexist
   - Original tests unchanged
   - New FluxFrame structure available for AI context

3. **Symlink Integration** - Create seed_data/ with symlinks to existing locations
   - No file moves
   - Single source of truth
   - Tests unchanged

4. **Reference Only** - Create seed_data/README.md pointing to existing locations
   - Minimal changes
   - Documents where data lives
   - No reorganization

Your choice?
```

**If no seed data/fixtures were found:**

Create FluxFrame standard structure:
```bash
mkdir -p seed_data/fixtures
mkdir -p seed_data/samples
mkdir -p seed_data/factories
mkdir -p seed_data/schemas
```

Generate `seed_data/README.md` from template.

**For any choice, always:**
1. Create `seed_data/README.md` explaining the project's seed data approach
2. Update `patterns/data_patterns.md` with fixture and factory patterns
3. Add seed data section to AGENTS.md and document_catalog.md

**Content generation based on Q-Data answer:**
- **Full Setup:** Generate starter samples based on detected domain entities
- **Basic Structure:** Create directories with .gitkeep files
- **Minimal:** Just create seed_data/README.md

**Validation:**
- [ ] seed_data/ directory exists (or symlinks configured)
- [ ] seed_data/README.md explains the project's data approach
- [ ] Existing fixtures accessible (migrated, symlinked, or referenced)
- [ ] data_patterns.md includes seed data patterns
- [ ] No broken test imports (if fixtures were moved)

---

## Phase 4.5: Browser Automation Configuration (RECOMMENDED for Web Projects)

**This phase is RECOMMENDED for web projects where browser automation is desired.**

**Purpose:**
Configure browser automation capabilities for the AI assistant. For migration projects, this involves detecting existing test frameworks and integrating AI browser access alongside them.

---

### Step 4.5.1: Detect Existing Browser Testing

Check for existing browser testing frameworks:

```markdown
## Existing Browser Testing Analysis

**Checking for existing test frameworks...**

**Test Frameworks Found:**
- [ ] Playwright (check for `playwright.config.js`, `@playwright/test` in package.json)
- [ ] Cypress (check for `cypress.config.js`, `cypress/` directory)
- [ ] Selenium (check for `selenium` dependencies)
- [ ] Puppeteer standalone (check for `puppeteer` in dependencies)
- [ ] TestCafe (check for `.testcaferc.json`)
- [ ] None detected

**Existing Test Structure:**
| Framework | Version | Test Location | Status |
|-----------|---------|---------------|--------|
| [Framework] | [version] | [path] | [Active/Deprecated] |

**Test Coverage:**
- E2E tests: [Yes/No] - [count if yes]
- Integration tests: [Yes/No]
- Visual regression: [Yes/No]
```

### Step 4.5.2: Research Current AI Browser Capabilities (RECOMMENDED)

**Browser automation for AI assistants is rapidly evolving.** Offer to research:

```markdown
Your project has [existing test framework / no existing framework].

I can research the latest browser automation capabilities for AI assistants 
to help you set up optimal testing and debugging workflows.

Research will cover:
- Current AI assistant browser features (Claude Code Chrome, Cline/Roo Puppeteer)
- Recent capability announcements
- Compatibility with your existing test framework
- Best practices for coexistence

Selected AI tools to research:
[List user's AI tools from earlier detection]

Proceed with research? (yes/skip)
```

**If user chooses research, follow the process from greenfield Step 9.5:**
- Search official documentation for each tool
- Check recent announcements (last 3-6 months)
- Compile research report
- Save to `{{DOCS_DIR}}/browser_automation_research.md`

### Step 4.5.3: Present Configuration Options

Based on detection and research (if performed):

```markdown
## Browser Automation Options

**Current State:**
[Summarize findings from detection and research]

**Configuration Options:**

1. **Keep existing tests only** - No AI browser automation
   - Your test framework continues as-is
   - AI writes/maintains tests but doesn't interact directly
   - Best for: Projects with comprehensive test coverage
   
2. **Add AI browser access alongside tests** - Coexistence approach
   - Keep your existing test framework
   - Add AI assistant browser access (Chrome/Puppeteer)
   - AI can debug live + run automated tests
   - Best for: Development + testing workflows
   
3. **Full AI browser setup** - Comprehensive configuration
   - Configure all AI browser capabilities
   - Document relationship with existing tests
   - Create guidelines for when to use each
   - Best for: Teams wanting full AI integration
   
4. **Add AI browser (no existing tests)** - First-time setup
   - Configure AI browser automation from scratch
   - Follow greenfield setup process
   - Best for: Projects without test frameworks
   
5. **Skip** - No browser automation for AI

Your choice (1-5):
```

### Step 4.5.4: Execute Based on Choice

**For "Keep existing tests only" (Option 1):**
- Document existing test framework in technical_status.md
- Note that AI assistance is limited to writing/maintaining tests
- No AI rules changes for browser automation

**For "Add AI browser access alongside tests" (Option 2):**
- Keep existing test framework untouched
- Add browser automation sections to AI rules
- Document the distinction in configuration:
  ```markdown
  ## Testing & Browser Access
  
  ### Automated Tests (Existing Framework)
  **Framework:** [Playwright/Cypress/etc.]
  **Purpose:** CI/CD, regression testing, release verification
  **Location:** `[test_directory]/`
  **Run:** `[test command]`
  
  ### AI Assistant Browser Access
  **Tools:** Claude Code Chrome / Cline Puppeteer
  **Purpose:** Live debugging, interactive testing during development
  **Usage:** Available during AI-assisted development
  **Limitation:** Cannot access authenticated sessions (Puppeteer only)
  
  **When to Use Which:**
  | Need | Method |
  |------|--------|
  | Debug during development | AI browser access |
  | Verify feature before commit | Run test suite |
  | CI/CD validation | Automated tests |
  | Visual regression | Test framework |
  ```

**For "Full AI browser setup" (Option 3):**
- Configure comprehensive browser automation
- Implement research findings
- Create detailed documentation showing both methods
- Update AI rules with browser capabilities

**For "Add AI browser (no existing tests)" (Option 4):**
- Follow project_questionnaire.md browser automation section
- Implement as greenfield setup
- Consider recommending test framework for CI/CD

**For "Skip" (Option 5):**
- No changes
- Can revisit later

### Step 4.5.5: Update AI Rules with Browser Configuration

If browser automation is added, update AGENTS.md and tool-specific rules:

```markdown
## Browser Automation

**Status:** [Configured/Integrated/Not configured]

**AI Assistant Browser Access:**

### Claude Code (if applicable)
**Chrome Integration:** [Enabled/Available/Not configured]
- Chrome browser + Claude in Chrome extension v1.0.36+
- Setup: `claude --chrome`
- Capabilities: Navigate, click, console logs, authenticated sessions, GIF recording
- **Use for:** Live debugging during development

### Cline/Roo Code (if applicable)
**Puppeteer Browser:** [Enabled/Available/Not configured]
- Headless browser for local testing
- Capabilities: Navigate, click, screenshots, console logs
- **Use for:** Local dev server testing, visual verification

### Existing Test Framework (if applicable)
**Framework:** [Playwright/Cypress/etc.]
- Location: `[test_directory]/`
- Purpose: Automated testing, CI/CD
- Run: `[test command]`
- **Use for:** Pre-commit verification, release testing

**Coexistence Strategy:**
- AI browser access: Development and debugging
- Test framework: Verification and CI/CD
- Both complement each other, serve different purposes

See `{{DOCS_DIR}}/browser_automation_setup.md` for detailed configuration (if created).
```

**Validation:**
- [ ] Existing test framework detected and documented
- [ ] Research performed if requested
- [ ] Configuration preference recorded
- [ ] Changes implemented per user choice
- [ ] AI rules updated if applicable
- [ ] Coexistence documented if both methods present

---

## Phase 4.6: Configure Log Access (OPTIONAL)

**This phase is OPTIONAL based on user's Q11 answer (Observability & Log Access).**

**When to Execute:**
- User chose option 1 (Full setup) or option 2 (Local only) in Q11
- Skip if user chose option 3 (Later) or option 4 (No)

**Purpose:**
Configure AI assistant access to logs from various environments for debugging and troubleshooting. For migration projects, this may involve integrating with existing logging infrastructure.

---

### Step 4.5.1: Detect Existing Logging Setup

Before configuring, check if project has existing logging:

```markdown
## Existing Logging Analysis

**Checking for existing log configuration...**

**Found:**
- [ ] Log aggregator config (e.g., `datadog.yaml`, `splunk.conf`)
- [ ] Application logging config (e.g., `logging.conf`, `winston.config.js`)
- [ ] Docker/compose log settings
- [ ] Cloud logging setup (CloudWatch, Cloud Logging, etc.)
- [ ] CI/CD log configuration

**Existing Setup:**
| Component | Status | Location/Config |
|-----------|--------|-----------------|
| App Logs | [Found/Not Found] | [path or "N/A"] |
| Infra Logs | [Found/Not Found] | [path or "N/A"] |
| CI/CD Logs | [Found/Not Found] | [platform] |
| Monitoring | [Found/Not Found] | [service] |
```

### Step 4.5.2: Ask Integration Preference

```markdown
I found existing logging setup in your project:
[LIST FINDINGS]

For AI assistant log access, would you like to:

1. **Integrate with existing** - Use your current logging setup
   - AI accesses logs through your existing tools/APIs
   - No additional setup needed
   
2. **Enhance existing** - Add AI-specific access methods
   - Keep your setup, add MCP tool access
   - May need additional credentials
   
3. **Configure separately** - New log access just for AI
   - Doesn't interfere with existing setup
   - Parallel access method
   
4. **Skip** - No AI log access configuration

Your choice (1-4):
```

### Step 4.5.3: Research and Configure

Based on user's choice and infrastructure (from Q8-Q10), research and configure appropriate log access methods.

**For "Integrate with existing":**
- Document existing log access methods
- Create MCP tool wrappers for existing commands
- Note any credential requirements

**For "Enhance existing":**
- Research additional access options
- Add MCP tools that complement existing setup
- Document both methods in `log_access_setup.md`

**For "Configure separately":**
- Follow standard log access setup (see greenfield Step 9.6)
- Document as additional/parallel access method

### Step 4.5.4: Document Configuration

Create or update `{{DOCS_DIR}}/log_access_setup.md`:

```markdown
# Log Access Configuration

## Integration with Existing Setup

**Your existing logging:**
- [Document what was found]

**AI assistant access method:**
- [Document how AI accesses logs]

## Configured Sources

| Source | Environment | Access Method | Status |
|--------|-------------|---------------|--------|
| [source] | [env] | [method] | [status] |

## How to Use

### From AI Assistant
[Document MCP tool usage]

### Existing Methods (Preserved)
[Document existing log access if user kept it]

## Credentials Required
[List any credentials needed for log access]
```

**Validation:**
- [ ] Existing logging setup documented
- [ ] Integration preference recorded
- [ ] Log access configured per user preference
- [ ] Documentation created in `log_access_setup.md`

---

### Step 4.8: Generate FluxFrame Manual (REQUIRED)

**Purpose:** Create a persistent manual that explains how to work with FluxFrame.

**Source:** `doc-templates/fluxframe_manual.template.md`

**Output:** `FLUXFRAME_MANUAL.md` (in project root)

**Handling Existing Manual:**
Check if `FLUXFRAME_MANUAL.md` already exists.
- **If exists:** Ask user: "Replace, Append, or Skip?"
- **If new:** Generate from template.

**Validation:**
- [ ] Manual created at project root
- [ ] Tool sections match selected tools
- [ ] Documentation links point to correct locations

---

## Phase 5: Establish AI Workflow

### Step 5.1: Create Workflow Documentation

Even if user had no workflow docs, create:

```
{{DOCS_DIR}}/workflows/
├── README.md              # Index of workflows
├── cycle_workflow.md      # Development cycle methodology
└── change_request_protocol.md  # Bug fix protocol
```

### Step 5.2: Integrate with Existing Processes

If project has existing processes (from ADRs, CONTRIBUTING.md, etc.):

```markdown
## Process Integration

**Your existing processes:**
- [List detected processes from docs]

**FluxFrame workflows:**
- Development cycles
- Change request protocol
- Pattern-driven development

**Integration approach:**
- FluxFrame workflows reference your processes
- Where overlap exists, [merge/defer to yours/use FluxFrame]
- Document how they work together

**Example integration:**
Your ADR process remains for architecture decisions.
FluxFrame cycle workflow includes step: "Create ADR if architecture change"
```

### Step 5.3: Generate Implementation Plan

Create `ROADMAP.md` based on:
- Existing roadmap (if found)
- Existing backlog (if found)
- Or: Template with placeholder for user to fill

### Step 5.4: Generate FluxFrame Guide (REQUIRED)

**Purpose:** Create a persistent guide that remains after bootstrap, explaining how to work with FluxFrame and keep rules updated.

**Source:** `doc-templates/fluxframe_manual.template.md`

**Output:** `FLUXFRAME_MANUAL.md` (in project root)

**Process:**
1. Read template file
2. Replace all placeholders (see greenfield Step 7.5 for full placeholder details):
   - `{{DOCS_DIR}}` → Documentation directory path
   - `{{AI_TOOLS_SECTION}}` → List of configured AI tools with integration levels
   - `{{TOOL_SPECIFIC_FILES}}` → Tool-specific file references
   - `{{API_APPROACH_SECTION}}` → Chosen API contract approach
3. Customize based on migrated documentation structure
4. Reference any existing documentation that was kept alongside FluxFrame

**Validation:**
- [ ] File created at `FLUXFRAME_MANUAL.md` (in project root)
- [ ] All placeholders replaced
- [ ] Tool sections match configured tools
- [ ] References existing/migrated documentation correctly

---

## Phase 6: Validation and Handoff

### Step 6.1: Validate Migration

```markdown
## Migration Validation Checklist

### Documentation Structure
- [ ] All chosen migrations completed
- [ ] References working (links not broken)
- [ ] No orphaned documentation
- [ ] FluxFrame docs in place

### Content Validation
- [ ] AGENTS.md complete and accurate
- [ ] document_catalog.md complete and accurate
- [ ] completion_protocol.md complete and accurate
- [ ] templates/change_request.md complete and accurate
- [ ] technical_status.md reflects current state
- [ ] patterns/ has initial content or index
- [ ] workflows/ has FluxFrame protocols
- [ ] bugs/ structure in place
- [ ] reference_library/ structure created with README.md
- [ ] Existing research/correspondence migrated or referenced (if applicable)

### AI Configuration
- [ ] AGENTS.md created with correct paths
- [ ] Tool-specific rules created
- [ ] MCP server configured and tested
- [ ] Rules reference correct documentation paths

### Backup Verification
- [ ] Backup exists at `.fluxframe-backup/[timestamp]/`
- [ ] Backup contains all original docs
- [ ] Rollback instructions documented
```

### Step 6.2: Present Migration Summary

```markdown
## FluxFrame Migration Complete

### Migration Summary

**Documentation migrated:**
| Category | Decision | From | To |
|----------|----------|------|-----|
| [category] | [Copy/Migrate/Reference] | [from] | [to] |
| ... | ... | ... | ... |

**New documentation created:**
- `AGENTS.md` - Single source of truth
- `document_catalog.md` - Core context document index
- `completion_protocol.md` - Task completion checklists
- `templates/change_request.md` - Change request template
- `technical_status.md` - Project status tracking
- `ROADMAP.md` - Development roadmap
- `workflows/` - Development protocols

**AI Configuration:**
- Created `AGENTS.md` as universal baseline
- [Created tool-specific configs based on selection]
- MCP server configured at `mcp-server.js`

### Documentation Structure (Final)

```
[project root]
├── [docs location]/
│   ├── document_catalog.md
│   ├── completion_protocol.md
│   ├── templates/
│   │   └── change_request.md
│   ├── technical_status.md
│   ├── ROADMAP.md
│   ├── patterns/
│   │   └── [migrated or new]
│   ├── workflows/
│   │   ├── cycle_workflow.md
│   │   └── change_request_protocol.md
│   └── bugs/
│       └── [migrated or indexed]
├── [original docs if kept]/
│   └── [referenced content]
├── AGENTS.md
├── [tool-specific rules]
└── mcp-server.js
```

### Backup Location
Your original documentation was backed up to:
`.fluxframe-backup/[timestamp]/`

### Next Steps

1. **Review migrated content**
   - Check that extracted content is accurate
   - Fill in any gaps marked with [TODO]
   
2. **Test MCP server**
   - Run `npm run mcp` or `node mcp-server.js`
   - Verify it finds your documentation

3. **Test AI workflow**
   - Start a conversation with your AI tool
   - Ask it about the project - it should find context
   
4. **Begin first FluxFrame cycle**
   - Define Cycle 1.1 in ROADMAP.md
   - Follow the development cycle workflow
```

### Step 6.3: Document Maintenance

Provide guidance on maintaining the new structure:

```markdown
## Ongoing Maintenance

### Documentation Updates
- When updating project info → Update `AGENTS.md` and `document_catalog.md`
- When completing work → Update `technical_status.md`
- When fixing bugs → Add to `bugs/` (after confirmed)
- When establishing patterns → Add to `patterns/`

### If You Chose "Reference" Strategy
- Your original docs at `[location]` are still source of truth for [categories]
- FluxFrame docs link to them - keep those links updated
- Consider gradually migrating to FluxFrame structure over time

### If You Kept Parallel Structures
- Watch for documentation drift between old and new locations
- Consider deprecation timeline for old structure
- FluxFrame docs should be authoritative for AI assistance
```

---

## Special Cases

### Case: ADR-Heavy Project

For projects using Architecture Decision Records:

```markdown
## ADR Integration Strategy

ADRs serve a different purpose than FluxFrame docs:
- ADRs: Record WHY decisions were made
- FluxFrame: Record WHAT to do and HOW

**Recommended approach:**
1. Keep ADRs in place (don't migrate)
2. Reference ADRs from AGENTS.md and document_catalog.md
3. Extract relevant patterns from ADRs into patterns/
4. For new architectural decisions: Continue using ADR process

**Example reference in AGENTS.md:**
```markdown
## Architecture Decisions

This project uses ADRs. See `docs/ADRs/` for complete decision history.

Key decisions affecting development:
- [ADR-001](../docs/ADRs/001-use-graphql.md): GraphQL for API
- [ADR-007](../docs/ADRs/007-state-management.md): Redux for state
```
```

### Case: Wiki-Style Documentation

For projects with wiki documentation:

```markdown
## Wiki Integration Strategy

Wikis are often:
- Sprawling and interlinked
- Not easily structured into FluxFrame format
- Valuable but hard to migrate

**Recommended approach:**
1. Create FluxFrame docs as "AI context layer"
2. Reference wiki for detailed information
3. Gradually migrate high-value pages to patterns/
4. Use wiki for onboarding, FluxFrame for AI context

**In AGENTS.md:**
```markdown
## Detailed Documentation

For detailed information, see the project wiki: `[wiki_location]`

Key wiki pages:
- [Getting Started](wiki/getting-started.md)
- [Architecture Overview](wiki/architecture.md)
```
```

### Case: Monorepo with Multiple Docs

For monorepos:

```markdown
## Monorepo Documentation Strategy

**Structure detected:**
```
repo/
├── package-a/docs/
├── package-b/docs/
└── docs/  (root-level)
```

**Options:**
1. **Central FluxFrame docs** - One `project_docs/` at root, covers all
2. **Per-package docs** - FluxFrame in each package
3. **Hybrid** - Root for project-wide, per-package for specifics

**Recommended:** Option 3 (Hybrid)
- Root `project_docs/` for overall context, shared patterns
- Package-specific docs for package-specific patterns
- AI rules at root reference all locations
```

### Case: Existing Changelog

For projects with CHANGELOG.md:

```markdown
## Changelog Integration

**Don't migrate CHANGELOG.md**

Rationale:
- CHANGELOG follows standard format (Keep-a-changelog)
- Users/consumers expect CHANGELOG.md at root
- FluxFrame technical_status.md serves different purpose

**Instead:**
- Keep CHANGELOG.md for release history
- Reference from technical_status.md:
  ```markdown
  ## Recently Changed
  
  See [CHANGELOG.md](../CHANGELOG.md) for release history.
  
  ### Development Changes (Not Yet Released)
  [Track in-progress work here]
  ```
```

---

## Rollback Instructions

If migration needs to be undone:

```bash
# 1. Restore documentation from backup
cp -r .fluxframe-backup/[timestamp]/docs/* [original_docs_location]/

# 2. Remove FluxFrame documentation
rm -rf project_docs/  # if was created new
# OR restore original state if migrated into existing location

# 3. Remove AI rules
rm AGENTS.md
rm -rf .clinerules/
rm CLAUDE.md
rm .roomodes
# ... etc

# 4. Remove MCP server (if added)
rm mcp-server.js
# Remove from package.json if added there

# Your project is now back to pre-FluxFrame state
```

Include this in handoff documentation.

---

## Migration Checklist Summary

Before marking migration complete:

- [ ] All user preferences recorded and honored
- [ ] Content migrated/copied/referenced as chosen
- [ ] FluxFrame core documents created
- [ ] AI rules generated with correct paths
- [ ] MCP server configured and tested
- [ ] **All decisions logged via `log_decision` tool**
- [ ] **`sync_decisions_to_file` called to generate `bootstrap_decisions.md`**
- [ ] Backup created and verified
- [ ] Rollback instructions provided
- [ ] User has reviewed and approved result

---

## Phase 7: Finalize Bootstrap (Atomic)

**MANDATORY:** After user approves validation, finalization happens automatically. Do NOT ask for additional confirmation.

### Why Finalization Is Atomic

Previous bootstrap iterations suffered from "soft completion" - agents would ask for cleanup confirmation, the user would context-switch, and cleanup never happened. The `finalize_bootstrap` MCP tool handles everything in one call.

### Step 7.1: Verify Ready

Before calling finalization, verify:
- `.fluxframe-pending/` directory has `AGENTS.md` and tool-specific rules
- `mcp-server.js` exists at project root
- `{{DOCS_DIR}}/` exists with generated documentation

If anything is missing, fix it first. Otherwise, proceed immediately.

### Step 7.2: Execute Finalization

Call the `finalize_bootstrap` MCP tool. This atomically:

1. **Activates project rules** - moves from `.fluxframe-pending/` to final locations
2. **Removes FluxFrame templates** - deletes `fluxframe/`, `.fluxframe-pending/`, `BOOTSTRAP_INSTRUCTIONS.md`
3. **Updates README.md** - replaces with project-specific content
4. **Cleans up state** - removes `.fluxframe-bootstrap-state.json`

Note: `.fluxframe-backup/` is preserved for rollback. Original documentation locations are untouched.

After the tool completes:
1. Call `sync_decisions_to_file` one final time
2. Show the user the finalization summary
3. **CRITICAL: Walk the user through the MCP config swap interactively.** The `finalize_bootstrap` response includes a `mcpSwapGuide` object — use it.

### Step 7.3: Guided MCP Config Swap

Do NOT just print a generic "update your config" message. The user may not know what an MCP config is. Follow these steps:

1. **Explain what's happening:** Tell the user: *"I now need to help you switch from the bootstrap MCP server to your project's own MCP server. This is the last step before you're fully set up."*

2. **For each detected AI tool** (from `mcpSwapGuide.detectedTools`):
   - Show the **exact config file path** (e.g., "Open the file at `<path>`")
   - Show the **exact JSON** to paste (from `mcpSwapGuide.newMcpConfigJson`)
   - Explain they should **replace** the `fluxframe-bootstrap` entry, not add alongside it

3. **Offer to write the file for them.** If the config file is inside the project directory, say: *"I can update this file for you right now, or you can do it manually. Which do you prefer?"* If they say yes, write the file.

4. **Give tool-specific restart instructions** (e.g., "Close and reopen your terminal / Claude Code session completely"). Be explicit, not vague.

5. **Tell them what to expect after restart:** *"After restarting, your project MCP tools will be available (cycle planning, status updates, etc.) and your AI rules will guide development."*

6. **Remind them of next steps:**
   - *"Your backup is available at `.fluxframe-backup/` if you need to roll back."*
   - *"Your first step after restart is to define Cycle 1.1 in `{{DOCS_DIR}}/ROADMAP.md`."*
   - When ready, use the two-tier planning system: `start_cycle_planning("1.1")` → `analyze_cycle_scope()` → `create_cycle_plan("1.1", "Cycle Name")` → `approve_cycle_plan("1.1")`

7. **Stay available.** Do NOT end the conversation until the user confirms the swap is done or says they'll do it later. Help troubleshoot if needed.

---

## Two-Tier Planning System

This project uses a two-tier implementation planning approach:

### Tier 1: ROADMAP.md (Strategic Roadmap)
- Lists ALL planned cycles with brief descriptions
- Tracks status: 📋 PLANNING → 🏗️ IN PROGRESS → ✅ COMPLETE
- Provides timeline estimates and dependencies

### Tier 2: roadmap/ (Tactical Plans)
- Created JUST-IN-TIME when ready to implement a cycle
- Contains detailed research, scope analysis, technical design
- Includes decomposition if feature is too large
- Requires user approval before implementation begins

### Planning MCP Tools
- `start_cycle_planning(cycle_id)` - Initiate planning, get research guidance
- `analyze_cycle_scope(...)` - Assess complexity, get decomposition recommendations
- `create_cycle_plan(cycle_id, name)` - Create detailed plan from template
- `approve_cycle_plan(cycle_id)` - Validate and mark ready for implementation

---

## Final Success Criteria (After Finalization)

Migration is fully complete when:

1. ✅ All user migration preferences honored
2. ✅ Content migrated/copied/referenced as chosen
3. ✅ FluxFrame core documents created
4. ✅ AI rules generated with correct paths
5. ✅ MCP server configured and tested
6. ✅ User can read generated docs (Read `FLUXFRAME_GETTING_STARTED.md` first)
7. ✅ **All decisions logged with reasoning** (bootstrap_decisions.md in docs directory)
7. ✅ Template files cleaned up (via `finalize_bootstrap`)
8. ✅ README.md updated for project
9. ✅ Backup preserved for rollback
10. ✅ User has reviewed and approved result
11. ✅ Ready to define Cycle 1.1 using two-tier planning system

