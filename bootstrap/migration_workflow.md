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
  decision: "Reference ADRs from context_master_guide instead of migrating",
  reasoning: "ADRs serve a different purpose (recording WHY decisions were made) than FluxFrame docs (WHAT to do). Team actively uses ADR process and wants to continue.",
  alternatives: ["Copy ADR content into patterns/", "Migrate ADRs to FluxFrame structure"],
  implications: "context_master_guide will link to ADRs directory. Team continues existing ADR workflow for architectural decisions."
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
| `docs/architecture/OVERVIEW.md` | `context_master_guide.md` | Partial - needs expansion |
| `docs/ADRs/` | Could inform `patterns/` | Different purpose - reference |
| `docs/STATUS.md` | `technical_status.md` | Good match - migrate |
| `docs/api/` | `api_contract_standards.md` | Partial - needs structuring |
| `CHANGELOG.md` | Part of `technical_status.md` | Reference |
| `docs/conventions/` | `patterns/` | Good match - migrate |
| None found | `implementation_plan.md` | Create new |
| None found | `workflows/` | Create new |
```

### Step 1.4: Identify Content for Each FluxFrame Document

**context_master_guide.md needs:**
- Project overview (from: ___)
- Architecture decisions (from: ___)
- Tech stack details (from: ___)
- Key workflows (from: ___)

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
- [ ] `context_master_guide.md` - [Create/Adapt existing]
- [ ] `technical_status.md` - [Create/Adapt existing]
- [ ] `implementation_plan.md` - [Create]
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
- Environments marked "Needs Setup" will be added to implementation_plan.md
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
- [ ] `context_master_guide.md` - Single source of truth for project context
- [ ] `technical_status.md` - Real-time project state tracking
- [ ] `implementation_plan.md` - Development roadmap with cycles
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

## Phase 3: Execute Migration

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
mkdir -p project_docs/{patterns,workflows,implementation_plans,bug_fixes}

# If using existing location
mkdir -p [detected_path]/{patterns,workflows,implementation_plans,bug_fixes}
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

1. Read all source files
2. Transform content to FluxFrame format
3. Write to FluxFrame location
4. Create redirect/note in original location:
   ```markdown
   # Moved to FluxFrame Structure
   
   This documentation has been migrated to: `[new_path]`
   
   See: [link to new location]
   ```
5. Delete original files (after user confirms migration worked)

**Source:** `[original_path]`
**Target:** `[fluxframe_path]`
**Files migrated:**
- [List migrated files]
```

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

For each FluxFrame document, based on migration decisions:

#### context_master_guide.md

```markdown
# Creating context_master_guide.md

**Sources being used:**
- [List source documents]

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

6. **Change Request Protocol**
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

1. **Import into FluxFrame bug_fixes/**
   - Copy/move files to `{{DOCS_DIR}}/bug_fixes/`
   - Optionally reformat to FluxFrame template

2. **Keep in place, reference in FluxFrame**
   - Add reference in context_master_guide
   - Create index in bug_fixes/ pointing to original

3. **Archive and start fresh**
   - Archive existing to `archive/bug_fixes/`
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

Create `implementation_plan.md` based on:
- Existing roadmap (if found)
- Existing backlog (if found)
- Or: Template with placeholder for user to fill

### Step 5.4: Generate FluxFrame Guide (REQUIRED)

**Purpose:** Create a persistent guide that remains after bootstrap, explaining how to work with FluxFrame and keep rules updated.

**Source:** `doc-templates/fluxframe_guide.template.md`

**Output:** `{{DOCS_DIR}}/fluxframe_guide.md`

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
- [ ] File created at `{{DOCS_DIR}}/fluxframe_guide.md`
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
- [ ] context_master_guide.md complete and accurate
- [ ] technical_status.md reflects current state
- [ ] patterns/ has initial content or index
- [ ] workflows/ has FluxFrame protocols
- [ ] bug_fixes/ structure in place

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
- `context_master_guide.md` - Single source of truth
- `technical_status.md` - Project status tracking
- `implementation_plan.md` - Development roadmap
- `workflows/` - Development protocols

**AI Configuration:**
- Created `AGENTS.md` as universal baseline
- [Created tool-specific configs based on selection]
- MCP server configured at `mcp-server.js`

### Documentation Structure (Final)

```
[project root]
├── [docs location]/
│   ├── context_master_guide.md
│   ├── technical_status.md
│   ├── implementation_plan.md
│   ├── patterns/
│   │   └── [migrated or new]
│   ├── workflows/
│   │   ├── cycle_workflow.md
│   │   └── change_request_protocol.md
│   └── bug_fixes/
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
   - Define Cycle 1.1 in implementation_plan.md
   - Follow the development cycle workflow
