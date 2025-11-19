# How to Document Patterns

**A pattern for creating patterns**

---

## Purpose

This guide teaches you how to create high-quality pattern documentation that your team will actually use. Good pattern docs make developers faster and codebases more consistent.

---

## Anatomy of a Great Pattern

Every pattern document should have these sections:

### 1. Pattern Name & Metadata

```markdown
# [Descriptive Name] Pattern

**Status:** [Experimental | Established | Canonical | Mandatory | Needs Harmonization | Deprecated]
**Category:** [Backend API | Frontend UI | Data | Integration | AI/LLM]
**Last Updated:** [Date]
**Owner:** [Team/Person responsible]
```

**Naming Guidelines:**
- Be specific: "JWT Authentication" not "Auth"
- Use domain language: "Shopping Cart Checkout" not "Process X"
- Avoid jargon when possible
- Make it searchable

### 2. Use Case (The "When")

**Answer:** When should I use this pattern?

**Structure:**
```markdown
## Use Case

**Best for:**
- [Specific scenario 1]
- [Specific scenario 2]

**Not appropriate for:**
- [Scenario where pattern doesn't apply]
- [Alternative pattern for that scenario]

**Example situations:**
- User needs to [do something]
- System must [handle some case]
- Data requires [special handling]
```

**Good Example:**
```markdown
## Use Case

**Best for:**
- Creating new REST API endpoints that return structured data
- Need type safety between backend and frontend
- Want automatic API documentation

**Not appropriate for:**
- Real-time streaming data (use WebSockets pattern instead)
- File uploads >100MB (use chunked upload pattern instead)

**Example situations:**
- User requests list of items
- Frontend needs to submit form data
- Dashboard fetches analytics data
```

**Bad Example:**
```markdown
## Use Case

Use this for APIs.
```

### 3. Implementation (The "How")

**Answer:** How do I implement this pattern?

**Structure:**
```markdown
## Implementation

### Prerequisites
- [Dependency 1]
- [Configuration required]
- [Knowledge needed]

### Step-by-Step Guide

#### Step 1: [First Action]
[Detailed instructions]

```[language]
// Code example
```

#### Step 2: [Second Action]
[Detailed instructions]

```[language]
// Code example
```

### Complete Example

```[language]
// Full working example
// Runnable, copy-pasteable
// Includes imports, setup, teardown
```

### Configuration

```[format]
# Required configuration
[config details]
```
```

**Key Principles:**
- **Be complete:** Include ALL steps, even "obvious" ones
- **Be runnable:** Code examples should work if copy-pasted
- **Be realistic:** Use real-world examples, not foo/bar
- **Show imports:** Don't assume developers know dependencies
- **Include output:** Show what success looks like

**Good Example:**
```markdown
### Step 1: Create Pydantic Response Model

In `backend/models/api_responses.py`, define your response structure:

```python
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class TaskResponse(BaseModel):
    id: str
    title: str
    completed: bool
    due_date: Optional[datetime] = None
    tags: List[str] = []
    
    class Config:
        schema_extra = {
            "example": {
                "id": "task_123",
                "title": "Complete documentation",
                "completed": False,
                "due_date": "2025-12-31T23:59:59Z",
                "tags": ["urgent", "docs"]
            }
        }
```

### Step 2: Add to FastAPI Endpoint

In your router file:

```python
from fastapi import APIRouter, HTTPException
from models.api_responses import TaskResponse
from services.task_service import TaskService

router = APIRouter()

@router.get("/tasks/{task_id}", response_model=TaskResponse)
async def get_task(task_id: str) -> TaskResponse:
    task_data = await TaskService.get_task(task_id)
    
    if not task_data:
        raise HTTPException(status_code=404, detail="Task not found")
    
    # Explicit mapping to Pydantic model
    return TaskResponse(
        id=task_data.id,
        title=task_data.title,
        completed=task_data.is_complete,
        due_date=task_data.deadline,
        tags=task_data.tag_list
    )
```
```

### 4. Pitfalls (The "Watch Out For")

**Answer:** What mistakes do developers commonly make?

**Structure:**
```markdown
## Pitfalls & Common Mistakes

### ❌ Mistake 1: [Common Error]

**Problem:** [What goes wrong]

**Symptom:** [How you know it happened]

**Solution:** [How to fix/avoid]

```[language]
// Bad example
[code showing mistake]

// Good example  
[code showing correct approach]
```

### ❌ Mistake 2: [Another Error]

[Same structure]
```

