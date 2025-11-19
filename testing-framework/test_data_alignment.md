# Test-Implementation Alignment

**The Critical Rule: Tests must match what you ACTUALLY built**

---

## The Problem

**This happens more often than you think:**

1. You plan to build Feature X
2. Requirements shift during development
3. You actually implement Feature Y
4. But tests still validate Feature X

**Result:** Tests pass ✓ but don't test reality ✗

**Consequences:**
- False confidence in code quality
- Bugs slip through "passing" tests
- Regressions go undetected
- Production failures despite green CI

---

## The Critical Insight

**Tests are only valuable if they validate actual system behavior.**

A test that passes while testing the wrong thing is worse than no test - it creates false confidence.

---

## Common Misalignment Scenarios

### Scenario 1: Wrong Test Data

**Planning:** "System will compare multiple companies' values"

**Implementation:** "Actually built single-company analysis with document types"

**Tests (Wrong):**
```
test_documents/
  company_a_values.pdf
  company_b_values.pdf
  company_c_values.pdf
```
Tests cross-company comparison that doesn't exist.

**Tests (Correct):**
```
test_documents/
  acme_corp_code_of_conduct.pdf
  acme_corp_mission_statement.pdf
  acme_corp_hr_handbook.pdf
```
Tests actual functionality: multiple document types, single company.

### Scenario 2: Wrong Test Workflows

**Planning:** "Users create, edit, then publish reports"

**Implementation:** "Actually built auto-generated reports, users just view"

**Test Steps (Wrong):**
```markdown
1. Click "Create Report"
2. Fill in report details
3. Click "Publish"
4. Verify report appears
```

**Test Steps (Correct):**
```markdown
1. Upload documents
2. Wait for analysis completion
3. Click "View Report"
4. Verify auto-generated report displays
```

### Scenario 3: Wrong Expected Outputs

**Planning:** "Dashboard shows top 5 values"

**Implementation:** "Actually shows all values in collapsible hierarchy"

**Assertions (Wrong):**
```python
assert len(displayed_values) == 5
assert displayed_values[0] == "Top value"
```

**Assertions (Correct):**
```python
assert "Centricity" in displayed_hierarchy
assert len(displayed_values) > 5  # Shows all, not just top 5
assert expand_button.is_displayed()
```

---

## Validation Questions

**Before marking ANY cycle complete, ask:**

### 1. Do Test Inputs Match Actual System Inputs?

**Check:**
- File formats, sizes, types
- Data structures
- API request formats
- User input patterns

**Example:**
```
System accepts: PDF, DOCX, TXT
Test data: Only PDF files

❌ Misaligned - missing coverage
✅ Aligned - all formats tested
```

### 2. Do Test Workflows Match Actual User Workflows?

**Check:**
- UI navigation paths
- Required vs. optional steps
- User interactions available
- System behavior sequences

**Example:**
```
Test: User manually categorizes documents
Actual: System auto-categorizes on upload

❌ Misaligned - tests non-existent manual flow
✅ Aligned - tests actual auto-categorization
```

### 3. Do Expected Outputs Match Actual System Outputs?

**Check:**
- Data structures returned
- UI elements displayed
- Response formats
- Success/error messages

**Example:**
```
Test expects: List of strings
System returns: List of objects with metadata

❌ Misaligned - wrong data structure
✅ Aligned - tests actual object structure
```

### 4. Can Tests Be Run On Actual Deployed System?

**Check:**
- Test uses actual endpoints
- Test data works in real environment
- No hardcoded test-only paths
- Realistic user scenarios

**Example:**
```
Test calls: http://localhost:3000/test-endpoint
Production has: http://api.example.com/real-endpoint

❌ Misaligned - test-only endpoint
✅ Aligned - uses production endpoints
```

---

## Alignment Process

### Step 1: Implementation First

**Build the feature with real components.**

Don't create tests before implementation is solid. Requirements WILL shift during development.

### Step 2: Implementation Review

**After implementation, review what was ACTUALLY built:**

Document:
- Actual inputs accepted
- Actual workflows enabled
- Actual outputs produced
- Actual UI displayed

### Step 3: Align Test Data

**Create/update test data to match actual implementation:**

