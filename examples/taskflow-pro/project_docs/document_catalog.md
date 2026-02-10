# TaskFlow Pro: Document Catalog

## Purpose

This catalog describes every document in the `project_docs` directory — what it is, how to use it, and when to update it. For the project's core philosophy, activation protocol, and development workflow, see `AGENTS.md` (always loaded).

---

## System Workflows & Architecture

**Comprehensive workflow documentation**

Located in `project_docs/workflows/`:

- **[workflows/README.md](./workflows/README.md)** - Navigation guide and maintenance guidelines
- **[workflows/user_journey.md](./workflows/user_journey.md)** - Standard user workflow from registration to task completion
- **[workflows/admin_journey.md](./workflows/admin_journey.md)** - Admin system management workflows
- **[workflows/technical_data_flows.md](./workflows/technical_data_flows.md)** - How data flows through the system

**Purpose:** Explain how TaskFlow Pro works to different audiences:
- Product team & stakeholders: Use user/admin journeys
- Engineering team: Use technical data flows
- External partners: Use technical data flows for credibility
- AI assistants: Use for system understanding

**Update Triggers:**
- New user-facing features
- Changes to conceptual logic/architecture
- New component types added
- Database schema changes

**Do NOT update for:**
- Model provider swaps
- Performance optimizations (same logic)
- Bug fixes
- Infrastructure changes

---

## A. The Vision & Architecture: `ROADMAP.md`

*   **What it is:** The strategic north star. It defines the "why" behind the project, the overall system architecture, the core domain concepts, and the guiding technical principles.
*   **How to use it:** Read this first to understand the project's goals and the high-level technical design. All major architectural decisions must be reflected here.

## B. The Current State - Technical Status: `technical_status.md`

*   **What it is:** Real-time documentation of the current implementation state, architecture status, and development cycle progress. It follows a **Modular Architecture**: the master file tracks current work, while finished cycles are archived in the `tech-status/` directory.
*   **How to use it:** This is the **primary reference for development status**. It must be updated after every cycle completion. When a cycle is finished, its detailed implementation records are moved to `tech-status/archived_cycle_X.md` to keep the master file concise and optimized for AI context.
*   **Key components:**
    - `technical_status.md`: Master file (Current architecture + Active cycle)
    - `tech-status/`: Directory for archived cycle details and deep history.

## C. The Pattern Library: `patterns/` Directory

*   **What it is:** A comprehensive reference library of established patterns, templates, and conventions for common technical challenges. Located in `project_docs/patterns/`, it documents the "how we do things" for API development, UI components, data management, and testing.
*   **Key Pattern Documents:**
    - **`api_task_endpoint_pattern.md`** - REST endpoint implementation with Pydantic
    - **`ui_task_card_pattern.md`** - React component patterns with TypeScript
    - **`data_react_query_pattern.md`** - Server state management with React Query
*   **How to use it:** **MANDATORY check before implementing any new feature.** This document prevents reinventing the wheel by providing canonical solutions to solved problems. When you encounter a new pattern during development, document it here immediately so the next developer can benefit.
*   **Update frequency:** After every cycle that establishes a new pattern or identifies an inconsistency that needs harmonization.

## D. API Contract Standard: `api_contract_standards.md`

*   **What it is:** The **MANDATORY** standard for all API development. Establishes contract-first design with OpenAPI + Pydantic + Auto-Generated TypeScript.
*   **Core Principle:** **Every endpoint MUST have a Pydantic response model. No exceptions.**
*   **How to use it:**
    1. **Backend:** Define Pydantic response model in `backend/models/`
    2. **Backend:** Add `response_model` parameter to FastAPI endpoint
    3. **Backend:** Explicitly map service data to response model
    4. **Frontend:** Run `npm run generate-types` to regenerate TypeScript types
    5. **Frontend:** Use `apiClient` and auto-generated types in components
*   **Benefits:**
    - ✅ Runtime validation on backend
    - ✅ Compile-time type checking on frontend
    - ✅ Self-documenting APIs
    - ✅ Breaking changes caught immediately
    - ✅ Consistent error handling
*   **Reference:** See `patterns/api_task_endpoint_pattern.md` for complete guide

## E. Implementation Plans: High-Level & Detailed

**Structure:**
*   **High-Level Roadmap:** `ROADMAP.md` - Strategic development cycle roadmap
*   **Detailed Plans:** `roadmap/` directory - Granular implementation guides for specific cycles

**Hierarchy & Alignment:**
*   The high-level plan provides strategic overview and references detailed plans
*   Each cycle with a detailed plan MUST include: `**Detailed Plan:** See roadmap/ITERATION_X_X_IMPLEMENTATION_PLAN.md`
*   Detailed plans expand on the high-level summary with technical specifications, timelines, and testing strategies

**Critical Alignment Rules:**

1. **Status Synchronization:**
   - If high-level plan shows cycle as "PLANNING", detailed plan must show "📋 PLANNING"
   - If high-level plan shows cycle as "COMPLETE", detailed plan must show "✅ COMPLETE"
   - Statuses must NEVER diverge

2. **Purpose & Output Alignment:**
   - "Primary Inputs" and "Visible Output" in high-level MUST match detailed plan's purpose/goals
   - Any discrepancy indicates documentation drift and must be resolved immediately

3. **When to Create Detailed Plan:**
   - Create when cycle moves from concept to active planning
   - High-level entry created FIRST (strategic vision)
   - Detailed plan created SECOND (technical execution)
   - Both updated together as work progresses

## F. The Reference Library (Descriptive Context): `reference_library/` Directory

*   **What it is:** An archive of real-world context, user research, and external inputs that inform product decisions. This library stores **DESCRIPTIVE** information (what the real world looks like) as opposed to **PRESCRIPTIVE** documentation (what to do and how).

*   **Critical Distinction:**
    | Documentation Type | Location | Nature |
    |-------------------|----------|--------|
    | **Prescriptive** | `patterns/`, `workflows/`, `AGENTS.md` | Rules, standards, how-to guides |
    | **Descriptive** | `reference_library/` | Real-world inputs, research, context |

*   **Key Principle:** This library **INFORMS decisions but does NOT DICTATE them.** You may intentionally deviate from user wishes or market trends when there's good reason. Contradictions within this library are valuable information, not problems to solve.

*   **Directory Structure:**
    - `open_questions/` - Research topics and unanswered questions requiring investigation
    - `correspondence/` - Emails, Slack threads, meeting notes with stakeholders
    - `user_research/` - Interviews, feedback, usage scenarios from users
    - `market_research/` - Competitor analysis, industry reports, market trends
    - `domain_knowledge/` - Expert input, terminology glossaries, business context
    - `specifications/` - External specs, PDFs, partner documentation

*   **How to use it:**
    - **Before planning features:** Check `user_research/` for relevant user needs
    - **When designing tests:** Reference real usage scenarios from `user_research/`
    - **When making product decisions:** Consider market context from `market_research/`
    - **When understanding domain:** Consult `domain_knowledge/` for terminology and business rules

---
