# Changelog

## 1.2.0

Fixes and additions found while building a family calendar on dayspan. Everything from 1.1 keeps working; the
behaviour changes below are bug fixes.

### Added

- **Every N days, weeks or months, counted from the start.** New schedule properties `daysSinceEpoch`,
  `weeksSinceEpoch` and `monthsSinceEpoch` (and the same properties on `Day`). An `{ every, offset }` value on them
  counts from the schedule's `start` (when it has one), so `{ start, weeksSinceEpoch: { every: 2 }, dayOfWeek: [2] }`
  is every other Tuesday from the start, across years, and `{ start, daysSinceEpoch: { every: 3 } }` is every three
  days across months and New Year. `offset` moves the first one later by that many units. Lists and single values
  are absolute counts. (`week`, `weekOfYear`, `month` and `dayOfYear` with `{ every }` still restart every year, as
  before.)
- **Patterns:** `lastWeekdayOfMonth` ("Monthly on the last Friday": `lastWeekspanOfMonth: [0]` + the day of the week;
  the existing `lastWeekday` is yearly) and `everyOtherWeek` ("Every other week on Friday"). `Pattern.apply` now sets
  `{ every }` rules, and an `{ every }` rule without an `offset` matches any offset.
- **`en-plain` locale** (`enPlain`): plain words for people, not programmers. "Every month on the 2nd Tuesday",
  "Every year on November 10", and `describe()` reads "From November 1, 2026, happens on Tuesday in the 2nd week of
  the month at 6:00 pm, for 90 minutes". `Locales.set('en-plain')` or `day.setLocale('en-plain')`.
- **Locale hooks (optional, English when missing):** `patternLastWeekdayOfMonth`, `patternEveryOtherWeek`,
  `scheduleTimeFormat` (how `describe` writes times), `ruleDaysSinceEpoch`, `ruleWeeksSinceEpoch`,
  `ruleMonthsSinceEpoch`. Existing custom locales need no change.
- **`Frequency.d.ts` is shipped.** The typings lacked it (`index.d.ts` exported `./Frequency`, so `FrequencyValue`
  was untyped). `npm run typings` (part of `npm run build`) writes every declaration with `tsc`.

### Fixed

- **Date-only strings are local days.** `Day.parse('2026-11-12')` (and `start: '2026-11-12'` in a schedule) was
  UTC midnight, which is November 11th west of Greenwich. A `YYYY-MM-DD` string is now that day at local midnight.
  Strings with a time are parsed as before.
- **Moved and included days keep their own time in timed schedules.** A `Day` with a time in `include`, `exclude`,
  `cancel` or `meta` of a timed schedule became a whole-day identifier, so an included 7:30 pm showed at the
  schedule's own time. It now names that time. A `Day` at midnight still names the whole day.
- **A moved or extra occurrence at another time of a day on the schedule shows.** Moving Tuesday 6:00 pm to 7:30 pm
  the same Tuesday (or adding a 10:00 am that Tuesday) listed nothing for it: only the schedule's own times were
  looked at on days that match the schedule.
- **`describe()` leaves out undone changes.** Exclusions, inclusions and cancellations set back to `false` (an undo,
  or what `moveInstance` leaves behind) were listed as if they still applied.
- **`maxOccurrences` counts the start day once.** When the start day was itself an occurrence, the schedule ended
  one occurrence late.
- **A schedule no longer changes the input it was made from.** `on` used to write `start`, `end`, `year`, `month`
  and `dayOfMonth` into the caller's object.

### Building

webpack 4 needs the legacy OpenSSL provider on Node 17 and later:
`NODE_OPTIONS=--openssl-legacy-provider npm run build`.
