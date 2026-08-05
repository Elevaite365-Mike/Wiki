# Azure DevOps Test Plans

Connect elevaite365 to Azure DevOps Test Plans so scenario results are pushed automatically after each run, with pass and fail recorded against your Test Cases.

!!! info "Two Azure DevOps integrations"
    This page covers pushing **results into Test Plans**. Running scenarios **from a pipeline** is covered in [Azure DevOps pipelines](azure-devops.md). They work together, and most teams end up using both.

## Prerequisites

| Where | What you need |
| --- | --- |
| **Azure DevOps** | An account with **Basic + Test Plans** access level, or a Visual Studio Enterprise subscription |
| **elevaite365** | A **Team Admin** account, to configure the DevOps Binding on a scenario |

!!! warning "Basic access is not enough"
    Without the Basic + Test Plans access level, every Test Plans write operation is rejected with a `403` error. See [403 errors](#403-error-when-pushing-results) below.

## Step 1. Create a Personal Access Token

elevaite365 uses a PAT to authenticate with Azure DevOps when pushing results.

1. Sign in to Azure DevOps, click your **avatar** in the top right, then **Personal Access Tokens**.
2. Click **New Token**.
3. Fill in the details:
    - **Name**: something recognisable, for example `Elevaite365 Integration`
    - **Expiration**: an appropriate period, 1 year recommended
    - **Scopes**: select **Custom defined**, then tick **Test Management → Read & Write** and **Work Items → Read & Write**
4. Click **Create**, then copy the token immediately.

!!! danger "The token is shown once"
    Copy it before closing the dialog. If you lose it, create a new one and update the binding.

## Step 2. Create a Test Plan and Suite

elevaite365 pushes results into a **Static Suite** inside a Test Plan.

1. Go to your Azure DevOps project, then **Test Plans** in the left sidebar.
2. Click **New Test Plan**, enter a name, and **Create**.
3. Inside the new plan, click the **three dots** under Test Suite, choose **New Suite**, select **Static suite**, and give it a name such as `Automation`.

!!! warning "Do not use the root suite"
    The root suite is the one sharing the plan's name. You must create a child suite, or pushes fail with a `403`.

4. Copy the **Plan ID** and **Suite ID** from the browser URL:

```text
https://dev.azure.com/{org}/{project}/_testPlans/execute?planId=1&suiteId=5
```

You can also copy the whole URL and paste it into elevaite365 in the next step.

## Step 3. Configure the DevOps Binding

1. Go to **Scenarios**, select the scenario you want to integrate, and click **Edit**.
2. Scroll to **DevOps Binding** and expand it.
3. Fill in the fields.

!!! tip "Quick option"
    Paste the Azure DevOps browser URL into the **Test Plan URL** field and the three fields below are filled in for you.

| Field | Description | Example |
| --- | --- | --- |
| **Project URL** | Azure DevOps project base URL | `https://dev.azure.com/MyOrg/MyProject` |
| **Plan ID** | Test Plan ID, from the URL | `1` |
| **Suite ID** | Child Static Suite ID, from the URL | `5` |
| **Enabled** | Turns the integration on and off | On |
| **Push mode** | See [Push modes](#push-modes) | `async` |
| **PAT** | The token from Step 1 | (paste token) |

4. Click **Save DevOps Binding**.

Once saved, the PAT field shows `Configured · ending ••••XXXX`, the last four characters of the token. The full token is never stored in plain text.

## Step 4. Name your tests correctly

Test names must follow a specific format so results link to the right Test Case in Azure DevOps.

| Format | Behaviour |
| --- | --- |
| `TC<id> - <description>` | Links the result to an existing Azure DevOps Test Case by work item ID |
| `TCNEW - <description>` | Creates a new Test Case in the target suite on the first run, then reuses it |

Examples:

```text
TC42 - Login with valid credentials
TCNEW - End-to-end checkout flow
```

!!! tip "Recommendation"
    Always use `TCNEW - <description>` when creating a new test in a DevOps-enabled scenario. elevaite365 handles the rest automatically after the first run.

### How the format behaves in sync mode

In sync mode the naming format is **required** for results to appear correctly in your Test Plan.

| Test name | What happens in Azure DevOps |
| --- | --- |
| `TC42 - Login` | Recorded against Test Case #42. Pass, fail and step details are visible inside that Test Case |
| `TCNEW - Login` | A new Test Case is created the first time the pipeline runs. The test is renamed to `TC<id> - Login` in elevaite365, and future runs update the same Test Case |
| `Login` (no format) | Recorded in the Test Run but not linked to any Test Case. It will not appear under any Test Case and cannot be tracked over time |

### How the format behaves in async mode

In async mode results are always pushed regardless of the name, but the format still decides whether the test is properly registered in your Test Plan.

| Test name | What happens in Azure DevOps |
| --- | --- |
| `TCNEW - Login` | A new Test Case is created on the first run. The test is renamed to `TC<id> - Login` in elevaite365, and future runs update the same Test Case |
| `TC42 - Login` | Linked to Test Case #42. This is the expected state after a test has been through its first `TCNEW` run |
| `Login` (no format) | Results are pushed and visible in Test Runs, but the test is never registered as a named Test Case. The name in elevaite365 is not updated and the link is incomplete |

## Step 5. Run the scenario and check results

1. Go to **Scenarios**, select the scenario, and click **Run**.
2. Wait for the status to change to **Completed**.
3. After a few seconds, go to Azure DevOps, then **Test Plans**, and select the correct plan and suite.
4. Open the **Test Runs** tab. A new Test Run will have been created automatically, with pass and fail results for each test.

## Push modes

| Mode | Description | When to use |
| --- | --- | --- |
| **Async** | elevaite365 pushes results automatically after the scenario completes | Running from the UI, the API, or a pipeline where you don't need the pipeline to wait |
| **Sync** | The pipeline task `RunElevaite365ScenarioTaskV2@2` waits for results and pushes them | Running from a pipeline where pass and fail must be reflected in the pipeline result |
| **None** | Results are not pushed to Azure DevOps | Temporarily disabling the integration |

### Async mode in a pipeline

You can trigger scenarios from a pipeline in async mode. The task exits immediately after dispatching the scenario, and elevaite365 publishes results to Test Plans in the background when the scenario finishes.

Add `mode: 'async'` to the task inputs in your pipeline YAML:

```yaml
- task: RunElevaite365ScenarioTaskV2@2
  inputs:
    apiEndpoint: '$(apiEndpoint)'
    apiKey: '$(apiKey)'
    scenarioId: '<your-scenario-id>'
    mode: 'async'           # Add this manually, it is not in the exported YAML
    pollInterval: 10
    executionTimeout: 30
    jUnitOutputPath: '$(Build.SourcesDirectory)/junit'
  displayName: 'Run scenario (async)'
```

!!! warning "The pipeline step always passes"
    In async mode the step shows as passed whether or not any tests fail. Pass and fail results live in Azure Test Plans, not in the pipeline result. If you need the pipeline to go red on a failure, use **sync** mode.

!!! warning "One scenario per pipeline"
    Async mode is best suited to a single scenario per pipeline. Multiple scenario tasks will not run sequentially. Each fires immediately without waiting for the previous scenario to finish.

## How it works, async mode

```text
Run scenario from elevaite365
           │
           ▼
    Scenario completes
           │
           ▼
  elevaite365 pushes results automatically
           │
           ▼
    Azure DevOps Test Plans
  ┌──────────────────────────────┐
  │  New Test Run created        │
  │  Test Cases linked or        │
  │  auto-created (TCNEW)        │
  │  Pass / fail per test step   │
  │  Video attached (if any)     │
  └──────────────────────────────┘
```

## Troubleshooting

### Results do not appear in Azure DevOps

- Check that **Enabled** is turned on in the DevOps Binding
- Check the PAT has not expired and has the correct scopes, see [Step 1](#step-1-create-a-personal-access-token)
- Make sure the Suite ID is a child **Static** suite, not the root suite

### 403 error when pushing results

| Cause | Fix |
| --- | --- |
| License is Basic only | Upgrade to **Basic + Test Plans** in **Organization Settings → Users** |
| Suite ID is the root suite | Create a child Static suite and update the Suite ID in the binding |
| PAT is missing a scope | Recreate the PAT with both **Test Management: Read & Write** and **Work Items: Read & Write** |

### PAT has expired

Go to **Edit Scenario → DevOps Binding**, paste the new PAT into the **PAT** field, and click **Save DevOps Binding**.

### Area path permissions in sync mode

In sync mode the pipeline task runs under `System.AccessToken`, the build service account. If the Test Plan's area path has restricted permissions, the build service cannot add new Test Cases to the suite.

Grant the build service account the right permissions:

1. Go to your Azure DevOps project, then **Project Settings → Boards → Project configuration**.
2. On the **Areas** tab, find the area path used by your Test Plan, for example `Elevaite App`.
3. Click the **...** next to the area, then **Security**.
4. Find the account **Elevaite App Build Service ([Organization Name])**.
5. Set **Manage test plans** and **Manage test suites** to **Allow**.
6. Click **Save changes**.

You can also go straight there:

```text
https://dev.azure.com/{org}/{project}/_settings/areas
```

## Related

- [Azure DevOps pipelines](azure-devops.md), running scenarios from a pipeline
- [Create scenarios](../quickstart/create-scenarios.md), building the scenarios you bind
- [External API](../api/index.md), triggering runs without Azure DevOps
