# Bootstrap Validation Checklist

**Purpose:** Verification steps at key points during bootstrap - gates that must pass before proceeding.

**When to use:**
- Gate 1.5: Before document generation (after content source mapping)
- Pre-Presentation: After all files generated, before showing to user
- Pre-Finalization: Before calling `finalize_bootstrap`

---

## Gate 1.5: Content Source Mapping Validation

**When:** After content source mapping step, BEFORE document generation begins.

**BLOCKING:** Document generation CANNOT proceed until all checks pass.

### Required Checks

```markdown
### 1. Mapping File Exists
- [ ] `.fluxframe/detected_content_sources.md` exists

### 2. Mapping Status Confirmed
- [ ] File contains "**Status:** ✅ Confirmed" (not "Awaiting user review")

### 3. Bootstrap State Updated
- [ ] `.fluxframe-bootstrap-state.json` exists
- [ ] `contentSourceMapping.status` is "confirmed"

### 4. Project Brief Handled (if required)
- [ ] If no project purpose sources found: `projectBriefRequired` is true in state
- [ ] If `projectBriefRequired`: `project_brief.md` exists in project root
- [ ] If `projectBriefCreated`: mapping updated to include it as source

### 5. Source Coverage
- [ ] `context_master_guide.md` has at least one source OR `projectBriefCreated` is true
- [ ] Each target document has status: ready / no_sources / create_empty / not_applicable
```

### Gate 1.5 Result

```markdown
## Gate 1.5 Check Results

| Check | Status | Notes |
|-------|--------|-------|
| Mapping file exists | ✅/❌ | |
| Status is "Confirmed" | ✅/❌ | |
| Bootstrap state updated | ✅/❌ | |
| Project brief handled | ✅/❌/N/A | |
| Source coverage adequate | ✅/❌ | |

**GATE RESULT:** [✅ PASS - proceed to generation / ❌ FAIL - return to mapping step]
```

### If Gate 1.5 Fails

**DO NOT PROCEED.** Return to content source mapping step and:
1. Address the specific failure condition
2. Re-run the gate check
3. Only proceed when all checks pass

---

## Pre-Presentation Validation

Run through this checklist systematically. Fix any issues before showing results to user.

### 1. File Existence Check

**Required Files:**
```
✓ {{DOCS_DIR}}/context_master_guide.md
✓ {{DOCS_DIR}}/technical_status.md  
✓ {{DOCS_DIR}}/ROADMAP.md
✓ FLUXFRAME_MANUAL.md (in project root)
✓ {{DOCS_DIR}}/patterns/README.md
✓ AGENTS.md (Universal AI baseline)
✓ mcp-server.js
✓ package.json
✓ node_modules/ (directory with dependencies)
```

**Tool-Specific (Based on selection):**
```
✓ CLAUDE.md and .claude/rules/ (Claude Code Full)
✓ .roomodes and .roo/rules/ (Roo Code Full)
✓ .clinerules/ Folder (Cline Full)
✓ GEMINI.md (Antigravity Full)
✓ Symlinks for basic compatibility (if chosen)
```

**Conditional Files:**
```
✓ {{DOCS_DIR}}/api_contract_standards.md (if API approach chosen)
✓ {{DOCS_DIR}}/patterns/api_patterns.md (if has backend)
✓ {{DOCS_DIR}}/patterns/ui_patterns.md (if has frontend)
✓ {{DOCS_DIR}}/patterns/data_patterns.md (if has database)
✓ {{DOCS_DIR}}/workflows/README.md (if workflows requested)
```

**Check:** Do all expected files exist?
- [ ] Yes → Continue
- [ ] No → Create missing files

---

### 2. Placeholder Removal Check

**Search for unfilled placeholders:**

**In ALL generated files, search for:**
- `{{` - Template placeholder syntax
- `[TO BE` - Incomplete placeholders
- `[YOUR_` - Generic placeholders
- `<!-- TEMPLATE:` - Template comments

