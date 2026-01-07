# Pattern: Modular Technical Status Architecture

**Status:** Canonical  
**Category:** Documentation Management  
**Use When:** The `technical_status.md` file exceeds manageable length or after every successful development cycle completion to maintain documentation hygiene.

## Context & Vision

The `technical_status.md` file is the real-time "mind" of the project's implementation. As a project grows, this file naturally accumulates history, which can lead to:
1.  **AI Context Overload:** Too much historical noise distracting from current priorities.
2.  **Maintenance Friction:** Difficulty navigating a 1000+ line document.
3.  **Readability Issues:** Human developers losing the "big picture" among granular task details.

This pattern establishes a **Master-Link-Archive** architecture to keep the status fresh, relevant, and infinitely scalable.

---

## The Modular Structure

Instead of one monolithic file, the technical status is split into:

1.  **Master Status (`technical_status.md`)**: The entry point. contains ONLY the current architectural overview, current active cycle, recent fixes (1 month), and high-level summaries of past work.
2.  **Cycle Archives (`tech-status/archived_cycle_X.md`)**: Detailed records of finished development cycles. Created when a cycle moves to "COMPLETE".
3.  **Historical Chronology (`tech-status/history.md`)**: (Optional) A single file for all old bug fixes/changes that have aged out of the 1-month window.

---

## Archiving Protocol

### 1. The Trigger
Archive a section when:
-   **Cycle Completion**: As soon as a development cycle is marked `✅ COMPLETE`.
-   **Size Threshold**: If the main file exceeds ~400 lines (even if cycles aren't finished).
-   **Aging**: If a "Recently Fixed" entry is older than 1 month.

### 2. The Move Execution
When a cycle (e.g., Cycle 1.1) is complete:
1.  **Create** `tech-status/archived_cycle_1.1.md`.
2.  **Copy** the entire detailed cycle section from `technical_status.md` to the new archive file.
3.  **Replace** the detailed section in `technical_status.md` with a one-line summary and a link:
    - `### ✅ **Cycle 1.1: Core Infrastructure** (Archived: 2024-01-01) - [View Details](./tech-status/archived_cycle_1.1.md)`

### 3. Maintaining the Master
The Master Status MUST always retain:
-   [ ] **Latest Architecture Overview**: Never archive this.
-   [ ] **Current Active Cycle**: Detailed breakdown of what's happening NOW.
-   [ ] **Upcoming Cycles**: High-level planning for what's NEXT.
-   [ ] **Technical Debt & Known Issues**: Current obstacles.
-   [ ] **Links to Archives**: A clear "Historical Records" section at the bottom.

---

## Directory Organization

```
doc/
├── technical_status.md         # Master (Current State)
└── tech-status/                # Archive Directory
    ├── archived_cycle_1.1.md   # Completed cycle details
    ├── archived_cycle_1.2.md
    └── change_history.md       # Aged-out fixes (>1 month old)
```

---

## AI Assistant Implementation Rules

AI Assistants MUST follow these rules when updating status:

1.  **Before Archiving**: Ensure the Master file contains a summary of the archived cycle's key takeaways.
2.  **Maintain Links**: Never delete information; always move and link.
3.  **Consistency**: Archive files must follow the same formatting standards as the original template.

---

## Red Flags

-   ❌ `technical_status.md` growing beyond 600 lines without archiving.
-   ❌ Deleting historical cycle data instead of moving it.
-   ❌ Dead links to archive files.
-   ❌ Archiving the *Current Active Cycle* before it's actually finished.
