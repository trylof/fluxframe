# FluxFrame Instruction Manual

**Your project was bootstrapped with FluxFrame.** This manual explains how to work effectively with the framework and keep your AI-assisted development running smoothly.

---

## Quick Reference

| What | Where |
|------|-------|
| **This Manual** | `FLUXFRAME_MANUAL.md` (Project Root) |
| Project context | `{{DOCS_DIR}}/context_master_guide.md` |
| Current status | `{{DOCS_DIR}}/technical_status.md` |
| Development roadmap | `{{DOCS_DIR}}/ROADMAP.md` |
| Bug tracker | `{{DOCS_DIR}}/BUGS.md` |
| Pattern library | `{{DOCS_DIR}}/patterns/` |
| AI rules | `AGENTS.md` {{TOOL_SPECIFIC_FILES}} |
| MCP server | `mcp-server.js` |

---

## The FluxFrame Way

### Core Principles

1. **Documentation is the source of truth** - If it's not documented, it doesn't exist. Keep docs current after every development cycle.

2. **Patterns scale intelligence** - Before implementing anything, check for existing patterns. If none exists, create one after implementing.

3. **Systematic beats ad-hoc** - Follow the development cycle workflow. Skipping steps creates technical debt.

4. **AI needs context** - MCP tools give your AI assistant the same context your team has. Use them.

### The Session Protocol

**Every work session should start with:**
1. Gather context via MCP (`get_context_for_task()`)
2. Check existing patterns (`check_pattern_exists()`)
3. Read current status (`get_current_implementation_status()`)
4. Plan approach before coding

---

## Your Setup

### Configured AI Tools
{{AI_TOOLS_SECTION}}

### Documentation Structure
```
{{DOCS_DIR}}/
├── context_master_guide.md    # Single source of truth
├── technical_status.md        # Current project state
├── ROADMAP.md     # Roadmap & cycles
├── api_contract_standards.md  # API enforcement (if applicable)
├── patterns/                  # Your pattern library
│   ├── README.md
│   ├── api_patterns.md
│   ├── ui_patterns.md
│   └── data_patterns.md
├── roadmap/      # Detailed cycle plans
└── bugs/                      # Bug fix plans
```

### API Contract Approach
{{API_APPROACH_SECTION}}

---

## Daily Workflow

### Starting a New Development Cycle

1. **Define the cycle** in `ROADMAP.md`
2. **Call** `start_cycle_planning("X.Y")` to initiate
3. **Analyze scope** with `analyze_cycle_scope()`
4. **Create detailed plan** with `create_cycle_plan()`
5. **Fill ALL required sections** (see below)
6. **Get approval**, then `approve_cycle_plan()`
7. **Implement** following the plan and patterns
8. **Complete** with `validate_cycle_completion()`
9. **Update docs** - technical_status, patterns, context guide

### Cycle Plan Sections (All Required)

Each detailed cycle plan in `roadmap/` contains these sections:

| Section | Purpose |
|---------|---------|
| **Progress Tracker** | Track implementation phases |
| **Executive Summary** | WHY: Business context at a glance |
| **Target Users** | WHO: Primary/secondary audiences |
| **User Stories** | WHAT: "As a [user], I want [X], so that [Y]" |
| **Security Considerations** | Protection requirements |
| **Research Summary** | Problem statement + existing patterns |
| **Scope Assessment** | Complexity scoring (triggers decomposition) |
| **Technical Design** | Architecture + files to create/modify |
| **Implementation Checklist** | Step-by-step tasks |
| **Success Criteria** | Definition of done + Tests to Pass |
| **Risk Assessment** | What could go wrong |
| **Approval** | User sign-off |

> **For Autonomous AI Execution:** These sections provide complete context (WHY, WHO, WHAT, HOW) so an AI agent can implement the cycle without asking clarifying questions.

### Fixing Bugs / Change Requests

1. **Initialize** with `start_change_request()`
2. **Analyze** - understand root cause (no code changes yet)
3. **Iterate** - fix, test, refine
4. **Confirm** - user validates it works
5. **Document** - update ALL affected docs

### Tracking and Fixing Bugs

