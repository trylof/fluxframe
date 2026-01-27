# Bootstrap Instructions for AI Assistants

**Purpose:** Unified entry point for AI assistants (Claude/Roo/Cline/Antigravity) to set up FluxFrame for any project - whether new or existing.

**When to use:** When a user wants to add FluxFrame to their project. This works for:
- 🆕 **New projects** with no existing workflow
- 🔄 **Existing projects** with AI workflows (Cline, Claude Code, etc.)
- 📚 **Existing projects** with documentation (ADRs, wikis, bug fixes, etc.)

---

## ⚠️ CRITICAL: Read This First

**Follow these gates STRICTLY IN ORDER. Do NOT skip ahead or parallelize.**

```
Gate 1: npm install     →  MUST complete before Gate 2
Gate 2: MCP config      →  MUST complete before Phase 0
Phase 0+: Bootstrap     →  Only after Gates 1 and 2 are done
```

**DO NOT:**
- ❌ Use Explore agents or delegate bootstrap to sub-agents
- ❌ Check MCP config before npm install is done
- ❌ Skip Gate 1 because you want to check config first
- ❌ Parallelize the gates - they are sequential

**DO:**
- ✅ Follow this file step by step, in order
- ✅ Complete Gate 1 fully before starting Gate 2
- ✅ Complete Gate 2 fully before starting Phase 0
- ✅ Execute commands yourself, don't delegate

---

## Gate 1: Dependencies Installed

**Before anything else, verify FluxFrame dependencies are installed.**

### Check for node_modules

Look for `node_modules/` directory in the FluxFrame folder, or check if `node_modules/@modelcontextprotocol` exists.

**If node_modules is missing or incomplete:**

1. Inform user: "FluxFrame dependencies aren't installed yet. Let me run npm install for you."
2. Run `npm install` in the FluxFrame directory
3. Wait for completion and verify success
4. Proceed to Gate 2

**If npm install fails:**
- Check if Node.js is installed (`node --version`)
- If Node.js is missing, guide user to install it from nodejs.org
- After Node.js is installed, retry `npm install`

### ✅ Gate 1 Checkpoint

Before proceeding to Gate 2, confirm:
- [ ] `node_modules/` exists in the FluxFrame directory
- [ ] `node_modules/@modelcontextprotocol` exists

**If dependencies are missing:** Run `npm install` NOW. Do not continue reading this file until npm install completes successfully.

**If you are in plan mode or cannot run commands:** STOP. Tell the user: "I need to run npm install but I'm in read-only/plan mode. Please exit plan mode so I can proceed with the bootstrap." Do NOT continue checking other things.

---

## ⛔ STOP - Gate 1 Must Be Complete Before Reading Further

If you have not confirmed both checkboxes above, GO BACK and complete Gate 1.

Do NOT read Gate 2 until Gate 1 is done. Seriously.

---

## Gate 2: MCP Configuration

**After dependencies are installed, set up MCP if needed.**

### Step 2.1: Check if MCP is Already Configured

**DO NOT immediately try to call `get_bootstrap_state`.** First, check if MCP configuration exists.

Check for the MCP configuration file based on the AI tool being used:

| AI Tool | Config File Location |
|---------|---------------------|
| Claude Code (CLI) | `.mcp.json` in project root |
| Cline | `.vscode/cline_mcp_settings.json` |
| Roo Code | `.roo/mcp.json` |
| Cursor | `.cursor/mcp.json` |
| Kilo Code | `.kilocode/mcp.json` |
| Antigravity | `mcp.json` in project root |
| Codex / Gemini CLI | Limited MCP support - use `AGENTS.md` |

**If config file exists and contains "fluxframe-bootstrap":** Proceed to Step 2.3 (verify it works).

**If config file doesn't exist or doesn't have FluxFrame:** Proceed to Step 2.2 (configure it).

### Step 2.2: Pre-Restart Setup (TWO REQUIRED TASKS)

```
┌─────────────────────────────────────────────────────────────────────┐
│  ⛔ CRITICAL: YOU MUST COMPLETE BOTH TASKS BELOW BEFORE RESTART    │
│                                                                     │
│     Task 1: Configure MCP config file                              │
│     Task 2: Create bootstrap-resume rules file (CLAUDE.md)         │
│                                                                     │
│  DO NOT tell user to restart until BOTH tasks are verified done.   │
└─────────────────────────────────────────────────────────────────────┘
```

