# API Contract Standards - {{PROJECT_NAME}}

<!-- 
INSTRUCTIONS FOR CLINE:
This document defines HOW frontend and backend communicate.
It's mandatory from DAY 1 - no "we'll add contracts later"
Choose ONE approach during bootstrap and enforce it consistently.
This prevents integration failures and type mismatches.
-->

**Chosen Approach:** {{API_CONTRACT_APPROACH}}  
**Status:** {{IMPLEMENTATION_STATUS}}  
**Last Updated:** {{LAST_UPDATE_DATE}}

---

## 1. Philosophy: Contract-First Development

**Core Principle:** Define the API contract BEFORE implementation.

### Why This Matters

**Without Contracts:**
- Frontend assumes API returns `{id, name}`
- Backend actually returns `{userId, fullName}`
- Integration fails late, time wasted, frustration

**With Contracts:**
- Contract defines structure upfront
- Backend validates against contract (runtime)
- Frontend validates against contract (compile-time)
- Breaking changes caught immediately
- Self-documenting APIs

### The Mandate

**As of {{MANDATE_DATE}}, ALL API endpoints in {{PROJECT_NAME}} must:**
1. Have an explicit, documented contract
2. Validate responses against that contract
3. Generate types from that contract (if using typed language)
4. Fail fast on contract violations

**If an endpoint doesn't have a contract, it's not production-ready.**

---

## 2. Chosen Approach: {{API_CONTRACT_APPROACH}}

<!-- CLINE: Keep only the section matching the chosen approach, delete others -->

