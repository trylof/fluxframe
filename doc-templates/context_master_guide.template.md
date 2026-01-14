# {{PROJECT_NAME}}: The Context Master Guide

<!-- 
INSTRUCTIONS FOR AI ASSISTANT:
This template creates the "mind" of your project - the single source of truth for vision, architecture, and implementation.
Fill {{PLACEHOLDERS}} based on the project questionnaire responses.
Keep universal principles intact - these are proven best practices.
Adapt examples to the specific project domain.
-->

## 1. Philosophy: Documents as the Source of Truth

This project treats its documentation not as an afterthought, but as a core component of the product itself. The documents in this `{{DOCS_DIR}}` directory represent the "mind" of the project—the single source of truth for its vision, architecture, and implementation strategy.

**Our core principle is simple: If it's not in the docs, it doesn't exist.**

This approach ensures that all team members, technical and non-technical, are always aligned on a shared reality. It is the responsibility of every team member to ensure these documents are kept **current, clear, and accurate** after every development cycle.

---

## 2. The Core Context Documents

This directory contains the essential guides for understanding and building the {{PROJECT_NAME}} platform. All key documents referenced below are located in the `{{DOCS_DIR}}` directory.

<!-- AI ASSISTANT: Customize this section based on which documents the project actually needs -->

### 2.1 System Workflows & Architecture

<!-- AI ASSISTANT: If project includes workflow documentation, keep this section. Otherwise remove. -->

**Comprehensive workflow documentation**

Located in `{{DOCS_DIR}}/workflows/`:

- **[workflows/README.md](./workflows/README.md)** - Navigation guide and maintenance guidelines
- **[workflows/user_journey.md](./workflows/user_journey.md)** - Standard user workflow from {{START_STATE}} to {{END_STATE}}
- **[workflows/admin_journey.md](./workflows/admin_journey.md)** - Admin system management workflows
- **[workflows/technical_data_flows.md](./workflows/technical_data_flows.md)** - How data flows through the system (pseudo-technical)
- **[workflows/component_reference.md](./workflows/component_reference.md)** - Catalog of all {{COMPONENT_TYPES}}

**Purpose:** Explain how {{PROJECT_NAME}} works to different audiences:
- Product team & stakeholders: Use user/admin journeys
- Engineering team: Use technical data flows
- External partners: Use technical data flows for credibility
- AI assistants: Use for system understanding

**Update Triggers:**
- New user-facing features
- Changes to conceptual logic/architecture
- New {{COMPONENT_TYPES}} added
- Database schema changes

**Do NOT update for:**
- {{MODEL_PROVIDER}} model swaps (if using AI/LLM)
- Performance optimizations (same logic)
- Bug fixes
- Infrastructure changes

### A. The Vision & Architecture: `{{TECH_BLUEPRINT_FILE}}`

<!-- AI ASSISTANT: Default filename is 'techblueprint.md' or 'architecture.md' -->

*   **What it is:** The strategic north star. It defines the "why" behind the project, the overall system architecture, the core {{ARCHITECTURE_CONCEPTS}}, and the guiding technical principles.
*   **How to use it:** Read this first to understand the project's goals and the high-level technical design. All major architectural decisions must be reflected here.

### B. The Ground Truth (Domain Knowledge): `{{DOMAIN_EXPERTISE_FILE}}`

<!-- AI ASSISTANT: Optional - only if project has specialized domain expertise to codify -->
<!-- Example: For M&A tool, this might be 'human_workflow_org_values_in_mna_dd.md' -->
<!-- For generic projects, this might be 'business_requirements.md' or 'domain_model.md' -->

*   **What it is:** The codified expertise of {{DOMAIN_EXPERT_ROLE}}. It details the {{DOMAIN_PROCESS}} that the system implements or supports.
*   **How to use it:** This is the primary source for defining {{SYSTEM_ANALYTICAL_APPROACH}}. When designing {{CORE_FUNCTIONALITY}}, they must align with the inputs, workflow, and outputs described in this document.

### C. The "How" - Implementation Roadmap: `{{IMPLEMENTATION_PLAN_FILE}}`

