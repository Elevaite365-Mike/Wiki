# Integration flow

## The recommended pattern

Most integrations follow the same three steps:

| Step | Action | Purpose |
| --- | --- | --- |
| **1** | `POST /run-scenario/` | Schedule the run and receive an `execution_id` |
| **2** | `GET .../status/` (poll) | Wait until status is `completed` |
| **3** | `POST /results-scenario/artifacts/` | Retrieve full results and artifacts |

```text
POST /run-scenario/                    →  execution_id
        ↓
GET  /results-scenario/{id}/status/    →  poll until "completed"
        ↓
POST /results-scenario/artifacts/      →  JUnit, video, PDF, Excel
```

!!! tip "Lightweight alternative"
    For CI/CD-only use cases where you just need pass or fail results, replace step 3 with the [JUnit endpoint](endpoints.md#get-junit-results). It returns the same per-test outcomes without the video, PDF and Excel artifacts.

## Finding ids without hard-coding them

A pipeline that has scenario ids pasted into it breaks the day someone rebuilds the scenario. Two endpoints let you avoid that.

[`GET /scenarios/`](endpoints.md#list-scenarios) returns every scenario with its id and name, so you can look one up by name at run time and fail loudly when it is missing.

[`GET /results-scenario/executions/`](endpoints.md#list-executions) finds executions you did not keep the id for. Filter by `scenario_id`, `status` and start time, for example to answer whether a scenario has already run today before triggering it again.

## Polling for completion

Executions typically start within the next minute after scheduling, so there is no value in polling aggressively. Poll [the status endpoint](endpoints.md#check-execution-status) at a sensible interval and stop once the status reaches `completed`.

Set an overall timeout in your integration so a stalled execution cannot block a pipeline indefinitely.

## Error handling

When something goes wrong, all endpoints return a consistent error structure:

```json
{
  "error": "Error message"
}
```

### Common status codes

| Code | Meaning | What to check |
| --- | --- | --- |
| `400` | Invalid request | Request body format and required fields |
| `401` | Invalid API key | The `X-API-Key` header is present and correct |
| `404` | Not found | The id is valid for your account, and the run has produced results |
| `500` | Server error | Retry; contact support if the issue persists |

A `404` on status, JUnit or artifacts does not always mean a bad id. It also comes back when the execution is real but has not produced that output yet, so treat it as "not ready" while you are still polling.

!!! warning "Do not log the API key"
    Error handling code often dumps the full request on failure. Make sure your logging redacts the `X-API-Key` header.

## Handling artifact links

Artifact URLs are signed and time-limited. Download the file during the same job that fetched the link, rather than storing the URL and fetching it later. If you need the artifact again after that, call the endpoint again for fresh links.

Any artifact field can be null. A test that was skipped produces no JUnit file, and a run that failed early may have no PDF. Check for null before you fetch.

## Support

For API access, additional keys, or integration support, contact your elevaite365 representative.
