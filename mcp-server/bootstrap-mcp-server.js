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

// Bootstrap state file location
const STATE_FILE = path.join(process.cwd(), '.fluxframe-bootstrap-state.json');

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
      name: "Cleanup",
      description: "Remove FluxFrame template files",
      steps: [
        {
          id: "5.1",
          name: "Present Cleanup Plan",
          description: "Show what will be removed/kept",
          validation: "User approves cleanup",
          requiredInfo: []
        },
        {
          id: "5.2",
          name: "Execute Cleanup",
          description: "Remove template files and directories",
          validation: "Template files removed",
          requiredInfo: []
        },
        {
          id: "5.3",
          name: "Update README",
          description: "Create project-specific README",
          validation: "README updated",
          requiredInfo: []
        }
      ]
    },
    {
      id: "phase_6",
      name: "Handoff",
      description: "Complete bootstrap and hand off to user",
      steps: [
        {
          id: "6.1",
          name: "Present Summary",
          description: "Show what was created and next steps",
          validation: "Summary presented",
          requiredInfo: []
        },
        {
          id: "6.2",
          name: "Configure Project MCP",
          description: "Help user add project MCP server to their AI assistant",
          validation: "User has project MCP configured",
          requiredInfo: []
        },
        {
          id: "6.3",
          name: "Complete Bootstrap",
          description: "Mark bootstrap as complete",
          validation: "Bootstrap complete",
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
  decisions: []  // Structured decisions with reasoning
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
      "1.1": "Scan the project root for: AI rules (.clinerules, AGENTS.md, etc.), documentation (docs/, project_docs/), patterns, and configuration files. Create an inventory.",
      "1.2": "Based on scan: GREENFIELD (no AI rules/docs), SIMILAR_WORKFLOW (has AI rules similar to FluxFrame), or MIGRATION (has documentation to adapt). Store scenario. LOG DECISION: Use log_decision with category='scenario' to record why this classification was chosen.",
      "1.3": "Present findings to user with classification reasoning. Get confirmation to proceed with detected scenario.",
      "2.1": "Ask user for: project name, one-line purpose, and technology stack. If package.json exists, extract what you can. LOG DECISION: Use log_decision with category='project_basics' to record the project identity and any context about why these choices were made.",
      "2.2": "Ask which AI tools they'll use: Claude Code, Roo Code, Cline, Antigravity, multiple, or other. Offer basic or full integration for each. LOG DECISION: Use log_decision with category='ai_tools' to record tool choices and reasoning (e.g., 'Team already uses VS Code so Cline is natural fit').",
      "2.3": "Ask where documentation should live: project_docs/ (standard), existing location, or custom path. LOG DECISION: Use log_decision with category='docs_location' if user chooses non-standard location with a reason.",
      "2.4": "Ask about environments (Dev/Test/Staging/Prod status), config management, and IaC tooling. Use infrastructure questions from project_questionnaire.md. LOG DECISIONS: Use log_decision with categories 'infrastructure', 'config_management', 'iac', and 'verification' to capture each major decision with reasoning and tradeoffs discussed.",
      "2.5": "Ask about optional features: browser automation, log access. Offer to skip or configure later. LOG DECISIONS: Use log_decision with categories 'browser_automation' and 'log_access' to record choices. After this step, call sync_decisions_to_file to persist all Phase 2 decisions.",
      "3.1": "Create directory structure: {docs_location}/{patterns,workflows,implementation_plans,bug_fixes} and staging directory .fluxframe-pending/ for AI rules.",
      "3.2": "Generate context_master_guide.md, technical_status.md, implementation_plan.md, bootstrap_decisions.md (from sync), and workflow docs using templates. Replace all placeholders. Documentation goes to final location, NOT staging.",
      "3.3": "CRITICAL: Generate AI rules to STAGING directory (.fluxframe-pending/), NOT final locations. Create .fluxframe-pending/AGENTS.md and tool-specific rules. This prevents project rules from interfering with bootstrap. Bootstrap-resume rules remain at final locations until cleanup.",
      "3.4": "Create mcp-server.js in project root from template. Configure paths to match docs_location.",
      "3.5": "Update or create package.json with MCP dependency and 'mcp' script. Run npm install.",
      "4.1": "Check all expected files exist: documentation at final locations, AI rules in .fluxframe-pending/ staging. No placeholders remain, paths are consistent, markdown is valid. Verify bootstrap_decisions.md exists and has content.",
      "4.2": "Test: node mcp-server.js starts without errors. Show output to user.",
      "4.3": "Show user summary of generated files (note: AI rules are in staging, will be activated during cleanup). Ask them to review key files including bootstrap_decisions.md. Confirm they approve before cleanup.",
      "5.1": "Present cleanup plan: 1) ACTIVATE project rules by moving from .fluxframe-pending/ to final locations (overwrites bootstrap-resume rules), 2) Remove fluxframe/ directory and staging. Get approval.",
      "5.2": "Execute cleanup in order: FIRST move rules from staging (mv .fluxframe-pending/AGENTS.md ./AGENTS.md, etc.), THEN remove fluxframe/ directory and .fluxframe-pending/. Optionally keep .fluxframe-bootstrap-state.json as a record.",
      "5.3": "Replace README.md with project-specific content. Include FluxFrame methodology mention and links to docs.",
      "6.1": "Show complete summary: what was created, what was preserved, backup location, configuration details. Verify AI rules are now at final locations (not 'Bootstrap In Progress'). Mention that bootstrap_decisions.md contains the reasoning behind all configuration choices.",
      "6.2": "CRITICAL: Guide user to add their project's mcp-server.js to their AI assistant's MCP settings (replacing bootstrap MCP). Provide tool-specific instructions.",
      "6.3": "Congratulate user! Bootstrap complete. Call sync_decisions_to_file one final time to ensure all decisions are persisted. Guide them to define Cycle 1.1 in implementation_plan.md as next step."
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
    const decisionsFilePath = path.join(process.cwd(), targetDocsDir, DECISIONS_FILE_NAME);

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

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("FluxFrame Bootstrap MCP Server running on stdio");
  }
}

const server = new BootstrapServer();
server.run().catch(console.error);
