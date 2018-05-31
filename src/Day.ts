
import { Constants } from './Constants';
import { Op, operate } from './Op';
import { Parse } from './Parse';
import { Time } from './Time';
// @ts-ignore
import * as moment from 'moment';


/**
 *
 */
export type DurationInput = moment.unitOfTime.DurationConstructor;

/**
 *
 */
export type DayInput = number | string | Day | number[] | object | true;

/**
 *
 */
export type DayIterator = (day: Day) => any;

/**
 *
 */
export class Day
{

  /**
   *
   */
  public static readonly LOAD_TIME: Day = Day.now();

  /**
   *
   */
  public readonly date: moment.Moment;

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
   *
   */
  public readonly quarter: number;


  /**
   *
   */
  public readonly dayOfWeek: number;

  /**
   *
   */
  public readonly dayOfMonth: number;

  /**
   *
   */
  public readonly lastDayOfMonth: number;

  /**
   *
   */
  public readonly dayOfYear: number;


  /**
   *
   */
  public readonly week: number;

  /**
   *
   */
  public readonly weekOfYear: number;

  /**
   *
   */
  public readonly weekspanOfYear: number;

  /**
   *
   */
  public readonly fullWeekOfYear: number;

  /**
   *
   */
  public readonly lastWeekspanOfYear: number;

  /**
   *
   */
  public readonly lastFullWeekOfYear: number;


  /**
   *
   */
  public readonly weekOfMonth: number;

  /**
   *
   */
  public readonly weekspanOfMonth: number;

  /**
   *
   */
  public readonly fullWeekOfMonth: number;

  /**
   *
   */
  public readonly lastWeekspanOfMonth: number;

  /**
   *
   */
  public readonly lastFullWeekOfMonth: number;


  /**
   *
   */
  public readonly dayIdentifier: number;

  /**
   *
   */
  public readonly weekIdentifier: number;

  /**
   *
   */
  public readonly monthIdentifier: number;

  /**
   *
   */
  public readonly quarterIdentifier: number;



  /**
   *
   */
  public constructor(date: moment.Moment)
  {
    this.date                 = date;
    this.time                 = date.unix();
    this.millis               = date.millisecond();
    this.seconds              = date.second();
    this.minute               = date.minute();
    this.hour                 = date.hour();
    this.month                = date.month();
    this.year                 = date.year();
    this.quarter              = date.quarter();
    this.dayOfWeek            = date.day();
    this.dayOfMonth           = date.date();
    this.dayOfYear            = date.dayOfYear();
    this.week                 = date.week();

    this.lastDayOfMonth       = Day.getLastDayOfMonth( date );
    this.weekOfYear           = Day.getWeekOfYear( date );
    this.weekspanOfYear       = Day.getWeekspanOfYear( date );
    this.fullWeekOfYear       = Day.getFullWeekOfYear( date );
    this.lastWeekspanOfYear   = Day.getLastWeekspanOfYear( date );
    this.lastFullWeekOfYear   = Day.getLastFullWeekOfYear( date );

    this.weekOfMonth          = Day.getWeekOfMonth( date );
    this.weekspanOfMonth      = Day.getWeekspanOfMonth( date );
    this.fullWeekOfMonth      = Day.getFullWeekOfMonth( date );
    this.lastWeekspanOfMonth  = Day.getLastWeekspanOfMonth( date );
    this.lastFullWeekOfMonth  = Day.getLastFullWeekOfMonth( date );

    this.dayIdentifier        = Day.getDayIdentifier( date );
    this.weekIdentifier       = Day.getWeekIdentifier( date );
    this.monthIdentifier      = Day.getMonthIdentifier( date );
    this.quarterIdentifier    = Day.getQuarterIdentifier( date );
  }

  // Same

  /**
   *
   */
  public sameDay(day: Day): boolean
  {
    return this.dayIdentifier === day.dayIdentifier;
  }

  /**
   *
   */
  public sameMonth(day: Day): boolean {
    return this.monthIdentifier === day.monthIdentifier;
  }

  /**
   *
   */
  public sameWeek(day: Day): boolean {
    return this.weekIdentifier === day.weekIdentifier;
  }

