#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
source .env

DAILY_BUDGET_LIMIT=${DAILY_BUDGET_LIMIT:-5.00}
WEEKLY_BUDGET_LIMIT=${WEEKLY_BUDGET_LIMIT:-15.00}
TODAY=$(date +%Y-%m-%d)
WEEK_AGO=$(date -d "7 days ago" +%Y-%m-%d)

touch memory/usage.log

# --- ACCOUNT 1 LIMITS ---
ACCOUNT1_DAILY=$(awk -v day="$TODAY" -v acc="ACCOUNT-1" -F'\t' '$1 == day && $5 == acc {sum+=$2} END {print sum+0}' memory/usage.log)
ACCOUNT1_WEEKLY=$(awk -v week="$WEEK_AGO" -v acc="ACCOUNT-1" -F'\t' '$1 >= week && $5 == acc {sum+=$2} END {print sum+0}' memory/usage.log)

if (( $(echo "$ACCOUNT1_DAILY >= $DAILY_BUDGET_LIMIT" | bc -l) )); then
    echo "BUDGET BREACHED: Account 1 Daily limit exceeded. Spend: $ACCOUNT1_DAILY" >&2
    exit 1
fi

if (( $(echo "$ACCOUNT1_WEEKLY >= $WEEKLY_BUDGET_LIMIT" | bc -l) )); then
    echo "BUDGET BREACHED: Account 1 Weekly limit exceeded. Spend: $ACCOUNT1_WEEKLY" >&2
    exit 1
fi

# --- ACCOUNT 2 LIMITS ---
ACCOUNT2_DAILY=$(awk -v day="$TODAY" -v acc="ACCOUNT-2" -F'\t' '$1 == day && $5 == acc {sum+=$2} END {print sum+0}' memory/usage.log)
ACCOUNT2_WEEKLY=$(awk -v week="$WEEK_AGO" -v acc="ACCOUNT-2" -F'\t' '$1 >= week && $5 == acc {sum+=$2} END {print sum+0}' memory/usage.log)

if (( $(echo "$ACCOUNT2_DAILY >= $DAILY_BUDGET_LIMIT" | bc -l) )); then
    echo "BUDGET BREACHED: Account 2 Daily limit exceeded. Spend: $ACCOUNT2_DAILY" >&2
    exit 1
fi

if (( $(echo "$ACCOUNT2_WEEKLY >= $WEEKLY_BUDGET_LIMIT" | bc -l) )); then
    echo "BUDGET BREACHED: Account 2 Weekly limit exceeded. Spend: $ACCOUNT2_WEEKLY" >&2
    exit 1
fi

# --- STATUS CHECK (Account 2 only; Account 1 is Desktop-only, no terminal login) ---
CLAUDE_CONFIG_DIR="$ACCOUNT2_DIR" claude auth status >/dev/null 2>&1 \
    || { echo "Account 2 not logged in (terminal). Run: CLAUDE_CONFIG_DIR=$ACCOUNT2_DIR claude auth login" >&2; exit 1; }