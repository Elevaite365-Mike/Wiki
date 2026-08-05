---
hide:
  - navigation
  - toc
---

# Welcome to the elevaite365 Help Centre

New here? The quickstart takes you from an empty instance to a scheduled test.

[Start the quickstart](quickstart/index.md){ .md-button .md-button--primary }
[Command reference](commands/index.md){ .md-button }
<a href="agreements/" class="md-button">Agreements</a>

## Where do you want to go?

<div class="grid cards tiles" markdown>

-   :material-rocket-launch:{ .lg .middle } **Quickstart**

    ---

    Set up your team, connect your applications and environments, add test users, and build your first components and scenarios.

    [:octicons-arrow-right-24: Start here](quickstart/index.md)

-   :material-record-circle:{ .lg .middle } **Test cases**

    ---

    Create a test script from scratch or capture a business process with the built-in recorder.

    [:octicons-arrow-right-24: Building tests](tests/create-test-script.md)

-   :material-code-braces:{ .lg .middle } **Commands**

    ---

    Every command and its parameters: clicking, entering data, verifying, variables, loops and the AI commands.

    [:octicons-arrow-right-24: Command reference](commands/index.md)

-   :material-api:{ .lg .middle } **Integrations**

    ---

    Trigger scenarios from Azure DevOps or your own systems, and collect the results.

    [:octicons-arrow-right-24: External API](api/index.md) · [Azure DevOps](integrations/azure-devops.md)

-   :material-lifebuoy:{ .lg .middle } **Help**

    ---

    Best practices, demo videos, plain-English definitions, and how to get support when you're stuck.

    [:octicons-arrow-right-24: Help](help/tips.md)

</div>

## Tips & tricks

Seven habits that keep a suite trustworthy.

<div class="grid cards" markdown>

-   **Run a new test three times**

    ---

    Passing once proves very little. Three green runs before you call it ready catches the flakiness that would otherwise surface in a nightly run.

    [:octicons-arrow-right-24: Tips & best practices](help/tips.md#run-a-new-test-three-times-before-you-call-it-ready)

-   **Reuse steps with components**

    ---

    Built the same sequence three times? Make it a component. Every test using it picks up your next edit automatically.

    [:octicons-arrow-right-24: Create components](quickstart/create-components.md)

-   **Generate unique data**

    ---

    Two runs writing the same record will collide. Use **Generate UID** on any reference your test creates.

    [:octicons-arrow-right-24: Modify Variable](commands/variables.md#modify-variable)

-   **Prefer a timeout over a Wait**

    ---

    A fixed wait is too short on a slow day and too slow every other day. Let the next command's timeout do the waiting.

    [:octicons-arrow-right-24: Navigation & waiting](commands/navigation.md#wait)

-   **Tidy up after recording**

    ---

    The recorder adds a Navigate step whenever it thinks a URL changed manually. Remove the ones you don't need.

    [:octicons-arrow-right-24: Test recorder](tests/test-recorder.md)

-   **Always end in a verification**

    ---

    A test that only navigates proves nothing. Close every test with a check that would genuinely fail if the process broke.

    [:octicons-arrow-right-24: Verification](commands/verification.md)

-   **Schedule your end-to-end runs**

    ---

    Set your full scenarios to run on a recurring schedule, then just check in on the results.

    [:octicons-arrow-right-24: Create scenarios](quickstart/create-scenarios.md)

</div>

## Popular pages

<div class="popular" markdown>

- [Using the test recorder](tests/test-recorder.md): capture a process in clicks
- [Setup test users](quickstart/setup-test-users.md): logins the automation can use
- [Verify & Verify Field](commands/verification.md): every check available
- [Loop](commands/loop.md): fields, ranges and data-driven runs
- [Create scenarios](quickstart/create-scenarios.md): group and schedule tests
- [Video library](help/videos.md): every demo, mapped to its article
- <a href="agreements/">Agreements</a>: support terms, onboarding SOW and partner terms
- [External API](api/index.md): trigger runs from CI/CD
- [Azure DevOps pipelines](integrations/azure-devops.md): run scenarios from a pipeline
- [Azure DevOps Test Plans](integrations/azure-devops-test-plans.md): push results into Test Plans
- [Glossary](help/glossary.md): plain-English definitions

</div>

!!! tip "Can't find what you need?"
    Press ++slash++ to search the whole wiki. Still stuck? [Get support](help/support.md), or check the [public roadmap](https://roadmap.elevaite365.com/) to see if it's already on the way.
