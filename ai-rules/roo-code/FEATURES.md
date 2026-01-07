# Roo Code Features

Roo Code (VS Code extension) offers powerful features for AI-assisted development, with particular strengths in custom modes and tool permission management. This document explains which features FluxFrame leverages and how.

## Feature Overview

| Feature | FluxFrame Usage | Benefit |
|---------|-----------------|---------|
| Custom Modes | FluxFrame personas | Task-specific AI behavior |
| Tool Restrictions | File edit permissions | Prevent accidental changes |
| Mode-Specific Rules | `.roo/rules-*` | Context-aware guidance |
| AGENTS.md Auto-Detection | Universal baseline | Zero config for basics |
| Model Per Mode | Optimize cost/capability | Different models for different tasks |

## Custom Modes (`.roomodes`)

Roo Code's most powerful feature is custom modes - specialized AI personas for different tasks.

### How FluxFrame Uses This

FluxFrame provides five pre-configured modes:

| Mode | Slug | Purpose |
|------|------|---------|
| 💻 FluxFrame Code | `fluxframe-code` | Implementing features, writing code |
| 🏗️ FluxFrame Architect | `fluxframe-architect` | Planning, design, documentation |
| 🔍 FluxFrame Debug | `fluxframe-debug` | Bug fixing, troubleshooting |
| 📚 Pattern Librarian | `fluxframe-patterns` | Pattern documentation |
| ✅ FluxFrame Review | `fluxframe-review` | Code review, quality checks |

### Mode Components

Each mode defines:

```yaml
- slug: fluxframe-code
  name: "💻 FluxFrame Code"
  roleDefinition: |
    [Persona and expertise description]
  whenToUse: "[Guidance for when to use this mode]"
  customInstructions: |
    [Mode-specific instructions and workflows]
  groups:
    - read
    - edit
    - command
    - browser
    - mcp
```

### Switching Modes

In Roo Code, switch modes to change AI behavior:
- Use the mode selector in the interface
- Each mode has appropriate permissions and instructions
- Mode switch changes context and capabilities

## Tool Permission Restrictions

Roo Code can restrict what files the AI can edit using regex patterns.

### How FluxFrame Uses This

**Code Mode** - Can edit everything except the source of truth:
```yaml
groups:
  - read
  - - edit
    - fileRegex: "^(?!project_docs/context_master_guide\\.md$).*$"
    - description: "All files except context_master_guide.md"
```

**Architect Mode** - Can only edit documentation files:
```yaml
groups:
  - read
  - - edit
    - fileRegex: "\\.(md|yaml|yml|json)$"
    - description: "Documentation and config files only"
```

**Pattern Librarian** - Can only edit pattern files:
```yaml
groups:
  - read
  - - edit
    - fileRegex: "^project_docs/patterns/.*\\.md$"
    - description: "Pattern files only"
```

**Review Mode** - Read-only (no edit permissions):
```yaml
groups:
  - read
  - browser
  - mcp
```

### Benefits
- Prevents accidental edits to critical files
- Enforces separation of concerns
- Reduces risk of AI making unintended changes
- Matches mode purpose to capabilities

## Mode-Specific Rules

Rules in `.roo/rules-{mode}/` directories are loaded only for that mode.

### Directory Structure

```
.roo/
├── rules/                              # All modes
│   └── 01-project-standards.md
├── rules-code/                         # fluxframe-code mode only
│   └── 01-implementation.md
├── rules-architect/                    # fluxframe-architect mode only
│   └── 01-design-principles.md
├── rules-fluxframe-debug/              # fluxframe-debug mode only
│   └── 01-debugging.md
└── rules-fluxframe-patterns/           # fluxframe-patterns mode only
    └── 01-pattern-docs.md
```

### How It Works
- Rules in `rules/` apply to ALL modes
- Rules in `rules-code/` apply only to fluxframe-code mode
- This reduces noise and keeps context focused

## AGENTS.md Auto-Detection

Roo Code automatically detects and uses `AGENTS.md` in the project root.

