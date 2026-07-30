# AI commands

## Ask AI

**Purpose** — a simple OpenAI / ChatGPT connector. Use it to generate unique test data, specific dates, and many other unique scenarios.

!!! note "No page access"
    The current version does not have access to the webpage. Its main purpose is responding to questions using supplied data.

**Parameters:**

- **Question** — the prompt you want to ask the AI. For example, *"What is the date of the first Friday of next month?"*
- **Response format** — optional; specifies how the AI responds. For example, *"Respond only in date format dd/mm/yyyy with no additional information"*
- **Variable** — where the output is saved

## Verify Using AI

Takes a screenshot of the field or the full page and performs a natural-language evaluation.

<div class="video">
  <iframe src="https://www.youtube-nocookie.com/embed/idm6MtOFh3s" title="elevaite365 demo: AI Verifications" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture" allowfullscreen></iframe>
</div>

For example, selecting the **Screen** option with the prompt *"Validate that the GST is included"* screenshots the page at the time of the step and checks whether GST is included in that screenshot.

This is useful for:

- On-screen reports and invoices
- Mass validation in one step
- Icon-based fields — the **Field** option is handy for things like a tick icon

## AI Actions

Lets the AI take over the test and perform steps from natural language.

For example: *"Enter vendor name, account, group and then click save."* The AI will attempt to perform this task for you.

!!! warning "Advanced users only"
    This command is for advanced users and requires knowledge of GenAI.

**Parameters:**

| Parameter | Purpose |
| --- | --- |
| **Task Description** | A user prompt |
| **Extend System Message** | System message |
| **Max Steps** | Maximum steps the AI should perform, including thinking and interactions |

## Click (Using Computer Vision)

**Purpose** — an experimental command that finds a field on the page using an **image** as reference. For example, take a screenshot of the New button and this command uses that image to locate and click the field on the page.

**Parameters** — a single parameter: the image the automation should identify and click on the page.

**Advanced** — [click position](index.md#click-position), [click count](index.md#click-count), [force](index.md#force), [timeout](index.md#timeout).
