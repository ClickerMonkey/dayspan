// import { describe, it, expect } from 'jest';
import { Schedule } from '../Schedule';
import { Weekday } from '../Weekday';
import { Month } from '../Month';
import { Day } from '../Day';
import { Calendar } from '../Calendar';


describe('Calendar', () => {

  it('days 1', () => {
    let d = Day.build(2018, Month.APRIL, 11);
    let c = Calendar.days<string, any>(1, d);

    expect( c.length ).toBe( 1 );
    expect( c.days.length ).toBe( 1 );
    expect( c.days[0].year ).toBe( 2018 );
    expect( c.days[0].month ).toBe( Month.APRIL );
    expect( c.days[0].dayOfMonth ).toBe( 11 );

    c.next();

    expect( c.days.length ).toBe( 1 );
    expect( c.days[0].year ).toBe( 2018 );
    expect( c.days[0].month ).toBe( Month.APRIL );
    expect( c.days[0].dayOfMonth ).toBe( 12 );
  })

  it('days 3', () => {
    let d = Day.build(2018, Month.APRIL, 11);
    let c = Calendar.days<string, any>(3, d);

    expect( c.length ).toBe( 3 );
    expect( c.days.length ).toBe( 3 );
    expect( c.days[0].year ).toBe( 2018 );
    expect( c.days[0].month ).toBe( Month.APRIL );
    expect( c.days[0].dayOfMonth ).toBe( 10 );
    expect( c.days[1].year ).toBe( 2018 );
    expect( c.days[1].month ).toBe( Month.APRIL );
    expect( c.days[1].dayOfMonth ).toBe( 11 );
    expect( c.days[2].year ).toBe( 2018 );
    expect( c.days[2].month ).toBe( Month.APRIL );
    expect( c.days[2].dayOfMonth ).toBe( 12 );

    c.next();

    expect( c.days.length ).toBe( 3 );
    expect( c.days[0].year ).toBe( 2018 );
    expect( c.days[0].month ).toBe( Month.APRIL );
    expect( c.days[0].dayOfMonth ).toBe( 13 );
    expect( c.days[1].year ).toBe( 2018 );
    expect( c.days[1].month ).toBe( Month.APRIL );
    expect( c.days[1].dayOfMonth ).toBe( 14 );
    expect( c.days[2].year ).toBe( 2018 );
    expect( c.days[2].month ).toBe( Month.APRIL );
    expect( c.days[2].dayOfMonth ).toBe( 15 );
  })

  it('schedule', () =>
  {
    let d = Day.build(2018, Month.MAY, 11);
    let c = Calendar.months<string, any>(1, d);
    c.listTimes = true;

    // Every Monday 9:00 - 9:30
    c.addEvent({
      data: 'Weekly Meeting',
      schedule: new Schedule({
        dayOfWeek: [Weekday.MONDAY],
        times: [9],
        duration: 30,
        durationUnit: 'minutes'
      })
    });

    expect( c.findEvent('Weekly Meeting') ).toBeDefined();
    expect( c.length ).toBe( 31 );
    expect( c.days.length ).toBe( 35 );

    expect( c.days[7].events.length ).toBe( 0 );
    expect( c.days[8].events.length ).toBe( 1 );
    expect( c.days[8].events[0].event.data ).toBe( 'Weekly Meeting' );
    expect( c.days[8].events[0].time.start.time ).toBe( Day.build(2018, Month.MAY, 7, 9, 0).time );
    expect( c.days[8].events[0].time.end.time ).toBe( Day.build(2018, Month.MAY, 7, 9, 30).time );
    expect( c.days[9].events.length ).toBe( 0 );
    expect( c.days[15].events.length ).toBe( 1 );
  })

})