  /**
   *
   */
  public sameYear(day: Day): boolean {
    return this.year === day.year;
  }

  /**
   *
   */
  public sameQuarter(day: Day): boolean {
    return this.quarterIdentifier === day.quarterIdentifier;
  }

  /**
   *
   */
  public sameHour(day: Day): boolean {
    return this.dayIdentifier === day.dayIdentifier && this.hour === day.hour;
  }

  /**
   *
   */
  public sameMinute(day: Day): boolean {
    return this.dayIdentifier === day.dayIdentifier && this.hour === day.hour && this.minute === day.minute;
  }

  /**
   *
   */
  public sameTime(time: Time): boolean {
    return this.hour === time.hour && this.minute === time.minute && this.seconds === time.second && this.millis === time.millisecond;
  }

  // Comparison

  /**
   *
   */
  public isBefore(day: Day, precision?: moment.unitOfTime.StartOf): boolean {
    return this.date.isBefore( day.date, precision );
  }

  /**
   *
   */
  public isSameOrBefore(day: Day, precision?: moment.unitOfTime.StartOf): boolean {
    return this.date.isSameOrBefore( day.date, precision );
  }

  /**
   *
   */
  public isAfter(day: Day, precision?: moment.unitOfTime.StartOf): boolean {
    return this.date.isAfter( day.date, precision );
  }

  /**
   *
   */
  public isSameOrAfter(day: Day, precision?: moment.unitOfTime.StartOf): boolean {
    return this.date.isSameOrAfter( day.date, precision );
  }

  /**
   *
   */
  public max(day: Day): Day {
    return this.date.isAfter( day.date ) ? this : day;
  }

  /**
   *
   */
  public min(day: Day): Day {
    return this.date.isBefore( day.date ) ? this : day;
  }

  // Between

  public millisBetween(day: Day, op: Op = Op.DOWN, absolute: boolean = true): number {
    return operate( this.date.diff( day.date, 'milliseconds', true ), op, absolute );
  }

  public secondsBetween(day: Day, op: Op = Op.DOWN, absolute: boolean = true): number {
    return operate( this.date.diff( day.date, 'seconds', true ), op, absolute );
  }

  public minutesBetween(day: Day, op: Op = Op.DOWN, absolute: boolean = true): number {
    return operate( this.date.diff( day.date, 'minutes', true ), op, absolute );
  }

  public hoursBetween(day: Day, op: Op = Op.DOWN, absolute: boolean = true): number {
    return operate( this.date.diff( day.date, 'hours', true ), op, absolute );
  }

  public daysBetween(day: Day, op: Op = Op.DOWN, absolute: boolean = true): number {
    return operate( this.date.diff( day.date, 'days', true ), op, absolute );
  }

  public weeksBetween(day: Day, op: Op = Op.DOWN, absolute: boolean = true): number {
    return operate( this.date.diff( day.date, 'weeks', true ), op, absolute );
  }

  public monthsBetween(day: Day, op: Op = Op.DOWN, absolute: boolean = true): number {
    return operate( this.date.diff( day.date, 'months', true ), op, absolute );
  }

  public yearsBetween(day: Day, op: Op = Op.DOWN, absolute: boolean = true): number {
    return operate( this.date.diff( day.date, 'years', true ), op, absolute );
  }

  public isBetween(start: Day, end: Day, inclusive: boolean = true): boolean {
    return this.date.isBetween(start.date, end.date, null, inclusive ? '[]' : '[)');
  }

  public mutate(mutator: (date: moment.Moment) => void): Day {
    var d = this.toMoment();
    mutator( d );
    return new Day( d );
  }

  public add(amount: number, unit: string): Day {
    return this.mutate(d => d.add(amount, <DurationInput>unit));
  }

  public relative(millis: number): Day {
    return this.mutate(d => d.add(millis, 'milliseconds'));
  }

  // Days

  public relativeDays(days: number): Day {
    return this.mutate(d => d.add(days, 'days'));
  }

  public prev(days: number = 1): Day {
    return this.relativeDays( -days );
  }

  public next(days: number = 1): Day {
    return this.relativeDays( days );
  }

  public withDayOfMonth(day: number): Day {
    return this.mutate(d => d.date(day));
  }

