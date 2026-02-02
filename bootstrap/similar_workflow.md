# Similar Workflow Bootstrap

**Purpose:** Upgrade an existing AI-assisted development workflow to FluxFrame.

**When to use:** Project was classified as `SIMILAR_WORKFLOW` - it has existing AI rules (`.clinerules`, `AGENTS.md`, etc.) with structured workflows that are similar to FluxFrame's approach.

**Goal:** Enhance and standardize existing setup, preserve user customizations, add missing FluxFrame components.

---

## Prerequisites

Before starting this workflow:
- ✅ Detection phase complete (see `detection_guide.md`)
- ✅ Project classified as `SIMILAR_WORKFLOW`
- ✅ User confirmed they want to proceed
- ✅ You have identified existing AI rules and documentation

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
- **NEVER** assume the user wants a "light" or "partial" upgrade
- **ALWAYS** present the FULL FluxFrame option first, then alternatives
- **ALWAYS** explain what each option includes vs excludes

### Full vs Partial Upgrade Requirement

Before suggesting any upgrade approach, you MUST:
1. Show what a **FULL** FluxFrame bootstrap includes
2. Show what the user's **existing** setup already has
3. Show the **GAP** between the two
4. For **EACH** gap item, ask: "Would you like to add this?"

Do NOT assume the user wants the "minimal change" approach. Always present full upgrade as the first option.

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

The similar workflow upgrade involves many decisions about merging, keeping, or replacing existing configurations. To ensure these decisions persist beyond the conversation context and can be referenced later, use the `log_decision` MCP tool.

### When to Log Decisions

Log a decision whenever:
- User chooses to Keep/FluxFrame/Merge for a rule category
- Infrastructure or environment choices are made (Q8-Q10)
- Browser automation upgrade decisions are made
- Log access configuration choices are made
- Any customization or special handling is decided

### How to Log Decisions

```
log_decision({
  category: "merge",  // See categories below
  decision: "Keep existing testing rules, add FluxFrame workflow",
  reasoning: "User has comprehensive pytest configuration with custom fixtures. FluxFrame workflow enhances without replacing.",
  alternatives: ["Replace with FluxFrame testing rules", "Merge both approaches"],
  implications: "Need to ensure FluxFrame workflow references existing test patterns"
})
```

### Decision Categories for Similar Workflow

- `scenario` - Why classified as SIMILAR_WORKFLOW
- `merge` - Rule merge decisions (Keep/FluxFrame/Merge per category)
- `infrastructure` - Environment setup, platforms
- `config_management` - Secrets, configuration approach
- `iac` - Infrastructure as Code tooling
- `verification` - Where to verify changes
- `browser_automation` - Browser testing upgrade decisions
- `log_access` - Observability configuration
- `mcp` - MCP server merge/replace decisions
- `custom` - Any other decisions

### Syncing Decisions to File

After completing Phase 3 (User Decisions) and at the end of bootstrap, call:
```
sync_decisions_to_file({ docsDir: "project_docs" })
```

This writes all logged decisions to `{{DOCS_DIR}}/bootstrap_decisions.md`.

---

## Workflow Overview

```
┌─────────────────────────────────────────────────────────────────┐
│              SIMILAR WORKFLOW BOOTSTRAP                          │
├─────────────────────────────────────────────────────────────────┤
│  Phase 1: Inventory existing setup                               │
│  Phase 2: Diff against FluxFrame templates                      │
│  Phase 3: User decisions on each difference                     │
│  Phase 4: Generate merged/upgraded configuration                │
│  Phase 5: Add missing FluxFrame components                      │
│  Phase 6: Validation and handoff                                │
└─────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Inventory Existing Setup

### Step 1.1: Document What Exists

Create a complete inventory of the existing setup:

```markdown
## Existing Setup Inventory

### AI Rules
- **Tool:** [Cline/Roo/Claude Code/etc.]
- **Location:** [file/directory path]
- **Structure:** [single file / directory with multiple files]
- **Files found:**
  - [List each file with brief description]

### Documentation
- **Location:** [project_docs/, docs/, etc.]
- **Files found:**
  - [List each file]
- **Structure notes:** [How is it organized?]

### Patterns
- **Location:** [path]
- **Pattern count:** [number]
- **Categories:** [list]

### Bug Fixes / Change History
- **Location:** [path]
- **Count:** [number of files]
- **Format:** [description]

### MCP Server
- **Exists:** [Yes/No]
- **Location:** [path if exists]
- **Configured:** [Yes/No/Partial]

### Seed Data / Test Fixtures
- **Exists:** [Yes/No]
- **Location(s):** [seed_data/, fixtures/, test_data/, mocks/, __fixtures__/, etc.]
- **Format:** [JSON/YAML/SQL/Code-based/Mixed]
- **Categories found:**
  - [List entity types with fixtures, e.g., "users", "tasks", "products"]
- **Integration:** [How tests import fixtures, if detectable]
```

### Step 1.2: Read and Understand Content

For each detected AI rules file, read the content and identify:

**Rules Categories:**
- Project context rules
- Development workflow rules
- Pattern-related rules
- Testing rules
- API contract rules
- Documentation rules
- Custom/project-specific rules

**Workflows Defined:**
- Iteration/cycle workflow?
- Change request protocol?
- Pattern documentation workflow?
- Other workflows?

**References:**
- What documentation does it reference?
- What patterns does it mention?
- What tools/commands does it specify?

### Step 1.3: Detect Existing Infrastructure

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

### Seed Data Directories Found
- [ ] `seed_data/` - FluxFrame standard location
- [ ] `fixtures/` or `__fixtures__/` - Common test fixtures location
- [ ] `test_data/` or `testdata/` - Alternative test data location
- [ ] `seeds/` - Database seeding location
- [ ] `mocks/` - Mock data location
- [ ] `factories/` - Factory functions location

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

### Step 1.4: Identify Documents for Potential Archival

**Purpose:** Find all non-code documents that may need to be archived to reference_library during bootstrap.

**CRITICAL:** Documents cannot be expected to follow naming conventions. Scan broadly and let the user decide what to archive.

**Scan for:**
```markdown
## Documents Found for Archival Review

