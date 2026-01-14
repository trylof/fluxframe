# {{BUG_ID}}: {{BUG_TITLE}} — Fix Plan

<!--
INSTRUCTIONS FOR AI ASSISTANT:
This is a STREAMLINED fix plan for a specific bug.
Simpler than cycle implementation plans - focused on diagnosis and fix.

Created via `create_bug_fix_plan(bug_id)` MCP tool.
-->

**Severity:** {{SEVERITY}}
**Parent Tracker:** [BUGS.md](../BUGS.md)
**Status:** 🔍 INVESTIGATING
**Reported:** {{REPORT_DATE}}
**Last Updated:** {{DATE}}

---

## 1. Bug Summary

**What's broken:**
{{PROBLEM_DESCRIPTION}}

**Expected behavior:**
{{EXPECTED_BEHAVIOR}}

**Actual behavior:**
{{ACTUAL_BEHAVIOR}}

**User impact:**
{{IMPACT_DESCRIPTION}}

---

## 2. Reproduction Steps

1. {{STEP_1}}
2. {{STEP_2}}
3. {{STEP_3}}

**Environment:**
- Browser/OS: {{ENVIRONMENT}}
- Version: {{APP_VERSION}}
- User role: {{USER_ROLE}}

**Reproducibility:** {{ALWAYS/SOMETIMES/RARE}}

---

## 3. Root Cause Analysis

**Investigation findings:**
{{INVESTIGATION_NOTES}}

**Root cause:**
{{ROOT_CAUSE}}

**Affected files/components:**
- {{FILE_1}}: {{HOW_AFFECTED}}
- {{FILE_2}}: {{HOW_AFFECTED}}

---

## 4. Fix Approach

**Proposed fix:**
{{FIX_DESCRIPTION}}

**Changes required:**

| File | Change |
|------|--------|
| {{FILE}} | {{WHAT_CHANGES}} |

**Alternative approaches considered:**
- {{ALTERNATIVE_1}}: {{WHY_NOT_CHOSEN}}

---

## 5. Regression Testing

**Tests to add/update:**

- [ ] {{TEST_1_DESCRIPTION}}
- [ ] {{TEST_2_DESCRIPTION}}

**Manual verification:**

| Step | Expected Result |
|------|-----------------|
| {{VERIFY_STEP}} | {{EXPECTED}} |

---

## 6. Implementation Checklist

- [ ] Root cause identified
- [ ] Fix approach approved
- [ ] Code changes complete
- [ ] Regression tests added
- [ ] Manual verification passed
- [ ] BUGS.md updated (status → ✅ FIXED)

---

## 7. Fix Notes

<!-- AI ASSISTANT: Document what was actually done during the fix -->

**Changes made:**
{{IMPLEMENTATION_NOTES}}

**Deviations from plan:**
{{DEVIATIONS_IF_ANY}}

**Lessons learned:**
{{LESSONS}}

---

<!--
AI ASSISTANT CHECKLIST:
- [ ] All {{PLACEHOLDERS}} replaced
- [ ] Reproduction steps are specific and testable
- [ ] Root cause clearly identified
- [ ] Regression tests defined
- [ ] BUGS.md status updated when complete
-->
