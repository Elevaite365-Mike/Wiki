# Entering data

<div class="video">
  <iframe src="https://www.youtube-nocookie.com/embed/Z5yaKBvpoGg" title="elevaite365 demo: Fill/Type command" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture" allowfullscreen></iframe>
</div>

## Fill

**Purpose**: locate a field and fill it with the specified value. This simulates **pasting** a value into a field.

**Parameters:**

- **Field label**: selects the field to enter a value in
- **Paste value**: the content you want the automation to enter

**Advanced**: [timeout](index.md#timeout).

## Type

**Purpose**: locate a field and type into it with the specified value. This simulates **typing**, with delays between each character.

**Parameters:**

- **Field label**: selects the field to enter a value in
- **Type value**: the content you want the automation to enter

**Advanced**: [timeout](index.md#timeout).

!!! tip "Fill or Type?"
    Fill is faster and is the right default. Use Type when the field reacts to individual keystrokes, lookups, autocompletes and fields that filter as you type.

## Select Options

**Purpose**: select a dropdown value, or multi-select form values.

<!-- TODO screenshot: A multi-select field (was select-options-multiselect.png; the source file is private on the old wiki) -->

<!-- TODO screenshot: A country dropdown (was select-options-country.png; the source file is private on the old wiki) -->

**Parameters:**

- **Field label**: points to the field you want the automation to locate and then click on
- **Select By**: the type of value you want the automation to locate. Different websites use different options, so you may need to try both to find the best match
- **Options**: the value or values you want to select in the dropdown list

**Advanced**: [click position](index.md#click-position), [click count](index.md#click-count), [force](index.md#force), [timeout](index.md#timeout).

## Upload File

**Purpose**: upload a file from a variable to the webpage. The command overrides the default file explorer that normally opens when an upload button is pressed.

<div class="video">
  <iframe src="https://www.youtube-nocookie.com/embed/Vkr1wPd-cy8" title="elevaite365 demo: Upload & Download commands" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture" allowfullscreen></iframe>
</div>

!!! note "Add a click first"
    You normally need a [Click](mouse-keyboard.md#click) command before this step to trigger the file upload process. Upload File then takes over and handles the file selection.

**Parameters**: one parameter, a **variable**. This variable must hold a file to be uploaded.

## Catch Downloaded File

**Purpose**: detect when a file is downloaded and save it to a variable to be used later.

**Parameters:**

- **Variable**: where the downloaded file is saved
- **File name**: renames the saved file
