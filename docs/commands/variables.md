# Variables

## Set Variable

**Purpose**: take a value from a field on the page and save it to a variable.

**Parameters:**

- **Field label**: the field you're saving the value from
- **Variable**: the variable you want to save the final output to
- **Method**: the type of value you want to save

### Available methods

| Method | Saves |
| --- | --- |
| **Auto** | Either the text or the value of the field on the page |
| **Input Value** | Input fields only, such as an email input |
| **Text Content** | Non-input fields such as paragraphs and headers |
| **Attribute Name** | A field attribute (requires technical knowledge) |
| **User Input** | Free-form text where you can put a static value or reference other variables |

---

## Modify Variable

**Purpose**: directly modify a variable. The result of this command **replaces** the saved variable's value.

**Parameters:**

- **Variable**: select a variable from any application
- **Function**: how to update that variable

### Available functions

| Function | Effect | Example |
| --- | --- | --- |
| **Increment** | Takes the trailing number and increases it by 1 | `elevaite365` → `elevaite366` |
| **Decrement** | Takes the trailing number and decreases it by 1 | `elevaite365` → `elevaite364` |
| **Prefix** | Adds text before the current value | |
| **Postfix** | Adds text after the current value | |
| **Remove Characters** | Removes all unique characters | `elevaite365` → `365` |
| **Remove Numbers** | Removes all numbers | `elevaite365` → `elevaite` |
| **Remove Character** | Removes a specific character | |
| **Regex Match** | Extracts the regex match from the variable | |
| **Generate UID** | Generates a unique ID with a specific length | |
| **Slice** | Cuts out a portion of the value, from a starting index to an ending index | |
| **Trim** | Removes whitespace around the value | |
| **Upper Case** | Translates the value to all upper case | |
| **Lower Case** | Translates the value to all lower case | |

!!! tip "Testing a regex"
    Use an online regex builder to check your pattern before putting it in a step.

!!! info "Checking a variable's value"
    Use [Verify Variable](verification.md#verify-variable) to assert on what a variable holds.

!!! tip "Unique data every run"
    **Generate UID** is the cleanest way to stop two runs colliding on the same record. Add it to any name or reference field your test creates.

---

## Extract Value

**Purpose**: pull a single value out of structured data held in a variable and save it to another variable.

The source can be JSON or XML, such as an API response, or an Excel or CSV file caught earlier in the test. You point at the value you want, and it saves what it finds.

The walkthrough on the [API Request](api-request.md) page shows it in use against an API response.

The parameters are split across two tabs.

### Input

Start with **Format**. There are four, and the fields below change to suit the one you pick.

=== "JSON"

    - **Source Variable**: the variable holding the JSON
    - **JSON Path**: where the value sits, for example `$.store.book[0].title`

=== "XML"

    - **Source Variable**: the variable holding the XML
    - **XPath**: where the value sits, for example `/root/element/child`

=== "Excel"

    - **Source File**: the variable holding the file
    - **Worksheet**: which sheet to read. Defaults to `Sheet1`
    - **Cell**: the cell reference, for example `A1`

=== "CSV"

    - **Source File**: the variable holding the file
    - **Cell**: the cell reference, for example `A1`

Every field is required, apart from Worksheet, which falls back to its default.

### Output

- **Result Variable**: the variable the extracted value is saved to. Required

Only one value comes back. If your path matches more than one, tighten it until it points at a single item.

!!! tip "Reading a different row each iteration"
    The Cell field takes variables, so `B{{RowNumber}}` walks down a column as a [Loop](loop.md#for-excel-csv) runs. Handy for pulling one expected value per row out of a data file.

!!! tip "Where the data comes from"
    Two common sources are an [API Request](api-request.md) response and a spreadsheet saved with [Catch Downloaded File](entering-data.md#catch-downloaded-file). Pair Extract Value with [Verify Variable](verification.md#verify-variable) to assert on what you pulled out.

---

## Update Value

**Purpose**: replace a single value inside structured data held in a variable. [Extract Value](#extract-value) reads, Update Value writes.

The **Input** tab is the same as [Extract Value](#input), including the four formats and the fields each one asks for, plus one extra:

- **New Value**: what to write at that path. Required

The **Output** tab holds a single **Result Variable**, the same as Extract Value.

What lands in the result variable is the entire input, file and all, with your one change applied. The source variable is untouched, so point the output at a new variable if you need the original later.

!!! tip "Editing a payload before you send it"
    Useful for taking a saved request body, swapping one field per run, then posting the result.

