
import { Day } from './Day';
import { DaySpan } from './DaySpan';
import { Functions as fn } from './Functions';
import { Locales } from './Locale';

// tslint:disable: no-magic-numbers

/**
 * The type for identifiers. Most of the time an identifier can be stored as a
 * number because the 4 digit year is first. However when the year is below
 * 1000 a string will be used with zero padding. Storing identifiers as numbers
 * enable very quick comparisons and using strings or numbers allows the
 * identifier to be used as a key to a map.
 */
export type IdentifierInput = number | string;

/**
 * The possible properties which can be pulled from an identifier.
 */
export interface IdentifierObject
{
  /**
   * The year pulled from an identifier (0-9999).
   */
  year?: number;
  /**
   * The quarter of the year pulled from an identifier (1-4)
   */
  quarter?: number;
  /**
   * The month of the year pulled from an identifier (0-11)
   */
  month?: number;
  /**
   * The week of the year pulled from an identifier (1-52)
   */
  week?: number;
  /**
   * The day of the month pulled from an identifier (1-31)
   */
  day?: number;
  /**
   * The hour of the day pulled from an identifier (0-23)
   */
  hour?: number;
  /**
   * The minute of the hour pulled from an identifier (0-59)
   */
  minute?: number;
}


/**
 * A class for detecting, parsing, and building identifiers to and from days.
 *
 * An identifier is a simple value which represents a span of time. It may
 * represent an entire year, a quarter (3 months) of a year, a week of a year,
 * a month in a year, a specific day of a month of a year, or a specific hour,
 * minute, day, and month of a year.
 *
 * For example:
 * - `2018`: The year 2018
 * - `201801`: January 2018
 * - `2014023`: The 23rd week of 2014
 * - `20170311`: March 11th, 2017
 * - `201406151651`: June 15th 2016 at 4:51 pm
 * - `'0525'`: Year 525 of the first age, Elrond and Elros are born
 */
export abstract class Identifier
{

  /**
   * Determines whether the given identifier is this type.
   *
   * @param id The identifier to test.
   * @returns `true` if the identifier is this type, otherwise `false`.
   */
  public is(id: IdentifierInput): boolean
  {
    return (id + '').length === this.getLength();
  }

  /**
   * Returns the identifier of this type for the given day,
   *
   * @param day The day to get the identifier of.
   * @returns The identifier for the day of this type.
   */
  abstract get(day: Day): IdentifierInput;

  /**
   * Converts the given identifier which has passed [[Identifier.is]] to an
   * object with properties pulled from the identifier.
   *
   * @param id The identifier to parse.
   * @returns The object with properties parsed from the identifer.
   */
  abstract object(id: IdentifierInput): IdentifierObject;

  /**
   * Returns the start of the time span the identifier represents.
   *
   * @param id The identifier to convert to a start day.
   * @returns The start of the time span the identifier represents.
   */
  abstract start(id: IdentifierInput): Day;

  /**
   * Returns the span of time the identifier represents.
   *
   * @param id The identifier to convert to a span.
   * @param endInclusive When `true` the end of the span will be the very last
   *    millisecond that represents the timespan, otherwise `false` the end
   *    will be the start of the very next span.
   * @returns
   */
  abstract span(id: IdentifierInput, endInclusive: boolean): DaySpan;

  /**
   * Determines if the day matches the given identifier.
   *
   * @param day The day to test.
   * @param id The identifier to compare to.
   * @returns `true` if the day exists in the time span represented by the
   *    identifier, otherwise `false`.
   */
  abstract matches(day: Day, id: IdentifierInput): boolean;

  /**
   * Describes the given identifier as a human friendly string.
   *
   * @param id The identifier to describe.
   * @param short If the description should use shorter language or longer.
   * @returns The human friendly string that describes the identifier.
   */
  abstract describe(id: IdentifierInput, short: boolean): string;

  /**
   * The scales for all the different values stored in an identifier.
   */
  protected abstract getScales(): number[];

  /**
   * The length of the identifier of this type in digits.
   */
  protected abstract getLength(): number;

