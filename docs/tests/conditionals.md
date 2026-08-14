# Conditionals

A conditional turns a verify step into a fork in the test. Instead of failing when the check does not hold, the step runs one set of steps if the check passed and another if it did not, then carries on with the rest of the test.

Use it for the parts of a process that do not happen every time: a warning dialog that only some records raise, an approval button that only appears for large amounts, a search that sometimes returns nothing.

## Add one

1. Right-click the verify step.
2. Choose **Add conditional**.

A **True** and **False** area appears under the step. Use the **+** in each to add the steps that branch should run. Leave a branch empty and nothing happens on that path.

To take it off again, right-click the step and choose **Remove conditional**.

!!! warning "No nesting"
    A conditional cannot contain another conditional. If a branch needs a second decision, restructure the test so the two checks sit one after the other rather than inside each other.

!!! info "Available on the verify commands"
    Any command that makes a check can carry a conditional: [Verify](../commands/verification.md#verify), [Verify Field](../commands/verification.md#verify-field), [Verify Variable](../commands/verification.md#verify-variable), [Verify using AI](../commands/ai.md#verify-using-ai) and the Business Central [Verify Checkbox](../commands/d365-business-central.md#verify-checkbox).

## What changes about the step

This is the part worth being deliberate about. A verify step normally fails the test when the check does not hold. Once it carries a conditional it no longer does. Both outcomes are valid paths, and the test continues either way.

| | Without a conditional | With a conditional |
| --- | --- | --- |
| Check passes | Test continues | **True** steps run, then the test continues |
| Check fails | Test fails and stops | **False** steps run, then the test continues |

So a check you rely on to catch a defect should not have a conditional on it. Adding one to quieten a step that keeps failing removes the assertion, and the test will pass through the broken state without a word.

## Failing on purpose inside a branch

When one path should end the run, put a [Fail](../commands/pass-fail.md#fail) step in that branch with a message explaining what was wrong. That keeps the branching and the failure separate: the conditional decides which path the test takes, and Fail decides that this path is a problem.

The same works the other way with [Pass](../commands/pass-fail.md#pass), for a branch where the test has proved its point and the remaining steps do not apply.

## Inside a loop

A conditional inside a [Loop](../commands/loop.md) can use the loop's **Skip** and **Break** controls, so a branch can move to the next row or stop the loop early. *Skip if the row has no invoice number* is a conditional with a Skip in one branch.

Those two only mean something inside a loop. In a conditional that is not in a loop there is nothing to skip or break out of.

## Example

A test that posts an invoice, where D365 sometimes raises a credit-limit warning:

| Step | Branch |
| --- | --- |
| Verify the warning dialog is present, with a conditional | |
| Click **Yes** to accept the warning | True |
| *(nothing)* | False |
| Verify the invoice posted | |

The test handles both cases and still checks the thing that matters, which is the posting.