```

### Step 6.3: Document Maintenance

Provide guidance on maintaining the new structure:

```markdown
## Ongoing Maintenance

### Documentation Updates
- When updating project info → Update `context_master_guide.md`
- When completing work → Update `technical_status.md`
- When fixing bugs → Add to `bug_fixes/` (after confirmed)
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
2. Reference ADRs from context_master_guide.md
3. Extract relevant patterns from ADRs into patterns/
4. For new architectural decisions: Continue using ADR process

**Example reference in context_master_guide.md:**
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

**In context_master_guide.md:**
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

## Phase 7: Cleanup and Activate Project Rules

**CRITICAL:** After user confirms migration is complete and working:
1. **Activate project rules** by moving from staging to final locations
2. **Remove FluxFrame template files** that are no longer needed

### Why This Two-Step Process

During bootstrap, temporary "bootstrap-resume" rules existed at final locations (CLAUDE.md, AGENTS.md, etc.) telling the AI to continue bootstrap on restart. The REAL project rules were generated to `.fluxframe-pending/` staging directory.

Now we:
1. Replace temporary bootstrap-resume rules with real project rules
2. Remove all FluxFrame template/framework files

### Step 7.1: Present Cleanup Summary

Ask user for confirmation:

```markdown
## Cleanup: Activate Project Rules & Remove Templates

Your migration is complete. I'll now:
1. **Activate your project's AI rules** (move from staging to final locations)
2. **Remove FluxFrame template files** that are no longer needed

### AI Rules to ACTIVATE (move from staging):
- `.fluxframe-pending/AGENTS.md` → `AGENTS.md`
- `.fluxframe-pending/CLAUDE.md` → `CLAUDE.md` (if generated)
- `.fluxframe-pending/.clinerules/` → `.clinerules/` (if generated)
- `.fluxframe-pending/.roomodes` → `.roomodes` (if generated)
- `.fluxframe-pending/GEMINI.md` → `GEMINI.md` (if generated)
- `.fluxframe-pending/.claude/` → `.claude/` (if generated)
- `.fluxframe-pending/.roo/` → `.roo/` (if generated)

### Files to REMOVE (redundant templates):
- `fluxframe/` - The entire FluxFrame directory (bootstrap complete)
- `.fluxframe-pending/` - Staging directory (after moving files)
- `.fluxframe-bootstrap-state.json` - Bootstrap state tracking (optional: keep as record)

### Files that STAY (your project files):
- `{{DOCS_DIR}}/` - Your project documentation
- `[your original docs location]/` - Your existing documentation (if referenced)
- `AGENTS.md` - Your AI baseline rules (activated from staging)
- `[tool-specific files]` - Your tool configurations (activated from staging)
- `mcp-server.js` - Your MCP server
- `package.json` - Your project config
- `README.md` - Your project readme (will be updated)
- `.fluxframe-backup/` - Your backup (keep until confident)

Shall I activate your project rules and remove the template files now?
```

### Step 7.2: Activate Project Rules (Move from Staging)

**CRITICAL: Do this BEFORE removing FluxFrame directory**

