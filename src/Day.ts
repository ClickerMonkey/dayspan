
import { Constants } from './Constants';
import { DayFormat } from './DayFormat';
import { add, compare, diff, endOf, getDateOffset, getDayOfWeek, getDayOfYear, getDaysInMonth, getDaysInYear, getFullWeekOfMonth, getFullWeekOfYear, getLastDayOfMonth, getLastFullWeekOfMonth, getLastFullWeekOfYear, getLastWeekspanOfMonth, getLastWeekspanOfYear, getQuarter, getWeekOfMonthISO, getWeekOfYear, getWeekOfYearISO, getWeeksInYear, getWeekspanOfMonth, getWeekspanOfYear, isDaylightSavingTime, isLeapYear, startOf, Unit } from './DayFunctions';
import { Functions as fn } from './Functions';
import { Identifier, IdentifierInput } from './Identifier';
import { Locale, LocaleOptions, Locales } from './Locale';
import { Op, operate } from './Operation';
import { Parse } from './Parse';
import { Ref } from './Ref';
import { Time } from './Time';


/**
 * All valid types which may be converted to a [[Day]] instance.
 *
 * - `number`: A UNIX timestamp.
 * - `string`: A string representation of a date.
 * - `Day`: An existing [[Day]] instance.
 * - `number[]`: An array of numbers specifying any of: [year, month, dayOfMonth, hour, minute, second, millisecond].
 * - `object`: An object with any of the following properties: year, month, dayOfMonth, hour, minute, second, millisecond.
 * - `true`: This will be interpreted as [[Day.today]]
 */
export type DayInput = number | string | Day | number[] | object | true;

/**
 * One of the properties on the [[Day]] object.
 */
export type DayProperty = keyof DayFrequency;

/**
 * The properties and their types that can be used in a schedule to define 
 * repeatable events.
 */
export interface DayFrequency
{
  time: number;
  millis: number;
  seconds: number;
  minute: number;
  hour: number;
  month: number;
  year: number;
  day: number;
  dayOfMonth: number;
  quarter: number;
  dayOfYear: number;
  dayOfWeek: number;
  lastDayOfMonth: number;
  week: number;
  weekOfYear: number;
  weekspanOfYear: number;
  fullWeekOfYear: number;
  lastFullWeekOfYear: number;
  lastWeekspanOfYear: number;
  weekOfMonth: number;
  weekspanOfMonth: number;
  fullWeekOfMonth: number;
  lastFullWeekOfMonth: number;
  lastWeekspanOfMonth: number;
}

/**
 * A class which represents a Date with a few added features.
 * 
 * - Has extra properties around days and weeks of the year and weeks of the 
 *    year and month.
 * - Inherits global locale and responds to changes.
 * - Can have a custom locale for any given instance.
 * - Comparison functions between days.
 * - Difference calculations between days.
 * - Start of unit calculations.
 * - End of unit calculations.
 * - Add and subtract unit calculations.
 * - Date formatting.
 */
export class Day implements DayFrequency
{

  /**
   * The date that initialize the day. This should not be modified, and if it 
   * is it will result in unpredictable and incorrect behavior.
   */
  public readonly date: Date;

  /**
   * The time since the unix epoch in milliseconds in UTC.
   */
  public readonly time: number;

  /**
   * The milliseconds of this timestamp (0 to 999).
   */
  public readonly millis: number;

  /**
   * The seconds of this timestamp (0 to 59).
   */
  public readonly seconds: number;

  /**
   * The minutes of this timestamp (0 to 59).
   */
  public readonly minute: number;

  /**
   * The hour of this timestamp (0 to 23).
   */
  public readonly hour: number;

  /**
   * The month of this timestamp, zero based (January).
   */
  public readonly month: number;

  /**
   * The year of this timestamp.
   */
  public readonly year: number;

  /**
   * The day of the week, starting at 0 for Sunday.
   */
  public readonly day: number;

  /**
   * The day of the month, starting at 1 for the 1st.
   */
  public readonly dayOfMonth: number;

  /**
   * The reference to the global locale or the locale specified on this 
   * instance. Use [[Day.getLocale]] to get the proper locale for a Day.
   */
  private _locale: Ref<Locale>;