**Command to check:**
```bash
grep -r "{{" {{DOCS_DIR}}/ .clinerules mcp-server.js
grep -r "\[TO BE" {{DOCS_DIR}}/
grep -r "\[YOUR_" {{DOCS_DIR}}/
grep -r "<!-- TEMPLATE:" {{DOCS_DIR}}/
```

**Expected result:** No matches (or only in code examples)

**If found:**
- [ ] Review each occurrence
- [ ] Fill with appropriate value
- [ ] Re-check

---

### 3. Project Name Consistency Check

**Search for project name in:**
- context_master_guide.md (title and references)
- technical_status.md (title and content)
- ROADMAP.md (title and references)
- .clinerules (project name field)
- mcp-server.js (PROJECT_NAME constant)
- package.json (name field)

**Command:**
```bash
grep -i "project name\|{{PROJECT_NAME}}" {{DOCS_DIR}}/* .clinerules mcp-server.js package.json
```

**Validation:**
- [ ] Same name everywhere
- [ ] No variations or typos
- [ ] Consistent capitalization

---

### 4. Path Consistency Check

**All references to documentation directory should match:**

**Check these locations:**
- .clinerules → Single source of truth path
- mcp-server.js → PROJECT_DOCS_DIR constant
- All internal doc links in context_master_guide.md

**Command:**
```bash
grep -r "project_docs\|{{DOCS_DIR}}" .clinerules mcp-server.js {{DOCS_DIR}}/
```

**Validation:**
- [ ] All paths point to same directory
- [ ] Paths are relative (not absolute)
- [ ] Paths work for user's OS (/ vs \)

---

### 5. API Contract Approach Consistency

**If user chose API approach, verify:**

**In .clinerules:**
- [ ] Has API contract rules section
- [ ] Rules match chosen approach (OpenAPI/GraphQL/etc)
- [ ] References api_contract_standards.md

**In api_contract_standards.md (if exists):**
- [ ] Content matches chosen approach
- [ ] Examples use project's stack
- [ ] No contradictions with .clinerules

**In context_master_guide.md:**
- [ ] API approach mentioned in Section 2
- [ ] Consistent with other files

---

### 6. Technology Stack Consistency

**Verify stack is consistent:**

**In technical_status.md:**
- [ ] Frontend tech matches user info
- [ ] Backend tech matches user info
- [ ] Database matches user info

**In ROADMAP.md:**
- [ ] Tech stack section accurate
- [ ] Architecture type correct

**In pattern files:**
- [ ] Only relevant pattern files created
- [ ] No frontend patterns for backend-only projects
- [ ] No API patterns for static sites

---

### 7. Date Accuracy Check

**All dates should be current:**

**Check:**
- technical_status.md → Last Updated
- ROADMAP.md → Last Updated
- Change log entries → Should be today

**Command:**
```bash
grep -r "Last Updated\|Date:" {{DOCS_DIR}}/technical_status.md {{DOCS_DIR}}/ROADMAP.md
```

**Validation:**
- [ ] All dates are today's date
- [ ] Consistent date format (YYYY-MM-DD or spelled out)

---

### 8. Markdown Validity Check

**Verify all markdown files are valid:**

