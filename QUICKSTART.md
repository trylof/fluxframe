# FluxFrame Quick Start

**Get FluxFrame running in your project in under 5 minutes.**

---

## What You'll Get

FluxFrame gives you:
- 📚 **Structured documentation** that AI assistants can read and follow
- 🤖 **AI rules** tailored to your project and chosen AI tools
- 🔄 **Development workflows** for systematic feature building and bug fixing
- 📖 **Pattern library** to capture and reuse solutions
- 🔌 **MCP server** so AI assistants have context about your project

---

## Prerequisites

✅ **Node.js 18+** - Check with `node --version`  
✅ **An AI coding assistant** - Claude Code, Cline, Roo Code, or Antigravity  
✅ **5 minutes** to set up

---

## Step 1: Get FluxFrame

```bash
# Clone the repository
git clone https://github.com/trylof/fluxframe.git
cd fluxframe

# Install dependencies
npm install
```

---

## Step 2: Choose Your Bootstrap Method

### 🌟 Recommended: MCP-Guided Bootstrap

**Best for:** Everyone, especially beginners

**Why?**
- Tracks progress automatically
- Can't skip steps
- Resume anytime
- AI knows exactly what to do next

**How:**
1. Follow **`bootstrap/MCP_SETUP_GUIDE.md`**
2. Configure the bootstrap MCP server (2 minutes)
3. Tell your AI: "Bootstrap FluxFrame using the MCP server"
4. Answer questions and let it guide you

### 📝 Alternative: Manual Bootstrap

**For:** Advanced users or if MCP isn't available

**How:**
1. Read **`BOOTSTRAP_INSTRUCTIONS.md`**
2. AI follows the workflow manually
3. More risk of skipping steps

---

## Step 3: Bootstrap Your Project

### With MCP (Recommended)

```bash
# Open your AI assistant (Claude Code, Cline, etc.)
# Navigate to YOUR project directory
cd /path/to/your/project

# Say to AI:
"I want to bootstrap FluxFrame for this project.
Use the fluxframe-bootstrap MCP server to guide the process."
```

### Manual (Alternative)

```bash
# Open your AI assistant
# Navigate to YOUR project directory
cd /path/to/your/project

# Say to AI:
"Read the FluxFrame BOOTSTRAP_INSTRUCTIONS.md and bootstrap this project.
Follow the detection → information gathering → generation → validation workflow."
```

---

## Step 4: Answer Questions

The AI will ask about:

- **Project basics** - Name, purpose, tech stack
- **AI tools** - Which assistants you use (Claude Code, Cline, etc.)
- **Documentation** - Where to put docs (default: `project_docs/`)
- **Infrastructure** - What environments you have (dev, staging, prod)
- **Optional features** - Browser automation, log access

Just answer what you know. Defaults are sensible.

---

## Step 5: Review Generated Files

After bootstrap completes, you'll have:

```
your-project/
├── project_docs/              ← Your documentation
│   ├── context_master_guide.md
│   ├── technical_status.md
│   ├── implementation_plan.md
│   ├── patterns/
│   └── workflows/
├── AGENTS.md                  ← Universal AI rules
├── .clinerules/              ← Tool-specific rules (if Cline)
├── mcp-server.js             ← Your project's MCP server
└── package.json              ← Updated with MCP dependency
```

**FluxFrame templates cleaned up automatically!**

---

## Step 6: Configure Your Project's MCP Server

After bootstrap, set up your **project's MCP server** (different from bootstrap server):

```json
// In your AI assistant's MCP config
{
  "mcpServers": {
    "my-project": {
      "command": "node",
      "args": ["/absolute/path/to/your/project/mcp-server.js"]
    }
  }
}
```

Restart your AI assistant.

---

## Step 7: Start Developing!

### Define Your First Cycle

Edit `project_docs/implementation_plan.md`:

```markdown
### Cycle 1.1: [Your First Feature]

**Purpose:** [What you're building]
**Output:** [What users will see]
**Timeline:** [Estimate]

**Success Criteria:**
- [ ] Feature works as described
- [ ] Tests pass
- [ ] Documentation updated
```

### Start Working

Tell your AI:
```
Let's implement Cycle 1.1. 
Check the context_master_guide.md and follow the development workflow.
```