**Good Example:**
```markdown
### ❌ Mistake 1: Returning Dict Instead of Pydantic Model

**Problem:** Directly returning dictionary from service layer

**Symptom:** TypeScript types aren't generated, no runtime validation

**Bad:**
```python
@router.get("/tasks/{task_id}")
async def get_task(task_id: str):
    return await TaskService.get_task(task_id)  # Returns dict
```

**Good:**
```python
@router.get("/tasks/{task_id}", response_model=TaskResponse)
async def get_task(task_id: str) -> TaskResponse:
    task_data = await TaskService.get_task(task_id)
    return TaskResponse(**task_data)  # Explicit model
```

### ❌ Mistake 2: Optional Fields Without Defaults

**Problem:** Pydantic requires defaults for optional fields

**Symptom:** ValidationError at runtime

**Bad:**
```python
class TaskResponse(BaseModel):
    id: str
    tags: Optional[List[str]]  # Missing default!
```

**Good:**
```python
class TaskResponse(BaseModel):
    id: str
    tags: Optional[List[str]] = None  # Or = []
```
```

### 5. Testing (The "Validate")

**Answer:** How do I test code using this pattern?

**Structure:**
```markdown
## Testing

### Test Strategy

[Overall approach to testing this pattern]

### Unit Test Example

```[language]
// Example unit test
// Shows what to assert
// Includes setup and teardown
```

### Integration Test Example

```[language]
// Example integration test
// Tests pattern in context
```

### What to Validate

- [ ] [Requirement 1]
- [ ] [Requirement 2]
- [ ] [Edge case 1]

### Test Data

[Example test data that works with the pattern]
```

**Good Example:**
```markdown
## Testing

### Test Strategy

1. **Unit tests:** Validate Pydantic model validation
2. **Integration tests:** Test endpoint returns correct model
3. **Contract tests:** Verify OpenAPI spec matches implementation

### Unit Test Example

```python
import pytest
from models.api_responses import TaskResponse
from pydantic import ValidationError

def test_task_response_valid():
    task = TaskResponse(
        id="task_123",
        title="Test task",
        completed=False
    )
    assert task.id == "task_123"
    assert task.tags == []  # Default value

def test_task_response_invalid():
    with pytest.raises(ValidationError):
        TaskResponse(
            # Missing required 'id' field
            title="Test task",
            completed=False
        )
```

### Integration Test Example

```python
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_get_task_returns_valid_model():
    response = client.get("/tasks/task_123")
    
    assert response.status_code == 200
    data = response.json()
    
    # Validate against Pydantic model
    task = TaskResponse(**data)
    assert task.id == "task_123"
```

### What to Validate

- [ ] Required fields present
- [ ] Optional fields have defaults
- [ ] Type conversion works (str → datetime)
- [ ] Invalid data raises ValidationError
- [ ] OpenAPI spec generated correctly
```

### 6. References (The "Learn More")

**Structure:**
```markdown
## References

### Used In
- [`backend/api/tasks.py`](../../backend/api/tasks.py) - Task endpoints
- [`backend/api/projects.py`](../../backend/api/projects.py) - Project endpoints

### Related Patterns
- [API Authentication Pattern](./api_authentication_pattern.md) - How to secure these endpoints
- [Error Handling Pattern](./error_handling_pattern.md) - Handling failures

### External Resources
- [Pydantic Documentation](https://docs.pydantic.dev/)
- [FastAPI Response Models](https://fastapi.tiangolo.com/tutorial/response-model/)

### Migration Guide

If upgrading from previous approach:

#### Before (Dict Returns)
```python
@router.get("/tasks/{id}")
def get_task(id: str):
    return task_service.get(id)
```

#### After (Pydantic Model)
```python
@router.get("/tasks/{id}", response_model=TaskResponse)
def get_task(id: str) -> TaskResponse:
    data = task_service.get(id)
    return TaskResponse(**data)
```
```

---

## Pattern Documentation Checklist

**Before publishing pattern, verify:**

- [ ] **Clear name:** Descriptive and searchable
- [ ] **Status set:** Appropriate for maturity level
- [ ] **Use case defined:** When to use, when NOT to use
- [ ] **Complete implementation:** All steps, working code
- [ ] **Pitfalls documented:** Common mistakes with solutions
- [ ] **Testing guide:** How to validate correctness
- [ ] **References:** Links to usage, related patterns
- [ ] **Examples runnable:** Code can be copy-pasted
- [ ] **Realistic examples:** Real-world, not foo/bar
- [ ] **No broken links:** All cross-references work

---

## Pattern Evolution Guide

### Promoting Pattern Status

```
Experimental (3 uses) → Established (refined, no major issues)
Established (team consensus) → Canonical (reference implementation)
Canonical (critical for quality) → Mandatory (required by rules)
```