### How FluxFrame Uses This
- `AGENTS.md` is always generated as the universal baseline
- Roo Code reads it automatically
- No `.roorules` symlink needed (though supported for compatibility)
- Custom modes extend (don't replace) AGENTS.md guidance

## Model Per Mode (Optional)

Roo Code can use different AI models for different modes.

### Potential Usage

```yaml
- slug: fluxframe-code
  model: claude-3-5-sonnet  # More capable for coding
  
- slug: fluxframe-review
  model: claude-3-haiku     # Faster/cheaper for review
```

### Benefits
- Optimize cost for simple tasks
- Use more capable models for complex work
- Balance speed vs capability per task

## Browser Automation (Puppeteer)

Roo Code includes browser automation capabilities via Puppeteer, similar to Cline.

### How It Works

Roo Code uses a Puppeteer-controlled browser to:
1. Launch a browser at a specified URL
2. Take screenshots after each action
3. Wait for confirmation before the next action
4. Execute clicks, typing, scrolling based on screenshot analysis

### Capabilities

| Action | Description |
|--------|-------------|
| **launch** | Open browser at a URL |
| **click** | Click at x,y coordinates |
| **type** | Type text |
| **scroll_down/up** | Scroll page |
| **close** | Close browser |

### Key Characteristics

- **Headless browser** - Separate from your sessions
- **Screenshot-driven** - Each action returns a screenshot
- **Coordinate-based** - Clicks require x,y from screenshots
- **Sequential** - One action per turn
- **900x600 viewport** - Fixed resolution

### Mode Integration

Browser actions are enabled per mode via the `browser` group:

```yaml
groups:
  - read
  - edit
  - command
  - browser    # ← Enables browser automation
  - mcp
```

**FluxFrame Mode Defaults:**
- ✅ Code Mode - Browser enabled (for testing implementations)
- ✅ Debug Mode - Browser enabled (for visual debugging)
- ❌ Architect Mode - Browser disabled (planning only)
- ❌ Pattern Mode - Browser disabled (documentation only)
- ❌ Review Mode - Browser disabled (code review only)

### Best Use Cases

1. **Testing local dev servers**
   ```
   Launch browser at localhost:3000 and verify the component renders
   ```

2. **Visual verification**
   ```
   Check if the form validation messages appear correctly
   ```

3. **Interactive debugging**
   ```
   Open the page and check console for errors
   ```

### Comparison with Claude Code Chrome

| Feature | Roo Code (Puppeteer) | Claude Code (Chrome) |
|---------|---------------------|---------------------|
| Browser Type | Headless | Your Chrome browser |
| Authentication | None | Your logged-in sessions |
| Console Access | Yes | Yes (full) |
| GIF Recording | ❌ | ✅ |
| Mode-Restricted | ✅ (per mode) | N/A |

**Choose Puppeteer for:** Local testing, mode-controlled access
**Choose Claude Chrome for:** Authenticated apps, demos

---

## Features NOT Used by FluxFrame

Some Roo Code features aren't leveraged by FluxFrame defaults:

- **API Providers** - Model selection is user choice
- **Ollama Integration** - Local models are user choice
- **Custom Slash Commands** - Roo Code uses different command system

## Comparison with Other Tools

| Feature | Roo Code | Claude Code | Cline |
|---------|----------|-------------|-------|
| Custom Modes/Personas | ✅ | ❌ | ❌ |
| Tool Restrictions | ✅ regex | ❌ | ❌ |
| Mode-Specific Rules | ✅ directories | ❌ | ❌ |
| Model Per Mode | ✅ | ❌ | ❌ |
| File Imports | ❌ | ✅ `@file` | ❌ |
| Path-Targeted Rules | ❌ | ✅ glob | ❌ |
| Rule Toggle UI | ❌ | ❌ | ✅ |
| AGENTS.md Support | ✅ auto | manual | manual |

## When to Choose Full Roo Code Integration

Choose full integration (custom modes + rule directories) when you need:
- Different AI personas for different tasks
- Security-conscious file edit restrictions
- Mode-specific rule sets
- Team standardization of AI behavior

Choose basic (AGENTS.md only) when:
- You use multiple AI tools interchangeably
- Your project is simple and doesn't need modes
- You prefer maximum portability
