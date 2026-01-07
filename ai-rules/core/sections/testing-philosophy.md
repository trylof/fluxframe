# Testing Philosophy

<!--
This section defines testing requirements and philosophy.
Used by tools that support file imports (e.g., Claude Code @imports).
-->

## Core Testing Principles

### Test-Implementation Alignment

Tests must validate actual behavior, not mocked assumptions.

**The Problem:** Tests that mock too much can pass while the real system fails. They test the mock, not the implementation.

**The Solution:** Write tests that exercise real code paths whenever practical. Mock only external dependencies that are impractical to use in tests.

### What to Test

1. **Integration Tests** - Test that components work together correctly
2. **Contract Tests** - Verify API contracts are honored
3. **Behavior Tests** - Test user-facing functionality
4. **Edge Cases** - Test boundary conditions and error cases

### What NOT to Over-Test

- Implementation details that may change
- Simple getters/setters with no logic
- Third-party library code

## Test Categories

### Unit Tests
- Test individual functions/methods in isolation
- Mock external dependencies only
- Fast execution, high coverage

### Integration Tests
- Test component interactions
- Use real database (test instance)
- Verify actual data flows

### End-to-End Tests
- Test complete user flows
- Run against real system
- Catch integration issues

## Testing Practices

### Test Structure
```
{{TEST_STRUCTURE_EXAMPLE}}
```

### Test Commands
- Run all tests: `{{TEST_COMMAND}}`
- Run specific tests: `{{TEST_SPECIFIC_COMMAND}}`
- Run with coverage: `{{TEST_COVERAGE_COMMAND}}`

### When to Write Tests

1. **Before fixing bugs** - Write a failing test that demonstrates the bug
2. **After implementing features** - Ensure tests cover the new functionality
3. **When modifying code** - Update or add tests to cover changes

### Test Maintenance

- Keep tests aligned with implementation changes
- Remove tests for deleted features
- Update test data when schemas change
- Refactor tests when patterns change

## Testing Checklist

Before marking implementation complete:
- [ ] All existing tests still pass
- [ ] New functionality has test coverage
- [ ] Edge cases are tested
- [ ] Error handling is tested
- [ ] Tests use real implementations where practical
- [ ] Test data is realistic and valid

## Project-Specific Testing Rules

{{TESTING_RULES}}
