# Pattern Library System

**How to capture and scale your team's collective intelligence**

---

## What is a Pattern Library?

A **Pattern Library** is your team's documented collection of proven solutions to recurring problems. It's the difference between:

**Without Patterns:**
- Every developer solves the same problem differently
- 5 implementations of "user authentication"
- 3 different loading spinner approaches
- Inconsistent error handling everywhere
- New developers reinvent wheels

**With Patterns:**
- One canonical solution to each problem
- "Need user auth? Use the Auth Pattern"
- Consistent UX across the application
- New developers learn patterns, apply everywhere
- Speed increases with each reuse

---

## Philosophy

### Patterns Are Intelligence Capture

Every time a developer solves a problem well, that's **intelligence**. Without a pattern library, that intelligence:
- Lives only in that developer's head
- Disappears when they leave
- Must be rediscovered by next developer

With a pattern library, intelligence is:
- ✅ Documented
- ✅ Searchable
- ✅ Reusable
- ✅ Improvable over time

### Patterns Scale Teams

**Solo developer:** Patterns = personal playbook  
**Small team (2-5):** Patterns = shared conventions  
**Growing team (5-15):** Patterns = essential architecture  
**Large team (15+):** Patterns = how you stay coherent

Without patterns, teams fragment. With patterns, teams harmonize.

---

## Pattern Status Levels

Patterns evolve through lifecycle stages:

### 🧪 Experimental
- **What:** New approach being tested
- **Use:** Optional, gather feedback
- **Document:** Rationale, early learnings
- **Example:** "Trying React Server Components for data fetching"

### ✅ Established
- **What:** Proven in 3+ places, works well
- **Use:** Preferred for applicable cases
- **Document:** Use case, implementation, pitfalls
- **Example:** "REST endpoint pattern (Pydantic + OpenAPI)"

### ⭐ Canonical
- **What:** Reference implementation, best-in-class
- **Use:** Follow exactly as documented
- **Document:** Complete guide with examples
- **Example:** "Authentication flow - JWT with refresh tokens"

### 🎯 Mandatory
- **What:** Must be used in all applicable cases
- **Use:** Required, no exceptions
- **Document:** Why mandatory, how to apply
- **Example:** "API contract enforcement (OpenAPI)"

### ⚠️ Needs Harmonization
- **What:** Inconsistencies exist, standardization needed
- **Use:** Note inconsistencies when found
- **Document:** What varies, why, plan to fix
- **Example:** "Error handling - 3 different approaches found"

### ❌ Deprecated
- **What:** Don't use for new code
- **Use:** Refactor away when touching
- **Document:** Why deprecated, migration path
- **Example:** "Class components (use functional + hooks)"

---

## When to Create a Pattern

### Always Create a Pattern When:

1. **You solved a problem for the 3rd time**
   - First time: Learn
   - Second time: Recognize pattern
   - Third time: Document pattern

2. **You found a better way than existing code**
   - Document the improvement
   - Add to Harmonization Backlog
   - Plan migration

3. **You made an architectural decision**
   - Why this approach?
   - What alternatives considered?
   - When to use/not use?

4. **You fixed a subtle bug**
   - What was the mistake?
   - How to avoid it?
   - Add to pattern as "Pitfall"

5. **You onboarded someone and explained the same thing twice**
   - That explanation should be a pattern

### Don't Create a Pattern For:

- ❌ One-off solutions
- ❌ Obvious best practices (link to external docs instead)
- ❌ Temporary workarounds
- ❌ Highly project-specific code with no reuse potential

---

## Pattern Documentation Structure

Every pattern should answer:

### 1. Use Case
**When do I use this pattern?**
- Specific problem it solves
- Context where it applies
- When NOT to use it

### 2. Implementation
**How do I implement this pattern?**
- Step-by-step guide
- Code examples (complete, runnable)
- Configuration needed
- Dependencies required

### 3. Pitfalls
**What mistakes should I avoid?**
- Common errors
- Edge cases
- Performance considerations
- Security implications

