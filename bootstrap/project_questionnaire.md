# Project Questionnaire for Bootstrap

**Purpose:** This document guides the AI assistant (Cline or Roo) in gathering necessary information to bootstrap a new project with FluxFrame.

**When to use:** During Phase 1 of bootstrap workflow (Information Gathering)

**Important:** Only ask questions for information NOT already provided by the user. If the user gave you a comprehensive project description, don't ask redundant questions.

---

## Q0: AI Assistant Selection (ALWAYS ASK FIRST)

**This MUST be the first question:**
```
Which AI coding assistant are you using?

1. Cline (VS Code extension)
2. Roo (VS Code extension)
```

**Answer determines output filename:**
- Cline → Generate `.clinerules`
- Roo → Generate `.roorules`

**Note:** Both assistants use identical configuration content. Only the filename differs.

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

### Q8: Verification Environment

**Ask:**
```
How will you/users verify changes before marking them complete?

1. **Localhost:** I run it locally (e.g., localhost:3000)
2. **Preview Environment:** CI creates ephemeral previews (e.g., Vercel)
3. **Staging Server:** I deploy to a specific staging URL
4. **Production:** I deploy directly to prod (behind feature flags)
```

**Impact:**
- Customizes the "Verification" step in workflows
- AI will instruct you to verify in this specific environment

---

## Optional Questions (Ask only if relevant)

### Q9: Key Features (if not provided)

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

### Q10: Team Size

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
