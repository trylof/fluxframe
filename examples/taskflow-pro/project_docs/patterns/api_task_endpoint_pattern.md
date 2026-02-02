# API Pattern: Task CRUD Endpoint (OpenAPI Approach)

**Pattern ID:** `api-task-crud-001`  
**Status:** 🟢 Canonical  
**Category:** Backend API  
**Created:** November 2025  
**Last Updated:** November 2025

---

## Use Case

Creating RESTful CRUD endpoints for the Task resource with full OpenAPI contract enforcement.

---

## Context

TaskFlow Pro uses OpenAPI + Pydantic + Auto-Generated TypeScript for all API endpoints. This pattern shows how to implement a complete CRUD endpoint following our contract-first approach.

---

## Implementation

### 1. Define Pydantic Models

```python
# backend/models/task.py
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

class TaskPriority(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    URGENT = "urgent"

class TaskStatus(str, Enum):
    TODO = "todo"
    IN_PROGRESS = "in_progress"
    DONE = "done"
    ARCHIVED = "archived"

class TaskBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = Field(None, max_length=2000)
    priority: TaskPriority = TaskPriority.MEDIUM
    status: TaskStatus = TaskStatus.TODO
    assignee_id: Optional[int] = None
    project_id: int
    due_date: Optional[datetime] = None
    tags: List[str] = Field(default_factory=list)

class TaskCreate(TaskBase):
    """Request model for creating a task"""
    pass

class TaskUpdate(BaseModel):
    """Request model for updating a task (all fields optional)"""
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = None
    priority: Optional[TaskPriority] = None
    status: Optional[TaskStatus] = None
    assignee_id: Optional[int] = None
    due_date: Optional[datetime] = None
    tags: Optional[List[str]] = None

class TaskResponse(TaskBase):
    """Response model for a task"""
    id: int
    created_at: datetime
    updated_at: datetime
    created_by_id: int
    
    class Config:
        from_attributes = True  # Allows creation from ORM objects
```

### 2. Implement Endpoint with Explicit Response Model

```python
# backend/routers/tasks.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from backend.models.task import TaskCreate, TaskUpdate, TaskResponse
from backend.database import get_db
from backend.services.task_service import TaskService
from backend.dependencies import get_current_user

router = APIRouter(prefix="/api/tasks", tags=["tasks"])

@router.post(
    "/",
    response_model=TaskResponse,  # ✅ EXPLICIT response model
    status_code=status.HTTP_201_CREATED,
    summary="Create a new task"
)
async def create_task(
    task_data: TaskCreate,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> TaskResponse:
    """
    Create a new task.
    
    - **title**: Task title (required)
    - **description**: Detailed description (optional)
    - **priority**: Priority level (default: medium)
    - **project_id**: Parent project ID (required)
    
    Returns the created task with assigned ID and timestamps.
    """
    service = TaskService(db)
    task = service.create_task(task_data, user_id=current_user["id"])
    
    # ✅ EXPLICIT mapping to response model
    return TaskResponse.from_orm(task)

@router.get(
    "/{task_id}",
    response_model=TaskResponse,  # ✅ EXPLICIT response model
    summary="Get a task by ID"
)
async def get_task(
    task_id: int,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> TaskResponse:
    """Get a single task by ID."""
    service = TaskService(db)
    task = service.get_task(task_id, user_id=current_user["id"])
    
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task {task_id} not found"
        )
    
    # ✅ EXPLICIT mapping to response model
    return TaskResponse.from_orm(task)

@router.get(
    "/",
    response_model=List[TaskResponse],  # ✅ EXPLICIT response model
    summary="List tasks"
)
async def list_tasks(
    project_id: Optional[int] = None,
    status: Optional[TaskStatus] = None,
    assignee_id: Optional[int] = None,
    skip: int = 0,
    limit: int = 100,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> List[TaskResponse]:
    """
    List tasks with optional filtering.
    
    - **project_id**: Filter by project
    - **status**: Filter by status
    - **assignee_id**: Filter by assignee
    """
    service = TaskService(db)
    tasks = service.list_tasks(
        user_id=current_user["id"],
        project_id=project_id,
        status=status,
        assignee_id=assignee_id,
        skip=skip,
        limit=limit
    )
    
    # ✅ EXPLICIT mapping to response model
    return [TaskResponse.from_orm(task) for task in tasks]

@router.put(
    "/{task_id}",
    response_model=TaskResponse,  # ✅ EXPLICIT response model
    summary="Update a task"
)
async def update_task(
    task_id: int,
    task_data: TaskUpdate,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> TaskResponse:
    """Update an existing task."""
    service = TaskService(db)
    task = service.update_task(
        task_id,
        task_data,
        user_id=current_user["id"]
    )
    
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task {task_id} not found"
        )
    
    # ✅ EXPLICIT mapping to response model
    return TaskResponse.from_orm(task)

@router.delete(
    "/{task_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a task"
)
async def delete_task(
    task_id: int,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Soft delete a task."""
    service = TaskService(db)
    success = service.delete_task(task_id, user_id=current_user["id"])
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task {task_id} not found"
        )
    
    return None  # 204 No Content
```

### 3. Frontend API Client

