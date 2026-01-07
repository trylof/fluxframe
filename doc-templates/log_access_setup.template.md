# {{PROJECT_NAME}} - Log Access Configuration

**Status:** {{LOG_ACCESS_STATUS}}
**Last Updated:** {{TODAY_DATE}}
**Configuration Level:** {{LOG_ACCESS_LEVEL}}

---

## Overview

This document configures AI assistant access to logs across environments for debugging and troubleshooting.

**Benefits:**
- AI can diagnose issues directly from logs
- Faster debugging (no manual copy-paste)
- Correlate errors across services
- Check CI/CD failures programmatically

---

## Configured Log Sources

### Environment Logs

| Environment | Platform | Access Method | Status | Credentials |
|-------------|----------|---------------|--------|-------------|
| Development | {{DEV_PLATFORM}} | {{DEV_LOG_METHOD}} | {{DEV_LOG_STATUS}} | {{DEV_LOG_CREDS}} |
| Testing/CI | {{TEST_PLATFORM}} | {{TEST_LOG_METHOD}} | {{TEST_LOG_STATUS}} | {{TEST_LOG_CREDS}} |
| Staging | {{STAGING_PLATFORM}} | {{STAGING_LOG_METHOD}} | {{STAGING_LOG_STATUS}} | {{STAGING_LOG_CREDS}} |
| Production | {{PROD_PLATFORM}} | {{PROD_LOG_METHOD}} | {{PROD_LOG_STATUS}} | {{PROD_LOG_CREDS}} |

### Service-Specific Logs

| Service | Log Type | Access Command | Notes |
|---------|----------|----------------|-------|
| {{SERVICE_1}} | {{SERVICE_1_LOG_TYPE}} | {{SERVICE_1_COMMAND}} | {{SERVICE_1_NOTES}} |
| {{SERVICE_2}} | {{SERVICE_2_LOG_TYPE}} | {{SERVICE_2_COMMAND}} | {{SERVICE_2_NOTES}} |

---

## Access Methods by Platform

### Local Development

**Docker Containers:**
```bash
# List running containers
docker ps

# View logs for specific container
docker logs {{CONTAINER_NAME}} --tail 100

# Follow logs (live stream)
docker logs -f {{CONTAINER_NAME}}

# Filter by time
docker logs {{CONTAINER_NAME}} --since 1h
```

**File Logs:**
```bash
# Application logs
tail -n 100 {{LOG_FILE_PATH}}

# Follow mode
tail -f {{LOG_FILE_PATH}}

# Search for errors
grep -i "error" {{LOG_FILE_PATH}} | tail -50
```

**Application Console:**
- Logs are visible in terminal during `npm run dev` / `python -m uvicorn` etc.
- Consider redirecting: `npm run dev 2>&1 | tee app.log`

---

### CI/CD Pipeline Logs

