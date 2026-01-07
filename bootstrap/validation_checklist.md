# Bootstrap Validation Checklist

**Purpose:** Final verification steps before declaring bootstrap complete.

**When to use:** After all files have been generated, before presenting summary to user.

---

## Pre-Presentation Validation

Run through this checklist systematically. Fix any issues before showing results to user.

### 1. File Existence Check

**Required Files:**
```
✓ {{DOCS_DIR}}/context_master_guide.md
✓ {{DOCS_DIR}}/technical_status.md  
✓ {{DOCS_DIR}}/implementation_plan.md
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
- implementation_plan.md (title and references)
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

**In implementation_plan.md:**
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
- implementation_plan.md → Last Updated
- Change log entries → Should be today

**Command:**
```bash
grep -r "Last Updated\|Date:" {{DOCS_DIR}}/technical_status.md {{DOCS_DIR}}/implementation_plan.md
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

**implementation_plan.md:**
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
- [ ] Links to implementation_plan.md work
- [ ] References to .clinerules workflow are accurate

**In .clinerules:**
- [ ] References context_master_guide.md path correctly
- [ ] References patterns/ directory correctly
- [ ] References technical_status.md correctly

**In implementation_plan.md:**
- [ ] References context_master_guide.md methodology
- [ ] Points to implementation_plans/ directory

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

**If user says "Yes" to all → Bootstrap complete! 🎉**

**If user says "No" to any → Fix issues and re-validate**

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