# Project State Detection Guide

**Purpose:** Instructions for AI assistants to analyze an existing project and determine the appropriate bootstrap workflow.

**When to use:** This is Phase 1 of the bootstrap process - run BEFORE asking project questions.

**Detection Level:** B (Read & Analyze) - Check file existence AND read content when needed for decisions.

---

## Detection Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     DETECTION PHASE                              │
├─────────────────────────────────────────────────────────────────┤
│  1. Scan project root for existing files/directories            │
│  2. Analyze content of detected files (Level B)                 │
│  3. Classify into one of three scenarios                        │
│  4. Output detection summary                                    │
│  5. Route to appropriate workflow                               │
└─────────────────────────────────────────────────────────────────┘

         ↓ Classification Results ↓

┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│ GREENFIELD  │  │   SIMILAR   │  │  MIGRATION  │
│             │  │  WORKFLOW   │  │             │
│ No existing │  │ Has AI rules│  │ Has docs    │
│ workflow or │  │ similar to  │  │ but diff    │
│ docs        │  │ FluxFrame   │  │ structure   │
└──────┬──────┘  └──────┬──────┘  └──────┬──────┘
       │                │                │
       ▼                ▼                ▼
  greenfield_      similar_        migration_
  workflow.md      workflow.md     workflow.md
```

---

## What to Scan For

### 1. Existing AI Rules

Check for these files/directories in project root:

| Item to Check | Indicates |
|--------------|-----------|
| `.clinerules/` (directory) | Cline rules (folder structure) |
| `.clinerules` (file) | Cline rules (single file - legacy) |
| `AGENTS.md` | Universal AI baseline |
| `CLAUDE.md` | Claude Code configuration |
| `.claude/` | Claude Code rules directory |
| `.roomodes` or `.roo/` | Roo Code configuration |
| `GEMINI.md` | Antigravity configuration |
| `.cursorrules` | Cursor configuration |
| `.github/copilot-instructions.md` | GitHub Copilot |

**If ANY of these exist → project has existing AI workflow**

### 2. Existing Documentation

Check for documentation directories:

| Directory | Common Usage |
|-----------|--------------|
| `project_docs/` | FluxFrame standard location |
| `docs/` | Common documentation directory |
| `documentation/` | Alternative docs directory |
| `wiki/` | Wiki-style documentation |
| `.github/docs/` | GitHub-style docs |

**Within docs, look for:**
- `context_master_guide.md` or similar "single source of truth"
- `technical_status.md` or `STATUS.md` or `ARCHITECTURE.md`
- `implementation_plan.md` or `ROADMAP.md`
- `api_contract*.md` or `API.md`

### 3. Existing Bug Fix/Change History

Check for structured change tracking:

| Directory | Indicates |
|-----------|-----------|
| `bug_fixes/` | FluxFrame-style fix documentation |
| `fixes/` | Alternative fix tracking |
| `changes/` | Change documentation |
| `decisions/` or `ADRs/` | Architecture Decision Records |
| `RFCs/` | Request for Comments documents |

### 4. Existing Pattern Libraries

Check for pattern documentation:

| Location | Indicates |
|----------|-----------|
| `patterns/` | Pattern library directory |
| `**/patterns/` | Nested pattern directories |
| `styleguide/` | UI/code style patterns |
| `conventions/` | Coding conventions |

### 5. Project Configuration

Always read if present:

| File | Information to Extract |
|------|----------------------|
| `package.json` | Project name, tech stack hints |
| `composer.json` | PHP project details |
| `requirements.txt` / `pyproject.toml` | Python dependencies |
| `Cargo.toml` | Rust project details |
| `go.mod` | Go project details |
| `README.md` | Project description, purpose |
| `.nvmrc` / `.node-version` | Node version |
| `tsconfig.json` | TypeScript configuration |

---

## Detection Process

### Step 1: Initial Scan

Perform a quick scan of project root:

```
Scan these locations:
- Root directory (list top-level files/folders)
- Common doc directories (if they exist)
- Look for config files
```

**Record findings as:**
```
Detection Results:
- AI Rules: [list found items]
- Documentation: [list found directories/files]
- Bug Fixes: [directory if found]
- Patterns: [directory if found]  
- Project Config: [files found]
```

### Step 2: Content Analysis (Level B)

For each detected item, read and understand content:

**For AI Rules files:**
- What rules are defined?
- What workflows are established?
- What patterns are referenced?
- How similar to FluxFrame structure?

**For Documentation:**
- What's the structure?
- Is there a "single source of truth" document?
- How is technical status tracked?
- What workflows exist?

**For Bug Fixes:**
- What format are they in?
- How many exist?
- Do they follow a pattern?
- Are they valuable for pattern extraction?

**For Patterns:**
- What categories exist?
- Are they well-documented?
- Do they follow a consistent format?

### Step 3: Classification Decision

Use this decision tree:

```
START
  │
  ├─▶ Has existing AI rules?
  │     │
  │     ├─▶ YES: Are rules similar to FluxFrame?
  │     │         (Has workflows, patterns, context docs)
  │     │         │
  │     │         ├─▶ YES → SIMILAR_WORKFLOW
  │     │         │         (Upgrade existing to FluxFrame)
  │     │         │
  │     │         └─▶ NO → Does project have substantial docs?
  │     │                   │
  │     │                   ├─▶ YES → MIGRATION
  │     │                   │         (Adapt docs + replace rules)
  │     │                   │
  │     │                   └─▶ NO → GREENFIELD
  │     │                             (Rules exist but minimal)
  │     │
  │     └─▶ NO: Does project have substantial documentation?
  │               │
  │               ├─▶ YES → MIGRATION
  │               │         (Has docs, needs AI workflow)
  │               │
  │               └─▶ NO → GREENFIELD
  │                         (Fresh start)
  │
  └─▶ END
