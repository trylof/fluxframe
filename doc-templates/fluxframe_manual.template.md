# FluxFrame Instruction Manual

**Your project was bootstrapped with FluxFrame.** This manual explains how to work effectively with the framework and keep your AI-assisted development running smoothly.

> [!TIP]
> **Just Bootstrapped?** Follow the [Getting Started Guide](FLUXFRAME_GETTING_STARTED.md) to set up your project context ("The Mind") before you start coding.


---

## Quick Reference

| What | Where |
|------|-------|
| **This Manual** | `FLUXFRAME_MANUAL.md` (Project Root) |
| Project context | `{{DOCS_DIR}}/context_master_guide.md` |
| Current status | `{{DOCS_DIR}}/technical_status.md` |
| Development roadmap | `{{DOCS_DIR}}/ROADMAP.md` |
| Bug tracker | `{{DOCS_DIR}}/BUGS.md` |
| Pattern library | `{{DOCS_DIR}}/patterns/` |
| **Reference library** | `{{DOCS_DIR}}/reference_library/` |
| AI rules | `AGENTS.md` {{TOOL_SPECIFIC_FILES}} |
| MCP server | `mcp-server.js` |

---

## User Journeys

### "I want to add a new Feature"
1.  **Update Roadmap:** Add your feature to `{{DOCS_DIR}}/ROADMAP.md` (Cycle Planning).
2.  **Create Plan:** Create an implementation plan. `cp doc-templates/implementation_plan.template.md feature_plan.md`.
3.  **Execute:** Coding Agent picks up the plan and works through `task.md`.
4.  **Verify:** Test, then update `technical_status.md`.

### "I want to fix a Bug"
1.  **Log it:** Describe the bug in `{{DOCS_DIR}}/BUGS.md`.
2.  **Isolate:** Create a reproduction case (if possible).
3.  **Fix:** Instruct Agent to "Fix bug #X from BUGS.md".
4.  **Close:** Mark as [x] in `BUGS.md`.

### "I want to dump info for the AI"
*   **Don't:** Paste 50 pages into chat.
*   **Do:** Save it as a markdown file in `{{DOCS_DIR}}/reference_library/specifications/` or `.../domain_knowledge/`.
*   **Then:** Tell the Agent "Read reference_library/specifications/my_spec.md".

---

## The FluxFrame Way

FluxFrame is "opinionated" because it solves the specific problems of **AI-Assisted Coding**.

### 1. Two-Tier Planning
AI struggles with long horizons. We break it down:
*   **Tier 1: Strategic (User Driven):** defined in `ROADMAP.md`. You set the feature goals.
*   **Tier 2: Tactical (AI Driven):** defined in `task.md` or Implementation Plans. The AI breaks the feature into steps.

### 2. Documentation is the "Mind"
The AI doesn't remember your project. **The Docs remember.**
*   **Prescriptive (Rules):** `patterns/`, `workflows/`. "How we do things." Follow these largely.
*   **Descriptive (Context):** `reference_library/`. "What the world is like." Upload emails, specs, and research here. The AI uses this to *understand*, not to *obey*.

### 3. Pattern-Driven Development
Never invent from scratch if a pattern exists.
1.  **Check:** Does `patterns/ui_patterns.md` have a button component?
2.  **Use:** Follow the pattern.
3.  **Update:** If you build something new and reusable, add it to the patterns.

### 4. Context discipline
**Garbage In, Garbage Out.** If you feed the AI old, irrelevant chat history, you get bugs.
*   **Keep it clean:** Short, focused chat sessions.
*   **Update the docs:** Before clearing context, ensure the "Brain" (docs) is updated.

### Context Management (CRITICAL)

**Why Context Clearing Matters:**
AI models have a finite "context window." As a chat session grows long:
1.  **Hallucinations Increase:** The AI loses track of the latest file state vs. old edits.
2.  **Performance Degrades:** Instructions get diluted by pages of conversation history.
3.  **Cost Increases:** Re-sending massive context is expensive.

**When to Start a New Chat:**
- [ ] **Start of Task:** ALWAYS start fresh when picking up a new item from `task.md`.
- [ ] **Major Pivot:** If you drilled into a rabbit hole and are coming back up to the main plan.
- [ ] **After 15-20 turns:** If the conversation feels "stuck" or the AI starts making simple syntax errors.

