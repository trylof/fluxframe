# FluxFrame Instruction Manual

**Your project was bootstrapped with FluxFrame.** This manual explains how to work effectively with the framework.

**CORE PRINCIPLE: The AI is the executor. You are the architect.**

> [!IMPORTANT]
> **You do NOT manually edit valid documentation files (ROADMAP.md, plans, etc.) unless fixing minor typos.**
> 
> Your role is to express **Intent** (via chat or reference files).
> The AI's role is to translate that intent into **Documentation** (Roadmap, Plans, Logic).
> You then **Review and Approve**.

---

## Quick Reference

| What | Where | Who Edits? |
|------|-------|------------|
| **This Manual** | `FLUXFRAME_MANUAL.md` | AI (Updates) |
| Project context | `AGENTS.md` + `{{DOCS_DIR}}/document_catalog.md` | AI (Maintains) |
| Current status | `{{DOCS_DIR}}/technical_status.md` | AI (Updates) |
| Development roadmap | `{{DOCS_DIR}}/ROADMAP.md` | AI (Writes) |
| Bug tracker | `{{DOCS_DIR}}/BUGS.md` | AI (Logs) |
| Pattern library | `{{DOCS_DIR}}/patterns/` | AI (Extracts) |
| **Reference library** | `{{DOCS_DIR}}/reference_library/` | **USER** (Uploads) |
| AI rules | `AGENTS.md` {{TOOL_SPECIFIC_FILES}} | AI (Refines) |

---

## The Workflow: Intent -> Plan -> Execute

### 1. User Expresses Intent
You initiate work by providing context or instructions.
*   **Chat:** "I want to add a user login feature."
*   **Reference:** Upload a spec to `{{DOCS_DIR}}/reference_library/specifications/auth_spec.md` and say "Read this and plan the login feature."

### 2. AI Updates Documentation
The AI translates your intent into the project's "Mind" (the `{{DOCS_DIR}}/` folder).
*   **Roadmap:** AI updates `ROADMAP.md` to define the new cycle.
*   **Plan:** AI creates `roadmap/cycle_X.Y_plan.md` using the template.
*   **Bugs:** AI logs issues in `BUGS.md`.

### 3. User Reviews & Approves
You review the AI's plan.
*   **Approve:** "Looks good, proceed."
*   **Refine:** "No, use Auth0 instead of local auth. Update the plan."

### 4. AI Executes
Once approved, the AI executes the plan, writing code and updating `technical_status.md`.

---

## User Journeys

### "I want to add a new Feature"
1.  **Context:** (Optional) Upload specs/mocks to `reference_library/`.
2.  **Intent:** Tell AI: "I want to build [Feature]. Update the Roadmap and create an implementation plan."
3.  **Review:** AI presents the plan. You review it. Iterate until approved.
4.  **Execute:** Tell AI: "Execute the plan for [Cycle X.Y] from the roadmap."
5.  **CLEAR CONTEXT:** The AI just wrote a lot of code. Clear context before you start testing/fixing.
6.  **Verify:** **USER ACTION:** You test the feature in the app. If bugs, fix them here.
7.  **Approve:** Tell AI: "Feature verified. Mark cycle as complete."

### "I want to fix a Bug"
1.  **Report:** Tell AI: "I found a [Critical/High/Low] bug: [Description]." OR "Test X failed."
2.  **Log:** AI logs it in `BUGS.md` and creates a reproduction plan if needed.
3.  **Fix:** AI analyzes, fixes, and verifies.
4.  **Verify:** **USER ACTION:** You confirm the bug is gone.
5.  **Close:** AI updates `BUGS.md`.

### "I want to brainstorm / dump info"
1.  **Upload:** Create a file in `reference_library/domain_knowledge/` or `correspondence/`.
2.  **Index & Value:** Tell AI: "I uploaded [Filename]. Please create a metadata entry describing its purpose and binding level (e.g. HARD CONSTRAINT vs BRAINSTORMING)."
3.  **Result:** AI updates relevant docs (Roadmap, Open Questions) based on the new info.

---

## Verification & Testing

While the AI writes automated tests, **YOU are the quality gate.**

### The Rule of "User Sign-Off"
No cycle or bug fail is considered "Done" until you have manually verified it.

1.  **AI Verification:** The AI runs unit tests, lints, and builds.
2.  **User Verification:**
    *   Does it look right? (Design)
    *   Does it feel right? (UX)
    *   Does it actually solve the problem? (Intent)
3.  **Approval:** You explicitly tell the AI "This is verified."

---

## The "Mind" of the Project

The `{{DOCS_DIR}}/` directory is the AI's long-term memory. If it's not in the docs, the AI doesn't know it.

### Your Domain (Descriptive)
*   **`reference_library/`**: This is YOUR space.
    *   Upload PDFs, images, text files.
    *   **No strict format.** Just dump info here.
    *   **Action:** "Read reference_library/specifications/api_v1.pdf."