**Bad Process:**
```
1. Write tests based on plan
2. Implement feature
3. Make tests pass (by changing tests or faking data)
```

**Good Process:**
```
1. Implement feature
2. Review what was actually built
3. Create tests that validate actual behavior
```

### Step 4: Align Test Scenarios

**Write test scenarios based on actual workflows:**

**Template:**
```markdown
## Test Scenario: [Actual Feature Name]

**What this tests:** [Actual functionality, not planned]

**Prerequisites:** [Actual system state needed]

**Steps:**
1. [Actual user action available in UI]
2. [Actual system response]
3. [Actual verification step]

**Expected Results:**
- [Actual output format]
- [Actual displayed data]
- [Actual system state]
```

### Step 5: Validate Alignment

**Run through checklist:**

- [ ] Test data matches actual input types
- [ ] Test steps match actual workflows
- [ ] Assertions match actual outputs
- [ ] Tests can run on deployed system
- [ ] A new user could follow tests to understand system

---

## Examples of Good Alignment

### Example 1: File Upload Feature

**Actual Implementation:**
- Accepts PDF, DOCX, TXT, XLSX
- Max size: 50MB
- Extracts text, stores metadata
- Returns analysis ID for polling

**Aligned Tests:**

```python
def test_file_upload_pdf():
    # Realistic PDF file
    file = open("test_data/sample_document.pdf", "rb")
    
    response = client.post("/upload", files={"file": file})
    
    assert response.status_code == 202  # Actual async response
    assert "analysis_id" in response.json()  # Actual return format
    
def test_file_upload_size_limit():
    # Test actual 50MB limit
    large_file = create_file(51 * 1024 * 1024)  # 51MB
    
    response = client.post("/upload", files={"file": large_file})
    
    assert response.status_code == 413  # Actual error code
    assert "File too large" in response.json()["detail"]
```

### Example 2: Dashboard Display

**Actual Implementation:**
- Shows hierarchical taxonomy view
- Expandable sections for evidence
- Click to drill down into details
- Search/filter capabilities

**Aligned Manual Test:**

```markdown
## Test: Dashboard Taxonomy View

**Prerequisites:**
- User logged in
- Analysis complete for company "Acme Corp"

**Steps:**
1. Navigate to Dashboard
2. Verify "Centricity" level displayed
3. Click "People Centricity"
4. Verify "Themes" expand below
5. Click "Collaboration & Relationships" theme
6. Verify "Values" list displayed
7. Click "Teamwork" value
8. Click "View Evidence" button
9. Verify evidence claims with quotes displayed

**Expected Results:**
- Hierarchical structure: Centricity → Theme → Value
- Evidence shows verbatim quotes from documents
- Source document links clickable
- Expansion/collapse works smoothly
```

---

## Examples of Poor Alignment

### Example 1: Testing Non-Existent Feature

**Test:**
```python
def test_user_can_edit_analysis():
    analysis = get_analysis("analysis_123")
    
    updated = edit_analysis(analysis, {"score": 4.5})
    
    assert updated.score == 4.5
```

**Problem:** System doesn't allow editing analysis - it's auto-generated only.

**This test passes because it tests fake functionality.**

### Example 2: Wrong Data Structure

**Test:**
```python
def test_get_values():
    response = client.get("/values")
    
    assert isinstance(response.json(), list)
    assert len(response.json()) == 10
```

**Problem:** Actual API returns:
```json
{
  "centricities": {
    "People": {
      "themes": {
        "Collaboration": {
          "values": ["Teamwork", "Trust", ...]
        }
      }
    }
  }
}
```

**Test is validating wrong structure.**

---

## Fixing Misalignment

### Process for Existing Tests

**When you discover misalignment:**

1. **Document Actual Behavior**
   - What does system actually do?
   - What data does it actually accept/return?
   - What workflows are actually available?

2. **Update Test Data**
   - Replace with realistic data
   - Match actual input formats
   - Cover actual use cases

3. **Rewrite Test Scenarios**
   - Base on actual workflows
   - Use actual API contracts
   - Validate actual outputs

4. **Verify Alignment**
   - Run tests against deployed system
   - Confirm tests validate reality
   - Document any limitations