**Commands (Unix/macOS):**
```bash
# Move AI rules from staging to final locations
# (overwrites temporary bootstrap-resume rules)

# Universal baseline - always present
mv .fluxframe-pending/AGENTS.md ./AGENTS.md

# Claude Code (if generated)
[ -f .fluxframe-pending/CLAUDE.md ] && mv .fluxframe-pending/CLAUDE.md ./CLAUDE.md
[ -d .fluxframe-pending/.claude ] && rm -rf .claude && mv .fluxframe-pending/.claude ./.claude

# Cline (if generated)
[ -d .fluxframe-pending/.clinerules ] && rm -rf .clinerules && mv .fluxframe-pending/.clinerules ./.clinerules
[ -f .fluxframe-pending/.clinerules ] && mv .fluxframe-pending/.clinerules ./.clinerules

# Roo Code (if generated)
[ -f .fluxframe-pending/.roomodes ] && mv .fluxframe-pending/.roomodes ./.roomodes
[ -d .fluxframe-pending/.roo ] && rm -rf .roo && mv .fluxframe-pending/.roo ./.roo

# Antigravity (if generated)
[ -f .fluxframe-pending/GEMINI.md ] && mv .fluxframe-pending/GEMINI.md ./GEMINI.md

# Cursor (if generated)
[ -f .fluxframe-pending/.cursorrules ] && mv .fluxframe-pending/.cursorrules ./.cursorrules
```

**Commands (Windows PowerShell):**
```powershell
# Move AI rules from staging to final locations
Move-Item -Force .fluxframe-pending\AGENTS.md .\AGENTS.md

if (Test-Path .fluxframe-pending\CLAUDE.md) { Move-Item -Force .fluxframe-pending\CLAUDE.md .\CLAUDE.md }
if (Test-Path .fluxframe-pending\.claude) { Remove-Item -Recurse -Force .\.claude -ErrorAction SilentlyContinue; Move-Item -Force .fluxframe-pending\.claude .\.claude }

if (Test-Path .fluxframe-pending\.clinerules) { Remove-Item -Recurse -Force .\.clinerules -ErrorAction SilentlyContinue; Move-Item -Force .fluxframe-pending\.clinerules .\.clinerules }

if (Test-Path .fluxframe-pending\.roomodes) { Move-Item -Force .fluxframe-pending\.roomodes .\.roomodes }
if (Test-Path .fluxframe-pending\.roo) { Remove-Item -Recurse -Force .\.roo -ErrorAction SilentlyContinue; Move-Item -Force .fluxframe-pending\.roo .\.roo }

if (Test-Path .fluxframe-pending\GEMINI.md) { Move-Item -Force .fluxframe-pending\GEMINI.md .\GEMINI.md }
if (Test-Path .fluxframe-pending\.cursorrules) { Move-Item -Force .fluxframe-pending\.cursorrules .\.cursorrules }
```

### Step 7.3: Remove FluxFrame Template Files

**Commands (Unix/macOS):**
```bash
# Remove the FluxFrame directory entirely
rm -rf fluxframe/

# Remove staging directory (should be empty or nearly empty now)
rm -rf .fluxframe-pending/

# Optional: Remove or keep bootstrap state as a record
rm -f .fluxframe-bootstrap-state.json

# Keep backup until user is confident: .fluxframe-backup/
```

**Commands (Windows PowerShell):**
```powershell
Remove-Item -Recurse -Force fluxframe -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .fluxframe-pending -ErrorAction SilentlyContinue
Remove-Item -Force .fluxframe-bootstrap-state.json -ErrorAction SilentlyContinue
# Keep .fluxframe-backup until user is confident
```

### Step 7.4: Update README.md

Replace FluxFrame's README with project-specific content:

```markdown
# [PROJECT_NAME]

[PROJECT_PURPOSE]

## Quick Start

[Basic setup instructions]

## Development

This project uses the FluxFrame methodology for AI-assisted development.

### Documentation
- See `{{DOCS_DIR}}/context_master_guide.md` for development guidelines
- See `{{DOCS_DIR}}/technical_status.md` for current project state
- [If applicable] See `[original_docs_location]/` for [category] documentation

### AI Assistance
- MCP Server: `npm run mcp`
- AI Rules: See `AGENTS.md` and tool-specific configurations

## License

[License information]
```

