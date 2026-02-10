# Infrastructure & Deployment Patterns

**Purpose:** Canonical patterns for hosting, CI/CD, environment management, and configuration.

**Status:** Template - patterns will be added as infrastructure is established.

---

## Pattern Categories

This document covers:
1. Environment-Specific Configuration
2. CI/CD Promotion Pipeline
3. Infrastructure as Code (IaC)
4. Secret Management
5. Monitoring & Observability

---

## Pattern: Environment-Specific Configuration

### Use Case
When the application needs different settings (API keys, database URLs, feature flags) across Local, Staging, and Production environments.

### Implementation Approach

**Option 1: `.env` Files (Recommended for most projects)**
```
.env.local          # Local development (gitignored)
.env.example        # Template with dummy values (committed)
.env.test           # CI/Test environment (gitignored)
```

**Option 2: Secret Manager (Recommended for production)**
- AWS Secrets Manager
- HashiCorp Vault
- Doppler
- 1Password Secrets Automation

### Required Variables (Template)

```bash
# .env.example - Commit this file with placeholder values

# Application
APP_ENV=development
APP_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Authentication
AUTH_SECRET=your-secret-key-here

# External Services
API_KEY_EXTERNAL_SERVICE=your-api-key

# Feature Flags
FEATURE_NEW_DASHBOARD=false
```

### Validation Pattern

Always validate environment variables at application startup:

```typescript
// config.ts - Example pattern
const requiredEnvVars = ['DATABASE_URL', 'AUTH_SECRET'];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}
```

### Pitfalls to Avoid
- ❌ Never commit `.env` files with real secrets
- ❌ Never hardcode environment-specific values in code
- ❌ Never use production secrets in development

---

## Pattern: CI/CD Promotion Pipeline

### Use Case
Standardizing how code moves from a pull request to production with quality gates at each stage.

### Implementation Approach

**Phase 1: CI (Continuous Integration)**
- Triggered on: Every push / PR
- Actions: Lint, Type Check, Unit Tests
- Gate: All checks must pass to proceed

**Phase 2: Preview/Staging Deployment**
- Triggered on: PR approval or merge to `develop`
- Actions: Deploy to ephemeral or staging environment
- Gate: Stakeholder review and approval

**Phase 3: Production Deployment**
- Triggered on: Merge to `main` (or manual trigger)
- Actions: Deploy to production, run smoke tests
- Gate: Health checks pass, monitoring enabled

### Example GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Tests
        run: npm test

  deploy-preview:
    needs: test
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Preview
        run: # Deploy to preview environment

  deploy-staging:
    needs: test
    if: github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Staging
        run: # Deploy to staging

  deploy-production:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    steps:
      - name: Deploy to Production
        run: # Deploy to production
```

### Pitfalls to Avoid
- ❌ Never skip the staging/preview step
- ❌ Never deploy to production without automated tests
- ❌ Never allow direct pushes to `main` branch

---

## Pattern: Infrastructure as Code (IaC)

### Use Case
Managing cloud resources (databases, storage, networking) through version-controlled code rather than manual dashboard configuration.

### Implementation Approach

**Tooling Options:**
1. **Terraform/OpenTofu** - Cloud-agnostic, declarative
2. **Pulumi** - Use familiar programming languages
3. **AWS CDK/CloudFormation** - AWS-specific
4. **Azure Bicep** - Azure-specific

### State Management

**Remote State (Required for teams):**
```hcl
# backend.tf - Terraform example
terraform {
  backend "s3" {
    bucket         = "myproject-terraform-state"
    key            = "state/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}
```

### Review Process

Infrastructure changes require:
1. Create PR with IaC changes
2. Run `terraform plan` and attach output to PR
3. Team review of plan output
4. Approval before `terraform apply`

### Pitfalls to Avoid
- ❌ Never run `terraform apply` without reviewing the plan
- ❌ Never store state locally for team projects
- ❌ Never hardcode secrets in IaC files

---

## Pattern: Secret Management

### Use Case
Securely storing and accessing sensitive configuration values (API keys, database credentials, encryption keys).

### Implementation Approach

**Development:**
- Use `.env.local` files (gitignored)
- Never commit secrets to version control

**CI/CD:**
- Use platform-native secrets (GitHub Actions Secrets, GitLab CI Variables)
- Inject secrets at build/deploy time

**Production:**
- Use dedicated secret manager (AWS Secrets Manager, Vault)
- Rotate secrets regularly
- Audit access logs

### Secret Rotation Pattern

```yaml
# Secret rotation checklist
- [ ] Generate new secret
- [ ] Deploy new secret to secret manager
- [ ] Update application to use new secret
- [ ] Verify application works with new secret
- [ ] Revoke old secret
```

### Pitfalls to Avoid
- ❌ Never log secrets (even in debug mode)
- ❌ Never include secrets in error messages
- ❌ Never share secrets via Slack/email

---

## Pattern: Monitoring & Observability

### Use Case
Understanding system health, performance, and behavior across all environments.

### Implementation Approach

**Three Pillars:**
1. **Logs** - What happened (structured, searchable)
2. **Metrics** - How the system is performing (quantitative)
3. **Traces** - Request flow through services (distributed)

### Minimum Viable Monitoring

```yaml
# Essential metrics to track
- Application uptime/health check
- Response time (p50, p95, p99)
- Error rate (5xx responses)
- Database connection pool status
- Memory/CPU utilization
```

### Health Check Pattern

```typescript
// health.ts - Example endpoint
app.get('/health', async (req, res) => {
  const checks = {
    database: await checkDatabaseConnection(),
    redis: await checkRedisConnection(),
    externalApi: await checkExternalApiAccess(),
  };
  
  const healthy = Object.values(checks).every(c => c.status === 'ok');
  res.status(healthy ? 200 : 503).json(checks);
});
```

### Pitfalls to Avoid
- ❌ Never deploy to production without monitoring
- ❌ Never ignore alerts (fix alert fatigue instead)
- ❌ Never log PII or sensitive data

---

## How to Add New Infrastructure Patterns

When you establish a new infrastructure pattern:

1. **Document the pattern** in this file
2. **Include:**
   - Use case (when to apply)
   - Implementation approach (how to implement)
   - Code examples (concrete reference)
   - Pitfalls to avoid (common mistakes)
3. **Reference** the actual implementation location in your project
4. **Update** `technical_status.md` Infrastructure section

See `AGENTS.md` for general pattern documentation guidelines, or `document_catalog.md` for detailed document descriptions.

---

## Pattern Status Legend

- **Canonical:** Reference implementation, use exactly as documented
- **Established:** Proven pattern, use consistently
- **Experimental:** New pattern being evaluated
- **Deprecated:** No longer recommended, migration path provided

---

## Related Documentation

- `technical_status.md` → Infrastructure & Environments section
- `AGENTS.md` → Project Documentation Map (Infrastructure & Environment Strategy)
- `workflows/cycle_workflow.md` → Environment Verification Checklist
