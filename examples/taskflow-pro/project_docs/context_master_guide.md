# TaskFlow Pro: The Context Master Guide

## 1. Philosophy: Documents as the Source of Truth

This project treats its documentation not as an afterthought, but as a core component of the product itself. The documents in this `project_docs` directory represent the "mind" of the project—the single source of truth for its vision, architecture, and implementation strategy.

**Our core principle is simple: If it's not in the docs, it doesn't exist.**

This approach ensures that all team members, technical and non-technical, are always aligned on a shared reality. It is the responsibility of every team member to ensure these documents are kept **current, clear, and accurate** after every development cycle.

---

## 1.5. Agent Protocol: Explicit Boundaries

**CRITICAL INSTRUCTION FOR AI AGENTS:**

To prevent "hallucinated progress" and ensure user control, you must strictly adhere to the **Two-Tier Planning System**.

**1. STRICT SEPARATION OF PLANNING AND EXECUTION**
- **NEVER** offer to "plan and build" in a single response.
- **NEVER** ask "Should I start building?" before the plan is approved.
- **ALWAYS** act in discrete turns:
  1. **Phase 1: Plan** → `create_cycle_plan()` → **STOP & WAIT**
  2. **Phase 2: Review** → User reviews → `approve_cycle_plan()` → **STOP & WAIT**
  3. **Phase 3: Build** → Only AFTER approval → Start implementation

**2. THE "STOP" RULE**
- When you complete a planning step (research, scoping, or plan creation), you must **STOP** and ask the user for confirmation.
- Do not chain tools that cross the boundary from Planning to Execution.

**3. VERIFICATION FIRST**
- Before implementing features, you must verify the existence of patterns (`check_pattern_exists`).
- Before marking complete, you must verify against the plan (`validate_cycle_completion`).

---

## 2. The Core Context Documents

This directory contains the essential guides for understanding and building the TaskFlow Pro platform. All key documents referenced below are located in the `project_docs` directory.

### 2.1 System Workflows & Architecture

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

### A. The Vision & Architecture: `ROADMAP.md`

*   **What it is:** The strategic north star. It defines the "why" behind the project, the overall system architecture, the core domain concepts, and the guiding technical principles.
*   **How to use it:** Read this first to understand the project's goals and the high-level technical design. All major architectural decisions must be reflected here.

### B. The Current State - Technical Status: `technical_status.md`

*   **What it is:** Real-time documentation of the current implementation state, architecture status, and development cycle progress. It follows a **Modular Architecture**: the master file tracks current work, while finished cycles are archived in the `tech-status/` directory.
*   **How to use it:** This is the **primary reference for development status**. It must be updated after every cycle completion. When a cycle is finished, its detailed implementation records are moved to `tech-status/archived_cycle_X.md` to keep the master file concise and optimized for AI context.
*   **Key components:**
    - `technical_status.md`: Master file (Current architecture + Active cycle)
    - `tech-status/`: Directory for archived cycle details and deep history.

### C. The Pattern Library: `patterns/` Directory

*   **What it is:** A comprehensive reference library of established patterns, templates, and conventions for common technical challenges. Located in `project_docs/patterns/`, it documents the "how we do things" for API development, UI components, data management, and testing.
*   **Key Pattern Documents:**
    - **`api_task_endpoint_pattern.md`** - REST endpoint implementation with Pydantic
    - **`ui_task_card_pattern.md`** - React component patterns with TypeScript
    - **`data_react_query_pattern.md`** - Server state management with React Query
*   **How to use it:** **MANDATORY check before implementing any new feature.** This document prevents reinventing the wheel by providing canonical solutions to solved problems. When you encounter a new pattern during development, document it here immediately so the next developer can benefit.
*   **Update frequency:** After every cycle that establishes a new pattern or identifies an inconsistency that needs harmonization.

### D. API Contract Standard: `api_contract_standards.md`

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

### E. Implementation Plans: High-Level & Detailed

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

### F. The Reference Library (Descriptive Context): `reference_library/` Directory

*   **What it is:** An archive of real-world context, user research, and external inputs that inform product decisions. This library stores **DESCRIPTIVE** information (what the real world looks like) as opposed to **PRESCRIPTIVE** documentation (what to do and how).

*   **Critical Distinction:**
    | Documentation Type | Location | Nature |
    |-------------------|----------|--------|
    | **Prescriptive** | `patterns/`, `workflows/`, `context_master_guide.md` | Rules, standards, how-to guides |
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

