# DaySpan

A date & schedule library to use for advanced calendars in TypeScript and JS.

- [Google Calendar Clone](https://clickermonkey.github.io/dayspan-vuetify/example/) checkout [dayspan-vuetify](https://github.com/ClickerMonkey/dayspan-vuetify)
- [Documentation](https://clickermonkey.github.io/dayspan/docs/)
- [Download JS](umd/dayspan.js)
- Install via `bower install dayspan` or `npm install dayspan`

### Features

- Schedules track how frequent events occur using 20+ properties
- Events can last minutes, hours, days, or weeks
- Events can occur all day, or 1 or more times during the day
- Events can have any day & time included as an event occurrence (they don't need to match the frequency of the schedule)
- Events can be excluded, cancelled, or have metadata (specific event occurrence, all in a given day, week, month, quarter, or year)
- Event occurrences can be moved
- Calendars can represent a span of days, weeks, months, or years
- Easily list the next/previous days that occur on a schedule
- Describe a schedule in a human friendly string
- Export and import schedules and calendars to plain objects for easy saving and loading
- Provides logic to help display intersecting events on a calendar
- Every N days, weeks or months counted from the start (`daysSinceEpoch`, `weeksSinceEpoch`, `monthsSinceEpoch` with `{ every }`)
- A plain-English locale (`en-plain`) for descriptions people read
- Instants of local times in any IANA time zone across daylight saving (`TimeZone`)
- See [CHANGELOG.md](CHANGELOG.md) for what changed in each version

### TypeScript Example

```typescript
// A monthly calendar around today (string=event data type, any=schedule metadata type)
let cal = Calendar.months<string, any>();

// Every Monday 9:00 - 9:30
cal.addEvent({
  data: 'Weekly Meeting',
  schedule: {
    dayOfWeek: Weekday.MONDAY,
    times: 9,
    duration: 30,
    durationUnit: 'minutes'
  }
});

// Dr. Appointment on 01/04/2018
cal.addEvent({
  data: 'Dr. Appointment',
  visible: false,
  schedule: {
    on: Day.build(2018, Month.APRIL, 1)
  }
});

// Mother's Day
cal.addEvent({
  id: 'someUserProvidedId',
  data: "Mother's Day",
  schedule: new Schedule({
    weekspanOfMonth: 1,         // 2nd
    dayOfWeek: Weekday.SUNDAY,  // Sunday
    month: Month.MAY            // of May
  })
});

// The array of days in the month, each day has a list of the days events.
cal.days;

// Go to the next month
cal.next();

// Select this day and update the selection flags in the calendar days
cal.select(Day.build(2018, Month.APRIL, 12));

// Remove the schedule
cal.removeEvent('Weekly Meeting');

// A weekly calendar with custom MyEvent class
Calendar.weeks<MyEvent, any>();

// A daily calendar covering 3 days centered on today
Calendar.days<string, any>(3);

// A daily calendar covering 3 days starting with given date
Calendar.days<string, any>(3, Day.build(2018, Month.JUNE, 15), 0);
```

### Time zones

A `Day` is in the computer's own zone. To run a schedule in another zone (a server sending reminders for a family
in New York), read its days and times as a wall clock there with `TimeZone`. It uses the engine's `Intl`, so the
server and the browser work out the same instants.

```typescript
const NY = 'America/New_York';

TimeZone.isValid(NY);                        // true ('+05:00' and 'Mars/Olympus' are false)
TimeZone.instant('2026-11-30', 9 * 60, NY);  // Date.UTC(2026, 10, 30, 14, 0): 9:00 am EST
TimeZone.local(Date.UTC(2026, 10, 30, 14), NY);       // { day: '2026-11-30', minute: 540 }
TimeZone.offset(Date.UTC(2026, 10, 30, 14), NY);      // -300 (minutes ahead of UTC)
TimeZone.localString(Date.UTC(2026, 10, 30, 14), NY); // '2026-11-30T09:00:00-05:00'

// Clocks go forward at 02:00 on 2026-03-08: 02:30 doesn't happen, so it's 03:30 EDT.
TimeZone.localString(TimeZone.instant('2026-03-08', 150, NY), NY); // '2026-03-08T03:30:00-04:00'
// Clocks go back at 02:00 on 2026-11-01: 01:30 happens twice, so it's the first (EDT).
TimeZone.localString(TimeZone.instant('2026-11-01', 90, NY), NY);  // '2026-11-01T01:30:00-04:00'
```

Every function but `isValid` throws a `RangeError` for a zone the engine doesn't know.

### JS Example

You just need to append `ds` to the beginning of the classes:

```javascript
// A monthly calendar around today
var cal = ds.Calendar.months();

// Every Monday 9:00 - 9:30
cal.addEvent({
  data: 'Weekly Meeting',
  schedule: {
    dayOfWeek: [ds.Weekday.MONDAY],
    times: 9,
    duration: 30,
    durationUnit: 'minutes'
  }
});

// Dr. Appointment on 01/04/2018
cal.addEvent({
  data: 'Dr. Appointment',
  schedule: new ds.Schedule({
    on: ds.Day.build(2018, ds.Month.APRIL, 1)
  })
});
```