**Why both tasks are mandatory:**
- Task 1 (MCP config): Without this, MCP tools won't work after restart
- Task 2 (CLAUDE.md): Without this, AI won't know bootstrap is in progress after restart
- If you skip Task 2, the AI will lose all context and explore randomly

---

#### TASK 1 of 2: Configure MCP

**IMPORTANT: Configure MCP automatically.** You have terminal access and can edit files. Do not ask the user to configure manually unless automation fails.

**Required values:**
- `[FLUXFRAME_PATH]`: The directory containing this BOOTSTRAP_INSTRUCTIONS.md file
- `[PROJECT_PATH]`: The user's project directory that will be bootstrapped

**Find your AI tool below and follow the instructions:**

---

##### Claude Code (CLI)

**Config:** `.mcp.json` in project root

```bash
cat > .mcp.json << 'EOF'
{
  "mcpServers": {
    "fluxframe-bootstrap": {
      "command": "node",
      "args": ["[FLUXFRAME_PATH]/mcp-server/bootstrap-mcp-server.js"],
      "cwd": "[PROJECT_PATH]"
    }
  }
}
EOF
```

---

##### Cline (VS Code Extension)

**Config:** `.vscode/cline_mcp_settings.json`

```bash
mkdir -p .vscode
cat > .vscode/cline_mcp_settings.json << 'EOF'
{
  "mcpServers": {
    "fluxframe-bootstrap": {
      "command": "node",
      "args": ["[FLUXFRAME_PATH]/mcp-server/bootstrap-mcp-server.js"],
      "cwd": "[PROJECT_PATH]"
    }
  }
}
EOF
```

---

##### Roo Code (VS Code Extension)

**Config:** `.roo/mcp.json`

```bash
mkdir -p .roo
cat > .roo/mcp.json << 'EOF'
{
  "mcpServers": {
    "fluxframe-bootstrap": {
      "command": "node",
      "args": ["[FLUXFRAME_PATH]/mcp-server/bootstrap-mcp-server.js"],
      "cwd": "[PROJECT_PATH]"
    }
  }
}
EOF
```

---

##### Cursor

**Config:** `.cursor/mcp.json`

```bash
mkdir -p .cursor
cat > .cursor/mcp.json << 'EOF'
{
  "mcpServers": {
    "fluxframe-bootstrap": {
      "command": "node",
      "args": ["[FLUXFRAME_PATH]/mcp-server/bootstrap-mcp-server.js"],
      "cwd": "[PROJECT_PATH]"
    }
  }
}
EOF
```

---

##### Kilo Code (VS Code Extension)

**Config:** `.kilocode/mcp.json`

```bash
mkdir -p .kilocode
cat > .kilocode/mcp.json << 'EOF'
{
  "mcpServers": {
    "fluxframe-bootstrap": {
      "command": "node",
      "args": ["[FLUXFRAME_PATH]/mcp-server/bootstrap-mcp-server.js"],
      "cwd": "[PROJECT_PATH]"
    }
  }
}
EOF
```

---

##### Antigravity (Gemini)

**Config:** `mcp.json` in project root

```bash
cat > mcp.json << 'EOF'
{
  "mcpServers": {
    "fluxframe-bootstrap": {
      "command": "node",
      "args": ["[FLUXFRAME_PATH]/mcp-server/bootstrap-mcp-server.js"],
      "cwd": "[PROJECT_PATH]"
    }
  }
}
EOF
```

---

##### Codex / Gemini CLI

**Note:** Codex and Gemini CLI have limited MCP support. Use `AGENTS.md` for rules instead.

---

**Verify configuration was applied:**

Check that the configuration file now contains "fluxframe-bootstrap" with correct paths.

**✓ Task 1 complete when:** MCP configuration contains "fluxframe-bootstrap" with correct paths

---

#### ⛔ STOP: Do NOT skip to restart. Task 2 is REQUIRED.

---

#### TASK 2 of 2: Create Bootstrap-Resume Rules

**This task is MANDATORY. If you skip this, the AI will have no memory of bootstrap after restart.**

**Step 2a: Back up existing rules first**

