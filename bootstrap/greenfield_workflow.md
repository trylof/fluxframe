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
4. implementation_plan.md (roadmap)
5. Pattern library structure
6. API contract standards (if applicable)
7. Workflow docs (if requested)
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
mkdir -p {{DOCS_DIR}}/implementation_plans
mkdir -p {{DOCS_DIR}}/bug_fixes
```

**Validation:**
- [ ] All directories created successfully
- [ ] Correct paths for user's OS (Windows vs Unix)
- [ ] No permission errors

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
1. **Define Cycle 1.1** in implementation_plan.md
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
- See implementation_plan.md for roadmap

---

## Testing Status

**Framework Status:** Not applicable
**Cycle 1.1:** Not started

---

## Documentation Status

- ✅ context_master_guide.md - Complete
- ✅ technical_status.md - This file
- ✅ implementation_plan.md - Template ready
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

### Step 4: Generate implementation_plan.md

**Source:** `doc-templates/implementation_plan.template.md`

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

**Detailed Plan:** To be created in `implementation_plans/CYCLE_1_1_IMPLEMENTATION_PLAN.md`

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
```

**Placeholder Replacements:**
- `[PROJECT_NAME]` → User's project name
- `[TODAY_DATE]` → Current date
- `[PROJECT_PURPOSE]` → User's purpose description
- `[TECH_STACK]` → User's technology stack  
- `[ARCHITECTURE_TYPE]` → Architecture type
- `[IF_USER_PROVIDED_FEATURES]` → Conditional: include if user mentioned features

**Output Location:** `{{DOCS_DIR}}/implementation_plan.md`

**Validation:**
- [ ] Cycle 1.1 has placeholder for user to fill
- [ ] No unfilled placeholders
- [ ] References to detailed plans are correct

---

### Step 5: Create Pattern Library Structure

**Files to Create:**

**5.1: `{{DOCS_DIR}}/patterns/README.md`**

Source: `pattern-library-system/meta-patterns/pattern_template.md`

Content: Index file listing pattern categories

**5.2: Domain-Specific Pattern Files**

Create based on stack:

**If has frontend:**
```markdown
# [PROJECT_NAME] - UI Patterns

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

**If has backend:**
```markdown
# [PROJECT_NAME] - API Patterns

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

