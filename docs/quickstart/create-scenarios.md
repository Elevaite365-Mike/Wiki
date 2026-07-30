# Create scenarios

Scenarios are a handy way of defining your processes or test flows into groups of tests that can be run in one click, or scheduled. Other tools sometimes call these **test plans** or **run sheets**.

Key points:

- Scenarios can contain multiple tests from any environment or application
- They're most useful for grouping cross-application tests, like integration tests
- Scenarios can be scheduled
- Scenarios can be connected to Azure DevOps for execution and results

## Create a scenario

Navigate to the **Scenarios** page by clicking the Scenarios tab at the top of your browser.

<!-- TODO screenshot: The scenarios page (was create-scenarios-scenario.png; the source file is private on the old wiki) -->

From here you can see a list of your scenarios. To create your first, click the orange **Create Scenario** button in the top right and enter a name, for example `Order to cash` or `Procure to pay`.

Once your scenario is created, click into it.

## Adding tests

<!-- TODO screenshot: Scenario controls (was create-scenarios-scenariocontrols.png; the source file is private on the old wiki) -->

In the top right you'll see some controls:

| Control | Purpose |
| --- | --- |
| **+** | Add a test to the scenario |
| **Clock** | Add a fixed delay between tests (useful for batch jobs) |
| **Refresh** | Refresh the scenario view |

Clicking **+** opens your test library, from which you can select the tests to add.

!!! note "Adding the same test twice"
    If you need the same test in a scenario multiple times, add it one at a time.

## Running a scenario

Once you've added a few tests, close out of your scenario to see more options:

<!-- TODO screenshot: Scenario list controls (was create-scenarios-scenario-control1.png; the source file is private on the old wiki) -->

The **run** button executes the scenario one test at a time, in the background. While running, it shows on the results pages as *pending*, then *completed* once finished.

The **pencil** icon edits the name.

## Scheduling

To schedule a scenario, select it and use the toolbar at the top of the page.

<!-- TODO screenshot: Scenario toolbar (was create-scenarios-schdule.png; the source file is private on the old wiki) -->

The toolbar lets you:

- Delete
- Refresh the list
- Schedule
- Run (useful for running multiple scenarios in sequence)
- Export for Azure DevOps integration

<!-- TODO screenshot: One-off and recurring schedule options (was create-scenarios-recurring.png; the source file is private on the old wiki) -->

When you schedule a scenario you can set it as **one-off** or **recurring**. Both options let you choose a time and timezone.

!!! tip "Use recurring for end-to-end tests"
    Recurring is highly recommended for your full end-to-end tests. It means you can just come in and check results every now and then to confirm your tests are still working.

---

Next: [Create a test script](../tests/create-test-script.md)
