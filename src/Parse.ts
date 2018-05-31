
import { Functions as fn } from './Functions';
import { FrequencyCheck } from './Frequency';
import { Schedule, ScheduleInput, ScheduleExclusions } from './Schedule';
import { Constants } from './Constants';
import { Day, DayInput, DurationInput } from './Day';
import { CalendarScheduleInput, CalendarSchedule } from './Calendar';
import { Time } from './Time';


/**
 * The class which takes user input and parses it to specific structures.
 */
export class Parse
{

  /**
   * Parses a value and converts it to a [[FrequencyCheck]].
   *
   * @param input The input to parse into a function.
   * @returns A function which determines whether a value matches a frequency.
   * @see [[Schedule]]
   */
  public static frequency(input: any, property: string): FrequencyCheck
  {
    let check: FrequencyCheck = (value: number) => {
      return true;
    };

    check.given = false;

    if (fn.isFrequencyValueEvery(input))
    {
      let offset: number = input.offset || 0;
      let every: number = input.every;

      check = (value: number) => {
        return value % every === offset;
      };
      check.given = true;
    }

    if (fn.isFrequencyValueOneOf(input))
    {
      let map: object = {};

      for (let i = 0; i < input.length; i++) {
        map[ input[ i ] ] = true;
      }

      check = (value: number) => {
        return !!map[ value ];
      };
      check.given = true;
    }

    check.input = input;
    check.property = property;

    return check;
  }

  /**
   * Parses [[DayInput]] into a [[Day]] instance.
   *
   * ```typescript
   * Parse.day( 65342300 );               // unix timestamp
   * Parse.day( '01/02/2014' );           // strings in many formats
   * Parse.day( day );                    // return a passed instance
   * Parse.day( [2018, 0, 2] );           // array: 01/02/2018
   * Parse.day( {year: 2018, month: 2} ); // object: 03/01/2018
   * Parse.day( true );                   // today
   * ```
   *
   * @param input The input to parse.
   * @returns The Day parsed or `null` if the value is not valid.
   */
  public static day(input: DayInput): Day
  {
    if (fn.isNumber(input))
    {
      return Day.unix( <number>input );
    }
    else if (fn.isString(input))
    {
      return Day.fromString( <string>input );
    }
    else if (input instanceof Day)
    {
      return input;
    }
    else if (fn.isArray( input ))
    {
      return Day.fromArray( <number[]>input );
    }
    else if (fn.isObject( input ))
    {
      return Day.fromObject( <object>input );
    }
    else if (input === true)
    {
      return Day.today();
    }

    return null;
  }

  /**
   * Parses a value and tries to convert it to a Time instance.
   *
   * ```typescript
   * Parse.time( time );      // return a passed instance
   * Parse.time( 9 );         // 09:00:00.000
   * Parse.time( 3009 );      // 09:30:00.000
   * Parse.time( 593009 );    // 09:30:59.000
   * Parsetime( '09' );       // 09:00:00.000
   * Parse.time( '9:30' );    // 09:30:00.000
   * Parse.time( '9:30:59' ); // 09:30:59.000
   * Parse.time( {hour: 2} ); // 02:00:00.000
   * ```
   *
   * @param input The input to parse.
   * @returns The instance parsed or `null` if it was invalid.
   * @see [[Time.fromIdentifier]]
   * @see [[Time.fromString]]
   */
  public static time(input: any): Time
  {
    if (input instanceof Time)
    {
      return input;
    }
    if (fn.isNumber(input))
    {
      return Time.fromIdentifier( <number>input );
    }
    if (fn.isString(input))
    {
      return Time.fromString( <string>input );
    }
    if (fn.isObject(input) && fn.isNumber(input.hour))
    {
      return new Time(input.hour, input.minute, input.second, input.millisecond);
    }

    return null;
  }

  /**
   * Parses a value and tries to convert it to an array of Time instances.
   * If any of the given values are not a valid time value then the resulting
   * array will not contain a time instance.
   *
   * @param input The input to parse.
   * @returns A non-null array of time instances.
   * @see [[Parse.time]]
   */
  public static times(input: any): Time[]
  {
    let times: Time[] = [];

    if (fn.isArray(input))
    {
      for (let timeInput of input)
      {
        let time = this.time( timeInput );

        if (time)
        {
          times.push( time );
        }
      }
    }

    return times;
  }