### The AI's Domain (Prescriptive)
*   **`ROADMAP.md`, `patterns/`, `technical_status.md`**: These are strict structures.
    *   **DO NOT EDIT MANUALLY.** You will break the AI's parsing or synchronization.
    *   **Action:** "Update the roadmap to reflect..."

---

## Common Commands (Natural Language)

| Goal | Command to AI |
|------|---------------|
| **Start Work** | "What is the current status? What should we work on next?" |
| **New Cycle** | "Plan Cycle [X.Y]: [Description]." |
| **Fix Bug** | "There's a bug in [Feature]. Fix it." |
| **Save Pattern** | "That solution was good. Save it as a UI pattern." |
| **Update Docs** | "We changed the API. Update the API design docs." |

---

## Daily Workflow

### Starting a New Development Cycle

1. **Define the cycle** in `ROADMAP.md` (AI)
2. **Call** `start_cycle_planning("X.Y")` to initiate (AI)
3. **Analyze scope** with `analyze_cycle_scope()` (AI)
4. **Create detailed plan** with `create_cycle_plan()` (AI)
5. **Fill ALL required sections** (AI)
6. **Get approval** (**USER ACTION**) -> **CLEAR CONTEXT**
7. **Implement** following the plan and patterns (AI) -> **CLEAR CONTEXT**
8. **Manual Verification** (**USER ACTION**) - Test the feature yourself.
9. **Complete** with `validate_cycle_completion()` (AI)
10. **Update docs** - technical_status, patterns, AGENTS.md (AI)

---

## Keeping Context Clean

1.  **Finish a Task:** Ensure AI updates `technical_status.md`.
2.  **Clear Context:** Use your editor's "Clear Chat" or "New Session" feature.
3.  **Resume:** "Read `technical_status.md` and `task.md`. Where did we leave off?"

---

## Missing Features (Current Limitations)

> [!NOTE]
> **No Pull Request / Merge Request Process**
> 
> FluxFrame currently does not enforce a PR/MR workflow. The AI commits directly to the branch you are working on. A formal review/merge process is planned for a future update. For now, rely on your Manual Verification step as the "Pre-Merge" check.

---

## Updating This System

Even the framework itself is managed by the AI.

*   **Change Rules:** "We need to change how we handle logging. Update `AGENTS.md` and the logging patterns."
*   **New Workflow:** "We need a security review step. Update the workflow docs."

**Rule of Thumb:** If it's a strict file (Markdown with headers, tables, etc.), ask the AI to write it. If it's raw thought/context, you write/upload it.

---

## New Team Members: Activating Project MCP Tools

When you join this project, you need to configure your AI coding assistant to use the project's MCP server. This gives your AI access to FluxFrame workflow tools like cycle planning, pattern checking, and documentation validation.

### Prerequisites

1. **Node.js v18+** - Check with `node --version`
2. **Install MCP dependencies** (if not already done):
   ```bash
   npm install
   ```

### Configure Your AI Coding Assistant

{{MCP_SETUP_FOR_AGENTS}}

### Verify Setup

After configuration, start a new conversation and ask your AI:

> "Do you have access to FluxFrame MCP tools? List them."

Your AI should confirm access to tools like `get_context_for_task`, `check_pattern_exists`, `start_cycle_planning`, etc.

### Troubleshooting

| Problem | Solution |
|---------|----------|
| "No MCP tools available" | Check paths are absolute, restart your AI assistant |
| Tools not appearing | Ensure `mcp-server.js` exists at the project root |
| Connection errors | Run `node mcp-server.js` manually to check for errors |

---

## Extending AI Coding Agent Support

FluxFrame supports multiple AI coding assistants. If your team wants to add support for a new agentic coder not currently configured for this project, any existing AI assistant can help.

### How to Add a New AI Coding Agent

Ask your current AI coding assistant:

> I want to add FluxFrame support for **[NEW_TOOL_NAME]** to this project. Please:
> 1. Review how FluxFrame is configured for the currently supported AI tools (check `AGENTS.md` and any tool-specific files like `CLAUDE.md`, `.roomodes`, `.clinerules/`, or `GEMINI.md`)
> 2. Research how **[NEW_TOOL_NAME]** handles:
>    - Agent instructions (equivalent to `AGENTS.md`)
>    - MCP server configuration
>    - Path-specific rules (if supported)
>    - Any unique features
> 3. Create the necessary configuration files
> 4. Update this manual with setup instructions for the new tool

The AI will research the new tool's documentation and create compatible configuration files following FluxFrame's patterns.

---

## Archived Documents

{{ARCHIVED_DOCUMENTS_SECTION}}

---

*This manual was generated for {{PROJECT_NAME}}.*