```typescript
// frontend/lib/apiClient.ts
import { TaskResponse, TaskCreate, TaskUpdate } from '../types/api';

class TaskAPI {
  private baseURL = '/api/tasks';

  async createTask(data: TaskCreate): Promise<TaskResponse> {
    const response = await fetch(this.baseURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create task: ${response.statusText}`);
    }
    
    return response.json();
  }

  async getTask(taskId: number): Promise<TaskResponse> {
    const response = await fetch(`${this.baseURL}/${taskId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to get task: ${response.statusText}`);
    }
    
    return response.json();
  }

  async listTasks(filters?: {
    projectId?: number;
    status?: string;
    assigneeId?: number;
  }): Promise<TaskResponse[]> {
    const params = new URLSearchParams();
    if (filters?.projectId) params.append('project_id', filters.projectId.toString());
    if (filters?.status) params.append('status', filters.status);
    if (filters?.assigneeId) params.append('assignee_id', filters.assigneeId.toString());
    
    const response = await fetch(`${this.baseURL}?${params}`);
    
    if (!response.ok) {
      throw new Error(`Failed to list tasks: ${response.statusText}`);
    }
    
    return response.json();
  }

  async updateTask(taskId: number, data: TaskUpdate): Promise<TaskResponse> {
    const response = await fetch(`${this.baseURL}/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update task: ${response.statusText}`);
    }
    
    return response.json();
  }

  async deleteTask(taskId: number): Promise<void> {
    const response = await fetch(`${this.baseURL}/${taskId}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete task: ${response.statusText}`);
    }
  }
}

export const taskAPI = new TaskAPI();
```

### 4. React Hook Usage

```typescript
// frontend/hooks/useTask.ts
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { taskAPI } from '../lib/apiClient';
import { TaskCreate, TaskUpdate } from '../types/api';

export function useTask(taskId: number) {
  return useQuery(['task', taskId], () => taskAPI.getTask(taskId));
}

export function useTasks(filters?: { projectId?: number }) {
  return useQuery(['tasks', filters], () => taskAPI.listTasks(filters));
}

export function useCreateTask() {
  const queryClient = useQueryClient();
  
  return useMutation(
    (data: TaskCreate) => taskAPI.createTask(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tasks');
      }
    }
  );
}

export function useUpdateTask() {
  const queryClient = useQueryClient();
  
  return useMutation(
    ({ taskId, data }: { taskId: number; data: TaskUpdate }) => 
      taskAPI.updateTask(taskId, data),
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(['task', variables.taskId]);
        queryClient.invalidateQueries('tasks');
      }
    }
  );
}
```

---

## Testing

### Unit Test (Backend)

```python
# tests/test_task_routes.py
import pytest
from fastapi.testclient import TestClient

def test_create_task(client: TestClient, auth_headers: dict):
    """Test task creation endpoint"""
    task_data = {
        "title": "Implement user authentication",
        "description": "Add JWT-based auth",
        "priority": "high",
        "project_id": 1
    }
    
    response = client.post(
        "/api/tasks/",
        json=task_data,
        headers=auth_headers
    )
    
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == task_data["title"]
    assert data["priority"] == "high"
    assert "id" in data
    assert "created_at" in data

def test_get_task(client: TestClient, auth_headers: dict, sample_task: dict):
    """Test getting a single task"""
    response = client.get(
        f"/api/tasks/{sample_task['id']}",
        headers=auth_headers
    )
    
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == sample_task["id"]
    assert data["title"] == sample_task["title"]
```

---

## Common Pitfalls

### ❌ Missing Response Model
```python
# DON'T DO THIS
@router.post("/")
async def create_task(task_data: TaskCreate):
    return service.create_task(task_data)  # No explicit response model!
```

### ✅ Explicit Response Model
```python
# DO THIS
@router.post("/", response_model=TaskResponse)
async def create_task(task_data: TaskCreate) -> TaskResponse:
    task = service.create_task(task_data)
    return TaskResponse.from_orm(task)
```

### ❌ Direct Database Model Return
```python
# DON'T DO THIS
@router.get("/{id}")
async def get_task(id: int):
    return db_session.query(Task).get(id)  # Exposes internal fields!
```

### ✅ Explicit Response Model Mapping
```python
# DO THIS
@router.get("/{id}", response_model=TaskResponse)
async def get_task(id: int) -> TaskResponse:
    task = db_session.query(Task).get(id)
    return TaskResponse.from_orm(task)
```

---

## Related Patterns

- [`frontend-api-client-pattern`](frontend_api_client_pattern.md) - Frontend API client structure
- [`data-validation-pattern`](data_validation_pattern.md) - Request validation patterns
- [`error-handling-pattern`](error_handling_pattern.md) - Consistent error responses

---

## API Contract Compliance

✅ **OpenAPI Spec:** Auto-generated from Pydantic models  
✅ **TypeScript Types:** Auto-generated from OpenAPI  
✅ **Response Models:** All endpoints have explicit `response_model`  
✅ **Contract Validation:** Type checking enforced at compile time  
✅ **Documentation:** Auto-generated API docs available at `/docs`

---

## Notes

- This pattern is **Canonical** - all task-related endpoints MUST follow this structure
- Always use `response_model` parameter in route decorators
- Always explicitly map service results to response models
- Never return database models directly
- Frontend MUST use auto-generated types from OpenAPI spec
- Breaking changes to models will be caught at TypeScript compilation

---

**Last Reviewed:** November 2025  
**Review Frequency:** Quarterly