# FluxFrame AI Rules Architecture Restructure

## Mission

Restructure FluxFrame's ai-rules to support multiple AI coding agents (Claude Code, Roo Code, Cline, Antigravity, and the AGENTS.md open standard) with a layered architecture that maximizes code reuse while enabling tool-specific features.

---

## Context & Motivation

### The Problem We're Solving

FluxFrame currently supports Cline (`.clinerules`) and Roo Code (`.roorules`), but the AI coding agent landscape has evolved significantly:

1. **AGENTS.md has emerged as the open standard** - Backed by OpenAI, Google, Cursor, Factory, Sourcegraph, and adopted by 60k+ repositories. It's the "lowest common denominator" that works across most tools.

2. **Each tool has unique, powerful features beyond simple naming:**
   - **Claude Code**: File imports (`@path/to/file.md`), 4-level hierarchy, path-targeted rules with glob patterns in `.claude/rules/`
   - **Roo Code**: YAML-based "modes" (personas), tool permission restrictions via regex, mode-specific rule directories
   - **Cline**: Folder-based rules with toggle UI, rule banks for context switching
   - **Antigravity**: GEMINI.md + workflows system

3. **Simple symlinks are insufficient** - They only solve the naming problem, not the feature gap. Users miss out on powerful tool-specific capabilities.

### The Solution: Layered Architecture

Create a system where:
- **AGENTS.md** contains the universal baseline (works everywhere)
- **Tool-specific configurations** extend AGENTS.md with their unique features
- **Users choose their level of integration** (basic symlinks vs full tool support)

---

## Actual File Locations by Tool

Understanding where each tool expects its configuration:

| Tool | Primary Location | Alternative | Notes |
|------|------------------|-------------|-------|
| **AGENTS.md** | `./AGENTS.md` | Nested in subdirs | Nearest file wins for nested |
| **Claude Code** | `./CLAUDE.md` | `./.claude/CLAUDE.md` | One or the other, not both |
| **Roo Code** | Auto-detects `./AGENTS.md` | `.roorules` | Plus `.roomodes` for modes |
| **Cline** | `./.clinerules` (file) | `./.clinerules/` (folder) | One or the other |
| **Antigravity** | `./GEMINI.md` | `~/.gemini/GEMINI.md` | Root for project, home for global |

**Key insight**: These are alternatives, not layers. You don't have BOTH `./CLAUDE.md` AND `./.claude/CLAUDE.md`.

---

## Current State Analysis

### Current FluxFrame Structure (relevant parts):

```
fluxframe/
├── ai-rules/
│   ├── template.clinerules           # Cline template
│   ├── template.roorules             # Roo template  
│   ├── CUSTOMIZATION_GUIDE.md
│   └── RULE_ENFORCEMENT.md
├── BOOTSTRAP_INSTRUCTIONS.md
├── bootstrap/
│   ├── project_questionnaire.md
│   ├── scaffolding_workflow.md
│   └── validation_checklist.md
└── ... (other directories)
```

### What Gets Generated Currently:

When a user bootstraps a project, they get:
- `.clinerules` OR `.roorules` (one file)
- `project_docs/` directory
- `mcp-server.js`

---

## Target State

### New `ai-rules/` Structure in FluxFrame:

```
ai-rules/
├── README.md                           # Explains the architecture & feature matrix
├── FEATURE_MATRIX.md                   # Comparison of tool capabilities
├── CUSTOMIZATION_GUIDE.md              # Updated guide
├── RULE_ENFORCEMENT.md                 # Keep existing
│
├── core/                               # Shared content → becomes AGENTS.md
│   ├── template.agents.md              # The universal baseline template
│   └── sections/                       # Modular pieces for composition
│       ├── project-context.md          # Project overview section
│       ├── development-workflow.md     # Cycle methodology
│       ├── pattern-driven-dev.md       # Pattern library usage
│       ├── api-contracts.md            # API enforcement rules
│       ├── testing-philosophy.md       # Test-implementation alignment
│       ├── documentation-first.md      # Doc maintenance rules
│       └── change-request-protocol.md  # Bug fix workflow
│
├── claude-code/                        # Claude Code specific
│   ├── template.claude.md              # Main file (uses @AGENTS.md import)
│   ├── rules/                          # Path-targeted rules templates
│   │   ├── api-rules.template.md       # For src/api/**
│   │   ├── frontend-rules.template.md  # For src/components/**
│   │   └── test-rules.template.md      # For tests/**
│   ├── FEATURES.md                     # Documents Claude-specific features
│   └── SETUP.md                        # Setup instructions
│
├── roo-code/                           # Roo Code specific
│   ├── template.roomodes.yaml          # Mode definitions
│   ├── rules/                          # Workspace-wide rules templates
│   │   └── 01-project-standards.template.md
│   ├── rules-code/                     # Code mode specific
│   │   └── 01-implementation.template.md
│   ├── rules-architect/                # Architect mode specific
│   │   └── 01-design-principles.template.md
│   ├── FEATURES.md                     # Documents Roo-specific features
│   └── SETUP.md                        # Setup instructions
│
├── cline/                              # Cline specific
│   ├── clinerules-folder/              # Folder structure template
│   │   ├── 01-core-rules.template.md
│   │   ├── 02-patterns.template.md
│   │   └── 03-workflows.template.md
│   ├── clinerules-bank/                # Optional rule bank template
│   │   ├── frameworks/
│   │   │   ├── react.md
│   │   │   ├── vue.md
│   │   │   └── fastapi.md
│   │   └── project-types/
│   │       ├── api-service.md
│   │       └── frontend-app.md
│   ├── FEATURES.md                     # Documents Cline-specific features
│   └── SETUP.md                        # Setup instructions
│
├── antigravity/                        # Google Antigravity specific
│   ├── template.gemini.md              # Main rules file
│   ├── workflows/                      # Workflow templates
│   │   └── development-cycle.template.md
│   ├── FEATURES.md                     # Documents Antigravity-specific features
│   └── SETUP.md                        # Setup instructions
│
└── compatibility/                      # Cross-tool compatibility
    ├── setup-symlinks.sh               # Script to create symlinks
    ├── setup-symlinks.ps1              # PowerShell version for Windows
    └── SYMLINK_GUIDE.md                # When/how to use symlinks
```

