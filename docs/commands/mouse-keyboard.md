# Mouse & keyboard

## Click

**Purpose**: left-click somewhere on the webpage.

<div class="video">
  <iframe src="https://www.youtube-nocookie.com/embed/q0i1S5mKDcM" title="elevaite365 demo: Click command" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture" allowfullscreen></iframe>
</div>

**Parameters**: the Click command has one parameter, **field label**. This points to the field you want the automation to locate and then click on.

**Advanced**: [click position](index.md#click-position), [click count](index.md#click-count), [force](index.md#force), [timeout](index.md#timeout).

## Right Click

**Purpose**: right-click somewhere on the webpage.

**Parameters**: one parameter, **field label**. This points to the field you want the automation to locate and then click on.

**Advanced**: [click position](index.md#click-position), [click count](index.md#click-count), [force](index.md#force), [timeout](index.md#timeout).

## Mouse Hover

**Purpose**: hover over an element on the webpage.

<div class="video">
  <iframe src="https://www.youtube-nocookie.com/embed/fws9ZKTh-oI" title="elevaite365 demo: Mouse Hover command" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture" allowfullscreen></iframe>
</div>

**Parameters**: one parameter, **field label**. This points to the field you want the automation to locate and then hover over.

## Move Mouse

**Purpose**: move the mouse to an exact position on the page.

**Parameters**: two parameters, **X** and **Y**. These are pixel coordinates; `0,0` is the top left of the webpage.

## Scroll Page

**Purpose**: simulate mouse scrolling. Works for both vertical and horizontal scrolling.

<div class="video">
  <iframe src="https://www.youtube-nocookie.com/embed/Fc3zB6lX_RM" title="elevaite365 demo: Mouse Scroll" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture" allowfullscreen></iframe>
</div>

**Parameters**: three parameters. The first is a dropdown with two options:

| Mode | Use when |
| --- | --- |
| **Relative** | You want to scroll relative to the current scroll position. For example, an additional 20 pixels |
| **Absolute** | You want an exact scroll position, measured from the top left of the webpage |

## Press Key

**Purpose**: simulate pressing keyboard keys. Also accepts multi-keys and shortcuts.

<div class="video">
  <iframe src="https://www.youtube-nocookie.com/embed/54Yf733UtvM" title="elevaite365 demo: Press Key command" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture" allowfullscreen></iframe>
</div>

**Parameters**: a single parameter, **Key**: the keyboard code you want the automation to simulate.

### Supported keys

Most keys are supported. A few examples:

`F1`–`F12`, `Digit0`–`Digit9`, `KeyA`–`KeyZ`, `Backquote`, `Minus`, `Equal`, `Backslash`, `Backspace`, `Tab`, `Delete`, `Escape`, `ArrowDown`, `End`, `Enter`, `Home`, `Insert`, `PageDown`, `PageUp`, `ArrowRight`, `ArrowUp`

A full list is available under the `KeyboardEvent.Key` column in the [MDN key values reference](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values).

### Modifier shortcuts

`Shift`, `Control`, `Alt`, `Meta`, `ShiftLeft`, `ControlOrMeta`

Combine a modifier with a key using `+`:

```text
Control+A
Shift+ArrowRight
ControlOrMeta+S
```

Stack more than one modifier the same way, for example `Control+Shift+Tab`.

!!! tip "ControlOrMeta"
    `ControlOrMeta` resolves to Control on Windows and Linux, and to Meta on macOS, so one step covers both.

## Drag and Drop

**Purpose**: drag an element on the page.

<div class="video">
  <iframe src="https://www.youtube-nocookie.com/embed/rrmpSjkaeXo" title="elevaite365 demo: Drag & Drop command" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture" allowfullscreen></iframe>
</div>

**Parameters:**

- **Field to drag**
- **Move destination**
- **Destination field** or **destination coordinates**

Move destination has three options:

| Option | Use when |
| --- | --- |
| **Field** | You want to drag the source field into or over another field on the page |
| **Relative Coords** | You want to drag the source field a set number of pixels from its current position. `X: 100, Y: 0` moves it 100 pixels right |
| **Absolute Coords** | You want to drag the source field to a specific position on the page. `X: 100, Y: 0` moves it to the top of the page, 100px from the left edge |
