# AI Rules Customization Guide

**How Cline/Roo adapts the rule templates for your specific project**

---

## Purpose

This guide explains how to customize `template.clinerules` or `template.roorules` during project bootstrap. The AI assistant (Cline or Roo) uses this guide to automatically generate a project-specific rules file (`.clinerules` or `.roorules`) based on questionnaire responses.

**Note:** The template content is identical for both AI assistants - only the filename differs.

---

## AI Assistant Selection

### Step 1: Determine AI Assistant

**During bootstrap, ask user:**
```
"Which AI coding assistant are you using?"
Options:
1. Cline (VS Code extension)
2. Roo (VS Code extension)
```

**Based on answer:**
- If Cline → Generate `.clinerules` file
- If Roo → Generate `.roorules` file

**Template source:** Both use same `template.clinerules` / `template.roorules` (content identical)

### Step 2: Read Project Configuration

**Input:** Responses from `bootstrap/project_questionnaire.md`

**Extract:**
- AI assistant choice (Cline or Roo)
- Project name
- Documentation directory path
- Cycle terminology preference ("Cycle" vs "Iteration")
- API contract approach chosen
- Technology stack
- Directory structure

### Step 2: Replace Core Placeholders

#### Project Identity

```
{{PROJECT_NAME}} → Actual project name
{{DOCS_DIR}} → Documentation directory (default: "project_docs")
{{CYCLE_TYPE}} → "Cycle" or "Iteration" (user's preference)
{{CYCLE_TYPE_PLURAL}} → "Cycles" or "Iterations"
{{CYCLE_TYPE_UPPER}} → "CYCLE" or "ITERATION"
```

**Example:**
```
Before: ## Universal Session Protocol (APPLIES TO {{PROJECT_NAME}})
After:  ## Universal Session Protocol (APPLIES TO TaskFlow Pro)
```

#### File Paths

```
{{CHANGES_DIR}} → bug_fixes (or user's preferred directory name)
{{WORKFLOW_DOCS}} → workflows/ (if project has workflows)
{{ADDITIONAL_CONTEXT_FILE}} → context_catalog.json (if using AI features)
{{IMPLEMENTATION_PLAN_FILE}} → implementation_plan.md
```

### Step 3: Configure API Contract Section

**Based on chosen approach, keep ONE section and delete others:**

#### If OpenAPI/Pydantic Selected:

**Keep the OpenAPI section, fill placeholders:**

```
{{API_CONTRACT_APPROACH}} → "OpenAPI + Pydantic + TypeScript"
{{BACKEND_MODEL_TYPE}} → "Pydantic"
{{API_CLIENT_MODULE}} → "apiClient"
{{API_CLIENT_PATH}} → "frontend/lib/apiClient.ts"
{{API_HOOKS_MODULE}} → "useAPI hooks"
{{API_HOOKS_PATH}} → "frontend/hooks/useAPI.ts"
{{HTTP_CLIENT}} → "fetch"
{{TYPES_PATH}} → "frontend/types/api.ts"
```

**Delete:**
- GraphQL section
- JSON Schema section  
- Custom section

#### If GraphQL Selected:

**Keep GraphQL section, fill placeholders:**

```
{{API_CONTRACT_APPROACH}} → "GraphQL Schema"
```

**Delete other sections**

#### If JSON Schema Selected:

**Keep JSON Schema section, fill placeholders**

**Delete other sections**

#### If Custom Selected:

**Keep Custom section, require user to define rules**

**Delete other sections**

### Step 4: Add MCP Tool Names

**Replace with actual MCP server tool names:**

```
get_context_for_task → Actual tool name from MCP server
get_current_implementation_status → Actual tool name
check_pattern_exists → Actual tool name
validate_{{CYCLE_TYPE}}_completion → validate_cycle_completion or validate_iteration_completion
start_change_request → Actual tool name
validate_change_resolution → Actual tool name
close_change_request → Actual tool name
validate_workflow_documentation → Actual tool name (or remove if not used)
```

### Step 5: Remove Conditional Sections

**Handlebars-style conditionals:**

```
{{#if API_APPROACH_OPENAPI}}
  [OpenAPI-specific rules]
{{/if}}

{{#if API_APPROACH_GRAPHQL}}
  [GraphQL-specific rules]
{{/if}}
```

**Cline should:**
1. Evaluate condition based on user's choice
2. Keep matching section
3. Delete non-matching sections
4. Remove `{{#if}}` and `{{/if}}` markers

### Step 6: Add Project-Specific Rules

**If user defines custom critical rules:**

```
{{#if CUSTOM_RULE_1}}
**{{CUSTOM_RULE_1_CATEGORY}}:**
- {{CUSTOM_RULE_1_REQUIREMENT_1}}
- {{CUSTOM_RULE_1_REQUIREMENT_2}}
{{/if}}
```

**Cline should:**
- Ask user if they have project-specific rules
- Add them to the "Project-Specific Critical Rules" section
- Or remove section if none

