# D365 Finance & Operations commands

Commands available when your application is Dynamics 365 Finance & Operations.

<div class="video">
  <iframe src="https://www.youtube-nocookie.com/embed/O0Egbqn9izc" title="elevaite365 demo: F&O best practices" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture" allowfullscreen></iframe>
</div>

## Change Company

**Purpose**: switch the session to a different legal entity. The page reloads in the company you specify, and the rest of the test continues there.

**Parameters:**

- **Company ID**: the short code for the legal entity, for example `DAT`

!!! warning "Use the code, not the name"
    The parameter takes the company ID only. `DAT` works; `DAT | Company accounts data` does not. The code is the part before the pipe in the company selector at the top right of D365.

## Column Filter

**Purpose**: filters on a table or grid in D365 Finance & Operations.

**Parameters:**

- **Field label**: points to the column field you want the automation to locate and then click on
- **Filter method**: the D365-specific filter operator, for example *is exactly*
- **Filter value**: the value you want to type into the filter

<!-- TODO screenshot: The D365 F&O column filter (was column-filter-Screenshot_202025-07-30_20210945.png; the source file is private on the old wiki) -->

**Advanced**: [click position](index.md#click-position), [click count](index.md#click-count), [force](index.md#force), [timeout](index.md#timeout).

## Expand or Collapse Section

**Purpose**: expand or collapse a section in D365 Finance & Operations. If the section is already in the requested state, the automation does nothing.

**Parameters:**

- **Field label**: points to the section you want the automation to locate and expand or collapse
- **Expanded**: a checkbox telling the automation whether you want the section expanded or collapsed

!!! info "Business Central equivalents"
    Business Central uses separate [Expand Section](d365-business-central.md#expand-section) and [Collapse Section](d365-business-central.md#collapse-section) commands.

## Toggle Checkbox

**Purpose**: sets a checkbox or radio button in D365 Finance & Operations to the state you want.

**Parameters:**

- **Field label**: points to the checkbox or radio field you want the automation to locate and then click on
- **Toggle Checkbox**: ticked means you want the field checked, unticked means you want it unchecked

!!! warning "Check your field selection"
    Use the field picker to select the checkbox or radio itself, not its label or the row around it. Make sure the blue highlight covers the control.

!!! info "Business Central equivalent"
    Business Central has its own [Toggle Checkbox](d365-business-central.md#toggle-checkbox) command.