```bash
# Check for and back up existing rules
mkdir -p .fluxframe-backup/pre-bootstrap

# Back up any existing rule files (if they exist)
[ -f AGENTS.md ] && cp AGENTS.md .fluxframe-backup/pre-bootstrap/
[ -f CLAUDE.md ] && cp CLAUDE.md .fluxframe-backup/pre-bootstrap/
[ -f GEMINI.md ] && cp GEMINI.md .fluxframe-backup/pre-bootstrap/
[ -d .clinerules ] && cp -r .clinerules .fluxframe-backup/pre-bootstrap/
[ -f .clinerules ] && cp .clinerules .fluxframe-backup/pre-bootstrap/
[ -d .claude ] && cp -r .claude .fluxframe-backup/pre-bootstrap/
[ -f .roomodes ] && cp .roomodes .fluxframe-backup/pre-bootstrap/
[ -d .roo ] && cp -r .roo .fluxframe-backup/pre-bootstrap/
[ -f .cursorrules ] && cp .cursorrules .fluxframe-backup/pre-bootstrap/
[ -d .agent ] && cp -r .agent .fluxframe-backup/pre-bootstrap/

# List what was backed up
ls -la .fluxframe-backup/pre-bootstrap/ 2>/dev/null
```

**Step 2b: Create the bootstrap-resume file**

**Find your AI tool and execute the corresponding command:**

---

##### Claude Code (CLI)

```bash
cat > CLAUDE.md << 'EOF'
# FluxFrame Bootstrap In Progress

⚠️ **DO NOT follow normal project rules. A bootstrap is in progress.**

## To Continue Bootstrap

1. Call MCP tool: `get_bootstrap_state`
2. Read the phase and step from the response
3. Follow `fluxframe/BOOTSTRAP_INSTRUCTIONS.md` from that point

## If MCP Tools Not Available

If `get_bootstrap_state` fails or MCP tools are not visible:
1. Read `fluxframe/BOOTSTRAP_INSTRUCTIONS.md`
2. Check Gate 2 - the MCP configuration may need to be verified
3. Restart your AI tool after MCP is configured

---

*This file is temporary and will be replaced with full project rules when bootstrap completes.*
EOF
```

---

##### Cline (VS Code Extension)

```bash
cat > .clinerules << 'EOF'
# FluxFrame Bootstrap In Progress

⚠️ **DO NOT follow normal project rules. A bootstrap is in progress.**

## To Continue Bootstrap

1. Call MCP tool: `get_bootstrap_state`
2. Read the phase and step from the response
3. Follow `fluxframe/BOOTSTRAP_INSTRUCTIONS.md` from that point

## If MCP Tools Not Available

If `get_bootstrap_state` fails or MCP tools are not visible:
1. Read `fluxframe/BOOTSTRAP_INSTRUCTIONS.md`
2. Check Gate 2 - the MCP configuration may need to be verified
3. Restart your AI tool after MCP is configured

---

*This file is temporary and will be replaced with full project rules when bootstrap completes.*
EOF
```

---

##### Roo Code (VS Code Extension)

```bash
cat > AGENTS.md << 'EOF'
# FluxFrame Bootstrap In Progress

⚠️ **DO NOT follow normal project rules. A bootstrap is in progress.**

## To Continue Bootstrap

1. Call MCP tool: `get_bootstrap_state`
2. Read the phase and step from the response
3. Follow `fluxframe/BOOTSTRAP_INSTRUCTIONS.md` from that point

## If MCP Tools Not Available

If `get_bootstrap_state` fails or MCP tools are not visible:
1. Read `fluxframe/BOOTSTRAP_INSTRUCTIONS.md`
2. Check Gate 2 - the MCP configuration may need to be verified
3. Restart your AI tool after MCP is configured

---

*This file is temporary and will be replaced with full project rules when bootstrap completes.*
EOF
```

---

##### Antigravity (Gemini)

```bash
cat > GEMINI.md << 'EOF'
# FluxFrame Bootstrap In Progress

⚠️ **DO NOT follow normal project rules. A bootstrap is in progress.**

## To Continue Bootstrap

1. Call MCP tool: `get_bootstrap_state`
2. Read the phase and step from the response
3. Follow `fluxframe/BOOTSTRAP_INSTRUCTIONS.md` from that point

## If MCP Tools Not Available

If `get_bootstrap_state` fails or MCP tools are not visible:
1. Read `fluxframe/BOOTSTRAP_INSTRUCTIONS.md`
2. Check Gate 2 - the MCP configuration may need to be verified
3. Restart your AI tool after MCP is configured

---

*This file is temporary and will be replaced with full project rules when bootstrap completes.*
EOF
```

---

##### Cursor

