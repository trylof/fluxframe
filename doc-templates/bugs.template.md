# {{PROJECT_NAME}} — Bug Tracker

<!-- 
INSTRUCTIONS FOR AI ASSISTANT:
This is the project's bug tracker - a centralized log of all known bugs.
Use `report_bug()` MCP tool to add new bugs.
Use `create_bug_fix_plan()` to create detailed fix plans in bugs/ directory.

SEVERITY LEVELS:
- 🔴 CRITICAL: System down, data loss, security vulnerability
- 🟠 HIGH: Major feature broken, significant user impact
- 🟢 LOW: Minor issues, cosmetic, edge cases
-->

**Status:** Active  
**Last Updated:** {{LAST_UPDATE_DATE}}

---

## Active Bugs

### 🔴 Critical

| Bug ID | Title | Description | Reported | Status | Fix Plan |
|--------|-------|-------------|----------|--------|----------|
| — | No critical bugs | — | — | — | — |

### 🟠 High

| Bug ID | Title | Description | Reported | Status | Fix Plan |
|--------|-------|-------------|----------|--------|----------|
| — | No high-priority bugs | — | — | — | — |

### 🟢 Low

| Bug ID | Title | Description | Reported | Status | Fix Plan |
|--------|-------|-------------|----------|--------|----------|
| — | No low-priority bugs | — | — | — | — |

---

## Bug Status Legend

| Status | Meaning |
|--------|---------|
| 📋 REPORTED | Bug logged, not yet investigated |
| 🔍 INVESTIGATING | Root cause analysis in progress |
| 📝 PLANNED | Fix plan created, awaiting implementation |
| 🏗️ IN PROGRESS | Fix being implemented |
| ✅ FIXED | Fix complete, awaiting verification |
| ✔️ VERIFIED | Fix verified, bug closed |
| ❌ WONT FIX | Intentional behavior or out of scope |

---

## Resolved Bugs

<!-- AI ASSISTANT: Move bugs here when verified fixed -->

| Bug ID | Title | Severity | Resolved | Fix Summary |
|--------|-------|----------|----------|-------------|
| — | No resolved bugs yet | — | — | — |

---

## Bug Reporting Guidelines

### When to Report

- Application crashes or errors
- Features not working as documented
- Security vulnerabilities
- Performance degradation
- Data corruption or loss

### Bug ID Format

Format: `BUG_{{YYYY_MM}}_{{short_name}}`

Examples:
- `BUG_2026_01_login_crash`
- `BUG_2026_01_slow_api`
- `BUG_2026_02_missing_data`

### Bug Lifecycle

```
📋 REPORTED → 🔍 INVESTIGATING → 📝 PLANNED → 🏗️ IN PROGRESS → ✅ FIXED → ✔️ VERIFIED
                                    ↓
                              (Create fix plan
                               in bugs/ directory)
```

---

## Alignment with Project Documents

This bug tracker works alongside:
- **`ROADMAP.md`** - Planned features and cycles (separate from bugs)
- **`technical_status.md`** - Current implementation state
- **`bugs/`** - Detailed fix plans for individual bugs

**Rules:**
1. Bugs are tracked separately from planned features
2. Critical bugs may take priority over planned cycles
3. Fix plans follow a streamlined template (not full cycle planning)
4. All bug fixes must include regression tests

---

<!-- 
AI ASSISTANT CHECKLIST:
- [ ] All {{PLACEHOLDERS}} replaced with project-specific values
- [ ] Bug IDs follow format: BUG_YYYY_MM_short_name
- [ ] Severity levels assigned correctly
- [ ] Status updated as bugs progress
- [ ] Resolved bugs moved to Resolved section with summary
-->