  /**
   * Computes the identifier given values taken from a [[Day]].
   *
   * @param values The values to compute.
   * @returns The computed identifier.
   */
  protected compute(...values: number[]): IdentifierInput
  {
    const scales: number[] = this.getScales();
    let total: number = 0;

    for (let i = 0; i < values.length; i++)
    {
      total += values[ i ] * scales[ i ];
    }

    return this.is( total ) ? total : fn.padNumber(total, this.getLength());
  }

  /**
   * Decomputes the given identifier and returns values which describe a span
   * of time.
   *
   * @param id The identifier to decompute.
   * @returns The original values which computed the identifier.
   */
  protected decompute(id: IdentifierInput): number[]
  {
    const scales: number[] = this.getScales();
    let total: number = fn.isNumber(id) ? id : parseInt(id);
    const values: number[] = [];

    for (let i = 0; i < scales.length - 1; i++)
    {
      const curr: number = scales[ i + 0 ];
      const next: number = scales[ i + 1 ];
      const mod: number = next / curr;
      const value: number = total % mod;

      values.push( value );
      total = Math.floor( total / mod );
    }

    values.push( total );

    return values;
  }

  /**
   * The identifier type for an hour of time on a specific day.
   */
  public static Time: Identifier = null;

  /**
   * The identifier type for a specific day.
   */
  public static Day: Identifier = null;

  /**
   * The identifier type for a specific week of a year.
   */
  public static Week: Identifier = null;

  /**
   * The identifier type for a specific month of a year.
   */
  public static Month: Identifier = null;

  /**
   * The identifier type for a specific quarter of a year.
   */
  public static Quarter: Identifier = null;

  /**
   * The identifier type for a specific year.
   */
  public static Year: Identifier = null;


  /**
   * Finds which identifier type matches the given identifier, if any.
   *
   * @param id The identifier to find the type of.
   * @returns The found identifier type, otherwise `null` if none exists.
   */
  public static find(id: IdentifierInput): Identifier
  {
    if (this.Time.is(id)) return this.Time;
    if (this.Day.is(id)) return this.Day;
    if (this.Week.is(id)) return this.Week;
    if (this.Month.is(id)) return this.Month;
    if (this.Year.is(id)) return this.Year;

    return null;
  }

  /**
   * Determines whether the given time span `outer` contains the time span
   * `inner`.
   *
   * @param outer The potentially larger time span `inner` must be contained in.
   * @param inner The time span to test is contained inside `outer`.
   * @returns `true` if `inner` is equal to or contained in `outer`, otherwise
   *    `false`.
   */
  public static contains(outer: IdentifierInput, inner: IdentifierInput): boolean
  {
    const outerString: string = outer + '';

    return (inner + '').substring( 0, outerString.length ) === outerString;
  }

}

// YYYYMMddHHmm (12)
class IdentifierTime extends Identifier
{

  private static SCALES: number[] = [
    1           /* minute */,
    100         /* hour   */,
    10000       /* day    */,
    1000000     /* month  */,
    100000000   /* year   */];

  private static LENGTH: number = 12;

  protected getScales(): number[]
  {
    return IdentifierTime.SCALES;
  }

  protected getLength(): number
  {
    return IdentifierTime.LENGTH;
  }

  public get(day: Day): IdentifierInput
  {
    return this.compute(day.minute, day.hour, day.dayOfMonth, day.month + 1, day.year);
  }

  public object(id: IdentifierInput): IdentifierObject
  {
    const values: number[] = this.decompute(id);

    return {
      minute:   values[0],
      hour:     values[1],
      day:      values[2],
      month:    values[3] - 1,
      year:     values[4]
    };
  }

  public start(id: IdentifierInput): Day
  {
    const obj: IdentifierObject = this.object(id);
    const start: Day = Day.build( obj.year, obj.month, obj.day, obj.hour, obj.minute );

    return start;
  }

  public span(id: IdentifierInput, endInclusive: boolean = false): DaySpan
  {
    const start: Day = this.start( id );
    const end: Day = start.endOf( 'hour', endInclusive );

    return new DaySpan(start, end);
  }

  public describe(id: IdentifierInput, short: boolean = false): string
  {
    const start: Day = this.start( id );
    const format: string = Locales.current.identifierTime(short);

    return start.format( format );
  }

