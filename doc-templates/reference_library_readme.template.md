# Reference Library

**Purpose:** Archive of real-world context, user research, and external inputs that inform product decisions.

**Status:** Active
**Last Updated:** {{TODAY_DATE}}

---

## Philosophy: Descriptive vs Prescriptive

This library contains **descriptive** information - data that describes the real world, user needs, and external context.

| Type | Location | Nature |
|------|----------|--------|
| **Descriptive** | `reference_library/` | Real-world inputs, research, correspondence |
| **Prescriptive** | `context_master_guide.md`, `patterns/`, `workflows/` | Rules, standards, how-to guides |

**Key Distinction:**
- **Prescriptive docs** (patterns, workflows) tell you WHAT to do and HOW to do it
- **Descriptive docs** (this library) tell you WHAT EXISTS in the real world

**The reference library INFORMS decisions but does NOT DICTATE them.**

You may intentionally deviate from user wishes or market trends when there's good reason. The value is in capturing the information so decisions are informed, not constrained.

---

## Directory Structure

```
reference_library/
├── README.md              # This file - index and philosophy
├── open_questions/        # Research topics and unanswered questions
├── correspondence/        # Emails, Slack threads, meeting notes
├── user_research/         # Interviews, feedback, usage scenarios
├── market_research/       # Competitor analysis, industry reports
├── domain_knowledge/      # Expert input, terminology, business context
└── specifications/        # External specs, PDFs, technical docs
```

---

## Contents

### `open_questions/`
Archive of topics where the "right way" is not yet known.

**What to store:**
- Research topics requiring investigation
- Business logic questions for stakeholders
- Technical feasability studies
- "How might we..." explorations

**The Workflow:**
1. **Identify** a gap in knowledge (e.g., "How should we handle offline sync?")
2. **Record** it here as a question file
3. **Research** the options/answers
4. **Solve** it (make a decision)
5. **Promote** the solution to `ROADMAP.md` (roadmap item) or `patterns/` (technical decision)
6. **Archive** the question file

**Naming convention:** `[topic].md` or `YYYY-MM-DD_[topic].md`
**Example:** `offline_sync_strategy.md`, `2026-01-20_pricing_model_options.md`

### `correspondence/`
Direct communications with stakeholders, users, partners.

**What to store:**
- Email threads about requirements or feedback
- Slack/Teams conversations (exported or summarized)
- Meeting notes with decisions or requirements
- Support tickets revealing user pain points

**Naming convention:** `YYYY-MM-DD_[source]_[topic].md`
**Example:** `2026-01-15_client_onboarding_feedback.md`

### `user_research/`
Insights from actual or potential users.

**What to store:**
- User interview notes/transcripts
- Survey results and analysis
- Usage scenarios described by users
- Feature requests with context
- Pain points and frustrations
- Workflow observations

**Naming convention:** `[type]_[topic].md`
**Example:** `interview_power_users_workflow.md`, `survey_q4_2025_results.md`

### `market_research/`
External market and competitive context.

**What to store:**
- Competitor analysis
- Industry trend reports
- Market sizing research
- Technology landscape analysis
- Pricing research

**Naming convention:** `[type]_[subject]_[date].md`
**Example:** `competitor_analysis_2026_01.md`

### `domain_knowledge/`
Expert knowledge about the problem domain.

**What to store:**
- Domain terminology glossaries
- Business process documentation
- Regulatory requirements
- Industry standards
- Expert consultant input

**Naming convention:** `[category]_[topic].md`
**Example:** `terminology_financial_reporting.md`

### `specifications/`
External technical documents and specifications.

**What to store:**
- Integration partner API docs
- External system specifications
- PDF specifications (with summary)
- Standards documents
- Vendor documentation

**Naming convention:** `[source]_[document_name].[ext]`
**Example:** `stripe_webhook_specs.pdf`, `oauth2_rfc6749_summary.md`

---

## How to Use This Library

### When Adding New Content

1. **Choose the right category** based on content type
2. **Follow naming conventions** for consistency
3. **Add source attribution** - where did this come from?
4. **Include date context** - when was this captured/valid?
5. **Summarize key points** at the top for quick scanning

### Document Template

```markdown
# [Title]

**Source:** [Who/where this came from]
**Date:** [When captured or received]
**Relevance:** [Why this matters to the project]

## Summary

[2-3 sentence overview of key takeaways]

## Content

[Full content, transcript, or detailed notes]

## Implications for {{PROJECT_NAME}}

[How this might affect development decisions]
```

### When to Consult This Library

**BEFORE starting a development cycle:**
- Check `user_research/` for relevant user needs
- Check `domain_knowledge/` for business context
- Check `specifications/` for integration requirements

**WHEN planning features:**
- Review `correspondence/` for stakeholder expectations
- Check `market_research/` for competitive context

**WHEN writing tests:**
- Check `user_research/` for real usage scenarios
- Check `domain_knowledge/` for valid test data

---

## Integration with FluxFrame Workflow

### Development Cycle Workflow

**BEFORE Implementation phase should include:**
1. Gather context (existing step)
2. Check patterns (existing step)
3. **NEW: Check reference_library for relevant context**
   - User research related to the feature
   - Domain knowledge needed
   - External specifications

### Roadmap Planning

When creating new development cycles, consult:
- `user_research/` for feature validation
- `market_research/` for prioritization context
- `correspondence/` for stakeholder commitments

### Test Planning

Reference `user_research/usage_scenarios/` when designing:
- Test cases (real user workflows)
- Test data (realistic examples)
- Acceptance criteria (user expectations)

---

## Handling Contradictions

**Contradictions are valuable information.**

Real-world inputs often conflict:
- Different users want different things
- Market trends may conflict with user requests
- Stakeholder wishes may conflict with technical reality

**When you find contradictions:**
1. Document both perspectives
2. Note the source and context of each
3. Don't resolve artificially - the contradiction IS the insight
4. Reference contradictions when making design decisions

**Example:**
```markdown
## Contradiction: Dashboard Density

**User Research:** Power users want dense, data-rich dashboards
**Market Research:** Industry trend is toward minimal, clean interfaces
**Stakeholder Input:** Marketing wants "modern, Apple-like" design

**Implication:** Need to design for configurability or user personas
```

---

## Maintenance

### Regular Review

- **Monthly:** Review `correspondence/` for actionable items
- **Quarterly:** Update `market_research/` for relevance
- **Per-cycle:** Check `user_research/` before planning

### Archival

Old or superseded documents should be:
1. Moved to `archive/` subdirectory within the category
2. Marked with `[ARCHIVED - YYYY-MM]` in filename
3. Kept for historical reference, not active consultation

### Quality Guidelines

- Prefer summaries over raw dumps
- Always include source attribution
- Date everything for context
- Extract actionable insights explicitly

---

## Related Documentation

- **Implementation guidance:** `context_master_guide.md`
- **Current project state:** `technical_status.md`
- **Development patterns:** `patterns/`
- **Development roadmap:** `ROADMAP.md`

---

*This library grows over time. Contradictions, outdated information, and evolving understanding are expected and valuable.*
