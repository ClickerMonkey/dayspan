
import { Constants } from './Constants';
import { add, compare, diff, endOf, getDayOfWeek, getDayOfYear, getDaysInMonth, getDaysInYear, getFullWeekOfMonth, getFullWeekOfYear, getLastDayOfMonth, getLastFullWeekOfMonth, getLastFullWeekOfYear, getLastWeekspanOfMonth, getLastWeekspanOfYear, getQuarter, getWeekOfMonth, getWeekOfYear, getWeeksInYear, getWeekspanOfMonth, getWeekspanOfYear, isDaylightSavingTime, isLeapYear, mutate, startOf, Unit } from './DateFunctions';
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
 * 
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
 * A class which represents a point in time as
 */
export class Day implements DayFrequency
{

  /**
   *
   */
  public readonly date: Date;

  /**
   *
   */
  public readonly time: number;

  /**
   *
   */
  public readonly millis: number;

  /**
   *
   */
  public readonly seconds: number;

  /**
   *
   */
  public readonly minute: number;

  /**
   *
   */
  public readonly hour: number;

  /**
   *
   */
  public readonly month: number;

  /**
   *
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


  private _locale: Ref<Locale>;


  /**
   *
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

    this._locale = Locales.ref;
  }

  /**
   * The quarter of the year this day is in.
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
   * The week of the year. The first week of the year (1) is the first week 
   * which has the date [[Locale.firstWeekContainsDate]]. If there is a week 
   * before that it will be 0.
   */
  public get weekOfYear(): number
  {
    return this.getLocaleValue('_weekOfYear', getWeekOfYear);
  }

  public _weekOfYear: number = null;

  /**
   * The weekspan of the year, starting at 0 representing January 1st to the 7th.
   */
  public get weekspanOfYear(): number
  {
    return this.getValue('_weekspanOfYear', getWeekspanOfYear);
  }

  public _weekspanOfYear: number = null;

  /**
   * The full week of the year, starting at 0 for a partial week (if one exists) 
   * and 1 for the first full week.
   */
  public get fullWeekOfYear(): number
  {
    return this.getLocaleValue('_fullWeekOfYear', getFullWeekOfYear);
  }

  public _fullWeekOfYear: number = null;

  /**
   * The last weekspan of the year, starting at 0 representing December 31st to 
   * December 25th.
   */
  public get lastWeekspanOfYear(): number
  {
    return this.getValue('_lastWeekspanOfYear', getLastWeekspanOfYear);
  }

  public _lastWeekspanOfYear: number = null;

  /**
   * The last full week of the year, starting at 0 for the last week ending 
   * before Thursday and 1 for the last week with a Thursday.
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
   */
  public get weekOfMonth(): number
  {
    return this.getLocaleValue('_weekOfMonth', getWeekOfMonth);
  }

  public _weekOfMonth: number = null;

  /**
   * The weekspan of the month, starting at 0 representing the 1st to the 7th.
   */
  public get weekspanOfMonth(): number
  {
    return this.getValue('_weekspanOfMonth', getWeekspanOfMonth);
  }

  public _weekspanOfMonth: number = null;

  /**
   * The full week of the month, starting at 0 for a partial week (if one exists) 
   * and 1 for the first full week.
   */
  public get fullWeekOfMonth(): number
  {
    return this.getLocaleValue('_fullWeekOfMonth', getFullWeekOfMonth);
  }

  public _fullWeekOfMonth: number = null;

  /**
   * The last weekspan of the month, starting at 0 representing 31st to 25th 
   * for a month with 31 days.
   */
  public get lastWeekspanOfMonth(): number
  {
    return this.getValue('_lastWeekspanOfMonth', getLastWeekspanOfMonth);
  }

  public _lastWeekspanOfMonth: number = null;

  /**
   * The last full week of the month, starting at 0 for the last week ending 
   * before Thursday and 1 for the last week with a Thursday.
   */
  public get lastFullWeekOfMonth(): number
  {
    return this.getLocaleValue('_lastFullWeekOfMonth', getLastFullWeekOfMonth);
  }

  public _lastFullWeekOfMonth: number = null;

  /**
   *
   */
  public get timeIdentifier(): IdentifierInput
  {
    return this.getValue('_timeIdentifier', () => Identifier.Time.get(this));
  }

  public _timeIdentifier: IdentifierInput = null;

