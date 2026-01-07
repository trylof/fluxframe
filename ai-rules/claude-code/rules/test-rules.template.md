---
paths:
  - {{TEST_PATH_PATTERN}}
---
# Test Development Rules

<!--
These rules are automatically loaded when working on test files.
Claude Code applies them based on the paths defined above.
-->

## Test Philosophy

Tests should validate actual behavior, not mocked assumptions.

### What to Test

- **Integration Points** - How components/services work together
- **Business Logic** - Core functionality and edge cases
- **API Contracts** - Request/response validation
- **User Flows** - End-to-end user scenarios

### What NOT to Over-Mock

- Database interactions (use test database)
- Service layer calls (test real integration)
- Simple getters/setters
- Third-party library internals

## Test Structure

### Standard Test File Structure

```{{TEST_LANGUAGE}}
{{TEST_FILE_STRUCTURE_EXAMPLE}}
```

### Naming Conventions

- Test files: `*.test.{{TEST_FILE_EXTENSION}}` or `*.spec.{{TEST_FILE_EXTENSION}}`
- Test descriptions: Should describe expected behavior
- Use descriptive names: `should_return_error_when_user_not_found`

## Test Categories

### Unit Tests
- Test individual functions in isolation
- Mock only external dependencies
- Fast execution

```{{TEST_LANGUAGE}}
{{UNIT_TEST_EXAMPLE}}
```

### Integration Tests
- Test component interactions
- Use real database (test instance)
- Verify data flows

```{{TEST_LANGUAGE}}
{{INTEGRATION_TEST_EXAMPLE}}
```

### E2E Tests
- Test complete user flows
- Run against real system
- Catch integration issues

## Test Data

### Test Data Guidelines

- Use realistic, valid data
- Create data factories/fixtures for reusability
- Clean up after tests
- Don't rely on production data

### Test Data Location

- Fixtures: `{{TEST_FIXTURES_PATH}}`
- Factories: `{{TEST_FACTORIES_PATH}}`

## Assertions

### Best Practices

- One logical assertion per test
- Use specific assertions (not just `toBeTruthy`)
- Include meaningful error messages
- Test both positive and negative cases

### Common Assertions

```{{TEST_LANGUAGE}}
{{ASSERTION_EXAMPLES}}
```

## Mocking Guidelines

### When to Mock

- External APIs/services
- Time-dependent operations
- Random number generation
- File system operations (sometimes)

### When NOT to Mock

- Your own service layer (test real integration)
- Database (use test database instead)
- Simple utility functions

### Mock Setup Pattern

```{{TEST_LANGUAGE}}
{{MOCK_SETUP_EXAMPLE}}
```

## Test Commands

| Command | Purpose |
|---------|---------|
| `{{TEST_COMMAND}}` | Run all tests |
| `{{TEST_WATCH_COMMAND}}` | Run tests in watch mode |
| `{{TEST_COVERAGE_COMMAND}}` | Run with coverage report |
| `{{TEST_SPECIFIC_COMMAND}}` | Run specific test file |

## Test Checklist

Before committing tests:
- [ ] Tests pass locally
- [ ] Tests are deterministic (no flaky tests)
- [ ] Test data is cleaned up
- [ ] Mocks are appropriate (not over-mocking)
- [ ] Edge cases are covered
- [ ] Error cases are tested
- [ ] Tests are readable and maintainable

## Quick Reference

- Test Pattern: `{{DOCS_DIR}}/patterns/{{TEST_PATTERN_FILE}}`
- Test Fixtures: `{{TEST_FIXTURES_PATH}}`
- Coverage Requirements: {{COVERAGE_REQUIREMENTS}}