**Session Protocol:**
1.  **Check Status:** `cat doc-templates/technical_status.md` (Know where you are).
2.  **Update Task:** Mark progress in `task.md`.
3.  **Clear Context:** `/clear` or start new chat.
4.  **Resume:** Paste the "Current Task" summary or point to `task.md`.

---

## Your Setup

### Configured AI Tools
{{AI_TOOLS_SECTION}}

### Documentation Structure
```
{{DOCS_DIR}}/
├── context_master_guide.md    # Single source of truth
├── technical_status.md        # Current project state
├── ROADMAP.md                 # Roadmap & cycles
├── api_contract_standards.md  # API enforcement (if applicable)
├── patterns/                  # Prescriptive: Your pattern library
│   ├── README.md
│   ├── api_patterns.md
│   ├── ui_patterns.md
│   └── data_patterns.md
├── reference_library/         # Descriptive: Real-world context
│   ├── README.md              # Philosophy & guidelines
│   ├── open_questions/        # Research topics & questions
│   ├── correspondence/        # Emails, meeting notes
│   ├── user_research/         # Interviews, feedback
│   ├── market_research/       # Competitor analysis
│   ├── domain_knowledge/      # Expert input, terminology
│   └── specifications/        # External specs, PDFs
├── roadmap/                   # Detailed cycle plans
└── bugs/                      # Bug fix plans
```

### API Contract Approach
{{API_APPROACH_SECTION}}

---

## Daily Workflow

### Starting a New Development Cycle

1. **Define the cycle** in `ROADMAP.md`
2. **Call** `start_cycle_planning("X.Y")` to initiate
3. **Analyze scope** with `analyze_cycle_scope()`
4. **Create detailed plan** with `create_cycle_plan()`
5. **Fill ALL required sections** (see below)
6. **Get approval**, then `approve_cycle_plan()`
7. **Implement** following the plan and patterns
8. **Complete** with `validate_cycle_completion()`
9. **Update docs** - technical_status, patterns, context guide

### Cycle Plan Sections (All Required)

Each detailed cycle plan in `roadmap/` contains these sections:

| Section | Purpose |
|---------|---------|
| **Progress Tracker** | Track implementation phases |
| **Executive Summary** | WHY: Business context at a glance |
| **Target Users** | WHO: Primary/secondary audiences |
| **User Stories** | WHAT: "As a [user], I want [X], so that [Y]" |
| **Security Considerations** | Protection requirements |
| **Research Summary** | Problem statement + existing patterns |
| **Scope Assessment** | Complexity scoring (triggers decomposition) |
| **Technical Design** | Architecture + files to create/modify |
| **Implementation Checklist** | Step-by-step tasks |
| **Success Criteria** | Definition of done + Tests to Pass |
| **Risk Assessment** | What could go wrong |
| **Approval** | User sign-off |

> **For Autonomous AI Execution:** These sections provide complete context (WHY, WHO, WHAT, HOW) so an AI agent can implement the cycle without asking clarifying questions.

### Fixing Bugs / Change Requests

1. **Initialize** with `start_change_request()`
2. **Analyze** - understand root cause (no code changes yet)
3. **Iterate** - fix, test, refine
4. **Confirm** - user validates it works
5. **Document** - update ALL affected docs

### Tracking and Fixing Bugs

Bugs are tracked separately from the development roadmap:

1. **Log bug** in `BUGS.md` with severity (Critical/High/Low)
2. **Bug ID format:** `BUG_YYYY_MM_short_name` (e.g., `BUG_2026_01_login_crash`)
3. **For complex bugs:** Create fix plan in `bugs/BUG_XXX_FIX_PLAN.md`
4. **Fix and test** with regression tests
5. **Update BUGS.md** status when verified

> **Key:** Bugs follow a streamlined process—no scope analysis or decomposition like development cycles.

---

## Keeping Your Setup Current

> [!WARNING]
> **FluxFrame only works if you work with it.**
> 
> Hacks, skipped steps, and undocumented changes defeat the purpose. If workflows don't fit your needs, update them—don't bypass them.

### When to Update AI Rules

Update your AI rules (`AGENTS.md` and tool-specific configs) when:

- ✏️ **Tech stack changes** - New frameworks, libraries, or tools
- 🏗️ **Architecture evolves** - New patterns, different directory structure
- 🔧 **Infrastructure updates** - New deployment targets, CI/CD changes
- 📋 **Team conventions change** - Coding standards, review requirements
- 🐛 **Recurring issues appear** - Add rules to prevent repeated mistakes

