---
name: financial-statement-benchmarking
description: Guidelines and workflows for analyzing hotel financial statements, P&L line items, payroll intensity, and overhead variances. MANDATORY: Leverages Google NotebookLM (MCP tools and nlm CLI) to source hotel industry benchmarks, labor market standards, and operational best practices.
---

# Financial Statement Analysis & Industry Benchmarking Skill

Use this skill whenever analyzing hotel P&L financial statements, line-item account variances, payroll intensity, utility run-rates, or operational overheads.

## Mandatory Step 1: Query & Research via NotebookLM
When conducting any financial statement audit or variance analysis:

1. **Check Existing NotebookLM Research Notebooks**:
   - Query existing NotebookLM notebooks (such as `Hotel Maluri Payroll & Financial Analysis` or general hospitality benchmarks) using `mcp__notebooklm__notebook_list` or `mcp__notebooklm__notebook_query`.
   - Ask specific benchmark questions, e.g.:
     - *"What is the standard payroll-to-revenue ratio for 3-star and 4-star city hotels in Kuala Lumpur?"*
     - *"What is the recommended staff-to-room ratio for a 150-room midscale hotel at 55% occupancy?"*
     - *"What are typical hotel utility intensity benchmarks (kWh / occupied room night) in tropical climates?"*

2. **Ingest Target Benchmarking Sources**:
   - If new research papers, market reports, web URLs, or P&L baselines are introduced, ingest them into the relevant NotebookLM notebook using `mcp__notebooklm__notebook_add_url` or `mcp__notebooklm__notebook_add_text` (or `nlm source add`).

3. **Incorporate Benchmark Knowledge into Financial Reports**:
   - Synthesize NotebookLM query results directly into P&L variance analysis, executive memos, and mission control dashboards.
   - Highlight line items that exceed industry targets (e.g. Payroll > 35-40% benchmark, EPF statutory contribution anomalies, utility run-rate spikes).

## Step 2: Departmental Demand Sizing & RevPAR Coverage Modeling
1. **Model Core Staffing Demand**:
   - Calculate staff per room ratios (e.g., 0.40 – 0.60 staff/room benchmark for midscale hotels).
   - Size housekeeping attendant load (e.g. 15–18 rooms per attendant per shift).
2. **Calculate P&L Breakeven & RevPAR Coverage**:
   - Identify full P&L breakeven monthly revenue requirement.
   - Determine standalone breakeven RevPAR target and dual-engine RevPAR target (combining top-line growth with cost restructuring).
