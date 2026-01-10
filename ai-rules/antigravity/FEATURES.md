# Antigravity Features

Google Antigravity (formerly known as Google's AI coding assistant) uses GEMINI.md for project configuration. This document explains the features and how FluxFrame integrates with them.

## Feature Overview

| Feature | FluxFrame Usage | Benefit |
|---------|-----------------|---------|
| `.agent/rules/` | Project configuration | FluxFrame methodology |
| `.agent/workflows/` | Automated tasks | Development automation |
| `~/.gemini/GEMINI.md` | Global Config | User preferences |

## GEMINI.md Configuration

Antigravity reads `GEMINI.md` from the project root for project-specific instructions.

### How FluxFrame Uses This

FluxFrame generates `GEMINI.md` with:
- Project context (name, tech stack, commands)
- FluxFrame methodology summary
- Pattern library usage instructions
- Development workflow phases
- Change request protocol

### Location Options

| Location | Scope | Use Case |
|----------|-------|----------|
| `.agent/rules/fluxframe.md` | Project | Project-specific rules |
| `~/.gemini/GEMINI.md` | Global | User preferences |

FluxFrame targets the project-level `GEMINI.md`.

## Workflows (Optional)

Antigravity supports workflow automation for repetitive tasks.

### Concept

Workflows can be defined for common development tasks:
- Running tests
- Code formatting
- Deployment steps
- Custom scripts

### FluxFrame Integration

FluxFrame doesn't provide pre-built workflows because:
- Workflows are highly project-specific
- Commands differ significantly between projects
- Standard CI/CD tools often handle these tasks

If you want to add workflows, create a `.antigravity/workflows/` directory.

### Example Workflow

```yaml
# .agent/workflows/test-and-lint.yaml
name: Test and Lint
steps:
  - run: {{TEST_COMMAND}}
  - run: {{LINT_COMMAND}}
```

## Global Configuration

User-level settings can be placed in `~/.gemini/GEMINI.md`.

### Use Cases

- Personal coding preferences
- Default conventions across all projects
- User-specific instructions

### FluxFrame Approach

FluxFrame focuses on project-level configuration. Global settings are left to user preference.

## Features NOT Heavily Used by FluxFrame

- **Workflows** - Project-specific, not templated
- **Global config** - User preference
- **IDE Integration** - Tool-specific

## Comparison with Other Tools

| Feature | Antigravity | Claude Code | Roo Code | Cline |
|---------|-------------|-------------|----------|-------|
| Project Config | `GEMINI.md` | `CLAUDE.md` | `AGENTS.md` auto | `.clinerules` |
| File Imports | ❌ | ✅ `@file` | ❌ | ❌ |
| Path Rules | ❌ | ✅ glob | ❌ | ❌ |
| Custom Modes | ❌ | ❌ | ✅ | ❌ |
| Workflows | ✅ | ❌ | ❌ | ❌ |
| Tool Restrictions | ❌ | ❌ | ✅ | ❌ |

## When to Choose Full Antigravity Integration

Choose full integration (dedicated GEMINI.md) when:
- Antigravity is your primary AI tool
- You want Antigravity-specific instructions
- You're using workflow automation

Choose symlink (basic) when:
- You use multiple AI tools interchangeably
- Your project is simple
- You prefer maximum portability

## Limitations

Antigravity's configuration is relatively simple compared to other tools:
- No file import syntax
- No path-specific rules
- No mode/persona switching
- No tool permission restrictions

For these features, consider using Claude Code or Roo Code as your primary tool with Antigravity as a symlink fallback.
