# Content Source Mapping

**Purpose:** Bridge the detection and document generation phases by creating a persistent, content-analyzed map of which existing files contain information relevant to each FluxFrame document.

**Problem Solved:** Without this, the AI agent reaches the document generation phase with no explicit guidance on which files to read for content synthesis. Detection focuses on organizational decisions (archive/migrate/reference), not on identifying source material for new documents.

---

## Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                   CONTENT SOURCE MAPPING                         │
├─────────────────────────────────────────────────────────────────┤
│  Step 1: Deep content analysis of all documentation files        │
│  Step 2: Classify content by FluxFrame target document           │
│  Step 3: Generate persisted mapping file                         │
│  Step 4: User review checkpoint                                  │
│  Step 5: Reference during document generation                    │
└─────────────────────────────────────────────────────────────────┘
```

**Artifact Location:** `.fluxframe/detected_content_sources.md`

**Lifecycle:**
- Created: During detection phase (after file discovery, before user questionnaire)
- Used: During document generation phase
- Removed: With rest of `.fluxframe/` during finalization cleanup

---

## Step 1: Deep Content Analysis

**CRITICAL:** Do NOT rely on filename matching. Real projects have:
- A `NOTES.md` containing everything
- Files named `meeting-2024-03-15.md` with architectural decisions
- A single `README.md` covering purpose, roadmap, and known issues
- No documentation at all (code-only projects)
- Information scattered across many files with non-obvious names

### 1.1: Identify All Potential Source Files

Scan for files that might contain relevant content:

```bash
# Documentation files (markdown, text, etc.)
find . -type f \( -name "*.md" -o -name "*.txt" -o -name "*.rst" \) \
  -not -path "./node_modules/*" \
  -not -path "./.git/*" \
  -not -path "./vendor/*"

# Also check common documentation directories
ls -la docs/ documentation/ wiki/ project_docs/ 2>/dev/null
```

**Include in scan:**
- All markdown files in project root
- All files in documentation directories
- README files at any level
- Any `.txt` files that might be documentation
- Config files that contain project descriptions (package.json, pyproject.toml)

**Exclude from scan:**
- Source code files (unless looking for inline documentation)
- Generated files
- Dependencies (node_modules, vendor, etc.)
- Binary files

### 1.2: Read and Analyze Each File

For each potential source file, **read the entire content** and identify:

**Content Signals for Each Target Document:**

| Target Document | Content Signals to Look For |
|-----------------|----------------------------|
| `document_catalog.md` | Document inventory, file locations, document descriptions, cross-references between docs |
| `completion_protocol.md` | Project purpose, vision, goals, "what is this", "why we built", target users, value proposition, workflow rules, change protocols, golden rules |
| `templates/change_request.md` | Change request formats, approval workflows, modification procedures |
| `technical_status.md` | Current state, "what works", "what's broken", known issues, bugs, limitations, recent changes, changelog entries, version history, technical debt mentions |
| `ROADMAP.md` | Future plans, "todo", "planned", milestones, backlog items, feature requests, "next steps", priority lists, timeline mentions, phases |
| `patterns/` | Coding conventions, "how we do X", style guides, architectural patterns, "always use", "never do", examples of preferred approaches |
| `api_contract_standards.md` | API documentation, endpoint descriptions, request/response formats, schema definitions, type definitions |

**Analysis Output Per File:**

```markdown
### [filename]
**Path:** [full path]
**Last Modified:** [date]
**Size:** [lines/words]

**Content Summary:**
[2-3 sentence description of what this file contains]

**Relevant To:**
- document_catalog.md: [Yes/No/Partial] - [specific content areas if yes]
- completion_protocol.md: [Yes/No/Partial] - [specific content areas if yes]
- templates/change_request.md: [Yes/No/Partial] - [specific content areas if yes]
- technical_status.md: [Yes/No/Partial] - [specific content areas if yes]
- ROADMAP.md: [Yes/No/Partial] - [specific content areas if yes]
- patterns/: [Yes/No/Partial] - [specific content areas if yes]
- api_contract_standards.md: [Yes/No/Partial] - [specific content areas if yes]