{{#IF_GITHUB_ACTIONS}}
**GitHub Actions:**
```bash
# View recent workflow runs
gh run list

# View logs for specific run
gh run view {{RUN_ID}} --log

# View failed logs only
gh run view {{RUN_ID}} --log-failed
```
{{/IF_GITHUB_ACTIONS}}

{{#IF_GITLAB_CI}}
**GitLab CI:**
- Access via GitLab UI: CI/CD → Pipelines → Job logs
- API: `curl --header "PRIVATE-TOKEN: $TOKEN" "https://gitlab.com/api/v4/projects/{{PROJECT_ID}}/jobs/{{JOB_ID}}/trace"`
{{/IF_GITLAB_CI}}

{{#IF_CIRCLECI}}
**CircleCI:**
- Access via CircleCI UI: Pipelines → Workflow → Job
- API: `circleci <command>` (requires CLI setup)
{{/IF_CIRCLECI}}

---

### Cloud Platform Logs

{{#IF_AWS}}
**AWS CloudWatch:**
```bash
# List log groups
aws logs describe-log-groups

# Tail logs from a group
aws logs tail {{LOG_GROUP_NAME}} --follow

# Filter by pattern
aws logs filter-log-events \
  --log-group-name {{LOG_GROUP_NAME}} \
  --filter-pattern "ERROR" \
  --start-time $(date -d '1 hour ago' +%s000)
```

**Prerequisites:**
- AWS CLI installed: `brew install awscli` / `pip install awscli`
- Credentials configured: `aws configure`
- IAM permissions: `logs:DescribeLogGroups`, `logs:FilterLogEvents`, `logs:GetLogEvents`
{{/IF_AWS}}

{{#IF_GCP}}
**Google Cloud Logging:**
```bash
# Read recent logs
gcloud logging read "resource.type={{RESOURCE_TYPE}}" --limit=100

# Filter by severity
gcloud logging read "severity>=ERROR" --limit=50

# Follow logs
gcloud logging tail "resource.type={{RESOURCE_TYPE}}"
```

**Prerequisites:**
- gcloud CLI installed: `brew install google-cloud-sdk`
- Authenticated: `gcloud auth login`
- Project set: `gcloud config set project {{PROJECT_ID}}`
{{/IF_GCP}}

{{#IF_AZURE}}
**Azure Monitor:**
```bash
# Query logs
az monitor log-analytics query \
  --workspace {{WORKSPACE_ID}} \
  --analytics-query "AppTraces | where TimeGenerated > ago(1h)"
```

**Prerequisites:**
- Azure CLI installed: `brew install azure-cli`
- Logged in: `az login`
{{/IF_AZURE}}

---

### Database Logs

{{#IF_POSTGRESQL}}
**PostgreSQL:**
```bash
# View PostgreSQL logs (location varies)
tail -f /var/log/postgresql/postgresql-{{VERSION}}-main.log

# Query slow queries (if pg_stat_statements enabled)
psql -c "SELECT * FROM pg_stat_statements ORDER BY total_time DESC LIMIT 10;"

# View current activity
psql -c "SELECT * FROM pg_stat_activity WHERE state != 'idle';"
```
{{/IF_POSTGRESQL}}

{{#IF_MYSQL}}
**MySQL:**
```bash
# View error log
tail -f /var/log/mysql/error.log

# View slow query log (if enabled)
tail -f /var/log/mysql/mysql-slow.log
```
{{/IF_MYSQL}}

{{#IF_MONGODB}}
**MongoDB:**
```javascript
// View current operations
db.currentOp()

// View profiler (if enabled)
db.system.profile.find().sort({ts: -1}).limit(10)
```
{{/IF_MONGODB}}

---

### Container Orchestration

{{#IF_KUBERNETES}}
**Kubernetes:**
```bash
# Pod logs
kubectl logs {{POD_NAME}} --tail=100

# Follow logs
kubectl logs -f {{POD_NAME}}

# Logs from specific container in pod
kubectl logs {{POD_NAME}} -c {{CONTAINER_NAME}}

# Previous container logs (after crash)
kubectl logs {{POD_NAME}} --previous

# All pods in deployment
kubectl logs deployment/{{DEPLOYMENT_NAME}} --all-containers
```

**Prerequisites:**
- kubectl configured with cluster access
- RBAC permissions for pod logs
{{/IF_KUBERNETES}}

{{#IF_DOCKER_COMPOSE}}
**Docker Compose:**
```bash
# All services
docker compose logs

# Specific service
docker compose logs {{SERVICE_NAME}}

# Follow mode
docker compose logs -f

# Last N lines
docker compose logs --tail=100
```
{{/IF_DOCKER_COMPOSE}}

---

## MCP Tool Usage

### get_logs

Query logs from configured sources:

```javascript
// Local Docker logs
get_logs({
  source: "docker",
  environment: "local",
  service: "api",
  lines: 100
})

// CI/CD failure investigation
get_logs({
  source: "cicd",
  environment: "test",
  query: "error"
})

// Production errors
get_logs({
  source: "app",
  environment: "production",
  level: "error",
  since: "1h"
})
```

### get_log_access_status

Check what's configured:

```javascript
get_log_access_status()
// Returns: List of configured sources and their status
```

---

## Security Considerations

⚠️ **Important Security Notes:**

1. **Production Logs:** May contain sensitive data (PII, credentials, etc.)
   - Review what data is logged before exposing
   - Consider log redaction/masking

2. **Credentials:** Store securely, not in this file
   - Use environment variables
   - Use secret managers (Vault, AWS Secrets Manager, etc.)

3. **Access Control:**
   - AI assistant inherits your credentials
   - Ensure minimal required permissions
   - Review what the AI can access

4. **Audit Trail:**
   - Log access may be audited
   - Consider compliance requirements (GDPR, HIPAA, etc.)

---

## Troubleshooting

### Common Issues

**"Log access not configured"**
- Ensure this file exists and has valid configuration
- Check that platform-specific sections are filled in

**"Permission denied"**
- Verify credentials are valid and current
- Check IAM/RBAC permissions for log access

**"Command not found"**
- Install required CLI tool (aws, gcloud, kubectl, etc.)
- Ensure CLI is in PATH

**"No logs returned"**
- Check time range (logs may have aged out)
- Verify service/container name is correct
- Check log retention settings

---

## Adding New Log Sources

To add a new log source:

1. Add row to "Configured Log Sources" table
2. Add platform-specific section if new platform
3. Document access commands and prerequisites
4. Test access works with your credentials
5. Update MCP server if custom handling needed

---

## References

- [FluxFrame Bootstrap - Log Access](../bootstrap/greenfield_workflow.md#step-96-configure-log-access)
- [Project Questionnaire - Q11](../bootstrap/project_questionnaire.md#q11-ai-assistant-log-access)
- Platform-specific documentation links:
  - AWS CloudWatch: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/
  - GCP Logging: https://cloud.google.com/logging/docs
  - Azure Monitor: https://docs.microsoft.com/en-us/azure/azure-monitor/
