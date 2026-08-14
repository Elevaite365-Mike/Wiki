# Comments & screenshots

Two commands that add to the record of a run without changing what the test does.

## Comment

**Purpose**: add a line of free text to a test. The step does nothing when the test runs.

**Parameters**: a single free-text field.

Use it to explain the steps around it: why a wait is there, what a block of steps is meant to prove, which requirement a section covers.

### Comments appear in the output

A Comment is not only for whoever edits the test next. The text carries through to the generated report and to the Word and PDF exports, so it shows up in front of the people reading results rather than building tests.

That makes it worth writing for that audience. *"Confirms the invoice total includes GST"* tells a reader something. *"step 14 fix"* does not.

!!! tip "Use it as a heading"
    Dropping a Comment above each block of steps breaks a long test into labelled sections, in the editor and in the exported document.

!!! info "Stopping the test instead"
    To end a run with a message rather than annotate it, use [Fail](pass-fail.md#fail).

---

## Take a Screenshot

**Purpose**: capture a full-screen image at this point in the test. It appears in the run's results.

**Parameters**: none.

!!! note "Every step is already captured"
    Screenshots are taken automatically as a test runs, so you rarely need this one. Reach for it when you want a deliberate full-screen shot of a moment the step captures do not show well.
