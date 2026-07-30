# Navigation & waiting

## Navigate

**Purpose**: navigate the current page to a new URL.

**Parameters**: a single parameter where you input the URL for the test to redirect to.

!!! note "Recorded Navigate steps"
    The recorder adds a Navigate command automatically if it believes a URL change may have been made manually. Review and remove any that aren't required, see [Using the test recorder](../tests/test-recorder.md).

## Set URL Query Param

**Purpose**: update a parameter in the URL. For example:

```text
https://finance.com?cmp=1  →  https://finance.com?cmp=2
```

**Parameters:**

- **Param name**: the query parameter in the URL. In the example above, `cmp`
- **Param value**: the value you want to assign to it. In the example above, `2`

## Wait

**Purpose**: wait for a specific period.

**Parameters**: a single parameter setting the duration the test should wait for, in milliseconds.

!!! tip "Prefer a timeout over a wait"
    A fixed Wait is simultaneously too short on a slow day and too slow every other day. Where you can, rely on the [timeout](index.md#timeout) on the next command instead. It continues as soon as the field is ready. Keep Wait for the cases where nothing on screen signals readiness, like a batch job.
