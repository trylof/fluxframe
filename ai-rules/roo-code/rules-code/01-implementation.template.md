# Code Mode Implementation Rules

<!--
Rules specific to the FluxFrame Code mode.
These rules are loaded when using the fluxframe-code mode.
Place in .roo/rules-code/ directory.
-->

## Implementation Workflow

### Before Writing Code

1. **Check Patterns**
   ```
   MCP: check_pattern_exists(feature_description="[what you're building]")
   ```
   - If pattern exists → Follow it exactly
   - If no pattern → Plan to document after implementation

2. **Check Status**
   - Read `{{DOCS_DIR}}/technical_status.md` for current state
   - Understand what's already implemented
   - Know the dependencies

3. **Check Contracts**
   - If API work → Review API contracts/OpenAPI spec
   - If frontend → Check API client and types are current

### While Writing Code

- **Real Components Only** - No placeholder implementations
- **Follow Existing Patterns** - Consistency over cleverness
- **Include Error Handling** - From the start, not as afterthought
- **Write Testable Code** - Design for testability

### After Writing Code

1. Run tests: `{{TEST_COMMAND}}`
2. Run linter: `{{LINT_COMMAND}}`
3. Verify it works visually/functionally
4. **Wait for user confirmation** before updating docs

## Code Quality Standards

### File Organization
{{FILE_ORGANIZATION_RULES}}

### Naming Conventions
{{NAMING_CONVENTIONS}}

### Error Handling Pattern

```{{BACKEND_LANGUAGE}}
{{ERROR_HANDLING_EXAMPLE}}
```

### Logging Standards

- Log at appropriate levels (debug, info, warn, error)
- Never log sensitive data
- Include context (request ID, user ID, etc.)
- Use structured logging when possible

## API Development (if applicable)

{{#if API_APPROACH_OPENAPI}}
### OpenAPI Contract Rules

- ALL endpoints use `{{BACKEND_MODEL_TYPE}}` response models
- ALL endpoints have `response_model` parameter
- Validate all input data
- Return consistent error format

### Endpoint Checklist
- [ ] Response model defined
- [ ] Input validation added
- [ ] Error handling complete
- [ ] Auth check included (if needed)
- [ ] Integration test written
{{/if}}

## Frontend Development (if applicable)

{{#if HAS_FRONTEND}}
### Component Rules

- Use `{{API_CLIENT_MODULE}}` for data fetching
- Use auto-generated types from `{{TYPES_PATH}}`
{{#unless PROJECT_TYPE_PROTOTYPE}}
- NO direct `{{HTTP_CLIENT}}()` calls
{{/unless}}
- Handle loading, error, and empty states

### Component Checklist
- [ ] TypeScript props interface defined
- [ ] Uses API client (not direct HTTP)
- [ ] Uses generated types
- [ ] Handles all states
- [ ] Accessibility considered
{{/if}}

## Testing Requirements

### Test Coverage Expectations
{{COVERAGE_REQUIREMENTS}}

### Test Types to Write
- Integration tests for new functionality
- Error case tests
- Edge case tests
- API contract tests (if API work)

### Test Command
```bash
{{TEST_COMMAND}}
```

## Completion Checklist

Before asking for user confirmation:
- [ ] Code compiles/runs without errors
- [ ] Tests pass locally
- [ ] Linter passes
- [ ] Feature works as expected
- [ ] No placeholder code remains
- [ ] Error handling is complete
