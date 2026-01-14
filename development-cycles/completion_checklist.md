# Development Cycle Completion Checklist

**Comprehensive criteria for marking a cycle as COMPLETE**

---

## Purpose

This checklist ensures that every development cycle meets quality standards before being marked complete. It prevents the common mistake of declaring work "done" when critical steps have been skipped.

**Use this checklist:**
- Before using `attempt_completion` tool
- When reviewing PR/merge requests
- During cycle handoff between developers
- As validation in MCP `get_completion_checklist()` tool

---

## The Golden Rules

**A cycle is NOT complete until:**

1. ✅ **Users can see and test the results**
2. ✅ **All tests pass**
3. ✅ **All documentation is updated**
4. ✅ **Validation tools confirm completion**

**If even ONE item is incomplete, the cycle is NOT done.**

---

## Core Implementation Checklist

### ✅ Backend/Service Layer

- [ ] **Core functionality implemented**
  - All planned features working
  - Real components (no stubs or mocks)
  - Proper error handling
  - Input validation

- [ ] **Integration complete**
  - Connects to actual data sources
  - API contracts followed
  - Service layer properly abstracted

- [ ] **Code quality**
  - No commented-out code
  - No debug logging in production paths
  - Follows project coding standards
  - Pattern library consulted and followed

### ✅ Frontend/UI Layer

- [ ] **Visible results**
  - UI components render correctly
  - Users can interact with new feature
  - Loading states implemented
  - Error states implemented

- [ ] **User experience**
  - Intuitive interface
  - Responsive design (if applicable)
  - Accessibility considered
  - No console errors

- [ ] **Integration complete**
  - Uses typed API client (not direct fetch)
  - Error handling implemented
  - Data flows end-to-end

### ✅ API Contract Compliance (MANDATORY IF ENDPOINTS ADDED/MODIFIED)

- [ ] **validate_api_contracts() MCP tool called**
  - Provide list of all endpoints added or modified
  - Tool validates against chosen contract approach

- [ ] **Contract definition complete**
  - Backend: Response models defined (Pydantic/GraphQL/JSON Schema)
  - Backend: Validation implemented
  - Contract documented in api_contract_standards.md

- [ ] **Type safety enforced**
  - Frontend: Types auto-generated from contract
  - Frontend: NO direct HTTP calls (uses typed client)
  - TypeScript compilation passes without errors

- [ ] **Contract-first sequence followed**
  - Step 1: Contract defined FIRST
  - Step 2: Backend implemented against contract
  - Step 3: Frontend types generated
  - Step 4: Frontend uses typed client
  - Step 5: End-to-end validation

- [ ] **Breaking change handling**
  - Type mismatches caught at compile time
  - No runtime surprises
  - Migration path documented (if breaking changes)

**⚠️ THIS IS A SEPARATE, EXPLICIT CHECK - NOT COVERED BY PATTERN VALIDATION**

API contracts prevent integration failures. They are enforced independently because they're too critical to rely on pattern checking alone.

---

## Testing Checklist

### ✅ Test Implementation

- [ ] **Test data aligned with implementation**
  - Test inputs match actual system inputs
  - Test scenarios match actual workflows
  - Expected outputs match actual displays

- [ ] **Test types created**
  - Unit tests (where applicable)
  - Integration tests for current cycle
  - End-to-end tests for user workflows
  - Manual test instructions documented

### ✅ Test Execution

- [ ] **All tests passing**
  - Unit tests: PASS
  - Integration tests: PASS
  - E2E tests: PASS
  - Manual tests: Completed and documented

- [ ] **Regression prevention**
  - Previous cycle tests still pass
  - No functionality broken
  - Performance not degraded

### ✅ Test Documentation

- [ ] **Test scenarios documented**
  - Step-by-step instructions
  - Expected vs. actual results
  - Edge cases identified
  - Failure scenarios tested

---

## Documentation Checklist

### ✅ Technical Status (ALWAYS Required)

**File:** `technical_status.md`

- [ ] **Cycle status updated**
  - Status changed to "COMPLETE"
  - Completion date added
  - Relevance statement included

- [ ] **Capabilities section updated**
  - New functionality described
  - What actually works
  - Known limitations documented
  - Next steps identified

- [ ] **Implementation details recorded**
  - Key files created/modified listed
  - Architecture decisions documented
  - Dependencies noted

### ✅ Pattern Library (If Applicable)

**Directory:** `patterns/`

- [ ] **Existing patterns applied**
  - Pattern consultation performed
  - Pattern followed correctly
  - "Used In" section updated

- [ ] **New patterns documented** (if created)
  - Pattern name and status
  - Use case clearly defined
  - Code examples provided
  - Pitfalls documented
  - Testing approach included

- [ ] **Inconsistencies tracked**
  - Added to Harmonization Backlog
  - Severity assessed
  - Refactoring plan noted (if needed)

### ✅ Implementation Plan

**Files:** `ROADMAP.md` + `roadmap/` (if detailed plan exists)

- [ ] **High-level plan updated**
  - Cycle status → COMPLETE
  - Completion date added
  - Deliverables checked off

- [ ] **Detailed plan exists and was followed**
  - Plan created via `start_cycle_planning()` before implementation
  - Scope assessment completed (complexity score < 10 or decomposed)
  - Plan approved via `approve_cycle_plan()` before coding started

- [ ] **Detailed plan updated** (if exists)
  - Matches high-level plan status
  - Technical details current
  - Timeline accurate
  - Any deviations documented with reasoning

- [ ] **Plan alignment verified**
  - High-level and detailed plans match
  - No contradictions
  - Dependencies properly reflected
  - Sub-cycles added if original scope was decomposed

