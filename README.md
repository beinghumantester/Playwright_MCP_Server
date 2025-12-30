# Playwright MCP Test Agents – A Practical Guide

This repository demonstrates how to use **Playwright Test Agents** with **MCP (Model Context Protocol)** to streamline testing workflows and reduce repetitive work.

The goal isn't to replace testers—it's about letting AI handle tedious exploration, test plan drafting, skeleton generation, and fixing obvious issues, while humans focus on what actually requires judgment: deciding what to test, what to automate, and what matters.

---

## This is Experimental

Test agents work through prompts and aren't deterministic. Quality depends on prompt clarity, scope definition, and context provided. Agents assist but don't guarantee perfection.

Expecting one prompt to deliver perfect automation will lead to disappointment.

---

## What Are Playwright Test Agents?

Playwright Test Agents combine:
- A Large Language Model (LLM) 
- Playwright's browser automation
- MCP tooling for controlled execution

Interaction happens through conversational prompts in a chat interface.

### Agent Modes

| Mode | Purpose |
|------|---------|
| **Planner** | Explores applications and generates test plans in Markdown |
| **Generator** | Converts test scenarios into Playwright tests |
| **Healer** | Investigates and fixes failed tests |
| **General** | Handles running tests and executing commands |

**Learn more:** [Playwright Test Agents Documentation](https://playwright.dev/docs/test-agents)

---

## Prerequisites

- Node.js (LTS version)
- Playwright
- VS Code Insiders (recommended for MCP support, regular VS Code works too)
- Access to an LLM through MCP (GPT-4, Claude, etc.)

---

## Installation & Setup

```bash
# Install dependencies
npm install
npx playwright install

# Initialize Playwright Agents
npx playwright init-agents --loop=vscode
```

**What `init-agents` does:**
- Installs Playwright Test Agents
- Configures MCP integration with VS Code
- Sets up chat interface with agent modes

Open the project in VS Code Insiders to access the chat interface.

---

## Critical: Scope Matters

###  What Doesn't Work Well

- Exploring entire applications at once
- Generating automation for everything in one go
- Handling complex flows without context

Results: 30-50% coverage gaps, shallow understanding, incorrect assumptions, weak assertions.

###  What Works Better

**Module-by-module approach.**

Focusing on one module or feature at a time significantly improves results. Coverage can jump from 50-70% to 80-90% with proper scoping.

Treat agents like junior team members needing clear direction and boundaries.

---

## The Workflow

### Step 1: Create Test Plan (Planner Mode)

**Example Prompt:**
```
Navigate to the login module.
Explore all visible elements and user flows.
Create a detailed test plan covering positive, negative, and edge case scenarios.
```

**Output:**
- Markdown test plan with scenarios, steps, and expected results
- Typical coverage: 50-70%

**Important:** Review the plan. Add missing scenarios. Correct assumptions about business logic.

---

### Step 2: Generate Tests (Generator Mode)

Keep the test plan in context and switch to Generator mode.

**Example Prompt:**
```
Generate Playwright tests for the "Product Search" scenarios
from the attached test plan.
Use proper locators and include assertions.
```

**Output:**
- Playwright test files with test structure, locators, and basic assertions

**For Page Object Model:**
Attach an existing page object file and explicitly request: "Follow the Page Object Model structure shown in the attached file."

---

### Step 3: Run Tests

**Via General Agent Mode:**
```
Run the generated tests in Chromium headed mode
```

**Via Terminal:**
```bash
npx playwright test --project=chromium --headed
```

Some tests will pass, some will fail. This is normal and expected.

---

### Step 4: Fix Failed Tests (Healer Mode)

**Example Prompt:**
```
The search-with-no-results.spec.ts test failed.
Investigate and fix the issue.
```

**Healer can fix:**
- Strict mode violations
- Ambiguous locators
- Selector indexing issues
- Minor timing problems

**Healer cannot fix:**
- Wrong business logic
- Flawed test strategy
- Application bugs

This is an iterative conversation requiring follow-up questions and context.

---

## Seed Files for Deep Navigation

When testing requires navigating through many pages to reach the target area, create a seed file that automates the initial navigation.

**Usage:**
1. Write a Playwright test that navigates to the target area
2. Attach the seed file when prompting Planner
3. Specify: "Use the attached seed file to navigate to [target area], then create a test plan for [module]"

---

## Human Responsibilities

**Still required:**
- Validating test plans
- Deciding what to automate
- Providing business context
- Reviewing generated code
- Defining test strategy

**What agents handle:**
- Tedious exploration
- Generating test skeletons
- Finding locators
- Creating basic structure
- Fixing obvious technical issues

This is delegation, not abdication.

---

## Improving Results

### Provide Context

Attach relevant files:
- Business requirements (for understanding valid inputs, error messages)
- Existing page objects (to follow framework patterns)
- API documentation
- Seed files

### Write Clear Prompts

Instead of: "Test the search feature"

Use: "Create tests for product search covering: exact matches, partial searches, no results, special characters, and case sensitivity. Verify results display correctly."

### Iterate

This is a conversation:
1. Start with a basic prompt
2. Review output
3. Request corrections
4. Provide more context
5. Ask for specific changes

---

## What This Demonstrates

**Shows how to:**
- Accelerate test planning
- Automate exploratory navigation
- Bootstrap automation faster
- Fix obvious failures with assistance

**Does NOT:**
- Replace test engineers
- Provide zero-effort automation
- Work as production framework out-of-the-box
- Make testing decisions

---

## Key Takeaway

Playwright Test Agents reduce busy work, not critical thinking.

Used as assistants: incredibly valuable.
Used as decision-makers: disappointing.

---

## Resources

- [Playwright Test Agents Documentation](https://playwright.dev/docs/test-agents)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
