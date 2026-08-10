---
name: github-deployment-troubleshooting
description: Guidelines for troubleshooting GitHub Pages, CI/CD pipelines, and GitHub Actions deployment issues. MANDATORY: Check githubstatus.com for active platform outages before deep-debugging code or workflow configurations.
---

# GitHub Deployment & Actions Troubleshooting Skill

Use this skill whenever troubleshooting GitHub Pages, GitHub Actions, workflow run delays, or deployment failures.

## Step 1: Check GitHub System Status FIRST (Mandatory Initial Step)
Before analyzing local build artifacts, editing workflow YAML files, or investigating git branches when a GitHub Actions job or GitHub Pages deployment is stuck, queued, or failing unexpectedly:

1. **Check `https://www.githubstatus.com/`**:
   - Check `https://www.githubstatus.com/` (or fetch `https://www.githubstatus.com/api/v2/summary.json`).
   - Inspect active incident reports for:
     - **GitHub Actions** (runner acquisition delays, queued job timeouts, execution failures)
     - **GitHub Pages** (deployment pipeline delays, edge CDN propagation lags)
     - **Git Operations & API Services**
2. **If an Active Incident is Identified**:
   - **STOP** code modifications and workflow edits immediately.
   - Inform the user with the exact update from `githubstatus.com`.
   - Reassure the user that local code, build artifacts, and repository commits are verified and ready to deploy automatically once GitHub resolves the incident.

## Step 2: Repository Diagnostic Checklist (When Systems are Operational)
Only if `githubstatus.com` confirms all systems are operational:
1. **Sync `package-lock.json`**: Ensure `package-lock.json` is committed so `npm ci` in GitHub Actions completes without lockfile mismatches.
2. **Inspect Workflow Annotations & Logs**: Check step-by-step logs for build errors, missing environment variables, or permission mismatches.
3. **Verify Edge Cache Busting**: Ensure root `index.html` includes Cache-Control headers to prevent edge CDN and browser disk caching of legacy JavaScript bundles.
