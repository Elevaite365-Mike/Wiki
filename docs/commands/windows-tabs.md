# Windows & tabs

Commands for the browser window itself, and for tests that end up with more than one tab open.

## Maximise Window

**Purpose**: maximise the window the test is currently working in.

**Parameters**: none.

## Zoom Window

**Purpose**: zoom the window in or out.

**Parameters**: a single **percentage**, from 0 to 100.

Useful when a page puts the field you need outside the visible area, or when a grid only renders the columns that fit on screen.

## Close Tab

**Purpose**: close the active browser tab.

**Parameters**: none.

Use it after a step opens a second tab, such as a link that opens a preview or a report in a new window, once you are finished with it.

Focus falls back to the older tab, so closing a pop-out returns the test to the page that opened it.

---

## Recorder-managed commands

The three below deal with pages by identifier rather than by whichever one is in focus. The recorder adds them for you when a test opens a new window or tab, and in most tests you never touch them by hand.

### Detect New Window/Tab

**Purpose**: move the test's focus onto a window or tab that has just opened.

The recorder inserts it at the point the new page appears. You should not need to add one yourself.

### Switch Tab

**Purpose**: move the test's focus to a specific window or tab.

**Parameters:**

- **Identifier Type**: `ID` to name a specific page, or `Index` to go by its position in the open pages
- **Identifier**: which page, for example `Page 1`

### Close Page

**Purpose**: close a specific window or tab, chosen the same way as Switch Tab.

**Parameters:**

- **Identifier Type**: `ID` to name a specific page, or `Index` to go by its position in the open pages
- **Identifier**: which page, for example `Page 1`

!!! warning "Prefer the simple commands"
    Close Page gives finer control than [Close Tab](#close-tab), and it is easy to point at the wrong page once a test changes. Unless you need to close something that is not in focus, use Close Tab and leave the recorder's steps alone.
