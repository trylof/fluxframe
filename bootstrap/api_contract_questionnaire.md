# API Contract Approach Questionnaire

**Determining how frontend and backend will communicate**

---

## Purpose

This questionnaire helps determine the appropriate API contract approach for your project during bootstrap. The chosen approach will be enforced via your AI agent configuration (e.g., `AGENTS.md`) and documented in `api_contract_standards.md`.

---

## Critical Requirement

**EVERY project MUST have an explicit API contract approach from DAY 1.**

"We'll add contracts later" is not an option. Contract-first development prevents integration failures and type mismatches from the start.

---

## Question 1: What is your tech stack?

### Backend Framework

- [ ] Python (FastAPI, Django, Flask)
- [ ] Node.js (Express, NestJS, Fastify)
- [ ] Go
- [ ] Ruby (Rails)
- [ ] Java/Kotlin (Spring)
- [ ] Other: _______________

### Frontend Framework

- [ ] React (JavaScript/TypeScript)
- [ ] Vue.js
- [ ] Angular
- [ ] Svelte
- [ ] Next.js
- [ ] Other: _______________

### Language Typing

**Backend:**
- [ ] Statically typed (TypeScript, Python with type hints, Go, Java)
- [ ] Dynamically typed (JavaScript, Python without types, Ruby)

**Frontend:**
- [ ] TypeScript
- [ ] JavaScript

---

## Question 2: What is your team's experience level?

- [ ] Experienced with API contracts (OpenAPI, GraphQL, etc.)
- [ ] Familiar with concepts, limited practical experience
- [ ] New to API contract approaches
- [ ] Mixed team (some experienced, some new)

---

## Question 3: What are your project requirements?

### Type Safety Priority

**How important is compile-time type safety?**

- [ ] Critical - Must catch type errors before runtime
- [ ] Important - Nice to have, not deal-breaker
- [ ] Low - Runtime validation is sufficient

### API Complexity

**How complex will your API be?**

- [ ] Simple - Basic CRUD operations
- [ ] Medium - Standard REST API with some complexity
- [ ] Complex - Nested queries, complex data relationships
- [ ] Very Complex - Real-time, streaming, complex data graphs

### Documentation Needs

**Who needs to consume API documentation?**

- [ ] Just our team (internal only)
- [ ] Other teams in organization
- [ ] External partners/developers
- [ ] Public API consumers

---

## Recommendation Algorithm

Based on your answers, Cline will recommend ONE of these approaches:

### Option 1: OpenAPI + Pydantic + Auto-Generated TypeScript ⭐ RECOMMENDED

**Best for:**
- Python (FastAPI) backend
- TypeScript frontend
- Strong type safety requirements
- Team wants automatic type generation

**Provides:**
- ✅ Backend: Pydantic models with runtime validation
- ✅ Frontend: Auto-generated TypeScript types
- ✅ Self-documenting API (OpenAPI spec)
- ✅ Breaking changes caught at compile time
- ✅ IDE autocomplete from backend types

**Setup Complexity:** Medium
**Learning Curve:** Low-Medium
**Maintenance:** Low (types auto-generated)

**Requirements:**
- Python backend with type hints
- TypeScript frontend
- Willing to use Pydantic for response models

**When recommended:**
```
IF backend == "Python (FastAPI)" 
   AND frontend includes "TypeScript"
   AND type_safety >= "Important"
THEN recommend OpenAPI approach
```

---

### Option 2: GraphQL Schema

**Best for:**
- Complex data relationships
- Flexible querying needs
- Team experienced with GraphQL
- Frontend needs precise data fetching

**Provides:**
- ✅ Schema as contract
- ✅ Type safety built-in
- ✅ Query validation
- ✅ Over-fetching prevention
- ✅ Strong tooling ecosystem

**Setup Complexity:** High
**Learning Curve:** High
**Maintenance:** Medium (schema management)

**Requirements:**
- GraphQL server setup
- GraphQL client (Apollo, Relay, etc.)
- Team comfortable with GraphQL
- Willing to learn GraphQL concepts

**When recommended:**
```
IF api_complexity >= "Complex"
   AND team_experience >= "Familiar"
   AND frontend requires "flexible queries"
THEN consider GraphQL approach
```

---

### Option 3: JSON Schema + Manual Types

**Best for:**
- Simpler projects
- Teams new to contract-first
- Gradual adoption strategy
- Non-TypeScript frontends

**Provides:**
- ✅ Runtime validation via JSON Schema
- ✅ Clear contract documentation
- ✅ Lower complexity than OpenAPI
- ✅ Language-agnostic

**Setup Complexity:** Low
**Learning Curve:** Low
**Maintenance:** Medium (manual type sync)

**Requirements:**
- JSON Schema validation library
- Discipline to keep types synced
- Acceptance of manual type creation

**When recommended:**
```
IF team_experience == "New"
   OR type_safety == "Low"
   OR want "gradual adoption"
THEN recommend JSON Schema approach
```

---

### Option 4: Custom Contract Definition

**Best for:**
- Unique requirements
- Existing contract systems
- Very simple APIs
- Special architectural needs

**Provides:**
- ✅ Flexibility to match needs
- ✅ Can use existing tools
- ✅ Tailored to project

**Setup Complexity:** Varies
**Learning Curve:** Varies
**Maintenance:** Depends on approach

**Requirements:**
- Clear documentation of approach
- Validation strategy defined
- Type safety approach specified
- Enforcement mechanism

**When recommended:**
```
IF has_unique_requirements == true
   OR has_existing_system == true
   OR none_of_above_fit == true
THEN allow custom approach
   BUT require detailed documentation
```