### What Gets Generated After Bootstrap

#### Approach A: Symlinks Only (Maximum Portability)

User selects "basic compatibility" for all tools:

```
user-project/
├── AGENTS.md                    # The source of truth
├── CLAUDE.md                    # Symlink → AGENTS.md
├── GEMINI.md                    # Symlink → AGENTS.md
├── .clinerules                  # Symlink → AGENTS.md
│
├── project_docs/                # Standard FluxFrame docs
├── mcp-server.js                # Standard FluxFrame MCP
└── ...
```

#### Approach B: Full Tool Integration (Example: Claude Code + Roo Code)

User selects "full integration" for Claude Code and Roo Code:

```
user-project/
├── AGENTS.md                    # Universal baseline (always present)
│
├── CLAUDE.md                    # Contains @AGENTS.md + Claude-specific additions
├── .claude/
│   └── rules/                   # Path-targeted rules
│       ├── api-rules.md
│       └── frontend-rules.md
│
├── .roomodes                    # Roo mode definitions
├── .roo/
│   ├── rules/                   # Workspace-wide rules
│   │   └── 01-project-standards.md
│   ├── rules-code/              # Code mode rules
│   │   └── 01-implementation.md
│   └── rules-architect/         # Architect mode rules
│       └── 01-design-principles.md
│
├── GEMINI.md                    # Symlink → AGENTS.md (basic compat)
├── .clinerules                  # Symlink → AGENTS.md (basic compat)
│
├── project_docs/
├── mcp-server.js
└── ...
```

#### Approach C: Full Cline Integration

User selects "full integration" for Cline:

```
user-project/
├── AGENTS.md                    # Universal baseline
│
├── .clinerules/                 # Folder mode (NOT a symlink)
│   ├── 01-core-rules.md         # References/includes AGENTS.md content
│   ├── 02-patterns.md
│   └── 03-workflows.md
│
├── CLAUDE.md                    # Symlink → AGENTS.md
├── GEMINI.md                    # Symlink → AGENTS.md
│
├── project_docs/
├── mcp-server.js
└── ...
```

---

## Implementation Plan

### Phase 1: Create Core Templates

#### 1.1 Create `ai-rules/core/template.agents.md`

This is the universal baseline. Extract the common content from existing `.clinerules` and `.roorules` templates:

```markdown
# AGENTS.md - Project Agent Guidelines

## Project Overview
{{PROJECT_NAME}} - {{PROJECT_DESCRIPTION}}

## Tech Stack
- Backend: {{TECH_STACK_BACKEND}}
- Frontend: {{TECH_STACK_FRONTEND}}
- Database: {{TECH_STACK_DATABASE}}

## Key Directories
{{DIRECTORY_STRUCTURE}}

## Commands
- Build: `{{BUILD_COMMAND}}`
- Test: `{{TEST_COMMAND}}`
- Lint: `{{LINT_COMMAND}}`
- Dev: `{{DEV_COMMAND}}`

## Development Workflow

This project follows the FluxFrame development methodology.

### Before Any Implementation
1. Read `project_docs/context_master_guide.md` for full context
2. Check `project_docs/patterns/` for existing solutions
3. Read `project_docs/technical_status.md` for current state

### During Implementation
- Build real components (no stubs or mocks in production code)
- Ensure visible, demonstrable results
- Write tests that validate actual behavior
- Follow existing patterns exactly

### After Implementation
1. Update ALL affected documentation
2. Document new patterns if solution is reusable
3. Get user confirmation before marking complete
4. Never document during iteration - only after confirmation

## Code Style
{{CODE_STYLE_RULES}}

## Testing Requirements
{{TESTING_RULES}}

## API Contracts
{{API_CONTRACT_APPROACH}}

## Pattern Library Usage

Before implementing any feature:
1. Search `project_docs/patterns/` for relevant patterns
2. If pattern exists: follow it exactly
3. If no pattern exists: implement, then document the pattern

Pattern documentation location: `project_docs/patterns/`

## Documentation Requirements

- `project_docs/context_master_guide.md` is the single source of truth
- Update `project_docs/technical_status.md` after changes
- All documentation updates happen AFTER user confirms implementation works

## Change Request Protocol

For bug fixes and refinements:
1. Analyze root cause (no code changes yet)
2. Propose fix approach
3. Implement and test
4. Get user confirmation
5. Update documentation
```

#### 1.2 Create modular sections in `ai-rules/core/sections/`

Break the template into composable pieces that can be:
- Imported by Claude Code via `@` syntax
- Referenced in documentation
- Selectively included based on project needs

Each section file contains just that portion of the template (e.g., `development-workflow.md` contains just the workflow section).

### Phase 2: Create Tool-Specific Templates

#### 2.1 Claude Code (`ai-rules/claude-code/`)

