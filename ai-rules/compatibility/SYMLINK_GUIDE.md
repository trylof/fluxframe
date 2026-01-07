# Symlink Guide for AI Tool Compatibility

This guide explains when and how to use symlinks for cross-tool compatibility.

## What Are Symlinks?

Symlinks (symbolic links) are files that point to other files. When a tool reads a symlink, it gets the content of the target file.

```
AGENTS.md          ← The actual file (source of truth)
    ↑
    ├── CLAUDE.md      (symlink → AGENTS.md)
    ├── GEMINI.md      (symlink → AGENTS.md)
    ├── .clinerules    (symlink → AGENTS.md)
    └── .roorules      (symlink → AGENTS.md)
```

All tools read from the same content. Edit AGENTS.md, all tools see the changes.

## When to Use Symlinks

### Use Symlinks When:

- You use multiple AI tools interchangeably
- You want AGENTS.md as the single source of truth
- You want basic compatibility without tool-specific features
- Maximum portability is important
- You're testing different AI tools on the same project

### Don't Use Symlinks When:

- You want tool-specific features (imports, modes, path rules)
- You're primarily using one tool and want its full capabilities
- You need different configurations per tool

## Quick Setup

### Automated Setup

**macOS / Linux:**
```bash
./ai-rules/compatibility/setup-symlinks.sh
```

**Windows (PowerShell as Admin):**
```powershell
.\ai-rules\compatibility\setup-symlinks.ps1
```

### Manual Setup

**macOS / Linux:**
```bash
ln -s AGENTS.md CLAUDE.md
ln -s AGENTS.md GEMINI.md
ln -s AGENTS.md .clinerules
ln -s AGENTS.md .roorules
```

**Windows (CMD as Admin):**
```cmd
mklink CLAUDE.md AGENTS.md
mklink GEMINI.md AGENTS.md
mklink .clinerules AGENTS.md
mklink .roorules AGENTS.md
```

**Windows (PowerShell as Admin):**
```powershell
New-Item -ItemType SymbolicLink -Path CLAUDE.md -Target AGENTS.md
New-Item -ItemType SymbolicLink -Path GEMINI.md -Target AGENTS.md
New-Item -ItemType SymbolicLink -Path .clinerules -Target AGENTS.md
New-Item -ItemType SymbolicLink -Path .roorules -Target AGENTS.md
```

## Git Configuration

### Recommended: Add Symlinks to .gitignore

Track only AGENTS.md in version control:

```gitignore
# AI tool symlinks (AGENTS.md is source of truth)
CLAUDE.md
GEMINI.md
.clinerules
.roorules
```

Then commit AGENTS.md:
```bash
git add AGENTS.md
git add .gitignore
git commit -m "Add AGENTS.md universal AI configuration"
```

### Why Not Track Symlinks?

1. **Windows compatibility** - Symlinks work differently across platforms
2. **Single source** - AGENTS.md is the only file to maintain
3. **Local setup** - Each developer creates symlinks on clone

### Setup After Clone

Each developer runs after cloning:
```bash
./ai-rules/compatibility/setup-symlinks.sh
```

## Switching to Full Integration

If you later want full integration for a specific tool:

### For Claude Code

```bash
# Remove symlink
rm CLAUDE.md

# Create actual config
cp path/to/fluxframe/ai-rules/claude-code/template.claude.md ./CLAUDE.md

# Set up path rules
mkdir -p .claude/rules
cp path/to/fluxframe/ai-rules/claude-code/rules/*.template.md .claude/rules/

# Customize templates
# (edit files to replace placeholders)
```

### For Roo Code

```bash
# Remove symlink (if exists)
rm .roorules

# Create mode definitions
cp path/to/fluxframe/ai-rules/roo-code/template.roomodes.yaml ./.roomodes

# Set up rule directories
mkdir -p .roo/rules .roo/rules-code .roo/rules-architect
cp path/to/fluxframe/ai-rules/roo-code/rules/*.template.md .roo/rules/
cp path/to/fluxframe/ai-rules/roo-code/rules-code/*.template.md .roo/rules-code/
cp path/to/fluxframe/ai-rules/roo-code/rules-architect/*.template.md .roo/rules-architect/

# Customize templates
```

### For Cline

```bash
# Remove symlink
rm .clinerules

# Create folder structure
mkdir -p .clinerules
cp path/to/fluxframe/ai-rules/cline/clinerules-folder/*.template.md .clinerules/

# Rename template files
cd .clinerules
for f in *.template.md; do mv "$f" "${f%.template.md}.md"; done
cd ..

# Customize templates
```

### For Antigravity

```bash
# Remove symlink
rm GEMINI.md

# Create actual config
cp path/to/fluxframe/ai-rules/antigravity/template.gemini.md ./GEMINI.md

# Customize template
```

## Switching Back to Symlinks

To switch from full integration back to symlinks:

```bash
# Remove full integration files
rm CLAUDE.md
rm -rf .claude/

# Create symlink
ln -s AGENTS.md CLAUDE.md
```

## Troubleshooting

### "Permission denied" on Windows

Windows requires special permissions for symlinks:

**Option 1: Run as Administrator**
```
Right-click PowerShell → Run as Administrator
```

**Option 2: Enable Developer Mode**
1. Open Windows Settings
2. Go to "Update & Security" → "For developers"
3. Enable "Developer Mode"
4. Restart terminal

### Symlink shows as regular file

Some filesystems don't support symlinks:
- FAT32 / exFAT drives
- Network shares (sometimes)
- WSL accessing Windows drives

**Workaround:** Use a copy instead:
```bash
cp AGENTS.md CLAUDE.md
```
Note: You'll need to manually sync changes.

### Tool not detecting the file

1. Verify symlink target:
   ```bash
   ls -la CLAUDE.md  # Should show → AGENTS.md
   ```

2. Verify AGENTS.md has content:
   ```bash
   head AGENTS.md
   ```

3. Some tools need restart to detect new config files

### Git shows symlinks as changed

If symlinks appear in `git status`:
```bash
git config core.symlinks true
git update-index --assume-unchanged CLAUDE.md
```

Or add to `.gitignore` (recommended).

## Verifying Symlinks

### Check if file is a symlink

**macOS / Linux:**
```bash
ls -la CLAUDE.md
# Output: CLAUDE.md -> AGENTS.md
```

**Windows PowerShell:**
```powershell
(Get-Item CLAUDE.md).Attributes
# Should include "ReparsePoint"
```

### Verify symlink target

```bash
readlink CLAUDE.md
# Output: AGENTS.md
```

### Test symlink works

```bash
cat CLAUDE.md | head -5
# Should show first 5 lines of AGENTS.md
```

## Best Practices

### DO:
- Keep AGENTS.md as the single source of truth
- Add symlinks to .gitignore
- Document symlink setup in project README
- Use automated scripts for consistent setup

### DON'T:
- Track symlinks in git (platform issues)
- Edit symlinked files (changes go to source anyway)
- Create circular symlinks
- Forget to update AGENTS.md when adding new features