<!-- AI ASSISTANT: Default filename is 'ROADMAP.md' -->

*   **What it is:** The detailed, phased technical plan for building the system. It translates the {{TECH_BLUEPRINT_FILE}} vision and domain expertise into a concrete, step-by-step engineering plan.
*   **How to use it:** This is the primary guide for development cycles. It defines the domain models, technology choices, and phased deliverables. It must be updated to reflect progress and any deviations from the original plan.

### D. The Current State - Technical Status: `technical_status.md`

*   **What it is:** Real-time documentation of the current implementation state, architecture status, and development cycle progress. It follows a **Modular Architecture**: the master file tracks current work, while finished cycles are archived in the `tech-status/` directory.
*   **How to use it:** This is the **primary reference for development status**. It must be updated after every cycle completion. When a cycle is finished, its detailed implementation records are moved to `tech-status/archived_cycle_X.md` to keep the master file concise and optimized for AI context.
*   **Key components:**
    - `technical_status.md`: Master file (Current architecture + Active cycle)
    - `tech-status/`: Directory for archived cycle details and deep history.

### E. The Quality Assurance Framework: `{{TESTS_DIR}}/` Directory

<!-- AI ASSISTANT: Default is 'tests/' directory -->

*   **What it is:** A comprehensive, living testing framework that ensures quality and reliability across all development cycles. Contains {{TEST_TYPES}}.
*   **How to use it:** **MANDATORY for every cycle completion**. Tests must be run and pass before any cycle is marked complete. The testing framework evolves with the project and provides regression testing for all previous functionality.
*   **Key components:**
    - `{{TESTS_DIR}}/{{TEST_CATEGORY_1}}/` - {{TEST_DESCRIPTION_1}}
    - `{{TESTS_DIR}}/{{TEST_CATEGORY_2}}/` - {{TEST_DESCRIPTION_2}}
    - `{{TESTS_DIR}}/testing_methodology.md` - Testing process and standards

### F. Implementation Plans: High-Level & Detailed 

**Structure:**
*   **High-Level Roadmap:** `{{IMPLEMENTATION_PLAN_FILE}}` - Strategic development cycle roadmap
*   **Detailed Plans:** `roadmap/` directory - Granular implementation guides for specific cycles

**Hierarchy & Alignment:**
*   The high-level plan provides strategic overview and references detailed plans
*   Each cycle with a detailed plan MUST include: `**Detailed Plan:** See roadmap/{{CYCLE_PREFIX}}_X_X_IMPLEMENTATION_PLAN.md`
*   Detailed plans expand on the high-level summary with technical specifications, timelines, and testing strategies

**Critical Alignment Rules:**

1. **Status Synchronization:**
   - If high-level plan shows cycle as "PLANNING", detailed plan must show "📋 PLANNING"
   - If high-level plan shows cycle as "COMPLETE", detailed plan must show "✅ COMPLETE"
   - Statuses must NEVER diverge

2. **Purpose & Output Alignment:**
   - "Primary Inputs" and "Visible Output" in high-level MUST match detailed plan's purpose/goals
   - Any discrepancy indicates documentation drift and must be resolved immediately

3. **Dependency Chain Integrity:**
   - If detailed plan says "Depends On: Cycle X", high-level plan must show X as prerequisite
   - Timeline estimates in detailed plan should correlate with high-level sequence

4. **When to Create Detailed Plan:**
   - Create when cycle moves from concept to active planning
   - High-level entry created FIRST (strategic vision)
   - Detailed plan created SECOND (technical execution)
   - Both updated together as work progresses

5. **Update Triggers (Both documents):**
   - Cycle status changes (Planning → In Progress → Complete)
   - Scope changes or requirement updates
   - Technical approach pivots
   - Timeline adjustments

6. **Validation Protocol:**
   - Before marking cycle complete, verify both documents aligned
   - MCP tool `validate_{{CYCLE_TYPE}}_completion` checks alignment
   - Manual review required if documents were edited separately

**Example Alignment:**

