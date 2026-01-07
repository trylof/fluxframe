# Migration Workflow Bootstrap

**Purpose:** Adapt existing project documentation to FluxFrame structure while preserving valuable content.

**When to use:** Project was classified as `MIGRATION` - it has existing documentation (ADRs, wikis, bug fixes, etc.) in a different structure than FluxFrame, and may or may not have AI rules.

**Goal:** Integrate existing documentation into FluxFrame workflow, ask user preferences for each category (copy, migrate, or reference), establish AI-assisted development workflow.

---

## Prerequisites

Before starting this workflow:
- ✅ Detection phase complete (see `detection_guide.md`)
- ✅ Project classified as `MIGRATION`
- ✅ User confirmed they want to proceed
- ✅ You have identified existing documentation structure

---

## Workflow Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                MIGRATION WORKFLOW BOOTSTRAP                      │
├─────────────────────────────────────────────────────────────────┤
│  Phase 1: Deep analysis of existing documentation               │
│  Phase 2: Present findings and get user preferences             │
│  Phase 3: Execute migration based on preferences                │
│  Phase 4: Generate FluxFrame configuration                      │
│  Phase 5: Establish AI workflow                                 │
│  Phase 6: Validation and handoff                                │
└─────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Deep Analysis

### Step 1.1: Map Existing Documentation

Create a complete map of all documentation:

```markdown
## Documentation Inventory

### Primary Documentation Location
- **Path:** [docs/, documentation/, wiki/, etc.]
- **Structure:** [flat / hierarchical / wiki-style / ADR-based]
- **Total files:** [count]

### Documentation Categories Found

#### Architecture & Design
- **Location:** [path]
- **Files:** [list]
- **Format:** [ADR / RFC / free-form / etc.]
- **Sample topics:** [list 3-5 topics covered]

#### Technical Reference
- **Location:** [path]
- **Files:** [list]
- **Includes:** [API docs / schema / configuration / etc.]

#### Project Status & Planning
- **Location:** [path]
- **Files:** [list]
- **Includes:** [roadmap / changelog / release notes / etc.]

#### Bug Fixes & Changes
- **Location:** [path]
- **Files:** [count and format]
- **Structure:** [dated / numbered / categorized / etc.]

#### Patterns & Conventions
- **Location:** [path]
- **Files:** [list]
- **Categories:** [list if organized]

#### Other Documentation
- [List any other categories found]
```

### Step 1.2: Analyze Content Quality

For each category, assess:

**Completeness:**
- Does it cover what it claims to cover?
- Are there obvious gaps?

**Currency:**
- When was it last updated?
- Does it reflect current codebase?

**Format:**
- Is it well-structured?
- Is it easily searchable/navigable?

**Value:**
- Is this information that should be preserved?
- Would it be effort to recreate?

### Step 1.3: Identify FluxFrame Equivalents

Map existing docs to FluxFrame structure:

```markdown
## FluxFrame Mapping

| Your Documentation | FluxFrame Equivalent | Compatibility |
|-------------------|---------------------|---------------|
| `docs/architecture/OVERVIEW.md` | `context_master_guide.md` | Partial - needs expansion |
| `docs/ADRs/` | Could inform `patterns/` | Different purpose - reference |
| `docs/STATUS.md` | `technical_status.md` | Good match - migrate |
| `docs/api/` | `api_contract_standards.md` | Partial - needs structuring |
| `CHANGELOG.md` | Part of `technical_status.md` | Reference |
| `docs/conventions/` | `patterns/` | Good match - migrate |
| None found | `implementation_plan.md` | Create new |
| None found | `workflows/` | Create new |
```

### Step 1.4: Identify Content for Each FluxFrame Document

**context_master_guide.md needs:**
- Project overview (from: ___)
- Architecture decisions (from: ___)
- Tech stack details (from: ___)
- Key workflows (from: ___)

**technical_status.md needs:**
- Current capabilities (from: ___)
- Recent changes (from: ___)
- Known issues (from: ___)
- Architecture status (from: ___)

**patterns/ needs:**
- Coding conventions (from: ___)
- Architecture patterns (from: ___)
- UI patterns (from: ___)
- API patterns (from: ___)

---

## Phase 2: User Preferences

### Step 2.1: Present Analysis

Show user what you found:

```markdown
## Documentation Analysis Results

I analyzed your existing documentation and found:

### Summary
- **Total documentation files:** [N]
- **Last updated:** [date range]
- **Structure type:** [ADR-based / Wiki / Free-form / etc.]

### Key Findings

**Well-suited for FluxFrame integration:**
- [List docs that map well]

**Needs adaptation:**
- [List docs that need restructuring]

**Valuable but different purpose:**
- [List docs to reference rather than migrate]

**Missing (will create from FluxFrame templates):**
- [List FluxFrame docs that have no equivalent]
```

### Step 2.2: Ask Preferences for Each Category

For each documentation category, ask:

```markdown
### Your Decision: [Category Name]

**What I found:** [Description of existing docs]

**FluxFrame equivalent:** [What this would become]

**Options:**

1. **Copy** - Keep your files where they are, copy relevant content into FluxFrame docs
   - Pros: Preserves original, have both versions
   - Cons: Potential for drift between copies

2. **Migrate** - Move content into FluxFrame structure, update/improve format
   - Pros: Clean integration, follows FluxFrame conventions
   - Cons: Original location will have moved/redirected

3. **Reference** - Keep your files, FluxFrame docs will link to them
   - Pros: No duplication, preserves your structure
   - Cons: Two documentation systems to maintain, may not follow FluxFrame workflow

Your choice for [Category] (1/2/3)?
```

### Step 2.3: Ask About Documentation Location

```markdown
### Documentation Location

Your current documentation is in: `[detected_path]/`

FluxFrame standard location is: `project_docs/`

Options:

1. **Use FluxFrame standard** - Create `project_docs/`, new docs go there
2. **Use your location** - Keep `[detected_path]/`, FluxFrame docs go there
3. **Parallel structure** - Keep both, link between them

Your choice (1/2/3)?
```

### Step 2.4: Record All Preferences

```markdown
## Migration Preferences

### Documentation Location
- **Decision:** [1/2/3]
- **Path to use:** [resulting path]

### Category Preferences

| Category | Decision | Source | Destination |
|----------|----------|--------|-------------|
| Architecture | [Copy/Migrate/Reference] | [source path] | [destination] |
| Conventions | [Copy/Migrate/Reference] | [source path] | [destination] |
| Bug Fixes | [Copy/Migrate/Reference] | [source path] | [destination] |
| Status | [Copy/Migrate/Reference] | [source path] | [destination] |
| [etc.] | | | |

### New Documents to Create
- [ ] `context_master_guide.md` - [Create/Adapt existing]
- [ ] `technical_status.md` - [Create/Adapt existing]
- [ ] `implementation_plan.md` - [Create]
- [ ] `patterns/` - [Create/Adapt existing]
- [ ] `workflows/` - [Create]
```

---

## Phase 3: Execute Migration

### Step 3.1: Create Backup

```bash
# Create backup of existing documentation
mkdir -p .fluxframe-backup/$(date +%Y%m%d_%H%M%S)/docs
cp -r [detected_docs_path]/* .fluxframe-backup/$(date +%Y%m%d_%H%M%S)/docs/

# Backup any existing AI rules
cp -r .clinerules/ .fluxframe-backup/$(date +%Y%m%d_%H%M%S)/ 2>/dev/null || true
cp .cursorrules .fluxframe-backup/$(date +%Y%m%d_%H%M%S)/ 2>/dev/null || true
```

### Step 3.2: Create Directory Structure

Based on location decision:

```bash
# If using FluxFrame standard
mkdir -p project_docs/{patterns,workflows,implementation_plans,bug_fixes}

# If using existing location
mkdir -p [detected_path]/{patterns,workflows,implementation_plans,bug_fixes}
```

### Step 3.3: Process Each Category

For each category, based on user's decision:

#### If COPY:

```markdown
**Copy Process for [Category]:**

1. Create target file in FluxFrame location
2. Extract relevant content from source files
3. Restructure into FluxFrame format
4. Add FluxFrame-specific sections
5. Original files remain untouched

**Source:** `[original_path]`
**Target:** `[fluxframe_path]`
**Content extracted:**
- [List what was copied]
```

#### If MIGRATE:

```markdown
**Migration Process for [Category]:**

1. Read all source files
2. Transform content to FluxFrame format
3. Write to FluxFrame location
4. Create redirect/note in original location:
   ```markdown
   # Moved to FluxFrame Structure
   
   This documentation has been migrated to: `[new_path]`
   
   See: [link to new location]
   ```
5. Delete original files (after user confirms migration worked)

**Source:** `[original_path]`
**Target:** `[fluxframe_path]`
**Files migrated:**
- [List migrated files]
```

