
import { Constants } from './Constants';


/**
 * A local day and minute of that day, as a wall clock in a time zone reads it.
 *
 * - `day`: The local date, `YYYY-MM-DD`.
 * - `minute`: Minutes since local midnight, 0 to 1439.
 */
export interface ZonedLocal
{
  day: string;
  minute: number;
}

const MINUTE = Constants.MILLIS_IN_MINUTE;
const DAY = Constants.MILLIS_IN_DAY;
const HOUR = Constants.MINUTES_IN_HOUR;
const EPOCH_YEAR = 1970;
const TWO_DIGITS = 10;

/**
 * Named IANA zones look like `UTC`, `America/New_York` or
 * `America/Argentina/Buenos_Aires`. Offsets (`+05:00`) and names with spaces
 * don't.
 */
const NAMED_ZONE = /^[A-Za-z][A-Za-z0-9_+-]*(?:\/[A-Za-z0-9_+-]+)*$/;

/**
 * The formatters made so far, by zone (making one is slow).
 */
const formatters: { [zone: string]: Intl.DateTimeFormat } = {};

/**
 * Instants (UNIX timestamps in milliseconds) and the wall clock of an IANA time
 * zone, across daylight saving, using the `Intl` support of the JavaScript
 * engine (no time zone data is shipped). A schedule says "9:00 am every
 * Monday"; this says which instant that is in `America/New_York` on a given
 * Monday, whatever zone the computer running it is in.
 *
 * The rule for local times daylight saving touches:
 *
 * - A time that doesn't happen (02:30 on the night clocks go forward from
 *   02:00 to 03:00) is that many minutes past the jump: 03:30.
 * - A time that happens twice (01:30 on the night clocks go back from 02:00 to
 *   01:00) is the first of the two, before the clocks go back.
 *
 * Every function throws a `RangeError` for a zone `Intl` doesn't know; check
 * one first with [[TimeZone.isValid]].
 *
 * These functions exist in a class so they may be overridden if desired.
 */
export class TimeZone
{

  /**
   * Determines whether the given zone is a named IANA time zone the
   * JavaScript engine knows, such as `America/New_York` or `UTC`. Offsets
   * (`+05:00`), names with spaces and made up names (`Mars/Olympus`) are not:
   * a named zone follows its own daylight saving, an offset doesn't.
   *
   * @param zone The zone to test.
   * @returns `true` if the zone is a known IANA zone, otherwise `false`.
   */
  public static isValid(zone: string): boolean
  {
    if (typeof zone !== 'string' || !NAMED_ZONE.test(zone))
    {
      return false;
    }

    try
    {
      this.formatter(zone);

      return true;
    }
    catch (e)
    {
      return false;
    }
  }

  /**
   * The local day and minute of the day in a zone at an instant.
   *
   * ```typescript
   * TimeZone.local(Date.UTC(2026, 10, 12, 13, 30), 'America/New_York');
   * // { day: '2026-11-12', minute: 510 } (8:30 am)
   * ```
   *
   * @param at The instant, a UNIX timestamp in milliseconds.
   * @param zone The IANA time zone.
   * @returns The local day (`YYYY-MM-DD`) and minute of that day.
   */
  public static local(at: number, zone: string): ZonedLocal
  {
    const parts = this.formatter(zone).formatToParts(at);
    const get: { [type: string]: string } = {};

    for (const part of parts)
    {
      get[part.type] = part.value;
    }

    const read = (type: string) => get[type] || '00';

    return {
      day: read('year') + '-' + read('month') + '-' + read('day'),
      minute: Number(read('hour')) * HOUR + Number(read('minute'))
    };
  }

  /**
   * How far a zone's wall clock is ahead of UTC at an instant, in minutes.
   * New York in winter is `-300`, in summer `-240`; Tokyo is `540`.
   *
   * @param at The instant, a UNIX timestamp in milliseconds.
   * @param zone The IANA time zone.
   * @returns The offset in minutes, negative west of Greenwich.
   */
  public static offset(at: number, zone: string): number
  {
    return Math.round((this.wall(at, zone) - Math.floor(at / MINUTE) * MINUTE) / MINUTE);
  }

