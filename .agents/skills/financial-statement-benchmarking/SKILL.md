---
name: financial-statement-benchmarking
description: Guidelines and workflows for analyzing hotel financial statements, P&L line items, payroll intensity, and overhead variances against 4-star hotels in Kuala Lumpur. MANDATORY: Automatically ingests uploaded files and leverages Google NotebookLM (via MCP tools or nlm CLI) to compare performance against KL 4-star hotel benchmarks every time a new file is introduced.
---

# Financial Statement Analysis & KL 4-Star Industry Benchmarking Skill

Use this skill whenever analyzing hotel P&L financial statements, line-item account variances, payroll intensity, utility run-rates, or operational overheads, or whenever a new financial document/report is uploaded.

## Mandatory Step 1: Automatic NotebookLM Research & KL 4-Star Benchmarking
Whenever a new financial report or statement file is uploaded or analyzed:

1. **Ingest Uploaded File / Operational Summary into NotebookLM**:
   - Add the uploaded file or extracted performance metrics into the dedicated NotebookLM benchmark notebook (`Hotel Maluri & KL 4-Star Hospitality Benchmarks`, ID: `0b8be7b0-5f0b-4897-a3e9-d442fc8717fc`) using `nlm source add` or MCP tools.

2. **Query & Benchmark Against KL 4-Star Hotel Peer Group**:
   - Query NotebookLM for 4-star hotel benchmarks in Kuala Lumpur across key metrics:
     - **Occupancy Rate**: KL 4-Star Benchmark Target = 65% – 72%
     - **Average Daily Rate (ADR)**: KL 4-Star Benchmark Target = RM 240 – RM 310
     - **Revenue Per Available Room (RevPAR)**: KL 4-Star Benchmark Target = RM 160 – RM 220
     - **Payroll-to-Revenue Ratio**: Target ≤ 35.0% (Ceiling: 38.0%)
     - **Staff-to-Room Ratio**: Target = 0.40 – 0.55 staff/room (~60–80 staff for 150 rooms)
     - **Gross Operating Profit (GOP) Margin**: Target = +30.0% – 36.0%
     - **F&B Revenue Contribution**: Target = 25.0% – 35.0% of total revenue

3. **Incorporate Comparative Benchmark Variance Analysis into Reports**:
   - Synthesize NotebookLM query results into all variance analysis memos, dashboards, and financial reviews.
   - Flag critical negative variances (e.g. ADR discount vs 4-star peers, RevPAR deficit, payroll cost overruns exceeding 35% revenue target).

## Step 2: Departmental Demand Sizing & RevPAR Coverage Modeling
1. **Model Core Staffing Demand**:
   - Calculate staff per room ratios (e.g., 0.40 – 0.60 staff/room benchmark for midscale hotels).
   - Size housekeeping attendant load (e.g. 15–18 rooms per attendant per shift).
2. **Calculate P&L Breakeven & RevPAR Coverage**:
   - Identify full P&L breakeven monthly revenue requirement.
   - Determine standalone breakeven RevPAR target and dual-engine RevPAR target (combining top-line growth with cost restructuring).
