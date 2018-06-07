// import { describe, it, expect } from 'jest';
import { Schedule } from '../Schedule';
import { Weekday } from '../Weekday';
import { Month } from '../Month';
import { Day } from '../Day';
import { Identifier } from '../Identifier';


describe('Schedule', () =>
{
  it('dayOfWeek of', () =>
  {
    let s = new Schedule({
      dayOfWeek: [Weekday.TUESDAY, Weekday.FRIDAY]
    });

    expect( s.matchesDay(Day.build(2018, Month.APRIL, 1)) ).toBe( false );
    expect( s.matchesDay(Day.build(2018, Month.APRIL, 2)) ).toBe( false );
    expect( s.matchesDay(Day.build(2018, Month.APRIL, 3)) ).toBe( true );
    expect( s.matchesDay(Day.build(2018, Month.APRIL, 4)) ).toBe( false );
    expect( s.matchesDay(Day.build(2018, Month.APRIL, 5)) ).toBe( false );
    expect( s.matchesDay(Day.build(2018, Month.APRIL, 6)) ).toBe( true );
    expect( s.matchesDay(Day.build(2018, Month.APRIL, 7)) ).toBe( false );

  })

  it('dayOfWeek every', () =>
  {
    let s = new Schedule({
      dayOfWeek: {every: 2}
    });

    expect( s.matchesDay(Day.build(2018, Month.APRIL, 1)) ).toBe( true );
    expect( s.matchesDay(Day.build(2018, Month.APRIL, 2)) ).toBe( false );
    expect( s.matchesDay(Day.build(2018, Month.APRIL, 3)) ).toBe( true );
    expect( s.matchesDay(Day.build(2018, Month.APRIL, 4)) ).toBe( false );
    expect( s.matchesDay(Day.build(2018, Month.APRIL, 5)) ).toBe( true );
    expect( s.matchesDay(Day.build(2018, Month.APRIL, 6)) ).toBe( false );
    expect( s.matchesDay(Day.build(2018, Month.APRIL, 7)) ).toBe( true );

  })

  it('dayOfWeek every offset', () =>
  {
    let s = new Schedule({
      dayOfWeek: {every: 2, offset: 1}
    });

    expect( s.matchesDay(Day.build(2018, Month.APRIL, 1)) ).toBe( false );
    expect( s.matchesDay(Day.build(2018, Month.APRIL, 2)) ).toBe( true );
    expect( s.matchesDay(Day.build(2018, Month.APRIL, 3)) ).toBe( false );
    expect( s.matchesDay(Day.build(2018, Month.APRIL, 4)) ).toBe( true );
    expect( s.matchesDay(Day.build(2018, Month.APRIL, 5)) ).toBe( false );
    expect( s.matchesDay(Day.build(2018, Month.APRIL, 6)) ).toBe( true );
    expect( s.matchesDay(Day.build(2018, Month.APRIL, 7)) ).toBe( false );

  })

  it('nextDay', () =>
  {
    let s = new Schedule({
      dayOfMonth: [3],
      month: {every: 2}
    });

    let d0 = Day.build(2018, Month.APRIL, 1);
    let d1 = Day.build(2018, Month.MAY, 3);
    let d2 = Day.build(2018, Month.JULY, 3);

    expect( s.matchesDay(d0) ).toBe( false );
    expect( s.nextDay(d0).time ).toBe( d1.time );
    expect( s.matchesDay(d1) ).toBe( true );
    expect( s.nextDay(d1).time ).toBe( d2.time );
    expect( s.matchesDay(d2) ).toBe( true );
  })

  it('overlap', () =>
  {
    let s = new Schedule({
      dayOfMonth: [3],
      times: [23],
      duration: 2,
      durationUnit: 'hours'
    });

    let d0 = Day.build(2018, Month.APRIL, 3);
    let d1 = Day.build(2018, Month.APRIL, 4);

    expect( s.durationInDays ).toBe( 1 );

    expect( s.matchesDay(d0) ).toBe( true );
    expect( s.matchesDay(d1) ).toBe( false );
    expect( s.coversDay(d1) ).toBe( true );
  })

  it('cancels', () =>
  {
    let s = new Schedule({
      dayOfMonth: [4]
    });

    let d0 = Day.build(2018, Month.JUNE, 4);
    let d1 = Day.build(2018, Month.JULY, 4);

    expect( s.matchesDay(d0) ).toBe( true );
    expect( s.matchesDay(d1) ).toBe( true );

    expect( s.isCancelled( d0 ) ).toBe( false );
    expect( s.isCancelled( d1 ) ).toBe( false );

    s.cancel.set( d0, true, Identifier.Day );

    expect( s.isCancelled( d0 ) ).toBe( true );
    expect( s.isCancelled( d1 ) ).toBe( false );
  })

  it('exclude and include day', () =>
  {
    let s = new Schedule({
      dayOfMonth: [4],
      exclude: [Day.build(2018, Month.JULY, 4)],
      include: [Day.build(2018, Month.JULY, 5)]
    });

    let d0 = Day.build(2018, Month.JUNE, 4);
    let d1 = Day.build(2018, Month.JULY, 4);
    let d2 = Day.build(2018, Month.JULY, 5);

    expect( s.matchesDay(d0) ).toBe( true );
    expect( s.matchesDay(d1) ).toBe( false );
    expect( s.matchesDay(d2) ).toBe( true );

    expect( s.iterateSpans(d0).isEmpty() ).toBe( false );
    expect( s.iterateSpans(d1).isEmpty() ).toBe( true );
    expect( s.iterateSpans(d2).isEmpty() ).toBe( false );
  })

  it('exclude and include time', () =>
  {
    let s = new Schedule({
      dayOfMonth: [4],
      times: ['08:00', '20:30'], // 8am and 8:30pm
      exclude: [201806042030], // 8:30pm on June 4th 2018
      include: [201806051830]  // 6:30pm on June 5th 2018
    });

    let d0 = Day.build(2018, Month.JUNE, 4,  8,  0);
    let d1 = Day.build(2018, Month.JUNE, 4, 20, 30);
    let d2 = Day.build(2018, Month.JUNE, 5, 18, 30);
    let d3 = Day.build(2018, Month.JUNE, 5,  8,  0);
    let d4 = Day.build(2018, Month.JULY, 4,  8,  0);

    expect( s.matchesDay(d0) ).toBe( true );
    expect( s.matchesDay(d1) ).toBe( true );
    expect( s.matchesDay(d2) ).toBe( false );
    expect( s.matchesDay(d3) ).toBe( false );
    expect( s.matchesDay(d4) ).toBe( true );

    expect( s.coversTime(d0) ).toBe( true );
    expect( s.coversTime(d1) ).toBe( false );
    expect( s.coversTime(d2) ).toBe( true );
    expect( s.coversTime(d3) ).toBe( false );

    expect( s.iterateSpans(d0).count() ).toBe( 1 );
    expect( s.iterateSpans(d3).count() ).toBe( 1 );
    expect( s.iterateSpans(d4).count() ).toBe( 2 );
  })

})
