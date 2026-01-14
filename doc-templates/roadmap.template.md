# {{PROJECT_NAME}} — ROADMAP

<!-- 
INSTRUCTIONS FOR AI ASSISTANT:
This is your project's strategic roadmap - the high-level plan for building the system incrementally.
Replace {{PLACEHOLDERS}} based on project questionnaire responses.
"Development Cycle" or "Iteration" NOT "Steel Thread" or "Sprint"
Use numbered sequential approach: Cycle 1.1, 1.2, etc.
Keep the output-focused methodology intact.

NOTE: This is Tier 1 (Strategic). Detailed tactical plans for each cycle live in `roadmap/`.
-->

**Status:** {{CURRENT_STATUS}} — Updated {{LAST_UPDATE_DATE}}  
**Current Implementation:** {{CURRENT_STATE_DESCRIPTION}}

## 1) Objectives and Non-Goals

<!-- AI ASSISTANT: Define what you're building and what you're explicitly NOT building -->

- **Objectives**
  - {{OBJECTIVE_1}}
  - {{OBJECTIVE_2}}
  - {{OBJECTIVE_3}}
  - Adhere to the Development Cycle methodology: always maintain an end-to-end path that surfaces visible results, while iterating depth and fidelity.
  - {{TECHNICAL_PRINCIPLE_1}}
  - {{TECHNICAL_PRINCIPLE_2}}

- **Non-Goals** (for the initial phases)
  - {{NON_GOAL_1}}
  - {{NON_GOAL_2}}
  - {{NON_GOAL_3}}

## 2) Success Criteria (Initial Phases)

<!-- AI ASSISTANT: Define what "done" looks like for early cycles -->

- **Phase A → B**
  - **Inputs:** {{INPUT_DESCRIPTION_PHASE_AB}}
  - **Output:** {{OUTPUT_DESCRIPTION_PHASE_AB}}
  - **Quality Criteria:** {{QUALITY_CRITERIA_AB}}
  - **Persistence:** {{DATA_PERSISTENCE_REQUIREMENTS_AB}}

- **Phase C → D**
  - {{ENHANCEMENT_DESCRIPTION_CD}}
  - {{ADDITIONAL_CRITERIA_CD}}

## 3) Domain Model ({{PRIMARY_DOMAIN}})

<!-- AI ASSISTANT: Define the core entities and relationships in your system -->

- **{{DOMAIN_CONCEPT_1}}**
  - {{DOMAIN_DESCRIPTION_1}}
  - {{DOMAIN_STRUCTURE_1}}

- **Core Entities**
  - `{{ENTITY_1}}`: { {{ENTITY_1_FIELDS}} }
  - `{{ENTITY_2}}`: { {{ENTITY_2_FIELDS}} }
  - `{{ENTITY_3}}`: { {{ENTITY_3_FIELDS}} }
  - `{{ENTITY_4}}`: { {{ENTITY_4_FIELDS}} }
  <!-- AI ASSISTANT: Add more entities as needed -->

- **{{DATA_STORE_TYPE}} Mapping** (if applicable)
  <!-- AI ASSISTANT: For graph databases, define relationships. For SQL, define foreign keys. For NoSQL, define document structure. -->
  
  {{RELATIONSHIP_CATEGORY_1}}:
  - `(:{{NODE_TYPE_1}})-[:{{RELATIONSHIP_TYPE_1}}]->(:{{NODE_TYPE_2}})`
  - `(:{{NODE_TYPE_3}})-[:{{RELATIONSHIP_TYPE_2}}]->(:{{NODE_TYPE_4}})`
  
  {{RELATIONSHIP_CATEGORY_2}}:
  - {{RELATIONSHIP_DESCRIPTION_1}}
  - {{RELATIONSHIP_DESCRIPTION_2}}

## 4) Inputs and Feasibility

<!-- AI ASSISTANT: What data/inputs does your system process? -->

- **Short-run feasible inputs**
  - {{INPUT_SOURCE_1}}
  - {{INPUT_SOURCE_2}}
  - {{INPUT_SOURCE_3}}

- **Later inputs** (future expansion)
  - {{FUTURE_INPUT_1}}
  - {{FUTURE_INPUT_2}}

## 5) Architecture Overview ({{SYSTEM_NAME}})

<!-- AI ASSISTANT: High-level architecture - how the system works -->

{{ARCHITECTURE_DESCRIPTION}}

**Processing Pipeline:**

1. **Phase 1: {{PHASE_1_NAME}}**
   - **Goal:** {{PHASE_1_GOAL}}
   - **Process:** {{PHASE_1_PROCESS_DESCRIPTION}}

