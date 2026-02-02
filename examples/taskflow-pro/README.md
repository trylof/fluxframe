# TaskFlow Pro - Example Project

**This is a demonstration project showing FluxFrame 0.5.0 in action.**

---

## What is This?

TaskFlow Pro is a **fictitious** task management SaaS platform used as a complete example of how FluxFrame works in practice.

**Key Point:** This is NOT a real project you can run. It's a reference implementation showing:
- How documentation is structured after bootstrap
- What filled templates look like
- How patterns are documented
- What AI assistant configuration looks like
- How the Two-Tier Planning System works

---

## Purpose

This example demonstrates:

1. **Bootstrap Output** - What gets generated when you bootstrap a new project
2. **Pattern Examples** - Real-world patterns across API, UI, and data layers
3. **Documentation Structure** - Complete project_docs/ directory with all subdirectories
4. **AI Configuration** - Working AGENTS.md and CLAUDE.md setup
5. **Best Practices** - How the framework enforces quality through gates and protocols
6. **Reference Library** - Separation of prescriptive vs. descriptive documentation

---

## Project Structure

```
taskflow-pro/
├── README.md                    # This file
├── project_brief.md             # Input to bootstrap process
├── bootstrap_decisions.md       # Decisions made during bootstrap (Gate 1.5)
├── AGENTS.md                    # Universal AI baseline (comprehensive)
├── CLAUDE.md                    # Claude Code extension
│
└── project_docs/                # Generated documentation
    ├── context_master_guide.md  # Master guide with Two-Tier Planning
    ├── technical_status.md      # Current state with archive strategy
    ├── ROADMAP.md               # High-level strategic roadmap
    ├── api_contract_standards.md # API contract enforcement
    │
    ├── patterns/                # Example patterns (PRESCRIPTIVE)
    │   ├── api_task_endpoint_pattern.md
    │   ├── ui_task_card_pattern.md
    │   └── data_react_query_pattern.md
    │
    ├── workflows/               # System workflow documentation
    │   └── README.md
    │
    ├── reference_library/       # Real-world context (DESCRIPTIVE)
    │   ├── README.md
    │   ├── open_questions/
    │   ├── correspondence/
    │   ├── user_research/
    │   ├── market_research/
    │   ├── domain_knowledge/
    │   └── specifications/
    │
    ├── bug_fixes/               # Change documentation
    │
    ├── tech-status/             # Archived cycle details
    │   └── archived_iteration_1_1.md
    │
    └── roadmap/                 # Detailed cycle plans (Tier 2)
```

---

## FluxFrame 0.5.0 Features Demonstrated

### Two-Tier Planning System
The `context_master_guide.md` includes the Agent Protocol section with strict separation of planning and execution phases.

### Reference Library
Demonstrates the distinction between:
- **Prescriptive docs** (patterns/, workflows/) - Tell you WHAT to do
- **Descriptive docs** (reference_library/) - Tell you WHAT EXISTS

### Archive Strategy
The `technical_status.md` shows how completed iterations are archived to `tech-status/` to keep the main file concise.

### Gate System
The `bootstrap_decisions.md` documents Gate 1.5 content source mapping performed during bootstrap.

### Comprehensive MCP Tools
Documentation references all current MCP tools:
- Cycle planning: `start_cycle_planning`, `analyze_cycle_scope`, `approve_cycle_plan`
- Validation: `get_completion_checklist`, `validate_cycle_completion`
- Patterns: `check_pattern_exists`
- Change requests: `start_change_request`, `validate_change_resolution`, `close_change_request`

---

## Example Patterns

### API Pattern: Task CRUD Endpoint

**File:** [`project_docs/patterns/api_task_endpoint_pattern.md`](project_docs/patterns/api_task_endpoint_pattern.md)

Shows how to implement REST endpoints following OpenAPI + Pydantic approach:
- Complete Pydantic model definitions
- FastAPI endpoint implementation with response_model
- Frontend TypeScript integration
- Testing examples
- Common pitfalls

**Status:** 🟢 Canonical (must follow exactly)

### UI Pattern: Task Card Component

**File:** [`project_docs/patterns/ui_task_card_pattern.md`](project_docs/patterns/ui_task_card_pattern.md)

Shows how to build reusable React components:
- Component structure with TypeScript
- Variant support (compact, default, detailed)
- Event handling patterns
- Testing with React Testing Library
- Accessibility considerations

**Status:** 🟢 Canonical

### Data Pattern: React Query Integration

