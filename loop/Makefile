.PHONY: plan exec queue trust audit goals clean

# 1) terminal: budget + triage, then build the Conductor input for Claude Desktop
plan:
	@bash ./plan.sh

# 2) after Fable (Claude Desktop, Account 1) writes work-order.json: run worker+verifier+gate
exec:
	@bash ./execute.sh

queue:
	@jq -r 'select(.action=="queue") | .item' work-order.json 2>/dev/null || echo "Queue is clear."

trust:
	@bash ./scripts/trust-log.sh --render

audit:
	@awk -F'\t' '{sum+=$$3} END {print "Total Account Spend Budget: $$", sum}' memory/usage.log 2>/dev/null

goals:
	@bash ./verify-goals.sh

clean:
	@rm -f current-work.diff work-order.json conductor-input.md triage-out.txt