# Bootstrap Instructions for AI Assistants (Cline/Roo)

**Purpose:** This document contains step-by-step instructions for your AI assistant (Cline or Roo) to automatically set up a new project using FluxFrame.

**When to use:** When a user wants to start a new project with this framework and says something like:
- "Set up this project using FluxFrame"
- "Bootstrap my project with the framework"
- "Initialize project documentation"

**Target Output:** A fully configured project with:
- Complete `project_docs/` directory with filled templates
- Configured `mcp-server.js` for the project
- Customized `.clinerules` (for Cline) or `.roorules` (for Roo) file
- Ready to start Cycle/Iteration 1.1

**Note:** The framework works identically for both Cline and Roo. The only difference is the rules filename.

---

## Prerequisites

Before starting, ensure you have:
1. ✅ User has provided a project description (file or message)
2. ✅ User has confirmed they want to use this framework
3. ✅ You have read this entire document

---

## Bootstrap Workflow

### Phase 1: Information Gathering

**Step 1: Determine AI Assistant**

**FIRST QUESTION:** "Which AI coding assistant are you using?"
- Option 1: Cline
- Option 2: Roo

**Store answer:** Will determine output filename (`.clinerules` vs `.roorules`)

**Step 2: Read Project Description**

The user will provide project information in one of these formats:
- A project description file (e.g., `project_brief.md`, `README.md`)
- Direct message describing the project
- Existing codebase you should analyze

**Extract these key elements:**
- **Project Name:** What is this project called?
- **Project Purpose:** What does it do? (1-2 sentences)
- **Tech Stack:** Languages, frameworks, databases, infrastructure
- **Key Features:** 3-5 main capabilities
- **Architecture Type:** Monolith, microservices, serverless, etc.
- **Frontend/Backend:** Does it have both, one, or neither?

**Step 3: Ask Clarifying Questions**

Use the questionnaire from [`bootstrap/project_questionnaire.md`](bootstrap/project_questionnaire.md) to fill gaps.

**CRITICAL:** Only ask questions for information NOT in the project description. Don't ask redundant questions.

**Example good flow:**
```
You: "I see you're building TaskFlow Pro, a task management platform with React + FastAPI. 
Before I set up the framework, I need to know:

1. How will your API contracts be defined? 
   - OpenAPI + Pydantic (recommended)
   - GraphQL Schema  
   - JSON Schema
   - Custom approach

2. Is this a production-ready project or a prototype?
   - Production (Strict rules)
   - Prototype (Relaxed rules)

3. What's your directory structure preference?
   - Standard (project_docs/ at root)
   - Custom (specify path)"
```