**Content Spans Multiple Areas:** [Yes/No]
**Notes:** [Any observations about content quality, currency, overlap]
```

### 1.3: Handle Special Cases

**Case: Single File Contains Everything**

```markdown
### README.md
**Path:** ./README.md
**Content Summary:** Comprehensive project documentation covering purpose, setup, architecture, known issues, and roadmap.

**Relevant To:**
- document_catalog.md: Partial - Document references can be extracted
- completion_protocol.md: Yes - Project purpose (lines 1-45), tech stack (lines 50-80)
- templates/change_request.md: No
- technical_status.md: Yes - Known issues section (lines 120-150), limitations (lines 155-170)
- ROADMAP.md: Yes - "Future Plans" section (lines 200-250)
- patterns/: Partial - Some coding conventions mentioned (lines 90-110)

**Content Spans Multiple Areas:** Yes
**Notes:** This is the primary source. Content will need to be extracted and distributed across multiple FluxFrame documents.
```

**Case: No Documentation Found**

```markdown
### (No documentation files found)

**Analysis:** Project appears to be code-only with no formal documentation.

**Fallback Sources:**
- package.json / pyproject.toml: May contain project description
- Source code comments: May contain architectural notes
- Git history: Commit messages may describe purpose and changes
- Test files: May reveal intended behavior and patterns

**User Action Required:** Please identify any files that describe the project, or confirm that FluxFrame documents should be created from scratch based on code analysis.
```

**Case: No Project Brief/Purpose Found (REQUIRES USER ACTION)**

If no sources are found for project purpose, vision, or goals (the core content needed for `completion_protocol.md`), the user MUST provide this information. FluxFrame cannot generate meaningful documentation without understanding what the project is.

```markdown
## Project Brief Required

I couldn't find any documentation describing your project's purpose, vision, or goals.

FluxFrame needs this information to generate meaningful documentation. Without it,
`completion_protocol.md` would just be a template with placeholder text.

**Please create a project brief:**

1. Create a file called `project_brief.md` in your project root
2. Include the following information:

```markdown
# Project Brief

## What is this project?
[1-3 sentences describing what this project is]

## Why does it exist?
[What problem does it solve? What need does it address?]

## Who is it for?
[Target users, audience, or stakeholders]

## What are the main goals?
[Key objectives or outcomes]

## Tech stack (optional but helpful)
[Languages, frameworks, infrastructure]

## Current status (optional)
[Where is the project now? Early development? Production? Maintenance?]
```

3. Save the file and let me know when it's ready

**Why this matters:**
- This brief becomes the foundation for your `completion_protocol.md`
- It ensures AI assistants understand your project's purpose
- It's faster than me asking you 10 questions one by one
- The file remains in your project as a reference

**Location:** Place `project_brief.md` in your project root (next to README.md)

Once created, I'll re-scan and continue with the content source mapping.
```

**After user creates project_brief.md:**

1. Re-read and analyze the new file
2. Update `.fluxframe/detected_content_sources.md` with the new source
3. Continue with the rest of the content source mapping
4. Log the decision:

```
log_decision({
  category: "content_sources",
  decision: "User created project_brief.md as primary source for project context",
  reasoning: "No existing project documentation found, user provided brief",
  implications: "project_brief.md will be primary source for completion_protocol.md"
})
```

**Case: Information Fragmented Across Many Files**

```markdown
## Fragmented Documentation Detected

Information appears to be spread across multiple files:

| Content Type | Files Found | Confidence |
|--------------|-------------|------------|
| Project purpose | meeting-notes-jan.md, slack-export.txt | Low - informal sources |
| Architecture | adr-001.md, adr-002.md, design-sketch.md | Medium - partial coverage |
| Current status | (none found) | None |
| Roadmap | backlog.md, sprint-notes/ | Medium - operational, not strategic |

**Recommendation:** Review these files and confirm which should be used as sources.
```

---

## Step 2: Generate Content Source Mapping File

Create `.fluxframe/detected_content_sources.md`:

```markdown
# Detected Content Sources

**Generated:** [timestamp]
**Project:** [project name]
**Status:** Awaiting user review

---

## How This Works

I've analyzed your existing documentation to identify which files contain information
relevant to each FluxFrame document. This mapping will guide content extraction during
document generation.

