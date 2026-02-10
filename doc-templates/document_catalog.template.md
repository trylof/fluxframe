# {{PROJECT_NAME}}: Document Catalog

<!--
INSTRUCTIONS FOR AI ASSISTANT:
This is the detailed reference catalog of all project documentation.
It describes what each document is, how to use it, and when to update it.
This file is NOT always-loaded — read it on-demand via MCP tools or when starting a session.
Fill {{PLACEHOLDERS}} based on the project questionnaire responses.
-->

## Purpose

This catalog describes every document in the `{{DOCS_DIR}}` directory — what it is, how to use it, and when to update it. For the project's core philosophy, activation protocol, and development workflow, see `AGENTS.md` (always loaded).

---

## System Workflows & Architecture

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

---

## A. The Vision & Architecture: `{{TECH_BLUEPRINT_FILE}}`

<!-- AI ASSISTANT: Default filename is 'techblueprint.md' or 'architecture.md' -->

*   **What it is:** The strategic north star. It defines the "why" behind the project, the overall system architecture, the core {{ARCHITECTURE_CONCEPTS}}, and the guiding technical principles.
*   **How to use it:** Read this first to understand the project's goals and the high-level technical design. All major architectural decisions must be reflected here.

## B. The Ground Truth (Domain Knowledge): `{{DOMAIN_EXPERTISE_FILE}}`

<!-- AI ASSISTANT: Optional - only if project has specialized domain expertise to codify -->

*   **What it is:** The codified expertise of {{DOMAIN_EXPERT_ROLE}}. It details the {{DOMAIN_PROCESS}} that the system implements or supports.
*   **How to use it:** This is the primary source for defining {{SYSTEM_ANALYTICAL_APPROACH}}. When designing {{CORE_FUNCTIONALITY}}, they must align with the inputs, workflow, and outputs described in this document.

## C. The "How" - Implementation Roadmap: `{{IMPLEMENTATION_PLAN_FILE}}`

<!-- AI ASSISTANT: Default filename is 'ROADMAP.md' -->

*   **What it is:** The detailed, phased technical plan for building the system. It translates the {{TECH_BLUEPRINT_FILE}} vision and domain expertise into a concrete, step-by-step engineering plan.
*   **How to use it:** This is the primary guide for development cycles. It defines the domain models, technology choices, and phased deliverables. It must be updated to reflect progress and any deviations from the original plan.

## D. The Current State - Technical Status: `technical_status.md`

*   **What it is:** Real-time documentation of the current implementation state, architecture status, and development cycle progress. It follows a **Modular Architecture**: the master file tracks current work, while finished cycles are archived in the `tech-status/` directory.
*   **How to use it:** This is the **primary reference for development status**. It must be updated after every cycle completion. When a cycle is finished, its detailed implementation records are moved to `tech-status/archived_cycle_X.md` to keep the master file concise and optimized for AI context.
*   **Key components:**
    - `technical_status.md`: Master file (Current architecture + Active cycle)
    - `tech-status/`: Directory for archived cycle details and deep history.

## E. The Quality Assurance Framework: `{{TESTS_DIR}}/` Directory

<!-- AI ASSISTANT: Default is 'tests/' directory -->

*   **What it is:** A comprehensive, living testing framework that ensures quality and reliability across all development cycles. Contains {{TEST_TYPES}}.
*   **How to use it:** **MANDATORY for every cycle completion**. Tests must be run and pass before any cycle is marked complete. The testing framework evolves with the project and provides regression testing for all previous functionality.
*   **Key components:**
    - `{{TESTS_DIR}}/{{TEST_CATEGORY_1}}/` - {{TEST_DESCRIPTION_1}}
    - `{{TESTS_DIR}}/{{TEST_CATEGORY_2}}/` - {{TEST_DESCRIPTION_2}}
    - `{{TESTS_DIR}}/testing_methodology.md` - Testing process and standards

## F. Implementation Plans: High-Level & Detailed

**Structure:**
*   **High-Level Roadmap:** `{{IMPLEMENTATION_PLAN_FILE}}` - Strategic development cycle roadmap
*   **Detailed Plans:** `roadmap/` directory - Granular implementation guides for specific cycles

**Hierarchy & Alignment:**
*   The high-level plan provides strategic overview and references detailed plans
*   Each cycle with a detailed plan MUST include: `**Detailed Plan:** See roadmap/{{CYCLE_PREFIX}}_X_X_IMPLEMENTATION_PLAN.md`
*   Detailed plans expand on the high-level summary with technical specifications, timelines, and testing strategies

**Critical Alignment Rules:**

1. **Status Synchronization:**
   - If high-level plan shows cycle as "PLANNING", detailed plan must show "PLANNING"
   - If high-level plan shows cycle as "COMPLETE", detailed plan must show "COMPLETE"
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
*   **Status:** PLANNING
*   **Primary Inputs:** {{INPUTS}}
*   **Visible Output:** {{OUTPUT}}
*   **Timeline:** {{TIMELINE}}
*   **Detailed Plan:** See `roadmap/{{CYCLE_PREFIX}}_1_1_IMPLEMENTATION_PLAN.md`