2. **Phase 2: {{PHASE_2_NAME}}**
   - **Goal:** {{PHASE_2_GOAL}}
   - **Process:** {{PHASE_2_PROCESS_DESCRIPTION}}

3. **Phase 3: {{PHASE_3_NAME}}**
   - **Goal:** {{PHASE_3_GOAL}}
   - **Process:** {{PHASE_3_PROCESS_DESCRIPTION}}

<!-- AI ASSISTANT: Add more phases as needed -->

4. **Persistence & Serving**
   - Persist {{DATA_ENTITIES}} to {{DATABASE_TECHNOLOGY}}
   - Serve {{OUTPUT_FORMAT}} to {{FRONTEND_TECHNOLOGY}}
   - {{UI_DESCRIPTION}}

5. **Observability & Evaluation** (if applicable)
   - {{OBSERVABILITY_TOOL}} for tracing {{TRACED_OPERATIONS}}
   - {{EVALUATION_STRATEGY}}
   - {{QUALITY_ASSURANCE_APPROACH}}

## 6) {{TECHNICAL_APPROACH_NAME}} — Principles

<!-- AI ASSISTANT: Core technical principles that guide implementation decisions -->

- **{{PRINCIPLE_1_NAME}}:** {{PRINCIPLE_1_DESCRIPTION}}
- **{{PRINCIPLE_2_NAME}}:** {{PRINCIPLE_2_DESCRIPTION}}
- **{{PRINCIPLE_3_NAME}}:** {{PRINCIPLE_3_DESCRIPTION}}
- **{{PRINCIPLE_4_NAME}}:** {{PRINCIPLE_4_DESCRIPTION}}
- **{{PRINCIPLE_5_NAME}}:** {{PRINCIPLE_5_DESCRIPTION}}
- **{{PRINCIPLE_6_NAME}}:** {{PRINCIPLE_6_DESCRIPTION}}
- **Pluggability:** {{PLUGGABILITY_DESCRIPTION}}
- **Observability:** {{OBSERVABILITY_REQUIREMENTS}}

## 7) Technology Choices (initial, pluggable)

<!-- AI ASSISTANT: Specific technologies - should be swappable via abstractions -->

- **{{TECH_CATEGORY_1}}:** {{TECH_CHOICE_1}} {{FALLBACK_OPTION_1}}
- **{{TECH_CATEGORY_2}}:** {{TECH_CHOICE_2}} {{INTEGRATION_DETAILS_2}}
- **{{TECH_CATEGORY_3}}:** {{TECH_CHOICE_3}} {{SCALE_CONSIDERATIONS_3}}
- **{{TECH_CATEGORY_4}}:** {{TECH_CHOICE_4}} {{PROVIDER_DETAILS_4}}
- **CI/CD:** {{CICD_PLATFORM}}; Infrastructure: {{IaC_TOOL}}/{{CLOUD_PROVIDER}}

## 8) Phased Plan (Output-Focused Development Cycles)

<!-- AI ASSISTANT: The heart of the plan - incremental delivery -->

This plan breaks the work into small, iterative development cycles. Each cycle is designed to produce a tangible, visible change in the application's output, allowing for rapid feedback and continuous progress.

### **🔄 Mandatory Completion Criteria for Every Development Cycle**

Each Development Cycle is only considered **COMPLETE** when ALL of these criteria are met:

1. **✅ {{BACKEND_COMPONENT}} Implementation**: Core functionality implemented and tested
2. **✅ {{UI_COMPONENT}} Integration**: Results visible in the {{UI_LOCATION}}
3. **✅ Documentation Update**: `technical_status.md` updated with implementation details, what's working, what's broken, and next steps
4. **✅ End-to-End Testing**: {{INPUT_STEP}} → {{PROCESS_STEP}} → {{VISIBLE_RESULT}} verified
5. **✅ Pattern Documentation**: New patterns added to `patterns/` directory (if applicable)
6. **✅ {{ADDITIONAL_CRITERION_1}}**: {{ADDITIONAL_DESCRIPTION_1}} (if applicable)

**Rule: No cycle is complete until users can see the results in the application and the documentation reflects the current technical state.**

<!-- AI ASSISTANT: Define each development cycle below. Use consistent format. -->

---

### {{CYCLE_TYPE}} 1.1: {{CYCLE_1_1_NAME}} {{STATUS_EMOJI_1_1}}

