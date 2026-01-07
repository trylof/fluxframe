# FluxFrame Core Rules

<!--
Core rules for Cline AI assistant.
This file is part of the .clinerules/ folder structure.
Place in .clinerules/ directory at project root.
-->

## Project: {{PROJECT_NAME}}

This project follows the FluxFrame development methodology.
Full guidelines are in `AGENTS.md` at the project root.

---

## Quick Reference

### Session Start
1. Read `{{DOCS_DIR}}/context_master_guide.md` for full context
2. Check `{{DOCS_DIR}}/technical_status.md` for current state
3. Identify task type (new feature, bug fix, etc.)
4. Search `{{DOCS_DIR}}/patterns/` for existing solutions

### Before Implementation
1. **Check patterns** - Search pattern library first
2. **Read status** - Understand current implementation state
3. **Know scope** - Clear on what you're building

### During Implementation
- **Real components** - No stubs or placeholders
- **Follow patterns** - Use existing patterns exactly
- **Tests validate behavior** - Not mocked assumptions
- **Visible results** - Every change is demonstrable

### After Implementation
1. **Get confirmation** - User validates the change works
2. **Update docs** - technical_status.md, patterns/, etc.
3. **Document patterns** - If solution is reusable

---

## Critical Rule

**NEVER document during iteration on a fix.**

When fixing bugs or iterating:
1. Make changes
2. Test
3. Get user confirmation
4. THEN document

Documentation during iteration leads to:
- Outdated docs when approach changes
- Docs describing non-working code
- Wasted effort on abandoned attempts

---

## Key Files

| File | Purpose |
|------|---------|
| `{{DOCS_DIR}}/context_master_guide.md` | Single source of truth |
| `{{DOCS_DIR}}/technical_status.md` | Current implementation state |
| `{{DOCS_DIR}}/implementation_plan.md` | Roadmap and cycles |
| `{{DOCS_DIR}}/patterns/` | Reusable solution patterns |
| `AGENTS.md` | Full agent guidelines |

---

## Commands

| Action | Command |
|--------|---------|
| Build | `{{BUILD_COMMAND}}` |
| Test | `{{TEST_COMMAND}}` |
| Lint | `{{LINT_COMMAND}}` |
| Dev | `{{DEV_COMMAND}}` |

---

## MCP Tools

When FluxFrame MCP server is connected:

**Context:**
- `get_context_for_task(task_type)` - Get relevant context
- `get_current_implementation_status()` - Read status
- `check_pattern_exists(feature_description)` - Search patterns

**Changes:**
- `start_change_request(...)` - Begin change tracking
- `validate_change_resolution(change_id)` - Get doc checklist
- `close_change_request(...)` - Complete change

**Completion:**
- `get_completion_checklist()` - Full completion checklist
- `validate_{{CYCLE_TYPE}}_completion(...)` - Verify cycle complete

---

## Date Handling

Use current date from environment_details, not training data dates.
