// import { describe, it, expect } from 'jest';

import { TimeZone } from '../TimeZone';

// tslint:disable: no-magic-numbers

const NY = 'America/New_York';
const iso = (at: number) => new Date(at).toISOString().substring(0, 16);
const local = (day: string, minute: number, zone: string) => TimeZone.localString(TimeZone.instant(day, minute, zone), zone);

describe('TimeZone', () =>
{

  it('knows named IANA zones and refuses offsets and made up names', () =>
  {
    for (const zone of ['America/New_York', 'Europe/London', 'UTC', 'Asia/Tokyo', 'America/Argentina/Buenos_Aires', 'Etc/GMT+5'])
    {
      expect( [zone, TimeZone.isValid(zone)] ).toEqual( [zone, true] );
    }
    for (const zone of ['+05:00', '-0400', 'Mars/Olympus', 'New York', '', 'America/', undefined as any, 5 as any])
    {
      expect( [zone, TimeZone.isValid(zone)] ).toEqual( [zone, false] );
    }
  });

  it('throws a RangeError for a zone it does not know', () =>
  {
    expect( () => TimeZone.local(0, 'Mars/Olympus') ).toThrow( RangeError );
    expect( () => TimeZone.instant('2026-11-12', 0, 'Mars/Olympus') ).toThrow( RangeError );
  });

  it('reads the local day and minute in a zone', () =>
  {
    const at = Date.UTC(2026, 10, 12, 13, 30);

    expect( TimeZone.local(at, NY) ).toEqual( { day: '2026-11-12', minute: 8 * 60 + 30 } );
    expect( TimeZone.local(at, 'Asia/Tokyo') ).toEqual( { day: '2026-11-12', minute: 22 * 60 + 30 } );
    expect( TimeZone.local(at, 'UTC') ).toEqual( { day: '2026-11-12', minute: 13 * 60 + 30 } );
    expect( TimeZone.local(at, 'Pacific/Kiritimati') ).toEqual( { day: '2026-11-13', minute: 3 * 60 + 30 } );
    // Midnight is minute 0, not 24:00.
    expect( TimeZone.local(Date.UTC(2026, 10, 12, 5, 0), NY) ).toEqual( { day: '2026-11-12', minute: 0 } );
  });

  it('gives the offset of a zone at an instant', () =>
  {
    expect( TimeZone.offset(Date.UTC(2026, 10, 30, 14), NY) ).toEqual( -300 );
    expect( TimeZone.offset(Date.UTC(2026, 6, 1, 14), NY) ).toEqual( -240 );
    expect( TimeZone.offset(Date.UTC(2026, 6, 1, 14), 'Asia/Tokyo') ).toEqual( 540 );
    expect( TimeZone.offset(Date.UTC(2026, 6, 1, 14), 'Asia/Kolkata') ).toEqual( 330 );
    expect( TimeZone.offset(Date.UTC(2026, 6, 1, 14), 'Asia/Kathmandu') ).toEqual( 345 );
    expect( TimeZone.offset(Date.UTC(2026, 6, 1, 14), 'UTC') ).toEqual( 0 );
  });

  it('finds the instant of a local time, in winter and summer', () =>
  {
    expect( TimeZone.instant('2026-11-30', 9 * 60, NY) ).toEqual( Date.UTC(2026, 10, 30, 14, 0) );
    expect( TimeZone.instant('2026-11-12', 7 * 60 + 30, NY) ).toEqual( Date.UTC(2026, 10, 12, 12, 30) );
    expect( TimeZone.instant('2026-07-01', 7 * 60 + 30, NY) ).toEqual( Date.UTC(2026, 6, 1, 11, 30) );
    expect( TimeZone.instant('2026-07-01', 9 * 60, 'Asia/Tokyo') ).toEqual( Date.UTC(2026, 6, 1, 0, 0) );
    expect( TimeZone.instant('2026-07-01', 0, 'UTC') ).toEqual( Date.UTC(2026, 6, 1) );
    // A minute past the day's end is the next day.
    expect( TimeZone.instant('2026-11-30', 24 * 60, NY) ).toEqual( TimeZone.instant('2026-12-01', 0, NY) );
  });

  it('moves a time that does not happen past the jump (clocks go forward)', () =>
  {
    // New York, 2026-03-08: 02:00 becomes 03:00.
    expect( TimeZone.instant('2026-03-08', 150, NY) ).toEqual( Date.UTC(2026, 2, 8, 7, 30) );
    expect( local('2026-03-08', 150, NY) ).toEqual( '2026-03-08T03:30:00-04:00' );
    expect( local('2026-03-08', 120, NY) ).toEqual( '2026-03-08T03:00:00-04:00' );
    expect( local('2026-03-08', 119, NY) ).toEqual( '2026-03-08T01:59:00-05:00' );
    expect( TimeZone.instant('2026-03-08', 7 * 60 + 30, NY) ).toEqual( Date.UTC(2026, 2, 8, 11, 30) );
    // London, 2026-03-29: 01:00 becomes 02:00.
    expect( local('2026-03-29', 90, 'Europe/London') ).toEqual( '2026-03-29T02:30:00+01:00' );
    // Sydney, 2026-10-04: 02:00 becomes 03:00.
    expect( local('2026-10-04', 150, 'Australia/Sydney') ).toEqual( '2026-10-04T03:30:00+11:00' );
    expect( iso(TimeZone.instant('2026-10-04', 150, 'Australia/Sydney')) ).toEqual( '2026-10-03T16:30' );
    // Lord Howe, 2026-10-04: a half-hour jump, 02:00 becomes 02:30.
    expect( local('2026-10-04', 135, 'Australia/Lord_Howe') ).toEqual( '2026-10-04T02:45:00+11:00' );
  });

  it('takes the first of a time that happens twice (clocks go back)', () =>
  {
    // New York, 2026-11-01: 02:00 becomes 01:00; 01:30 happens in daylight time first.
    expect( TimeZone.instant('2026-11-01', 90, NY) ).toEqual( Date.UTC(2026, 10, 1, 5, 30) );
    expect( local('2026-11-01', 90, NY) ).toEqual( '2026-11-01T01:30:00-04:00' );
    expect( TimeZone.instant('2026-11-01', 7 * 60 + 30, NY) ).toEqual( Date.UTC(2026, 10, 1, 12, 30) );
    expect( local('2026-11-01', 120, NY) ).toEqual( '2026-11-01T02:00:00-05:00' );
    // London, 2026-10-25: 02:00 becomes 01:00.
    expect( local('2026-10-25', 90, 'Europe/London') ).toEqual( '2026-10-25T01:30:00+01:00' );
    expect( iso(TimeZone.instant('2026-10-25', 90, 'Europe/London')) ).toEqual( '2026-10-25T00:30' );
    // Sydney, 2026-04-05: 03:00 becomes 02:00.
    expect( local('2026-04-05', 150, 'Australia/Sydney') ).toEqual( '2026-04-05T02:30:00+11:00' );
    expect( iso(TimeZone.instant('2026-04-05', 150, 'Australia/Sydney')) ).toEqual( '2026-04-04T15:30' );
  });

  it('round trips every minute of a daylight saving day', () =>
  {
    for (const [zone, day] of [[NY, '2026-03-08'], [NY, '2026-11-01'], ['Europe/Berlin', '2026-10-25'], ['Australia/Lord_Howe', '2026-04-05']])
    {
      for (let minute = 0; minute < 24 * 60; minute += 15)
      {
        const at = TimeZone.instant(day, minute, zone);
        const back = TimeZone.local(at, zone);

        // Every time comes back as itself, except the ones that don't happen, which come back later the same day.
        expect( back.day ).toEqual( day );
        expect( back.minute ).toBeGreaterThanOrEqual( minute );
        expect( back.minute - minute ).toBeLessThanOrEqual( 60 );
      }
    }
  });

  it('agrees with a search of every quarter hour around each 2026 transition, east and west', () =>
  {
    const Q = 15 * 60000;
    const zones = [NY, 'America/Los_Angeles', 'America/Santiago', 'Europe/London', 'Europe/Berlin', 'Asia/Tehran', 'Australia/Sydney', 'Australia/Lord_Howe', 'Pacific/Auckland', 'Pacific/Chatham'];

    for (const zone of zones)
    {
      // The local days whose offset changes.
      const days: string[] = [];
      for (let at = Date.UTC(2026, 0, 1); at < Date.UTC(2027, 0, 1); at += 3600000)
      {
        if (TimeZone.offset(at, zone) !== TimeZone.offset(at + 3600000, zone))
        {
          days.push(TimeZone.local(at, zone).day);
        }
      }

      for (const day of days)
      {
        for (let minute = 0; minute < 24 * 60; minute += 15)
        {
          const [y, m, d] = day.split('-').map(Number);
          const naive = Date.UTC(y, m - 1, d, 0, minute);
          let first: number = null;
          let after: number = null;
          for (let at = naive - 15 * 3600000; at <= naive + 15 * 3600000; at += Q)
          {
            const wall = TimeZone.wall(at, zone);
            if (first === null && wall === naive) first = at;
            if (after === null && wall > naive) after = at;
          }
          // The first instant reading that time, else (a time that doesn't happen) as far past the jump as it was past
          // the last minute before it.
          const expected = first !== null ? first : after + (naive - TimeZone.wall(after - 60000, zone) - 60000);

          expect( [zone, day, minute, iso(TimeZone.instant(day, minute, zone))] ).toEqual( [zone, day, minute, iso(expected)] );
        }
      }
    }
  });

  it('writes an instant as the local time with its offset', () =>
  {
    expect( TimeZone.localString(Date.UTC(2026, 10, 30, 14), NY) ).toEqual( '2026-11-30T09:00:00-05:00' );
    expect( local('2026-07-01', 9 * 60, NY) ).toEqual( '2026-07-01T09:00:00-04:00' );
    expect( TimeZone.localString(Date.UTC(2026, 6, 1, 14), 'Asia/Kathmandu') ).toEqual( '2026-07-01T19:45:00+05:45' );
    expect( TimeZone.localString(Date.UTC(2026, 6, 1, 14), 'UTC') ).toEqual( '2026-07-01T14:00:00+00:00' );
  });

});