  /**
   * Creates a new Day instance based on the given date.
   */
  public constructor(date: Date)
  {
    this.date                 = date;
    this.time                 = date.valueOf();
    this.millis               = date.getMilliseconds();
    this.seconds              = date.getSeconds();
    this.minute               = date.getMinutes();
    this.hour                 = date.getHours();
    this.month                = date.getMonth();
    this.year                 = date.getFullYear();
    this.day                  = date.getDay();
    this.dayOfMonth           = date.getDate();

    // Start off with the global locale.
    this._locale = Locales.ref;
  }

  /**
   * The quarter of the year this day is in, starting at 0 for January 
   * through March.
   */
  public get quarter(): number 
  {
    return this.getValue('_quarter', getQuarter);
  }

  public _quarter: number = null;

  /**
   * The day of the year, starting at 1 for the 1st of January.
   */
  public get dayOfYear(): number 
  {
    return this.getValue('_dayOfYear', getDayOfYear);
  }

  public _dayOfYear: number = null;

  /**
   * The day of the week relative to the first day of the week specified by
   * [[Locale.weekStartsOn]]. So if the week starts on Monday, then this will
   * be 0 for Monday, 1 for Tuesday, etc.
   * 
   * This is dependent on the locale of the instance (or global locale).
   */
  public get dayOfWeek(): number
  {
    return this.getLocaleValue('_dayOfWeek', getDayOfWeek);
  }

  public _dayOfWeek: number = null;

  /**
   * The last day of the month, starting at 1 for the last day, 2 for the 2nd 
   * to last, etc.
   */
  public get lastDayOfMonth(): number
  {
    return this.getValue('_lastDayOfMonth', getLastDayOfMonth);
  }

  public _lastDayOfMonth: number = null;

  /**
   * The week of the year. The first week of the year (1) contains Jan 1st.
   * 
   * This is dependent on the locale of the instance (or global locale).
   */
  public get week(): number
  {
    return this.getLocaleValue('_week', getWeekOfYear);
  }

  public _week: number = null;

  /**
   * The week of the year. The first week of the year (1) is the first week 
   * which has the date [[Locale.firstWeekContainsDate]]. If there is a week 
   * before that it will be 0. Frequently referred to as the ISO week.
   * 
   * This is dependent on the locale of the instance (or global locale).
   */
  public get weekOfYear(): number
  {
    return this.getLocaleValue('_weekOfYear', getWeekOfYearISO);
  }

  public _weekOfYear: number = null;

  /**
   * The weekspan of the year, starting at 0 representing January 1st to the 7th. 
   * Weekspans allow you to create schedules for things like "the first 
   * saturday of the year".
   */
  public get weekspanOfYear(): number
  {
    return this.getValue('_weekspanOfYear', getWeekspanOfYear);
  }

  public _weekspanOfYear: number = null;

  /**
   * The full week of the year, starting at 0 for a partial week (if one exists) 
   * and 1 for the first full week.
   * 
   * This is dependent on the locale of the instance (or global locale).
   */
  public get fullWeekOfYear(): number
  {
    return this.getLocaleValue('_fullWeekOfYear', getFullWeekOfYear);
  }

  public _fullWeekOfYear: number = null;

  /**
   * The last weekspan of the year, starting at 0 representing December 31st to 
   * December 25th. Weekspans allow you to create schedules for things like
   * "the last saturday of the year".
   */
  public get lastWeekspanOfYear(): number
  {
    return this.getValue('_lastWeekspanOfYear', getLastWeekspanOfYear);
  }

  public _lastWeekspanOfYear: number = null;

  /**
   * The last full week of the year, starting at 0 for the last week ending 
   * before Thursday and 1 for the last week with a Thursday.
   * 
   * This is dependent on the locale of the instance (or global locale).
   */
  public get lastFullWeekOfYear(): number
  {
    return this.getLocaleValue('_lastFullWeekOfYear', getLastFullWeekOfYear);
  }

  public _lastFullWeekOfYear: number = null;


  /**
   * The week of the month. The first week of the month (1) is the first week 
   * which has the date [[Locale.firstWeekContainsDate]]. If there is a week 
   * before that it will be 0.
   * 
   * This is dependent on the locale of the instance (or global locale).
   */
  public get weekOfMonth(): number
  {
    return this.getLocaleValue('_weekOfMonth', getWeekOfMonthISO);
  }

  public _weekOfMonth: number = null;

  /**
   * The weekspan of the month, starting at 0 representing the 1st to the 7th.
   * Weekspans allow you to create schedules for things like "the first 
   * saturday of the month".
   */
  public get weekspanOfMonth(): number
  {
    return this.getValue('_weekspanOfMonth', getWeekspanOfMonth);
  }