```bash
cat > .cursorrules << 'EOF'
# FluxFrame Bootstrap In Progress

⚠️ **DO NOT follow normal project rules. A bootstrap is in progress.**

## To Continue Bootstrap

1. Call MCP tool: `get_bootstrap_state`
2. Read the phase and step from the response
3. Follow `fluxframe/BOOTSTRAP_INSTRUCTIONS.md` from that point

## If MCP Tools Not Available

If `get_bootstrap_state` fails or MCP tools are not visible:
1. Read `fluxframe/BOOTSTRAP_INSTRUCTIONS.md`
2. Check Gate 2 - the MCP configuration may need to be verified
3. Restart your AI tool after MCP is configured

---

*This file is temporary and will be replaced with full project rules when bootstrap completes.*
EOF
```

---

##### Codex / Gemini CLI / Universal Fallback

```bash
cat > AGENTS.md << 'EOF'
# FluxFrame Bootstrap In Progress

⚠️ **DO NOT follow normal project rules. A bootstrap is in progress.**

## To Continue Bootstrap

1. Call MCP tool: `get_bootstrap_state`
2. Read the phase and step from the response
3. Follow `fluxframe/BOOTSTRAP_INSTRUCTIONS.md` from that point

## If MCP Tools Not Available

If `get_bootstrap_state` fails or MCP tools are not visible:
1. Read `fluxframe/BOOTSTRAP_INSTRUCTIONS.md`
2. Check Gate 2 - the MCP configuration may need to be verified
3. Restart your AI tool after MCP is configured

---

*This file is temporary and will be replaced with full project rules when bootstrap completes.*
EOF
```

---

**Step 2c: Verify the file was created**

Check that your rules file exists and contains the bootstrap marker:
```bash
# Check for any of the bootstrap-resume files
head -1 CLAUDE.md 2>/dev/null || head -1 GEMINI.md 2>/dev/null || head -1 AGENTS.md 2>/dev/null || head -1 .clinerules 2>/dev/null || head -1 .cursorrules 2>/dev/null
# Should show: "# FluxFrame Bootstrap In Progress"
```

**✓ Task 2 complete when:** Bootstrap-resume file exists and starts with "# FluxFrame Bootstrap In Progress"

---

#### ✅ PRE-RESTART CHECKPOINT

```
┌─────────────────────────────────────────────────────────────────────┐
│  BEFORE telling user to restart, verify BOTH:                      │
│                                                                     │
│  [ ] Task 1 DONE: MCP config exists with "fluxframe-bootstrap"     │
│  [ ] Task 2 DONE: Rules file exists with "Bootstrap In Progress"   │
│                                                                     │
│  ⛔ IF EITHER IS INCOMPLETE → GO BACK AND COMPLETE IT              │
│  ⛔ DO NOT PROCEED TO RESTART UNTIL BOTH BOXES ARE CHECKED         │
└─────────────────────────────────────────────────────────────────────┘
```

---

#### ONLY AFTER BOTH TASKS VERIFIED: Tell User to Restart

**ONLY after BOTH checkboxes above are confirmed, tell the user:**

```
I've completed both pre-restart tasks:
1. ✓ Configured the FluxFrame bootstrap MCP server
2. ✓ Created a temporary bootstrap-resume rules file

To activate MCP:
1. Completely restart your AI tool (close and reopen, not just refresh)
2. Start a new conversation
3. Ask me to continue the FluxFrame bootstrap

The MCP tools will be available after restart, and I'll know to continue
the bootstrap from where we left off.
```

**Note:** These bootstrap-resume files are TEMPORARY. They will be replaced with full project rules during Phase 5 (Cleanup) when the real AGENTS.md, CLAUDE.md, etc. are moved from staging to their final locations

### Step 2.3: Verify MCP Works

After configuration (automatic or manual) and restart:

Call `get_bootstrap_state`.

**If successful:** MCP is working. Proceed to Phase 0.

**If failed:** Troubleshoot:
- Was the config file written correctly? Read it back and check.
- Are the paths correct? Verify the fluxframe and project directories exist.
- Did the user restart? MCP changes require a full restart.

### Fallback: Manual Configuration

**Only use this if automatic configuration fails.** Guide the user step-by-step:

1. **Explain what's needed:** "I wasn't able to configure MCP automatically. Let me guide you through setting this up manually - it takes about 2 minutes."

