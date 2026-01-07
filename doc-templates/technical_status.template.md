# Technical Status & Architecture State

<!-- 
INSTRUCTIONS FOR AI ASSISTANT:
This document is the REAL-TIME state of the project. Update it after EVERY development cycle completion.
IMPORTANT: To prevent this file from becoming too large, follow the Modular Technical Status Architecture pattern:
1. When a development cycle is completed, move its detailed "Implementation Status" and "Key Features" to a new file: `{{DOCS_DIR}}/tech-status/archived_cycle_{{NUMBER}}.md`
2. Replace the detailed section in THIS file with a summary and a link to the archive.
3. Keep ONLY the current active cycle and the most recent architecture changes in this master file.
-->

**Last Updated:** {{CURRENT_DATE}}  
**Current {{CYCLE_TYPE}}:** {{CURRENT_CYCLE_NUMBER}} ({{CURRENT_CYCLE_NAME}}) - {{STATUS_EMOJI_AND_TEXT}}

<!-- AI ASSISTANT: Update status section whenever major architectural changes happen -->
**🚀 MAJOR ARCHITECTURAL CHANGES ({{CHANGE_DATE}}):**
- **{{CHANGE_CATEGORY_1}}:** {{CHANGE_DESCRIPTION_1}}
- **{{CHANGE_CATEGORY_2}}:** {{CHANGE_DESCRIPTION_2}}
<!-- AI ASSISTANT: Add more as needed. Common categories: Architecture Pivot, Infrastructure Overhaul, Framework Migration, etc. -->

---

## 🏗️ Current Architecture Overview

<!-- AI ASSISTANT: Customize based on actual stack -->
### Production Environment
- **Frontend:** {{FRONTEND_FRAMEWORK}} deployed on {{FRONTEND_PLATFORM}}
- **Backend:** {{BACKEND_FRAMEWORK}} deployed on {{BACKEND_PLATFORM}}
- **Database:** {{DATABASE_TECHNOLOGY}}
- **Auth:** {{AUTH_PROVIDER}}
- **CI/CD:** {{CICD_PLATFORM}}

<!-- AI ASSISTANT: Optional - add if project uses specific architectural approaches -->
### Architecture Approach
- **{{ARCHITECTURE_PATTERN_1}}:** {{PATTERN_DESCRIPTION_1}}
- **{{ARCHITECTURE_PATTERN_2}}:** {{PATTERN_DESCRIPTION_2}}

---

## 📊 {{CYCLE_TYPE}} Progress Tracking

<!-- 
AI ASSISTANT INSTRUCTIONS:
- Create one subsection for each development cycle.
- Use status emojis: ✅ COMPLETE | 🚧 IN PROGRESS | 📋 PLANNING | ⏳ UPCOMING | ⚠️ SUPERSEDED.
- ARCHIVING RULE: When a cycle is ✅ COMPLETE, move its full details to the `tech-status/` directory and leave a summary link here.
-->

### ✅ **{{CYCLE_TYPE}} {{CYCLE_NUMBER_1}}: {{CYCLE_NAME_1}}** (Archived)
- **Status:** COMPLETE
- **Archive:** [View Detailed Implementation & Files](./tech-status/archived_cycle_{{CYCLE_NUMBER_1}}.md)
- **Summary:** {{BRIEF_SUMMARY_OF_ACHIEVEMENT}}

---

### ✅ **{{CYCLE_TYPE}} {{CYCLE_NUMBER_X}}: {{CYCLE_NAME_X}}** 
- **Status:** {{CYCLE_STATUS_1}}
- **Completed:** {{COMPLETION_DATE_1}}
- **Target Output:** {{CYCLE_OUTPUT_DESCRIPTION_1}}
- **Relevance:** {{RELEVANCE_STATEMENT_1}}
- **Implementation Status:**
  - [x] **{{COMPONENT_1}}:** ✅ {{COMPONENT_DESCRIPTION_1}}
  - [x] **{{COMPONENT_2}}:** ✅ {{COMPONENT_DESCRIPTION_2}}
  - [x] **{{COMPONENT_3}}:** ✅ {{COMPONENT_DESCRIPTION_3}}
  - [x] **End-to-End Testing:** ✅ {{TESTING_DESCRIPTION_1}}

