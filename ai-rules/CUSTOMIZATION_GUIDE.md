# FluxFrame AI Rules Customization Guide

## Overview

FluxFrame uses a modular, layered AI rules architecture centered around `AGENTS.md`. This guide explains how to customize these rules for your project's specific needs.

## Architecture Recap

1.  **AGENTS.md (The Core):** Universal baseline containing high-level methodology.
2.  **Tool-Specific Configs (The Extensions):** `CLAUDE.md`, `.roomodes`, `.clinerules/`, etc. These extend the core with unique tool features.
3.  **Path-Targeted Rules:** Rules that apply only to specific directories (Claude Code) or specialized tasks (Roo Code modes).

---

## Customizing the Core (AGENTS.md)

### 1. Placeholder Values
During bootstrap, most values are automatically filled. If you need to update them later:
- Edit `AGENTS.md` directly.
- Update tech stack, directory structure, or commands.

### 2. Modifying Principles
If your team diverges from standard FluxFrame methodology (e.g., different documentation requirements), update the relevant sections in `AGENTS.md`.

---

## Customizing Tool-Specific Configs

### Claude Code (`CLAUDE.md`)
- **Add Imports:** Use `@path/to/doc.md` to bring more context into the session.
- **Path Rules:** Edit `.claude/rules/*.md` to add domain-specific rules for particular folders.
- **Slash Commands:** Add custom logic to `.claude/commands/`.

### Roo Code (`.roomodes`)
- **Permission Management:** Adjust `fileRegex` patterns to restrict what the AI can edit.
- **Persona Tweaks:** Update `customInstructions` for each mode (Code, Architect, Debug) to better fit your team's style.
- **New Modes:** Add additional modes by following the YAML structure.

### Cline (`.clinerules/`)
- **Modularization:** Add new `.md` files to the `.clinerules/` directory for specific subsystems.
- **Ordering:** Use numeric prefixes (e.g., `04-custom.md`) to control loading order.

---

## Best Practices for Customization

1.  **Follow the Single Source of Truth:** Keep high-level logic in `AGENTS.md`. don't duplicate it in tool-specific files.
2.  **Use Symlinks for Portability:** If you don't need tool-specific features, symlink `CLAUDE.md`, `GEMINI.md`, etc., to `AGENTS.md`.
3.  **Document Custom Patterns:** When you establish a new project-specific coding pattern, add it to `project_docs/patterns/` and reference it in your AI rules.
4.  **Validate Changes:** After modifying rules, restart your AI session and verify the new behavior.

## See Also
- `ai-rules/FEATURE_MATRIX.md` - Compare tool capabilities.
- `ai-rules/README.md` - High-level architecture overview.
```
