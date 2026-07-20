#!/usr/bin/env bash
set -euo pipefail

DB_FILE="$(dirname "$0")/../memory/trust.tsv"
touch "$DB_FILE"

if [ "${1:-}" = "--render" ]; then
    while IFS=$'\t' read -r skill runs passes || [ -n "$skill" ]; do
        [ -z "$skill" ] && continue
        rate=$(echo "scale=2; ($passes/$runs)*100" | bc)
        tier="watch"
        if (( runs >= 20 )) && (( $(echo "$rate >= 95.0" | bc -l) )); then tier="auto";
        elif (( $(echo "$rate >= 90.0" | bc -l) )); then tier="queue"; fi
        echo -e "$skill\t$runs\t$passes\t${rate}%\t$tier"
    done < "$DB_FILE"
    exit 0
fi

SKILL="$1"
STATUS="$2"
tmp_file=$(mktemp)
updated=0

while IFS=$'\t' read -r s r p || [ -n "$s" ]; do
    [ -z "$s" ] && continue
    if [ "$s" = "$SKILL" ]; then
        r=$((r + 1))
        [ "$STATUS" = "PASS" ] && p=$((p + 1))
        updated=1
    fi
    echo -e "$s\t$r\t$p" >> "$tmp_file"
done < "$DB_FILE"

if [ $updated -eq 0 ]; then
    p_val=0; [ "$STATUS" = "PASS" ] && p_val=1
    echo -e "$SKILL\t1\t$p_val" >> "$tmp_file"
fi
mv "$tmp_file" "$DB_FILE"