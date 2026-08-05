# Endpoint reference

All paths are relative to the base path `/v1/api/external`, and every request needs the `X-API-Key` header. See [Getting started](index.md#getting-started).

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | [`/run-scenario/`](#run-a-scenario) | Schedule a scenario to run |
| `GET` | [`/results-scenario/{execution_id}/status/`](#check-execution-status) | Check execution status |
| `GET` | [`/results-scenario/{execution_id}/junit/`](#get-junit-results) | Get JUnit result URLs |
| `POST` | [`/results-scenario/artifacts/`](#get-scenario-artifacts) | Get the full artifact set |

## Run a scenario

```text
POST /run-scenario/
```

Schedules a scenario to run asynchronously. The response confirms scheduling and returns the execution ID you will use for all subsequent calls.

**Request body**

```json
{
  "scenario_id": "<scenario-id>"
}
```

**Response (201 Created)**

```json
{
  "execution_id": "<execution-id>",
  "scenario_id": "<scenario-id>",
  "scenario_name": "Order To Cash",
  "message": "Scenario Order To Cash will be run at 2025-03-27T08:13:00Z"
}
```

!!! tip "Save the execution ID"
    `execution_id` is required for every follow-up operation. Store it as soon as you receive it.

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
| `waiting` | Execution has been received and is queued |
| `scheduled` | Execution has been scheduled to run |
| `running` | Execution is currently in progress |
| `completed` | Execution has finished, results are available |

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
      "test_id": "<test-id>",
      "delay": 0,
      "status": "completed",
      "junit_url": "https://.../result.xml"
    }
  ]
}
```

**Per-test status values**

| Status | Meaning |
| --- | --- |
| `scheduled` | Test is scheduled to run |
| `running` | Test is currently executing |
| `completed` | Test has finished, JUnit result is available |
| `skip` | Test was skipped in this execution |

## Get scenario artifacts

```text
POST /results-scenario/artifacts/
```

Returns the complete set of artifacts for every test in the execution, the richest view of your results. This is the recommended endpoint for most integrations, supporting both technical and business stakeholders.

**Request body**

```json
{
  "execution_id": "<execution-id>"
}
```

**Response (200 OK)**

```json
{
  "execution_id": "<execution-id>",
  "scenario_id": "<scenario-id>",
  "scenario_name": "Order To Cash",
  "results": [
    {
      "result_id": "<result-id>",
      "test_id": "<test-id>",
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

---

Next: [Integration flow](integration.md)
