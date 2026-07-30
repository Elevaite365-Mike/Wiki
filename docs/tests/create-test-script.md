# Create a test script

To create a test script you first need [an application](../quickstart/adding-applications.md) and [an environment](../quickstart/adding-environments.md). Once those are set up, you'll have access to the **Create Test** button on the Library page.

Clicking it opens the test creation form.

## The test creation form

| Field | Notes |
| --- | --- |
| **Test Name** | What the test does |
| **Test Description** | Why it exists and what it proves |
| **Folder Selection** | Where it lives in the library |
| **Test User** | Microsoft applications only, see below |
| **Template** | If internal templates exist for this application, see [Templates](templates.md) |

### Test User

Many Microsoft applications include a **Test User** dropdown. This is part of elevaite365's login logic, which is automatically added to the beginning of the test.

Set up test users first on the [Setup test users](../quickstart/setup-test-users.md) page.

### Templates

If templates are available for your application, you'll also see a **Template** dropdown. Templates are pre-built test scripts you can use as a starting point.

The dropdown lists your **internal templates**, the ones private to your instance. Templates published by partners live on the [template marketplace](https://templates.elevaite365.com) and appear here once installed.

See [Templates](templates.md) for the difference between the two.

!!! tip "Run it three times before you call it ready"
    A test that passes once has proved very little. Run a new test three times and only sign it off when all three pass. Most flakiness shows up on the second or third run, and it is far cheaper to find now than in a nightly run. See [Tips & best practices](../help/tips.md#run-a-new-test-three-times-before-you-call-it-ready).

---

Next: [Using the test recorder](test-recorder.md)
