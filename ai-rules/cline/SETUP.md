# Cline Setup Guide

This guide explains how to set up Cline with FluxFrame integration.

## Prerequisites

- Cline VS Code extension installed
- FluxFrame-bootstrapped project with `AGENTS.md`

## Integration Options

### Option A: Full Integration (Folder Mode - Recommended)

Full integration uses Cline's folder mode for modular rule organization.

#### Setup Steps

1. **Ensure AGENTS.md exists**

   Should already exist from FluxFrame bootstrap.

2. **Create .clinerules/ directory**

   ```bash
   mkdir -p .clinerules
   ```

3. **Add rule files**

   Copy and customize templates:
   ```bash
   # Core rules
   cp path/to/fluxframe/ai-rules/cline/clinerules-folder/01-core-rules.template.md \
      .clinerules/01-core-rules.md
   
   # Pattern rules
   cp path/to/fluxframe/ai-rules/cline/clinerules-folder/02-patterns.template.md \
      .clinerules/02-patterns.md
   
   # Workflow rules
   cp path/to/fluxframe/ai-rules/cline/clinerules-folder/03-workflows.template.md \
      .clinerules/03-workflows.md
   ```

4. **Fill in placeholders**

   Replace `{{PLACEHOLDERS}}` in all files with project-specific values.

### Option B: Basic Integration (Symlink)

For maximum portability or when using multiple AI tools:

```bash
ln -s AGENTS.md .clinerules
```

This creates a single file (not folder) that points to AGENTS.md.

You won't get:
- Modular rule organization
- Rule toggle UI
- Selective rule loading

But you will get:
- Full FluxFrame methodology from AGENTS.md
- Compatibility with other tools

## File Structure After Setup

### Full Integration (Folder Mode)
```
your-project/
├── AGENTS.md                      # Universal baseline
├── .clinerules/                   # Cline rules folder
│   ├── 01-core-rules.md           # Essential rules
│   ├── 02-patterns.md             # Pattern usage
│   └── 03-workflows.md            # Workflow rules
├── project_docs/
│   └── ...
└── ...
```

### Basic Integration (Symlink)
```
your-project/
├── AGENTS.md                      # Universal baseline
├── .clinerules -> AGENTS.md       # Symlink
├── project_docs/
│   └── ...
└── ...
```

## File Naming Convention

Use numeric prefixes for ordering:

| Prefix | Purpose |
|--------|---------|
| `01-` | Core/essential rules |
| `02-` | Pattern-related rules |
| `03-` | Workflow rules |
| `04-` | Project-specific rules |
| `05+` | Additional rules |

Rules are loaded in alphabetical order, so numbered prefixes control priority.

## Customizing Rules

### Adding New Rule Files

1. Create new file with appropriate prefix:
   ```bash
   touch .clinerules/04-api-rules.md
   ```

2. Add your rules:
   ```markdown
   # API Development Rules
   
   ## Endpoint Standards
   - Use response models
   - Validate all input
   ...
   ```

### Removing Rules

Simply delete the file:
```bash
rm .clinerules/02-patterns.md
```

### Modifying Rules

Edit the file directly. Changes take effect on next Cline session.

## Using Rule Toggle UI

Cline provides a visual interface to enable/disable rule files.

### Accessing Toggle UI

1. Open Cline in VS Code
2. Look for rules/settings panel
3. Toggle individual rule files on/off

### Recommended Toggles

| Task | Enabled Rules |
|------|---------------|
| New Feature | All rules |
| Bug Fix | 01-core, 03-workflows |
| Exploration | 01-core only |
| Documentation | 01-core, 02-patterns |

## Connecting MCP Server

For full FluxFrame workflow support:

1. **Configure MCP server** in Cline settings

2. **Verify connection** - MCP tools should appear:
   - `get_context_for_task`
   - `check_pattern_exists`
   - `start_change_request`
   - etc.

## Adding Project-Specific Rules

### Create Additional Rule File

```bash
touch .clinerules/04-project-specific.md
```

### Example Content

```markdown
# Project-Specific Rules

## Database Conventions
- Use UUIDs for primary keys
- Always include timestamps
- Soft delete over hard delete

## Naming Conventions
- Services: `{Resource}Service`
- Repositories: `{Resource}Repository`
- DTOs: `{Resource}DTO`

## Testing Requirements
- Minimum 80% coverage for services
- Integration tests for all endpoints
```

## Verification

After setup, verify everything works:

1. **Open project in VS Code with Cline**

2. **Check rules are loaded** - Cline should show rule files

3. **Test toggle UI** - Enable/disable rules should work

4. **Verify rule content** - Cline should follow the rules

## Troubleshooting

### Rules not loading
- Ensure `.clinerules/` is a directory (not file)
- Check file permissions
- Restart VS Code

### Symlink not working
- Ensure AGENTS.md exists
- Check symlink: `ls -la .clinerules`
- Remove and recreate: `rm .clinerules && ln -s AGENTS.md .clinerules`

### Toggle UI not showing rules
- Ensure folder mode (not file mode)
- Check files have `.md` extension
- Restart Cline

### MCP tools not available
- Verify MCP server is running
- Check Cline MCP configuration
- Restart Cline

## Switching Between File and Folder Mode

**Important:** You can only use ONE mode at a time.

### From File to Folder Mode

```bash
# Remove file/symlink
rm .clinerules

# Create directory
mkdir .clinerules

# Add rule files
# (copy templates as shown above)
```

### From Folder to File Mode

```bash
# Remove directory
rm -rf .clinerules

# Create file or symlink
ln -s AGENTS.md .clinerules
# OR
cp AGENTS.md .clinerules
```

## Best Practices

### Rule Organization
- Keep rules focused and single-purpose
- Use clear, descriptive names
- Order by importance using numeric prefixes

### Rule Content
- Be concise but complete
- Include examples where helpful
- Reference other docs (don't duplicate)

### Maintenance
- Review rules periodically
- Update when project conventions change
- Remove obsolete rules
