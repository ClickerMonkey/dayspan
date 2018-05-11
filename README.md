# dayspan

A date & schedule library to use for advanced calendars in TypeScript and JS.

### TypeScript Example

```typescript

// A monthly calendar around today
let cal = Calendar.months<string>();

// Every Monday 9:00 - 9:30
cal.addSchedule({
  event: 'Weekly Meeting',
  schedule: new Schedule({
    dayOfWeek: [Weekday.MONDAY],
    hour: [9],
    duration: Duration.minutes(30)
  })
});

// Dr. Appointment on 01/04/2018
cal.addSchedule({
  event: 'Dr. Appointment',
  schedule: new Schedule({
    on: Day.create(2018, Month.APRIL, 1)
  })
});

// The array of days in the month, each day has a list of the days events.
cal.days;

// Go to the next month
cal.next();

// Select this day and update the selection flags in the calendar days
cal.select(Day.create(2018, Month.APRIL, 12));

// Remove the schedule
cal.removeSchedule('Weekly Meeting');

// A weekly calendar with custom MyEvent class
Calendar.weeks<MyEvent>();

// A daily calendar covering 3 days centered on today
Calendar.days<string>(3);

// A daily calendar covering 3 days starting with given date
Calendar.days<string>(3, Day.create(2018, Month.JUNE, 15), 0);
```
