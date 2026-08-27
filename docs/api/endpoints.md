# Endpoint reference

Every path below is relative to your regional base URL, and every request needs the `X-API-Key` header. See [Getting started](index.md#getting-started).

## Scenarios

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | [`/scenarios/`](#list-scenarios) | List every scenario you can run |
| `GET` | [`/scenarios/{scenario_id}/`](#get-scenario-detail) | Read one scenario and its ordered steps |
| `POST` | [`/run-scenario/`](#run-a-scenario) | Schedule a scenario to run |

## Executions and results

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | [`/results-scenario/executions/`](#list-executions) | List executions, with filters |
| `GET` | [`/results-scenario/{execution_id}/status/`](#check-execution-status) | Check execution status |
| `GET` | [`/results-scenario/{execution_id}/junit/`](#get-junit-results) | Get JUnit result URLs |
| `POST` | [`/results-scenario/artifacts/`](#get-scenario-artifacts) | Get the full artifact set |

## Azure DevOps Test Plans

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | [`/results-scenario/{execution_id}/report/`](#get-a-step-level-report) | Step-level report for Test Plans publishing |
| `POST` | [`/test/{test_id}/assign-tc/`](#assign-a-test-case-id) | Bind a test to a DevOps Test Case id |
| `GET` | [`/scenarios/{scenario_id}/lookup/`](#look-up-a-scenario) | Validate a scenario id |

These three exist for the [Azure DevOps Test Plans extension](../integrations/azure-devops-test-plans.md). You can call them yourself, but most integrations do not need to.

## Try it from this page

Each endpoint below has a **Try it** panel that builds the request against your own instance, sends it, and shows the response.

Open any panel and it asks for your region and API key first, then whatever that endpoint needs. Type the key once and the other panels on the page pick it up, so you only enter it at the endpoint you happened to open. **Clear** removes it from all of them.

!!! warning "These are real calls against your instance"
    Nothing here is a sandbox. Running a scenario schedules an actual test run, assigning a Test Case id renames a test, and everything you send is recorded against your account.

!!! danger "Use a key you can rotate"
    Your key is held in the browser tab, sent only to the region you picked, and dropped when you clear the field or leave the page. It is never stored and never sent to this help site. Even so, do not paste a production key into a browser on a shared or unmanaged machine, and rotate any key you have typed into a page you do not control.

!!! info "Sending from the browser needs the API to allow it"
    A browser will only send a cross-origin request when the API says the origin is allowed, and today the External API allows browser calls from Azure DevOps only. Until this site is added to that list, **Send request** cannot complete and the panel falls back to **Show as curl**.

    The curl command is the same request, built from what you typed. Run it from a terminal, and read the key from an environment variable rather than pasting it into your shell history:

    ```bash
    read -rs ELEVAITE365_API_KEY && export ELEVAITE365_API_KEY
    ```

## List scenarios

```text
GET /scenarios/
```

Returns every scenario available to your organisation, sorted by name. Start here when you need a `scenario_id` and do not have one.

**Response (200 OK)**

```json
{
  "scenarios": [
    {
      "id": "65f2a1b3c4d5e6f7g8h9i0j1",
      "name": "Order To Cash"
    }
  ]
}
```

`name` is an empty string when the scenario has no title set.

<div data-tryit
     data-method="GET"
     data-path="/scenarios/">
</div>

## Get scenario detail

```text
GET /scenarios/{scenario_id}/
```

Returns a scenario's metadata and its ordered list of steps. No execution is involved, so you can call this before running anything.

**Response (200 OK)**

```json
{
  "scenario_id": "65f2a1b3c4d5e6f7g8h9i0j1",
  "name": "Order To Cash",
  "created_at": "2025-03-01T09:00:00Z",
  "updated_at": "2025-03-20T14:22:00Z",
  "created_by": "Jane Doe",
  "continue_on_failure": false,
  "folder_id": "65f2a1b3c4d5e6f7g8h9i0j1",
  "folder_name": "Regression",
  "tests": [
    {
      "type": "test",
      "test_id": "65f2a1b3c4d5e6f7g8h9i0j1",
      "test_name": "Login flow",
      "application_name": "Finance",
      "created_by": "Jane Doe",
      "created_at": "2025-02-11T08:00:00Z",
      "updated_at": "2025-03-19T16:40:00Z"
    },
    {
      "type": "delay",
      "delay_minutes": 5
    }
  ]
}
```

**Step entries**

The `tests` array holds the scenario in run order, and each entry is one of two shapes.

| `type` | Fields | Meaning |
| --- | --- | --- |
| `test` | `test_id`, `test_name`, `application_name`, `created_by`, `created_at`, `updated_at` | A test from your library. The metadata fields are null when the test has been removed |
| `delay` | `delay_minutes` | A pause before the next step. No test metadata |

`continue_on_failure` tells you whether the remaining steps run after one fails.

<div data-tryit
     data-method="GET"
     data-path="/scenarios/{scenario_id}/"
     data-params="scenario_id:path:Scenario ID:65f2a1b3c4d5e6f7g8h9i0j1">
</div>

## Run a scenario

```text
POST /run-scenario/
```

Schedules a scenario to run in the next minute. The response confirms scheduling and returns the execution ID you will use for all subsequent calls.

**Request body**

| Field | Required | Description |
| --- | --- | --- |
| `scenario_id` | Yes | The scenario to run |
| `build_uri` | No | An Azure DevOps build URI to record against the run, so results can be traced back to the pipeline build that started it |
| `push_mode` | No | How results reach Azure DevOps Test Plans: `async`, `sync` or `none`. Leave it out to use the scenario's own binding |

```json
{
  "scenario_id": "65f2a1b3c4d5e6f7g8h9i0j1"
}
```

**Response (201 Created)**

```json
{
  "execution_id": "65f2a1b3c4d5e6f7g8h9i0j1",
  "scenario_id": "65f2a1b3c4d5e6f7g8h9i0j1",
  "scenario_name": "Order To Cash",
  "message": "Scenario Order To Cash will be run at 2025-03-27T08:13:00Z"
}
```

!!! tip "Save the execution ID"
    `execution_id` is required for every follow-up operation. Store it as soon as you receive it.

**Push modes**

| Value | Who publishes to Test Plans |
| --- | --- |
| `async` | elevaite365 publishes when the scenario finishes |
| `sync` | You publish, from your own pipeline |
| `none` | Nothing is published |

<div data-tryit
     data-method="POST"
     data-path="/run-scenario/"
     data-params="scenario_id:body:Scenario ID:65f2a1b3c4d5e6f7g8h9i0j1,?build_uri:body:Build URI:vstfs:///Build/Build/12345,?push_mode:body:Push mode:async"
     data-warning="This schedules a real run of the scenario on your instance.">
</div>

## List executions

```text
GET /results-scenario/executions/
```

Returns executions for your organisation, newest run first, with the progress and timing of the latest run of each. Use it to find an `execution_id` you did not keep, or to build a dashboard of recent activity.

**Query parameters**

| Parameter | Description |
| --- | --- |
| `status` | Comma-separated: `waiting`, `scheduled`, `running`, `completed` |
| `type` | Comma-separated: `one-off`, `manual`, `recurring` |
| `scenario_id` | Only executions for this scenario |
| `started_from` | Earliest start time of the latest run, inclusive, ISO 8601 |
| `started_to` | Latest start time of the latest run, inclusive, ISO 8601 |
| `limit` | Page size, 1 to 100, default 20 |
| `offset` | Skip this many results, default 0 |

**Response (200 OK)**

```json
{
  "executions": [
    {
      "execution_id": "65f2a1b3c4d5e6f7g8h9i0j1",
      "scenario_id": "65f2a1b3c4d5e6f7g8h9i0j1",
      "scenario_name": "Order To Cash",
      "status": "completed",
      "type": "manual",
      "executed_by": "External API",
      "started_at": "2025-03-27T08:13:00Z",
      "completed_at": "2025-03-27T08:41:00Z"
    }
  ],
  "total": 42,
  "limit": 20,
  "offset": 0
}
```

**Execution types**

| `type` | How it was scheduled |
| --- | --- |
| `manual` | Triggered by hand, or through this API |
| `one-off` | Scheduled once for a specific time |
| `recurring` | Repeats on a cadence |

!!! note "Recurring executions report their latest run"
    A recurring execution keeps the same `execution_id` across every occurrence. `status`, `started_at` and `completed_at` describe the most recent run only, and earlier occurrences are not listed here. See [the execution model](index.md#the-execution-model).

`started_at` is empty while an execution is still `waiting`, and `completed_at` is empty until the latest run finishes.

<div data-tryit
     data-method="GET"
     data-path="/results-scenario/executions/"
     data-params="?status:query:Status:running,?type:query:Type:manual,?scenario_id:query:Scenario ID:65f2a1b3c4d5e6f7g8h9i0j1,?limit:query:Limit:20">
</div>

## Check execution status

```text
GET /results-scenario/{execution_id}/status/
```

Returns the current status of an execution. Poll this endpoint until the status reaches `completed`, then retrieve your results.

**Response (200 OK)**

```json
{
  "status": "running",
  "message": "Scenario is currently executing"
}
```

**Status values**

| Status | Meaning |
| --- | --- |
| `waiting` | Execution has been received but has not started |
| `scheduled` | Execution has been queued to run |
| `running` | Execution is currently in progress |
| `completed` | Execution has finished, results are available |

For a recurring execution this describes the latest run, so the status can move back from `completed` to `scheduled` when the next occurrence comes around.

<div data-tryit
     data-method="GET"
     data-path="/results-scenario/{execution_id}/status/"
     data-params="execution_id:path:Execution ID:65f2a1b3c4d5e6f7g8h9i0j1">
</div>

## Get JUnit results

```text
GET /results-scenario/{execution_id}/junit/
```

Returns JUnit XML result URLs for every test in the execution. This is the lightweight, machine-readable option, ideal for CI/CD pipelines, automated validation gates, and integration with test reporting tools.

**Response (200 OK)**

```json
{
  "junit_results": [
    {
      "test_id": "65f2a1b3c4d5e6f7g8h9i0j1",
      "delay": 0,
      "status": "completed",
      "junit_url": "https://.../result.xml"
    }
  ]
}
```

`junit_url` is null when a test has not produced a JUnit file yet. `delay` is the wait in minutes before that test starts.

**Per-test status values**

| Status | Meaning |
| --- | --- |
| `scheduled` | Test is scheduled to run |
| `running` | Test is currently executing |
| `completed` | Test has finished, JUnit result is available |
| `skip` | Test was skipped in this execution |

<div data-tryit
     data-method="GET"
     data-path="/results-scenario/{execution_id}/junit/"
     data-params="execution_id:path:Execution ID:65f2a1b3c4d5e6f7g8h9i0j1">
</div>

## Get scenario artifacts

```text
POST /results-scenario/artifacts/
```

Returns the complete set of artifacts for every test in the execution, the richest view of your results. This is the recommended endpoint for most integrations, supporting both technical and business stakeholders.

**Request body**

```json
{
  "execution_id": "65f2a1b3c4d5e6f7g8h9i0j1"
}
```

**Response (200 OK)**

```json
{
  "execution_id": "65f2a1b3c4d5e6f7g8h9i0j1",
  "scenario_id": "65f2a1b3c4d5e6f7g8h9i0j1",
  "scenario_name": "Order To Cash",
  "results": [
    {
      "result_id": "65f2a1b3c4d5e6f7g8h9i0j1",
      "test_id": "65f2a1b3c4d5e6f7g8h9i0j1",
      "test_name": "Login test",
      "status": "completed",
      "junit_url": "https://.../result.xml",
      "video_url": "https://.../video.mp4",
      "pdf_url": "https://.../report.pdf",
      "excel_url": "https://.../report.xlsx"
    }
  ]
}
```

### Available artifacts

| Artifact | Description | Best for |
| --- | --- | --- |
| **JUnit XML** | Machine-readable test results | CI/CD and automated validation |
| **Video** | Full recording of the test execution | Debugging failures, evidence |
| **PDF** | Human-readable test report | Business reporting, audit and compliance |
| **Excel** | Structured data export | Dashboards and downstream analysis |

!!! warning "Artifact links expire"
    Every URL in the response is a signed, time-limited link. Download what you need soon after the call, and request fresh links rather than storing the URLs. Any of them can be null when that artifact was not produced.

<div data-tryit
     data-method="POST"
     data-path="/results-scenario/artifacts/"
     data-params="execution_id:body:Execution ID:65f2a1b3c4d5e6f7g8h9i0j1">
</div>

## Get a step-level report

```text
GET /results-scenario/{execution_id}/report/
```

Returns everything [the artifacts endpoint](#get-scenario-artifacts) returns, plus per-step outcomes, the index of the first failed step, timings, and the scenario's Azure DevOps binding. The Test Plans extension uses it to build iteration details.

This is additive. If you only need download links, stay on `/artifacts/`.

**Query parameters**

| Parameter | Description |
| --- | --- |
| `limit` | Page size, 1 to 500, default 100 |
| `offset` | Skip this many results, default 0 |

**Response (200 OK)**

```json
{
  "execution_id": "65f2a1b3c4d5e6f7g8h9i0j1",
  "scenario_id": "65f2a1b3c4d5e6f7g8h9i0j1",
  "team_slug": "acme-qa",
  "scenario_name": "Order To Cash",
  "scenario_binding": {
    "project_url": "https://dev.azure.com/contoso/MyProj",
    "plan_id": 42,
    "suite_id": 77
  },
  "status": "completed",
  "started_at": "2025-03-27T08:13:00Z",
  "completed_at": "2025-03-27T08:41:00Z",
  "results": [
    {
      "result_id": "65f2a1b3c4d5e6f7g8h9i0j1",
      "test_id": "65f2a1b3c4d5e6f7g8h9i0j1",
      "test_name": "TC110855 - Create sales order",
      "tc_id": 110855,
      "is_new": false,
      "status": "failed",
      "duration_ms": 48200,
      "started_at": "2025-03-27T08:13:04Z",
      "completed_at": "2025-03-27T08:13:52Z",
      "steps": [
        {
          "index": 0,
          "action": "click",
          "target": "Submit button",
          "status": "passed",
          "error": null,
          "screenshot_url": "https://.../step1.png"
        }
      ],
      "failed_step_index": 4,
      "error_message": "Element not found",
      "error_stack": null,
      "video_url": "https://.../video.mp4",
      "video_size_bytes": null,
      "junit_url": "https://.../result.xml",
      "pdf_url": "https://.../report.pdf"
    }
  ],
  "pagination": {
    "limit": 100,
    "offset": 0,
    "total": 235,
    "has_more": true
  }
}
```

**Reading a result**

| Field | Meaning |
| --- | --- |
| `tc_id` | Test Case id parsed from the test name. Null when the test is named `TCNEW - ...` |
| `is_new` | True when the name starts with `TCNEW - `, which is the auto-create path |
| `failed_step_index` | Zero-based index of the first failed step. Null when the test passed |
| `error_message` | Last log entry of that first failed step. Null when the test passed |
| `scenario_binding` | Null unless the scenario has all of `project_url`, `plan_id` and `suite_id` set |

**Step status values**

| Status | Meaning |
| --- | --- |
| `passed` | Step succeeded |
| `failed` | Step failed |
| `skipped` | Step was skipped |
| `not-run` | The underlying status was not recognised |

`screenshot_url` is always null for a failed step, and null when no screenshot was captured. `error_stack` and `video_size_bytes` are always null; the runner does not record either.

<div data-tryit
     data-method="GET"
     data-path="/results-scenario/{execution_id}/report/"
     data-params="execution_id:path:Execution ID:65f2a1b3c4d5e6f7g8h9i0j1,?limit:query:Limit:100,?offset:query:Offset:0">
</div>

## Assign a Test Case id

```text
POST /test/{test_id}/assign-tc/
```

Binds a test to an Azure DevOps Test Case, by renaming it from `TCNEW - <rest>` to `TC<tc_id> - <rest>`. After that, every later run links to the same Test Case. The Test Plans extension calls this once, straight after it auto-creates the Test Case in DevOps.

The call is idempotent. Sending the same `tc_id` a second time changes nothing and still returns 200.

**Request body**

```json
{
  "tc_id": 110999
}
```

**Response (200 OK)**

```json
{
  "test_id": "65f2a1b3c4d5e6f7g8h9i0j1",
  "tc_id": 110999,
  "testName": "TC110999 - Create sales order",
  "message": "Test assigned to tc_id"
}
```

!!! warning "The name comes back under two different keys"
    A fresh assignment returns the new name as `testName`. The repeat call returns the unchanged name as `test_name`, with the message `Test already assigned to this tc_id`. Read both keys.

**Errors worth handling**

| Code | Cause |
| --- | --- |
| `400` | Malformed `test_id`, or a `tc_id` that is missing, not an integer, or below 1 |
| `404` | No test with that id |
| `409` | The test is not `TCNEW - ` prefixed, or another test in your team already uses that `tc_id` |

<div data-tryit
     data-method="POST"
     data-path="/test/{test_id}/assign-tc/"
     data-params="test_id:path:Test ID:65f2a1b3c4d5e6f7g8h9i0j1,tc_id#:body:Test Case ID:110999"
     data-warning="This renames the test in your library. It cannot be undone from here.">
</div>

## Look up a scenario

```text
GET /scenarios/{scenario_id}/lookup/
```

Confirms a scenario id resolves, and returns just enough to show what it points at. The Test Plans extension uses it to validate the id an administrator pastes into the configuration screen.

**Response (200 OK)**

```json
{
  "scenario_id": "65f2a1b3c4d5e6f7g8h9i0j1",
  "scenario_name": "Order To Cash",
  "test_count": 12,
  "binding_configured": true
}
```

`test_count` counts real tests only, so delay steps are excluded. `binding_configured` is true when the scenario has `project_url`, `plan_id` and `suite_id` all set, whether or not the binding is switched on.

This is the one endpoint that answers browser preflight requests, and it does so only for `dev.azure.com` and `*.visualstudio.com` origins.

<div data-tryit
     data-method="GET"
     data-path="/scenarios/{scenario_id}/lookup/"
     data-params="scenario_id:path:Scenario ID:65f2a1b3c4d5e6f7g8h9i0j1">
</div>

---

Next: [Integration flow](integration.md)
