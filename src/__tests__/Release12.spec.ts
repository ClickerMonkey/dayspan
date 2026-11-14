// import { describe, it, expect } from 'jest';

import { Calendar } from '../Calendar';
import { Day } from '../Day';
import { Locales } from '../Locale';
import { Month } from '../Month';
import { Pattern } from '../Pattern';
import { Schedule } from '../Schedule';
import { Weekday } from '../Weekday';

// tslint:disable: no-magic-numbers

const days = (s: Schedule<any>, from: Day, max: number) =>
  s.forecast(from, false, max, 0, true).array().slice(0, max).map(([span]) => span.start.format('YYYY-MM-DD HH:mm'));

describe('dayspan 1.2', () =>
{
  afterEach(() =>
  {
    Locales.set('en');
  });

  it('parses a date without a time as that local day', () =>
  {
    expect( Day.parse('2026-11-12').format('YYYY-MM-DD HH:mm') ).toEqual( '2026-11-12 00:00' );
    expect( Day.fromString('2020-02-29').format('YYYY-MM-DD') ).toEqual( '2020-02-29' );
    expect( new Schedule({ start: '2026-11-01', end: '2026-11-03' }).start.format('YYYY-MM-DD') ).toEqual( '2026-11-01' );
    // With a time, a string is parsed as before.
    expect( Day.parse('2026-11-12T08:30').format('YYYY-MM-DD HH:mm') ).toEqual( '2026-11-12 08:30' );
  });

  it('counts days, weeks and months since the epoch', () =>
  {
    expect( Day.build(1970, Month.JANUARY, 1).daysSinceEpoch ).toBe( 0 );
    expect( Day.build(1970, Month.JANUARY, 2).daysSinceEpoch ).toBe( 1 );
    expect( Day.build(1969, Month.DECEMBER, 31).daysSinceEpoch ).toBe( -1 );
    // Daylight saving doesn't change the count (US clocks went back on 2026-11-01).
    expect( Day.build(2026, Month.NOVEMBER, 2).daysSinceEpoch - Day.build(2026, Month.OCTOBER, 31).daysSinceEpoch ).toBe( 2 );
    // Weeks start on Sunday in English: Saturday and the next Sunday are in different weeks.
    expect( Day.build(2026, Month.NOVEMBER, 8).weeksSinceEpoch - Day.build(2026, Month.NOVEMBER, 7).weeksSinceEpoch ).toBe( 1 );
    expect( Day.build(2026, Month.NOVEMBER, 14).weeksSinceEpoch - Day.build(2026, Month.NOVEMBER, 8).weeksSinceEpoch ).toBe( 0 );
    expect( Day.build(2027, Month.JANUARY, 15).monthsSinceEpoch - Day.build(2026, Month.NOVEMBER, 1).monthsSinceEpoch ).toBe( 2 );
  });

  it('repeats every N days, weeks and months counted from the start', () =>
  {
    const start = Day.build(2026, Month.DECEMBER, 26);

    // Every 3 days, across New Year.
    expect( days(new Schedule({ start, daysSinceEpoch: { every: 3 } }), start, 4) ).toEqual(
      [ '2026-12-26 00:00', '2026-12-29 00:00', '2027-01-01 00:00', '2027-01-04 00:00' ]
    );

    // Every other Monday, across a 53-week year.
    const monday = Day.build(2026, Month.DECEMBER, 14);
    expect( days(new Schedule({ start: monday, dayOfWeek: [Weekday.MONDAY], weeksSinceEpoch: { every: 2 } }), monday, 4) ).toEqual(
      [ '2026-12-14 00:00', '2026-12-28 00:00', '2027-01-11 00:00', '2027-01-25 00:00' ]
    );

    // Every 5 months on the 1st (month mod 5 would give November, January, June).
    const nov = Day.build(2026, Month.NOVEMBER, 1);
    expect( days(new Schedule({ start: nov, dayOfMonth: [1], monthsSinceEpoch: { every: 5 } }), nov, 3) ).toEqual(
      [ '2026-11-01 00:00', '2027-04-01 00:00', '2027-09-01 00:00' ]
    );

    // An offset starts later: every 2 weeks, beginning the week after the start.
    expect( days(new Schedule({ start: monday, dayOfWeek: [Weekday.MONDAY], weeksSinceEpoch: { every: 2, offset: 1 } }), monday, 2) ).toEqual(
      [ '2026-12-21 00:00', '2027-01-04 00:00' ]
    );

    // Counted with maxOccurrences.
    const s = new Schedule({ start: monday, dayOfWeek: [Weekday.MONDAY], weeksSinceEpoch: { every: 2 }, maxOccurrences: 3 });
    // (The end is when the last one ends; the start day counts as the first, which 1.1 counted twice.)
    expect( s.end.format('YYYY-MM-DD HH:mm') ).toEqual( '2027-01-12 00:00' );
    expect( s.getOccurrences().array().length ).toBe( 3 );

    // Still serialized as given.
    expect( s.toInput().weeksSinceEpoch ).toEqual( { every: 2 } );
  });

  it('counts the start day once in maxOccurrences', () =>
  {
    const monday = Day.build(2026, Month.NOVEMBER, 2);
    const s = new Schedule({ start: monday, dayOfWeek: [Weekday.MONDAY], maxOccurrences: 2 });

    expect( s.getOccurrences().array().map(span => span.start.format('YYYY-MM-DD')) ).toEqual( [ '2026-11-02', '2026-11-09' ] );
  });

  it('keeps the time of a moved or included day in a timed schedule', () =>
  {
    const start = Day.build(2026, Month.NOVEMBER, 1);
    const s = new Schedule({
      start,
      dayOfWeek: [Weekday.MONDAY],
      times: ['18:00'],
      include: [Day.build(2026, Month.NOVEMBER, 4, 19, 30)],
      exclude: [Day.build(2026, Month.NOVEMBER, 2, 18, 0)],
    });

    expect( days(s, start, 3) ).toEqual( [ '2026-11-04 19:30', '2026-11-09 18:00', '2026-11-16 18:00' ] );

    // Moved to another time of the same day (a day on the schedule).
    const u = new Schedule({ start, dayOfWeek: [Weekday.MONDAY], times: ['18:00'] });
    u.moveInstance(Day.build(2026, Month.NOVEMBER, 2, 18, 0), Day.build(2026, Month.NOVEMBER, 2, 19, 30));
    expect( days(u, start, 2) ).toEqual( [ '2026-11-02 19:30', '2026-11-09 18:00' ] );

    // An extra time on a day on the schedule.
    const w = new Schedule({ start, dayOfWeek: [Weekday.MONDAY], times: ['18:00'], include: [202611021000, 202611021800] });
    expect( days(w, start, 3) ).toEqual( [ '2026-11-02 18:00', '2026-11-02 10:00', '2026-11-09 18:00' ] );

    // A Day at midnight still names the whole day.
    const t = new Schedule({ start, dayOfWeek: [Weekday.MONDAY], times: ['18:00'], exclude: [Day.build(2026, Month.NOVEMBER, 2)] });
    expect( days(t, start, 1) ).toEqual( [ '2026-11-09 18:00' ] );
  });

  it('leaves the input of a single event alone', () =>
  {
    const input = { on: Day.build(2026, Month.NOVEMBER, 20) };
    const s = new Schedule(input);

    expect( Object.keys(input) ).toEqual( ['on'] );
    expect( s.isSingleEvent() ).toBe( true );
  });

  it('describes only changes that still apply', () =>
  {
    const start = Day.build(2026, Month.NOVEMBER, 1);
    const s = new Schedule({ start, dayOfWeek: [Weekday.TUESDAY], times: ['18:00'] });

    // Cancelled and then not; skipped and then not (stored as false, as an undo leaves it).
    s.setCancelled(Day.build(2026, Month.NOVEMBER, 3, 18, 0));
    s.setCancelled(Day.build(2026, Month.NOVEMBER, 3, 18, 0), false);
    s.exclude.set(Day.build(2026, Month.NOVEMBER, 5, 18, 0), false, s.identifierType);
    s.include.set(Day.build(2026, Month.NOVEMBER, 6, 18, 0), false, s.identifierType);
    s.setExcluded(Day.build(2026, Month.NOVEMBER, 17, 18, 0));

    const text = s.describe('event', false, false, false, true, true, true);

    expect( text ).toContain( 'excluding Tuesday, November 17th' );
    expect( text ).not.toContain( 'November 3rd' );
    expect( text ).not.toContain( 'November 5th' );
    expect( text ).not.toContain( 'November 6th' );
    expect( text ).not.toContain( 'including' );
    expect( text ).not.toContain( 'cancellations' );
  });

  it('has a monthly last weekday and an every other week pattern', () =>
  {
    const friday = Day.build(2026, Month.NOVEMBER, 27);
    const monthly = Pattern.withName('lastWeekdayOfMonth');
    const input: any = {};

    monthly.apply(input, friday);
    expect( input ).toEqual( { lastWeekspanOfMonth: [0], dayOfWeek: [Weekday.FRIDAY] } );
    expect( monthly.describe(friday) ).toEqual( 'Monthly on the last Friday' );
    expect( Pattern.findMatch(input).name ).toEqual( 'lastWeekdayOfMonth' );
    expect( days(new Schedule({ ...input, start: friday }), friday, 3) ).toEqual(
      [ '2026-11-27 00:00', '2026-12-25 00:00', '2027-01-29 00:00' ]
    );

    const other = Pattern.withName('everyOtherWeek');
    const biweekly: any = {};

    other.apply(biweekly, friday);
    expect( biweekly ).toEqual( { dayOfWeek: [Weekday.FRIDAY], weeksSinceEpoch: { every: 2 } } );
    expect( Pattern.findMatch(biweekly).name ).toEqual( 'everyOtherWeek' );
    // A weekly schedule is still weekly.
    expect( Pattern.findMatch({ dayOfWeek: [Weekday.FRIDAY] }).name ).toEqual( 'weekly' );
    expect( Pattern.findMatch({ dayOfWeek: [Weekday.FRIDAY], weeksSinceEpoch: { every: 3 } }).name ).toEqual( 'custom' );
  });

  it('describes schedules in plain English', () =>
  {
    Locales.set('en-plain');

    const day = Day.build(2026, Month.NOVEMBER, 10);

    expect( Pattern.withName('monthlyWeek').describe(day) ).toEqual( 'Every month on the 2nd Tuesday' );
    expect( Pattern.withName('annually').describe(day) ).toEqual( 'Every year on November 10' );
    expect( Pattern.withName('weekly').describe(day) ).toEqual( 'Every week on Tuesday' );

    const s = new Schedule({
      start: Day.build(2026, Month.NOVEMBER, 1),
      dayOfWeek: [Weekday.TUESDAY],
      weekspanOfMonth: [1],
      times: ['18:00'],
      duration: 90,
      durationUnit: 'minutes'
    });

    expect( s.describe('event', true, true, true) ).toEqual(
      'From November 1, 2026, happens on Tuesday in the 2nd week of the month at 6:00 pm, for 90 minutes'
    );

    const last = new Schedule({ lastWeekspanOfMonth: [0], dayOfWeek: [Weekday.FRIDAY] });
    expect( last.describe('event', false, false) ).toEqual( 'Happens on Friday in the last week of the month' );

    const every = new Schedule({ start: Day.build(2026, Month.NOVEMBER, 1), daysSinceEpoch: { every: 3 } });
    expect( every.describe('event', false) ).toEqual( 'Happens every 3 days' );
  });

  it('lays out a moved occurrence at its new time in a calendar', () =>
  {
    const cal = Calendar.months<string, any>(1, Day.build(2026, Month.NOVEMBER, 15), 0.5, {
      events: [{
        data: 'Soccer',
        schedule: {
          start: '2026-11-01',
          dayOfWeek: [Weekday.TUESDAY],
          times: ['18:00'],
          include: [202611121930],
          exclude: [202611101800],
          cancel: [202611171800]
        }
      }]
    });

    const on = (id: number) => cal.days.find(d => d.dayIdentifier === id).events.map(e => e.time.start.format('HH:mm') + (e.cancelled ? ' cancelled' : ''));

    expect( on(20261110) ).toEqual( [] );
    expect( on(20261112) ).toEqual( [ '19:30' ] );
    expect( on(20261117) ).toEqual( [ '18:00 cancelled' ] );
  });
});
