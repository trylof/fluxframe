# Change Request Protocol

**Systematic workflow for bugs, refinements, and alterations**

---

## Purpose

This protocol ensures that ALL changes to existing code - whether bug fixes, refinements, requirement changes, or alterations - are handled systematically with proper root cause analysis, validation, and documentation.

**Why this matters:**
- Prevents quick-fix → introduces-new-bug cycle
- Preserves knowledge about WHY changes were made
- Enables pattern discovery from problems
- Ensures nothing is "fixed" until user confirms it works

---

## When to Use This Protocol

**Use for:**
- 🐛 **Bugs:** Something is broken or incorrect
- ✨ **Refinements:** Something works but could be better
- 📋 **Requirement Changes:** Specifications changed
- 🔄 **Misinterpretations:** Built wrong thing, need to fix
- ⚙️ **Alterations:** Existing functionality needs adjustment

**DO NOT use for:**
- ✅ New features/capabilities → Use cycle workflow instead
- 📝 Documentation-only updates → Direct edit with approval
- 🧪 Experimental prototypes → Different process

---

## The Anti-Pattern (What NOT to Do)

```
Developer sees bug
  → Writes quick fix
  → Marks as done
  → Moves on
```

**This creates:**
- ❌ Undocumented changes
- ❌ Unknown side effects
- ❌ Lost knowledge about root cause
- ❌ Same bug recurring
- ❌ Technical debt accumulation

---

## The Systematic Approach (5 Phases)

Every change request follows this structured workflow:

### Phase 1: Analysis
### Phase 2: Iteration
### Phase 3: Documentation
### Phase 4: Verification
### Phase 5: Archive

---

## Phase 1: Change Analysis (Immediate)

**Goal:** Understand the problem before touching code

### 1. Classify & Document

**MCP Tool:** `start_change_request(description, change_type, affected_feature, severity)`

**Change Types:**
- `bug` - Something broken
- `refinement` - Something improvable
- `requirement_change` - Specs changed
- `misinterpretation` - Built wrong thing
- `alteration` - Functionality adjustment

**Severity Levels:**
- `critical` - Blocks users, production down
- `high` - Major functionality impaired
- `medium` - Inconvenience or workaround exists
- `low` - Minor issue, cosmetic

**Example:**
```
start_change_request(
  description="Dashboard shows 'No data' despite successful uploads",
  change_type="bug",
  affected_feature="dashboard rendering",
  severity="high"
)
```

**Returns:** Change ID for tracking (e.g., `CHANGE_1234567890`)

### 2. Pattern Check

**MCP Tool:** `check_pattern_exists(feature_description)`

**Ask:**
- Is this a pattern violation?
- Does an existing pattern solve this?
- Have we seen this bug before?

**Why:** Many bugs are actually pattern violations. Fixing the pattern prevents recurrence.

### 3. Root Cause Analysis

**Actions:**
- Investigate WITHOUT making changes
- Understand WHY the issue exists
- Document hypothesis in thinking
- May require multiple investigation attempts

**Key Questions:**
- What was the original intent?
- Why did it fail?
- What assumptions were wrong?
- Will the fix have side effects?

**Important:** Resist urge to "just fix it." Understanding prevents:
- Fixing symptom, not cause
- Breaking something else
- Same issue in different place

---

## Phase 2: Change Iteration (Iterative)

**Goal:** Fix the problem, validate it works

### 4. Attempt Change

**Actions:**
- Make code changes
- Test locally/in production
- Verify fix addresses root cause

**Rule:** DO NOT document yet

**Why:** You might be wrong. The fix might not work. User might want different solution.

### 5. User Validation Required

**This is CRITICAL. The cycle does NOT proceed to Phase 3 without user confirmation.**

**User confirms:**
- ✅ "This fixed it"
- ✅ "Perfect!"
- ✅ "This is what I wanted"
- ✅ "Works as expected"

**→ Proceed to Phase 3**

**User reports:**
- ❌ "Still broken"
- ❌ "Not quite"
- ❌ "Different issue now"
- ❌ "Not what I expected"

**→ Return to Step 4 (iterate again)**

**Why wait for confirmation:**
- Prevents documenting wrong solutions
- Avoids documentation rework
- Ensures user satisfaction
- Catches misunderstandings early

