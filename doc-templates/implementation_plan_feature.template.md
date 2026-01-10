# {{CYCLE_ID}}: {{CYCLE_NAME}} — Implementation Plan

<!--
INSTRUCTIONS FOR AI ASSISTANT:
This is the DETAILED implementation plan for a specific development cycle.
It is created BEFORE implementation begins, during the planning/research phase.

KEY PRINCIPLES:
1. This plan is created ONLY when ready to implement (just-in-time planning)
2. Scope analysis is MANDATORY - if feature is too large, decompose it
3. The plan must align with the high-level implementation_plan.md
4. User approval is required before implementation begins

Replace {{PLACEHOLDERS}} with actual values from your research.
-->

**Parent Cycle:** {{PARENT_CYCLE_REFERENCE}} (if this is a sub-cycle)
**High-Level Reference:** [implementation_plan.md](../implementation_plan.md) → Cycle {{CYCLE_ID}}
**Status:** 📋 PLANNING
**Created:** {{DATE}}
**Last Updated:** {{DATE}}

---

## 1. Research Summary

### Problem Statement

**What we're building:**
{{PROBLEM_DESCRIPTION}}

**Why it matters:**
{{VALUE_PROPOSITION}}

**User impact:**
{{USER_IMPACT}}

### Existing Code & Patterns Analysis

<!--
AI ASSISTANT: Before designing anything new, check what already exists.
Call check_pattern_exists() and review the codebase.
-->

**Existing patterns that apply:**
- {{PATTERN_1}}: {{HOW_IT_APPLIES}}
- {{PATTERN_2}}: {{HOW_IT_APPLIES}}

**Existing code to reuse:**
- {{FILE_OR_COMPONENT}}: {{WHAT_TO_REUSE}}

**Research findings:**
{{RESEARCH_NOTES}}

---

## 2. Scope Assessment (MANDATORY)

<!--
AI ASSISTANT: This section is CRITICAL. Be honest about complexity.
A senior engineer knows: ship small, test, iterate.

If this feature is too large, DECOMPOSE IT. Do not try to implement
everything in one cycle just because the user asked for it.
-->

### Complexity Score

Rate each dimension 1-5 (1=trivial, 5=very complex):

| Dimension | Score | Notes |
|-----------|-------|-------|
| Lines of code (estimated) | {{SCORE}} | {{ESTIMATE}} LOC |
| Components affected | {{SCORE}} | {{LIST_COMPONENTS}} |
| External dependencies/APIs | {{SCORE}} | {{LIST_DEPS}} |
| Database/schema changes | {{SCORE}} | {{DB_CHANGES}} |
| Risk to existing functionality | {{SCORE}} | {{RISK_NOTES}} |
| **TOTAL** | **{{TOTAL}}/25** | |

### Scope Verdict

<!--
AI ASSISTANT: Use these thresholds:
- Total ≤ 10: ✅ Proceed as single cycle
- Total 11-15: ⚠️ Consider decomposition
- Total > 15: ❌ MUST decompose
-->

**Verdict:** {{VERDICT}}

**Reasoning:**
{{VERDICT_REASONING}}

---

## 3. Decomposition (If Required)

<!--
AI ASSISTANT: If scope verdict is ⚠️ or ❌, this section is REQUIRED.
Break the feature into smaller, independently testable increments.
Each sub-cycle should deliver visible value.
-->

{{IF_DECOMPOSITION_REQUIRED}}

### Recommended Sub-Cycles

| Sub-Cycle | Description | Visible Output | Builds On |
|-----------|-------------|----------------|-----------|
| {{CYCLE_ID}}a | {{DESC}} | {{OUTPUT}} | Foundation |
| {{CYCLE_ID}}b | {{DESC}} | {{OUTPUT}} | {{CYCLE_ID}}a |
| {{CYCLE_ID}}c | {{DESC}} | {{OUTPUT}} | {{CYCLE_ID}}b |

### Why This Decomposition

**First increment ({{CYCLE_ID}}a) chosen because:**
{{FIRST_INCREMENT_REASONING}}

**Each increment is testable because:**
{{TESTABILITY_REASONING}}

### Impact on Implementation Plan

<!--
AI ASSISTANT: If decomposing, you MUST update the high-level implementation_plan.md
to reflect the new sub-cycles. Add them as 1.2a, 1.2b, etc.
-->

**Changes to implementation_plan.md:**
- [ ] Add sub-cycles {{CYCLE_ID}}a, {{CYCLE_ID}}b, etc.
- [ ] Update timeline estimates
- [ ] Document dependencies between sub-cycles

**THIS DETAILED PLAN COVERS ONLY:** {{CYCLE_ID}}{{FIRST_SUB}} — {{FIRST_SUB_DESC}}

