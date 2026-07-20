#!/usr/bin/env bash
set -euo pipefail

PHASE=$1
COST=$2
ACCOUNT=${3:-"UNKNOWN"}
DATE=$(date +"%Y-%m-%d")
TIME=$(date +"%H:%M:%S")

LOG_FILE="$(dirname "$0")/../memory/usage.log"
touch "$LOG_FILE"

printf "%s\t%s\t%s\t%s\t%s\n" "$DATE" "$COST" "$TIME" "$PHASE" "$ACCOUNT" >> "$LOG_FILE"