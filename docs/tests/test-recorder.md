# Using the test recorder

elevaite365 provides a built-in recorder that can record a test script from scratch, or add steps to an existing test.

## Recording a new test

Navigate into the test script where you want to record the steps.

If the test is empty you'll see a large **Start Recorder** button. Click it to enable the recorder.

<!-- TODO screenshot: The Start Recorder button on an empty test (was using-the-test-recorder-tool-Screenshot_202025-07-08_20234633.png; the source file is private on the old wiki) -->

## Adding steps to an existing test

If you don't see that option, it means the test already has steps. You must first run your script up to the point where you want to record additional steps. For example, to add steps to the end, run the script in full.

Once it's finished, click the **+** button at the bottom of the test, or right-click and select **Record from here**.

<!-- TODO screenshot: Record from here (was using-the-test-recorder-tool-Screenshot_202025-07-08_20233935.png; the source file is private on the old wiki) -->

With the commands pane open, click **Enable Recorder** in the top right.

## Recording

Once the recorder is enabled, the toolbar appears on the page.

<!-- TODO screenshot: The recorder toolbar (was using-the-test-recorder-tool-Screenshot_202025-07-08_20235358.png; the source file is private on the old wiki) -->

Hovering over fields on the webpage now turns them **orange**. That indicates interacting with the highlighted area will be recorded as a new step:

- Clicking records a **click** action
- Typing records a **type** action

!!! warning "Watch for automatic Navigate steps"
    As a safety precaution, a **Navigate** command is added to the test if the system believes a URL change might have been made manually. When you finish recording, it's a good idea to remove any of these that aren't required.

## Stopping the recorder

Click **Stop Recorder** on the steps view, or click the red circle in the toolbar.

<!-- TODO screenshot: Stop Recorder (was using-the-test-recorder-tool-Screenshot_202025-07-08_20235654.png; the source file is private on the old wiki) -->

---

Next: [Templates](templates.md)