**template.claude.md:**
```markdown
# CLAUDE.md

# Import universal baseline
@AGENTS.md

# Import project documentation for context
@project_docs/context_master_guide.md
@README.md

# Claude Code Specific Instructions

## Memory System
- This file is auto-loaded at session start
- Use # key during sessions to add persistent instructions
- Path-specific rules are in .claude/rules/ (loaded automatically when working on matching files)

## File Operations
- Safe to edit: src/, tests/, docs/, project_docs/patterns/
- Requires confirmation: project_docs/context_master_guide.md, config files
- Never edit: node_modules/, venv/, .git/

## Slash Commands
Custom commands are available in .claude/commands/ (if present)
```

**rules/api-rules.template.md:**
```markdown
---
paths:
  - src/api/**/*.py
  - src/api/**/*.ts
  - app/api/**/*
---
# API Development Rules

These rules activate when working on API files.

## Endpoint Implementation
- Follow OpenAPI/API contract exactly
- Validate all request/response data
- Include comprehensive error handling
- Return consistent error format

## Required for Every Endpoint
- Input validation
- Authentication check (where applicable)
- Error handling with proper status codes
- Logging for debugging

## Testing
- Write integration tests for all endpoints
- Test both success and error cases
- Mock external services only
```

**rules/frontend-rules.template.md:**
```markdown
---
paths:
  - src/components/**/*
  - src/pages/**/*
  - app/components/**/*
---
# Frontend Development Rules

These rules activate when working on frontend files.

## Component Structure
- Functional components with hooks
- Props interface defined with TypeScript
- Styles colocated or in module CSS

## State Management
- Local state for component-specific data
- Global state for shared data
- Server state via React Query/SWR (if applicable)

## Accessibility
- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
```

#### 2.2 Roo Code (`ai-rules/roo-code/`)

**template.roomodes.yaml:**
```yaml
customModes:
  - slug: fluxframe-code
    name: "💻 FluxFrame Code"
    roleDefinition: |
      You are an expert developer following the FluxFrame methodology.
      You check patterns before implementing, follow the development cycle,
      and maintain documentation discipline.
    whenToUse: "Use for implementing features, writing code, and fixing bugs"
    customInstructions: |
      Before coding:
      - Check project_docs/patterns/ for existing solutions
      - Read project_docs/technical_status.md for current state
      
      During coding:
      - Follow existing patterns exactly
      - Build real components, not stubs
      - Write tests that match implementation
      
      After coding:
      - Wait for user confirmation before updating docs
    groups:
      - read
      - - edit
        - fileRegex: "^(?!project_docs/context_master_guide\\.md$).*$"
        - description: "All files except context_master_guide.md"
      - command
      - browser
      - mcp

  - slug: fluxframe-architect
    name: "🏗️ FluxFrame Architect"
    roleDefinition: |
      You are a system architect focused on design, planning, and documentation.
      You create implementation plans, review architecture, and maintain project documentation.
    whenToUse: "Use for planning features, reviewing architecture, updating documentation"
    customInstructions: |
      Focus on:
      - High-level design decisions
      - Implementation planning
      - Documentation updates
      - Pattern documentation
      
      Do not write implementation code in this mode.
    groups:
      - read
      - - edit
        - fileRegex: "\\.(md|yaml|yml|json)$"
        - description: "Documentation and config files only"
      - browser
      - mcp

  - slug: fluxframe-debug
    name: "🔍 FluxFrame Debug"
    roleDefinition: |
      You are a debugging specialist following the FluxFrame change request protocol.
      You analyze issues systematically, identify root causes, and implement targeted fixes.
    whenToUse: "Use for debugging issues, analyzing errors, and implementing fixes"
    customInstructions: |
      Follow the Change Request Protocol:
      1. Analyze - understand the issue, identify root cause
      2. Plan - propose specific fix
      3. Implement - make targeted changes
      4. Verify - test the fix works
      5. Confirm - get user confirmation before documenting
    groups:
      - read
      - edit
      - command
      - browser
      - mcp

  - slug: fluxframe-patterns
    name: "📚 Pattern Librarian"
    roleDefinition: |
      You are a pattern documentation specialist.
      You analyze implementations and document reusable patterns for the pattern library.
    whenToUse: "Use after implementing a solution that should become a reusable pattern"
    customInstructions: |
      For each pattern, document:
      - Problem: What situation this solves
      - Solution: The approach taken
      - Implementation: Code examples
      - Pitfalls: Common mistakes to avoid
      - Status: experimental → established → canonical
    groups:
      - read
      - - edit
        - fileRegex: "^project_docs/patterns/.*\\.md$"
        - description: "Pattern files only"
```

**rules/01-project-standards.template.md:**
```markdown
# FluxFrame Project Standards

## Development Philosophy
- Documentation as source of truth
- Pattern-driven development
- Systematic development cycles
- Test-implementation alignment

## Key Files
- `project_docs/context_master_guide.md` - Single source of truth
- `project_docs/technical_status.md` - Current implementation state
- `project_docs/implementation_plan.md` - Roadmap and cycles
- `project_docs/patterns/` - Reusable solution patterns

## MCP Tools Available
Use these tools for context gathering:
- `get_context_for_task` - Get relevant context for current work
- `check_pattern_exists` - Search pattern library
- `get_current_implementation_status` - Read current state
- `validate_api_contracts` - Check endpoint compliance
```

