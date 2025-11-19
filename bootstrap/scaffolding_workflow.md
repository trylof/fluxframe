# Scaffolding Workflow for Bootstrap

**Purpose:** Detailed step-by-step workflow for Cline to follow when generating project files during bootstrap.

**When to use:** Phase 2 of bootstrap process (File Generation)

**Prerequisites:**
- User has provided/confirmed project information
- All placeholders values are known
- User has approved setup summary

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
- `[INFRASTRUCTURE]` → From user's stack or "To be determined"
- `[API_APPROACH]` → User's chosen approach
- `[ARCHITECTURE_TYPE]` → Detected/chosen architecture

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

### Step 7: Create Workflow Documentation (Optional)

**Only if:** User requested workflow docs during bootstrap

**Otherwise:** Skip and note in technical_status.md: "Workflows: To be documented"

**If creating workflows:**

From `doc-templates/workflow_*.template.md`

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

### Step 10: Generate .clinerules

**Source:** `clinerules/template.clinerules`

**Process:**
1. Read template
2. Replace placeholders:
   - `{{PROJECT_NAME}}` → Project name
   - `{{DOCS_DIR}}` → Documentation directory
   - `{{API_CONTRACT_RULES}}` → Insert approach-specific rules
3. Save as `.clinerules` in project root

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
- [ ] `{{DOCS_DIR}}/patterns/README.md`
- [ ] `{{DOCS_DIR}}/patterns/*_patterns.md` (as applicable)
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
7. ✅ Ready to define Cycle 1.1

**Next:** Present summary to user and guide them to next steps.
