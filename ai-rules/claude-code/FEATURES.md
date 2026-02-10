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
@AGENTS.md                              # Universal baseline (philosophy + workflow)
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

## Chrome Integration (Browser Automation)

Claude Code integrates with Chrome for browser automation, testing, and debugging. This is a powerful feature for web development workflows.

### How It Works

Claude Code communicates with Chrome through the **Claude in Chrome** browser extension using Chrome's Native Messaging API. This allows Claude to control browser tabs, read page content, and perform actions while you work in your terminal.

### Prerequisites

- **Google Chrome** browser (not Brave, Arc, or other Chromium browsers)
- **Claude in Chrome extension** (v1.0.36+) from Chrome Web Store
- **Claude Code CLI** (v2.0.73+)
- **Paid Claude plan** (Pro, Team, or Enterprise)
- **Not supported:** WSL (Windows Subsystem for Linux)

### Enabling Chrome Integration

**Per-session:**
```bash
claude --chrome
```

**Verify connection:**
```
/chrome
```

**Enable by default:**
Run `/chrome` and select "Enabled by default"

> ⚠️ Enabling by default increases context usage since browser tools are always loaded.

### Key Capabilities

| Capability | Description |
|------------|-------------|
| **Navigate** | Open URLs, follow links, navigate pages |
| **Interact** | Click, type, scroll, fill forms |
| **Read Console** | Access console logs, errors, warnings |
| **Authenticated Access** | Use sites you're logged into (Gmail, Notion, etc.) |
| **DOM State** | Read page structure and content |
| **Record GIFs** | Create demos of interactions |
| **Multi-Tab** | Work across multiple tabs |
| **Chain Actions** | Combine browser + terminal workflows |

### Limitations

- **Chrome only** - Brave, Arc, and other Chromium browsers not supported
- **Visible window required** - No headless mode (uses your actual browser session)
- **Modal dialogs block** - JavaScript alerts/confirms require manual dismissal
- **Site permissions** - Managed in Chrome extension settings

### Example Workflows

**Live debugging:**
```
Open localhost:3000, check the console for errors, and fix any issues you find
```

**Design verification:**
```
Open the dashboard page and verify it matches the Figma design I shared earlier
```

**Web app testing:**
```
Test the login form with invalid credentials and report if error messages appear correctly
```

**Data extraction:**
```
Go to the product listings page and extract names, prices, and availability as CSV
```

**Record demo:**
```
Record a GIF showing the checkout flow from cart to confirmation
```

### FluxFrame Integration

When browser automation is enabled, FluxFrame can:
- Include browser testing in development cycles
- Verify UI implementations match specifications
- Test user flows and interactions
- Debug frontend issues with console access

### Best Practices

1. **Use fresh tabs** - Claude creates new tabs; if one becomes unresponsive, request a new one
2. **Filter console output** - Tell Claude what patterns to look for rather than requesting all logs
3. **Handle modals manually** - Dismiss JavaScript alerts/confirms yourself, then tell Claude to continue
4. **Manage permissions** - Configure site-level permissions in the Chrome extension settings

### Troubleshooting

**Extension not detected:**
1. Verify Chrome extension v1.0.36+ is installed
2. Verify Claude Code v2.0.73+ (`claude --version`)
3. Ensure Chrome is running
4. Run `/chrome` → "Reconnect extension"
5. Restart both Claude Code and Chrome if needed

**Browser not responding:**
1. Check for blocking modal dialogs
2. Ask Claude to create a new tab
3. Disable/re-enable the Chrome extension

---

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
