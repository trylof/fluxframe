# Testing Framework

**Ensuring quality and reliability through comprehensive testing**

---

## Philosophy

**A cycle that hasn't been tested is not complete - it's just code.**

Testing is not optional. It's not something to do "if there's time." Testing is how you know your software works and continues to work as it evolves.

This framework provides a structured approach to testing that:
- ✅ Catches bugs early (when cheap to fix)
- ✅ Prevents regressions (ensures old things keep working)
- ✅ Documents behavior (tests as specification)
- ✅ Enables confident changes (refactor without fear)

---

## Core Principles

### 1. Tests Must Match Implementation

**The Critical Rule:** Tests validate what you ACTUALLY built, not what you PLANNED to build.

**Why this matters:**
```
You plan to build Feature X
Requirements shift mid-cycle
You actually build Feature Y
But tests still validate Feature X

Result: Tests pass ✓ but don't test reality ✗
```

**Always validate:**
- Test inputs match actual system inputs
- Test workflows match actual user workflows
- Expected outputs match actual system outputs
- Tests can be run on actual deployed system

**See:** [`test_data_alignment.md`](./test_data_alignment.md) for detailed guide

### 2. Real Analysis Always

**No stub modes.** **No fake data generators.** **No simulated responses.**

**Development & Production:**
- Both use identical code paths
- Both make real API calls
- Both process actual data
- Behavior is identical

**Testing:**
- Uses proper mocking at API boundaries
- Never fake business logic
- Tests real code paths

**Why:** Stubs hide integration problems until production

### 3. Test Types Pyramid

```
        /\
       /  \      E2E Tests (Few)
      /____\     - Full user workflows
     /      \    - System integration
    /________\   
   /          \  Integration Tests (Some)
  /____________\ - Component interaction
 /              \
/________________\ Unit Tests (Many)
                   - Individual functions
                   - Business logic
```

**Balance is key:**
- Many fast unit tests
- Some integration tests
- Few slow E2E tests

### 4. Testing as Documentation

**Tests are executable specifications.**

A well-written test answers:
- What does this feature do?
- How is it supposed to work?
- What are the edge cases?
- What could go wrong?

**Future developers should be able to understand your system purely from tests + documentation.**

---

## Test Types

### Unit Tests

**What:** Test individual functions/methods in isolation

**When:** For business logic, calculations, transformations

**Example:**
```python
def test_calculate_score():
    # Given
    evidence = [
        {"confidence": 0.9, "type": "support"},
        {"confidence": 0.7, "type": "support"},
    ]
    
    # When
    score = calculate_score(evidence)
    
    # Then
    assert score == 0.8  # Average of confidences
    assert 0 <= score <= 1  # Valid range
```

**Characteristics:**
- Fast (milliseconds)
- No external dependencies
- Deterministic
- Isolated

### Integration Tests

**What:** Test multiple components working together

**When:** For API endpoints, database operations, service integration

**Example:**
```python
def test_create_task_endpoint():
    # Given
    client = TestClient(app)
    task_data = {"title": "Test task", "completed": False}
    
    # When
    response = client.post("/tasks", json=task_data)
    
    # Then
    assert response.status_code == 201
    assert response.json()["title"] == "Test task"
    
    # Verify persisted to database
    task_in_db = db.get_task(response.json()["id"])
    assert task_in_db is not None
```

**Characteristics:**
- Slower (seconds)
- May use database, APIs
- Tests real integration
- Validates contracts

### End-to-End (E2E) Tests

**What:** Test complete user workflows from UI to database

**When:** For critical user journeys

**Example:**
```python
def test_complete_task_workflow():
    # User creates account
    user = create_test_user()
    
    # User logs in
    token = login(user.email, user.password)
    
    # User creates task
    task = create_task(token, "Buy groceries")
    
    # User marks complete
    complete_task(token, task.id)
    
    # User sees task in completed list
    completed_tasks = get_completed_tasks(token)
    assert task.id in [t.id for t in completed_tasks]
```

**Characteristics:**
- Slowest (minutes)
- Full system integration
- Tests real user flows
- Catches system-level issues

### Manual/GUI Tests

**What:** Human performs test scenarios in actual UI

**When:** For UX validation, visual checks, usability

