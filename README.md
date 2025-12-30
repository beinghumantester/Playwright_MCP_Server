````md
# Playwright MCP Test Agents (Experimental)

This repository demonstrates an **agent-driven testing workflow** using **Playwright Test Agents** powered by **MCP (Model Context Protocol)**.

The objective is not to replace testers, but to reduce repetitive cognitive effort involved in:
- initial test planning
- exploratory navigation
- test skeleton generation
- fixing obvious automation failures

Human judgment remains essential for deciding **what to test, what to automate, and what actually matters**.

---

## Disclaimer

This project is **experimental**.

- Test agents are prompt-driven and non-deterministic
- Output quality depends heavily on:
  - prompt clarity
  - scope definition
  - provided context (requirements, seed tests, POMs)
- Agents assist; they do not guarantee correctness or completeness

If you expect “one prompt → perfect automation”, this repository will disappoint you.

---

## What Are Playwright Test Agents?

Playwright Test Agents are **instruction-based agent modes** that combine:
- a Large Language Model (LLM)
- Playwright browser automation
- MCP tooling for controlled execution

Agents operate through **interactive chat prompts**, not custom-written agent code.

This repository demonstrates three agent roles:

| Agent     | Responsibility |
|----------|----------------|
| Planner  | Explores the application and generates a Markdown test plan |
| Generator| Converts selected test scenarios into Playwright tests |
| Healer   | Investigates failed tests and attempts to repair them |

These agents are **modes**, not independent services or binaries.

Reference: https://playwright.dev/docs/test-agents

---

## Repository Contents

This repository contains a mix of artifacts:

- Example generated test plans (`.md`)
- Example generated Playwright test files
- Screenshots captured during exploration
- Playwright configuration required for MCP-based execution
- Documentation and example prompts used during agent workflows

This is **not** a production-ready framework.

---

## Prerequisites

- Node.js (LTS recommended)
- Playwright
- Visual Studio Code
- Playwright Test MCP enabled in VS Code
- Access to a supported LLM via MCP

---

## Installation

```bash
npm install
npx playwright install
````

Ensure that Playwright MCP is enabled so agents can:

* launch browsers
* interact with pages
* capture screenshots
* write files into the workspace

---

## Recommended Usage Pattern

### What Not to Do

Avoid asking agents to:

* explore the entire application in one prompt
* generate automation for the full system at once

This usually results in:

* missed scenarios
* shallow coverage
* incorrect assumptions

---

### What Works Better

Use a **module-by-module approach**.

Treat agents as junior collaborators that need clear boundaries, not as omniscient systems.

---

## Step 1: Planner Agent – Create a Test Plan

Use the Planner agent to explore a **specific module or flow**.

### Example Prompt

```
Navigate to the login module of the application.
Explore all visible elements and user flows.
Create a detailed test plan covering:
- positive scenarios
- negative scenarios
- edge cases
```

### Output

* A Markdown test plan (`.md`)
* Includes:

  * module overview
  * test scenarios
  * expected results

### Limitations

* Coverage is typically around 50–70%
* Business rules may be guessed
* Domain-specific knowledge is not guaranteed

The test plan should be reviewed and refined by a human tester.

---

## Step 2: Generator Agent – Create Playwright Tests

Once a test plan exists:

1. Attach the test plan as context
2. Select specific scenarios to automate
3. Switch to the Generator agent

### Example Prompt

```
Generate Playwright tests for the Product Search scenarios
from the attached test plan.
Capture locators and screenshots for each step.
```

### Behavior

* The agent re-executes the flow in a browser
* Locators are discovered dynamically
* Playwright test files are generated

### Known Limitations

* Some scenarios may be skipped
* Assertions may be weak or generic
* Page Object Model is not assumed by default

If POM-based tests are required:

* attach an existing page object file
* explicitly instruct the agent to follow that structure

---

## Step 3: Execute Tests

Tests can be executed via agent prompts or directly in the terminal.

```bash
npx playwright test --project=chromium
```

It is expected that:

* some tests will pass
* some tests will fail

Failures are part of the workflow.

---

## Step 4: Healer Agent – Repair Failed Tests

The Healer agent focuses on **test failures**, not application defects.

### Example Prompt

```
One of the generated tests failed.
Investigate the failure and fix the test.
```

### What Healer Can Fix

* strict mode violations
* ambiguous or duplicated locators
* selector indexing issues
* minor locator mismatches

### What Healer Cannot Fix

* incorrect business expectations
* missing assertions
* flawed test strategy
* incorrect assumptions in the test plan

Healer assists debugging; it does not replace it.

---

## Human-in-the-Loop Is Mandatory

Humans are responsible for:

* validating test plans
* selecting automation candidates
* supplying business context
* reviewing generated code
* defining test strategy

Agents handle execution and generation, not judgment.

---

## Why This Repository Exists

This project demonstrates:

* accelerated test planning
* automated exploratory navigation
* faster automation bootstrapping
* assisted repair of obvious test failures

It does not aim to:

* replace test engineers
* provide zero-effort automation
* act as a production framework template

---

## Key Takeaway

Playwright Test Agents reduce **busy thinking**, not critical thinking.

Used as assistants, they are effective.
Used as decision-makers, they fail.

---

## References

* Playwright Test Agents documentation
  [https://playwright.dev/docs/test-agents](https://playwright.dev/docs/test-agents)

```
```