  /**
   * Parses an array of excluded days into a map of excluded days where the
   * array value and returned object key are [[Day.dayIdentifier]].
   *
   * ```typescript
   * Parse.exclusions( [ 01012018, 05062014 ] ); // {'01012018': true, '05062014': true}
   * ```
   *
   * @param input The input to parse.
   * @returns The object with identifier keys and `true` values.
   * @see [[Day.dayIdentifier]]
   */
  public static exclusions(input: any): ScheduleExclusions
  {
    let exclusions: ScheduleExclusions = {};

    if (fn.isArray(input))
    {
      for (let dayIdentifier of input)
      {
        if (fn.isNumber(dayIdentifier))
        {
          exclusions[ dayIdentifier ] = true;
        }
        else
        {
          let day: Day = this.day( dayIdentifier );

          if (day)
          {
            exclusions[ day.dayIdentifier ] = true;
          }
        }
      }
    }

    return exclusions;
  }

  /**
   * Parses an object which specifies a schedule where events may or may not
   * repeat and they may be all day events or at specific times.
   *
   * @param input The input to parse into a schedule.
   * @param out The schedule to set the values of and return.
   * @returns An instance of the parsed [[Schedule]].
   */
  public static schedule(input: ScheduleInput, out: Schedule = new Schedule()): Schedule
  {
    let on: Day = this.day( input.on );
    let times: Time[] = this.times( input.times );
    let fullDay: boolean = times.length === 0;

    if (on)
    {
      input.start = on.start();
      input.end = on.end();
      input.year = [on.year];
      input.month = [on.month];
      input.dayOfMonth = [on.dayOfMonth];
    }

    out.times = times;
    out.duration = fn.coalesce( input.duration, Constants.DURATION_DEFAULT );
    out.durationUnit = <DurationInput>fn.coalesce( input.durationUnit, Constants.DURATION_DEFAULT_UNIT( fullDay ) );
    out.start = this.day( input.start );
    out.end = this.day( input.end );
    out.exclude = this.exclusions( input.exclude );
    out.year = this.frequency( input.year, 'year' );
    out.month = this.frequency( input.month, 'month' );
    out.week = this.frequency( input.week, 'week' );
    out.weekOfYear = this.frequency( input.weekOfYear, 'weekOfYear' );
    out.weekspanOfYear = this.frequency( input.weekspanOfYear, 'weekspanOfYear' );
    out.fullWeekOfYear = this.frequency( input.fullWeekOfYear, 'fullWeekOfYear' );
    out.lastWeekspanOfYear = this.frequency( input.lastWeekspanOfYear, 'lastWeekspanOfYear' );
    out.lastFullWeekOfYear = this.frequency( input.lastFullWeekOfYear, 'lastFullWeekOfYear' );
    out.weekOfMonth = this.frequency( input.weekOfMonth, 'weekOfMonth' );
    out.weekspanOfMonth = this.frequency( input.weekspanOfMonth, 'weekspanOfMonth' );
    out.fullWeekOfMonth = this.frequency( input.fullWeekOfMonth, 'fullWeekOfMonth' );
    out.lastWeekspanOfMonth = this.frequency( input.lastWeekspanOfMonth, 'lastWeekspanOfMonth' );
    out.lastFullWeekOfMonth = this.frequency( input.lastFullWeekOfMonth, 'lastFullWeekOfMonth' );
    out.dayOfWeek = this.frequency( input.dayOfWeek, 'dayOfWeek' );
    out.dayOfMonth = this.frequency( input.dayOfMonth, 'dayOfMonth' );
    out.lastDayOfMonth = this.frequency( input.lastDayOfMonth, 'lastDayOfMonth' );
    out.dayOfYear = this.frequency( input.dayOfYear, 'dayOfYear' );
    out.updateDurationInDays();
    out.updateChecks();

    return out;
  }

  /**
   * Parses an array of [[FrequencyCheck]] functions and returns an array of
   * functions for only the checks that were specified by the user.
   *
   * @param checks The array of check functions to filter through.
   * @returns The array of user specified checks.
   */
  public static givenFrequency(checks: FrequencyCheck[]): FrequencyCheck[]
  {
    let out: FrequencyCheck[] = [];

    for (let check of checks)
    {
      if (check.given)
      {
        out.push( check );
      }
    }

    return out;
  }

  /**
   * Parses [[CalendarScheduleInput]] and returns a [[CalendarSchedule]].
   *
   * @param input The input to parse.
   * @returns The parsed value.
   */
  public static calendarSchedule<T>(input: CalendarScheduleInput<T>): CalendarSchedule<T>
  {
    if (input.schedule instanceof Schedule)
    {
      return <CalendarSchedule<T>>input;
    }

    return {
      schedule: this.schedule( input.schedule ),
      event: input.event
    };
  }

  /**
   * Parses a schedule from a CRON pattern. TODO
   */
  public static cron(pattern: string, out: Schedule = new Schedule()): Schedule
  {
    return out;
  }

}