### 4. Testing
**How do I test code using this pattern?**
- Test strategy
- Example tests
- What to validate

### 5. References
**Where can I learn more?**
- Used in: [List of files/components]
- Related patterns
- External resources

---

## Pattern Categories

Organize patterns by domain:

### Backend Patterns
- **API Endpoints** - Request/response handling
- **Data Access** - Database queries, ORMs
- **Authentication** - User identity, authorization
- **Background Jobs** - Async processing, queues
- **Error Handling** - Exceptions, logging, monitoring

### Frontend Patterns
- **Data Fetching** - API calls, caching, loading states
- **State Management** - Local state, global state, persistence
- **UI Components** - Reusable components, composition
- **Forms** - Validation, submission, error handling
- **Routing** - Navigation, protected routes, redirects

### Data Patterns
- **Schema Design** - Database structure, relationships
- **Migrations** - Schema changes, data transformations
- **Caching** - When/what to cache, invalidation
- **Validation** - Input validation, business rules

### Integration Patterns
- **External APIs** - Third-party integrations
- **File Handling** - Upload, download, processing
- **Real-time** - WebSockets, Server-Sent Events
- **Email/Notifications** - Sending, templating, tracking

### AI/LLM Patterns (if applicable)
- **Prompt Engineering** - Effective prompts, few-shot examples
- **Response Parsing** - Structured output, validation
- **Error Recovery** - Retries, fallbacks
- **Cost Optimization** - Model selection, token management

---

## Pattern Library Workflow

### Step 1: Encounter Problem

Developer faces a technical decision:
- "How should I fetch this data?"
- "How should I handle this error?"
- "How should I structure this component?"

### Step 2: Check Pattern Library

**Before implementing, always check:**
```
MCP: check_pattern_exists(feature_description="user authentication")
```

**Outcome:**
- Pattern exists → Follow it
- No pattern → Proceed to Step 3

### Step 3: Implement Solution

Build the feature using best judgment

### Step 4: Document Pattern (if reusable)

After implementation, if solution is reusable:
1. Create pattern document
2. Add to pattern library
3. Set status (Experimental, Established, etc.)
4. Link to implementation

### Step 5: Apply & Refine

As pattern is used:
- Track usage (where applied)
- Collect feedback
- Refine documentation
- Upgrade status as confidence grows

---

## Harmonization Backlog

**What:** List of inconsistencies to standardize

**Why:** Technical debt from pre-pattern development

**Example Entry:**
```markdown
### Error Handling - Needs Harmonization

**Current State:**
- API endpoints: Try/catch with 500 response
- Background jobs: Print to console
- Frontend: Silent failures

**Target State:**
- Standardize on structured error logging
- Consistent error response format
- User-friendly error messages

**Priority:** High
**Effort:** 3 days
**Blocked by:** None
```

**When to Add:**
- Find code violating established pattern
- Discover multiple solutions to same problem
- Notice inconsistent approaches

**How to Resolve:**
1. Document current variations
2. Choose canonical approach
3. Create pattern document
4. Plan migration
5. Execute incrementally

---

## Pattern Evolution Example

### Timeline of "API Error Handling" Pattern

**Month 1: Experimental**
```markdown
# API Error Handling (Experimental)

Trying structured error responses with error codes.
Looking for feedback on developer experience.
```

**Month 3: Established**
```markdown
# API Error Handling (Established)

Used in 15 endpoints. Works well.
Developers consistently apply pattern.
Added examples of common error scenarios.
```

**Month 6: Canonical**
```markdown
# API Error Handling (Canonical)

Reference implementation for all error handling.
Complete guide with all edge cases documented.
Integrated with logging and monitoring.
```

**Month 9: Mandatory**
```markdown
# API Error Handling (Mandatory)

ALL API endpoints must use this pattern.
Enforced in code review and .clinerules.
Critical for user experience consistency.
```

---

## Integration with Development Workflow

