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

!!! tip "Unique data every run"
    **Generate UID** is the cleanest way to stop two runs colliding on the same record. Add it to any name or reference field your test creates.