*   **Status:** {{CYCLE_1_1_STATUS}}
*   **Completed:** {{CYCLE_1_1_COMPLETION_DATE}} (if complete)
*   **Relevance:** {{RELEVANCE_STATEMENT_1_1}}
*   **Primary Inputs:** {{INPUTS_1_1}}
*   **Visible Output:** {{OUTPUT_DESCRIPTION_1_1}}
*   **Current Capabilities:** {{CAPABILITIES_1_1}} (if complete)
*   **Focus:** {{FOCUS_DESCRIPTION_1_1}}
*   **Detailed Plan:** {{DETAILED_PLAN_LINK_1_1}} (if exists)

**Implementation Checklist:**
- [x] {{TASK_1_1_1}} ✅ {{TASK_1_1_1_STATUS}}
- [x] {{TASK_1_1_2}} ✅ {{TASK_1_1_2_STATUS}}
- [x] {{TASK_1_1_3}} ✅ {{TASK_1_1_3_STATUS}}
- [x] {{TASK_1_1_4}} ✅ {{TASK_1_1_4_STATUS}}

**Key Deliverables:**
- ✅ {{DELIVERABLE_1_1_1}}
- ✅ {{DELIVERABLE_1_1_2}}
- ✅ {{DELIVERABLE_1_1_3}}

---

### {{CYCLE_TYPE}} 1.2: {{CYCLE_1_2_NAME}} {{STATUS_EMOJI_1_2}}

*   **Status:** {{CYCLE_1_2_STATUS}}
*   **Primary Inputs:** {{INPUTS_1_2}}
*   **Visible Output:** {{OUTPUT_DESCRIPTION_1_2}}
*   **Focus:** {{FOCUS_DESCRIPTION_1_2}}
*   **Dependencies:** {{DEPENDENCY_CYCLES_1_2}}
*   **Timeline:** {{ESTIMATED_DURATION_1_2}}

**Implementation Checklist:**
- [ ] {{TASK_1_2_1}}
- [ ] {{TASK_1_2_2}}
- [ ] {{TASK_1_2_3}}

<!-- AI ASSISTANT: Add technical implementation details if helpful -->

#### **{{CYCLE_TYPE}} 1.2: Technical Implementation Details**

**Backend Changes:**
- {{BACKEND_CHANGE_1_2_1}}
- {{BACKEND_CHANGE_1_2_2}}
- {{BACKEND_CHANGE_1_2_3}}

**Frontend Changes:**
- {{FRONTEND_CHANGE_1_2_1}}
- {{FRONTEND_CHANGE_1_2_2}}
- {{FRONTEND_CHANGE_1_2_3}}

**{{ADDITIONAL_CATEGORY_1_2}}:** (optional)
- {{ADDITIONAL_DETAIL_1_2}}

---

### {{CYCLE_TYPE}} 1.3: {{CYCLE_1_3_NAME}} {{STATUS_EMOJI_1_3}}

<!-- AI ASSISTANT: If a cycle is superseded/deprecated, mark clearly -->
*   **Status:** ⚠️ SUPERSEDED
*   **Action:** {{SUPERSEDED_REASON_1_3}}

---

<!-- AI ASSISTANT: Continue with more cycles as needed -->

### {{CYCLE_TYPE}} 1.4: {{CYCLE_1_4_NAME}}
<!-- Same structure as 1.1/1.2 -->

### {{CYCLE_TYPE}} 1.5: {{CYCLE_1_5_NAME}}
<!-- Same structure -->

<!-- AI ASSISTANT: Add as many cycles as needed for the roadmap -->

---

## 9) {{INTEGRATION_PHILOSOPHY_NAME}} (If Applicable)

<!-- AI ASSISTANT: If project has specific design philosophies (e.g., "Dashboard-First", "API-First"), document here -->

**{{PHILOSOPHY_NAME}}:** {{PHILOSOPHY_DESCRIPTION}}

**PRIMARY ({{PRIMARY_PERCENTAGE}}%):** {{PRIMARY_FOCUS}}
- {{PRIMARY_PRINCIPLE_1}}
- {{PRIMARY_PRINCIPLE_2}}
- {{PRIMARY_PRINCIPLE_3}}

**SECONDARY ({{SECONDARY_PERCENTAGE}}%):** {{SECONDARY_FOCUS}}
- {{SECONDARY_PRINCIPLE_1}}
- {{SECONDARY_PRINCIPLE_2}}
- {{SECONDARY_PRINCIPLE_3}}

From {{STARTING_CYCLE}} onward, **EVERY new feature must:**
1. ✅ **{{REQUIREMENT_1}}:** {{REQUIREMENT_1_DESCRIPTION}}
2. ✅ **{{REQUIREMENT_2}}:** {{REQUIREMENT_2_DESCRIPTION}}
3. ✅ **{{REQUIREMENT_3}}:** {{REQUIREMENT_3_DESCRIPTION}}
4. ✅ **{{REQUIREMENT_4}}:** {{REQUIREMENT_4_DESCRIPTION}}