---

## Interactive Questionnaire

### Quick Path (Cline asks during bootstrap)

**Cline:** "I need to set up API contracts for your project. Let's determine the best approach."

**Question 1:**
"What's your backend framework?"
- Suggested answers: FastAPI, Express.js, Django, Spring Boot, Custom

**Question 2:**
"What's your frontend setup?"
- Suggested answers: React + TypeScript, React + JavaScript, Vue.js, Next.js

**Question 3:**
"How important is type safety between backend and frontend?"
- Suggested answers: Critical, Important, Nice to have, Not important

**Based on answers, Cline recommends:**

```
"Based on FastAPI + React TypeScript + Critical type safety,
I recommend: OpenAPI + Pydantic + Auto-Generated TypeScript

This will:
- Generate TypeScript types from your Python Pydantic models
- Catch type mismatches at compile time
- Provide automatic API documentation
- Require minimal ongoing maintenance

Proceed with this approach? (yes/no/show alternatives)"
```

---

## Files Generated Based on Choice

### If OpenAPI Selected:

**Files created:**
- `project_docs/api_contract_standards.md` (OpenAPI version)
- `AGENTS.md` (with OpenAPI enforcement rules)
- `backend/models/api_responses.py` (example Pydantic models)
- `frontend/lib/apiClient.ts` (typed API client template)
- `frontend/types/api.ts` (placeholder for generated types)
- `package.json` (with openapi-typescript dependency)

**Documentation added:**
- Pattern: `patterns/api_contract_pattern.md`
- Bootstrap note: How to regenerate types
- CI/CD: Type generation in pipeline

### If GraphQL Selected:

**Files created:**
- `project_docs/api_contract_standards.md` (GraphQL version)
- `AGENTS.md` (with GraphQL enforcement rules)
- `schema.graphql` (example schema)
- `frontend/generated/graphql.ts` (placeholder)
- Configuration for code generation

**Documentation added:**
- Pattern: `patterns/graphql_pattern.md`
- Schema-first workflow guide

### If JSON Schema Selected:

**Files created:**
- `project_docs/api_contract_standards.md` (JSON Schema version)
- `AGENTS.md` (with JSON Schema rules)
- `schemas/` directory with examples
- Validation setup

**Documentation added:**
- Pattern: `patterns/json_schema_pattern.md`
- Manual type sync guide

### If Custom Selected:

**AI Agent prompts:**
```
"You've chosen a custom API contract approach.
Please provide:
1. How will contracts be defined?
2. How will backend validate responses?
3. How will frontend know response types?
4. How will breaking changes be detected?

I'll document your answers in api_contract_standards.md"
```

**Files created:**
- `project_docs/api_contract_standards.md` (custom approach documented)
- `AGENTS.md` (with custom rules user defined)

---

## Validation After Setup

**Cline will verify:**

1. **Contract definition exists**
   - OpenAPI spec generated, GraphQL schema present, or custom documented

2. **Enforcement configured**
   - `.clinerules` has appropriate rules
   - CI/CD includes validation steps

3. **Example endpoint created**
   - Shows pattern in practice
   - Demonstrates full contract flow

4. **Documentation complete**
   - `api_contract_standards.md` filled
   - Pattern library updated
   - Team knows how to use

---

## Common Questions

### Q: "Can we change approach later?"

**A:** Possible but painful. Choose wisely upfront.

Migration requires:
- Redefining all contracts
- Updating all endpoints
- Changing frontend calls
- Fixing type errors
- Re-testing everything

**Better:** Start with simpler approach (JSON Schema), upgrade later if needed, than start complex (GraphQL) and downgrade.

### Q: "What if we're not sure yet?"

**A:** Start with OpenAPI (if Python+TS) or JSON Schema (otherwise).

These are most common, well-documented, and easiest to adopt.

### Q: "Can we skip contracts for prototype?"

**A:** NO. Contracts from day 1.

"Temporary" code becomes permanent. Easier to start with contracts than add later.

### Q: "What if backend and frontend are different teams?"

**A:** Contracts are ESSENTIAL.

Choose approach both teams can work with. Consider OpenAPI or GraphQL for strong contracts that both sides generate from.

---

## Decision Matrix

| Criteria | OpenAPI | GraphQL | JSON Schema | Custom |
|----------|---------|---------|-------------|---------|
| **Type Safety** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | Varies |
| **Setup Ease** | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ | Varies |
| **Maintenance** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | Varies |
| **Auto Documentation** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | Varies |
| **Learning Curve** | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ | Varies |
| **Flexibility** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

**Legend:** ⭐⭐⭐⭐⭐ = Excellent, ⭐ = Poor

---

## Final Recommendation

**For 80% of projects:**

```
IF Python backend + TypeScript frontend
   → OpenAPI + Pydantic + Auto-Generated TypeScript

ELSE IF complex data relationships
   → GraphQL (if team has experience)

ELSE
   → JSON Schema + Manual Types
```

**The key:** Choose ONE approach and enforce it consistently.

No mixing and matching. No "we'll add contracts to some endpoints later."

**Every endpoint. Every time. From day one.**

---

**Next Step:**

After choosing approach, Cline will:
1. Generate appropriate `api_contract_standards.md`
2. Configure `.clinerules` with enforcement
3. Create example endpoint following pattern
4. Add pattern to library
5. Update completion checklist with contract requirements

**Your API contract approach will be enforced on every endpoint you create.**

---

**Related Documents:**
- `../doc-templates/api_contract_standards.template.md` - Template Cline uses
- `../clinerules/template.clinerules` - Rule enforcement
- `project_questionnaire.md` - Full bootstrap questionnaire