  /**
   *
   */
  public get dayIdentifier(): IdentifierInput
  {
    return this.getValue('_dayIdentifier', () => Identifier.Day.get(this));
  }

  public _dayIdentifier: IdentifierInput = null;

  /**
   *
   */
  public get weekIdentifier(): IdentifierInput
  {
    return this.getValue('_weekIdentifier', () => Identifier.Week.get(this));
  }

  public _weekIdentifier: IdentifierInput = null;

  /**
   *
   */
  public get monthIdentifier(): IdentifierInput
  {
    return this.getValue('_monthIdentifier', () => Identifier.Month.get(this));
  }

  public _monthIdentifier: IdentifierInput = null;

  /**
   *
   */
  public get quarterIdentifier(): IdentifierInput
  {
    return this.getValue('_quarterIdentifier', () => Identifier.Quarter.get(this));
  }

  public _quarterIdentifier: IdentifierInput = null;


  /**
   * 
   * @param property 
   * @param compute 
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
   * 
   * @param property 
   * @param compute 
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
   * 
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
   * 
   * @param key 
   */
  public setLocale (key: string): void
  {
    const locale = Locales.get(key);

    if (locale !== this._locale.value)
    {
      this._locale = this._locale.getUpdate(locale);

      this.resetLocaleCache();
    }
  }

  /**
   * 
   */
  public getLocale (): Locale
  {
    this.checkForUpdate();

    return this._locale.value;
  }

  /**
   * 
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
   *
   */
  public sameDay (day: Day): boolean
  {
    return this.dayIdentifier === day.dayIdentifier;
  }

  /**
   *
   */
  public sameMonth (day: Day): boolean
  {
    return this.monthIdentifier === day.monthIdentifier;
  }

  /**
   *
   */
  public sameWeek (day: Day): boolean
  {
    return this.weekIdentifier === day.weekIdentifier;
  }

  /**
   *
   */
  public sameYear (day: Day): boolean
  {
    return this.year === day.year;
  }

  /**
   *
   */
  public sameQuarter (day: Day): boolean
  {
    return this.quarterIdentifier === day.quarterIdentifier;
  }

  /**
   *
   */
  public sameHour (day: Day): boolean 
  {
    return this.dayIdentifier === day.dayIdentifier && 
      this.hour === day.hour;
  }

