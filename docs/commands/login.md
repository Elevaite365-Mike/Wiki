# Microsoft login

## Microsoft Login

**Purpose**: a handy command for making the test log in to a Microsoft account.

**Parameters:**

- **URL**: must point to an environment restricted by Microsoft authentication. Once the login form loads on this URL, the automation takes over
- **User Account**: a dropdown showing the users added on the [Authentication tab](../quickstart/setup-test-users.md) of the Library page

## Microsoft Login With MFA

**Purpose**: a handy command for making the test log in to a Microsoft account with MFA.

**Parameters:**

- **URL**: must point to an environment restricted by Microsoft authentication. Once the login form loads on this URL, the automation takes over
- **User Account**: a dropdown showing the users added on the Authentication tab of the Library page

!!! note "Secret key required"
    MFA login relies on the **Secret Key** captured when the test user was added. See [Setup test users](../quickstart/setup-test-users.md).

    elevaite365 generates the code with its own TOTP service, so the account needs **software OATH/TOTP** enabled in your tenant, see [IT access requirements](../quickstart/access-requirements.md). Connecting an account is covered in [MFA setup](../quickstart/mfa-setup.md).

## Get MFA Code

**Purpose**: fill a field with the current MFA code of a connected user.

**Parameters:**

- **User account**: the account to take the MFA code from
- **Field selector**: where the code will be entered

---

!!! tip "The login step is added for you"
    For Microsoft applications, elevaite365 adds the login logic to the start of every new test using the default test user. You usually don't need to add these commands by hand, see [Create a test script](../tests/create-test-script.md).
