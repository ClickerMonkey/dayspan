
import { Functions as fn } from './Functions';
import { Constants } from './Constants';
import { Parse } from './Parse';


/**
 * A value that can possibly be parsed into a Time instance.
 *
 * @see [[Time.parse]]
 */
export type TimeInput = Time | number | string | {hour: number, minute?: number, second?: number, millisecond?: number};

/**
 * A class which holds a specific time during in any day.
 */
export class Time
{

  /**
   * The regular expression used to parse a time from a string.
   *
   * - ## = hour
   * - ##:## = hour & minute
   * - ##:##:## = hour, minute, & second
   * - ##:##:##.### = hour, minute, second, and milliseconds
   */
  public static REGEX = /^(\d\d?):?(\d\d)?:?(\d\d)?\.?(\d\d\d)?$/;

  /**
   * The hour between 0 and 23
   */
  public hour: number;

  /**
   * The minute between 0 and 59
   */
  public minute: number;

  /**
   * The second between 0 and 59
   */
  public second: number;

  /**
   * The millisecond between 0 and 999
   */
  public millisecond: number;


  /**
   * Creates a new Time instance given an hour and optionally a minute, second,
   * and millisecond. If they have not been specified they default to 0.
   *
   * @param hour The hour.
   * @param minute The minute.
   * @param second The second.
   * @param millisecond The millisecond.
   */
  public constructor(hour: number, minute: number = Constants.MINUTE_MIN, second: number = Constants.SECOND_MIN, millisecond: number = Constants.MILLIS_MIN)
  {
    this.hour = hour;
    this.minute = minute;
    this.second = second;
    this.millisecond = millisecond;
  }

  /**
   * Formats this time into a string. The following list describes the available
   * formatting patterns:
   *
   * ### Hour
   * - H: 0-23
   * - HH: 00-23
   * - h: 12,1-12,1-11
   * - hh: 12,01-12,01-11
   * - k: 1-24
   * - kk: 01-24
   * - a: am,pm
   * - A: AM,PM
   * ### Minute
   * - m: 0-59
   * - mm: 00-59
   * ### Second
   * - s: 0-59
   * - ss: 00-59
   * ### Millisecond
   * - S: 0-9
   * - SS: 00-99
   * - SSS: 000-999
   *
   * @param format The format to output.
   * @returns The formatted time.
   */
  public format(format: string): string
  {
    let formatterEntries = Time.FORMATTERS;
    let out: string = '';

    for (let i = 0; i < format.length; i++)
    {
      let handled: boolean = false;

      for (let k = 0; k < formatterEntries.length && !handled; k++)
      {
        let entry = formatterEntries[ k ];
        let part: string = format.substring( i, i + entry.size );

        if (part.length === entry.size)
        {
          let formatter = entry.formats[ part ];

          if (formatter)
          {
            out += formatter(this);
            i += entry.size - 1;
            handled = true;
          }
        }
      }

      if (!handled)
      {
        out += format.charAt(i);
      }
    }

    return out;
  }

  /**
   * Determines whether this time is an exact match for the given time.
   *
   * @param time The given time to test against.
   * @returns `true` if the time matches this time, otherwise `false`.
   */
  public matches(time: Time): boolean
  {
    return this.hour === time.hour &&
      this.minute === time.minute &&
      this.second === time.second &&
      this.millisecond === time.millisecond;
  }

  /**
   * Determines whether this time has the same hour as the given time.
   *
   * @param time The given time to test against.
   * @returns `true` if the given hour matches this hour, otherwise `false`.
   */
  public matchesHour(time: Time): boolean
  {
    return this.hour === time.hour;
  }

  /**
   * Determines whether this time has the same hour and minute as the given time.
   *
   * @param time The given time to test against.
   * @returns `true` if the given hour and minute matches, otherwise `false`.
   */
  public matchesMinute(time: Time): boolean
  {
    return this.hour === time.hour &&
      this.minute === time.minute;
  }

  /**
   * Determines whether this time has the same hour, minute, and second as the
   * given time.
   *
   * @param time The given time to test against.
   * @returns `true` if the given hour, minute, and second matches, otherwise
   *    `false`.
   */
  public matchesSecond(time: Time): boolean
  {
    return this.hour === time.hour &&
      this.minute === time.minute &&
      this.second === time.second;
  }

  /**
   * Sets the time of this instance to the same time of the given input.
   *
   * @param input The time to set this to.
   * @returns `true` if this time was set, otherwise `false` (invalid input).
   */
  public set(input: TimeInput): boolean
  {
    let parsed: Time = Time.parse( input );
    let valid: boolean = !!parsed;

    if (valid)
    {
      this.hour = parsed.hour;
      this.minute = parsed.minute;
      this.second = parsed.second;
      this.millisecond = parsed.millisecond;
    }

    return valid;
  }

