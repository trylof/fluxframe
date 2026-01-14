# FluxFrame Bootstrap: MCP Setup Guide

**For complete beginners** - This guide walks you through setting up FluxFrame using an MCP (Model Context Protocol) server that ensures the bootstrap process is followed step-by-step without missing anything.

---

## What is MCP and Why Use It?

**The Problem:** FluxFrame's bootstrap process is complex with many steps. Following markdown instructions alone risks:
- Skipping steps accidentally
- Losing context mid-process
- No progress tracking if you stop and resume later

**The Solution:** An MCP server that:
- Tracks your progress automatically
- Tells the AI exactly what to do next
- Validates each step before moving on
- Persists state across sessions

Think of it as a "GPS for bootstrap" - it knows where you are and guides you to completion.

---

## Prerequisites

Before starting, you need:

1. **An AI Coding Assistant** - One of:
   - Claude Code (CLI)
   - Cline (VS Code extension)
   - Roo Code (VS Code extension)
   - Cursor (AI Editor)
   - Codex (OpenAI)
   - Kilo Code
   - Google Antigravity

2. **Node.js installed** (v18 or later)
   - Check: `node --version`
   - If not installed: [Download from nodejs.org](https://nodejs.org/)

3. **Your project directory**
   - Clone FluxFrame or have it in a directory
   - You'll bootstrap FROM this FluxFrame directory

---

## Step 1: Install MCP Dependencies

Navigate to the FluxFrame directory and install the MCP SDK:

```bash
cd /path/to/fluxframe
npm install
```

This installs the `@modelcontextprotocol/sdk` needed for the bootstrap MCP server.

---

## Step 2: Configure MCP Server in Your AI Assistant

Choose your AI assistant below:

### Option A: Claude Code (CLI)

1. **Locate Configuration**
   - **Project-local (Recommended):** `.mcp.json` in your project root.
   - **Global:** `~/.claude.json` in your home directory.

2. **Add the bootstrap MCP server:**
   
   **For `.mcp.json` (Create if doesn't exist):**
   ```json
   {
     "mcpServers": {
       "fluxframe-bootstrap": {
         "command": "node",
         "args": ["/ABSOLUTE/PATH/TO/fluxframe/mcp-server/bootstrap-mcp-server.js"],
         "cwd": "/ABSOLUTE/PATH/TO/YOUR/PROJECT"
       }
     }
   }
   ```
   
   **For `~/.claude.json`:**
   Add the specific server to the `mcpServers` object in your existing config. Do not overwrite other settings.

   **CRITICAL:** Replace:
   - `/ABSOLUTE/PATH/TO/fluxframe` → Your FluxFrame directory
   - `/ABSOLUTE/PATH/TO/YOUR/PROJECT` → The project you want to bootstrap

3. **Restart Claude Code**
   Run `/exit` and start `claude` again.

4. **Verify Setup:**
   In a new conversation, ask: "Do you have access to fluxframe-bootstrap MCP tools?"
   
   Claude should say "Yes" and list tools like `get_bootstrap_state`, `get_next_step`, etc.

---

### Option B: Cline (VS Code Extension)

1. **Open VS Code**

2. **Click Cline icon in sidebar** (or press Cmd+Shift+P / Ctrl+Shift+P and type "Cline")

3. **Click Settings (gear icon) in Cline sidebar**

4. **Scroll to "MCP Servers" section**

5. **Click "Edit Config"**

6. **Add the bootstrap server:**
   ```json
   {
     "mcpServers": {
       "fluxframe-bootstrap": {
         "command": "node",
         "args": ["/ABSOLUTE/PATH/TO/fluxframe/mcp-server/bootstrap-mcp-server.js"],
         "cwd": "/ABSOLUTE/PATH/TO/YOUR/PROJECT"
       }
     }
   }
   ```

   **Replace paths as shown in Claude Code section above**

7. **Save and restart VS Code**

8. **Verify:** Ask Cline: "List your available MCP tools"

---

### Option C: Roo Code (VS Code Extension)

1. **Open VS Code**

2. **Open Command Palette** (Cmd+Shift+P / Ctrl+Shift+P)

3. **Type: "Roo: Open MCP Settings"**

4. **Add the bootstrap server:**
   ```json
   {
     "mcpServers": {
       "fluxframe-bootstrap": {
         "command": "node",
         "args": ["/ABSOLUTE/PATH/TO/fluxframe/mcp-server/bootstrap-mcp-server.js"],
         "cwd": "/ABSOLUTE/PATH/TO/YOUR/PROJECT"
       }
     }
   }
   ```

5. **Reload window** (Cmd+Shift+P → "Developer: Reload Window")

### Option D: Codex (OpenAI)

1. **Edit Config File:** `~/.codex/config.toml`

2. **Add Server (TOML format):**
   ```toml
   [mcp_servers.fluxframe-bootstrap]
   command = "node"
   args = ["/ABSOLUTE/PATH/TO/fluxframe/mcp-server/bootstrap-mcp-server.js"]
   cwd = "/ABSOLUTE/PATH/TO/YOUR/PROJECT"
   ```

3. **Restart Codex**

---

### Option E: Kilo Code / Antigravity

**For Kilo Code:**
- Use project config: `.kilocode/mcp.json`
- Follow JSON format similar to Option A.

**For Antigravity:**
- Use IDE Store to manage MCP servers OR
- Edit `mcp.json` in your workspace.

### Option D: Other AI Assistants

If your AI assistant supports MCP:

1. **Find your assistant's MCP configuration file** (check documentation)

2. **Add this server configuration:**
   ```json
   {
     "mcpServers": {
       "fluxframe-bootstrap": {
         "command": "node",
         "args": ["/ABSOLUTE/PATH/TO/fluxframe/mcp-server/bootstrap-mcp-server.js"],
         "cwd": "/ABSOLUTE/PATH/TO/YOUR/PROJECT"
       }
     }
   }
   ```

3. **Restart your assistant**

---

## Step 3: Start Bootstrap Process

Once MCP server is configured:

1. **Open your AI assistant** (Claude Code, Cline, Roo Code, etc.)

2. **Navigate to YOUR PROJECT directory** (not FluxFrame directory)
   - The directory where you want to add FluxFrame
   - Can be a new or existing project

3. **Say to your AI:**
   ```
   I want to bootstrap FluxFrame for this project. 
   Use the fluxframe-bootstrap MCP server to guide the process.
   ```

4. **The AI will:**
   - Check it can access bootstrap tools
   - Get the current step (should be 0.1 - "Verify MCP Connection")
   - Explain what will happen
   - Guide you step-by-step

5. **Follow the AI's prompts!**
   - It will ask questions about your project
   - It will generate files
   - It will validate each step
   - It will track progress automatically

---

## Understanding the Bootstrap Process

The MCP server guides you through 7 phases:

```
Phase 0: Prerequisites & MCP Setup (2 steps)
  └─ Verify connection, explain process

Phase 1: Detection (3 steps)
  └─ Scan your project, classify scenario

Phase 2: Information Gathering (5 steps)
  └─ Project details, AI tools, infrastructure

Phase 3: File Generation (5 steps)
  └─ Create documentation, AI rules, MCP server

Phase 4: Validation (3 steps)
  └─ Verify files, test MCP server

Phase 5: Cleanup (3 steps)
  └─ Remove template files, update README

Phase 6: Handoff (3 steps)
  └─ Summary, configure project MCP, complete!

Total: 24 steps
```

**Progress is saved** in `.fluxframe-bootstrap-state.json` in your project.

---

## During Bootstrap: What You'll See

### AI Will Use These MCP Tools:

| Tool | Purpose | When Used |
|------|---------|-----------|
| `get_bootstrap_state` | Check progress | At session start, frequently |
| `get_next_step` | Get current step instructions | Every step |
| `complete_step` | Mark step done | After executing each step |
| `validate_step` | Check if step can be completed | Before marking complete |
| `update_bootstrap_info` | Save project information | As you answer questions |
| `get_workflow_overview` | See full process | At the start |

### Progress Tracking:

The AI will show you progress like:
```
✅ Phase 0: Prerequisites (100% - 2/2 steps)
✅ Phase 1: Detection (100% - 3/3 steps)
🏗️ Phase 2: Information Gathering (60% - 3/5 steps)
   ✅ 2.1 Project Basics
   ✅ 2.2 AI Tools Selection
   ✅ 2.3 Documentation Location
   ⏳ 2.4 Infrastructure Assessment ← YOU ARE HERE
   ⏹️ 2.5 Optional Features
```

---

## Resuming After Interruption

**Stopped mid-bootstrap?** No problem!

1. **Restart your AI assistant**

2. **Say:**
   ```
   I was bootstrapping FluxFrame and got interrupted. 
   Check the bootstrap state and continue from where I left off.
   ```

3. **AI will:**
   - Call `get_bootstrap_state`
   - See you were at step X.Y
   - Resume from there

The `.fluxframe-bootstrap-state.json` file persists your progress.

---

## Troubleshooting

### Problem: AI says "No MCP tools available"

**Solution:**
1. Check MCP config file has correct **absolute paths**
2. Verify `bootstrap-mcp-server.js` exists at that path
3. Restart AI assistant completely
4. Try: `which node` - ensure Node.js is in PATH

### Problem: AI can't access bootstrap tools

**Solution:**
```bash
# Test the MCP server manually
cd /path/to/your/project
node /path/to/fluxframe/mcp-server/bootstrap-mcp-server.js
```

Should print: "FluxFrame Bootstrap MCP Server running on stdio"

If error, check:
- Node.js version (`node --version` - need v18+)
- Dependencies installed (`npm install` in FluxFrame dir)

### Problem: Bootstrap state is corrupted

**Solution:**
```bash
# View current state
cat .fluxframe-bootstrap-state.json

# Reset if needed (ask AI to do this)
# AI: use reset_bootstrap tool with confirm: true
```

### Problem: Wrong project being bootstrapped

**Solution:**
Check `"cwd"` in MCP config points to YOUR PROJECT, not FluxFrame directory.

---

## After Bootstrap Complete

Once all 24 steps are done:

1. **Your project will have:**
   - `project_docs/` (or chosen location) with FluxFrame documentation
   - `AGENTS.md` and tool-specific AI rules
   - `mcp-server.js` - your project's MCP server
   - `package.json` updated with MCP dependency

2. **FluxFrame template files removed:**
   - `bootstrap/`, `ai-rules/`, `doc-templates/` all cleaned up
   - Only your project files remain

3. **Next step: Configure Project MCP**
   
   The AI will guide you to add YOUR PROJECT's MCP server to your assistant.
   
   Similar to bootstrap MCP setup, but now for ongoing development:
   ```json
   {
     "mcpServers": {
       "my-project": {
         "command": "node",
         "args": ["/path/to/your/project/mcp-server.js"]
       }
     }
   }
   ```

4. **Start developing!**
   
   Define Cycle 1.1 in `project_docs/ROADMAP.md` and begin using FluxFrame methodology.

---

## FAQ

**Q: Do I need to keep the bootstrap MCP server after completion?**

A: No! After bootstrap completes, you'll use your project's MCP server. The bootstrap server is only for setup.

**Q: Can I use this for multiple projects?**

A: Yes! Just change the `"cwd"` in the MCP config to point to each project you want to bootstrap.

**Q: What if I want to restart from scratch?**

A: Ask your AI: "Reset the bootstrap state". Or delete `.fluxframe-bootstrap-state.json`.

**Q: Is this required, or can I bootstrap manually?**

A: Optional but **highly recommended**. Manual bootstrap following markdown instructions is error-prone. The MCP approach ensures nothing is missed.

**Q: Does this work offline?**

A: The MCP server itself runs locally. But your AI assistant needs internet (Claude Code, etc. are online services).

---

## Example Bootstrap Session

Here's what a typical bootstrap looks like:

```
You: I want to bootstrap FluxFrame for this project

AI: Great! Let me check if I have access to the bootstrap MCP server...

    [Calls: get_bootstrap_state]
    
AI: ✅ Bootstrap tools available!
    
    Current progress: 0% (0/24 steps)
    Starting at: Phase 0, Step 0.1 - Verify MCP Connection
    
    I can confirm the bootstrap MCP server is working! 
    
    Here's what will happen:
    - Detect your existing setup (or new project)
    - Ask questions about your project
    - Generate FluxFrame documentation and AI rules
    - Clean up template files
    - Set up your project's MCP server
    
    This process has 24 steps across 7 phases, and I'll track progress
    automatically so we can resume if interrupted.
    
    Ready to proceed?

You: Yes, let's do it!

AI: [Completes step 0.1]
    [Calls: complete_step with stepId="0.1"]
    
    ✅ Step 0.1 complete!
    
    [Calls: get_next_step]
    
    Next: Step 0.2 - Explain Bootstrap Process
    
    Let me explain in detail...
    
    [Process continues...]
```

---

## Support

If you encounter issues:

1. **Check this guide** - most issues covered above
2. **Verify Node.js and npm** are installed and up-to-date
3. **Check MCP config** - absolute paths, correct project directory
4. **Look at `.fluxframe-bootstrap-state.json`** - shows current state
5. **Try manual MCP server test** - run the server directly

---

**Ready to bootstrap?** Follow Step 1-3 above and let the MCP server guide you!
