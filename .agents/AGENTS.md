# Project Rules & Guidelines — Hotel Maluri Reporting Suite

## GitHub Deployment & Actions Troubleshooting Rule
- **Mandatory First Step on Deployment Issues**: Whenever a GitHub Pages build, deployment, or GitHub Actions workflow run is stuck, queued, failing, or delayed, you MUST check `https://www.githubstatus.com/` (or query `https://www.githubstatus.com/api/v2/summary.json`) FIRST before making any code modifications, editing workflow YAML files, or force-pushing branches.
- **Incident Protocol**: If `githubstatus.com` reports an active incident affecting GitHub Actions or Pages, immediately notify the user of the GitHub platform outage rather than attempting to debug local code or workflow configurations.

## Financial Statement Benchmarking & NotebookLM Rule
- **Mandatory NotebookLM Integration**: Whenever analyzing financial statements, auditing P&L line items, modeling staff cost intensity, or setting P&L breakeven targets, you MUST leverage Google NotebookLM (via MCP tools or `nlm` CLI) to query regional hospitality benchmarks, labor market ratios (e.g. 0.40–0.60 staff/room, 35–40% payroll-to-revenue target), and operational best practices.