  public _weekspanOfMonth: number = null;

  /**
   * The full week of the month, starting at 0 for a partial week (if one exists) 
   * and 1 for the first full week.
   * 
   * This is dependent on the locale of the instance (or global locale).
   */
  public get fullWeekOfMonth(): number
  {
    return this.getLocaleValue('_fullWeekOfMonth', getFullWeekOfMonth);
  }

  public _fullWeekOfMonth: number = null;

  /**
   * The last weekspan of the month, starting at 0 representing 31st to 25th 
   * for a month with 31 days. Weekspans allow you to create schedules for 
   * things like "the last saturday of the month".
   */
  public get lastWeekspanOfMonth(): number
  {
    return this.getValue('_lastWeekspanOfMonth', getLastWeekspanOfMonth);
  }

  public _lastWeekspanOfMonth: number = null;

  /**
   * The last full week of the month, starting at 0 for the last week ending 
   * before Thursday and 1 for the last week with a Thursday.
   * 
   * This is dependent on the locale of the instance (or global locale).
   */
  public get lastFullWeekOfMonth(): number
  {
    return this.getLocaleValue('_lastFullWeekOfMonth', getLastFullWeekOfMonth);
  }

  public _lastFullWeekOfMonth: number = null;

  /**
   * The identifier which stores in a simple form the date and time of this Day.
   */
  public get timeIdentifier(): IdentifierInput
  {
    return this.getValue('_timeIdentifier', () => Identifier.Time.get(this));
  }

  public _timeIdentifier: IdentifierInput = null;

  /**
   * The identifier which stores in a simple form the date of this Day.
   */
  public get dayIdentifier(): IdentifierInput
  {
    return this.getValue('_dayIdentifier', () => Identifier.Day.get(this));
  }

  public _dayIdentifier: IdentifierInput = null;

  /**
   * The identifier which stores in a simple form the week of the year of this Day.
   */
  public get weekIdentifier(): IdentifierInput
  {
    return this.getValue('_weekIdentifier', () => Identifier.Week.get(this));
  }

  public _weekIdentifier: IdentifierInput = null;

  /**
   * The identifier which stores in a simple form the month and year of this Day.
   */
  public get monthIdentifier(): IdentifierInput
  {
    return this.getValue('_monthIdentifier', () => Identifier.Month.get(this));
  }

  public _monthIdentifier: IdentifierInput = null;

  /**
   * The identifier which stores in a simple form the quarter and year of this Day.
   */
  public get quarterIdentifier(): IdentifierInput
  {
    return this.getValue('_quarterIdentifier', () => Identifier.Quarter.get(this));
  }

  public _quarterIdentifier: IdentifierInput = null;


  /**
   * Returns the locale based value. First it checks to see if the global 
   * locale changed and updates accordingly. If the value is not cached the 
   * value is recalculated.
   * 
   * @param property The property on the Day.
   * @param compute The function which takes the Day and calculates and stores 
   *    the value of the requested property.
   */
  private getLocaleValue<K extends keyof Day> (property: K, compute: (date: Date, options: LocaleOptions) => Day[K]): Day[K]
  {
    this.checkForUpdate();

    if (this[property] === null)
    {
      (this as Day)[property] = compute(this.date, this._locale.value);
    }

    return this[property];
  }

  /**
   * Returns the value of the property If it's not cached, otherwise the value 
   * is computed and stored on this Day instance.. 
   * 
   * @param property The property on the Day.
   * @param compute The function which takes the Day and calculates and stores 
   *    the value of the requested property.
   */
  private getValue<K extends keyof Day> (property: K, compute: (date: Date) => Day[K]): Day[K]
  {
    if (this[property] === null)
    {
      (this as Day)[property] = compute(this.date);
    }

    return this[property];
  }

  /**
   * Checks to see if the global locale has changed, and if it has it invalides 
   * the locale-based properties so next time they're accessed they are cleaned up.
   */
  private checkForUpdate (): void
  {
    if (this._locale.dirty)
    {
      this._locale = Locales.ref;

      this.resetLocaleCache();
    }
  }

  /**
   * Sets the locale for this Day and returns this.
   * 
   * @param key The code to the locale to apply.
   */
  public setLocale (key: string): this
  {
    const locale = Locales.get(key);

    if (locale !== this._locale.value)
    {
      this._locale = this._locale.getUpdate(locale);

      this.resetLocaleCache();
    }

    return this;
  }

