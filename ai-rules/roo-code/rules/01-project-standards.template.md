# FluxFrame Project Standards

<!--
Workspace-wide rules for Roo Code.
These rules apply to ALL modes when working in this project.
Place in .roo/rules/ directory.
-->

## Development Philosophy

This project follows the FluxFrame methodology:

- **Documentation as Source of Truth** - All decisions documented before implementation
- **Pattern-Driven Development** - Check patterns before implementing
- **Systematic Development Cycles** - Work in defined {{CYCLE_TYPE_PLURAL}}
- **Test-Implementation Alignment** - Tests validate actual behavior

## Key Documentation Files

| File | Purpose | When to Update |
|------|---------|----------------|
| `{{DOCS_DIR}}/context_master_guide.md` | Single source of truth | Rarely (foundational) |
| `{{DOCS_DIR}}/technical_status.md` | Current implementation state | After EVERY change |
| `{{DOCS_DIR}}/ROADMAP.md` | Roadmap and cycles | When cycles complete |
| `{{DOCS_DIR}}/patterns/` | Reusable solutions (PRESCRIPTIVE) | When patterns discovered |
| `{{DOCS_DIR}}/reference_library/` | Real-world context (DESCRIPTIVE) | When new research added |

### Reference Library (Descriptive Context)

The `reference_library/` stores DESCRIPTIVE information that INFORMS but doesn't DICTATE decisions:
- `user_research/` - User feedback, interviews, usage scenarios
- `domain_knowledge/` - Expert input, terminology, business context
- `market_research/` - Competitor analysis, industry reports
- `specifications/` - External specs, partner documentation

**Key:** Contradictions in the library are valuable information, not problems to solve.

## Universal Rules

## Activation Protocol

### Activation Sequence

**Transition Rule:** Before ANY code changes, planning, debugging, or answering questions about the project, you must:
1. Read `{{DOCS_DIR}}/context_master_guide.md`
2. Check `{{DOCS_DIR}}/technical_status.md`

### Skip Activation For
- Reading specific files ONLY when no general domain context is needed
- Quick syntax questions unrelated to project domain

### Before Any Work
1. Read `{{DOCS_DIR}}/context_master_guide.md` for full context
2. Check `{{DOCS_DIR}}/patterns/` for existing solutions (PRESCRIPTIVE)
3. Check `{{DOCS_DIR}}/reference_library/` for relevant context (DESCRIPTIVE)
4. Read `{{DOCS_DIR}}/technical_status.md` for current state

### During Implementation
- Build real components, not stubs or placeholders
- Follow existing patterns exactly when they exist
- Write tests that validate actual behavior
- Ensure visible, demonstrable results

### After Implementation
1. **Get user confirmation** before updating any docs
2. **Cycle Completion Protocol:**
   - MUST call `get_completion_checklist()` MCP tool FIRST
   - Verify each item systematically
   - Fix any gaps before declaring complete
3. Update `{{DOCS_DIR}}/technical_status.md` (always)
4. Document new patterns in `{{DOCS_DIR}}/patterns/` (if applicable)
5. Update other docs as needed

### Critical Rule
**NEVER document during iteration on a fix. Only after user confirms it works.**

## MCP Tools Available

Use these tools for context gathering and workflow management:

### Context Gathering
- `get_context_for_task(task_type)` - Get relevant context
- `get_current_implementation_status()` - Read technical_status.md
- `check_pattern_exists(feature_description)` - Search pattern library (PRESCRIPTIVE)

### Reference Library (Descriptive Context)
- `search_reference_library(query, category, context)` - Search user research, domain knowledge
- `get_reference_library_overview()` - See what real-world context is available

### Workflow Management
- `validate_workflow_documentation(changes_made, description)` - Check doc needs
- `get_completion_checklist()` - Get comprehensive completion checklist

### Feature Work
- `validate_{{CYCLE_TYPE}}_completion({{CYCLE_TYPE}}, completed_items)` - Verify completion

### Change Requests
- `start_change_request(description, change_type, affected_feature, severity)` - Initialize tracking
- `validate_change_resolution(change_id)` - Get doc checklist after fix
- `close_change_request(change_id, documentation_file)` - Mark complete

## Code Style

{{CODE_STYLE_RULES}}

### General Principles
- Follow existing patterns in the codebase
- Use meaningful, descriptive names
- Keep functions focused and small
- Handle errors explicitly
- Write self-documenting code

## Project Commands

| Action | Command |
|--------|---------|
| Build | `{{BUILD_COMMAND}}` |
| Test | `{{TEST_COMMAND}}` |
| Lint | `{{LINT_COMMAND}}` |
| Dev Server | `{{DEV_COMMAND}}` |

## Date Handling

Always use the current date from environment_details "Current Time" field, not training data dates.