## 3. The Golden Rule: Maintain the Mind

After any significant change—a feature is built, an architectural decision is made, a new technology is chosen—the first step after implementation is to **update these documents.**

### **Critical Update Sequence for Every Development Cycle:**

**BEFORE Implementation:**
0. **Check for Patterns:** Use `check_pattern_exists()` MCP tool with description of what you're building
   - If pattern exists → Read it and follow exactly
   - If no pattern exists → Proceed with implementation and plan to document the new pattern

**DURING Implementation:**
1. **First:** Implement the backend functionality WITH REAL COMPONENTS (no stubs)
2. **Second:** **Deploy & Verify** - Test in development environment
3. **Third:** **ALIGN ALL TESTING WITH ACTUAL IMPLEMENTATION** - Ensure test data, instructions, and validation precisely match what was built
4. **Fourth:** RUN AND PASS ALL TESTS (unit, integration, e2e) - using correctly aligned test data

**AFTER Implementation:**
5. **Fifth:** Update `technical_status.md` with what was built, what's working, what's broken, and next steps
6. **Sixth:** Update test documentation and create/update tests for new functionality
7. **Seventh:** **Update `patterns/`** if new patterns were established or existing ones were applied
8. **Eighth:** Update other relevant project documents as needed

**FINAL Alignment Check:**
9. **Verify Protocol Alignment:** Check that your AI agent configuration (e.g., `AGENTS.md`, `.clinerules`, `.roomodes`) matches the `context_master_guide.md` content.
    - Compare the "Before starting code work" and "Before marking work complete" protocols.
    - Raise concerns if workflow descriptions have diverged.
    - Update your rules if the master guide workflow has changed.

### **CRITICAL ALIGNMENT RULE: Test Data Must Match Implementation**

**Before any cycle is marked complete, ALL testing components must be verified to match the actual implementation:**

- **Test Documents**: Must match the exact input types and scenarios the cycle handles
- **Unit Tests**: Must test the actual functions and methods implemented
- **Integration Tests**: Must validate the specific API endpoints built
- **E2E Tests**: Must test the actual user workflows the UI enables
- **Expected Outputs**: Must match the actual data structures and response formats

**Validation Questions for Every Cycle:**
1. Do the test documents match the Primary Inputs specified in the implementation plan?
2. Do the test instructions test the exact workflows the UI enables?
3. Do the expected outputs match what the API actually returns?
4. Can a user follow the manual tests using the actual deployed application?

**CRITICAL RULE: No cycle is EVER complete while running on stubs. We have eliminated all stub modes from the system.**

**Our "Real Analysis Always" Policy:**
- **Development & Production:** Both environments use identical code paths with real API calls
- **Testing:** Uses proper test fixtures and mocking at external boundaries, not fake business logic
- **No Stub Modes:** We never use fake data generation or simulated responses in any environment
- **Consistency:** This ensures development, testing, and production all behave identically

**No cycle is complete without:**
- ✅ Real API calls (never stub responses)
- ✅ Visible UI results
- ✅ All unit tests passing (using proper API mocking)
- ✅ Integration tests passing for current cycle
- ✅ Manual testing completed with documented results
- ✅ E2E tests validating functionality
- ✅ No regression in previous cycle functionality
- ✅ Updated documentation (including test documentation)
- ✅ End-to-end functionality with production components
- ✅ Patterns documented in `patterns/`
- ✅ **API Contract Standard compliance**:
  - Backend: ALL new endpoints have `response_model` parameter
  - Backend: ALL new endpoints explicitly map service data to Pydantic models
  - Backend: ALL new endpoints have return type annotations
  - Frontend: NO direct `fetch()` calls (use `apiClient`)
  - Frontend: Proper error handling with `APIClientError`
  - Reference: `patterns/api_task_endpoint_pattern.md`

**The Testing Golden Rule: A cycle that hasn't been tested is not complete - it's just code.**

**The Pattern Library Golden Rule: Before implementing any feature, check `patterns/` first. If a pattern exists, use it. If not, create one and document it.**

---

## 4. The Pattern-Driven Development Workflow

As TaskFlow Pro grows in complexity, maintaining architectural consistency becomes critical. Our **Pattern Library** (`patterns/`) is the foundation of this consistency.

### **Before Starting Any New Feature:**

1. **Check the Pattern Library**
   - Does a canonical pattern exist for your use case?
   - Has someone already solved this problem?
   - Example: Building a new API endpoint? Check `api_task_endpoint_pattern.md`

