# {{PROJECT_NAME}} - Bootstrap Decisions Log

**Bootstrap Started:** {{BOOTSTRAP_DATE}}
**Last Updated:** {{LAST_UPDATED}}

---

## Purpose

This document captures the reasoning behind key decisions made during the FluxFrame bootstrap process. It serves as a permanent record that persists beyond the bootstrap conversation, ensuring the AI assistant and user can reference *why* specific choices were made, not just *what* was chosen.

---

## How to Use This Document

- **During Bootstrap:** Decisions are logged automatically as you progress through the bootstrap phases
- **After Bootstrap:** Reference this document when questions arise about architectural choices
- **During Development:** Use this as context when making related decisions

---

## Project Identity

### Project Basics (Step 2.1)

| Field | Value |
|-------|-------|
| **Project Name** | {{PROJECT_NAME}} |
| **Purpose** | {{PROJECT_PURPOSE}} |
| **Tech Stack** | {{TECH_STACK}} |

**Reasoning/Context:**
{{PROJECT_BASICS_REASONING}}

---

## AI Tools Selection (Step 2.2)

### Selected Tools

{{AI_TOOLS_LIST}}

### Integration Level

| Tool | Level | Notes |
|------|-------|-------|
{{AI_TOOLS_TABLE}}

**Why these tools:**
{{AI_TOOLS_REASONING}}

---

## Documentation Location (Step 2.3)

| Field | Value |
|-------|-------|
| **Docs Directory** | {{DOCS_DIR}} |
| **Standard/Custom** | {{DOCS_LOCATION_TYPE}} |

**Why this location:**
{{DOCS_LOCATION_REASONING}}

---

## Infrastructure Decisions (Step 2.4)

### Environment Map

| Environment | Platform | Status | URL |
|-------------|----------|--------|-----|
| Development | {{DEV_PLATFORM}} | {{DEV_STATUS}} | {{DEV_URL}} |
| Testing/CI | {{TEST_PLATFORM}} | {{TEST_STATUS}} | {{TEST_URL}} |
| Staging | {{STAGING_PLATFORM}} | {{STAGING_STATUS}} | {{STAGING_URL}} |
| Production | {{PROD_PLATFORM}} | {{PROD_STATUS}} | {{PROD_URL}} |

**Environment reasoning:**
{{ENVIRONMENTS_REASONING}}

### Configuration Management

| Field | Value |
|-------|-------|
| **Strategy** | {{CONFIG_MANAGEMENT_STRATEGY}} |
| **Tools** | {{CONFIG_TOOLS}} |

**Why this approach:**
{{CONFIG_MANAGEMENT_REASONING}}

### Infrastructure as Code

| Field | Value |
|-------|-------|
| **Approach** | {{IAC_APPROACH}} |
| **Tools** | {{IAC_TOOLS}} |

**Why this approach:**
{{IAC_REASONING}}

### Verification Environment

| Field | Value |
|-------|-------|
| **Primary Verification** | {{VERIFICATION_ENV}} |

**Why verify here:**
{{VERIFICATION_REASONING}}

---

## Optional Features (Step 2.5)

### Browser Automation

| Field | Value |
|-------|-------|
| **Enabled** | {{BROWSER_AUTOMATION_ENABLED}} |
| **Tool/Approach** | {{BROWSER_AUTOMATION_TOOL}} |

**Reasoning:**
{{BROWSER_AUTOMATION_REASONING}}

### Log Access

| Field | Value |
|-------|-------|
| **Level** | {{LOG_ACCESS_LEVEL}} |
| **Sources** | {{LOG_SOURCES}} |

**Reasoning:**
{{LOG_ACCESS_REASONING}}

---

## Architecture Decisions

### API Contract Approach

| Field | Value |
|-------|-------|
| **Approach** | {{API_CONTRACT_APPROACH}} |
| **Tools** | {{API_CONTRACT_TOOLS}} |

**Why this approach:**
{{API_CONTRACT_REASONING}}

### Architecture Type

| Field | Value |
|-------|-------|
| **Type** | {{ARCHITECTURE_TYPE}} |

**Reasoning:**
{{ARCHITECTURE_REASONING}}

---

## Scenario-Specific Decisions

### Bootstrap Scenario

| Field | Value |
|-------|-------|
| **Detected Scenario** | {{SCENARIO}} |
| **Existing Files Found** | {{DETECTED_FILES}} |

**Classification reasoning:**
{{SCENARIO_REASONING}}

{{#IF_SIMILAR_WORKFLOW}}
### Merge Decisions (SIMILAR_WORKFLOW)

| Category | Decision | Notes |
|----------|----------|-------|
{{MERGE_DECISIONS_TABLE}}

**Merge reasoning:**
{{MERGE_REASONING}}
{{/IF_SIMILAR_WORKFLOW}}

{{#IF_MIGRATION}}
### Migration Decisions (MIGRATION)

| Documentation | Strategy | Notes |
|--------------|----------|-------|
{{MIGRATION_DECISIONS_TABLE}}

**Migration reasoning:**
{{MIGRATION_REASONING}}
{{/IF_MIGRATION}}

---

## Custom Decisions

<!-- Additional decisions logged during bootstrap that don't fit standard categories -->

{{CUSTOM_DECISIONS}}

---

## Decision Change Log

| Date | Decision | Changed From | Changed To | Reason |
|------|----------|--------------|------------|--------|
{{DECISION_CHANGELOG}}

---

## Notes

{{ADDITIONAL_NOTES}}

---

*This document was generated during FluxFrame bootstrap and should be kept as a permanent project record.*