**Example Test Doc:**
```markdown
## Manual Test: Task Creation

**Preconditions:**
- User logged in
- Dashboard visible

**Steps:**
1. Click "New Task" button
2. Enter title: "Test task"
3. Set due date: Tomorrow
4. Click "Create"

**Expected Results:**
- Task

 appears in task list
- Has title "Test task"
- Shows tomorrow's date
- Has "incomplete" status
```

**Characteristics:**
- Requires human tester
- Catches visual issues
- Validates UX
- Time-consuming

---

## Testing Strategy by Project Phase

### Early Cycles (1-3)

**Focus:** Get core functionality working

**Testing:**
- Manual tests (document results)
- Basic integration tests
- Unit tests for critical logic

**Continuous:** Keep passing ALL previous tests

### Mid Cycles (4-10)

**Focus:** Build test coverage

**Testing:**
- Add unit tests for all business logic
- Integration tests for all APIs
- Automated E2E for happy paths
- Regression suite running

### Mature Cycles (10+)

**Focus:** Comprehensive coverage

**Testing:**
- High unit test coverage (>80%)
- All endpoints integration tested
- E2E tests for critical flows
- Performance tests
- Security tests

---

## Test Data Management

### Principle: Use Realistic Data

**Bad:**
```python
test_user = {"name": "foo", "email": "bar@baz.com"}
```

**Good:**
```python
test_user = {
  "name": "Sarah Chen",
  "email": "sarah.chen@example.com",
  "role": "product_manager"
}
```

**Why:** Realistic data catches edge cases that foo/bar misses

### Test Data Fixtures

**Create reusable test data:**

```python
# tests/fixtures.py
@pytest.fixture
def sample_task():
    return {
        "id": "task_123",
        "title": "Complete quarterly report",
        "assigned_to": "user_456",
        "due_date": "2025-12-31",
        "priority": "high",
        "tags": ["reporting", "Q4"]
    }

@pytest.fixture
def sample_user():
    return {
        "id": "user_456",
        "email": "alice@example.com",
        "name": "Alice Johnson",
        "role": "analyst"
    }
```

**Use in tests:**

```python
def test_task_assignment(sample_task, sample_user):
    # Test uses realistic, consistent data
    assign_task(sample_task["id"], sample_user["id"])
    assert get_task(sample_task["id"])["assigned_to"] == sample_user["id"]
```

### Test Database Strategy

**Option 1: In-Memory Database**
```python
# Fast, isolated, perfect for unit tests
@pytest.fixture
def test_db():
    db = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(db)
    yield db
    Base.metadata.drop_all(db)
```

**Option 2: Test Database Instance**
```python
# More realistic, use for integration tests
@pytest.fixture(scope="session")
def test_db():
    db = create_test_database()
    yield db
    cleanup_test_database(db)
```

**Option 3: Database Transactions**
```python
# Fast cleanup via rollback
@pytest.fixture
def db_session():
    session = Session()
    yield session
    session.rollback()  # Undo all changes
    session.close()
```

---

## Mocking Strategy

### What to Mock

**DO mock:**
- ✅ External API calls
- ✅ File system operations
- ✅ Time/date dependencies
- ✅ Email sending
- ✅ Payment processing
- ✅ Slow operations

**DON'T mock:**
- ❌ Your own business logic
- ❌ Database (use test DB instead)
- ❌ Simple pure functions
- ❌ Things you're testing

### Mocking Best Practices

**Mock at API boundaries:**

```python
# Good: Mock at external API boundary
@patch('litellm.completion')
def test_generate_text(mock_completion):
    mock_completion.return_value = {
        "choices": [{"message": {"content": "Generated text"}}]
    }
    
    result = generate_summary("Input text")
    assert result == "Generated text"
```

**Not business logic:**

```python
# Bad: Mocking your own code
@patch('services.my_service.process_data')
def test_workflow(mock_process):
    mock_process.return_value = "fake result"
    # This doesn't test anything!
```

---

## Continuous Testing

### Run Tests Often

**Developers should run:**
- Unit tests: Every save (seconds)
- Integration tests: Before commit (minutes)
- E2E tests: Before push (minutes)
- Full suite: Pre-deployment (full run)

### CI/CD Integration

