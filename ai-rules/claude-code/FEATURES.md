# Claude Code Features

Claude Code (Anthropic's CLI tool) offers powerful features for AI-assisted development. This document explains which features FluxFrame leverages and how.

## Feature Overview

| Feature | FluxFrame Usage | Benefit |
|---------|-----------------|---------|
| File Imports (`@`) | Import AGENTS.md + docs | Single source of truth |
| Path-Targeted Rules | `.claude/rules/` | Context-aware assistance |
| Memory System (`#`) | User-added instructions | Persistent preferences |
| 4-Level Hierarchy | Enterprise support | Org-wide standards |
| Slash Commands | Custom workflows | Streamlined operations |

## File Imports (`@` Syntax)

Claude Code can import other files directly into the context using `@path/to/file.md`.

### How FluxFrame Uses This

```markdown
# In CLAUDE.md
@AGENTS.md                              # Universal baseline
@project_docs/context_master_guide.md   # Full project context
@README.md                              # Project overview
```

### Benefits
- No duplication of content
- AGENTS.md stays the single source of truth
- Additional context loaded automatically
- Works with any markdown file in project

### Usage Tips
- Import files that provide essential context
- Avoid importing large files that bloat context
- Use for documentation, not code files

## Path-Targeted Rules

Rules in `.claude/rules/` are automatically loaded when working on matching files.

### How It Works

```markdown
---
paths:
  - src/api/**/*.py
  - app/api/**/*
---
# API Development Rules
[Rules here apply only when working on API files]
```

### FluxFrame Provides Templates For

| Rule File | Matches | Purpose |
|-----------|---------|---------|
| `api-rules.md` | `src/api/**/*` | API development standards |
| `frontend-rules.md` | `src/components/**/*` | Frontend development |
| `test-rules.md` | `tests/**/*` | Testing standards |

### Benefits
- Context-appropriate guidance
- Reduces noise (API rules don't appear when writing tests)
- Enforces domain-specific standards automatically

### Customization
Modify the `paths:` frontmatter to match your project structure:

```yaml
---
paths:
  - backend/routes/**/*     # Custom path
  - server/api/**/*         # Additional path
---
```

## Memory System

Press `#` during a session to add persistent instructions that Claude remembers.

### How FluxFrame Uses This

Use memory for:
- Personal preferences not in team config
- Temporary project-specific reminders
- Frequently needed context

### Example Memory Items

```
# Always run tests after changes
# Prefer functional components over class components
# Use Australian English spelling
```

### Best Practices
- Keep memory items concise
- Use for preferences, not project rules
- Project rules belong in CLAUDE.md or .claude/rules/

## 4-Level Rule Hierarchy

Claude Code supports enterprise rule hierarchies (when configured):

1. **Enterprise** - Organization-wide standards
2. **Organization** - Department/team standards
3. **Project** - Project-specific rules (CLAUDE.md)
4. **User** - Personal preferences

### FluxFrame Focus
FluxFrame primarily targets Level 3 (Project) with CLAUDE.md and .claude/rules/. Enterprise users can layer FluxFrame under their org standards.

## Slash Commands

Custom commands in `.claude/commands/` provide quick workflows.

### Example Commands

```
.claude/commands/
├── new-feature.md      # /project:new-feature
├── fix-bug.md          # /project:fix-bug
├── update-docs.md      # /project:update-docs
└── check-patterns.md   # /project:check-patterns
```

### Command File Structure

```markdown
# Fix Bug Command

Follow the FluxFrame change request protocol:

1. Analyze the issue (no code changes yet)
2. Identify root cause
3. Propose fix approach
4. Implement after approval
5. Document after confirmation

Start by describing the bug you want to fix.
```

### FluxFrame Does Not Provide Default Commands
Commands are highly project-specific. Create your own based on your workflow.

## Features NOT Used by FluxFrame

Some Claude Code features are not leveraged by FluxFrame defaults:

- **Tool Use Restrictions** - Claude Code doesn't support tool permission restrictions (Roo Code does)
- **Mode Switching** - No multi-mode/persona support (Roo Code does)
- **Model Selection** - Can't specify different models per context

## Comparison with Other Tools

| Feature | Claude Code | Roo Code | Cline |
|---------|-------------|----------|-------|
| File Imports | ✅ `@file` | ❌ | ❌ |
| Path Rules | ✅ glob patterns | ❌ | ❌ |
| Custom Modes | ❌ | ✅ | ❌ |
| Tool Restrictions | ❌ | ✅ regex | ❌ |
| Rule Toggle UI | ❌ | ❌ | ✅ |
| Enterprise Hierarchy | ✅ 4-level | ❌ | ❌ |

## When to Choose Full Claude Code Integration

Choose full integration (not just symlink) when you need:
- Path-specific rules for different file types
- File imports for rich context
- Enterprise/organization rule hierarchy
- Custom slash commands

Choose symlink (basic) when:
- You use multiple AI tools interchangeably
- Your project doesn't need path-specific rules
- You prefer maximum portability
