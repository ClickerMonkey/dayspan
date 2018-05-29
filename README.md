# dayspan

A date & schedule library to use for advanced calendars in TypeScript and JS.

- [Google Calendar Clone](https://clickermonkey.github.io/dayspan/examples/google/)
- [Documentation](https://clickermonkey.github.io/dayspan/docs/)
- [Download JS](umd/dayspan.js)

### TypeScript Example

```typescript
// A monthly calendar around today
let cal = Calendar.months<string>();

// Every Monday 9:00 - 9:30
cal.addSchedule({
  event: 'Weekly Meeting',
  schedule: new Schedule({
    dayOfWeek: [Weekday.MONDAY],
    times: [9],
    duration: 30,
    durationUnit: 'minutes'
  })
});

// Dr. Appointment on 01/04/2018
cal.addSchedule({
  event: 'Dr. Appointment',
  schedule: new Schedule({
    on: Day.build(2018, Month.APRIL, 1)
  })
});

// Mother's Day
cal.addSchedule({
  event: "Mother's Day",
  schedule: new Schedule({
    weekspanOfMonth: [1],         // 2nd
    dayOfWeek: [Weekday.SUNDAY],  // Sunday
    month: [Month.MAY]            // of May
  })
});

// The array of days in the month, each day has a list of the days events.
cal.days;

// Go to the next month
cal.next();

// Select this day and update the selection flags in the calendar days
cal.select(Day.build(2018, Month.APRIL, 12));

// Remove the schedule
cal.removeSchedule('Weekly Meeting');

// A weekly calendar with custom MyEvent class
Calendar.weeks<MyEvent>();

// A daily calendar covering 3 days centered on today
Calendar.days<string>(3);

// A daily calendar covering 3 days starting with given date
Calendar.days<string>(3, Day.build(2018, Month.JUNE, 15), 0);
```

### JS Example

You just need to append `ds` to the beginning of the classes:

```javascript
// A monthly calendar around today
var cal = ds.Calendar.months();

// Every Monday 9:00 - 9:30
cal.addSchedule({
  event: 'Weekly Meeting',
  schedule: new ds.Schedule({
    dayOfWeek: [ds.Weekday.MONDAY],
    times: [9],
    duration: 30,
    durationUnit: 'minutes'
  })
});

// Dr. Appointment on 01/04/2018
cal.addSchedule({
  event: 'Dr. Appointment',
  schedule: new ds.Schedule({
    on: ds.Day.build(2018, ds.Month.APRIL, 1)
  })
});
```
