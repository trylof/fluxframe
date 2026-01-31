# Getting Started with FluxFrame

**Welcome!** You have successfully bootstrapped your project with FluxFrame.

At this stage, your project structure is set up, but your documentation is generic. The "Mind" of your project is currently empty. Your goal now is to fill it with *your* context so the AI can actually help you.

Follow these phases to get fully operational.

---

## Phase 1: Verify Your System

Before building, confirm that your AI assistant is correctly connected to your project's new tools.

### 1. Check MCP Connection
Ask your AI assistant:
> "Please run `list_dir` on the current directory to confirm you can see the new files."

**Success:** The agent sees `FLUXFRAME_MANUAL.md` and the `docs/` directory.

### 2. Check Tool Access
Ask your AI assistant:
> "Please run `check_pattern_exists` with the query 'test' just to verify the tool works."

**Success:** The agent reports that the tool executed (even if it found no patterns).

---

## Phase 2: Context Injection (The "Mind" Setup)

FluxFrame relies on `reference_library/` (Descriptive) and `patterns/` (Prescriptive). You should populate these now.

### Step 1: Populate Descriptive Context (All Projects)
Whether you are starting new or migrating, you have "stuff" that describes your goals.

1.  **Upload Specifications:**
    *   Do you have PDF specs, images, or requirement docs?
    *   **Action:** Upload them directly to `{{DOCS_DIR}}/reference_library/specifications/`.

2.  **Upload Correspondence:**
    *   Do you have chat logs, emails, or call transcripts?
    *   **Action:** Upload them to `{{DOCS_DIR}}/reference_library/correspondence/`.
    *   **Critical:** Add a note at the top of each file indicating how **binding** it is:
        *   `[HARD CONSTRAINT]` - Must follow exactly.
        *   `[SOFT REQUIREMENT]` - Preference, but negotiable.
        *   `[BRAINSTORMING]` - Just ideas, safe to ignore.

3.  **Link External Context:**
    *   Do your docs live in Notion, Google Drive, or Linear?
    *   **Action:** Ask the AI:
        > "I have external documentation at [URL]. Please create a metadata pointer file in `reference_library/specifications/` that describes what is there, so you know where to look."

4.  **Brain Dump (If nothing else exists):**
    *   **Action:** Create `{{DOCS_DIR}}/reference_library/domain_knowledge/brain_dump.md` and write down your goals.

### Step 2: Establish Prescriptive Baseline (Choose One)

#### Option A: Greenfield (Starting from Scratch)
You have no code yet.
*   **Action:** Skip to Phase 3 (Strategic Definition). You will build patterns as you go.

#### Option B: Migration (Existing Codebase)
You have code that defines how things work.
1.  **Extract Patterns:**
    *   **Action:** Ask the AI:
        > "Please analyze `src/` (or your source dir) and identify the top 3 recurring architectural patterns. Create a new pattern file in `patterns/` for each one."
2.  **Verify Status:**
    *   **Action:** Ask the AI:
        > "Please analyze `package.json` and my directory structure. Update `technical_status.md` with the actual frameworks and versions."

---

## Phase 3: Strategic Definition

Your roadmap currently has placeholders. Let's fix that.

1.  **Open `{{DOCS_DIR}}/ROADMAP.md`**.
2.  **Action:** Read the "Objectives" and "Non-Goals" sections.
3.  **Prompt:** Ask the AI:
    > "Read `ROADMAP.md`. Help me rewrite the 'Objectives' and 'Non-Goals' sections to match my project, which is [Brief Description of your Project]."

---

## Phase 4: Initiate Cycle 1

FluxFrame works in **Cycles** (Tier 1 Planning). You need to define the first concrete chunk of work.

1.  **Define Cycle 1.1:**
    *   What is the smallest, end-to-end piece of value you can build?
    *   Example: "User Login Screen" or "Basic API Health Check".

2.  **Update Roadmap:**
    *   **Prompt:**
        > "I want to start Cycle 1.1. The goal is [Goal]. Please update `ROADMAP.md` to define Cycle 1.1 with this goal."

3.  **Start Planning (Tier 2):**
    *   **Prompt:**
        > "I am ready to work on Cycle 1.1. Please run `start_cycle_planning('1.1')`."

---

## Shortcuts for the AI

Copy-paste these prompts to speed up setup:

**For Migrations - "Pattern Extraction":**
```text
I want to populate my pattern library. Please:
1. Read my source code in [DIR].
2. Identify the most common pattern for [API/UI/Data] and create a file 'patterns/[name]_patterns.md'.
3. Verify it captures how we currently do things.
```

**For Greenfields - "Roadmap Setup":**
```text
I want to set up my roadmap.
1. Read `ROADMAP.md`.
2. Update the Objectives to: [List Objectives].
3. Define Cycle 1.1 as: [Name of First Feature] and update the Roadmap.
```

---

**Next Step:** Once you have done these 4 phases, you are ready to code! Refer to `FLUXFRAME_MANUAL.md` for your daily workflow.
