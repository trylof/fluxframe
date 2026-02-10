# Roo Code Setup Guide

This guide explains how to set up Roo Code with FluxFrame integration.

## Prerequisites

- Roo Code VS Code extension installed
- FluxFrame-bootstrapped project with `AGENTS.md`

## Integration Options

### Option A: Full Integration (Recommended)

Full integration leverages Roo Code's unique features:
- Custom modes with specialized personas
- Tool permission restrictions
- Mode-specific rule directories

#### Setup Steps

1. **Ensure AGENTS.md exists**

   Roo Code auto-detects `AGENTS.md`. It should already exist from FluxFrame bootstrap.

2. **Generate .roomodes file**

   During FluxFrame bootstrap, select "Roo Code - Full Integration".
   
   Or manually copy and customize:
   ```bash
   cp path/to/fluxframe/ai-rules/roo-code/template.roomodes.yaml ./.roomodes
   ```

3. **Create .roo/ directory structure**

   ```bash
   mkdir -p .roo/rules
   mkdir -p .roo/rules-code
   mkdir -p .roo/rules-architect
   ```

4. **Add rule files**

   Copy and customize rule templates:
   ```bash
   # Workspace-wide rules (all modes)
   cp path/to/fluxframe/ai-rules/roo-code/rules/01-project-standards.template.md \
      .roo/rules/01-project-standards.md
   
   # Code mode rules
   cp path/to/fluxframe/ai-rules/roo-code/rules-code/01-implementation.template.md \
      .roo/rules-code/01-implementation.md
   
   # Architect mode rules
   cp path/to/fluxframe/ai-rules/roo-code/rules-architect/01-design-principles.template.md \
      .roo/rules-architect/01-design-principles.md
   ```

5. **Fill in placeholders**

   Replace `{{PLACEHOLDERS}}` in all files with project-specific values.

6. **Customize file path patterns**

   Update the `fileRegex` patterns in `.roomodes` to match your project structure:
   ```yaml
   # Example: Protect your main rules file
   - fileRegex: "^(?!AGENTS\\.md$).*$"
   ```

### Option B: Basic Integration

For maximum portability or when using multiple AI tools:

Roo Code auto-detects `AGENTS.md` - no additional setup needed!

Optionally create a symlink for older Roo Code versions:
```bash
ln -s AGENTS.md .roorules
```

You won't get:
- Custom modes/personas
- Tool permission restrictions
- Mode-specific rules

But you will get:
- Full FluxFrame methodology from AGENTS.md
- Compatibility with other tools

## File Structure After Setup

### Full Integration
```
your-project/
├── AGENTS.md                           # Universal baseline (auto-detected)
├── .roomodes                           # Mode definitions
├── .roo/
│   ├── rules/                          # All modes
│   │   └── 01-project-standards.md
│   ├── rules-code/                     # Code mode only
│   │   └── 01-implementation.md
│   └── rules-architect/                # Architect mode only
│       └── 01-design-principles.md
├── project_docs/
│   └── ...
└── ...
```

### Basic Integration
```
your-project/
├── AGENTS.md                           # Universal baseline (auto-detected)
├── project_docs/
│   └── ...
└── ...
```

## Understanding Modes

### Included Modes

| Mode | When to Use | Permissions |
|------|-------------|-------------|
| 💻 FluxFrame Code | Writing/modifying code | All except AGENTS.md |
| 🏗️ FluxFrame Architect | Planning, documentation | Docs only |
| 🔍 FluxFrame Debug | Bug fixing | Full access |
| 📚 Pattern Librarian | Pattern documentation | Patterns only |
| ✅ FluxFrame Review | Code review | Read only |

### Mode Selection

Switch modes in Roo Code's interface based on your current task:
- Starting new feature → Code mode
- Planning architecture → Architect mode
- Fixing a bug → Debug mode
- Documenting patterns → Pattern Librarian
- Reviewing work → Review mode

### Customizing Modes

Edit `.roomodes` to customize:

**Change mode name/emoji:**
```yaml
- slug: fluxframe-code
  name: "🚀 Dev Mode"  # Custom name
```

**Adjust permissions:**
```yaml
groups:
  - read
  - - edit
    - fileRegex: "^src/.*$"  # Only src/ directory
    - description: "Source files only"
```

**Add new mode:**
```yaml
- slug: fluxframe-testing
  name: "🧪 FluxFrame Testing"
  roleDefinition: |
    You are a testing specialist...
  whenToUse: "Use for writing and improving tests"
  customInstructions: |
    Focus on test quality...
  groups:
    - read
    - - edit
      - fileRegex: "^tests/.*$"
      - description: "Test files only"
    - command
```

## Adding Mode-Specific Rules

### Create Rule Directory

For a mode with slug `fluxframe-testing`:
```bash
mkdir -p .roo/rules-fluxframe-testing
```

### Add Rule Files

```bash
touch .roo/rules-fluxframe-testing/01-testing-rules.md
```

### Rule Naming Convention

Use numeric prefixes for ordering:
- `01-primary-rules.md`
- `02-secondary-rules.md`
- `03-additional-rules.md`

## Connecting MCP Server

For full FluxFrame workflow support:

1. **Configure MCP server** in Roo Code settings

2. **Verify connection** - MCP tools should appear:
   - `get_context_for_task`
   - `check_pattern_exists`
   - `start_change_request`
   - etc.

3. **Enable MCP in modes** - Ensure `mcp` is in the groups:
   ```yaml
   groups:
     - read
     - edit
     - mcp    # Required for MCP tools
   ```

## Verification

After setup, verify everything works:

1. **Open project in VS Code with Roo Code**

2. **Check modes appear** - FluxFrame modes should be selectable

3. **Test mode switching** - Switch between modes

4. **Test permissions** - In Architect mode, try editing a `.py` file (should be restricted)

5. **Test rules loading** - Mode-specific rules should be in context

## Troubleshooting

### Modes not appearing
- Check `.roomodes` file exists in project root
- Verify YAML syntax is valid
- Restart VS Code

### Rules not loading
- Check `.roo/` directory structure
- Verify rule file names match mode slugs
- Rules directory must be `rules-{slug}/`

### Permissions not working
- Check `fileRegex` syntax (escape special characters)
- Verify groups are correctly formatted
- Test regex at regex101.com

### AGENTS.md not detected
- Ensure file is in project root
- File must be named exactly `AGENTS.md`
- Check file has content

### MCP tools not available
- Verify `mcp` is in mode groups
- Check MCP server is running
- Restart Roo Code

## Updating Configuration

When making changes:

1. **Edit .roomodes** - Changes take effect on mode switch
2. **Edit rules** - Changes take effect immediately
3. **Add new rules** - Create file, no restart needed
4. **Major changes** - Restart VS Code to ensure clean state
