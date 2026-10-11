# Microsoft login

## Microsoft Login

**Purpose**: a handy command for making the test log in to a Microsoft account.

**Parameters:**

- **URL**: optional. Point it at an environment restricted by Microsoft authentication. Once the login form loads on this URL, the automation takes over. Leave it empty to sign in on the current page, see [Logging in from the current page](#logging-in-from-the-current-page)
- **User Account**: a dropdown showing the users added on the [Authentication tab](../quickstart/setup-test-users.md) of the Library page

## Microsoft Login With MFA

**Purpose**: a handy command for making the test log in to a Microsoft account with MFA.

**Parameters:**

- **URL**: optional. Works the same as on [Microsoft Login](#microsoft-login): leave it empty to sign in on the current page
- **User Account**: a dropdown showing the users added on the Authentication tab of the Library page

!!! note "Secret key required"
    MFA login relies on the **Secret Key** captured when the test user was added. See [Setup test users](../quickstart/setup-test-users.md).

    elevaite365 generates the code with its own TOTP service, so the account needs **software OATH/TOTP** enabled in your tenant, see [IT access requirements](../quickstart/access-requirements.md). Connecting an account is covered in [MFA setup](../quickstart/mfa-setup.md).

## Logging in from the current page

Both login commands can run without a URL. When the **URL** field is empty, the command stays on the page the test is already on and starts the login there, with no redirect.

Use this when you can't reach the Microsoft login screen with a direct link. Some apps show their own landing page first, and you have to click a **Sign in** button before the Microsoft form appears. In that case:

1. Navigate to the app's landing page.
2. Click the button that opens the Microsoft login.
3. Add **Microsoft Login** or **Microsoft Login With MFA** with the URL left empty.

## Get MFA Code

**Purpose**: fill a field with the current MFA code of a connected user.

**Parameters:**

- **User account**: the account to take the MFA code from
- **Field selector**: where the code will be entered

---

!!! tip "The login step is added for you"
    For Microsoft applications, elevaite365 adds the login logic to the start of every new test using the default test user. You usually don't need to add these commands by hand, see [Create a test script](../tests/create-test-script.md).