---

## Customization Examples

### Example 1: Web App with OpenAPI

**Input (from questionnaire):**
```yaml
project_name: "TaskFlow Pro"
docs_dir: "project_docs"
cycle_terminology: "Iteration"
api_approach: "openapi"
backend_framework: "FastAPI"
frontend_framework: "React"
```

**Generated .clinerules snippet:**
```
# TaskFlow Pro - Cline Configuration

## Single Source of Truth
**project_docs/context_master_guide.md**

**Before starting new iteration work:**
```
1. MCP tool: get_context_for_task(task_type="iteration_start")
2. MCP tool: check_pattern_exists(feature_description="[what you're building]")
...
```

**For API Development (OpenAPI + Pydantic + TypeScript):**
- ALL new endpoints MUST use Pydantic response models
- Frontend MUST use `apiClient` from `frontend/lib/apiClient.ts`
- NO direct fetch calls in components - ZERO EXCEPTIONS
```

### Example 2: GraphQL Project

**Input:**
```yaml
project_name: "DataHub"
docs_dir: "docs"
cycle_terminology: "Cycle"
api_approach: "graphql"
```

**Generated .clinerules snippet:**
```
# DataHub - Cline Configuration

**For API Development (GraphQL Schema):**
- ALL new queries/mutations MUST be defined in GraphQL schema first
- Frontend MUST use generated types from GraphQL schema
- NO manual GraphQL queries in components - use generated hooks
```

### Example 3: Simple REST API

**Input:**
```yaml
project_name: "SimpleAPI"
docs_dir: "documentation"
cycle_terminology: "Iteration"
api_approach: "json_schema"
```

**Generated .clinerules snippet:**
```
# SimpleAPI - Cline Configuration

**For API Development (JSON Schema + Manual Types):**
- ALL endpoints MUST document request/response contracts
- Frontend types MUST match backend JSON schemas
```

---

## Validation Checklist

**After customization, Cline should verify:**

- [ ] All {{PLACEHOLDERS}} replaced
- [ ] Project name consistent throughout
- [ ] File paths match actual project structure
- [ ] API contract section matches chosen approach
- [ ] Only ONE API approach section remains
- [ ] MCP tool names match server configuration
- [ ] Cycle terminology consistent
- [ ] No orphaned conditional markers ({{#if}})
- [ ] Custom rules added if specified
- [ ] File saves as `.clinerules` (no .md extension)

---

## Common Customization Patterns

### Pattern 1: Monorepo with Multiple Projects

**Customize paths to include project subdirectory:**

```
{{DOCS_DIR}} → "apps/taskflow/project_docs"
{{API_CLIENT_PATH}} → "apps/taskflow/frontend/lib/apiClient.ts"
```

### Pattern 2: Microservices Architecture

**Multiple .clinerules files:**
- `service-a/.clinerules` → Service A specific rules
- `service-b/.clinerules` → Service B specific rules
- `.clinerules` → Shared rules at repo root

### Pattern 3: No AI Features

**Remove optional sections:**
- Delete `{{ADDITIONAL_CONTEXT_FILE}}` references
- Remove AI Assistant related MCP tools
- Simplify completion checklist

### Pattern 4: Legacy Code Modernization

**Add migration-specific rules:**

```
**For Legacy Code:**
- NO new code in legacy patterns
- ALL new features use modern patterns
- Refactor to patterns when touching legacy code
- Document migration progress in technical_status.md
```

---

## Error Handling

### Missing Required Information

**If questionnaire doesn't provide required info:**

1. **Prompt user for missing data:**
   ```
   "I need to know your API contract approach.
   Choose: OpenAPI, GraphQL, JSON Schema, or Custom?"
   ```

2. **Use sensible defaults:**
   - `{{DOCS_DIR}}` → "project_docs"
   - `{{CYCLE_TYPE}}` → "Cycle"
   - `{{CHANGES_DIR}}` → "bug_fixes"

3. **Document assumptions:**
   ```
   "I'm using 'Cycle' terminology.
   You can change this in .clinerules if you prefer 'Iteration'."
   ```

### Conflicting Configuration

**If questionnaire has contradictions:**

1. Ask user to clarify
2. Show the conflict
3. Wait for decision
4. Don't guess

---

## Final Output

**Generated .clinerules should:**
- Be valid and self-contained
- Have NO remaining {{PLACEHOLDERS}}
- Match project's actual structure
- Enforce chosen API contract approach
- Be ready to use immediately

**Save as:** `.clinerules` (for Cline) or `.roorules` (for Roo) in project root

Both files have identical content - the only difference is the filename.

---

## Next Steps

After customization:
1. Show generated .clinerules to user
2. Get approval
3. Save to project root
4. Configure MCP server to enforce these rules
5. Test with simple task to verify

**Related:**
- `template.clinerules` - The source template
- `RULE_ENFORCEMENT.md` - Why these rules matter
- `../bootstrap/project_questionnaire.md` - Source of configuration data