```

### Classification Criteria Details

**GREENFIELD if:**
- No existing AI rules, OR only minimal `.cursorrules`
- No structured documentation beyond README
- No bug fix history
- No pattern library
- Essentially a "fresh" project or very early stage

**SIMILAR_WORKFLOW if:**
- Has AI rules (`.clinerules`, `AGENTS.md`, etc.)
- Rules contain structured workflows (iterations, patterns, etc.)
- May have documentation that follows similar principles
- Needs upgrade/enhancement, not complete replacement

**MIGRATION if:**
- Has existing documentation structure (docs/, wiki/, etc.)
- Documentation follows different structure than FluxFrame
- May or may not have AI rules (if has rules, they're minimal)
- Has valuable content to preserve and integrate
- Examples:
  - Project with ADRs and RFC docs
  - Project with extensive wiki documentation
  - Project with bug fix history in different format
  - Project with existing pattern library (different structure)

---

## Detection Output Format

Present findings to user in this format:

```markdown
## Project State Detection Results

### Detected AI Configuration
- **Cline:** [Found/Not found] [details if found]
- **Claude Code:** [Found/Not found]
- **Roo Code:** [Found/Not found]
- **Other:** [List any other AI configs found]

### Detected Documentation
- **Primary location:** [path or "None"]
- **Structure:** [Brief description]
- **Key documents found:**
  - [List relevant documents]

### Detected Bug Fix/Change History
- **Location:** [path or "None"]
- **Format:** [Description]
- **Count:** [Number of files if applicable]

### Detected Pattern Library
- **Location:** [path or "None"]
- **Categories:** [List if found]

### Project Information (from config files)
- **Name:** [from package.json/README]
- **Tech Stack:** [detected technologies]
- **Type:** [web app, CLI, library, etc.]

---

## Classification: **[GREENFIELD/SIMILAR_WORKFLOW/MIGRATION]**

**Reasoning:** [Brief explanation of why this classification]

**Recommended Workflow:** `bootstrap/[workflow_name].md`
```

---

## After Detection

Based on classification, proceed to appropriate workflow:

| Classification | Next Step | File |
|---------------|-----------|------|
| GREENFIELD | Standard bootstrap - ask questions, generate everything | `bootstrap/greenfield_workflow.md` |
| SIMILAR_WORKFLOW | Diff existing, merge with FluxFrame, preserve customizations | `bootstrap/similar_workflow.md` |
| MIGRATION | Analyze existing docs, ask import preferences, adapt structure | `bootstrap/migration_workflow.md` |

**Important:** Always present detection results to user and confirm classification before proceeding.

---

## Examples

### Example 1: Greenfield Detection

```markdown
## Project State Detection Results

