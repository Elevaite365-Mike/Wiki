# IT access requirements

This page is for your IT or security team. It covers everything they need to enable before elevaite365 can run automated tests against your environment.

!!! info "Share this page with IT"
    Everything here is a one-off setup. Send them this page. It's written for them, not for test authors.

## Overview

elevaite365 runs your automated tests by logging into your D365 environment just like a real user, using a browser, a username, a password and MFA if you require it. **Nothing needs to be installed.**

Think of it as a short checklist for your IT team, so our virtual browsers can sign in safely and reliably:

| Step | What's needed |
| --- | --- |
| **1** | Allow our automation to sign in from our fixed IP addresses |
| **2** | Create 3 dedicated D365 test user accounts for workflows and approvals |
| **2a** | Exclude those test users from mobile phone number registration |
| **3** | If you use MFA, configure it for app-based or TOTP-based methods (SMS and phone call are not needed) |

!!! note "We use our own TOTP logic"
    elevaite365 uses in-house TOTP logic, **not** Microsoft Authenticator or a standalone MFA app. Make sure **software OATH/TOTP** is enabled for these users in your tenant. See Microsoft's [Manage authentication methods](https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-methods) and [software OATH tokens](https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-oath-tokens#software-oath-tokens).

## Step 1 · Network

Automated test traffic comes from a small set of fixed IP addresses. Allowlist the IPs **for your region only**, and only if your security policy requires it.

| Region | IP addresses |
| --- | --- |
| **Australia** | `20.37.216.97`<br>`4.197.88.198` |
| **United States** | `4.155.240.150`<br>`20.115.135.55` |
| **Europe** | `135.220.28.64`<br>`135.220.222.42` |

Your region matches the URL you sign in at, see [Setup your team](setup-your-team.md#signing-in).

## Step 2 · Accounts

Create **3 dedicated test user accounts**. These are automation accounts, not real employees, and they're used for workflows, approval chains and multi-user scenarios.

- MFA is **optional** for non-production automation accounts
- If using MFA, it works with our in-house TOTP logic, not Microsoft Authenticator or a traditional MFA app
- Ensure **software OATH/TOTP** is enabled in your tenant's authentication methods policy
- If using **Conditional Access**, scope it to your test user group
- You may restrict sign-ins to your region's elevaite365 IPs

!!! danger "Never use a real person's account"
    Test users must be dedicated accounts. A real person's credentials in an automated test means locked accounts, unattributable activity and an audit problem.

Once the accounts exist, add them in the product, see [Setup test users](setup-test-users.md).

## Step 3 · Final IT checklist

- [ ] Create 3 test user accounts
- [ ] Exclude them from phone number registration
- [ ] If required, allowlist elevaite365 IPs for your region
- [ ] MFA optional; if used, configure app or TOTP
- [ ] Confirm the test users can log in successfully

## How elevaite365 connects to your environment

A simplified view of how elevaite365 operates within our Azure tenant and interacts with your non-production D365 environment.

<figure class="diagram" markdown="0">
<svg viewBox="0 0 700 404" role="img" aria-labelledby="diagram-title diagram-desc" xmlns="http://www.w3.org/2000/svg">
  <title id="diagram-title">How elevaite365 connects to your environment</title>
  <desc id="diagram-desc">Inside the elevaite365 Azure tenant, a Key Vault of encrypted test user credentials and an in-house TOTP service feed a pool of virtual browsers. Those browsers make outbound HTTPS connections only, from static regional IP addresses, to Entra ID authentication in your Azure AD tenant, which grants access to your D365 non-production environment. Conditional Access policies are optional and scoped to the test accounts.</desc>

  <g class="d-panel">
    <rect x="1" y="1" width="698" height="150" rx="10"/>
    <text class="d-panel-label" x="18" y="26">ELEVAITE365 AZURE TENANT</text>
  </g>

  <g class="d-box">
    <rect x="16" y="42" width="216" height="94" rx="8"/>
    <text x="34" y="70"><tspan class="d-h">Key Vault</tspan><tspan class="d-p" x="34" dy="20">Encrypted test user</tspan><tspan class="d-p" x="34" dy="16">credentials</tspan></text>
  </g>
  <g class="d-box">
    <rect x="242" y="42" width="216" height="94" rx="8"/>
    <text x="260" y="70"><tspan class="d-h">In-house TOTP service</tspan><tspan class="d-p" x="260" dy="20">Generates software</tspan><tspan class="d-p" x="260" dy="16">OATH/TOTP codes</tspan></text>
  </g>
  <g class="d-box d-box--accent">
    <rect x="468" y="42" width="216" height="94" rx="8"/>
    <text x="486" y="70"><tspan class="d-h">Virtual browser pool</tspan><tspan class="d-p" x="486" dy="20">Secure containers that</tspan><tspan class="d-p" x="486" dy="16">run your tests</tspan></text>
  </g>

  <g class="d-flow">
    <path d="M 232 89 L 242 89" marker-end="url(#d-arrow)"/>
    <path d="M 458 89 L 468 89" marker-end="url(#d-arrow)"/>
    <path d="M 350 151 L 350 246" marker-end="url(#d-arrow)"/>
  </g>
  <text class="d-flow-label" x="364" y="192">Outbound HTTPS only</text>
  <text class="d-flow-label" x="364" y="208">Static regional IP addresses</text>

  <g class="d-panel">
    <rect x="1" y="253" width="698" height="150" rx="10"/>
    <text class="d-panel-label" x="18" y="278">YOUR AZURE AD TENANT</text>
  </g>

  <g class="d-box">
    <rect x="16" y="294" width="216" height="94" rx="8"/>
    <text x="34" y="322"><tspan class="d-h">Entra ID authentication</tspan><tspan class="d-p" x="34" dy="20">Test users with optional</tspan><tspan class="d-p" x="34" dy="16">software OATH/TOTP</tspan></text>
  </g>
  <g class="d-box">
    <rect x="242" y="294" width="216" height="94" rx="8"/>
    <text x="260" y="322"><tspan class="d-h">D365 non-production</tspan><tspan class="d-p" x="260" dy="20">Target environment for</tspan><tspan class="d-p" x="260" dy="16">automated test runs</tspan></text>
  </g>
  <g class="d-box d-box--dashed">
    <rect x="468" y="294" width="216" height="94" rx="8"/>
    <text x="486" y="322"><tspan class="d-h">Conditional Access</tspan><tspan class="d-p" x="486" dy="20">Optional, scoped to test</tspan><tspan class="d-p" x="486" dy="16">accounts and our IPs</tspan></text>
  </g>

  <g class="d-flow">
    <path d="M 232 341 L 242 341" marker-end="url(#d-arrow)"/>
  </g>
  <g class="d-flow d-flow--dashed">
    <path d="M 468 341 L 458 341" marker-end="url(#d-arrow)"/>
  </g>

  <defs>
    <marker id="d-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z"/>
    </marker>
  </defs>
</svg>
</figure>

Traffic is **outbound HTTPS only**, from static region-specific IPs. Test user credentials are held encrypted in Key Vault.

---

Next: [Setup test users](setup-test-users.md)