```markdown
# High-Level ({{IMPLEMENTATION_PLAN_FILE}})
### {{CYCLE_PREFIX}} 1.1: {{CYCLE_NAME}}
*   **Status:** 📋 PLANNING
*   **Primary Inputs:** {{INPUTS}}
*   **Visible Output:** {{OUTPUT}}
*   **Timeline:** {{TIMELINE}}
*   **Detailed Plan:** See `roadmap/{{CYCLE_PREFIX}}_1_1_IMPLEMENTATION_PLAN.md`

# Detailed Plan (roadmap/{{CYCLE_PREFIX}}_1_1_IMPLEMENTATION_PLAN.md)
**Status:** 📋 PLANNING
**Primary Inputs:** {{INPUTS}} (detailed)
**Visible Output:** {{OUTPUT}} (detailed description)
**Timeline:** {{TIMELINE}}
```

**Red Flags (Indicates Drift):**
- ❌ High-level says "COMPLETE" but detailed plan says "PLANNING"
- ❌ Different timeline estimates between documents
- ❌ High-level references detailed plan that doesn't exist
- ❌ Detailed plan exists but high-level doesn't reference it
- ❌ Contradictory scope or output descriptions

### G. The Unknowns - Stakeholder Questions: `open_questions.md`

<!-- AI ASSISTANT: Optional - include if project has stakeholder involvement -->

*   **What it is:** A living list of strategic questions that the development team cannot answer alone. These are questions about business logic, user experience, and priorities that require input from project leadership or clients.
*   **How to use it:** The development team adds questions here as they arise to avoid making assumptions. The project lead is responsible for driving these questions to resolution and ensuring the answers are then reflected in the other context documents.

### H. The Pattern Library - Architectural Patterns & Templates: `patterns/` Directory

*   **What it is:** A comprehensive reference library of established patterns, templates, and conventions for common technical challenges. Located in `{{DOCS_DIR}}/patterns/`, it documents the "how we do things" for {{PATTERN_CATEGORIES}}.
*   **Key Pattern Documents:**
    - **`{{PATTERN_CATEGORY_1}}_patterns.md`** - {{PATTERN_DESCRIPTION_1}}
    - **`{{PATTERN_CATEGORY_2}}_patterns.md`** - {{PATTERN_DESCRIPTION_2}}
    - **`{{PATTERN_CATEGORY_3}}_patterns.md`** - {{PATTERN_DESCRIPTION_3}}
*   **How to use it:** **MANDATORY check before implementing any new feature.** This document prevents reinventing the wheel by providing canonical solutions to solved problems. When you encounter a new pattern during development, document it here immediately so the next developer can benefit. This is how we build institutional knowledge and maintain architectural consistency as the system grows.
*   **Update frequency:** After every cycle that establishes a new pattern or identifies an inconsistency that needs harmonization.

### I. API Contract Standard

<!-- AI ASSISTANT: Customize based on chosen API contract approach (OpenAPI/GraphQL/JSON Schema/Custom) -->
<!-- See ai-assisted-dev-framework/doc-templates/api_contract_standards.template.md -->

*   **What it is:** The **MANDATORY** standard for all API development going forward. Establishes contract-first design with {{API_CONTRACT_APPROACH}}.
*   **Core Principle:** **{{API_CONTRACT_ENFORCEMENT_RULE}}**
*   **How to use it:**
    1. **Backend:** {{BACKEND_CONTRACT_STEP_1}}
    2. **Backend:** {{BACKEND_CONTRACT_STEP_2}}
    3. **Backend:** {{BACKEND_CONTRACT_STEP_3}}
    4. **Frontend:** {{FRONTEND_CONTRACT_STEP_1}}
    5. **Frontend:** {{FRONTEND_CONTRACT_STEP_2}}
*   **Benefits:**
    - ✅ Runtime validation on backend
    - ✅ Compile-time type checking on frontend (if typed language)
    - ✅ Self-documenting APIs
    - ✅ Breaking changes caught immediately
    - ✅ Consistent error handling
*   **Reference:** See `patterns/api_contract_pattern.md` for complete guide
*   **Update frequency:** Every new endpoint must follow this standard. No exceptions.