2. **Follow Existing Patterns**
   - Copy the canonical implementation
   - Adapt to your specific needs
   - Maintain the core structure and conventions

3. **Identify New Patterns**
   - If you're solving a problem for the first time
   - If you notice inconsistencies across the codebase
   - Add the new pattern to the library immediately

4. **Flag Inconsistencies**
   - If you find code that doesn't follow established patterns
   - Add to the "Harmonization Backlog" in the Pattern Library
   - Consider refactoring if the inconsistency causes bugs or confusion

### **Why This Matters:**

- **Speed:** Reusing proven patterns is 10x faster than inventing new solutions
- **Quality:** Patterns have been tested, reviewed, and refined
- **Consistency:** Users and developers encounter familiar structures
- **Maintainability:** New team members can learn patterns once and apply everywhere
- **Scalability:** Clear patterns prevent architectural drift as the system grows

---

## 5. Change Request Protocol: Systematic Fixing, Refining & Documentation

When a change request is made (bug, refinement, requirement change, misinterpretation, or alteration), follow this structured workflow:

### **The User Classification Rule (ABSOLUTE)**

**If the user calls it a "Bug", it is a BUG.**

- **Do NOT reclassify** a user-reported bug as a "refinement" because it is a design flaw.
- **Do NOT reclassify** a user-reported bug as a "cycle" because the fix is complex.
- **Inconsistent State = Bug.** If the system presents conflicting information (e.g., UI says X, Data says Y), that is a bug, not a refinement.

### **Complexity vs. Workflow**

- **Complexity does NOT dictate workflow.** A bug fix can be complex (require migration, schema changes, multiple files) and still be a BUG.
- **Workflow is dictated by INTENT:**
    - **Fixing something broken/incorrect?** → **Change Request Protocol** (even if hard)
    - **Building new value/capability?** → **Cycle Workflow**

### **Phase 1: Classification & Analysis**

1. **Classify & Document:**
   - MCP tool: `start_change_request(description, change_type, affected_feature, severity)`
   - Change types: "bug", "refinement", "requirement_change", "misinterpretation", "alteration"
   - Creates tracking state in memory
   - Returns change ID for reference

2. **Pattern Check:**
   - MCP tool: `check_pattern_exists(feature_description)`
   - Could this be a pattern violation?
   - Check existing patterns for guidance

3. **Root Cause Analysis:**
   - Investigate without making changes
   - Document hypothesis in thinking
   - Understand WHY change is needed
   - May take multiple attempts

### **Phase 2: Change Iteration (Iterative)**

4. **Attempt Change:**
   - Make code changes
   - Test locally/in production
   - **DO NOT document yet**

5. **User Validation Required:**
   - User confirms: "This fixed it" / "Perfect!" / "This is what I wanted" → Proceed to Phase 3
   - User reports: "Still broken" / "Not quite" / "Different issue" → Return to step 4
   - **No documentation until user confirms success**

### **Phase 3: Complete Documentation (After Confirmation Only)**

**CRITICAL: This phase updates ALL affected documentation, not just the change doc.**

6. **MCP tool: `validate_change_resolution(change_id)`**
   - User has confirmed change works
   - Triggers COMPLETE documentation checklist
   - Returns template AND affected doc list

7. **Create Change Documentation:**
   - Location: `bug_fixes/<COMPONENT>_<ISSUE>.md`
   - Required sections (see template below)
   - Root cause / rationale for change
   - Solution approach
   - Files changed
   - Testing performed

8. **Update Technical Status (`technical_status.md`):**
   - **ALWAYS UPDATE** - Add to "Recently Fixed/Changed" section.
   - **ARCHIVE** - If an entry is older than 1 month, move it to `tech-status/change_history.md`.
   - Remove from "Known Issues" if listed.
   - Update "Current Capabilities" if functionality changed.
   - Update "Technical Debt" if debt was addressed.
   - Update component status if state changed.

9. **Update Pattern Library (`patterns/`) if applicable:**
   - Did change reveal anti-pattern? Document it
   - Did change establish new pattern? Add it
   - Did change fix pattern violation? Note harmonization
   - Add to harmonization backlog if inconsistency found

10. **MCP tool: `close_change_request(change_id, documentation_file)`**
    - Marks change as resolved
    - Sets archive date (1 month from now)
    - Clears tracking state

---

## 6. Pattern Status Levels

Patterns in the library have different status levels:

