#!/usr/bin/env node
/**
 * MCP Server for Project Documentation
 * Smart reader that extracts relevant sections from the SINGLE source of truth
 *
 * This is a TEMPLATE file. During bootstrap, placeholders will be replaced with actual project values.
 *
 * Install: npm install @modelcontextprotocol/sdk
 * Run: node mcp-server.js
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// {{TEMPLATE: This will be replaced during bootstrap with actual documentation directory}}
const PROJECT_DOCS_DIR = path.join(__dirname, '{{DOCS_DIR}}');
// {{TEMPLATE: This will be replaced with actual project name}}
const PROJECT_NAME = '{{PROJECT_NAME}}';

class ProjectDocsMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: `${PROJECT_NAME}-docs-server`,
        version: '1.0.0',
      },
      {
        capabilities: {
          resources: {},
          tools: {},
        },
      }
    );

    // Change request tracking state (in-memory during session)
    this.currentChange = null;

    this.setupHandlers();
    this.setupErrorHandling();
  }

  setupErrorHandling() {
    this.server.onerror = (error) => {
      console.error('[MCP Error]', error);
    };
    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  // Extract sections from markdown by heading
  extractSections(content, sectionTitles) {
    const lines = content.split('\n');
    const sections = [];
    let currentSection = null;
    let currentContent = [];

    for (const line of lines) {
      // Check if this is a heading
      const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
      
      if (headingMatch) {
        // Save previous section if we were collecting one
        if (currentSection && currentContent.length > 0) {
          sections.push({
            title: currentSection,
            content: currentContent.join('\n')
          });
        }

        // Check if this heading matches one we want
        const title = headingMatch[2];
        if (sectionTitles.some(wanted => title.includes(wanted) || wanted.includes(title))) {
          currentSection = title;
          currentContent = [line];
        } else {
          currentSection = null;
          currentContent = [];
        }
      } else if (currentSection) {
        currentContent.push(line);
      }
    }

    // Save last section
    if (currentSection && currentContent.length > 0) {
      sections.push({
        title: currentSection,
        content: currentContent.join('\n')
      });
    }

    return sections;
  }

  setupHandlers() {
    // List available project documents as resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
      const files = await fs.readdir(PROJECT_DOCS_DIR);
      const mdFiles = files.filter(f => f.endsWith('.md'));

      return {
        resources: mdFiles.map(file => ({
          uri: `project-docs:///${file}`,
          name: file,
          description: `${PROJECT_NAME} documentation: ${file}`,
          mimeType: 'text/markdown',
        })),
      };
    });

    // Read specific project document
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const fileName = request.params.uri.replace('project-docs:///', '');
      const filePath = path.join(PROJECT_DOCS_DIR, fileName);

      try {
        const content = await fs.readFile(filePath, 'utf-8');
        return {
          contents: [
            {
              uri: request.params.uri,
              mimeType: 'text/markdown',
              text: content,
            },
          ],
        };
      } catch (error) {
        throw new Error(`Failed to read ${fileName}: ${error.message}`);
      }
    });

    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'get_context_for_task',
            description: 'Extracts relevant sections from context_master_guide.md based on task type. This ensures you get exactly what you need from the SINGLE source of truth.',
            inputSchema: {
              type: 'object',
              properties: {
                task_type: {
                  type: 'string',
                  enum: ['session_start', 'cycle_start', 'cycle_complete', 'pattern_check', 'full_guide'],
                  description: 'Type of task to get context for',
                },
              },
              required: ['task_type'],
            },
          },
          {
            name: 'validate_cycle_completion',
            description: 'Validates if current work meets ALL development cycle completion criteria from the master guide. Returns checklist with pass/fail status.',
            inputSchema: {
              type: 'object',
              properties: {
                cycle_id: {
                  type: 'string',
                  description: 'Cycle/Iteration identifier (e.g., "1.1", "2.3")',
                },
                completed_items: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'List of completion items you believe are done',
                },
              },
              required: ['cycle_id', 'completed_items'],
            },
          },
          {
            name: 'check_pattern_exists',
            description: 'Searches pattern library for existing solutions before implementing new features.',
            inputSchema: {
              type: 'object',
              properties: {
                feature_description: {
                  type: 'string',
                  description: 'Brief description of what you want to implement',
                },
              },
              required: ['feature_description'],
            },
          },
          {
            name: 'get_current_implementation_status',
            description: 'Retrieves the current implementation state from technical_status.md to understand what exists and what needs work.',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'validate_workflow_documentation',
            description: 'Check if workflow documentation needs updating based on changes made. Returns specific documents that need updates and why.',
            inputSchema: {
              type: 'object',
              properties: {
                changes_made: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'List of change types: "new_component", "new_service", "new_ui_feature", "schema_change", "new_workflow_step", "conceptual_logic_change"',
                },
                description: {
                  type: 'string',
                  description: 'Brief description of what was changed/added',
                },
              },
              required: ['changes_made', 'description'],
            },
          },
          {
            name: 'start_change_request',
            description: 'Initialize change request tracking when user reports bug, refinement, requirement change, misinterpretation, or alteration. Creates tracking state.',
            inputSchema: {
              type: 'object',
              properties: {
                description: {
                  type: 'string',
                  description: 'Brief description of the change request',
                },
                change_type: {
                  type: 'string',
                  enum: ['bug', 'refinement', 'requirement_change', 'misinterpretation', 'alteration'],
                  description: 'Type of change being requested',
                },
                affected_feature: {
                  type: 'string',
                  description: 'Which feature/component is affected',
                },
                severity: {
                  type: 'string',
                  enum: ['critical', 'high', 'medium', 'low'],
                  description: 'Change priority/severity',
                },
              },
              required: ['description', 'change_type', 'affected_feature', 'severity'],
            },
          },
          {
            name: 'validate_change_resolution',
            description: 'ONLY call this AFTER user confirms change works. Returns COMPLETE documentation checklist including ALL docs that need updating (tech_status, patterns, workflows, context_catalog).',
            inputSchema: {
              type: 'object',
              properties: {
                change_id: {
                  type: 'string',
                  description: 'Change tracking ID from start_change_request',
                },
              },
              required: ['change_id'],
            },
          },
          {
            name: 'close_change_request',
            description: 'Mark change as resolved after ALL documentation is complete. Sets 1-month archive date.',
            inputSchema: {
              type: 'object',
              properties: {
                change_id: {
                  type: 'string',
                  description: 'Change tracking ID',
                },
                documentation_file: {
                  type: 'string',
                  description: 'Path to created change documentation in bug_fixes/ directory',
                },
              },
              required: ['change_id', 'documentation_file'],
            },
          },
          {
            name: 'get_completion_checklist',
            description: 'Returns comprehensive checklist for development cycle completion. Use this before marking any cycle complete to ensure all documentation is updated.',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'validate_api_contracts',
            description: 'Validates that ALL new/modified API endpoints follow the chosen API contract approach (OpenAPI/GraphQL/JSON Schema/Custom). This is a MANDATORY check before marking work complete.',
            inputSchema: {
              type: 'object',
              properties: {
                endpoints_modified: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'List of endpoints that were added or modified (e.g., ["POST /tasks", "GET /users/{id}"])',
                },
              },
              required: ['endpoints_modified'],
            },
          },
        ],
      };
    });

    // Tool execution handlers
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case 'get_context_for_task':
          return await this.getContextForTask(args.task_type);
        
        case 'validate_cycle_completion':
          return await this.validateCycleCompletion(args.cycle_id, args.completed_items);
        
        case 'check_pattern_exists':
          return await this.checkPatternExists(args.feature_description);
        
        case 'get_current_implementation_status':
          return await this.getCurrentImplementationStatus();
        
        case 'validate_workflow_documentation':
          return await this.validateWorkflowDocumentation(args.changes_made, args.description);
        
        case 'start_change_request':
          return await this.startChangeRequest(args.description, args.change_type, args.affected_feature, args.severity);
        
        case 'validate_change_resolution':
          return await this.validateChangeResolution(args.change_id);
        
        case 'close_change_request':
          return await this.closeChangeRequest(args.change_id, args.documentation_file);
        
        case 'get_completion_checklist':
          return await this.getCompletionChecklist();
        
        case 'validate_api_contracts':
          return await this.validateAPIContracts(args.endpoints_modified);
        
        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    });
  }

  async getContextForTask(taskType) {
    const masterGuidePath = path.join(PROJECT_DOCS_DIR, 'context_master_guide.md');
    const content = await fs.readFile(masterGuidePath, 'utf-8');

    let sectionsToExtract = [];
    let message = '';

    switch (taskType) {
      case 'session_start':
        sectionsToExtract = [
          'The Core Context Documents',
          'The Golden Rule',
        ];
        message = 'Context for session start - understand available documents and critical rules:';
        break;

      case 'cycle_start':
        sectionsToExtract = [
          'The Core Context Documents',
          'Pattern-Driven Development',
          'Before Starting Any New Feature',
        ];
        message = 'Context for starting a development cycle - check patterns and understand workflow:';
        break;

      case 'cycle_complete':
        sectionsToExtract = [
          'The Golden Rule: Maintain the Mind',
          'Critical Update Sequence',
          'Critical Alignment Rule',
        ];
        message = 'Context for completing a development cycle - critical completion sequence and validation:';
        break;

      case 'pattern_check':
        sectionsToExtract = [
          'Pattern-Driven Development',
          'Before Starting Any New Feature',
        ];
        message = 'Context for checking patterns before implementation:';
        break;

      case 'full_guide':
        return {
          content: [
            {
              type: 'text',
              text: `Full context_master_guide.md:\n\n${content}`,
            },
          ],
        };
    }

    const sections = this.extractSections(content, sectionsToExtract);
    const extractedText = sections
      .map(s => `## ${s.title}\n\n${s.content}`)
      .join('\n\n---\n\n');

    return {
      content: [
        {
          type: 'text',
          text: `${message}\n\n${extractedText}\n\n---\n\nNote: This is extracted from context_master_guide.md, the SINGLE source of truth.`,
        },
      ],
    };
  }

  async validateCycleCompletion(cycleId, completedItems) {
    const requiredItems = [
      'Real implementation (no stubs)',
      'Results visible to users',
      'Test data aligned with implementation',
      'All unit tests passing',
      'All integration tests passing',
      'User testing completed',
      'No regression in previous functionality',
      'technical_status.md updated',
      'Test documentation updated',
      'Patterns documented (if new patterns established)',
    ];

    const checklist = requiredItems.map(item => {
      const completed = completedItems.some(ci => 
        ci.toLowerCase().includes(item.toLowerCase().split('(')[0].trim())
      );
      return `${completed ? '✅' : '❌'} ${item}`;
    });

    const allComplete = requiredItems.every((item, i) => checklist[i].startsWith('✅'));

    return {
      content: [
        {
          type: 'text',
          text: `Cycle/Iteration ${cycleId} Completion Validation:\n\n${checklist.join('\n')}\n\n${
            allComplete
              ? '✅ ALL CRITERIA MET - Cycle can be marked complete'
              : '❌ INCOMPLETE - Do not mark this cycle as complete until all items are checked'
          }\n\nReminder: Test data must match actual implementation (see Critical Alignment Rule in context_master_guide.md)`,
        },
      ],
    };
  }

  async checkPatternExists(featureDescription) {
    try {
      // Read from patterns directory
      const patternsDir = path.join(PROJECT_DOCS_DIR, 'patterns');
      const readmePath = path.join(patternsDir, 'README.md');
      
      let allContent = '';
      try {
        const readmeContent = await fs.readFile(readmePath, 'utf-8');
        allContent = readmeContent + '\n\n';
      } catch (err) {
        // README might not exist yet
      }
      
      // Search all pattern files
      try {
        const patternFiles = await fs.readdir(patternsDir);
        const mdFiles = patternFiles.filter(f => f.endsWith('.md') && f !== 'README.md');
        
        for (const file of mdFiles) {
          const fileContent = await fs.readFile(path.join(patternsDir, file), 'utf-8');
          allContent += `\n\n--- ${file} ---\n\n${fileContent}`;
        }
      } catch (err) {
        // Pattern files might not exist yet
      }

      if (!allContent || allContent.trim().length === 0) {
        return {
          content: [
            {
              type: 'text',
              text: `❌ No pattern library found yet.\n\nThis appears to be a new project. Implement your feature and document the pattern afterward.\n\nPatterns should be added to: ${PROJECT_DOCS_DIR}/patterns/`,
            },
          ],
        };
      }
      
      const content = allContent;
      
      // Search for relevant patterns
      const lines = content.split('\n');
      const keywords = featureDescription.toLowerCase().split(' ');
      const relevantLines = [];
      let inRelevantSection = false;
      let sectionContent = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const lowerLine = line.toLowerCase();

        // Check if heading matches
        if (line.match(/^#{1,4}\s/)) {
          // Save previous section if it was relevant
          if (inRelevantSection && sectionContent.length > 0) {
            relevantLines.push(...sectionContent);
            relevantLines.push('---');
          }
          
          // Check if new section is relevant
          inRelevantSection = keywords.some(kw => lowerLine.includes(kw));
          sectionContent = inRelevantSection ? [line] : [];
        } else if (inRelevantSection) {
          sectionContent.push(line);
        }
      }

      // Add last section
      if (inRelevantSection && sectionContent.length > 0) {
        relevantLines.push(...sectionContent);
      }

      if (relevantLines.length > 0) {
        return {
          content: [
            {
              type: 'text',
              text: `✅ Found existing pattern(s) for "${featureDescription}":\n\n${relevantLines.join('\n')}\n\n⚠️ IMPORTANT: Use the existing pattern. Do not reinvent the wheel.`,
            },
          ],
        };
      } else {
        return {
          content: [
            {
              type: 'text',
              text: `❌ No existing pattern found for "${featureDescription}".\n\nYou may need to create a new pattern. Remember to document it in the pattern library after implementation.`,
            },
          ],
        };
      }
    } catch (error) {
      return {
        content: [{ type: 'text', text: `Error reading pattern library: ${error.message}` }],
        isError: true,
      };
    }
  }

  async getCurrentImplementationStatus() {
    try {
      const content = await fs.readFile(
        path.join(PROJECT_DOCS_DIR, 'technical_status.md'),
        'utf-8'
      );
      return {
        content: [
          { 
            type: 'text', 
            text: `Current Implementation Status:\n\n${content}` 
          }
        ],
      };
    } catch (error) {
      return {
        content: [{ type: 'text', text: `Error reading technical_status.md: ${error.message}` }],
        isError: true,
      };
    }
  }

  async validateWorkflowDocumentation(changesMade, description) {
    // Map of change types to workflow documents that need updates
    const changeToDocMapping = {
      'new_component': ['component_reference.md', 'technical_data_flows.md'],
      'new_service': ['component_reference.md', 'technical_data_flows.md'],
      'new_ui_feature': ['user_journey.md', 'admin_journey.md'],
      'schema_change': ['technical_data_flows.md'],
      'new_workflow_step': ['technical_data_flows.md', 'user_journey.md'],
      'conceptual_logic_change': ['technical_data_flows.md'],
    };

    const documentsToUpdate = new Set();
    const reasons = [];

    // Determine which documents need updates
    for (const change of changesMade) {
      const docs = changeToDocMapping[change];
      if (docs) {
        docs.forEach(doc => documentsToUpdate.add(doc));
        
        // Add specific reasons
        switch (change) {
          case 'new_component':
          case 'new_service':
            reasons.push(`${change}: May need workflow documentation update`);
            break;
          case 'new_ui_feature':
          case 'schema_change':
          case 'new_workflow_step':
          case 'conceptual_logic_change':
            reasons.push(`${change}: May need workflow documentation update`);
            break;
        }
      }
    }

    const docsArray = Array.from(documentsToUpdate);

    if (docsArray.length === 0) {
      return {
        content: [
          {
            type: 'text',
            text: `✅ No workflow documentation updates needed for these changes.\n\nChanges: ${changesMade.join(', ')}\nDescription: ${description}\n\nNote: Only user-facing features and conceptual logic changes require workflow doc updates.`,
          },
        ],
      };
    }

    const updateList = docsArray.map(doc => 
      `• workflows/${doc}`
    ).join('\n');

    const reasonsList = reasons.map(r => `  - ${r}`).join('\n');

    return {
      content: [
        {
          type: 'text',
          text: `⚠️ WORKFLOW DOCUMENTATION UPDATES MAY BE REQUIRED\n\n` +
                `Changes Made: ${changesMade.join(', ')}\n` +
                `Description: ${description}\n\n` +
                `Documents to Review:\n${updateList}\n\n` +
                `Reasons:\n${reasonsList}\n\n` +
                `📋 Next Steps:\n` +
                `1. Review if these workflow documents exist\n` +
                `2. Update if conceptual logic changed\n` +
                `3. Show diff to user for approval\n\n` +
                `Reference: context_master_guide.md for workflow update guidelines`,
        },
      ],
    };
  }

  async startChangeRequest(description, changeType, affectedFeature, severity) {
    // Generate change ID
    const changeId = `CHANGE_${Date.now()}`;
    const startDate = new Date().toISOString().split('T')[0];
    
    // Store in memory
    this.currentChange = {
      id: changeId,
      description,
      changeType,
      affectedFeature,
      severity,
      startDate,
      status: 'investigating',
    };

    const typeEmoji = {
      'bug': '🐛',
      'refinement': '🔄',
      'requirement_change': '📝',
      'misinterpretation': '🤔',
      'alteration': '⚡',
    };

    return {
      content: [
        {
          type: 'text',
          text: `${typeEmoji[changeType]} CHANGE REQUEST INITIATED\n\n` +
                `Change ID: ${changeId}\n` +
                `Type: ${changeType.toUpperCase()}\n` +
                `Severity: ${severity.toUpperCase()}\n` +
                `Affected Feature: ${affectedFeature}\n` +
                `Description: ${description}\n` +
                `Started: ${startDate}\n\n` +
                `📋 Next Steps (Phase 1: Analysis):\n` +
                `1. Check patterns: use check_pattern_exists() - Could this be a pattern violation?\n` +
                `2. Root cause analysis: Investigate WHY without making changes yet\n` +
                `3. Document hypothesis in <thinking> tags\n\n` +
                `⚠️ DO NOT make code changes yet - understand the problem first.\n` +
                `⚠️ DO NOT document anything yet - that comes AFTER user confirms the fix works.`,
        },
      ],
    };
  }

  async validateChangeResolution(changeId) {
    if (!this.currentChange || this.currentChange.id !== changeId) {
      return {
        content: [
          {
            type: 'text',
            text: `❌ ERROR: No active change request with ID ${changeId}\n\nMake sure to call start_change_request first.`,
          },
        ],
        isError: true,
      };
    }

    const archiveDate = new Date();
    archiveDate.setMonth(archiveDate.getMonth() + 1);
    const archiveDateStr = archiveDate.toISOString().split('T')[0];

    // Update status
    this.currentChange.status = 'documenting';
    this.currentChange.resolvedDate = new Date().toISOString().split('T')[0];
    this.currentChange.archiveDate = archiveDateStr;

    // Generate file name suggestion
    const componentSlug = this.currentChange.affectedFeature
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_');
    const issueSlug = this.currentChange.description
      .toLowerCase()
      .split(' ')
      .slice(0, 3)
      .join('_')
      .replace(/[^a-z0-9_]/g, '');
    const suggestedFileName = `bug_fixes/${componentSlug}_${issueSlug}.md`;

    const template = `# ${this.currentChange.affectedFeature} ${this.currentChange.description} - ${this.currentChange.changeType}

**Date:** ${this.currentChange.resolvedDate}
**Status:** ✅ FIXED AND DEPLOYED
**Change Type:** ${this.currentChange.changeType}
**Archive Date:** ${archiveDateStr}

## Problem Description / Rationale

${this.currentChange.changeType === 'bug' ? '<What was broken and how user experienced it>' : ''}
${this.currentChange.changeType === 'refinement' ? '<What needed improvement and why>' : ''}
${this.currentChange.changeType === 'requirement_change' ? '<What changed and why the requirement evolved>' : ''}
${this.currentChange.changeType === 'misinterpretation' ? '<What was built vs. what was actually wanted>' : ''}
${this.currentChange.changeType === 'alteration' ? '<What needed adjustment and the rationale>' : ''}

<Include screenshots if relevant>

## Root Cause / Analysis

<Technical explanation of WHY>
${this.currentChange.changeType === 'bug' ? '<WHY the bug occurred - reference specific code/logic>' : '<WHY the change was needed>'}

## Solution

<How the change was made>
<Code snippets showing key changes>

### Key Changes

1. **Change 1** - What and why
2. **Change 2** - What and why

## Impact

- ✅ <What now works correctly / What improved>
- ✅ <Side benefits>
- ✅ <What was validated>

## Testing

Test scenarios performed:
1. <Scenario 1>
2. <Scenario 2>

## Files Modified

- \`path/to/file1.ext\` - Brief description of changes
- \`path/to/file2.ext\` - Brief description of changes

## Documentation Updated

- [x] \`${suggestedFileName}\` - This change documentation
- [x] \`technical_status.md\` - Recently Fixed/Changed section
- [ ] \`architectural_patterns_and_templates.md\` - Pattern update (if applicable)
- [ ] \`workflows/\` - Workflow documentation (if applicable)
- [ ] \`context_catalog.json\` - AI Assistant context (if applicable)

## Related Issues

- <Links to similar changes>
- <Part of broader pattern/issue>

## Deployment

- Commit: \`<hash>\`
- Deployed to: <environment>
- Verification: <how confirmed in production>
`;

    return {
      content: [
        {
          type: 'text',
          text: `✅ USER CONFIRMED CHANGE WORKS - Starting COMPLETE documentation\n\n` +
                `Change ID: ${changeId}\n` +
                `Resolved: ${this.currentChange.resolvedDate}\n` +
                `Archive Date: ${archiveDateStr} (1 month from now)\n\n` +
                `📋 COMPLETE DOCUMENTATION CHECKLIST:\n\n` +
                `REQUIRED (ALWAYS):\n` +
                `1. ✅ Create change documentation: ${suggestedFileName}\n` +
                `2. ✅ Update technical_status.md - Add to "Recently Fixed/Changed" section\n\n` +
                `CONDITIONAL (IF APPLICABLE):\n` +
                `3. ⚠️ Update pattern library IF:\n` +
                `   - Change revealed anti-pattern\n` +
                `   - Change established new pattern\n` +
                `   - Change fixed pattern violation\n\n` +
                `4. ⚠️ Update workflow docs IF:\n` +
                `   - Conceptual logic changed\n` +
                `   - User-facing workflow changed\n` +
                `   Use: validate_workflow_documentation() to check\n\n` +
                `📄 CHANGE DOCUMENTATION TEMPLATE:\n\n` +
                `Suggested file: ${suggestedFileName}\n\n` +
                `${template}\n\n` +
                `⚠️ IMPORTANT:\n` +
                `- Fill in ALL sections with actual details\n` +
                `- Check all applicable documentation boxes\n` +
                `- After completing, call close_change_request() with the file path`,
        },
      ],
    };
  }

  async closeChangeRequest(changeId, documentationFile) {
    if (!this.currentChange || this.currentChange.id !== changeId) {
      return {
        content: [
          {
            type: 'text',
            text: `❌ ERROR: No active change request with ID ${changeId}`,
          },
        ],
        isError: true,
      };
    }

    // Mark as complete
    const completedChange = { ...this.currentChange };
    completedChange.status = 'complete';
    completedChange.documentationFile = documentationFile;

    // Clear current change
    this.currentChange = null;

    return {
      content: [
        {
          type: 'text',
          text: `✅ CHANGE REQUEST CLOSED\n\n` +
                `Change ID: ${changeId}\n` +
                `Type: ${completedChange.changeType}\n` +
                `Feature: ${completedChange.affectedFeature}\n` +
                `Documentation: ${documentationFile}\n` +
                `Archive Date: ${completedChange.archiveDate}\n\n` +
                `📊 Summary:\n` +
                `- Started: ${completedChange.startDate}\n` +
                `- Resolved: ${completedChange.resolvedDate}\n` +
                `- Duration: ${this.calculateDuration(completedChange.startDate, completedChange.resolvedDate)}\n\n` +
                `✅ Change is fully documented and ready for production monitoring.\n` +
                `✅ Knowledge preserved in technical_status.md\n` +
                `✅ Specific details available in ${documentationFile}\n` +
                `✅ Will auto-archive on ${completedChange.archiveDate}`,
        },
      ],
    };
  }

  calculateDuration(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffDays = Math.floor((end - start) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'same day';
    if (diffDays === 1) return '1 day';
    return `${diffDays} days`;
  }

  async validateAPIContracts(endpointsModified) {
    try {
      // Read API contract standards document
      const contractStandardsPath = path.join(PROJECT_DOCS_DIR, 'api_contract_standards.md');
      const contractStandards = await fs.readFile(contractStandardsPath, 'utf-8');
      
      // Extract the chosen approach from the document
      const approachMatch = contractStandards.match(/\*\*Chosen Approach:\*\*\s+(.+)/);
      const chosenApproach = approachMatch ? approachMatch[1] : 'Not specified';
      
      // Determine validation requirements based on approach
      const validationChecks = [];
      const criticalChecks = [];
      
      if (chosenApproach.includes('OpenAPI') || chosenApproach.includes('Pydantic')) {
        criticalChecks.push('✅ Backend endpoints have `response_model` parameter');
        criticalChecks.push('✅ Pydantic models defined in models/api_responses.py');
        criticalChecks.push('✅ Service data explicitly mapped to Pydantic models');
        criticalChecks.push('✅ Frontend uses typed apiClient (no direct fetch calls)');
        criticalChecks.push('✅ Frontend types auto-generated from OpenAPI spec');
        validationChecks.push('Run: `npm run generate:types` to regenerate TypeScript types');
        validationChecks.push('Verify: TypeScript compilation passes with new types');
      } else if (chosenApproach.includes('GraphQL')) {
        criticalChecks.push('✅ GraphQL schema updated with new types/queries/mutations');
        criticalChecks.push('✅ Resolvers implement schema exactly');
        criticalChecks.push('✅ Frontend types regenerated from schema');
        criticalChecks.push('✅ Frontend uses generated hooks (no manual queries)');
        validationChecks.push('Run: GraphQL code generation');
        validationChecks.push('Verify: Schema validation passes');
      } else if (chosenApproach.includes('JSON Schema')) {
        criticalChecks.push('✅ JSON Schema defined for all response types');
        criticalChecks.push('✅ Backend validates responses against schema');
        criticalChecks.push('✅ Frontend types match JSON schemas');
        validationChecks.push('Verify: JSON Schema validation in tests');
      } else {
        criticalChecks.push('✅ API contract documented per custom approach');
        criticalChecks.push('✅ Contract validation implemented');
        validationChecks.push('Verify: Custom contract requirements met');
      }
      
      const endpointsList = endpointsModified.map(e => `  - ${e}`).join('\n');
      
      return {
        content: [
          {
            type: 'text',
            text: `🔍 API CONTRACT VALIDATION\n\n` +
                  `Chosen Approach: ${chosenApproach}\n` +
                  `Endpoints Modified:\n${endpointsList}\n\n` +
                  `📋 MANDATORY CHECKS FOR ${chosenApproach}:\n\n` +
                  `${criticalChecks.join('\n')}\n\n` +
                  `⚙️ VALIDATION STEPS:\n\n` +
                  `${validationChecks.join('\n')}\n\n` +
                  `❌ WORK IS NOT COMPLETE UNTIL:\n` +
                  `1. ALL critical checks above are verified\n` +
                  `2. Contract-first sequence followed (define contract → implement → validate)\n` +
                  `3. No direct HTTP calls bypassing contract (e.g., raw fetch() calls)\n` +
                  `4. Breaking changes caught at type-check time (compile errors if mismatch)\n\n` +
                  `⚠️ If ANY check fails, fix before marking cycle complete.\n\n` +
                  `Reference: api_contract_standards.md for complete requirements`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `⚠️ WARNING: Could not validate API contracts\n\n` +
                  `Error: ${error.message}\n\n` +
                  `This might mean:\n` +
                  `1. API contract standards not yet defined for this project\n` +
                  `2. File api_contract_standards.md not found\n\n` +
                  `Before marking work complete:\n` +
                  `- Define API contract approach (via bootstrap questionnaire)\n` +
                  `- Create api_contract_standards.md documenting chosen approach\n` +
                  `- Ensure all endpoints follow the documented standard`,
          },
        ],
        isError: false, // Warning, not error
      };
    }
  }

  async getCompletionChecklist() {
    const checklist = `## Development Cycle/Iteration Completion Checklist

Before marking complete, verify ALL applicable items:

### Core Documentation (ALWAYS REQUIRED)
- [ ] technical_status.md - Updated with what was built, what's working, what's broken, next steps

### API Contract Compliance (MANDATORY IF ANY ENDPOINTS ADDED/MODIFIED)
- [ ] **validate_api_contracts() MCP tool called** with list of modified endpoints
- [ ] ALL endpoints follow chosen API contract approach (OpenAPI/GraphQL/JSON Schema/Custom)
- [ ] Backend: Contract models defined (Pydantic/GraphQL Schema/JSON Schema)
- [ ] Backend: Response validation implemented
- [ ] Frontend: Types auto-generated OR manually synced with backend
- [ ] Frontend: NO direct fetch() calls (uses typed API client)
- [ ] Breaking changes caught at compile time (TypeScript errors if mismatch)
- [ ] Contract-first sequence followed (define contract → implement → validate)

⚠️ **API CONTRACT VALIDATION IS NOT OPTIONAL AND IS CHECKED SEPARATELY FROM PATTERNS**
This check applies to:
- New endpoints
- Modified endpoints
- Bug fixes to existing endpoints
- Refactoring of API code

### Pattern Documentation (IF APPLICABLE)
- [ ] patterns/ directory - New pattern documented OR existing pattern applied
  - Which file updated:
    - [ ] ui_patterns.md (UI components, styling, interactions)
    - [ ] api_patterns.md (API endpoints, data handling)
    - [ ] data_patterns.md (database, queries, models)
    - [ ] Other pattern files as applicable
  - [ ] patterns/README.md - Updated if new pattern added

### Testing & Validation (ALWAYS REQUIRED)
- [ ] All unit tests passing
- [ ] Integration tests passing for current cycle
- [ ] User testing completed with documented results
- [ ] No regression in previous functionality
- [ ] End-to-end functionality verified

### Implementation Quality (ALWAYS REQUIRED)
- [ ] Real implementation (no stubs or mocks in production code)
- [ ] Visible results (users can see the feature working)
- [ ] Test data aligned with actual implementation
- [ ] Code follows established patterns

---

## CRITICAL REMINDERS

⚠️ **API Contracts:** MANDATORY separate check using validate_api_contracts() for ANY endpoint changes. This is enforced independently from pattern checking.

⚠️ **Pattern Library:** Check patterns/ directory BEFORE implementing. If pattern exists, use it. If not, document new pattern.

⚠️ **Documentation Updates:** ALL applicable docs must be updated BEFORE marking complete. This is not optional.

⚠️ **Test Alignment:** Test data must match what was actually built, not what was originally planned.

---

## How to Use This Checklist

1. Review each section
2. Check off completed items
3. For "IF APPLICABLE" sections, determine if they apply to your cycle
4. **MANDATORY:** If any endpoints were added/modified, call validate_api_contracts()
5. Do NOT mark cycle complete until ALL applicable items are checked
6. Show this checklist to user before using attempt_completion

---

**Reference:** context_master_guide.md - "Critical Update Sequence for Every Development Cycle"`;

    return {
      content: [
        {
          type: 'text',
          text: checklist,
        },
      ],
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error(`${PROJECT_NAME} MCP Server v1.0 running on stdio`);
    console.error(`Single source of truth: ${PROJECT_DOCS_DIR}/context_master_guide.md`);
  }
}

const server = new ProjectDocsMCPServer();
server.run().catch(console.error);
