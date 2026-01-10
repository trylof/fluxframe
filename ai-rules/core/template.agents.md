# AGENTS.md - {{PROJECT_NAME}} Agent Guidelines

<!--
AGENTS.md is the universal baseline configuration for AI coding assistants.
This file follows the open standard adopted by 60k+ repositories and works with:
- Claude Code, Roo Code, Cline, Cursor, GitHub Copilot, and more

Replace {{PLACEHOLDERS}} with project-specific values during bootstrap.
-->

## Project Overview

**{{PROJECT_NAME}}** - {{PROJECT_DESCRIPTION}}

## Tech Stack

- **Backend:** {{TECH_STACK_BACKEND}}
- **Frontend:** {{TECH_STACK_FRONTEND}}
- **Database:** {{TECH_STACK_DATABASE}}
- **Other:** {{TECH_STACK_OTHER}}

## Key Directories

```
{{DIRECTORY_STRUCTURE}}
```

## Commands

| Action | Command |
|--------|---------|
| Build | `{{BUILD_COMMAND}}` |
| Test | `{{TEST_COMMAND}}` |
| Lint | `{{LINT_COMMAND}}` |
| Dev Server | `{{DEV_COMMAND}}` |
| Type Check | `{{TYPECHECK_COMMAND}}` |

---

## FluxFrame Development Methodology

This project follows the FluxFrame development methodology - a documentation-first, pattern-driven approach to software development.

### Core Principles

1. **Documentation as Source of Truth** - `{{DOCS_DIR}}/context_master_guide.md` contains all project rules, philosophy, workflows, and standards
2. **Pattern-Driven Development** - Check existing patterns before implementing; document new patterns after implementation
3. **Systematic Development Cycles** - Work in defined cycles ({{CYCLE_TYPE_PLURAL}}) with clear before/during/after phases
4. **Test-Implementation Alignment** - Tests validate actual behavior, not mocked assumptions

### Key Documentation Files

| File | Purpose |
|------|---------|
| `{{DOCS_DIR}}/context_master_guide.md` | Single source of truth for all project context |
| `{{DOCS_DIR}}/technical_status.md` | Current implementation state and recent changes |
| `{{DOCS_DIR}}/implementation_plan.md` | High-level roadmap (Tier 1 - strategic) |
| `{{DOCS_DIR}}/implementation_plans/` | Detailed cycle plans (Tier 2 - tactical) |
| `{{DOCS_DIR}}/patterns/` | Reusable solution patterns |

---

## Development Workflow

### Before Starting Any Cycle

**CRITICAL: Planning-First Approach**

Before implementing ANY development cycle:

1. **Call `start_cycle_planning(cycle_id)`** - Initiate planning for the cycle
2. **Research the feature** - Understand problem, check patterns, review codebase
3. **Call `analyze_cycle_scope()`** - Get complexity score and decomposition recommendation
4. **If complexity > 10: MUST decompose** - Break into smaller sub-cycles
5. **Call `create_cycle_plan()`** - Create detailed plan in `implementation_plans/`
6. **Review with user** - Walk through the plan together
7. **Call `approve_cycle_plan()`** - Validate and mark ready

**Only THEN proceed with implementation.**

### Before Any Implementation

1. **Read Context** - Review `{{DOCS_DIR}}/context_master_guide.md` for full project context
2. **Check Patterns** - Search `{{DOCS_DIR}}/patterns/` for existing solutions
3. **Read Status** - Check `{{DOCS_DIR}}/technical_status.md` for current state
4. **Review Cycle Plan** - Follow the approved plan in `{{DOCS_DIR}}/implementation_plans/`¬

### During Implementation

- **Build Real Components** - No stubs, mocks, or placeholder implementations in production code
- **Ensure Visible Results** - Every change should be demonstrable
- **Follow Existing Patterns** - When patterns exist, follow them exactly
- **Write Aligned Tests** - Tests should validate actual behavior
- **Follow the Plan** - Stick to the approved implementation plan

### After Implementation

1. **Get User Confirmation** - Never document until user confirms the change works
2. **Update ALL Affected Documentation** - technical_status.md, patterns/, workflows/
3. **Document New Patterns** - If solution is reusable, add to pattern library
4. **Update Implementation Plan** - Mark cycle as complete, document any deviations
5. **Call `validate_cycle_completion()`** - Verify all completion criteria met

---

## Pattern Library Usage

