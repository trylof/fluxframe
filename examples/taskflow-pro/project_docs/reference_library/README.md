# Reference Library - TaskFlow Pro

**Purpose:** This directory stores **DESCRIPTIVE** information about the real world that informs product decisions.

---

## Key Distinction

| Documentation Type | Location | Nature |
|-------------------|----------|--------|
| **Prescriptive** | `patterns/`, `workflows/`, `context_master_guide.md` | Rules, standards, how-to guides |
| **Descriptive** | `reference_library/` (this directory) | Real-world inputs, research, context |

**This library INFORMS decisions but does NOT DICTATE them.**

You may intentionally deviate from user wishes or market trends when there's good reason. Contradictions within this library are valuable information, not problems to solve.

---

## Directory Structure

```
reference_library/
├── README.md                 # This file
├── open_questions/           # Research topics and unanswered questions
├── correspondence/           # Emails, Slack threads, meeting notes
├── user_research/            # Interviews, feedback, usage scenarios
├── market_research/          # Competitor analysis, industry reports
├── domain_knowledge/         # Expert input, terminology, business context
└── specifications/           # External specs, PDFs, partner docs
```

---

## How to Use

### Before Planning Features
- Check `user_research/` for relevant user needs
- Look for existing pain points that the feature addresses

### When Designing Tests
- Reference real usage scenarios from `user_research/`
- Use real-world examples for test data

### When Making Product Decisions
- Consider market context from `market_research/`
- Review competitor approaches (don't blindly copy)

### When Understanding Domain
- Consult `domain_knowledge/` for terminology
- Review business rules and constraints

---

## Document Templates

### User Research Document
```markdown
# User Research: [Topic]

**Date:** YYYY-MM-DD
**Participants:** [Number] users
**Method:** [Interview/Survey/Observation]

## Key Findings
- Finding 1
- Finding 2

## Quotes
> "Direct quote from user" - User Type

## Implications
- What this means for product decisions
```

### Market Research Document
```markdown
# Market Research: [Topic]

**Date:** YYYY-MM-DD
**Sources:** [List sources]

## Competitor Analysis
| Competitor | Feature | Approach |
|------------|---------|----------|

## Market Trends
- Trend 1
- Trend 2

## Opportunities
- Gap we can fill
```

---

## Maintenance

### When to Add Documents
- After user interviews or feedback sessions
- When receiving stakeholder correspondence
- After market research or competitor analysis
- When receiving external specifications

### Naming Convention
- Use descriptive names: `user_research_task_creation_flow.md`
- Include date for time-sensitive info: `market_research_2025_q4.md`

### Archive Policy
- Move outdated research to `_archive/` subdirectory
- Keep for historical context, mark as outdated

---

**Remember: This is input, not output. Use this to inform decisions, but the actual decisions live in prescriptive docs (patterns/, workflows/, etc.).**
