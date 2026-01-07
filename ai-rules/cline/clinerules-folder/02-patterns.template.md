# Pattern Library Rules

<!--
Pattern library usage rules for Cline AI assistant.
This file is part of the .clinerules/ folder structure.
Place in .clinerules/ directory at project root.
-->

## Pattern-Driven Development

Patterns are the backbone of consistent, high-quality development. They capture not just WHAT to do, but WHY.

---

## Before Implementing ANYTHING

### Step 1: Search Patterns

```
MCP: check_pattern_exists(feature_description="[what you're building]")
```

Or manually search: `{{DOCS_DIR}}/patterns/`

### Step 2: Apply or Plan

**If pattern exists:**
- Follow it exactly
- Don't reinvent
- Note any needed updates

**If no pattern exists:**
- Implement the solution
- Plan to document after confirmation

---

## Pattern Library Location

All patterns: `{{DOCS_DIR}}/patterns/`

### Common Pattern Files

| Pattern | File | Use When |
|---------|------|----------|
{{#if HAS_API}}
| API Contract | `api_contract_pattern.md` | Any API work |
{{/if}}
{{#if HAS_FRONTEND}}
| Component | `{{COMPONENT_PATTERN_FILE}}` | New UI components |
| Data Fetching | `data_fetching_pattern.md` | Data from API |
{{/if}}
| Error Handling | `error_handling_pattern.md` | Error cases |
| Testing | `test_pattern.md` | Writing tests |

---

## Pattern Structure

Every pattern contains:

### Problem
What situation this pattern solves. Context and constraints.

### Solution
The approach taken. Architectural decisions and trade-offs.

### Implementation
Code examples. Structure and key integration points.

### Pitfalls
Common mistakes. What to avoid.

### Status
- **experimental** - New, used once, may evolve
- **established** - Used multiple times, stable
- **canonical** - Definitive approach

---

## Creating New Patterns

### When to Document a Pattern

Document when the solution:
- Was non-obvious
- Will be reused
- Has important pitfalls
- Represents best practice

### Documentation Process

1. **Implement first** - Get the solution working
2. **Get confirmation** - User validates it works
3. **THEN document** - Create pattern file
4. **Mark experimental** - New patterns start here

### Pattern Template

```markdown
# Pattern: [Name]

**Status:** experimental | established | canonical
**Created:** [Date]
**Last Updated:** [Date]

## Problem

[What situation this pattern addresses]

## Solution

[The approach and key decisions]

## Implementation

\`\`\`{{BACKEND_LANGUAGE}}
[Code example]
\`\`\`

## Pitfalls

- [Common mistake 1]
- [Common mistake 2]

## Related Patterns

- [Link to related pattern]
```

---

## Pattern Maintenance

### Evolution
Patterns can be updated when better approaches emerge.

### Promotion
- **experimental → established**: After 2+ successful uses
- **established → canonical**: After team consensus

### Deprecation
Mark patterns deprecated rather than deleting:
```markdown
**Status:** DEPRECATED - Use [new_pattern.md] instead
```

---

## Pattern Search Checklist

Before any implementation:
- [ ] Searched patterns/ for relevant patterns
- [ ] Checked similar features for patterns they used
- [ ] Identified if this could become a new pattern
- [ ] Plan to document if no pattern exists