**rules-code/01-implementation.template.md:**
```markdown
# Code Mode Implementation Rules

## Before Writing Code
1. Check patterns: Have you searched project_docs/patterns/?
2. Check status: What's the current state in technical_status.md?
3. Check contracts: Does this involve an API? Check the contract.

## While Writing Code
- Real components only - no placeholder implementations
- Follow existing code patterns in the codebase
- Include error handling from the start
- Write code that's testable

## After Writing Code
- Run tests: `{{TEST_COMMAND}}`
- Run linter: `{{LINT_COMMAND}}`
- Verify it works visually/functionally
- Wait for user confirmation before updating docs
```

#### 2.3 Cline (`ai-rules/cline/`)

**clinerules-folder/01-core-rules.template.md:**
```markdown
# FluxFrame Core Rules

This project follows the FluxFrame development methodology.
Full guidelines are in AGENTS.md at the project root.

## Quick Reference

### Before Any Implementation
1. Read `project_docs/context_master_guide.md`
2. Check `project_docs/patterns/` for existing solutions
3. Read `project_docs/technical_status.md`

### During Implementation
- Real components, not stubs
- Follow existing patterns exactly
- Tests validate actual behavior

### After Implementation
1. Get user confirmation FIRST
2. Then update documentation
3. Document new patterns if applicable

## Commands
- Build: `{{BUILD_COMMAND}}`
- Test: `{{TEST_COMMAND}}`
- Lint: `{{LINT_COMMAND}}`
```

**clinerules-folder/02-patterns.template.md:**
```markdown
# Pattern Library Rules

## Checking Patterns
Before implementing any feature:
1. Search `project_docs/patterns/` for relevant patterns
2. If pattern exists: follow it exactly
3. If no pattern: implement first, document after

## Pattern Structure
Each pattern in `project_docs/patterns/` contains:
- Problem: The situation this solves
- Solution: The approach
- Implementation: Code examples
- Pitfalls: What to avoid

## Creating New Patterns
After implementing a reusable solution:
1. Create new file in `project_docs/patterns/`
2. Use the standard pattern template
3. Mark status as "experimental" initially
```

**clinerules-folder/03-workflows.template.md:**
```markdown
# Development Workflow Rules

## Development Cycle

### BEFORE Phase
- Gather context via MCP tools
- Check existing patterns
- Read current status
- Plan approach

### DURING Phase
- Real components only
- Visible results
- Aligned tests
- Follow patterns

### AFTER Phase
- Update ALL affected docs
- Validate completeness
- Get user confirmation
- Document new patterns

## Change Request Protocol

For bugs and refinements:
1. **Initialize** - Identify the issue
2. **Analyze** - Find root cause (no code changes)
3. **Iterate** - Fix, test, refine
4. **Confirm** - User validates
5. **Document** - Update affected docs

IMPORTANT: Never document during iteration. Only after user confirms.
```

#### 2.4 Antigravity (`ai-rules/antigravity/`)

**template.gemini.md:**
```markdown
# Project Agent Guidelines

## Overview
{{PROJECT_NAME}} - {{PROJECT_DESCRIPTION}}

## Tech Stack
- Backend: {{TECH_STACK_BACKEND}}
- Frontend: {{TECH_STACK_FRONTEND}}
- Database: {{TECH_STACK_DATABASE}}

## FluxFrame Methodology

This project follows the FluxFrame development methodology.

### Development Cycle
**BEFORE**: Gather context, check patterns, read status
**DURING**: Real components, visible results, aligned tests
**AFTER**: Update docs, validate, confirm with user

### Key Principles
- Documentation as source of truth
- Pattern-driven development
- Test-implementation alignment
- Systematic change protocol

## Key Files
- `project_docs/context_master_guide.md` - Source of truth
- `project_docs/technical_status.md` - Current state
- `project_docs/patterns/` - Reusable solutions
- `AGENTS.md` - Full agent guidelines

## Commands
- Build: `{{BUILD_COMMAND}}`
- Test: `{{TEST_COMMAND}}`
- Lint: `{{LINT_COMMAND}}`
- Dev: `{{DEV_COMMAND}}`

## Before Implementation
1. Read context_master_guide.md
2. Check patterns/ for existing solutions
3. Read technical_status.md

## After Implementation
1. Get user confirmation
2. Update affected documentation
3. Document new patterns if applicable
```

### Phase 3: Update Bootstrap System

#### 3.1 Update `bootstrap/project_questionnaire.md`

Add new section:

```markdown
## AI Coding Tools

Which AI coding tools will you use with this project?

### Primary Tools (select all that apply)
- [ ] Claude Code (Anthropic's CLI tool)
- [ ] Roo Code (VS Code extension with modes)
- [ ] Cline (VS Code extension)
- [ ] Google Antigravity
- [ ] Cursor
- [ ] GitHub Copilot
- [ ] Other / Multiple tools

### Integration Level

For each selected tool, choose integration level:

**Claude Code:**
- [ ] Full integration (CLAUDE.md with imports + .claude/rules/)
- [ ] Basic (symlink to AGENTS.md)
- [ ] Skip

**Roo Code:**
- [ ] Full integration (.roomodes + .roo/rules/ directories)
- [ ] Basic (AGENTS.md auto-detected, no custom modes)
- [ ] Skip

**Cline:**
- [ ] Full integration (.clinerules/ folder with rule organization)
- [ ] Basic (symlink to AGENTS.md)
- [ ] Skip

**Antigravity:**
- [ ] Full integration (GEMINI.md with workflows)
- [ ] Basic (symlink to AGENTS.md)
- [ ] Skip

**Note:** AGENTS.md is always generated as the universal baseline.
```

