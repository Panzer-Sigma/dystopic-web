#!/usr/bin/env bash
# EXECUTE half (terminal, Account 2). Consumes loop/work-order.json produced by
# the Conductor (Fable, run manually in Claude Desktop). Runs the Worker (Sonnet)
# in an isolated worktree, the Verifier (Opus), then the build+lint gate.
# On PASS the branch is KEPT so you can review its Vercel preview and merge.
set -euo pipefail
cd "$(dirname "$0")"
source .env

[ -f work-order.json ] || { echo "No loop/work-order.json. Run 'make plan', then produce it with Fable in Claude Desktop."; exit 1; }

./scripts/cost-check.sh

ACTION=$(jq -r '.action' work-order.json)
SKILL=$(jq -r '.skill' work-order.json)
SPEC=$(jq -r '.spec' work-order.json)

if [ "$ACTION" = "stop" ] || [ "$ACTION" = "queue" ]; then
    echo "Conductor action = $ACTION. Nothing to execute (queued items are for your manual review)."
    exit 0
fi
if [ "$ACTION" != "execute" ]; then
    echo "Unexpected action '$ACTION' in work-order.json. Expected execute|queue|stop."; exit 1
fi

# --- Worker Phase (Sonnet @ medium effort on Account 2, edits files in the worktree) ---
BRANCH_NAME="fable-exec-$SKILL-$(date +%s)"
BASE_SHA=$(git rev-parse HEAD)
git worktree add "../wt-$SKILL" -b "$BRANCH_NAME"

# Fresh worktree has no node_modules (gitignored). Symlink the main checkout's deps.
REPO_ROOT="$(cd .. && pwd)"
ln -sfn "$REPO_ROOT/dystopic-front/node_modules" "../wt-$SKILL/dystopic-front/node_modules"

WORKER_PROMPT="$(cat workers/implement.md)
WORK_ORDER: $(cat work-order.json)"

cd "../wt-$SKILL"
WORKER_RESPONSE=$(CLAUDE_CONFIG_DIR="$WORKER_ACCOUNT" claude -p "$WORKER_PROMPT" --model "$WORKER_MODEL" --effort "$WORKER_EFFORT" --allowedTools "Edit Write Read")
../loop/scripts/log-cost.sh "worker" "0.10" "ACCOUNT-2"
echo "$WORKER_RESPONSE" > IMPLEMENTATION.md
git add -A && git commit -m "worker: $SKILL" || true

# --- Verifier Phase (Opus @ medium effort on Account 2) ---
cd "../loop"
git -C "../wt-$SKILL" diff "$BASE_SHA" HEAD > current-work.diff
VERIFIER_OUT=$(CLAUDE_CONFIG_DIR="$VERIFIER_ACCOUNT" claude -p "$(cat workers/verify.md)
SPEC: $SPEC
DIFF: $(cat current-work.diff)" --model "$VERIFIER_MODEL" --effort "$VERIFIER_EFFORT" --allowedTools "" --output-format json)
./scripts/log-cost.sh "verifier" "0.40" "ACCOUNT-2"

# --- Gate (build + lint) ---
cd "../wt-$SKILL"
set +e
../loop/guardrails/verify.sh
SCRIPT_VOTE=$?
set -e

# Remove the worktree checkout; the branch (and its commits) survive.
cd "../loop"
git worktree remove "../wt-$SKILL" --force

# --- Final vote ---
if [[ "$VERIFIER_OUT" == *"PASS"* ]] && [ $SCRIPT_VOTE -eq 0 ]; then
    ./scripts/trust-log.sh "$SKILL" "PASS"
    echo "PASS ($SKILL). Branch kept for review: $BRANCH_NAME"
    echo "Review it: git log $BRANCH_NAME ; push it for a Vercel preview; merge when happy."
else
    ./scripts/trust-log.sh "$SKILL" "FAIL"
    echo "FAIL ($SKILL). Verifier: $VERIFIER_OUT | gate exit: $SCRIPT_VOTE"
    git branch -D "$BRANCH_NAME" 2>/dev/null || true
    exit 1
fi
