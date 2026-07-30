# D365 Business Central commands

Commands available when your application is Dynamics 365 Business Central.

<div class="video">
  <iframe src="https://www.youtube-nocookie.com/embed/5tX35sYgiqw" title="elevaite365 demo: Business Central" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture" allowfullscreen></iframe>
</div>

## Toggle Checkbox

**Purpose** — toggles a checkbox or radio button.

**Parameters:**

- **Field label** — points to the checkbox or radio field you want the automation to locate and then click on
- **Toggle Checkbox** — tells the automation what state you want the checkbox to be in

!!! warning "Check your field selection"
    When setting the field, make sure the blue highlight covers the checkbox or radio itself.

## Expand Section

**Purpose** — expand a section in D365 Business Central. If the section is already expanded, the automation does nothing.

**Parameters:**

- **Field label** — points to the section you want the automation to locate and expand. Always try to select the title or heading of the section itself

## Collapse Section

**Purpose** — collapse a section in D365 Business Central. If the section is already collapsed, the automation does nothing.

**Parameters:**

- **Field label** — points to the section you want the automation to locate and collapse. Always try to select the title or heading of the section itself

## Verify Checkbox

**Purpose** — verify a checkbox in D365 Business Central.

**Parameters:**

- **Field label** — points to the field you want the automation to locate. Always try to select the title or heading of the section itself
- **Checkbox status** — whether you expect it to be enabled or disabled

!!! info "Finance & Operations equivalent"
    F&O uses a single [Expand or Collapse Section](d365-finance-operations.md#expand-or-collapse-section) command with an *Expanded* checkbox.