### When to Update Tests

**Update tests when:**
- ✅ Requirements changed during development
- ✅ Implementation differs from plan
- ✅ New edge cases discovered
- ✅ API contracts evolved
- ✅ UI workflows changed

**Don't update tests when:**
- ❌ Test found a real bug (fix the code)
- ❌ Want to make tests pass during development (fix implementation)
- ❌ Tests are "inconvenient" (they're doing their job)

---

## Integration with Completion Checklist

**Before cycle marked complete:**

### Mandatory Alignment Check

- [ ] **Test data reviewed against actual inputs**
  - File formats match
  - Data structures match
  - Sizes/types match

- [ ] **Test scenarios match actual workflows**
  - UI flows match actual app
  - API calls match actual endpoints
  - User actions match available features

- [ ] **Expected outputs match actual system**
  - Response formats correct
  - UI displays correct
  - Data structures accurate

- [ ] **Tests can run on deployed system**
  - No test-only code paths
  - No fake/stubbed data
  - Realistic scenarios

**If ANY checkbox unchecked → Cycle NOT complete**

---

## Common Questions

### Q: "But requirements changed mid-cycle. Do I really need to update all the tests?"

**A:** YES. Otherwise tests validate the wrong thing.

Tests must reflect actual implementation, not original plan. If requirements shifted, tests MUST shift too.

### Q: "The test passes, isn't that enough?"

**A:** NO. A passing test that validates the wrong behavior is worse than no test.

It creates false confidence. Better to have no test than a misleading one.

### Q: "Updating tests takes time. Can we do it later?"

**A:** NO. Do it before marking cycle complete.

Later never comes. Do it while you remember what was actually built.

### Q: "How detailed should test data be?"

**A:** Realistic enough to catch real issues.

Use actual formats, realistic sizes, representative edge cases. Not foo/bar.

---

## Key Principles

### 1. Reality Check

**After implementation, always ask:**
- Is this what we actually built?
- Do tests validate this reality?
- Would tests catch real bugs in this feature?

### 2. User Perspective

**Tests should answer:**
- What can users actually do?
- What happens when they do it?
- What do they actually see?

### 3. Continuous Validation

**Don't set and forget:**
- Review test alignment each cycle
- Update as implementation evolves
- Delete obsolete tests

### 4. Documentation Link

**Tests = executable specification:**
- New team member reads tests
- Understands what system does
- Can run tests to verify
- Learns actual system behavior

---

## Success Metrics

**Well-aligned tests:**
- ✅ Catch real bugs during development
- ✅ Prevent actual regressions
- ✅ Can run on production system
- ✅ Teach new developers how system works
- ✅ Give confidence in deployments

**Misaligned tests:**
- ❌ Pass while bugs exist
- ❌ Fail to prevent regressions
- ❌ Only work in test environment
- ❌ Confuse new developers
- ❌ False confidence → production failures

---

## Final Checklist

**Before marking cycle complete, verify:**

### Test Data Alignment
- [ ] Matches actual input formats
- [ ] Covers actual use cases
- [ ] Representative of real data
- [ ] Not just foo/bar examples

### Test Scenario Alignment
- [ ] Follows actual user workflows
- [ ] Uses actual UI paths
- [ ] Calls actual API endpoints
- [ ] Tests actual feature set

### Expected Output Alignment
- [ ] Validates actual response formats
- [ ] Checks actual data structures
- [ ] Verifies actual UI displays
- [ ] Matches actual success/error cases

### Deployment Alignment
- [ ] Tests work on deployed system
- [ ] No test-only code paths
- [ ] No hardcoded test URLs
- [ ] Realistic end-to-end scenarios

**All checks pass → Tests are aligned ✅**

**Any check fails → Fix before marking complete ❌**

---

## Remember

**Tests are only valuable if they test reality.**

A comprehensive test suite that validates the wrong thing is worthless.

Spend the time to align tests with implementation. Your future self will thank you.

---

**Related Documents:**
- [`README.md`](./README.md) - Testing framework overview
- `../development-cycles/completion_checklist.md` - Cycle completion requirements
- `../development-cycles/cycle_workflow.md` - When to align tests in workflow