# Detailed Plan (roadmap/{{CYCLE_PREFIX}}_1_1_IMPLEMENTATION_PLAN.md)
**Status:** PLANNING
**Primary Inputs:** {{INPUTS}} (detailed)
**Visible Output:** {{OUTPUT}} (detailed description)
**Timeline:** {{TIMELINE}}
```

**Red Flags (Indicates Drift):**
- High-level says "COMPLETE" but detailed plan says "PLANNING"
- Different timeline estimates between documents
- High-level references detailed plan that doesn't exist
- Detailed plan exists but high-level doesn't reference it
- Contradictory scope or output descriptions

## G. The Unknowns - Stakeholder Questions: `reference_library/open_questions/` subdirectory

<!-- AI ASSISTANT: Optional - include if project has stakeholder involvement -->

*   **What it is:** A living archive of strategic questions that the development team cannot answer alone. These are questions about business logic, user experience, and priorities that require input from project leadership or clients.
*   **How to use it:** The development team adds question files here as they arise to avoid making assumptions. The project lead is responsible for driving these questions to resolution. Once answered, the solution is promoted to `ROADMAP.md` (as a feature) or `patterns/` (as a decision) and the question is archived.

## H. The Pattern Library - Architectural Patterns & Templates: `patterns/` Directory

*   **What it is:** A comprehensive reference library of established patterns, templates, and conventions for common technical challenges. Located in `{{DOCS_DIR}}/patterns/`, it documents the "how we do things" for {{PATTERN_CATEGORIES}}.
*   **Key Pattern Documents:**
    - **`{{PATTERN_CATEGORY_1}}_patterns.md`** - {{PATTERN_DESCRIPTION_1}}
    - **`{{PATTERN_CATEGORY_2}}_patterns.md`** - {{PATTERN_DESCRIPTION_2}}
    - **`{{PATTERN_CATEGORY_3}}_patterns.md`** - {{PATTERN_DESCRIPTION_3}}
*   **How to use it:** **MANDATORY check before implementing any new feature.** This document prevents reinventing the wheel by providing canonical solutions to solved problems. When you encounter a new pattern during development, document it here immediately so the next developer can benefit. This is how we build institutional knowledge and maintain architectural consistency as the system grows.
*   **Update frequency:** After every cycle that establishes a new pattern or identifies an inconsistency that needs harmonization.

## I. API Contract Standard

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
    - Runtime validation on backend
    - Compile-time type checking on frontend (if typed language)
    - Self-documenting APIs
    - Breaking changes caught immediately
    - Consistent error handling
*   **Reference:** See `patterns/api_contract_pattern.md` for complete guide
*   **Update frequency:** Every new endpoint must follow this standard. No exceptions.

## J. Infrastructure & Environment Strategy

<!-- AI ASSISTANT: Dedicated section for hosting and deployment strategy -->

*   **What it is:** The map of where the system lives. It defines the environment matrix (Dev/Test/Staging/Prod), deployment pipelines, secret management, and hosting providers. This information is tracked in the Infrastructure & Environments section of `technical_status.md`.
*   **How to use it:** Reference this when setting up new environments, troubleshooting deployment issues, or planning infrastructure changes. It ensures that environments remain consistent and reproducible.
*   **Key Components:**
    - **Environment Matrix:** Status, URLs, and platforms for Dev, Test, Staging, and Production.
    - **CI/CD Pipeline:** How code is built, tested, and deployed.
    - **Config Management:** How secrets and environment variables are handled.
    - **IaC Tooling:** What tools manage cloud resources (Terraform, Pulumi, etc.).

## J.5. Seed Data & Test Fixtures: `seed_data/` Directory

<!-- AI ASSISTANT: This section documents the seed data infrastructure for AI context, testing, and development -->

*   **What it is:** Reference data for AI context, automated testing, and local development. Contains fixtures, sample data, and factory functions that help AI agents understand the domain and provide consistent test data.
*   **How to use it:**
    - **AI Agents:** Point to `seed_data/samples/` when asking AI to build features. This gives concrete examples of domain entities.
    - **Tests:** Import from `seed_data/fixtures/` for deterministic test data with known values.
    - **Development:** Use sample data for realistic UI rendering and feature development.
*   **Directory Structure:**
    - `fixtures/` - Deterministic test data (JSON/YAML)
    - `samples/` - Representative examples for AI context
    - `factories/` - Functions that generate varied test data
    - `schemas/` - Data type definitions for validation
*   **Update triggers:**
    - New entity types added to the system
    - Schema changes (fields added/removed)
    - New test scenarios needed
    - Edge cases discovered during development
*   **Reference:** See `seed_data/README.md` for detailed usage and conventions.

## J.6. The Reference Library (Descriptive Context): `reference_library/` Directory

<!-- AI ASSISTANT: This section documents the Reference Library - real-world context that INFORMS but doesn't DICTATE -->

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

*   **Update triggers:**
    - New correspondence received from stakeholders
    - User research conducted (interviews, surveys, feedback)
    - Market research updated (competitor analysis, industry reports)
    - Domain knowledge expanded (expert input, regulatory changes)

*   **Reference:** See `reference_library/README.md` for philosophy, document templates, and maintenance guidelines.

## K. Additional Domain-Specific Documents

<!-- AI ASSISTANT: Add any project-specific documents here -->
<!-- Examples: dashboard_architecture.md, ai_assistant_design.md, data_model.md -->

*   **[{{CUSTOM_DOC_1}}](./{{CUSTOM_DOC_1}})** - {{CUSTOM_DOC_1_DESCRIPTION}}
*   **[{{CUSTOM_DOC_2}}](./{{CUSTOM_DOC_2}})** - {{CUSTOM_DOC_2_DESCRIPTION}}

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
