# TaskFlow Pro: Completion Protocol

## Purpose

This document defines the detailed completion protocol for development cycles. It is read on-demand (via the `get_context_for_task(task_type="cycle_complete")` MCP tool or directly) when you need the full validation sequence. For the core workflow overview, see `AGENTS.md`.

---

## The Golden Rule: Maintain the Mind

After any significant change — a feature is built, an architectural decision is made, a new technology is chosen — the first step after implementation is to **update these documents.**

### Critical Update Sequence for Every Development Cycle:

**BEFORE Implementation:**
0. **Check for Patterns:** Use `check_pattern_exists()` MCP tool with description of what you're building
   - If pattern exists → Read it and follow exactly
   - If no pattern exists → Proceed with implementation and plan to document the new pattern

**DURING Implementation:**
1. **First:** Implement the backend functionality WITH REAL COMPONENTS (no stubs)
2. **Second:** **Deploy & Verify** - Test in development environment
3. **Third:** **ALIGN ALL TESTING WITH ACTUAL IMPLEMENTATION** - Ensure test data, instructions, and validation precisely match what was built
4. **Fourth:** RUN AND PASS ALL TESTS (unit, integration, e2e) - using correctly aligned test data

**AFTER Implementation:**
5. **Fifth:** Update `technical_status.md` with what was built, what's working, what's broken, and next steps
6. **Sixth:** Update test documentation and create/update tests for new functionality
7. **Seventh:** **Update `patterns/`** if new patterns were established or existing ones were applied
8. **Eighth:** Update other relevant project documents as needed

**FINAL Alignment Check:**
9. **Verify Protocol Alignment:** Check that your AI agent configuration (e.g., `AGENTS.md`, `.clinerules`, `.roomodes`) matches the project methodology.
    - Compare the "Before starting code work" and "Before marking work complete" protocols.
    - Raise concerns if workflow descriptions have diverged.
    - Update your rules if the methodology workflow has changed.

---

## CRITICAL ALIGNMENT RULE: Test Data Must Match Implementation

**Before any cycle is marked complete, ALL testing components must be verified to match the actual implementation:**

- **Test Documents**: Must match the exact input types and scenarios the cycle handles
- **Unit Tests**: Must test the actual functions and methods implemented
- **Integration Tests**: Must validate the specific API endpoints built
- **E2E Tests**: Must test the actual user workflows the UI enables
- **Expected Outputs**: Must match the actual data structures and response formats

**Validation Questions for Every Cycle:**
1. Do the test documents match the Primary Inputs specified in the implementation plan?
2. Do the test instructions test the exact workflows the UI enables?
3. Do the expected outputs match what the API actually returns?
4. Can a user follow the manual tests using the actual deployed application?

---

## The "Real Analysis Always" Policy

**CRITICAL RULE: No cycle is EVER complete while running on stubs. We have eliminated all stub modes from the system.**

- **Development & Production:** Both environments use identical code paths with real API calls
- **Testing:** Uses proper test fixtures and mocking at external boundaries, not fake business logic
- **No Stub Modes:** We never use fake data generation or simulated responses in any environment
- **Consistency:** This ensures development, testing, and production all behave identically

---

## Completion Checklist

**No cycle is complete without:**
- ✅ Real API calls (never stub responses)
- ✅ Visible UI results
- ✅ All unit tests passing (using proper API mocking)
- ✅ Integration tests passing for current cycle
- ✅ Manual testing completed with documented results
- ✅ E2E tests validating functionality
- ✅ No regression in previous cycle functionality
- ✅ Updated documentation (including test documentation)
- ✅ End-to-end functionality with production components
- ✅ Patterns documented in `patterns/`
- ✅ **API Contract Standard compliance**:
  - Backend: ALL new endpoints have `response_model` parameter
  - Backend: ALL new endpoints explicitly map service data to Pydantic models
  - Backend: ALL new endpoints have return type annotations
  - Frontend: NO direct `fetch()` calls (use `apiClient`)
  - Frontend: Proper error handling with `APIClientError`
  - Reference: `patterns/api_task_endpoint_pattern.md`

---

## Golden Rules

**The Testing Golden Rule:** A cycle that hasn't been tested is not complete - it's just code.

**The Pattern Library Golden Rule:** Before implementing any feature, check `patterns/` first. If a pattern exists, use it. If not, create one and document it.

---

Maintaining this "master context" is the key to our ability to build a complex task management platform with clarity, alignment, and speed.
