# Development Cycle Workflow

**Universal methodology for iterative, output-focused development**

---

## Philosophy

Development cycles (also called "iterations") are the fundamental unit of progress in this framework. Unlike time-boxed sprints, cycles are **capability-boxes**: each one delivers a specific, testable piece of visible functionality.

**Core Principle:** Every cycle produces something users can see, test, and validate.

**Not "agile sprints"** (arbitrary time boxes)  
**But "capability iterations"** (concrete value delivery)

---

## The Three Phases

Every development cycle follows this universal three-phase pattern:

### BEFORE Implementation
### DURING Implementation  
### AFTER Implementation

Each phase has mandatory steps that ensure quality, consistency, and knowledge preservation.

---

## BEFORE Implementation: Preparation

**Goal:** Understand context, check for existing solutions, plan approach

### 1. Gather Context

**MCP Tool:** `get_context_for_task(task_type="cycle_start")`

**Actions:**
- Read current implementation status
- Understand what's already built
- Identify dependencies on previous cycles
- Review any blockers or known issues

**Why:** You can't build effectively without knowing the current state.

### 2. Check for Patterns

**MCP Tool:** `check_pattern_exists(feature_description="[what you're building]")`

**Actions:**
- Search pattern library for similar work
- If pattern exists → Read it and follow exactly
- If no pattern → Proceed, plan to document new pattern

**Why:** Don't reinvent solved problems. Reuse proven solutions.

### 3. Read Relevant Documentation

**Based on context, read:**
- Technical architecture docs
- Domain expertise/requirements docs
- API contract standards
- Related pattern documentation

**Why:** Deep understanding prevents rework and misalignment.

### 4. Plan Implementation Approach

**Create mental model:**
- What components need changes?
- What new code needs writing?
- What tests are needed?
- What could go wrong?

**Think before coding.**

---

## DURING Implementation: Building

**Goal:** Implement real functionality, make results visible, align tests

### 1. Implement with REAL Components

**Rule:** No stubs. No mocks in production code. No "we'll add this later."

**Why:** Stubs hide integration problems until it's too late. Real components surface issues immediately.

**Example:**
- ❌ DON'T: Return hardcoded `{"status": "success"}` from API
- ✅ DO: Actually call the database/service/AI model

### 2. Make Results Visible to Users

**Rule:** Every cycle must produce UI changes or observable outputs.

**Implementation isn't done until users can:**
- See it (in UI)
- Click it (if interactive)
- Test it (manually or automated)

**Why:** "Backend complete but no UI" means nothing to users. Complete the loop.

### 3. Align Tests with Implementation

**Critical Rule:** Tests must match what you ACTUALLY built, not what you PLANNED to build.

**Before declaring any work complete:**

| Validation Question | Why It Matters |
|---------------------|----------------|
| Do test documents match actual inputs? | Wrong test data = false confidence |
| Do test instructions match actual workflows? | Users can't reproduce tests = broken tests |
| Do expected outputs match actual displays? | Tests pass but don't validate reality |
| Can a user follow tests using the real application? | Tests should document actual system behavior |

**Example Misalignment:**
- You planned to build Feature X
- Requirements shifted, you built Feature Y
- But tests still validate Feature X
- **Result:** Tests pass but don't test reality

**Fix:** Update tests to match Feature Y BEFORE marking complete.

### 4. Run and Pass ALL Tests

**Mandatory test suite:**
- Unit tests (if applicable)
- Integration tests (for current cycle)
- Regression tests (previous cycles still work)
- Manual/GUI tests (if applicable)
- End-to-end tests (full user workflow)

**Rule:** Every test must PASS before proceeding to AFTER phase.

**Why:** Broken tests = unfinished work. No exceptions.

---

## AFTER Implementation: Documentation & Validation

**Goal:** Preserve knowledge, update status, validate completion

### Critical Update Sequence

**Follow this order. Every time. No skipping steps.**

#### 5. Update Technical Status

**File:** `technical_status.md`

**Update:**
- Current cycle status → COMPLETE
- What was built (capabilities section)
- What's working
- What's broken (if anything)
- Next steps

**Why:** This is the single source of truth for project state. Stale status = broken trust.

#### 6. Update Test Documentation

**Actions:**
- Document new test scenarios
- Update test data if needed
- Create/update test instructions
- Record test results

**Why:** Tests without documentation are useless to future developers.

#### 7. Update Pattern Library

**IF new patterns were established:**
- Document the pattern in `patterns/` directory
- Include: use case, code example, pitfalls, testing approach
- Set pattern status (Canonical, Established, Experimental)

**IF existing patterns were applied:**
- Note successful application in pattern doc
- Add to "Used In" section

