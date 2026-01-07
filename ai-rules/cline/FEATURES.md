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

## Browser Automation (Puppeteer)

Cline includes browser automation capabilities via Puppeteer, allowing it to interact with web pages during development and testing.

### How It Works

Cline uses a Puppeteer-controlled browser to:
1. Launch a browser at a specified URL
2. Take screenshots after each action
3. Wait for your confirmation before the next action
4. Execute clicks, typing, scrolling based on screenshot analysis

### Capabilities

| Action | Description |
|--------|-------------|
| **launch** | Open browser at a URL (first action required) |
| **click** | Click at x,y coordinates |
| **type** | Type text (after clicking a text field) |
| **scroll_down** | Scroll down one page height |
| **scroll_up** | Scroll up one page height |
| **close** | Close browser (final action required) |

### Key Characteristics

- **Headless browser** - Separate from your logged-in sessions
- **Screenshot-driven** - Each action returns a screenshot
- **Coordinate-based** - Clicks require x,y coordinates from screenshots
- **Sequential** - One action per turn, wait for response
- **Fixed resolution** - 900x600 pixel viewport

### Limitations

- **No authenticated access** - Cannot access your logged-in sessions
- **No shared state** - Each session is fresh
- **Coordinate clicking** - Must analyze screenshots to find click targets
- **One action at a time** - Cannot batch multiple actions
- **No GIF recording** - Screenshots only

### Best Use Cases

1. **Testing local dev servers**
   ```
   Launch browser at localhost:3000, click the login button, 
   and verify the form appears
   ```

2. **Verifying UI rendering**
   ```
   Open the dashboard page and take a screenshot to verify layout
   ```

3. **Form interaction testing**
   ```
   Fill out the contact form and submit, verify success message
   ```

4. **Visual regression checks**
   ```
   Navigate to each main page and capture screenshots for review
   ```

### FluxFrame Integration

For web development workflows, browser automation enables:
- Verification step in development cycles
- Visual confirmation of implemented features
- Interactive testing without leaving the IDE
- Screenshot documentation of completed work

### Example Workflow

```
1. Implement new feature component
2. Run: npm run dev
3. "Launch browser at localhost:3000"
4. [Screenshot received, analyze]
5. "Click on navigation item at 450,50"
6. [Screenshot received, verify feature loads]
7. "Close browser"
8. Continue with next implementation step
```

### Comparison with Claude Code Chrome

| Feature | Cline (Puppeteer) | Claude Code (Chrome) |
|---------|-------------------|---------------------|
| Browser Type | Headless | Your Chrome browser |
| Authentication | None | Your logged-in sessions |
| Click Method | Coordinates from screenshot | Native selectors |
| Console Access | Yes (logs) | Yes (full console) |
| GIF Recording | ❌ | ✅ |
| Multi-tab | ❌ | ✅ |
| Visible Window | No | Yes (required) |

**Choose Cline Puppeteer for:** Local development testing, simple verifications
**Choose Claude Chrome for:** Authenticated apps, complex workflows, demos

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
