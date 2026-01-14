# {{CYCLE_ID}}: {{CYCLE_NAME}} — Implementation Plan

<!--
INSTRUCTIONS FOR AI ASSISTANT:
This is the DETAILED implementation plan for a specific development cycle.
It is created BEFORE implementation begins, during the planning/research phase.

KEY PRINCIPLES:
1. This plan is created ONLY when ready to implement (just-in-time planning)
2. ALL sections are MANDATORY - fill every section or mark "N/A - [reason]"
3. Scope analysis is MANDATORY - if feature is too large, decompose it
4. The plan must align with the high-level ROADMAP.md
5. User approval is required before implementation begins

THIS PLAN ENABLES AUTONOMOUS EXECUTION:
An AI agent reading this plan should have enough context to implement
the entire cycle without asking clarifying questions about purpose,
audience, security, or acceptance criteria.

Replace {{PLACEHOLDERS}} with actual values from your research.
-->

**Parent Cycle:** {{PARENT_CYCLE_REFERENCE}} (if this is a sub-cycle)\n**High-Level Reference:** [ROADMAP.md](../ROADMAP.md) → Cycle {{CYCLE_ID}}\n**Status:** 📋 PLANNING\n**Created:** {{DATE}}\n**Last Updated:** {{DATE}}

---

## Progress Tracker

<!--
AI ASSISTANT: Update this section as you implement. Check items when complete.
This provides visibility into autonomous execution progress.
-->

| Phase | Status | Notes |
|-------|--------|-------|
| Planning | 📋 In Progress | |
| Research Complete | ⬜ Pending | |
| User Approved | ⬜ Pending | |
| Implementation | ⬜ Pending | |
| Tests Passing | ⬜ Pending | |
| Documentation Updated | ⬜ Pending | |
| Cycle Complete | ⬜ Pending | |

**Current Focus:** {{CURRENT_FOCUS}}
**Blockers:** {{BLOCKERS_OR_NONE}}

---

## 1. Executive Summary

<!--
AI ASSISTANT: 3-5 sentences capturing the essence of this cycle.
This section should enable someone to understand the full context at a glance.
-->

**What we're delivering:**
{{BRIEF_DESCRIPTION_OF_DELIVERABLE}}

**Why it matters:**
{{BUSINESS_VALUE_AND_IMPACT}}

**Success looks like:**
{{DEFINITION_OF_DONE_SUMMARY}}

---

## 2. Target Users

<!--
AI ASSISTANT: Define WHO this feature is for.
Different features may target different user groups.
-->

### Primary Users

**User Type:** {{PRIMARY_USER_TYPE}}
**Description:** {{WHO_THEY_ARE}}
**How they benefit:** {{WHAT_THEY_GAIN}}

### Secondary Users (if applicable)

**User Type:** {{SECONDARY_USER_TYPE}}
**Description:** {{WHO_THEY_ARE}}
**How they benefit:** {{WHAT_THEY_GAIN}}

---

## 3. User Stories

<!--
AI ASSISTANT: Define the user's perspective on what they want to accomplish.
These drive the acceptance criteria. Use format:
"As a [user type], I want [action], so that [benefit]"
-->

### Story 1: {{STORY_TITLE}}

**As a** {{USER_TYPE}}
**I want** {{ACTION_OR_CAPABILITY}}
**So that** {{BENEFIT_OR_OUTCOME}}

**Acceptance Criteria:**
- [ ] {{CRITERION_1}}
- [ ] {{CRITERION_2}}
- [ ] {{CRITERION_3}}

---

### Story 2: {{STORY_TITLE}}

**As a** {{USER_TYPE}}
**I want** {{ACTION_OR_CAPABILITY}}
**So that** {{BENEFIT_OR_OUTCOME}}

**Acceptance Criteria:**
- [ ] {{CRITERION_1}}
- [ ] {{CRITERION_2}}

---

<!-- AI ASSISTANT: Add more stories as needed. 2-5 stories is typical. -->

## 4. Security Considerations

<!--
AI ASSISTANT: Security requirements appropriate for THIS feature.
Not every feature needs the same security depth.
Mark "N/A" with reason if security is not applicable.
-->

### Authentication & Authorization

**Authentication Required:** {{YES_NO_EXPLAIN}}
**Authorization Model:** {{ROLE_PERMISSION_DESCRIPTION}}

