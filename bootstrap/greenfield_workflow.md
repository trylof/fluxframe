# Greenfield Workflow Bootstrap

**Purpose:** Complete setup for new projects with no existing AI workflow or documentation.

**When to use:** Project was classified as `GREENFIELD` - it has no existing AI rules, structured documentation, or development workflow. This is the standard bootstrap for new projects.

**Goal:** Generate complete FluxFrame setup from scratch based on project description.

---

## Decision Logging (IMPORTANT)

**Throughout this bootstrap process, you MUST log decisions with their reasoning.**

The bootstrap process involves many architectural and configuration decisions. To ensure these decisions persist beyond the conversation context and can be referenced later, use the `log_decision` MCP tool.

### When to Log Decisions

Log a decision whenever:
- The user makes a choice between multiple options (infrastructure, tools, approaches)
- You detect something about the project that influences setup
- A tradeoff is discussed and resolved
- The user expresses a preference with a reason

### How to Log Decisions

```
log_decision({
  category: "infrastructure",  // See categories below
  decision: "Use SOPS with age encryption for secrets",
  reasoning: "Team uses GitOps workflow and needs secrets in version control. Age was chosen over GPG for simpler key management.",
  alternatives: ["HashiCorp Vault", "AWS Secrets Manager", "Plain .env files"],
  implications: "Will need to set up SOPS in CI pipeline and distribute age keys to team"
})
```

### Decision Categories

- `project_basics` - Project name, purpose, tech stack
- `ai_tools` - AI assistant selection and integration level
- `docs_location` - Where documentation lives
- `infrastructure` - Environment setup, platforms
- `config_management` - Secrets, configuration approach
- `iac` - Infrastructure as Code tooling
- `verification` - Where to verify changes
- `browser_automation` - Browser testing setup
- `log_access` - Observability configuration
- `api_contract` - API approach (OpenAPI, GraphQL, etc.)
- `architecture` - Monolith, microservices, etc.
- `scenario` - Bootstrap scenario classification
- `custom` - Any other decisions

### Syncing Decisions to File

After completing Phase 2 (Information Gathering) and at the end of bootstrap, call:
```
sync_decisions_to_file({ docsDir: "project_docs" })
```

This writes all logged decisions to `{{DOCS_DIR}}/bootstrap_decisions.md`.

---

## Prerequisites

Before starting this workflow:
- ✅ Detection phase complete (see `detection_guide.md`)
- ✅ Project classified as `GREENFIELD`
- ✅ User has provided/confirmed project information
- ✅ All placeholder values are known
- ✅ User has approved setup summary

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
- **ALWAYS** present all available options before proceeding
- **ALWAYS** explain what each option includes

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

## File Generation Order

**CRITICAL:** Files must be created in this order due to dependencies.

```
1. Directory structure
2. context_master_guide.md (references everything)
3. technical_status.md (initial state)
4. ROADMAP.md (strategic roadmap)
5. Pattern library structure
6. API contract standards (if applicable)
7. Workflow docs (if requested)
7.5. FluxFrame guide (persistent post-bootstrap instructions)
8. MCP server configuration
9. package.json
10. .clinerules (references all above)
11. Validation
```

---

## Step-by-Step Workflow

### Step 1: Create Directory Structure

**Command:**
```bash
mkdir -p {{DOCS_DIR}}
mkdir -p {{DOCS_DIR}}/patterns
mkdir -p {{DOCS_DIR}}/workflows
mkdir -p {{DOCS_DIR}}/roadmap
mkdir -p {{DOCS_DIR}}/bugs
mkdir -p {{DOCS_DIR}}/reference_library
mkdir -p {{DOCS_DIR}}/reference_library/open_questions
mkdir -p {{DOCS_DIR}}/reference_library/correspondence
mkdir -p {{DOCS_DIR}}/reference_library/user_research
mkdir -p {{DOCS_DIR}}/reference_library/market_research
mkdir -p {{DOCS_DIR}}/reference_library/domain_knowledge
mkdir -p {{DOCS_DIR}}/reference_library/specifications
mkdir -p seed_data
mkdir -p seed_data/fixtures
mkdir -p seed_data/samples
mkdir -p seed_data/factories
mkdir -p seed_data/schemas
```

**Validation:**
- [ ] All directories created successfully
- [ ] Correct paths for user's OS (Windows vs Unix)
- [ ] No permission errors
- [ ] `seed_data/` directory created at project root (sibling to `{{DOCS_DIR}}/`)
- [ ] `reference_library/` directory created with all subdirectories

**If errors:** Check user has write permissions in project directory.

---

### Step 2: Generate context_master_guide.md

**Source:** `doc-templates/context_master_guide.template.md`

**Process:**
1. Read template file
2. Replace ALL placeholders:
   - `{{PROJECT_NAME}}` → User's project name
   - `{{PROJECT_PURPOSE}}` → One-line purpose
   - `{{TECH_STACK}}` → Comma-separated technologies
   - `{{DOCS_DIR}}` → Documentation directory path
   - `{{API_CONTRACT_APPROACH}}` → Chosen API approach
   - `{{ARCHITECTURE_TYPE}}` → Monolith/microservices/etc
3. Keep universal sections UNCHANGED
4. Adapt examples where marked `{{EXAMPLE}}`
5. Remove template comments (lines starting with `<!-- TEMPLATE:`)

**Verification Logic (Important):**
Based on user's Q8 Answer (Verification Environment), set `{{VERIFICATION_INSTRUCTIONS}}`:
- **Localhost:** "Run local server (e.g., `npm run dev`) and verify functionality at `http://localhost:3000` (or configured port)."
- **Preview Env:** "Wait for CI to generate preview URL. Verify functionality at that URL."
- **Staging:** "Deploy to Staging environment. Verify functionality at [STAGING_URL]."
- **Production:** "Deploy to Production (ensure feature flags active if needed). Verify functionality at [PROD_URL]."

**Placeholder Extraction Examples:**

From project info:
```
Project: TaskFlow Pro
Purpose: Task management SaaS for distributed teams
Stack: React, TypeScript, FastAPI, PostgreSQL, Redis
Docs: project_docs/
API: OpenAPI + Pydantic
```

Results in:
```markdown
{{PROJECT_NAME}} → TaskFlow Pro
{{PROJECT_PURPOSE}} → Task management SaaS for distributed teams  
{{TECH_STACK}} → React, TypeScript, FastAPI, PostgreSQL, Redis
{{DOCS_DIR}} → project_docs
{{API_CONTRACT_APPROACH}} → OpenAPI + Pydantic + Auto-Generated TypeScript
{{ARCHITECTURE_TYPE}} → Frontend + Backend (API-first)
{{VERIFICATION_ENV}} → Localhost
{{VERIFICATION_INSTRUCTIONS}} → Run local server and verify...
```

**Special Handling:**