  /**
   * Returns the current locale of the day instance. 
   */
  public getLocale (): Locale
  {
    this.checkForUpdate();

    return this._locale.value;
  }

  /**
   * Sets the locale of this Day instance to the global locale.
   */
  public clearLocale (): void
  {
    const locale = Locales.current;

    if (locale !== this._locale.value)
    {
      this._locale = Locales.ref;

      this.resetLocaleCache();
    }
  }

  /**
   * Resets all locale-based caches on this Day instance.
   */
  public resetLocaleCache (): void
  {
    this._dayOfWeek = null;
    this._weekOfYear = null;
    this._fullWeekOfYear = null;
    this._lastFullWeekOfYear = null;
    this._weekOfMonth = null;
    this._fullWeekOfMonth = null;
    this._lastFullWeekOfMonth = null;
  }

  // Same

  /**
   * Determines whether this day and the given day lie on the same day.
   */
  public sameDay (day: Day): boolean
  {
    return this.dayIdentifier === day.dayIdentifier;
  }

  /**
   * Determines whether this day and the given day lie on the same month.
   */
  public sameMonth (day: Day): boolean
  {
    return this.monthIdentifier === day.monthIdentifier;
  }

  /**
   * Determines whether this day and the given day lie on the same week.
   */
  public sameWeek (day: Day): boolean
  {
    return this.weekIdentifier === day.weekIdentifier;
  }

  /**
   * Determines whether this week and the given day lie on the same year.
   */
  public sameYear (day: Day): boolean
  {
    return this.year === day.year;
  }

  /**
   * Determines whether this day and the given day lie on the same month.
   */
  public sameQuarter (day: Day): boolean
  {
    return this.quarterIdentifier === day.quarterIdentifier;
  }

  /**
   * Determines whether this week and the given day lie on the same year.
   */
  public sameHour (day: Day): boolean 
  {
    return this.dayIdentifier === day.dayIdentifier && 
      this.hour === day.hour;
  }

  /**
   * Determines whether 
   */
  public sameMinute (day: Day): boolean 
  {
    return this.timeIdentifier === day.timeIdentifier;
  }

  /**
   *
   */
  public sameTime (time: Time): boolean 
  {
    return this.hour === time.hour && 
      this.minute === time.minute && 
      this.seconds === time.second && 
      this.millis === time.millisecond;
  }

  // Comparison

  /**
   * 
   * @param day 
   * @param precision 
   */
  public compare (day: Day, precision?: Unit): number
  {
    return compare(this.date, day.date, precision);
  }

  /**
   *
   */
  public isBefore (day: Day, precision?: Unit): boolean 
  {
    return compare(this.date, day.date, precision) < 0;
  }

  /**
   *
   */
  public isSameOrBefore (day: Day, precision?: Unit): boolean 
  {
    return compare(this.date, day.date, precision) <= 0;
  }

  /**
   *
   */
  public isAfter(day: Day, precision?: Unit): boolean 
  {
    return compare(this.date, day.date, precision) > 0;
  }

  /**
   *
   */
  public isSameOrAfter(day: Day, precision?: Unit): boolean 
  {
    return compare(this.date, day.date, precision) >= 0;
  }

  /**
   *
   * @param day
   * @returns
   */
  public max(day: Day): Day 
  {
    return compare(this.date, day.date) > 0 ? this : day;
  }

  /**
   *
   * @param day
   * @returns
   */
  public min(day: Day): Day 
  {
    return compare(this.date, day.date) < 0 ? this : day;
  }

  // Between

  /**
   * 
   * @param day
   * @param unit
   * @param op
   * @param absolute
   * @returns
   */
  public between(day: Day, unit: Unit, op: Op = Op.DOWN, absolute: boolean = true): number
  {
    return operate( diff[unit](this.date, day.date), op, absolute );
  }

  public millisBetween(day: Day, op: Op = Op.DOWN, absolute: boolean = true): number 
  {
    return this.between(day, 'millis', op, absolute);
  }

  public secondsBetween(day: Day, op: Op = Op.DOWN, absolute: boolean = true): number 
  {
    return this.between(day, 'second', op, absolute);
  }

  public minutesBetween(day: Day, op: Op = Op.DOWN, absolute: boolean = true): number 
  {
    return this.between(day, 'minute', op, absolute);
  }

  public hoursBetween(day: Day, op: Op = Op.DOWN, absolute: boolean = true): number 
  {
    return this.between(day, 'hour', op, absolute);
  }

