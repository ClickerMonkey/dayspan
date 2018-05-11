
import { Constants } from './Constants';



export class Day
{

  public readonly date: Date;
  public readonly time: number;
  public readonly timeless: number;
  public readonly dayOfWeek: number;
  public readonly dayOfMonth: number;
  public readonly dayOfYear: number;
  public readonly month: number;
  public readonly weekOfYear: number;
  public readonly weekOfMonth: number;
  public readonly year: number;
  public readonly hour: number;
  public readonly minute: number;
  public readonly seconds: number;
  public readonly millis: number;

  public constructor(date: Date) {
    this.date         = date;
    this.time         = date.getTime();
    this.timeless     = Math.floor( this.time / Constants.MILLIS_IN_DAY );
    this.hour         = date.getHours();
    this.minute       = date.getMinutes();
    this.dayOfWeek    = date.getDay();
    this.dayOfMonth   = date.getDate();
    this.dayOfYear    = Day.getDayOfYear( date );
    this.month        = date.getMonth();
    this.weekOfYear   = Day.getWeekOfYear( date );
    this.weekOfMonth  = Day.getWeekOfMonth( date );
    this.year         = date.getFullYear();
    this.seconds      = date.getSeconds();
    this.millis       = date.getMilliseconds();
  }

  // Same

  public sameDay(day: Day): boolean {
    return this.year === day.year && this.month === day.month && this.dayOfMonth === day.dayOfMonth;
  }

  public sameMonth(day: Day): boolean {
    return this.year === day.year && this.month === day.month;
  }

  public sameWeek(day: Day): boolean {
    return this.year === day.year && this.weekOfYear === day.weekOfYear;
  }

  public sameYear(day: Day): boolean {
    return this.year === day.year;
  }

  public sameHour(day: Day): boolean {
    return this.sameDay( day ) && this.hour === day.hour;
  }

  public sameMinute(day: Day): boolean {
    return this.sameDay( day ) && this.hour === day.hour && this.minute === day.minute;
  }

  // Between

  public timeBetween(day: Day, unitMillis: number, floor: (day: Day) => Day, partial: boolean = true, absolute: boolean = true, round: boolean = true): number {
    let start: Day = partial ? floor( this ) : this;
    let end: Day = partial ? floor( day ) : day;
    let between: number = (end.time - start.time) / unitMillis;

    if (absolute && between < 0) {
      between = -between;
    }

    if (round) {
      if (between < 0) {
        between = Math.ceil( between );
      } else {
        between = Math.floor( between );
      }
    }

    return between;
  }

  public millisBetween(day: Day, absolute: boolean = true): number {
    return this.timeBetween(day, 1, d => d, false, absolute, false);
  }

  public daysBetween(day: Day, partialDays: boolean = true, absolute: boolean = true, round: boolean = true): number {
    return this.timeBetween(day, Constants.MILLIS_IN_DAY, d => d.start(), partialDays, absolute, round);
  }

  public weeksBetween(day: Day, partialWeeks: boolean = true, absolute: boolean = true, round: boolean = true): number {
    return this.timeBetween(day, Constants.MILLIS_IN_WEEK, d => d.startOfWeek(), partialWeeks, absolute, round);
  }

  public hoursBetween(day: Day, partialHours: boolean = true, absolute: boolean = true, round: boolean = true): number {
    return this.timeBetween(day, Constants.MILLIS_IN_HOUR, d => d.startOfHour(), partialHours, absolute, round);
  }

  public isBetween(start: Day, end: Day, inclusive: boolean = false): boolean {
    return this.time >= start.time && (
      (inclusive && this.time <= end.time) ||
      (!inclusive && this.time < end.time)
    );
  }

  public getDate(): Date {
    return new Date( this.time );
  }

  public relativeTimezoneOffset(offset: number = 1): Day {
    return this.mutate(d => {
      d.setTime( d.getTime() + d.getTimezoneOffset() * Constants.MILLIS_IN_MINUTE );
    });
  }

  public mutate(mutator: (date: Date) => void): Day {
    var d = this.getDate();
    mutator( d );
    return new Day( d );
  }