**Section 2 (Core Context Documents):**
- Adapt document list to project's actual structure
- If no workflows yet: Add note "Workflows: To be documented"
- If no patterns yet: Keep structure but note "Empty - patterns will be added"

**Section 3 (Golden Rule):**
- Replace "Steel Thread" with "Development Cycle" or "Iteration"
- Keep all workflow steps
- Keep API modernization section if using OpenAPI
- Remove API section if not using OpenAPI

**Section 4 (Pattern-Driven Development):**
- Keep ALL content - universal principles
- Examples stay generic or adapted to project domain

**Section 5 (Change Request Protocol):**
- Keep ALL content - universal workflow
- Update paths to match {{DOCS_DIR}}

**Output Location:** `{{DOCS_DIR}}/context_master_guide.md`

**Validation:**
- [ ] No `{{PLACEHOLDER}}` syntax remaining
- [ ] All paths use {{DOCS_DIR}} value
- [ ] File is valid markdown
- [ ] No broken internal links

---

### Step 3: Generate technical_status.md

**Source:** `doc-templates/technical_status.template.md`

**Initial Content:**

```markdown
# [PROJECT_NAME] - Technical Status

**Last Updated:** [TODAY_DATE]
**Status:** 🏗️ FRAMEWORK INITIALIZED
**Version:** 0.1.0

---

## Current State

**Project Phase:** Bootstrap
**Framework Status:** ✅ Ready for Cycle 1.1

FluxFrame has been configured for this project.
All core documentation, MCP server, and development protocols are in place.

---

## Current Capabilities

**Implemented:**
- ✅ Framework bootstrap complete
- ✅ Documentation structure established
- ✅ MCP server configured
- ✅ Development protocols defined

**Not Yet Implemented:**
- ⏳ Cycle 1.1 - [To be defined]
- ⏳ All project features

---

## Architecture Status

**Stack:**
- **Frontend:** [FRONTEND_TECH or "Not applicable"]
- **Backend:** [BACKEND_TECH or "Not applicable"]  
- **Database:** [DATABASE or "Not applicable"]
- **Infrastructure:** [INFRASTRUCTURE or "To be determined"]

**API Contract Approach:** [API_APPROACH]

**Architecture Type:** [ARCHITECTURE_TYPE]

---

## Recently Changed

### [TODAY_DATE] - Framework Bootstrap
- ✅ Created project documentation structure
- ✅ Configured MCP server for AI assistance
- ✅ Established development protocols
- ✅ Set up pattern library framework

---

## Known Issues

None - project just bootstrapped.

---

## Technical Debt

None yet - starting fresh with framework.

---

## Next Steps

### Immediate (This Week)
1. **Define Cycle 1.1** in ROADMAP.md
   - Choose first feature to implement
   - Define inputs, outputs, timeline
   - Plan testing approach

2. **Set up development environment**
   - Install dependencies
   - Configure MCP server in IDE
   - Test framework tools

3. **Start developing**
   - Use `@Cline` with MCP context
   - Follow development cycle workflow
   - Document patterns as you build

### Short Term (Next 2-4 Weeks)
- Complete Cycle 1.1
- Establish initial patterns
- Build core functionality

### Long Term
- See ROADMAP.md for roadmap

---

## Testing Status

**Framework Status:** Not applicable
**Cycle 1.1:** Not started

---

## Documentation Status

- ✅ context_master_guide.md - Complete
- ✅ technical_status.md - This file
- ✅ ROADMAP.md - Template ready
- ⏹️ patterns/ - Empty, ready for patterns
- ⏹️ workflows/ - [Created if requested, otherwise pending]

---

## Notes

This project follows the FluxFrame methodology:
- Documentation-first development
- Pattern-driven architecture  
- MCP-enabled AI assistance
- Systematic change protocols
- Development cycle methodology

See context_master_guide.md for complete framework documentation.
```

**Placeholder Replacements:**
- `[PROJECT_NAME]` → User's project name
- `[TODAY_DATE]` → Current date
- `[FRONTEND_TECH]` → From user's stack
- `[BACKEND_TECH]` → From user's stack
- `[DATABASE]` → From user's stack
- `[API_APPROACH]` → User's chosen approach
- `[ARCHITECTURE_TYPE]` → Detected/chosen architecture

**Environment Matrix Replacements (from Q8-Q10):**
- `{{DEV_STATUS}}`, `{{DEV_URL}}`, `{{DEV_PLATFORM}}` → From Q8 (Development)
- `{{TEST_STATUS}}`, `{{TEST_URL}}`, `{{TEST_PLATFORM}}` → From Q8 (Testing/CI)
- `{{STAGING_STATUS}}`, `{{STAGING_URL}}`, `{{STAGING_PLATFORM}}` → From Q8 (Staging)
- `{{PROD_STATUS}}`, `{{PROD_URL}}`, `{{PROD_PLATFORM}}` → From Q8 (Production)
- `{{CONFIG_MANAGEMENT_STRATEGY}}` → From Q9
- `{{IAC_TOOLING}}` → From Q10 (or "Manual" if option 1)
- `{{MONITORING_SETUP}}` → "To be configured" (default)

**Output Location:** `{{DOCS_DIR}}/technical_status.md`

**Validation:**
- [ ] Current date is accurate
- [ ] Tech stack matches user's info
- [ ] No placeholder brackets `[ ]` remaining

---

### Step 4: Generate ROADMAP.md

**Source:** `doc-templates/roadmap.template.md`

**Initial Content:**

