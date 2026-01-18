#!/usr/bin/env node
/**
 * FluxFrame MCP Server for Project Documentation
 * Smart reader that extracts relevant sections from the SINGLE source of truth.
 * Supports multiple AI coding agents (Claude, Roo, Cline, Cursor, etc.)
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
                  enum: ['session_start', 'cycle_start', 'cycle_planning', 'cycle_complete', 'pattern_check', 'full_guide'],
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
            description: 'Initialize change request tracking when user reports bug, refinement, requirement change, misinterpretation, or alteration. NOTE: If user calls it a BUG, it is a BUG, regardless of complexity or file count. Do NOT escalate to a Cycle.',
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
                  description: 'Path to created change documentation in bugs/ directory',
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
          {
            name: 'get_logs',
            description: 'Retrieve logs from configured sources. Setup status and available sources are documented in log_access_setup.md. Use for debugging errors, tracing issues, and understanding system behavior.',
            inputSchema: {
              type: 'object',
              properties: {
                source: {
                  type: 'string',
                  enum: ['app', 'cicd', 'database', 'infra', 'docker', 'file'],
                  description: 'Log source type: app (application logs), cicd (CI/CD pipeline), database (DB logs), infra (infrastructure), docker (container logs), file (log files)',
                },
                environment: {
                  type: 'string',
                  enum: ['local', 'test', 'staging', 'production'],
                  description: 'Environment to query logs from',
                },
                query: {
                  type: 'string',
                  description: 'Search query or filter pattern (grep-style or platform-specific)',
                },
                lines: {
                  type: 'number',
                  description: 'Number of log lines to retrieve (default: 100)',
                },
                since: {
                  type: 'string',
                  description: 'Time range: "1h", "30m", "2h", or ISO timestamp',
                },
                service: {
                  type: 'string',
                  description: 'Specific service/container name (for multi-service setups)',
                },
                level: {
                  type: 'string',
                  enum: ['all', 'error', 'warn', 'info', 'debug'],
                  description: 'Filter by log level',
                },
              },
              required: ['source'],
            },
          },
          {
            name: 'get_log_access_status',
            description: 'Check which log sources are configured and their current access status. Use this to understand what log access is available before attempting to query logs.',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          // ============================================================
          // IMPLEMENTATION PLANNING TOOLS (Two-Tier Planning System)
          // ============================================================
          {
            name: 'start_cycle_planning',
            description: 'Initiate the planning phase for a development cycle. Returns research guidance. CRITICAL: DO NOT offer to implement/build in the same step. You must PLAN first, then STOP for user approval.',
            inputSchema: {
              type: 'object',
              properties: {
                cycle_id: {
                  type: 'string',
                  description: 'Cycle identifier (e.g., "1.1", "2.3", "1.2a")',
                },
              },
              required: ['cycle_id'],
            },
          },
          {
            name: 'analyze_cycle_scope',
            description: 'Scope Analysis Engine. Evaluates feature complexity and recommends decomposition. CRITICAL: Use during planning phase. DO NOT start implementation based on this analysis alone.',
            inputSchema: {
              type: 'object',
              properties: {
                cycle_id: {
                  type: 'string',
                  description: 'Cycle identifier',
                },
                feature_description: {
                  type: 'string',
                  description: 'Description of what the feature/cycle will accomplish',
                },
                estimated_loc: {
                  type: 'number',
                  description: 'Estimated lines of code to add/modify',
                },
                components_affected: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'List of components/files that will be affected',
                },
                has_external_deps: {
                  type: 'boolean',
                  description: 'Whether external APIs or dependencies are involved',
                },
                has_db_changes: {
                  type: 'boolean',
                  description: 'Whether database/schema changes are needed',
                },
                breaking_risk: {
                  type: 'string',
                  enum: ['low', 'medium', 'high'],
                  description: 'Risk of breaking existing functionality',
                },
              },
              required: ['cycle_id', 'feature_description', 'estimated_loc', 'components_affected'],
            },
          },
          {
            name: 'create_cycle_plan',
            description: 'Create a new detailed implementation plan. CRITICAL: For NEW FEATURES only. DO NOT use for bugs (use start_change_request). After calling this, you must STOP and ask user for review.',
            inputSchema: {
              type: 'object',
              properties: {
                cycle_id: {
                  type: 'string',
                  description: 'Cycle identifier',
                },
                cycle_name: {
                  type: 'string',
                  description: 'Human-readable name for the cycle',
                },
                scope_analysis_result: {
                  type: 'object',
                  description: 'Result from analyze_cycle_scope (pass the full object)',
                },
              },
              required: ['cycle_id', 'cycle_name'],
            },
          },
          {
            name: 'get_cycle_plan',
            description: 'Read an existing detailed implementation plan for a cycle. Returns the plan content if it exists, or guidance to create one if not.',
            inputSchema: {
              type: 'object',
              properties: {
                cycle_id: {
                  type: 'string',
                  description: 'Cycle identifier (e.g., "1.1", "2.3")',
                },
              },
              required: ['cycle_id'],
            },
          },
          {
            name: 'approve_cycle_plan',
            description: 'Mark the cycle as ready for implementation. THIS IS THE ONLY GATEWAY TO EXECUTION. Call this ONLY after the user has explicitly said "Approved" or "Proceed" in response to the plan.',
            inputSchema: {
              type: 'object',
              properties: {
                cycle_id: {
                  type: 'string',
                  description: 'Cycle identifier',
                },
                user_confirmed: {
                  type: 'boolean',
                  description: 'User has explicitly approved the plan (must be true)',
                },
              },
              required: ['cycle_id', 'user_confirmed'],
            },
          },
          {
            name: 'get_implementation_roadmap',
            description: 'Get overview of all cycles with their planning status, decomposition relationships, and which cycles have detailed plans. Use at session start to understand project state.',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          // ============================================================
          // SEED DATA TOOLS (AI Context & Test Fixtures)
          // ============================================================
          {
            name: 'get_seed_data_overview',
            description: 'Get overview of available seed data categories, fixtures, and samples. Use this to understand what reference data exists for AI context and testing.',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'get_sample_data',
            description: 'Retrieve sample data for a specific entity/category. Use this when you need to understand what domain objects look like before implementing features.',
            inputSchema: {
              type: 'object',
              properties: {
                category: {
                  type: 'string',
                  description: 'Entity/category name (e.g., "users", "tasks", "products")',
                },
                include_schema: {
                  type: 'boolean',
                  description: 'Whether to include the data schema/type definition',
                },
              },
              required: ['category'],
            },
          },
          {
            name: 'list_fixtures',
            description: 'List available test fixtures with their descriptions. Use this to find existing test data before writing tests.',
            inputSchema: {
              type: 'object',
              properties: {
                category: {
                  type: 'string',
                  description: 'Optional: filter by entity category',
                },
              },
            },
          },
          // ============================================================
          // REFERENCE LIBRARY TOOLS (Descriptive Context)
          // ============================================================
          {
            name: 'search_reference_library',
            description: 'Search the Reference Library for real-world context that INFORMS (but does not dictate) decisions. Use this before planning features, designing tests, or making product decisions. Searches across correspondence, user research, market research, domain knowledge, and specifications.',
            inputSchema: {
              type: 'object',
              properties: {
                query: {
                  type: 'string',
                  description: 'Search term or topic (e.g., "onboarding", "competitor", "user feedback")',
                },
                category: {
                  type: 'string',
                  enum: ['all', 'correspondence', 'user_research', 'market_research', 'domain_knowledge', 'specifications'],
                  description: 'Category to search (default: all)',
                },
                context: {
                  type: 'string',
                  enum: ['feature_planning', 'test_design', 'product_decision', 'domain_understanding', 'general'],
                  description: 'Why you are searching - helps prioritize results',
                },
              },
              required: ['query'],
            },
          },
          {
            name: 'get_reference_library_overview',
            description: 'Get overview of Reference Library contents and structure. Use at session start or when you need to understand what real-world context is available. The Reference Library stores DESCRIPTIVE information (what the real world looks like) vs PRESCRIPTIVE docs (patterns, workflows).',
            inputSchema: {
              type: 'object',
              properties: {},
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

        case 'get_logs':
          return await this.getLogs(args);

        case 'get_log_access_status':
          return await this.getLogAccessStatus();

        // Implementation Planning Tools
        case 'start_cycle_planning':
          return await this.startCyclePlanning(args.cycle_id);

        case 'analyze_cycle_scope':
          return await this.analyzeCycleScope(args);

        case 'create_cycle_plan':
          return await this.createCyclePlan(args.cycle_id, args.cycle_name, args.scope_analysis_result);

        case 'get_cycle_plan':
          return await this.getCyclePlan(args.cycle_id);

        case 'approve_cycle_plan':
          return await this.approveCyclePlan(args.cycle_id, args.user_confirmed);

        case 'get_implementation_roadmap':
          return await this.getImplementationRoadmap();

        // Seed Data Tools
        case 'get_seed_data_overview':
          return await this.getSeedDataOverview();

        case 'get_sample_data':
          return await this.getSampleData(args.category, args.include_schema);

        case 'list_fixtures':
          return await this.listFixtures(args.category);

        // Reference Library Tools
        case 'search_reference_library':
          return await this.searchReferenceLibrary(args.query, args.category, args.context);

        case 'get_reference_library_overview':
          return await this.getReferenceLibraryOverview();

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

      case 'cycle_planning':
        sectionsToExtract = [
          'Two-Tier Planning System',
          'Planning Workflow',
          'Pattern-Driven Development',
        ];
        message = 'Context for planning a development cycle - research, scope analysis, and plan creation:';
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
    // Check if detailed plan exists
    const implementationPlansDir = path.join(PROJECT_DOCS_DIR, 'roadmap');
    const planFileName = `CYCLE_${cycleId.replace(/\./g, '_')}_IMPLEMENTATION_PLAN.md`;
    const planPath = path.join(implementationPlansDir, planFileName);

    let hasPlan = false;
    let planApproved = false;
    try {
      const planContent = await fs.readFile(planPath, 'utf-8');
      hasPlan = true;
      planApproved = planContent.includes('- [x] **User approved this plan**');
    } catch (err) {
      // Plan doesn't exist
    }

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
      'Implementation plan followed (or deviations documented)',
    ];

    const checklist = requiredItems.map(item => {
      const completed = completedItems.some(ci =>
        ci.toLowerCase().includes(item.toLowerCase().split('(')[0].trim())
      );
      return `${completed ? '✅' : '❌'} ${item}`;
    });

    // Add plan-specific checks
    const planChecks = [];
    if (hasPlan) {
      planChecks.push(`${planApproved ? '✅' : '❌'} Detailed implementation plan was approved`);
      planChecks.push(`${completedItems.some(ci => ci.toLowerCase().includes('deviation') || ci.toLowerCase().includes('plan followed')) ? '✅' : '⚠️'} Plan alignment verified (check deviations documented)`);
    } else {
      planChecks.push(`⚠️ No detailed implementation plan found for Cycle ${cycleId}`);
      planChecks.push(`   Consider creating plans for future cycles using start_cycle_planning()`);
    }

    const allComplete = requiredItems.every((item, i) => checklist[i].startsWith('✅'));

    return {
      content: [
        {
          type: 'text',
          text: `Cycle/Iteration ${cycleId} Completion Validation:\n\n` +
            `## Core Criteria\n${checklist.join('\n')}\n\n` +
            `## Plan Alignment\n${planChecks.join('\n')}\n\n` +
            `${allComplete
              ? '✅ ALL CRITERIA MET - Cycle can be marked complete'
              : '❌ INCOMPLETE - Do not mark this cycle as complete until all items are checked'
            }\n\n` +
            `Reminder: Test data must match actual implementation (see Critical Alignment Rule in context_master_guide.md)`,
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
    const suggestedFileName = `bugs/${componentSlug}_${issueSlug}.md`;

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
- [ ] \`patterns/\` - Pattern update (if applicable)
- [ ] \`workflows/\` - Workflow documentation (if applicable)

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

  async getLogs(args) {
    const { source, environment, query, lines, since, service, level } = args;

    // Try to read log access configuration
    let logConfig = null;
    try {
      const configPath = path.join(PROJECT_DOCS_DIR, 'log_access_setup.md');
      const configContent = await fs.readFile(configPath, 'utf-8');
      logConfig = configContent;
    } catch (err) {
      // Config file doesn't exist
    }

    if (!logConfig) {
      return {
        content: [
          {
            type: 'text',
            text: `⚠️ LOG ACCESS NOT CONFIGURED\n\n` +
              `Log access has not been set up for this project.\n\n` +
              `**To configure log access:**\n` +
              `1. During bootstrap: Answer Q11 (Observability & Log Access) with option 1 or 2\n` +
              `2. After bootstrap: Create \`${PROJECT_DOCS_DIR}/log_access_setup.md\` with your configuration\n\n` +
              `**Manual log checking guidance:**\n` +
              `For source "${source}" in "${environment || 'local'}" environment:\n\n` +
              this.getManualLogGuidance(source, environment || 'local'),
          },
        ],
      };
    }

    // Parse configuration to find the appropriate log access method
    const sourceConfig = this.parseLogSourceConfig(logConfig, source, environment || 'local');

    if (!sourceConfig || sourceConfig.status !== 'configured') {
      return {
        content: [
          {
            type: 'text',
            text: `⚠️ LOG SOURCE NOT CONFIGURED\n\n` +
              `Source: ${source}\n` +
              `Environment: ${environment || 'local'}\n\n` +
              `This log source is not configured in log_access_setup.md.\n\n` +
              `**Manual log checking guidance:**\n` +
              this.getManualLogGuidance(source, environment || 'local') +
              `\n\n**To add this source:**\n` +
              `Update \`${PROJECT_DOCS_DIR}/log_access_setup.md\` with configuration for ${source} logs.`,
          },
        ],
      };
    }

    // Build the log query information
    const queryInfo = {
      source,
      environment: environment || 'local',
      method: sourceConfig.method,
      command: sourceConfig.command,
      lines: lines || 100,
      since: since || '1h',
      query: query || '',
      service: service || '',
      level: level || 'all',
    };

    return {
      content: [
        {
          type: 'text',
          text: `📋 LOG QUERY READY\n\n` +
            `**Source:** ${queryInfo.source}\n` +
            `**Environment:** ${queryInfo.environment}\n` +
            `**Method:** ${queryInfo.method}\n\n` +
            `**Command to execute:**\n\`\`\`bash\n${this.buildLogCommand(queryInfo)}\n\`\`\`\n\n` +
            `**Parameters:**\n` +
            `- Lines: ${queryInfo.lines}\n` +
            `- Since: ${queryInfo.since}\n` +
            `- Filter: ${queryInfo.query || '(none)'}\n` +
            `- Service: ${queryInfo.service || '(all)'}\n` +
            `- Level: ${queryInfo.level}\n\n` +
            `⚠️ **Note:** Execute this command in the terminal to retrieve logs.\n` +
            `The AI assistant cannot execute shell commands directly for security reasons.`,
        },
      ],
    };
  }

  parseLogSourceConfig(configContent, source, environment) {
    // Simple parser - looks for source configuration in markdown tables
    const lines = configContent.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // Look for table rows that match source and environment
      if (line.includes('|') && line.toLowerCase().includes(source.toLowerCase())) {
        const cells = line.split('|').map(c => c.trim());
        // Check if environment matches
        if (cells.some(c => c.toLowerCase().includes(environment.toLowerCase()))) {
          // Found a match - try to extract method
          const methodCell = cells.find(c =>
            c.includes('docker') || c.includes('aws') || c.includes('gcloud') ||
            c.includes('kubectl') || c.includes('gh ') || c.includes('tail')
          );

          if (methodCell) {
            return {
              status: 'configured',
              method: methodCell,
              command: methodCell,
            };
          }
        }
      }
    }

    return null;
  }

  buildLogCommand(queryInfo) {
    const { source, environment, method, lines, since, query, service, level } = queryInfo;

    // Build command based on source type
    switch (source) {
      case 'docker':
        let dockerCmd = `docker logs`;
        if (service) dockerCmd += ` ${service}`;
        else dockerCmd += ` <container_name>`;
        dockerCmd += ` --tail ${lines}`;
        if (since) dockerCmd += ` --since ${since}`;
        if (query) dockerCmd += ` 2>&1 | grep "${query}"`;
        return dockerCmd;

      case 'file':
        let tailCmd = `tail -n ${lines}`;
        if (query) tailCmd += ` <log_file> | grep "${query}"`;
        else tailCmd += ` <log_file>`;
        return tailCmd;

      case 'cicd':
        if (method && method.includes('gh')) {
          return `gh run view --log`;
        }
        return `# Check your CI/CD platform for logs\n# ${method || 'Configure CI/CD log access'}`;

      case 'app':
        if (environment === 'local') {
          return `# Check application output in terminal\n# Or: tail -f logs/app.log`;
        }
        return `# ${method || 'Configure app log access for ' + environment}`;

      case 'database':
        return `# Database logs vary by type\n# PostgreSQL: tail -f /var/log/postgresql/\n# MySQL: tail -f /var/log/mysql/`;

      case 'infra':
        if (method && method.includes('kubectl')) {
          return `kubectl logs ${service || '<pod_name>'} --tail=${lines}`;
        }
        return `# ${method || 'Configure infrastructure log access'}`;

      default:
        return `# Configure log access for source: ${source}`;
    }
  }

  getManualLogGuidance(source, environment) {
    const guidance = {
      docker: `**Docker logs:**\n\`\`\`bash\ndocker logs <container_name> --tail 100\ndocker logs -f <container_name>  # follow mode\n\`\`\``,

      file: `**File logs:**\n\`\`\`bash\ntail -n 100 <log_file>\ntail -f <log_file>  # follow mode\ngrep "ERROR" <log_file>  # filter errors\n\`\`\``,

      cicd: `**CI/CD logs:**\n- GitHub Actions: \`gh run view --log\` or check Actions tab\n- GitLab CI: Check Pipelines in GitLab UI\n- CircleCI: \`circleci <command>\` or web UI`,

      app: environment === 'local'
        ? `**Local app logs:**\n- Check terminal output where app is running\n- Look for log files in \`logs/\` directory\n- Use \`npm run dev 2>&1 | tee app.log\` to capture`
        : `**${environment} app logs:**\n- AWS: \`aws logs tail <log-group>\`\n- GCP: \`gcloud logging read\`\n- Azure: \`az monitor log-analytics\``,

      database: `**Database logs:**\n- PostgreSQL: \`/var/log/postgresql/\` or \`pg_stat_statements\`\n- MySQL: \`/var/log/mysql/\` or slow query log\n- MongoDB: \`db.currentOp()\` or profiler`,

      infra: `**Infrastructure logs:**\n- Kubernetes: \`kubectl logs <pod>\`\n- AWS: CloudWatch Logs\n- Docker: \`docker compose logs\``,
    };

    return guidance[source] || `No specific guidance for "${source}" logs. Check your platform documentation.`;
  }

  async getLogAccessStatus() {
    // Try to read log access configuration
    let logConfig = null;
    try {
      const configPath = path.join(PROJECT_DOCS_DIR, 'log_access_setup.md');
      logConfig = await fs.readFile(configPath, 'utf-8');
    } catch (err) {
      // Config file doesn't exist
    }

    if (!logConfig) {
      return {
        content: [
          {
            type: 'text',
            text: `📋 LOG ACCESS STATUS: NOT CONFIGURED\n\n` +
              `Log access has not been set up for this project.\n\n` +
              `**Available options:**\n\n` +
              `1. **Configure during bootstrap:**\n` +
              `   - Answer Q11 (Observability & Log Access) with option 1 (full) or 2 (local)\n\n` +
              `2. **Configure manually:**\n` +
              `   - Create \`${PROJECT_DOCS_DIR}/log_access_setup.md\`\n` +
              `   - Document your log sources and access methods\n\n` +
              `3. **Use manual guidance:**\n` +
              `   - The \`get_logs\` tool will provide manual instructions\n` +
              `   - User can copy-paste commands to retrieve logs\n\n` +
              `**Potential log sources** (based on typical setups):\n` +
              `- Local: Docker logs, file logs, app console\n` +
              `- CI/CD: GitHub Actions, GitLab CI, etc.\n` +
              `- Cloud: CloudWatch, Cloud Logging, Azure Monitor\n` +
              `- Database: Query logs, slow query logs\n\n` +
              `See \`greenfield_workflow.md\` Step 9.6 for setup instructions.`,
          },
        ],
      };
    }

    // Parse and summarize the configuration
    return {
      content: [
        {
          type: 'text',
          text: `📋 LOG ACCESS STATUS: CONFIGURED\n\n` +
            `Configuration file: \`${PROJECT_DOCS_DIR}/log_access_setup.md\`\n\n` +
            `**Current Configuration:**\n\n${logConfig}\n\n` +
            `**Usage:**\n` +
            `Use \`get_logs\` tool with appropriate source and environment parameters.\n\n` +
            `Example: \`get_logs(source="docker", environment="local", lines=100)\``,
        },
      ],
    };
  }

  // ============================================================
  // IMPLEMENTATION PLANNING TOOLS
  // ============================================================

  async startCyclePlanning(cycleId) {
    const implementationPlansDir = path.join(PROJECT_DOCS_DIR, 'roadmap');
    const planFileName = `CYCLE_${cycleId.replace(/\./g, '_')}_IMPLEMENTATION_PLAN.md`;
    const planPath = path.join(implementationPlansDir, planFileName);

    // Check if ROADMAP.md exists
    const roadmapPath = path.join(PROJECT_DOCS_DIR, 'ROADMAP.md');
    let roadmapContent = '';
    try {
      roadmapContent = await fs.readFile(roadmapPath, 'utf-8');
    } catch (err) {
      return {
        content: [{
          type: 'text',
          text: `❌ ERROR: No ROADMAP.md found\n\n` +
            `Cannot find the high-level implementation plan at:\n${roadmapPath}\n\n` +
            `This file should exist with cycle definitions. ` +
            `Create it first or run the bootstrap process.`,
        }],
        isError: true,
      };
    }

    // Check if detailed plan already exists
    let existingPlan = null;
    try {
      existingPlan = await fs.readFile(planPath, 'utf-8');
    } catch (err) {
      // Plan doesn't exist yet - this is expected
    }

    // Extract cycle info from roadmap
    const cyclePattern = new RegExp(`### .*Cycle ${cycleId}[^#]*`, 'i');
    const cycleMatch = roadmapContent.match(cyclePattern);
    const cycleInfo = cycleMatch ? cycleMatch[0] : 'Cycle not found in roadmap';

    if (existingPlan) {
      // Plan exists - check if it's approved
      const isApproved = existingPlan.includes('- [x] **User approved this plan**');
      const status = isApproved ? '✅ APPROVED - Ready for implementation' : '📋 DRAFT - Needs review';

      return {
        content: [{
          type: 'text',
          text: `📋 CYCLE ${cycleId} PLANNING STATUS\n\n` +
            `**Detailed plan exists:** \`${planFileName}\`\n` +
            `**Status:** ${status}\n\n` +
            `---\n\n` +
            `**From high-level roadmap:**\n${cycleInfo}\n\n` +
            `---\n\n` +
            `**Next Steps:**\n` +
            (isApproved
              ? `✅ Plan is approved. Proceed with implementation using the existing MCP tools.\n` +
              `- Use \`check_pattern_exists()\` before implementing\n` +
              `- Use \`validate_cycle_completion()\` when done`
              : `1. Review the existing plan with the user\n` +
              `2. If approved, call \`approve_cycle_plan("${cycleId}")\`\n` +
              `3. If changes needed, update the plan file directly`),
        }],
      };
    }

    // Plan doesn't exist - provide research guidance
    return {
      content: [{
        type: 'text',
        text: `🔬 PLANNING REQUIRED FOR CYCLE ${cycleId}\n\n` +
          `No detailed implementation plan exists yet.\n\n` +
          `**From high-level roadmap:**\n${cycleInfo}\n\n` +
          `---\n\n` +
          `## Research Phase Checklist\n\n` +
          `Before creating the detailed plan, complete this research:\n\n` +
          `### 1. Understand the Feature\n` +
          `- [ ] What problem does this solve?\n` +
          `- [ ] What are the inputs and outputs?\n` +
          `- [ ] What does "done" look like for the user?\n\n` +
          `### 2. Check Existing Patterns\n` +
          `- [ ] Call \`check_pattern_exists()\` for relevant patterns\n` +
          `- [ ] Review existing codebase for reusable components\n\n` +
          `### 3. Assess Scope (CRITICAL)\n` +
          `- [ ] Call \`analyze_cycle_scope()\` with feature details\n` +
          `- [ ] Be HONEST about complexity - don't underestimate\n` +
          `- [ ] If scope is too large, DECOMPOSE into sub-cycles\n\n` +
          `### 4. Create the Plan\n` +
          `- [ ] Call \`create_cycle_plan()\` after research is complete\n` +
          `- [ ] Fill in all required sections\n` +
          `- [ ] Review with user\n\n` +
          `---\n\n` +
          `**⚠️ Senior Engineering Practice:**\n` +
          `Humans tend to overestimate what can be done in one cycle.\n` +
          `Ship small, test, iterate. If in doubt, make it smaller.\n\n` +
          `**Plan location:** \`${implementationPlansDir}/${planFileName}\``,
      }],
    };
  }

  async analyzeCycleScope(args) {
    const {
      cycle_id,
      feature_description,
      estimated_loc,
      components_affected,
      has_external_deps = false,
      has_db_changes = false,
      breaking_risk = 'low',
    } = args;

    // Calculate complexity scores (1-5 scale)
    const scores = {
      loc: estimated_loc <= 100 ? 1 : estimated_loc <= 300 ? 2 : estimated_loc <= 500 ? 3 : estimated_loc <= 800 ? 4 : 5,
      components: components_affected.length <= 2 ? 1 : components_affected.length <= 4 ? 2 : components_affected.length <= 6 ? 3 : components_affected.length <= 8 ? 4 : 5,
      external_deps: has_external_deps ? 3 : 1,
      db_changes: has_db_changes ? 3 : 1,
      breaking_risk: breaking_risk === 'low' ? 1 : breaking_risk === 'medium' ? 3 : 5,
    };

    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
    const maxScore = 25;

    // Determine verdict
    let verdict, verdictEmoji, recommendation;
    if (totalScore <= 10) {
      verdict = 'PROCEED';
      verdictEmoji = '✅';
      recommendation = 'Scope is appropriate for a single cycle. Proceed with planning.';
    } else if (totalScore <= 15) {
      verdict = 'CONSIDER_DECOMPOSITION';
      verdictEmoji = '⚠️';
      recommendation = 'Scope is borderline. Consider breaking into smaller cycles if any complexity dimension is high.';
    } else {
      verdict = 'MUST_DECOMPOSE';
      verdictEmoji = '❌';
      recommendation = 'Scope is too large for a single cycle. MUST decompose into smaller, testable increments.';
    }

    // Generate decomposition suggestions if needed
    let decompositionSuggestions = '';
    if (verdict !== 'PROCEED') {
      decompositionSuggestions = `\n\n---\n\n## Decomposition Suggestions\n\n` +
        `Based on the complexity analysis, consider splitting this cycle:\n\n` +
        `**Suggested sub-cycles:**\n` +
        `- ${cycle_id}a: [Core foundation - most basic version]\n` +
        `- ${cycle_id}b: [Enhancement - adds complexity layer]\n` +
        `- ${cycle_id}c: [Polish - edge cases and refinements]\n\n` +
        `**Start with ${cycle_id}a because:**\n` +
        `- It establishes the foundation\n` +
        `- It's testable in isolation\n` +
        `- It delivers visible value quickly\n\n` +
        `**Update the high-level ROADMAP.md** to reflect these sub-cycles.`;
    }

    return {
      content: [{
        type: 'text',
        text: `${verdictEmoji} SCOPE ANALYSIS: Cycle ${cycle_id}\n\n` +
          `**Feature:** ${feature_description}\n\n` +
          `---\n\n` +
          `## Complexity Breakdown\n\n` +
          `| Dimension | Score | Notes |\n` +
          `|-----------|-------|-------|\n` +
          `| Lines of Code | ${scores.loc}/5 | ~${estimated_loc} LOC |\n` +
          `| Components Affected | ${scores.components}/5 | ${components_affected.length} components |\n` +
          `| External Dependencies | ${scores.external_deps}/5 | ${has_external_deps ? 'Yes' : 'No'} |\n` +
          `| Database Changes | ${scores.db_changes}/5 | ${has_db_changes ? 'Yes' : 'No'} |\n` +
          `| Breaking Risk | ${scores.breaking_risk}/5 | ${breaking_risk} |\n` +
          `| **TOTAL** | **${totalScore}/${maxScore}** | |\n\n` +
          `---\n\n` +
          `## Verdict: ${verdictEmoji} ${verdict}\n\n` +
          `${recommendation}` +
          decompositionSuggestions +
          `\n\n---\n\n` +
          `**Components to modify:**\n` +
          components_affected.map(c => `- ${c}`).join('\n'),
      }],
    };
  }

  async createCyclePlan(cycleId, cycleName, scopeAnalysisResult) {
    const implementationPlansDir = path.join(PROJECT_DOCS_DIR, 'roadmap');
    const planFileName = `CYCLE_${cycleId.replace(/\./g, '_')}_IMPLEMENTATION_PLAN.md`;
    const planPath = path.join(implementationPlansDir, planFileName);

    // Ensure directory exists
    try {
      await fs.mkdir(implementationPlansDir, { recursive: true });
    } catch (err) {
      // Directory may already exist
    }

    // Check if plan already exists
    try {
      await fs.access(planPath);
      return {
        content: [{
          type: 'text',
          text: `⚠️ Plan already exists: \`${planFileName}\`\n\n` +
            `Use \`get_cycle_plan("${cycleId}")\` to read it, or delete it to create fresh.`,
        }],
      };
    } catch (err) {
      // File doesn't exist - good, we can create it
    }

    const today = new Date().toISOString().split('T')[0];

    // Create the plan from template structure - enhanced for autonomous AI execution
    const planContent = `# Cycle ${cycleId}: ${cycleName} — Implementation Plan

**Parent Cycle:** <!-- Fill if this is a sub-cycle -->
**High-Level Reference:** [ROADMAP.md](../ROADMAP.md) → Cycle ${cycleId}
**Status:** 📋 PLANNING
**Created:** ${today}
**Last Updated:** ${today}

---

## Progress Tracker

<!-- AI ASSISTANT: Update this section as you implement. Check items when complete. -->

| Phase | Status | Notes |
|-------|--------|-------|
| Planning | 📋 In Progress | |
| Research Complete | ⬜ Pending | |
| User Approved | ⬜ Pending | |
| Implementation | ⬜ Pending | |
| Tests Passing | ⬜ Pending | |
| Documentation Updated | ⬜ Pending | |
| Cycle Complete | ⬜ Pending | |

**Current Focus:** 
**Blockers:** None

---

## 1. Executive Summary

<!-- AI ASSISTANT: 3-5 sentences capturing the essence of this cycle. -->

**What we're delivering:**
<!-- Brief description of deliverable -->

**Why it matters:**
<!-- Business value and impact -->

**Success looks like:**
<!-- Definition of done summary -->

---

## 2. Target Users

### Primary Users

**User Type:** <!-- e.g., Admin, End User, Developer -->
**Description:** <!-- Who they are -->
**How they benefit:** <!-- What they gain from this feature -->

### Secondary Users (if applicable)

<!-- N/A if no secondary users -->

---

## 3. User Stories

### Story 1: <!-- Title -->

**As a** <!-- user type -->
**I want** <!-- action or capability -->
**So that** <!-- benefit or outcome -->

**Acceptance Criteria:**
- [ ] <!-- Criterion 1 -->
- [ ] <!-- Criterion 2 -->

### Story 2: <!-- Title -->

**As a** <!-- user type -->
**I want** <!-- action or capability -->
**So that** <!-- benefit or outcome -->

**Acceptance Criteria:**
- [ ] <!-- Criterion 1 -->
- [ ] <!-- Criterion 2 -->

---

## 4. Security Considerations

<!-- N/A - [reason] if security is not applicable for this feature -->

### Authentication & Authorization

**Authentication Required:** <!-- Yes/No/Explain -->
**Authorization Model:** <!-- Role/permission description -->

### Data Sensitivity

**Data Classification:** <!-- Public/Internal/Confidential/Restricted -->
**PII Involved:** <!-- Yes/No/What type -->

### Security Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| | | |

---

## 5. Research Summary

### Problem Statement

**What we're building:**
<!-- Describe the feature/capability -->

**Why it matters:**
<!-- Business value and user impact -->

**User impact:**
<!-- What users will see/experience -->

### Existing Code & Patterns Analysis

**Existing patterns that apply:**
- <!-- Pattern name: How it applies -->

**Existing code to reuse:**
- <!-- File/component: What to reuse -->

**Research findings:**
<!-- Key insights from research phase -->

---

## 6. Scope Assessment (MANDATORY)

### Complexity Score

| Dimension | Score | Notes |
|-----------|-------|-------|
| Lines of code (estimated) | /5 | LOC |
| Components affected | /5 | |
| External dependencies/APIs | /5 | |
| Database/schema changes | /5 | |
| Risk to existing functionality | /5 | |
| **TOTAL** | **/25** | |