**File:** [`project_docs/patterns/data_react_query_pattern.md`](project_docs/patterns/data_react_query_pattern.md)

Shows server state management with React Query:
- Custom hooks for queries and mutations
- Optimistic updates
- Cache invalidation
- Infinite scrolling
- Error handling

**Status:** 🟢 Canonical

---

## Key Learnings from This Example

### 1. Documentation-First Development
The `context_master_guide.md` is comprehensive and serves as single source of truth. Every rule, workflow, and standard is documented there.

### 2. Two-Tier Planning System
Strict separation prevents "hallucinated progress":
- **Phase 1: Plan** → STOP & WAIT
- **Phase 2: Review** → STOP & WAIT
- **Phase 3: Build** → Only after approval

### 3. Pattern-Driven Development
Check patterns BEFORE implementing. If pattern exists, follow exactly. If not, implement then document.

### 4. API Contract Enforcement
Every endpoint MUST have:
- Pydantic response_model parameter
- Explicit mapping to response model
- Auto-generated TypeScript types on frontend

### 5. Change Request Protocol
Bug fixes follow structured workflow:
- Initialize with `start_change_request()`
- NO documentation during iteration
- Document ONLY after user confirms fix works

### 6. Archive Strategy
Completed cycles move to `tech-status/` to keep `technical_status.md` concise and optimized for AI context.

---

## How to Use This Example

### If You're Learning FluxFrame

1. **Start with `context_master_guide.md`** - Understand the philosophy and protocols
2. **Read the patterns** - See what good pattern documentation looks like
3. **Examine `technical_status.md`** - See how state is tracked with archive strategy
4. **Review `AGENTS.md`** - See comprehensive AI assistant configuration
5. **Check `bootstrap_decisions.md`** - Understand content source mapping

### If You're Bootstrapping Your Project

1. **Use this as reference** - See what output to expect
2. **Compare your `project_brief.md`** - Similar format and detail
3. **Expect same structure** - All directories and files shown here
4. **Patterns will differ** - Yours will match your tech stack and domain

### If You're Contributing to FluxFrame

1. **Validate bootstrap output** - Does it produce structure like this?
2. **Check template alignment** - Do filled docs match current templates?
3. **Verify completeness** - Are all required files generated?
4. **Test MCP tool references** - Are all tools documented?

---

## What's NOT Here

This example does NOT include:
- ❌ Actual working code (backend/frontend implementations)
- ❌ Database migrations or schemas
- ❌ Deployment configurations
- ❌ Test files (only pattern examples)
- ❌ CI/CD pipelines
- ❌ MCP server implementation

**Why?** This is a documentation and pattern example, not a runnable project. The focus is on showing what FluxFrame generates and how documentation/patterns work.

---

## Questions This Example Answers

**Q: What does a filled context_master_guide look like?**
A: See [`project_docs/context_master_guide.md`](project_docs/context_master_guide.md)

**Q: How do I document patterns?**
A: See any of the [`project_docs/patterns/`](project_docs/patterns/) files

**Q: What should be in technical_status.md?**
A: See [`project_docs/technical_status.md`](project_docs/technical_status.md)

**Q: How should AI rules be configured?**
A: See [`AGENTS.md`](AGENTS.md) and [`CLAUDE.md`](CLAUDE.md)

**Q: What level of detail in a project brief?**
A: See [`project_brief.md`](project_brief.md)

**Q: What is the Reference Library for?**
A: See [`project_docs/reference_library/README.md`](project_docs/reference_library/README.md)

**Q: How does cycle archiving work?**
A: See [`project_docs/tech-status/archived_iteration_1_1.md`](project_docs/tech-status/archived_iteration_1_1.md)

---

## Next Steps

### To Learn More

1. Read the main framework: `../../README.md`
2. Study the bootstrap process: `../../bootstrap/BOOTSTRAP_INSTRUCTIONS.md`
3. Review templates: `../../doc-templates/`

### To Use FluxFrame

1. Create your own `project_brief.md`
2. Point your AI assistant at `bootstrap/BOOTSTRAP_INSTRUCTIONS.md`
3. Complete the bootstrap gates
4. Review generated output (should look similar to this)
5. Start your first iteration!

---

## Credits

This example was created to demonstrate FluxFrame, extracted from real-world experience building complex software with AI assistance.

**Not a real product. For demonstration purposes only.**

---

**Last Updated:** February 2026
**Framework Version:** FluxFrame 0.5.0