### How to Update Rules

1. **Identify the change** - What behavior needs to be different?
2. **Update `AGENTS.md`** - Core methodology and project-wide rules
3. **Update tool-specific files** - If using tool-specific features
4. **Update patterns** - If new patterns are involved
5. **Document in `technical_status.md`** - Note the rule change
6. **Test** - Start a new AI session and verify behavior

### For AI Agents: Making Changes to This System

When infrastructure changes require updating rules or workflows:

1. Review current rules in `AGENTS.md` and tool-specific configs
2. Check `{{DOCS_DIR}}/patterns/infra_patterns.md` for infrastructure patterns
3. Identify what needs to change and why
4. Update affected files systematically:
   - `AGENTS.md` for methodology changes
   - Tool-specific configs for tool-specific features
   - Pattern files for new/changed patterns
5. Document changes in `technical_status.md`
6. Verify changes don't contradict existing rules

---

## Common Anti-Patterns

> [!CAUTION]
> These defeat the purpose of FluxFrame and create technical debt.

| Anti-Pattern | Why It's Bad | What to Do Instead |
|--------------|--------------|---------------------|
| Skipping pattern check | Reinvents solved problems | Always check patterns first |
| Not updating docs | Context drifts from reality | Update docs every cycle |
| Bypassing MCP tools | AI loses context | Use tools consistently |
| Hardcoding exceptions | Creates invisible rules | Document in rules/patterns |
| "Quick fix" without protocol | Lost knowledge | Use change request workflow |
| Ignoring validation | Incomplete work ships | Complete all checklist items |

---

## Updating or Re-Bootstrapping

### Fetching FluxFrame for New Projects

To bootstrap a new project with FluxFrame:

```bash
git clone https://github.com/trylof/fluxframe.git
```

Then follow `fluxframe/BOOTSTRAP_INSTRUCTIONS.md`.

### Migrating Another Project

If you want to apply FluxFrame to another project:

1. Clone FluxFrame into the target project
2. Tell your AI: "Read fluxframe/BOOTSTRAP_INSTRUCTIONS.md and bootstrap FluxFrame for this project"
3. The AI will detect your project state and guide you through setup

### Getting Framework Updates

FluxFrame is designed to be removed after bootstrap. Your project-specific documentation and rules remain. To get framework improvements for future projects, simply clone the latest version.

---

## Additional Resources

- **Pattern Library System:** See `{{DOCS_DIR}}/patterns/README.md` for how to create and maintain patterns
- **Development Cycles:** The two-tier planning system is documented in `ROADMAP.md`
- **API Contracts:** {{API_APPROACH_SECTION}}
- **Reference Library:** See `{{DOCS_DIR}}/reference_library/README.md` for philosophy and guidelines

---

## The Reference Library

### Descriptive vs Prescriptive Documentation

FluxFrame distinguishes between two types of documentation:

| Type | Examples | Purpose |
|------|----------|---------|
| **Prescriptive** | patterns/, workflows/, context_master_guide.md | Tell you WHAT to do and HOW |
| **Descriptive** | reference_library/ | Tell you WHAT EXISTS in the real world |

### What Goes in the Reference Library

The `reference_library/` stores real-world context that **informs but doesn't dictate** decisions:

- **correspondence/** - Stakeholder emails, Slack threads, meeting notes
- **user_research/** - User interviews, feedback, usage scenarios
- **market_research/** - Competitor analysis, industry reports
- **domain_knowledge/** - Expert input, terminology, business context
- **specifications/** - External specs, PDFs, partner documentation

### Key Principles

1. **Informs, doesn't dictate** - You may intentionally deviate from user wishes or market trends
2. **Contradictions are valuable** - Different user needs reveal complexity; don't resolve artificially
3. **Date and source everything** - Context changes; attribution matters

### When to Consult

- **Before planning features** - Check user_research/ for relevant needs
- **When designing tests** - Reference real usage scenarios
- **When making product decisions** - Consider market context
- **When understanding domain** - Consult domain_knowledge/

See `{{DOCS_DIR}}/reference_library/README.md` for detailed guidelines.

---

## Need Help?

- **Framework issues:** [github.com/trylof/fluxframe/issues](https://github.com/trylof/fluxframe/issues)
- **Project-specific:** Check your `context_master_guide.md` and patterns first

---

*This manual was generated during FluxFrame bootstrap. Keep it updated as your project evolves.*