### Scope Verdict

**Verdict:** <!-- ✅ PROCEED / ⚠️ CONSIDER DECOMPOSITION / ❌ MUST DECOMPOSE -->

**Reasoning:**
<!-- Why this scope is appropriate or needs to be reduced -->

---

## 7. Decomposition (If Required)

<!-- N/A - Scope appropriate for single cycle (if verdict is ✅ PROCEED) -->

### Recommended Sub-Cycles

| Sub-Cycle | Description | Visible Output | Builds On |
|-----------|-------------|----------------|-----------|
| ${cycleId}a | | | Foundation |
| ${cycleId}b | | | ${cycleId}a |

### Why This Decomposition

**First increment chosen because:**
<!-- Reasoning -->

**THIS PLAN COVERS ONLY:** <!-- Specify which sub-cycle -->

---

## 8. Technical Design

### Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| | | |

### Code Structure

**Files to create:**
\`\`\`
<!-- New files with purposes -->
\`\`\`

**Files to modify:**
\`\`\`
<!-- Existing files with changes -->
\`\`\`

---

## 9. Implementation Checklist

### Backend/Service Layer
- [ ] <!-- Task -->

### Frontend/UI Layer
- [ ] <!-- Task -->

### Integration
- [ ] <!-- Task -->

---

## 10. Success Criteria & Validation

### Definition of Done

- [ ] All user story acceptance criteria met
- [ ] All tests passing (see Tests to Pass below)
- [ ] Documentation updated
- [ ] User has validated the feature works
- [ ] No regressions in existing functionality

### Tests to Pass

**Unit Tests:**
- [ ] <!-- Test description -->

**Integration Tests:**
- [ ] <!-- Test description -->

**End-to-End Tests:**
- [ ] <!-- Test description -->

**Manual Validation:**

| Step | Expected Result | Actual Result |
|------|-----------------|---------------|
| | | ⬜ Pending |

---

## 11. Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| | | | |

---

## 12. Approval

- [ ] **User approved this plan**
- [ ] **Scope assessment reviewed**
- [ ] **Decomposition applied** (if required)
- [ ] **Ready for implementation**

**Approved by:** 
**Approval date:** 

---

## 13. Implementation Notes

<!-- Use during implementation -->

### During Implementation

### Deviations from Plan

| What Changed | Why | Impact |
|--------------|-----|--------|
| | | |
`;

    await fs.writeFile(planPath, planContent, 'utf-8');

    return {
      content: [{
        type: 'text',
        text: `✅ Created implementation plan: \`${planFileName}\`\n\n` +
          `**Location:** \`${planPath}\`\n\n` +
          `---\n\n` +
          `## Next Steps\n\n` +
          `1. **Fill in the plan sections** - Replace all placeholders\n` +
          `2. **Complete scope assessment** - Be honest about complexity\n` +
          `3. **Add decomposition** if scope is too large\n` +
          `4. **Review with user** - Walk through the plan together\n` +
          `5. **Call \`approve_cycle_plan("${cycleId}")\`** after user approves\n\n` +
          `⚠️ Do NOT start implementation until the plan is approved.`,
      }],
    };
  }

  async getCyclePlan(cycleId) {
    const implementationPlansDir = path.join(PROJECT_DOCS_DIR, 'roadmap');
    const planFileName = `CYCLE_${cycleId.replace(/\./g, '_')}_IMPLEMENTATION_PLAN.md`;
    const planPath = path.join(implementationPlansDir, planFileName);

    try {
      const content = await fs.readFile(planPath, 'utf-8');
      return {
        content: [{
          type: 'text',
          text: `📋 Cycle ${cycleId} Implementation Plan\n\n` +
            `**File:** \`${planFileName}\`\n\n` +
            `---\n\n${content}`,
        }],
      };
    } catch (err) {
      return {
        content: [{
          type: 'text',
          text: `❌ No detailed plan found for Cycle ${cycleId}\n\n` +
            `Expected location: \`${planPath}\`\n\n` +
            `**To create a plan:**\n` +
            `1. Call \`start_cycle_planning("${cycleId}")\` for guidance\n` +
            `2. Complete the research phase\n` +
            `3. Call \`analyze_cycle_scope()\` to assess complexity\n` +
            `4. Call \`create_cycle_plan("${cycleId}", "Cycle Name")\` to create the plan`,
        }],
      };
    }
  }

  async approveCyclePlan(cycleId, userConfirmed) {
    if (!userConfirmed) {
      return {
        content: [{
          type: 'text',
          text: `❌ Cannot approve plan without user confirmation.\n\n` +
            `The \`user_confirmed\` parameter must be \`true\`.\n\n` +
            `Before calling this tool, ensure:\n` +
            `1. User has reviewed the detailed plan\n` +
            `2. User explicitly approves proceeding\n` +
            `3. Scope assessment has been completed`,
        }],
        isError: true,
      };
    }

    const implementationPlansDir = path.join(PROJECT_DOCS_DIR, 'roadmap');
    const planFileName = `CYCLE_${cycleId.replace(/\./g, '_')}_IMPLEMENTATION_PLAN.md`;
    const planPath = path.join(implementationPlansDir, planFileName);

    // Read the plan
    let planContent;
    try {
      planContent = await fs.readFile(planPath, 'utf-8');
    } catch (err) {
      return {
        content: [{
          type: 'text',
          text: `❌ No plan found for Cycle ${cycleId}\n\n` +
            `Cannot approve a plan that doesn't exist.\n` +
            `Call \`start_cycle_planning("${cycleId}")\` first.`,
        }],
        isError: true,
      };
    }

    // Validate plan has required sections - warn-only (don't block approval)
    const requiredSections = [
      'Executive Summary',
      'Target Users',
      'User Stories',
      'Security Considerations',
      'Research Summary',
      'Scope Assessment',
      'Technical Design',
      'Implementation Checklist',
      'Success Criteria',
      'Tests to Pass',
      'Risk Assessment',
      'Approval',
    ];

    const missingSections = requiredSections.filter(
      section => !planContent.toLowerCase().includes(section.toLowerCase())
    );

    // Check for unfilled sections (still have placeholder comments)
    const unfilledSections = [];
    for (const section of requiredSections) {
      const sectionPattern = new RegExp(`##.*${section}[\\s\\S]*?(?=##|$)`, 'i');
      const match = planContent.match(sectionPattern);
      if (match) {
        const sectionContent = match[0];
        // Check if section is mostly placeholders
        const placeholderCount = (sectionContent.match(/<!--.*?-->/g) || []).length;
        const actualContentLines = sectionContent.split('\n').filter(line =>
          line.trim() && !line.startsWith('#') && !line.includes('<!--') && !line.includes('|---')
        ).length;
        if (placeholderCount > actualContentLines && !sectionContent.toLowerCase().includes('n/a')) {
          unfilledSections.push(section);
        }
      }
    }

    let warnings = [];
    if (missingSections.length > 0) {
      warnings.push(`⚠️ Missing sections:\n${missingSections.map(s => `  - ${s}`).join('\n')}`);
    }
    if (unfilledSections.length > 0) {
      warnings.push(`⚠️ Sections may be incomplete:\n${unfilledSections.map(s => `  - ${s}`).join('\n')}`);
    }

    // Check scope assessment was done (look for filled scores)
    if (!planContent.match(/\*\*TOTAL\*\*.*\d+\/25/)) {
      return {
        content: [{
          type: 'text',
          text: `⚠️ Scope assessment incomplete\n\n` +
            `The complexity score section appears unfilled.\n` +
            `Complete the scope assessment before approval.`,
        }],
      };
    }

    // Update the plan to mark as approved
    const today = new Date().toISOString().split('T')[0];
    let updatedContent = planContent
      .replace('**Status:** 📋 PLANNING', '**Status:** 🏗️ APPROVED')
      .replace('- [ ] **User approved this plan**', '- [x] **User approved this plan**')
      .replace('**Approved by:**', `**Approved by:** User`)
      .replace('**Approval date:**', `**Approval date:** ${today}`);

    await fs.writeFile(planPath, updatedContent, 'utf-8');

    // Try to update the high-level ROADMAP.md status
    const roadmapPath = path.join(PROJECT_DOCS_DIR, 'ROADMAP.md');
    try {
      let roadmapContent = await fs.readFile(roadmapPath, 'utf-8');
      // Update cycle status from PLANNING to IN PROGRESS
      const cyclePattern = new RegExp(`(### .*Cycle ${cycleId}[^#]*?Status:\\**)\\s*📋\\s*PLANNING`, 'i');
      if (cyclePattern.test(roadmapContent)) {
        roadmapContent = roadmapContent.replace(cyclePattern, '$1 🏗️ IN PROGRESS');
        await fs.writeFile(roadmapPath, roadmapContent, 'utf-8');
      }
    } catch (err) {
      // Roadmap update is best-effort
    }

    // Include warnings in approval message if any
    const warningText = warnings.length > 0
      ? `\n\n---\n\n## Warnings (Non-Blocking)\n\n${warnings.join('\n\n')}\n\n*Consider addressing these before implementation.*`
      : '';

    return {
      content: [{
        type: 'text',
        text: `✅ CYCLE ${cycleId} APPROVED - READY FOR IMPLEMENTATION\n\n` +
          `**Plan:** \`${planFileName}\`\n` +
          `**Approved:** ${today}\n` +
          warningText +
          `\n\n---\n\n` +
          `## Implementation Workflow\n\n` +
          `Now you can proceed with implementation:\n\n` +
          `1. **Update the Progress Tracker** as you complete phases\n` +
          `2. **Follow the implementation checklist** in the plan\n` +
          `3. **Check patterns** before coding: \`check_pattern_exists()\`\n` +
          `4. **Update technical_status.md** as you progress\n` +
          `5. **Document new patterns** as you establish them\n` +
          `6. **Validate completion** when done: \`validate_cycle_completion("${cycleId}")\`\n\n` +
          `⚠️ If scope changes significantly, update the plan and re-approve.`,
      }],
    };
  }

  async getImplementationRoadmap() {
    const roadmapPath = path.join(PROJECT_DOCS_DIR, 'ROADMAP.md');
    const implementationPlansDir = path.join(PROJECT_DOCS_DIR, 'roadmap');

    // Read the high-level roadmap
    let roadmapContent;
    try {
      roadmapContent = await fs.readFile(roadmapPath, 'utf-8');
    } catch (err) {
      return {
        content: [{
          type: 'text',
          text: `❌ No ROADMAP.md found\n\n` +
            `The high-level roadmap doesn't exist at:\n${roadmapPath}\n\n` +
            `This file should be created during bootstrap.`,
        }],
        isError: true,
      };
    }

    // Find all detailed plans
    let detailedPlans = [];
    try {
      const files = await fs.readdir(implementationPlansDir);
      detailedPlans = files.filter(f => f.endsWith('_IMPLEMENTATION_PLAN.md'));
    } catch (err) {
      // Directory may not exist yet
    }

    // Extract cycle information from roadmap
    const cycleMatches = roadmapContent.matchAll(/### .*Cycle (\d+\.\d+[a-z]?):?\s*([^\n]*)\n[^#]*?\*Status:\*\*?\s*([📋🏗️✅⏸️❌][^\n]*)/gi);
    const cycles = [];
    for (const match of cycleMatches) {
      const cycleId = match[1];
      const cycleName = match[2].trim();
      const status = match[3].trim();
      const hasDetailedPlan = detailedPlans.some(p => p.includes(`CYCLE_${cycleId.replace(/\./g, '_')}`));
      cycles.push({ id: cycleId, name: cycleName, status, hasDetailedPlan });
    }

    // Build summary
    let summary = `# Implementation Roadmap Overview\n\n`;
    summary += `**High-level plan:** \`ROADMAP.md\`\n`;
    summary += `**Detailed plans:** \`roadmap/\`\n\n`;
    summary += `---\n\n`;
    summary += `## Cycles\n\n`;
    summary += `| Cycle | Name | Status | Detailed Plan |\n`;
    summary += `|-------|------|--------|---------------|\n`;

    for (const cycle of cycles) {
      summary += `| ${cycle.id} | ${cycle.name || 'Untitled'} | ${cycle.status} | ${cycle.hasDetailedPlan ? '✅ Yes' : '❌ No'} |\n`;
    }

    if (cycles.length === 0) {
      summary += `| - | No cycles defined yet | - | - |\n`;
    }

    summary += `\n---\n\n`;
    summary += `## Available Detailed Plans\n\n`;
    if (detailedPlans.length > 0) {
      for (const plan of detailedPlans) {
        summary += `- \`${plan}\`\n`;
      }
    } else {
      summary += `No detailed plans created yet.\n`;
    }

    summary += `\n---\n\n`;
    summary += `## Next Actions\n\n`;

    const planningCycles = cycles.filter(c => c.status.includes('PLANNING') && !c.hasDetailedPlan);
    if (planningCycles.length > 0) {
      summary += `**Cycles ready for planning:**\n`;
      for (const cycle of planningCycles) {
        summary += `- Call \`start_cycle_planning("${cycle.id}")\` to begin planning\n`;
      }
    }

    const inProgressCycles = cycles.filter(c => c.status.includes('IN PROGRESS'));
    if (inProgressCycles.length > 0) {
      summary += `\n**Cycles in progress:**\n`;
      for (const cycle of inProgressCycles) {
        summary += `- Cycle ${cycle.id}: In progress\n`;
      }
    }

    return {
      content: [{
        type: 'text',
        text: summary,
      }],
    };
  }

  // ============================================================
  // SEED DATA METHODS
  // ============================================================

  async getSeedDataOverview() {
    const seedDataDir = path.join(__dirname, 'seed_data');

    try {
      await fs.access(seedDataDir);
    } catch {
      return {
        content: [{
          type: 'text',
          text: `## Seed Data Overview\n\n**Status:** seed_data/ directory not found\n\n**Action:** Run bootstrap or create seed_data/ directory manually.\n\nSee the FluxFrame documentation for seed data setup.`,
        }],
      };
    }

    let overview = `## Seed Data Overview\n\n`;
    overview += `**Location:** \`seed_data/\`\n\n`;

    // Check each subdirectory
    const subdirs = ['fixtures', 'samples', 'factories', 'schemas'];

    for (const subdir of subdirs) {
      const subdirPath = path.join(seedDataDir, subdir);
      try {
        const files = await fs.readdir(subdirPath);
        const dataFiles = files.filter(f => !f.startsWith('.') && (f.endsWith('.json') || f.endsWith('.yaml') || f.endsWith('.yml') || f.endsWith('.ts') || f.endsWith('.js')));

        overview += `### ${subdir}/\n`;
        if (dataFiles.length > 0) {
          for (const file of dataFiles) {
            overview += `- \`${file}\`\n`;
          }
        } else {
          overview += `- *(empty)*\n`;
        }
        overview += `\n`;
      } catch {
        overview += `### ${subdir}/\n- *(directory not found)*\n\n`;
      }
    }

    overview += `---\n\n`;
    overview += `**Usage:**\n`;
    overview += `- Use \`get_sample_data(category)\` to retrieve sample data for AI context\n`;
    overview += `- Use \`list_fixtures()\` to see available test fixtures\n`;
    overview += `- Point tests to \`seed_data/fixtures/\` for test data\n`;

    return {
      content: [{
        type: 'text',
        text: overview,
      }],
    };
  }

  async getSampleData(category, includeSchema = false) {
    const samplesDir = path.join(__dirname, 'seed_data', 'samples');
    const schemasDir = path.join(__dirname, 'seed_data', 'schemas');

    // Try different file extensions
    const extensions = ['.sample.json', '.json', '.sample.yaml', '.yaml', '.yml'];
    let sampleContent = null;
    let sampleFile = null;

    for (const ext of extensions) {
      const filePath = path.join(samplesDir, `${category}${ext}`);
      try {
        sampleContent = await fs.readFile(filePath, 'utf-8');
        sampleFile = `${category}${ext}`;
        break;
      } catch {
        continue;
      }
    }

    if (!sampleContent) {
      return {
        content: [{
          type: 'text',
          text: `## Sample Data: ${category}\n\n**Status:** No sample data found for "${category}"\n\n**Available samples:** Check \`seed_data/samples/\` directory or run \`get_seed_data_overview()\` to see what's available.\n\n**To add:** Create \`seed_data/samples/${category}.sample.json\` with example data.`,
        }],
      };
    }

    let result = `## Sample Data: ${category}\n\n`;
    result += `**File:** \`seed_data/samples/${sampleFile}\`\n\n`;
    result += `\`\`\`json\n${sampleContent}\n\`\`\`\n`;

    if (includeSchema) {
      const schemaExtensions = ['.schema.json', '.d.ts', '.ts'];
      for (const ext of schemaExtensions) {
        const schemaPath = path.join(schemasDir, `${category}${ext}`);
        try {
          const schemaContent = await fs.readFile(schemaPath, 'utf-8');
          result += `\n---\n\n### Schema\n\n`;
          result += `**File:** \`seed_data/schemas/${category}${ext}\`\n\n`;
          result += `\`\`\`${ext.endsWith('.json') ? 'json' : 'typescript'}\n${schemaContent}\n\`\`\`\n`;
          break;
        } catch {
          continue;
        }
      }
    }

    return {
      content: [{
        type: 'text',
        text: result,
      }],
    };
  }

  async listFixtures(category = null) {
    const fixturesDir = path.join(__dirname, 'seed_data', 'fixtures');

    try {
      await fs.access(fixturesDir);
    } catch {
      return {
        content: [{
          type: 'text',
          text: `## Test Fixtures\n\n**Status:** No fixtures directory found\n\n**Action:** Create \`seed_data/fixtures/\` and add test fixture files.`,
        }],
      };
    }

    const files = await fs.readdir(fixturesDir);
    const fixtureFiles = files.filter(f => !f.startsWith('.') && (f.endsWith('.json') || f.endsWith('.yaml') || f.endsWith('.yml')));

    // Filter by category if provided
    const filteredFiles = category
      ? fixtureFiles.filter(f => f.toLowerCase().includes(category.toLowerCase()))
      : fixtureFiles;

    let result = `## Test Fixtures${category ? ` (filtered: ${category})` : ''}\n\n`;
    result += `**Location:** \`seed_data/fixtures/\`\n\n`;

    if (filteredFiles.length === 0) {
      result += category
        ? `No fixtures found matching "${category}".\n\nAll available fixtures:\n`
        : `No fixtures found.\n\n**To add:** Create JSON/YAML files in \`seed_data/fixtures/\` with test data.\n`;

      if (category && fixtureFiles.length > 0) {
        for (const file of fixtureFiles) {
          result += `- \`${file}\`\n`;
        }
      }
    } else {
      result += `| Fixture | Description |\n`;
      result += `|---------|-------------|\n`;

      for (const file of filteredFiles) {
        const filePath = path.join(fixturesDir, file);
        try {
          const content = await fs.readFile(filePath, 'utf-8');
          const parsed = JSON.parse(content);
          const description = parsed._meta?.description || parsed.description || 'No description';
          result += `| \`${file}\` | ${description} |\n`;
        } catch {
          result += `| \`${file}\` | *(unable to read description)* |\n`;
        }
      }
    }

    result += `\n---\n\n`;
    result += `**Usage:** Import fixtures in your tests:\n`;
    result += `\`\`\`javascript\n`;
    result += `import userData from '../seed_data/fixtures/user_admin.json';\n`;
    result += `\`\`\`\n`;

    return {
      content: [{
        type: 'text',
        text: result,
      }],
    };
  }

  // ============================================================
  // REFERENCE LIBRARY METHODS (Descriptive Context)
  // ============================================================

  async getReferenceLibraryOverview() {
    const refLibDir = path.join(PROJECT_DOCS_DIR, 'reference_library');

    try {
      await fs.access(refLibDir);
    } catch {
      return {
        content: [{
          type: 'text',
          text: `## Reference Library\n\n**Status:** Not found at \`${PROJECT_DOCS_DIR}/reference_library/\`\n\n**Note:** The Reference Library stores DESCRIPTIVE information (what the real world looks like) vs PRESCRIPTIVE docs (patterns, workflows). It INFORMS but doesn't DICTATE decisions.\n\n**Action:** Create the reference_library directory structure.`,
        }],
      };
    }

    const categories = [
      { name: 'correspondence', desc: 'Emails, Slack threads, meeting notes' },
      { name: 'user_research', desc: 'Interviews, feedback, usage scenarios' },
      { name: 'market_research', desc: 'Competitor analysis, industry reports' },
      { name: 'domain_knowledge', desc: 'Expert input, terminology, business context' },
      { name: 'specifications', desc: 'External specs, PDFs, partner docs' },
    ];

    let result = `## Reference Library Overview\n\n`;
    result += `**Location:** \`${PROJECT_DOCS_DIR}/reference_library/\`\n\n`;
    result += `**Philosophy:** DESCRIPTIVE (what exists) vs PRESCRIPTIVE (what to do)\n`;
    result += `The Reference Library INFORMS decisions but does NOT DICTATE them.\n\n`;

    result += `### Contents by Category\n\n`;
    result += `| Category | Description | Files |\n`;
    result += `|----------|-------------|-------|\n`;

    for (const cat of categories) {
      const catDir = path.join(refLibDir, cat.name);
      let fileCount = 0;
      try {
        const files = await fs.readdir(catDir);
        fileCount = files.filter(f => !f.startsWith('.') && f !== '.gitkeep').length;
      } catch {
        // Directory doesn't exist
      }
      result += `| \`${cat.name}/\` | ${cat.desc} | ${fileCount} |\n`;
    }

    result += `\n### When to Use\n\n`;
    result += `- **Before planning features:** Check \`user_research/\` for user needs\n`;
    result += `- **When designing tests:** Reference real usage scenarios\n`;
    result += `- **When making product decisions:** Consider market context\n`;
    result += `- **When understanding domain:** Consult \`domain_knowledge/\`\n\n`;
    result += `### Key Principle\n\n`;
    result += `> **Contradictions are valuable information.** Don't resolve them artificially.\n`;
    result += `> Different user needs reveal complexity - the contradiction IS the insight.\n`;

    return {
      content: [{
        type: 'text',
        text: result,
      }],
    };
  }

  async searchReferenceLibrary(query, category = 'all', context = 'general') {
    const refLibDir = path.join(PROJECT_DOCS_DIR, 'reference_library');

    try {
      await fs.access(refLibDir);
    } catch {
      return {
        content: [{
          type: 'text',
          text: `## Reference Library Search\n\n**Status:** Reference Library not found.\n\n**Query:** "${query}"\n\n**Note:** The Reference Library stores DESCRIPTIVE context (real-world inputs) that INFORMS but doesn't DICTATE decisions.`,
        }],
      };
    }

    const categories = category === 'all'
      ? ['correspondence', 'user_research', 'market_research', 'domain_knowledge', 'specifications']
      : [category];

    const searchResults = [];
    const queryLower = query.toLowerCase();

    for (const cat of categories) {
      const catDir = path.join(refLibDir, cat);
      try {
        const files = await fs.readdir(catDir);
        const mdFiles = files.filter(f => f.endsWith('.md') && !f.startsWith('.'));

        for (const file of mdFiles) {
          const filePath = path.join(catDir, file);
          const content = await fs.readFile(filePath, 'utf-8');

          // Check if query matches filename or content
          if (file.toLowerCase().includes(queryLower) || content.toLowerCase().includes(queryLower)) {
            // Extract relevant snippet
            const lines = content.split('\n');
            const matchingLines = [];

            for (let i = 0; i < lines.length; i++) {
              if (lines[i].toLowerCase().includes(queryLower)) {
                // Get surrounding context (2 lines before and after)
                const start = Math.max(0, i - 2);
                const end = Math.min(lines.length - 1, i + 2);
                const snippet = lines.slice(start, end + 1).join('\n');
                matchingLines.push({ lineNum: i + 1, snippet });
                i = end; // Skip ahead to avoid duplicate context
              }
            }

            // Get document title and summary
            const titleMatch = content.match(/^#\s+(.+)$/m);
            const title = titleMatch ? titleMatch[1] : file;
            const summaryMatch = content.match(/## Summary\n\n([^\n]+)/);
            const summary = summaryMatch ? summaryMatch[1] : null;

            searchResults.push({
              category: cat,
              file,
              title,
              summary,
              matches: matchingLines.slice(0, 3), // Limit to 3 matches per file
              relevance: file.toLowerCase().includes(queryLower) ? 'high' : 'medium',
            });
          }
        }
      } catch {
        // Category directory doesn't exist or is empty
      }
    }

    // Sort by relevance
    searchResults.sort((a, b) => {
      if (a.relevance === 'high' && b.relevance !== 'high') return -1;
      if (b.relevance === 'high' && a.relevance !== 'high') return 1;
      return 0;
    });

    let result = `## Reference Library Search Results\n\n`;
    result += `**Query:** "${query}"\n`;
    result += `**Categories searched:** ${categories.join(', ')}\n`;
    result += `**Context:** ${context}\n`;
    result += `**Results found:** ${searchResults.length}\n\n`;

    if (searchResults.length === 0) {
      result += `No matches found for "${query}".\n\n`;
      result += `### Suggestions\n\n`;
      result += `- Try broader search terms\n`;
      result += `- Search different categories\n`;
      result += `- Use \`get_reference_library_overview()\` to see what's available\n`;
    } else {
      result += `---\n\n`;
      result += `> **Remember:** This is DESCRIPTIVE context. It INFORMS but doesn't DICTATE decisions.\n`;
      result += `> Contradictions between sources are valuable information.\n\n`;

      for (const item of searchResults.slice(0, 5)) { // Limit to 5 results
        result += `### ${item.title}\n\n`;
        result += `**File:** \`reference_library/${item.category}/${item.file}\`\n`;
        result += `**Category:** ${item.category}\n`;
        if (item.summary) {
          result += `**Summary:** ${item.summary}\n`;
        }
        result += `\n`;

        if (item.matches.length > 0) {
          result += `**Relevant excerpts:**\n`;
          for (const match of item.matches) {
            result += `\`\`\`\n${match.snippet}\n\`\`\`\n`;
          }
        }
        result += `\n---\n\n`;
      }

      if (searchResults.length > 5) {
        result += `*${searchResults.length - 5} more results not shown. Narrow your search for more specific results.*\n`;
      }
    }

    // Add context-specific guidance
    if (context === 'feature_planning') {
      result += `\n### Feature Planning Guidance\n\n`;
      result += `When using this context for feature planning:\n`;
      result += `- User feedback reveals WHAT users want, not necessarily WHAT we should build\n`;
      result += `- Consider contradictions as indicators of needed configurability\n`;
      result += `- Market research shows landscape, not required direction\n`;
    } else if (context === 'test_design') {
      result += `\n### Test Design Guidance\n\n`;
      result += `When using this context for test design:\n`;
      result += `- User scenarios provide realistic test cases\n`;
      result += `- Domain knowledge helps identify valid test data\n`;
      result += `- Specifications define integration requirements\n`;
    }

    return {
      content: [{
        type: 'text',
        text: result,
      }],
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
