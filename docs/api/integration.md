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
| `404` | Execution not found | The `execution_id` is valid for your account |
| `500` | Server error | Retry; contact support if the issue persists |

!!! warning "Do not log the API key"
    Error handling code often dumps the full request on failure. Make sure your logging redacts the `X-API-Key` header.

## Support

For API access, additional keys, or integration support, contact your elevaite365 representative.