#### 3.2 Update `bootstrap/scaffolding_workflow.md`

Add new section:

```markdown
## AI Rules Generation

### Step 1: Generate AGENTS.md (Always)
1. Fill `ai-rules/core/template.agents.md` with project details
2. Save as `AGENTS.md` in project root
3. This serves as the universal baseline for all tools

### Step 2: Generate Tool-Specific Configs

Based on user's tool selections:

#### Claude Code - Full Integration
1. Generate `CLAUDE.md` from `ai-rules/claude-code/template.claude.md`
   - Includes `@AGENTS.md` import
   - Includes `@project_docs/context_master_guide.md` import
2. Create `.claude/rules/` directory
3. Generate path-targeted rules from templates:
   - `api-rules.md` (if project has API)
   - `frontend-rules.md` (if project has frontend)
4. Fill all templates with project-specific values

#### Claude Code - Basic
1. Create symlink: `CLAUDE.md` → `AGENTS.md`

#### Roo Code - Full Integration
1. Generate `.roomodes` from `ai-rules/roo-code/template.roomodes.yaml`
2. Create `.roo/` directory structure:
   - `.roo/rules/`
   - `.roo/rules-code/`
   - `.roo/rules-architect/`
3. Generate rule files from templates
4. Fill all templates with project-specific values
5. Note: Roo auto-detects AGENTS.md, no symlink needed

#### Roo Code - Basic
1. No additional files needed (Roo auto-detects AGENTS.md)
2. Optionally create `.roorules` symlink → `AGENTS.md` for older versions

#### Cline - Full Integration
1. Create `.clinerules/` directory
2. Generate rule files from `ai-rules/cline/clinerules-folder/`:
   - `01-core-rules.md`
   - `02-patterns.md`
   - `03-workflows.md`
3. Fill all templates with project-specific values
4. Optionally copy `clinerules-bank/` for context switching

#### Cline - Basic
1. Create symlink: `.clinerules` → `AGENTS.md`

#### Antigravity - Full Integration
1. Generate `GEMINI.md` from `ai-rules/antigravity/template.gemini.md`
2. Fill template with project-specific values

#### Antigravity - Basic
1. Create symlink: `GEMINI.md` → `AGENTS.md`

### Step 3: Update .gitignore

Add to .gitignore if using symlinks:
```
# AI tool symlinks (AGENTS.md is the source of truth)
# Uncomment the ones that are symlinks in your project:
# CLAUDE.md
# GEMINI.md
# .clinerules
```

### Step 4: Validate Generation
- Verify AGENTS.md exists and is complete
- Verify selected tool configs are generated
- Verify symlinks point correctly
- Test that configs are detected by respective tools
```

#### 3.3 Update `BOOTSTRAP_INSTRUCTIONS.md`

Add section:

```markdown
## AI Coding Tool Integration

FluxFrame supports multiple AI coding tools with a layered architecture.

### Universal Baseline: AGENTS.md

Every FluxFrame project includes an `AGENTS.md` file containing:
- Project context and tech stack
- Development workflow methodology (cycles)
- Pattern library usage rules
- Documentation requirements
- Change request protocol

This works with any tool that supports the AGENTS.md standard (60k+ projects use it).

### Tool-Specific Extensions

For deeper integration, FluxFrame can generate tool-specific configurations:

| Tool | Full Integration Creates | Features Enabled |
|------|-------------------------|------------------|
| Claude Code | `CLAUDE.md` + `.claude/rules/` | File imports, path-targeting |
| Roo Code | `.roomodes` + `.roo/rules*/` | Custom modes, tool restrictions |
| Cline | `.clinerules/` folder | Rule toggling, organization |
| Antigravity | `GEMINI.md` | Workflows |

### Integration Levels

**Full Integration:**
- Tool-specific config files generated
- Leverages unique tool features
- AGENTS.md content included via imports or references

**Basic Compatibility:**
- Symlink to AGENTS.md
- Works but no tool-specific features
- Maximum portability

### During Bootstrap

When asked about AI tools:
1. Select which tools you use
2. Choose integration level for each
3. Framework generates appropriate files

AGENTS.md is always generated - it's your baseline that works everywhere.
```

### Phase 4: Create Documentation

#### 4.1 Create `ai-rules/README.md`

```markdown
# FluxFrame AI Rules Architecture

## Overview

FluxFrame uses a layered architecture to support multiple AI coding agents:

```
┌─────────────────────────────────────────────────────────────┐
│                    AGENTS.md (Universal)                     │
│              Works with all compatible tools                 │
└─────────────────────────────────────────────────────────────┘
                              │
                   ┌──────────┼──────────┐
                   │          │          │
                   ▼          ▼          ▼
             ┌──────────┐ ┌──────────┐ ┌──────────┐
             │  Claude  │ │   Roo    │ │  Cline   │  ...
             │ CLAUDE.md│ │.roomodes │ │.clinerules/
             │ +imports │ │ +modes   │ │ +toggle  │
             └──────────┘ └──────────┘ └──────────┘
```

## Directory Structure

```
ai-rules/
├── core/                    # Universal baseline
│   ├── template.agents.md   # Main template → AGENTS.md
│   └── sections/            # Modular content pieces
│
├── claude-code/             # Claude Code extensions
├── roo-code/                # Roo Code extensions  
├── cline/                   # Cline extensions
├── antigravity/             # Antigravity extensions
└── compatibility/           # Symlink scripts
```

## How It Works

1. **AGENTS.md** is always generated with full FluxFrame methodology
2. **Tool configs** either:
   - Import/reference AGENTS.md (full integration)
   - Symlink to AGENTS.md (basic compatibility)
3. **No duplication** - content lives in one place

## Quick Reference

| If you use... | Full integration gives you... |
|---------------|------------------------------|
| Claude Code | `@imports`, path-targeted rules in `.claude/rules/` |
| Roo Code | Custom modes with personas, tool permission restrictions |
| Cline | Folder organization, rule toggling UI |
| Antigravity | Workflow automation |
| Any other tool | AGENTS.md works as-is |

See `FEATURE_MATRIX.md` for detailed comparison.
```

