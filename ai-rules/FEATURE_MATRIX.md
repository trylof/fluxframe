# AI Coding Tool Feature Matrix

This document compares the capabilities of AI coding tools supported by FluxFrame.

## Feature Comparison

| Feature | AGENTS.md | Claude Code | Roo Code | Cline | Cursor | Antigravity |
|---------|:---------:|:-----------:|:--------:|:-----:|:------:|:-----------:|
| **Basic Instructions** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Nested Directory Rules** | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ |
| **File Imports** | ❌ | ✅ `@file` | ❌ | ❌ | ❌ |
| **Path-Specific Rules** | ❌ | ✅ glob | ❌ | ❌ | ❌ |
| **Multiple Personas/Modes** | ❌ | ❌ | ✅ | ❌ | ❌ |
| **Tool Permission Restrictions** | ❌ | ❌ | ✅ regex | ❌ | ❌ |
| **Mode-Specific Rules** | ❌ | ❌ | ✅ dirs | ❌ | ❌ |
| **Rule Toggle UI** | ❌ | ❌ | ❌ | ✅ | ❌ |
| **Folder-Based Rules** | ❌ | ❌ | ❌ | ✅ | ❌ |
| **Model Per Mode** | ❌ | ❌ | ✅ | ❌ | ❌ |
| **Workflow Automation** | ❌ | ❌ | ❌ | ❌ | ✅ |
| **Enterprise Hierarchy** | ❌ | ✅ 4-level | ❌ | ❌ | ❌ |
| **MCP Support** | N/A | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Auto-Detects AGENTS.md** | N/A | ❌ | ✅ | ❌ | ✅ | ❌ |

## Tool-by-Tool Breakdown

### AGENTS.md (Universal Baseline)

**What it provides:**
- Project context and tech stack
- Development methodology
- Pattern library usage
- Change request protocol
- Documentation requirements

**Best for:**
- Maximum portability
- Teams using multiple AI tools
- Open standard compliance (60k+ repos)

**Limitations:**
- No tool-specific features
- No imports or path rules
- Basic text-based configuration

---

### Claude Code

**Unique features:**
- **File imports** - `@AGENTS.md` to include other files
- **Path-targeted rules** - Rules in `.claude/rules/` with glob patterns
- **Enterprise hierarchy** - Organization → Project → User levels
- **Memory system** - Press `#` for persistent instructions

**Best for:**
- Monorepos needing different rules per directory
- Projects wanting rich imported context
- Enterprise environments with org-wide standards

**File locations:**
```
./CLAUDE.md                 # Main config
./.claude/rules/*.md        # Path-targeted rules
./.claude/commands/*.md     # Custom slash commands
```

**FluxFrame integration:**
- Full: CLAUDE.md with @imports + .claude/rules/
- Basic: Symlink to AGENTS.md

---

### Roo Code

**Unique features:**
- **Custom modes** - Specialized AI personas (Code, Architect, Debug)
- **Tool restrictions** - Control what files AI can edit via regex
- **Mode-specific rules** - Different rules per mode
- **Model per mode** - Different AI models for different tasks
- **Auto-detects AGENTS.md** - No symlink needed

**Best for:**
- Projects needing different AI personas
- Security-conscious projects (restrict edits)
- Teams wanting mode-based workflows

**File locations:**
```
./AGENTS.md                 # Auto-detected baseline
./.roomodes                 # Mode definitions
./.roo/rules/               # All-mode rules
./.roo/rules-code/          # Code mode only
./.roo/rules-architect/     # Architect mode only
```

**FluxFrame integration:**
- Full: .roomodes + .roo/rules*/ directories
- Basic: AGENTS.md auto-detected (no setup needed)

---

### Cline

**Unique features:**
- **Folder mode** - Modular rules in `.clinerules/` directory
- **Rule toggle UI** - Enable/disable rules visually
- **Rule banks** - Collections of rules for different contexts
- **MCP support** - Tool integration via Model Context Protocol

**Best for:**
- Projects with many context-dependent rules
- Workflows requiring frequent rule switching
- Visual rule management preference

**File locations:**
```
./.clinerules              # File mode (single file)
./.clinerules/             # Folder mode (directory)
./.clinerules-bank/        # Optional rule collections
```

**FluxFrame integration:**
- Full: .clinerules/ folder with modular rules
- Basic: Symlink to AGENTS.md

---

### Antigravity

**Unique features:**
- **Workflows** - Automated task sequences
- **Global config** - User-level preferences in ~/.gemini/

**Best for:**
- Google ecosystem users
- Projects using workflow automation
- Simple configuration needs

**File locations:**
```
./GEMINI.md                 # Project config
~/.gemini/GEMINI.md         # Global user config
./.antigravity/workflows/   # Workflow definitions
```

**FluxFrame integration:**
- Full: Dedicated GEMINI.md
- Basic: Symlink to AGENTS.md

---

## When to Use Each Tool

### Choose Claude Code Full Integration When:
- You need path-specific rules for different code areas
- You want to import documentation into context
- You work in an enterprise with org-level standards
- Claude Code is your primary AI tool

### Choose Roo Code Full Integration When:
- You want different AI personas for different tasks
- You need to restrict what AI can edit (security)
- Different team members work in different modes
- You want to use different models per task type

### Choose Cline Full Integration When:
- You frequently switch between rule sets
- You prefer visual rule management
- You have many project-specific rules
- You want modular, organized rules

### Choose Basic Integration (Symlink) When:
- You use multiple AI tools interchangeably
- Maximum portability is important
- Your project doesn't need advanced features
- You want AGENTS.md as single source of truth

---

## File Location Reference

| Tool | Primary Config | Extensions |
|------|----------------|------------|
| AGENTS.md | `./AGENTS.md` | Nested AGENTS.md in subdirs |
| Claude Code | `./CLAUDE.md` | `.claude/rules/*.md` |
| Roo Code | `./AGENTS.md` (auto) | `.roomodes`, `.roo/rules*/` |
| Cline | `./.clinerules` or `./.clinerules/` | `.clinerules-bank/` |
| Antigravity | `./GEMINI.md` | `.antigravity/workflows/` |

---

## Mixing Tools

FluxFrame supports using multiple tools simultaneously:

```
your-project/
├── AGENTS.md                    # Universal baseline (required)
├── CLAUDE.md                    # Claude Code (full or symlink)
├── .claude/rules/               # Claude path rules (if full)
├── .roomodes                    # Roo Code modes (if full)
├── .roo/rules*/                 # Roo mode rules (if full)
├── .clinerules/                 # Cline folder (if full)
├── GEMINI.md                    # Antigravity (full or symlink)
└── ...
```

Common patterns:
- **One primary, others basic:** Full integration for main tool, symlinks for others
- **Specialized tools:** Roo for code/debug modes, Claude for architecture
- **Portable:** AGENTS.md only, symlinks for all tools