2. **Provide the exact config to add:**
   ```json
   {
     "fluxframe-bootstrap": {
       "command": "node",
       "args": ["[EXACT_FLUXFRAME_PATH]/mcp-server/bootstrap-mcp-server.js"],
       "cwd": "[EXACT_PROJECT_PATH]"
     }
   }
   ```

   Fill in the actual paths - don't make the user figure them out.

   **Note:** Adjust the JSON structure based on your tool's requirements (some wrap in `"mcpServers"`, some require `"type": "stdio"`, etc.)

3. **Tell them exactly where to put it:**
   - For Claude Code: `~/.claude.json` or `.mcp.json`
   - For Codex: `~/.codex/config.toml`
   - Explain how to merge if they have existing MCP servers
   - If GUI-only, walk them through the settings UI

4. **Walk through the restart:**
   - "Save the config file and completely restart [their AI tool]"
   - "Start a new conversation and ask me to verify MCP is working"

**Key principle:** Always try to do it yourself first. The user should not need to manually edit config files if you can do it for them.

**Why MCP is required:**
- ✅ Tracks progress automatically - no steps skipped
- ✅ Validates each step before moving on
- ✅ Persists state across sessions
- ✅ Ensures required questions are asked
- ✅ Prevents assumptions - AI must follow the guided process

**Do NOT follow manual markdown instructions.** The MCP server ensures the bootstrap process is reliable and complete.

---

## How This Works

```
┌─────────────────────────────────────────────────────────────────┐
│                    BOOTSTRAP PROCESS                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Phase 0: Prerequisites                                         │
│     ↓                                                           │
│  Phase 1: DETECTION (scan project, classify)                    │
│     ↓                                                           │
│  Phase 2: ROUTE to appropriate workflow                         │
│     │                                                           │
│     ├──→ GREENFIELD    → bootstrap/greenfield_workflow.md       │
│     ├──→ SIMILAR       → bootstrap/similar_workflow.md          │
│     └──→ MIGRATION     → bootstrap/migration_workflow.md        │
│     ↓                                                           │
│  Phase 3: EXECUTE workflow                                      │
│     ↓                                                           │
│  Phase 4: VALIDATION & handoff                                  │
│     ↓                                                           │
│  Phase 5: CLEANUP template files (after user verification)      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Phase 0: MCP Verification (REQUIRED)

**This phase MUST be completed before any other bootstrap activity.**

### Step 0.1: Verify MCP Connection

Call `get_bootstrap_state` to verify MCP is configured.

**If successful:** You will receive the current bootstrap state. Continue to Step 0.2.

**If failed:** STOP. See "STOP: MCP Verification Required" section above.

### Step 0.2: Confirm Prerequisites

Once MCP is verified, ensure:

1. ✅ MCP tools are available (`get_bootstrap_state` succeeded)
2. ✅ User has confirmed they want to use FluxFrame
3. ✅ You have access to the project directory (can list files)
4. ✅ User has provided a project brief OR you can analyze existing code

### Step 0.3: Use MCP Tools Throughout Bootstrap

From this point forward, use MCP tools to guide the process:
- `get_next_step` - Get instructions for the current step
- `complete_step` - Mark a step as done
- `validate_step` - Check if step requirements are met
- `update_bootstrap_info` - Save project information as you gather it
- `log_decision` - Record user decisions with reasoning

**Do NOT skip steps or make assumptions.** The MCP server tracks progress and ensures completeness.

**If user just says "bootstrap" or "set up FluxFrame":**
- First verify MCP (Step 0.1)
- Then proceed to Phase 1 (Detection)
- Detection will reveal what exists
- Questions will be based on what's missing

---

## Phase 1: Detection

**CRITICAL:** Always detect before asking questions. This prevents redundant questions and ensures appropriate workflow.

### Step 1.1: Scan Project Root

Check for these items in the project:

**AI Rules (indicates existing workflow):**
- `.clinerules/` or `.clinerules` (Cline)
- `AGENTS.md` (Universal)
- `CLAUDE.md` or `.claude/` (Claude Code)
- `.roomodes` or `.roo/` (Roo Code)
- `GEMINI.md` (Antigravity)
- `.cursorrules` (Cursor)
- `.codex/` or `CODEX.md` (Codex)
- `.gemini/` (Gemini CLI)
- `.github/copilot-instructions.md` (Copilot)

**Documentation (indicates existing structure):**
- `project_docs/` (FluxFrame standard)
- `docs/` (Common)
- `documentation/` (Alternative)
- `wiki/` (Wiki-style)
- `ADRs/` or `decisions/` (Architecture Decision Records)

**Change History:**
- `bug_fixes/` or `fixes/` (Fix documentation)
- `RFCs/` (Request for Comments)
- `CHANGELOG.md` (Change log)

**Patterns:**
- `patterns/` (Pattern library)
- `conventions/` or `styleguide/` (Coding conventions)

**Project Config:**
- `package.json`, `pyproject.toml`, `Cargo.toml`, etc.
- `README.md`

### Step 1.2: Analyze Content (Level B)

For items found, read and understand:
- What rules/workflows are defined?
- What documentation structure exists?
- What's valuable to preserve?
- How similar to FluxFrame?

See `bootstrap/detection_guide.md` for detailed detection instructions.

### Step 1.3: Classify Scenario

Use this decision tree:

```
Has existing AI rules with structured workflows?
├─ YES → Is structure similar to FluxFrame?
│        ├─ YES → SIMILAR_WORKFLOW
│        └─ NO  → Has substantial docs? 
│                 ├─ YES → MIGRATION
│                 └─ NO  → GREENFIELD (replace minimal rules)
└─ NO  → Has substantial documentation?
         ├─ YES → MIGRATION
         └─ NO  → GREENFIELD