#### 4.2 Create `ai-rules/FEATURE_MATRIX.md`

```markdown
# AI Coding Tool Feature Matrix

## Feature Comparison

| Feature | AGENTS.md | Claude Code | Roo Code | Cline | Antigravity |
|---------|:---------:|:-----------:|:--------:|:-----:|:-----------:|
| **Basic instructions** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Nested directory rules** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **File imports** | ❌ | ✅ `@file` | ❌ | ❌ | ❌ |
| **Path-specific rules** | ❌ | ✅ glob patterns | ❌ | ❌ | ❌ |
| **Multiple personas/modes** | ❌ | ❌ | ✅ | ❌ | ❌ |
| **Tool permission restrictions** | ❌ | ❌ | ✅ regex | ❌ | ❌ |
| **Mode-specific rules** | ❌ | ❌ | ✅ | ❌ | ❌ |
| **Rule toggle UI** | ❌ | ❌ | ❌ | ✅ | ❌ |
| **Rule banks/libraries** | ❌ | ❌ | ❌ | ✅ | ❌ |
| **Model per mode** | ❌ | ❌ | ✅ | ❌ | ❌ |
| **Workflow automation** | ❌ | ❌ | ❌ | ❌ | ✅ |
| **Enterprise hierarchy** | ❌ | ✅ 4-level | ❌ | ❌ | ❌ |

## When to Use Full Integration

### Claude Code Full Integration
Best for:
- Monorepos needing different rules per directory
- Projects wanting to import shared documentation
- Teams with complex hierarchical rule needs

### Roo Code Full Integration
Best for:
- Projects needing different AI personas (architect vs coder vs debugger)
- Security-sensitive projects (restrict what AI can edit)
- Teams wanting different models for different tasks

### Cline Full Integration
Best for:
- Projects with many context-dependent rule sets
- Workflows requiring frequent rule switching
- Teams wanting visual rule management

### AGENTS.md Only (Basic for All)
Best for:
- Maximum portability across tools
- Simple projects
- Frequently switching between AI tools
- Teams where members use different tools

## File Locations Reference

| Tool | Primary Config | Optional Extensions |
|------|----------------|---------------------|
| AGENTS.md | `./AGENTS.md` | Nested `AGENTS.md` in subdirs |
| Claude Code | `./CLAUDE.md` | `.claude/rules/*.md` |
| Roo Code | `./AGENTS.md` (auto) | `.roomodes`, `.roo/rules*/` |
| Cline | `./.clinerules` or `./.clinerules/` | `clinerules-bank/` |
| Antigravity | `./GEMINI.md` | `.antigravity/workflows/` |
```

### Phase 5: Create Compatibility Tools

#### 5.1 Create `ai-rules/compatibility/setup-symlinks.sh`

```bash
#!/bin/bash
# FluxFrame AI Rules Symlink Setup
# Creates symlinks from tool-specific files to AGENTS.md
# Run this for basic compatibility with tools you're not fully integrating

set -e

# Navigate to project root (git root or current dir)
cd "$(git rev-parse --show-toplevel 2>/dev/null || pwd)"

if [ ! -f "AGENTS.md" ]; then
    echo "Error: AGENTS.md not found in project root"
    echo "Run FluxFrame bootstrap first, or create AGENTS.md manually."
    exit 1
fi

echo "FluxFrame AI Rules Symlink Setup"
echo "================================="
echo ""
echo "This creates symlinks for basic tool compatibility."
echo "For full integration, re-run bootstrap and select tools."
echo ""

# Function to create symlink if target doesn't exist
create_symlink() {
    local target=$1
    local link_name=$2
    
    # Skip if full integration exists
    if [ -d "$link_name" ] || [ -f "$link_name" ] && [ ! -L "$link_name" ]; then
        echo "  ⏭ $link_name exists (not a symlink) - skipping"
        return
    fi
    
    # Remove existing symlink and create new one
    rm -f "$link_name"
    ln -s "$target" "$link_name"
    echo "  ✓ $link_name → $target"
}

echo "Creating symlinks..."

# Claude Code
if [ ! -d ".claude" ]; then
    create_symlink "AGENTS.md" "CLAUDE.md"
else
    echo "  ⏭ CLAUDE.md - .claude/ exists (full integration)"
fi

# Antigravity
create_symlink "AGENTS.md" "GEMINI.md"

# Cline (only if not using folder mode)
if [ ! -d ".clinerules" ]; then
    create_symlink "AGENTS.md" ".clinerules"
else
    echo "  ⏭ .clinerules - folder exists (full integration)"
fi

# Roo Code auto-detects AGENTS.md, but create .roorules for older versions
if [ ! -d ".roo" ]; then
    create_symlink "AGENTS.md" ".roorules"
else
    echo "  ⏭ .roorules - .roo/ exists (full integration)"
fi

echo ""
echo "Done!"
echo ""
echo "Note: Add symlinked files to .gitignore if not already present."
echo "AGENTS.md should be the only file committed to version control."
```

