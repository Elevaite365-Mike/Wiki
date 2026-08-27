# External API

*API version 1.1 · August 2026 · Partner and customer distribution*

The elevaite365 External API provides a secure, asynchronous way to list scenarios, trigger executions, monitor progress, and retrieve results and artifacts, directly from your own systems.

It is designed for CI/CD pipelines, partner integrations, automated testing workflows and external reporting systems.

!!! tip "Using Azure DevOps?"
    There is a ready-made extension that wraps all of this. See [Azure DevOps pipelines](../integrations/azure-devops.md) before building against the API by hand.

<div class="grid cards" markdown>

-   :material-key-variant:{ .lg .middle } **Getting started**

    ---

    Base URL, authentication and how to get a key. Start here.

    [:octicons-arrow-right-24: Below](#getting-started)

-   :material-api:{ .lg .middle } **Endpoints**

    ---

    Every endpoint with request and response bodies, each with a Try it panel.

    [:octicons-arrow-right-24: Endpoint reference](endpoints.md)

-   :material-transit-connection-variant:{ .lg .middle } **Integration flow**

    ---

    The recommended three-step pattern, plus error handling.

    [:octicons-arrow-right-24: Integrating](integration.md)

</div>

## Getting started

### Base URL

The API has a host per region. Use the one your instance lives in, and append the base path `/v1/api/external`.

| Region | Base URL |
| --- | --- |
| Australia | `https://api.elevaite365.com/v1/api/external` |
| Europe | `https://eu-api.elevaite365.com/v1/api/external` |
| United States | `https://us-api.elevaite365.com/v1/api/external` |
| Singapore | `https://sg-api.elevaite365.com/v1/api/external` |

The API host is not the same as the host you sign in to. If you are unsure which region you are on, check the address you use for the product against the table in [Setup your team](../quickstart/setup-your-team.md).

Paths in this documentation are written relative to that base, so `/scenarios/` means `https://api.elevaite365.com/v1/api/external/scenarios/` on the Australian host.

### Authentication

Every request must include your API key in the request header:

```text
X-API-Key: <your-api-key>
```

!!! danger "Keep your API key secure"
    Treat it like a password. Do not embed it in client-side code, and do not share it outside your integration team.

To request an API key, contact your elevaite365 representative.

Once you have one, you can call any endpoint straight from the [endpoint reference](endpoints.md#try-it-from-this-page). You paste the key into the page yourself, it goes only to your own instance, and nothing is stored.

## Core concepts

### The execution model

Everything in the API revolves around an `execution_id`.

A **scenario** is a predefined test workflow built in elevaite365. See [Create scenarios](../quickstart/create-scenarios.md).

An **execution** is a scheduled instance of that scenario.

When you trigger a scenario, the API returns an execution ID that you use for all follow-up operations: checking status, retrieving results, and downloading artifacts.

```text
Scenario  →  Execution  →  Status  →  Results  →  Artifacts
```

### One execution, one or many runs

An execution is scheduled in one of three ways, and that changes how many runs sit underneath it.

| Type | What it is | Runs |
| --- | --- | --- |
| `manual` | Triggered by hand, or through this API | One |
| `one-off` | Scheduled once, for a specific time | One |
| `recurring` | Repeats on a cadence | Many, over time |

For manual and one-off executions the distinction rarely matters, because the execution is the run.

For a recurring execution the `execution_id` identifies the whole series. Every occurrence records a new run under the same id, and status, artifact and JUnit responses always describe the **most recent** run. There is no way to page back through earlier occurrences of a recurring execution.

If you need each run kept separate, schedule through [`POST /run-scenario/`](endpoints.md#run-a-scenario) rather than pointing your integration at a recurring schedule.

### Asynchronous by design

Scenario executions run asynchronously, typically starting within the next minute after scheduling.

There are no long-running HTTP requests to manage, which keeps the API scalable for large test runs. You schedule an execution, poll for status, and collect results when the run is complete.

## Key design principles

| Principle | What it means |
| --- | --- |
| **Asynchronous execution** | No long-running HTTP requests; scalable for large test runs |
| **Execution-centric model** | Everything ties back to an `execution_id`, enabling tracking, auditing and retries |
| **Dual result strategy** | A machine-focused JUnit endpoint alongside a rich artifacts endpoint for human and reporting needs |
| **Rich artifact support** | JUnit, video, PDF and Excel outputs serve both technical and business stakeholders |
| **Discoverable** | Scenario and execution listings mean an integration can find what it needs without ids hard-coded into a pipeline |

## Support

For API access, additional keys, or integration support, contact your elevaite365 representative. We are happy to help you design your integration and get your first scenario running.

---

Next: [Endpoint reference](endpoints.md)