```

**Classification Definitions:**

| Classification | Characteristics |
|---------------|-----------------|
| **GREENFIELD** | No AI rules (or only minimal), no structured docs, fresh start |
| **SIMILAR_WORKFLOW** | Has AI rules with workflows/patterns, similar to FluxFrame approach |
| **MIGRATION** | Has documentation structure different from FluxFrame, needs adaptation |

### Step 1.4: Present Detection Results

Show user what you found:

```markdown
## Project State Detection

### Detected
- **AI Rules:** [what was found]
- **Documentation:** [what was found]
- **Patterns:** [what was found]
- **Bug Fixes:** [what was found]
- **Project Info:** [name, stack from config files]

### Classification: [GREENFIELD / SIMILAR_WORKFLOW / MIGRATION]

**Reasoning:** [brief explanation]

Shall I proceed with the [classification] workflow?
```

Wait for user confirmation before proceeding.

---

## Phase 2: Route to Workflow

Based on classification, proceed to the appropriate workflow file:

### If GREENFIELD

**File:** `bootstrap/greenfield_workflow.md`

**What happens:**
1. Ask questions about project (only what's missing from detection)
2. Generate complete FluxFrame setup from scratch
3. Create all documentation, AI rules, MCP server

**Questions to ask (if not detected):**
- Project name and purpose
- Technology stack
- AI tools to use
- API contract approach (if applicable)
- Verification environment

### If SIMILAR_WORKFLOW

**File:** `bootstrap/similar_workflow.md`

**What happens:**
1. Inventory existing setup
2. Diff against FluxFrame templates
3. For each significant difference, ask user: keep/replace/merge
4. Preserve user customizations
5. Add missing FluxFrame components
6. Create backup before changes

**Key principle:** Default is REPLACE, but identify differences first and ask about each.

### If MIGRATION

**File:** `bootstrap/migration_workflow.md`

**What happens:**
1. Deep analysis of existing documentation
2. Map to FluxFrame equivalents
3. For each category, ask user: copy/migrate/reference
4. Execute migration based on preferences
5. Generate FluxFrame configuration
6. Establish AI workflow
7. Create backup before changes

**Key principle:** Preserve existing valuable content, integrate with FluxFrame.

---

## Phase 3: Execute Workflow

Follow the detailed steps in the appropriate workflow file.

**Common elements across all workflows:**

### AI Tools Selection

Ask early (if not detected):
```
Which AI coding tools will you use with this project?

