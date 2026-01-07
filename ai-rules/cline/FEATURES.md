# Cline Features

Cline (VS Code extension) offers AI-assisted development with particular strengths in rule organization and visual management. This document explains which features FluxFrame leverages and how.

## Feature Overview

| Feature | FluxFrame Usage | Benefit |
|---------|-----------------|---------|
| Folder Mode | `.clinerules/` directory | Organized, modular rules |
| Rule Toggle UI | Enable/disable rules | Context switching |
| Rule Banks | Optional rule libraries | Framework-specific rules |
| MCP Support | FluxFrame tools | Workflow automation |

## Folder Mode (`.clinerules/`)

Cline supports both file and folder modes for rules. FluxFrame uses folder mode for better organization.

### How FluxFrame Uses This

Instead of a single `.clinerules` file, use a `.clinerules/` directory:

```
.clinerules/
├── 01-core-rules.md       # Essential FluxFrame rules
├── 02-patterns.md         # Pattern library usage
└── 03-workflows.md        # Development workflow rules
```

### Benefits
- **Modular Organization** - Each concern in its own file
- **Easier Maintenance** - Update one file without affecting others
- **Toggle Individual Rules** - Enable/disable specific rule files
- **Clear Structure** - Numbered prefixes for ordering

### File vs Folder Mode

| Mode | Location | Use Case |
|------|----------|----------|
| File | `.clinerules` (file) | Simple projects, single ruleset |
| Folder | `.clinerules/` (directory) | Complex projects, modular rules |

**Note:** You can only use one mode - file OR folder, not both.

## Rule Toggle UI

Cline provides a visual interface to enable/disable rule files.

### How FluxFrame Uses This

FluxFrame's folder structure enables selective rule loading:

- **01-core-rules.md** - Always enabled (essential)
- **02-patterns.md** - Enable when implementing features
- **03-workflows.md** - Enable when following development cycle

### Workflow Example

1. Starting bug fix → Keep core rules, maybe disable patterns
2. New feature → Enable all rules
3. Quick exploration → Minimal rules for context

### Benefits
- Reduce context size when not needed
- Focus on relevant rules for current task
- Quickly switch between work contexts

## Rule Banks (Optional)

Rule banks are collections of rules for specific frameworks or project types.

### Concept

```
.clinerules-bank/
├── frameworks/
│   ├── react.md
│   ├── vue.md
│   └── fastapi.md
└── project-types/
    ├── api-service.md
    └── frontend-app.md
```

### How to Use

Copy relevant rules from bank to `.clinerules/` as needed:

```bash
# Adding React rules to project
cp .clinerules-bank/frameworks/react.md .clinerules/04-react.md
```

### FluxFrame Approach

FluxFrame doesn't provide pre-built rule banks because:
- Rules should be project-specific
- Patterns capture framework knowledge better
- Rule banks can become stale

Instead, FluxFrame recommends:
- Use pattern library for framework patterns
- Keep `.clinerules/` focused on workflow
- Add project-specific rules as needed

## MCP Support

Cline supports MCP (Model Context Protocol) for tool integration.

### FluxFrame MCP Tools

When connected, these tools are available:

**Context:**
- `get_context_for_task` - Get relevant context
- `get_current_implementation_status` - Read status
- `check_pattern_exists` - Search patterns

**Changes:**
- `start_change_request` - Begin tracking
- `validate_change_resolution` - Get doc checklist
- `close_change_request` - Complete change

**Completion:**
- `get_completion_checklist` - Full checklist
- `validate_steel_thread_completion` - Verify complete

### Benefits
- Automated context gathering
- Consistent workflow enforcement
- Documentation validation

## Features NOT Used by FluxFrame

Some Cline features aren't leveraged by FluxFrame defaults:

- **Rule Banks** - Patterns are preferred for framework knowledge
- **API Providers** - Model selection is user choice
- **Custom Prompts** - Using standard rule files instead

## Comparison with Other Tools

| Feature | Cline | Claude Code | Roo Code |
|---------|-------|-------------|----------|
| Rule Toggle UI | ✅ | ❌ | ❌ |
| Folder Mode | ✅ | N/A | N/A |
| Rule Banks | ✅ | ❌ | ❌ |
| File Imports | ❌ | ✅ `@file` | ❌ |
| Path-Targeted Rules | ❌ | ✅ glob | ❌ |
| Custom Modes | ❌ | ❌ | ✅ |
| Tool Restrictions | ❌ | ❌ | ✅ regex |
| MCP Support | ✅ | ✅ | ✅ |

## When to Choose Full Cline Integration

Choose full integration (folder mode) when you need:
- Modular rule organization
- Ability to toggle rules on/off
- Multiple rule sets for different contexts
- Visual rule management

Choose basic (symlink to AGENTS.md) when:
- You use multiple AI tools interchangeably
- Your project is simple
- You prefer maximum portability
