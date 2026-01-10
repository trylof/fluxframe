# Bootstrap Instructions for AI Assistants

**Purpose:** Unified entry point for AI assistants (Claude/Roo/Cline/Antigravity) to set up FluxFrame for any project - whether new or existing.

**When to use:** When a user wants to add FluxFrame to their project. This works for:
- 🆕 **New projects** with no existing workflow
- 🔄 **Existing projects** with AI workflows (Cline, Claude Code, etc.)
- 📚 **Existing projects** with documentation (ADRs, wikis, bug fixes, etc.)

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

---

## Gate 2: MCP Configuration

**After dependencies are installed, set up MCP if needed.**

### Step 2.1: Check if MCP is Already Configured

**DO NOT immediately try to call `get_bootstrap_state`.** First, check if MCP configuration exists.

Check for the MCP configuration file based on the AI tool being used:

| AI Tool | Config File Location |
|---------|---------------------|
| Claude Code | `~/.claude/claude_desktop_config.json` |
| Cline | VS Code settings or `~/.config/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json` |
| Roo Code | VS Code Roo MCP settings |
| Cursor | Cursor MCP settings |

**If config file exists and contains "fluxframe-bootstrap":** Proceed to Step 2.3 (verify it works).

**If config file doesn't exist or doesn't have FluxFrame:** Proceed to Step 2.2 (configure it).

### Step 2.2: Configure MCP Automatically

**IMPORTANT: Try to configure MCP yourself first.** You have terminal access and can edit files. Only ask the user to do it manually if you cannot.

**For Claude Code:**

1. **Check if config file exists:**
   ```bash
   cat ~/.claude/claude_desktop_config.json 2>/dev/null || echo "File does not exist"
   ```

2. **Determine the correct configuration:**
   - FluxFrame directory: The directory containing this BOOTSTRAP_INSTRUCTIONS.md file
   - Project directory (cwd): The user's project directory that will be bootstrapped

3. **Create or update the config file:**

   **If file doesn't exist, create it:**
   ```bash
   mkdir -p ~/.claude
   cat > ~/.claude/claude_desktop_config.json << 'EOF'
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

   **If file exists, read it, add the fluxframe-bootstrap server, and write it back.**
   Be careful to preserve existing MCP servers in the config.

4. **After writing the config, inform the user:**
   ```
   I've configured the FluxFrame bootstrap MCP server. To activate it:

   1. Completely restart Claude Code (close and reopen, not just refresh)
   2. Start a new conversation
   3. Ask me to continue the FluxFrame bootstrap

   The MCP tools will be available after restart.
   ```

**For other AI tools:**
- Attempt to locate and edit the config file if you have access
- If you cannot edit the config (e.g., it's in a GUI-only location), then guide the user through manual setup

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
     "mcpServers": {
       "fluxframe-bootstrap": {
         "command": "node",
         "args": ["[EXACT_FLUXFRAME_PATH]/mcp-server/bootstrap-mcp-server.js"],
         "cwd": "[EXACT_PROJECT_PATH]"
       }
     }
   }
   ```

   Fill in the actual paths - don't make the user figure them out.

3. **Tell them exactly where to put it:**
   - For Claude Code: `~/.claude/claude_desktop_config.json`
   - Explain how to merge if they have existing MCP servers

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
5. Multiple (specify which)
6. Other / Universal AGENTS.md only
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
- implementation_plan.md - Roadmap
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
3. Define Cycle 1.1 in implementation_plan.md
4. Start developing with FluxFrame workflow!

### Quick Reference

- **Start a cycle:** Define in implementation_plan.md, follow cycle_workflow.md
- **Fix a bug:** Use change_request_protocol.md
- **Add a pattern:** Document in patterns/ following template
- **Update status:** Keep technical_status.md current
```

---

## Phase 5: Cleanup FluxFrame Template Files

**CRITICAL:** After user confirms bootstrap is complete and working, remove redundant FluxFrame framework files.

### Why Cleanup Is Necessary

When FluxFrame bootstraps a project, it generates all necessary files. The original template/framework files become redundant and should be removed to:
- Keep the project clean
- Avoid confusion between templates and generated files
- Reduce project size
- Prevent accidental use of templates instead of generated docs

### Step 5.1: Present Cleanup Summary

Ask user for confirmation:

```markdown
## Cleanup: Remove FluxFrame Template Files