  public relative(millis: number): Day {
    return this.mutate(d => {
      d.setTime( d.getTime() + millis );
    });
  }

  // Days

  public relativeDays(days: number): Day {
    return this.relative( days * Constants.MILLIS_IN_DAY );
  }

  public prev(days: number = 1): Day {
    return this.relativeDays( -days );
  }

  public next(days: number = 1): Day {
    return this.relativeDays( days );
  }

  public withDayOfMonth(day: number): Day {
    return this.mutate(d => {
      d.setDate( day );
    });
  }

  public withDayOfWeek(dayOfWeek: number): Day {
    return this.relativeDays( dayOfWeek - this.dayOfWeek );
  }

  public withDayOfYear(dayOfYear: number): Day {
    return this.relativeDays( dayOfYear - this.dayOfYear );
  }

  // Month

  public withMonth(month: number): Day {
    return this.mutate(d => {
      d.setMonth( month );
    });
  }

  public relativeMonths(months: number): Day {
    return this.withMonth( this.month + months );
  }

  public prevMonth(months: number = 1): Day {
    return this.relativeMonths( -months );
  }

  public nextMonth(months: number = 1): Day {
    return this.relativeMonths( months );
  }

  // Week Of Year

  public withWeek(week: number): Day {
    return this.mutate(d => {
      d.setDate( (week - this.weekOfYear) * Constants.DAYS_IN_WEEK );
    });
  }

  public relativeWeeks(weeks: number): Day {
    return this.relative( weeks * Constants.MILLIS_IN_WEEK );
  }

  public prevWeek(weeks: number = 1): Day {
    return this.relativeWeeks( -weeks );
  }

  public nextWeek(weeks: number = 1): Day {
    return this.relativeWeeks( weeks );
  }

  // Year

  public withYear(year: number): Day {
    return this.mutate(d => {
      d.setFullYear(year);
    });
  }

  public relativeYears(years: number): Day {
    return this.withYear( this.year + years );
  }

  public prevYear(years: number = 1): Day {
    return this.relativeYears( -years );
  }

  public nextYear(years: number = 1): Day {
    return this.relativeYears( years );
  }

  // Hour

  public withHour(hour: number): Day {
    return this.mutate(d => {
      d.setHours(hour);
    });
  }

  public relativeHours(hours: number): Day {
    return this.withHour( this.hour + hours );
  }

  public prevHour(hours: number = 1): Day {
    return this.relativeHours( -hours );
  }

  public nextHour(hours: number = 1): Day {
    return this.relativeHours( hours );
  }

  // Time

  public withTime(
      hour: number = Constants.HOUR_MIN,
      minute: number = Constants.MINUTE_MIN,
      second: number = Constants.SECOND_MIN,
      millis: number = Constants.MILLIS_MIN): Day {
    return this.mutate(d => {
      d.setHours( hour, minute, second, millis );
    });
  }

  // Start & End

  // Time

  public start(): Day {
    return this.withTime();
  }

  public isStart(): boolean {
    return this.hour === Constants.HOUR_MIN &&
      this.minute === Constants.MINUTE_MIN &&
      this.seconds === Constants.SECOND_MIN &&
      this.millis === Constants.MILLIS_MIN;
  }

  public end(inclusive: boolean = true): Day {
    return inclusive ?
      this.withTime(Constants.HOUR_MAX, Constants.MINUTE_MAX, Constants.SECOND_MAX, Constants.MINUTE_MAX) :
      this.next().start();
  }

  public isEnd(): boolean {
    return this.hour === Constants.HOUR_MAX &&
      this.minute === Constants.MINUTE_MAX &&
      this.seconds === Constants.SECOND_MAX &&
      this.millis === Constants.MILLIS_MAX;
  }

  // Hour

  public startOfHour(): Day {
    return this.withTime(this.hour);
  }

  public isStartOfHour(): boolean {
    return this.minute === Constants.MINUTE_MIN &&
      this.seconds === Constants.SECOND_MIN &&
      this.millis === Constants.MILLIS_MIN;
  }

  public endOfHour(inclusive: boolean = true): Day {
    return inclusive ?
      this.withTime(this.hour, Constants.MINUTE_MAX, Constants.SECOND_MAX, Constants.MINUTE_MAX) :
      this.withTime(this.hour + 1)
  }