#### If REFERENCE:

```markdown
**Reference Process for [Category]:**

1. Keep source files unchanged
2. In FluxFrame documents, add references:
   ```markdown
   ## [Section]
   
   See existing documentation: `[path to original]`
   
   **Summary:** [Brief summary of what's there]
   ```
3. Ensure links work and are maintainable

**Source (kept):** `[original_path]`
**FluxFrame reference:** `[where reference is added]`
```

### Step 3.4: Create FluxFrame Core Documents

For each FluxFrame document, based on migration decisions:

#### context_master_guide.md

```markdown
# Creating context_master_guide.md

**Sources being used:**
- [List source documents]

**Sections to populate:**

1. **Project Identity**
   - Source: [where to get this]
   - Content: [extract or ask user]

2. **Architecture Overview**
   - Source: [where to get this]
   - Content: [extract or ask user]

3. **Core Context Documents**
   - Generated based on final structure

4. **Development Workflow**
   - From FluxFrame template (new)
   - Adapted for project specifics

5. **Pattern-Driven Development**
   - From FluxFrame template
   - Reference existing conventions: [path]

6. **Change Request Protocol**
   - From FluxFrame template (new)
```

#### technical_status.md

```markdown
# Creating technical_status.md

**Sources being used:**
- [List source documents - STATUS.md, CHANGELOG, etc.]

**Sections to populate:**

1. **Current State**
   - Extracted from: [source]
   - Or: Ask user for current status

2. **Architecture Status**
   - Extracted from: [source]
   - Or: Inferred from codebase

3. **Recently Changed**
   - From: CHANGELOG / git history / existing status doc
   - Format: Adapt to FluxFrame structure

4. **Known Issues**
   - From: Issue tracker / existing docs
   - Format: Adapt to FluxFrame structure
```

#### patterns/

```markdown
# Creating patterns directory

**Migration strategy based on user choice:**

**If COPY from conventions/:**
- Copy convention docs
- Restructure to pattern format
- Add FluxFrame pattern metadata

**If MIGRATE from conventions/:**
- Transform to pattern format
- Create pattern index
- Redirect original location

**If REFERENCE:**
- Create pattern index
- Link to existing conventions
- Add FluxFrame-specific pattern workflow

**FluxFrame patterns to add (regardless):**
- Pattern template
- How to document patterns guide
```

### Step 3.5: Handle Bug Fixes / Change History

Special handling for existing bug fix documentation:

```markdown
## Bug Fix Migration

**Found:** [N] files in [location]

**Options presented to user:**

1. **Import into FluxFrame bug_fixes/**
   - Copy/move files to `{{DOCS_DIR}}/bug_fixes/`
   - Optionally reformat to FluxFrame template

2. **Keep in place, reference in FluxFrame**
   - Add reference in context_master_guide
   - Create index in bug_fixes/ pointing to original

3. **Archive and start fresh**
   - Archive existing to `archive/bug_fixes/`
   - Start fresh with FluxFrame format

**User chose:** [option]

**Execution:**
[Based on choice, execute migration]
```

---

## Phase 4: Generate FluxFrame Configuration

### Step 4.1: Determine AI Tools

Ask user (if not already known):

```markdown
Which AI coding tools will you use?

1. Claude Code
2. Roo Code
3. Cline
4. Google Antigravity
5. Multiple (specify)
6. Other / Universal AGENTS.md only
```

### Step 4.2: Handle Existing AI Rules

If minimal AI rules exist (e.g., `.cursorrules`):

```markdown
I found existing AI rules: `.cursorrules`

Content:
```
[show content]
```

This appears to be [minimal/project-specific].

Options:
1. **Replace** - Use FluxFrame rules, discard existing
2. **Incorporate** - Add your rules to FluxFrame structure
3. **Keep separate** - Maintain both (may cause conflicts)

Your choice?
```

### Step 4.3: Generate AI Rules

Create appropriate AI rules pointing to migrated/created documentation:

**AGENTS.md always created with:**
- Project context from migrated docs
- References to documentation in final locations
- FluxFrame workflows
- Links to patterns (however they're stored)

**Tool-specific rules:**
- Based on user's tool selection
- Paths match migration decisions
- Full or basic integration as chosen

### Step 4.4: Generate MCP Server

Create MCP server configured for:
- Documentation path (based on location decision)
- Pattern library location
- Bug fixes location
- Any custom paths from migration

---

## Phase 5: Establish AI Workflow

### Step 5.1: Create Workflow Documentation

Even if user had no workflow docs, create:

```
{{DOCS_DIR}}/workflows/
├── README.md              # Index of workflows
├── cycle_workflow.md      # Development cycle methodology
└── change_request_protocol.md  # Bug fix protocol
```

### Step 5.2: Integrate with Existing Processes

If project has existing processes (from ADRs, CONTRIBUTING.md, etc.):

```markdown
## Process Integration

**Your existing processes:**
- [List detected processes from docs]

**FluxFrame workflows:**
- Development cycles
- Change request protocol
- Pattern-driven development

**Integration approach:**
- FluxFrame workflows reference your processes
- Where overlap exists, [merge/defer to yours/use FluxFrame]
- Document how they work together

**Example integration:**
Your ADR process remains for architecture decisions.
FluxFrame cycle workflow includes step: "Create ADR if architecture change"
```

### Step 5.3: Generate Implementation Plan

Create `implementation_plan.md` based on:
- Existing roadmap (if found)
- Existing backlog (if found)
- Or: Template with placeholder for user to fill

---

## Phase 6: Validation and Handoff

### Step 6.1: Validate Migration

```markdown
## Migration Validation Checklist

### Documentation Structure
- [ ] All chosen migrations completed
- [ ] References working (links not broken)
- [ ] No orphaned documentation
- [ ] FluxFrame docs in place

### Content Validation
- [ ] context_master_guide.md complete and accurate
- [ ] technical_status.md reflects current state
- [ ] patterns/ has initial content or index
- [ ] workflows/ has FluxFrame protocols
- [ ] bug_fixes/ structure in place

### AI Configuration
- [ ] AGENTS.md created with correct paths
- [ ] Tool-specific rules created
- [ ] MCP server configured and tested
- [ ] Rules reference correct documentation paths

### Backup Verification
- [ ] Backup exists at `.fluxframe-backup/[timestamp]/`
- [ ] Backup contains all original docs
- [ ] Rollback instructions documented
```

### Step 6.2: Present Migration Summary

```markdown
## FluxFrame Migration Complete

### Migration Summary

**Documentation migrated:**
| Category | Decision | From | To |
|----------|----------|------|-----|
| [category] | [Copy/Migrate/Reference] | [from] | [to] |
| ... | ... | ... | ... |

**New documentation created:**
- `context_master_guide.md` - Single source of truth
- `technical_status.md` - Project status tracking
- `implementation_plan.md` - Development roadmap
- `workflows/` - Development protocols

**AI Configuration:**
- Created `AGENTS.md` as universal baseline
- [Created tool-specific configs based on selection]
- MCP server configured at `mcp-server.js`

### Documentation Structure (Final)

```
[project root]
├── [docs location]/
│   ├── context_master_guide.md
│   ├── technical_status.md
│   ├── implementation_plan.md
│   ├── patterns/
│   │   └── [migrated or new]
│   ├── workflows/
│   │   ├── cycle_workflow.md
│   │   └── change_request_protocol.md
│   └── bug_fixes/
│       └── [migrated or indexed]
├── [original docs if kept]/
│   └── [referenced content]
├── AGENTS.md
├── [tool-specific rules]
└── mcp-server.js
```

### Backup Location
Your original documentation was backed up to:
`.fluxframe-backup/[timestamp]/`

### Next Steps

1. **Review migrated content**
   - Check that extracted content is accurate
   - Fill in any gaps marked with [TODO]
   
2. **Test MCP server**
   - Run `npm run mcp` or `node mcp-server.js`
   - Verify it finds your documentation

3. **Test AI workflow**
   - Start a conversation with your AI tool
   - Ask it about the project - it should find context
   
4. **Begin first FluxFrame cycle**
   - Define Cycle 1.1 in implementation_plan.md
   - Follow the development cycle workflow
```

### Step 6.3: Document Maintenance

Provide guidance on maintaining the new structure:

```markdown
## Ongoing Maintenance

### Documentation Updates
- When updating project info → Update `context_master_guide.md`
- When completing work → Update `technical_status.md`
- When fixing bugs → Add to `bug_fixes/` (after confirmed)
- When establishing patterns → Add to `patterns/`

### If You Chose "Reference" Strategy
- Your original docs at `[location]` are still source of truth for [categories]
- FluxFrame docs link to them - keep those links updated
- Consider gradually migrating to FluxFrame structure over time

### If You Kept Parallel Structures
- Watch for documentation drift between old and new locations
- Consider deprecation timeline for old structure
- FluxFrame docs should be authoritative for AI assistance
```

---

## Special Cases

### Case: ADR-Heavy Project

For projects using Architecture Decision Records:

```markdown
## ADR Integration Strategy

ADRs serve a different purpose than FluxFrame docs:
- ADRs: Record WHY decisions were made
- FluxFrame: Record WHAT to do and HOW

**Recommended approach:**
1. Keep ADRs in place (don't migrate)
2. Reference ADRs from context_master_guide.md
3. Extract relevant patterns from ADRs into patterns/
4. For new architectural decisions: Continue using ADR process

**Example reference in context_master_guide.md:**
```markdown
## Architecture Decisions

This project uses ADRs. See `docs/ADRs/` for complete decision history.

Key decisions affecting development:
- [ADR-001](../docs/ADRs/001-use-graphql.md): GraphQL for API
- [ADR-007](../docs/ADRs/007-state-management.md): Redux for state
```
```

### Case: Wiki-Style Documentation

For projects with wiki documentation:

```markdown
## Wiki Integration Strategy

Wikis are often:
- Sprawling and interlinked
- Not easily structured into FluxFrame format
- Valuable but hard to migrate

**Recommended approach:**
1. Create FluxFrame docs as "AI context layer"
2. Reference wiki for detailed information
3. Gradually migrate high-value pages to patterns/
4. Use wiki for onboarding, FluxFrame for AI context

**In context_master_guide.md:**
```markdown
## Detailed Documentation

For detailed information, see the project wiki: `[wiki_location]`

Key wiki pages:
- [Getting Started](wiki/getting-started.md)
- [Architecture Overview](wiki/architecture.md)
```
```

### Case: Monorepo with Multiple Docs

For monorepos:

```markdown
## Monorepo Documentation Strategy

**Structure detected:**
```
repo/
├── package-a/docs/
├── package-b/docs/
└── docs/  (root-level)
```

**Options:**
1. **Central FluxFrame docs** - One `project_docs/` at root, covers all
2. **Per-package docs** - FluxFrame in each package
3. **Hybrid** - Root for project-wide, per-package for specifics

**Recommended:** Option 3 (Hybrid)
- Root `project_docs/` for overall context, shared patterns
- Package-specific docs for package-specific patterns
- AI rules at root reference all locations
```

### Case: Existing Changelog

For projects with CHANGELOG.md:

```markdown
## Changelog Integration

**Don't migrate CHANGELOG.md**

Rationale:
- CHANGELOG follows standard format (Keep-a-changelog)
- Users/consumers expect CHANGELOG.md at root
- FluxFrame technical_status.md serves different purpose

**Instead:**
- Keep CHANGELOG.md for release history
- Reference from technical_status.md:
  ```markdown
  ## Recently Changed
  
  See [CHANGELOG.md](../CHANGELOG.md) for release history.
  
  ### Development Changes (Not Yet Released)
  [Track in-progress work here]
  ```
```

---

## Rollback Instructions

If migration needs to be undone:

```bash
# 1. Restore documentation from backup
cp -r .fluxframe-backup/[timestamp]/docs/* [original_docs_location]/

# 2. Remove FluxFrame documentation
rm -rf project_docs/  # if was created new
# OR restore original state if migrated into existing location

# 3. Remove AI rules
rm AGENTS.md
rm -rf .clinerules/
rm CLAUDE.md
rm .roomodes
# ... etc

# 4. Remove MCP server (if added)
rm mcp-server.js
# Remove from package.json if added there

# Your project is now back to pre-FluxFrame state
```

Include this in handoff documentation.

---

## Migration Checklist Summary

Before marking migration complete:

- [ ] All user preferences recorded and honored
- [ ] Content migrated/copied/referenced as chosen
- [ ] FluxFrame core documents created
- [ ] AI rules generated with correct paths
- [ ] MCP server configured and tested
- [ ] Backup created and verified
- [ ] Rollback instructions provided
- [ ] User has reviewed and approved result
