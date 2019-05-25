// import { describe, it, expect } from 'jest';

import { Day } from '../Day';
import { Identifier, IdentifierInput } from '../Identifier';
import { Month } from '../Month';
import { Schedule } from '../Schedule';
import { Time } from '../Time';
import { Weekday } from '../Weekday';

// tslint:disable: no-magic-numbers


describe('Schedule', () =>
{
  it('dayOfWeek of', () =>
  {
    const s = new Schedule({
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
    const s = new Schedule({
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
    const s = new Schedule({
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
    const s = new Schedule({
      dayOfMonth: [3],
      month: {every: 2}
    });

    const d0 = Day.build(2018, Month.APRIL, 1);
    const d1 = Day.build(2018, Month.MAY, 3);
    const d2 = Day.build(2018, Month.JULY, 3);

    expect( s.matchesDay(d0) ).toBe( false );
    expect( s.nextDay(d0).time ).toBe( d1.time );
    expect( s.matchesDay(d1) ).toBe( true );
    expect( s.nextDay(d1).time ).toBe( d2.time );
    expect( s.matchesDay(d2) ).toBe( true );
  })

  it('overlap', () =>
  {
    const s = new Schedule({
      dayOfMonth: [3],
      times: [23],
      duration: 2,
      durationUnit: 'hours'
    });

    const d0 = Day.build(2018, Month.APRIL, 3);
    const d1 = Day.build(2018, Month.APRIL, 4);

    expect( s.durationInDays ).toBe( 1 );

    expect( s.matchesDay(d0) ).toBe( true );
    expect( s.matchesDay(d1) ).toBe( false );
    expect( s.coversDay(d1) ).toBe( true );
  })

  it('cancels', () =>
  {
    const s = new Schedule({
      dayOfMonth: [4]
    });

    const d0 = Day.build(2018, Month.JUNE, 4);
    const d1 = Day.build(2018, Month.JULY, 4);

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
    const s = new Schedule({
      dayOfMonth: [4],
      exclude: [Day.build(2018, Month.JULY, 4)],
      include: [Day.build(2018, Month.JULY, 5)]
    });

    const d0 = Day.build(2018, Month.JUNE, 4);
    const d1 = Day.build(2018, Month.JULY, 4);
    const d2 = Day.build(2018, Month.JULY, 5);

    expect( s.matchesDay(d0) ).toBe( true );
    expect( s.matchesDay(d1) ).toBe( false );
    expect( s.matchesDay(d2) ).toBe( true );

    expect( s.iterateSpans(d0).empty() ).toBe( false );
    expect( s.iterateSpans(d1).empty() ).toBe( true );
    expect( s.iterateSpans(d2).empty() ).toBe( false );
  })

  it('exclude and include time', () =>
  {
    const s = new Schedule({
      dayOfMonth: [4],
      times: ['08:00', '20:30'], // 8am and 8:30pm
      exclude: [201806042030], // 8:30pm on June 4th 2018
      include: [201806051830]  // 6:30pm on June 5th 2018
    });

    const d0 = Day.build(2018, Month.JUNE, 4,  8,  0);
    const d1 = Day.build(2018, Month.JUNE, 4, 20, 30);
    const d2 = Day.build(2018, Month.JUNE, 5, 18, 30);
    const d3 = Day.build(2018, Month.JUNE, 5,  8,  0);
    const d4 = Day.build(2018, Month.JULY, 4,  8,  0);

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

  it('is single year', () =>
  {
    const s0 = new Schedule({
      year: [2018]
    });

    expect( s0.isSingleYear() ).toBeTruthy();

    const s1 = new Schedule({
      year: {every: 2, offset: 2018}
    });

    expect( s1.isSingleYear() ).toBeFalsy();

    const s2 = new Schedule({
      year: [2017, 2018]
    });

    expect( s2.isSingleYear() ).toBeFalsy();

    const s3 = new Schedule({
      dayOfMonth: [23]
    });

    expect( s3.isSingleYear() ).toBeFalsy();
  })

  it('is single month', () =>
  {
    const s0 = new Schedule({
      month: [5]
    });

    expect( s0.isSingleMonth() ).toBeTruthy();

    const s1 = new Schedule({
      month: {every: 2, offset: 1}
    });

    expect( s1.isSingleMonth() ).toBeFalsy();

    const s2 = new Schedule({
      month: [4, 5]
    });

    expect( s2.isSingleMonth() ).toBeFalsy();

    const s3 = new Schedule({
      dayOfMonth: [23]
    });

    expect( s3.isSingleMonth() ).toBeFalsy();
  })

  it('is single day of week', () =>
  {
    const s0 = new Schedule({
      dayOfWeek: [5]
    });

    expect( s0.isSingleDayOfWeek() ).toBeTruthy();

    const s1 = new Schedule({
      dayOfWeek: {every: 2, offset: 1}
    });

    expect( s1.isSingleDayOfWeek() ).toBeFalsy();

    const s2 = new Schedule({
      dayOfWeek: [4, 5]
    });

    expect( s2.isSingleDayOfWeek() ).toBeFalsy();

    const s3 = new Schedule({
      month: [23]
    });

    expect( s3.isSingleDayOfWeek() ).toBeFalsy();
  })

  it('is single day of year', () =>
  {
    const s0 = new Schedule({
      dayOfYear: [5]
    });

    expect( s0.isSingleDayOfYear() ).toBeTruthy();

    const s1 = new Schedule({
      dayOfYear: {every: 2, offset: 1}
    });

    expect( s1.isSingleDayOfYear() ).toBeFalsy();

    const s2 = new Schedule({
      dayOfYear: [4, 5]
    });

    expect( s2.isSingleDayOfYear() ).toBeFalsy();

    const s3 = new Schedule({
      month: [23]
    });

    expect( s3.isSingleDayOfYear() ).toBeFalsy();
  })

  it('is single week of month', () =>
  {
    const s0 = new Schedule({
      weekspanOfMonth: [5]
    });

    expect( s0.isSingleWeekOfMonth() ).toBeTruthy();

    const s1 = new Schedule({
      weekspanOfMonth: {every: 2, offset: 1}
    });

    expect( s1.isSingleWeekOfMonth() ).toBeFalsy();

    const s2 = new Schedule({
      weekspanOfMonth: [4, 5]
    });

    expect( s2.isSingleWeekOfMonth() ).toBeFalsy();

    const s3 = new Schedule({
      month: [23]
    });

    expect( s3.isSingleWeekOfMonth() ).toBeFalsy();

    const s4 = new Schedule({
      fullWeekOfMonth: [5]
    });

    expect( s4.isSingleWeekOfMonth() ).toBeTruthy();

    const s5 = new Schedule({
      weekOfMonth: [5]
    });

    expect( s5.isSingleWeekOfMonth() ).toBeTruthy();

    const s6 = new Schedule({
      lastFullWeekOfMonth: [5]
    });

    expect( s6.isSingleWeekOfMonth() ).toBeTruthy();

    const s7 = new Schedule({
      lastWeekspanOfMonth: [5]
    });

    expect( s7.isSingleWeekOfMonth() ).toBeTruthy();

    const s8 = new Schedule({
      lastWeekspanOfMonth: [5],
      fullWeekOfMonth: [1, 2],
      month: [2, 3]
    });

    expect( s8.isSingleWeekOfMonth() ).toBeTruthy();
  })

  it('is single week of year', () =>
  {
    const s0 = new Schedule({
      weekspanOfYear: [5]
    });

    expect( s0.isSingleWeekOfYear() ).toBeTruthy();

    const s1 = new Schedule({
      weekspanOfYear: {every: 2, offset: 1}
    });

    expect( s1.isSingleWeekOfYear() ).toBeFalsy();

    const s2 = new Schedule({
      weekspanOfYear: [4, 5]
    });

    expect( s2.isSingleWeekOfYear() ).toBeFalsy();

    const s3 = new Schedule({
      month: [23]
    });

    expect( s3.isSingleWeekOfYear() ).toBeFalsy();

    const s4 = new Schedule({
      fullWeekOfYear: [5]
    });

    expect( s4.isSingleWeekOfYear() ).toBeTruthy();

    const s6 = new Schedule({
      weekOfYear: [5]
    });

    expect( s6.isSingleWeekOfYear() ).toBeTruthy();

    const s7 = new Schedule({
      lastFullWeekOfYear: [5]
    });

    expect( s7.isSingleWeekOfYear() ).toBeTruthy();

    const s8 = new Schedule({
      weekOfYear: [5],
      fullWeekOfYear: [1, 2],
      month: [2, 3]
    });

    expect( s8.isSingleWeekOfYear() ).toBeTruthy();

    const s9 = new Schedule({
      lastWeekspanOfYear: [5]
    });

    expect( s9.isSingleWeekOfYear() ).toBeTruthy();
  })

  it('is single event', () =>
  {
    const s0 = new Schedule({
      year: [2018],
      month: [4],
      dayOfMonth: [23]
    });

    expect( s0.isSingleEvent() ).toBeTruthy();

    const s1 = new Schedule({
      year: [2018],
      dayOfYear: [100]
    });

    expect( s1.isSingleEvent() ).toBeTruthy();

    const s2 = new Schedule({
      year: [2018],
      month: [4],
      fullWeekOfMonth: [2],
      dayOfWeek: [3],
      times: [23]
    });

    expect( s2.isSingleEvent() ).toBeTruthy();

    const s3 = new Schedule({
      year: [2018],
      weekOfYear: [26],
      dayOfWeek: [1]
    });

    expect( s3.isSingleEvent() ).toBeTruthy();
  });

  it('is not single event', () =>
  {
    const s0 = new Schedule({
      year: [2018, 2017],
      month: [4],
      dayOfMonth: [23]
    });

    expect( s0.isSingleEvent() ).toBeFalsy();

    const s1 = new Schedule({
      year: [2018],
      dayOfYear: [100],
      times: [11, 22]
    });

    expect( s1.isSingleEvent() ).toBeFalsy();

    const s2 = new Schedule({
      year: [2018],
      month: [4],
      fullWeekOfMonth: [2],
      dayOfWeek: [3, 4],
      times: [23]
    });

    expect( s2.isSingleEvent() ).toBeFalsy();

    const s3 = new Schedule({
      weekOfYear: [26],
      dayOfWeek: [1]
    });

    expect( s3.isSingleEvent() ).toBeFalsy();
  });

  it('forecast', () =>
  {
    const s1 = new Schedule({
      dayOfMonth: [1, 15]
    });

    const forecast: IdentifierInput[] =
      s1.forecast(Day.build(2018, 5 /*6*/, 1), true, 4)
        .transform<IdentifierInput>(([span, day, id]) => id)
        .array()
    ;

    expect( forecast ).toEqual([
      20180401,
      20180415,
      20180501,
      20180515,
      20180601,
      20180615,
      20180701,
      20180715,
      20180801
    ]);
  });

  it('moveTime', () =>
  {
    const s1 = new Schedule({
      dayOfWeek: [1],
      times: [
        '09:30',
        '15:00'
      ]
    });

    const c0 = Day.build(2018, 5, 18, 9, 30);
    const c1 = Day.build(2018, 5, 18, 9, 0);

    s1.move(
      Day.build(2018, 5, 25, 9, 15),
      Day.build(2018, 5, 25, 9, 30)
    );

    expect( s1.isCancelled(c0) ).toBe( false );

    s1.setCancelled(c0);

    expect( s1.isCancelled(c0) ).toBe( true );

    s1.moveTime(
      Time.parse('09:30'),
      Time.parse('09:00')
    );

    expect( s1.isCancelled(c0) ).toBe( false );
    expect( s1.isCancelled(c1) ).toBe( true );

    expect( s1.times.length ).toBe( 2 );
    expect( s1.times[0].format('HH:mm') ).toBe( '09:00' );
    expect( s1.times[1].format('HH:mm') ).toBe( '15:00' );
  });

})