1. Claude Code (Anthropic's CLI tool)
2. Roo Code (VS Code extension with modes)
3. Cline (VS Code extension)
4. Google Antigravity
5. Cursor
6. Codex
7. Gemini CLI
8. Multiple (specify which)
9. Other / Universal AGENTS.md only
```

For each selected tool, determine integration level:
- **Full integration** - Tool-specific config with all features
- **Basic** - Symlink to AGENTS.md

### Documentation Location

```
Where should project documentation live?

1. Standard: `project_docs/` at root (recommended)
2. Use existing: `[detected_path]/`
3. Custom: Specify your preferred path
```

### Verification Environment

```
How will changes be verified before marking complete?

1. Localhost - Run locally (e.g., localhost:3000)
2. Preview Environment - CI creates ephemeral previews
3. Staging Server - Deploy to specific staging URL
4. Production - Deploy directly (with feature flags)
```

---

## Phase 4: Validation & Handoff

After workflow execution, validate:

### Universal Checklist

- [ ] AGENTS.md created with project context
- [ ] Tool-specific rules created (based on selection)
- [ ] Documentation structure in place
- [ ] MCP server configured and tested
- [ ] All paths consistent across files
- [ ] No placeholders remaining

### Present Summary

```markdown
## FluxFrame Bootstrap Complete!

### Configuration Created

**Documentation:** `[docs_path]/`
- context_master_guide.md - Single source of truth
- technical_status.md - Project status
- ROADMAP.md - Roadmap
- patterns/ - Pattern library
- workflows/ - Development protocols
- bug_fixes/ - Change documentation

**AI Rules:**
- AGENTS.md - Universal baseline
- [Tool-specific files based on selection]

**MCP Server:** `mcp-server.js`

### [If applicable] What Was Preserved
- [List preserved customizations]
- [List preserved documentation]

### [If applicable] Backup Location
`.fluxframe-backup/[timestamp]/`

### Next Steps

1. Review generated documentation
2. Test MCP server: `npm run mcp`
3. Define Cycle 1.1 in ROADMAP.md
4. Start developing with FluxFrame workflow!

### Quick Reference

- **Start a cycle:** Define in ROADMAP.md, follow cycle_workflow.md
- **Fix a bug:** Use change_request_protocol.md
- **Add a pattern:** Document in patterns/ following template
- **Update status:** Keep technical_status.md current
```

---

## Phase 5: Finalization (Atomic)

**MANDATORY:** After user approves validation in Phase 4, finalization happens automatically. Do NOT ask for additional confirmation - the user already approved at step 4.3.

### Why Finalization Is Automatic

Previous bootstrap iterations suffered from "soft completion" - agents would ask for cleanup confirmation, the user would context-switch to a new task, and cleanup never happened. To prevent this, finalization is now a single atomic MCP tool call.

### Step 5.1: Validate Ready for Finalization

Before calling the finalization tool, verify:
- `.fluxframe-pending/` directory exists with `AGENTS.md` and any tool-specific rules
- `mcp-server.js` exists at project root
- Documentation directory exists with generated files

If anything is missing, fix it before proceeding. Otherwise, immediately continue to Step 5.2.

### Step 5.2: Execute Finalization

Call the `finalize_bootstrap` MCP tool. This single tool call atomically:

1. **Activates project rules** - moves all files from `.fluxframe-pending/` to their final locations (overwrites bootstrap-resume rules)
2. **Removes FluxFrame templates** - deletes the entire `fluxframe/` directory, staging directory, `BOOTSTRAP_INSTRUCTIONS.md`, and other artifacts
3. **Updates README.md** - replaces with project-specific content
4. **Cleans up state** - removes `.fluxframe-bootstrap-state.json` (optional: pass `keepStateFile: true` to retain)

After the tool completes:
1. Call `sync_decisions_to_file` one final time to persist all decisions
2. Show the user what was done (from the tool's response)
3. **CRITICAL: Walk the user through the MCP config swap using the `mcpSwapGuide` from the tool response.** Do NOT just print a generic message. Follow these steps:

#### Step-by-step MCP swap guidance (agent instructions)

The `finalize_bootstrap` response includes a `mcpSwapGuide` object with everything you need. Use it as follows:

1. **Explain what's happening:** Tell the user: *"I now need to help you switch from the bootstrap MCP server to your project's own MCP server. This is the last step before you're fully set up."*

2. **For each detected AI tool** (from `mcpSwapGuide.detectedTools`):
   - Show them the **exact config file path** (e.g., "Open the file at `/path/to/project/.mcp.json`")
   - Show them the **exact JSON** to paste (from `mcpSwapGuide.newMcpConfigJson`)
   - Explain they should **replace** the `fluxframe-bootstrap` entry, not add alongside it

3. **Offer to write the file for them.** If the config file is inside the project directory (`.mcp.json`, `.vscode/`, `.roo/`, `.cursor/`, etc.), say: *"I can update this file for you right now, or you can do it manually. Which do you prefer?"* If they say yes, write the file.

4. **Give tool-specific restart instructions** (from `mcpSwapGuide.detectedTools[].restartInstructions`). Be explicit — e.g., *"Close and reopen your terminal / Claude Code session completely"* rather than just "restart."

5. **Tell them what to expect after restart:** *"After restarting, your project MCP tools will be available (cycle planning, status updates, etc.) and your AI rules will guide development."*

6. **Remind them of the first next action:** *"Your first step after restart is to define Cycle 1.1 in `[docs_path]/ROADMAP.md`."*

7. **Stay available.** Do NOT end the conversation until the user confirms the swap is done or explicitly says they'll do it later. If they have questions or something goes wrong, help them troubleshoot.

---

## Target Output

A successfully bootstrapped project will have:

```
[project root]/
├── [docs_location]/
│   ├── context_master_guide.md      # Single source of truth
│   ├── technical_status.md          # Real-time project state
│   ├── ROADMAP.md       # Roadmap & cycles
│   ├── api_contract_standards.md    # API enforcement (if applicable)
│   ├── patterns/                    # Pattern library
│   │   ├── README.md
│   │   └── [domain]_patterns.md
│   ├── workflows/                   # Development protocols
│   │   ├── README.md
│   │   ├── cycle_workflow.md
│   │   └── change_request_protocol.md
│   └── bug_fixes/                   # Change documentation
│
├── AGENTS.md                        # Universal AI baseline
├── [tool-specific rules]            # Based on selection
├── mcp-server.js                    # Context provider
└── package.json                     # With MCP dependency
```

---

## Quick Reference: Questions by Scenario

### GREENFIELD Questions

| Question | When to Ask |
|----------|-------------|
| Project name | Not in package.json/README |
| Project purpose | Not clear from description |
| Tech stack | Not detectable from files |
| Architecture type | Not clear from structure |
| API contract approach | Has backend/API |
| AI tools | Always |
| Verification environment | Always |
| Docs location | Always (offer default) |

### SIMILAR_WORKFLOW Questions

| Question | When to Ask |
|----------|-------------|
| Keep/replace/merge | For each significant rule difference |
| Missing components | For each FluxFrame feature not present |
| Preserve customizations | When custom rules detected |

### MIGRATION Questions

| Question | When to Ask |
|----------|-------------|
| Copy/migrate/reference | For each documentation category |
| Docs location | If existing location differs from FluxFrame standard |
| AI tools | Always |
| Handle existing rules | If minimal rules exist |

### Future State Questions (ALL SCENARIOS)

**Step 2.6 - Optional but recommended:** After mandatory infrastructure questions, offer to capture future plans.

| Question | Description | MCP Tool |
|----------|-------------|----------|
| Planned Infrastructure | Things user is actively planning to add soon | `log_future_item` with tier="planned" |
| Planned Features | Features coming soon (browser automation, testing, etc.) | `log_future_item` with tier="planned" |
| Aspirational Items | Nice-to-have items, no rush | `log_future_item` with tier="aspirational" |

**Tier Distinction:**
- **Planned (Tier 2):** FluxFrame creates placeholder patterns and cycle entries
- **Aspirational (Tier 3):** Documentation in "Future Considerations" only, no active prep

**If User Skips:** Log decision with category="future_state", proceed without future state capture.

---

## Troubleshooting

### Detection finds nothing but project has files

Check if you have permission to read the project directory. Ask user to confirm file locations.

### User wants to start over despite existing setup

Classify as GREENFIELD but:
1. Suggest backup first
2. Confirm user wants to replace existing
3. Proceed with greenfield workflow

### Existing rules conflict with FluxFrame

Follow SIMILAR_WORKFLOW approach:
1. Identify each conflict
2. Ask user preference
3. Document why FluxFrame recommends its approach
4. Respect user's final decision

### User's documentation is scattered

In MIGRATION workflow:
1. Map all locations
2. Ask if consolidation is desired
3. Can reference multiple locations if user prefers

---

## Related Files

- `bootstrap/detection_guide.md` - Detailed detection instructions
- `bootstrap/greenfield_workflow.md` - New project setup
- `bootstrap/similar_workflow.md` - Upgrade existing workflow
- `bootstrap/migration_workflow.md` - Adapt existing documentation
- `bootstrap/project_questionnaire.md` - Question reference
- `bootstrap/validation_checklist.md` - Final validation

---

**End of Bootstrap Instructions**