**Design Rule:** {{DESIGN_RULE_SUMMARY}}

---

## 10) Risks & Mitigations

<!-- AI ASSISTANT: Identify technical and project risks with mitigation strategies -->

| Risk | Mitigation Strategy |
|------|---------------------|
| {{RISK_1}} | {{MITIGATION_1}} |
| {{RISK_2}} | {{MITIGATION_2}} |
| {{RISK_3}} | {{MITIGATION_3}} |
| {{RISK_4}} | {{MITIGATION_4}} |

---

## 11) Future Phases ({{CYCLE_TYPE}} 2.0+)

<!-- AI ASSISTANT: Optional - longer-term vision beyond initial roadmap -->

### Advanced Capabilities (Post-{{MILESTONE_VERSION}})

*   **{{FUTURE_CAPABILITY_1}}:** {{FUTURE_DESCRIPTION_1}}
*   **{{FUTURE_CAPABILITY_2}}:** {{FUTURE_DESCRIPTION_2}}
*   **{{FUTURE_CAPABILITY_3}}:** {{FUTURE_DESCRIPTION_3}}

---

## 12) Two-Tier Planning System

<!-- AI ASSISTANT: This is the HIGH-LEVEL strategic roadmap. Detailed tactical plans live in roadmap/ -->

### How It Works

```
┌─────────────────────────────────────────────────────────────────────┐
│  THIS DOCUMENT (ROADMAP.md - Strategic)                             │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│  • Lists ALL planned cycles with brief descriptions                 │
│  • Status tracking (📋 PLANNING → 🏗️ IN PROGRESS → ✅ COMPLETE)    │
│  • Timeline estimates and dependencies                              │
│  • Points to detailed plans when ready to implement                 │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                    When ready to implement a cycle:
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│  roadmap/CYCLE_X_X_IMPLEMENTATION_PLAN.md (Tactical)                │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│  Created JUST-IN-TIME during research/planning phase:              │
│  • Problem statement & research findings                            │
│  • Scope analysis & complexity scoring                              │
│  • Decomposition into sub-cycles (if too large)                     │
│  • Technical design & architecture decisions                        │
│  • Detailed implementation checklist                                │
│  • Test strategy & risk assessment                                  │
└─────────────────────────────────────────────────────────────────────┘
```

### Planning Workflow (Before Each Cycle)

**BEFORE implementing any cycle:**

1. **Call `start_cycle_planning(cycle_id)`** - Initiates planning, checks for existing plan
2. **Research the feature** - Understand problem, check patterns, review codebase
3. **Call `analyze_cycle_scope()`** - Get complexity score and decomposition recommendation
4. **Create detailed plan** - Use template in `roadmap/`
5. **Get user approval** - Review plan together
6. **Call `approve_cycle_plan()`** - Validates plan and marks ready

**ONLY THEN** proceed with implementation using existing development cycle tools.

---

## 13) Alignment with Project Documents

<!-- AI ASSISTANT: Critical - ensure this plan stays in sync with other docs -->

This implementation plan MUST align with:
- **`{{TECH_BLUEPRINT_FILE}}`** - Overall system architecture and vision
- **`technical_status.md`** - Current implementation state
- **`{{DOCS_DIR}}/patterns/`** - Established architectural patterns
- **`roadmap/`** - Detailed cycle-specific plans (created just-in-time)

**Alignment Rules:**
1. Cycle statuses must match between this document and `technical_status.md`
2. Detailed plans must reference this high-level roadmap
3. Any scope changes require updating both high-level and detailed plans
4. If a cycle is decomposed, add sub-cycles (e.g., 1.2a, 1.2b) to this document
5. Pattern documentation must be updated when cycles establish new patterns

---

<!-- 
AI ASSISTANT FINAL CHECKLIST:
- [ ] All {{PLACEHOLDERS}} replaced with project-specific values
- [ ] Cycle numbering is sequential and consistent
- [ ] Each cycle has clear inputs, outputs, and focus
- [ ] Completion criteria defined and realistic
- [ ] Technology choices are pluggable via abstractions
- [ ] Risks identified with mitigation strategies
- [ ] Alignment with other project documents verified
- [ ] Terminology consistent (Cycle/Iteration, NOT Sprint/Feature alone)
- [ ] Optional sections removed if not applicable
- [ ] Two-tier planning system explanation included
-->

---

**This plan centers on {{CORE_VALUE_1}}, {{CORE_VALUE_2}}, and {{CORE_VALUE_3}}, aligned with the Development Cycle approach and {{METHODOLOGY_SOURCE}} guidance.**