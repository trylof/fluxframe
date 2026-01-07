# Development Workflow

<!--
This section defines the FluxFrame development workflow phases.
Used by tools that support file imports (e.g., Claude Code @imports).
-->

## Development Cycle Phases

This project follows the FluxFrame development methodology with systematic {{CYCLE_TYPE_PLURAL}}.

### BEFORE Phase (Context Gathering)

1. **Read Context** - Review `{{DOCS_DIR}}/context_master_guide.md` for full project context
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
2. **Archive Technical Status** - If a cycle is COMPLETE, move detailed records (Implementation Status, Features) to `{{DOCS_DIR}}/tech-status/archived_cycle_X.md`.
3. **Update ALL Affected Documentation**:
   - `{{DOCS_DIR}}/technical_status.md` (Update summary, add archive link, move aged fixes to `change_history.md`)
   - `{{DOCS_DIR}}/patterns/` (if new pattern)
   - `{{DOCS_DIR}}/workflows/` (if logic changed)
   - `{{IMPLEMENTATION_PLAN_FILE}}` (mark complete)
4. **Document New Patterns** - If solution is reusable, add to pattern library.
5. **Validate Completion** - Review checklist before marking complete.

## Key Principles

- **Documentation as Source of Truth** - `{{DOCS_DIR}}/context_master_guide.md` contains all project rules
- **Pattern-Driven Development** - Check existing patterns before implementing
- **Test-Implementation Alignment** - Tests validate actual behavior
- **Systematic Cycles** - Work in defined {{CYCLE_TYPE_PLURAL}} with clear phases

## Verification Requirements

{{VERIFICATION_RULE}}

You MUST NOT mark work complete until user confirms verification in the appropriate environment.
