# Similar Workflow Bootstrap

**Purpose:** Upgrade an existing AI-assisted development workflow to FluxFrame.

**When to use:** Project was classified as `SIMILAR_WORKFLOW` - it has existing AI rules (`.clinerules`, `AGENTS.md`, etc.) with structured workflows that are similar to FluxFrame's approach.

**Goal:** Enhance and standardize existing setup, preserve user customizations, add missing FluxFrame components.

---

## Prerequisites

Before starting this workflow:
- ✅ Detection phase complete (see `detection_guide.md`)
- ✅ Project classified as `SIMILAR_WORKFLOW`
- ✅ User confirmed they want to proceed
- ✅ You have identified existing AI rules and documentation

---

## Workflow Overview

```
┌─────────────────────────────────────────────────────────────────┐
│              SIMILAR WORKFLOW BOOTSTRAP                          │
├─────────────────────────────────────────────────────────────────┤
│  Phase 1: Inventory existing setup                               │
│  Phase 2: Diff against FluxFrame templates                      │
│  Phase 3: User decisions on each difference                     │
│  Phase 4: Generate merged/upgraded configuration                │
│  Phase 5: Add missing FluxFrame components                      │
│  Phase 6: Validation and handoff                                │
└─────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Inventory Existing Setup

### Step 1.1: Document What Exists

Create a complete inventory of the existing setup:

```markdown
## Existing Setup Inventory

### AI Rules
- **Tool:** [Cline/Roo/Claude Code/etc.]
- **Location:** [file/directory path]
- **Structure:** [single file / directory with multiple files]
- **Files found:**
  - [List each file with brief description]

### Documentation
- **Location:** [project_docs/, docs/, etc.]
- **Files found:**
  - [List each file]
- **Structure notes:** [How is it organized?]

### Patterns
- **Location:** [path]
- **Pattern count:** [number]
- **Categories:** [list]

### Bug Fixes / Change History
- **Location:** [path]
- **Count:** [number of files]
- **Format:** [description]

### MCP Server
- **Exists:** [Yes/No]
- **Location:** [path if exists]
- **Configured:** [Yes/No/Partial]
```

### Step 1.2: Read and Understand Content

For each detected AI rules file, read the content and identify:

**Rules Categories:**
- Project context rules
- Development workflow rules
- Pattern-related rules
- Testing rules
- API contract rules
- Documentation rules
- Custom/project-specific rules

**Workflows Defined:**
- Iteration/cycle workflow?
- Change request protocol?
- Pattern documentation workflow?
- Other workflows?

**References:**
- What documentation does it reference?
- What patterns does it mention?
- What tools/commands does it specify?

---

## Phase 2: Diff Against FluxFrame

### Step 2.1: Compare AI Rules

For each major category, compare existing rules with FluxFrame templates:

**Comparison Table Format:**
```markdown
### [Category Name] Rules Comparison

| Aspect | Your Current Rules | FluxFrame Template | Difference |
|--------|-------------------|-------------------|------------|
| [aspect] | [what you have] | [what FluxFrame has] | [description] |
```

**Categories to Compare:**

1. **Project Context**
   - Single source of truth approach
   - Context document references
   - MCP integration

2. **Development Workflow**
   - Cycle/iteration methodology
   - Before/during/after checklist
   - Completion criteria

3. **Pattern-Driven Development**
   - Pattern check before implementing
   - Pattern documentation requirements
   - Pattern library structure

4. **API Contracts**
   - Contract-first approach
   - Type safety enforcement
   - Validation requirements

5. **Testing Philosophy**
   - Test-implementation alignment
   - No stubs rule
   - Test writing timing

6. **Documentation First**
   - Documentation requirements
   - Update triggers
   - Single source of truth

7. **Change Request Protocol**
   - Bug fix workflow
   - Iteration rules
   - Documentation timing

### Step 2.2: Identify Significant Differences

A difference is **significant** if:
- Your rule contradicts FluxFrame principle
- Your rule adds project-specific requirements FluxFrame doesn't cover
- Your rule uses different terminology for same concept
- Your rule is missing something FluxFrame considers essential

A difference is **minor** if:
- Just different wording for same concept
- Formatting differences
- Example differences

---

## Phase 3: User Decisions

### Step 3.1: Present Differences

For each **significant** difference, present to user:

```markdown
### Difference [N]: [Category] - [Aspect]

**Your current rule:**
```
[exact content of user's rule]
```

**FluxFrame approach:**
```
[FluxFrame template content for same aspect]
```

