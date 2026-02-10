# {{PROJECT_NAME}}: Completion Protocol

<!--
INSTRUCTIONS FOR AI ASSISTANT:
This document contains the detailed completion sequence, validation questions,
testing golden rule, and completion checklists for development cycles.
Read this via MCP tools when completing a cycle (cycle_complete task type).
Fill {{PLACEHOLDERS}} based on the project questionnaire responses.
-->

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
1. **First:** Implement the {{BACKEND_COMPONENT}} functionality WITH REAL COMPONENTS (no stubs)
2. **Second:** **Deploy & Verify in {{VERIFICATION_ENV}}** - {{VERIFICATION_INSTRUCTIONS}}
3. **Third:** **ALIGN ALL TESTING WITH ACTUAL IMPLEMENTATION** - Ensure test data, instructions, and validation precisely match what was built
4. **Fourth:** RUN AND PASS ALL TESTS ({{TEST_TYPES}}) - using correctly aligned test data

**AFTER Implementation:**
5. **Fifth:** Update `technical_status.md` with what was built, what's working, what's broken, and next steps
6. **Sixth:** Update test documentation and create/update tests for new functionality
7. **Seventh:** **Update `patterns/`** if new patterns were established or existing ones were applied
8. **Eighth:** {{CUSTOM_UPDATE_STEP}} (if applicable)
9. **Ninth:** Update other relevant project documents as needed

**FINAL Alignment Check:**
10. **Verify Protocol Alignment:** Check that your AI agent configuration (e.g., `AGENTS.md`, `.clinerules`, `.roomodes`) matches the project methodology.
    - Compare the "Before starting code work" and "Before marking work complete" protocols.
    - Raise concerns if workflow descriptions have diverged.
    - Update your rules if the methodology workflow has changed.

---

## CRITICAL ALIGNMENT RULE: Test Data Must Match Implementation

**Before any cycle is marked complete, ALL testing components must be verified to match the actual implementation:**

- **Test Documents**: Must match the exact input types and scenarios the cycle handles
- **{{TEST_TYPE_1}}**: Must test the actual workflows users can perform
- **{{TEST_TYPE_2}}**: Must validate the specific capabilities implemented
- **{{TEST_TYPE_3}}**: Must test the actual services and endpoints built
- **Expected Outputs**: Must match the actual data structures and {{OUTPUT_FORMAT}}

**Example validation:**
- **WRONG**: {{WRONG_TEST_SCENARIO}}
- **CORRECT**: {{CORRECT_TEST_SCENARIO}}

**Validation Questions for Every Cycle:**
1. Do the test documents match the Primary Inputs specified in the implementation plan?
2. Do the test instructions test the exact workflows the {{USER_INTERFACE}} enables?
3. Do the expected outputs match what the {{OUTPUT_DESTINATION}} actually displays?
4. Can a user follow the {{MANUAL_TEST_TYPE}} using the actual deployed application?

---

## The "Real {{COMPONENT_TYPE}} Always" Policy

**CRITICAL RULE: No cycle is EVER complete while running on stubs. We have eliminated all stub modes from the system.**

- **Development & Production:** Both environments use identical code paths with real {{EXTERNAL_SERVICE}} calls
- **Testing:** Uses proper {{TESTING_FRAMEWORK}} mocking at the {{MOCK_BOUNDARY}}, not fake business logic
- **No Stub Modes:** We never use fake data generation or simulated responses in any environment
- **Consistency:** This ensures development, testing, and production all behave identically

---

## Completion Checklist

**No cycle is complete without:**
- Real {{EXTERNAL_SERVICE}} calls (never stub responses)
- Visible {{UI_COMPONENT}} results
- All unit tests passing (using proper API mocking)
- Integration tests passing for current cycle
- {{MANUAL_TEST_TYPE}} completed with documented results
- {{AUTOMATED_TEST_TYPE}} validating functionality
- No regression in previous cycle functionality
- Updated documentation (including test documentation)
- End-to-end functionality with production components
- Patterns documented in `patterns/`
- **API Contract Standard compliance**:
  - Backend: ALL new endpoints have {{CONTRACT_VALIDATION}}
  - Backend: ALL new endpoints explicitly map service data to {{CONTRACT_MODEL}}
  - Backend: ALL new endpoints have return type annotations
  - Frontend: NO direct {{HTTP_CLIENT}} calls (use {{API_CLIENT_MODULE}})
  - Frontend: Proper error handling with {{ERROR_CLASS}}
  - Reference: `patterns/api_contract_pattern.md`

---

## Golden Rules

**The Testing Golden Rule:** A cycle that hasn't been tested is not complete - it's just code.

**The Pattern Library Golden Rule:** Before implementing any feature, check `patterns/` first. If a pattern exists, use it. If not, create one and document it.

---

Maintaining this "master context" is the key to our ability to build a complex {{SYSTEM_TYPE}} with clarity, alignment, and speed.

---

<!-- AI ASSISTANT FINAL CHECKLIST:
- [ ] All {{PLACEHOLDERS}} replaced with project-specific values
- [ ] Test types match project's actual test setup
- [ ] Verification environment matches project configuration
- [ ] API contract approach matches chosen methodology
-->