### Step 7.5: Verify Cleanup Complete

```bash
# Verify only project files remain
ls -la

# Verify AI rules are now the real project rules (not bootstrap-resume)
head -5 AGENTS.md  # Should NOT say "Bootstrap In Progress"

# Test MCP server still works
node mcp-server.js

# Verify docs still accessible
ls {{DOCS_DIR}}/

# Verify migrated/referenced content still accessible
ls [original_docs_location]/  # if kept

# Verify staging and fluxframe directories are gone
[ -d .fluxframe-pending ] && echo "ERROR: staging still exists" || echo "OK: staging removed"
[ -d fluxframe ] && echo "ERROR: fluxframe still exists" || echo "OK: fluxframe removed"

# Verify backup is still available
ls .fluxframe-backup/
```

**Validation:**
- [ ] Only project files remain
- [ ] No `fluxframe/` directory
- [ ] No `.fluxframe-pending/` directory
- [ ] `AGENTS.md` contains real project rules (not "Bootstrap In Progress")
- [ ] Tool-specific rules (CLAUDE.md, .clinerules, etc.) contain real project rules
- [ ] MCP server still works
- [ ] FluxFrame documentation accessible
- [ ] Original documentation accessible (if referenced)
- [ ] Backup still available at `.fluxframe-backup/`

### Step 7.6: Final Confirmation

```markdown
## ✅ Migration Complete!

Your project's AI rules are now active, and FluxFrame template files have been removed.

### What Was Done:
1. **Migrated your documentation** to FluxFrame structure
2. **Generated project rules** with references to your content
3. **Activated rules** - moved from staging to final locations
4. **Removed templates** - FluxFrame directory and staging cleaned up

### Your Project Now Contains:
- Your migrated documentation in `{{DOCS_DIR}}/`
- Your bootstrap decisions log (`{{DOCS_DIR}}/bootstrap_decisions.md`) - **reference this for why choices were made**
- Your original documentation in `[location]/` (if referenced)
- Your AI rules (`AGENTS.md` + tool-specific files) - **now active**
- Your MCP server (`mcp-server.js`)
- Your project configuration

**Backup available at:** `.fluxframe-backup/`

**Your project is ready for development!**

**Important:** The `bootstrap_decisions.md` file contains the reasoning behind all migration choices. Reference this when questions arise.

**Next Steps:**
1. Configure your project's MCP server in your AI tool (replace bootstrap MCP with project MCP)
2. Define Cycle 1.1 in `{{DOCS_DIR}}/implementation_plan.md`
3. When ready to implement Cycle 1.1:
   - Call `start_cycle_planning("1.1")` to initiate planning
   - Call `analyze_cycle_scope()` to assess complexity
   - Call `create_cycle_plan("1.1", "Cycle Name")` to create detailed plan
   - Get user approval, then call `approve_cycle_plan("1.1")`
   - THEN start implementing
4. Start developing! Use the two-tier planning system for all cycles.
```

---

## Two-Tier Planning System

This project uses a two-tier implementation planning approach:

### Tier 1: implementation_plan.md (Strategic Roadmap)
- Lists ALL planned cycles with brief descriptions
- Tracks status: 📋 PLANNING → 🏗️ IN PROGRESS → ✅ COMPLETE
- Provides timeline estimates and dependencies

### Tier 2: implementation_plans/ (Tactical Plans)
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

## Final Success Criteria (After Cleanup)

Migration is fully complete when:

1. ✅ All user migration preferences honored
2. ✅ Content migrated/copied/referenced as chosen
3. ✅ FluxFrame core documents created
4. ✅ AI rules generated with correct paths
5. ✅ MCP server configured and tested
6. ✅ **All decisions logged with reasoning** (bootstrap_decisions.md in docs directory)
7. ✅ Template files cleaned up
8. ✅ README.md updated for project
9. ✅ Backup preserved for rollback
10. ✅ User has reviewed and approved result
11. ✅ Ready to define Cycle 1.1 using two-tier planning system

