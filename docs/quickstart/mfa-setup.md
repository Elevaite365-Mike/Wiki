# MFA setup for test users

Connect a test user's Microsoft account to elevaite365's built-in authenticator, so automated tests can sign in to environments that require MFA.

You will work in **two browser tabs at once**, moving a secret key and a verification code between them.

!!! info "Before you start"
    Your IT team needs **software OATH/TOTP** enabled for the account first. elevaite365 generates the codes itself rather than using Microsoft Authenticator. See [IT access requirements](access-requirements.md).

## Step 1. Prepare your browser

Open two tabs and keep both available:

| Tab | Where |
| --- | --- |
| **Tab 1** | <https://account.microsoft.com/security> |
| **Tab 2** | elevaite365, on the **Authentication** section of your application |

## Step 2. Start MFA setup in elevaite365

1. In the elevaite365 tab, open the **Authentication** section.
2. Click **Setup MFA**.
3. A guide pops up. Click **Next** through it until you reach the page that asks for the secret key.

!!! warning "If you see \"Code\" instead of \"Secret key\""
    Microsoft is offering only its own authenticator for this account. Your IT team needs to allow non-Microsoft authenticators for the user before you can continue.

## Step 3. Add the sign-in method in Microsoft

Switch to the Microsoft Security tab.

1. Select **Security Info** from the menu.
2. Click **Add sign-in method**.
3. Choose **Microsoft Authenticator**.
4. Click **I want to use a different authenticator app**.
5. Click **Next** to reach the QR code screen.
6. Click **Can't scan the QR code?** to reveal the manual entry option.
7. Click **Copy** to copy the secret key to your clipboard.

## Step 4. Enter the key in elevaite365

1. Switch back to the elevaite365 tab.
2. Paste the secret key into the **Secret Key** field.
3. Click **Next**.
4. elevaite365 shows a 6-digit code. Copy it, then click **Done**.

!!! tip "Move quickly"
    The verification code refreshes every 30 seconds. Copy it and paste it straight away, and if it expires, generate a fresh one rather than trying to submit the old one.

## Step 5. Verify in Microsoft

1. Switch to the Microsoft Security tab.
2. Paste the verification code into the Microsoft verification field.
3. Click **Next**, then **Done**.

## Verifying the setup

Your MFA configuration is now active. Confirm it worked by checking that:

- The authenticator entry appears in the Microsoft account's security settings
- elevaite365 can generate valid verification codes
- A test sign-in succeeds

Once this is set up, the account's **Secret Key** is stored against the test user in elevaite365, and the [Microsoft Login With MFA](../commands/login.md#microsoft-login-with-mfa) and [Get MFA Code](../commands/login.md#get-mfa-code) commands can use it.

## Related

- [Setup test users](setup-test-users.md), where the Secret Key is stored
- [IT access requirements](access-requirements.md), the tenant configuration this depends on
- [Microsoft login commands](../commands/login.md), using MFA inside a test