```markdown
# [PROJECT_NAME] - Implementation Plan

**Status:** 📋 PLANNING
**Last Updated:** [TODAY_DATE]

---

## Project Overview

**Purpose:** [PROJECT_PURPOSE]

**Technology Stack:** [TECH_STACK]

**Architecture:** [ARCHITECTURE_TYPE]

---

## Development Cycle Roadmap

This document tracks planned and completed development cycles (iterations) for [PROJECT_NAME].

### Cycle/Iteration Status Legend
- 📋 **PLANNING** - Defined but not started
- 🏗️ **IN PROGRESS** - Currently being implemented
- ✅ **COMPLETE** - Implemented, tested, documented
- ⏸️ **PAUSED** - Started but temporarily suspended
- ❌ **CANCELLED** - Planned but no longer needed

---

## Planned Cycles

### Cycle 1.1: [TO BE DEFINED]

*Status:* 📋 PLANNING

**Purpose:** [Define first feature/capability to build]

**Primary Inputs:** [What data/requirements needed]

**Visible Output:** [What users will see/interact with]

**Technical Approach:** [High-level technical strategy]

**Timeline:** [Estimated duration]

**Dependencies:** None (first cycle)

**Success Criteria:**
- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] All tests passing
- [ ] Documentation updated

**Detailed Plan:** To be created in `roadmap/CYCLE_1_1_IMPLEMENTATION_PLAN.md`

---

### Future Cycles

> **Note:** Define additional cycles after completing Cycle 1.1

**Potential Features** (from project description):
[IF_USER_PROVIDED_FEATURES]
- [FEATURE_1]
- [FEATURE_2]
- [FEATURE_3]
[/IF]

These will be broken into specific cycles as project progresses.

---

## Cycle Alignment Rules

**Critical:** When a cycle has a detailed implementation plan:

1. **Status Synchronization**
   - This document and detailed plan must show same status
   - Never allow status divergence

2. **Scope Alignment**
   - Inputs/outputs must match between documents
   - Any changes update both simultaneously

3. **Timeline Consistency**
   - Estimates match or detailed plan explains variance

---

## Completed Cycles

None yet - starting fresh!

---

## Change Log

### [TODAY_DATE]
- Created initial implementation plan
- Defined Cycle 1.1 placeholder
- Ready for cycle definition

---

## Notes

**Methodology:** This project uses Development Cycles (sequential iterations), not time-boxed sprints.

**Cycle Completion:** A cycle is only complete when:
- Implemented with real components (no stubs)
- Fully tested (unit, integration, user testing)
- Documented (patterns, technical status)
- User-visible results delivered

See `context_master_guide.md` for complete development cycle methodology.

---

## Two-Tier Planning System

This project uses a two-tier planning approach:

### Tier 1: This Document (Strategic Roadmap)
- Lists ALL planned cycles with brief descriptions
- Tracks status: 📋 PLANNING → 🏗️ IN PROGRESS → ✅ COMPLETE
- Provides timeline estimates and dependencies
- Points to detailed plans when ready to implement

### Tier 2: roadmap/ (Tactical Plans)
- Created JUST-IN-TIME when ready to implement a cycle
- Contains detailed research, scope analysis, technical design
- Includes decomposition if feature is too large
- Requires user approval before implementation begins

### Planning Workflow (MCP Tools)

**Before implementing any cycle, use these MCP tools:**

1. `start_cycle_planning(cycle_id)` - Initiate planning, get research guidance
2. `analyze_cycle_scope(...)` - Assess complexity, get decomposition recommendations  
3. `create_cycle_plan(cycle_id, name)` - Create detailed plan from template
4. `approve_cycle_plan(cycle_id)` - Validate and mark ready for implementation

**Key Principle:** A senior engineer knows to ship small, test, iterate.
If a cycle is too large (complexity score > 10), decompose into sub-cycles.
```

**Future State Content (if captured in Step 2.6):**

If the user captured future state during bootstrap, add these sections:

**For Tier 2 (Planned) items:** Add after "Planned Cycles" section:
```markdown
---

## Planned Cycles (From Bootstrap)

These cycles were identified during bootstrap for near-term implementation.
FluxFrame has prepared placeholder patterns and documentation for these.

### Cycle X.Y: [PLANNED_ITEM_INTENTION]

*Status:* 📋 PLANNING  
*Timeline:* Soon  
*FluxFrame Prep:* [PLANNED_ITEM_PLACEHOLDER]

**Purpose:** [PLANNED_ITEM_INTENTION]

**Impact on FluxFrame:** [PLANNED_ITEM_FLUXFRAME_IMPACT]

**Note:** This cycle was identified during bootstrap. Define detailed scope when ready to implement.

---
```

**For Tier 3 (Aspirational) items:** Add after "Completed Cycles" section:
```markdown
---

## Future Considerations (Aspirational)

These items were identified during bootstrap as potential future capabilities.
No FluxFrame preparation has been done - these are documentation only.
When ready to implement, create a development cycle.

| Item | Category | Notes |
|------|----------|-------|
| [ASPIRATIONAL_ITEM_INTENTION] | [CATEGORY] | [FLUXFRAME_IMPACT or "To be determined"] |

---

> **Note:** When implementing any of these, update:
> - This implementation plan (create specific cycle)
> - Relevant pattern files
> - AI rules as needed
> - technical_status.md
```

**If no Future State captured:** Do not include these sections.

**Placeholder Replacements:**
- `[PROJECT_NAME]` → User's project name
- `[TODAY_DATE]` → Current date
- `[PROJECT_PURPOSE]` → User's purpose description
- `[TECH_STACK]` → User's technology stack  
- `[ARCHITECTURE_TYPE]` → Architecture type
- `[IF_USER_PROVIDED_FEATURES]` → Conditional: include if user mentioned features
- `[PLANNED_ITEM_*]` → From `get_future_state({ tier: "planned" })`
- `[ASPIRATIONAL_ITEM_*]` → From `get_future_state({ tier: "aspirational" })`

**Output Location:** `{{DOCS_DIR}}/ROADMAP.md`

**Validation:**
- [ ] Cycle 1.1 has placeholder for user to fill
- [ ] No unfilled placeholders
- [ ] References to detailed plans are correct
- [ ] Two-tier planning system explanation included
- [ ] Future State sections included if items were captured

---

### Step 5: Create Pattern Library Structure

> [!IMPORTANT]
> **ALL pattern files below are REQUIRED.** Create them regardless of current project state.
> Projects evolve—local-only today may need infrastructure tomorrow.
> Since bootstrap instructions are removed after completion, all pattern files must exist.
> Use "Status: Placeholder" content when a category is not currently applicable.

**Files to Create:**

**5.1: `{{DOCS_DIR}}/patterns/README.md`** (REQUIRED)

Source: `pattern-library-system/meta-patterns/pattern_template.md`

Content: Index file listing pattern categories

**5.2: `{{DOCS_DIR}}/patterns/ui_patterns.md`** (REQUIRED)

If project has frontend, use this content:
```markdown
# {{PROJECT_NAME}} - UI Patterns

**Purpose:** Reusable UI component patterns and conventions.

**Status:** Empty - patterns will be added as features are built

---

## Pattern Categories

Patterns will be added here as they are established during development.

Expected categories:
- Component structure
- Styling approach
- State management
- User interactions

---

## How to Add Patterns

When you establish a new UI pattern:
1. Document it in this file
2. Include code example
3. Note when/where to use it
4. Reference implementation location

See `context_master_guide.md` Section 4 for pattern documentation guidelines.
```

If project has NO frontend, create as placeholder:
```markdown
# {{PROJECT_NAME}} - UI Patterns

**Purpose:** UI component patterns and conventions.

**Status:** ⏹️ Placeholder - no frontend in current stack

---

> **Note:** This file exists as a placeholder. If UI components are added later, document patterns here. Projects evolve—this ensures the pattern file exists when needed.

See `context_master_guide.md` Section 4 for pattern documentation guidelines.
```

**5.3: `{{DOCS_DIR}}/patterns/api_patterns.md`** (REQUIRED)

