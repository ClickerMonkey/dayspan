// import { describe, it, expect } from 'jest';
import { Calendar } from '../Calendar';
import { Day } from '../Day';
import { Time } from '../Time';


describe('CalendarEvent', () =>
{

  it('moves simple event', () =>
  {
    var c = Calendar.days<string, any>(1, Day.fromArray([2017, 2, 11]), 0, {
      events: [{
        id: 1,
        data: 'Simple Event',
        schedule: {
          year: [2017],
          month: [2],
          dayOfMonth: [11]
        }
      }]
    });

    var cd = c.days[0];
    var ce = cd.events[0];
    var e = ce.event;
    var s = e.schedule;

    expect( s.isSingleEvent() ).toBeTruthy();
    expect( s.checks.length ).toBe( 3 );

    ce.move(Day.fromArray([2014, 5, 15]));

    expect( s.include.isEmpty() ).toBeTruthy();
    expect( s.exclude.isEmpty() ).toBeTruthy();
    expect( s.year.input ).toEqual( [2014] );
    expect( s.month.input ).toEqual( [5] );
    expect( s.dayOfMonth.input ).toEqual( [15] );
    expect( s.checks.length ).toBe( 3 );
    expect( s.toInput() ).toEqual( {year: [2014], month: [5], dayOfMonth: [15]} );

    s.times.push(Time.fromString('03:45'));
    s.durationUnit = 'hours';

    expect( s.isSingleEvent() ).toBeTruthy();
    expect( s.checks.length ).toBe( 3 );

    ce.move(Day.fromArray([2017, 2, 11, 3, 45]));

    expect( s.include.isEmpty() ).toBeTruthy();
    expect( s.exclude.isEmpty() ).toBeTruthy();
    expect( s.year.input ).toEqual( [2017] );
    expect( s.month.input ).toEqual( [2] );
    expect( s.dayOfMonth.input ).toEqual( [11] );
    expect( s.checks.length ).toBe( 3 );
    expect( s.toInput() ).toEqual( {year: [2017], month: [2], dayOfMonth: [11], times:['03:45']} );

    s.times.push(Time.fromString('13:45'));

    expect( s.isSingleEvent() ).toBeFalsy();
    expect( s.checks.length ).toBe( 3 );

    // Reset calendar event time to the time added above. This start time is
    // used in the move function.
    ce.time.start = Day.fromArray([2017, 2, 11, 3, 45]);
    ce.fullDay = false;

    ce.move(Day.fromArray([2014, 5, 15, 3, 45])); // 3:45

    // Now includes and excludes have values
    expect( s.include.isEmpty() ).toBeFalsy();
    expect( s.exclude.isEmpty() ).toBeFalsy();
    expect( s.year.input ).toEqual( [2017] );
    expect( s.month.input ).toEqual( [2] );
    expect( s.dayOfMonth.input ).toEqual( [11] );
    expect( s.checks.length ).toBe( 3 );
    expect( s.toInput() ).toEqual({
      year: [2017], month: [2], dayOfMonth: [11],
      times:['03:45', '13:45'],
      exclude: [201703110345],
      include: [201406150345]
    });
  })

})
