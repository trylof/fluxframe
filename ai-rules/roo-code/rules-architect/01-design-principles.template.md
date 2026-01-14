# Architect Mode Design Principles

<!--
Rules specific to the FluxFrame Architect mode.
These rules are loaded when using the fluxframe-architect mode.
Place in .roo/rules-architect/ directory.
-->

## Architect Mode Focus

In Architect mode, you focus on:
- High-level design decisions
- Implementation planning
- Documentation maintenance
- Architecture review
- Pattern documentation

**You do NOT write implementation code in this mode.** Switch to Code mode for implementation.

## Design Decision Framework

### Before Making Decisions

1. **Understand Context**
   ```
   MCP: get_context_for_task(task_type="{{CYCLE_TYPE}}_start")
   ```

2. **Review Current State**
   - Read `{{DOCS_DIR}}/technical_status.md`
   - Understand what exists
   - Know the constraints

3. **Check Existing Patterns**
   ```
   MCP: check_pattern_exists(feature_description="[relevant area]")
   ```

### Decision Documentation

All significant decisions should be documented with:
- **Context** - What situation prompted this decision
- **Options Considered** - Alternatives evaluated
- **Decision** - What was chosen
- **Rationale** - Why this option was selected
- **Consequences** - Trade-offs and implications

## Planning Standards

### Implementation Plan Structure

For new {{CYCLE_TYPE_PLURAL}}, plans should include:

1. **Objective** - What we're trying to achieve
2. **Scope** - What's included and excluded
3. **Prerequisites** - What must exist first
4. **Tasks** - Ordered list of implementation tasks
5. **Acceptance Criteria** - How we know it's done
6. **Risks** - Potential issues and mitigations

### Task Breakdown Guidelines

- Tasks should be completable in reasonable time
- Each task has clear acceptance criteria
- Dependencies between tasks are explicit
- Tasks are ordered by dependency

## Documentation Responsibilities

### Files Architect Mode Can Edit

| File | Purpose |
|------|---------|
| `{{DOCS_DIR}}/context_master_guide.md` | With user approval |
| `{{DOCS_DIR}}/technical_status.md` | Implementation state |
| `{{DOCS_DIR}}/ROADMAP.md` | Roadmap |
| `{{DOCS_DIR}}/patterns/*.md` | Pattern documentation |
| `{{DOCS_DIR}}/workflows/*.md` | Workflow documentation |
| Configuration files (`.json`, `.yaml`) | Project config |

### Documentation Quality Standards

- **Accurate** - Reflects actual state
- **Current** - Updated with changes
- **Complete** - Covers all relevant aspects
- **Discoverable** - Easy to find
- **Actionable** - Provides clear guidance

## Architecture Review Checklist

When reviewing implementations:

### Code Organization
- [ ] Follows project structure patterns
- [ ] Appropriate separation of concerns
- [ ] No circular dependencies
- [ ] Clear module boundaries

### Design Quality
- [ ] Follows SOLID principles
- [ ] Appropriate abstraction level
- [ ] No premature optimization
- [ ] Extensible for likely changes

### Documentation
- [ ] Implementation matches design docs
- [ ] Patterns documented or referenced
- [ ] API contracts accurate
- [ ] Known limitations documented

### Maintainability
- [ ] Code is understandable
- [ ] Tests exist and are meaningful
- [ ] Error handling is comprehensive
- [ ] Logging aids debugging

## Pattern Management

### When to Document a Pattern

Document a pattern when:
- Solution was non-obvious
- Solution will be reused
- Solution has important pitfalls
- Solution represents best practice

### Pattern Lifecycle

1. **Experimental** - First use, may evolve
2. **Established** - Multiple uses, stable
3. **Canonical** - Definitive approach

### Pattern Updates

When updating patterns:
- Document why the change was needed
- Update all pattern references
- Mark old approach as deprecated if relevant

## Key Files Reference

- **Source of Truth:** `{{DOCS_DIR}}/context_master_guide.md`
- **Current State:** `{{DOCS_DIR}}/technical_status.md`
- **Roadmap:** `{{DOCS_DIR}}/ROADMAP.md`
- **Patterns:** `{{DOCS_DIR}}/patterns/`
- **Workflows:** `{{DOCS_DIR}}/workflows/`

## MCP Tools for Architect Mode

```
get_context_for_task(task_type="{{CYCLE_TYPE}}_start")
get_completion_checklist()
validate_workflow_documentation(changes_made=[...], description="...")
check_pattern_exists(feature_description="...")
```
