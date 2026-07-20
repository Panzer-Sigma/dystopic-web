#!/usr/bin/env bash
# DEPRECATED for this project. The old single-shot loop called Fable (Account 1)
# headlessly with `claude -p`, but Account 1 has no terminal login here — it is used
# only in Claude Desktop. The workflow is now split:
#
#   1. make plan   # terminal: budget + triage -> loop/conductor-input.md
#   2. (Claude Desktop, Account 1/Fable): read conductor-input.md, write work-order.json
#   3. make exec   # terminal: worker (Sonnet) + verifier (Opus) + gate
#
echo "loop.sh is deprecated. Use: make plan  ->  (Fable in Claude Desktop)  ->  make exec" >&2
exit 1