Bugs are tracked separately from the development roadmap:

1. **Log bug** in `BUGS.md` with severity (Critical/High/Low)
2. **Bug ID format:** `BUG_YYYY_MM_short_name` (e.g., `BUG_2026_01_login_crash`)
3. **For complex bugs:** Create fix plan in `bugs/BUG_XXX_FIX_PLAN.md`
4. **Fix and test** with regression tests
5. **Update BUGS.md** status when verified

> **Key:** Bugs follow a streamlined process—no scope analysis or decomposition like development cycles.

---

## Keeping Your Setup Current

> [!WARNING]
> **FluxFrame only works if you work with it.**
> 
> Hacks, skipped steps, and undocumented changes defeat the purpose. If workflows don't fit your needs, update them—don't bypass them.

### When to Update AI Rules

Update your AI rules (`AGENTS.md` and tool-specific configs) when:

- ✏️ **Tech stack changes** - New frameworks, libraries, or tools
- 🏗️ **Architecture evolves** - New patterns, different directory structure
- 🔧 **Infrastructure updates** - New deployment targets, CI/CD changes
- 📋 **Team conventions change** - Coding standards, review requirements
- 🐛 **Recurring issues appear** - Add rules to prevent repeated mistakes

### How to Update Rules

1. **Identify the change** - What behavior needs to be different?
2. **Update `AGENTS.md`** - Core methodology and project-wide rules
3. **Update tool-specific files** - If using tool-specific features
4. **Update patterns** - If new patterns are involved
5. **Document in `technical_status.md`** - Note the rule change
6. **Test** - Start a new AI session and verify behavior

### For AI Agents: Making Changes to This System

When infrastructure changes require updating rules or workflows:

1. Review current rules in `AGENTS.md` and tool-specific configs
2. Check `{{DOCS_DIR}}/patterns/infra_patterns.md` for infrastructure patterns
3. Identify what needs to change and why
4. Update affected files systematically:
   - `AGENTS.md` for methodology changes
   - Tool-specific configs for tool-specific features
   - Pattern files for new/changed patterns
5. Document changes in `technical_status.md`
6. Verify changes don't contradict existing rules

---

## Common Anti-Patterns

> [!CAUTION]
> These defeat the purpose of FluxFrame and create technical debt.

| Anti-Pattern | Why It's Bad | What to Do Instead |
|--------------|--------------|---------------------|
| Skipping pattern check | Reinvents solved problems | Always check patterns first |
| Not updating docs | Context drifts from reality | Update docs every cycle |
| Bypassing MCP tools | AI loses context | Use tools consistently |
| Hardcoding exceptions | Creates invisible rules | Document in rules/patterns |
| "Quick fix" without protocol | Lost knowledge | Use change request workflow |
| Ignoring validation | Incomplete work ships | Complete all checklist items |

---

## Updating or Re-Bootstrapping

### Fetching FluxFrame for New Projects

To bootstrap a new project with FluxFrame:

```bash
git clone https://github.com/trylof/fluxframe.git
```

Then follow `fluxframe/BOOTSTRAP_INSTRUCTIONS.md`.

### Migrating Another Project

If you want to apply FluxFrame to another project:

1. Clone FluxFrame into the target project
2. Tell your AI: "Read fluxframe/BOOTSTRAP_INSTRUCTIONS.md and bootstrap FluxFrame for this project"
3. The AI will detect your project state and guide you through setup

### Getting Framework Updates

FluxFrame is designed to be removed after bootstrap. Your project-specific documentation and rules remain. To get framework improvements for future projects, simply clone the latest version.

---

## Additional Resources

- **Pattern Library System:** See `{{DOCS_DIR}}/patterns/README.md` for how to create and maintain patterns
- **Development Cycles:** The two-tier planning system is documented in `ROADMAP.md`
- **API Contracts:** {{API_APPROACH_SECTION}}

---

## Need Help?

- **Framework issues:** [github.com/trylof/fluxframe/issues](https://github.com/trylof/fluxframe/issues)
- **Project-specific:** Check your `context_master_guide.md` and patterns first

---

*This manual was generated during FluxFrame bootstrap. Keep it updated as your project evolves.*