**Key Features Delivered:**
- ✅ {{FEATURE_1}}
- ✅ {{FEATURE_2}}
- ✅ {{FEATURE_3}}

**Files Created:**
- `{{FILE_PATH_1}}` - {{FILE_DESCRIPTION_1}}
- `{{FILE_PATH_2}}` - {{FILE_DESCRIPTION_2}}

**Files Modified:**
- `{{FILE_PATH_3}}` - {{MODIFICATION_DESCRIPTION_1}}
- `{{FILE_PATH_4}}` - {{MODIFICATION_DESCRIPTION_2}}

**🎉 {{CYCLE_TYPE_UPPER}} {{CYCLE_NUMBER_1}} IS COMPLETE AND OPERATIONAL!**

---

### 🚧 **{{CYCLE_TYPE}} {{CYCLE_NUMBER_2}}: {{CYCLE_NAME_2}}**
- **Status:** {{CYCLE_STATUS_2}}
- **Started:** {{START_DATE_2}}
- **Target Output:** {{CYCLE_OUTPUT_DESCRIPTION_2}}
- **Implementation Status:**
  - [x] **{{COMPONENT_1}}:** ✅ {{COMPONENT_DESCRIPTION_1}}
  - [ ] **{{COMPONENT_2}}:** 🚧 {{COMPONENT_STATUS_2}}
  - [ ] **{{COMPONENT_3}}:** 📋 {{COMPONENT_STATUS_3}}

**Current Focus:** {{CURRENT_WORK_DESCRIPTION}}

**Blockers:** {{BLOCKER_DESCRIPTION_OR_NONE}}

---

### 📋 **{{CYCLE_TYPE}} {{CYCLE_NUMBER_3}}: {{CYCLE_NAME_3}}**
- **Status:** PLANNING
- **Target Output:** {{CYCLE_OUTPUT_DESCRIPTION_3}}
- **Dependencies:** {{DEPENDENCY_CYCLES}}
- **Estimated Effort:** {{TIME_ESTIMATE}}

**Planned Components:**
1. {{PLANNED_COMPONENT_1}}
2. {{PLANNED_COMPONENT_2}}
3. {{PLANNED_COMPONENT_3}}

---

### ⏳ **Upcoming {{CYCLE_TYPE_PLURAL}}**

<!-- AI ASSISTANT: List future planned work in order -->

**{{CYCLE_NUMBER_4}}: {{CYCLE_NAME_4}}**
- {{SHORT_DESCRIPTION_4}}
- **Dependencies:** {{DEPENDENCY_CYCLES_4}}

**{{CYCLE_NUMBER_5}}: {{CYCLE_NAME_5}}**
- {{SHORT_DESCRIPTION_5}}
- **Dependencies:** {{DEPENDENCY_CYCLES_5}}

<!-- AI ASSISTANT: Add more as roadmap expands -->

---

## 🎯 Current Capabilities (What Actually Works)

<!-- 
AI ASSISTANT: This section answers "What can the system do RIGHT NOW?"
Update whenever capabilities are added or removed.
Be specific and accurate - users rely on this for current state.
-->

### ✅ **{{CAPABILITY_CATEGORY_1}}**

**{{CAPABILITY_DESCRIPTION_1}}:**
- **{{FEATURE_1}}:** {{FEATURE_DESCRIPTION_1}}
- **{{FEATURE_2}}:** {{FEATURE_DESCRIPTION_2}}
- **{{FEATURE_3}}:** {{FEATURE_DESCRIPTION_3}}

### ✅ **{{CAPABILITY_CATEGORY_2}}**

**{{CAPABILITY_DESCRIPTION_2}}:**
- **{{FEATURE_4}}:** {{FEATURE_DESCRIPTION_4}}
- **{{FEATURE_5}}:** {{FEATURE_DESCRIPTION_5}}

### 🔍 **Health Check Status**
```bash
{{HEALTH_CHECK_COMMAND}}
# Returns: {{EXPECTED_HEALTH_RESPONSE}}
```

---

## 🔧 Recently Fixed/Changed

<!-- 
AI ASSISTANT: CRITICAL - Update this section immediately after every bug fix or change.
This tracks what was broken and how it was fixed.
Follows Change Request Protocol from context_master_guide.md Section 5.