### J. Infrastructure & Environment Strategy

<!-- AI ASSISTANT: Dedicated section for hosting and deployment strategy -->

*   **What it is:** The map of where the system lives. It defines the environment matrix (Dev/Test/Staging/Prod), deployment pipelines, secret management, and hosting providers. This information is tracked in the Infrastructure & Environments section of `technical_status.md`.
*   **How to use it:** Reference this when setting up new environments, troubleshooting deployment issues, or planning infrastructure changes. It ensures that environments remain consistent and reproducible.
*   **Key Components:**
    - **Environment Matrix:** Status, URLs, and platforms for Dev, Test, Staging, and Production.
    - **CI/CD Pipeline:** How code is built, tested, and deployed.
    - **Config Management:** How secrets and environment variables are handled.
    - **IaC Tooling:** What tools manage cloud resources (Terraform, Pulumi, etc.).

### K. Additional Domain-Specific Documents

<!-- AI ASSISTANT: Add any project-specific documents here -->
<!-- Examples: dashboard_architecture.md, ai_assistant_design.md, data_model.md -->

*   **[{{CUSTOM_DOC_1}}](./{{CUSTOM_DOC_1}})** - {{CUSTOM_DOC_1_DESCRIPTION}}
*   **[{{CUSTOM_DOC_2}}](./{{CUSTOM_DOC_2}})** - {{CUSTOM_DOC_2_DESCRIPTION}}

---

## 3. The Golden Rule: Maintain the Mind

After any significant change—a feature is built, an architectural decision is made, a new technology is chosen—the first step after implementation is to **update these documents.**

### **Critical Update Sequence for Every Development Cycle:**

**BEFORE Implementation:**
0. **Check for Patterns:** Use `check_pattern_exists()` MCP tool with description of what you're building
   - If pattern exists → Read it and follow exactly
   - If no pattern exists → Proceed with implementation and plan to document the new pattern

**DURING Implementation:**
1. **First:** Implement the {{BACKEND_COMPONENT}} functionality WITH REAL COMPONENTS (no stubs)
2. **Second:** **Deploy & Verify in {{VERIFICATION_ENV}}** - {{VERIFICATION_INSTRUCTIONS}}
3. **Third:** **ALIGN ALL TESTING WITH ACTUAL IMPLEMENTATION** - Ensure test data, instructions, and validation precisely match what was built
4. **Fourth:** RUN AND PASS ALL TESTS ({{TEST_TYPES}}) - using correctly aligned test data

**AFTER Implementation:**
5. **Fifth:** Update `technical_status.md` with what was built, what's working, what's broken, and next steps
6. **Sixth:** Update test documentation and create/update tests for new functionality
7. **Seventh:** **Update `patterns/`** if new patterns were established or existing ones were applied
8. **Eighth:** {{CUSTOM_UPDATE_STEP}} (if applicable)
9. **Ninth:** Update other relevant project documents as needed

**FINAL Alignment Check:**
10. **Verify Protocol Alignment:** Check that your AI agent configuration (e.g., `AGENTS.md`, `.clinerules`, `.roomodes`) matches the `context_master_guide.md` content.
    - Compare the "Before starting code work" and "Before marking work complete" protocols.
    - Raise concerns if workflow descriptions have diverged.
    - Update your rules if the master guide workflow has changed.

### **🚨 CRITICAL ALIGNMENT RULE: Test Data Must Match Implementation**

**Before any cycle is marked complete, ALL testing components must be verified to match the actual implementation:**

- **Test Documents**: Must match the exact input types and scenarios the cycle handles
- **{{TEST_TYPE_1}}**: Must test the actual workflows users can perform  
- **{{TEST_TYPE_2}}**: Must validate the specific capabilities implemented
- **{{TEST_TYPE_3}}**: Must test the actual services and endpoints built
- **Expected Outputs**: Must match the actual data structures and {{OUTPUT_FORMAT}}

**Example validation:**
- ❌ **WRONG**: {{WRONG_TEST_SCENARIO}}
- ✅ **CORRECT**: {{CORRECT_TEST_SCENARIO}}

