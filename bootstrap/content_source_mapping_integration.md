# Content Source Mapping - Integration Points

This document contains the specific text blocks to integrate content source mapping into each bootstrap workflow.

---

## Integration for greenfield_workflow.md

### Add After Prerequisites Section (Before Step 1)

Insert this new section:

```markdown
---

## Phase 0.5: Content Source Mapping (REQUIRED)

**Purpose:** Before generating FluxFrame documents, identify which existing files (if any) contain project information that should be extracted and synthesized into the new documents.

**Why This Matters:** Even greenfield projects often have:
- A README.md with project description
- Package.json/pyproject.toml with project metadata
- Meeting notes or briefs that informed the project
- Scattered documentation the detection phase found

Without explicit source mapping, document generation relies on luck and AI memory rather than systematic content extraction.

### Step 0.5.1: Scan for Potential Source Files

Even though this is a greenfield project, scan for any existing content:

```bash
# Find all markdown and text files (excluding dependencies)
find . -type f \( -name "*.md" -o -name "*.txt" \) \
  -not -path "./node_modules/*" \
  -not -path "./.git/*" \
  -not -path "./fluxframe/*" 2>/dev/null

# Check for project metadata files
ls -la package.json pyproject.toml Cargo.toml composer.json 2>/dev/null
```

**Files to examine:**
- README.md (often has project purpose, even in new projects)
- Any project briefs or requirements documents
- Meeting notes or planning documents
- Package manifests (contain project description)

### Step 0.5.2: Deep Content Analysis

For each file found, **read the entire content** and classify:

| Content Type | Look For | Maps To |
|--------------|----------|---------|
| Project purpose | "what is this", "why", goals, vision | AGENTS.md |
| Tech decisions | "we chose X because", stack descriptions | AGENTS.md |
| Current state | "works", "broken", limitations, issues | technical_status.md |
| Future plans | "todo", "planned", "next", milestones | ROADMAP.md |
| Conventions | "how we do", patterns, style notes | patterns/ |

**For each file, record:**
- Which FluxFrame documents it informs
- Specific content areas (with line numbers if helpful)
- Confidence level (High/Medium/Low)
- Whether content spans multiple target documents

### Step 0.5.3: Generate Content Source Mapping

Create `.fluxframe/detected_content_sources.md`:

```markdown
# Detected Content Sources

**Generated:** [timestamp]
**Project:** {{PROJECT_NAME}}
**Scenario:** GREENFIELD
**Status:** Awaiting user review

---

## Overview

This is a greenfield project, but I found the following files that may contain
useful information for generating your FluxFrame documentation.

---

## For AGENTS.md

**What this document needs:**
- Project purpose and vision
- Target users and their needs
- Tech stack rationale
- High-level architecture

**Sources found:**

| File | Relevant Content | Confidence |
|------|------------------|------------|
| README.md | Project description (lines 1-20) | Medium |
| package.json | Project name, description field | High |

**Missing?** Do you have any project briefs, requirements docs, or planning notes I should use?

---

## For technical_status.md