The AI will:
1. Check the cycle definition
2. Read relevant patterns
3. Implement with proper testing
4. Update documentation
5. Mark the cycle complete

---

## What's Next?

### Learn the FluxFrame Way

- **Development Cycles** - Sequential iterations (not sprints)
- **Pattern-Driven** - Check patterns before implementing
- **Documentation-First** - Update docs as you build
- **Change Protocol** - Systematic approach to bug fixes

### Key Files to Know

| File | Purpose |
|------|---------|
| `context_master_guide.md` | Single source of truth |
| `technical_status.md` | Current project state |
| `implementation_plan.md` | Roadmap & cycles |
| `workflows/cycle_workflow.md` | How to work on features |
| `workflows/change_request_protocol.md` | How to fix bugs |
| `patterns/` | Reusable solutions |

### Using with Your AI

**Before starting work:**
```
Check context_master_guide.md and show me the current cycle.
```

**Starting a feature:**
```
Implement Cycle X.Y following the development workflow.
```

**Fixing a bug:**
```
Follow the change request protocol to fix [bug description].
```

**Adding a pattern:**
```
Document this solution as a pattern in patterns/
```

---

## Troubleshooting

### "AI can't find bootstrap tools"

**Check:**
1. MCP config has correct **absolute paths**
2. Node.js is in your PATH: `which node`
3. Dependencies installed: `npm install` in fluxframe directory
4. AI assistant restarted after config change

**Test manually:**
```bash
node /path/to/fluxframe/mcp-server/bootstrap-mcp-server.js
```
Should print: "FluxFrame Bootstrap MCP Server running on stdio"

### "Bootstrap got interrupted"

**Resume:**
```
Check the bootstrap state and continue from where I left off.
```

Progress is saved in `.fluxframe-bootstrap-state.json`

### "AI asks questions already answered"

**Manual bootstrap issue** - This happens without MCP state management.

**Solution:** Switch to MCP-guided approach or be patient and answer again.

### "Generated files have placeholders"

**Incomplete bootstrap** - Some steps were skipped.

**Solution:**
1. Check which files have `{{PLACEHOLDERS}}`
2. Ask AI to fill them based on project info
3. Or reset and restart: Delete `.fluxframe-bootstrap-state.json` and rerun

---

## Examples

### Example 1: New React + FastAPI Project

```
You: Bootstrap FluxFrame for this project (MCP approach)

AI: [Detects: No existing AI rules or docs - GREENFIELD scenario]
    
    What's your project name?

You: TaskFlow Pro

AI: What's the purpose?

You: Task management SaaS for teams

AI: Tech stack?

You: React, TypeScript, FastAPI, PostgreSQL

AI: [Generates complete FluxFrame setup]
    [Creates AGENTS.md, project_docs/, mcp-server.js]
    [Cleans up templates]
    
    ✅ Bootstrap complete! Your project is ready.
```

### Example 2: Existing Project with .clinerules

```
You: Bootstrap FluxFrame (MCP approach)

AI: [Detects: Existing .clinerules - SIMILAR_WORKFLOW scenario]
    
    I found existing Cline rules. Comparing with FluxFrame...
    
    Difference 1: You have project-specific rules I don't have
    Options: Keep yours / Use FluxFrame / Merge
    
You: Merge

AI: [Merges rules, adds missing FluxFrame components]
    [Preserves your customizations]
    [Creates backup in .fluxframe-backup/]
    
    ✅ Upgrade complete! Your setup enhanced with FluxFrame.
```

---

## Get Help

- **MCP Setup Issues:** See `bootstrap/MCP_SETUP_GUIDE.md`
- **Bootstrap Process:** See `BOOTSTRAP_INSTRUCTIONS.md`
- **Philosophy:** See `PHILOSOPHY.md`
- **General Questions:** Ask your AI assistant to read the docs!

---

## Summary

1. ✅ Clone FluxFrame, run `npm install`
2. ✅ Follow `bootstrap/MCP_SETUP_GUIDE.md` to configure MCP server
3. ✅ Tell AI: "Bootstrap FluxFrame using MCP server"
4. ✅ Answer questions about your project
5. ✅ Configure your project's MCP server
6. ✅ Define Cycle 1.1 and start building!

**Time:** ~5 minutes for setup + questions

**Ready?** → Start with `bootstrap/MCP_SETUP_GUIDE.md`
