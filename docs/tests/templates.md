# Templates

A template is a pre-built test script you use as a starting point rather than recording from scratch.

There are two kinds, and they work differently:

| | Where it comes from | Who can see it |
| --- | --- | --- |
| **Marketplace templates** | Published by our partners on the [template marketplace](https://templates.elevaite365.com) | Available to all elevaite365 customers to install |
| **Internal templates** | Built by your own team | Private to your instance |

## Marketplace templates

The **template marketplace** at [templates.elevaite365.com](https://templates.elevaite365.com) is where partners publish templates for elevaite365 customers to install.

They act as blueprints for quick development: instead of working out how to test a process from a blank test, you install a template that already covers it and adapt it to your configuration.

Many of our ISV partners publish templates for their own products, so if you're running a third-party solution on top of D365, check the marketplace before you build the tests yourself.

**To use one:** browse the marketplace, install the template, and it becomes available to your instance.

## Internal templates

Internal templates are your own. They're **private to your instance**. Nobody outside your organisation can see or install them.

These are the templates that appear in the **Template** dropdown of the [Create Test dialog](create-test-script.md). If templates exist for the application you're creating a test against, the dropdown appears; if there are none, it doesn't.

Internal templates are worth building when your organisation tests the same shape of process repeatedly: the same approval chain across different modules, or a standard set-up sequence every test in a suite needs.

!!! tip "Template or component?"
    They solve different problems. A [component](../quickstart/create-components.md) is a **live** building block: change it once and every test using it picks up the change on its next run. A template is a **starting point**: tests created from it are independent copies, and editing the template afterwards doesn't touch them.

    Use a component for steps that must stay in sync. Use a template for the shape of a whole test.

---

Next: [Command reference](../commands/index.md)
