# FluxFrame AI Rules Architecture

## Overview

FluxFrame uses a layered architecture to support multiple AI coding agents while maintaining a single source of truth.

```
┌─────────────────────────────────────────────────────────────┐
│                    AGENTS.md (Universal)                     │
│              Works with all compatible tools                 │
└─────────────────────────────────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
          ▼                   ▼                   ▼
    ┌──────────┐        ┌──────────┐        ┌──────────┐
    │  Claude  │        │   Roo    │        │  Cline   │  ...
    │ CLAUDE.md│        │.roomodes │        │.clinerules/
    │ +imports │        │ +modes   │        │ +toggle  │
    └──────────┘        └──────────┘        └──────────┘
```

## Supported Tools

| Tool | Primary File | Unique Features |
|------|--------------|-----------------|
| **AGENTS.md** | `./AGENTS.md` | Universal baseline (60k+ repos) |
| **Claude Code** | `./CLAUDE.md` | File imports, path-targeted rules |
| **Roo Code** | `./AGENTS.md` (auto) | Custom modes, tool restrictions |
| **Cline** | `./.clinerules/` | Folder mode, rule toggle UI |
| **Antigravity** | `./GEMINI.md` | Workflows |

## Directory Structure

```
ai-rules/
├── README.md                    # This file
├── FEATURE_MATRIX.md            # Tool capability comparison
├── CUSTOMIZATION_GUIDE.md       # How to customize rules
├── RULE_ENFORCEMENT.md          # Enforcement philosophy
│
├── core/                        # Universal baseline
│   ├── template.agents.md       # Main AGENTS.md template
│   └── sections/                # Modular content pieces
│       ├── project-context.md
│       ├── development-workflow.md
│       ├── pattern-driven-dev.md
│       ├── api-contracts.md
│       ├── testing-philosophy.md
│       ├── documentation-first.md
│       └── change-request-protocol.md
│
├── claude-code/                 # Claude Code specific
│   ├── template.claude.md
│   ├── rules/                   # Path-targeted rules
│   │   ├── api-rules.template.md
│   │   ├── frontend-rules.template.md
│   │   └── test-rules.template.md
│   ├── FEATURES.md
│   └── SETUP.md
│
├── roo-code/                    # Roo Code specific
│   ├── template.roomodes.yaml
│   ├── rules/                   # Workspace-wide rules
│   │   └── 01-project-standards.template.md
│   ├── rules-code/              # Code mode rules
│   │   └── 01-implementation.template.md
│   ├── rules-architect/         # Architect mode rules
│   │   └── 01-design-principles.template.md
│   ├── FEATURES.md
│   └── SETUP.md
│
├── cline/                       # Cline specific
│   ├── clinerules-folder/       # Folder structure template
│   │   ├── 01-core-rules.template.md
│   │   ├── 02-patterns.template.md
│   │   └── 03-workflows.template.md
│   ├── FEATURES.md
│   └── SETUP.md
│
├── antigravity/                 # Antigravity specific
│   ├── template.gemini.md
│   ├── FEATURES.md
│   └── SETUP.md
│
└── compatibility/               # Cross-tool compatibility
    ├── setup-symlinks.sh        # macOS/Linux symlink script
    ├── setup-symlinks.ps1       # Windows PowerShell script
    └── SYMLINK_GUIDE.md         # Symlink documentation
```

## How It Works

### 1. AGENTS.md is Always Generated

Every FluxFrame project gets an `AGENTS.md` file containing the complete FluxFrame methodology:
- Project context and tech stack
- Development workflow (BEFORE/DURING/AFTER phases)
- Pattern library usage
- Change request protocol
- Documentation requirements

This file works standalone with any AGENTS.md-compatible tool.

### 2. Tool Configs Import or Reference AGENTS.md

Tool-specific configurations either:
- **Import** AGENTS.md content (Claude Code via `@` syntax)
- **Reference** AGENTS.md for methodology (other tools)
- **Symlink** to AGENTS.md (basic compatibility)

No duplication - content lives in one place.

### 3. Users Choose Integration Level

For each tool, choose:

| Level | What You Get | When to Use |
|-------|--------------|-------------|
| **Full Integration** | Tool-specific features + FluxFrame | Primary tool, need advanced features |
| **Basic (Symlink)** | AGENTS.md content | Secondary tool, maximum portability |

## Quick Reference

### For New Projects

During FluxFrame bootstrap:
1. Select which AI tools you use
2. Choose integration level for each
3. Framework generates appropriate files

### For Existing Projects

Add tool support manually:
1. Copy relevant templates
2. Fill in placeholders
3. Or run symlink script for basic compatibility

### Files Generated

**Always:**
- `AGENTS.md` - Universal baseline

**By Tool Selection:**
- Claude Code: `CLAUDE.md` + `.claude/rules/`
- Roo Code: `.roomodes` + `.roo/rules*/`
- Cline: `.clinerules/` folder
- Antigravity: `GEMINI.md`

**For Basic Compatibility:**
- Symlinks pointing to `AGENTS.md`

## Getting Started

1. **Read FEATURE_MATRIX.md** - Understand tool capabilities
2. **Choose your tools** - Which AI assistants will you use?
3. **Read tool SETUP.md** - Follow setup for chosen tools
4. **Customize templates** - Fill in project-specific placeholders

## Design Principles

### Single Source of Truth
AGENTS.md contains the canonical FluxFrame methodology. Tool configs extend, not duplicate.

### Progressive Enhancement
Start with AGENTS.md (works everywhere). Add tool-specific configs for advanced features.

### Maximum Portability
Projects should work with any AI tool. Symlinks enable easy fallback.

### No Feature Sacrifice
Full integration should leverage each tool's unique capabilities.

## See Also

- **FEATURE_MATRIX.md** - Detailed tool capability comparison
- **CUSTOMIZATION_GUIDE.md** - How to customize rules for your project
- **RULE_ENFORCEMENT.md** - Philosophy behind rule enforcement
- **compatibility/SYMLINK_GUIDE.md** - Using symlinks for tool compatibility
