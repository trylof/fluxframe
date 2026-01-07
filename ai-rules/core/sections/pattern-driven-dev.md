# Pattern-Driven Development

<!--
This section defines pattern library usage and pattern creation.
Used by tools that support file imports (e.g., Claude Code @imports).
-->

## Pattern Library Philosophy

Patterns are documented solutions to recurring problems. They capture not just WHAT to do, but WHY, enabling consistent, high-quality implementations across the project.

## Before Implementing ANY Feature

1. **Search First** - Check `{{DOCS_DIR}}/patterns/` for relevant patterns
2. **If Pattern Exists:**
   - Follow it exactly - don't reinvent
   - Note any deviations as potential pattern updates
   - Reference the pattern in your commit/PR
3. **If No Pattern Exists:**
   - Implement the solution
   - After user confirms it works, document the pattern
   - Start with "experimental" status

## Pattern Structure

Every pattern in `{{DOCS_DIR}}/patterns/` contains:

### Problem
What situation or challenge this pattern addresses. Be specific about the context and constraints.

### Solution
The approach taken to solve the problem. Include architectural decisions and trade-offs considered.

### Implementation
Code examples demonstrating the pattern. Show both the structure and key integration points.

### Pitfalls
Common mistakes to avoid when applying this pattern. Learn from past issues.

### Status
- **experimental** - New pattern, used once, may evolve
- **established** - Used multiple times successfully, stable
- **canonical** - The definitive approach, shouldn't change without strong justification

## Creating New Patterns

After implementing a reusable solution:

1. **Wait for Confirmation** - Only document after user confirms the implementation works
2. **Create Pattern File** - Add to `{{DOCS_DIR}}/patterns/`
3. **Use Standard Template** - Follow the pattern structure above
4. **Mark as Experimental** - New patterns start at experimental status
5. **Promote Over Time** - Move to established after successful reuse

## Pattern Maintenance

- **Evolution** - Patterns can be updated when better approaches are found
- **Deprecation** - Mark patterns as deprecated rather than deleting
- **Harmonization** - Track inconsistencies in a harmonization backlog
- **Cross-References** - Link related patterns to each other

## Pattern Search Checklist

Before any implementation, verify:
- [ ] Searched patterns/ directory for relevant patterns
- [ ] Checked if this feature type has been implemented before
- [ ] Reviewed similar features for patterns they used
- [ ] Identified if this could become a new pattern
