# Navigation & waiting

## Navigate

**Purpose**: navigate the current page to a new URL.

**Parameters**: a single parameter where you input the URL for the test to redirect to.

!!! note "Recorded Navigate steps"
    The recorder adds a Navigate command automatically if it believes a URL change may have been made manually. Review and remove any that aren't required, see [Using the test recorder](../tests/test-recorder.md).

## Navigate (Advanced)

**Purpose**: the same as Navigate, with authentication and a longer timeout available.

**Parameters:**

- **Navigate to**: the URL for the test to open

**Advanced:**

- **NTLM Auth**: the account to authenticate with. The dropdown lists the users added on the [Authentication tab](../quickstart/setup-test-users.md) of the Library page. Defaults to `None`
- **Timeout (ms)**: how long to wait for the page. Defaults to `180000`, three minutes

### When to use it

Some sites answer a request with the browser's own sign-in box, the small native prompt asking for a username and password before the page renders. Nothing in that box is part of the page, so a [Fill](entering-data.md#fill) or [Type](entering-data.md#type) step cannot reach it.

Navigate (Advanced) answers it for you. Pick the account on the step, and the credentials go with the request.

!!! info "Not for a sign-in form on the page"
    If the login is a form you can see and click, that is an ordinary page. Use [Navigate](#navigate) and fill it in, or [Microsoft Login](login.md#microsoft-login) for a Microsoft account.

## Set URL Query Param

**Purpose**: update a parameter in the URL. For example:

```text
https://finance.com?cmp=1  →  https://finance.com?cmp=2
```

**Parameters:**

- **Param name**: the query parameter in the URL. In the example above, `cmp`
- **Param value**: the value you want to assign to it. In the example above, `2`

## Refresh Page

**Purpose**: reload the current page.

**Parameters**: none.

## Wait

**Purpose**: wait for a specific period.

**Parameters**: a single parameter setting the duration the test should wait for, in milliseconds.

!!! tip "Prefer a timeout over a wait"
    A fixed Wait is simultaneously too short on a slow day and too slow every other day. Where you can, rely on the [timeout](index.md#timeout) on the next command instead. It continues as soon as the field is ready. Keep Wait for the cases where nothing on screen signals readiness, like a batch job.
