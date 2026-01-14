# Development Workflow Rules

<!--
Workflow rules for Cline AI assistant.
This file is part of the .clinerules/ folder structure.
Place in .clinerules/ directory at project root.
-->

## Development Cycle

FluxFrame uses systematic development cycles ({{CYCLE_TYPE_PLURAL}}).

---

## Cycle Phases

### BEFORE Phase (Context Gathering)

**Goal:** Understand what exists and what you're building

1. **Get Context**
   ```
   MCP: get_context_for_task(task_type="{{CYCLE_TYPE}}_start")
   ```

2. **Check Patterns**
   ```
   MCP: check_pattern_exists(feature_description="...")
   ```

3. **Read Status**
   ```
   MCP: get_current_implementation_status()
   ```

4. **Understand Scope**
   - What are the acceptance criteria?
   - What dependencies exist?
   - What could go wrong?

### DURING Phase (Implementation)

**Goal:** Build working, tested functionality

- **Real components** - No stubs, mocks, or placeholders
- **Visible results** - Every change is demonstrable
- **Aligned tests** - Tests validate actual behavior
- **Follow patterns** - Use existing patterns exactly

**Don't Document Yet!** - Focus on getting it working

### AFTER Phase (Documentation & Completion)

**Goal:** Document and validate completion

1. **Get User Confirmation**
   - Demonstrate functionality
   - User validates it works
   - Get explicit "yes, it works"

2. **Update Documentation**
   ```
   MCP: get_completion_checklist()
   ```
   
   Update in order:
   - `{{DOCS_DIR}}/technical_status.md` (always)
   - `{{DOCS_DIR}}/patterns/` (if new pattern)
   - `{{DOCS_DIR}}/workflows/` (if logic changed)
   - `{{IMPLEMENTATION_PLAN_FILE}}` (mark complete)

3. **Validate Completion**
   ```
   MCP: validate_{{CYCLE_TYPE}}_completion({{CYCLE_TYPE}}="X.X", completed_items=[...])
   ```

---

## Change Request Protocol

For bugs, refinements, and modifications.

### 1. Initialize

Identify and classify the issue:
```
MCP: start_change_request(
  description="[issue description]",
  change_type="bug",  // bug, refinement, requirement_change, etc.
  affected_feature="[component]",
  severity="medium"   // critical, high, medium, low
)
```

### 2. Analyze (NO CODE YET)

- Investigate the issue
- Find root cause
- Understand impact
- Propose fix approach

**Do not make code changes during analysis.**

### 3. Iterate

- Make targeted changes
- Test the fix
- Refine as needed

**Do not document during iteration.**

### 4. Confirm

- Demonstrate fix to user
- User tests/verifies
- Get explicit confirmation

### 5. Document

Only after user confirms:
```
MCP: validate_change_resolution(change_id)
```

Then update:
- `{{DOCS_DIR}}/technical_status.md`
- `{{CHANGES_DIR}}/[change_file].md`
- Patterns (if applicable)

Finally:
```
MCP: close_change_request(change_id, documentation_file)
```

---

## Verification Requirements

{{VERIFICATION_RULE}}

You MUST NOT mark work complete until user confirms verification.

---

## Documentation Update Sequence

After any completed work:

1. **technical_status.md** (ALWAYS)
   - Update implementation state
   - Add to recently changed/fixed

2. **patterns/** (if applicable)
   - New patterns documented
   - Existing patterns updated

3. **workflows/** (if applicable)
   - Process logic changed

4. **ROADMAP.md** (if cycle)
   - Mark cycle/task complete

---

## Completion Checklist

Before using `attempt_completion`:

- [ ] User confirmed implementation works
- [ ] All tests pass
- [ ] technical_status.md updated
- [ ] Patterns documented (if applicable)
- [ ] Implementation plan updated (if cycle)
- [ ] All documentation approved by user

---

## Document Approval Required

All changes to `{{DOCS_DIR}}/` require:
1. Show diff to user
2. Wait for approval
3. Apply only after approval
