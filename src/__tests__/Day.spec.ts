// import { describe, it, expect } from 'jest';

import { Constants as cs } from '../Constants';
import { Day } from '../Day';
import { Locales } from '../Locale';
import { Month } from '../Month';
import { Weekday } from '../Weekday';

import '../locales/de';

// tslint:disable: no-magic-numbers


describe('Day', () => {

  it('same', () => {
    const d = Day.today()

    expect( d.sameDay( d ) ).toBe( true );
    expect( d.sameMonth( d ) ).toBe( true );
    expect( d.sameWeek( d ) ).toBe( true );
    expect( d.sameYear( d ) ).toBe( true );
    expect( d.sameHour( d ) ).toBe( true );
    expect( d.sameMinute( d ) ).toBe( true );
  })

  it('between day', () => {

    const d0 = Day.unix(0);
    const d1 = Day.unix(cs.MILLIS_IN_DAY);

    expect( d0.millisBetween(d1) ).toBe( cs.MILLIS_IN_DAY );
    expect( d0.daysBetween(d1) ).toBe( 1 );
    expect( d0.hoursBetween(d1) ).toBe( 24 );
    expect( d0.weeksBetween(d1) ).toBe( 0 );
  })

  it('between week', () => {

    const d0 = Day.unix(0);
    const d1 = Day.unix(cs.MILLIS_IN_WEEK);

    expect( d0.millisBetween(d1) ).toBe( cs.MILLIS_IN_WEEK );
    expect( d0.daysBetween(d1) ).toBe( 7 );
    expect( d0.hoursBetween(d1) ).toBe( 7 * 24 );
    expect( d0.weeksBetween(d1) ).toBe( 1 );
  })

  it('next', () => {

    const d0 = Day.today();
    const d1 = d0.next();
    const d2 = d1.next();

    expect( d0.millisBetween(d1) ).toBe( cs.MILLIS_IN_DAY );
    expect( d0.millisBetween(d2) ).toBe( cs.MILLIS_IN_DAY * 2 );
  })

  it('relativeDays', () => {

    const d0 = Day.build(2018, Month.APRIL, 1);
    const d1 = d0.relativeDays(-3);
    const d2 = d0.relativeDays(+3);

    expect( d0.daysBetween(d1) ).toBe( 3 );
    expect( d0.daysBetween(d2) ).toBe( 3 );

    expect( d1.time ).toBe( Day.build(2018, Month.MARCH, 29).time );
    expect( d2.time ).toBe( Day.build(2018, Month.APRIL, 4).time );
  })

  it('withDayOfMonth', () => {

    const d0 = Day.build(2018, Month.APRIL, 4);
    const d1 = d0.withDayOfMonth(6);

    expect( d0.daysBetween(d1) ).toBe( 2 );
    expect( d1.dayOfMonth ).toBe( 6 );
    expect( d1.month ).toBe( Month.APRIL );
    expect( d1.year ).toBe( 2018 );
    expect( d1.dayOfWeek ).toBe( 5 );
  })

  it('withDay', () => {

    const d0 = Day.build(2018, Month.APRIL, 4);
    const d1 = d0.withDay(Weekday.SUNDAY);

    expect( d1.dayOfMonth ).toBe( 1 );
    expect( d1.month ).toBe( Month.APRIL );
    expect( d1.year ).toBe( 2018 );
    expect( d1.day ).toBe( Weekday.SUNDAY );

    const d2 = Day.build(2018, Month.APRIL, 30);
    const d3 = d2.withDay(Weekday.FRIDAY);

    expect( d3.dayOfMonth ).toBe( 4 );
    expect( d3.month ).toBe( Month.MAY );
    expect( d3.year ).toBe( 2018 );
    expect( d3.day ).toBe( Weekday.FRIDAY );
  })

  it('week', () => {
    expect( Day.build(2018, 0, 1).week ).toEqual(1);
    expect( Day.build(2018, 0, 2).week ).toEqual(1);
    expect( Day.build(2018, 0, 3).week ).toEqual(1);
    expect( Day.build(2018, 0, 4).week ).toEqual(1);
    expect( Day.build(2018, 0, 5).week ).toEqual(1);
    expect( Day.build(2018, 0, 6).week ).toEqual(1);
    expect( Day.build(2018, 0, 7).week ).toEqual(2);
    expect( Day.build(2018, 0, 8).week ).toEqual(2);
    expect( Day.build(2018, 0, 9).week ).toEqual(2);

    expect( Day.build(2017, 0, 1).week ).toEqual(1);
    expect( Day.build(2017, 0, 2).week ).toEqual(1);
    expect( Day.build(2017, 0, 3).week ).toEqual(1);
    expect( Day.build(2017, 0, 4).week ).toEqual(1);
    expect( Day.build(2017, 0, 5).week ).toEqual(1);
    expect( Day.build(2017, 0, 6).week ).toEqual(1);
    expect( Day.build(2017, 0, 7).week ).toEqual(1);
    expect( Day.build(2017, 0, 8).week ).toEqual(2);
    expect( Day.build(2017, 0, 9).week ).toEqual(2);

    expect( Day.build(2016, 0, 1).week ).toEqual(1);
    expect( Day.build(2016, 0, 2).week ).toEqual(1);
    expect( Day.build(2016, 0, 3).week ).toEqual(2);
    expect( Day.build(2016, 0, 4).week ).toEqual(2);
    expect( Day.build(2016, 0, 5).week ).toEqual(2);
    expect( Day.build(2016, 0, 6).week ).toEqual(2);
    expect( Day.build(2016, 0, 7).week ).toEqual(2);
    expect( Day.build(2016, 0, 8).week ).toEqual(2);
    expect( Day.build(2016, 0, 9).week ).toEqual(2);
  })

  it('weekOfYear', () => {
    expect( Day.build(2018, 0, 1).weekOfYear ).toEqual(1);
    expect( Day.build(2018, 0, 2).weekOfYear ).toEqual(1);
    expect( Day.build(2018, 0, 3).weekOfYear ).toEqual(1);
    expect( Day.build(2018, 0, 4).weekOfYear ).toEqual(1);
    expect( Day.build(2018, 0, 5).weekOfYear ).toEqual(1);
    expect( Day.build(2018, 0, 6).weekOfYear ).toEqual(1);
    expect( Day.build(2018, 0, 7).weekOfYear ).toEqual(2);
    expect( Day.build(2018, 0, 8).weekOfYear ).toEqual(2);
    expect( Day.build(2018, 0, 9).weekOfYear ).toEqual(2);

    expect( Day.build(2017, 0, 1).weekOfYear ).toEqual(1);
    expect( Day.build(2017, 0, 2).weekOfYear ).toEqual(1);
    expect( Day.build(2017, 0, 3).weekOfYear ).toEqual(1);
    expect( Day.build(2017, 0, 4).weekOfYear ).toEqual(1);
    expect( Day.build(2017, 0, 5).weekOfYear ).toEqual(1);
    expect( Day.build(2017, 0, 6).weekOfYear ).toEqual(1);
    expect( Day.build(2017, 0, 7).weekOfYear ).toEqual(1);
    expect( Day.build(2017, 0, 8).weekOfYear ).toEqual(2);
    expect( Day.build(2017, 0, 9).weekOfYear ).toEqual(2);

    expect( Day.build(2016, 0, 1).weekOfYear ).toEqual(0);
    expect( Day.build(2016, 0, 2).weekOfYear ).toEqual(0);
    expect( Day.build(2016, 0, 3).weekOfYear ).toEqual(1);
    expect( Day.build(2016, 0, 4).weekOfYear ).toEqual(1);
    expect( Day.build(2016, 0, 5).weekOfYear ).toEqual(1);
    expect( Day.build(2016, 0, 6).weekOfYear ).toEqual(1);
    expect( Day.build(2016, 0, 7).weekOfYear ).toEqual(1);
    expect( Day.build(2016, 0, 8).weekOfYear ).toEqual(1);
    expect( Day.build(2016, 0, 9).weekOfYear ).toEqual(1);
  })

  it('weekOfYear', () => {
    expect( Day.build(2018, 0, 31).lastDayOfMonth ).toEqual(1);
    expect( Day.build(2018, 0, 30).lastDayOfMonth ).toEqual(2);
    expect( Day.build(2018, 0, 29).lastDayOfMonth ).toEqual(3);
    expect( Day.build(2018, 1, 28).lastDayOfMonth ).toEqual(1);
    expect( Day.build(2018, 1, 27).lastDayOfMonth ).toEqual(2);

    expect( Day.build(2016, 1, 29).lastDayOfMonth ).toEqual(1);
    expect( Day.build(2016, 1, 28).lastDayOfMonth ).toEqual(2);
    expect( Day.build(2016, 1, 27).lastDayOfMonth ).toEqual(3);
  })

  it('quarter', () => {
    expect( Day.build(2017, 11, 31).quarter ).toEqual(3);
    expect( Day.build(2018, 0, 1).quarter ).toEqual(0);
    expect( Day.build(2018, 2, 31).quarter ).toEqual(0);
    expect( Day.build(2018, 3, 1).quarter ).toEqual(1);
    expect( Day.build(2018, 5, 30).quarter ).toEqual(1);
    expect( Day.build(2018, 6, 1).quarter ).toEqual(2);
    expect( Day.build(2018, 8, 30).quarter ).toEqual(2);
    expect( Day.build(2018, 9, 1).quarter ).toEqual(3);
    expect( Day.build(2018, 11, 31).quarter ).toEqual(3);
    expect( Day.build(2019, 0, 1).quarter ).toEqual(0);
  })

  it('dayOfWeek', () => {
    expect( Day.build(2016, 0, 1).dayOfWeek ).toEqual(5);
    expect( Day.build(2016, 1, 1).dayOfWeek ).toEqual(1);
    expect( Day.build(2016, 2, 1).dayOfWeek ).toEqual(2);
    expect( Day.build(2016, 3, 1).dayOfWeek ).toEqual(5);
    expect( Day.build(2016, 4, 1).dayOfWeek ).toEqual(0);

    expect( Day.build(2016, 0, 1).setLocale('de').dayOfWeek ).toEqual(4);
    expect( Day.build(2016, 1, 1).setLocale('de').dayOfWeek ).toEqual(0);
    expect( Day.build(2016, 2, 1).setLocale('de').dayOfWeek ).toEqual(1);
    expect( Day.build(2016, 3, 1).setLocale('de').dayOfWeek ).toEqual(4);
    expect( Day.build(2016, 4, 1).setLocale('de').dayOfWeek ).toEqual(6);
  })

  it('day', () => {
    expect( Day.build(2016, 0, 1).day ).toEqual(5);
    expect( Day.build(2016, 1, 1).day ).toEqual(1);
    expect( Day.build(2016, 2, 1).day ).toEqual(2);
    expect( Day.build(2016, 3, 1).day ).toEqual(5);
    expect( Day.build(2016, 4, 1).day ).toEqual(0);

    expect( Day.build(2016, 0, 1).setLocale('de').day ).toEqual(5);
    expect( Day.build(2016, 1, 1).setLocale('de').day ).toEqual(1);
    expect( Day.build(2016, 2, 1).setLocale('de').day ).toEqual(2);
    expect( Day.build(2016, 3, 1).setLocale('de').day ).toEqual(5);
    expect( Day.build(2016, 4, 1).setLocale('de').day ).toEqual(0);
  });

  it('locales', () => {
    const d = Day.build(2016, 0, 1);

    expect( d.format('dddd') ).toEqual('Friday');

    Locales.set('de');

    expect( d.format('dddd') ).toEqual('Freitag');

    Locales.set('en');

    expect( d.format('dddd') ).toEqual('Friday');

    d.setLocale('de');

    expect( d.format('dddd') ).toEqual('Freitag');

    Locales.set('de');

    expect( d.format('dddd') ).toEqual('Freitag');

    Locales.set('en');

    expect( d.format('dddd') ).toEqual('Freitag');

    d.clearLocale();

    expect( d.format('dddd') ).toEqual('Friday');

    Locales.set('de');

    expect( d.format('dddd') ).toEqual('Freitag');
  });

})