{{#if API_APPROACH_OPENAPI}}
### OpenAPI + Pydantic + Auto-Generated TypeScript

**Best for:** Python/FastAPI backend + TypeScript/React frontend

#### How It Works

1. **Backend:** Define Pydantic models in `{{BACKEND_MODELS_PATH}}`
2. **Backend:** Add `response_model` parameter to FastAPI endpoints
3. **Backend:** FastAPI auto-generates OpenAPI spec from Pydantic models
4. **Frontend:** Generate TypeScript types from OpenAPI spec
5. **Frontend:** Use typed API client for all requests

#### The Contract Chain

```
Backend Pydantic Model 
  → OpenAPI Specification 
    → TypeScript Types 
      → API Client 
        → React Hooks 
          → Components
```

Every link is type-safe. Breaking changes caught at compile time.

#### Implementation Guide

**Backend Setup:**

```python
# {{BACKEND_MODELS_PATH}}
from pydantic import BaseModel
from typing import List

class {{EXAMPLE_RESPONSE_MODEL}}(BaseModel):
    {{FIELD_1}}: {{TYPE_1}}
    {{FIELD_2}}: {{TYPE_2}}
    {{FIELD_3}}: List[{{TYPE_3}}]

# {{BACKEND_ROUTES_PATH}}
from fastapi import APIRouter
from .models.api_responses import {{EXAMPLE_RESPONSE_MODEL}}

@router.get("/{{EXAMPLE_ENDPOINT}}", response_model={{EXAMPLE_RESPONSE_MODEL}})
async def {{EXAMPLE_FUNCTION}}() -> {{EXAMPLE_RESPONSE_MODEL}}:
    # Service returns dict or custom object
    data = await {{SERVICE_CALL}}()
    
    # ALWAYS map explicitly to Pydantic model
    return {{EXAMPLE_RESPONSE_MODEL}}(
        {{FIELD_1}}=data.{{SOURCE_FIELD_1}},
        {{FIELD_2}}=data.{{SOURCE_FIELD_2}},
        {{FIELD_3}}=[{{MAPPING_LOGIC}}]
    )
```

**Frontend Setup:**

```bash
# Generate TypeScript types from OpenAPI spec
{{TYPE_GENERATION_COMMAND}}
```

```typescript
// {{FRONTEND_API_CLIENT_PATH}}
import type { paths } from './types/api';

class APIClient {
  async {{EXAMPLE_METHOD}}(): Promise<paths['/{{EXAMPLE_ENDPOINT}}']['get']['responses']['200']['content']['application/json']> {
    const response = await fetch(`${this.baseURL}/{{EXAMPLE_ENDPOINT}}`, {
      headers: this.getHeaders(),
    });
    
    if (!response.ok) {
      throw new APIClientError(response.status, await response.text());
    }
    
    return response.json();
  }
}
```

#### Enforcement Rules

**Backend MUST:**
- ✅ All endpoints have `response_model` parameter
- ✅ All responses explicitly mapped to Pydantic models
- ✅ No dict returns (except for pass-through from trusted sources)
- ✅ Return type annotations match response_model

**Frontend MUST:**
- ✅ Use {{API_CLIENT_MODULE}} from `{{FRONTEND_API_CLIENT_PATH}}`
- ✅ Use auto-generated types from `{{FRONTEND_TYPES_PATH}}`
{{#unless PROJECT_TYPE_PROTOTYPE}}
- ✅ NO direct `fetch()` calls in components
- ✅ NO manual type definitions duplicating API types
{{/unless}}
{{#if PROJECT_TYPE_PROTOTYPE}}
- ✅ Direct `fetch()` calls allowed (but API client recommended)
{{/if}}

**Workflow MUST:**
1. Define Pydantic model
2. Add to endpoint
3. Regenerate frontend types
4. Update API client if needed
5. Use in components

#### Benefits Delivered

- ✅ Runtime validation on backend (Pydantic catches invalid data)
- ✅ Compile-time validation on frontend (TypeScript catches type errors)
- ✅ Auto-generated API documentation (OpenAPI spec always accurate)
- ✅ Perfect IDE autocomplete (types extracted from backend)
- ✅ Breaking changes caught immediately (regenerate types → TypeScript errors)

{{/if}}

{{#if API_APPROACH_GRAPHQL}}
### GraphQL Schema

**Best for:** Complex data graphs, flexible queries, typed schema

#### How It Works

1. **Schema:** Define GraphQL schema (`.graphql` files)
2. **Backend:** Implement resolvers matching schema
3. **Frontend:** Generate types and hooks from schema
4. **Frontend:** Use generated hooks in components

#### The Contract Chain

```
GraphQL Schema 
  → Backend Resolvers 
  → Frontend Types & Hooks 
    → Components
```

Schema is the single source of truth.

#### Implementation Guide

**Schema Definition:**

```graphql
# {{SCHEMA_PATH}}
type {{EXAMPLE_TYPE}} {
  {{FIELD_1}}: {{TYPE_1}}!
  {{FIELD_2}}: {{TYPE_2}}
  {{FIELD_3}}: [{{TYPE_3}}!]!
}

type Query {
  {{EXAMPLE_QUERY}}({{PARAM}}: {{PARAM_TYPE}}!): {{EXAMPLE_TYPE}}
}

type Mutation {
  {{EXAMPLE_MUTATION}}(input: {{INPUT_TYPE}}!): {{EXAMPLE_TYPE}}
}
```

**Backend Resolvers:**

```{{BACKEND_LANGUAGE}}
// {{RESOLVER_PATH}}
const resolvers = {
  Query: {
    {{EXAMPLE_QUERY}}: async (parent, { {{PARAM}} }, context) => {
      // Must return data matching GraphQL type
      return await {{SERVICE_CALL}}({{PARAM}});
    },
  },
};
```

**Frontend Usage:**

```bash
# Generate types and hooks
{{GRAPHQL_CODEGEN_COMMAND}}
```

```typescript
// {{FRONTEND_COMPONENT_PATH}}
import { use{{EXAMPLE_QUERY}}Query } from './generated/graphql';

function {{COMPONENT_NAME}}() {
  const { data, loading, error } = use{{EXAMPLE_QUERY}}Query({
    variables: { {{PARAM}}: {{VALUE}} },
  });
  
  // data is fully typed
  return <div>{data?.{{EXAMPLE_TYPE}}.{{FIELD_1}}}</div>;
}
```

#### Enforcement Rules

**Schema MUST:**
- ✅ Be the single source of truth
- ✅ Define all types explicitly
- ✅ Use non-null (!) appropriately

**Backend MUST:**
- ✅ Implement all schema types
- ✅ Return data matching schema exactly
- ✅ Validate inputs

**Frontend MUST:**
- ✅ Use generated hooks (no manual queries)
- ✅ Regenerate types after schema changes
- ✅ Type-check all component props

{{/if}}

{{#if API_APPROACH_JSON_SCHEMA}}
### JSON Schema + Manual Types

**Best for:** Simpler projects, REST APIs without OpenAPI

#### How It Works

1. **Backend:** Define JSON schemas for responses
2. **Backend:** Validate responses against schemas
3. **Frontend:** Manually create TypeScript types matching schemas
4. **Frontend:** Use typed API client

#### Implementation Guide

**Backend Schema:**

```json
// {{SCHEMA_PATH}}
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "{{EXAMPLE_RESPONSE}}",
  "type": "object",
  "properties": {
    "{{FIELD_1}}": { "type": "{{TYPE_1}}" },
    "{{FIELD_2}}": { "type": "{{TYPE_2}}" },
    "{{FIELD_3}}": {
      "type": "array",
      "items": { "type": "{{TYPE_3}}" }
    }
  },
  "required": ["{{FIELD_1}}", "{{FIELD_3}}"]
}
```

**Backend Validation:**

```{{BACKEND_LANGUAGE}}
// {{VALIDATOR_PATH}}
import { validate } from '{{JSON_SCHEMA_LIBRARY}}';
import schema from './schemas/{{EXAMPLE_RESPONSE}}.json';

function validateResponse(data) {
  const valid = validate(data, schema);
  if (!valid) {
    throw new Error('Response validation failed');
  }
  return data;
}
```

**Frontend Types:**

```typescript
// {{FRONTEND_TYPES_PATH}}
// MUST match backend JSON schema exactly
export interface {{EXAMPLE_RESPONSE}} {
  {{FIELD_1}}: {{TYPE_1}};
  {{FIELD_2}}?: {{TYPE_2}};
  {{FIELD_3}}: {{TYPE_3}}[];
}
```

#### Enforcement Rules

**Backend MUST:**
- ✅ Define JSON schema for all responses
- ✅ Validate before sending
- ✅ Document schema location

**Frontend MUST:**
- ✅ Create types matching schemas
- ✅ Update types when schemas change
- ✅ Review schema/type alignment regularly

**Limitation:** Manual sync required between JSON schema and TypeScript types.

{{/if}}

{{#if API_APPROACH_CUSTOM}}
### Custom Contract Definition

**Best for:** {{CUSTOM_APPROACH_USE_CASE}}

#### Your Chosen Approach

{{CUSTOM_APPROACH_DESCRIPTION}}

#### Contract Location

**Backend Contracts:** `{{BACKEND_CONTRACT_PATH}}`  
**Frontend Contracts:** `{{FRONTEND_CONTRACT_PATH}}`

#### Validation Strategy

**Backend:** {{BACKEND_VALIDATION_APPROACH}}  
**Frontend:** {{FRONTEND_VALIDATION_APPROACH}}

#### Type Safety Approach

{{TYPE_SAFETY_DESCRIPTION}}

#### Implementation Guide

{{CUSTOM_IMPLEMENTATION_GUIDE}}

#### Enforcement Rules

**Backend MUST:**
- ✅ {{BACKEND_RULE_1}}
- ✅ {{BACKEND_RULE_2}}
- ✅ {{BACKEND_RULE_3}}

**Frontend MUST:**
- ✅ {{FRONTEND_RULE_1}}
- ✅ {{FRONTEND_RULE_2}}
- ✅ {{FRONTEND_RULE_3}}

{{/if}}

---

## 3. Development Workflow

**BEFORE creating ANY endpoint:**

1. **Define Contract**
   - {{CONTRACT_DEFINITION_STEP}}
   - Document expected request/response
   - Define types/models

2. **Backend Implementation**
   - Implement endpoint
   - Map service data to contract model
   - Add validation

3. **Generate/Update Frontend Types**
   - {{TYPE_GENERATION_STEP}}
   - Verify types generated correctly

4. **Frontend Implementation**
   - Use typed API client
   - Use generated/defined types
   - NO manual type definitions

5. **Validate**
   - Test full request/response cycle
   - Verify contract compliance
   - Check error handling

**If endpoint doesn't follow contract → Reject it.**

---

## 4. Common Patterns

### Adding a New Endpoint

```
1. {{PATTERN_STEP_1}}
2. {{PATTERN_STEP_2}}
3. {{PATTERN_STEP_3}}
4. {{PATTERN_STEP_4}}
5. Test contract compliance
```

### Modifying Existing Endpoint

```
1. Update contract definition first
2. {{BREAKING_CHANGE_CHECK}}
3. Update backend implementation
4. Regenerate frontend types
5. Fix TypeScript errors (breaking changes surface here)
6. Update components using endpoint
```

### Handling Breaking Changes

**Strategy:** {{BREAKING_CHANGE_STRATEGY}}

- Version endpoints if needed (`/v1/`, `/v2/`)
- Deprecate old endpoints with timeline
- Communicate changes to team
- Update all consumers before removing old version

---

## 5. Quality Gates

**No PR can merge without:**
- ✅ Contract defined for all new endpoints
- ✅ Backend validates against contract
- ✅ Frontend uses typed client
- ✅ {{ADDITIONAL_GATE_1}}
- ✅ {{ADDITIONAL_GATE_2}}

**In .clinerules:**
- Contract-first workflow enforced
- Direct fetch() calls rejected
- Manual type definitions flagged

**In CI/CD:**
- {{CI_VALIDATION_1}}
- {{CI_VALIDATION_2}}

---

## 6. Migration Strategy (If Adding Contracts to Existing Project)

<!-- CLINE: Include if bootstrapping a project with existing uncontracted endpoints -->

**Phase 1: Foundation**
1. Set up contract infrastructure ({{INFRASTRUCTURE_SETUP}})
2. Choose 3 high-traffic endpoints
3. Add contracts to those endpoints
4. Validate approach works

**Phase 2: Incremental Migration**
1. Add contracts to all new endpoints (mandatory)
2. Migrate existing endpoints incrementally
3. Prioritize by: traffic → criticality → complexity
4. Track migration progress in technical_status.md

**Phase 3: Enforcement**
1. All endpoints have contracts
2. Enable strict validation
3. Remove legacy uncontracted code
4. Update team processes

**Target:** {{MIGRATION_COMPLETION_DATE}}

---

## 7. Tools & Resources

**Backend:**
- {{BACKEND_TOOL_1}}: {{TOOL_1_PURPOSE}}
- {{BACKEND_TOOL_2}}: {{TOOL_2_PURPOSE}}

**Frontend:**
- {{FRONTEND_TOOL_1}}: {{TOOL_1_PURPOSE}}
- {{FRONTEND_TOOL_2}}: {{TOOL_2_PURPOSE}}

**Documentation:**
- Contract specs: `{{CONTRACT_DOCS_PATH}}`
- Pattern library: `{{DOCS_DIR}}/patterns/api_contract_pattern.md`
- Type generation: `{{TYPE_GEN_DOCS}}`

---

## 8. Success Metrics

**Contract Coverage:** {{CURRENT_COVERAGE}}% of endpoints have contracts  
**Target:** 100% coverage by {{TARGET_DATE}}

**Type Safety:**
- Backend validation failures: {{BACKEND_FAILURES}}/month
- Frontend type errors: {{FRONTEND_ERRORS}}/month
- Integration bugs: {{INTEGRATION_BUGS}}/month

**Developer Experience:**
- Time to add new endpoint: {{AVG_TIME_NEW}}
- Time to modify endpoint: {{AVG_TIME_MODIFY}}
- Breaking changes caught pre-production: {{BREAKING_CHANGES_CAUGHT}}%

---

## Conclusion

API contracts are not optional. They are the foundation of reliable frontend-backend integration.

**Without contracts:** Hope-based integration  
**With contracts:** Guaranteed alignment

Every endpoint. Every time. No exceptions.

<!-- 
CLINE CUSTOMIZATION CHECKLIST:
- [ ] Choose API contract approach (OpenAPI/GraphQL/JSON Schema/Custom)
- [ ] Delete unused approach sections
- [ ] Fill all {{PLACEHOLDERS}} for chosen approach
- [ ] Define enforcement rules in .clinerules
- [ ] Add to MCP server tools if needed
- [ ] Update context_master_guide.md reference
- [ ] Create pattern documentation in patterns/
-->
