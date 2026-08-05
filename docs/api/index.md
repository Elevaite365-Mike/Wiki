# External API

*Version 1.0 · August 2026 · Partner and customer distribution*

The elevaite365 External API provides a secure, asynchronous way to trigger test scenario executions, monitor progress, and retrieve results and artifacts, directly from your own systems.

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

    All four endpoints with request and response bodies.

    [:octicons-arrow-right-24: Endpoint reference](endpoints.md)

-   :material-transit-connection-variant:{ .lg .middle } **Integration flow**

    ---

    The recommended three-step pattern, plus error handling.

    [:octicons-arrow-right-24: Integrating](integration.md)

</div>

## Getting started

### Base URL

All endpoints are relative to the following base path:

```text
/v1/api/external
```

### Authentication

Every request must include your API key in the request header:

```text
X-API-Key: <your-api-key>
```

!!! danger "Keep your API key secure"
    Treat it like a password. Do not embed it in client-side code, and do not share it outside your integration team.

To request an API key, contact your elevaite365 representative.

## Core concepts

### The execution model

Everything in the API revolves around an `execution_id`.

A **scenario** is a predefined test workflow built in elevaite365. See [Create scenarios](../quickstart/create-scenarios.md).

An **execution** is a single runtime instance of that scenario.

When you trigger a scenario, the API returns an execution ID that you use for all follow-up operations: checking status, retrieving results, and downloading artifacts.

```text
Scenario  →  Execution  →  Status  →  Results  →  Artifacts
```

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

## Support

For API access, additional keys, or integration support, contact your elevaite365 representative. We are happy to help you design your integration and get your first scenario running.

---

Next: [Endpoint reference](endpoints.md)