- **Canonical:** Reference implementation, use exactly as documented
- **Established:** Proven pattern, use consistently
- **Mandatory:** Must be used in all applicable cases
- **Needs Harmonization:** Inconsistencies exist, standardization required
- **Experimental:** New pattern being evaluated
- **Deprecated:** No longer recommended, migration path provided

---

## 7. MCP Tools Available

### Session & Context
- `get_context_for_task(task_type)` - Context for current work
- `get_current_implementation_status()` - Read technical_status.md
- `get_implementation_roadmap()` - Get cycle status overview

### Pattern Library
- `check_pattern_exists(feature_description)` - Find relevant patterns

### Cycle Planning
- `start_cycle_planning(cycle_id)` - Initialize cycle planning
- `analyze_cycle_scope()` - Get complexity score (must be ≤10)
- `create_cycle_plan()` - Create detailed implementation plan
- `approve_cycle_plan()` - Mark plan as approved, ready for implementation

### Cycle Validation
- `get_completion_checklist()` - Get project-specific completion criteria
- `validate_cycle_completion(cycle, completed_items)` - Validate cycle is complete

### API Contracts
- `validate_api_contracts(endpoints)` - Validate endpoint compliance

### Change Requests
- `start_change_request(description, change_type, affected_feature, severity)` - Initialize bug fix tracking
- `validate_change_resolution(change_id)` - Get documentation checklist
- `close_change_request(change_id, documentation_file)` - Mark change as complete

### Workflow Documentation
- `validate_workflow_documentation(changes_made, description)` - Check if workflow docs need update

---

## 8. Session Protocol

### Every AI Assistant Session

**MUST start with these steps:**

1. `get_context_for_task(task_type="session_start")`
2. `get_current_implementation_status()`
3. Determine interaction type:
   - New cycle → Follow cycle workflow (Section 3)
   - Bug fix → `start_change_request()` (Section 5)
   - Question → `check_pattern_exists()` first

### Before ANY Code Changes

```
check_pattern_exists(feature_description="what you're building")
```

### Before Marking Work Complete

```
get_completion_checklist()
validate_cycle_completion(cycle="X.X", completed_items=[...])
validate_api_contracts(endpoints=[...])  # if endpoints modified
```

---

## 9. Key Project Directories

```
taskflow-pro/
├── backend/
│   ├── models/          # Pydantic models (API contracts)
│   ├── routers/         # API endpoints
│   ├── services/        # Business logic
│   └── tests/           # Backend tests
│
├── frontend/
│   ├── components/      # React components
│   ├── hooks/           # React hooks (React Query)
│   ├── lib/             # API client, utilities
│   ├── types/           # Auto-generated TypeScript types
│   └── pages/           # Next.js pages
│
└── project_docs/
    ├── context_master_guide.md   # This file
    ├── technical_status.md       # Current state
    ├── ROADMAP.md                # High-level roadmap
    ├── api_contract_standards.md # API contract details
    ├── patterns/                 # Pattern library
    ├── workflows/                # System workflow documentation
    ├── bug_fixes/                # Change documentation
    ├── tech-status/              # Archived cycle details
    ├── roadmap/                  # Detailed cycle plans
    └── reference_library/        # Descriptive context
```

---

## 10. Critical Rules

### ALWAYS

- ✅ Check patterns before implementing
- ✅ Use MCP tools for context
- ✅ Follow API contract standards
- ✅ Update technical_status.md after changes
- ✅ Write tests that match implementation
- ✅ Use auto-generated TypeScript types
- ✅ Follow Two-Tier Planning System
- ✅ Get user approval before building

### NEVER

- ❌ Skip pattern check
- ❌ Create endpoints without response_model
- ❌ Use direct fetch() in components
- ❌ Update docs during bug fix iteration
- ❌ Write tests for planned features (only actual)
- ❌ Manual TypeScript type definitions for API responses
- ❌ Build without approved plan
- ❌ Chain planning and execution in single response

---

## 11. Conclusion

This Context Master Guide is the foundation of TaskFlow Pro's development discipline. By maintaining these documents and following these protocols, we ensure:

- ✅ Consistent architecture across all features
- ✅ Knowledge preservation through team changes
- ✅ AI assistants with full project context
- ✅ Rapid onboarding of new developers
- ✅ Quality at scale without technical debt

**Remember: The project is only as good as its documentation. Keep this guide current, and the project will thrive.**

---

**Last Major Update:** February 2026
**Framework Version:** FluxFrame 0.5.0
**Next Review:** March 2026