**If has database:**
```markdown
# [PROJECT_NAME] - Data Patterns

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

**Validation:**
- [ ] Pattern files match project's stack
- [ ] Don't create frontend patterns for CLI tools
- [ ] Don't create API patterns for static sites

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
Add to `implementation_plan.md`:

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
- [ ] If deferred: Added to implementation_plan.md
- [ ] If declined: Manual guidance documented in AI rules

---

### Step 10: Generate AI Rules

**Universal Baseline (Always):**
1. Fill `ai-rules/core/template.agents.md` with project details.
2. Save as `AGENTS.md` in project root.

**Tool-Specific (Based on user selection):**

#### Claude Code (Full):
1. Generate `CLAUDE.md` from `ai-rules/claude-code/template.claude.md`.
2. Create `.claude/rules/` directory.
3. Generate rule files from templates: `api-rules.md`, `frontend-rules.md`, `test-rules.md`.
4. If browser automation enabled:
   - Add Chrome integration section to CLAUDE.md
   - Include setup instructions for `--chrome` flag
   - Document Chrome extension requirements
   - Reference research results if available

#### Claude Code (Basic):
1. Create symlink: `CLAUDE.md` → `AGENTS.md`.

#### Roo Code (Full):
1. Generate `.roomodes` from `ai-rules/roo-code/template.roomodes.yaml`.
2. Create `.roo/rules/`, `.roo/rules-code/`, `.roo/rules-architect/`.
3. Generate rule files from templates within these directories.

#### Roo Code (Basic):
1. No action needed (Roo auto-detects `AGENTS.md`).

#### Cline (Full):
1. Create `.clinerules/` directory.
2. Generate rule files from `ai-rules/cline/clinerules-folder/`: `01-core-rules.md`, `02-patterns.md`, `03-workflows.md`.

#### Cline (Basic):
1. Create symlink: `.clinerules` → `AGENTS.md`.

#### Antigravity (Full):
1. Generate `GEMINI.md` from `ai-rules/antigravity/template.gemini.md`.

#### Antigravity (Basic):
1. Create symlink: `GEMINI.md` → `AGENTS.md`.

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
- [ ] `{{DOCS_DIR}}/context_master_guide.md`
- [ ] `{{DOCS_DIR}}/technical_status.md`
- [ ] `{{DOCS_DIR}}/implementation_plan.md`
- [ ] `{{DOCS_DIR}}/bootstrap_decisions.md` **(NEW - decision log with reasoning)**
- [ ] `{{DOCS_DIR}}/patterns/README.md`
- [ ] `{{DOCS_DIR}}/patterns/*_patterns.md` (as applicable)
- [ ] `{{DOCS_DIR}}/workflows/cycle_workflow.md`
- [ ] `{{DOCS_DIR}}/workflows/change_request_protocol.md`
- [ ] `{{DOCS_DIR}}/api_contract_standards.md` (if applicable)
- [ ] `.clinerules`
- [ ] `mcp-server.js`
- [ ] `package.json`

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

## Step 13: Cleanup FluxFrame Template Files

**CRITICAL:** After user confirms bootstrap is complete and working, remove redundant FluxFrame framework files.

### Why Cleanup Is Necessary

When FluxFrame bootstraps a project, it generates all necessary files. The original template/framework files become redundant and should be removed to:
- Keep the project clean
- Avoid confusion between templates and generated files
- Reduce project size
- Prevent accidental use of templates instead of generated docs

### Step 13.1: Present Cleanup Summary

Ask user for confirmation:

```markdown
## Cleanup: Remove FluxFrame Template Files

Your project is now bootstrapped with FluxFrame. The framework template files are no longer needed.

### Files to REMOVE (redundant templates):
- `BOOTSTRAP_INSTRUCTIONS.md` - Bootstrap complete
- `RESTRUCTURE_PLAN.md` - Internal planning (if exists)
- `ai-rules/` - Templates (your rules are in AGENTS.md + tool-specific files)
- `bootstrap/` - Workflow instructions (bootstrap complete)
- `doc-templates/` - Templates (your docs are in {{DOCS_DIR}}/)
- `mcp-server/` - Template (your server is at ./mcp-server.js)
- `pattern-library-system/` - Meta-patterns (your patterns are in {{DOCS_DIR}}/patterns/)
- `development-cycles/` - Framework docs (your workflows are in {{DOCS_DIR}}/workflows/)
- `testing-framework/` - Framework reference docs
- `examples/` - Example project (not needed)

### Files that STAY (your project files):
- `{{DOCS_DIR}}/` - Your project documentation
- `AGENTS.md` - Your AI baseline rules
- `[tool-specific files]` - Your tool configurations
- `mcp-server.js` - Your MCP server
- `package.json` - Your project config
- `README.md` - Your project readme (will be updated)
- `PHILOSOPHY.md` - (Optional: can keep as reference or remove)

Shall I remove the template files now?
```

### Step 13.2: Execute Cleanup

**Commands (Unix/macOS):**
```bash
# Remove redundant FluxFrame template directories
rm -rf ai-rules/
rm -rf bootstrap/
rm -rf doc-templates/
rm -rf mcp-server/
rm -rf pattern-library-system/
rm -rf development-cycles/
rm -rf testing-framework/
rm -rf examples/

# Remove redundant FluxFrame files
rm -f BOOTSTRAP_INSTRUCTIONS.md
rm -f RESTRUCTURE_PLAN.md

# Optional: Remove or keep PHILOSOPHY.md based on user preference
# rm -f PHILOSOPHY.md
```

**Commands (Windows PowerShell):**
```powershell
Remove-Item -Recurse -Force ai-rules, bootstrap, doc-templates, mcp-server, pattern-library-system, development-cycles, testing-framework, examples -ErrorAction SilentlyContinue
Remove-Item -Force BOOTSTRAP_INSTRUCTIONS.md, RESTRUCTURE_PLAN.md -ErrorAction SilentlyContinue
```

### Step 13.3: Update README.md

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

### AI Assistance
- MCP Server: `npm run mcp`
- AI Rules: See `AGENTS.md` and tool-specific configurations

## License

[License information]
```

### Step 13.4: Verify Cleanup Complete

```bash
# Verify only project files remain
ls -la

# Test MCP server still works
node mcp-server.js

# Verify docs still accessible
ls {{DOCS_DIR}}/
```

**Validation:**
- [ ] Only project files remain
- [ ] No template directories left
- [ ] MCP server still works
- [ ] Documentation accessible

### Step 13.5: Final Confirmation

```markdown
## ✅ Cleanup Complete!

FluxFrame template files have been removed. Your project now contains only:
- Your generated documentation in `{{DOCS_DIR}}/`
- Your bootstrap decisions log (`{{DOCS_DIR}}/bootstrap_decisions.md`) - **reference this for why choices were made**
- Your AI rules (`AGENTS.md` + tool-specific files)
- Your MCP server (`mcp-server.js`)
- Your project configuration

**Your project is ready for development!**

**Important:** The `bootstrap_decisions.md` file contains the reasoning behind all configuration choices made during setup. Reference this when questions arise about why things are configured a certain way.

Next: Define Cycle 1.1 in `{{DOCS_DIR}}/implementation_plan.md`
```

---

## Final Success Criteria (After Cleanup)

Bootstrap is fully complete when:

1. ✅ All required files created
2. ✅ All placeholders filled
3. ✅ MCP server starts successfully
4. ✅ Dependencies installed
5. ✅ No errors in any file
6. ✅ User can read generated docs
7. ✅ **All decisions logged with reasoning** (bootstrap_decisions.md in docs directory)
8. ✅ Template files cleaned up
9. ✅ README.md updated for project
10. ✅ Ready to define Cycle 1.1