**Continuous Integration should:**
```yaml
on: [push, pull_request]
jobs:
  test:
    steps:
      - Run linting
      - Run unit tests
      - Run integration tests
      - Run E2E tests
      - Generate coverage report
      - Fail build if tests fail
      - Fail build if coverage drops
```

**No merge without passing tests.**

---

## Test Documentation

### Document Test Scenarios

```markdown
## Test Scenario: User Login

### Happy Path
- Valid credentials → Success
- Redirects to dashboard
- Session token set

### Error Cases
- Invalid email → Error message
- Wrong password → Error message
- Locked account → Specific message

### Edge Cases
- Email case insensitive
- Whitespace trimmed
- Rate limiting after 5 failures
```

### Document Test Results

```markdown
## Test Run: Cycle 1.3 Completion

**Date:** 2025-11-19
**Environment:** Staging

### Unit Tests
- Total: 127
- Passed: 127
- Failed: 0
- Duration: 12s

### Integration Tests
- Total: 43
- Passed: 43
- Failed: 0  
- Duration: 3m 22s

### Manual GUI Tests
- Scenario 1: Task Creation ✅
- Scenario 2: Task Editing ✅
- Scenario 3: Task Deletion ✅

**Overall:** ✅ ALL TESTS PASSING
```

---

## Coverage Guidelines

### What to Measure

- **Line coverage:** % of code lines executed
- **Branch coverage:** % of code paths taken
- **Function coverage:** % of functions called

### Target Coverage

**Minimums:**
- Critical business logic: 90%+
- API endpoints: 80%+
- UI components: 70%+
- Overall project: 75%+

**But:** 100% coverage ≠ bug-free code

**Focus on:**
- Critical paths well-tested
- Edge cases covered
- Error handling validated

---

## Test Maintenance

### Keep Tests Passing

**Broken tests are worse than no tests.**

**If test fails:**
1. Fix the test (if test was wrong)
2. Fix the code (if code broke)
3. Update test (if requirements changed)

**Never:**
- Skip failing tests
- Comment out tests
- Ignore test failures

### Refactor Tests

**Tests need maintenance too:**

- Remove duplicate tests
- Update to new patterns
- Improve clarity
- Speed up slow tests
- Update test data

### Delete Obsolete Tests

**Remove tests for:**
- Removed features
- Deprecated code
- Old implementations

---

## Common Testing Mistakes

### ❌ Testing Implementation, Not Behavior

**Bad:**
```python
def test_user_service():
    # Tests internal implementation
    assert service._internal_cache is not None
    assert service._validate_called == True
```

**Good:**
```python
def test_user_service():
    # Tests behavior
    user = service.get_user("user_123")
    assert user.email == "alice@example.com"
```

### ❌ Flaky Tests

**Problem:** Test passes sometimes, fails sometimes

**Causes:**
- Time dependencies
- Random data
- Race conditions
- External dependencies

**Solutions:**
- Mock time
- Use fixed seeds
- Proper synchronization
- Mock external services

### ❌ Slow Tests

**Problem:** Tests take too long, developers skip them

**Solutions:**
- Parallelize tests
- Use in-memory database
- Mock slow operations
- Optimize test setup

---

## Integration with Development Workflow

### Before Cycle Complete

**Mandatory:**
- [ ] All new code has tests
- [ ] All tests passing
- [ ] Test data aligned with implementation
- [ ] Manual tests documented
- [ ] Coverage meets minimums

**See:** [`test_data_alignment.md`](./test_data_alignment.md)

### After Cycle Complete

**Update:**
- Test documentation
- Test coverage reports
- Regression test suite
- Manual test scenarios

---

## Key Takeaways

1. **Tests = Confidence** - Know your code works
2. **Test Early** - Catch bugs when cheap
3. **Test Often** - Prevent regressions
4. **Test Realistically** - Use real data, real scenarios
5. **Test Comprehensively** - Unit + Integration + E2E
6. **Maintain Tests** - Keep them passing, keep them valuable

**Testing is not optional. It's how you build reliable software.**

---

**Related Documents:**
- [`test_data_alignment.md`](./test_data_alignment.md) - Critical test-implementation alignment guide
- `../development-cycles/completion_checklist.md` - Testing requirements for cycle completion
- `../development-cycles/cycle_workflow.md` - When to run tests in workflow