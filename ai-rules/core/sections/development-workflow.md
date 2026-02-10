# Development Workflow

<!--
This section defines the FluxFrame development workflow phases.
Used by tools that support file imports (e.g., Claude Code @imports).
-->

## Development Cycle Phases

This project follows the FluxFrame development methodology with systematic {{CYCLE_TYPE_PLURAL}}.

### BEFORE Phase (Context Gathering)

1. **Read Context** - Review `AGENTS.md` for project philosophy and workflow
2. **Check Patterns** - Search `{{DOCS_DIR}}/patterns/` for existing solutions
3. **Read Status** - Check `{{DOCS_DIR}}/technical_status.md` for current state
4. **Understand Scope** - Know what you're building and why

### DURING Phase (Implementation)

- **Build Real Components** - No stubs, mocks, or placeholder implementations in production code
- **Ensure Visible Results** - Every change should be demonstrable
- **Follow Existing Patterns** - When patterns exist, follow them exactly
- **Write Aligned Tests** - Tests should validate actual behavior

### AFTER Phase (Documentation & Validation)

1. **Get User Confirmation** - Never document until user confirms the change works.
2. **Validation Gate (MANDATORY)**:
   - Call `get_completion_checklist()` MCP tool.
   - This exact tool call is REQUIRED before marking *anything* as complete.
   - Review the output and verify every single item.
3. **Archive Technical Status** - If a cycle is COMPLETE, move detailed records to archive.
4. **Update ALL Affected Documentation**:
   - `{{DOCS_DIR}}/technical_status.md` (Update summary, add archive link)
   - `{{DOCS_DIR}}/ROADMAP.md` (Mark cycle as complete)
   - `{{DOCS_DIR}}/patterns/` (if new pattern)
   - `{{IMPLEMENTATION_PLAN_FILE}}` (mark complete)
5. **Finalize**: Call `validate_cycle_completion()`.

## Key Principles

- **Documentation as Source of Truth** - `AGENTS.md` plus `{{DOCS_DIR}}/` docs contain all project rules
- **Pattern-Driven Development** - Check existing patterns before implementing
- **Test-Implementation Alignment** - Tests validate actual behavior
- **Systematic Cycles** - Work in defined {{CYCLE_TYPE_PLURAL}} with clear phases

## Verification Requirements

{{VERIFICATION_RULE}}

You MUST NOT mark work complete until user confirms verification in the appropriate environment.
