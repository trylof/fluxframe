---
paths:
  - {{API_PATH_PATTERN}}
---
# API Development Rules

<!--
These rules are automatically loaded when working on API files.
Claude Code applies them based on the paths defined above.
-->

## Endpoint Implementation Standards

### Every Endpoint Must Have

1. **Response Model** - Use `{{BACKEND_MODEL_TYPE}}` for all responses
2. **Input Validation** - Validate all request parameters and body
3. **Error Handling** - Comprehensive try/catch with proper status codes
4. **Authentication** - Check auth where applicable
5. **Logging** - Log for debugging (not sensitive data)

### Response Model Pattern

```{{BACKEND_LANGUAGE}}
{{API_RESPONSE_MODEL_EXAMPLE}}
```

### Error Response Format

All errors should follow the project's standard error format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "details": {}
  }
}
```

### Status Code Guidelines

| Code | When to Use |
|------|-------------|
| 200 | Successful GET, PUT, PATCH |
| 201 | Successful POST (resource created) |
| 204 | Successful DELETE (no content) |
| 400 | Invalid request data |
| 401 | Not authenticated |
| 403 | Not authorized |
| 404 | Resource not found |
| 422 | Validation error |
| 500 | Server error |

## API Contract Enforcement

{{#if API_APPROACH_OPENAPI}}
### OpenAPI Contract Rules

- ALL endpoints MUST be documented in OpenAPI spec
- Response models MUST match OpenAPI definitions
- Use `response_model` parameter on all routes
- Regenerate frontend types after schema changes

### Before Modifying Endpoints

1. Check OpenAPI spec for current contract
2. Update spec if contract changes
3. Regenerate types: `{{TYPE_GEN_COMMAND}}`
4. Update API client if needed
{{/if}}

{{#if API_APPROACH_GRAPHQL}}
### GraphQL Contract Rules

- ALL queries/mutations defined in schema first
- Resolvers must match schema types exactly
- Regenerate types after schema changes

### Before Modifying Resolvers

1. Check GraphQL schema for current contract
2. Update schema if contract changes
3. Regenerate types: `{{TYPE_GEN_COMMAND}}`
{{/if}}

## Testing Requirements

For every API endpoint:
- [ ] Integration test for success case
- [ ] Integration test for error cases
- [ ] Validation error test
- [ ] Authentication test (if protected)

## Quick Reference

- API Pattern: `{{DOCS_DIR}}/patterns/api_contract_pattern.md`
- OpenAPI Spec: `{{OPENAPI_SPEC_PATH}}`
- API Client: `{{API_CLIENT_PATH}}`
