# dayspan

A date & schedule library to use for advanced calendars in TypeScript and JS.

```typescript
// A monthly calendar around today
let calendar = Calendar.months<string>();

// Every Monday 9:00 - 9:30
calendar.addSchedule({
  event: 'Weekly Meeting',
  schedule: new Schedule({
    dayOfWeek: [Weekday.MONDAY],
    hour: [9],
    duration: Duration.minutes(30)
  })
});

// The array of days in the month, each day has a list of the days events.
calendar.days;

// Go to the next month
calendar.next();

// Select this day and update the selection flags in the calendar days
calendar.select(Day.create(2018, Month.APRIL, 12));

// Remove the schedule
calendar.removeSchedule('Weekly Meeting');

// A weekly calendar with custom MyEvent class
Calendar.weeks<MyEvent>();

// A daily calendar covering 3 days centered on today
Calendar.days<string>(3);

// A daily calendar covering 3 days starting with given date
Calendar.days<string>(3, Day.create(2018, Month.JUNE, 15), 0);
```
