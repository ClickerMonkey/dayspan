
import { Day } from './Day';
import { Op } from './Operation';
import { Units } from './Units';


/**
 * A class for a range of time between two [[Day]] timestamps.
 */
export class DaySpan
{


  /**
   * The starting timestamp of the span (inclusive).
   */
  public start: Day;

  /**
   * The endind timestamp of the span (inclusive).
   */
  public end: Day;


  /**
   * Creates a new span of time.
   *
   * @param start The starting timestamp.
   * @param end The ending timestamp.
   */
  public constructor(start: Day, end: Day)
  {
    this.start = start;
    this.end = end;
  }

  /**
   * Whether this span starts and ends on the same timestamp.
   */
  public get isPoint(): boolean
  {
    return this.start.time === this.end.time;
  }

  /**
   * Determines whether the given timestamp lies between the start and end
   * timestamp.
   *
   * @param day The timestamp to test.
   * @returns True if the day is >= the start and <= the end of this span.
   */
  public contains(day: Day): boolean
  {
    return day.time >= this.start.time && day.time <= this.end.time;
  }

  /**
   * Compares the given timestamp to this span. If the timestamp is before this
   * span then `-1` is returned, if the timestamp is after this span then `1`
   * us returned, otherwise `0` is returned when the timestamp is in this span.
   *
   * @param day The timestamp to compare to.
   * @returns `-1`, `0`, or `1` depending on the given timestamp relative to
   *    this span.
   */
  public compareTo(day: Day): number
  {
    return day.time < this.start.time ? -1 : (day.time > this.end.time ? 1 : 0);
  }

  /**
   * Determines whether the given timestamp is between the start and end
   * timestamp or lies on the same day as the start or end timestamp.
   *
   * @param day The timestamp to test.
   * @see [[Day.sameDay]]
   */
  public matchesDay(day: Day): boolean
  {
    return this.contains( day ) || day.sameDay( this.start ) || day.sameDay( this.end );
  }

  /**
   * Determines whether the given timestamp is between the start and end
   * timestamp or lies on the same week as the start or end timestamp.
   *
   * @param day The timestamp to test.
   * @see [[Day.sameWeek]]
   */
  public matchesWeek(day: Day): boolean
  {
    return this.contains( day ) || day.sameWeek( this.start ) || day.sameWeek( this.end );
  }

  /**
   * Determines whether the given timestamp is between the start and end
   * timestamp or lies on the same month as the start or end timestamp.
   *
   * @param day The timestamp to test.
   * @see [[Day.sameMonth]]
   */
  public matchesMonth(day: Day): boolean
  {
    return this.contains( day ) || day.sameMonth( this.start ) || day.sameMonth( this.end );
  }

  /**
   * Determines whether the given timestamp is between the start and end
   * timestamp or lies on the same year as the start or end timestamp.
   *
   * @param day The timestamp to test.
   * @see [[Day.sameYear]]
   */
  public matchesYear(day: Day): boolean
  {
    return this.contains( day ) || day.sameYear( this.start ) || day.sameYear( this.end );
  }


  /**
   * Calculates the number of milliseconds between the start and end timestamp.
   *
   * @param op The operation to perform on the result.
   * @param absolute Whether the result should always be positive.
   * @returns The time between the start and end timestamp.
   * @see [[Day.millisBetween]]
   */
  public millis(op: Op = Op.DOWN, absolute: boolean = true): number
  {
    return this.start.millisBetween(this.end, op, absolute);
  }

  /**
   * Calculates the number of seconds between the start and end timestamp.
   *
   * @param op The operation to perform on the result.
   * @param absolute Whether the result should always be positive.
   * @returns The time between the start and end timestamp.
   * @see [[Day.secondsBetween]]
   */
  public seconds(op: Op = Op.DOWN, absolute: boolean = true): number
  {
    return this.start.secondsBetween(this.end, op, absolute);
  }

  /**
   * Calculates the number of minutes between the start and end timestamp.
   *
   * @param op The operation to perform on the result.
   * @param absolute Whether the result should always be positive.
   * @returns The time between the start and end timestamp.
   * @see [[Day.minutesBetween]]
   */
  public minutes(op: Op = Op.DOWN, absolute: boolean = true): number
  {
    return this.start.minutesBetween(this.end, op, absolute);
  }

  /**
   * Calculates the number of hours between the start and end timestamp.
   *
   * @param op The operation to perform on the result.
   * @param absolute Whether the result should always be positive.
   * @returns The time between the start and end timestamp.
   * @see [[Day.hoursBetween]]
   */
  public hours(op: Op = Op.DOWN, absolute: boolean = true): number
  {
    return this.start.hoursBetween(this.end, op, absolute);
  }

  /**
   * Calculates the number of days between the start and end timestamp.
   *
   * @param op The operation to perform on the result.
   * @param absolute Whether the result should always be positive.
   * @returns The time between the start and end timestamp.
   * @see [[Day.daysBetween]]
   */
  public days(op: Op = Op.DOWN, absolute: boolean = true): number
  {
    return this.start.daysBetween(this.end, op, absolute);
  }