**Please review and:**
1. Confirm the sources I identified are correct
2. Add any files I missed
3. Remove any files that shouldn't be used

---

## For document_catalog.md

**What this document needs:**
- Inventory of all project documentation files
- File locations and descriptions
- Cross-references between documents
- Document ownership and update frequency

**Sources I found:**

| File | Relevant Content | Confidence |
|------|------------------|------------|
| [path] | [description of relevant content] | High/Medium/Low |
| [path] | [description] | [confidence] |

**Missing?** If you have files describing document structure or inventory that I didn't find, please add them here:
- [ ] _______________

---

## For completion_protocol.md

**What this document needs:**
- Project purpose and vision (why does this project exist?)
- Target users and their needs
- High-level architecture overview
- Tech stack and key technology choices
- Core workflows and processes
- Change protocols and approval workflows
- Golden rules and methodology

**Sources I found:**

| File | Relevant Content | Confidence |
|------|------------------|------------|
| [path] | [description of relevant content] | High/Medium/Low |
| [path] | [description] | [confidence] |

**Missing?** If you have files describing project purpose, goals, or architecture that I didn't find, please add them here:
- [ ] _______________

---

## For templates/change_request.md

**What this document needs:**
- Change request formats and templates
- Approval workflow steps
- Required fields for modifications

**Sources I found:**

| File | Relevant Content | Confidence |
|------|------------------|------------|
| [path] | [description of relevant content] | High/Medium/Low |
| [path] | [description] | [confidence] |

**Missing?** If you have existing change request or approval process documentation, please add them here:
- [ ] _______________

---

## For technical_status.md

**What this document needs:**
- Current project state (what's working, what's not)
- Recent changes and their impact
- Known issues and limitations
- Technical debt items
- Architecture status (implemented vs planned)

**Sources I found:**

| File | Relevant Content | Confidence |
|------|------------------|------------|
| [path] | [description] | [confidence] |

**No sources found:** ⚠️ I didn't find documentation about current technical status.

**Options:**
1. Point me to files I missed
2. I'll analyze the codebase directly
3. We'll create this document from scratch during bootstrap

---

## For ROADMAP.md

**What this document needs:**
- Planned features and capabilities
- Prioritized backlog items
- Milestones and phases
- Future vision
- Dependencies between planned items

**Sources I found:**

| File | Relevant Content | Confidence |
|------|------------------|------------|
| [path] | [description] | [confidence] |

**Missing?** _______________

---

## For patterns/ (Pattern Library)

**What these documents need:**
- Coding conventions and style guides
- Architectural patterns in use
- UI component patterns (if frontend)
- API design patterns (if backend)
- Data access patterns (if database)
- Examples of "how we do things here"

**Sources I found:**

| File | Relevant Content | Target Pattern File | Confidence |
|------|------------------|---------------------|------------|
| [path] | [description] | ui_patterns.md | [confidence] |
| [path] | [description] | api_patterns.md | [confidence] |

**Missing?** _______________

---

## For api_contract_standards.md

**What this document needs:**
- API design approach (REST, GraphQL, etc.)
- Endpoint conventions
- Request/response formats
- Type definitions and schemas
- Validation rules

**Sources I found:**

| File | Relevant Content | Confidence |
|------|------------------|------------|
| [path] | [description] | [confidence] |

**Not applicable:** [ ] This project doesn't have an API

---

## Summary

| Target Document | Sources Found | Status |
|-----------------|---------------|--------|
| document_catalog.md | [N] files | ✅ Ready / ⚠️ Needs review / ❌ No sources |
| completion_protocol.md | [N] files | [status] |
| templates/change_request.md | [N] files | [status] |
| technical_status.md | [N] files | [status] |
| ROADMAP.md | [N] files | [status] |
| patterns/ | [N] files | [status] |
| api_contract_standards.md | [N] files | [status] |

---

## Your Review

Please confirm this mapping is accurate:

1. **Sources look correct** - Proceed with document generation
2. **Add sources** - List files I should include: _______________
3. **Remove sources** - List files I should NOT use: _______________
4. **No docs exist** - Create FluxFrame documents from scratch / code analysis

