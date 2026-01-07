---
paths:
  - {{FRONTEND_PATH_PATTERN}}
---
# Frontend Development Rules

<!--
These rules are automatically loaded when working on frontend files.
Claude Code applies them based on the paths defined above.
-->

## Component Standards

### Component Structure

```{{FRONTEND_LANGUAGE}}
{{COMPONENT_STRUCTURE_EXAMPLE}}
```

### Every Component Must Have

1. **TypeScript Props Interface** - Define props with generated types where applicable
2. **Error Handling** - Handle loading, error, and empty states
3. **Accessibility** - Semantic HTML, ARIA labels, keyboard navigation
4. **Proper Data Fetching** - Use API client, not direct HTTP calls

## Data Fetching Rules

{{#if API_APPROACH_OPENAPI}}
### API Client Usage (Required)

- **MUST** use `{{API_CLIENT_MODULE}}` from `{{API_CLIENT_PATH}}`
- **MUST** use `{{API_HOOKS_MODULE}}` from `{{API_HOOKS_PATH}}` when available
- **MUST** use auto-generated types from `{{TYPES_PATH}}`
{{#unless PROJECT_TYPE_PROTOTYPE}}
- **NEVER** use direct `{{HTTP_CLIENT}}()` calls - ZERO EXCEPTIONS
{{/unless}}
{{#if PROJECT_TYPE_PROTOTYPE}}
- Direct `{{HTTP_CLIENT}}()` allowed for prototyping but API client recommended
{{/if}}

### Before Modifying Data-Fetching Components

1. Check if component uses `{{API_CLIENT_MODULE}}`
2. If not, refactor to use API client first
3. Check if component uses auto-generated types
4. If not, update to use generated types first

### Adding New API Calls

1. Add method to `{{API_CLIENT_PATH}}` first
2. Import and use the new method in component
3. Use generated types for response handling
{{/if}}

## Type Safety

### Required Practices

- Use TypeScript for all frontend code
- Import types from `{{TYPES_PATH}}` for API responses
- NO manual type definitions that duplicate API types
- Define component prop interfaces explicitly

### Type Import Pattern

```typescript
import type { {{EXAMPLE_TYPE}} } from '{{TYPES_PATH}}';
```

## State Management

### Local State
- Use for component-specific data
- Prefer `useState` for simple state
- Use `useReducer` for complex state logic

### Server State
{{#if USE_REACT_QUERY}}
- Use React Query for server state management
- Leverage automatic caching and refetching
- Use query invalidation for cache updates
{{/if}}

### Global State
{{#if USE_GLOBAL_STATE}}
- Use `{{GLOBAL_STATE_SOLUTION}}` for global application state
- Keep global state minimal
- Prefer server state and local state where possible
{{/if}}

## Styling

{{#if USE_CSS_MODULES}}
- Use CSS Modules for component styles
- Colocate styles with components
- Follow BEM naming convention within modules
{{/if}}

{{#if USE_TAILWIND}}
- Use Tailwind CSS utility classes
- Extract repeated patterns into components
- Use `@apply` sparingly in component CSS
{{/if}}

{{#if USE_STYLED_COMPONENTS}}
- Use styled-components for CSS-in-JS
- Define styled components above the main component
- Use theme values for consistency
{{/if}}

## Accessibility Checklist

For every component:
- [ ] Uses semantic HTML elements
- [ ] Has proper heading hierarchy
- [ ] Includes ARIA labels where needed
- [ ] Supports keyboard navigation
- [ ] Has sufficient color contrast
- [ ] Handles focus states

## Quick Reference

- Component Pattern: `{{DOCS_DIR}}/patterns/{{COMPONENT_PATTERN_FILE}}`
- API Client: `{{API_CLIENT_PATH}}`
- Generated Types: `{{TYPES_PATH}}`
