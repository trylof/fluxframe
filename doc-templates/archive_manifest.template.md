# Archive Manifest

**Purpose:** Tracks all documents archived during FluxFrame bootstrap or updates.
**Last Updated:** {{TODAY_DATE}}

---

## What Is This?

When FluxFrame is set up on an existing project, valuable documents are preserved here rather than deleted. This manifest provides metadata about each archived document so you can find historical context when needed.

**Archives are for reference, not active use.** If you need information from an archived document, extract the relevant parts into the appropriate FluxFrame document.

---

## Archived Documents

{{ARCHIVED_DOCUMENTS_TABLE}}

---

## Archive Categories

### `roadmaps/`
Previous planning and roadmap documents.

| File | Original Location | Archived | Contains |
|------|-------------------|----------|----------|
{{ROADMAPS_TABLE}}

### `status/`
Previous project status tracking documents.

| File | Original Location | Archived | Contains |
|------|-------------------|----------|----------|
{{STATUS_TABLE}}

### `architecture/`
Previous architecture and design documents.

| File | Original Location | Archived | Contains |
|------|-------------------|----------|----------|
{{ARCHITECTURE_TABLE}}

### `briefings/`
Project briefs, PRDs, and requirements documents.

| File | Original Location | Archived | Contains |
|------|-------------------|----------|----------|
{{BRIEFINGS_TABLE}}

### `rules/`
Previous AI rule configurations.

| File | Original Location | Archived | Contains |
|------|-------------------|----------|----------|
{{RULES_TABLE}}

---

## Recovery Instructions

If you need to restore an archived document to its original location:

1. **Copy** (don't move) the file from the archive
2. **Rename** to remove the `_archived_YYYY-MM-DD` suffix
3. **Place** in the original location
4. **Update** this manifest to note the recovery

**Note:** Before recovering, consider whether the information should instead be integrated into the current FluxFrame documents.

---

## Archive History

### {{TODAY_DATE}} - FluxFrame Bootstrap

**Reason:** Initial FluxFrame bootstrap on existing project
**Documents Archived:** {{ARCHIVE_COUNT}}
**Decision Made By:** User during bootstrap workflow

{{ARCHIVE_HISTORY_NOTES}}

---

*This manifest is automatically updated when documents are archived. Do not delete archived documents without updating this manifest.*
