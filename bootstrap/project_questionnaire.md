# Project Questionnaire for Bootstrap

**Purpose:** This document guides AI assistants in gathering necessary information to bootstrap FluxFrame, adapted for each scenario type.

**When to use:** After detection phase, during information gathering for the appropriate workflow.

**Key Principle:** Detection-first, then ask only what's missing. Questions vary by scenario:
- **GREENFIELD:** Full questionnaire (what's not detected)
- **SIMILAR_WORKFLOW:** Focused on upgrade preferences
- **MIGRATION:** Focused on import/migration preferences

**Important:** Only ask questions for information NOT already detected or provided by the user.

---

## AI Coding Tools Selection

**Ask early in the process:**
```
Which AI coding tools will you use with this project? (Select all that apply)

1. **Claude Code** (Anthropic's CLI tool)
2. **Roo Code** (VS Code extension with modes)
3. **Cline** (VS Code extension)
4. **Google Antigravity**
5. **Cursor / GitHub Copilot / Other** (Uses universal AGENTS.md)
```

### Integration Level Selection

**For each selected tool, choose integration level:**

**Claude Code:**
- **Full integration** (CLAUDE.md with imports + .claude/rules/)
- **Basic** (Symlink to AGENTS.md)
- **Skip**

**Roo Code:**
- **Full integration** (.roomodes + .roo/rules/ directories)
- **Basic** (AGENTS.md auto-detected, no custom modes)
- **Skip**

**Cline:**
- **Full integration** (.clinerules/ folder with rule organization)
- **Basic** (Symlink to AGENTS.md)
- **Skip**

**Antigravity:**
- **Full integration** (GEMINI.md with methodology)
- **Basic** (Symlink to AGENTS.md)
- **Skip**

**Note:** AGENTS.md is always generated as the universal baseline.

---

## Browser Automation & Live Testing

**Ask early for web projects:**

```
Does your AI assistant need to interact with a browser for testing, debugging, or automation?

Browser automation enables the AI to:
- **Live debugging** - Read console errors/logs and fix code
- **Visual verification** - Check UI renders correctly
- **Web app testing** - Test forms, flows, interactions
- **Authenticated access** - Work with apps you're logged into
- **Data extraction** - Scrape/read structured data from pages
- **Task automation** - Fill forms, navigate workflows
- **Session recording** - Create GIF demos of interactions

Would you like browser automation? (yes/no/need more info)
```

### Browser Automation by Tool

**If user wants browser automation, explain capabilities per tool:**

**Claude Code (Chrome Integration - Beta):**
```
Claude Code has native Chrome integration (requires --chrome flag):

Prerequisites:
- Google Chrome browser
- Claude in Chrome extension (v1.0.36+)
- Claude Code CLI (v2.0.73+)
- Paid Claude plan (Pro/Team/Enterprise)

Capabilities:
✅ Navigate pages, click, type, scroll
✅ Read console logs and errors
✅ Interact with authenticated web apps
✅ Record GIFs of interactions
✅ Chain browser + terminal workflows

Limitations:
⚠️ Chrome only (not Brave/Arc/other Chromium)
⚠️ WSL not supported
⚠️ Requires visible browser window (no headless)
⚠️ Modal dialogs (alerts) require manual dismissal

Setup:
1. Run: claude --chrome
2. Use /chrome command to verify connection
3. Enable by default via /chrome menu (increases context usage)

Do you want Chrome integration for Claude Code? (yes/no/default-on)
```

**Cline/Roo Code (Puppeteer Browser):**
```
Cline and Roo Code use Puppeteer for browser automation:

Capabilities:
✅ Launch browser at URL
✅ Click at coordinates
✅ Type text
✅ Scroll pages
✅ Take screenshots
✅ Read console logs

Limitations:
⚠️ Headless browser (separate from your logged-in session)
⚠️ Cannot access authenticated sites (no shared login state)
⚠️ Click requires coordinate calculation from screenshots
⚠️ One browser action per turn (must wait for screenshot)

Best for:
- Testing local development servers
- Verifying UI rendering
- Automated screenshot capture
- Non-authenticated page interactions

Do you want Puppeteer browser actions? (yes/no)
```

**Cursor:**
```
Cursor's browser capabilities are evolving rapidly.

Known capabilities (verify current):
- May have Composer Agent browser features
- Can generate Playwright/Cypress test code
- Some versions support webpage preview

⚠️ This is a fast-moving area - capabilities change frequently.

Shall I research Cursor's current browser features? (yes/skip)
```

**OpenAI Codex / ChatGPT:**
```
OpenAI tools' browser capabilities:

ChatGPT:
- Web browsing plugin (for research, not automation)
- Code interpreter can generate test code
- No direct browser control

Codex:
- Primarily code generation
- Can write Playwright/Cypress tests
- No direct browser automation

Shall I research current OpenAI browser capabilities? (yes/skip)
```

**Google Antigravity / Gemini:**
```
Google's AI browser capabilities are evolving rapidly.

Antigravity/Gemini may support:
- Web actions through Google AI extensions
- Integration with Chrome via Gemini
- Agentic browsing capabilities

⚠️ This area changes frequently - Google announces new features regularly.

Shall I research current Gemini/Antigravity browser features? (yes/skip)
```

### ⚠️ IMPORTANT: Research Step for Emerging Capabilities

**This is a rapidly evolving field.** Before finalizing browser automation setup:

```
Browser automation capabilities change frequently. Shall I research the latest 
capabilities for your selected tools before we finalize setup?

This will help ensure you get the most current features available.

Research options:
1. **Yes, research all selected tools** - I'll check latest docs/announcements
2. **Research specific tools only** - Specify which ones
3. **Skip research** - Use documented capabilities (may be outdated)

Your choice (1-3):
```

**If user chooses research (recommended):**

The AI assistant should:
1. Search for latest documentation for each selected tool
2. Check for recent feature announcements (last 3-6 months)
3. Look for community reports of new browser capabilities
4. Report findings before finalizing configuration

**Research Sources by Tool:**

| Tool | Primary Source | Secondary Sources |
|------|----------------|-------------------|
| Claude Code | code.claude.com/docs | Anthropic blog, changelog |
| Cursor | cursor.com/docs | Reddit r/cursor, changelog |
| Cline | Cline GitHub releases | VS Code marketplace |
| Roo Code | Roo-cline GitHub | VS Code marketplace |
| Antigravity | Google AI documentation | Google I/O announcements |
| OpenAI | platform.openai.com | OpenAI blog, Twitter |

**Research Output Format:**

```markdown
## Browser Capabilities Research Results

**Research Date:** [DATE]
**Tools Researched:** [LIST]

### [Tool Name]
**Current Browser Capabilities:**
- [Capability 1]
- [Capability 2]

**Recent Changes (last 6 months):**
- [Change 1 with date]
- [Change 2 with date]

**Setup Requirements:**
- [Requirement 1]
- [Requirement 2]

**Recommendation:** [Enable/Disable/Conditional]

---

### Summary
Based on research, recommended browser automation setup:
- [Tool 1]: [Config]
- [Tool 2]: [Config]

Proceed with these settings? (yes/modify)
```

### Browser Automation Level Selection

**Based on tool selection and user preference:**

```
Choose your browser automation approach:

1. **Full Integration** - Enable for all supported tools
   - Claude Code: --chrome flag, Chrome extension
   - Cline/Roo: Puppeteer enabled
   
2. **Claude Code Only** - Use Chrome integration
   - Requires Chrome + extension setup
   - Best for authenticated testing
   
3. **Puppeteer Only** - Use headless browser
   - Works with Cline/Roo Code
   - Best for local dev testing
   
4. **None** - Disable browser automation
   - AI describes expected behavior
   - Manual testing required

Your choice (1-4):
```

### Browser Automation Configuration

**If user chooses options 1-3:**

```
Browser testing preferences:

1. **Primary testing URL:**
   - localhost:3000 (default for dev servers)
   - localhost:8000 (Python/FastAPI default)
   - Custom URL: _______________

2. **Default browser window size:**
   - 900x600 (Puppeteer default)
   - 1280x720 (HD)
   - 1920x1080 (Full HD)
   - Custom: _______________

3. **Auto-launch behavior:**
   - Ask before launching browser
   - Auto-launch for testing tasks
   - Never auto-launch

4. **Screenshot storage:**
   - Don't save (view only)
   - Save to project_docs/screenshots/
   - Save to tests/screenshots/
   - Custom path: _______________
```

### Browser Automation Impact

**How this affects generated files:**

| Choice | Generated Config | Notes |
|--------|------------------|-------|
| Claude Chrome | CLAUDE.md: Chrome section | Instructions for --chrome setup |
| Puppeteer | AGENTS.md: Browser section | Puppeteer usage patterns |
| Full | Both above | Multi-tool browser support |
| None | Testing section | Manual testing instructions |

---

## Question Flow Strategy

**Step 1: Analyze What You Already Have**

Before asking ANY questions, review what the user provided:
- Project name mentioned? ✅ Don't ask
- Technology stack listed? ✅ Don't ask  
- Purpose described? ✅ Don't ask

**Step 2: Identify Gaps**

Only ask about missing critical information.

**Step 3: Ask Minimum Necessary Questions**

Group related questions. Ask 2-4 questions maximum.

---

## Core Questions (Ask ONLY if not provided)

### Q1: Project Identity

**Ask if missing:**
```
What is your project called?
```

**Good answers:**
- "TaskFlow Pro"
- "Acme Inventory System"
- "Personal Blog Platform"

**Bad answers:**
- "My project" (too vague)
- "App" (too generic)

**If bad answer:** Ask for a more specific name that will be used in code, docs, and conversations.

---

### Q2: Project Purpose

**Ask if missing:**
```
What does [PROJECT_NAME] do? (Describe in 1-2 sentences)
```

**Good answers:**
- "A task management platform for distributed teams with AI-powered prioritization"
- "Inventory tracking system for retail stores with real-time stock alerts"
- "Personal blogging platform with markdown support and analytics"

**Bad answers:**
- "It's a web app" (what does it DO?)
- "Helps businesses" (too vague)

**If bad answer:** Ask for more specifics about what users will accomplish with it.

---

### Q3: Technology Stack

**Ask if missing:**
```
What's your technology stack?

For example:
- Frontend: React, Vue, Angular, Next.js, none
- Backend: FastAPI, Django, Express, Rails, none
- Database: PostgreSQL, MongoDB, MySQL, none
- Other: List any other key technologies
```

**Good answers:**
- "React frontend, FastAPI backend, PostgreSQL database"
- "Next.js full-stack with Supabase"
- "Python CLI tool, no web interface"

**Bad answers:**
- "Modern stack" (which one?)
- "JavaScript" (be more specific)

**If bad answer:** Ask for specific frameworks/libraries, not just languages.

---

### Q4: Architecture Type

**Ask if missing:**
```
What's your architecture?

1. **Monolith** - Single application
2. **Frontend + Backend** - Separate client/server
3. **Microservices** - Multiple services
4. **Serverless** - Cloud functions
5. **CLI Tool** - Command-line only
6. **Library** - Code package
7. **Other** - Describe
```

**Most common:** Frontend + Backend

**If unclear from tech stack:** Ask this question

---

## Framework-Specific Questions (ALWAYS ASK)

### Q5: API Contract Approach (if has API/backend)

**ALWAYS ask this if project has backend:**
```
How will your API contracts be defined?

1. **OpenAPI + Pydantic + Auto-Generated TypeScript** (Recommended for FastAPI/Flask + React/Vue)
   - Backend: Pydantic models define responses
   - Frontend: Auto-generated TypeScript types
   - Contract-first development
   
2. **GraphQL with Typed Schema** (Recommended for GraphQL APIs)
   - Schema as contract
   - Built-in type safety
   
3. **JSON Schema + Manual Types** (Minimal approach)
   - Define schemas for responses
   - Manual type definitions
   
4. **Custom Approach**
   - Requires documentation of your standard
   - Must define validation approach

Which approach fits your project?
```

**For CLI/Library projects:** Skip this question

**If user unsure:** Recommend option matching their stack:
- FastAPI → OpenAPI
- Node.js/Express → OpenAPI or JSON Schema
- GraphQL server → GraphQL
- Other → Ask about their preference

---

### Q6: Documentation Directory

**Ask:**
```
Where should project documentation live?

1. **Standard:** `project_docs/` at repository root (recommended)
2. **Docs:** `docs/` at repository root
3. **Custom:** Specify your preferred path

Choose option (1-3):
```

**Most users pick:** Option 1 (project_docs/)

**If user has existing docs:** Ask how to integrate:
```
I see you have existing docs in [location]. Should I:
1. Create project_docs/ alongside existing docs
2. Use [existing location] for framework docs
3. Merge framework into existing structure
```

---

### Q7: Project Type (Strictness Level)

**Ask:**
```
Is this a production-ready project or a prototype?

1. **Production-Ready (Standard)** - Strict API contracts, full testing, no shortcuts.
2. **Prototype / MVP** - Speed over strictness. Direct fetch calls allowed.

Choose option (1-2):
```

**Default:** Option 1 (Production-Ready)

**Impact:**
- **Production:** Enforces "NO direct fetch calls", "Contract-first always"
- **Prototype:** Allows "Direct fetch calls", "Contract-first recommended but optional"

---

---

## Infrastructure & Environment Strategy (ALWAYS ASK)

### Q8: Environment Map

**Ask:**
```
Which environments do you require for this project, and what is their current status?

1. **Development / Localhost** (Essential for coding)
   - Status: [Ready / Needs Setup]
   - Hosting: [e.g., Local Mac/PC, Docker, Dev Container]

2. **Testing / CI** (For automated PR checks)
   - Status: [Ready / Needs Setup / Not Required]
   - Platform: [e.g., GitHub Actions, GitLab CI]

3. **Staging / Preview** (For stakeholder review)
   - Status: [Ready / Needs Setup / Not Required]
   - Platform: [e.g., Vercel Previews, Heroku Staging, AWS Amplify]

4. **Production** (The live system)
   - Status: [Ready / Needs Setup]
   - Platform: [e.g., AWS, GCP, Azure, Vercel, Railway]
```

### Q9: Configuration & Secrets Management

**Ask:**
```
How will you manage environment-specific configurations and secrets?

1. **Local .env files** (Standard for most projects)
2. **Secret Manager** (Vault, AWS Secrets Manager, Doppler)
3. **SOPS / Encrypted files in Git**
4. **Platform-native env variables** (Vercel/Heroku dashboard)
```

### Q10: Infrastructure as Code (IaC)

**Ask:**
```
Do you plan to use Infrastructure as Code to manage these environments?

1. **Manual / Dashboard-managed** (Best for simple projects)
2. **Terraform / OpenTofu**
3. **Pulumi**
4. **Cloud-specific** (CloudFormation, CDK, Bicep)
```

**Impact of Infrastructure Questions:**
- **Status "Needs Setup":** Automatically adds Environment Setup cycles to your initial `implementation_plan.md`.
- **Infrastructure Section:** Populates the dedicated Infrastructure docs in your master guide.
- **Patterns:** Triggers the creation of infrastructure/deployment patterns.

---

## Observability & Log Access (ALWAYS ASK)

### Q11: AI Assistant Log Access

**Ask:**
```
Would you like your AI coding assistant to have access to logs from your 
environments for debugging and troubleshooting?

**What this enables:**
- AI reads error logs to diagnose issues directly
- AI checks CI/CD failures without you copy-pasting output
- AI queries slow database queries and connection issues
- AI monitors application health across environments

**Examples of how this helps:**
- "Check the production logs for that 500 error"
- "What caused the last CI build to fail?"
- "Find any slow queries in the last hour"
- "What's in the container logs for the API service?"

**Pros:**
✅ Faster debugging (AI can see actual errors, stack traces)
✅ Reduced context switching (no copy-pasting logs)
✅ AI can correlate errors across services
✅ Works across all environments you configure

**Cons / Considerations:**
⚠️ Requires credential setup for each log source
⚠️ May have security implications (AI accessing prod logs)
⚠️ Some platforms may need API keys / service accounts
⚠️ Not all log sources have easy programmatic access

**Prerequisites (depends on your setup):**
- CLI tools for your platform (aws cli, gcloud, gh cli, docker, etc.)
- API keys or credentials for log services (Datadog, Splunk, etc.)
- Network access to log sources

**Options:**
1. **Yes, full setup** - Configure all available log sources
2. **Yes, local only** - Just local dev logs (Docker, file tails - quickest)
3. **Later** - Skip now, can add during any development cycle
4. **No** - AI will guide manual log checking instead

Your choice (1-4):
```

### Q11-Follow-up: Log Source Selection (If user chose option 1 or 3)

**Only ask if user chose option 1 (full setup):**

```
Based on your infrastructure setup (from Q8-Q10), here are your potential log sources:

**Environments:**
| Environment | Platform | Potential Log Access |
|-------------|----------|---------------------|
| Development | {{DEV_PLATFORM}} | [To be researched/configured] |
| Testing/CI | {{TEST_PLATFORM}} | [To be researched/configured] |
| Staging | {{STAGING_PLATFORM}} | [To be researched/configured] |
| Production | {{PROD_PLATFORM}} | [To be researched/configured] |

**Additional Log Sources:**
| Source Type | Your Setup | Potential Access |
|-------------|------------|-----------------|
| CI/CD Pipeline | {{CICD_PLATFORM}} | [To be researched/configured] |
| Database | {{DATABASE_TECHNOLOGY}} | [To be researched/configured] |
| Monitoring/APM | {{MONITORING_SETUP}} | [To be researched/configured] |

Which log sources would you like to configure?
1. **All available** - Research & configure everything above
2. **Select specific** - Choose which sources to include
3. **Start minimal** - Begin with easiest setup, expand later

Your choice (1-3):
```

**If user chose "Select specific" (option 2):**
Present a checklist of all environments/sources from their Q8-Q10 answers.

### Q11-Research: Log Access Research (If user wants configuration)

**Ask:**
```
Log access capabilities vary by platform and evolve frequently.

Would you like me to research the current best practices for your specific setup?

**What I'll research:**
- CLI tools available for your platforms
- MCP integrations (community or official)
- API access requirements and setup steps
- Security best practices

**Your platforms to research:**
- {{PROD_PLATFORM}} (Production hosting)
- {{CICD_PLATFORM}} (CI/CD)
- {{DATABASE_TECHNOLOGY}} (Database)
- {{MONITORING_SETUP}} (Monitoring, if configured)

Options:
1. **Yes, research now** - I'll look up current options before configuring
2. **Skip research** - Use standard approaches, configure manually if needed
3. **Defer** - Document what we have, research later

Your choice (1-3):
```

**Impact of Log Access Questions:**
- **Option 1 (Full setup):** Creates `log_access_setup.md`, adds MCP tools configuration, researches platform-specific access methods
- **Option 2 (Local only):** Configures basic local log access (Docker logs, file tails)
- **Option 3 (Later):** Documents the opportunity in implementation_plan.md for future cycle
- **Option 4 (No):** No log access configuration, AI provides manual checking guidance

---

## Optional Questions (Ask only if relevant)

### Q12: Key Features (if not provided)

**Ask if:**
- User gave minimal description
- Need to understand scope
- Planning implementation cycles

**Question:**
```
What are the 3-5 key features you plan to build?

For example:
- User authentication
- Task creation and management  
- Team collaboration
- Real-time notifications
- Analytics dashboard
```

**Use answers for:** Populating initial implementation_plan.md with cycle ideas

---

### Q13: Team Size

**Usually DON'T ask** - Framework works for any size

**Ask only if:**
- User mentioned team dynamics
- Affects documentation depth

**Question:**
```
How many developers will work on this?

1. Solo project
2. Small team (2-5 people)
3. Medium team (6-20 people)
4. Large team (20+ people)
```

**Use for:** Determining documentation detail level

---

## Question Combination Examples

### Example 1: Rich Project Description Provided

**User says:**
"I'm building TaskFlow Pro, a task management SaaS with React frontend and FastAPI backend using PostgreSQL. It'll help teams track tasks, collaborate, and get AI insights."

**You have:**
✅ Name: TaskFlow Pro
✅ Purpose: Task management SaaS
✅ Stack: React, FastAPI, PostgreSQL
✅ Architecture: Frontend + Backend

**Ask ONLY:**
```
Great! TaskFlow Pro sounds well-defined. Just need to know:

1. For API contracts: OpenAPI + Pydantic (recommended for FastAPI+React) or another approach?
2. Documentation location: project_docs/ at root (standard) or custom path?
```

**Total questions:** 2 (not 9!)

---

### Example 2: Minimal Description

**User says:**
"Help me set up a web app"

**You have:**
❌ Name
❌ Purpose  
❌ Stack
❌ Architecture

**Ask:**
```
I'd be happy to help! I need some information to set up properly:

1. **Project name?** (What should I call it?)

2. **What does it do?** (Describe the core purpose in 1-2 sentences)

3. **Technology stack?**
   - Frontend: React, Vue, Next.js, other?
   - Backend: FastAPI, Express, Django, other?
   - Database: PostgreSQL, MongoDB, other?

4. **API contracts?**
   - OpenAPI (recommended if using FastAPI/Express)
   - GraphQL  
   - JSON Schema
   - Custom

5. **Docs location?** project_docs/ at root (default) or custom path?
```

**Total questions:** 5 (combined into one message for efficiency)

---

### Example 3: Existing Codebase

**User says:**
"Add the framework to my existing project" (and you can see their code)

**You do:**
1. Analyze codebase
2. Infer tech stack from files
3. Find project name from package.json or similar
4. Understand architecture from structure

**Ask ONLY:**
```
I can see this is [PROJECT_NAME] built with [STACK]. Before adding the framework:

1. **API contracts:** I see you're using [DETECTED_APPROACH]. Should I formalize this in the framework, or use a different approach?

2. **Documentation:** You have docs in [EXISTING_LOCATION]. Should I:
   - Add `project_docs/` alongside existing docs
   - Use your existing location
   - Merge into existing structure

3. **Purpose:** Can you describe what the project does in 1-2 sentences? (For documentation)
```

**Total questions:** 3 (leveraging detected information)

---

## Response Validation Rules

### Valid vs Invalid Answers

**Project Name:**
- ✅ Valid: "TaskFlow Pro", "Acme CRM", "BlogPlatform"
- ❌ Invalid: "app", "project", "my thing"

**Purpose:**
- ✅ Valid: 1-3 sentence description with specifics
- ❌ Invalid: "it's a web app", "helps people"

**Tech Stack:**
- ✅ Valid: Specific frameworks mentioned
- ❌ Invalid: Just languages without frameworks

**API Approach:**
- ✅ Valid: One of the 4 numbered options
- ❌ Invalid: "whatever works", "I don't know"

### Handling Invalid Answers

**If answer too vague:**
```
I need a bit more detail. For example:
- [Show example of good answer]
```

**If answer unclear:**
```
Just to confirm, you mean [your interpretation]?
```

**If answer incomplete:**
```
Great, and what about [missing aspect]?
```

---

## Special Cases

### Case 1: User says "Use defaults"

**Response:**
```
Perfect! I'll use these defaults:
- Documentation: project_docs/ at root
- API Contracts: [DETECT FROM STACK or OpenAPI]
- Architecture: [DETECT FROM STACK]

I still need:
- Project name?
- Brief description (1-2 sentences)?
```

### Case 2: User wants "minimal setup"

**Response:**
```
Minimal setup - got it. I'll create:
- Core docs only (context_master_guide, technical_status)
- Basic pattern library structure
- Simple .clinerules
- Basic MCP server

Skip workflows, detailed templates for now. You can add them later.

I just need:
- Project name?  
- Purpose (brief)?
- Tech stack?
```

### Case 3: User copies question list

**Don't do:**
❌ Ask all questions again

**Do instead:**
✅ Acknowledge and extract answers:
```
Great! I see you've provided:
- Name: [EXTRACTED]
- Stack: [EXTRACTED]
- Purpose: [EXTRACTED]

Just to confirm [any unclear items], then I'll proceed with setup.
```

---

## Question Efficiency Checklist

Before asking ANY question:

- [ ] Did user already provide this info?
- [ ] Can I infer this from context/codebase?
- [ ] Is this absolutely necessary for bootstrap?
- [ ] Can this be defined later?

**If all answers are "yes/can infer"**: Don't ask!

**Goal:** Ask minimum necessary questions. User wants setup, not interrogation.

---

## After Gathering Information

**Present summary for confirmation:**
```markdown
## Ready to Set Up [PROJECT_NAME]

Based on your answers:
- **Project:** [NAME]
- **Purpose:** [PURPOSE]
- **Stack:** [STACK]
- **API Contracts:** [APPROACH]
- **Verification:** [ENV_TYPE]
- **Docs Location:** [PATH]

I'll create:
- Context master guide
- Technical status doc
- Pattern library structure
- MCP server configuration
- .clinerules for AI assistance

Proceed? (yes/no)
```

**Wait for confirmation before generating files.**

---

## Remember

1. **Read what user provided FIRST**
2. **Only ask for gaps**
3. **Group questions efficiently**  
4. **Validate answers**
5. **Confirm before generating**

**Quality over quantity:** Better to ask 2 good questions than 9 redundant ones.

---

## Scenario-Specific Questions

### SIMILAR_WORKFLOW Scenario Questions

When the project has existing AI rules with structured workflows:

**Q-SW1: Rule Differences**
For each significant difference between existing rules and FluxFrame:
```
I found a difference in [CATEGORY]:

**Your rule:** [existing rule content]
**FluxFrame:** [FluxFrame approach]

Options:
1. Keep yours - Preserve your custom rule
2. Use FluxFrame - Replace with FluxFrame standard
3. Merge - Combine both approaches

Your choice?
```

**Q-SW2: Missing Components**
```
Your setup is missing these FluxFrame components:
- [List missing items]

Should I add them? (yes/no for each, or "yes to all")
```

**Q-SW3: Preserve Customizations**
```
I found these custom rules that aren't in FluxFrame:
- [List custom rules]

These will be preserved in a "Project-Specific Rules" section.
Anything to modify? (or "looks good")
```

---

### MIGRATION Scenario Questions

When the project has existing documentation in different structure:

**Q-M1: Documentation Import Preference**
For each documentation category found:
```
### Your Decision: [Category Name]

I found: [description of what exists]

Options:
1. **Copy** - Keep originals, copy content into FluxFrame docs
2. **Migrate** - Move content to FluxFrame structure (original gets redirect note)
3. **Reference** - Keep originals, FluxFrame docs link to them

Your choice for [Category]?
```

**Q-M2: Documentation Location**
```
Your current documentation is in: [detected_path]/
FluxFrame standard is: project_docs/

Options:
1. Use FluxFrame standard (create project_docs/)
2. Use your location ([detected_path]/) for FluxFrame docs
3. Keep both, link between them

Your choice?
```

**Q-M3: Bug Fix/Change History**
```
I found [N] bug fix/change documents in [location].

Options:
1. Import into FluxFrame bug_fixes/ directory
2. Keep in place, reference from FluxFrame
3. Archive and start fresh with FluxFrame format

Your choice?
```

**Q-M4: Existing Minimal AI Rules**
```
I found existing AI rules: [file]

Content appears [minimal/project-specific].

Options:
1. Replace with FluxFrame rules
2. Incorporate into FluxFrame structure
3. Keep separate (may cause conflicts)

Your choice?
```

---

## Question Matrix by Scenario

| Question | GREENFIELD | SIMILAR_WORKFLOW | MIGRATION |
|----------|------------|------------------|-----------|
| Project name | If not detected | Usually detected | Usually detected |
| Project purpose | If not detected | If not in docs | If not in docs |
| Tech stack | If not detected | Usually detected | Usually detected |
| Architecture | If not clear | Usually detected | Usually detected |
| AI tools | Always | Usually detected | Always |
| API contracts | If has backend | If not in rules | If has backend |
| Docs location | Always (offer default) | Keep existing | Ask preference |
| Verification env | Always | If not in rules | Always |
| Rule differences | N/A | For each diff | N/A |
| Import preferences | N/A | N/A | For each category |
| Keep/replace rules | N/A | For each diff | If minimal rules |