Your project is now bootstrapped with FluxFrame. The framework template files are no longer needed.

### Files to REMOVE (redundant templates):
- `BOOTSTRAP_INSTRUCTIONS.md` - Bootstrap complete
- `RESTRUCTURE_PLAN.md` - Internal planning (if exists)
- `ai-rules/` - Templates (your rules are in AGENTS.md + tool-specific files)
- `bootstrap/` - Workflow instructions (bootstrap complete)
- `doc-templates/` - Templates (your docs are in [docs_path]/)
- `mcp-server/` - Template (your server is at ./mcp-server.js)
- `pattern-library-system/` - Meta-patterns (your patterns are in [docs_path]/patterns/)
- `development-cycles/` - Framework docs (your workflows are in [docs_path]/workflows/)
- `testing-framework/` - Framework reference docs
- `examples/` - Example project (not needed)

### Files that STAY (your project files):
- `[docs_path]/` - Your project documentation
- `AGENTS.md` - Your AI baseline rules
- `[tool-specific files]` - Your tool configurations
- `mcp-server.js` - Your MCP server
- `package.json` - Your project config
- `README.md` - Your project readme (will be updated/replaced)
- `PHILOSOPHY.md` - (Optional: can keep as reference or remove)

Shall I remove the template files now?
```

### Step 5.2: Execute Cleanup

**Commands to execute (after user approval):**

```bash
# Remove redundant FluxFrame template directories
rm -rf ai-rules/
rm -rf bootstrap/
rm -rf doc-templates/
rm -rf mcp-server/
rm -rf pattern-library-system/
rm -rf development-cycles/
rm -rf testing-framework/
rm -rf examples/

# Remove redundant FluxFrame files
rm -f BOOTSTRAP_INSTRUCTIONS.md
rm -f RESTRUCTURE_PLAN.md

# Optional: Remove or keep PHILOSOPHY.md based on user preference
# rm -f PHILOSOPHY.md
```

**Windows equivalent:**
```powershell
Remove-Item -Recurse -Force ai-rules, bootstrap, doc-templates, mcp-server, pattern-library-system, development-cycles, testing-framework, examples
Remove-Item -Force BOOTSTRAP_INSTRUCTIONS.md, RESTRUCTURE_PLAN.md
```

### Step 5.3: Update README.md

Replace FluxFrame's README with project-specific content:

```markdown
# [PROJECT_NAME]

[PROJECT_PURPOSE]

## Quick Start

[Basic setup instructions]

## Development

This project uses the FluxFrame methodology for AI-assisted development.

### Documentation
- See `[docs_path]/context_master_guide.md` for development guidelines
- See `[docs_path]/technical_status.md` for current project state

### AI Assistance
- MCP Server: `npm run mcp`
- AI Rules: See `AGENTS.md` and tool-specific configurations

## License

[License information]
```

### Step 5.4: Verify Cleanup

After cleanup, verify:
- [ ] Only project files remain
- [ ] No template directories left
- [ ] MCP server still works: `node mcp-server.js`
- [ ] Documentation accessible in `[docs_path]/`

### Step 5.5: Final Confirmation

```markdown
## ✅ Cleanup Complete!

FluxFrame template files have been removed. Your project now contains only:
- Your generated documentation
- Your AI rules
- Your MCP server
- Your project files

**Your project is ready for development!**

Next: Define Cycle 1.1 in `[docs_path]/implementation_plan.md`
```

---

## Target Output

A successfully bootstrapped project will have:

```
[project root]/
├── [docs_location]/
│   ├── context_master_guide.md      # Single source of truth
│   ├── technical_status.md          # Real-time project state
│   ├── implementation_plan.md       # Roadmap & cycles
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
