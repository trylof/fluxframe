# GEMINI.md - {{PROJECT_NAME}} Agent Guidelines

<!--
GEMINI.md configuration for Google Antigravity.
This file provides project context and FluxFrame methodology.

Replace {{PLACEHOLDERS}} with project-specific values during bootstrap.
-->

## Project Overview

**{{PROJECT_NAME}}** - {{PROJECT_DESCRIPTION}}

## Tech Stack

- **Backend:** {{TECH_STACK_BACKEND}}
- **Frontend:** {{TECH_STACK_FRONTEND}}
- **Database:** {{TECH_STACK_DATABASE}}
- **Other:** {{TECH_STACK_OTHER}}

## Commands

| Action | Command |
|--------|---------|
| Build | `{{BUILD_COMMAND}}` |
| Test | `{{TEST_COMMAND}}` |
| Lint | `{{LINT_COMMAND}}` |
| Dev Server | `{{DEV_COMMAND}}` |

---

## FluxFrame Development Methodology

This project follows the FluxFrame development methodology.

### Core Principles

1. **Documentation as Source of Truth** - All decisions in docs first
2. **Pattern-Driven Development** - Check patterns before implementing
3. **Systematic Development Cycles** - Work in defined {{CYCLE_TYPE_PLURAL}}
4. **Test-Implementation Alignment** - Tests validate actual behavior

### Key Files

| File | Purpose |
|------|---------|
| `{{DOCS_DIR}}/context_master_guide.md` | Single source of truth |
| `{{DOCS_DIR}}/technical_status.md` | Current implementation state |
| `{{DOCS_DIR}}/ROADMAP.md` | Roadmap and cycles |
| `{{DOCS_DIR}}/patterns/` | Reusable solution patterns |
| `AGENTS.md` | Full agent guidelines |

---

## Development Workflow

### BEFORE Phase (Context Gathering)

1. Read `{{DOCS_DIR}}/context_master_guide.md` for full context
2. Check `{{DOCS_DIR}}/patterns/` for existing solutions
3. Read `{{DOCS_DIR}}/technical_status.md` for current state
4. Understand scope before starting

### DURING Phase (Implementation)

- **Build Real Components** - No stubs or placeholders
- **Ensure Visible Results** - Demonstrable changes
- **Follow Existing Patterns** - Use patterns exactly
- **Write Aligned Tests** - Tests validate actual behavior

### AFTER Phase (Documentation)

1. **Get User Confirmation** - Don't document until user confirms
2. **Update Documentation** - technical_status.md, patterns/, etc.
3. **Document New Patterns** - If solution is reusable

---

## Pattern Library

### Before Implementing ANY Feature

1. Search `{{DOCS_DIR}}/patterns/` for relevant patterns
2. **If pattern exists:** Follow it exactly
3. **If no pattern:** Implement first, document after

### Pattern Location

All patterns: `{{DOCS_DIR}}/patterns/`

---

## Change Request Protocol

For bugs, refinements, and modifications:

1. **Initialize** - Identify and classify the issue
2. **Analyze** - Find root cause (no code changes yet)
3. **Iterate** - Make changes, test, refine
4. **Confirm** - User validates the fix works
5. **Document** - Only after confirmation

**Critical:** Never document during iteration.

---

## Code Style

{{CODE_STYLE_RULES}}

### General Principles

- Follow existing patterns in the codebase
- Use meaningful, descriptive names
- Keep functions focused and small
- Handle errors explicitly

---

## Testing

{{TESTING_RULES}}

### Testing Philosophy

- Tests validate actual behavior
- Integration tests over excessive mocking
- Test the contract, not implementation details

---

## Documentation Requirements

### What to Update

- `{{DOCS_DIR}}/technical_status.md` - After EVERY change
- `{{DOCS_DIR}}/patterns/` - When patterns discovered
- `{{CHANGES_DIR}}/` - Bug fixes and changes

### When to Update

- **NEVER** during iteration on a fix
- **ALWAYS** after user confirms change works

---

## Date Handling

Use current date from environment, not training data dates.

---

## Quick Reference

### Session Start
- [ ] Read context_master_guide.md
- [ ] Check technical_status.md
- [ ] Identify task type
- [ ] Search patterns

### Before Code
- [ ] Pattern search completed
- [ ] Understand current state
- [ ] Clear acceptance criteria

### After Implementation
- [ ] User confirmed it works
- [ ] technical_status.md updated
- [ ] Patterns documented (if applicable)

---

*For complete methodology, see `{{DOCS_DIR}}/context_master_guide.md` and `AGENTS.md`*