Your response:
```

---

## Step 3: User Review Checkpoint

**CRITICAL:** Do not proceed to document generation until user has reviewed the content source mapping.

### 3.1: Present the Mapping

```markdown
## Content Source Review

Before I generate your FluxFrame documentation, I need to confirm where to get the information.

I've analyzed your project and identified potential source files. Please review:

📄 **Full mapping:** `.fluxframe/detected_content_sources.md`

**Quick Summary:**

| Document | Sources Found | Your Input Needed |
|----------|---------------|-------------------|
| document_catalog.md | [list] | ✅ Looks good / ➕ Add more / ❌ Wrong files |
| completion_protocol.md | [list] | ✅ Looks good / ➕ Add more / ❌ Wrong files |
| templates/change_request.md | [list] | ✅ Looks good / ➕ Add more / ❌ Wrong files |
| technical_status.md | ⚠️ None found | Please point me to relevant files |
| ROADMAP.md | [list] | ✅ / ➕ / ❌ |
| patterns/ | [list] | ✅ / ➕ / ❌ |

**Questions:**

1. Are the sources I identified correct?
2. Are there files containing project information that I missed?
3. Should any documents be created from scratch (no existing source)?
```

### 3.2: Handle User Responses

**If user confirms sources:**
```
log_decision({
  category: "content_sources",
  decision: "User confirmed content source mapping",
  reasoning: "[User's confirmation or notes]",
  implications: "Will extract content from identified sources during generation"
})
```

Update `.fluxframe/detected_content_sources.md` status to "Confirmed".

**If user adds sources:**
```markdown
You mentioned these additional files:
- [file 1]
- [file 2]

Let me analyze them...

[Read and analyze each file]

Updated mapping:
| Document | Added Sources |
|----------|---------------|
| [target] | [new file] - [relevant content] |

I've updated `.fluxframe/detected_content_sources.md` with these additions.
```

**If user says no sources exist:**
```markdown
Understood. For documents without existing sources, I'll:

| Document | Approach |
|----------|----------|
| document_catalog.md | Generate from created file inventory |
| completion_protocol.md | Ask you questions during generation |
| templates/change_request.md | Generate from FluxFrame template |
| technical_status.md | Analyze codebase and ask clarifying questions |
| ROADMAP.md | Create template for you to fill in |
| patterns/ | Extract patterns from code analysis |

This is fine - many projects start with FluxFrame having minimal documentation.
```

### 3.3: Update Mapping File

After user review, update `.fluxframe/detected_content_sources.md`:

```markdown
# Detected Content Sources

**Generated:** [original timestamp]
**Project:** [project name]
**Status:** ✅ Confirmed by user on [timestamp]
**User Notes:** [any notes from user review]

[... rest of mapping with any updates ...]
```

---

## Step 4: Reference During Document Generation

### 4.1: Before Generating Each Document

**Read the mapping file** to get confirmed source files:

```markdown
## Generating completion_protocol.md

**From content source mapping:**
- Source 1: `docs/overview.md` - Project purpose, vision
- Source 2: `README.md` (lines 1-50) - Tech stack, setup
- Source 3: `notes/architecture.md` - Architecture decisions

**Reading sources now...**

[Read each source file]

**Extracting relevant content...**

[Extract and synthesize content]
```

### 4.2: Handle Missing Information

If confirmed sources don't contain needed information:

```markdown
## Gap During Generation

While generating `technical_status.md`, I found that the identified sources don't include:
- Known issues / current bugs
- Recent changes

**Options:**
1. Check these additional files: [suggestions based on content analysis]
2. Analyze git history for recent changes
3. Skip this section for now (you can fill in later)
4. You provide this information now

Your choice?
```

### 4.3: Track Extraction Progress

During generation, note what was extracted from where:

```markdown
## Extraction Log

**completion_protocol.md:**
- Project purpose: Extracted from `README.md` (lines 1-30)
- Tech stack: Extracted from `package.json` + `README.md` (lines 50-70)
- Architecture: Extracted from `docs/architecture.md` (full file)
- Workflows: Created from FluxFrame template (no source)

**document_catalog.md:**
- Document inventory: Generated from created file list
- Cross-references: Extracted from internal links in source files