  public withDayOfWeek(dayOfWeek: number): Day {
    return this.mutate(d => d.day(dayOfWeek));
  }

  public withDayOfYear(dayOfYear: number): Day {
    return this.mutate(d => d.dayOfYear(dayOfYear));
  }

  // Month

  public withMonth(month: number): Day {
    return this.mutate(d => d.month(month));
  }

  public relativeMonths(months: number): Day {
    return this.mutate(d => d.add(months, 'months'));
  }

  public prevMonth(months: number = 1): Day {
    return this.relativeMonths( -months );
  }

  public nextMonth(months: number = 1): Day {
    return this.relativeMonths( months );
  }

  // Week Of Year

  public withWeek(week: number, relativeWeek: number = this.week): Day {
    return this.mutate(d => d.add((week - relativeWeek) * Constants.DAYS_IN_WEEK, 'days'));
  }

  public withWeekOfYear(week: number): Day {
    return this.withWeek(week, this.weekOfYear);
  }

  public withFullWeekOfYear(week: number): Day {
    return this.withWeek(week, this.fullWeekOfYear);
  }

  public withWeekspanOfYear(week: number): Day {
    return this.withWeek(week, this.weekspanOfYear);
  }

  public withWeekOfMonth(week: number): Day {
    return this.withWeek(week, this.weekOfMonth);
  }

  public withWeekspanOfMonth(week: number): Day {
    return this.withWeek(week, this.weekspanOfMonth);
  }

  public withFullWeekOfMonth(week: number): Day {
    return this.withWeek(week, this.fullWeekOfMonth);
  }

  public relativeWeeks(weeks: number): Day {
    return this.mutate(d => d.add(weeks, 'weeks'));
  }

  public prevWeek(weeks: number = 1): Day {
    return this.relativeWeeks( -weeks );
  }

  public nextWeek(weeks: number = 1): Day {
    return this.relativeWeeks( weeks );
  }

  // Year

  public withYear(year: number): Day {
    return this.mutate(d => d.year(year));
  }

  public relativeYears(years: number): Day {
    return this.mutate(d => d.add(years, 'year'));
  }

  public prevYear(years: number = 1): Day {
    return this.relativeYears( -years );
  }

  public nextYear(years: number = 1): Day {
    return this.relativeYears( years );
  }

  // Hour

  public withHour(hour: number): Day {
    return this.mutate(d => d.hour(hour));
  }

  public relativeHours(hours: number): Day {
    return this.mutate(d => d.add(hours, 'hours'));
  }

  public prevHour(hours: number = 1): Day {
    return this.relativeHours( -hours );
  }

  public nextHour(hours: number = 1): Day {
    return this.relativeHours( hours );
  }

  // Time

  public withTimes(
      hour: number = Constants.HOUR_MIN,
      minute: number = Constants.MINUTE_MIN,
      second: number = Constants.SECOND_MIN,
      millisecond: number = Constants.MILLIS_MIN): Day {
    return this.mutate(d => d.set({hour, minute, second, millisecond}));
  }

  public withTime(time: Time): Day {
    return this.withTimes(time.hour, time.minute, time.second, time.millisecond);
  }

  public asTime(): Time {
    return new Time(this.hour, this.minute, this.seconds, this.millis);
  }

  // Start & End

  // Time

  public start(): Day {
    return this.mutate(d => d.startOf('day'));
  }

  public isStart(): boolean {
    return this.hour === Constants.HOUR_MIN &&
      this.minute === Constants.MINUTE_MIN &&
      this.seconds === Constants.SECOND_MIN &&
      this.millis === Constants.MILLIS_MIN;
  }

  public end(inclusive: boolean = true): Day {
    return inclusive ?
      this.mutate(d => d.endOf('day')) :
      this.mutate(d => d.startOf('day').add(1, 'day'));
  }

  public isEnd(): boolean {
    return this.hour === Constants.HOUR_MAX &&
      this.minute === Constants.MINUTE_MAX &&
      this.seconds === Constants.SECOND_MAX &&
      this.millis === Constants.MILLIS_MAX;
  }

  // Hour

  public startOfHour(): Day {
    return this.mutate(d => d.startOf('hour'));
  }