### Root Level Documents (non-code)
Scan project root for markdown, text, and documentation files:

| File | Type (Inferred) | Recommendation |
|------|-----------------|----------------|
| [filename] | [roadmap/architecture/brief/status/unknown] | [Archive/Keep/Ask User] |

### Documentation Directories
Scan docs/, documentation/, project_docs/, etc.:

| File | Location | Type (Inferred) | Recommendation |
|------|----------|-----------------|----------------|
| [filename] | [path] | [type] | [recommendation] |

### Existing AI Rules (for backup)
| File | Location | Will Archive To |
|------|----------|-----------------|
| AGENTS.md | root | reference_library/archived_documents/rules/ |
| CLAUDE.md | root | reference_library/archived_documents/rules/ |
| .clinerules/ | root | reference_library/archived_documents/rules/ |
| [etc.] | | |
```

**Type Inference Guidelines:**
- Files containing "roadmap", "backlog", "plan" → `roadmaps/`
- Files containing "architecture", "design", "adr", "decision" → `architecture/`
- Files containing "brief", "prd", "requirements", "spec" → `briefings/`
- Files containing "status", "changelog", "state" → `status/`
- AI rule files (AGENTS.md, .clinerules, etc.) → `rules/`
- Unknown or ambiguous → Ask user to categorize

**DO NOT auto-archive:**
- README.md (belongs to the project)
- LICENSE, CONTRIBUTING.md (standard project files)
- Source code files
- Configuration files (.env, package.json, etc.)
- Test files

**Record in bootstrap state:**
```javascript
{
  "documentsForArchival": [
    {
      "file": "PROJECT_BRIEF.md",
      "originalPath": "PROJECT_BRIEF.md",
      "inferredType": "briefings",
      "userDecision": null  // Will be set after user chooses
    }
  ]
}
```

---

## Phase 2: Diff Against FluxFrame

### Step 2.1: Compare AI Rules

For each major category, compare existing rules with FluxFrame templates:

**Comparison Table Format:**
```markdown
### [Category Name] Rules Comparison

| Aspect | Your Current Rules | FluxFrame Template | Difference |
|--------|-------------------|-------------------|------------|
| [aspect] | [what you have] | [what FluxFrame has] | [description] |
```

**Categories to Compare:**

1. **Project Context**
   - Single source of truth approach
   - Context document references
   - MCP integration

2. **Development Workflow**
   - Cycle/iteration methodology
   - Before/during/after checklist
   - Completion criteria

3. **Pattern-Driven Development**
   - Pattern check before implementing
   - Pattern documentation requirements
   - Pattern library structure

4. **API Contracts**
   - Contract-first approach
   - Type safety enforcement
   - Validation requirements

5. **Testing Philosophy**
   - Test-implementation alignment
   - No stubs rule
   - Test writing timing

6. **Documentation First**
   - Documentation requirements
   - Update triggers
   - Single source of truth

7. **Change Request Protocol**
   - Bug fix workflow
   - Iteration rules
   - Documentation timing

### Step 2.2: Identify Significant Differences

A difference is **significant** if:
- Your rule contradicts FluxFrame principle
- Your rule adds project-specific requirements FluxFrame doesn't cover
- Your rule uses different terminology for same concept
- Your rule is missing something FluxFrame considers essential

A difference is **minor** if:
- Just different wording for same concept
- Formatting differences
- Example differences

---

## Phase 2.5: Infrastructure & Environment Assessment

**Purpose:** Confirm detected infrastructure and gather environment strategy information.

### Step 2.5.1: Present Infrastructure Findings

Present the infrastructure detection results from Phase 1.3:

```markdown
## Infrastructure & Environment Assessment

Based on analyzing your codebase, here's what I found:

### Detected Configuration
[Show infrastructure detection summary from Phase 1.3]

### Questions to Confirm Setup

I need to confirm your environment strategy to properly configure FluxFrame documentation.
```

### Step 2.5.2: Ask Infrastructure Questions

**Ask Q8 from project_questionnaire.md:**

```markdown
### Q8: Environment Map

Which environments do you require for this project, and what is their current status?

1. **Development / Localhost** (Essential for coding)
   - Status: [Ready / Needs Setup]
   - Hosting: [e.g., Local Mac/PC, Docker, Dev Container]

2. **Testing / CI** (For automated PR checks)
   - Status: [Ready / Needs Setup / Not Required]
   - Platform: [e.g., GitHub Actions, GitLab CI]

3. **Staging / Preview** (For stakeholder review)
   - Status: [Ready / Needs Setup / Not Required]
   - Platform: [e.g., Vercel Previews, Heroku Staging, AWS Amplify]

4. **Production** (The live system)
   - Status: [Ready / Needs Setup]
   - Platform: [e.g., AWS, GCP, Azure, Vercel, Railway]
```

**Ask Q9:**

```markdown
### Q9: Configuration & Secrets Management

How will you manage environment-specific configurations and secrets?

1. **Local .env files** (Standard for most projects)
2. **Secret Manager** (Vault, AWS Secrets Manager, Doppler)
3. **SOPS / Encrypted files in Git**
4. **Platform-native env variables** (Vercel/Heroku dashboard)
```

**Ask Q10:**

```markdown
### Q10: Infrastructure as Code (IaC)

Do you plan to use Infrastructure as Code to manage these environments?