  public daysBetween(day: Day, op: Op = Op.DOWN, absolute: boolean = true): number 
  {
    return this.between(day, 'day', op, absolute);
  }

  public weeksBetween(day: Day, op: Op = Op.DOWN, absolute: boolean = true): number 
  {
    return this.between(day, 'week', op, absolute);
  }

  public monthsBetween(day: Day, op: Op = Op.DOWN, absolute: boolean = true): number 
  {
    return this.between(day, 'month', op, absolute);
  }

  public yearsBetween(day: Day, op: Op = Op.DOWN, absolute: boolean = true): number 
  {
    return this.between(day, 'year', op, absolute);
  }

  public isBetween(start: Day, end: Day, inclusive: boolean = true, precision?: Unit): boolean 
  {
    const before = this.isBefore(start);

    if (before) 
    {
      return false;
    }

    const after = inclusive
      ? this.isSameOrAfter(end)
      : this.isAfter(end);

    if (after) 
    {
      return false;
    }

    return true;
  }

  public mutate(mutator: (date: Date) => any): Day 
  {
    const d = this.toDate();

    const result = mutator( d );

    return result instanceof Date
      ? new Day(result)
      : new Day(d);
  }

  public add(unit: Unit, amount: number = 1): Day 
  {
    return this.mutate(d => add[unit](d, amount));
  }

  public relative(millis: number): Day 
  {
    return this.add('millis', millis);
  }

  // Days

  public prev(days: number = 1): Day 
  {
    return this.add('day', -days);
  }

  public next(days: number = 1): Day 
  {
    return this.add('day', days);
  }

  public withDayOfMonth(day: number): Day 
  {
    return this.mutate(d => d.setDate(day));
  }

  public withDay(day: number): Day 
  {
    return this.add('day', day - this.date.getDay());
  }

  public withDayOfWeek(dayOfWeek: number): Day 
  {
    return this.add('day', dayOfWeek - getDayOfWeek(this.date, this.getLocale()));
  }

  public withDayOfYear(dayOfYear: number): Day 
  {
    return this.add('day', dayOfYear - getDayOfYear(this.date));
  }

  // Month

  public withMonth(month: number): Day 
  {
    return this.mutate(d => d.setMonth(month));
  }

  // Week Of Year

  protected withWeek(week: number, relativeWeek: number): Day 
  {
    return this.add('day', (week - relativeWeek) * Constants.DAYS_IN_WEEK);
  }

  public withWeekOfYear(week: number): Day 
  {
    return this.withWeek(week, this.weekOfYear);
  }

  public withFullWeekOfYear(week: number): Day 
  {
    return this.withWeek(week, this.fullWeekOfYear);
  }

  public withWeekspanOfYear(week: number): Day 
  {
    return this.withWeek(week, this.weekspanOfYear);
  }

  public withWeekOfMonth(week: number): Day 
  {
    return this.withWeek(week, this.weekOfMonth);
  }

  public withWeekspanOfMonth(week: number): Day 
  {
    return this.withWeek(week, this.weekspanOfMonth);
  }

  public withFullWeekOfMonth(week: number): Day 
  {
    return this.withWeek(week, this.fullWeekOfMonth);
  }

  // Year

  public withYear(year: number): Day 
  {
    return this.mutate(d => d.setFullYear(year));
  }

  // Hour

  public withHour(hour: number): Day 
  {
    return this.mutate(d => d.setHours(hour));
  }

  // Time

  public withTimes(
      hour: number = Constants.HOUR_MIN,
      minute: number = Constants.MINUTE_MIN,
      second: number = Constants.SECOND_MIN,
      millisecond: number = Constants.MILLIS_MIN): Day 
  {
    return this.mutate(d => d.setHours(hour, minute, second, millisecond));
  }

  public withTime(time: Time): Day 
  {
    return this.withTimes(time.hour, time.minute, time.second, time.millisecond);
  }

  public asTime(): Time 
  {
    return new Time(this.hour, this.minute, this.seconds, this.millis);
  }

  // Start & End

  public startOf(unit: Unit): Day
  {
    return this.mutate(d => startOf[unit](d, this.getLocale()));
  }

  public isStartOf(unit: Unit): boolean
  {
    return this.startOf(unit).date.getTime() === this.time;
  }

