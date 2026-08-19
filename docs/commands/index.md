# Commands

Commands are the building blocks of a test step. This section documents every command, what it does and the parameters it accepts.

The groups below match the ones in the **Add step** panel, so what you see in the product is what you look up here.

## Not sure which one you need?

| What you want to do | Command |
| --- | --- |
| Put a value in a field | [Fill](entering-data.md#fill), or [Type](entering-data.md#type) if the field reacts as you type |
| Check the process worked | [Verify Field](verification.md#verify-field) |
| Handle a step that only happens sometimes | A verify step with a [conditional](../tests/conditionals.md) |
| Repeat steps for every row of a spreadsheet | [Loop](loop.md) |
| Carry a value from one step to another | [Set variable](variables.md#set-variable) |
| Deal with a popup | [Click](mouse-keyboard.md#click) for an in-app dialog, [Accept Dialog](dialogs.md#accept-dialog) for a browser alert |
| Wait for something slow | Raise the [timeout](#timeout) on the next command rather than adding a [Wait](navigation.md#wait) |

## Mouse

| Command | Purpose |
| --- | --- |
| [Click](mouse-keyboard.md#click) | Click a field or button |
| [Right Click](mouse-keyboard.md#right-click) | Right-click to open a context menu |
| [Mouse Hover](mouse-keyboard.md#mouse-hover) | Hover a field to reveal what shows on hover |
| [Move Mouse](mouse-keyboard.md#move-mouse) | Move the pointer to exact coordinates |
| [Scroll Page](mouse-keyboard.md#scroll-page) | Scroll the page vertically or horizontally |
| [Drag and Drop](mouse-keyboard.md#drag-and-drop) | Drag an element onto another |

## Keyboard

| Command | Purpose |
| --- | --- |
| [Press Key](mouse-keyboard.md#press-key) | Press a key or shortcut, such as Enter or `Control+A` |

## Entering data

| Command | Purpose |
| --- | --- |
| [Fill](entering-data.md#fill) | Paste a value straight into a field |
| [Type](entering-data.md#type) | Type a value one character at a time |
| [Select Options](entering-data.md#select-options) | Choose one or more options from a dropdown |

## Files

| Command | Purpose |
| --- | --- |
| [Upload File](entering-data.md#upload-file) | Upload a file held in a variable |
| [Catch Downloaded File](entering-data.md#catch-downloaded-file) | Save a file the test downloads to a variable |

## Verification

| Command | Purpose |
| --- | --- |
| [Verify](verification.md#verify) | Check a field's state, text, value or attributes |
| [Verify Field](verification.md#verify-field) | Check a field is available, then check its value |
| [Verify Variable](verification.md#verify-variable) | Check the value a variable is holding |

## Variables

| Command | Purpose |
| --- | --- |
| [Set variable](variables.md#set-variable) | Save a value from the page to a variable |
| [Modify variable](variables.md#modify-variable) | Transform a variable, such as trim, slice or increment |
| [Extract Value](variables.md#extract-value) | Read one value out of JSON, XML, Excel or CSV |
| [Update Value](variables.md#update-value) | Write one value into JSON, XML, Excel or CSV |

## Navigation & waiting

| Command | Purpose |
| --- | --- |
| [Navigate](navigation.md#navigate) | Go to a URL |
| [Navigate (Advanced)](navigation.md#navigate-advanced) | Go to a URL that needs NTLM sign-in or a longer wait |
| [Set URL Query Param](navigation.md#set-url-query-param) | Change one parameter in the current URL |
| [Refresh Page](navigation.md#refresh-page) | Reload the current page |
| [Wait](navigation.md#wait) | Pause for a fixed number of milliseconds |

## Window control

| Command | Purpose |
| --- | --- |
| [Maximise Window](windows-tabs.md#maximise-window) | Maximise the window in focus |
| [Zoom Window](windows-tabs.md#zoom-window) | Zoom the window to a percentage |

## Tabs

| Command | Purpose |
| --- | --- |
| [Close Tab](windows-tabs.md#close-tab) | Close the active tab and fall back to the previous one |
| [Detect New Window/Tab](windows-tabs.md#detect-new-windowtab) | Follow the test's focus onto a page that just opened |
| [Switch Tab](windows-tabs.md#switch-tab) | Focus a specific window or tab |
| [Close Page](windows-tabs.md#close-page) | Close a specific window or tab by identifier |

## Login

| Command | Purpose |
| --- | --- |
| [Microsoft Login](login.md#microsoft-login) | Sign in with a Microsoft account |
| [Microsoft Login With MFA](login.md#microsoft-login-with-mfa) | Sign in with a Microsoft account and pass MFA |
| [Get MFA Code](login.md#get-mfa-code) | Put a test user's current MFA code into a field |

## AI

| Command | Purpose |
| --- | --- |
| [Ask AI](ai.md#ask-ai) | Ask a question and save the answer to a variable |
| [Verify using AI](ai.md#verify-using-ai) | Judge a screenshot against a plain-English expectation |
| [AI Actions](ai.md#ai-actions) | Hand the browser to the AI to complete a described task |
| [Click (Using Computer Vision)](ai.md#click-using-computer-vision) | Find and click a field using a reference image |

!!! warning "Check what the AI did"
    AI steps can behave differently from one run to the next. Follow one with a verification, so a wrong result fails the test rather than passing quietly.

## Application-specific

Available only when the test's application is that product.

| Command | Application | Purpose |
| --- | --- | --- |
| [Change Company](d365-finance-operations.md#change-company) | Finance & Operations | Switch to another legal entity by company code |
| [Column Filter](d365-finance-operations.md#column-filter) | Finance & Operations | Filter a grid column |
| [Expand or Collapse Section](d365-finance-operations.md#expand-or-collapse-section) | Finance & Operations | Open or close a section |
| [Toggle Checkbox](d365-finance-operations.md#toggle-checkbox) | Finance & Operations | Set a checkbox or radio to the state you want |
| [Toggle Checkbox](d365-business-central.md#toggle-checkbox) | Business Central | Set a checkbox or radio to the state you want |
| [Expand Section](d365-business-central.md#expand-section) | Business Central | Open a collapsed section |
| [Collapse Section](d365-business-central.md#collapse-section) | Business Central | Close an expanded section |
| [Verify Checkbox](d365-business-central.md#verify-checkbox) | Business Central | Check whether a checkbox is enabled or disabled |
| [Change View](d365-project-operations.md#change-view) | Project Operations | Switch the view dropdown at the top left of the page |

## Everything else

| Command | Purpose |
| --- | --- |
| [Loop](loop.md) | Repeat steps over fields, a range, or spreadsheet rows |
| [API Request](api-request.md) | Call an endpoint and save the response |
| [Accept Dialog](dialogs.md#accept-dialog) | Answer OK to native browser alerts from here on |
| [Dismiss Dialog](dialogs.md#dismiss-dialog) | Answer Cancel to native browser alerts from here on |
| [Comment](reporting.md#comment) | Add a note to the test and its reports |
| [Take a Screenshot](reporting.md#take-a-screenshot) | Capture a full-screen image into the results |
| [Pass](pass-fail.md#pass) | End the test early and mark it passed |
| [Fail](pass-fail.md#fail) | End the test with a custom error |

## Common advanced options

Several commands share the same set of **Advanced** options. Rather than repeat them on every command, they're documented once here.

### Click position

Overrides the default (centre) position of the click on the element. Position `0, 0` points to the **top left corner of the element**, not the page. Removing these values defaults the test back to a centre click.

### Click count

Used when you want to click more than once. For example, `2` results in a double click.

### Force

Sometimes required to override an event that is blocking the click.

### Timeout

The maximum time the test will wait for the field to be visible before failing the test.

!!! info "Which commands have these?"
    Click position, click count and force apply to the click-style commands: [Click](mouse-keyboard.md#click), [Right Click](mouse-keyboard.md#right-click), [Select Options](entering-data.md#select-options), [Click (Using Computer Vision)](ai.md#click-using-computer-vision) and [Column Filter](d365-finance-operations.md#column-filter). Timeout applies more broadly, including [Fill](entering-data.md#fill), [Type](entering-data.md#type) and [Verify](verification.md#verify).
