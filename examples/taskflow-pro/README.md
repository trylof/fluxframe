# TaskFlow Pro - Example Project

**This is a demonstration project showing FluxFrame in action.**

---

## What is This?

TaskFlow Pro is a **fictitious** task management SaaS platform used as a complete example of how FluxFrame works in practice.

**Key Point:** This is NOT a real project you can run. It's a reference implementation showing:
- How documentation is structured
- What filled templates look like
- How patterns are documented
- What AI assistant configuration looks like

---

## Purpose

This example demonstrates:

1. **Bootstrap Output** - What gets generated when you bootstrap a new project
2. **Pattern Examples** - Real-world patterns across API, UI, and data layers
3. **Documentation Structure** - Complete project_docs/ directory
4. **Configuration** - Working `.clinerules` and MCP server setup
5. **Best Practices** - How the framework enforces quality

---

## Project Structure

```
taskflow-pro/
├── README.md                    # This file
├── project_brief.md             # Input to bootstrap process
├── AGENTS.md                    # Universal AI baseline
├── CLAUDE.md                    # Claude Code extension
│
├── project_docs/                # Generated documentation
│   ├── context_master_guide.md # Master guide (filled template)
│   ├── technical_status.md     # Current state (filled template)
│   └── implementation_plan.md  # Roadmap (would be here)
│
└── patterns/                    # Example patterns
    ├── api_task_endpoint_pattern.md    # API pattern example
    ├── ui_task_card_pattern.md         # UI pattern example
    └── data_react_query_pattern.md     # Data pattern example
```

---

## How This Was Created

### 1. Project Brief (Input)

See [`project_brief.md`](project_brief.md) - a simple description of:
- What TaskFlow Pro does
- Technical stack
- Key features
- API contract approach (OpenAPI)

### 2. Bootstrap Process

An AI assistant (e.g., Claude Code, Roo Code, Cline) would read:
```
ai-assisted-dev-framework/BOOTSTRAP_INSTRUCTIONS.md
```

And use the project brief to:
- Fill all document templates
- Generate `AGENTS.md` and tool-specific configuration
- Create pattern library structure
- Set up MCP server configuration

### 3. Generated Output

Everything in `project_docs/` and the configuration files were generated from templates by filling in TaskFlow Pro-specific details.

---

## Example Patterns

### API Pattern: Task CRUD Endpoint

**File:** [`patterns/api_task_endpoint_pattern.md`](patterns/api_task_endpoint_pattern.md)

Shows how to implement REST endpoints following OpenAPI + Pydantic approach:
- Complete Pydantic model definitions
- FastAPI endpoint implementation
- Frontend TypeScript integration
- Testing examples
- Common pitfalls

**Status:** 🟢 Canonical (must follow exactly)

### UI Pattern: Task Card Component

**File:** [`patterns/ui_task_card_pattern.md`](patterns/ui_task_card_pattern.md)

Shows how to build reusable React components:
- Component structure with TypeScript
- Variant support (compact, default, detailed)
- Event handling patterns
- Testing with React Testing Library
- Accessibility considerations

**Status:** 🟢 Canonical

### Data Pattern: React Query Integration

**File:** [`patterns/data_react_query_pattern.md`](patterns/data_react_query_pattern.md)

Shows server state management with React Query:
- Custom hooks for queries and mutations
- Optimistic updates
- Cache invalidation
- Infinite scrolling
- Error handling

**Status:** 🟢 Canonical

---

## Key Learnings from This Example

### 1. Documentation First

Notice how `context_master_guide.md` is comprehensive and serves as single source of truth. Every rule, workflow, and standard is documented there.

### 2. Pattern-Driven Development

The three example patterns show:
- What good patterns look like
- How to document use cases, implementation, testing, and pitfalls
- Different pattern statuses (Canonical, Established, Experimental)

### 3. API Contract Enforcement

The `AGENTS.md` file enforces:
- Every endpoint must have Pydantic response model
- Frontend must use auto-generated TypeScript types
- No direct fetch() calls
- Contract-first development

### 4. Consistent Iteration Workflow

The documentation shows clear workflows for:
- Starting new iterations
- Handling bug fixes
- Completing work
- Managing changes

### 5. MCP Integration

The configuration references MCP tools:
- `get_context_for_task()` - Get relevant context
- `check_pattern_exists()` - Find patterns before implementing
- `validate_api_contracts()` - Enforce API standards
- `validate_cycle_completion()` - Ensure completeness

---

## How to Use This Example

### If You're Learning the Framework

1. **Read the patterns** - See what good documentation looks like
2. **Study context_master_guide.md** - Understand the workflow
3. **Examine technical_status.md** - See how state is tracked
4. **Review .clinerules** - Understand AI assistant configuration

### If You're Bootstrapping Your Project

1. **Use this as reference** - See what output to expect
2. **Compare your project_brief.md** - Similar format and detail
3. **Expect similar structure** - But customized to your project
4. **Patterns will differ** - Yours will match your tech stack and domain

### If You're Contributing to Framework

1. **Use as validation** - Does bootstrap produce output like this?
2. **Test with TaskFlow Pro** - Try bootstrapping this example
3. **Check consistency** - Are all templates being filled correctly?
4. **Verify patterns** - Do pattern examples demonstrate well?

---

## What's NOT Here

This example does NOT include:
- ❌ Actual working code (backend/frontend implementations)
- ❌ Database migrations or schemas
- ❌ Deployment configurations
- ❌ Test files
- ❌ CI/CD pipelines
- ❌ MCP server implementation (uses framework template)

**Why?** This is a documentation and pattern example, not a runnable project. The focus is on showing what the framework generates and how documentation/patterns work.

---

## Relationship to Framework

### This Example Uses

From `ai-assisted-dev-framework/`:
- ✅ Filled templates from `doc-templates/`
- ✅ Generated `AGENTS.md` from `ai-rules/core/template.agents.md`
- ✅ Pattern documentation following `pattern-library-system/`
- ✅ Workflow from `development-cycles/`
- ✅ Methodology from `PHILOSOPHY.md`

### This Example Shows

- What bootstrap output looks like
- How to document patterns for your domain
- How to customize rules while keeping universal principles
- How patterns guide consistent development

---

## Questions This Example Answers

**Q: What does a filled context_master_guide look like?**  
A: See [`project_docs/context_master_guide.md`](project_docs/context_master_guide.md)

**Q: How do I document patterns?**  
A: See any of the [`patterns/`](patterns/) files

**Q: What should be in technical_status.md?**  
A: See [`project_docs/technical_status.md`](project_docs/technical_status.md)

**Q: How should AI rules be configured?**  
A: See [`AGENTS.md`](AGENTS.md) and [`CLAUDE.md`](CLAUDE.md)

**Q: What level of detail in a project brief?**  
A: See [`project_brief.md`](project_brief.md)

---

## Next Steps

### To Learn More

1. Read the main framework: `../../README.md`
2. Study the philosophy: `../../PHILOSOPHY.md`
3. Try bootstrapping: `../../BOOTSTRAP_INSTRUCTIONS.md`

### To Use This Framework

1. Create your own `project_brief.md`
2. Point your AI assistant at `BOOTSTRAP_INSTRUCTIONS.md`
3. Review generated output (should look similar to this)
4. Start your first iteration!

---

## Credits

This example was created to demonstrate the AI-Assisted Development Framework extracted from real-world experience building complex software with AI assistance.

**Not a real product. For demonstration purposes only.**

---

**Last Updated:** November 2025  
**Framework Version:** 1.0