**What this document needs:**
- Current capabilities (what's implemented)
- Known issues or limitations
- Recent changes

**Sources found:**

| File | Relevant Content | Confidence |
|------|------------------|------------|
| (none) | | |

**Note:** For a greenfield project, this is expected. I'll create this document with "Project Phase: Bootstrap" status.

---

## For ROADMAP.md

**What this document needs:**
- Planned features
- Milestones and priorities
- Future vision

**Sources found:**

| File | Relevant Content | Confidence |
|------|------------------|------------|
| (none or list any planning docs) | | |

**Missing?** Do you have any backlog, planning docs, or feature lists I should incorporate?

---

## For patterns/

**What these documents need:**
- Coding conventions
- Architectural patterns
- UI/API/Data patterns

**Sources found:**

| File | Relevant Content | Confidence |
|------|------------------|------------|
| (none) | | |

**Note:** Patterns will be documented as they emerge during development.

---

## Summary

| Target Document | Sources | Status |
|-----------------|---------|--------|
| AGENTS.md | [N] files | [status] |
| technical_status.md | 0 files | Will create from scratch |
| ROADMAP.md | [N] files | [status] |
| patterns/ | 0 files | Will create empty structure |

---

## Your Review

Even though this is a greenfield project:
1. Are there any files with project information I missed?
2. Do you have external documents (Google Docs, Notion, etc.) you want to manually provide content from?
3. Should I proceed with the sources identified above?
```

### Step 0.5.4: User Review Checkpoint

Present the mapping to the user:

```markdown
## Content Source Review

Before generating your FluxFrame documentation, I want to confirm where to get information.

**Project type:** Greenfield (new project)

**What I found:**
[Summary table from mapping file]

**Questions:**
1. Are there any project briefs, requirements, or planning docs I should use?
2. Any external documents (not in the repo) you want to provide content from?
3. Ready to proceed with document generation?
```

**Wait for user response before proceeding.**

### Step 0.5.4.1: Handle Missing Project Brief (BLOCKING)

If no sources were found for project purpose/vision/goals, this is a **blocking** issue. FluxFrame cannot generate meaningful documentation without understanding what the project is.

```markdown
## Project Brief Required

I couldn't find any documentation describing your project's purpose, vision, or goals.

FluxFrame needs this information to generate meaningful documentation. Without it,
`AGENTS.md` would just be a template with placeholder text.

**Please create a project brief:**

1. Create a file called `project_brief.md` in your project root
2. Include the following:

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

**Location:** Place `project_brief.md` in your project root (next to README.md)

**Why this matters:**
- This becomes the foundation for your `AGENTS.md`
- It ensures AI assistants understand your project's purpose
- It's faster than answering many individual questions
- The file remains in your project as ongoing reference
```

**After user creates project_brief.md:**
1. Re-scan and analyze the new file
2. Update `.fluxframe/detected_content_sources.md`
3. Present updated mapping for confirmation
4. Then proceed to Step 0.5.5

### Step 0.5.5: Update Mapping and Proceed

After user confirmation:
1. Update `.fluxframe/detected_content_sources.md` status to "Confirmed"
2. Add any additional sources the user identified
3. Log the decision:

```
log_decision({
  category: "content_sources",
  decision: "Content source mapping confirmed for greenfield project",
  reasoning: "[User's response - e.g., 'No additional sources' or 'Added PROJECT_BRIEF.md']",
  implications: "Document generation will use confirmed sources"
})
```

**Proceed to Step 1 (Create Directory Structure) only after mapping is confirmed.**

---
```

### Modify Step 2 (Generate document_catalog.md, completion_protocol.md, templates/change_request.md)

Add at the beginning of Step 2:

```markdown
### Step 2: Generate document_catalog.md, completion_protocol.md, templates/change_request.md

**FIRST: Read Content Sources**

Before generating, check `.fluxframe/detected_content_sources.md` for confirmed sources:

1. Read the mapping file
2. For `AGENTS.md`, identify source files
3. Read each source file
4. Extract relevant content as mapped
5. Use extracted content to fill template sections

**If sources exist:**
```markdown
Reading confirmed sources for AGENTS.md:
- [source 1]: Extracting [content type]...
- [source 2]: Extracting [content type]...

Synthesizing into document_catalog.md, completion_protocol.md, templates/change_request.md...
```

**If no sources (pure greenfield):**
Use template defaults and user questionnaire answers. Note in the document that content can be expanded as project evolves.

**Source:** `doc-templates/document_catalog.template.md`, `doc-templates/completion_protocol.template.md`, `doc-templates/change_request.template.md`

[... rest of existing Step 2 content ...]
```

### Modify Step 3 (Generate technical_status.md)

Add similar block:

```markdown
### Step 3: Generate technical_status.md

**FIRST: Read Content Sources**

Check `.fluxframe/detected_content_sources.md` for confirmed sources.

For greenfield projects, this section typically has no sources - the document will reflect "Bootstrap" status. However, if sources were identified:
- Extract any existing status information
- Extract any known issues or limitations mentioned
- Incorporate into the appropriate sections

[... rest of existing Step 3 content ...]
```

### Modify Step 4 (Generate ROADMAP.md)

Add similar block:

```markdown
### Step 4: Generate ROADMAP.md

**FIRST: Read Content Sources**

Check `.fluxframe/detected_content_sources.md` for confirmed sources.

**If planning documents exist:**
- Extract planned features, milestones, priorities
- Map to FluxFrame cycle structure
- Preserve user's planning context while adapting to FluxFrame format

**If no sources:**
- Create ROADMAP.md with Cycle 1.1 placeholder
- User will define first cycle after bootstrap

[... rest of existing Step 4 content ...]
```

---

## Integration for similar_workflow.md

### Add to Phase 1 (After Step 1.4, Before Phase 2)

Insert as new Step 1.5:

```markdown
---

### Step 1.5: Content Source Mapping (REQUIRED)

**Purpose:** Create an explicit mapping of which existing files contain content for each FluxFrame document. This is distinct from the archival inventory (Step 1.4) - that identifies files to preserve; this identifies files to **extract content from**.

**Why This Matters:** Similar workflow projects have existing documentation that should inform the new FluxFrame documents. Without explicit mapping:
- The AI may miss valuable content in non-obviously-named files
- Content extraction during generation becomes guesswork
- User loses opportunity to point to additional sources

### Step 1.5.1: Analyze All Documentation Files

For each file discovered in Steps 1.1-1.4, perform **deep content analysis**:

**Read each file completely and identify:**

| Content Type | Signals | Target Document |
|--------------|---------|-----------------|
| Project purpose/vision | "what", "why", "goals", "mission" | AGENTS.md |
| Architecture decisions | "we chose", "architecture", "design" | AGENTS.md |
| Tech stack details | "stack", "technologies", "built with" | AGENTS.md |
| Current state | "status", "works", "implemented" | technical_status.md |
| Known issues | "issues", "bugs", "limitations", "debt" | technical_status.md |
| Recent changes | "changed", "updated", "fixed" | technical_status.md |
| Future plans | "roadmap", "planned", "todo", "backlog" | ROADMAP.md |
| Conventions | "conventions", "patterns", "how we", "always" | patterns/ |
| API docs | "endpoint", "request", "response", "schema" | api_contract_standards.md |

**Critical:** Do NOT rely on filenames. A file called `NOTES.md` might contain architecture decisions. A file called `meeting-2024-03-15.md` might contain the only documentation of project goals.

### Step 1.5.2: Map Content to Target Documents

For each file, record which FluxFrame documents it informs:

```markdown
### [filename]
**Path:** [full path]
**Also in archival inventory:** [Yes/No - from Step 1.4]

**Content Analysis:**
- AGENTS.md: [Yes/No/Partial] - [specific content: lines, sections]
- technical_status.md: [Yes/No/Partial] - [specific content]
- ROADMAP.md: [Yes/No/Partial] - [specific content]
- patterns/ui_patterns.md: [Yes/No/Partial] - [specific content]
- patterns/api_patterns.md: [Yes/No/Partial] - [specific content]
- patterns/data_patterns.md: [Yes/No/Partial] - [specific content]
- api_contract_standards.md: [Yes/No/Partial] - [specific content]

**Content spans multiple targets:** [Yes/No]
**Confidence:** [High/Medium/Low]
```

### Step 1.5.3: Handle Common Similar Workflow Cases

**Case: Existing context_guide.md or similar**
```markdown
Found: docs/context_guide.md (similar to FluxFrame AGENTS.md)

This file will be:
- Step 1.4 decision: [Archive/Keep] - organizational decision
- Step 1.5 decision: Use as PRIMARY source for AGENTS.md

Content mapping:
- Project identity: Lines 1-50 → AGENTS.md Section 1
- Architecture: Lines 60-120 → AGENTS.md Section 2
- Workflows: Lines 130-200 → AGENTS.md Section 3 (may need FluxFrame adaptation)
```

**Case: Existing patterns scattered across files**
```markdown
Found pattern-related content in multiple files:
- CONTRIBUTING.md: Coding style (lines 50-100) → patterns/ui_patterns.md, patterns/api_patterns.md
- docs/architecture.md: Architecture patterns (lines 30-80) → patterns/api_patterns.md
- .clinerules/patterns.md: Existing patterns → patterns/ (migrate structure)

Will consolidate into FluxFrame pattern library structure.
```

**Case: No explicit status document**
```markdown
No technical_status.md equivalent found.

Fallback sources for technical status:
- CHANGELOG.md: Recent changes (last 10 entries)
- README.md: "Known Issues" section if exists
- Git history: Recent commits for "Recently Changed"
- package.json: Version number

Will synthesize technical_status.md from these sources.
```

### Step 1.5.4: Generate Content Source Mapping File

Create `.fluxframe/detected_content_sources.md`:

```markdown
# Detected Content Sources

**Generated:** [timestamp]
**Project:** {{PROJECT_NAME}}
**Scenario:** SIMILAR_WORKFLOW
**Status:** Awaiting user review

---

## Overview

You have existing documentation that can inform your FluxFrame setup. I've analyzed
each file to identify what content should be extracted for each FluxFrame document.

**Important distinction:**
- **Archival decisions** (Phase 2.8): What happens to files organizationally
- **Content sources** (this mapping): What content to extract for new documents

A file can be archived AND used as a content source - the content is extracted first,
then the original is preserved in the archive.

---

## For AGENTS.md

**What this document needs:**
- Project purpose, vision, and goals
- Target users and their needs
- High-level architecture overview
- Tech stack and key decisions
- Core workflows (will be adapted to FluxFrame methodology)

**Sources found:**

| File | Relevant Content | Confidence | Notes |
|------|------------------|------------|-------|
| [existing_context.md] | Full file - primary source | High | Existing context guide |
| [README.md] | Project description (lines 1-30) | Medium | Supplement |
| [architecture.md] | Architecture section (lines 40-100) | High | Technical details |

**User action:** Are these the right sources? Any files I missed?

---

## For technical_status.md

**What this document needs:**
- Current project state and capabilities
- Architecture implementation status
- Recent changes and their impact
- Known issues and technical debt
- Environment status (dev/staging/prod)

**Sources found:**

| File | Relevant Content | Confidence | Notes |
|------|------------------|------------|-------|
| [STATUS.md] | Current state, known issues | High | Primary source |
| [CHANGELOG.md] | Recent changes | High | Last 3 months |
| [existing_context.md] | Architecture status (lines 80-120) | Medium | May be outdated |

**Gaps identified:**
- Environment matrix: Will gather from Q8-Q10 questionnaire
- Technical debt: [Found in X / Not found - will ask user]

---

## For ROADMAP.md

**What this document needs:**
- Planned features and capabilities
- Prioritized backlog
- Milestones and timeline
- Dependencies between items
- Future vision

**Sources found:**

| File | Relevant Content | Confidence | Notes |
|------|------------------|------------|-------|
| [ROADMAP.md or TODO.md] | Existing roadmap | [confidence] | [notes] |
| [backlog.md] | Backlog items | [confidence] | [notes] |

**Will adapt to:** FluxFrame two-tier planning system (strategic ROADMAP.md + tactical roadmap/ plans)

---

## For patterns/

**What these documents need:**
- UI component patterns and conventions
- API design patterns
- Data access patterns
- Infrastructure patterns
- Coding conventions

**Sources found:**

| File | Relevant Content | Target Pattern File | Confidence |
|------|------------------|---------------------|------------|
| [CONTRIBUTING.md] | Code style (lines 50-100) | ui_patterns.md, api_patterns.md | Medium |
| [existing patterns/] | Existing patterns | Direct migration candidate | High |
| [architecture.md] | API patterns (lines 60-90) | api_patterns.md | Medium |

---

## For api_contract_standards.md

**What this document needs:**
- API design approach
- Endpoint conventions
- Request/response formats
- Type definitions

**Sources found:**

| File | Relevant Content | Confidence |
|------|------------------|------------|
| [api-docs/] | API documentation | [confidence] |
| [openapi.yaml] | Schema definitions | High |

---

## Summary

| Target Document | Sources | Confidence | User Review |
|-----------------|---------|------------|-------------|
| AGENTS.md | [N] files | [avg] | ⬜ Pending |
| technical_status.md | [N] files | [avg] | ⬜ Pending |
| ROADMAP.md | [N] files | [avg] | ⬜ Pending |
| patterns/ | [N] files | [avg] | ⬜ Pending |
| api_contract_standards.md | [N] files | [avg] | ⬜ Pending |

---

## Your Review

Please confirm this content mapping:

1. **For each document:** Are the sources I identified correct?
2. **Missing sources:** Are there files I should include that I missed?
3. **Wrong sources:** Are there files I should NOT extract content from?
4. **External content:** Any content outside the repo (Notion, Google Docs) you want to manually add?

After your confirmation, I'll extract content from these sources when generating each FluxFrame document.
```

### Step 1.5.5: Present Mapping for User Review

```markdown
## Content Source Review

Before proceeding to Phase 2 (user preferences), please review the content sources I identified.

📄 **Full mapping:** `.fluxframe/detected_content_sources.md`

**Summary:**

| FluxFrame Document | Primary Sources | Gaps |
|--------------------|-----------------|------|
| AGENTS.md | [list] | [any gaps] |
| technical_status.md | [list] | [any gaps] |
| ROADMAP.md | [list] | [any gaps] |
| patterns/ | [list] | [any gaps] |

**Questions:**
1. Are these sources correct?
2. Any files I should add or remove?
3. For gaps, can you point me to relevant files?
```

**Wait for user confirmation before proceeding to Phase 2.**

### Step 1.5.5.1: Handle Missing Project Brief (BLOCKING)

If no sources were found for project purpose/vision/goals, this is a **blocking** issue even for similar workflow projects. The existing AI rules may have project context, but if no documentation source exists, require the user to create one.

```markdown
## Project Brief Required

Your existing AI rules reference project context, but I couldn't find source documentation
describing your project's purpose, vision, or goals.

To ensure accurate content extraction and documentation generation, please create a brief:

1. Create `project_brief.md` in your project root
2. Include:
   - What is this project?
   - Why does it exist?
   - Who is it for?
   - What are the main goals?
   - Tech stack
   - Current status

3. Let me know when ready

**Location:** Project root (next to README.md)

This ensures your FluxFrame documentation is grounded in documented facts,
not inferred from scattered references.
```

**After user creates project_brief.md:**
1. Re-scan and analyze the new file
2. Update `.fluxframe/detected_content_sources.md`
3. Present updated mapping for confirmation
4. Then proceed to Step 1.5.6

### Step 1.5.6: Update and Confirm

After user review:
1. Update `.fluxframe/detected_content_sources.md` with any changes
2. Set status to "Confirmed"
3. Log decision:

```
log_decision({
  category: "content_sources",
  decision: "Content source mapping confirmed",
  reasoning: "[User's confirmation notes]",
  sources_confirmed: [list of files],
  sources_added: [any user additions],
  gaps_acknowledged: [any gaps user accepted]
})
```

---
```

### Modify Phase 4 (Generate Merged Configuration)

Add to the beginning of Phase 4:

```markdown
## Phase 4: Generate Merged Configuration (to Staging)

> [!CRITICAL]
> **READ CONTENT SOURCES BEFORE GENERATING**
>
> Before generating any FluxFrame document, you MUST:
> 1. Read `.fluxframe/detected_content_sources.md`
> 2. For the document you're generating, identify confirmed sources
> 3. Read each source file
> 4. Extract the specific content mapped to this document
> 5. Synthesize into FluxFrame format
>
> **This applies to:**
> - AGENTS.md (or equivalent)
> - technical_status.md
> - ROADMAP.md
> - patterns/ files
> - api_contract_standards.md
>
> **Why:** The content source mapping was confirmed by the user. Using it ensures
> no valuable content is missed and the user's input on sources is honored.

[... existing Phase 4 content with source reading added to each document generation step ...]
```

---

## Integration for migration_workflow.md

### Add to Phase 1 (After Step 1.4, Before Step 1.5)

Insert as new Step 1.4.5:

```markdown
---

### Step 1.4.5: Content Source Mapping (REQUIRED)

**Purpose:** Migration projects have the most documentation to process. Create an explicit mapping of what content should be extracted from existing docs before organizational decisions (archive/migrate/reference) are made.

**Critical Distinction:**
- **Phase 1.3 (FluxFrame Mapping):** Identifies structural equivalents (your docs → FluxFrame docs)
- **Phase 1.4.5 (Content Source Mapping):** Identifies specific content to extract from each file
- **Phase 2.2-2.8 (User Preferences):** Determines organizational fate of files

**Why This Order:**
Content source mapping happens BEFORE user preferences because:
1. We need to know what's IN the files to present good migration options
2. User can make better archive/migrate/reference decisions knowing what content will be extracted
3. During generation, we need confirmed sources regardless of organizational decision

### Step 1.4.5.1: Deep Content Analysis

For **every documentation file** discovered in Phase 1.1-1.4, perform comprehensive content analysis:

**Read each file and classify content by target FluxFrame document:**

```markdown
### [filename]
**Path:** [path]
**Structure:** [single topic / mixed content / comprehensive]
**Last Modified:** [date]
**Quality Assessment:** [current / outdated / partial]

**Content Found:**

| Content Type | Location in File | Target FluxFrame Doc | Confidence |
|--------------|------------------|---------------------|------------|
| Project purpose | Lines 1-30 | AGENTS.md | High |
| Architecture decisions | Lines 50-120 | AGENTS.md | High |
| Known issues | Lines 200-250 | technical_status.md | Medium |
| Future plans | "Roadmap" section | ROADMAP.md | High |
| API conventions | Scattered | api_patterns.md | Low |

**File spans multiple target docs:** Yes
**Recommended handling:** Extract content, then [archive/migrate/reference based on Phase 2 decision]
```

### Step 1.4.5.2: Handle Migration-Specific Cases

**Case: Wiki-Style Documentation**

Wikis often have:
- Interlinked pages with overlapping content
- Historical pages mixed with current
- Multiple pages covering the same topic differently

```markdown
## Wiki Content Analysis

**Wiki location:** [path]
**Total pages:** [N]
**Structure:** Interlinked / Hierarchical / Flat

**Content Distribution:**

| Topic | Pages Covering It | Primary Source | Secondary Sources |
|-------|-------------------|----------------|-------------------|
| Project purpose | index.md, about.md, README.md | about.md | index.md (summary) |
| Architecture | architecture.md, decisions/*.md | architecture.md | decisions/ (details) |
| Current status | status.md, changelog.md | status.md | changelog.md (history) |

**Recommendation:**
- Use primary sources for content extraction
- Secondary sources for supplemental detail
- Archive entire wiki structure for reference
```

**Case: ADR-Based Documentation**

```markdown
## ADR Content Analysis

**ADR location:** [path]
**Total ADRs:** [N]

**Content Mapping:**

ADRs document WHY decisions were made (descriptive).
FluxFrame patterns document WHAT to do (prescriptive).

| ADR | Decision Topic | Extract For | Notes |
|-----|----------------|-------------|-------|
| ADR-001 | Database choice | AGENTS.md (tech stack rationale) | Context only |
| ADR-003 | API style | api_patterns.md (pattern basis) | Informs pattern |
| ADR-007 | Auth approach | api_patterns.md, infra_patterns.md | Security patterns |

**Recommendation:**
- Extract decision context for AGENTS.md
- Use decisions as basis for patterns/ content
- Reference ADR directory for historical decisions (don't migrate ADR structure itself)
```

**Case: Scattered/Fragmented Documentation**

```markdown
## Fragmented Content Analysis

Content is spread across multiple non-obvious files:

| Content Type | Found In | Quality | Completeness |
|--------------|----------|---------|--------------|
| Project purpose | README.md (partial), meeting-notes/kickoff.md, slack-export.txt | Mixed | 60% |
| Architecture | design-sketch.md, whiteboard-photo.jpg description, PR comments | Low | 40% |
| Current status | (not documented) | N/A | 0% |
| Roadmap | trello-export.json, quarterly-planning.md | Medium | 70% |

**Recommendation:**
- Present sources to user for confirmation (may know of others)
- For low-quality sources, extract what's there and note gaps
- For missing content, plan to gather during questionnaire
```

### Step 1.4.5.3: Generate Content Source Mapping File

Create `.fluxframe/detected_content_sources.md`:

```markdown
# Detected Content Sources

**Generated:** [timestamp]
**Project:** {{PROJECT_NAME}}
**Scenario:** MIGRATION
**Status:** Awaiting user review

---

## Overview

This is a MIGRATION project with existing documentation to process. I've analyzed
all documentation files to map what content should be extracted for each FluxFrame document.

**This mapping is separate from organizational decisions:**
- A file marked "MIGRATE" organizationally will have its content extracted here first
- A file marked "ARCHIVE" may still be used as a content source
- A file marked "REFERENCE" means we link to it rather than extract

---

## For AGENTS.md

**What this document needs:**
- Project purpose, vision, goals
- Target users and value proposition
- High-level architecture overview
- Tech stack and rationale
- Core workflows (adapted to FluxFrame)

**Sources identified:**

| File | Content | Lines/Section | Confidence | Organizational Fate |
|------|---------|---------------|------------|---------------------|
| [file] | [content type] | [location] | [H/M/L] | [TBD in Phase 2] |

**Content gaps:**
- [Any missing content types]

**User input needed:**
- Are these sources correct?
- Files I missed?
- For gaps, where might this info exist?

---

## For technical_status.md

**What this document needs:**
- Current capabilities and limitations
- Architecture implementation status
- Recent changes
- Known issues and technical debt
- Environment status

**Sources identified:**

| File | Content | Lines/Section | Confidence | Organizational Fate |
|------|---------|---------------|------------|---------------------|
| [file] | [content type] | [location] | [H/M/L] | [TBD in Phase 2] |

**Content gaps:**
- [gaps]

---

## For ROADMAP.md

**What this document needs:**
- Planned features
- Prioritized backlog
- Milestones and timeline
- Future vision

**Sources identified:**

| File | Content | Lines/Section | Confidence | Organizational Fate |
|------|---------|---------------|------------|---------------------|
| [file] | [content type] | [location] | [H/M/L] | [TBD in Phase 2] |

**Note:** Existing roadmap content will be adapted to FluxFrame's two-tier planning system.

---

## For patterns/

**What these documents need:**
- UI patterns and conventions
- API design patterns
- Data access patterns
- Infrastructure patterns

**Sources identified:**

| File | Content | Target Pattern Doc | Confidence | Org Fate |
|------|---------|-------------------|------------|----------|
| [file] | [content] | [ui/api/data/infra]_patterns.md | [H/M/L] | [TBD] |

---

## For api_contract_standards.md

**What this document needs:**
- API approach and philosophy
- Endpoint conventions
- Request/response formats
- Type definitions

**Sources identified:**

| File | Content | Lines/Section | Confidence | Org Fate |
|------|---------|---------------|------------|----------|
| [file] | [content] | [location] | [H/M/L] | [TBD] |

---

## Content Extraction Strategy

Based on analysis, here's the recommended extraction approach:

| Target Document | Primary Source | Secondary Sources | Gaps to Fill |
|-----------------|----------------|-------------------|--------------|
| AGENTS.md | [file] | [files] | [gaps] |
| technical_status.md | [file] | [files] | [gaps] |
| ROADMAP.md | [file] | [files] | [gaps] |
| patterns/* | [files] | [files] | [gaps] |
| api_contract_standards.md | [file] | [files] | [gaps] |

---

## Your Review (BEFORE Phase 2 Preferences)

Please review this content mapping BEFORE we discuss organizational decisions (archive/migrate/reference):

1. **Sources correct?** For each target document, are the sources I identified right?
2. **Missing sources?** Files I should include?
3. **Wrong sources?** Files I should NOT extract from?
4. **Content gaps:** For identified gaps, can you point me to sources?

**Why review now?**
Understanding what content will be extracted helps you make better organizational
decisions in Phase 2. For example:
- If all valuable content from a file will be extracted → easier to archive
- If a file has content I can't extract well → maybe reference instead
```

### Step 1.4.5.4: Present and Confirm Before Phase 2

```markdown
## Content Source Review (Pre-Phase 2)

Before we discuss how to handle your existing documentation (archive/migrate/reference),
please confirm where I should get content for each FluxFrame document.

📄 **Full mapping:** `.fluxframe/detected_content_sources.md`

**Quick Summary:**

| FluxFrame Document | Main Sources | Gaps |
|--------------------|--------------|------|
| AGENTS.md | [list] | [gaps] |
| technical_status.md | [list] | [gaps] |
| ROADMAP.md | [list] | [gaps] |
| patterns/ | [list] | [gaps] |

**Why this matters for Phase 2:**
- Files fully used as content sources → good candidates for ARCHIVE
- Files with unique value beyond extraction → consider REFERENCE
- Files with content I can't easily extract → may need MIGRATE with manual review

**Questions:**
1. Sources look correct?
2. Any files to add/remove?
3. Ready to proceed to Phase 2 (organizational preferences)?
```

**Wait for user confirmation, then proceed to Phase 2.**

### Step 1.4.5.4.1: Handle Missing Project Brief (BLOCKING)

Even migration projects may lack clear project purpose documentation. If no sources were found for project purpose/vision/goals, require the user to create a brief.

```markdown
## Project Brief Required

Despite having existing documentation, I couldn't find clear sources describing
your project's core purpose, vision, or goals.

I found documentation about [what was found], but nothing that clearly states
what this project IS and WHY it exists.

**Please create a project brief:**

1. Create `project_brief.md` in your project root
2. Include:
   - What is this project? (1-3 sentences)
   - Why does it exist? (problem it solves)
   - Who is it for? (target users)
   - What are the main goals?
   - Tech stack
   - Current status

3. Let me know when ready

**Location:** Project root (next to README.md)

**Note:** Your existing documentation may INFORM this brief - feel free to
consolidate scattered purpose statements into this single source of truth.
```

**After user creates project_brief.md:**
1. Re-scan and analyze the new file
2. Update `.fluxframe/detected_content_sources.md`
3. Present updated mapping for confirmation
4. Then proceed to Phase 2

---
```

### Modify Phase 3 (Execute Migration)

Add to the CRITICAL box at the start of Phase 3:

```markdown
## Phase 3: Execute Migration

> [!CRITICAL]
> **READ AND EXTRACT BEFORE ARCHIVAL**
>
> Before generating FluxFrame documents, you MUST read and extract content from existing docs.
>
> **Use the confirmed content source mapping:**
> 1. Read `.fluxframe/detected_content_sources.md`
> 2. For each FluxFrame document, identify confirmed sources
> 3. Read each source file
> 4. Extract the specific content mapped to that document
> 5. Then generate the FluxFrame document with extracted content
>
> | FluxFrame Document | Read Sources From Mapping |
> |-------------------|---------------------------|
> | AGENTS.md | [confirmed sources] |
> | technical_status.md | [confirmed sources] |
> | ROADMAP.md | [confirmed sources] |
> | patterns/* | [confirmed sources] |
> | api_contract_standards.md | [confirmed sources] |
>
> **Timing:** Documents marked for MIGRATE/ARCHIVE are moved during Phase 7.
> If you don't read and extract content NOW using the confirmed mapping,
> it will only exist in the archive and the new FluxFrame documents will be incomplete.

[... rest of Phase 3 ...]
```

### Modify Step 3.4 (Create FluxFrame Core Documents)

Update each document generation section:

```markdown
### Step 3.4: Create FluxFrame Core Documents

#### AGENTS.md

**FIRST: Read Confirmed Sources**

From `.fluxframe/detected_content_sources.md`, for AGENTS.md:

```
Confirmed sources:
- [source 1]: [content to extract]
- [source 2]: [content to extract]
```

**Read and extract:**
```markdown
Reading [source 1]...
Extracting: [content type] from lines [X-Y]

Reading [source 2]...
Extracting: [content type] from [section]
```

**Then generate with extracted content:**

# Creating AGENTS.md

**Content extracted from sources:**
- Project purpose: From [source] - "[extracted content summary]"
- Architecture: From [source] - "[extracted content summary]"
- Tech stack: From [source] - "[extracted content summary]"

**Sections to populate:**

1. **Project Identity**
   - Source: [confirmed source]
   - Extracted: [what was extracted]
   - Gaps: [what needs user input]

[... continue for each section ...]
```

---

## Common Addition: Cleanup During Finalization

All three workflows already clean up `.fluxframe/` during finalization. The `detected_content_sources.md` file will be automatically removed. No changes needed to finalization steps.

---

## Validation Checklist Addition

Add to each workflow's validation checklist:

```markdown
### Content Source Mapping Validation

Before proceeding past detection/inventory phase:
- [ ] `.fluxframe/detected_content_sources.md` exists
- [ ] All potential documentation files have been analyzed
- [ ] Content has been classified by target FluxFrame document
- [ ] User has reviewed and confirmed the mapping
- [ ] Mapping status is "Confirmed"

Before generating each FluxFrame document:
- [ ] Read `.fluxframe/detected_content_sources.md`
- [ ] Confirmed sources for this document identified
- [ ] Each source file has been read
- [ ] Relevant content has been extracted
- [ ] Gaps have been noted for user follow-up
```