#### 5.2 Create `ai-rules/compatibility/setup-symlinks.ps1`

```powershell
# FluxFrame AI Rules Symlink Setup (Windows)
# Creates symlinks from tool-specific files to AGENTS.md
# Run this for basic compatibility with tools you're not fully integrating
# Note: Requires admin privileges or Developer Mode enabled

$ErrorActionPreference = "Stop"

# Navigate to project root
$projectRoot = git rev-parse --show-toplevel 2>$null
if (-not $projectRoot) { $projectRoot = Get-Location }
Set-Location $projectRoot

if (-not (Test-Path "AGENTS.md")) {
    Write-Error "AGENTS.md not found in project root. Run FluxFrame bootstrap first."
    exit 1
}

Write-Host "FluxFrame AI Rules Symlink Setup" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "This creates symlinks for basic tool compatibility."
Write-Host "For full integration, re-run bootstrap and select tools."
Write-Host ""

function Create-SafeSymlink {
    param (
        [string]$Target,
        [string]$LinkName
    )
    
    # Skip if full integration exists (directory or non-symlink file)
    if (Test-Path $LinkName) {
        $item = Get-Item $LinkName
        if (-not $item.Attributes.ToString().Contains("ReparsePoint")) {
            Write-Host "  ⏭ $LinkName exists (not a symlink) - skipping" -ForegroundColor Yellow
            return
        }
    }
    
    # Remove existing and create new symlink
    Remove-Item -Force $LinkName -ErrorAction SilentlyContinue
    New-Item -ItemType SymbolicLink -Path $LinkName -Target $Target | Out-Null
    Write-Host "  ✓ $LinkName → $Target" -ForegroundColor Green
}

Write-Host "Creating symlinks..."

# Claude Code
if (-not (Test-Path ".claude" -PathType Container)) {
    Create-SafeSymlink -Target "AGENTS.md" -LinkName "CLAUDE.md"
} else {
    Write-Host "  ⏭ CLAUDE.md - .claude/ exists (full integration)" -ForegroundColor Yellow
}

# Antigravity
Create-SafeSymlink -Target "AGENTS.md" -LinkName "GEMINI.md"

# Cline
if (-not (Test-Path ".clinerules" -PathType Container)) {
    Create-SafeSymlink -Target "AGENTS.md" -LinkName ".clinerules"
} else {
    Write-Host "  ⏭ .clinerules - folder exists (full integration)" -ForegroundColor Yellow
}

# Roo Code
if (-not (Test-Path ".roo" -PathType Container)) {
    Create-SafeSymlink -Target "AGENTS.md" -LinkName ".roorules"
} else {
    Write-Host "  ⏭ .roorules - .roo/ exists (full integration)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Done!" -ForegroundColor Green
Write-Host ""
Write-Host "Note: Add symlinked files to .gitignore if not already present."
Write-Host "AGENTS.md should be the only file committed to version control."
```

#### 5.3 Create `ai-rules/compatibility/SYMLINK_GUIDE.md`

```markdown
# Symlink Guide for AI Tool Compatibility

## When to Use Symlinks

Use symlinks when:
- You want basic compatibility with a tool without full integration
- You frequently switch between multiple AI coding tools
- You want AGENTS.md as the single source of truth

Don't use symlinks when:
- You want tool-specific features (imports, modes, path-targeting)
- You're primarily using one tool and want its full capabilities

## How Symlinks Work

```
AGENTS.md          ← The actual file (source of truth)
    ↑
    ├── CLAUDE.md      (symlink)
    ├── GEMINI.md      (symlink)
    ├── .clinerules    (symlink)
    └── .roorules      (symlink)
```

All tools read from the same content. Edit AGENTS.md, all tools see the changes.

## Setup

### macOS / Linux
```bash
./ai-rules/compatibility/setup-symlinks.sh
```

### Windows (PowerShell as Admin)
```powershell
./ai-rules/compatibility/setup-symlinks.ps1
```

### Manual Creation
```bash
ln -s AGENTS.md CLAUDE.md
ln -s AGENTS.md GEMINI.md
ln -s AGENTS.md .clinerules
ln -s AGENTS.md .roorules
```

## Git Configuration

Add symlinks to `.gitignore` so only AGENTS.md is tracked:

```gitignore
# AI tool symlinks (AGENTS.md is source of truth)
CLAUDE.md
GEMINI.md
.clinerules
.roorules
```

Then ensure AGENTS.md is committed:
```bash
git add AGENTS.md
git commit -m "Add AGENTS.md universal baseline"
```

## Switching from Symlinks to Full Integration

If you later want full integration for a tool:

1. Remove the symlink:
   ```bash
   rm CLAUDE.md  # or whichever tool
   ```

2. Re-run FluxFrame bootstrap selecting "full integration" for that tool

3. The tool-specific config will be generated with proper imports/references

## Troubleshooting

### "Permission denied" on Windows
- Run PowerShell as Administrator, or
- Enable Developer Mode in Windows Settings

### Symlink shows as regular file
- Your filesystem may not support symlinks
- Use a copy instead: `cp AGENTS.md CLAUDE.md`
- Note: You'll need to manually sync changes

### Tool not detecting the file
- Verify symlink target: `ls -la CLAUDE.md`
- Ensure AGENTS.md exists and has content
- Some tools need restart to detect new config files
```

---

## Migration Strategy for Existing Content

### From `template.clinerules`:

1. Analyze content sections
2. Extract universal FluxFrame methodology → `core/template.agents.md`
3. Keep Cline-specific organization → `cline/clinerules-folder/`
4. Identify any Cline-unique features to document in `cline/FEATURES.md`

