# AGENTS.md - TaskFlow Pro Agent Guidelines

## Project Overview

**TaskFlow Pro** - A task management platform for distributed teams with AI-powered prioritization.

## Tech Stack

- **Backend:** Python (FastAPI)
- **Frontend:** React + TypeScript
- **Database:** PostgreSQL
- **Other:** Redis, OpenAI API

## Key Directories

```
examples/taskflow-pro/
├── patterns/
├── project_docs/
├── backend/
└── frontend/
```

## Commands

| Action | Command |
|--------|---------|
| Build | `npm run build` |
| Test | `pytest && npm test` |
| Lint | `npm run lint` |
| Dev Server | `npm run dev` |

---

## FluxFrame Development Methodology

This project follows the FluxFrame development methodology.

### Core Principles

1. **Documentation as Source of Truth** - `project_docs/context_master_guide.md` contains all project rules.
2. **Pattern-Driven Development** - Check existing patterns before implementing.
3. **Systematic Development Cycles** - Work in defined iterations.
4. **Test-Implementation Alignment** - Tests validate actual behavior.

---

## Development Workflow

### Before Any Implementation

1. **Read Context** - Review `project_docs/context_master_guide.md`.
2. **Check Patterns** - Search `patterns/` for existing solutions.
3. **Read Status** - Check `project_docs/technical_status.md`.

### During Implementation

- **Build Real Components** - No stubs or mocks in production code.
- **Ensure Visible Results** - Every change should be demonstrable.
- **Follow Existing Patterns** - Consistency over cleverness.

### After Implementation

1. **Get User Confirmation** - Never document until user confirms.
2. **Update ALL Affected Documentation** - technical_status.md, patterns/, etc.

---

## API Contracts (MANDATORY)

- ALL endpoints MUST use Pydantic response models.
- ALL endpoints MUST have `response_model` parameter.
- Frontend MUST use `apiClient` and auto-generated types.
- NO direct fetch calls in components.

---

## Customization Guide

For tool-specific features, this project supports:
- **Claude Code:** Uses `@AGENTS.md` and path rules.
- **Roo Code:** Uses custom modes.
- **Cline:** Uses modular rules in `.clinerules/`.
