# FluxFrame

**The context-first framework for AI-assisted development.**

**Build better software faster with AI assistance that scales intelligence, not just productivity.**

[![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)]()
[![Version](https://img.shields.io/badge/Version-1.0.0-blue)]()
[![Framework](https://img.shields.io/badge/AI%20Assistants-Cline%20%7C%20Roo-orange)]()

---

## What is This?

A **self-bootstrapping framework** for AI-assisted software development that transforms how you build software with AI coding assistants like Cline and Roo.

**Key Innovation:** Point your AI assistant at this framework, provide a project description, and it will automatically generate a complete, production-ready development environment with documentation, patterns, workflows, and configuration—no manual template copying required.

---

## Why This Exists

### The Problem

AI coding assistants are powerful, but without structure:
- ❌ They forget context between sessions
- ❌ They create inconsistent code
- ❌ They skip documentation
- ❌ They don't learn from past mistakes
- ❌ Quality degrades as projects grow

### The Solution

This framework provides:
- ✅ **Persistent Context** - MCP integration gives AI the same context as your team
- ✅ **Pattern Libraries** - Capture and scale team intelligence
- ✅ **Development Workflows** - Systematic approach to iterations and changes
- ✅ **Documentation First** - Documents as product, not afterthought
- ✅ **Quality Enforcement** - API contracts, testing alignment, rule consistency
- ✅ **Self-Bootstrapping** - AI generates everything from simple project description

**Result:** Compound effect of discipline, scaled through AI assistance.

---

## Quick Start (Self-Bootstrapping)

### Prerequisites

- [Cline](https://github.com/cline/cline) or [Roo](https://github.com/RooVetGit/Roo-Cline) VS Code extension installed
- Basic project idea

### 3-Step Setup

**Step 1: Create Project Description**

```bash
cat > project_brief.md << 'EOF'
# My Project Name

A web application for [your use case].

**Tech Stack:**
- Backend: Python (FastAPI)
- Frontend: React + TypeScript
- Database: PostgreSQL

**Key Features:**
- Feature 1
- Feature 2
- Feature 3
EOF
```

**Step 2: Point AI at Framework**

In Cline/Roo chat:
```
@Cline Read fluxframe/BOOTSTRAP_INSTRUCTIONS.md
and set up this project using project_brief.md
```

**Step 3: Review & Approve**

Cline will:
1. Ask clarifying questions
2. Generate complete `project_docs/` directory
3. Create configured `.clinerules` or `.roorules`
4. Set up MCP server
5. Create pattern library structure
6. Present everything for your approval

**That's it!** Start your first iteration with:
```
@Cline Let's start Iteration 1.1: [your first feature]
```

---

## What Gets Generated

### Complete Documentation

```
your-project/
├── project_docs/
│   ├── context_master_guide.md      # Single source of truth
│   ├── technical_status.md          # Real-time project state
│   ├── implementation_plan.md       # Roadmap & cycles
│   ├── api_contract_standards.md    # API enforcement rules
│   └── patterns/                    # Pattern library
│       └── README.md
```

### AI Configuration

```
├── .clinerules (or .roorules)       # AI assistant rules
└── mcp-server.js                    # Context provider
```

### All Filled with Your Project Details

No `{{PLACEHOLDERS}}` to find/replace. No manual editing. Just review and start coding.

---

## Core Concepts

### 1. Documentation as Source of Truth

**Philosophy:** If it's not documented, it doesn't exist.

- All project knowledge in `project_docs/`
- AI reads same docs as humans
- Documentation maintained continuously
- Context master guide is single source of truth

**Why:** Eliminates "it's in my head" knowledge silos.

### 2. Pattern-Driven Development

**Workflow:** Check patterns → Follow or create → Document

Before implementing anything:
```
MCP Tool: check_pattern_exists(feature_description)
→ Pattern exists: Follow it exactly
→ No pattern: Implement, then document for next time
```

**Benefits:**
- Consistent code across team
- Faster development (reuse proven solutions)
- Knowledge scales automatically
- New team members get up to speed quickly

### 3. Development Cycles (Not "Features")

**Systematic approach to iterations:**

**BEFORE cycle:**
- Gather context via MCP
- Check existing patterns
- Read current status
- Plan approach

**DURING cycle:**
- Real components only (no stubs)
- Visible results
- Aligned tests
- Follow patterns

**AFTER cycle:**
- Update ALL affected docs
- Validate completeness
- Get user confirmation
- Document patterns

**Why "Cycles" not "Features":** Emphasizes iterative, complete work units.

### 4. API Contract Enforcement

**Contract-first development from Day 1:**

Choose your approach during bootstrap:
- **OpenAPI** + Pydantic + Auto-generated TypeScript (recommended)
- **GraphQL** with typed schema
- **JSON Schema** + manual types
- **Custom** (documented) approach

Then enforced via:
- `.clinerules` (or `.roorules`) validates every endpoint
- MCP tool `validate_api_contracts()` checks compliance
- Breaking changes caught at compile time

**Why:** Integration failures prevented, not debugged.

### 5. Test-Implementation Alignment

**Critical Rule:** Tests validate what you ACTUALLY built, not what you PLANNED.

- Tests written after implementation
- Tests match real behavior
- No stubs in production tests
- Real analysis always

**Why:** Tests as executable specifications, drift detection.

### 6. Change Request Protocol

**Systematic bug fixes and refinements:**

1. **Initialize** - `start_change_request()` tracks the issue
2. **Analyze** - Understand root cause (no code changes yet)
3. **Iterate** - Fix, test, refine
4. **Confirm** - User validates it works
5. **Document** - Update ALL affected docs

**Key:** Never document during iteration. Only after user confirms success.

**Why:** Documentation reflects reality, not hopes.

### 7. MCP Integration

**Model Context Protocol** gives AI same context as humans:

Built-in MCP tools:
- `get_context_for_task()` - Context for current work
- `check_pattern_exists()` - Search pattern library
- `get_current_implementation_status()` - Read current state
- `validate_api_contracts()` - Check endpoint compliance
- `start_change_request()` - Track bug fixes
- `validate_cycle_completion()` - Ensure work complete

**Why:** AI has persistent memory across sessions.

---

## Framework Structure

```
fluxframe/
├── README.md                          # You are here
├── PHILOSOPHY.md                      # Why this works
├── BOOTSTRAP_INSTRUCTIONS.md          # AI's entry point
│
├── bootstrap/                         # Self-bootstrapping system
│   ├── project_questionnaire.md
│   ├── scaffolding_workflow.md
│   └── validation_checklist.md
│
├── doc-templates/                     # Project documentation templates
│   ├── context_master_guide.template.md
│   ├── technical_status.template.md
│   ├── implementation_plan.template.md
│   └── api_contract_standards.template.md
│
├── ai-rules/                          # AI assistant configuration
│   ├── template.clinerules           # For Cline users
│   ├── template.roorules             # For Roo users
│   ├── CUSTOMIZATION_GUIDE.md
│   └── RULE_ENFORCEMENT.md
│
├── mcp-server/                        # Context provider
│   └── template-mcp-server.js
│
├── pattern-library-system/            # How to create patterns
│   ├── README.md
│   └── meta-patterns/
│       ├── how_to_document_patterns.md
│       └── pattern_template.md
│
├── development-cycles/                # Iteration methodology
│   └── completion_checklist.md
│   (Workflows generated from doc-templates/workflows/)
│
├── testing-framework/                 # Testing philosophy
│   ├── README.md
│   └── test_data_alignment.md
│
└── examples/                          # Complete example
    └── taskflow-pro/                 # Fictitious SaaS project
        ├── README.md
        ├── project_brief.md
        ├── .clinerules
        ├── project_docs/
        └── patterns/
```

---

## Who Should Use This

### ✅ Perfect For

- **Individual developers** building side projects
- **Small teams** (2-5 people) wanting consistency
- **AI-first development** teams
- **Projects with AI coding assistants** (Cline/Roo)

---

## Benefits

### For Individual Developers

- 🧠 **External Memory** - AI remembers patterns between sessions
- 📚 **Knowledge Base** - Build reusable pattern library
- 🎯 **Focus** - Clear workflows eliminate decision fatigue
- 📈 **Growth** - Document learnings as you go

### For Small Teams

- 🤝 **Consistency** - Everyone follows same patterns
- 🚀 **Onboarding** - New members read patterns and start contributing
- 🔄 **Knowledge Transfer** - Patterns capture team intelligence
- 🛡️ **Quality** - Enforced standards prevent drift

### For Projects

- ✅ **Type Safety** - API contracts enforced
- 🔍 **Visibility** - Always know current state
- 📝 **Documentation** - Maintained automatically as you build
- 🐛 **Debugging** - Systematic change protocol catches issues
- 🔬 **Testing** - Tests match implementation

---

## Example: TaskFlow Pro

See complete working example in [`examples/taskflow-pro/`](examples/taskflow-pro/)

**Demonstrates:**
- Filled documentation from templates
- API patterns (FastAPI + Pydantic)
- UI patterns (React + TypeScript)
- Data patterns (React Query)
- Configuration (`.clinerules`, MCP server)

**Use it to:**
- Learn what good patterns look like
- See filled templates
- Understand bootstrap output
- Validate your own setup

---

## Philosophy

### Documentation-First Development

> "If it's not in the docs, it doesn't exist."

Documentation is the product, code is the implementation. This inverts traditional approaches where docs are an afterthought.

**Benefits:**
- Context stays synchronized
- AI has same knowledge as humans
- New team members productive immediately
- Technical debt visible and manageable

### Pattern Libraries Scale Intelligence

Patterns capture solutions to recurring problems. Once documented, patterns scale across:
- Team members (everyone uses best approach)
- Time (solutions don't get lost)
- AI assistants (patterns guide code generation)

**Why it works:** Each pattern documented multiplies its value.

### Systematic Beats Ad-Hoc

Workflows like development cycles and change request protocol provide structure that prevents common mistakes:
- Forgetting to document
- Skipping tests
- Breaking API contracts
- Incomplete implementations

**Discipline applied consistently compounds over time.**

---

## Advanced Usage

### Customizing for Your Stack

Framework supports any tech stack:
1. During bootstrap, specify your technologies
2. AI fills templates with your stack details
3. Create patterns specific to your architecture
4. Customize MCP tools if needed

### Adding Custom MCP Tools

The framework MCP server is extensible:
```javascript
// Add project-specific tools
addTool('validate_my_custom_requirement', {
  description: 'Check custom project constraint',
  // ... implementation
});
```

### Evolving Your Patterns

Patterns have lifecycle:
1. 🔵 **Experimental** - New pattern, being validated
2. 🟡 **Established** - Proven, preferred approach
3. 🟢 **Canonical** - Must follow exactly
4. 🟣 **Mandatory** - Required by architecture

Promote patterns as confidence grows.

### Harmonizing Existing Code

For existing projects:
1. Bootstrap framework in separate directory
2. Document current patterns
3. Identify inconsistencies
4. Create harmonization backlog
5. Gradually align code to patterns

---

## Compatibility

### AI Assistants

- ✅ **Cline** - Full support with `.clinerules`
- ✅ **Roo** - Full support with `.roorules`
- 🔄 **Others** - Easy to add (just different rule filename)

### Tech Stacks

- ✅ **Any backend** - Python, Node.js, Go, Java, etc.
- ✅ **Any frontend** - React, Vue, Angular, Svelte, etc.
- ✅ **Any database** - PostgreSQL, MongoDB, MySQL, etc.
- ✅ **Any architecture** - Monolith, microservices, serverless, etc.

### API Approaches

- ✅ **OpenAPI** (recommended for REST)
- ✅ **GraphQL** (recommended for graph APIs)
- ✅ **JSON Schema** (lightweight option)
- ✅ **Custom** (with documentation requirement)

---

## Contributing

### Improving the Framework

Found a better pattern? Discovered a workflow improvement? Share it!

1. Create issue describing improvement
2. Show before/after if applicable
3. Explain benefits
4. Propose changes to templates/docs

### Sharing Your Patterns

Created patterns for your domain? Help others!

1. Genericize domain-specific details
2. Document use case clearly
3. Include implementation and pitfalls
4. Submit as example pattern

---

## FAQ

**Q: Do I need to use ALL the framework features?**  
A: No. Take what's useful. Minimum viable: context guide + patterns + .clinerules

**Q: Can I use this without MCP?**  
A: Yes, but you lose persistent context. Still valuable for documentation and patterns.

**Q: How much overhead is this?**  
A: Bootstrap: 10 minutes. Ongoing: 5-10 minutes per iteration to update docs. Net time savings: massive.

**Q: What if my project is already started?**  
A: Bootstrap in parallel, document current patterns, harmonize gradually. No need to rewrite.

**Q: Does this work for non-web projects?**  
A: Yes. Framework is universal. Mobile, desktop, CLI, embedded—all work.

**Q: Can I modify the templates?**  
A: Absolutely. Templates are starting points. Adapt to your needs.

**Q: What about private/proprietary code?**  
A: Framework is generic. Your patterns and docs stay private. No CultureFit or real project references.

**Q: How do I share this with my team?**  
A: Point them at this README. Bootstrap creates team-sharable structure.

---

## Resources

### Documentation

- [Philosophy](PHILOSOPHY.md) - Why this works
- [Bootstrap Instructions](BOOTSTRAP_INSTRUCTIONS.md) - AI's setup guide
- [Example Project](examples/taskflow-pro/) - Complete reference

### Components

- [Document Templates](doc-templates/) - Project documentation
- [AI Rules](ai-rules/) - Assistant configuration  
- [Pattern System](pattern-library-system/) - Pattern library methodology
- [Development Cycles](development-cycles/) - Iteration workflows
- [Testing Framework](testing-framework/) - Testing philosophy

---

## License

This framework is provided as-is for use in any project. 

Recommended: Keep framework directory separate from your project code. Bootstrap generates your project-specific files.

---

## Next Steps

1. **Read the philosophy**: [PHILOSOPHY.md](PHILOSOPHY.md)
2. **Try bootstrapping**: Create a project_brief.md and follow Quick Start
3. **Study the example**: [examples/taskflow-pro/](examples/taskflow-pro/)
4. **Start your first iteration**: Let AI guide you through the workflow

---

**Build better software faster. Start today.**

---

**Framework Version:** 1.0.0  
**Last Updated:** November 2025  
**Status:** ✅ Ready for more!