Format:
- Group by date (most recent first)
- Each entry links to detailed documentation in bug_fixes/ directory
- Include change ID from MCP tracking
- Archive entries after 1 month (knowledge preserved in git + bug_fixes/)
-->

**Purpose:** This section tracks recent bug fixes, refinements, and alterations made to existing features. Detailed documentation for each change is stored in the `{{CHANGES_DIR}}` directory following the Change Request Protocol (see `context_master_guide.md` Section 5).

**Archive Policy:** Changes are kept in this section for 1 month, then archived (knowledge remains in git history and the {{CHANGES_DIR}}/ directory).

### {{RECENT_DATE_1}}

**{{CHANGE_NUMBER}}. {{CHANGE_TITLE}}** ✅ {{CHANGE_STATUS}}
- **Issue:** {{PROBLEM_DESCRIPTION}}
- **Root Cause:** {{ROOT_CAUSE_SUMMARY}}
- **Fix:** {{SOLUTION_SUMMARY}}
- **Impact:** 
  - ✅ {{IMPACT_1}}
  - ✅ {{IMPACT_2}}
  - ✅ {{IMPACT_3}}
- **Files Modified:**
  - `{{FILE_PATH}}` - {{MODIFICATION_DESC}}
- **Documentation:** `{{CHANGES_DIR}}/{{CHANGE_DOC_FILENAME}}.md`
- **Change ID:** {{MCP_CHANGE_ID}}
- **Commit:** {{GIT_COMMIT_HASH}}

<!-- AI ASSISTANT: Repeat for each recent change, newest first -->

### {{RECENT_DATE_2}}

**{{CHANGE_NUMBER}}. {{CHANGE_TITLE}}** ✅ {{CHANGE_STATUS}}
<!-- Same structure as above -->

---

## 🚧 Technical Debt & Known Issues

<!-- 
AI ASSISTANT: Maintain three priority levels - High/Medium/Low
Move items between sections as priorities change
Delete items when resolved (move to Recently Fixed section)
-->

### ✅ Recently Fixed ({{FIX_DATE_RANGE}})
<!-- AI ASSISTANT: Use strikethrough for fixed items, keep for 2 weeks then remove -->
1. ~~**{{FIXED_ISSUE_1}}:**~~ ✅ FIXED - {{FIX_SUMMARY_1}}
2. ~~**{{FIXED_ISSUE_2}}:**~~ ✅ FIXED - {{FIX_SUMMARY_2}}

### High Priority (Next {{CYCLE_TYPE_PLURAL}})
1. **{{HIGH_PRIORITY_ISSUE_1}}:** {{ISSUE_DESCRIPTION_1}} ({{TARGET_CYCLE}})
2. **{{HIGH_PRIORITY_ISSUE_2}}:** {{ISSUE_DESCRIPTION_2}} ({{TARGET_CYCLE}})

### Medium Priority  
1. **{{MEDIUM_PRIORITY_ISSUE_1}}:** {{ISSUE_DESCRIPTION_1}}
2. **{{MEDIUM_PRIORITY_ISSUE_2}}:** {{ISSUE_DESCRIPTION_2}}

### Low Priority
1. **{{LOW_PRIORITY_ISSUE_1}}:** {{ISSUE_DESCRIPTION_1}}
2. **{{LOW_PRIORITY_ISSUE_2}}:** {{ISSUE_DESCRIPTION_2}}

---

## 📚 Architectural Patterns & Reusability

<!-- 
AI ASSISTANT: Reference the patterns/ directory.
This section provides quick access to established patterns.
Update when new patterns are added or pattern status changes.
-->

**Pattern Library:** `{{DOCS_DIR}}/patterns/` directory

### **Purpose**
Canonical reference library for established patterns and templates. **Check this document BEFORE implementing any new feature** to avoid reinventing the wheel.

### **Key Patterns Documented**

| Pattern | Status | Use When |
|---------|--------|----------|
| **{{PATTERN_1_NAME}}** | ✅ {{PATTERN_1_STATUS}} | {{PATTERN_1_USE_CASE}} |
| **{{PATTERN_2_NAME}}** | ✅ {{PATTERN_2_STATUS}} | {{PATTERN_2_USE_CASE}} |
| **{{PATTERN_3_NAME}}** | ⚠️ {{PATTERN_3_STATUS}} | {{PATTERN_3_USE_CASE}} |