### Before Implementing ANY Feature

1. Search `{{DOCS_DIR}}/patterns/` for relevant patterns
2. **If pattern exists:** Follow it exactly - don't reinvent
3. **If no pattern exists:** Implement first, then document the pattern

### Pattern Structure

Each pattern in `{{DOCS_DIR}}/patterns/` contains:
- **Problem:** The situation this pattern solves
- **Solution:** The approach taken
- **Implementation:** Code examples and key decisions
- **Pitfalls:** Common mistakes to avoid
- **Status:** experimental → established → canonical

### Creating New Patterns

After implementing a reusable solution:
1. Create new file in `{{DOCS_DIR}}/patterns/`
2. Use the standard pattern template
3. Mark status as "experimental" initially
4. Promote to "established" after successful reuse

---

## Change Request Protocol

For bug fixes, refinements, and modifications:

### 1. Initialize
- Identify the issue clearly
- Classify: bug, refinement, requirement change, misinterpretation

### 2. Analyze (No Code Changes Yet)
- Find root cause
- Understand impact
- Propose fix approach

### 3. Iterate
- Make targeted changes
- Test the fix
- Refine as needed
- **DO NOT document during iteration**

### 4. Confirm
- User validates the fix works
- Get explicit confirmation

### 5. Document (Only After Confirmation)
- Update `{{DOCS_DIR}}/technical_status.md`
- Create change documentation in `{{CHANGES_DIR}}/`
- Update patterns if applicable
- Update workflows if conceptual logic changed

**CRITICAL:** Never update documentation during iteration. Only document after user confirms the change works.

---

## Code Style

{{CODE_STYLE_RULES}}

### General Principles

- Follow existing code patterns in the codebase
- Use meaningful names that describe intent
- Keep functions focused and small
- Handle errors explicitly
- Write self-documenting code with strategic comments

---

## Testing Requirements

{{TESTING_RULES}}

### Testing Philosophy

- Tests validate actual behavior, not mocked assumptions
- Integration tests over excessive unit test mocking
- Test the contract, not the implementation details
- Ensure tests remain aligned with implementation changes

---

## API Contracts

{{API_CONTRACT_APPROACH}}

### Contract Enforcement

- Backend defines the contract (OpenAPI, GraphQL schema, etc.)
- Frontend consumes auto-generated types
- No manual type definitions that duplicate API types
- Contract changes require updating both ends

---

## Documentation Requirements

### What to Document

- **Always Update:** `{{DOCS_DIR}}/technical_status.md` after any changes
- **When Applicable:** patterns/, workflows/, implementation_plan.md
- **Change Tracking:** All bug fixes documented in `{{CHANGES_DIR}}/`

### When to Document

- **NEVER** during iteration on a fix
- **ALWAYS** after user confirms change works
- **IMMEDIATELY** after completing a development cycle

### Documentation Approval

All changes to files in `{{DOCS_DIR}}/` require:
1. Show diff to user
2. Wait for approval
3. Apply only after approval

---

## Project-Specific Rules

{{#if CUSTOM_RULES}}
{{CUSTOM_RULES}}
{{/if}}

---

## Date Handling

Always use the current date from environment details, not training data dates.

---

## Quick Reference

### Session Start Checklist
- [ ] Read context_master_guide.md
- [ ] Check technical_status.md
- [ ] Call `get_implementation_roadmap()` to see cycle status
- [ ] Identify task type (new cycle, continue cycle, bug fix)
- [ ] Search patterns for existing solutions

### Before Starting a New Cycle
- [ ] Call `start_cycle_planning(cycle_id)` 
- [ ] Research the feature
- [ ] Call `analyze_cycle_scope()` - complexity must be ≤10 or decomposed
- [ ] Call `create_cycle_plan()` if plan doesn't exist
- [ ] Get user approval on the plan
- [ ] Call `approve_cycle_plan()` to mark ready

### Before Code Changes
- [ ] Cycle plan exists and is approved
- [ ] Pattern search completed
- [ ] Understand current implementation state
- [ ] Have clear acceptance criteria from plan

### After Implementation
- [ ] User confirmed change works
- [ ] technical_status.md updated
- [ ] Implementation plan marked complete
- [ ] Any deviations from plan documented
- [ ] New patterns documented (if applicable)
- [ ] Call `validate_cycle_completion()`

---

*For complete methodology details, see `{{DOCS_DIR}}/context_master_guide.md`*
