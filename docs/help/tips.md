# Tips & best practices

Habits that keep a test suite trustworthy, drawn from how the tool is built to be used.

## Run a new test three times before you call it ready

A test that passes once has proved very little. Run it three times, and only mark it ready when all three pass.

Most flakiness is visible on the second or third run: a record the first run created and the second one collides with, a page that was already loaded the first time, a dropdown that behaves differently when the cache is warm. Catching that now costs a few minutes. Catching it later means a failed nightly run, someone investigating a defect that was never there, and a suite people stop trusting.

If run two or three fails, fix the cause rather than re-running until it goes green. See [Generate unique data](#generate-unique-data) and [Prefer a timeout over a Wait](#prefer-a-timeout-over-a-wait).

## Use components for anything you repeat

If you've built the same sequence three times, make it a [component](../quickstart/create-components.md). Every test using it picks up your next edit automatically, and parameters let the same steps run with different data.

## Never point a test at a real person's account

Test users are dedicated accounts. See [Setup test users](../quickstart/setup-test-users.md).

## Generate unique data

Two runs writing the same record will eventually collide. Use **Generate UID** in [Modify Variable](../commands/variables.md#modify-variable) on any name or reference your test creates, or drive the run from a spreadsheet with [Loop](../commands/loop.md).

## Prefer a timeout over a Wait

A fixed [Wait](../commands/navigation.md#wait) is too short on a slow day and too slow every other day. Where the next command has a [timeout](../commands/index.md#timeout), let it do the waiting. It continues the moment the field is ready. Keep Wait for cases where nothing on screen signals readiness, like a batch job.

## Tidy up after recording

The recorder adds a **Navigate** step whenever it thinks a URL may have been changed manually. Review the recording and remove the ones you don't need. See [Using the test recorder](../tests/test-recorder.md).

## Always end in a verification

A test that only navigates proves nothing. Close every test with a [Verify](../commands/verification.md#verify) or [Verify Field](../commands/verification.md#verify-field) step that would genuinely fail if the process broke.

## Cap your loops

When looping over fields, always set a maximum limit. It's the difference between a failed test and a run that never ends. See [Loop](../commands/loop.md).

## Choose Fill or Type deliberately

[Fill](../commands/entering-data.md#fill) pastes and is faster, which makes it the right default. [Type](../commands/entering-data.md#type) enters characters one at a time, which matters for lookups and fields that filter as you type.

## Schedule your end-to-end tests

Set your full end-to-end [scenarios](../quickstart/create-scenarios.md) to run on a recurring schedule. Then you only need to check results periodically to know your processes still work.

## Group cross-application tests into scenarios

Scenarios can contain tests from any environment or application, which makes them the natural home for integration tests, and they can feed results into Azure DevOps.
