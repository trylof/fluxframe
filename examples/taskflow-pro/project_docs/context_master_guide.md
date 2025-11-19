# TaskFlow Pro - Context Master Guide

**Project:** TaskFlow Pro  
**Type:** SaaS Task Management Platform  
**Status:** Active Development  
**Last Updated:** November 2025

---

## 1. Philosophy: Documents as the Source of Truth

### Core Principle

**"If it's not in the docs, it doesn't exist."**

All TaskFlow Pro development follows documentation-first methodology. This document is the single source of truth for project context, patterns, and workflows.

### AI Assistant Integration

This document integrates with MCP (Model Context Protocol) to provide context to AI assistants (Cline/Roo). Every development session starts by reading this guide.

---

## 2. Project Overview

### What is TaskFlow Pro?

TaskFlow Pro is a modern task management and team collaboration platform designed for teams of 5-500 people. It combines intuitive task management with AI-powered insights and real-time collaboration.

### Technical Stack

**Backend:**
- Python (FastAPI)
- PostgreSQL
- Redis
- OpenAI API

**Frontend:**
- React + TypeScript
- Tailwind CSS
- React Query

**Infrastructure:**
- Docker
- AWS (EC2, RDS, S3)
- GitHub Actions

### API Contract Approach

**Chosen Approach:** OpenAPI + Pydantic + Auto-Generated TypeScript

All endpoints use explicit Pydantic response models. TypeScript types are auto-generated from the OpenAPI specification. This ensures type safety across the stack and catches breaking changes at compile time.

---

## 3. Development Cycle Workflow

### Before Starting Any Iteration

1. **Check Existing Patterns** via MCP tool: `check_pattern_exists(feature_description)`
2. **Read Current Status** via MCP tool: `get_current_implementation_status()`
3. **Gather Context** via MCP tool: `get_context_for_task(task_type="cycle_start")`
4. **Review API Contracts** in `api_contract_standards.md`

### During Development

- Implement real, working code (no stubs)
- Follow existing patterns exactly
- Validate API contracts before creating endpoints
- Write tests that match actual implementation
- Keep frontend and backend types in sync

### After Completing Work

**CRITICAL: Complete ALL steps before marking work done**

1. Update `technical_status.md` (Recently Changed section)
2. Document new patterns in `patterns/` directory
3. Validate all tests pass
4. Update implementation plan status
5. Call MCP tool: `validate_cycle_completion(cycle="X.X")`

---

## 4. Pattern Library

### Pattern Status Levels

- 🟢 **Canonical** - Must follow exactly, no exceptions
- 🟡 **Established** - Strong preference, deviations need justification
- 🔵 **Experimental** - New pattern, being validated

### Current Patterns

**API Patterns:**
- [`api-task-crud-001`](../patterns/api_task_endpoint_pattern.md) - Task CRUD endpoints (🟢 Canonical)

**UI Patterns:**
- [`ui-task-card-001`](../patterns/ui_task_card_pattern.md) - Task card component (🟢 Canonical)

**Data Patterns:**
- [`data-react-query-001`](../patterns/data_react_query_pattern.md) - React Query integration (🟢 Canonical)

### Using Patterns

**Always check patterns BEFORE implementing:**

```
MCP tool: check_pattern_exists(feature_description="creating new task endpoint")
→ Returns: api-task-crud-001
→ Action: Follow pattern exactly
```

---

## 5. Change Request Protocol

### For Bug Fixes and Refinements

**NEVER update documentation during iteration** - only after user confirms the fix works.

**5-Phase Workflow:**

1. **Initialize** - Call `start_change_request(description, change_type, affected_feature, severity)`
2. **Analyze** - Understand root cause, NO code changes yet
3. **Iterate** - Make changes, test, refine
4. **User Confirmation** - WAIT for user to confirm it works
5. **Document** - Call `validate_change_resolution(change_id)`, get checklist, update ALL affected docs

### Documentation After Fix

Once user confirms fix works:
1. Create bug fix document in `bug_fixes/` directory
2. Update `technical_status.md` (Recently Changed)
3. Update patterns if pattern was fixed or revealed
4. Update workflows if logic changed
5. Call `close_change_request(change_id, documentation_file)`

