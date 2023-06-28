# Advanced Search

Searching can include multiple statements, separated by a semicolon (";") or newline (`Shift + Enter`). The search bar will turn blue when it contains multiple statements to indicate this change in mode. There are several keywords to help form complex queries:

- `in <field>` limits the text search to a specific field. This can be useful for finding tagged artifacts, e.g. the query "cadcad; in tags" will find all artifacts that have a cadcad tag.
- `sort <numeric field> [desc | asc]` sorts results. There are currently limited fields to sort by but this will be expanded as we add new ways to measure and rank artifacts.
- `filter (or fi for short) <field> <values>` is by far the most powerful keyword, and its functionality is detailed more below.

## Filtering

Filtering is the workhorse of multi-statement queries. A filter takes a field and a list of 1 or more values (e.g. `"fi tags cats cadcad gds"`). Values are combined with an `OR` operator by default, but an "&" can be used to combine with `AND` instead. There is no limit to the number of filter statements.

### Fields & Values

Common fields you can filter by include the following: `tags`, `platform`, `type`, `rank`, `url`, and `title`. Filtering with these fields matches exact values (case-insensitive).

**Platforms** include `docs`, `hackmd`, `slack`, `github`, and `medium`.

**Types** include `presentation`, `repository`, `message`, and `document`.

**Rank** can be used as a handy workaround for filtering out messages (which are ranked < 1) by using a `fi rank 1` statement.

## Examples

- [`*; fi tags cadcad spec`](https://kms.block.science/search?q=*%3B+fi+tags+cadcad+spec) will find any artifacts tagged with "cadcad" OR "spec".
- `spec; in title; fi tags cats; fi platform hackmd` will find artifacts that have "spec" in the title, and have the tags "cats" AND "engineering".
- `*; fi tags cats & car; fi type message; sort measure_text_length` will find artifacts with tag "cats" AND car of type "message" and sort them by text length.

Note: An asterisk ("\*") will match all artifacts, this can be very useful when combined with filter statements.