### From `template.roorules`:

1. Compare with clinerules content
2. Merge unique content → `core/template.agents.md`
3. Identify mode-worthy instructions → `roo-code/template.roomodes.yaml`
4. Create mode-specific rules → `roo-code/rules-*/`

### Placeholder Standardization

Use these placeholders consistently across ALL templates:

```
{{PROJECT_NAME}}           - Project name
{{PROJECT_DESCRIPTION}}    - One-line description
{{TECH_STACK_BACKEND}}     - Backend technology
{{TECH_STACK_FRONTEND}}    - Frontend technology  
{{TECH_STACK_DATABASE}}    - Database technology
{{DIRECTORY_STRUCTURE}}    - Key directories list
{{BUILD_COMMAND}}          - Build command
{{TEST_COMMAND}}           - Test command
{{LINT_COMMAND}}           - Lint command
{{DEV_COMMAND}}            - Dev server command
{{CODE_STYLE_RULES}}       - Code style guidelines
{{TESTING_RULES}}          - Testing requirements
{{API_CONTRACT_APPROACH}}  - API contract methodology
```

---

## Files to Create (Complete List)

### New Files (24 files)

**Documentation:**
1. `ai-rules/README.md`
2. `ai-rules/FEATURE_MATRIX.md`

**Core:**
3. `ai-rules/core/template.agents.md`
4. `ai-rules/core/sections/project-context.md`
5. `ai-rules/core/sections/development-workflow.md`
6. `ai-rules/core/sections/pattern-driven-dev.md`
7. `ai-rules/core/sections/api-contracts.md`
8. `ai-rules/core/sections/testing-philosophy.md`
9. `ai-rules/core/sections/documentation-first.md`
10. `ai-rules/core/sections/change-request-protocol.md`

**Claude Code:**
11. `ai-rules/claude-code/template.claude.md`
12. `ai-rules/claude-code/rules/api-rules.template.md`
13. `ai-rules/claude-code/rules/frontend-rules.template.md`
14. `ai-rules/claude-code/rules/test-rules.template.md`
15. `ai-rules/claude-code/FEATURES.md`
16. `ai-rules/claude-code/SETUP.md`

**Roo Code:**
17. `ai-rules/roo-code/template.roomodes.yaml`
18. `ai-rules/roo-code/rules/01-project-standards.template.md`
19. `ai-rules/roo-code/rules-code/01-implementation.template.md`
20. `ai-rules/roo-code/rules-architect/01-design-principles.template.md`
21. `ai-rules/roo-code/FEATURES.md`
22. `ai-rules/roo-code/SETUP.md`

**Cline:**
23. `ai-rules/cline/clinerules-folder/01-core-rules.template.md`
24. `ai-rules/cline/clinerules-folder/02-patterns.template.md`
25. `ai-rules/cline/clinerules-folder/03-workflows.template.md`
26. `ai-rules/cline/FEATURES.md`
27. `ai-rules/cline/SETUP.md`

**Antigravity:**
28. `ai-rules/antigravity/template.gemini.md`
29. `ai-rules/antigravity/FEATURES.md`
30. `ai-rules/antigravity/SETUP.md`

**Compatibility:**
31. `ai-rules/compatibility/setup-symlinks.sh`
32. `ai-rules/compatibility/setup-symlinks.ps1`
33. `ai-rules/compatibility/SYMLINK_GUIDE.md`

### Files to Update (5 files)

1. `bootstrap/project_questionnaire.md` - Add AI tools section
2. `bootstrap/scaffolding_workflow.md` - Add AI rules generation steps
3. `bootstrap/validation_checklist.md` - Add AI rules validation
4. `BOOTSTRAP_INSTRUCTIONS.md` - Add AI tools integration section
5. `ai-rules/CUSTOMIZATION_GUIDE.md` - Update for new architecture

### Files to Migrate/Archive (2 files)

1. `ai-rules/template.clinerules` → Archive, content migrated to core + cline/
2. `ai-rules/template.roorules` → Archive, content migrated to core + roo-code/

---

## Validation Checklist

After implementation, verify:

- [ ] `ai-rules/core/template.agents.md` contains complete FluxFrame methodology
- [ ] Each tool directory has complete templates
- [ ] `FEATURE_MATRIX.md` accurately documents tool capabilities
- [ ] Symlink scripts work on macOS, Linux, Windows
- [ ] `bootstrap/project_questionnaire.md` includes tool selection questions
- [ ] `bootstrap/scaffolding_workflow.md` handles all tool combinations
- [ ] `BOOTSTRAP_INSTRUCTIONS.md` explains the architecture clearly
- [ ] Test bootstrap with "symlinks only" option
- [ ] Test bootstrap with "Claude Code full integration"
- [ ] Test bootstrap with "Roo Code full integration"
- [ ] Test bootstrap with "Cline full integration"
- [ ] Test bootstrap with mixed selections
- [ ] Existing FluxFrame features (MCP, patterns, workflows) still work
- [ ] All placeholder names are consistent across templates

---

## Success Criteria

1. **Always works**: AGENTS.md is generated for every project and functions standalone
2. **No duplication**: Tool configs import/reference AGENTS.md, don't copy content
3. **Full features available**: Each tool's unique capabilities are properly leveraged
4. **Easy choice**: Users can clearly understand symlinks vs full integration
5. **Backward compatible**: Existing FluxFrame projects continue to work
6. **Well documented**: Feature matrix and setup guides are clear and complete