1. **Manual / Dashboard-managed** (Best for simple projects)
2. **Terraform / OpenTofu**
3. **Pulumi**
4. **Cloud-specific** (CloudFormation, CDK, Bicep)
```

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

**Impact on Bootstrap:**
- Environments marked "Needs Setup" will be added to ROADMAP.md
- Infrastructure section will be populated in technical_status.md
- infra_patterns.md will be created from template
```

---

## Phase 2.6: Gap Analysis (REQUIRED)

**Purpose:** Before proceeding to user decisions on differences, show the user what a FULL FluxFrame setup includes versus what they already have.

**CRITICAL:** This phase ensures the user understands what they might be missing and explicitly chooses what to include.

### Step 2.6.1: Present Full FluxFrame Overview

Show the user what a complete FluxFrame bootstrap includes:

```markdown
## What Full FluxFrame Bootstrap Includes

Before we proceed, here's what a complete FluxFrame setup provides. I'll then show what you already have and what's missing.

### Core Documentation
- [ ] `context_master_guide.md` - Single source of truth for project context
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

> [!NOTE]
> The Reference Library stores DESCRIPTIVE information (real-world context) as opposed to PRESCRIPTIVE documentation (patterns, workflows). It INFORMS decisions but doesn't DICTATE them.

- [ ] `reference_library/README.md` - Index and philosophy (descriptive vs prescriptive) **(REQUIRED)**
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

Based on my analysis of your existing configuration:

### Existing Components
[For each item above, mark as:]
- ✅ **Has:** [component] - [brief description of what exists]
- ⚠️ **Partial:** [component] - [what's there, what's missing]
- ❌ **Missing:** [component]

### Summary
- **Complete:** [N] components
- **Partial:** [N] components
- **Missing:** [N] components
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

### Partial Components (Need Enhancement)

| # | Component | Current State | FluxFrame Enhancement | Your Choice |
|---|-----------|---------------|----------------------|-------------|
| 1 | [Component] | [What you have] | [What FluxFrame adds] | Enhance / Keep Current |
| ... | ... | ... | ... | ... |

---

**Important:** For each item above, I need your explicit decision:

1. **Missing components:** Should I add this? (Yes/No)
2. **Partial components:** Should I enhance this or keep your current version?

Please respond with your choices for each numbered item, or say "Add all missing" / "Enhance all partial" if you want the full upgrade.
```

### Step 2.6.4: Record Gap Decisions

**Wait for user response.** Do not proceed until user has made explicit choices.

For each decision, log it:
```
log_decision({
  category: "gap_analysis",
  decision: "[Add/Skip/Enhance] [Component]",
  reasoning: "[User's stated reason]",
  alternatives: ["Add", "Skip", "Keep current"],
  implications: "[What this means for their setup]"
})
```

**If user says "you decide" or gives vague answer:**
```
I need your explicit decision for each missing component. This ensures your FluxFrame setup matches your actual needs.

Let me explain why each matters:
- [Component 1]: [Detailed explanation of value]
- [Component 2]: [Detailed explanation of value]
...

Please choose for each: Add or Skip?
```

---

## Phase 2.7: Future State (Planned & Aspirational) - OPTIONAL

**Purpose:** After gap analysis, capture what the user intends to build beyond current setup.

**When to ask:** Always offer this after Phase 2.6, but user can skip.

### Step 2.7.1: Introduce Future State Capture

```markdown
## Looking Ahead

Before we proceed, I'd like to understand what you're **planning** for the future.

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
Based on your current setup and the gaps we identified, what are you **actively planning** to add soon?

**Current state:**
- Environments: [summarize from Phase 2.5]
- Missing components from gap analysis: [list from Phase 2.6]

**What are you planning to add soon?** (Select all that apply)

□ Any of the "Skip" items from gap analysis you'll add later
□ Additional environments (staging, production, etc.)
□ CI/CD pipeline enhancements
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
  reasoning: "User wants to focus on current upgrade only",
  implications: "FluxFrame configured for current state. User can add future items to ROADMAP.md later."
})
```

---

## Phase 2.8: Document Archival Decisions (REQUIRED)

**Purpose:** Get explicit user decisions on which existing documents should be archived to reference_library.

**CRITICAL:** This phase is REQUIRED for SIMILAR and MIGRATION workflows. Documents are NEVER deleted or overwritten without explicit user consent and archival.

### Step 2.8.1: Present Documents Found

Present the documents identified in Step 1.4:

```markdown
## Document Archival Review

During setup, I found the following documents that may contain valuable context.
These will be **archived** (not deleted) to `reference_library/archived_documents/`
so they're preserved while establishing the FluxFrame structure.

**Documents Found:**

| # | File | Location | Inferred Type | My Recommendation |
|---|------|----------|---------------|-------------------|
| 1 | [filename] | [path] | [roadmap/architecture/brief/etc.] | Archive / Keep in place |
| 2 | [filename] | [path] | [type] | Archive / Keep in place |
| ... | | | | |

**Existing AI Rules (will be backed up automatically):**

| File | Current Location | Will Archive To |
|------|------------------|-----------------|
| [rule file] | [path] | reference_library/archived_documents/rules/ |

---

**For each document, I need your decision:**

1. **Archive** - Move to reference_library/archived_documents/ with timestamp
   - Preserves the document for future reference
   - Clears space for FluxFrame structure
   - Listed in FLUXFRAME_MANUAL.md for easy access

2. **Keep in place** - Don't move this file
   - Stays exactly where it is
   - FluxFrame works around it
   - You're responsible for maintaining it

Please tell me your choice for each numbered item, or say:
- "Archive all" - Archive everything I found
- "Keep all" - Don't archive anything
```

### Step 2.8.2: Confirm Categorization

For each document the user chooses to archive, confirm the category:

```markdown
You chose to archive: **[filename]**

I'll place it in: `reference_library/archived_documents/[inferred_type]/`

Archived name: `[original_name]_archived_[YYYY-MM-DD].md`

Is this categorization correct?
- Yes (proceed)
- No, this is actually a [different category]
```

