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
| `{{DOCS_DIR}}/ROADMAP.md` | High-level roadmap (Tier 1 - strategic) |
| `{{DOCS_DIR}}/roadmap/` | Detailed cycle plans (Tier 2 - tactical) |
| `{{DOCS_DIR}}/patterns/` | Reusable solution patterns (PRESCRIPTIVE) |
| `{{DOCS_DIR}}/reference_library/` | Real-world context, user research, market data (DESCRIPTIVE) |

### Reference Library (Descriptive Context)

The Reference Library stores DESCRIPTIVE information (what the real world looks like) as opposed to PRESCRIPTIVE documentation (patterns, workflows, rules).

**Key Distinction:**
- **Prescriptive docs** (patterns/, workflows/, context_master_guide.md) → Tell you WHAT to do and HOW
- **Descriptive docs** (reference_library/) → Tell you WHAT EXISTS in the real world

**The Reference Library INFORMS decisions but does NOT DICTATE them.**

| Category | Contents |
|----------|----------|
| `open_questions/` | Research topics and unanswered questions |
| `correspondence/` | Emails, Slack threads, meeting notes |
| `user_research/` | Interviews, feedback, usage scenarios |
| `market_research/` | Competitor analysis, industry reports |
| `domain_knowledge/` | Expert input, terminology, business context |
| `specifications/` | External specs, PDFs, partner docs |

**Important:** Contradictions within the Reference Library are valuable information, not problems to solve.

---

## Activation Protocol

### Activation Sequence

**Transition Rule:** Before ANY code changes, planning, debugging, or answering questions about the project, you must:
1. Read `{{DOCS_DIR}}/context_master_guide.md`
2. Check `{{DOCS_DIR}}/technical_status.md`

### Skip Activation For
- Reading specific files ONLY when no general domain context is needed
- Quick syntax questions unrelated to project domain

---

## Development Workflow

### Before Implementation (Preparation Gate)

**Process Rule:** You are prohibited from writing code until you pass this gate.

1. **Context & Patterns**:
   - Call `check_pattern_exists(description)` to find prescriptive patterns.
   - **Crucial**: You must explicitly confirm if a pattern exists or not.
2. **Planning**:
   - Call `start_cycle_planning(cycle_id)`.
   - Call `analyze_cycle_scope()` -> If > 10, DECOMPOSE.
   - Create detailed plan in `roadmap/` if scope > 3.
3. **Approval**:
   - Review plan with user.
   - Call `approve_cycle_plan()`.
   - Only AFTER approval can you start the "Execution" phase.

### Cycle Plan Required Sections

**ALL sections are MANDATORY** when creating a detailed implementation plan:

| Section | Purpose |
|---------|---------|
| Progress Tracker | Track implementation status |
| Executive Summary | WHY: Business context at a glance |
| Target Users | WHO: Primary and secondary audiences |
| User Stories | WHAT: User perspective on capabilities |
| Security Considerations | Protection requirements for this feature |
| Research Summary | Problem statement and existing patterns |
| Scope Assessment | Complexity scoring (CRITICAL) |
| Technical Design | HOW: Architecture and code structure |
| Implementation Checklist | Step-by-step tasks |
| Success Criteria & Validation | Definition of done + tests to pass |
| Risk Assessment | What could go wrong |
| Approval | User sign-off before implementation |

**If a section doesn't apply, write:** "N/A - [reason]"
**Never skip a section without explanation.**

### During Implementation (Autonomous Execution)

When implementing an approved cycle plan:

1. **Follow the plan** - The plan contains everything needed
2. **Update Progress Tracker** - Check phases as you complete them
3. **Still follow other rules** - Check patterns, read technical_status, etc.
4. **Call `validate_cycle_completion()`** when done

### MCP Tool Call Failure Protocol

**Process Rule:** When ANY MCP tool call fails, you MUST stop and investigate. Never circumvent a failed tool call.

**When a tool call fails:**
1. **STOP execution immediately** - Do not continue with the current task
2. **Investigate the failure** - Read the error message, check MCP server logs, identify root cause
3. **Fix the underlying issue** - Resolve what caused the tool call to fail (configuration, server state, arguments, etc.)
4. **Retry the original tool call** - Confirm the tool now works correctly
5. **Resume execution** - Only continue with the task after the tool call succeeds

**What you must NEVER do when a tool call fails:**
- Do NOT read files directly to bypass a failed MCP context-gathering tool
- Do NOT skip a validation gate because the validation tool is unavailable
- Do NOT substitute your own judgment for what a tool would have returned
- Do NOT reason that a prior user instruction ("execute", "build", "proceed") overrides this protocol

**Why this matters:** MCP tools enforce the FluxFrame methodology - context gathering, pattern checking, validation gates. Circumventing a failed tool call means circumventing the methodology itself. A tool failure is a **blocker to be resolved**, not an inconvenience to work around.

**Priority hierarchy:** Tool call failure investigation > Prior user execution instructions. If the user said "build this feature" and a tool call fails mid-execution, the correct response is to pause, report the failure, investigate, and fix it - not to continue building while skipping the tool.

### Before Any Implementation

1. **Read Context** - Review `{{DOCS_DIR}}/context_master_guide.md` for full project context
2. **Check Patterns** - Search `{{DOCS_DIR}}/patterns/` for existing solutions (PRESCRIPTIVE)
3. **Check Reference Library** - Search `{{DOCS_DIR}}/reference_library/` for relevant user research, domain knowledge (DESCRIPTIVE)
4. **Read Status** - Check `{{DOCS_DIR}}/technical_status.md` for current state
5. **Review Cycle Plan** - Follow the approved plan in `{{DOCS_DIR}}/roadmap/`

### During Implementation

- **Build Real Components** - No stubs, mocks, or placeholder implementations in production code
- **Ensure Visible Results** - Every change should be demonstrable
- **Follow Existing Patterns** - When patterns exist, follow them exactly
- **Write Aligned Tests** - Tests should validate actual behavior
- **Follow the Plan** - Stick to the approved implementation plan

### After Implementation (Validation Gate)

**Process Rule:** You are prohibited from declaring a cycle "complete" without passing this gate.

1. **User Confirmation**: Demonstrate functionality and get explicit user approval ("yes, it works").
2. **Tool Validation (MANDATORY)**:
   - Call `get_completion_checklist()` to get the project-specific validation criteria.
   - **Crucial**: If you have not called this tool, you are NOT ready to complete.
3. **Execute Checklist**:
   - Fulfill every item in the returned checklist.
   - Update `technical_status.md` (Required).
   - Update `ROADMAP.md` (Required).
   - Document patterns/workflows if changed.
4. **Final Validation**:
   - Call `validate_cycle_completion()`.
   - Only NOW is the cycle complete.

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

### 1. Initialization Gate (MANDATORY)

**Process Rule:** You are prohibited from fixing bugs without this initialization.

1. **Classify**:
   - If user says "Bug", it is a BUG. Do not reclassify.
2. **Initialize Tool**:
   - Call `start_change_request(...)` with description and severity.
   - **STOP**: This tool call is the required entry point.

### 2. Analysis Phase (No Code Changes)
- Investigate root cause.
- Understand impact.
- **Rule:** Write NO code until analysis is complete.

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
- **When Applicable:** patterns/, workflows/, ROADMAP.md
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
- [ ] Search patterns for existing solutions (PRESCRIPTIVE)
- [ ] Check reference_library for relevant context (DESCRIPTIVE)

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
