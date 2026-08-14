# API Request

**Purpose**: send an HTTP request from inside a test and optionally save what comes back.

Use it for the parts of a scenario that do not need a browser: seeding a record before the UI test runs, checking that a posted transaction reached the backend, or tearing down data afterwards.

<div class="video">
  <iframe src="https://www.youtube-nocookie.com/embed/tSXg-JaZ8CU" title="elevaite365 demo: API Request command" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture" allowfullscreen></iframe>
</div>

!!! info "Not the same as the External API"
    This command calls *your* systems from a test. The [External API](../api/index.md) is the other direction: it lets your systems trigger elevaite365 scenarios.

The step is split into two sections, **Input** and **Save Response**, chosen with the toggle at the top.

## Input

| Field | Purpose |
| --- | --- |
| **Method** | The HTTP verb, for example `GET` |
| **URL** | The endpoint to call. Required |
| **Headers** | Key and value pairs. Use **Add row** for each one. Starts empty |
| **Authentication** | How to authenticate. See below |
| **Body type** | `Empty`, or `JSON` to reveal a **Body** field to paste the payload into |

Variables can be used throughout, so a URL like `https://api.example.com/orders/{{OrderId}}` picks up an ID captured earlier in the run.

### Authentication

Picking an option adds its own fields to the step.

=== "No auth"

    Nothing extra. Use it for open endpoints, or when you are passing a credential yourself as a header.

=== "Basic auth"

    - **Username**
    - **Password**

=== "Bearer token"

    - **Bearer token**: the token to send

=== "OAuth 2.0"

    - **Token URL**: where to fetch the token from
    - **Client ID**
    - **Client Secret**
    - **Scope**

    The step fetches a token, then makes the call with it.

## Save Response

Each field saves part of the response to a variable. All three are optional: leave one blank and that part is thrown away.

| Field | Saves |
| --- | --- |
| **Status Code** | The HTTP status the call returned |
| **Response time** | How long the call took |
| **Response Body** | The body the endpoint returned |

Nothing is checked here. The step stores the values, and you assert on them afterwards with [Verify Variable](verification.md#verify-variable).

## Working with the response

The body arrives as one lump of text. To get at a single field, follow the API Request with [Extract Value](variables.md#extract-value), pointing a JSON path at the part you want:

| # | Step |
| --- | --- |
| 1 | API Request, saving the body to a variable |
| 2 | Extract Value, format JSON, path `$.id` |
| 3 | [Verify Variable](verification.md#verify-variable), or use the value in a later step |

!!! tip "Checking the call succeeded"
    Save the status code, then assert on it with [Verify Variable](verification.md#verify-variable). A test that posts data and never checks the response will pass while the data quietly fails to arrive.
