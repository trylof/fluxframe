# Documentation-First Development

<!--
This section defines documentation requirements and principles.
Used by tools that support file imports (e.g., Claude Code @imports).
-->

## Core Philosophy

**Documentation is the source of truth, not an afterthought.**

In FluxFrame, documentation drives development:
- Design decisions are documented before implementation
- Implementation follows documented plans
- Status is tracked through documentation
- Patterns emerge and are captured as documentation

## Key Documentation Files

| File | Purpose | Update Frequency |
|------|---------|-----------------|
| `{{DOCS_DIR}}/context_master_guide.md` | Single source of truth | Rarely (foundational) |
| `{{DOCS_DIR}}/technical_status.md` | Current implementation state | After every change |
| `{{DOCS_DIR}}/ROADMAP.md` | Roadmap and cycles | When cycles complete |
| `{{DOCS_DIR}}/patterns/` | Reusable solutions | When patterns discovered |
| `{{DOCS_DIR}}/workflows/` | Process documentation | When processes change |

## When to Document

### NEVER Document During Iteration

When fixing bugs or iterating on implementation:
1. Make code changes
2. Test the changes
3. Get user confirmation
4. **THEN** document

Why? Documentation during iteration leads to:
- Outdated documentation when approach changes
- Documentation describing code that doesn't work
- Wasted effort documenting abandoned attempts

### ALWAYS Document After Confirmation

Once user confirms the change works:
1. Update `technical_status.md` (always)
2. Create/update patterns (if applicable)
3. Update workflows (if logic changed)
4. Update implementation plan (mark complete)

## Documentation Update Sequence

After any completed work:

1. **technical_status.md** - Update implementation state, add to recently changed/fixed
2. **patterns/** - Document new patterns or update existing ones
3. **{{ADDITIONAL_CONTEXT_FILE}}** - Update if queryable data/capabilities changed
4. **workflows/** - Update if conceptual process logic changed
5. **ROADMAP.md** - Mark cycles/tasks as complete

## Documentation Standards

### Approval Required

All changes to files in `{{DOCS_DIR}}/` require:
1. Show proposed changes (diff) to user
2. Wait for explicit approval
3. Apply only after approval received

### Quality Requirements

- Clear, concise language
- Up-to-date with implementation
- Cross-referenced where appropriate
- Searchable and well-organized

### What Makes Good Documentation

- **Accurate** - Reflects actual state
- **Current** - Updated with every change
- **Complete** - Covers all relevant aspects
- **Discoverable** - Easy to find and search
- **Actionable** - Provides clear guidance

## Documentation Checklist

Before marking work complete:
- [ ] `technical_status.md` updated with changes
- [ ] New patterns documented (if applicable)
- [ ] Workflow docs updated (if logic changed)
- [ ] Implementation plan updated (if cycle complete)
- [ ] All cross-references valid
- [ ] User approved all doc changes