**Validation Questions for Every Cycle:**
1. Do the test documents match the Primary Inputs specified in the implementation plan?
2. Do the test instructions test the exact workflows the {{USER_INTERFACE}} enables?
3. Do the expected outputs match what the {{OUTPUT_DESTINATION}} actually displays?
4. Can a user follow the {{MANUAL_TEST_TYPE}} using the actual deployed application?

**CRITICAL RULE: No cycle is EVER complete while running on stubs. We have eliminated all stub modes from the system.**

**Our "Real {{COMPONENT_TYPE}} Always" Policy:**
- **Development & Production:** Both environments use identical code paths with real {{EXTERNAL_SERVICE}} calls
- **Testing:** Uses proper {{TESTING_FRAMEWORK}} mocking at the {{MOCK_BOUNDARY}}, not fake business logic
- **No Stub Modes:** We never use fake data generation or simulated responses in any environment
- **Consistency:** This ensures development, testing, and production all behave identically

**No cycle is complete without:**
- ✅ Real {{EXTERNAL_SERVICE}} calls (never stub responses)
- ✅ Visible {{UI_COMPONENT}} results 
- ✅ All unit tests passing (using proper API mocking)
- ✅ Integration tests passing for current cycle
- ✅ {{MANUAL_TEST_TYPE}} completed with documented results
- ✅ {{AUTOMATED_TEST_TYPE}} validating functionality
- ✅ No regression in previous cycle functionality
- ✅ Updated documentation (including test documentation)
- ✅ End-to-end functionality with production components
- ✅ Patterns documented in `patterns/`
- ✅ **API Contract Standard compliance**:
  - Backend: ALL new endpoints have {{CONTRACT_VALIDATION}}
  - Backend: ALL new endpoints explicitly map service data to {{CONTRACT_MODEL}}
  - Backend: ALL new endpoints have return type annotations
  - Frontend: NO direct {{HTTP_CLIENT}} calls (use {{API_CLIENT_MODULE}})
  - Frontend: Proper error handling with {{ERROR_CLASS}}
  - Reference: `patterns/api_contract_pattern.md`

**The Testing Golden Rule: A cycle that hasn't been tested is not complete - it's just code.**

**The Pattern Library Golden Rule: Before implementing any feature, check `patterns/` first. If a pattern exists, use it. If not, create one and document it.**

Maintaining this "master context" is the key to our ability to build a complex {{SYSTEM_TYPE}} with clarity, alignment, and speed.

---

## 4. The Pattern-Driven Development Workflow

As {{PROJECT_NAME}} grows in complexity, maintaining architectural consistency becomes critical. Our **Pattern Library** (`patterns/`) is the foundation of this consistency.

### **Before Starting Any New Feature:**

1. **Check the Pattern Library**
   - Does a canonical pattern exist for your use case?
   - Has someone already solved this problem?
   - Example: {{PATTERN_EXAMPLE}}

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

**This is how we scale from a small project to an enterprise platform without accumulating technical debt.**

---

## 5. Change Request Protocol: Systematic Fixing, Refining & Documentation

When a change request is made (bug, refinement, requirement change, misinterpretation, or alteration), follow this structured workflow:

### **Phase 1: Change Analysis (Immediate)**

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
   - Location: `{{CHANGES_DIR}}/<COMPONENT>_<ISSUE>.md`
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

10. **Update Workflow Documentation (if applicable):**
    - MCP tool: `validate_workflow_documentation(changes_made, description)`
    - If workflow logic/concepts changed, update relevant workflow docs

11. **Update {{CUSTOM_CONTEXT}} (if applicable):**
    - If change affected queryable data or capabilities
    - Update {{AI_COMPONENT}}'s understanding of the system

12. **MCP tool: `close_change_request(change_id, documentation_file)`**
    - Marks change as resolved
    - Sets archive date (1 month from now)
    - Clears tracking state

### **Phase 4: Verification (Post-Deployment)**

13. **Monitor in Production:**
    - Verify change holds in production
    - Watch for regression
    - Update documentation if issues arise

