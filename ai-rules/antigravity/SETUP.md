# Antigravity Setup Guide

This guide explains how to set up Google Antigravity with FluxFrame integration.

## Prerequisites

- Google Antigravity installed
- FluxFrame-bootstrapped project with `AGENTS.md`

## Integration Options

### Option A: Full Integration (Recommended for Antigravity Users)

Full integration creates a dedicated `GEMINI.md` with FluxFrame methodology.

#### Setup Steps

1. **Ensure AGENTS.md exists**

   Should already exist from FluxFrame bootstrap.

2. **Generate GEMINI.md**

   During FluxFrame bootstrap, select "Antigravity - Full Integration".
   
   Or manually copy and customize:
   ```bash
   cp path/to/fluxframe/ai-rules/antigravity/template.gemini.md ./GEMINI.md
   ```

3. **Fill in placeholders**

   Replace `{{PLACEHOLDERS}}` with project-specific values.

### Option B: Basic Integration (Symlink)

For maximum portability or when using multiple AI tools:

```bash
ln -s AGENTS.md GEMINI.md
```

You won't get:
- Antigravity-specific formatting
- Workflow integration

But you will get:
- Full FluxFrame methodology from AGENTS.md
- Compatibility with other tools

## File Structure After Setup

### Full Integration
```
your-project/
├── AGENTS.md                    # Universal baseline
├── GEMINI.md                    # Antigravity config
├── project_docs/
│   └── ...
└── ...
```

### Basic Integration
```
your-project/
├── AGENTS.md                    # Universal baseline
├── GEMINI.md -> AGENTS.md       # Symlink
├── project_docs/
│   └── ...
└── ...
```

## Customizing GEMINI.md

### Adding Project-Specific Rules

Edit the file directly to add rules:

```markdown
## Project-Specific Rules

### Database Conventions
- Use UUIDs for primary keys
- Always include timestamps

### Naming Conventions
- Services: `{Resource}Service`
- Repositories: `{Resource}Repository`
```

### Keeping in Sync with AGENTS.md

If you want to keep GEMINI.md aligned with AGENTS.md changes:

1. **Option 1:** Use symlink (automatic sync)
   ```bash
   rm GEMINI.md
   ln -s AGENTS.md GEMINI.md
   ```

2. **Option 2:** Manual updates
   - When AGENTS.md changes, review and update GEMINI.md

## Adding Workflows (Optional)

If you want to use Antigravity's workflow feature:

1. **Create workflows directory**
   ```bash
   mkdir -p .antigravity/workflows
   ```

2. **Add workflow file**
   ```bash
   touch .antigravity/workflows/dev-cycle.yaml
   ```

3. **Define workflow**
   ```yaml
   name: Development Cycle
   description: Run tests and lint before commit
   steps:
     - name: Run Tests
       run: npm test
     - name: Run Lint
       run: npm run lint
   ```

## Verification

After setup, verify everything works:

1. **Open project with Antigravity**

2. **Check GEMINI.md is loaded** - Antigravity should show project context

3. **Verify FluxFrame rules** - Ask about patterns or development workflow

## Troubleshooting

### GEMINI.md not detected
- Ensure file is in project root
- File must be named exactly `GEMINI.md`
- Check file permissions
- Restart Antigravity

### Symlink not working
- Ensure AGENTS.md exists
- Check symlink: `ls -la GEMINI.md`
- Remove and recreate: `rm GEMINI.md && ln -s AGENTS.md GEMINI.md`

### Content not updating
- Antigravity may cache configuration
- Restart Antigravity to pick up changes

## Global Configuration (Optional)

For user-level preferences that apply across all projects:

1. **Create global config directory**
   ```bash
   mkdir -p ~/.gemini
   ```

2. **Create global GEMINI.md**
   ```bash
   touch ~/.gemini/GEMINI.md
   ```

3. **Add global preferences**
   ```markdown
   # Global Preferences
   
   - Use British English spelling
   - Prefer functional programming style
   - Always run tests after code changes
   ```

Project-level `GEMINI.md` takes precedence over global config.

## When to Use Full vs Basic Integration

### Use Full Integration When:
- Antigravity is your primary AI tool
- You want to add Antigravity-specific instructions
- You're using workflow automation
- You want a standalone config

### Use Basic Integration (Symlink) When:
- You switch between multiple AI tools
- You want AGENTS.md as single source of truth
- You prefer automatic sync with AGENTS.md
- You don't need Antigravity-specific features