**Example bad flow (DON'T DO THIS):**
```
You: "What's your project name?"  <- ALREADY IN DESCRIPTION
You: "What technology are you using?" <- ALREADY IN DESCRIPTION
You: "Describe your project" <- ALREADY PROVIDED
```

**Step 4: Confirm Setup**

Present a summary for user approval:

```markdown
## Project Setup Summary

**AI Assistant:** {{CLINE_OR_ROO}}
**Project:** {{PROJECT_NAME}}
**Purpose:** {{ONE_LINE_PURPOSE}}
**Stack:** {{TECH_STACK}}
**API Contracts:** {{CHOSEN_APPROACH}}
**Directory:** {{DOCS_DIR}}

I will create:
- `{{DOCS_DIR}}/context_master_guide.md` - Your project's source of truth
- `{{DOCS_DIR}}/technical_status.md` - Living implementation status
- `{{DOCS_DIR}}/patterns/` - Pattern library structure
- `.{{ASSISTANT_RULES_FILENAME}}` - AI assistant configuration
- `mcp-server.js` - Context server for AI assistance

Proceed? (yes/no)
```

Wait for user confirmation before proceeding.

---

### Phase 2: File Generation

**Step 5: Create Directory Structure**

```bash
mkdir -p {{DOCS_DIR}}/{patterns,workflows,implementation_plans}
mkdir -p {{DOCS_DIR}}/bug_fixes
```

**Step 6: Generate Core Documents**

Follow this order (dependencies matter):

**6.1: Create `context_master_guide.md`**

Source: [`doc-templates/context_master_guide.template.md`](doc-templates/context_master_guide.template.md)

**Placeholder filling rules:**
- `{{PROJECT_NAME}}` → Actual project name
- `{{PROJECT_PURPOSE}}` → One-line purpose
- `{{TECH_STACK}}` → Comma-separated tech list
- `{{DOCS_DIR}}` → Chosen documentation directory
- `{{API_CONTRACT_APPROACH}}` → Chosen API contract method
- Keep ALL universal principle sections UNCHANGED
- Adapt examples to project domain where marked `{{EXAMPLE}}`

**6.2: Create `technical_status.md`**

Source: [`doc-templates/technical_status.template.md`](doc-templates/technical_status.template.md)

**Initial state should be:**
- Status: "🏗️ BOOTSTRAP - Project initialized"
- Current Capabilities: "None - awaiting Cycle 1.1"
- Next Steps: "Define and implement Cycle 1.1"
- Recently Changed: "Framework bootstrapped on {{TODAY_DATE}}"

**6.3: Create `implementation_plan.md`**

Source: [`doc-templates/implementation_plan.template.md`](doc-templates/implementation_plan.template.md)

**Initial content:**
- Include Cycle 1.1 placeholder
- Reference key features from project description
- Mark as "📋 PLANNING"

**6.4: Create Pattern Library Structure**

Create files:
- `{{DOCS_DIR}}/patterns/README.md` - From template
- `{{DOCS_DIR}}/patterns/api_patterns.md` - Empty with header
- `{{DOCS_DIR}}/patterns/ui_patterns.md` - Empty with header (if frontend exists)
- `{{DOCS_DIR}}/patterns/data_patterns.md` - Empty with header

**6.5: Create API Contract Standards** (if applicable)

If user chose OpenAPI, GraphQL, JSON Schema, or Custom:

Create `{{DOCS_DIR}}/api_contract_standards.md` using:
[`doc-templates/api_contract_standards.template.md`](doc-templates/api_contract_standards.template.md)

Fill with chosen approach details.

**6.6: Create Workflow Documentation** (optional, can be done later)

If user wants workflow docs now, create:
- `{{DOCS_DIR}}/workflows/README.md`
- Other workflow docs as needed

Otherwise, note in technical_status.md: "Workflows: To be documented as features are built"

---

**Step 7: Generate MCP Server Configuration**

**7.1: Create `mcp-server.js`**

Source: [`mcp-server/template-mcp-server.js`](mcp-server/template-mcp-server.js)

**Configuration:**
```javascript
const PROJECT_DOCS_DIR = path.join(__dirname, '{{DOCS_DIR}}');
const PROJECT_NAME = '{{PROJECT_NAME}}';
```

**7.2: Create `package.json`** (if doesn't exist)

```json
{
  "name": "{{PROJECT_NAME_SLUG}}",
  "version": "0.1.0",
  "type": "module",
  "dependencies": {
    "@modelcontextprotocol/sdk": "^0.5.0"
  }
}
```

**7.3: Install Dependencies**

```bash
npm install
```

---

**Step 8: Generate AI Assistant Rules File**

**Determine filename based on AI assistant:**
- If Cline → Create `.clinerules`
- If Roo → Create `.roorules`

**Source:** [`ai-rules/template.clinerules`](ai-rules/template.clinerules) or [`ai-rules/template.roorules`](ai-rules/template.roorules)

**Note:** Both templates have identical content - only filename differs.

**Placeholder filling:**
- `{{PROJECT_NAME}}` → Actual project name
- `{{DOCS_DIR}}` → Documentation directory path
- `{{PROJECT_TYPE_PROTOTYPE}}` → Set to `true` if user selected Prototype, `false` (or omit) if Production
- `{{API_CONTRACT_RULES}}` → Insert API contract enforcement rules based on chosen approach

**If OpenAPI approach:**
```
**For API Development (MANDATORY):**
- ALL new endpoints MUST use Pydantic response models
- ALL endpoints MUST have `response_model` parameter
- Frontend MUST use `apiClient` 
- NO direct fetch calls in components
- Reference: `{{DOCS_DIR}}/api_contract_standards.md`
```

**If GraphQL approach:**
```
**For API Development (MANDATORY):**
- ALL new queries/mutations MUST have schema definitions
- Schema-first development required
- All resolvers must match schema
- Reference: `{{DOCS_DIR}}/api_contract_standards.md`
```

**If JSON Schema or Custom:**
```
**For API Development (MANDATORY):**
- ALL API responses MUST have documented contracts
- Contracts defined in `{{DOCS_DIR}}/api_contract_standards.md`
- Validation required before deployment
- Reference: `{{DOCS_DIR}}/api_contract_standards.md`
```

---

### Phase 3: Validation & Handoff

**Step 9: Validate Generated Files**

Check all files were created:
```
Required files:
✅ {{DOCS_DIR}}/context_master_guide.md
✅ {{DOCS_DIR}}/technical_status.md
✅ {{DOCS_DIR}}/implementation_plan.md
✅ {{DOCS_DIR}}/patterns/README.md
✅ .{{ASSISTANT_RULES_FILENAME}} (.clinerules or .roorules)
✅ mcp-server.js
✅ package.json

Optional files (if created):
⬜ {{DOCS_DIR}}/api_contract_standards.md
⬜ {{DOCS_DIR}}/workflows/README.md
```

**Step 10: Test MCP Server**

```bash
node mcp-server.js
```

Should start without errors. If errors, fix configuration.

**Step 11: Present Summary to User**

```markdown
# ✅ FluxFrame Bootstrap Complete!

I've set up FluxFrame for {{PROJECT_NAME}}:

## Created Files

### Core Documentation (`{{DOCS_DIR}}/`)
- ✅ `context_master_guide.md` - Your project's source of truth
- ✅ `technical_status.md` - Current implementation status  
- ✅ `implementation_plan.md` - Development roadmap
- ✅ `patterns/README.md` - Pattern library (empty, ready for patterns)
{{#if api_contract_standards}}
- ✅ `api_contract_standards.md` - {{API_APPROACH}} contract standards
{{/if}}

### Configuration Files
- ✅ `.{{ASSISTANT_RULES_FILENAME}}` - AI assistant rules and protocols
- ✅ `mcp-server.js` - Context server configured for your project
- ✅ `package.json` - MCP dependencies

## Next Steps

1. **Review the documentation:**
   - Read `{{DOCS_DIR}}/context_master_guide.md` to understand the framework
   - Check `{{DOCS_DIR}}/technical_status.md` for current state

2. **Configure your IDE to use MCP:**
   - Add `mcp-server.js` to your {{CLINE_OR_ROO}} MCP servers configuration
   - Restart {{CLINE_OR_ROO}} to load the new server

3. **Start developing:**
   - Define your Cycle 1.1 in `implementation_plan.md`
   - Use AI assistant to start development with full context

## Framework Features Now Available

✅ **Documentation-First Development** - All changes tracked in docs
✅ **Pattern Library** - Reusable solutions as you build
✅ **MCP Integration** - AI has project context via tools
✅ **Change Request Protocol** - Systematic bug fixing
✅ **API Contract Enforcement** - {{API_APPROACH}} contracts required
✅ **Development Cycle Methodology** - Methodical feature delivery

## Try It Out

Ask me: "Read the context master guide and explain how development cycles work"

I'll use the MCP server to access your project documentation and explain!

---

**Questions?** Ask about any part of the setup or read [`PHILOSOPHY.md`](PHILOSOPHY.md) to understand why this approach works.
```

---

## Common Issues & Solutions

### Issue: User doesn't have project description

**Solution:** Walk them through creating one:

```markdown
Let's create a project description. I'll ask some questions:

1. **Project name?** (e.g., "TaskFlow Pro")
2. **What does it do?** (1-2 sentences)
3. **Technology stack?** (e.g., "React, FastAPI, PostgreSQL")
4. **Key features?** (List 3-5 main capabilities)

I'll use this to set up everything else.
```

### Issue: User wants custom directory structure

**Solution:** Ask for preferred paths and use those in templates:

```
You: "Where should documentation live?"
User: "I want it in docs/project instead of project_docs"
You: "Got it, using docs/project for all documentation"
```

Then use `docs/project` for `{{DOCS_DIR}}` placeholder.

### Issue: User has existing documentation

**Solution:** Offer to migrate or integrate:

```
I see you have existing docs in [location]. I can:
1. Keep your docs and add framework files alongside
2. Migrate your content into framework templates
3. Create framework in separate directory

Which approach?
```

### Issue: MCP server won't start

**Common causes:**
1. `package.json` missing or wrong type
2. Path to `{{DOCS_DIR}}` incorrect
3. Missing dependencies

**Fix:**
```bash
# Ensure module type
echo '{"type": "module"}' >> package.json

# Install deps
npm install @modelcontextprotocol/sdk

# Test
node mcp-server.js
```

---

## Advanced: Partial Bootstrap

User might only want some parts of framework. Support this:

**Question:** "Do you want the full framework or specific components?"
**Options:**
1. Full framework (recommended for new projects)
2. Documentation only (no MCP/Cline integration)
3. MCP + .clinerules only (existing docs)
4. Custom selection

Adjust file creation based on choice.

---

## Remember

1. **Read project description FIRST** - Don't ask redundant questions
2. **Fill ALL placeholders** - No `{{PLACEHOLDER}}` should remain
3. **Test MCP server** - Ensure it starts successfully
4. **Present clear summary** - User should understand what was created
5. **Offer next steps** - Guide user on how to proceed

**The goal: User should be able to start developing immediately after bootstrap.**

---

## Validation Checklist

Before presenting final summary to user, verify:

- [ ] All `{{PLACEHOLDERS}}` replaced with actual values
- [ ] No references to "CultureFit" or other real projects
- [ ] MCP server tested and working
- [ ] `.{{ASSISTANT_RULES_FILENAME}}` has correct paths
- [ ] API contract standards match chosen approach
- [ ] Correct rules file generated (.clinerules for Cline, .roorules for Roo)
- [ ] All required files created
- [ ] File paths are correct for user's OS
- [ ] No template syntax remaining in generated files

---

## Example Complete Flow

```
User: "Set up the framework for my project. It's called TaskFlow Pro,
a task management SaaS with React frontend and FastAPI backend."

AI: "Perfect! I'll set up FluxFrame for TaskFlow Pro.
First, which AI assistant are you using? (Cline or Roo)

User: "Cline"

AI: "Great! Now I just need to know:

1. How will your API contracts be defined?
   - OpenAPI + Pydantic (recommended for FastAPI+React)
   - GraphQL Schema
   - JSON Schema
   - Custom approach

2. Where should documentation live?
   - Standard: project_docs/ at root
   - Custom: specify path"

User: "Use OpenAPI, standard location is fine"

AI: "Perfect! Setting up now...

[Creates all files]

✅ Framework Bootstrap Complete!

I've set up everything for TaskFlow Pro:
- AI Assistant: Cline (.clinerules generated)
- Documentation in project_docs/
- OpenAPI contract standards configured
- MCP server ready
- validate_api_contracts() tool available for endpoint validation

Next: Define Cycle 1.1 in implementation_plan.md and start building!"
```

---

**End of Bootstrap Instructions**

When you complete bootstrap, update `technical_status.md` with:
```
Status: ✅ FRAMEWORK READY
Last Updated: {{TODAY}}
Next: Define Cycle 1.1