### Detected AI Configuration
- **Cline:** Not found
- **Claude Code:** Not found
- **Roo Code:** Not found
- **Other:** None

### Detected Documentation
- **Primary location:** None (only README.md at root)
- **Structure:** N/A
- **Key documents found:** None

### Detected Bug Fix/Change History
- **Location:** None
- **Format:** N/A
- **Count:** N/A

### Detected Pattern Library
- **Location:** None
- **Categories:** N/A

### Project Information
- **Name:** my-new-app (from package.json)
- **Tech Stack:** React, TypeScript, Node.js
- **Type:** Web application

---

## Classification: **GREENFIELD**

**Reasoning:** No existing AI configuration, documentation, or structured workflows found. Project appears to be new or early-stage.

**Recommended Workflow:** `bootstrap/greenfield_workflow.md`
```

### Example 2: Similar Workflow Detection

```markdown
## Project State Detection Results

### Detected AI Configuration
- **Cline:** Found `.clinerules/` directory with 3 rule files
  - `01-core.md`: Contains project context, development workflow
  - `02-patterns.md`: References pattern library
  - `03-testing.md`: Testing guidelines
- **Claude Code:** Not found
- **Roo Code:** Not found

### Detected Documentation
- **Primary location:** `project_docs/`
- **Structure:** Similar to FluxFrame (context guide, status, patterns)
- **Key documents found:**
  - `context_guide.md` (single source of truth)
  - `status.md` (technical status)
  - `patterns/` directory with 5 patterns

### Detected Bug Fix/Change History
- **Location:** `project_docs/fixes/`
- **Format:** Markdown files with date prefixes
- **Count:** 12 files

### Detected Pattern Library
- **Location:** `project_docs/patterns/`
- **Categories:** UI, API, Data

### Project Information
- **Name:** TaskManager Pro
- **Tech Stack:** React, FastAPI, PostgreSQL
- **Type:** Full-stack web application

---

## Classification: **SIMILAR_WORKFLOW**

**Reasoning:** Project has existing Cline rules with structured workflows, documentation following similar principles to FluxFrame. Needs upgrade/enhancement rather than fresh setup.

**Recommended Workflow:** `bootstrap/similar_workflow.md`
```

### Example 3: Migration Detection

```markdown
## Project State Detection Results

### Detected AI Configuration
- **Cline:** Not found
- **Claude Code:** Not found
- **Roo Code:** Not found
- **Other:** `.cursorrules` (minimal - just "You are a helpful assistant")

### Detected Documentation
- **Primary location:** `docs/`
- **Structure:** Different from FluxFrame
  - `docs/architecture/` - Architecture documents
  - `docs/ADRs/` - Architecture Decision Records (23 files)
  - `docs/api/` - API documentation
- **Key documents found:**
  - `docs/architecture/OVERVIEW.md`
  - `docs/ADRs/001-use-graphql.md` through `023-caching-strategy.md`
  - `docs/api/schema.graphql`

### Detected Bug Fix/Change History
- **Location:** `docs/decisions/` (combined with ADRs)
- **Format:** ADR format with status, context, decision, consequences
- **Count:** 23 files

### Detected Pattern Library
- **Location:** `docs/conventions/`
- **Categories:** GraphQL resolvers, React components, Testing

### Project Information
- **Name:** Enterprise Dashboard
- **Tech Stack:** React, Apollo GraphQL, Node.js
- **Type:** Enterprise web application

---

## Classification: **MIGRATION**

**Reasoning:** Project has substantial existing documentation in different structure (ADR-based). No AI workflow configured. Valuable documentation exists that should be preserved and integrated with FluxFrame structure.

**Recommended Workflow:** `bootstrap/migration_workflow.md`
```

---

## Notes for AI Assistants

1. **Don't over-analyze**: Level B means read content when needed for decisions, not exhaustive analysis
2. **Be conservative**: When in doubt, classify as MIGRATION (preserves more)
3. **Ask when unclear**: If detection is ambiguous, ask user to clarify
4. **Show your work**: Always present detection results before proceeding
5. **Respect existing work**: Never delete or overwrite without explicit user permission
