# Claude Code Setup Guide

This guide explains how to set up Claude Code with FluxFrame integration.

## Prerequisites

- Claude Code CLI installed ([Installation Guide](https://docs.anthropic.com/en/docs/claude-code))
- FluxFrame-bootstrapped project with `AGENTS.md`

## Integration Options

### Option A: Full Integration (Recommended)

Full integration leverages Claude Code's unique features:
- File imports via `@` syntax
- Path-targeted rules
- Custom slash commands

#### Setup Steps

1. **Generate CLAUDE.md**

   During FluxFrame bootstrap, select "Claude Code - Full Integration".
   
   Or manually copy and customize the template:
   ```bash
   cp path/to/fluxframe/ai-rules/claude-code/template.claude.md ./CLAUDE.md
   ```

2. **Create .claude/rules/ directory**

   ```bash
   mkdir -p .claude/rules
   ```

3. **Add path-targeted rules**

   Copy and customize rule templates:
   ```bash
   # API rules
   cp path/to/fluxframe/ai-rules/claude-code/rules/api-rules.template.md .claude/rules/api-rules.md
   
   # Frontend rules  
   cp path/to/fluxframe/ai-rules/claude-code/rules/frontend-rules.template.md .claude/rules/frontend-rules.md
   
   # Test rules
   cp path/to/fluxframe/ai-rules/claude-code/rules/test-rules.template.md .claude/rules/test-rules.md
   ```

4. **Customize path patterns**

   Edit each rule file's frontmatter to match your project structure:
   ```yaml
   ---
   paths:
     - src/api/**/*          # Adjust to your paths
     - backend/routes/**/*
   ---
   ```

5. **Fill in placeholders**

   Replace `{{PLACEHOLDERS}}` in all files with project-specific values.

### Option B: Basic Integration (Symlink)

For maximum portability or when using multiple AI tools:

```bash
ln -s AGENTS.md CLAUDE.md
```

This makes Claude Code read `AGENTS.md` directly. You won't get:
- Path-targeted rules
- File imports
- Claude-specific instructions

But you will get:
- Full FluxFrame methodology from AGENTS.md
- Compatibility with other tools

## File Structure After Setup

### Full Integration
```
your-project/
├── AGENTS.md                    # Universal baseline
├── CLAUDE.md                    # Claude-specific config (imports AGENTS.md)
├── .claude/
│   └── rules/
│       ├── api-rules.md         # API development rules
│       ├── frontend-rules.md    # Frontend rules
│       └── test-rules.md        # Test rules
├── project_docs/
│   ├── context_master_guide.md
│   └── ...
└── ...
```

### Basic Integration
```
your-project/
├── AGENTS.md                    # Universal baseline
├── CLAUDE.md -> AGENTS.md       # Symlink
├── project_docs/
│   └── ...
└── ...
```

## Customizing Rules

### Modifying Path Patterns

Edit the `paths:` frontmatter in each rule file:

```yaml
---
paths:
  - src/api/**/*.py           # Python API files
  - src/api/**/*.ts           # TypeScript API files
  - app/routes/**/*           # Additional route patterns
---
```

### Adding New Rule Files

1. Create new file in `.claude/rules/`:
   ```bash
   touch .claude/rules/database-rules.md
   ```

2. Add frontmatter with path patterns:
   ```yaml
   ---
   paths:
     - src/models/**/*
     - src/migrations/**/*
   ---
   ```

3. Add your rules below the frontmatter

### Removing Rule Files

Simply delete unwanted rule files:
```bash
rm .claude/rules/frontend-rules.md
```

## Adding Slash Commands

1. Create commands directory:
   ```bash
   mkdir -p .claude/commands
   ```

2. Add command files:
   ```bash
   touch .claude/commands/new-feature.md
   ```

3. Write command content:
   ```markdown
   # New Feature Command
   
   Follow the FluxFrame development cycle:
   
   1. Check patterns for existing solutions
   2. Read technical_status.md for current state
   3. Plan the implementation approach
   4. Implement with tests
   5. Get user confirmation
   6. Update documentation
   
   What feature would you like to implement?
   ```

4. Use in Claude Code:
   ```
   /project:new-feature
   ```

## Connecting MCP Server

For full FluxFrame workflow support, connect the MCP server:

1. **Configure MCP server** in your Claude Code settings

2. **Verify connection** - MCP tools should be available:
   - `get_context_for_task`
   - `check_pattern_exists`
   - `get_current_implementation_status`
   - etc.

## Verification

After setup, verify everything works:

1. **Start Claude Code** in your project directory

2. **Check CLAUDE.md is loaded** - Claude should mention the project context

3. **Test path rules** - Open an API file, Claude should reference API rules

4. **Test imports** - References to AGENTS.md should work

## Troubleshooting

### CLAUDE.md not detected
- Ensure file is in project root
- Check file permissions
- Restart Claude Code

### Path rules not loading
- Verify path patterns match your files
- Check frontmatter YAML syntax
- Ensure `.claude/rules/` directory exists

### Imports not working
- Verify imported files exist at specified paths
- Check for typos in `@path/to/file.md`
- Large files may be truncated

### MCP tools not available
- Verify MCP server is running
- Check Claude Code MCP configuration
- Restart Claude Code after config changes

## Updating Configuration

When project structure changes:

1. Update path patterns in `.claude/rules/*.md`
2. Update imports in `CLAUDE.md`
3. No need to restart Claude Code - changes take effect on next file open