  public isStartOfHour(): boolean {
    return this.minute === Constants.MINUTE_MIN &&
      this.seconds === Constants.SECOND_MIN &&
      this.millis === Constants.MILLIS_MIN;
  }

  public endOfHour(inclusive: boolean = true): Day {
    return inclusive ?
      this.mutate(d => d.endOf('hour')) :
      this.mutate(d => d.startOf('hour').add(1, 'hour'));
  }

  public isEndOfHour(): boolean {
    return this.minute === Constants.MINUTE_MAX &&
      this.seconds === Constants.SECOND_MAX &&
      this.millis === Constants.MILLIS_MAX;
  }

  // Week

  public startOfWeek(): Day {
    return this.mutate(d => d.startOf('week'));
  }

  public isStartOfWeek(): boolean {
    return this.dayOfWeek === Constants.WEEKDAY_MIN;
  }

  public endOfWeek(inclusive: boolean = true): Day {
    return inclusive ?
      this.mutate(d => d.endOf('week')) :
      this.mutate(d => d.startOf('week').add(1, 'week'));
  }

  public isEndOfWeek(): boolean {
    return this.dayOfWeek === Constants.WEEKDAY_MAX;
  }

  // Month

  public startOfMonth(): Day {
    return this.mutate(d => d.startOf('month'));
  }

  public isStartOfMonth(): boolean {
    return this.dayOfMonth === Constants.DAY_MIN;
  }

  public endOfMonth(inclusive: boolean = true): Day {
    return inclusive ?
      this.mutate(d => d.endOf('month')) :
      this.mutate(d => d.startOf('month').add(1, 'month'));
  }

  public isEndOfMonth(): boolean {
    return this.dayOfMonth === this.daysInMonth();
  }

  // Year

  public startOfYear(): Day {
    return this.mutate(d => d.startOf('year'));
  }

  public isStartOfYear(): boolean {
    return this.month === Constants.MONTH_MIN && this.dayOfMonth === Constants.DAY_MIN;
  }

  public endOfYear(inclusive: boolean = true): Day {
    return inclusive ?
      this.mutate(d => d.endOf('year')) :
      this.mutate(d => d.startOf('year').add(1, 'year'));
  }

  public isEndOfYear(): boolean {
    return this.month === Constants.MONTH_MAX && this.dayOfMonth === Constants.DAY_MAX;
  }

  // Days In X

  public daysInMonth(): number {
    return this.date.daysInMonth();
  }

  public daysInYear(): number {
    return this.endOfYear().dayOfYear;
  }

  public weeksInYear(): number {
    return this.date.weeksInYear();
  }

  // Display

  public format(format: string): string {
    return this.date.format( format );
  }

  public utc(keepLocalTime?: boolean): Day {
    return this.mutate(d => d.utc(keepLocalTime));
  }

  public toMoment(): moment.Moment {
    return this.date.clone();
  }

  public toDate(): Date {
    return this.date.toDate();
  }

  public toArray(): number[] {
    return this.date.toArray();
  }

  public toJSON(): string {
    return this.date.toJSON();
  }

  public toISOString(keepOffset: boolean = false): string {
    return this.date.toISOString( keepOffset );
  }

  public toObject(): object {
    return this.date.toObject();
  }

  public toString(): string {
    return this.date.toString();
  }

  // State

  public isDST(): boolean {
    return this.date.isDST();
  }

  public isLeapYear(): boolean {
    return this.date.isLeapYear();
  }

  // Instances

  public static now(): Day {
    return new Day(moment());
  }

  public static today(): Day {
    return this.now().start();
  }

  public static tomorrow(): Day {
    return this.today().next();
  }

  public static fromMoment(moment: moment.Moment): Day {
    return moment && moment.isValid() ? new Day( moment ) : null;
  }

  public static unix(millis: number): Day {
    return this.fromMoment(moment(millis));
  }

  public static parse(input: DayInput): Day {
    return Parse.day(input);
  }

  public static fromString(input: string): Day {
    return this.fromMoment(moment(input));
  }

  public static fromFormat(input: string, formats: string | string[]): Day {
    return this.fromMoment(moment(input, formats));
  }