  public matches(day: Day, id: IdentifierInput): boolean
  {
    return day.timeIdentifier === id;
    /*
    let obj: IdentifierObject = this.object(id);

    return (
      day.year === obj.year &&
      day.month === obj.month &&
      day.dayOfMonth === obj.day &&
      day.hour === obj.hour &&
      day.minute === obj.minute
    );
    */
  }

}

// YYYYMMdd (8)
class IdentifierDay extends Identifier
{

  private static SCALES: number[] = [
    1           /* day     */,
    100         /* month   */,
    10000       /* year    */];
  private static LENGTH: number = 8;

  protected getScales(): number[]
  {
    return IdentifierDay.SCALES;
  }

  protected getLength(): number
  {
    return IdentifierDay.LENGTH;
  }

  public get(day: Day): IdentifierInput
  {
    return this.compute(day.dayOfMonth, day.month + 1, day.year);
  }

  public object(id: IdentifierInput): IdentifierObject
  {
    const values: number[] = this.decompute(id);

    return {
      day:      values[0],
      month:    values[1] - 1,
      year:     values[2]
    };
  }

  public start(id: IdentifierInput): Day
  {
    const obj: IdentifierObject = this.object(id);
    const start: Day = Day.build( obj.year, obj.month, obj.day );

    return start;
  }

  public span(id: IdentifierInput, endInclusive: boolean = false): DaySpan
  {
    const start: Day = this.start( id );
    const end: Day = start.endOf( 'day', endInclusive );

    return new DaySpan(start, end);
  }

  public describe(id: IdentifierInput, short: boolean = false): string
  {
    const start: Day = this.start( id );
    const format: string = Locales.current.identifierDay(short);

    return start.format( format );
  }

  public matches(day: Day, id: IdentifierInput): boolean
  {
    return day.dayIdentifier === id;
    /*
    let obj: IdentifierObject = this.object(id);

    return (
      day.year === obj.year &&
      day.month === obj.month &&
      day.dayOfMonth === obj.day
    );
    */
  }

}

// YYYY0ww (7)
class IdentifierWeek extends Identifier
{

  private static SCALES: number[] = [
    1           /* week   */,
    1000        /* year   */];
  private static LENGTH: number = 7;

  protected getScales(): number[]
  {
    return IdentifierWeek.SCALES;
  }

  protected getLength(): number
  {
    return IdentifierWeek.LENGTH;
  }

  public get(day: Day): IdentifierInput
  {
    return this.compute(day.weekOfYear, day.year);
  }

  public object(id: IdentifierInput): IdentifierObject
  {
    const values: number[] = this.decompute(id);

    return {
      week:     values[0],
      year:     values[1]
    };
  }

  public start(id: IdentifierInput): Day
  {
    const obj: IdentifierObject = this.object(id);
    const start: Day = Day.build( obj.year, 0 ).withWeekOfYear( obj.week );

    return start;
  }

  public span(id: IdentifierInput, endInclusive: boolean = false): DaySpan
  {
    const start: Day = this.start( id );
    const end: Day = start.endOf( 'week', endInclusive );

    return new DaySpan(start, end);
  }

  public describe(id: IdentifierInput, short: boolean = false): string
  {
    const start: Day = this.start( id );
    const format: string = Locales.current.identifierWeek(short);

    return start.format( format );
  }

  public matches(day: Day, id: IdentifierInput): boolean
  {
    return day.weekIdentifier === id;
    /*
    let obj: IdentifierObject = this.object(id);

    return (
      day.year === obj.year &&
      day.week === obj.week
    );
    */
  }

}

// YYYYMM (6)
class IdentifierMonth extends Identifier
{

  private static SCALES: number[] = [
    1           /* month  */,
    100         /* year   */];
  private static LENGTH: number = 6;

  protected getScales(): number[]
  {
    return IdentifierMonth.SCALES;
  }

  protected getLength(): number
  {
    return IdentifierMonth.LENGTH;
  }

  public get(day: Day): IdentifierInput
  {
    return this.compute(day.month + 1, day.year);
  }

  public object(id: IdentifierInput): IdentifierObject
  {
    const values: number[] = this.decompute(id);