If project has backend/API, use this content:
```markdown
# {{PROJECT_NAME}} - API Patterns

**Purpose:** API endpoint patterns, authentication, data handling.

**Status:** Empty - patterns will be added as features are built

---

## Pattern Categories

Patterns will be added here as they are established during development.

Expected categories:
- Endpoint structure
- Authentication/authorization
- Error handling
- Data validation

---

## How to Add Patterns

When you establish a new API pattern:
1. Document it in this file
2. Include code example
3. Note when/where to use it  
4. Reference implementation location

See `context_master_guide.md` Section 4 for pattern documentation guidelines.
```

If project has NO backend/API, create as placeholder:
```markdown
# {{PROJECT_NAME}} - API Patterns

**Purpose:** API endpoint patterns, authentication, data handling.

**Status:** ⏹️ Placeholder - no API/backend in current stack

---

> **Note:** This file exists as a placeholder. If API endpoints are added later, document patterns here. Projects evolve—this ensures the pattern file exists when needed.

See `context_master_guide.md` Section 4 for pattern documentation guidelines.
```

**5.4: `{{DOCS_DIR}}/patterns/data_patterns.md`** (REQUIRED)

If project has database, use this content:
```markdown
# {{PROJECT_NAME}} - Data Patterns

**Purpose:** Database queries, data models, persistence patterns.

**Status:** Empty - patterns will be added as features are built

---

## How to Add Patterns

When you establish a new data pattern:
1. Document it in this file
2. Include code example
3. Note when/where to use it
4. Reference implementation location

See `context_master_guide.md` Section 4 for pattern documentation guidelines.
```

If project has NO database, create as placeholder:
```markdown
# {{PROJECT_NAME}} - Data Patterns

**Purpose:** Database queries, data models, persistence patterns.

**Status:** ⏹️ Placeholder - no database in current stack

---

> **Note:** This file exists as a placeholder. If a database is added later, document patterns here. Projects evolve—this ensures the pattern file exists when needed.

See `context_master_guide.md` Section 4 for pattern documentation guidelines.
```

**5.5: `{{DOCS_DIR}}/patterns/infra_patterns.md`** (REQUIRED)

**Source:** `doc-templates/infra_patterns.template.md`

This file is ALWAYS created from template—even for local-only projects. The template has "Status: Template - patterns will be added as infrastructure is established" which works as a placeholder.

If project has infrastructure (CI/CD, cloud, IaC), customize with detected/chosen infrastructure.

If project is local-only, create from template as-is. The template is designed to work as a placeholder.

**Include Planned Items (Tier 2):**

If the user captured Tier 2 (Planned) items during Step 2.6 that relate to infrastructure, add a "Planned Patterns" section:

```markdown
---

## Planned Patterns (Prepared for Implementation)

*Note: These sections are placeholders for actively planned capabilities.*

### [PLANNED_ITEM_INTENTION] Patterns (Planned - Soon)

**Status:** Placeholder - actively preparing for this  
**Bootstrap Decision:** User indicated this as a planned near-term goal

When implemented, this section will contain:
- [Relevant pattern types based on category]

**To implement:** Create a development cycle, then update this section.

---
```

Repeat for each Tier 2 item in the infrastructure/environment category.

**Note:** Tier 3 (Aspirational) items do NOT get pattern placeholders - they're only documented in ROADMAP.md.

**Validation:**
- [ ] ALL 5 pattern files created (README + 4 domain files)
- [ ] Files use placeholder content when domain not applicable
- [ ] No pattern files skipped based on current stack
- [ ] Planned items (Tier 2) have placeholder sections in relevant pattern files

---

### Step 5.6: Create Seed Data Infrastructure (ALWAYS)

> [!IMPORTANT]
> **Seed data is ALWAYS created**, similar to pattern files.
> This provides consistent structure for AI context, testing, and development.
> The Q-Data answer determines content depth, not whether the directory exists.

**Source:** `doc-templates/data_seeding.template.md`

**Files to Create:**

**5.6.1: `seed_data/README.md`** (ALWAYS)

Generate from template with these replacements:
- `{{PROJECT_NAME}}` → User's project name
- `{{DOCS_DIR}}` → Documentation directory path
- `{{DATA_FORMAT}}` → JSON (default) or user's choice from Q-Data
- `{{TODAY_DATE}}` → Current date
- `{{LANGUAGE}}` → Primary language (TypeScript/Python/etc.)

**5.6.2: Directory `.gitkeep` files** (Based on Q-Data answer)

**If Q-Data = "Full Setup" or "Basic Structure":**
```bash
touch seed_data/fixtures/.gitkeep
touch seed_data/samples/.gitkeep
touch seed_data/factories/.gitkeep
touch seed_data/schemas/.gitkeep
```

**If Q-Data = "Minimal":**
Only `seed_data/README.md` - no subdirectories yet.

**5.6.3: Starter Fixtures** (Only if Q-Data = "Full Setup")

Based on detected domain entities, create example fixtures:

```json
// seed_data/fixtures/example_{{ENTITY}}.json
{
  "_meta": {
    "description": "Example {{ENTITY}} fixture for testing",
    "created": "{{TODAY_DATE}}"
  },
  "data": {
    // Infer structure from database models or API schemas
  }
}
```

**5.6.4: Sample Data** (Only if Q-Data = "Full Setup")

Create representative samples for AI context:

```json
// seed_data/samples/{{ENTITY}}.sample.json
{
  "_meta": {
    "description": "Sample {{ENTITY}} data for AI context and development",
    "purpose": "Shows AI agents what {{ENTITY}} objects look like"
  },
  "examples": [
    // 2-3 realistic examples with variety
  ]
}
```

**Content for data_patterns.md:**

Add this section to `{{DOCS_DIR}}/patterns/data_patterns.md`:

```markdown
## Seed Data Patterns

### Fixture Loading Pattern

**Use for:** Loading test fixtures in unit/integration tests

**Location:** `seed_data/fixtures/`

**Pattern:**
- One fixture per test scenario
- Descriptive names: `{entity}_{state}.json`
- Include `_meta` section for documentation
- Keep fixtures minimal but complete

### Factory Pattern

**Use for:** Generating varied test data programmatically

**Location:** `seed_data/factories/`

**Pattern:**
- Functions that return valid domain objects
- Accept overrides for specific fields
- Use realistic but randomized data

### Sample Data Pattern

**Use for:** Providing AI agents with domain context

**Location:** `seed_data/samples/`

**Pattern:**
- Representative examples, not edge cases
- Include variety (different states, types)
- Document relationships between entities
- Update when schema changes
```

**Validation:**
- [ ] `seed_data/README.md` created with correct placeholders filled
- [ ] Directory structure matches Q-Data choice
- [ ] If Full Setup: starter fixtures created for detected entities
- [ ] `data_patterns.md` updated with seed data patterns

---

### Step 5.7: Create Reference Library (ALWAYS)