**Analysis:**
[Explain what's different and why it matters]

**Options:**
1. **Keep yours** - Preserve your custom rule
2. **Use FluxFrame** - Replace with FluxFrame standard
3. **Merge** - Combine both (explain how)

**Recommendation:** [Your recommendation with reasoning]

Your choice (1/2/3)?
```

### Step 3.2: Handle Each Category

**Project-Specific Rules:**
- These are almost always "Keep yours"
- FluxFrame doesn't have project-specific context

**Workflow Rules:**
- If user's workflow is robust, offer merge
- If user's workflow is simpler, recommend FluxFrame upgrade

**Pattern Rules:**
- Usually recommend FluxFrame (more comprehensive)
- Keep user's pattern categories/structure if valuable

**Testing Rules:**
- Check if user has specific testing framework rules
- Keep those, add FluxFrame philosophy

**Documentation Rules:**
- Usually recommend FluxFrame approach
- Keep user's custom documentation locations

### Step 3.3: Record Decisions

Create decision record:

```markdown
## Rule Merge Decisions

| Category | Decision | Notes |
|----------|----------|-------|
| Project Context | Keep | User has detailed project-specific context |
| Development Workflow | FluxFrame | User wants to adopt cycle methodology |
| Pattern Rules | Merge | Keep user's categories, add FluxFrame workflow |
| API Contracts | FluxFrame | User didn't have contract enforcement |
| Testing | Keep | User has specific pytest rules to preserve |
| Documentation | Merge | Keep user's locations, add FluxFrame structure |
| Change Protocol | FluxFrame | User wants systematic approach |
```

---

## Phase 4: Generate Merged Configuration

### Step 4.1: Create Backup

Before making any changes:

```bash
# Create backup directory
mkdir -p .fluxframe-backup/$(date +%Y%m%d_%H%M%S)

# Backup existing AI rules
cp -r .clinerules/ .fluxframe-backup/$(date +%Y%m%d_%H%M%S)/ 2>/dev/null || true
cp AGENTS.md .fluxframe-backup/$(date +%Y%m%d_%H%M%S)/ 2>/dev/null || true
cp CLAUDE.md .fluxframe-backup/$(date +%Y%m%d_%H%M%S)/ 2>/dev/null || true
# ... backup other detected AI rule files
```

**Tell user:** "I've backed up your existing configuration to `.fluxframe-backup/[timestamp]/`"

### Step 4.2: Build Merged Rules

Based on decisions from Phase 3, construct new rule files:

**For AGENTS.md (always created):**
```markdown
# Project: {{PROJECT_NAME}}

[START WITH: User's kept project context]

## Core Principles

[MERGE: User's principles + FluxFrame essentials]

## Development Workflow

[USE: Decision-based - either user's, FluxFrame's, or merged]

## Pattern Library

[MERGE: User's patterns + FluxFrame pattern workflow]

... etc
```

**For tool-specific files (.clinerules/, CLAUDE.md, etc.):**
- Follow same merge logic
- Preserve user's organizational structure if they prefer it
- Add FluxFrame sections that were missing

### Step 4.3: Handle Documentation

For existing documentation:

**If documentation structure is similar to FluxFrame:**
- Keep existing files
- Add missing FluxFrame documents
- Update references in rules to point to existing docs

**If documentation needs restructuring:**
- Ask user: "Should I reorganize to FluxFrame structure or keep current?"
- If reorganize: Create new structure, move content
- If keep: Adapt FluxFrame references to existing structure

---

## Phase 5: Add Missing Components

### Step 5.1: Identify Gaps

Compare existing setup to full FluxFrame setup:

```markdown
## Component Gap Analysis

### AI Rules
- [x] AGENTS.md - [exists/needs update]
- [ ] CLAUDE.md - [missing - create if Claude Code used]
- [ ] .roomodes - [missing - create if Roo Code used]
- [x] .clinerules/ - [exists - upgraded]

### Documentation
- [x] context_master_guide.md - [exists as context_guide.md]
- [x] technical_status.md - [exists as status.md]
- [ ] implementation_plan.md - [missing - create]
- [ ] api_contract_standards.md - [missing - create if has API]
- [x] patterns/ - [exists]
- [ ] workflows/ - [missing - create]
- [ ] bug_fixes/ - [exists as fixes/]

### MCP Server
- [ ] mcp-server.js - [missing - create]
- [ ] package.json updates - [needed]

### Other
- [ ] Workflow documentation - [needed]
```

### Step 5.2: Create Missing Components

For each missing component:

1. **Use FluxFrame templates** from `doc-templates/`
2. **Fill with project info** gathered from existing docs
3. **Adapt references** to match existing structure
4. **Present to user** before creating

**Example dialogue:**
```
I notice you're missing an implementation_plan.md. Based on your existing 
documentation, I can create one with your current roadmap/backlog information.

Should I:
1. Create implementation_plan.md from FluxFrame template
2. Skip this (you'll add it later)
3. Point me to an existing file that serves this purpose

Your choice?
```

### Step 5.3: MCP Server Setup

If MCP server doesn't exist:

1. Create `mcp-server.js` from template
2. Configure paths to match existing documentation structure
3. Add to `package.json` (create or update)
4. Test that it starts correctly

If MCP server exists but is different:
1. Compare capabilities
2. Ask user: merge features or replace?
3. Implement decision

---

## Phase 6: Validation and Handoff

### Step 6.1: Validate Configuration

Run through checklist:

**AI Rules Validation:**
- [ ] AGENTS.md exists and contains project context
- [ ] Tool-specific rules exist for each selected tool
- [ ] Rules reference correct documentation paths
- [ ] No placeholder text remaining
- [ ] User customizations preserved as decided

**Documentation Validation:**
- [ ] Context guide exists and is complete
- [ ] Technical status reflects current state
- [ ] Pattern library structure exists
- [ ] Workflows documented (or acknowledged as TODO)
- [ ] Bug fixes directory exists

**MCP Server Validation:**
- [ ] Server file exists
- [ ] Server starts without errors
- [ ] Correct paths configured
- [ ] Dependencies installed

**Consistency Check:**
- [ ] Document paths consistent across rules and configs
- [ ] Project name consistent everywhere
- [ ] Tech stack referenced correctly

### Step 6.2: Present Summary

```markdown
## FluxFrame Upgrade Complete

### What Changed

**AI Rules:**
- Updated `.clinerules/` with FluxFrame workflow enhancements
- Created `AGENTS.md` as universal baseline
- [List other changes]

**Preserved from your setup:**
- [List preserved customizations]
- [List preserved documentation]
- [List preserved patterns]

**Added from FluxFrame:**
- [List new components added]

### Backup Location
Your original configuration was backed up to:
`.fluxframe-backup/[timestamp]/`

### Configuration Summary
[Include final configuration details similar to greenfield handoff]

### Next Steps
1. Review the changes in your AI rules
2. Test MCP server: `npm run mcp`
3. Start a new development cycle to experience the workflow
4. Refer to existing patterns and documentation
```

### Step 6.3: Optional: Harmonization Backlog

If existing code doesn't fully align with new patterns:

```markdown
## Harmonization Opportunities (Optional)

Based on your patterns and the upgrade, here are potential improvements:

| Area | Current State | FluxFrame Recommendation | Priority |
|------|---------------|-------------------------|----------|
| [area] | [current] | [recommendation] | [H/M/L] |

These are suggestions for future cycles, not requirements. Your existing 
code works fine - these would just bring more consistency.
```

---

## Special Cases

### Case: Multiple AI Tools in Use

If project uses multiple AI tools (e.g., both Cline and Roo):

1. Create `AGENTS.md` as shared baseline
2. Create tool-specific configs that import/reference AGENTS.md
3. Ensure consistency across all tool configs

### Case: Heavily Customized Rules

If user has extensive custom rules:

1. Identify which are project-specific (keep all)
2. Identify which are workflow-related (compare with FluxFrame)
3. Create "Custom Rules" section in AGENTS.md for project-specific
4. Upgrade workflow rules to FluxFrame standard

### Case: Existing MCP Server with Custom Tools

If project has MCP server with custom tools:

1. List existing custom tools
2. Ask: keep, replace, or merge?
3. If keep/merge: preserve custom tool definitions
4. Add FluxFrame MCP tools alongside

### Case: Different Documentation Location

If user prefers different doc location than `project_docs/`:

1. Keep their location
2. Update all FluxFrame references to use their path
3. Create FluxFrame docs in their preferred location
4. Note the custom location in AGENTS.md

---

## Merge Patterns

### Pattern: Rule Merge

When merging rules:
```markdown
## [Section Name]

### From FluxFrame
[FluxFrame standard content]

### Project-Specific Additions
[User's custom rules that don't conflict]
```

### Pattern: Workflow Merge

When merging workflows:
```markdown
## Development Workflow

[FluxFrame standard workflow]

### Additional Project Requirements
[User's extra steps that complement FluxFrame]
```

### Pattern: Documentation Reference Merge

When project uses different doc names:
```markdown
## Context Documents

**Single Source of Truth:** `docs/context_guide.md` (equivalent to context_master_guide)
**Technical Status:** `docs/status.md` (equivalent to technical_status)
**Patterns:** `docs/patterns/` (FluxFrame standard location)
```

---

## Rollback Instructions

If user wants to rollback:

```bash
# Restore from backup
cp -r .fluxframe-backup/[timestamp]/* ./

# Remove new FluxFrame files if needed
rm AGENTS.md  # if didn't exist before
rm -rf project_docs/  # if created new

# The backup preserves your exact state before FluxFrame upgrade
```

Include this in handoff documentation.
