# Browser dialogs

These two commands handle native browser dialogs: the `alert`, `confirm` and `prompt` boxes the browser draws itself. They stop the page until something answers them, which is why a test needs to deal with them.

!!! warning "Native browser alerts only"
    These commands do nothing for dialogs drawn by the application. A D365 popup, a modal, a confirmation panel, a cookie banner: all of those are ordinary page elements, and you handle them with [Click](mouse-keyboard.md#click) on the button you want.

    The giveaway is the look. A native dialog is a plain grey box at the top of the browser window with no styling from the site, and you cannot select it in the field picker.

## Where to put the step

Put **Accept Dialog** immediately after the click that opens the dialog. If clicking **Delete** raises an *Are you sure?* confirm, the order is:

| # | Step |
| --- | --- |
| 1 | Click **Delete** |
| 2 | Accept Dialog |

Placing it before the click also works. That was the only supported order in earlier releases, so existing tests written that way still run.

<!-- TODO: confirm whether Accept Dialog placed after the click still answers every later dialog in the test, or only the one on screen. -->

**Dismiss Dialog** still has to go before the click that raises the dialog. It arms a handler for dialogs that appear after it runs and cannot answer one that is already on screen. Put it the other way around and the test hangs on the dialog, because nothing is waiting to answer it.

<!-- TODO: confirm whether Dismiss Dialog now also supports being placed after the trigger. -->

A handler armed before the trigger is continuous. Once armed it answers every dialog for the rest of the test, so one step near the top covers a run that raises the same confirm ten times. You only need a second command if you want to change the answer partway through.

## Accept Dialog

**Purpose**: accept a native browser dialog. The equivalent of the user clicking **OK**.

**Parameters**:

| Parameter | Required | Description |
| --- | --- | --- |
| Prompt Input | No | Text to type into a `prompt` dialog before accepting it. Ignored for `alert` and `confirm` dialogs, which have no input box and are accepted as they are. |

Leave **Prompt Input** empty for alerts and confirms. Fill it in when the page asks the user to type something, such as a reason for a deletion or a name for a copy.

<!-- TODO: confirm what an empty Prompt Input sends to a prompt dialog (an empty string, or the prompt's default value). -->

## Dismiss Dialog

**Purpose**: automatically dismiss any native browser dialog that appears after this step. The equivalent of the user clicking **Cancel**, or closing the box.

**Parameters**: none.