**Update documentation when promoting:**
- Expand examples
- Add more pitfalls discovered
- Document edge cases
- Add test scenarios
- Update "Used In" references

### Deprecating Patterns

**When to deprecate:**
- Better pattern discovered
- Technology changed (e.g., React class → functional components)
- Security vulnerability
- Performance issues

**How to deprecate:**
1. Change status to Deprecated
2. Add deprecation notice at top
3. Document replacement pattern
4. Provide migration guide
5. Set removal date (if applicable)

**Example:**
```markdown
# Class Component Pattern

**Status:** ❌ Deprecated (Use [Functional Component Pattern](./functional_component_pattern.md) instead)

**Deprecated on:** 2024-01-01  
**Removal date:** 2024-06-01

---

⚠️ **DEPRECATION NOTICE**

This pattern is deprecated. New code should use [Functional Component Pattern](./functional_component_pattern.md) with hooks.

**Migration:** See [Class to Functional Migration Guide](#migration-guide)

---
```

---

## Style Guide

### Writing Style

- **Be concise:** Every word should add value
- **Be specific:** "Use Pydantic" not "Use validation"
- **Be practical:** Focus on "how" not "why" (save philosophy for README)
- **Be complete:** Include ALL necessary steps

### Code Style

- **Use syntax highlighting:** Specify language in code blocks
- **Include comments:** Explain non-obvious parts
- **Show imports:** Don't assume knowledge
- **Be consistent:** Same naming, indentation throughout

### Formatting

- **Use headers:** H2 for sections, H3 for subsections
- **Use lists:** Easier to scan than paragraphs
- **Use code blocks:** Not inline code for multi-line examples
- **Use callouts:** ❌ for bad, ✅ for good, ⚠️ for warnings

---

## Template Usage

**Use the provided template:**

1. Copy [`pattern_template.md`](./pattern_template.md)
2. Rename to `[descriptive_name]_pattern.md`
3. Fill in ALL sections
4. Delete placeholder text
5. Add runnable examples
6. Test all code examples
7. Get review from team
8. Publish to pattern library

---

## Common Documentation Mistakes

### ❌ Incomplete Examples

**Bad:**
```markdown
Use this pattern like:
```python
response = make_api_call()
```
```

**Good:**
```markdown
Complete example:

```python
from fastapi import APIRouter, HTTPException
from models.api_responses import TaskResponse

router = APIRouter()

@router.get("/tasks/{task_id}", response_model=TaskResponse)
async def get_task(task_id: str) -> TaskResponse:
    # ... complete, runnable code
```
```

### ❌ Vague Use Cases

**Bad:**
```markdown
Use this pattern for data access.
```

**Good:**
```markdown
## Use Case

**Best for:**
- Fetching single entities by ID
- Need to join across 2-3 tables
- Response must include RBAC filtering

**Not appropriate for:**
- Bulk data exports (use batch pattern)
- Real-time data (use change streams)
```

### ❌ Missing Pitfalls

**Bad:**
```markdown
Just follow the implementation guide.
```

**Good:**
```markdown
## Pitfalls

### ❌ N+1 Query Problem

**Problem:** Loading related data in loop

**Symptom:** Hundreds of database queries

**Solution:** Use eager loading or batch fetching
```

---

## Quality Checklist

**Great pattern documentation:**

✅ Can be understood by new team member  
✅ Code examples work if copy-pasted  
✅ Covers common mistakes  
✅ Explains when NOT to use pattern  
✅ Includes testing guidance  
✅ Links to real usage examples  
✅ Has realistic examples (not foo/bar)  
✅ Maintained as pattern evolves  

**Poor pattern documentation:**

❌ Assumes too much knowledge  
❌ Has broken code examples  
❌ Skips pitfalls section  
❌ No guidance on limitations  
❌ No testing section  
❌ No cross-references  
❌ Generic examples only  
❌ Never updated  

---

## Key Takeaways

1. **Documentation is FOR developers** - Make it useful, not academic
2. **Examples must work** - Test all code before publishing
3. **Show mistakes** - Pitfalls section prevents common errors
4. **Evolve patterns** - Update docs as pattern matures
5. **Link everything** - Cross-reference patterns and usage

**Good pattern docs make developers faster. Invest the time.**

---

**Next Steps:**
1. Use [`pattern_template.md`](./pattern_template.md) for new patterns
2. Review existing patterns against this guide
3. Update incomplete patterns
4. Get team feedback on documentation quality

**Related:**
- [`pattern_template.md`](./pattern_template.md) - Template to copy
- [`../README.md`](../README.md) - Pattern library overview
- [`harmonization_tracking.md`](./harmonization_tracking.md) - Managing inconsistencies