### ✅ Additional Documentation (Project-Specific)

- [ ] **Workflow docs** (if conceptual logic changed)
  - User journey updated
  - Technical flows updated
  - Component reference current

- [ ] **API contracts** (if new endpoints)
  - Contract defined and documented
  - Types generated/updated
  - Pattern library referenced

- [ ] **Context catalog** (if using AI assistant)
  - New capabilities documented
  - Suggested questions added
  - Metadata current

---

## Quality Standards Checklist

### ✅ Code Quality

- [ ] **No technical debt introduced**
  - Code follows established patterns
  - No workarounds or hacks
  - TODOs have tickets

- [ ] **Security considered**
  - Authentication/authorization checked
  - Input validation present
  - Sensitive data protected

- [ ] **Performance acceptable**
  - No obvious bottlenecks
  - Queries optimized
  - Large datasets handled

### ✅ User Experience

- [ ] **Intuitive and discoverable**
  - New features obvious to users
  - Help text where needed
  - Error messages clear

- [ ] **Consistent with existing UI**
  - Design patterns followed
  - Terminology consistent
  - Navigation logical

### ✅ API Contracts (If Applicable)

- [ ] **Contract-first development followed**
  - Contract defined before implementation
  - Backend validates responses
  - Frontend uses generated types

- [ ] **Breaking changes managed**
  - Versioning strategy followed
  - Deprecation handled
  - Migration path clear

---

## Validation Checklist

### ✅ Automated Validation

- [ ] **MCP tools used**
  - `get_completion_checklist()` reviewed
  - `validate_cycle_completion()` passed
  - `validate_workflow_documentation()` passed (if applicable)

- [ ] **Build/deploy successful**
  - Code compiles/builds
  - No TypeScript errors
  - No linting errors
  - Deployment successful

### ✅ Manual Validation

- [ ] **End-to-end workflow tested**
  - Full user journey works
  - Data persists correctly
  - UI updates appropriately

- [ ] **Cross-browser tested** (if web app)
  - Works in primary browsers
  - Mobile responsive (if applicable)

- [ ] **Stakeholder confirmation**
  - User validates feature works
  - Product owner approves
  - QA sign-off (if applicable)

---

## Final Review Checklist

### ✅ Before Marking Complete

- [ ] **All checkboxes above are checked**
  - Implementation complete
  - Tests passing
  - Documentation updated
  - Quality standards met
  - Validation successful

- [ ] **No known blockers**
  - No critical bugs
  - No missing dependencies
  - No infrastructure issues

- [ ] **Team communication**
  - Team notified of completion
  - Handoff documented (if needed)
  - Next cycle dependencies clear

- [ ] **User confirmation received**
  - User has tested feature
  - User confirms it works
  - User approves completion

---

## Common Incomplete Scenarios

### ❌ NOT Complete: "Backend is done"
**Missing:** Frontend integration, visible results, E2E tests

### ❌ NOT Complete: "Tests pass in my environment"
**Missing:** CI/CD validation, production testing

### ❌ NOT Complete: "Feature works, will document later"
**Missing:** Documentation updates, knowledge preservation

### ❌ NOT Complete: "Quick fix, no need for tests"
**Missing:** Test alignment, regression prevention

### ❌ NOT Complete: "Pushed to main, waiting for user feedback"
**Missing:** User validation BEFORE marking complete

---

## Cycle Completion Levels

### Level 1: Minimum Viable (Acceptable)
- ✅ Core functionality works
- ✅ Basic tests pass
- ✅ Critical docs updated
- ✅ User can validate

### Level 2: Standard (Expected)
- ✅ All Level 1 items
- ✅ Comprehensive testing
- ✅ All documentation current
- ✅ Pattern library updated
- ✅ No regressions

### Level 3: Excellent (Aspirational)
- ✅ All Level 2 items
- ✅ Edge cases tested
- ✅ Performance optimized
- ✅ Accessibility validated
- ✅ User delighted

**Target:** Always meet Level 2 (Standard)

---

## MCP Tool Integration

The `get_completion_checklist()` MCP tool returns a project-specific version of this checklist, customized for the current cycle.

**How it works:**
1. Call `get_completion_checklist()` before marking complete
2. Tool returns checklist with cycle-specific items
3. Verify all items checked
4. Share checklist with user
5. Only then use `attempt_completion`

**Example MCP response:**
```json
{
  "cycle": "Cycle 1.3",
  "checklist": {
    "implementation": ["✅ API endpoint created", "✅ Frontend component built"],
    "testing": ["✅ Unit tests", "✅ Integration tests"],
    "documentation": ["✅ technical_status.md", "✅ patterns/"],
    "validation": ["✅ Build passes", "✅ E2E test passes"],
    "all_complete": true
  }
}
```

---

## Quick Reference

**Before starting cycle:**
→ See `cycle_workflow.md` BEFORE section

**During cycle:**
→ See `cycle_workflow.md` DURING section

**After cycle (this document):**
1. Review this complete checklist
2. Call `get_completion_checklist()` MCP tool
3. Verify all items √
4. Get user confirmation
5. Use `attempt_completion`

---

## Key Takeaway

**The purpose of this checklist is not to slow you down - it's to ensure that when you declare work "complete," it actually IS complete.**

Incomplete work compounds into technical debt. Complete work compounds into a reliable, maintainable system.

**Every checkbox matters.**

---

**Related Documents:**
- `cycle_workflow.md` - The full workflow process
- `change_request_protocol.md` - For bug fixes and changes
- `../doc-templates/technical_status.template.md` - Status doc template