> [!IMPORTANT]
> **Reference Library is ALWAYS created**, similar to pattern files and seed data.
> This provides a consistent location for capturing real-world context, user research,
> and external inputs that inform product decisions.

**Purpose:** The Reference Library stores DESCRIPTIVE information (what the real world looks like)
as opposed to PRESCRIPTIVE documentation (what to do and how). This distinction is critical:
- **Prescriptive:** patterns/, workflows/, context_master_guide.md - tell you WHAT to do
- **Descriptive:** reference_library/ - tells you WHAT EXISTS in the real world

**Source:** `doc-templates/reference_library_readme.template.md`

**Files to Create:**

**5.7.1: `{{DOCS_DIR}}/reference_library/README.md`** (ALWAYS)

Generate from template with these replacements:
- `{{PROJECT_NAME}}` → User's project name
- `{{TODAY_DATE}}` → Current date

**5.7.2: Directory `.gitkeep` files**

```bash
touch {{DOCS_DIR}}/reference_library/correspondence/.gitkeep
touch {{DOCS_DIR}}/reference_library/user_research/.gitkeep
touch {{DOCS_DIR}}/reference_library/market_research/.gitkeep
touch {{DOCS_DIR}}/reference_library/domain_knowledge/.gitkeep
touch {{DOCS_DIR}}/reference_library/specifications/.gitkeep
```

**Key Philosophy to Convey:**

When presenting the Reference Library to the user, explain:

```markdown
## Reference Library (Descriptive Context)

I've created a Reference Library for storing real-world context:

**Location:** `{{DOCS_DIR}}/reference_library/`

**What goes here:**
- `correspondence/` - Emails, Slack threads, meeting notes with stakeholders
- `user_research/` - Interviews, feedback, usage scenarios from users
- `market_research/` - Competitor analysis, industry reports
- `domain_knowledge/` - Expert input, terminology, business context
- `specifications/` - External specs, PDFs, partner documentation

**Key principle:** This library is DESCRIPTIVE (what exists) not PRESCRIPTIVE (what to do).
It INFORMS decisions but doesn't DICTATE them. Contradictions are valuable information.

**When to use it:**
- Before planning features (check user_research/)
- When designing tests (reference real usage scenarios)
- When making product decisions (consider market context)
```

**Validation:**
- [ ] `reference_library/README.md` created with philosophy documented
- [ ] All subdirectories created with .gitkeep files
- [ ] User understands descriptive vs prescriptive distinction

---

### Step 6: Create API Contract Standards (Conditional)

**Only if:** User chose specific API contract approach

**Source:** `doc-templates/api_contract_standards.template.md`

**For OpenAPI approach, create:**

`{{DOCS_DIR}}/api_contract_standards.md` with OpenAPI-specific content

**For GraphQL approach, create:**

`{{DOCS_DIR}}/api_contract_standards.md` with GraphQL-specific content

**For JSON Schema or Custom:**

`{{DOCS_DIR}}/api_contract_standards.md` with appropriate content

**Validation:**
- [ ] Content matches chosen approach
- [ ] Examples are relevant to project stack
- [ ] References correct tools/libraries

---

### Step 7: Create Workflow Documentation (MANDATORY)

**Files to Create in `{{DOCS_DIR}}/workflows/`:**

**7.1: `cycle_workflow.md`**
- **Source:** `doc-templates/workflows/cycle_workflow.template.md`
- **Replace:** 
  - `{{VERIFICATION_ENV}}` → User's verification choice (Localhost/Staging/etc.)
  - `{{VERIFICATION_INSTRUCTIONS}}` → Implementation specific instructions (see Step 2 logic)

**7.2: `change_request_protocol.md`**
- **Source:** `doc-templates/workflows/change_request_protocol.template.md`
- **Replace:**
  - `{{VERIFICATION_ENV}}` → User's verification choice
  - `{{VERIFICATION_INSTRUCTIONS}}` → Implementation specific instructions

**7.3: `README.md` (Workflow Index)**
- Create simple index linking to above protocols.

**Validation:**
- [ ] Protocol files created
- [ ] Verification steps customized to environment
- [ ] Files valid markdown

---

### Step 7.5: Generate FluxFrame Manual (REQUIRED)

**Purpose:** Create a persistent manual that remains after bootstrap, explaining how to work with FluxFrame and keep rules updated. This file is placed in the project root for high visibility.

**Source:** `doc-templates/fluxframe_manual.template.md`

**Output:** `FLUXFRAME_MANUAL.md` (in project root)

**Placeholder Replacements:**

| Placeholder | Replacement |
|-------------|-------------|
| `{{DOCS_DIR}}` | Documentation directory path |
| `{{AI_TOOLS_SECTION}}` | List of configured AI tools (see below) |
| `{{TOOL_SPECIFIC_FILES}}` | Tool-specific file list |
| `{{API_APPROACH_SECTION}}` | Chosen API contract approach |

**AI_TOOLS_SECTION Content:**

Based on user's tool selection (Q2), generate:

```markdown
**Primary Tools:**
- [TOOL_NAME]: [INTEGRATION_LEVEL]
  - Rules: [RULES_FILE]
  - Config: [CONFIG_LOCATION]
```

Example:
```markdown
**Primary Tools:**
- Claude Code: Full Integration
  - Rules: `CLAUDE.md` + `.claude/rules/`
  - Config: `~/.config/claude/config.json`
- Cline: Full Integration  
  - Rules: `.clinerules/`
  - Config: VS Code settings
```

**TOOL_SPECIFIC_FILES Content:**

Based on configured tools, list additional rule files:
- Claude Code: ", `CLAUDE.md`, `.claude/rules/`"
- Cline: ", `.clinerules/`"
- Roo Code: ", `.roomodes`, `.roo/rules/`"
- Antigravity: ", `GEMINI.md`"
- Cursor: ", `.cursorrules`"

**API_APPROACH_SECTION Content:**

Based on user's API choice:
- OpenAPI: "OpenAPI + Pydantic with contract-first development. See `api_contract_standards.md`."
- GraphQL: "GraphQL with typed schema. See `api_contract_standards.md`."
- JSON Schema: "JSON Schema for contract validation. See `api_contract_standards.md`."
- None: "No API contract approach configured. Add one when APIs are introduced."

**Validation:**
- [ ] File created at `FLUXFRAME_MANUAL.md` (in project root)
- [ ] All placeholders replaced
- [ ] Tool-specific sections match configured tools
- [ ] API approach section accurate

---

### Step 8: Generate MCP Server

**Source:** `mcp-server/template-mcp-server.js`

**Process:**
1. Copy template
2. Replace configuration placeholders:
   ```javascript
   const PROJECT_DOCS_DIR = path.join(__dirname, '{{DOCS_DIR}}');
   const PROJECT_NAME = '{{PROJECT_NAME}}';
   ```
