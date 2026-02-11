# CLAUDE.md - TaskFlow Pro

# Import Universal Baseline
@AGENTS.md

# Import Infrastructure Context
@README.md
@project_brief.md

---

# Claude Code Specific Instructions

- This file is auto-imported at session start.
- Focus on API consistency between FastAPI models and React Query hooks.
- Path-specific rules are in `.claude/rules/`.

## Tool Override Rules

**The MCP tools defined in AGENTS.md REPLACE Claude Code built-in equivalents. Do NOT use the built-in versions.**

| Instead of (Built-in) | Use (MCP) |
|---|---|
| `EnterPlanMode` | `start_cycle_planning()` + `create_cycle_plan()` |
| `TaskCreate` / `TaskUpdate` / `TaskList` | MCP cycle & change request tracking |
| Writing plans to arbitrary files | `create_cycle_plan()` + `approve_cycle_plan()` |

### Auto-Memory Boundaries

`MEMORY.md` is **per-user and not shared** across collaborators. It must ONLY contain:
- Personal coding preferences and quirks
- Individual tool/environment configuration notes

**Never** store project state, architecture, cycle progress, debug patterns, or anything that belongs in `project_docs/`. All project knowledge lives in `project_docs/` and is managed through MCP tools.
