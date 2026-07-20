#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

GOALS_DIR="goals"
LEDGER="memory/goal-ledger.tsv"
VIOLATIONS=0

if [ ! -d "$GOALS_DIR" ] || [ -z "$(ls -A "$GOALS_DIR")" ]; then exit 0; fi

for goal_file in "$GOALS_DIR"/*; do
    [ -f "$goal_file" ] || continue
    PREDICATE=$(grep "^predicate:" "$goal_file" | cut -d' ' -f2-)
    
    set +e
    timeout 60 bash -c "$PREDICATE"
    EXIT_CODE=$?
    set -e
    
    TIMESTAMP=$(date -Is)
    if [ $EXIT_CODE -eq 0 ]; then
        sed -i "s/^status:.*/status: satisfied/" "$goal_file"
        sed -i "s/^last-pass:.*/last-pass: $(date +%Y-%m-%d)/" "$goal_file"
        echo -e "$TIMESTAMP\t$(basename "$goal_file")\tsatisfied" >> "$LEDGER"
    else
        sed -i "s/^status:.*/status: VIOLATED/" "$goal_file"
        echo -e "$TIMESTAMP\t$(basename "$goal_file")\tVIOLATED" >> "$LEDGER"
        VIOLATIONS=$((VIOLATIONS + 1))
    fi
done

if [ $VIOLATIONS -gt 0 ]; then exit 1; fi