  /**
   * Calculates the number of weeks between the start and end timestamp.
   *
   * @param op The operation to perform on the result.
   * @param absolute Whether the result should always be positive.
   * @returns The time between the start and end timestamp.
   * @see [[Day.weeksBetween]]
   */
  public weeks(op: Op = Op.DOWN, absolute: boolean = true): number
  {
    return this.start.weeksBetween(this.end, op, absolute);
  }

  /**
   * Calculates the number of months between the start and end timestamp.
   *
   * @param op The operation to perform on the result.
   * @param absolute Whether the result should always be positive.
   * @returns The time between the start and end timestamp.
   * @see [[Day.monthsBetween]]
   */
  public months(op: Op = Op.DOWN, absolute: boolean = true): number
  {
    return this.start.monthsBetween(this.end, op, absolute);
  }

  /**
   * Calculates the number of years between the start and end timestamp.
   *
   * @param op The operation to perform on the result.
   * @param absolute Whether the result should always be positive.
   * @returns The time between the start and end timestamp.
   * @see [[Day.yearsBetween]]
   */
  public years(op: Op = Op.DOWN, absolute: boolean = true): number
  {
    return this.start.yearsBetween(this.end, op, absolute);
  }

  /**
   * Summarizes this span given an approximate unit of time and a few other
   * options. If the start and end are on the same unit, a single value will
   * be returned. Otherwise a start and end will be returned with a `delimiter`.
   *
   * @param type The unit of time this span is for.
   * @param dayOfWeek When `true` the weekday of the start and end are included.
   * @param short When `true` the short form of weekdays and months will be used.
   * @param repeat When `true` the year will be repeated on the start and end
   *  timestamp even if they are the same year.
   * @param contextual When `true` the year will be hidden if it's the current
   *  year.
   * @param delimiter The string to separate the start and end timestamps with.
   * @returns The summary of this span.
   */
  public summary(type: Units, dayOfWeek: boolean = true, short: boolean = false, repeat: boolean = false, contextual: boolean = true, delimiter: string = ' - '): string
  {
    let formats = DaySpan.SUMMARY_FORMATS[ type ];
    let today: Day = Day.today();
    let showStartYear: boolean = !contextual || !this.start.sameYear( today );
    let showEndYear: boolean = !contextual || !this.end.sameYear( today );
    let start: string = this.start.format( formats(short, dayOfWeek, showStartYear) );
    let end: string = this.end.format( formats(short, dayOfWeek, showEndYear) );
    let summary: string = start;

    if (start !== end)
    {
      if (!repeat)
      {
        summary = this.start.format( formats(short, dayOfWeek, !this.start.sameYear(this.end)) );
      }

      summary += delimiter;
      summary += end;
    }
    else
    {
      summary = start;
    }

    return summary;
  }

  /**
   * Determines whether the gven span intersects with this span.
   *
   * @param span The span to test.
   * @returns `true` if the spans intersect, otherwise `false`.
   */
  public intersects(span: DaySpan): boolean
  {
    return !(
      this.end.time < span.start.time ||
      this.start.time > span.end.time
    );
  }

  /**
   * Calculates the intersection between this span and the given span. If there
   * is no intersection between the two spans then `null` is returned.
   *
   * @param span The span to calculate the intersection with.
   * @returns The intersection or `null` if none exists.
   */
  public intersection(span: DaySpan): DaySpan
  {
    let start: Day = this.start.max( span.start );
    let end: Day = this.end.min( span.end );

    return start.isAfter( end ) ? null : new DaySpan(start, end);
  }

  /**
   * Calculates the union between this span and the given span.
   *
   * @param span The span to calculate the union with.
   * @returns The union of the two spans.
   */
  public union(span: DaySpan): DaySpan
  {
    let start: Day = this.start.min( span.start );
    let end: Day = this.end.max( span.end );

    return new DaySpan(start, end);
  }

  /**
   * Returns a point [[DaySpan]] with the same start and end timestamp.
   *
   * @param day The timestamp which will be the start and end.
   * @returns The new instance.
   * @see [[DaySpan.isPoint]]
   */
  public static point(day: Day): DaySpan
  {
    return new DaySpan( day, day );
  }


  /**
   * Formatting functions which assist the [[DaySpan.summary]] function.
   */
  public static SUMMARY_FORMATS =
  {
    [Units.DAY]: (short: boolean, dayOfWeek: boolean, year: boolean) => {
      return (dayOfWeek ? (short ? 'ddd, ' : 'dddd, ') : '') + (short ? 'MMM ' : 'MMMM ') + 'Do' + (year ? ' YYYY' : '');
    },
    [Units.WEEK]: (short: boolean, dayOfWeek: boolean, year: boolean) => {
      return (dayOfWeek ? (short ? 'ddd, ' : 'dddd, ') : '') + (short ? 'MMM ' : 'MMMM ') + 'Do' + (year ? ' YYYY' : '');
    },
    [Units.MONTH]: (short: boolean, dayOfWeek: boolean, year: boolean) => {
      return (short ? 'MMM' : 'MMMM') + (year ? ' YYYY' : '');
    },
    [Units.YEAR]: (short: boolean, dayOfWeek: boolean, year: boolean) => {
      return (year ? 'YYYY' : '');
    }
  };

}
