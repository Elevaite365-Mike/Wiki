# Setup test users

A test user is a dummy user set up for the automation to use when logging in to your environments.

!!! danger "Never use a real person's identity"
    Test users must be dedicated accounts. A real person's credentials in an automated test means locked accounts, unattributable activity and an audit problem.

## Add a test user

1. Select your application.
2. Open the **Authentication** tab to view and add test users.
3. Click **Add**. A dialog appears with several options:

| Field | Notes |
| --- | --- |
| **Email** | The test account's sign-in address |
| **Password** | Not readable in the dialog once submitted |
| **Description** | Use this as a label |
| **Secret Key** | The secret key provided during Microsoft login, used when setting up MFA |

Once submitted, your new user displays in the table.

## Default user

On the far right of the table there's an option to select the **default application** for the user.

For Microsoft applications, this user pre-fills the login command — so whenever a new test is created, the login defaults to that user.

---

Next: [Create components](create-components.md)