  public isEndOfHour(): boolean {
    return this.minute === Constants.MINUTE_MAX &&
      this.seconds === Constants.SECOND_MAX &&
      this.millis === Constants.MILLIS_MAX;
  }

  // Week

  public startOfWeek(): Day {
    return this.relativeDays( -this.dayOfWeek );
  }

  public isStartOfWeek(): boolean {
    return this.dayOfWeek === Constants.WEEKDAY_MIN;
  }

  public endOfWeek(inclusive: boolean = true): Day {
    return inclusive ?
      this.relativeDays( Constants.DAYS_IN_WEEK - this.dayOfWeek - 1 ) :
      this.startOfWeek().nextWeek();
  }

  public isEndOfWeek(): boolean {
    return this.dayOfWeek === Constants.WEEKDAY_MAX;
  }

  // Month

  public startOfMonth(): Day {
    return this.withDayOfMonth( Constants.DAY_MIN );
  }

  public isStartOfMonth(): boolean {
    return this.dayOfMonth === Constants.DAY_MIN;
  }

  public endOfMonth(inclusive: boolean = true): Day {
    return inclusive ?
      this.withDayOfMonth( this.daysInMonth() ) :
      this.startOfMonth().nextMonth();
  }

  public isEndOfMonth(): boolean {
    return this.dayOfMonth === this.daysInMonth();
  }

  // Year

  public startOfYear(): Day {
    return this.mutate(d => {
      d.setMonth(Constants.MONTH_MIN, Constants.DAY_MIN);
    });
  }

  public isStartOfYear(): boolean {
    return this.month === Constants.MONTH_MIN && this.dayOfMonth === Constants.DAY_MIN;
  }

  public endOfYear(inclusive: boolean = true): Day {
    return this.mutate(d => {
      d.setMonth(Constants.MONTHS_IN_YEAR, inclusive ? 0 : 1);
    });
  }

  public isEndOfYear(): boolean {
    return this.month === Constants.MONTH_MAX && this.dayOfMonth === Constants.DAY_MAX;
  }

  // Days In X

  public daysInMonth(): number {
    var d = this.getDate();
    d.setMonth(d.getMonth() + 1, 0);
    return d.getDate();
  }

  public daysInYear(): number {
    return Day.getDayOfYear( this.endOfYear().date );
  }

  public static now(): Day {
    return new Day(new Date());
  }

  public static today(): Day {
    return this.now().start();
  }

  public static tomorrow(): Day {
    return this.today().next();
  }

  public static utc(millis: number): Day {
    return new Day(new Date(millis));
  }

  public static create(year: number, month: number,
    date: number = Constants.DAY_MIN,
    hour: number = Constants.HOUR_MIN,
    minute: number = Constants.MINUTE_MIN,
    second: number = Constants.SECOND_MIN,
    millis: number = Constants.MILLIS_MIN): Day
  {
    return new Day( new Date( year, month, date, hour, minute, second, millis ) );
  }

  public static getWeekOfYear(date: Date): number
  {
    var d = new Date( date.getTime() );
    d.setHours( 0, 0, 0 );
    d.setDate( d.getDate() + 4 - ( d.getDay() || Constants.DAYS_IN_WEEK ) );
    var firstOfYear = new Date( d.getFullYear(), 0, 1 );
    return Math.ceil( ( ( ( d.getTime() - firstOfYear.getTime() ) / Constants.MILLIS_IN_DAY ) + 1 ) / Constants.DAYS_IN_WEEK );
  }

  public static getWeekOfMonth(date: Date): number
  {
    var dom = date.getDate();
    var dow = date.getDay();
    var sundayDate = dom - dow;
    return Math.floor( ( sundayDate + Constants.WEEK_OF_MONTH_MINIMUM_WEEKDAY + 5 ) / Constants.DAYS_IN_WEEK );
  }

  public static getDayOfYear(date: Date): number
  {
    var start = new Date( date.getFullYear(), 0, 0 );
    var diff = date.getTime() - start.getTime();
    var day = Math.floor( diff / Constants.MILLIS_IN_DAY );
    return day;
  }

}