---

## Phase 3: Complete Documentation (After Confirmation Only)

**CRITICAL:** This phase updates ALL affected documentation, not just the change doc.

### 6. Get Complete Documentation Checklist

**MCP Tool:** `validate_change_resolution(change_id)`

**Prerequisites:**
- User has confirmed change works
- No more iteration needed
- Fix is deployed/merged

**Returns:**
- Change documentation template
- List of ALL docs that need updates
- Specific sections to update

### 7. Create Change Documentation

**Location:** `bug_fixes/<COMPONENT>_<ISSUE>.md` (or project's changes directory)

**Required Sections:**
```markdown
# <Component> <Issue> - <Change Type>

**Date:** <date>
**Status:** ✅ FIXED AND DEPLOYED
**Change Type:** <Bug|Refinement|Requirement Change|Misinterpretation|Alteration>
**Archive Date:** <date + 1 month>

## Problem Description / Rationale
<What was broken/needed improvement>

## Root Cause / Analysis
<WHY it occurred - technical explanation>

## Solution
<HOW it was fixed>

### Key Changes
1. **Change 1** - What and why
2. **Change 2** - What and why

## Impact
- ✅ <What now works>
- ✅ <Side benefits>

## Testing
<Test scenarios performed>

## Files Modified
- `path/to/file.ext` - Description

## Documentation Updated
- [x] `bug_fixes/<THIS_FILE>.md`
- [x] `technical_status.md`
- [ ] `patterns/` (if applicable)
- [ ] `workflows/` (if applicable)

## Related Issues
<Links to similar changes>

## Deployment
- Commit: `<hash>`
- Deployed to: <environment>
```

### 8. Update Technical Status (ALWAYS)

**File:** `technical_status.md`

**MANDATORY updates:**
- Add to "Recently Fixed/Changed" section
- Remove from "Known Issues" (if listed)
- Update "Current Capabilities" (if functionality changed)
- Update "Technical Debt" (if debt addressed)
- Update component status (if state changed)

**Why ALWAYS:** This is the single source of truth for project state.

### 9. Update Pattern Library (If Applicable)

**File:** `patterns/` directory

**Update when:**
- Change revealed anti-pattern → Document it
- Change established new pattern → Add it
- Change fixed pattern violation → Note harmonization
- Inconsistency found → Add to Harmonization Backlog

**Why:** Patterns prevent future problems.

### 10. Update Workflow Documentation (If Applicable)

**MCP Tool:** `validate_workflow_documentation(changes_made=[...], description="...")`

**Update when:**
- Workflow logic/concepts changed
- User journey affected
- Data flows modified
- Component behavior altered

**Files that might need updates:**
- `workflows/user_journey.md`
- `workflows/admin_journey.md`
- `workflows/technical_data_flows.md`
- `workflows/component_reference.md`

### 11. Update Additional Context (If Applicable)

**Update when:**
- Queryable data changed (AI assistant context)
- API contracts modified
- Configuration options changed
- System capabilities altered

### 12. Close Change Request

**MCP Tool:** `close_change_request(change_id, documentation_file)`

**Actions:**
- Marks change as resolved
- Sets archive date (1 month from now)
- Clears tracking state
- Confirms all docs updated

**Example:**
```
close_change_request(
  change_id="CHANGE_1234567890",
  documentation_file="bug_fixes/DASHBOARD_EMPTY_DATA_BUG_FIX.md"
)
```

---

## Phase 4: Verification (Post-Deployment)

**Goal:** Ensure fix holds in production

### 13. Monitor in Production

**Actions:**
- Verify change holds in production
- Watch for regression
- Monitor related functionality
- Check performance impact

**Duration:** At least 1-2 days for critical fixes

**If issues arise:**
- Update documentation
- May need new change request
- Learn from the issue

---

## Phase 5: Archive (After 1 Month)

**Goal:** Clean up old change docs while preserving knowledge

### 14. Automatic Archive

**After 1 month:**
- Change docs can be archived/moved
- Knowledge preserved in `technical_status.md`
- Specific fix details in git history
- Patterns updated (permanent record)

**Why 1 month:** Enough time for related issues to surface, but prevents doc clutter.

---

## Integration with Development Cycles

### Development Cycles (New Features)
- Use `cycle_workflow.md`
- Use MCP tools for validation
- Document progressively during build
- ✅ Standard workflow

### Change Requests (Fixes/Refinements)
- Use THIS protocol
- Use MCP tools for tracking
- Document ONLY after user confirmation
- ✅ Change workflow

### Shared Resources
- Both update Pattern Library when applicable
- Both update Technical Status
- Both maintain documentation quality
- Both follow "show diff → get approval" for project docs

---

## Classification Guide

### Bug
**What:** Something broken/incorrect  
**Example:** "API returns 500 error on valid input"  
**Fix approach:** Root cause analysis → Fix → Test → Document

### Refinement
**What:** Works but could be better  
**Example:** "Upload shows no progress indicator"  
**Fix approach:** Understand improvement → Implement → Validate UX → Document

### Requirement Change
**What:** Specs changed, need to adapt  
**Example:** "Client wants 10 items per page, not 20"  
**Fix approach:** Confirm new requirement → Implement → Test → Document

### Misinterpretation
**What:** Built wrong thing based on misunderstanding  
**Example:** "Built export as CSV, user wanted PDF"  
**Fix approach:** Clarify correct requirement → Rebuild → Validate → Document

### Alteration
**What:** Working functionality needs adjustment  
**Example:** "Scoring algorithm needs different weights"  
**Fix approach:** Understand rationale → Adjust → Test impact → Document

---

## Common Mistakes

### ❌ "I'll document after I fix a few more bugs"
**Problem:** Knowledge is lost immediately  
**Solution:** Document each change before starting next

### ❌ "User will test in production"
**Problem:** Broken code reaches production  
**Solution:** User tests BEFORE deployment/merge

### ❌ "It's just a typo, no need for protocol"
**Problem:** "Simple" changes break things  
**Solution:** ALL changes follow protocol (can be quick for trivial fixes)

### ❌ "I updated technical_status, that's enough"
**Problem:** Incomplete documentation  
**Solution:** Update ALL affected docs (checklist from MCP tool)

### ❌ "Fixed symptom, root cause can wait"
**Problem:** Bug recurs or appears elsewhere  
**Solution:** Always find and fix root cause

---

## Change Request Template (Quick Reference)

```markdown
# <COMPONENT> <ISSUE> - <TYPE>

**Date:** <date>
**Status:** ✅ FIXED AND DEPLOYED
**Change Type:** <Bug|Refinement|etc.>
**Archive Date:** <date + 1 month>

## Problem Description
<User-facing description>

## Root Cause
<Technical WHY>

## Solution
<Technical HOW>

### Key Changes
1. **Change** - What and why

## Impact
- ✅ <What improved>

## Testing
<Scenarios tested>

## Files Modified
- `<file>` - <what changed>

## Documentation Updated
- [x] `bug_fixes/<THIS>.md`
- [x] `technical_status.md`
- [ ] Others (if applicable)

## Deployment
- Commit: `<hash>`
- Environment: <where deployed>
```

---

## MCP Tool Integration

### Available Tools

**start_change_request** - Initialize tracking  
**validate_change_resolution** - Get documentation checklist (ONLY after user confirms)  
**close_change_request** - Mark complete after all docs updated

### Typical Flow

```
1. start_change_request(...)
   → Returns: change_id

2. [Iterate on fix]

3. [User confirms: "It works!"]

4. validate_change_resolution(change_id)
   → Returns: Complete checklist of docs to update

5. [Create change doc]
6. [Update technical_status.md]
7. [Update patterns/ if applicable]
8. [Update workflows/ if applicable]

9. close_change_request(change_id, doc_file)
   → Marks resolved, sets archive date
```

---

## Key Takeaways

1. **ANALYZE before fixing** - Understand root cause
2. **ITERATE until confirmed** - User must validate
3. **DOCUMENT after confirmation** - Update ALL affected docs
4. **MONITOR in production** - Verify fix holds
5. **ARCHIVE after 1 month** - Keep docs current

**Every change. Every time. No exceptions.**

This systematic approach prevents technical debt and preserves institutional knowledge.

---

**Related Documents:**
- `cycle_workflow.md` - For new feature development
- `completion_checklist.md` - For validating completeness
- `../doc-templates/change_documentation.template.md` - Full template