3. Save as `mcp-server.js` in project root

**Validation:**
- [ ] Paths are correct for user's OS
- [ ] Directory references match created structure

---

### Step 9: Create package.json (if doesn't exist)

**Check:** Does `package.json` already exist?

**If YES:** Add MCP dependency to existing file

**If NO:** Create new file:

```json
{
  "name": "{{PROJECT_NAME_SLUG}}",
  "version": "0.1.0",
  "description": "{{PROJECT_PURPOSE}}",
  "type": "module",
  "scripts": {
    "mcp": "node mcp-server.js"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^0.5.0"
  }
}
```

**PROJECT_NAME_SLUG:** Lowercase, hyphenated version of project name
- "TaskFlow Pro" → "taskflow-pro"
- "Acme CRM" → "acme-crm"

---

### Step 9.5: Research Browser Automation Capabilities (RECOMMENDED)

**This step is RECOMMENDED for web projects where browser automation is desired.**

**Why Research:**
Browser automation capabilities are evolving rapidly. Features documented today may be outdated within months. Research ensures the user gets the most current capabilities.

**When to Offer Research:**
- User selected browser automation
- User selected emerging tools (Cursor, Antigravity, OpenAI tools)
- User asked about browser features

**Research Process:**

```markdown
## Browser Automation Research

Before finalizing your browser setup, I can research the current capabilities 
of your selected tools. This field evolves rapidly.

**Selected tools to research:**
- [LIST USER'S TOOLS]

**Research will cover:**
- Current browser automation features
- Recent announcements (last 3-6 months)
- Setup requirements
- Known limitations

Proceed with research? (yes/skip)
```

**If User Chooses Research:**

1. **Search Official Documentation:**
   - Claude Code: `code.claude.com/docs` (look for Chrome/browser sections)
   - Cursor: `cursor.com/docs`, `cursor.com/changelog`
   - Cline: GitHub releases, VS Code marketplace
   - Roo Code: GitHub releases (roo-cline)
   - Antigravity/Gemini: Google AI docs, Google I/O announcements
   - OpenAI: `platform.openai.com`, OpenAI blog

2. **Search for Recent Announcements:**
   - Tool's official blog/changelog
   - Twitter/X announcements from official accounts
   - Major tech news (for significant feature launches)

3. **Community Sources (verify carefully):**
   - Reddit (r/cursor, r/ClaudeAI, etc.)
   - GitHub issues/discussions

4. **Compile Research Report:**

```markdown
## Browser Capabilities Research Results

**Research Date:** [TODAY'S DATE]
**Tools Researched:** [LIST]

---

### Claude Code
**Browser Status:** ✅ Chrome Integration (Beta)
**Current Capabilities:** [as documented]
**Recent Changes:** [any found]
**Setup Requirements:** 
- Chrome browser
- Claude in Chrome extension v1.0.36+
- Claude Code v2.0.73+
- Paid Claude plan
**Recommendation:** [Enable/Disable based on user's needs]

---

### Cursor
**Browser Status:** [RESEARCH RESULT]
**Current Capabilities:** [findings]
**Recent Changes:** [findings]
**Setup Requirements:** [findings]
**Recommendation:** [based on findings]

---

### [Other Selected Tools...]

---

## Summary

Based on current research:
| Tool | Browser Support | Recommendation |
|------|-----------------|----------------|
| Claude Code | ✅ Full | Enable Chrome |
| Cursor | [status] | [recommendation] |
| ... | ... | ... |

**Recommended Configuration:**
[Based on research, provide specific recommendations]

Proceed with these settings? (yes/modify)
```

**Store Research Results:**
- Save to `{{DOCS_DIR}}/browser_automation_research.md`
- Include research date for future reference
- Can be re-run periodically to check for updates

---

### Step 9.6: Configure Log Access (OPTIONAL)

**This step is OPTIONAL based on user's Q11 answer (Observability & Log Access).**

**When to Execute:**
- User chose option 1 (Full setup) or option 2 (Local only) in Q11
- Skip if user chose option 3 (Later) or option 4 (No)

**Purpose:**
Configure AI assistant access to logs from various environments for debugging and troubleshooting.

---

#### If User Chose Option 1 (Full Setup):

**Step 9.6.1: Research Log Access Options**

Based on user's infrastructure answers (Q8-Q10), research available log access methods:

```markdown
## Log Access Research

Based on your infrastructure setup, I'll research the best ways to access logs:

**Your Environments:**
| Environment | Platform | Research Focus |
|-------------|----------|----------------|
| Development | {{DEV_PLATFORM}} | Local log access methods |
| Testing/CI | {{TEST_PLATFORM}} | CI/CD log APIs |
| Staging | {{STAGING_PLATFORM}} | Cloud logging access |
| Production | {{PROD_PLATFORM}} | Cloud logging access |

**Additional Sources:**
| Source | Your Setup | Research Focus |
|--------|------------|----------------|
| CI/CD | {{CICD_PLATFORM}} | Pipeline log APIs |
| Database | {{DATABASE_TECHNOLOGY}} | Query/error log access |
| Monitoring | {{MONITORING_SETUP}} | APM/observability APIs |

Researching now...
```

**Step 9.6.2: Research by Platform Type**

Research approaches vary by platform. For each platform the user has:

**Cloud Providers:**
- AWS: CloudWatch Logs, `aws logs` CLI, IAM permissions needed
- GCP: Cloud Logging, `gcloud logging` CLI, service account needed
- Azure: Azure Monitor, `az monitor` CLI, RBAC permissions needed

**CI/CD Platforms:**
- GitHub Actions: `gh run view --log`, API tokens
- GitLab CI: API access, personal access tokens
- CircleCI: API v2, project tokens
- Jenkins: Script console access, API tokens

**Containerization:**
- Docker: `docker logs`, local access
- Kubernetes: `kubectl logs`, cluster access, service account

**Log Aggregators:**
- Datadog: API key, log query API
- Splunk: API access, search commands
- ELK/OpenSearch: API queries, authentication
- Grafana Loki: LogQL, API access

**Databases:**
- PostgreSQL: `pg_stat_statements`, log files
- MySQL: slow query log, error log
- MongoDB: profiler, `db.currentOp()`

**Step 9.6.3: Document Configuration**

Create `{{DOCS_DIR}}/log_access_setup.md` from template with researched configuration.

**Step 9.6.4: Configure MCP Tools**

Update MCP server configuration with log access settings based on research.

---

#### If User Chose Option 2 (Local Only):

Configure minimal local log access:

```markdown
## Local Log Access Configuration

Setting up local development log access:

**Docker Logs** (if using Docker):
- Command: `docker logs -f <container_name>`
- MCP tool: `get_logs` with source="docker"

**File Logs** (if using file logging):
- Location: [Ask user or detect from project]
- Command: `tail -f <log_file>`
- MCP tool: `get_logs` with source="file"

**Application Console** (stdout/stderr):
- Captured during development server run
- MCP tool: Available during active sessions

This minimal setup requires no additional credentials.
```