  /**
   *
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

  public add(amount: number, unit: Unit = 'millis'): Day 
  {
    return this.mutate(d => add[unit](d, amount));
  }

  public relative(millis: number): Day 
  {
    return this.add(millis);
  }

  // Days

  public relativeDays(days: number): Day 
  {
    return this.add(days, 'day');
  }

  public prev(days: number = 1): Day 
  {
    return this.relativeDays(days);
  }

  public next(days: number = 1): Day 
  {
    return this.relativeDays(-days);
  }

  public withDayOfMonth(day: number): Day 
  {
    return this.mutate(d => d.setDate(day));
  }

  public withDay(day: number): Day 
  {
    return this.mutate(d => d.setDate(d.getDate() + (day - this.date.getDay())));
  }

  public withDayOfWeek(dayOfWeek: number): Day 
  {
    return this.mutate(d => d.setDate(d.getDate() + (dayOfWeek - getDayOfWeek(this.date, this.getLocale()))));
  }

  public withDayOfYear(dayOfYear: number): Day 
  {
    return this.mutate(d => d.setDate(d.getDate() + (dayOfYear - getDayOfYear(this.date))));
  }

  // Month

  public withMonth(month: number): Day 
  {
    return this.mutate(d => d.setMonth(month));
  }

  public relativeMonths(months: number): Day 
  {
    return this.add(months, 'month');
  }

  public prevMonth(months: number = 1): Day 
  {
    return this.relativeMonths( -months );
  }

  public nextMonth(months: number = 1): Day 
  {
    return this.relativeMonths( months );
  }

  // Week Of Year

  protected withWeek(week: number, relativeWeek: number): Day 
  {
    return this.add((week - relativeWeek) * Constants.DAYS_IN_WEEK, 'day');
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

  public relativeWeeks(weeks: number): Day 
  {
    return this.add(weeks, 'week');
  }

  public prevWeek(weeks: number = 1): Day 
  {
    return this.relativeWeeks( -weeks );
  }

  public nextWeek(weeks: number = 1): Day 
  {
    return this.relativeWeeks( weeks );
  }

  // Year

  public withYear(year: number): Day 
  {
    return this.mutate(d => d.setFullYear(year));
  }

  public relativeYears(years: number): Day 
  {
    return this.add(years, 'year');
  }

  public prevYear(years: number = 1): Day 
  {
    return this.relativeYears( -years );
  }

  public nextYear(years: number = 1): Day 
  {
    return this.relativeYears( years );
  }

  // Hour

  public withHour(hour: number): Day 
  {
    return this.mutate(d => d.setHours(hour));
  }

  public relativeHours(hours: number): Day 
  {
    return this.add(hours, 'hour');
  }

  public prevHour(hours: number = 1): Day 
  {
    return this.relativeHours( -hours );
  }

  public nextHour(hours: number = 1): Day 
  {
    return this.relativeHours( hours );
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

  public endOf(unit: Unit, inclusive: boolean = false): Day
  {
    return inclusive
      ? this.mutate(d => { startOf[unit](d, this.getLocale());  add[unit](d, 1); })
      : this.mutate(d => endOf[unit](d, this.getLocale()));
  }

  // Time

  public start(): Day 
  {
    return this.startOf('day');
  }

  public isStart(): boolean 
  {
    return this.hour === Constants.HOUR_MIN &&
      this.minute === Constants.MINUTE_MIN &&
      this.seconds === Constants.SECOND_MIN &&
      this.millis === Constants.MILLIS_MIN;
  }

  public end(inclusive: boolean = true): Day 
  {
    return this.endOf('day', inclusive);
  }

  public isEnd(): boolean {
    return this.hour === Constants.HOUR_MAX &&
      this.minute === Constants.MINUTE_MAX &&
      this.seconds === Constants.SECOND_MAX &&
      this.millis === Constants.MILLIS_MAX;
  }

  // Hour

  public startOfHour(): Day 
  {
    return this.startOf('hour');
  }

  public isStartOfHour(): boolean 
  {
    return this.minute === Constants.MINUTE_MIN &&
      this.seconds === Constants.SECOND_MIN &&
      this.millis === Constants.MILLIS_MIN;
  }

  public endOfHour(inclusive: boolean = true): Day 
  {
    return this.endOf('hour', inclusive);
  }

  public isEndOfHour(): boolean 
  {
    return this.minute === Constants.MINUTE_MAX &&
      this.seconds === Constants.SECOND_MAX &&
      this.millis === Constants.MILLIS_MAX;
  }

  // Week

  public startOfWeek(): Day 
  {
    return this.startOf('week');
  }

  public isStartOfWeek(): boolean 
  {
    return this.dayOfWeek === Constants.WEEKDAY_MIN;
  }

  public endOfWeek(inclusive: boolean = true): Day 
  {
    return this.endOf('week', inclusive);
  }

  public isEndOfWeek(): boolean 
  {
    return this.dayOfWeek === Constants.WEEKDAY_MAX;
  }

  // Month

  public startOfMonth(): Day 
  {
    return this.startOf('month');
  }

  public isStartOfMonth(): boolean 
  {
    return this.dayOfMonth === Constants.DAY_MIN;
  }

  public endOfMonth(inclusive: boolean = true): Day 
  {
    return this.endOf('month', inclusive);
  }

  public isEndOfMonth(): boolean 
  {
    return this.dayOfMonth === this.daysInMonth();
  }

  // Year

  public startOfYear(): Day 
  {
    return this.startOf('year');
  }

  public isStartOfYear(): boolean 
  {
    return this.month === Constants.MONTH_MIN && 
      this.dayOfMonth === Constants.DAY_MIN;
  }

  public endOfYear(inclusive: boolean = true): Day 
  {
    return this.endOf('year', inclusive);
  }

  public isEndOfYear(): boolean 
  {
    return this.month === Constants.MONTH_MAX && 
      this.dayOfMonth === Constants.DAY_MAX;
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

  public format(format: string): string 
  {
    // return this.date.format( format );

    return '';
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

  // Instances

  public static now(): Day 
  {
    return new Day(new Date());
  }

  public static today(): Day 
  {
    return this.now().start();
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

  public static unixSeconds(millis: number): Day 
  {
    return this.fromDate(new Date(millis * Constants.MILLIS_IN_SECOND));
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
    // tslint:disable-next-line: no-magic-numbers
    return this.fromDate(new Date(input[0], input[1], input[2], input[3], input[4], input[5], input[6]));
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
