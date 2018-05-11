// import { describe, it, expect } from 'jest';
import { Schedule } from '../Schedule';
import { Weekday } from '../Weekday';
import { Month } from '../Month';
import { Day } from '../Day';
import { Constants } from '../Constants';


describe('Schedule', () => {

  it('dayOfWeek of', () => {

    let s = new Schedule({
      dayOfWeek: [Weekday.TUESDAY, Weekday.FRIDAY]
    });

    expect( s.matchesDay(Day.create(2018, Month.APRIL, 1)) ).toBe( false );
    expect( s.matchesDay(Day.create(2018, Month.APRIL, 2)) ).toBe( false );
    expect( s.matchesDay(Day.create(2018, Month.APRIL, 3)) ).toBe( true );
    expect( s.matchesDay(Day.create(2018, Month.APRIL, 4)) ).toBe( false );
    expect( s.matchesDay(Day.create(2018, Month.APRIL, 5)) ).toBe( false );
    expect( s.matchesDay(Day.create(2018, Month.APRIL, 6)) ).toBe( true );
    expect( s.matchesDay(Day.create(2018, Month.APRIL, 7)) ).toBe( false );

  })

  it('dayOfWeek every', () => {

    let s = new Schedule({
      dayOfWeek: {every: 2}
    });

    expect( s.matchesDay(Day.create(2018, Month.APRIL, 1)) ).toBe( true );
    expect( s.matchesDay(Day.create(2018, Month.APRIL, 2)) ).toBe( false );
    expect( s.matchesDay(Day.create(2018, Month.APRIL, 3)) ).toBe( true );
    expect( s.matchesDay(Day.create(2018, Month.APRIL, 4)) ).toBe( false );
    expect( s.matchesDay(Day.create(2018, Month.APRIL, 5)) ).toBe( true );
    expect( s.matchesDay(Day.create(2018, Month.APRIL, 6)) ).toBe( false );
    expect( s.matchesDay(Day.create(2018, Month.APRIL, 7)) ).toBe( true );

  })

  it('dayOfWeek every offset', () => {

    let s = new Schedule({
      dayOfWeek: {every: 2, offset: 1}
    });

    expect( s.matchesDay(Day.create(2018, Month.APRIL, 1)) ).toBe( false );
    expect( s.matchesDay(Day.create(2018, Month.APRIL, 2)) ).toBe( true );
    expect( s.matchesDay(Day.create(2018, Month.APRIL, 3)) ).toBe( false );
    expect( s.matchesDay(Day.create(2018, Month.APRIL, 4)) ).toBe( true );
    expect( s.matchesDay(Day.create(2018, Month.APRIL, 5)) ).toBe( false );
    expect( s.matchesDay(Day.create(2018, Month.APRIL, 6)) ).toBe( true );
    expect( s.matchesDay(Day.create(2018, Month.APRIL, 7)) ).toBe( false );

  })

  it('nextDay', () => {

    let s = new Schedule({
      dayOfMonth: [3],
      month: {every: 2}
    });

    let d0 = Day.create(2018, Month.APRIL, 1);
    let d1 = Day.create(2018, Month.MAY, 3);
    let d2 = Day.create(2018, Month.JULY, 3);

    expect( s.matchesDay(d0) ).toBe( false );
    expect( s.nextDay(d0).time ).toBe( d1.time );
    expect( s.matchesDay(d1) ).toBe( true );
    expect( s.nextDay(d1).time ).toBe( d2.time );
    expect( s.matchesDay(d2) ).toBe( true );
  })

  it('overlap', () => {

    let s = new Schedule({
      dayOfMonth: [3],
      hour: [23],
      duration: Constants.MILLIS_IN_HOUR * 2
    });

    expect( s.durationInDays() ).toBe( 1 );

    expect( s.matchesDay(Day.create(2018, Month.APRIL, 3)) ).toBe( true );
    expect( s.matchesDay(Day.create(2018, Month.APRIL, 4)) ).toBe( false );
    expect( s.coversDay(Day.create(2018, Month.APRIL, 4)) ).toBe( true );
  })

})