### Data Sensitivity

**Data Classification:** {{PUBLIC_INTERNAL_CONFIDENTIAL_RESTRICTED}}
**PII Involved:** {{YES_NO_WHAT_TYPE}}
**Retention Requirements:** {{IF_APPLICABLE}}

### Security Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| {{SECURITY_RISK_1}} | {{L/M/H}} | {{MITIGATION}} |

---

## 5. Research Summary

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

## 6. Scope Assessment (MANDATORY)

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

## 7. Decomposition (If Required)

<!--
AI ASSISTANT: If scope verdict is ⚠️ or ❌, this section is REQUIRED.
Break the feature into smaller, independently testable increments.
Each sub-cycle should deliver visible value.

If verdict is ✅ PROCEED, write "N/A - Scope appropriate for single cycle"
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
AI ASSISTANT: If decomposing, you MUST update the high-level ROADMAP.md
to reflect the new sub-cycles. Add them as 1.2a, 1.2b, etc.
-->

**Changes to ROADMAP.md:**
- [ ] Add sub-cycles {{CYCLE_ID}}a, {{CYCLE_ID}}b, etc.
- [ ] Update timeline estimates
- [ ] Document dependencies between sub-cycles

**THIS DETAILED PLAN COVERS ONLY:** {{CYCLE_ID}}{{FIRST_SUB}} — {{FIRST_SUB_DESC}}

{{/IF_DECOMPOSITION_REQUIRED}}

---

## 8. Technical Design

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

## 9. Implementation Checklist

<!--
AI ASSISTANT: Break implementation into small, testable steps.
Each checkbox should be independently verifiable.
Update the Progress Tracker as you complete items.
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

## 10. Success Criteria & Validation

<!--
AI ASSISTANT: This section defines WHAT MUST BE TRUE for the cycle to be complete.
These criteria should be measurable and verifiable.
-->

### Definition of Done

- [ ] All user story acceptance criteria met
- [ ] All tests passing (see Tests to Pass below)
- [ ] Documentation updated (technical_status.md, patterns if applicable)
- [ ] User has validated the feature works as expected
- [ ] No regressions in existing functionality

### Success Metrics

| Metric | Target | How to Measure |
|--------|--------|----------------|
| {{METRIC_1}} | {{TARGET}} | {{MEASUREMENT_METHOD}} |
| {{METRIC_2}} | {{TARGET}} | {{MEASUREMENT_METHOD}} |

### Tests to Pass

<!--
AI ASSISTANT: These tests MUST pass before the cycle is complete.
Test descriptions should be specific enough to write the actual tests.
-->

**Unit Tests:**
- [ ] {{UNIT_TEST_1_DESCRIPTION}}
- [ ] {{UNIT_TEST_2_DESCRIPTION}}

**Integration Tests:**
- [ ] {{INTEGRATION_TEST_1_DESCRIPTION}}
- [ ] {{INTEGRATION_TEST_2_DESCRIPTION}}

**End-to-End Tests:**
- [ ] {{E2E_TEST_1_DESCRIPTION}}

**Manual Validation:**

| Step | Expected Result | Actual Result |
|------|-----------------|---------------|
| {{STEP_1}} | {{EXPECTED}} | ⬜ Pending |
| {{STEP_2}} | {{EXPECTED}} | ⬜ Pending |
| {{STEP_3}} | {{EXPECTED}} | ⬜ Pending |

---

## 11. Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| {{RISK_1}} | {{L/M/H}} | {{L/M/H}} | {{MITIGATION}} |
| {{RISK_2}} | {{L/M/H}} | {{L/M/H}} | {{MITIGATION}} |

---

## 12. Approval

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

## 13. Implementation Notes

<!--
AI ASSISTANT: Use this section during implementation to capture:
- Decisions made during coding
- Deviations from the plan (with reasons)
- Issues encountered
- Patterns established (to document in pattern library)

Update the Progress Tracker section as you complete phases.
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
- [ ] Updated ROADMAP.md if decomposed
- [ ] All {{PLACEHOLDERS}} replaced with actual values
- [ ] All sections filled or marked N/A with reason

DURING IMPLEMENTATION:
- [ ] Follow template.agents.md rules (check patterns, read status, etc.)
- [ ] Update Progress Tracker as you complete phases
- [ ] Call validate_cycle_completion() when done
-->
