#!/bin/bash
# FluxFrame AI Rules Symlink Setup
# Creates symlinks from tool-specific files to AGENTS.md
# Run this for basic compatibility with tools you're not fully integrating
#
# Usage: ./setup-symlinks.sh
# Options:
#   --force    Remove existing files/symlinks before creating
#   --dry-run  Show what would be done without making changes

set -e

# Parse arguments
FORCE=false
DRY_RUN=false
for arg in "$@"; do
    case $arg in
        --force)
            FORCE=true
            shift
            ;;
        --dry-run)
            DRY_RUN=true
            shift
            ;;
    esac
done

# Navigate to project root (git root or current dir)
if git rev-parse --show-toplevel > /dev/null 2>&1; then
    cd "$(git rev-parse --show-toplevel)"
else
    echo "Warning: Not in a git repository. Using current directory."
fi

echo "FluxFrame AI Rules Symlink Setup"
echo "================================="
echo ""
echo "Working directory: $(pwd)"
echo ""

# Check for AGENTS.md
if [ ! -f "AGENTS.md" ]; then
    echo "Error: AGENTS.md not found in project root"
    echo ""
    echo "AGENTS.md is the source of truth for AI tool configuration."
    echo "Run FluxFrame bootstrap first, or create AGENTS.md manually."
    echo ""
    echo "You can copy the template:"
    echo "  cp path/to/fluxframe/ai-rules/core/template.agents.md ./AGENTS.md"
    exit 1
fi

echo "Found AGENTS.md ✓"
echo ""

# Function to create symlink
create_symlink() {
    local link_name=$1
    local check_dir=$2  # Optional: skip if this directory exists (full integration)
    
    # Skip if full integration directory exists
    if [ -n "$check_dir" ] && [ -d "$check_dir" ]; then
        echo "  ⏭ $link_name - skipped ($check_dir/ exists = full integration)"
        return
    fi
    
    # Handle existing file/link
    if [ -e "$link_name" ] || [ -L "$link_name" ]; then
        if [ -L "$link_name" ]; then
            # It's already a symlink
            local current_target=$(readlink "$link_name")
            if [ "$current_target" = "AGENTS.md" ]; then
                echo "  ✓ $link_name → AGENTS.md (already exists)"
                return
            fi
        fi
        
        # Exists but not correct symlink
        if [ "$FORCE" = true ]; then
            if [ "$DRY_RUN" = true ]; then
                echo "  Would remove: $link_name"
            else
                rm -rf "$link_name"
            fi
        else
            echo "  ⚠ $link_name exists (not a symlink to AGENTS.md)"
            echo "    Use --force to replace, or remove manually"
            return
        fi
    fi
    
    # Create symlink
    if [ "$DRY_RUN" = true ]; then
        echo "  Would create: $link_name → AGENTS.md"
    else
        ln -s "AGENTS.md" "$link_name"
        echo "  ✓ $link_name → AGENTS.md (created)"
    fi
}

echo "Creating symlinks..."
echo ""

# Claude Code
create_symlink "CLAUDE.md" ".claude"

# Antigravity / Gemini
create_symlink "GEMINI.md" ""

# Cline
create_symlink ".clinerules" ".clinerules"

# Roo Code
create_symlink ".roorules" ".roo"

# Cursor
create_symlink ".cursorrules" ""

echo ""

if [ "$DRY_RUN" = true ]; then
    echo "Dry run complete. No changes made."
else
    echo "Done!"
fi

echo ""
echo "========================================="
echo "Next steps:"
echo ""
echo "1. Add symlinked files to .gitignore (keep only AGENTS.md in version control):"
echo ""
echo "   # AI tool symlinks (AGENTS.md is source of truth)"
echo "   CLAUDE.md"
echo "   GEMINI.md"
echo "   .clinerules"
echo "   .roorules"
echo ""
echo "2. Commit AGENTS.md to version control:"
echo "   git add AGENTS.md"
echo "   git commit -m \"Add AGENTS.md universal AI configuration\""
echo ""
echo "3. For full integration with specific tools, see:"
echo "   - Claude Code: ai-rules/claude-code/SETUP.md"
echo "   - Roo Code:    ai-rules/roo-code/SETUP.md"
echo "   - Cline:       ai-rules/cline/SETUP.md"
echo "   - Antigravity: ai-rules/antigravity/SETUP.md"
echo "========================================="