  /**
   * @returns The number of milliseconds from the start of the day until this
   *  time.
   */
  public toMilliseconds(): number
  {
    return this.hour * Constants.MILLIS_IN_HOUR +
      this.minute * Constants.MILLIS_IN_MINUTE +
      this.second * Constants.MILLIS_IN_SECOND +
      this.millisecond;
  }

  /**
   * @returns The time formatted using the smallest format that completely
   *  represents this time.
   */
  public toString(): string
  {
    if (this.millisecond) return this.format('HH:mm:ss.SSS');
    if (this.second) return this.format('HH:mm:ss');
    if (this.minute) return this.format('HH:mm');

    return this.format('HH');
  }

  /**
   * @returns A unique identifier for this time. The number returned is in the
   *  following format: SSSssmmHH
   */
  public toIdentifier(): number
  {
    return this.hour +
      this.minute * 100 +
      this.second * 10000 +
      this.millisecond * 10000000;
  }

  /**
   * @returns An object with hour, minute, second, a millisecond properties if
   *  they are non-zero on this time.
   */
  public toObject(): TimeInput
  {
    let out: TimeInput = {
      hour: this.hour
    };

    if (this.minute) out.minute = this.minute;
    if (this.second) out.second = this.second;
    if (this.millisecond) out.millisecond = this.millisecond;

    return out;
  }

  /**
   * Parses a value and tries to convert it to a Time instance.
   *
   * @param input The input to parse.
   * @returns The instance parsed or `null` if it was invalid.
   * @see [[Parse.time]]
   */
  public static parse(input: any): Time
  {
    return Parse.time(input);
  }

  /**
   * Parses a string and converts it to a Time instance. If the string is not
   * in a valid format `null` is returned.
   *
   * @param time The string to parse.
   * @returns The instance parsed or `null` if it was invalid.
   * @see [[Time.REGEX]]
   */
  public static fromString(time: string): Time
  {
    let matches: string[] = this.REGEX.exec( time );

    if (!matches)
    {
      return null;
    }

    let h: number = parseInt(matches[1]) || 0;
    let m: number = parseInt(matches[2]) || 0;
    let s: number = parseInt(matches[3]) || 0;
    let l: number = parseInt(matches[4]) || 0;

    return this.build(h, m, s, l);
  }

  /**
   * Parses a number and converts it to a Time instance. The number is assumed
   * to be in the [[Time.toIdentifier]] format.
   *
   * @param time The number to parse.
   * @returns The instance parsed.
   */
  public static fromIdentifier(time: number): Time
  {
    let h: number = time % 100;
    let m: number = Math.floor(time / 100) % 100;
    let s: number = Math.floor(time / 10000) % 100;
    let l: number = Math.floor(time / 10000000) % 1000;

    return this.build(h, m, s, l);
  }

  /**
   * Returns a new instance given an hour and optionally a minute, second,
   * and millisecond. If they have not been specified they default to 0.
   *
   * @param hour The hour.
   * @param minute The minute.
   * @param second The second.
   * @param millisecond The millisecond.
   * @returns A new instance.
   */
  public static build(hour: number, minute: number = Constants.MINUTE_MIN, second: number = Constants.SECOND_MIN, millisecond: number = Constants.MILLIS_MIN): Time
  {
    return new Time(hour, minute, second, millisecond)
  }

  /**
   * A set of formatting functions keyed by their format string.
   */
  public static FORMATTERS = [
    {
      size: 3,
      formats: {
        SSS: (t: Time) => fn.padNumber(t.millisecond, 3)
      }
    },
    {
      size: 2,
      formats: {
        HH: (t: Time) => fn.padNumber(t.hour, 2),
        hh: (t: Time) => fn.padNumber((t.hour % 12) || 12, 2),
        kk: (t: Time) => fn.padNumber(t.hour + 1, 2),
        mm: (t: Time) => fn.padNumber(t.minute, 2),
        ss: (t: Time) => fn.padNumber(t.second, 2),
        SS: (t: Time) => fn.padNumber(t.millisecond, 3, 2)
      }
    },
    {
      size: 1,
      formats: {
        A: (t: Time) => t.hour < 12 ? 'AM' : 'PM',
        a: (t: Time) => t.hour < 12 ? 'am' : 'pm',
        H: (t: Time) => t.hour + '',
        h: (t: Time) => ((t.hour % 12) || 12) + '',
        k: (t: Time) => (t.hour + 1) + '',
        m: (t: Time) => t.minute + '',
        s: (t: Time) => t.second + '',
        S: (t: Time) => fn.padNumber(t.millisecond, 3, 1)
      }
    }
  ];

}