### Step 2.8.3: Record Archival Decisions

For each archival decision:

```
log_decision({
  category: "archival",
  decision: "Archive [filename] to reference_library/archived_documents/[type]/",
  reasoning: "[User's stated reason or 'User approved recommended archival']",
  alternatives: ["Keep in place", "Delete (not recommended)"],
  implications: "Document preserved in archive, available via archive_manifest.md"
})
```

Update bootstrap state:
```javascript
{
  "archivalDecisions": [
    {
      "file": "PROJECT_BRIEF.md",
      "originalPath": "PROJECT_BRIEF.md",
      "archiveTo": "reference_library/archived_documents/briefings/",
      "archivedName": "PROJECT_BRIEF_archived_2026-02-01.md",
      "decision": "archive",
      "reason": "User approved"
    }
  ]
}
```

### Step 2.8.4: Summarize Archival Plan

Before proceeding, confirm the archival plan:

```markdown
## Archival Summary

**Documents to Archive:**
| Original | Archived As | Category |
|----------|-------------|----------|
| [file] | [archived_name] | [category] |

**Documents Kept in Place:**
| File | Location | Reason |
|------|----------|--------|
| [file] | [path] | [user's reason] |

**AI Rules to Back Up:**
All existing AI rules will be backed up to `reference_library/archived_documents/rules/` before new rules are activated.

Proceed with this archival plan? (yes/modify)
```

**Note:** Archival is executed during Phase 7 (Finalization), not immediately. This ensures atomicity.

---

## Phase 3: User Decisions

> [!IMPORTANT]
> **CONTENT EXTRACTION TIMING**
>
> Documents marked for archival are NOT moved until Phase 7 (Finalization).
> You MUST read and extract relevant content from existing documents DURING Phases 3-5
> BEFORE finalization occurs. The archival decisions record WHAT will be archived,
> but the actual move happens only after you've used the content.

### Step 3.1: Present Differences

For each **significant** difference, present to user:

```markdown
### Difference [N]: [Category] - [Aspect]

**Your current rule:**
```
[exact content of user's rule]
```

**FluxFrame approach:**
```
[FluxFrame template content for same aspect]
```

**Analysis:**
[Explain what's different and why it matters]

**Options:**
1. **Keep yours** - Preserve your custom rule
2. **Use FluxFrame** - Replace with FluxFrame standard
3. **Merge** - Combine both (explain how)

**Recommendation:** [Your recommendation with reasoning]

Your choice (1/2/3)?
```

### Step 3.2: Handle Each Category

**Project-Specific Rules:**
- These are almost always "Keep yours"
- FluxFrame doesn't have project-specific context

**Workflow Rules:**
- If user's workflow is robust, offer merge
- If user's workflow is simpler, recommend FluxFrame upgrade

**Pattern Rules:**
- Usually recommend FluxFrame (more comprehensive)
- Keep user's pattern categories/structure if valuable

**Testing Rules:**
- Check if user has specific testing framework rules
- Keep those, add FluxFrame philosophy

**Documentation Rules:**
- Usually recommend FluxFrame approach
- Keep user's custom documentation locations

### Step 3.3: Record Decisions

Create decision record:

```markdown
## Rule Merge Decisions

| Category | Decision | Notes |
|----------|----------|-------|
| Project Context | Keep | User has detailed project-specific context |
| Development Workflow | FluxFrame | User wants to adopt cycle methodology |
| Pattern Rules | Merge | Keep user's categories, add FluxFrame workflow |
| API Contracts | FluxFrame | User didn't have contract enforcement |
| Testing | Keep | User has specific pytest rules to preserve |
| Documentation | Merge | Keep user's locations, add FluxFrame structure |
| Change Protocol | FluxFrame | User wants systematic approach |
```

---

## Phase 4: Generate Merged Configuration (to Staging)

> [!CRITICAL]
> **READ BEFORE GENERATING**
>
> Before generating any new documentation, you MUST read and extract content from:
> - Existing ROADMAP.md, planning docs → Extract cycles, milestones, priorities
> - Existing technical_status.md, STATUS.md → Extract current state, known issues
> - Existing architecture docs → Extract architectural decisions, patterns
> - Existing project briefs → Extract requirements, constraints, goals
> - Any documents marked for archival → Extract relevant content NOW
>
> **Why:** These documents will be archived during Phase 7 (Finalization).
> If you don't read them NOW, the content will be lost from the new FluxFrame documents.
> The archive preserves the files, but the AI won't automatically know to check there.

### Step 4.1: Verify Backup Exists

**IMPORTANT:** Gate 2 (Step 2.2.5) already backed up the original rules to `.fluxframe-backup/pre-bootstrap/` before creating bootstrap-resume rules.

Verify the backup exists:

```bash
# Check that pre-bootstrap backup exists
ls -la .fluxframe-backup/pre-bootstrap/

# If backup is missing (shouldn't happen), create it now from current rules
# Note: Current rules may be bootstrap-resume content, not original!
# This is a fallback - the Gate 2 backup should have the original content
```

**Tell user:** "Your original configuration was backed up to `.fluxframe-backup/pre-bootstrap/` during Gate 2."

**For merging:** Use files from `.fluxframe-backup/pre-bootstrap/` as the source for the user's original rules, NOT the current files (which are bootstrap-resume rules).

### Step 4.2: Build Merged Rules (to Staging Directory)

**CRITICAL: Generate to staging, NOT final locations**

During bootstrap, temporary "bootstrap-resume" rules exist at the final locations. Generate ALL merged rules to a staging directory. They will be moved to final locations during Phase 7 (Cleanup).

**Staging directory:** `.fluxframe-pending/`

```bash
mkdir -p .fluxframe-pending
```

Based on decisions from Phase 3, construct new rule files **in staging**:

**For AGENTS.md (always created) - save to `.fluxframe-pending/AGENTS.md`:**
```markdown
# Project: {{PROJECT_NAME}}

[START WITH: User's kept project context from .fluxframe-backup/pre-bootstrap/AGENTS.md]

## Core Principles

[MERGE: User's principles + FluxFrame essentials]

## Development Workflow

[USE: Decision-based - either user's, FluxFrame's, or merged]

## Pattern Library

[MERGE: User's patterns + FluxFrame pattern workflow]

... etc
```

**For tool-specific files:**
- `.fluxframe-pending/CLAUDE.md` (if Claude Code)
- `.fluxframe-pending/.clinerules/` (if Cline Full)
- `.fluxframe-pending/.roomodes` and `.fluxframe-pending/.roo/` (if Roo Code Full)
- `.fluxframe-pending/GEMINI.md` (if Antigravity)

**Merge process:**
- Read user's original rules from `.fluxframe-backup/pre-bootstrap/`
- Apply decisions from Phase 3 (keep/replace/merge)
- Preserve user's organizational structure if they prefer it
- Add FluxFrame sections that were missing
- Save to `.fluxframe-pending/`

**Why staging?**
- Bootstrap-resume rules remain active throughout bootstrap
- Prevents merged rules from interfering with bootstrap flow
- AI assistant continues to see "bootstrap in progress" instructions
- All rules are activated simultaneously during cleanup for clean transition

### Step 4.3: Handle Documentation

For existing documentation:

**If documentation structure is similar to FluxFrame:**
- Keep existing files
- Add missing FluxFrame documents
- Update references in rules to point to existing docs

**If documentation needs restructuring:**
- Ask user: "Should I reorganize to FluxFrame structure or keep current?"
- If reorganize: Create new structure, move content
- If keep: Adapt FluxFrame references to existing structure

---

## Phase 5: Add Missing Components

### Step 5.1: Identify Gaps

Compare existing setup to full FluxFrame setup:

```markdown
## Component Gap Analysis

### AI Rules
- [x] AGENTS.md - [exists/needs update]
- [ ] CLAUDE.md - [missing - create if Claude Code used]
- [ ] .roomodes - [missing - create if Roo Code used]
- [x] .clinerules/ - [exists - upgraded]

### Documentation
- [x] context_master_guide.md - [exists as context_guide.md]
- [x] technical_status.md - [exists as status.md]
- [ ] ROADMAP.md - [missing - create]
- [ ] api_contract_standards.md - [missing - create if has API]
- [x] patterns/ - [exists]
- [ ] workflows/ - [missing - create]
- [ ] bug_fixes/ - [exists as fixes/]
- [ ] infra_patterns.md - [missing - create from template]

### Infrastructure & Environment
Based on Phase 2.5 assessment:

| Environment | Status from Q8 | Gap Analysis |
|-------------|----------------|--------------|
| Development | [Ready/Needs Setup] | [Gap if "Needs Setup"] |
| Testing/CI | [Ready/Needs Setup/Not Required] | [Gap if "Needs Setup"] |
| Staging | [Ready/Needs Setup/Not Required] | [Gap if "Needs Setup"] |
| Production | [Ready/Needs Setup] | [Gap if "Needs Setup"] |

**Infrastructure Gaps to Address:**
- [ ] Environments marked "Needs Setup" require implementation cycles
- [ ] Missing IaC configuration (if Q10 chose IaC but not present)
- [ ] Missing secret management setup (if Q9 chose but not configured)

**Suggested Implementation Cycles for Missing Infrastructure:**
If environments need setup, suggest adding to ROADMAP.md:
- Cycle X.X: Set up [Environment] environment on [Platform]
- Cycle X.X: Configure CI/CD pipeline for [Environment]
- Cycle X.X: Implement secret management with [Tool]

### MCP Server
- [ ] mcp-server.js - [missing - create]
- [ ] package.json updates - [needed]

### Seed Data
- [ ] seed_data/ directory - [missing/exists at different location]
- [ ] seed_data/README.md - [missing - create]
- [ ] fixtures/ - [exists at __fixtures__/ - migrate or symlink?]
- [ ] samples/ - [missing - create for AI context]
- [ ] factories/ - [exists/missing]
- [ ] schemas/ - [missing - create]

### Other
- [ ] Workflow documentation - [needed]
```

### Step 5.2: Create Missing Components

For each missing component:

1. **Use FluxFrame templates** from `doc-templates/`
2. **Fill with project info** gathered from existing docs
3. **Adapt references** to match existing structure
4. **Present to user** before creating

**Example dialogue:**
```
I notice you're missing an ROADMAP.md. Based on your existing 
documentation, I can create one with your current roadmap/backlog information.

Should I:
1. Create ROADMAP.md from FluxFrame template
2. Skip this (you'll add it later)
3. Point me to an existing file that serves this purpose

Your choice?
```

### Step 5.3: MCP Server Setup

If MCP server doesn't exist:

1. Create `mcp-server.js` from template
2. Configure paths to match existing documentation structure
3. Add to `package.json` (create or update)
4. Test that it starts correctly

If MCP server exists but is different:
1. Compare capabilities
2. Ask user: merge features or replace?
3. Implement decision

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
3. Customize based on user's upgraded configuration
4. Reference existing patterns and documentation

**Validation:**
- [ ] File created at `FLUXFRAME_MANUAL.md` (in project root)
- [ ] All placeholders replaced
- [ ] Tool sections match configured tools
- [ ] References existing user documentation correctly

### Step 5.4.5: Seed Data Setup (ALWAYS)

**Purpose:** Ensure project has FluxFrame-standard seed data structure for AI context, testing, and development.

**If seed data exists at different location:**

Present migration options:
```
I found existing test fixtures/seed data at: [DETECTED_LOCATION]

Options:
1. **Migrate to FluxFrame structure** - Move/copy to seed_data/ with FluxFrame organization
2. **Create symlinks** - Keep existing location, create seed_data/ with symlinks
3. **Parallel structure** - Create seed_data/ alongside existing location
4. **Reference only** - Create seed_data/README.md pointing to existing location

Your choice?
```

**If no seed data exists:**

Create FluxFrame standard structure:
```bash
mkdir -p seed_data/fixtures
mkdir -p seed_data/samples
mkdir -p seed_data/factories
mkdir -p seed_data/schemas
```

Generate `seed_data/README.md` from template.

**Content generation based on Q-Data answer:**
- **Full Setup:** Generate starter fixtures based on detected domain entities
- **Basic Structure:** Create directories with .gitkeep files
- **Minimal:** Just create seed_data/README.md

**Validation:**
- [ ] seed_data/ directory exists (or symlinks configured)
- [ ] seed_data/README.md created with project-specific instructions
- [ ] Existing fixtures integrated or referenced
- [ ] data_patterns.md updated with seed data patterns

---

## Phase 5.5: Browser Automation Upgrade (RECOMMENDED for Web Projects)

**This phase is RECOMMENDED for web projects where browser automation is desired.**

**Purpose:**
Upgrade or configure browser automation capabilities for the AI assistant. For similar workflow upgrades, this involves reviewing existing browser setup (if any) and enhancing with current capabilities.

---

### Step 5.5.1: Check Existing Browser Automation

Review existing AI rules for browser automation guidance:

```markdown
## Existing Browser Automation Analysis

**Checking current AI rules for browser-related guidance...**

**Found in existing rules:**
- [ ] Browser automation commands documented
- [ ] Testing workflow includes browser interaction
- [ ] Tool-specific browser setup (Chrome, Puppeteer, etc.)
- [ ] Screenshot/visual testing guidance

**Current Browser Setup:**
| Tool | Browser Support | Current Config |
|------|-----------------|----------------|
| Claude Code | Chrome integration | [Documented/Not found] |
| Cline | Puppeteer | [Documented/Not found] |
| Roo Code | Puppeteer | [Documented/Not found] |
| Other | Manual testing | [Approach or "N/A"] |

**Existing test frameworks detected:**
- [ ] Playwright
- [ ] Cypress
- [ ] Selenium
- [ ] Puppeteer standalone
- [ ] None detected
```

### Step 5.5.2: Research Current Capabilities (RECOMMENDED)

**Browser automation is rapidly evolving.** Offer to research latest capabilities:

```markdown
Your existing AI rules were created [X time ago]. Browser automation 
capabilities for AI assistants have likely evolved since then.

Shall I research the latest capabilities for your tools before updating?

Research will cover:
- Current browser automation features
- Recent announcements (last 3-6 months)
- New setup requirements
- Compatibility with existing test frameworks

Research recommended tools:
[List user's AI tools from inventory]

Proceed with research? (yes/skip)
```

**If user chooses research, follow the research process from greenfield Step 9.5:**
- Search official documentation
- Check recent announcements
- Compile research report with findings
- Save to `{{DOCS_DIR}}/browser_automation_research.md`

### Step 5.5.3: Present Upgrade Options

Based on analysis and research (if performed):

```markdown
## Browser Automation Upgrade Options

**Current State:**
[Summarize findings from 5.5.1 and research if performed]

**Upgrade Options:**

1. **Keep existing** - Your current browser setup is sufficient
   - No changes to browser automation approach
   - FluxFrame adds other enhancements only
   
2. **Enhance existing** - Add new capabilities alongside current setup
   - Keep your existing test frameworks
   - Add AI assistant browser access (Chrome/Puppeteer)
   - Coexist with Playwright/Cypress
   
3. **Full upgrade** - Implement comprehensive browser automation
   - Configure all available browser options
   - Set up according to research findings
   - Create detailed browser setup documentation
   
4. **Add for first time** - No existing browser automation
   - Configure based on selected AI tools
   - Follow greenfield setup process
   
5. **Skip** - No browser automation changes in this upgrade

Your choice (1-5):
```

### Step 5.5.4: Execute Based on Choice

**For "Keep existing" (Option 1):**
- Document existing approach in technical_status.md
- No changes to AI rules
- Note in upgrade summary: "Browser automation: Preserved existing approach"

**For "Enhance existing" (Option 2):**
- Add browser automation sections to AI rules
- Document AI assistant browser access alongside existing frameworks
- Update with research findings if available
- Preserve existing test framework guidance

**For "Full upgrade" (Option 3):**
- Review and update existing browser guidance
- Implement research findings
- Create comprehensive browser automation documentation
- Update all AI rules with new capabilities

**For "Add for first time" (Option 4):**
- Follow project_questionnaire.md browser automation section
- Implement as greenfield setup
- Integrate with existing testing approach

**For "Skip" (Option 5):**
- No changes
- Can revisit later

### Step 5.5.5: Update AI Rules with Browser Capabilities

If browser automation is enhanced or added, update AGENTS.md and tool-specific rules:

```markdown
## Browser Automation

**Status:** [Configured/Enhanced/Existing]

**AI Assistant Access:**

### Claude Code (if applicable)
**Chrome Integration:** [Enabled/Available/Not configured]
- Requires: Chrome browser + Claude in Chrome extension v1.0.36+
- Setup: `claude --chrome`
- Capabilities: Navigate, click, console access, authenticated sessions, GIF recording

### Cline/Roo Code (if applicable)
**Puppeteer Browser:** [Enabled/Available/Not configured]
- Headless browser for local testing
- Capabilities: Navigate, click, screenshots, console logs
- Best for: Local dev server testing

### Existing Test Frameworks (if applicable)
**[Framework Name]:** [Playwright/Cypress/etc.]
- Location: [test directory]
- Usage: [when to use vs AI browser access]
- Coexistence: AI assistant can read test results, write new tests

**Quick Reference:**
| Testing Need | Method | When to Use |
|--------------|--------|-------------|
| AI live debugging | Claude Chrome/Puppeteer | During development |
| Automated tests | [Your framework] | CI/CD pipeline |
| Visual regression | [Your tool] | Release testing |

See `{{DOCS_DIR}}/browser_automation_setup.md` for detailed configuration.
```

**Validation:**
- [ ] Existing browser setup reviewed
- [ ] Research performed if requested
- [ ] Upgrade preference recorded
- [ ] Changes implemented per user choice
- [ ] AI rules updated if applicable
- [ ] Coexistence with test frameworks documented

---

## Phase 5.6: Configure Log Access (OPTIONAL)

**This phase is OPTIONAL based on user's Q11 answer (Observability & Log Access).**

**When to Execute:**
- User chose option 1 (Full setup) or option 2 (Local only) in Q11
- Skip if user chose option 3 (Later) or option 4 (No)

**Purpose:**
Configure AI assistant access to logs from various environments for debugging and troubleshooting. For similar workflow upgrades, this may involve enhancing or integrating with existing observability setup.

---

### Step 5.5.1: Check Existing Log Access in Current Rules

Review existing AI rules for log access patterns:

```markdown
## Existing Log Access Analysis

**Checking current AI rules for log-related guidance...**

**Found in existing rules:**
- [ ] Log access commands documented
- [ ] Debugging workflow includes log checking
- [ ] Environment-specific log locations
- [ ] Monitoring/alerting integration

**Current Log Guidance:**
| Aspect | Status | Current Approach |
|--------|--------|------------------|
| Local logs | [Documented/Not Found] | [method or "N/A"] |
| CI/CD logs | [Documented/Not Found] | [method or "N/A"] |
| Production logs | [Documented/Not Found] | [method or "N/A"] |
| Error tracking | [Documented/Not Found] | [service or "N/A"] |
```

### Step 5.5.2: Present Enhancement Options

```markdown
I analyzed your existing AI rules for log access guidance:

**Current State:**
[Summarize findings from 5.5.1]

**Enhancement Options:**

1. **Keep existing** - Your current log guidance is sufficient
   - No changes to log access approach
   - FluxFrame adds other enhancements only
   
2. **Enhance with MCP tools** - Add programmatic log access
   - Keep your existing guidance
   - Add MCP tools for AI to directly query logs
   - Research best methods for your infrastructure
   
3. **Full reconfiguration** - Set up comprehensive log access
   - Review and update log access approach
   - Configure all environments (from Q8-Q10)
   - Create detailed log_access_setup.md

4. **Skip** - No log access changes in this upgrade

Your choice (1-4):
```

### Step 5.5.3: Execute Based on Choice

**For "Keep existing" (Option 1):**
- Document existing approach in technical_status.md
- No MCP tool changes
- Note in upgrade summary: "Log access: Preserved existing approach"

**For "Enhance with MCP tools" (Option 2):**
- Research log access methods for user's platforms
- Add MCP tools while preserving existing guidance
- Create `log_access_setup.md` documenting both approaches
- Update AI rules to reference new MCP tools

**For "Full reconfiguration" (Option 3):**
- Follow greenfield Step 9.6 process
- Replace or augment existing log guidance
- Create comprehensive `log_access_setup.md`
- Update all AI rules with new approach

### Step 5.5.4: Update AI Rules with Log Access

If log access is enhanced or reconfigured, add to AGENTS.md and tool-specific rules:

```markdown
## Log Access

**Status:** [Configured/Enhanced/Existing]

**Available Methods:**

### MCP Tools (if configured)
- `get_logs` - Query logs from configured sources
- `get_log_access_status` - Check available log sources

### Manual Methods (existing/preserved)
[Document any existing log access guidance]

**Quick Reference:**
| Environment | Access Method | Command/Tool |
|-------------|---------------|--------------|
| Local | [method] | [command] |
| CI/CD | [method] | [command] |
| Staging | [method] | [command] |
| Production | [method] | [command] |

See `{{DOCS_DIR}}/log_access_setup.md` for detailed configuration.
```

**Validation:**
- [ ] Existing log guidance reviewed
- [ ] Enhancement preference recorded
- [ ] Changes implemented per user choice
- [ ] AI rules updated if applicable
- [ ] Documentation created/updated

---

### Step 5.6: Generate FluxFrame Manual (REQUIRED)

**Purpose:** Create a persistent manual that explains how to work with FluxFrame.

**Source:** `doc-templates/fluxframe_manual.template.md`

**Output:** `FLUXFRAME_MANUAL.md` (in project root)

**Handling Existing Manual:**
Check if `FLUXFRAME_MANUAL.md` already exists (e.g., from a previous run).
- **If exists:** Ask user: "Replace, Append, or Skip?"
- **If new:** Generate from template.

**Validation:**
- [ ] Manual created at project root
- [ ] Tool sections match selected tools
- [ ] Documentation links point to correct locations

---

## Phase 6: Validation and Handoff

### Step 6.1: Validate Configuration

Run through checklist:

**AI Rules Validation:**
- [ ] AGENTS.md exists and contains project context
- [ ] Tool-specific rules exist for each selected tool
- [ ] Rules reference correct documentation paths
- [ ] No placeholder text remaining
- [ ] User customizations preserved as decided

**Documentation Validation:**
- [ ] Context guide exists and is complete
- [ ] Technical status reflects current state
- [ ] Pattern library structure exists
- [ ] Workflows documented (or acknowledged as TODO)
- [ ] Bug fixes directory exists

**MCP Server Validation:**
- [ ] Server file exists
- [ ] Server starts without errors
- [ ] Correct paths configured
- [ ] Dependencies installed

**Consistency Check:**
- [ ] Document paths consistent across rules and configs
- [ ] Project name consistent everywhere
- [ ] Tech stack referenced correctly

### Step 6.2: Present Summary

```markdown
## FluxFrame Upgrade Complete

### What Changed

**AI Rules:**
- Updated `.clinerules/` with FluxFrame workflow enhancements
- Created `AGENTS.md` as universal baseline
- [List other changes]

**Preserved from your setup:**
- [List preserved customizations]
- [List preserved documentation]
- [List preserved patterns]

**Added from FluxFrame:**
- [List new components added]

### Backup Location
Your original configuration was backed up to:
`.fluxframe-backup/[timestamp]/`

### Configuration Summary
[Include final configuration details similar to greenfield handoff]

### Next Steps
1. Review the changes in your AI rules
2. Test MCP server: `npm run mcp`
3. Start a new development cycle to experience the workflow
4. Refer to existing patterns and documentation
```

### Step 6.3: Optional: Harmonization Backlog

If existing code doesn't fully align with new patterns:

```markdown
## Harmonization Opportunities (Optional)

Based on your patterns and the upgrade, here are potential improvements:

| Area | Current State | FluxFrame Recommendation | Priority |
|------|---------------|-------------------------|----------|
| [area] | [current] | [recommendation] | [H/M/L] |

These are suggestions for future cycles, not requirements. Your existing 
code works fine - these would just bring more consistency.
```

---

## Special Cases

### Case: Multiple AI Tools in Use

If project uses multiple AI tools (e.g., both Cline and Roo):

1. Create `AGENTS.md` as shared baseline
2. Create tool-specific configs that import/reference AGENTS.md
3. Ensure consistency across all tool configs

### Case: Heavily Customized Rules

If user has extensive custom rules:

1. Identify which are project-specific (keep all)
2. Identify which are workflow-related (compare with FluxFrame)
3. Create "Custom Rules" section in AGENTS.md for project-specific
4. Upgrade workflow rules to FluxFrame standard

### Case: Existing MCP Server with Custom Tools

If project has MCP server with custom tools:

1. List existing custom tools
2. Ask: keep, replace, or merge?
3. If keep/merge: preserve custom tool definitions
4. Add FluxFrame MCP tools alongside

### Case: Different Documentation Location

If user prefers different doc location than `project_docs/`:

1. Keep their location
2. Update all FluxFrame references to use their path
3. Create FluxFrame docs in their preferred location
4. Note the custom location in AGENTS.md

---

## Merge Patterns

### Pattern: Rule Merge

When merging rules:
```markdown
## [Section Name]

### From FluxFrame
[FluxFrame standard content]

### Project-Specific Additions
[User's custom rules that don't conflict]
```

### Pattern: Workflow Merge

When merging workflows:
```markdown
## Development Workflow

[FluxFrame standard workflow]

### Additional Project Requirements
[User's extra steps that complement FluxFrame]
```

### Pattern: Documentation Reference Merge

When project uses different doc names:
```markdown
## Context Documents

**Single Source of Truth:** `docs/context_guide.md` (equivalent to context_master_guide)
**Technical Status:** `docs/status.md` (equivalent to technical_status)
**Patterns:** `docs/patterns/` (FluxFrame standard location)
```

---

## Rollback Instructions

If user wants to rollback:

```bash
# Restore from backup
cp -r .fluxframe-backup/[timestamp]/* ./

# Remove new FluxFrame files if needed
rm AGENTS.md  # if didn't exist before
rm -rf project_docs/  # if created new

# The backup preserves your exact state before FluxFrame upgrade
```

Include this in handoff documentation.

---

## Phase 7: Finalize Bootstrap (Atomic)

**MANDATORY:** After user approves validation, finalization happens automatically. Do NOT ask for additional confirmation.

### Why Finalization Is Atomic

Previous bootstrap iterations suffered from "soft completion" - agents would ask for cleanup confirmation, the user would context-switch, and cleanup never happened. The `finalize_bootstrap` MCP tool handles everything in one call.

### Step 7.1: Verify Ready

Before calling finalization, verify:
- `.fluxframe-pending/` directory has merged `AGENTS.md` and tool-specific rules
- `mcp-server.js` exists at project root
- `{{DOCS_DIR}}/` exists with generated documentation

If anything is missing, fix it first. Otherwise, proceed immediately.

### Step 7.2: Execute Finalization

Call the `finalize_bootstrap` MCP tool. This atomically:

1. **Activates merged rules** - moves from `.fluxframe-pending/` to final locations
2. **Removes FluxFrame templates** - deletes `fluxframe/`, `.fluxframe-pending/`, `BOOTSTRAP_INSTRUCTIONS.md`
3. **Updates README.md** - replaces with project-specific content
4. **Cleans up state** - removes `.fluxframe-bootstrap-state.json`

Note: `.fluxframe-backup/` is preserved for rollback.

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
   - *"Your backup is available at `.fluxframe-backup/` (includes pre-bootstrap originals)."*
   - When starting the next development cycle, use the two-tier planning system: `start_cycle_planning("[cycle_id]")` → `analyze_cycle_scope()` → `create_cycle_plan("[cycle_id]", "Cycle Name")` → `approve_cycle_plan("[cycle_id]")`

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

Bootstrap upgrade is fully complete when:

1. ✅ All required files created/updated
2. ✅ User customizations preserved as decided
3. ✅ MCP server starts successfully
4. ✅ Dependencies installed
5. ✅ No errors in any file
6. ✅ User can read generated docs (Read `FLUXFRAME_GETTING_STARTED.md` first)
7. ✅ **All decisions logged with reasoning** (bootstrap_decisions.md in docs directory)
8. ✅ Template files cleaned up (via `finalize_bootstrap`)
9. ✅ README.md updated for project
10. ✅ Backup preserved for rollback
11. ✅ Ready to define next cycle using two-tier planning system