**technical_status.md:**
- Current state: Analyzed from codebase (no documentation source)
- Known issues: Extracted from `KNOWN_ISSUES.txt`
- Recent changes: Extracted from git log (last 30 days)

[etc.]
```

---

## Integration with Existing Workflows

### In Detection Phase (All Workflows)

Add after Step 1.x (file discovery) and before Phase 2 (questionnaire):

```markdown
### Step 1.X: Content Source Mapping

**Purpose:** Identify which existing files contain information for each FluxFrame document.

**Process:**
1. Read and analyze all documentation files discovered in previous steps
2. Classify content by target FluxFrame document
3. Generate `.fluxframe/detected_content_sources.md`
4. Present to user for review and confirmation
5. Wait for user confirmation before proceeding

**Output:** `.fluxframe/detected_content_sources.md` with status "Confirmed"

**CRITICAL:** Do not proceed to document generation without confirmed content sources.

See `bootstrap/content_source_mapping.md` for detailed instructions.
```

### In Document Generation Phase (All Workflows)

Add before generating each document:

```markdown
### Step X.X: Read Content Sources

Before generating [document_name]:

1. Read `.fluxframe/detected_content_sources.md`
2. For this document's section, identify confirmed source files
3. Read each source file
4. Extract relevant content as mapped
5. Note any gaps for user follow-up
6. Proceed with generation using extracted content

**If no sources confirmed:** Generate from template and ask user for information directly.
```

### In Finalization Phase

The `.fluxframe/` directory is already cleaned up during finalization. No additional changes needed - `detected_content_sources.md` will be removed with the rest of `.fluxframe/`.

---

## Example: Full Flow

### Detection Phase

```
Agent: Analyzing project documentation...

Found 8 documentation files:
- README.md (450 lines)
- docs/getting-started.md (120 lines)
- docs/api-reference.md (800 lines)
- NOTES.md (200 lines)
- meeting-notes/2024-01-kickoff.md (50 lines)
- meeting-notes/2024-02-architecture.md (80 lines)
- TODO.txt (30 lines)
- CHANGELOG.md (150 lines)

Analyzing content...

[Deep read of each file]

Generated content source mapping at .fluxframe/detected_content_sources.md
```

### User Review Checkpoint

```
Agent: Before generating your FluxFrame docs, please review the sources I identified:

For completion_protocol.md:
- README.md: Project description, tech stack ✓
- meeting-notes/2024-01-kickoff.md: Project goals, target users ✓

For technical_status.md:
- CHANGELOG.md: Recent changes ✓
- ⚠️ No sources for current known issues

For ROADMAP.md:
- TODO.txt: Backlog items (informal) ✓
- meeting-notes/2024-02-architecture.md: Architecture plans ✓

Are these correct? Any files I missed?

User: The NOTES.md file also has project goals and some technical debt items.

Agent: Got it! Let me analyze NOTES.md...

[Reads NOTES.md]

Updated mapping:
- completion_protocol.md: Added NOTES.md (lines 1-50) - project goals
- technical_status.md: Added NOTES.md (lines 100-150) - technical debt items

Updated .fluxframe/detected_content_sources.md. Ready to proceed?

User: Yes, looks good.

Agent: Confirmed. Proceeding to document generation...
```

### Generation Phase

```
Agent: Generating completion_protocol.md...

Reading confirmed sources:
- README.md... ✓
- meeting-notes/2024-01-kickoff.md... ✓
- NOTES.md (lines 1-50)... ✓

Extracting project purpose from README.md...
Extracting target users from kickoff notes...
Extracting additional goals from NOTES.md...

[Generates document with synthesized content]

completion_protocol.md created with content from 3 source files.
```

---

## Validation Checklist

Before proceeding past content source mapping:

- [ ] All documentation files discovered have been read and analyzed
- [ ] Content has been classified by target FluxFrame document
- [ ] `.fluxframe/detected_content_sources.md` has been generated
- [ ] User has reviewed and confirmed the mapping
- [ ] Any user additions have been incorporated
- [ ] Mapping file status is "Confirmed"
- [ ] For documents with no sources, fallback approach is documented