    return {
      month:    values[0] - 1,
      year:     values[1]
    };
  }

  public start(id: IdentifierInput): Day
  {
    const obj: IdentifierObject = this.object(id);
    const start: Day = Day.build( obj.year, obj.month );

    return start;
  }

  public span(id: IdentifierInput, endInclusive: boolean = false): DaySpan
  {
    const start: Day = this.start( id );
    const end: Day = start.endOf( 'month', endInclusive );

    return new DaySpan(start, end);
  }

  public describe(id: IdentifierInput, short: boolean = false): string
  {
    const start: Day = this.start( id );
    const format: string = Locales.current.identifierMonth(short);

    return start.format( format );
  }

  public matches(day: Day, id: IdentifierInput): boolean
  {
    return day.monthIdentifier === id;
    /*
    let obj: IdentifierObject = this.object(id);

    return (
      day.year === obj.year &&
      day.month === obj.month
    );
    */
  }

}

// YYYYQ (5)
class IdentifierQuarter extends Identifier
{

  private static SCALES: number[] = [
    1           /* quarter  */,
    10          /* year   */];
  private static LENGTH: number = 5;

  protected getScales(): number[]
  {
    return IdentifierQuarter.SCALES;
  }

  protected getLength(): number
  {
    return IdentifierQuarter.LENGTH;
  }

  public get(day: Day): IdentifierInput
  {
    return this.compute(day.quarter, day.year);
  }

  public object(id: IdentifierInput): IdentifierObject
  {
    const values: number[] = this.decompute(id);

    return {
      quarter:  values[0],
      year:     values[1]
    };
  }

  public start(id: IdentifierInput): Day
  {
    const obj: IdentifierObject = this.object(id);
    const start: Day = Day.build( obj.year, (obj.quarter - 1) * 3 );

    return start;
  }

  public span(id: IdentifierInput, endInclusive: boolean = false): DaySpan
  {
    const start: Day = this.start( id );
    const end: Day = start.add('month', 3).endOf('month', endInclusive);

    return new DaySpan(start, end);
  }

  public describe(id: IdentifierInput, short: boolean = false): string
  {
    const start: Day = this.start( id );
    const format: string = Locales.current.identifierQuarter(short);

    return start.format( format );
  }

  public matches(day: Day, id: IdentifierInput): boolean
  {
    return day.quarterIdentifier === id;
    /*
    let obj: IdentifierObject = this.object(id);

    return (
      day.year === obj.year &&
      day.quarter === obj.quarter
    );
    */
  }

}

// YYYY (4)
class IdentifierYear extends Identifier
{

  private static SCALES: number[] = [
    1           /* year  */];
  private static LENGTH: number = 4;

  protected getScales(): number[]
  {
    return IdentifierYear.SCALES;
  }

  protected getLength(): number
  {
    return IdentifierYear.LENGTH;
  }

  public get(day: Day): IdentifierInput
  {
    return this.compute(day.year);
  }

  public object(id: IdentifierInput): IdentifierObject
  {
    const values: number[] = this.decompute(id);

    return {
      year:     values[0]
    };
  }

  public start(id: IdentifierInput): Day
  {
    const obj: IdentifierObject = this.object(id);
    const start: Day = Day.build( obj.year, 0 );

    return start;
  }

  public span(id: IdentifierInput, endInclusive: boolean = false): DaySpan
  {
    const start: Day = this.start( id );
    const end: Day = start.endOf( 'year', endInclusive );

    return new DaySpan(start, end);
  }

  public describe(id: IdentifierInput, short: boolean = false): string
  {
    const start: Day = this.start( id );
    const format: string = Locales.current.identifierYear(short);

    return start.format( format );
  }

  public matches(day: Day, id: IdentifierInput): boolean
  {
    return day.year === id;
    /*
    let obj: IdentifierObject = this.object(id);

    return (
      day.year === obj.year
    );
    */
  }

}

// Sets the Identifier types
Identifier.Time = new IdentifierTime();
Identifier.Day = new IdentifierDay();
Identifier.Week = new IdentifierWeek();
Identifier.Month = new IdentifierMonth();
Identifier.Quarter = new IdentifierQuarter();
Identifier.Year = new IdentifierYear();