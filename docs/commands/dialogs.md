# Browser dialogs

These two commands handle native browser dialogs: the `alert`, `confirm` and `prompt` boxes the browser draws itself. They stop the page until something answers them, which is why a test needs to deal with them.

!!! warning "Native browser alerts only"
    These commands do nothing for dialogs drawn by the application. A D365 popup, a modal, a confirmation panel, a cookie banner: all of those are ordinary page elements, and you handle them with [Click](mouse-keyboard.md#click) on the button you want.

    The giveaway is the look. A native dialog is a plain grey box at the top of the browser window with no styling from the site, and you cannot select it in the field picker.

## Add the command before the dialog appears

The command arms a handler for dialogs that appear **after** it runs. It cannot answer a dialog that is already on screen.

So the step that causes the dialog goes *after* the command. If clicking **Delete** raises an *Are you sure?* confirm, the order is:

| # | Step |
| --- | --- |
| 1 | Accept Dialog |
| 2 | Click **Delete** |

Put it the other way around and the test hangs on the dialog, because nothing is waiting to answer it.

The handler is continuous. Once armed it answers every dialog for the rest of the test, so one step near the top covers a run that raises the same confirm ten times. You only need a second command if you want to change the answer partway through.

## Accept Dialog

**Purpose**: automatically accept any native browser dialog that appears after this step. The equivalent of the user clicking **OK**.

**Parameters**: none.

## Dismiss Dialog

**Purpose**: automatically dismiss any native browser dialog that appears after this step. The equivalent of the user clicking **Cancel**, or closing the box.

**Parameters**: none.
