# API Contracts

<!--
This section defines API contract enforcement rules.
Used by tools that support file imports (e.g., Claude Code @imports).
Customize based on project's chosen API approach during bootstrap.
-->

## API Contract Philosophy

API contracts are the agreement between backend and frontend. They define:
- Request formats and validation rules
- Response structures and types
- Error formats and status codes
- Authentication requirements

**The backend defines the contract; the frontend consumes it.**

## Contract Approaches

### OpenAPI + Auto-Generated Types (Recommended)

{{#if API_APPROACH_OPENAPI}}
**This project uses OpenAPI + {{BACKEND_MODEL_TYPE}} + TypeScript**

#### Backend Requirements
- ALL endpoints MUST use {{BACKEND_MODEL_TYPE}} response models
- ALL endpoints MUST have `response_model` parameter
- ALL endpoints MUST explicitly map service data to response model
- OpenAPI schema auto-generated from models

#### Frontend Requirements
- MUST use `{{API_CLIENT_MODULE}}` from `{{API_CLIENT_PATH}}`
- MUST use `{{API_HOOKS_MODULE}}` from `{{API_HOOKS_PATH}}` when possible
- MUST use auto-generated TypeScript types from `{{TYPES_PATH}}`
- NO manual type definitions that duplicate API response types
{{#unless PROJECT_TYPE_PROTOTYPE}}
- NO direct `{{HTTP_CLIENT}}()` calls in components - ZERO EXCEPTIONS
{{/unless}}
{{#if PROJECT_TYPE_PROTOTYPE}}
- Direct `{{HTTP_CLIENT}}()` calls allowed for prototyping (but API client recommended)
{{/if}}

#### Enforcement
Before making ANY changes to frontend components that fetch data:
1. Check if component uses `{{API_CLIENT_MODULE}}` - if not, refactor it first
2. Check if component uses auto-generated types - if not, update it first
3. If API client method doesn't exist, add it to `{{API_CLIENT_PATH}}` first
{{/if}}

### GraphQL

{{#if API_APPROACH_GRAPHQL}}
**This project uses GraphQL**

#### Requirements
- ALL queries/mutations MUST be defined in GraphQL schema first
- Frontend MUST use generated types from GraphQL schema
- NO manual GraphQL queries in components - use generated hooks
- ALL schema changes require regenerating frontend types

#### Reference
- Schema: `{{GRAPHQL_SCHEMA_PATH}}`
- Generated Types: `{{TYPES_PATH}}`
- Pattern: `{{DOCS_DIR}}/patterns/graphql_pattern.md`
{{/if}}

### JSON Schema / Custom

{{#if API_APPROACH_CUSTOM}}
**This project uses custom API contracts**

#### Requirements
- ALL endpoints MUST document request/response contracts in `{{CONTRACT_DOC_PATH}}`
- Frontend types MUST match backend contracts
- Contract changes require updating both backend and frontend

#### Reference
- Contract Documentation: `{{CONTRACT_DOC_PATH}}`
- Pattern: `{{DOCS_DIR}}/patterns/api_contract_pattern.md`
{{/if}}

## API Contract Validation Checklist

Before any API-related changes:
- [ ] Contract (OpenAPI/GraphQL/custom) is up to date
- [ ] Backend response model matches contract
- [ ] Frontend uses generated types (not manual definitions)
- [ ] API client method exists (or will be created)
- [ ] Error handling follows project patterns

After API changes:
- [ ] Regenerate frontend types if schema changed
- [ ] Update API client if endpoints changed
- [ ] Verify types match across stack
- [ ] Update contract documentation
