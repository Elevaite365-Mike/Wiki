# D365 Project Operations commands

Commands available when your application is Dynamics 365 Project Operations.

## Change View

**Purpose**: switches the view dropdown that sits at the top left of most Project Operations pages, so the rest of the test runs against the records that view returns.

**Parameters:**

- **View name**: free text naming the view you want selected, for example `My Active Projects`. Type it as it appears in the dropdown

!!! tip "Change the view before you filter"
    Views control which records the page loads. Put the Change View step ahead of any [Column Filter](d365-finance-operations.md#column-filter) or verification steps that depend on the rows being there.
