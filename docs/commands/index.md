# Commands

Commands are the building blocks of a test step. This section documents every command, what it does and the parameters it accepts.

## All commands

| Command | Purpose | Page |
| --- | --- | --- |
| [Click](mouse-keyboard.md#click) | Left-click somewhere on the page | Mouse & keyboard |
| [Right Click](mouse-keyboard.md#right-click) | Right-click somewhere on the page | Mouse & keyboard |
| [Click (Computer Vision)](ai.md#click-using-computer-vision) | Find and click a field from a reference image | AI commands |
| [Mouse Hover](mouse-keyboard.md#mouse-hover) | Hover over an element | Mouse & keyboard |
| [Move Mouse](mouse-keyboard.md#move-mouse) | Move the mouse to exact coordinates | Mouse & keyboard |
| [Scroll Page](mouse-keyboard.md#scroll-page) | Scroll vertically or horizontally | Mouse & keyboard |
| [Press Key](mouse-keyboard.md#press-key) | Simulate keyboard keys and shortcuts | Mouse & keyboard |
| [Drag and Drop](mouse-keyboard.md#drag-and-drop) | Drag an element on the page | Mouse & keyboard |
| [Fill](entering-data.md#fill) | Paste a value into a field | Entering data |
| [Type](entering-data.md#type) | Type a value character by character | Entering data |
| [Select Options](entering-data.md#select-options) | Select dropdown or multi-select values | Entering data |
| [Upload File](entering-data.md#upload-file) | Upload a file from a variable | Entering data |
| [Catch Downloaded File](entering-data.md#catch-downloaded-file) | Save a downloaded file to a variable | Entering data |
| [Verify](verification.md#verify) | Verify something on the page | Verification |
| [Verify Field](verification.md#verify-field) | Check a field's state, then its value | Verification |
| [Verify Using AI](ai.md#verify-using-ai) | Natural-language evaluation of a screenshot | AI commands |
| [Set Variable](variables.md#set-variable) | Save a value from the page to a variable | Variables |
| [Modify Variable](variables.md#modify-variable) | Transform a variable's value | Variables |
| [Navigate](navigation.md#navigate) | Go to a new URL | Navigation & waiting |
| [Set URL Query Param](navigation.md#set-url-query-param) | Update a parameter in the URL | Navigation & waiting |
| [Wait](navigation.md#wait) | Wait for a fixed period | Navigation & waiting |
| [Microsoft Login](login.md#microsoft-login) | Log in to a Microsoft account | Microsoft login |
| [Microsoft Login With MFA](login.md#microsoft-login-with-mfa) | Log in with MFA | Microsoft login |
| [Get MFA Code](login.md#get-mfa-code) | Fill a field with a user's current MFA code | Microsoft login |
| [Ask AI](ai.md#ask-ai) | Ask a question and save the answer to a variable | AI commands |
| [AI Actions](ai.md#ai-actions) | Let the AI perform steps from natural language | AI commands |
| [Loop](loop.md) | Repeat steps over fields, a range, or spreadsheet rows | Loop |

### Application-specific

| Command | Application | Page |
| --- | --- | --- |
| [Column Filter](d365-finance-operations.md#column-filter) | Finance & Operations | D365 F&O |
| [Expand or Collapse Section](d365-finance-operations.md#expand-or-collapse-section) | Finance & Operations | D365 F&O |
| [Toggle Checkbox (BC)](d365-business-central.md#toggle-checkbox) | Business Central | D365 BC |
| [Expand Section](d365-business-central.md#expand-section) | Business Central | D365 BC |
| [Collapse Section](d365-business-central.md#collapse-section) | Business Central | D365 BC |
| [Verify Checkbox](d365-business-central.md#verify-checkbox) | Business Central | D365 BC |

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
    Click position, click count and force apply to the click-style commands: [Click](mouse-keyboard.md#click), [Right Click](mouse-keyboard.md#right-click), [Select Options](entering-data.md#select-options), [Click (Computer Vision)](ai.md#click-using-computer-vision) and [Column Filter](d365-finance-operations.md#column-filter). Timeout applies more broadly, including [Fill](entering-data.md#fill), [Type](entering-data.md#type) and [Verify](verification.md#verify).