---

#### If User Chose Option 3 (Later) or Option 4 (No):

**For Option 3 (Later):**
Add to `ROADMAP.md`:

```markdown
### Future: Log Access Configuration

**Status:** 📋 PLANNED (User deferred during bootstrap)

**When to implement:** Any future development cycle

**What to configure:**
- Environment log access (from Q8 answers)
- CI/CD log access (from Q9 answers)
- Database log access (if applicable)

**To set up:** Re-run log access configuration step or add manually.
```

**For Option 4 (No):**
Document in AI rules that manual log checking is expected:

```markdown
## Log Access

Log access is not configured for this project. When debugging:
- Request user to provide relevant log excerpts
- Guide user on where to find logs for each environment
- Describe what log patterns to look for
```

---

**Validation:**
- [ ] Log access choice recorded
- [ ] If full/local: Configuration documented in `log_access_setup.md`
- [ ] If full/local: MCP tools configured appropriately
- [ ] If deferred: Added to ROADMAP.md
- [ ] If declined: Manual guidance documented in AI rules

---

### Step 10: Generate AI Rules (to Staging Directory)

**CRITICAL: Generate to staging, NOT final locations**

During bootstrap, temporary "bootstrap-resume" rules exist at the final locations (CLAUDE.md, .clinerules, etc.). These tell the AI to continue bootstrap on restart.

To prevent project rules from interfering with bootstrap completion, generate ALL AI rules to a staging directory. They will be moved to final locations during Phase 5 (Cleanup).

**Staging directory:** `.fluxframe-pending/`

```bash
mkdir -p .fluxframe-pending
```

**Universal Baseline (Always):**
1. Fill `ai-rules/core/template.agents.md` with project details.
2. Save as `.fluxframe-pending/AGENTS.md` (NOT project root yet).

**Tool-Specific (Based on user selection):**

#### Claude Code (Full):
1. Generate from `ai-rules/claude-code/template.claude.md`.
2. Save to `.fluxframe-pending/CLAUDE.md`.
3. Create `.fluxframe-pending/.claude/rules/` directory.
4. Generate rule files from templates: `api-rules.md`, `frontend-rules.md`, `test-rules.md`.
5. If browser automation enabled:
   - Add Chrome integration section to CLAUDE.md
   - Include setup instructions for `--chrome` flag
   - Document Chrome extension requirements
   - Reference research results if available

#### Claude Code (Basic):
1. Note: symlink will be created during cleanup phase.

#### Roo Code (Full):
1. Generate from `ai-rules/roo-code/template.roomodes.yaml`.
2. Save to `.fluxframe-pending/.roomodes`.
3. Create `.fluxframe-pending/.roo/rules/`, `.fluxframe-pending/.roo/rules-code/`, `.fluxframe-pending/.roo/rules-architect/`.
4. Generate rule files from templates within these directories.

#### Roo Code (Basic):
1. No action needed (Roo auto-detects `AGENTS.md` which will be moved from staging).

#### Cline (Full):
1. Create `.fluxframe-pending/.clinerules/` directory.
2. Generate rule files from `ai-rules/cline/clinerules-folder/`: `01-core-rules.md`, `02-patterns.md`, `03-workflows.md`.

#### Cline (Basic):
1. Note: symlink will be created during cleanup phase.

#### Antigravity (Full):
1. Generate from `ai-rules/antigravity/template.gemini.md`.
2. Save to `.fluxframe-pending/GEMINI.md`.

#### Antigravity (Basic):
1. Note: symlink will be created during cleanup phase.

#### Cursor:
1. If Cursor is selected, generate `.fluxframe-pending/.cursorrules` from AGENTS.md content.

**Why staging?**
- Bootstrap-resume rules (created in Gate 2) remain active throughout bootstrap
- Prevents project rules from interfering with bootstrap flow
- AI assistant continues to see "bootstrap in progress" instructions
- All rules are activated simultaneously during cleanup for clean transition

**Verification Rule Logic:**
Based on user's Q8 Answer:
- **Localhost:** "Verify locally. Ensure you can run the app and user can access it."
- **Preview/Staging/Prod:** "Instruct user to DEPLOY to `{{VERIFICATION_ENV}}` and verify functionality there."

**API Contract Rules by Approach:**

**OpenAPI:**
```
**For API Development (MANDATORY):**
- ALL new endpoints MUST use Pydantic response models
- ALL endpoints MUST have `response_model` parameter
- Frontend MUST use auto-generated TypeScript types
- NO direct fetch calls - use API client
- Reference: `{{DOCS_DIR}}/api_contract_standards.md`
```

**GraphQL:**
```
**For API Development (MANDATORY):**
- ALL queries/mutations MUST have schema definitions
- Schema-first development required
- All resolvers must match schema
- Reference: `{{DOCS_DIR}}/api_contract_standards.md`
```

**JSON Schema/Custom:**
```
**For API Development (MANDATORY):**
- ALL API responses MUST have documented contracts
- Contracts defined in `{{DOCS_DIR}}/api_contract_standards.md`
- Validation required before deployment
```

**Validation:**
- [ ] No `{{PLACEHOLDERS}}` remaining
- [ ] Paths are correct
- [ ] API rules match chosen approach

---

### Step 11: Install Dependencies

**Command:**
```bash
npm install
```

**Validation:**
- [ ] `node_modules/` created
- [ ] `@modelcontextprotocol/sdk` installed
- [ ] No errors

**If errors:**
- Check node/npm installed
- Check network connection
- Try `npm install --legacy-peer-deps`

---

### Step 12: Test MCP Server

**Command:**
```bash
node mcp-server.js
```

**Expected Output:**
```
Project Docs MCP Server running on stdio
Single source of truth: {{DOCS_DIR}}/context_master_guide.md
```

**If errors:**
- Check `PROJECT_DOCS_DIR` path is correct
- Ensure `context_master_guide.md` exists at that path
- Verify file syntax (no JSON errors)

**Validation:**
- [ ] Server starts without errors
- [ ] Mentions correct documentation directory
- [ ] Can Ctrl+C to stop

---

## Final Validation Checklist

Before presenting to user, verify:

### Files Created

**Documentation (in final location):**
- [ ] `{{DOCS_DIR}}/context_master_guide.md`
- [ ] `{{DOCS_DIR}}/technical_status.md`
- [ ] `{{DOCS_DIR}}/ROADMAP.md`
- [ ] `{{DOCS_DIR}}/BUGS.md`
- [ ] `{{DOCS_DIR}}/bootstrap_decisions.md` **(NEW - decision log with reasoning)**
- [ ] `{{DOCS_DIR}}/patterns/README.md`
- [ ] `{{DOCS_DIR}}/patterns/*_patterns.md` (as applicable)
- [ ] `{{DOCS_DIR}}/workflows/cycle_workflow.md`
- [ ] `{{DOCS_DIR}}/workflows/change_request_protocol.md`
- [ ] `{{DOCS_DIR}}/api_contract_standards.md` (if applicable)