  public static fromObject(input: object): Day {
    return this.fromMoment(moment(input));
  }

  public static fromDate(input: Date): Day {
    return this.fromMoment(moment(input));
  }

  public static fromArray(input: number[]): Day {
    return this.fromMoment(moment(input));
  }

  public static fromDayIdentifier(id: number): Day {
    let date: number = id % 100;
    let month: number = (Math.floor(id / 100) % 100) - 1;
    let year: number = Math.floor(id / 10000);

    return this.build(year, month, date);
  }

  public static build(year: number, month: number,
    date: number = Constants.DAY_MIN,
    hour: number = Constants.HOUR_MIN,
    minute: number = Constants.MINUTE_MIN,
    second: number = Constants.SECOND_MIN,
    millisecond: number = Constants.MILLIS_MIN): Day
  {
    return new Day( moment({year, month, date, hour, minute, second, millisecond}) );
  }








  public static getWeekspanOfYear(date: moment.Moment): number
  {
    return Math.floor( (date.dayOfYear() - 1) / Constants.DAYS_IN_WEEK );
  }

  public static getLastWeekspanOfYear(date: moment.Moment): number
  {
    let lastOfYear = date.clone().endOf('year');
    let daysInYear: number = lastOfYear.dayOfYear();

    return Math.floor( (daysInYear - date.dayOfYear()) / Constants.DAYS_IN_WEEK );
  }

  public static getWeekOfYear(date: moment.Moment): number
  {
    let firstOfYear = date.clone().startOf('year');
    let weeks: number = date.week();

    return firstOfYear.day() > Constants.WEEK_OF_MONTH_MINIMUM_WEEKDAY ? weeks - 1 : weeks;
  }

  public static getFullWeekOfYear(date: moment.Moment): number
  {
    let firstOfYear = date.clone().startOf('year');
    let weeks: number = date.week();

    return firstOfYear.day() === Constants.WEEKDAY_MIN ? weeks : weeks - 1;
  }

  public static getLastFullWeekOfYear(date: moment.Moment): number
  {
    let firstOfYear = date.clone().startOf('year');
    let weeks: number = date.week();
    let weeksMax: number = date.weeksInYear();
    let lastWeek: number = weeksMax - weeks;

    return firstOfYear.day() === Constants.WEEKDAY_MIN ? lastWeek + 1 : lastWeek;
  }

  public static getWeekspanOfMonth(date: moment.Moment): number
  {
    return Math.floor((date.date() - 1) / Constants.DAYS_IN_WEEK);
  }

  public static getLastWeekspanOfMonth(date: moment.Moment): number
  {
    return Math.floor((date.daysInMonth() - date.date()) / Constants.DAYS_IN_WEEK);
  }

  public static getFullWeekOfMonth(date: moment.Moment): number
  {
    return Math.floor((date.date() - 1 - date.day() + Constants.DAYS_IN_WEEK) / Constants.DAYS_IN_WEEK);
  }

  public static getLastFullWeekOfMonth(date: moment.Moment): number
  {
    return Math.floor((date.daysInMonth() - date.date() - (Constants.WEEKDAY_MAX - date.day()) + Constants.DAYS_IN_WEEK) / Constants.DAYS_IN_WEEK);
  }

  public static getWeekOfMonth(date: moment.Moment): number
  {
    let dom = date.date();
    let dow = date.day();
    let sundayDate = dom - dow;

    return Math.floor( ( sundayDate + Constants.WEEK_OF_MONTH_MINIMUM_WEEKDAY + 5 ) / Constants.DAYS_IN_WEEK );
  }

  public static getLastDayOfMonth(date: moment.Moment): number
  {
    return date.daysInMonth() - date.date() + 1;
  }

  public static getWeekIdentifier(date: moment.Moment): number
  {
    return date.week() + date.year() * 100;
  }

  public static getMonthIdentifier(date: moment.Moment): number
  {
    return (date.month() + 1) + date.year() * 100;
  }

  public static getDayIdentifier(date: moment.Moment): number
  {
    return date.date() + (date.month() + 1) * 100 + date.year() * 10000;
  }

  public static getQuarterIdentifier(date: moment.Moment): number
  {
    return date.quarter() + date.year() * 10;
  }

}
