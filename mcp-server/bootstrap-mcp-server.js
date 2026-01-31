#!/usr/bin/env node

/**
 * FluxFrame Bootstrap MCP Server
 * 
 * Purpose: Self-managing bootstrap process for FluxFrame setup
 * - Tracks bootstrap progress across sessions
 * - Validates step completion
 * - Provides context-aware next steps
 * - Persists state to bootstrap_state.json
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get project root from command line args
// MCP servers are invoked with: node bootstrap-mcp-server.js <project-path>
// Falls back to CWD if no arg provided (for backward compatibility)
function getProjectRoot() {
  const projectPathArg = process.argv[2];
  if (projectPathArg) {
    return path.resolve(projectPathArg);
  }
  // Fallback: try CWD, but warn in debug
  return process.cwd();
}

// Bootstrap state file location
const STATE_FILE = path.join(getProjectRoot(), '.fluxframe-bootstrap-state.json');

// Decisions log file location (written during bootstrap, persists after)
const DECISIONS_FILE_NAME = 'bootstrap_decisions.md';

// Bootstrap workflow definition
const BOOTSTRAP_WORKFLOW = {
  phases: [
    {
      id: "phase_0",
      name: "Prerequisites & MCP Setup",
      description: "Ensure user has MCP configured and understands the process",
      steps: [
        {
          id: "0.1",
          name: "Verify MCP Connection",
          description: "Confirm this MCP server is accessible to the AI assistant",
          validation: "User confirms they can see bootstrap tools",
          requiredInfo: []
        },
        {
          id: "0.2",
          name: "Explain Bootstrap Process",
          description: "User understands what will happen during bootstrap",
          validation: "User confirms understanding",
          requiredInfo: []
        }
      ]
    },
    {
      id: "phase_1",
      name: "Detection",
      description: "Scan project to classify bootstrap scenario",
      steps: [
        {
          id: "1.1",
          name: "Scan Project Files",
          description: "Check for existing AI rules, documentation, patterns",
          validation: "Inventory of existing files created",
          requiredInfo: []
        },
        {
          id: "1.2",
          name: "Classify Scenario",
          description: "Determine: GREENFIELD, SIMILAR_WORKFLOW, or MIGRATION",
          validation: "Scenario classification stored",
          requiredInfo: ["scenario"]
        },
        {
          id: "1.3",
          name: "Present Findings",
          description: "Show user what was detected and get confirmation",
          validation: "User approves detected scenario",
          requiredInfo: ["scenario", "detected_files"]
        }
      ]
    },
    {
      id: "phase_2",
      name: "Information Gathering",
      description: "Collect necessary project information",
      steps: [
        {
          id: "2.1",
          name: "Project Basics",
          description: "Name, purpose, tech stack",
          validation: "Project basics recorded",
          requiredInfo: ["project_name", "project_purpose", "tech_stack"]
        },
        {
          id: "2.2",
          name: "AI Tools Selection",
          description: "Which AI assistants will be used",
          validation: "AI tools selected",
          requiredInfo: ["ai_tools"]
        },
        {
          id: "2.3",
          name: "Documentation Location",
          description: "Where documentation will live",
          validation: "Docs location chosen",
          requiredInfo: ["docs_location"]
        },
        {
          id: "2.4",
          name: "Infrastructure Assessment",
          description: "Environment map and configuration strategy",
          validation: "Infrastructure recorded",
          requiredInfo: ["environments"]
        },
        {
          id: "2.5",
          name: "Optional Features",
          description: "Browser automation, log access, etc.",
          validation: "Optional features decided",
          requiredInfo: ["optional_features"]
        },
        {
          id: "2.6",
          name: "Future State (Planned & Aspirational)",
          description: "Capture intended future capabilities for planning",
          validation: "Future state recorded or explicitly skipped",
          requiredInfo: []  // Optional - user can skip
        }
      ]
    },
    {
      id: "phase_3",
      name: "File Generation",
      description: "Create FluxFrame files based on gathered information",
      steps: [
        {
          id: "3.1",
          name: "Create Directory Structure",
          description: "Set up documentation and pattern directories",
          validation: "Directories exist",
          requiredInfo: []
        },
        {
          id: "3.2",
          name: "Generate Core Documentation",
          description: "Create context_master_guide.md, technical_status.md, etc.",
          validation: "Core docs exist and valid",
          requiredInfo: []
        },
        {
          id: "3.3",
          name: "Generate AI Rules",
          description: "Create AGENTS.md and tool-specific rules",
          validation: "AI rules exist",
          requiredInfo: []
        },
        {
          id: "3.4",
          name: "Configure MCP Server",
          description: "Create project-specific MCP server",
          validation: "MCP server exists and tested",
          requiredInfo: []
        },
        {
          id: "3.5",
          name: "Update package.json",
          description: "Add MCP dependencies and scripts",
          validation: "package.json updated",
          requiredInfo: []
        }
      ]
    },
    {
      id: "phase_4",
      name: "Validation",
      description: "Verify everything works correctly",
      steps: [
        {
          id: "4.1",
          name: "File Validation",
          description: "Check all files are created and valid",
          validation: "All files pass validation",
          requiredInfo: []
        },
        {
          id: "4.2",
          name: "MCP Server Test",
          description: "Test project MCP server starts",
          validation: "MCP server starts successfully",
          requiredInfo: []
        },
        {
          id: "4.3",
          name: "User Review",
          description: "User reviews generated files",
          validation: "User approves generated files",
          requiredInfo: []
        }
      ]
    },
    {
      id: "phase_5",
      name: "Finalization",
      description: "Atomically activate project rules, clean up templates, and complete bootstrap",
      steps: [
        {
          id: "5.1",
          name: "Validate Ready for Finalization",
          description: "Verify all bootstrap artifacts exist before finalization",
          validation: "All artifacts verified: staged rules, mcp-server.js, docs directory",
          requiredInfo: []
        },
        {
          id: "5.2",
          name: "Execute Finalization",
          description: "Call finalize_bootstrap tool to atomically activate rules, clean up templates, and update README. Then guide user to swap MCP config.",
          validation: "finalize_bootstrap completed successfully, user informed to swap MCP",
          requiredInfo: []
        }
      ]
    }
  ]
};

// Default state structure
const DEFAULT_STATE = {
  version: "1.0.0",
  startedAt: new Date().toISOString(),
  lastUpdated: new Date().toISOString(),
  currentPhase: "phase_0",
  currentStep: "0.1",
  scenario: null,
  completedSteps: [],
  collectedInfo: {},
  validationResults: {},
  notes: [],
  decisions: [],  // Structured decisions with reasoning
  futureState: {   // Planned and aspirational items
    planned: [],   // Tier 2: Items to actively prepare for (soon)
    aspirational: [] // Tier 3: Documentation only (someday)
  }
};

class BootstrapServer {
  constructor() {
    this.server = new Server(
      {
        name: "fluxframe-bootstrap",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
  }

  setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: "get_bootstrap_state",
          description: "Get current bootstrap progress and state. Returns what phase/step we're on, what's been completed, and what information has been collected.",
          inputSchema: {
            type: "object",
            properties: {},
          },
        },
        {
          name: "get_next_step",
          description: "Get the next step in the bootstrap process with detailed instructions. Returns step ID, name, description, what needs to be done, and what info to collect.",
          inputSchema: {
            type: "object",
            properties: {},
          },
        },
        {
          name: "complete_step",
          description: "Mark a step as complete and optionally save collected information. Only call this after the step has been fully executed.",
          inputSchema: {
            type: "object",
            properties: {
              stepId: {
                type: "string",
                description: "Step ID (e.g., '1.1', '2.3')",
              },
              collectedInfo: {
                type: "object",
                description: "Information collected during this step (optional)",
              },
              notes: {
                type: "string",
                description: "Optional notes about step completion",
              },
            },
            required: ["stepId"],
          },
        },
        {
          name: "validate_step",
          description: "Check if a step's requirements are met before marking it complete. Returns validation result with pass/fail and missing requirements.",
          inputSchema: {
            type: "object",
            properties: {
              stepId: {
                type: "string",
                description: "Step ID to validate (e.g., '1.1', '2.3')",
              },
            },
            required: ["stepId"],
          },
        },
        {
          name: "update_bootstrap_info",
          description: "Update collected information without completing a step. Useful for saving progress incrementally.",
          inputSchema: {
            type: "object",
            properties: {
              info: {
                type: "object",
                description: "Information to add/update (merges with existing)",
              },
            },
            required: ["info"],
          },
        },
        {
          name: "get_workflow_overview",
          description: "Get complete overview of the bootstrap workflow with all phases and steps. Useful at the start to understand the full process.",
          inputSchema: {
            type: "object",
            properties: {},
          },
        },
        {
          name: "reset_bootstrap",
          description: "Reset bootstrap state to start over. Use with caution - this clears all progress.",
          inputSchema: {
            type: "object",
            properties: {
              confirm: {
                type: "boolean",
                description: "Must be true to confirm reset",
              },
            },
            required: ["confirm"],
          },
        },
        {
          name: "log_decision",
          description: "Log a decision with its reasoning. Use this to capture WHY a choice was made, not just WHAT was chosen. Decisions are persisted to bootstrap_decisions.md in the docs directory.",
          inputSchema: {
            type: "object",
            properties: {
              category: {
                type: "string",
                description: "Decision category (e.g., 'infrastructure', 'ai_tools', 'architecture', 'config_management', 'verification', 'browser_automation', 'log_access', 'api_contract', 'custom')",
              },
              decision: {
                type: "string",
                description: "What was decided/chosen",
              },
              reasoning: {
                type: "string",
                description: "WHY this choice was made - context, tradeoffs considered, constraints, user preferences",
              },
              alternatives: {
                type: "array",
                items: { type: "string" },
                description: "Other options that were considered (optional)",
              },
              implications: {
                type: "string",
                description: "What this decision means for the project going forward (optional)",
              },
              stepId: {
                type: "string",
                description: "The bootstrap step this decision was made in (optional, auto-detected if not provided)",
              },
            },
            required: ["category", "decision", "reasoning"],
          },
        },
        {
          name: "get_decisions",
          description: "Get all logged decisions, optionally filtered by category. Use this to review decisions made earlier in the bootstrap process.",
          inputSchema: {
            type: "object",
            properties: {
              category: {
                type: "string",
                description: "Filter by category (optional, returns all if not specified)",
              },
            },
          },
        },
        {
          name: "sync_decisions_to_file",
          description: "Write all logged decisions to the bootstrap_decisions.md file in the docs directory. Call this after major decision points or before ending a session.",
          inputSchema: {
            type: "object",
            properties: {
              docsDir: {
                type: "string",
                description: "Documentation directory path (e.g., 'project_docs'). If not provided, uses collectedInfo.docs_location or defaults to 'project_docs'.",
              },
            },
          },
        },
        {
          name: "log_future_item",
          description: "Log a planned or aspirational item for future implementation. Planned items (soon) get active FluxFrame preparation. Aspirational items (someday) are documentation only.",
          inputSchema: {
            type: "object",
            properties: {
              tier: {
                type: "string",
                enum: ["planned", "aspirational"],
                description: "'planned' = soon, active FluxFrame prep; 'aspirational' = someday, documentation only",
              },
              category: {
                type: "string",
                description: "Category (e.g., 'infrastructure', 'environment', 'feature', 'integration')",
              },
              intention: {
                type: "string",
                description: "What user intends to have",
              },
              timeframe: {
                type: "string",
                description: "When they plan to implement (e.g., 'soon', 'eventually', 'someday')",
              },
              fluxframeImpact: {
                type: "string",
                description: "How this will affect workflows/patterns/rules when implemented",
              },
              placeholder: {
                type: "string",
                description: "What placeholder should be created now (for planned items)",
              },
            },
            required: ["tier", "category", "intention"],
          },
        },
        {
          name: "get_future_state",
          description: "Get all logged planned and aspirational items. Use this to review future state captured during bootstrap.",
          inputSchema: {
            type: "object",
            properties: {
              tier: {
                type: "string",
                enum: ["planned", "aspirational", "all"],
                description: "Filter by tier (optional, defaults to 'all')",
              },
            },
          },
        },
        {
          name: "finalize_bootstrap",
          description: "Atomically finalize the bootstrap process: activate project rules from staging, remove FluxFrame template files, update README, and clean up state. Call this as the final step of bootstrap - it replaces all manual cleanup commands. MANDATORY before bootstrap is considered complete.",
          inputSchema: {
            type: "object",
            properties: {
              projectName: {
                type: "string",
                description: "Project name (optional, read from bootstrap state if not provided)",
              },
              docsDir: {
                type: "string",
                description: "Documentation directory path (optional, read from bootstrap state if not provided)",
              },
              projectPurpose: {
                type: "string",
                description: "One-line project purpose for README (optional, read from bootstrap state if not provided)",
              },
              keepStateFile: {
                type: "boolean",
                description: "Keep .fluxframe-bootstrap-state.json as a record (default: false)",
              },
            },
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      try {
        switch (request.params.name) {
          case "get_bootstrap_state":
            return await this.getBootstrapState();
          case "get_next_step":
            return await this.getNextStep();
          case "complete_step":
            return await this.completeStep(request.params.arguments);
          case "validate_step":
            return await this.validateStep(request.params.arguments);
          case "update_bootstrap_info":
            return await this.updateBootstrapInfo(request.params.arguments);
          case "get_workflow_overview":
            return await this.getWorkflowOverview();
          case "reset_bootstrap":
            return await this.resetBootstrap(request.params.arguments);
          case "log_decision":
            return await this.logDecision(request.params.arguments);
          case "get_decisions":
            return await this.getDecisions(request.params.arguments);
          case "sync_decisions_to_file":
            return await this.syncDecisionsToFile(request.params.arguments);
          case "log_future_item":
            return await this.logFutureItem(request.params.arguments);
          case "get_future_state":
            return await this.getFutureState(request.params.arguments);
          case "finalize_bootstrap":
            return await this.finalizeBootstrap(request.params.arguments);
          default:
            throw new Error(`Unknown tool: ${request.params.name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ error: error.message }, null, 2),
            },
          ],
        };
      }
    });
  }

  async loadState() {
    try {
      const data = await fs.readFile(STATE_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      // State file doesn't exist yet, return default
      return { ...DEFAULT_STATE };
    }
  }

  async saveState(state) {
    state.lastUpdated = new Date().toISOString();
    await fs.writeFile(STATE_FILE, JSON.stringify(state, null, 2), 'utf-8');
  }

  findPhase(phaseId) {
    return BOOTSTRAP_WORKFLOW.phases.find(p => p.id === phaseId);
  }

  findStep(stepId) {
    for (const phase of BOOTSTRAP_WORKFLOW.phases) {
      const step = phase.steps.find(s => s.id === stepId);
      if (step) {
        return { step, phase };
      }
    }
    return null;
  }

  getNextStepAfter(currentStepId) {
    const result = this.findStep(currentStepId);
    if (!result) return null;

    const { step, phase } = result;
    const stepIndex = phase.steps.indexOf(step);

    // Try next step in same phase
    if (stepIndex < phase.steps.length - 1) {
      return {
        step: phase.steps[stepIndex + 1],
        phase: phase
      };
    }

    // Try first step of next phase
    const phaseIndex = BOOTSTRAP_WORKFLOW.phases.indexOf(phase);
    if (phaseIndex < BOOTSTRAP_WORKFLOW.phases.length - 1) {
      const nextPhase = BOOTSTRAP_WORKFLOW.phases[phaseIndex + 1];
      return {
        step: nextPhase.steps[0],
        phase: nextPhase
      };
    }

    // No more steps
    return null;
  }

  async getBootstrapState() {
    const state = await this.loadState();
    const currentStepInfo = this.findStep(state.currentStep);

    const progress = {
      totalSteps: BOOTSTRAP_WORKFLOW.phases.reduce((sum, p) => sum + p.steps.length, 0),
      completedSteps: state.completedSteps.length,
      percentComplete: 0
    };
    progress.percentComplete = Math.round((progress.completedSteps / progress.totalSteps) * 100);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            status: "active",
            progress,
            current: {
              phase: currentStepInfo?.phase.name || "Unknown",
              phaseId: state.currentPhase,
              step: currentStepInfo?.step.name || "Unknown",
              stepId: state.currentStep
            },
            scenario: state.scenario,
            collectedInfo: state.collectedInfo,
            completedSteps: state.completedSteps,
            startedAt: state.startedAt,
            lastUpdated: state.lastUpdated
          }, null, 2),
        },
      ],
    };
  }

  async getNextStep() {
    const state = await this.loadState();
    const nextStepInfo = this.findStep(state.currentStep);

    if (!nextStepInfo) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              error: "Current step not found in workflow",
              currentStepId: state.currentStep
            }, null, 2),
          },
        ],
      };
    }

    const { step, phase } = nextStepInfo;

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            phase: {
              id: phase.id,
              name: phase.name,
              description: phase.description
            },
            step: {
              id: step.id,
              name: step.name,
              description: step.description,
              validation: step.validation,
              requiredInfo: step.requiredInfo
            },
            instructions: this.getStepInstructions(step.id, state),
            collectedInfo: state.collectedInfo
          }, null, 2),
        },
      ],
    };
  }

  getStepInstructions(stepId, state) {
    // Provide detailed instructions for each step
    const instructions = {
      "0.1": "Call get_workflow_overview to understand the full process, then confirm you can see the bootstrap tools including log_decision, get_decisions, and sync_decisions_to_file.",
      "0.2": "Explain to the user: Bootstrap will detect existing setup, ask questions, generate files, and clean up templates. Mention that decisions will be logged with reasoning for future reference. Confirm they want to proceed.",
      "1.1": "Scan the project root for: AI rules (.clinerules, AGENTS.md, GEMINI.md, .cursorrules, .codex/, .gemini/, etc.), documentation (docs/, project_docs/), patterns, and configuration files. Create an inventory.",
      "1.2": "Based on scan: GREENFIELD (no AI rules/docs), SIMILAR_WORKFLOW (has AI rules similar to FluxFrame), or MIGRATION (has documentation to adapt). Store scenario. LOG DECISION: Use log_decision with category='scenario' to record why this classification was chosen.",
      "1.3": "Present findings to user with classification reasoning. Get confirmation to proceed with detected scenario.",
      "2.1": "Ask user for: project name, one-line purpose, and technology stack. If package.json exists, extract what you can. LOG DECISION: Use log_decision with category='project_basics' to record the project identity and any context about why these choices were made.",
      "2.2": "Ask which AI tools they'll use: Claude Code, Roo Code, Cline, Antigravity, Cursor, Codex, Gemini CLI, multiple, or other. Offer basic or full integration for each. LOG DECISION: Use log_decision with category='ai_tools' to record tool choices and reasoning.",
      "2.3": "Ask where documentation should live: project_docs/ (standard), existing location, or custom path. LOG DECISION: Use log_decision with category='docs_location' if user chooses non-standard location with a reason.",
      "2.4": "Ask about environments (Dev/Test/Staging/Prod status), config management, and IaC tooling. Use infrastructure questions from project_questionnaire.md. LOG DECISIONS: Use log_decision with categories 'infrastructure', 'config_management', 'iac', and 'verification' to capture each major decision with reasoning and tradeoffs discussed.",
      "2.5": "Ask about optional features: browser automation, log access. Offer to skip or configure later. LOG DECISIONS: Use log_decision with categories 'browser_automation' and 'log_access' to record choices. After this step, call sync_decisions_to_file to persist all Phase 2 decisions.",
      "2.6": "OPTIONAL but recommended: Ask about FUTURE STATE. Explain the two tiers: PLANNED (soon - FluxFrame actively prepares with placeholders) vs ASPIRATIONAL (someday - documentation only). For each item: call log_future_item with tier='planned' or tier='aspirational'. Planned items create cycle entries in ROADMAP.md and pattern placeholders. Aspirational items go to 'Future Considerations' section. User can skip entirely.",
      "3.1": "Create directory structure: {docs_location}/{patterns,workflows,roadmap,bugs} and staging directory .fluxframe-pending/ for AI rules.",
      "3.2": "Generate context_master_guide.md, technical_status.md, ROADMAP.md, bootstrap_decisions.md (from sync), and workflow docs using templates. Replace all placeholders. Documentation goes to final location, NOT staging.",
      "3.3": "CRITICAL: Generate AI rules to STAGING directory (.fluxframe-pending/), NOT final locations. Create .fluxframe-pending/AGENTS.md and tool-specific rules. This prevents project rules from interfering with bootstrap. Bootstrap-resume rules remain at final locations until cleanup.",
      "3.4": "Create mcp-server.js in project root from template. Configure paths to match docs_location.",
      "3.5": "Update or create package.json with MCP dependency and 'mcp' script. Run npm install.",
      "4.1": "Check all expected files exist: documentation at final locations, AI rules in .fluxframe-pending/ staging. No placeholders remain, paths are consistent, markdown is valid. Verify bootstrap_decisions.md exists and has content.",
      "4.2": "Test: node mcp-server.js starts without errors. Show output to user.",
      "4.3": "Show user summary of generated files (note: AI rules are in staging, will be activated during finalization). Ask them to review key files including bootstrap_decisions.md. Confirm they approve. IMPORTANT: After user approves, finalization is MANDATORY and automatic - do NOT ask for additional confirmation before proceeding to Phase 5.",
      "5.1": "Verify all bootstrap artifacts exist before finalization: 1) .fluxframe-pending/ directory has AGENTS.md and any tool-specific rules, 2) mcp-server.js exists at project root, 3) docs directory exists with generated files. If anything is missing, report it. Otherwise, immediately proceed to step 5.2.",
      "5.2": "Call the finalize_bootstrap tool to atomically activate rules, remove templates, and update README. Then: 1) Call sync_decisions_to_file one final time, 2) Show the user what was done (from the tool response), 3) CRITICAL: Read the mcpSwapGuide from the tool response and follow its agentInstructions to walk the user step-by-step through swapping their MCP config. Show them the exact config file path and JSON content. Offer to write the config file for them if it's in the project directory. Give tool-specific restart instructions. Do NOT just print a generic message. 4) Stay with the user until they confirm the swap is complete or say they'll do it later. Bootstrap is now complete."
    };

    return instructions[stepId] || "Follow the step description and validation criteria.";
  }

  async completeStep(args) {
    const state = await this.loadState();
    const { stepId, collectedInfo, notes } = args;

    // Verify this is the current step
    if (state.currentStep !== stepId) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              error: "Cannot complete step - not current step",
              currentStep: state.currentStep,
              attemptedStep: stepId
            }, null, 2),
          },
        ],
      };
    }

    // Validate step can be completed
    const validation = await this.validateStepInternal(stepId, state, collectedInfo);
    if (!validation.canComplete) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              error: "Step validation failed",
              validation
            }, null, 2),
          },
        ],
      };
    }

    // Mark step complete
    state.completedSteps.push(stepId);

    // Merge collected info
    if (collectedInfo) {
      state.collectedInfo = { ...state.collectedInfo, ...collectedInfo };
    }

    // Add notes
    if (notes) {
      state.notes.push({
        stepId,
        timestamp: new Date().toISOString(),
        note: notes
      });
    }

    // Move to next step
    const nextStepInfo = this.getNextStepAfter(stepId);
    if (nextStepInfo) {
      state.currentStep = nextStepInfo.step.id;
      state.currentPhase = nextStepInfo.phase.id;
    } else {
      // Bootstrap complete!
      state.currentStep = "COMPLETE";
      state.currentPhase = "COMPLETE";
      state.completedAt = new Date().toISOString();
    }

    await this.saveState(state);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            success: true,
            completedStep: stepId,
            nextStep: nextStepInfo ? {
              id: nextStepInfo.step.id,
              name: nextStepInfo.step.name,
              phase: nextStepInfo.phase.name
            } : { id: "COMPLETE", name: "Bootstrap Complete!" },
            totalCompleted: state.completedSteps.length
          }, null, 2),
        },
      ],
    };
  }

  async validateStep(args) {
    const state = await this.loadState();
    const { stepId } = args;

    const validation = await this.validateStepInternal(stepId, state);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(validation, null, 2),
        },
      ],
    };
  }

  async validateStepInternal(stepId, state, additionalInfo = {}) {
    const stepInfo = this.findStep(stepId);
    if (!stepInfo) {
      return {
        canComplete: false,
        error: "Step not found"
      };
    }

    const { step } = stepInfo;
    const allInfo = { ...state.collectedInfo, ...additionalInfo };

    // Check required info is present
    const missingInfo = step.requiredInfo.filter(key => !allInfo[key]);

    return {
      canComplete: missingInfo.length === 0,
      stepId: step.id,
      stepName: step.name,
      requiredInfo: step.requiredInfo,
      collectedInfo: step.requiredInfo.filter(key => allInfo[key]),
      missingInfo,
      validation: step.validation
    };
  }

  async updateBootstrapInfo(args) {
    const state = await this.loadState();
    state.collectedInfo = { ...state.collectedInfo, ...args.info };
    await this.saveState(state);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            success: true,
            updatedInfo: args.info,
            allCollectedInfo: state.collectedInfo
          }, null, 2),
        },
      ],
    };
  }

  async getWorkflowOverview() {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            workflow: BOOTSTRAP_WORKFLOW,
            totalPhases: BOOTSTRAP_WORKFLOW.phases.length,
            totalSteps: BOOTSTRAP_WORKFLOW.phases.reduce((sum, p) => sum + p.steps.length, 0),
            description: "FluxFrame bootstrap process with state management and validation"
          }, null, 2),
        },
      ],
    };
  }

  async resetBootstrap(args) {
    if (!args.confirm) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              error: "Reset not confirmed. Set confirm: true to reset bootstrap state."
            }, null, 2),
          },
        ],
      };
    }

    const newState = { ...DEFAULT_STATE };
    await this.saveState(newState);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            success: true,
            message: "Bootstrap state reset to initial state",
            newState
          }, null, 2),
        },
      ],
    };
  }

  async logDecision(args) {
    const state = await this.loadState();
    const { category, decision, reasoning, alternatives, implications, stepId } = args;

    const decisionEntry = {
      id: `decision_${Date.now()}`,
      timestamp: new Date().toISOString(),
      stepId: stepId || state.currentStep,
      category,
      decision,
      reasoning,
      alternatives: alternatives || [],
      implications: implications || null
    };

    // Initialize decisions array if it doesn't exist (for backwards compatibility)
    if (!state.decisions) {
      state.decisions = [];
    }

    state.decisions.push(decisionEntry);
    await this.saveState(state);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            success: true,
            message: "Decision logged successfully",
            decision: decisionEntry,
            totalDecisions: state.decisions.length,
            hint: "Call sync_decisions_to_file to persist decisions to markdown"
          }, null, 2),
        },
      ],
    };
  }

  async getDecisions(args) {
    const state = await this.loadState();
    const { category } = args || {};

    // Initialize decisions array if it doesn't exist
    const decisions = state.decisions || [];

    let filteredDecisions = decisions;
    if (category) {
      filteredDecisions = decisions.filter(d => d.category === category);
    }

    // Group by category for easier reading
    const byCategory = {};
    for (const d of filteredDecisions) {
      if (!byCategory[d.category]) {
        byCategory[d.category] = [];
      }
      byCategory[d.category].push(d);
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            totalDecisions: filteredDecisions.length,
            filter: category || "none",
            byCategory,
            decisions: filteredDecisions
          }, null, 2),
        },
      ],
    };
  }

  async syncDecisionsToFile(args) {
    const state = await this.loadState();
    const { docsDir } = args || {};

    // Determine docs directory
    const targetDocsDir = docsDir || state.collectedInfo?.docs_location || 'project_docs';
    const decisionsFilePath = path.join(getProjectRoot(), targetDocsDir, DECISIONS_FILE_NAME);

    // Initialize decisions array if needed
    const decisions = state.decisions || [];

    if (decisions.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              success: false,
              message: "No decisions to sync",
              hint: "Use log_decision to record decisions first"
            }, null, 2),
          },
        ],
      };
    }

    // Generate markdown content
    const markdown = this.generateDecisionsMarkdown(state, decisions);

    // Ensure directory exists
    try {
      await fs.mkdir(path.dirname(decisionsFilePath), { recursive: true });
    } catch (err) {
      // Directory might already exist, that's fine
    }

    // Write file
    await fs.writeFile(decisionsFilePath, markdown, 'utf-8');

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            success: true,
            message: "Decisions synced to file",
            filePath: decisionsFilePath,
            decisionsCount: decisions.length,
            categories: [...new Set(decisions.map(d => d.category))]
          }, null, 2),
        },
      ],
    };
  }

  generateDecisionsMarkdown(state, decisions) {
    const projectName = state.collectedInfo?.project_name || 'Project';
    const now = new Date().toISOString().split('T')[0];
    const startDate = state.startedAt ? state.startedAt.split('T')[0] : now;

    // Group decisions by category
    const byCategory = {};
    for (const d of decisions) {
      if (!byCategory[d.category]) {
        byCategory[d.category] = [];
      }
      byCategory[d.category].push(d);
    }

    let md = `# ${projectName} - Bootstrap Decisions Log

**Bootstrap Started:** ${startDate}
**Last Updated:** ${now}
**Scenario:** ${state.scenario || 'Not yet determined'}

---

## Purpose

This document captures the reasoning behind key decisions made during the FluxFrame bootstrap process. It serves as a permanent record that persists beyond the bootstrap conversation, ensuring the AI assistant and user can reference *why* specific choices were made, not just *what* was chosen.

---

`;

    // Category display order and titles
    const categoryOrder = [
      { key: 'project_basics', title: 'Project Basics' },
      { key: 'ai_tools', title: 'AI Tools Selection' },
      { key: 'docs_location', title: 'Documentation Location' },
      { key: 'infrastructure', title: 'Infrastructure & Environments' },
      { key: 'config_management', title: 'Configuration Management' },
      { key: 'iac', title: 'Infrastructure as Code' },
      { key: 'verification', title: 'Verification Environment' },
      { key: 'browser_automation', title: 'Browser Automation' },
      { key: 'log_access', title: 'Log Access' },
      { key: 'api_contract', title: 'API Contract Approach' },
      { key: 'architecture', title: 'Architecture' },
      { key: 'scenario', title: 'Bootstrap Scenario' },
      { key: 'merge', title: 'Merge Decisions (Similar Workflow)' },
      { key: 'migration', title: 'Migration Decisions' },
      { key: 'custom', title: 'Custom Decisions' }
    ];

    for (const { key, title } of categoryOrder) {
      const categoryDecisions = byCategory[key];
      if (!categoryDecisions || categoryDecisions.length === 0) continue;

      md += `## ${title}\n\n`;

      for (const d of categoryDecisions) {
        md += `### ${d.decision}\n\n`;
        md += `**Step:** ${d.stepId} | **Logged:** ${d.timestamp.split('T')[0]}\n\n`;
        md += `**Reasoning:**\n${d.reasoning}\n\n`;

        if (d.alternatives && d.alternatives.length > 0) {
          md += `**Alternatives Considered:**\n`;
          for (const alt of d.alternatives) {
            md += `- ${alt}\n`;
          }
          md += '\n';
        }

        if (d.implications) {
          md += `**Implications:**\n${d.implications}\n\n`;
        }

        md += `---\n\n`;
      }
    }

    // Add any categories not in the predefined order
    const handledCategories = new Set(categoryOrder.map(c => c.key));
    for (const [category, categoryDecisions] of Object.entries(byCategory)) {
      if (handledCategories.has(category)) continue;

      md += `## ${category.charAt(0).toUpperCase() + category.slice(1).replace(/_/g, ' ')}\n\n`;

      for (const d of categoryDecisions) {
        md += `### ${d.decision}\n\n`;
        md += `**Step:** ${d.stepId} | **Logged:** ${d.timestamp.split('T')[0]}\n\n`;
        md += `**Reasoning:**\n${d.reasoning}\n\n`;

        if (d.alternatives && d.alternatives.length > 0) {
          md += `**Alternatives Considered:**\n`;
          for (const alt of d.alternatives) {
            md += `- ${alt}\n`;
          }
          md += '\n';
        }

        if (d.implications) {
          md += `**Implications:**\n${d.implications}\n\n`;
        }

        md += `---\n\n`;
      }
    }

    md += `## Summary

**Total Decisions Logged:** ${decisions.length}
**Categories:** ${[...new Set(decisions.map(d => d.category))].join(', ')}

---

*This document was generated during FluxFrame bootstrap and should be kept as a permanent project record.*
`;

    return md;
  }

  async logFutureItem(args) {
    const state = await this.loadState();
    const { tier, category, intention, timeframe, fluxframeImpact, placeholder } = args;

    // Validate tier
    if (!['planned', 'aspirational'].includes(tier)) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              success: false,
              error: "Invalid tier. Must be 'planned' or 'aspirational'",
              hint: "planned = soon, active FluxFrame prep; aspirational = someday, documentation only"
            }, null, 2),
          },
        ],
      };
    }

    const futureItem = {
      id: `future_${Date.now()}`,
      timestamp: new Date().toISOString(),
      stepId: state.currentStep,
      tier,
      category,
      intention,
      timeframe: timeframe || (tier === 'planned' ? 'soon' : 'someday'),
      fluxframeImpact: fluxframeImpact || null,
      placeholder: placeholder || null
    };

    // Initialize futureState if it doesn't exist (backwards compatibility)
    if (!state.futureState) {
      state.futureState = { planned: [], aspirational: [] };
    }

    // Add to appropriate tier
    state.futureState[tier].push(futureItem);
    await this.saveState(state);

    const tierDescription = tier === 'planned'
      ? 'FluxFrame will create placeholder patterns and cycle entries'
      : 'Documented in Future Considerations only (no placeholders)';

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            success: true,
            message: `Future ${tier} item logged`,
            item: futureItem,
            tierBehavior: tierDescription,
            totals: {
              planned: state.futureState.planned.length,
              aspirational: state.futureState.aspirational.length
            }
          }, null, 2),
        },
      ],
    };
  }

  async getFutureState(args) {
    const state = await this.loadState();
    const { tier } = args || {};

    // Initialize futureState if it doesn't exist
    if (!state.futureState) {
      state.futureState = { planned: [], aspirational: [] };
    }

    let result;
    if (tier === 'planned') {
      result = {
        tier: 'planned',
        description: 'Items marked for active FluxFrame preparation (placeholders, cycle entries)',
        items: state.futureState.planned
      };
    } else if (tier === 'aspirational') {
      result = {
        tier: 'aspirational',
        description: 'Items documented in Future Considerations only (no placeholders)',
        items: state.futureState.aspirational
      };
    } else {
      result = {
        tier: 'all',
        planned: {
          description: 'Active FluxFrame preparation',
          count: state.futureState.planned.length,
          items: state.futureState.planned
        },
        aspirational: {
          description: 'Documentation only',
          count: state.futureState.aspirational.length,
          items: state.futureState.aspirational
        }
      };
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  }

  async finalizeBootstrap(args) {
    const state = await this.loadState();
    const projectRoot = getProjectRoot();
    const projectName = args?.projectName || state.collectedInfo?.project_name || 'Project';
    const docsDir = args?.docsDir || state.collectedInfo?.docs_location || 'project_docs';
    const projectPurpose = args?.projectPurpose || state.collectedInfo?.project_purpose || '';
    const keepStateFile = args?.keepStateFile || false;

    const actions = [];
    const errors = [];

    // --- Step 1: Activate project rules from staging ---
    const stagingDir = path.join(projectRoot, '.fluxframe-pending');
    const ruleFiles = [
      { src: 'AGENTS.md', dest: 'AGENTS.md' },
      { src: 'CLAUDE.md', dest: 'CLAUDE.md' },
      { src: '.clinerules', dest: '.clinerules' },
      { src: '.roomodes', dest: '.roomodes' },
      { src: '.roo', dest: '.roo' },
      { src: '.claude', dest: '.claude' },
      { src: 'GEMINI.md', dest: 'GEMINI.md' },
      { src: '.cursorrules', dest: '.cursorrules' },
      { src: '.codex', dest: '.codex' },
    ];

    for (const { src, dest } of ruleFiles) {
      const srcPath = path.join(stagingDir, src);
      const destPath = path.join(projectRoot, dest);
      try {
        const stat = await fs.stat(srcPath);
        // Remove existing destination if it's a directory
        if (stat.isDirectory()) {
          try { await fs.rm(destPath, { recursive: true, force: true }); } catch {}
        }
        await fs.rename(srcPath, destPath);
        actions.push(`Activated: ${src} → ${dest}`);
      } catch (err) {
        if (err.code !== 'ENOENT') {
          errors.push(`Failed to activate ${src}: ${err.message}`);
        }
        // ENOENT = file doesn't exist in staging, skip silently
      }
    }

    // --- Step 2: Delete fluxframe/ directory ---
    const fluxframeDir = path.join(projectRoot, 'fluxframe');
    try {
      await fs.rm(fluxframeDir, { recursive: true, force: true });
      actions.push('Removed: fluxframe/ directory');
    } catch (err) {
      if (err.code !== 'ENOENT') {
        errors.push(`Failed to remove fluxframe/: ${err.message}`);
      }
    }

    // --- Step 3: Delete staging directory ---
    try {
      await fs.rm(stagingDir, { recursive: true, force: true });
      actions.push('Removed: .fluxframe-pending/ staging directory');
    } catch (err) {
      if (err.code !== 'ENOENT') {
        errors.push(`Failed to remove .fluxframe-pending/: ${err.message}`);
      }
    }

    // --- Step 4: Delete bootstrap state file (optional) ---
    if (!keepStateFile) {
      try {
        await fs.unlink(STATE_FILE);
        actions.push('Removed: .fluxframe-bootstrap-state.json');
      } catch (err) {
        if (err.code !== 'ENOENT') {
          errors.push(`Failed to remove state file: ${err.message}`);
        }
      }
    } else {
      actions.push('Kept: .fluxframe-bootstrap-state.json (as record)');
    }

    // --- Step 5: Remove BOOTSTRAP_INSTRUCTIONS.md if at root ---
    const bootstrapInstructions = path.join(projectRoot, 'BOOTSTRAP_INSTRUCTIONS.md');
    try {
      await fs.unlink(bootstrapInstructions);
      actions.push('Removed: BOOTSTRAP_INSTRUCTIONS.md');
    } catch (err) {
      if (err.code !== 'ENOENT') {
        errors.push(`Failed to remove BOOTSTRAP_INSTRUCTIONS.md: ${err.message}`);
      }
    }

    // --- Step 6: Remove RESTRUCTURE_PLAN.md if exists ---
    const restructurePlan = path.join(projectRoot, 'RESTRUCTURE_PLAN.md');
    try {
      await fs.unlink(restructurePlan);
      actions.push('Removed: RESTRUCTURE_PLAN.md');
    } catch (err) {
      // Silently skip if doesn't exist
    }

    // --- Step 7: Update README.md ---
    const readmePath = path.join(projectRoot, 'README.md');
    const readmeContent = `# ${projectName}

${projectPurpose}

## Quick Start

[Basic setup instructions]

## Development

This project uses the FluxFrame methodology for AI-assisted development.

### Documentation
- See \`${docsDir}/context_master_guide.md\` for development guidelines
- See \`${docsDir}/technical_status.md\` for current project state

### AI Assistance
- MCP Server: \`npm run mcp\`
- AI Rules: See \`AGENTS.md\` and tool-specific configurations

## License

[License information]
`;
    try {
      await fs.writeFile(readmePath, readmeContent, 'utf-8');
      actions.push('Updated: README.md with project-specific content');
    } catch (err) {
      errors.push(`Failed to update README.md: ${err.message}`);
    }

    // --- Step 8: Remove PHILOSOPHY.md ---
    try {
      await fs.unlink(path.join(projectRoot, 'PHILOSOPHY.md'));
      actions.push('Removed: PHILOSOPHY.md');
    } catch (err) {
      // Silently skip
    }

    const success = errors.length === 0;

    // --- Build tool-specific MCP swap guide ---
    const mcpServerPath = path.join(projectRoot, 'mcp-server.js');
    const aiTools = state.collectedInfo?.ai_tools || [];
    const activatedRuleFiles = actions
      .filter(a => a.startsWith('Activated:'))
      .map(a => a.replace('Activated: ', '').split(' → ')[1]);

    // Map of AI tool identifiers to their MCP config details
    const toolConfigMap = {
      'claude_code': {
        name: 'Claude Code',
        configFile: '.mcp.json',
        configLocation: 'project root',
        restartInstructions: 'Close and reopen your terminal / Claude Code session completely.',
      },
      'cline': {
        name: 'Cline',
        configFile: '.vscode/cline_mcp_settings.json',
        configLocation: '.vscode/ directory',
        restartInstructions: 'Restart VS Code completely (close all windows and reopen).',
      },
      'roo_code': {
        name: 'Roo Code',
        configFile: '.roo/mcp.json',
        configLocation: '.roo/ directory',
        restartInstructions: 'Restart VS Code completely (close all windows and reopen).',
      },
      'cursor': {
        name: 'Cursor',
        configFile: '.cursor/mcp.json',
        configLocation: '.cursor/ directory',
        restartInstructions: 'Restart Cursor completely (close all windows and reopen).',
      },
      'kilo_code': {
        name: 'Kilo Code',
        configFile: '.kilocode/mcp.json',
        configLocation: '.kilocode/ directory',
        restartInstructions: 'Restart VS Code completely (close all windows and reopen).',
      },
      'antigravity': {
        name: 'Antigravity (Gemini)',
        configFile: 'mcp.json',
        configLocation: 'project root',
        restartInstructions: 'Restart Antigravity completely.',
      },
      'codex': {
        name: 'Codex',
        configFile: '.codex/mcp.json',
        configLocation: '.codex/ directory',
        restartInstructions: 'Restart Codex completely.',
      },
    };

    // Detect which tools were used based on activated rules or collected info
    const detectedTools = [];
    if (activatedRuleFiles.includes('CLAUDE.md') || activatedRuleFiles.includes('.claude')) detectedTools.push('claude_code');
    if (activatedRuleFiles.includes('.clinerules')) detectedTools.push('cline');
    if (activatedRuleFiles.includes('.roomodes') || activatedRuleFiles.includes('.roo')) detectedTools.push('roo_code');
    if (activatedRuleFiles.includes('.cursorrules')) detectedTools.push('cursor');
    if (activatedRuleFiles.includes('GEMINI.md')) detectedTools.push('antigravity');
    if (activatedRuleFiles.includes('.codex')) detectedTools.push('codex');

    // Fall back to collected info if detection found nothing
    const toolsToGuide = detectedTools.length > 0 ? detectedTools :
      (Array.isArray(aiTools) ? aiTools.map(t => t.toLowerCase().replace(/[\s-]+/g, '_')) : []);

    const newMcpConfig = JSON.stringify({
      mcpServers: {
        [`${projectName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-project`]: {
          command: "node",
          args: [mcpServerPath],
          cwd: projectRoot
        }
      }
    }, null, 2);

    const mcpSwapGuide = {
      projectMcpServerPath: mcpServerPath,
      projectRoot,
      newMcpConfigJson: newMcpConfig,
      detectedTools: toolsToGuide.map(toolId => {
        const config = toolConfigMap[toolId];
        if (!config) return { toolId, name: toolId, instructions: 'Update your MCP configuration to point to the project mcp-server.js.' };
        return {
          toolId,
          name: config.name,
          configFile: config.configFile,
          configFilePath: path.join(projectRoot, config.configFile),
          configLocation: config.configLocation,
          restartInstructions: config.restartInstructions,
        };
      }),
      agentInstructions: [
        "IMPORTANT: You MUST walk the user through the MCP config swap step by step. Do NOT just print a summary and move on.",
        "1. Tell the user: 'I now need to help you switch from the bootstrap MCP server to your project's own MCP server. This is the last step.'",
        "2. For EACH detected AI tool, show them: (a) the exact config file path to edit, (b) the exact JSON content to paste (provided in newMcpConfigJson), (c) that they should REPLACE the 'fluxframe-bootstrap' entry with this new config (not add alongside it).",
        "3. If the config file is inside the project directory (e.g., .mcp.json, .vscode/, .roo/, .cursor/), OFFER to write the file for them. Say: 'I can update this file for you, or you can do it manually. Which do you prefer?'",
        "4. After the config is updated, give them the specific restart instruction for their tool.",
        "5. Tell them what to expect after restart: 'After restarting, your project MCP tools will be available (cycle planning, status updates, etc.) and your AI rules will guide development.'",
        `6. Remind them: 'Your first step after restart is to define Cycle 1.1 in ${docsDir}/ROADMAP.md.'`,
        "7. If they have questions or something goes wrong, help them troubleshoot. Do NOT end the conversation until they confirm the swap is done or explicitly say they'll do it later."
      ]
    };

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            success,
            message: success
              ? "Bootstrap finalized successfully. All template files removed and project rules activated."
              : "Bootstrap finalized with some errors. Review the errors below.",
            actions,
            errors: errors.length > 0 ? errors : undefined,
            mcpSwapGuide,
            nextSteps: [
              "CRITICAL: Use the mcpSwapGuide above to walk the user through swapping their MCP config. Do NOT just print a generic message — follow the agentInstructions step by step.",
              `After MCP swap and restart, define Cycle 1.1 in ${docsDir}/ROADMAP.md to begin development.`
            ]
          }, null, 2),
        },
      ],
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("FluxFrame Bootstrap MCP Server running on stdio");
  }
}

const server = new BootstrapServer();
server.run().catch(console.error);
