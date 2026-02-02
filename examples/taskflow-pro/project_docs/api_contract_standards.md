# API Contract Standards - TaskFlow Pro

**Chosen Approach:** OpenAPI + Pydantic + Auto-Generated TypeScript
**Status:** Enforced
**Last Updated:** February 2026

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

**As of November 2025, ALL API endpoints in TaskFlow Pro must:**
1. Have an explicit, documented contract
2. Validate responses against that contract
3. Generate types from that contract
4. Fail fast on contract violations

**If an endpoint doesn't have a contract, it's not production-ready.**

---

## 2. Chosen Approach: OpenAPI + Pydantic + Auto-Generated TypeScript

**Best for:** Python/FastAPI backend + TypeScript/React frontend

### How It Works

1. **Backend:** Define Pydantic models in `backend/models/`
2. **Backend:** Add `response_model` parameter to FastAPI endpoints
3. **Backend:** FastAPI auto-generates OpenAPI spec from Pydantic models
4. **Frontend:** Generate TypeScript types from OpenAPI spec
5. **Frontend:** Use typed API client for all requests

### The Contract Chain

```
Backend Pydantic Model
  → OpenAPI Specification
    → TypeScript Types
      → API Client
        → React Query Hooks
          → Components
```

Every link is type-safe. Breaking changes caught at compile time.

### Implementation Guide

**Backend Setup:**

```python
# backend/models/task.py
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    priority: int = 2
    due_date: Optional[datetime] = None

class TaskCreate(TaskBase):
    project_id: int

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[int] = None
    status: Optional[str] = None
    due_date: Optional[datetime] = None

class TaskResponse(TaskBase):
    id: int
    status: str
    project_id: int
    assignee_id: Optional[int]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# backend/routers/tasks.py
from fastapi import APIRouter
from ..models.task import TaskCreate, TaskResponse
from ..services.task_service import TaskService

router = APIRouter()

@router.post("/tasks", response_model=TaskResponse)
async def create_task(task: TaskCreate) -> TaskResponse:
    # Service returns ORM model or dict
    db_task = await TaskService.create(task)

    # ALWAYS map explicitly to Pydantic model
    return TaskResponse(
        id=db_task.id,
        title=db_task.title,
        description=db_task.description,
        priority=db_task.priority,
        status=db_task.status,
        project_id=db_task.project_id,
        assignee_id=db_task.assignee_id,
        due_date=db_task.due_date,
        created_at=db_task.created_at,
        updated_at=db_task.updated_at,
    )
```

**Frontend Setup:**

```bash
# Generate TypeScript types from OpenAPI spec
npm run generate-types
# This runs: openapi-typescript http://localhost:8000/openapi.json -o frontend/types/api.ts
```

```typescript
// frontend/lib/api.ts
import type { paths } from '../types/api';

export class APIClient {
  private baseURL: string;

  constructor(baseURL: string = '/api') {
    this.baseURL = baseURL;
  }

  async createTask(
    task: paths['/tasks']['post']['requestBody']['content']['application/json']
  ): Promise<paths['/tasks']['post']['responses']['200']['content']['application/json']> {
    const response = await fetch(`${this.baseURL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new APIClientError(response.status, await response.text());
    }

    return response.json();
  }
}

export class APIClientError extends Error {
  constructor(public status: number, public body: string) {
    super(`API Error ${status}: ${body}`);
  }
}

export const apiClient = new APIClient();
```

### Enforcement Rules

**Backend MUST:**
- ✅ All endpoints have `response_model` parameter
- ✅ All responses explicitly mapped to Pydantic models
- ✅ No dict returns (except for pass-through from trusted sources)
- ✅ Return type annotations match response_model

**Frontend MUST:**
- ✅ Use `apiClient` from `frontend/lib/api.ts`
- ✅ Use auto-generated types from `frontend/types/`
- ✅ NO direct `fetch()` calls in components
- ✅ NO manual type definitions duplicating API types

**Workflow MUST:**
1. Define Pydantic model
2. Add to endpoint
3. Regenerate frontend types
4. Update API client if needed
5. Use in components

### Benefits Delivered

- ✅ Runtime validation on backend (Pydantic catches invalid data)
- ✅ Compile-time validation on frontend (TypeScript catches type errors)
- ✅ Auto-generated API documentation (OpenAPI spec always accurate)
- ✅ Perfect IDE autocomplete (types extracted from backend)
- ✅ Breaking changes caught immediately (regenerate types → TypeScript errors)

---

## 3. Development Workflow

**BEFORE creating ANY endpoint:**

1. **Define Contract**
   - Create Pydantic models for request/response
   - Document expected fields and types
   - Define validation rules

2. **Backend Implementation**
   - Implement endpoint with `response_model`
   - Map service data to contract model
   - Add validation decorators

3. **Generate/Update Frontend Types**
   - Run `npm run generate-types`
   - Verify types generated correctly

4. **Frontend Implementation**
   - Use typed API client
   - Use generated types in components
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
1. Create Pydantic models (Request + Response)
2. Add endpoint with response_model parameter
3. Implement service logic
4. Run npm run generate-types
5. Test contract compliance
```

### Modifying Existing Endpoint

```
1. Update Pydantic model first
2. Check for breaking changes (removed/renamed fields)
3. Update backend implementation
4. Regenerate frontend types
5. Fix TypeScript errors (breaking changes surface here)
6. Update components using endpoint
```

### Handling Breaking Changes

**Strategy:** Deprecation with clear migration path

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
- ✅ TypeScript compiles without errors
- ✅ Tests cover new endpoints

**In your AI Assistant rules (AGENTS.md):**
- Contract-first workflow enforced
- Direct fetch() calls rejected
- Manual type definitions flagged

**In CI/CD:**
- TypeScript strict mode compilation
- API contract validation tests

---

## 6. Tools & Resources

**Backend:**
- Pydantic: Schema definition and validation
- FastAPI: Auto OpenAPI spec generation

**Frontend:**
- openapi-typescript: Generate types from spec
- React Query: Type-safe data fetching

**Documentation:**
- Contract specs: Auto-generated at `/docs`
- Pattern library: `patterns/api_task_endpoint_pattern.md`
- Type generation: `npm run generate-types`

---

## 7. Success Metrics

**Contract Coverage:** 100% of endpoints have contracts
**Target:** Maintained at 100%

**Type Safety:**
- Backend validation failures: 0/month (Pydantic catches in dev)
- Frontend type errors: 0 in production (TypeScript catches in CI)
- Integration bugs: Minimal (contracts prevent mismatches)

**Developer Experience:**
- Time to add new endpoint: Reduced (patterns + types)
- Time to modify endpoint: Safe (types catch breaking changes)
- Breaking changes caught pre-production: 100%

---

## Conclusion

API contracts are not optional. They are the foundation of reliable frontend-backend integration.

**Without contracts:** Hope-based integration
**With contracts:** Guaranteed alignment

Every endpoint. Every time. No exceptions.
