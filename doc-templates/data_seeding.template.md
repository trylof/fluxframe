# {{PROJECT_NAME}} - Seed Data & Test Fixtures

<!--
INSTRUCTIONS FOR AI ASSISTANT:
This template creates the seed_data/README.md file.
Fill {{PLACEHOLDERS}} based on the project questionnaire responses.
Adjust sections based on Q-Data answer (Full/Basic/Minimal).
-->

## Purpose

This directory contains reference data for:

1. **AI Context** - Sample data that helps AI agents understand your domain when building features
2. **Automated Testing** - Test fixtures for unit, integration, and e2e tests
3. **Local Development** - Realistic data for UI rendering and feature development

**Philosophy:** Good seed data bridges the gap between abstract requirements and concrete implementation. When AI agents can see real examples of your domain entities, they build better features faster.

---

## Directory Structure

```
seed_data/
├── README.md           # This file - explains the seed data system
├── fixtures/           # Test fixtures (deterministic, versioned)
│   └── {{FIXTURE_FILES}}
├── samples/            # Sample data for AI context & development
│   └── {{SAMPLE_FILES}}
├── factories/          # Data factory functions (programmatic generation)
│   └── {{FACTORY_FILES}}
└── schemas/            # Data schemas/types (optional validation)
    └── {{SCHEMA_FILES}}
```

### Directory Purposes

| Directory | Purpose | When to Use |
|-----------|---------|-------------|
| `fixtures/` | Deterministic test data with known values | Unit tests, snapshot tests, integration tests |
| `samples/` | Representative examples of domain entities | AI context, UI development, documentation |
| `factories/` | Functions that generate random/varied data | Stress testing, bulk data, variable scenarios |
| `schemas/` | JSON Schema or TypeScript types for validation | Contract validation, fixture validation |

---

## How to Use Seed Data

### For AI Agents

When asking an AI to build a feature, point it to relevant sample data:

```
"Build a task list component. See seed_data/samples/tasks.json for example task objects."
```

This gives the AI concrete understanding of:
- Field names and types
- Data relationships
- Edge cases and variations

### For Tests

Import fixtures directly in your test files:

```{{LANGUAGE}}
{{TEST_IMPORT_EXAMPLE}}
```

### For Development

Use sample data to populate your development environment:

```{{LANGUAGE}}
{{DEV_IMPORT_EXAMPLE}}
```

---

## Adding New Seed Data

### When to Add

Add seed data when:
- Creating a new domain entity
- Adding a feature that needs realistic data
- Writing tests that require specific data states
- Discovering edge cases that should be documented

### Fixture Guidelines

1. **Use descriptive names**: `user_admin.json`, `task_overdue.json`, `order_cancelled.json`
2. **Include comments**: Document why certain values were chosen
3. **Cover edge cases**: Empty lists, null values, maximum lengths
4. **Keep them small**: Fixtures should be minimal but complete

### Sample Data Guidelines

1. **Be realistic**: Use plausible names, dates, amounts
2. **Show variety**: Include different states, types, categories
3. **Document relationships**: Show how entities connect
4. **Update regularly**: Keep samples aligned with current schema

---

## Data Format Conventions

**Primary format:** {{DATA_FORMAT}}

### File Naming

- `{entity}_{variant}.json` - Specific fixture (e.g., `user_admin.json`)
- `{entity}s.json` - Collection fixture (e.g., `users.json`)
- `{entity}.sample.json` - Sample for AI/dev (e.g., `task.sample.json`)
- `{entity}.factory.{{FACTORY_EXT}}` - Factory function (e.g., `user.factory.ts`)

### JSON Fixtures

```json
{
  "_meta": {
    "description": "What this fixture represents",
    "created": "{{TODAY_DATE}}",
    "updated": "{{TODAY_DATE}}"
  },
  "data": {
    // Actual fixture data here
  }
}
```

---

## Integration with Tests

### Recommended Testing Pattern

```{{LANGUAGE}}
{{TESTING_PATTERN_EXAMPLE}}
```

---

## Relationship to Pattern Library

Seed data complements the pattern library (`{{DOCS_DIR}}/patterns/`):

- **Patterns** describe *how* to implement features
- **Seed data** provides *what* the data looks like

When establishing a new pattern, also add corresponding seed data examples.

---

## Maintenance

### Update Triggers

Update seed data when:
- Schema changes (add/remove fields)
- New entity types added
- Business rules change
- Edge cases discovered during development

### Validation

{{VALIDATION_INSTRUCTIONS}}

---

## Notes

- Seed data should NOT contain real user data or production secrets
- Keep fixtures small and focused - avoid bloated test data
- Version control all seed data - it's part of the codebase
- Consider seeding your local database from `fixtures/` for consistent dev environments