  public endOf(unit: Unit, inclusive: boolean = true): Day
  {
    return inclusive
      ? this.mutate(d => endOf[unit](d, this.getLocale()))
      : this.mutate(d => { startOf[unit](d, this.getLocale());  add[unit](d, 1); });
  }

  public isEndOf(unit: Unit, inclusive: boolean = true): boolean
  {
    return this.endOf(unit, inclusive).date.getTime() === this.time;
  }

  // Days In X

  public daysInMonth(): number 
  {
    return getDaysInMonth(this.date);
  }

  public daysInYear(): number 
  {
    return getDaysInYear(this.date);
  }

  public weeksInYear(): number 
  {
    return getWeeksInYear(this.date);
  }

  // Display

  public format(format: string, cache: boolean = false): string 
  {
    return DayFormat.format(format, [this, this.getLocale()], cache);
  }

  public utc(keepLocalTime?: boolean): Day 
  {
    // TODO
    return this;
  }

  public toDate(): Date 
  {
    return new Date(this.date.getTime());
  }

  public toArray(): number[] 
  {
    return [this.year, this.month, this.dayOfMonth, this.hour, this.minute, this.seconds, this.millis];
  }

  public toJSON(): string 
  {
    return this.date.toJSON();
  }

  public toISOString(keepOffset: boolean = false): string 
  {
    return this.date.toISOString(); // TODO
  }

  public toObject(): object 
  {
    throw new Error('toObject is no longer supported');
  }

  public toString(): string 
  {
    return this.date.toString();
  }

  // State

  public isDST(): boolean 
  {
    return isDaylightSavingTime(this.date);
  }

  public isLeapYear(): boolean 
  {
    return isLeapYear(this.date);
  }

  public offset(): number
  {
    return getDateOffset(this.date);
  }

  // Instances

  public static now(): Day 
  {
    return new Day(new Date());
  }

  public static today(): Day 
  {
    return this.now().startOf('day');
  }

  public static tomorrow(): Day 
  {
    return this.today().next();
  }

  public static fromDate(date: Date): Day | null
  {
    return isFinite(date.getTime()) ? new Day(date) : null;
  }

  public static unix(millis: number): Day 
  {
    return this.fromDate(new Date(millis));
  }

  public static unixSeconds(seconds: number): Day 
  {
    return this.fromDate(new Date(seconds * Constants.MILLIS_IN_SECOND));
  }

  public static parse(input: DayInput): Day 
  {
    return Parse.day(input);
  }

  public static fromString(input: string): Day 
  {
    return this.fromDate(new Date(input));
  }

  public static fromFormat(input: string, formats: string | string[]): Day 
  {
    throw new Error('fromFormat is no longer supported');
  }

  public static fromObject(input: object): Day 
  {
    throw new Error('fromObject is no longer supported');
  }

  public static fromArray(input: number[]): Day 
  {
    const YEAR_INDEX = 0;
    const MONTH_INDEX = 1;
    const DATE_INDEX = 2;
    const HOUR_INDEX = 3;
    const MINUTE_INDEX = 4;
    const SECOND_INDEX = 5;
    const MILLIS_INDEX = 6;

    return this.fromDate(new Date(
      input[YEAR_INDEX], 
      input[MONTH_INDEX], 
      fn.coalesce(input[DATE_INDEX], Constants.DAY_MIN), 
      fn.coalesce(input[HOUR_INDEX], Constants.HOUR_MIN), 
      fn.coalesce(input[MINUTE_INDEX], Constants.MINUTE_MIN), 
      fn.coalesce(input[SECOND_INDEX], Constants.SECOND_MIN), 
      fn.coalesce(input[MILLIS_INDEX], Constants.MILLIS_MIN)
    ));
  }

  public static fromDayIdentifier(id: number): Day 
  {
    const DATE_MASK = 100;
    const MONTH_MASK = 100;
    const YEAR_OFFSET = 10000;

    const date: number = id % DATE_MASK;
    const month: number = (Math.floor(id / DATE_MASK) % MONTH_MASK) - 1;
    const year: number = Math.floor(id / YEAR_OFFSET);

    return this.build(year, month, date);
  }

  public static build(year: number, month: number,
    date: number = Constants.DAY_MIN,
    hour: number = Constants.HOUR_MIN,
    minute: number = Constants.MINUTE_MIN,
    second: number = Constants.SECOND_MIN,
    millisecond: number = Constants.MILLIS_MIN): Day
  {
    return new Day(new Date(year, month, date, hour, minute, second, millisecond));
  }

}