### **Phase 5: Archive (After 1 Month)**

14. **Automatic Archive:**
    - After 1 month, change docs can be archived
    - Knowledge is preserved in technical_status.md
    - Specific fix details available in git history

### **Change Documentation Template**

Standard template for `{{CHANGES_DIR}}/` directory:

```markdown
# <Component> <Issue> - <Change Type>

**Date:** <date>
**Status:** ✅ FIXED AND DEPLOYED
**Change Type:** <Bug|Refinement|Requirement Change|Misinterpretation|Alteration>
**Archive Date:** <date + 1 month>

## Problem Description / Rationale

<Clear description of the issue/change request as user experienced it>
<For bugs: What was broken>
<For refinements: What needed improvement>
<For requirement changes: What changed and why>
<For misinterpretations: What was built vs. what was wanted>
<For alterations: What needed adjustment>
<Include screenshots if relevant>

## Root Cause / Analysis

<Technical explanation of WHY>
<For bugs: WHY the bug occurred>
<For others: WHY the change was needed>
<Reference specific code/logic that was problematic>

## Solution

<How the change was made>
<Code snippets showing key changes>

### Key Changes

1. **Change 1** - What and why
2. **Change 2** - What and why

## Impact

- ✅ <What now works correctly / What improved>
- ✅ <Side benefits>
- ✅ <What was validated>

## Testing

Test scenarios performed:
1. <Scenario 1>
2. <Scenario 2>

## Files Modified

- `path/to/file1.ext` - Brief description of changes
- `path/to/file2.ext` - Brief description of changes

## Documentation Updated

- [x] `{{CHANGES_DIR}}/<THIS_FILE>.md` - This change documentation
- [x] `technical_status.md` - Recently Fixed/Changed section
- [ ] `patterns/` - Pattern update (if applicable)
- [ ] `workflows/` - Workflow documentation (if applicable)
- [ ] {{CUSTOM_CONTEXT}} (if applicable)

## Related Issues

- Links to similar changes
- Part of broader pattern/issue

## Deployment

- Commit: `<hash>`
- Deployed to: <environment>
- Verification: <how confirmed in production>
```

### **Integration with Development Cycle Workflow**

**Development Cycles (New Features):**
- Uses context_master_guide.md
- Uses MCP tools for validation
- Documents progressively during build
- ✅ **STANDARD WORKFLOW**

**Change Requests (Fixes/Refinements):**
- Uses context_master_guide.md (this section 5)
- Uses MCP tools for tracking
- Documents ONLY after user confirmation
- ✅ **CHANGE WORKFLOW**

**Shared Resources:**
- Both workflows update Pattern Library when applicable
- Both workflows update Technical Status
- Both workflows maintain documentation quality standards

---

## 6. Pattern Status Levels

<!-- Reference: From pattern library best practices -->

Patterns in the library have different status levels:

- **Canonical:** Reference implementation, use exactly as documented
- **Established:** Proven pattern, use consistently
- **Mandatory:** Must be used in all applicable cases
- **Needs Harmonization:** Inconsistencies exist, standardization required
- **Experimental:** New pattern being evaluated
- **Deprecated:** No longer recommended, migration path provided

---

## 7. Conclusion

This Context Master Guide is the foundation of {{PROJECT_NAME}}'s development discipline. By maintaining these documents and following these protocols, we ensure:

- ✅ Consistent architecture across all features
- ✅ Knowledge preservation through team changes
- ✅ AI assistants with full project context
- ✅ Rapid onboarding of new developers
- ✅ Quality at scale without technical debt

**Remember: The project is only as good as its documentation. Keep this guide current, and the project will thrive.**

---

<!-- AI ASSISTANT FINAL CHECKLIST:
- [ ] All {{PLACEHOLDERS}} replaced with project-specific values
- [ ] Removed optional sections not applicable to this project
- [ ] Added project-specific sections as needed
- [ ] Validated all file paths and cross-references
- [ ] Ensured terminology is consistent throughout
- [ ] Verified alignment with project's chosen API contract approach
- [ ] Confirmed testing framework references match project setup
-->