---

## 6. API Contract Standards

### Contract-First Development

**BEFORE creating ANY endpoint:**

1. Read `api_contract_standards.md`
2. Define Pydantic models
3. Add `response_model` parameter
4. Map service data to model explicitly
5. Regenerate TypeScript types
6. Call MCP tool: `validate_api_contracts(endpoints=[...])`

### No Exceptions

- ✅ Every endpoint has Pydantic response model
- ✅ Every endpoint explicitly maps to response model
- ✅ Frontend uses auto-generated TypeScript types
- ✅ No direct fetch() calls in components
- ❌ NO exceptions, even for "simple" endpoints

---

## 7. Testing Requirements

### Test-Implementation Alignment

**Critical Rule:** Tests validate what you ACTUALLY built, not what you PLANNED to build.

### Test Types

1. **Unit Tests** - Individual functions, pure logic
2. **Integration Tests** - API endpoints, database operations
3. **Component Tests** - React components with React Testing Library
4. **E2E Tests** - Full user workflows (limited, high-value paths)

### No Stubs in Production Tests

- Real database queries
- Real API calls (test environment)
- Real component rendering
- Real state management

---

## 8. Current Implementation Status

See [`technical_status.md`](technical_status.md) for:
- Current state of each feature
- Recently completed/changed items
- Known issues and blockers
- Next planned iterations

---

## 9. Session Protocol

### Every AI Assistant Session

**MUST start with these MCP calls:**

```
1. get_context_for_task(task_type="session_start")
2. get_current_implementation_status()
3. Determine interaction type:
   - New cycle → Follow cycle workflow
   - Bug fix → start_change_request()
   - Question → check patterns first
```

### Before ANY Code Changes

```
check_pattern_exists(feature_description="what you're building")
```

### Before Marking Work Complete

```
validate_cycle_completion(cycle="X.X", completed_items=[...])
validate_api_contracts(endpoints=[...]) if endpoints modified
```

---

## 10. Key Project Directories

```
taskflow-pro/
├── backend/
│   ├── models/          # Pydantic models
│   ├── routers/         # API endpoints
│   ├── services/        # Business logic
│   └── tests/           # Backend tests
│
├── frontend/
│   ├── components/      # React components
│   ├── hooks/           # React hooks
│   ├── lib/             # API client, utilities
│   ├── types/           # Auto-generated TypeScript types
│   └── pages/           # Next.js pages
│
└── project_docs/
    ├── context_master_guide.md  # This file
    ├── technical_status.md       # Current state
    ├── implementation_plan.md    # Roadmap
    ├── api_contract_standards.md # API contract details
    └── patterns/                 # Pattern library
```

---

## 11. Critical Rules

### ALWAYS

- ✅ Check patterns before implementing
- ✅ Use MCP tools for context
- ✅ Follow API contract standards
- ✅ Update technical_status.md after changes
- ✅ Write tests that match implementation
- ✅ Use auto-generated TypeScript types

### NEVER

- ❌ Skip pattern check
- ❌ Create endpoints without response_model
- ❌ Use direct fetch() in components
- ❌ Update docs during bug fix iteration
- ❌ Write tests for planned features (only actual)
- ❌ Manual TypeScript type definitions for API responses

---

## 12. Getting Help

### MCP Tools Available

- `get_context_for_task(task_type)` - Context for current work
- `check_pattern_exists(feature_description)` - Find relevant patterns
- `get_current_implementation_status()` - Read technical_status.md
- `validate_api_contracts(endpoints)` - Validate endpoint compliance
- `start_change_request(...)` - Initialize bug fix tracking
- `validate_change_resolution(change_id)` - Get documentation checklist
- `close_change_request(...)` - Mark change as complete

### Documentation Structure

All questions should be answerable from:
1. This master guide (high-level context)
2. Technical status (current state)
3. Implementation plan (roadmap)
4. Pattern library (how to build)
5. API contract standards (API enforcement)

---

**This document is maintained by the development team and AI assistants. All changes must preserve universal principles while updating project-specific details.**

**Last Major Update:** November 2025  
**Next Review:** December 2025