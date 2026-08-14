# Pass & Fail

Two commands that end a test on the spot and set its result. Nothing after them runs.

Both are made for [conditional](../tests/conditionals.md) branches. On their own, a step that always fails is not much use. Inside the True or False branch of a verify step, it is the path you do not want the run to continue down.

## Fail

**Purpose**: stop the test and mark it as failed.

**Parameters**: a free-text message, used as the error on the failed step.

A test that reaches a state it was never meant to reach should stop and say why, rather than carrying on and failing later on something unrelated. Fail gives you both: the stop, and the sentence in the report explaining it.

### Write the message for the reader

The text lands on the failed step, so someone reading the result sees it without opening the test. Say what was wrong, not that something was wrong.

| Message | Reads as |
| --- | --- |
| *"No approved invoices found for the test vendor, cannot continue"* | Actionable |
| *"failed"* | Noise |

## Pass

**Purpose**: stop the test and mark it as passed. The mirror image of Fail.

**Parameters**: a free-text message, recorded against the step.

Say why the run stopped early. Someone looking at a green result with fewer steps than usual needs to know it was deliberate.


Use it when a branch has proved what the test set out to prove and the remaining steps do not apply. A run that finds nothing to process, in a test that only checks how a record is processed, has not failed. It has finished.

!!! warning "Do not use it to skip a problem"
    Pass ends the run green. Putting one in front of a step that keeps breaking hides the breakage from everyone reading the report. If a path should not be tested, branch around it with a [conditional](../tests/conditionals.md); if it should be tested and is broken, leave it failing.

!!! info "Adding context without ending the run"
    To leave a note in the report while the test carries on, use [Comment](reporting.md#comment).