**IF inconsistencies were found:**
- Add to Harmonization Backlog
- Consider refactoring if critical

**Why:** Pattern library is how we scale intelligence across team.

#### 8. Update Additional Context (if applicable)

**Examples:**
- Context catalog (if using AI assistant)
- Workflow documentation (if conceptual logic changed)
- API contract docs (if new endpoints added)
- Custom project-specific docs

**Tool:** `validate_workflow_documentation(changes_made=[...], description="...")`

**Why:** Keep ALL documentation in sync with reality.

#### 9. Update Implementation Plan

**Actions:**
- Mark current cycle as COMPLETE
- Update cycle status in high-level plan
- Update detailed plan if exists
- Verify alignment between both

**Why:** Roadmap must reflect actual progress.

---

## Completion Validation

**Before marking cycle complete, verify:**

### Checklist from MCP

**Tool:** `get_completion_checklist()`

Returns comprehensive checklist including:
- All code complete and merged
- All tests passing
- All documentation updated
- Pattern library current
- No regressions introduced

### Alignment Validation

**Tool:** `validate_cycle_completion(cycle="X.X", completed_items=[...])`

Verifies:
- Technical status matches implementation plan
- Detailed plan aligns with high-level plan
- All mandatory docs updated
- No broken links or missing files

### Present Results to User

**Show:**
- What was built
- What tests passed
- What docs were updated
- What patterns were applied/created
- What's ready for next cycle

**Get user confirmation before using `attempt_completion`.**

---

## Quality Gates

**A cycle is NOT complete until:**

✅ Real components implemented (no stubs)  
✅ Visible UI results  
✅ All tests passing (aligned with implementation)  
✅ technical_status.md updated  
✅ Pattern library updated (if applicable)  
✅ Test documentation current  
✅ Implementation plan updated  
✅ Additional context updated (if applicable)  
✅ MCP validation tools confirm completion  
✅ User confirms work is complete

**The Testing Golden Rule:** A cycle that hasn't been tested is not complete - it's just code.

**The Pattern Golden Rule:** Before implementing any feature, check patterns first. If pattern exists, use it. If not, create one and document it.

---

## Common Mistakes

### ❌ "Backend is done, UI can wait"
**Problem:** Users can't validate incomplete work  
**Solution:** Complete the full vertical slice every cycle

### ❌ "Tests still use old assumptions"
**Problem:** Tests pass but validate wrong thing  
**Solution:** Update tests to match actual implementation

### ❌ "I'll document this later"
**Problem:** Knowledge is lost, future devs struggle  
**Solution:** Document immediately while context is fresh

### ❌ "It works on my machine"
**Problem:** Production environment differs  
**Solution:** Use real components, test in real environment

### ❌ "Quick fix, no need for patterns"
**Problem:** Inconsistency accumulates  
**Solution:** EVERY change follows pattern-check workflow

---

## Cycle Sizing Guidelines

**Too Large (Anti-pattern):**
- Takes >2 weeks
- Multiple unrelated features
- Can't demo intermediate progress
- High risk of wasted work

**Too Small (Inefficient):**
- Trivial changes
- No visible output
- Just refactoring (unless part of larger cycle)

**Just Right:**
- 3-10 days of work
- Single coherent capability
- Visible, testable output
- Clear success criteria
- Low risk of rework

---

## Integration with Change Requests

**For NEW capabilities:** Use this cycle workflow

**For BUGS/FIXES:** Use change request protocol (see `change_request_protocol.md`)

**Both share:**
- Pattern checking
- Documentation requirements
- Quality gates
- Completion validation

---

## The Compound Effect

Following this workflow consistently:

**After Cycle 1:** You have working code + docs  
**After Cycle 3:** Patterns emerge, velocity increases  
**After Cycle 5:** New features reuse patterns, 10x faster  
**After Cycle 10:** Onboarding new devs is trivial  
**After Cycle 20:** System is resilient, documented, scalable

**Conversely, skipping steps:**

**After Cycle 1:** Technical debt introduced  
**After Cycle 3:** Inconsistencies multiply  
**After Cycle 5:** New features break old ones  
**After Cycle 10:** Nobody understands the codebase  
**After Cycle 20:** Complete rewrite required

---

## Key Takeaways

1. **BEFORE:** Gather context, check patterns, plan approach
2. **DURING:** Real components, visible results, aligned tests
3. **AFTER:** Update ALL docs, validate completion, get confirmation

**Every cycle. Every time. No exceptions.**

This is how you build maintainable, scalable systems with AI assistance.

---

**Next:** See `completion_checklist.md` for detailed completion criteria  
**Related:** See `change_request_protocol.md` for bug/fix workflow