**Check for:**
- Balanced markdown syntax
- Valid headers (# ## ### etc)
- No broken internal links
- Proper code block formatting

**For each .md file:**
1. Open in preview mode
2. Ensure renders correctly
3. Click internal links to verify they work

**Common issues:**
- Unmatched ``` code blocks
- Broken relative links
- Incorrect header levels

---

### 9. MCP Server Functionality Test

**Test server starts successfully:**

```bash
node mcp-server.js
```

**Expected output:**
```
Project Docs MCP Server running on stdio
Single source of truth: [DOCS_DIR]/context_master_guide.md
```

**Validation:**
- [ ] Starts without errors
- [ ] Mentions correct project
- [ ] Can be stopped with Ctrl+C

**If errors:**
- Check PROJECT_DOCS_DIR path
- Verify context_master_guide.md exists
- Check for syntax errors in JS

---

### 10. Dependency Installation Check

```bash
ls node_modules/@modelcontextprotocol/sdk
```

**Expected:** Directory exists with package contents

**If missing:**
```bash
npm install
```

**Validation:**
- [ ] @modelcontextprotocol/sdk installed
- [ ] package-lock.json created
- [ ] No npm errors

---

### 11. Content Quality Spot Check

**Sample key sections for quality:**

**context_master_guide.md:**
- [ ] Section 1 (Philosophy) is complete
- [ ] Section 3 (Golden Rule) is complete
- [ ] Section 4 (Pattern-Driven) is complete
- [ ] Section 5 (Change Protocol) is complete
- [ ] No "CultureFit" references
- [ ] No other real project references

**technical_status.md:**
- [ ] Current State section filled
- [ ] Tech stack accurate
- [ ] Next Steps are actionable
- [ ] Bootstrap completion noted

**ROADMAP.md:**
- [ ] Cycle 1.1 has placeholder for definition
- [ ] Roadmap structure is clear
- [ ] Alignment rules are included

---

### 12. .clinerules Verification

**Critical rules present:**

```
Required sections:
✓ Date Handling
✓ Single Source of Truth (with correct path)
✓ Session Protocol
✓ Document Update Approval
✓ MCP Tools Available
✓ Critical Rules (including API contract rules if applicable)
```

**Universal session protocol:**
```
✓ "EVERY chat session MUST start with"
✓ "BEFORE any code changes"
✓ "Rules apply to:" (all interaction types listed)
```

**Check:**
- [ ] All sections present
- [ ] Paths reference {{DOCS_DIR}} value
- [ ] API rules match chosen approach
- [ ] No TODOs or incomplete sections

---

### 13. Cross-Reference Validation

**Verify documents reference each other correctly:**

**In context_master_guide.md:**
- [ ] References to patterns/ directory are correct
- [ ] Links to ROADMAP.md work
- [ ] References to .clinerules workflow are accurate

**In .clinerules:**
- [ ] References context_master_guide.md path correctly
- [ ] References patterns/ directory correctly
- [ ] References technical_status.md correctly

**In ROADMAP.md:**
- [ ] References context_master_guide.md methodology
- [ ] Points to roadmap/ directory
- [ ] Two-tier planning system explanation included
- [ ] Planning workflow (MCP tools) documented

**In roadmap/:**
- [ ] Directory exists (may be empty initially)
- [ ] Template is referenced in planning workflow

---

### 14. No Template Artifacts Check

**Search for template-specific content:**

```bash
grep -r "CultureFit\|Steel Thread\|TaskFlow Pro" {{DOCS_DIR}}/ .clinerules
```

**Expected:**
- "Steel Thread" should be replaced with "Cycle" or "Iteration"
- "CultureFit" should not appear (except maybe in disclaimers)
- "TaskFlow Pro" should not appear (that's just an example)

**Exception:** Examples might reference "like the TaskFlow Pro example" - that's ok

**Validation:**
- [ ] No inappropriate references
- [ ] Terminology is generic
- [ ] Examples are adapted to project

---

### 15. User-Specific Validation

**Ensure customization matches user:**

**If user has existing docs:**
- [ ] Framework files don't overwrite user's docs
- [ ] Integration approach documented
- [ ] User acknowledged dual structure

**If user chose custom paths:**
- [ ] All paths use custom location
- [ ] No hardcoded "project_docs/" references
- [ ] Instructions reflect custom choice

**If user chose minimal setup:**
- [ ] Only core files created
- [ ] Optional files skipped
- [ ] Noted in technical_status.md what's missing

---

## Final Pre-Presentation Checklist

**Before presenting to user, confirm:**

- [ ] All 15 validation sections completed
- [ ] All issues found were fixed
- [ ] MCP server tested successfully
- [ ] All files are readable (proper permissions)
- [ ] No errors in any file
- [ ] Consistent project identity throughout

---

## Red Flags (Fix Immediately)

**Critical issues that MUST be fixed:**

🚨 **MCP server won't start** → Fix paths and syntax
🚨 **Unfilled `{{PLACEHOLDERS}}`** → Fill all placeholders
🚨 **Wrong path separators** → Fix for user's OS
🚨 **Inconsistent project name** → Make consistent
🚨 **Missing required files** → Create missing files
🚨 **Broken internal links** → Fix all links
🚨 **Real project references** → Remove all references
🚨 **Dependencies not installed** → Run npm install

**If any red flags → DO NOT present to user until fixed**

---

## Post-Presentation Validation

**After user reviews and approves:**

### Final Test

```bash
# Test MCP server one more time
node mcp-server.js

# Verify docs are readable  
cat {{DOCS_DIR}}/context_master_guide.md | head -20

# Check file permissions
ls -la {{DOCS_DIR}}/
```

### User Acceptance

Ask user to confirm:
1. "Can you open and read context_master_guide.md?"
2. "Do the file paths look correct for your system?"
3. "Does the project name and description match your expectations?"

**If user says "Yes" to all → Proceed to Cleanup Phase**

**If user says "No" to any → Fix issues and re-validate**

---

## Phase 5: Cleanup and Activate Project Rules

**CRITICAL:** After user confirms bootstrap is working:
1. **Activate project rules** by moving from staging to final locations
2. **Remove FluxFrame template files** that are no longer needed

### Why This Two-Step Process

During bootstrap, temporary "bootstrap-resume" rules existed at final locations (CLAUDE.md, AGENTS.md, etc.) telling the AI to continue bootstrap on restart. The REAL project rules were generated to `.fluxframe-pending/` staging directory.

Now we:
1. Replace temporary bootstrap-resume rules with real project rules
2. Remove all FluxFrame template/framework files

### 16. Cleanup Confirmation

Present to user:
```markdown
## Cleanup: Activate Project Rules & Remove Templates

Your project is now bootstrapped with FluxFrame. I'll now:
1. **Activate your project's AI rules** (move from staging to final locations)
2. **Remove FluxFrame template files** that are no longer needed

### AI Rules to ACTIVATE (move from staging):
- `.fluxframe-pending/AGENTS.md` → `AGENTS.md`
- `.fluxframe-pending/CLAUDE.md` → `CLAUDE.md` (if generated)
- `.fluxframe-pending/.clinerules/` → `.clinerules/` (if generated)
- `.fluxframe-pending/.roomodes` → `.roomodes` (if generated)
- `.fluxframe-pending/GEMINI.md` → `GEMINI.md` (if generated)

### Files to REMOVE (redundant templates):
- `fluxframe/` - The entire FluxFrame directory (bootstrap complete)
- `.fluxframe-pending/` - Staging directory (after moving files)
- `.fluxframe-bootstrap-state.json` - Bootstrap state tracking (optional: keep as record)

### Files that STAY (your project files):
- `{{DOCS_DIR}}/` - Your project documentation
- `AGENTS.md` - Your AI baseline rules (activated from staging)
- `[tool-specific files]` - Your tool configurations (activated from staging)
- `mcp-server.js` - Your MCP server
- `package.json` - Your project config
- `README.md` - Your project readme (will be updated)
- `.fluxframe-backup/` - Your backup (if created, keep until confident)

Shall I activate your project rules and remove the template files now?
```

**Validation:**
- [ ] User confirmed cleanup
- [ ] User understands rules will be activated from staging

---

### 17. Activate Project Rules (Move from Staging)

**CRITICAL: Do this BEFORE removing FluxFrame directory**

**Commands (Unix/macOS):**
```bash
# Move AI rules from staging to final locations
# (overwrites temporary bootstrap-resume rules)

# Universal baseline - always present
mv .fluxframe-pending/AGENTS.md ./AGENTS.md

# Claude Code (if generated)
[ -f .fluxframe-pending/CLAUDE.md ] && mv .fluxframe-pending/CLAUDE.md ./CLAUDE.md
[ -d .fluxframe-pending/.claude ] && rm -rf .claude && mv .fluxframe-pending/.claude ./.claude

# Cline (if generated)
[ -d .fluxframe-pending/.clinerules ] && rm -rf .clinerules && mv .fluxframe-pending/.clinerules ./.clinerules
[ -f .fluxframe-pending/.clinerules ] && mv .fluxframe-pending/.clinerules ./.clinerules

# Roo Code (if generated)
[ -f .fluxframe-pending/.roomodes ] && mv .fluxframe-pending/.roomodes ./.roomodes
[ -d .fluxframe-pending/.roo ] && rm -rf .roo && mv .fluxframe-pending/.roo ./.roo

# Antigravity (if generated)
[ -f .fluxframe-pending/GEMINI.md ] && mv .fluxframe-pending/GEMINI.md ./GEMINI.md

# Cursor (if generated)
[ -f .fluxframe-pending/.cursorrules ] && mv .fluxframe-pending/.cursorrules ./.cursorrules
```

**Commands (Windows PowerShell):**
```powershell
Move-Item -Force .fluxframe-pending\AGENTS.md .\AGENTS.md

if (Test-Path .fluxframe-pending\CLAUDE.md) { Move-Item -Force .fluxframe-pending\CLAUDE.md .\CLAUDE.md }
if (Test-Path .fluxframe-pending\.claude) { Remove-Item -Recurse -Force .\.claude -ErrorAction SilentlyContinue; Move-Item -Force .fluxframe-pending\.claude .\.claude }

if (Test-Path .fluxframe-pending\.clinerules) { Remove-Item -Recurse -Force .\.clinerules -ErrorAction SilentlyContinue; Move-Item -Force .fluxframe-pending\.clinerules .\.clinerules }

if (Test-Path .fluxframe-pending\.roomodes) { Move-Item -Force .fluxframe-pending\.roomodes .\.roomodes }
if (Test-Path .fluxframe-pending\.roo) { Remove-Item -Recurse -Force .\.roo -ErrorAction SilentlyContinue; Move-Item -Force .fluxframe-pending\.roo .\.roo }

if (Test-Path .fluxframe-pending\GEMINI.md) { Move-Item -Force .fluxframe-pending\GEMINI.md .\GEMINI.md }
if (Test-Path .fluxframe-pending\.cursorrules) { Move-Item -Force .fluxframe-pending\.cursorrules .\.cursorrules }
```

**Validation:**
- [ ] AGENTS.md moved from staging to final location
- [ ] Tool-specific rules moved (if applicable)
- [ ] No errors during move

---

### 18. Remove FluxFrame Template Files

**Commands (Unix/macOS):**
```bash
# Remove the FluxFrame directory entirely
rm -rf fluxframe/

# Remove staging directory (should be empty or nearly empty now)
rm -rf .fluxframe-pending/

# Optional: Remove or keep bootstrap state as a record
rm -f .fluxframe-bootstrap-state.json

# Keep backup if it exists: .fluxframe-backup/
```

**Commands (Windows PowerShell):**
```powershell
Remove-Item -Recurse -Force fluxframe -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .fluxframe-pending -ErrorAction SilentlyContinue
Remove-Item -Force .fluxframe-bootstrap-state.json -ErrorAction SilentlyContinue
```

**Validation:**
- [ ] `fluxframe/` directory removed
- [ ] `.fluxframe-pending/` staging directory removed
- [ ] No errors during removal

---

### 19. Update README.md

Replace FluxFrame's README with project-specific content:

```markdown
# [PROJECT_NAME]

[PROJECT_PURPOSE]

## Quick Start

[Basic setup instructions]

## Development

This project uses the FluxFrame methodology for AI-assisted development.

### Documentation
- See `{{DOCS_DIR}}/context_master_guide.md` for development guidelines
- See `{{DOCS_DIR}}/technical_status.md` for current project state

### AI Assistance
- MCP Server: `npm run mcp`
- AI Rules: See `AGENTS.md` and tool-specific configurations

## License

[License information]
```

**Validation:**
- [ ] README.md updated with project info
- [ ] No FluxFrame framework references remain

---

### 20. Verify Cleanup Complete

```bash
# Verify only project files remain
ls -la

# Verify AI rules are now the real project rules (not bootstrap-resume)
head -5 AGENTS.md  # Should NOT say "Bootstrap In Progress"

# Test MCP server still works
node mcp-server.js

# Verify docs still accessible
ls {{DOCS_DIR}}/

# Verify staging and fluxframe directories are gone
[ -d .fluxframe-pending ] && echo "ERROR: staging still exists" || echo "OK: staging removed"
[ -d fluxframe ] && echo "ERROR: fluxframe still exists" || echo "OK: fluxframe removed"
```

**Validation:**
- [ ] Only project files remain
- [ ] No `fluxframe/` directory
- [ ] No `.fluxframe-pending/` directory
- [ ] `AGENTS.md` contains real project rules (not "Bootstrap In Progress")
- [ ] Tool-specific rules contain real project rules
- [ ] MCP server still works
- [ ] Documentation accessible

---

### 21. Final Confirmation

Present to user:
```markdown
## ✅ Bootstrap Complete!

Your project's AI rules are now active, and FluxFrame template files have been removed.

### What Was Done:
1. **Activated project rules** - Moved from staging to final locations
2. **Removed templates** - FluxFrame directory and staging cleaned up

### Your Project Now Contains:
- Your generated documentation in `{{DOCS_DIR}}/`
- Your AI rules (`AGENTS.md` + tool-specific files) - **now active**
- Your MCP server (`mcp-server.js`)
- Your project configuration

**Your project is ready for development!**

**Next Steps:**
1. Configure your project's MCP server in your AI tool (replace bootstrap MCP with project MCP)
2. Define Cycle 1.1 in `{{DOCS_DIR}}/ROADMAP.md`
3. When ready to implement Cycle 1.1:
   - Call `start_cycle_planning("1.1")` to initiate planning
   - Call `analyze_cycle_scope()` to assess complexity
   - Call `create_cycle_plan("1.1", "Cycle Name")` to create detailed plan
   - Get user approval, then call `approve_cycle_plan("1.1")`
   - THEN start implementing
4. Start developing! Use the two-tier planning system for all cycles.
```

---

## Success Criteria

Bootstrap is validated and ready when:

✅ All 15 validation sections completed
✅ All red flags addressed  
✅ MCP server runs successfully
✅ All files created and readable
✅ No template artifacts remain
✅ User confirmed docs are correct
✅ Ready to define Cycle 1.1

---

## Troubleshooting Common Issues

### Issue: Grep shows placeholders

**Fix:** Manually review files and replace placeholders

### Issue: MCP server path error

**Fix:** Check `PROJECT_DOCS_DIR` in mcp-server.js matches actual directory

### Issue: npm install fails

**Fix:** Check node/npm version, try `--legacy-peer-deps`

### Issue: Markdown won't render

**Fix:** Check for unmatched code blocks, fix syntax

### Issue: Paths don't work on Windows

**Fix:** Use path.join() in JS, use / in markdown (works cross-platform)

---

## Validation Complete

**When all checks pass:**

✅ Present bootstrap summary to user
✅ Guide them to next steps
✅ Mark task as complete

**Template for completion message:**

```markdown
# ✅ Bootstrap Validation Complete

All systems validated:
- 15 validation checks passed
- MCP server tested and working
- All files created and verified
- No template artifacts remaining
- Consistent project configuration

Your framework is ready to use! 🚀

Next: Define Cycle 1.1 and start developing.