# Change Request Protocol

<!--
This section defines the protocol for bug fixes, refinements, and modifications.
Used by tools that support file imports (e.g., Claude Code @imports).
-->

## Overview

The Change Request Protocol is a systematic approach to handling bugs, refinements, and modifications. It ensures changes are properly analyzed, implemented, verified, and documented.

## Change Types

| Type | Description | Example |
|------|-------------|---------|
| **Bug** | Something doesn't work as designed | Feature crashes on edge case |
| **Refinement** | Improvement to existing functionality | Better error message |
| **Requirement Change** | New or modified requirement | Add validation rule |
| **Misinterpretation** | Implementation doesn't match intent | Wrong behavior understood |
| **Alteration** | Deliberate change to working system | Refactor approach |

## Protocol Phases

### Phase 1: Initialize

**Goal:** Identify and classify the change request

- Identify the issue clearly
- Classify the change type (bug, refinement, etc.)
- Assess severity (critical, high, medium, low)
- Identify affected components

**Output:** Clear understanding of what needs to change and why

### Phase 2: Analyze (No Code Changes)

**Goal:** Understand root cause before making changes

- Investigate the issue
- Find root cause
- Understand impact on other components
- Propose fix approach

**Critical:** DO NOT make code changes during analysis. Understand first.

**Output:** Root cause identified, fix approach proposed

### Phase 3: Iterate

**Goal:** Implement and test the fix

- Make targeted code changes
- Test the fix
- Refine as needed
- Keep iterating until fix works

**Critical:** DO NOT document during iteration. Documentation comes after confirmation.

**Output:** Working fix ready for verification

### Phase 4: Confirm

**Goal:** Get user verification that the fix works

- Demonstrate the fix to user
- User tests/verifies the change
- Get explicit confirmation

**Critical:** Do not proceed to documentation until user explicitly confirms the change works.

**Output:** User confirmation received

### Phase 5: Document (Only After Confirmation)

**Goal:** Update all affected documentation

Once user confirms, update:

1. **`{{DOCS_DIR}}/technical_status.md`** (ALWAYS)
   - Add to "Recently Fixed/Changed" section
   - Update component status if needed

2. **`{{CHANGES_DIR}}/` directory**
   - Create change documentation file
   - Include: problem, root cause, fix, testing

3. **`{{DOCS_DIR}}/patterns/`** (if applicable)
   - Document new pattern if solution is reusable
   - Update existing pattern if fix revealed issue

4. **`{{DOCS_DIR}}/workflows/`** (if applicable)
   - Update if conceptual logic changed

5. **`{{ADDITIONAL_CONTEXT_FILE}}`** (if applicable)
   - Update if queryable data/capabilities affected

**Output:** All documentation updated and approved

## Change Documentation Template

```markdown
# Change: [Brief Description]

**Date:** [Date]
**Type:** [bug/refinement/requirement_change/misinterpretation/alteration]
**Severity:** [critical/high/medium/low]
**Affected Components:** [List]

## Problem
[What was wrong or needed to change]

## Root Cause
[Why it was happening]

## Fix Applied
[What was changed to fix it]

## Testing
[How it was verified]

## Documentation Updated
- [ ] technical_status.md
- [ ] patterns/ (if applicable)
- [ ] workflows/ (if applicable)
- [ ] other: [specify]
```

## Severity Guidelines

| Severity | Impact | Response Time |
|----------|--------|---------------|
| **Critical** | System unusable, data loss risk | Immediate |
| **High** | Major feature broken | Same day |
| **Medium** | Feature impaired but workaround exists | This cycle |
| **Low** | Minor issue, cosmetic | Backlog |

## Key Rules

1. **Never skip analysis** - Understanding root cause prevents repeat issues
2. **Never document during iteration** - Avoid documenting abandoned approaches
3. **Always get confirmation** - User verification is required before documentation
4. **Update ALL affected docs** - Don't just update technical_status.md
5. **Track the change** - Create change documentation for future reference

## Change Request Checklist

- [ ] Issue clearly identified and classified
- [ ] Root cause analyzed (no code changes yet)
- [ ] Fix implemented and tested
- [ ] User confirmation received
- [ ] technical_status.md updated
- [ ] Change documentation created
- [ ] Patterns updated (if applicable)
- [ ] Workflows updated (if applicable)
