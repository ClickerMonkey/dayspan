// import { describe, it, expect } from 'jest';
import { Day } from '../Day';
import { Constants as cs } from '../Constants';
import { Month } from '../Month';
import { Weekday } from '../Weekday';


describe('Day', () => {

  it('same', () => {
    let d = Day.today()

    expect( d.sameDay( d ) ).toBe( true );
    expect( d.sameMonth( d ) ).toBe( true );
    expect( d.sameWeek( d ) ).toBe( true );
    expect( d.sameYear( d ) ).toBe( true );
    expect( d.sameHour( d ) ).toBe( true );
    expect( d.sameMinute( d ) ).toBe( true );
  })

  it('between day', () => {

    let d0 = Day.unix(0);
    let d1 = Day.unix(cs.MILLIS_IN_DAY);

    expect( d0.millisBetween(d1) ).toBe( cs.MILLIS_IN_DAY );
    expect( d0.daysBetween(d1) ).toBe( 1 );
    expect( d0.hoursBetween(d1) ).toBe( 24 );
    expect( d0.weeksBetween(d1) ).toBe( 0 );
  })

  it('between week', () => {

    let d0 = Day.unix(0);
    let d1 = Day.unix(cs.MILLIS_IN_WEEK);

    expect( d0.millisBetween(d1) ).toBe( cs.MILLIS_IN_WEEK );
    expect( d0.daysBetween(d1) ).toBe( 7 );
    expect( d0.hoursBetween(d1) ).toBe( 7 * 24 );
    expect( d0.weeksBetween(d1) ).toBe( 1 );
  })

  it('next', () => {

    let d0 = Day.today();
    let d1 = d0.next();
    let d2 = d1.next();

    expect( d0.millisBetween(d1) ).toBe( cs.MILLIS_IN_DAY );
    expect( d0.millisBetween(d2) ).toBe( cs.MILLIS_IN_DAY * 2 );
  })

  it('relativeDays', () => {

    let d0 = Day.create(2018, Month.APRIL, 1);
    let d1 = d0.relativeDays(-3);
    let d2 = d0.relativeDays(+3);

    expect( d0.daysBetween(d1) ).toBe( 3 );
    expect( d0.daysBetween(d2) ).toBe( 3 );

    expect( d1.time ).toBe( Day.create(2018, Month.MARCH, 29).time );
    expect( d2.time ).toBe( Day.create(2018, Month.APRIL, 4).time );
  })

  it('withDayOfMonth', () => {

    let d0 = Day.create(2018, Month.APRIL, 4);
    let d1 = d0.withDayOfMonth(6);

    expect( d0.daysBetween(d1) ).toBe( 2 );
    expect( d1.dayOfMonth ).toBe( 6 );
    expect( d1.month ).toBe( Month.APRIL );
    expect( d1.year ).toBe( 2018 );
    expect( d1.dayOfWeek ).toBe( 5 );
  })

  it('withDayOfWeek', () => {

    let d0 = Day.create(2018, Month.APRIL, 4);
    let d1 = d0.withDayOfWeek(Weekday.SUNDAY);

    expect( d1.dayOfMonth ).toBe( 1 );
    expect( d1.month ).toBe( Month.APRIL );
    expect( d1.year ).toBe( 2018 );
    expect( d1.dayOfWeek ).toBe( Weekday.SUNDAY );

    let d2 = Day.create(2018, Month.APRIL, 30);
    let d3 = d2.withDayOfWeek(Weekday.FRIDAY);

    expect( d3.dayOfMonth ).toBe( 4 );
    expect( d3.month ).toBe( Month.MAY );
    expect( d3.year ).toBe( 2018 );
    expect( d3.dayOfWeek ).toBe( Weekday.FRIDAY );
  })

})