**AI Rules (in staging - `.fluxframe-pending/`):**
- [ ] `.fluxframe-pending/AGENTS.md`
- [ ] `.fluxframe-pending/CLAUDE.md` (if Claude Code selected)
- [ ] `.fluxframe-pending/.clinerules/` (if Cline Full selected)
- [ ] `.fluxframe-pending/.roomodes` (if Roo Code Full selected)
- [ ] `.fluxframe-pending/GEMINI.md` (if Antigravity selected)

**Bootstrap-resume rules still active (temporary):**
- [ ] `CLAUDE.md` or `AGENTS.md` or `.clinerules` contains "Bootstrap In Progress" message

**Other project files:**
- [ ] `mcp-server.js`
- [ ] `package.json`

**Seed Data (always created):**
- [ ] `seed_data/README.md`
- [ ] `seed_data/fixtures/.gitkeep` (if Q-Data = Full or Basic)
- [ ] `seed_data/samples/.gitkeep` (if Q-Data = Full or Basic)
- [ ] `seed_data/factories/.gitkeep` (if Q-Data = Full or Basic)
- [ ] `seed_data/schemas/.gitkeep` (if Q-Data = Full or Basic)

**Reference Library (always created):**
- [ ] `{{DOCS_DIR}}/reference_library/README.md`
- [ ] `{{DOCS_DIR}}/reference_library/correspondence/.gitkeep`
- [ ] `{{DOCS_DIR}}/reference_library/user_research/.gitkeep`
- [ ] `{{DOCS_DIR}}/reference_library/market_research/.gitkeep`
- [ ] `{{DOCS_DIR}}/reference_library/domain_knowledge/.gitkeep`
- [ ] `{{DOCS_DIR}}/reference_library/specifications/.gitkeep`

### Content Quality
- [ ] No `{{PLACEHOLDER}}` syntax remaining
- [ ] No `[PLACEHOLDER]` brackets remaining
- [ ] No template comments (`<!-- TEMPLATE:`)
- [ ] All paths use actual directories
- [ ] All dates are current
- [ ] Project name is consistent everywhere

### Decision Documentation
- [ ] All major decisions logged via `log_decision` tool
- [ ] `sync_decisions_to_file` called to generate `bootstrap_decisions.md`
- [ ] Decisions include reasoning, not just values
- [ ] Infrastructure decisions have alternatives considered
- [ ] API/architecture decisions have implications documented

### Technical Validation
- [ ] MCP server tested and working
- [ ] Dependencies installed
- [ ] All markdown files are valid
- [ ] No broken internal links

### Consistency
- [ ] Project name same everywhere
- [ ] Tech stack matches across docs
- [ ] API approach consistent
- [ ] Directory paths consistent

---

## Error Handling

### Error: Directory creation fails

**Cause:** Permission issues

**Solution:**
```bash
# Check permissions
ls -la .

# Create with sudo if needed (ask user first)
sudo mkdir -p {{DOCS_DIR}}
```

### Error: MCP server won't start

**Cause 1:** Wrong path to docs

**Solution:** Fix `PROJECT_DOCS_DIR` in mcp-server.js

**Cause 2:** Missing file

**Solution:** Ensure `context_master_guide.md` exists

**Cause 3:** Syntax error

**Solution:** Validate JSON/JS syntax

### Error: npm install fails

**Cause:** Network or package issues

**Solution:**
```bash
# Try alternative registry
npm install --registry https://registry.npmjs.org

# Or use legacy peer deps
npm install --legacy-peer-deps
```

---

## Success Criteria

Bootstrap is successful when:

1. ✅ All required files created
2. ✅ All placeholders filled
3. ✅ MCP server starts successfully
4. ✅ Dependencies installed
5. ✅ No errors in any file
6. ✅ User can read generated docs
7. ✅ **All decisions logged with reasoning** (bootstrap_decisions.md generated)
8. ✅ Ready to define Cycle 1.1

**Next:** Present summary to user and guide them to next steps.

---

## Step 13: Finalize Bootstrap (Atomic)

**MANDATORY:** After user approves validation, finalization happens automatically. Do NOT ask for additional confirmation.

### Why Finalization Is Atomic

Previous bootstrap iterations suffered from "soft completion" - agents would ask for cleanup confirmation, the user would context-switch, and cleanup never happened. The `finalize_bootstrap` MCP tool handles everything in one call.

### Step 13.1: Verify Ready

Before calling finalization, verify:
- `.fluxframe-pending/` directory has `AGENTS.md` and tool-specific rules
- `mcp-server.js` exists at project root
- `{{DOCS_DIR}}/` exists with generated documentation

If anything is missing, fix it first. Otherwise, proceed immediately.

### Step 13.2: Execute Finalization

Call the `finalize_bootstrap` MCP tool. This atomically:

1. **Activates project rules** - moves from `.fluxframe-pending/` to final locations
2. **Removes FluxFrame templates** - deletes `fluxframe/`, `.fluxframe-pending/`, `BOOTSTRAP_INSTRUCTIONS.md`
3. **Updates README.md** - replaces with project-specific content
4. **Cleans up state** - removes `.fluxframe-bootstrap-state.json`

After the tool completes:
1. Call `sync_decisions_to_file` one final time
2. Show the user the finalization summary
3. **CRITICAL:** Guide user to replace bootstrap MCP with project `mcp-server.js` in their AI tool config
4. Tell user to restart their AI tool

### Step 13.3: Final Confirmation

```markdown
## Bootstrap Finalized!

Your project rules are now active and all template files have been removed.

**IMPORTANT - Next Steps:**
1. Update your AI tool's MCP config to use `mcp-server.js` (replace the bootstrap MCP)
2. Restart your AI tool
3. Define Cycle 1.1 in `{{DOCS_DIR}}/ROADMAP.md`

Your `{{DOCS_DIR}}/bootstrap_decisions.md` contains the reasoning behind all configuration choices.
```

---

## Final Success Criteria (After Finalization)

Bootstrap is fully complete when:

1. ✅ All required files created
2. ✅ All placeholders filled
3. ✅ MCP server starts successfully
4. ✅ Dependencies installed
5. ✅ No errors in any file
6. ✅ User can read generated docs
7. ✅ **All decisions logged with reasoning** (bootstrap_decisions.md in docs directory)
8. ✅ Template files cleaned up (via `finalize_bootstrap`)
9. ✅ README.md updated for project
10. ✅ Ready to define Cycle 1.1
