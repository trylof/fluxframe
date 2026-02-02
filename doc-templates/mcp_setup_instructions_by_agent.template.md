# MCP Setup Instructions by Agent

This file contains MCP setup instructions for each supported AI coding agent. During bootstrap, only the sections for agents selected by the user should be included in the project's `FLUXFRAME_MANUAL.md`.

---

## Template Usage

The `{{MCP_SETUP_FOR_AGENTS}}` placeholder in `fluxframe_manual.template.md` should be replaced with the relevant sections below based on the user's selected AI tools during bootstrap.

**Format for each agent:**
- H3 heading with agent name
- Configuration file location
- JSON/TOML configuration snippet with `{{PROJECT_PATH}}` placeholder
- Activation steps specific to that tool

---

## Claude Code (CLI)

### Claude Code

1. **Edit MCP configuration:**
   - **Project-local (Recommended):** `.mcp.json` in the project root
   - **Global:** `~/.claude.json` in your home directory

2. **Add the project MCP server:**

   ```json
   {
     "mcpServers": {
       "{{PROJECT_NAME}}": {
         "command": "node",
         "args": ["{{PROJECT_PATH}}/mcp-server.js"]
       }
     }
   }
   ```

3. **Activate:**
   - Run `/exit` to close Claude Code
   - Start `claude` again
   - The MCP tools will be available in new conversations

---

## Cline (VS Code Extension)

### Cline

1. **Open VS Code** with this project

2. **Click Cline icon** in the sidebar (or Cmd/Ctrl+Shift+P → "Cline")

3. **Click Settings (gear icon)** in the Cline sidebar

4. **Scroll to "MCP Servers"** and click **"Edit Config"**

5. **Add the project MCP server:**

   ```json
   {
     "mcpServers": {
       "{{PROJECT_NAME}}": {
         "command": "node",
         "args": ["{{PROJECT_PATH}}/mcp-server.js"]
       }
     }
   }
   ```

6. **Restart VS Code** (Cmd/Ctrl+Shift+P → "Developer: Reload Window")

---

## Roo Code (VS Code Extension)

### Roo Code

1. **Open VS Code** with this project

2. **Open Command Palette** (Cmd/Ctrl+Shift+P)

3. **Type:** "Roo: Open MCP Settings"

4. **Add the project MCP server:**

   ```json
   {
     "mcpServers": {
       "{{PROJECT_NAME}}": {
         "command": "node",
         "args": ["{{PROJECT_PATH}}/mcp-server.js"]
       }
     }
   }
   ```

5. **Reload VS Code** (Cmd/Ctrl+Shift+P → "Developer: Reload Window")

---

## Cursor

### Cursor

1. **Create or edit** `.cursor/mcp.json` in the project root

2. **Add the project MCP server:**

   ```json
   {
     "mcpServers": {
       "{{PROJECT_NAME}}": {
         "command": "node",
         "args": ["{{PROJECT_PATH}}/mcp-server.js"]
       }
     }
   }
   ```

3. **Restart Cursor** to activate

---

## Kilo Code

### Kilo Code

1. **Create or edit** `.kilocode/mcp.json` in the project root

2. **Add the project MCP server:**

   ```json
   {
     "mcpServers": {
       "{{PROJECT_NAME}}": {
         "command": "node",
         "args": ["{{PROJECT_PATH}}/mcp-server.js"]
       }
     }
   }
   ```

3. **Activate:**
   - Press Cmd/Ctrl+Shift+P
   - Type "Reload Window" and select it

---

## Antigravity (Gemini)

### Antigravity

> **Important:** Antigravity only supports global MCP configuration, not project-local configs.

1. **Open MCP config:**
   - In Antigravity, click Agent panel → "..." → MCP Servers → "View raw config"
   - Or edit directly: `~/.gemini/antigravity/mcp_config.json`

2. **Add the project MCP server:**

   ```json
   {
     "mcpServers": {
       "{{PROJECT_NAME}}": {
         "command": "node",
         "args": ["{{PROJECT_PATH}}/mcp-server.js"]
       }
     }
   }
   ```

3. **Activate (Critical!):**
   - In the "Manage MCP Servers" panel, click **"Refresh"**
   - **Start a new conversation** - MCP tools won't appear in existing conversations

---

## Codex (OpenAI)

### Codex

1. **Edit config file:** `~/.codex/config.toml`

2. **Add the project MCP server (TOML format):**

   ```toml
   [mcp_servers.{{PROJECT_NAME_SAFE}}]
   command = "node"
   args = ["{{PROJECT_PATH}}/mcp-server.js"]
   ```

3. **Restart Codex** to activate

---

## GitHub Copilot

### GitHub Copilot

> **Note:** GitHub Copilot has limited MCP support. Basic agent instructions are available via `AGENTS.md`.

Currently, GitHub Copilot primarily uses `AGENTS.md` for instructions. MCP integration is evolving - check GitHub Copilot documentation for the latest MCP configuration options.

---

## Notes for Bootstrap AI

When generating the `{{MCP_SETUP_FOR_AGENTS}}` content:

1. **Include only selected agents** - Don't include instructions for agents the user didn't select
2. **Replace placeholders:**
   - `{{PROJECT_NAME}}` → The actual project name (sanitized for JSON keys)
   - `{{PROJECT_NAME_SAFE}}` → Project name safe for TOML keys (no spaces/special chars)
   - `{{PROJECT_PATH}}` → Absolute path to the project root
3. **Maintain consistent formatting** with the rest of the manual
4. **Add a note** if only one agent is configured, indicating that only that tool's instructions are shown