### Pattern Check in Development Cycles

**BEFORE any implementation:**
```
1. MCP: check_pattern_exists(feature_description)
2. Read relevant patterns
3. Apply pattern OR plan new one
```

**AFTER implementation:**
```
If new reusable solution:
1. Document pattern
2. Add to pattern library
3. Update technical_status.md
```

### Pattern Check in Change Requests

**BEFORE fixing bug:**
```
Question: Is this bug a pattern violation?

If yes:
- Fix the violation
- Update pattern documentation
- Add to Harmonization Backlog
```

---

## Common Anti-Patterns

### ❌ "I'll document the pattern later"
**Problem:** Later never comes  
**Solution:** Document immediately while fresh

### ❌ "This is too simple to be a pattern"
**Problem:** Simple patterns are most reusable  
**Solution:** Document even "obvious" solutions

### ❌ "We don't need patterns, we have smart developers"
**Problem:** Smart developers leave, knowledge disappears  
**Solution:** Patterns outlast individuals

### ❌ "Patterns limit creativity"
**Problem:** Misunderstanding what patterns are for  
**Solution:** Patterns enable creativity by solving common problems, freeing time for novel ones

---

## Measuring Pattern Library Success

### Quantitative Metrics

- **Coverage:** % of common problems with documented patterns
- **Adoption:** % of code following patterns
- **Consistency:** Variance in solution approaches (lower is better)
- **Onboarding:** Time for new developer to be productive

### Qualitative Indicators

- New developers reference patterns frequently
- Code reviews cite patterns
- Pull requests include pattern updates
- Team debates reference documented patterns
- Fewer "How do I..." questions

---

## Getting Started

### Bootstrap Phase (First 2 Weeks)

1. **Identify Top 5 Problems**
   - What do developers implement repeatedly?
   - Where is inconsistency most problematic?

2. **Document Existing Solutions**
   - Find best implementation
   - Document as Established pattern
   - Mark others as Needs Harmonization

3. **Enforce in .clinerules**
   - Add pattern check to workflow
   - Make check_pattern_exists mandatory

### Growth Phase (First 3 Months)

4. **Add Patterns Organically**
   - After every 3rd implementation of same thing
   - When architectural decision is made
   - When subtle bug is fixed

5. **Promote Patterns**
   - Experimental → Established (after 3 uses)
   - Established → Canonical (after refinement)
   - Canonical → Mandatory (if critical)

6. **Address Harmonization Backlog**
   - Prioritize by pain level
   - Fix incrementally
   - Update patterns as you harmonize

### Maturity Phase (6+ Months)

7. **Pattern Library as Gospel**
   - All developers check patterns first
   - New code almost always follows patterns
   - Patterns updated regularly
   - Harmonization backlog actively managed

---

## Meta-Patterns

**Patterns for creating patterns:**

See `meta-patterns/` directory:
- [`how_to_document_patterns.md`](./meta-patterns/how_to_document_patterns.md) - Complete guide
- [`pattern_template.md`](./meta-patterns/pattern_template.md) - Copy this for new patterns
- [`harmonization_tracking.md`](./meta-patterns/harmonization_tracking.md) - Managing inconsistencies

---

## Key Takeaways

1. **Patterns = Scaled Intelligence** - Capture and reuse knowledge
2. **Check Before Implementing** - Every time, no exceptions
3. **Document Immediately** - While context is fresh
4. **Evolve Status** - Experimental → Established → Canonical → Mandatory
5. **Harmonize Incrementally** - Fix inconsistencies over time
6. **Patterns Enable Speed** - Reuse is 10x faster than invention

**The goal: Build once, document once, reuse everywhere.**

---

**Related Documents:**
- `meta-patterns/how_to_document_patterns.md` - Detailed pattern creation guide
- `meta-patterns/pattern_template.md` - Template for new patterns
- `../development-cycles/cycle_workflow.md` - When to check patterns
- `../clinerules/template.clinerules` - Pattern enforcement rules