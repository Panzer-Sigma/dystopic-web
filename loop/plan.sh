#!/usr/bin/env bash
# PLAN half (terminal, Account 2 + free triage).
# Runs budget + triage, then assembles the Conductor's input for Claude Desktop.
# It does NOT call Fable — Account 1 has no terminal login. You run the Conductor
# manually in Claude Desktop (Account 1) and save its JSON to loop/work-order.json.
set -euo pipefail
cd "$(dirname "$0")"
source .env

# 1. Budget guard (Account 2 spend only; Fable/Desktop usage is governed by its own cap)
./scripts/cost-check.sh

# 2. Triage — free Gemini via the llm CLI, no Claude account involved
GIT_CONTEXT=$(git log -n 5 --oneline)
OPEN_ISSUES=$(gh issue list --limit 10 2>/dev/null || echo "No issues found.")
TRIAGE_OUT=$(printf 'COMMITS:\n%s\n\nISSUES:\n%s\n' "$GIT_CONTEXT" "$OPEN_ISSUES" \
  | llm -m "$TRIAGE_MODEL" -s "$(cat triage.md)" -o max_tokens 500)
./scripts/log-cost.sh "triage" "0.00" "FREE-API"
echo "$TRIAGE_OUT" > triage-out.txt

if [[ "$TRIAGE_OUT" == *"status: quiet"* ]]; then
    echo "Triage: quiet. Nothing actionable — stopping."
    rm -f conductor-input.md
    exit 0
fi

# 3. Assemble the Conductor input for Claude Desktop (Account 1 / Fable)
TRUST_MATRIX=$(./scripts/trust-log.sh --render)
{
    cat conductor.md
    printf '\n\nSTATE:\n';    cat memory/STATE.md
    printf '\n\nTRUST:\n%s\n' "$TRUST_MATRIX"
    printf '\nCONTRACT:\n';   cat contract.md
    printf '\n\nTRIAGE:\n%s\n' "$TRIAGE_OUT"
} > conductor-input.md

echo
echo "=== Conductor input ready: loop/conductor-input.md ==="
echo "Next (Claude Desktop, Account 1, Fable, Code section, effort high — never xhigh):"
echo "  Open this project, then instruct Fable:"
echo "    \"Read loop/conductor-input.md and write ONLY the JSON decision to loop/work-order.json\""
echo "Then back in the terminal: make exec"