<!-- AI ASSISTANT: Common statuses: Canonical, Established, Mandatory, Needs Harmonization, Experimental, Deprecated -->

### **{{PRIMARY_PATTERN_CATEGORY}} Standard ({{STANDARD_DATE}})**

**Status:** {{STANDARD_STATUS}}  
**Mandate:** {{STANDARD_REQUIREMENT}}

**What's Complete:**
- ✅ {{COMPLETED_COMPONENT_1}}
- ✅ {{COMPLETED_COMPONENT_2}}
- ✅ {{COMPLETED_COMPONENT_3}}

**{{METRIC_NAME}}:** {{METRIC_VALUE}}

**Key Benefits:**
- {{BENEFIT_1}}
- {{BENEFIT_2}}
- {{BENEFIT_3}}

**Reference:** `{{DOCS_DIR}}/patterns/{{PATTERN_FILE}}.md`

### **Harmonization Backlog**

<!-- AI ASSISTANT: Track inconsistencies that need standardization -->

| Area | Priority | Estimated Effort |
|------|----------|------------------|
| {{HARMONIZATION_AREA_1}} | {{PRIORITY_1}} | {{EFFORT_ESTIMATE_1}} |
| {{HARMONIZATION_AREA_2}} | {{PRIORITY_2}} | {{EFFORT_ESTIMATE_2}} |
| {{HARMONIZATION_AREA_3}} | {{PRIORITY_3}} | {{EFFORT_ESTIMATE_3}} |

**Golden Rule:** If a pattern exists, use it. If not, create one and document it immediately.

This is how we maintain architectural consistency and prevent technical debt as the system grows.

---

## 📋 Version History & Milestones

<!-- AI ASSISTANT: Optional section - include if project uses semantic versioning or release tracking -->

### {{VERSION_NUMBER}} ({{RELEASE_DATE}})
- **Milestone:** {{MILESTONE_NAME}}
- **Key Deliverables:**
  - {{DELIVERABLE_1}}
  - {{DELIVERABLE_2}}
  - {{DELIVERABLE_3}}
- **{{CYCLE_TYPE_PLURAL}} Completed:** {{CYCLES_IN_RELEASE}}

<!-- AI ASSISTANT: Repeat for each major version/milestone -->

---

## 🎯 Success Metrics

<!-- AI ASSISTANT: Optional section - include if project tracks quantitative success metrics -->

### Development Velocity
- **{{CYCLE_TYPE_PLURAL}} Completed:** {{TOTAL_CYCLES_COMPLETE}}
- **Average Cycle Duration:** {{AVG_CYCLE_DURATION}}
- **Code Coverage:** {{CODE_COVERAGE_PERCENT}}%

### System Performance
- **{{PERFORMANCE_METRIC_1}}:** {{METRIC_VALUE_1}}
- **{{PERFORMANCE_METRIC_2}}:** {{METRIC_VALUE_2}}
- **{{PERFORMANCE_METRIC_3}}:** {{METRIC_VALUE_3}}

### Quality Metrics
- **Test Pass Rate:** {{TEST_PASS_RATE}}%
- **Bug Resolution Time:** {{AVG_RESOLUTION_TIME}}
- **Technical Debt Ratio:** {{DEBT_RATIO}}

---

---

## 📂 Historical Records

- **Completed Cycles:** [Browse tech-status/ directory](./tech-status/)
- **Change History:** [Full history of fixes & refinements](./tech-status/change_history.md)

---

<!-- 
AI ASSISTANT MAINTENANCE CHECKLIST:
After EVERY development cycle completion, update:
- [ ] Current Cycle number and status at top
- [ ] ARCHIVE completed cycle details to `tech-status/` 
- [ ] Update summary and link in Progress Tracking section
- [ ] Recent Capabilities if functionality added
- [ ] Recently Fixed/Changed if bugs were addressed
- [ ] Technical Debt if new issues identified
- [ ] Patterns section if new patterns established
- [ ] Version History if release milestone reached
- [ ] Success Metrics if tracking enabled

This document is LIVING - stale status = broken trust with users.
-->
