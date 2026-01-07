# FluxFrame AI Rules Symlink Setup (Windows)
# Creates symlinks from tool-specific files to AGENTS.md
# Run this for basic compatibility with tools you're not fully integrating
#
# Usage: .\setup-symlinks.ps1
# Options:
#   -Force     Remove existing files/symlinks before creating
#   -DryRun    Show what would be done without making changes
#
# Note: Requires admin privileges or Developer Mode enabled for symlinks

param(
    [switch]$Force,
    [switch]$DryRun
)

$ErrorActionPreference = "Stop"

Write-Host "FluxFrame AI Rules Symlink Setup" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Navigate to project root
$projectRoot = $null
try {
    $projectRoot = git rev-parse --show-toplevel 2>$null
} catch {}

if ($projectRoot) {
    Set-Location $projectRoot
} else {
    Write-Host "Warning: Not in a git repository. Using current directory." -ForegroundColor Yellow
}

Write-Host "Working directory: $(Get-Location)"
Write-Host ""

# Check for AGENTS.md
if (-not (Test-Path "AGENTS.md")) {
    Write-Host "Error: AGENTS.md not found in project root" -ForegroundColor Red
    Write-Host ""
    Write-Host "AGENTS.md is the source of truth for AI tool configuration."
    Write-Host "Run FluxFrame bootstrap first, or create AGENTS.md manually."
    Write-Host ""
    Write-Host "You can copy the template:"
    Write-Host "  Copy-Item path\to\fluxframe\ai-rules\core\template.agents.md .\AGENTS.md"
    exit 1
}

Write-Host "Found AGENTS.md " -NoNewline
Write-Host "✓" -ForegroundColor Green
Write-Host ""

# Function to create symlink
function Create-SafeSymlink {
    param(
        [string]$LinkName,
        [string]$CheckDir = ""
    )
    
    # Skip if full integration directory exists
    if ($CheckDir -and (Test-Path $CheckDir -PathType Container)) {
        Write-Host "  ⏭ $LinkName - skipped ($CheckDir/ exists = full integration)" -ForegroundColor Yellow
        return
    }
    
    # Check if exists
    if (Test-Path $LinkName) {
        $item = Get-Item $LinkName -Force
        
        # Check if it's a symlink
        if ($item.Attributes -match "ReparsePoint") {
            $target = (Get-Item $LinkName).Target
            if ($target -eq "AGENTS.md") {
                Write-Host "  ✓ $LinkName → AGENTS.md (already exists)" -ForegroundColor Green
                return
            }
        }
        
        # Exists but not correct symlink
        if ($Force) {
            if ($DryRun) {
                Write-Host "  Would remove: $LinkName" -ForegroundColor Yellow
            } else {
                Remove-Item -Force -Recurse $LinkName
            }
        } else {
            Write-Host "  ⚠ $LinkName exists (not a symlink to AGENTS.md)" -ForegroundColor Yellow
            Write-Host "    Use -Force to replace, or remove manually" -ForegroundColor Gray
            return
        }
    }
    
    # Create symlink
    if ($DryRun) {
        Write-Host "  Would create: $LinkName → AGENTS.md" -ForegroundColor Yellow
    } else {
        try {
            New-Item -ItemType SymbolicLink -Path $LinkName -Target "AGENTS.md" | Out-Null
            Write-Host "  ✓ $LinkName → AGENTS.md (created)" -ForegroundColor Green
        } catch {
            Write-Host "  ✗ Failed to create $LinkName" -ForegroundColor Red
            Write-Host "    Error: $_" -ForegroundColor Red
            Write-Host "    Try running as Administrator or enable Developer Mode" -ForegroundColor Yellow
        }
    }
}

Write-Host "Creating symlinks..."
Write-Host ""

# Claude Code
Create-SafeSymlink -LinkName "CLAUDE.md" -CheckDir ".claude"

# Antigravity / Gemini
Create-SafeSymlink -LinkName "GEMINI.md" -CheckDir ""

# Cline
Create-SafeSymlink -LinkName ".clinerules" -CheckDir ".clinerules"

# Roo Code
Create-SafeSymlink -LinkName ".roorules" -CheckDir ".roo"

# Cursor
Create-SafeSymlink -LinkName ".cursorrules" -CheckDir ""

Write-Host ""

if ($DryRun) {
    Write-Host "Dry run complete. No changes made." -ForegroundColor Yellow
} else {
    Write-Host "Done!" -ForegroundColor Green
}

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Add symlinked files to .gitignore (keep only AGENTS.md in version control):"
Write-Host ""
Write-Host "   # AI tool symlinks (AGENTS.md is source of truth)" -ForegroundColor Gray
Write-Host "   CLAUDE.md" -ForegroundColor Gray
Write-Host "   GEMINI.md" -ForegroundColor Gray
Write-Host "   .clinerules" -ForegroundColor Gray
Write-Host "   .roorules" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Commit AGENTS.md to version control:"
Write-Host "   git add AGENTS.md"
Write-Host "   git commit -m `"Add AGENTS.md universal AI configuration`""
Write-Host ""
Write-Host "3. For full integration with specific tools, see:"
Write-Host "   - Claude Code: ai-rules/claude-code/SETUP.md"
Write-Host "   - Roo Code:    ai-rules/roo-code/SETUP.md"
Write-Host "   - Cline:       ai-rules/cline/SETUP.md"
Write-Host "   - Antigravity: ai-rules/antigravity/SETUP.md"
Write-Host "=========================================" -ForegroundColor Cyan

# Check for symlink permission issues
Write-Host ""
Write-Host "Note: If symlink creation failed, try one of these:" -ForegroundColor Yellow
Write-Host "  1. Run PowerShell as Administrator" -ForegroundColor Gray
Write-Host "  2. Enable Developer Mode in Windows Settings" -ForegroundColor Gray
Write-Host "  3. Use 'mklink' command from CMD as Administrator" -ForegroundColor Gray