{{/IF_DECOMPOSITION_REQUIRED}}

---

## 4. Technical Design

### Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| {{DECISION_1}} | {{CHOICE}} | {{WHY}} |
| {{DECISION_2}} | {{CHOICE}} | {{WHY}} |

### Code Structure

**Files to create:**
```
{{NEW_FILE_PATH_1}}   # {{PURPOSE}}
{{NEW_FILE_PATH_2}}   # {{PURPOSE}}
```

**Files to modify:**
```
{{EXISTING_FILE_1}}   # {{CHANGES}}
{{EXISTING_FILE_2}}   # {{CHANGES}}
```

### API Contracts (If Applicable)

<!--
AI ASSISTANT: If adding/modifying endpoints, define the contract FIRST.
This is contract-first development.
-->

{{IF_API_CHANGES}}

**New/Modified Endpoints:**

```
{{METHOD}} {{ENDPOINT}}
Request:  {{REQUEST_SCHEMA}}
Response: {{RESPONSE_SCHEMA}}
```

**Contract validation approach:** {{APPROACH}}

{{/IF_API_CHANGES}}

### Database Changes (If Applicable)

{{IF_DB_CHANGES}}

**Schema changes:**
```sql
{{SCHEMA_CHANGES}}
```

**Migration strategy:** {{MIGRATION_APPROACH}}

{{/IF_DB_CHANGES}}

---

## 5. Implementation Checklist

<!--
AI ASSISTANT: Break implementation into small, testable steps.
Each checkbox should be independently verifiable.
-->

### Backend/Service Layer
- [ ] {{BACKEND_TASK_1}}
- [ ] {{BACKEND_TASK_2}}
- [ ] {{BACKEND_TASK_3}}

### Frontend/UI Layer
- [ ] {{FRONTEND_TASK_1}}
- [ ] {{FRONTEND_TASK_2}}
- [ ] {{FRONTEND_TASK_3}}

### Integration
- [ ] {{INTEGRATION_TASK_1}}
- [ ] {{INTEGRATION_TASK_2}}

---

## 6. Test Strategy

### Unit Tests
- [ ] {{UNIT_TEST_1}}
- [ ] {{UNIT_TEST_2}}

### Integration Tests
- [ ] {{INTEGRATION_TEST_1}}
- [ ] {{INTEGRATION_TEST_2}}

### End-to-End Tests
- [ ] {{E2E_TEST_1}}
- [ ] {{E2E_TEST_2}}

### Manual Testing
**Verification environment:** {{VERIFICATION_ENV}}
**Test steps:**
1. {{STEP_1}}
2. {{STEP_2}}
3. {{STEP_3}}

---

## 7. Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| {{RISK_1}} | {{L/M/H}} | {{L/M/H}} | {{MITIGATION}} |
| {{RISK_2}} | {{L/M/H}} | {{L/M/H}} | {{MITIGATION}} |

---

## 8. Alignment Verification

<!--
AI ASSISTANT: Before this plan is approved, verify alignment with high-level plan.
-->

### Matches High-Level Plan

- [ ] Purpose matches `implementation_plan.md` description
- [ ] Inputs/outputs match high-level plan
- [ ] Timeline is realistic
- [ ] Dependencies are accurate

### Success Criteria (from high-level plan)

{{SUCCESS_CRITERIA_FROM_IMPLEMENTATION_PLAN}}

---

## 9. Approval

<!--
AI ASSISTANT: This section is completed when the user approves the plan.
Call approve_cycle_plan(cycle_id) after user approval.
-->

- [ ] **User approved this plan**
- [ ] **Scope assessment reviewed**
- [ ] **Decomposition applied** (if required)
- [ ] **Ready for implementation**

**Approved by:** {{USER}}
**Approval date:** {{DATE}}

---

## 10. Implementation Notes

<!--
AI ASSISTANT: Use this section during implementation to capture:
- Decisions made during coding
- Deviations from the plan (with reasons)
- Issues encountered
- Patterns established (to document in pattern library)
-->

### During Implementation

{{IMPLEMENTATION_NOTES}}

### Deviations from Plan

| What Changed | Why | Impact |
|--------------|-----|--------|
| {{DEVIATION}} | {{REASON}} | {{IMPACT}} |

---

<!--
AI ASSISTANT CHECKLIST (before creating this plan):
- [ ] Called start_cycle_planning() to initiate
- [ ] Called analyze_cycle_scope() with feature details
- [ ] Called check_pattern_exists() for relevant patterns
- [ ] Reviewed existing codebase for reusable components
- [ ] Completed ALL scope assessment scores honestly
- [ ] Applied decomposition if total score > 10
- [ ] Updated implementation_plan.md if decomposed
- [ ] All {{PLACEHOLDERS}} replaced with actual values
-->