  /**
   * The instant a local day and minute of that day happen in a zone. A time
   * that happens twice is its first; a time that doesn't happen is that many
   * minutes past the jump.
   *
   * ```typescript
   * TimeZone.instant('2026-11-30', 9 * 60, 'America/New_York');
   * // Date.UTC(2026, 10, 30, 14, 0)
   * TimeZone.instant('2026-03-08', 2 * 60 + 30, 'America/New_York');
   * // 03:30 EDT, Date.UTC(2026, 2, 8, 7, 30)
   * ```
   *
   * @param day The local date, `YYYY-MM-DD`.
   * @param minute Minutes since local midnight.
   * @param zone The IANA time zone.
   * @returns The instant, a UNIX timestamp in milliseconds.
   */
  public static instant(day: string, minute: number, zone: string): number
  {
    // The wall clock read as UTC. The instant is within a day of it, and the
    // zone's offset there is the one a day before, the one a day after, or
    // (rarely) the one at it.
    const naive = this.utcOf(day, minute);
    const offset = (t: number) => this.wall(t, zone) - Math.floor(t / MINUTE) * MINUTE;
    const before = offset(naive - DAY);
    const offsets = [before, offset(naive), offset(naive + DAY)];
    let first: number = null;

    for (const o of offsets)
    {
      const at = naive - o;

      // A time that happens twice matches more than one offset: the first.
      if (this.wall(at, zone) === naive && (first === null || at < first))
      {
        first = at;
      }
    }

    // A time that doesn't happen: read with the offset before the jump, which
    // lands that many minutes past it.
    return first === null ? naive - before : first;
  }

  /**
   * An instant as a zone's wall clock reads it, with its offset, in ISO 8601:
   * `2026-11-30T09:00:00-05:00`. To the minute.
   *
   * @param at The instant, a UNIX timestamp in milliseconds.
   * @param zone The IANA time zone.
   * @returns The local date and time with the zone's offset at that instant.
   */
  public static localString(at: number, zone: string): string
  {
    const { day, minute } = this.local(at, zone);
    const offset = this.offset(at, zone);
    const sign = offset < 0 ? '-' : '+';
    const abs = Math.abs(offset);
    const pad = (n: number) => (n < TWO_DIGITS ? '0' : '') + n;

    return day + 'T' + pad(Math.floor(minute / HOUR)) + ':' + pad(minute % HOUR) + ':00' +
      sign + pad(Math.floor(abs / HOUR)) + ':' + pad(abs % HOUR);
  }

  /**
   * The wall clock in a zone at an instant, read as if it were UTC
   * (milliseconds, to the minute).
   *
   * @param at The instant, a UNIX timestamp in milliseconds.
   * @param zone The IANA time zone.
   */
  public static wall(at: number, zone: string): number
  {
    const { day, minute } = this.local(at, zone);

    return this.utcOf(day, minute);
  }

  /**
   * A local day and minute read as if it were UTC (milliseconds).
   *
   * @param day The date, `YYYY-MM-DD`.
   * @param minute Minutes since midnight.
   */
  private static utcOf(day: string, minute: number): number
  {
    const [y, m, d] = day.split('-').map(Number);

    return Date.UTC(y || EPOCH_YEAR, (m || 1) - 1, d || 1, 0, minute);
  }

  /**
   * The formatter for a zone's local date and 24-hour time, made once.
   *
   * @param zone The IANA time zone.
   * @throws RangeError for a zone the engine doesn't know.
   */
  private static formatter(zone: string): Intl.DateTimeFormat
  {
    let format = formatters[zone];

    if (!format)
    {
      const options: any = {
        timeZone: zone, year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
      };

      format = formatters[zone] = new Intl.DateTimeFormat('en-CA', options);
    }

    return format;
  }

}
