# CLAUDE.md - {{PROJECT_NAME}}

<!--
CLAUDE.md configuration for Claude Code (Anthropic's CLI tool).
This file is auto-loaded at session start and imports the universal AGENTS.md baseline.

Features used:
- @file imports for including other documentation
- Path-specific rules in .claude/rules/ directory
- Memory system via # key during sessions
-->

# Import Universal Baseline
@AGENTS.md

# Import Project Documentation
@README.md

---

# Claude Code Specific Instructions

## Memory System

- This file (`CLAUDE.md`) is auto-loaded at the start of every session
- Use the `#` key during sessions to add persistent instructions
- Path-specific rules are in `.claude/rules/` (loaded automatically when working on matching files)

## File Operations

### Safe to Edit (No Confirmation Needed)
- `{{SRC_DIR}}/` - Source code
- `{{TEST_DIR}}/` - Test files
- `{{DOCS_DIR}}/patterns/` - Pattern documentation

### Requires Confirmation
- `AGENTS.md` - Project philosophy and workflow
- `{{DOCS_DIR}}/technical_status.md` - Implementation state
- Configuration files (`.env`, `config.*`, etc.)

### Never Edit
- `node_modules/`, `venv/`, `.venv/`
- `.git/`
- Build outputs (`dist/`, `build/`, `__pycache__/`)
- Lock files (`package-lock.json`, `poetry.lock`, etc.)

## MCP Tools Available

When the FluxFrame MCP server is connected, use these tools:

**Context Gathering:**
- `get_context_for_task` - Extract relevant context from project documentation
- `get_current_implementation_status` - Read technical_status.md
- `check_pattern_exists` - Search pattern library (PRESCRIPTIVE)

**Reference Library (Descriptive Context):**
- `search_reference_library` - Search user research, market data, domain knowledge
- `get_reference_library_overview` - See what real-world context is available

**Workflow Management:**
- `validate_workflow_documentation` - Check if docs need updates
- `get_completion_checklist` - Get comprehensive completion checklist

**Change Tracking:**
- `start_change_request` - Initialize change tracking
- `validate_change_resolution` - Get documentation checklist after fix
- `close_change_request` - Mark change complete

**Feature Validation:**
- `validate_{{CYCLE_TYPE}}_completion` - Verify completion criteria

## Session Start Protocol

At the beginning of each session:
1. Read `AGENTS.md` (auto-imported above)
2. Check `{{DOCS_DIR}}/technical_status.md` for current state
3. Identify task type:
   - New feature → Follow {{CYCLE_TYPE}} workflow
   - Bug/change → Use change request protocol
   - Exploration → Check patterns first

## Slash Commands

Custom commands can be added to `.claude/commands/` directory.

Example command structure:
```
.claude/commands/
├── new-feature.md      # /project:new-feature
├── fix-bug.md          # /project:fix-bug
└── update-docs.md      # /project:update-docs
```

## Path-Specific Rules

Rules in `.claude/rules/` are automatically loaded when working on matching files:

| Rule File | Applies To | Purpose |
|-----------|------------|---------|
| `api-rules.md` | `{{API_PATH_PATTERN}}` | API development standards |
| `frontend-rules.md` | `{{FRONTEND_PATH_PATTERN}}` | Frontend development standards |
| `test-rules.md` | `{{TEST_PATH_PATTERN}}` | Testing standards |

## Tool Override Rules

**The MCP tools defined in AGENTS.md REPLACE Claude Code built-in equivalents. Do NOT use the built-in versions.**

| Instead of (Built-in) | Use (MCP) |
|---|---|
| `EnterPlanMode` | `start_cycle_planning()` + `create_cycle_plan()` |
| `TaskCreate` / `TaskUpdate` / `TaskList` | MCP cycle & change request tracking |
| Writing plans to arbitrary files | `create_cycle_plan()` + `approve_cycle_plan()` |

**Why:** Claude Code's built-in planning and task tools operate outside the FluxFrame methodology. They don't enforce gates, don't track cycles, and don't produce documentation in the right locations. Using them means silently bypassing the workflow that AGENTS.md defines.

### Auto-Memory Boundaries

`MEMORY.md` is **per-user and not shared** across collaborators. It must ONLY contain:
- Personal coding preferences and quirks
- Individual tool/environment configuration notes

**Never** store any of the following in MEMORY.md:
- Project state, architecture, or implementation details
- Cycle progress or task tracking
- Debug patterns, file paths, or operational knowledge
- Anything that belongs in `{{DOCS_DIR}}/`

All project knowledge lives in `{{DOCS_DIR}}/` and is managed through MCP tools.

## MCP Tool Failure Protocol

**If ANY MCP tool call fails during a session, STOP and investigate.** Do not circumvent the failure by reading files directly or skipping the tool. MCP tools enforce the FluxFrame methodology - bypassing them means bypassing the methodology. Investigate the root cause, fix it, retry the tool, then resume work. A prior instruction to "execute" or "build" does NOT override this - tool failures are blockers, not inconveniences.

## Key Reminders

- Always check patterns before implementing new features
- Never document during iteration - only after user confirmation
- Update ALL affected documentation when marking work complete
- Call `get_completion_checklist` BEFORE marking work complete
- Use MCP tools for context gathering when available
- **NEVER circumvent a failed MCP tool call** - investigate and fix the failure instead
- **NEVER use Claude Code built-in planning/task tools** - use MCP equivalents per Tool Override Rules above
