

import { Constants } from './Constants';
import { LocaleOptions, Locales } from './Locale';
import { Weekday } from './Weekday';

export type Unit = 
  'millis' | 
  'second' | 
  'minute' | 
  'hour' | 
  'day' | 
  'week' | 
  'month' |
  'quarter' |
  'year';

export type UnitRecord<T> = Record<Unit, T>;

export type Starter = (x: Date, options?: LocaleOptions) => void;

export const startOf: UnitRecord<Starter> = 
{
  millis:   x => x,
  second:   startOfSecond,
  minute:   startOfMinute,
  hour:     startOfHour,
  day:      startOfDay,
  week:     startOfWeek,
  month:    startOfMonth,
  quarter:  startOfQuarter,
  year:     startOfYear,
};

export type Ender = (x: Date, options?: LocaleOptions) => void;

export const endOf: UnitRecord<Ender> = 
{
  millis:   x => x,
  second:   endOfSecond,
  minute:   endOfMinute,
  hour:     endOfHour,
  day:      endOfDay,
  week:     endOfWeek,
  month:    endOfMonth,
  quarter:  endOfQuarter,
  year:     endOfYear,
};

export type Adder = (x: Date, amount: number) => void;

export const add: UnitRecord<Adder> = 
{
  millis:   addMilliseconds,
  second:   addSeconds,
  minute:   addMinutes,
  hour:     addHours,
  day:      addDays,
  week:     addWeeks,
  month:    addMonths,
  quarter:  addQuarters,
  year:     addYears,
};

export type Differ = (a: Date, b: Date) => number;

export const diff: UnitRecord<Differ> = 
{
  millis:   diffMilliseconds,
  second:   diffSeconds,
  minute:   diffMinutes,
  hour:     diffHours,
  day:      diffDays,
  week:     diffWeeks,
  month:    diffMonths,
  quarter:  diffQuarters,
  year:     diffYears,
};

/**
 * The number of milliseconds for various duration units. These are worse case
 * scenario and do not include DST changes.
 */
export const durations: UnitRecord<number> = 
{
  millis:   1,
  second:   Constants.MILLIS_IN_SECOND,
  minute:   Constants.MILLIS_IN_MINUTE,
  hour:     Constants.MILLIS_IN_HOUR,
  day:      Constants.MILLIS_IN_DAY,
  week:     Constants.MILLIS_IN_WEEK,
  month:    Constants.MILLIS_IN_DAY * Constants.DAY_MAX,
  quarter:  Constants.MILLIS_IN_DAY * Constants.DAY_MAX * Constants.MONTHS_IN_QUARTER,
  year:     Constants.MILLIS_IN_DAY * Constants.DAYS_IN_YEAR    
}



export function mutate(a: Date, mutator: (a: Date, options?: LocaleOptions) => void, options?: LocaleOptions): Date
{
  const b = new Date(a.getTime());

  mutator(b, options);

  return b;
}

export function compare(a: Date, b: Date, precision: Unit = 'millis', options: LocaleOptions = Locales.current): number
{
  const starter = startOf[precision];
  const x = mutate(a, starter, options);
  const y = mutate(b, starter, options);

  return x.getTime() - y.getTime();
}

export function getLastDayOfMonth(x: Date): number
{
  return getDaysInMonth(x) - x.getDate() + 1;
}

export function getLastWeekspanOfYear(x: Date): number
{
  const fromEnd = getDaysInYear(x) - getDayOfYear(x);

  return Math.floor(fromEnd / Constants.DAYS_IN_WEEK);
}

export function getWeekOfYearISO(x: Date, options: LocaleOptions = Locales.current): number
{
  return getWeekISO(mutate(x, startOfYear), getDayOfYear(x), options);
}

export function getWeekOfYear(x: Date, options: LocaleOptions = Locales.current): number
{
  return getWeek(mutate(x, startOfYear), getDayOfYear(x), options);
}

export function getWeekspanOfYear(x: Date): number
{
  return Math.floor((getDayOfYear(x) - 1) / Constants.DAYS_IN_WEEK);
}

export function getFullWeekOfYear(x: Date, options: LocaleOptions = Locales.current): number
{
  return getFullWeekOf(mutate(x, startOfYear), getDaysInYear(x), options);
}

export function getWeeksInYear(x: Date, options: LocaleOptions = Locales.current): number
{
  return getWeekOfYearISO(mutate(x, endOfYear), options) + 1;
}

export function getLastFullWeekOfYear(x: Date, options: LocaleOptions = Locales.current): number
{
  const lastOfYear = mutate(x, endOfYear);
  const week = getWeekOfYearISO(x, options);
  const weekMax = getWeekOfYearISO(lastOfYear, options);
  const lastWeek = weekMax - week;

  return getDayOfWeek(lastOfYear, options) === Constants.WEEKDAY_MAX 
    ? lastWeek + 1
    : lastWeek;
}

export function getWeekspanOfMonth(x: Date): number
{
  return Math.floor((x.getDate() - 1) / Constants.DAYS_IN_WEEK);
}

export function getLastWeekspanOfMonth(x: Date): number
{
  const fromEnd = getDaysInMonth(x) - x.getDate();

  return Math.floor(fromEnd / Constants.DAYS_IN_WEEK);
}

export function getFullWeekOfMonth(x: Date, options: LocaleOptions = Locales.current): number
{
  return getFullWeekOf(mutate(x, startOfMonth), x.getDate(), options);
}

export function getLastFullWeekOfMonth(x: Date, options: LocaleOptions = Locales.current): number
{
  const fromEnd = getDaysInMonth(x) - x.getDate();
  const invertedDayOfWeek = Constants.WEEKDAY_MAX - getDayOfWeek(x, options);
  
  return Math.floor((fromEnd - invertedDayOfWeek + Constants.DAYS_IN_WEEK) / Constants.DAYS_IN_WEEK);
}

export function getWeekOfMonthISO(x: Date, options: LocaleOptions = Locales.current): number
{
  return getWeekISO(mutate(x, startOfMonth), x.getDate(), options);
}

export function getWeekOfMonth(x: Date, options: LocaleOptions = Locales.current): number
{
  return getWeek(mutate(x, startOfMonth), x.getDate(), options);
}

export function getWeekISO(start: Date, dayOfStart: number, options: LocaleOptions = Locales.current): number
{
  const { firstWeekContainsDate } = options;
  const dayOfWeekFirst = getDayOfWeek(start, options);
  const hasWeekZero = Constants.DAYS_IN_WEEK - dayOfWeekFirst < firstWeekContainsDate;
  const offset = hasWeekZero
    ? dayOfWeekFirst - 1
    : dayOfWeekFirst - 1 + Constants.DAYS_IN_WEEK;

  return Math.floor((dayOfStart + offset) / Constants.DAYS_IN_WEEK);
}

export function getWeek(start: Date, dayOfStart: number, options: LocaleOptions): number
{
  const dayOfWeekFirst = getDayOfWeek(start, options);
  const offset = dayOfWeekFirst - 1 + Constants.DAYS_IN_WEEK;

  return Math.floor((dayOfStart + offset) / Constants.DAYS_IN_WEEK);
}

export function getFullWeekOf(start: Date, dayOfStart: number, options: LocaleOptions = Locales.current): number
{
  const dayOfWeekFirst = getDayOfWeek(start, options);
  const hasWeekZero = dayOfWeekFirst !== Weekday.SUNDAY;
  const offset = hasWeekZero
    ? dayOfWeekFirst - 1
    : dayOfWeekFirst - 1 + Constants.DAYS_IN_WEEK;

  return Math.floor((dayOfStart + offset) / Constants.DAYS_IN_WEEK);
}

export function getDayOfWeek(x: Date, options: LocaleOptions = Locales.current): number
{
  const { weekStartsOn } = options;
  const day = x.getDay();

  return day < weekStartsOn 
    ? day - weekStartsOn + Constants.DAYS_IN_WEEK
    : day - weekStartsOn;
}

export function getDayOfYear(a: Date): number
{
  return Math.round(diffDays(a, mutate(a, startOfYear))) + 1;
}

export function getDateOffset(x: Date): number
{
// tslint:disable-next-line: no-magic-numbers
  return -Math.round(x.getTimezoneOffset() / 15) * 15;
}

export function isDaylightSavingTime(x: Date): boolean
{
  const offset = getDateOffset(x);

  return (
    offset > getDateOffset(mutate(x, d => d.setMonth(0))) ||
    // tslint:disable-next-line: no-magic-numbers
    offset > getDateOffset(mutate(x, d => d.setMonth(5)))
  );
}

export function isLeapYear(x: Date): boolean
{
  const year = x.getFullYear();

  // tslint:disable-next-line: no-magic-numbers
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
}

export function getDaysInYear(x: Date): number
{
  // tslint:disable-next-line: no-magic-numbers
  return isLeapYear(x) ? 366 : 365;
}

const daysInMonth = [
  // tslint:disable-next-line: no-magic-numbers
  [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  // tslint:disable-next-line: no-magic-numbers
  [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
];

export function getDaysInMonth(x: Date): number
{
  return daysInMonth[isLeapYear(x) ? 1 : 0][x.getMonth()];
}
export function getAbsoluteTimestamp(a: Date): number
{
  return a.getTime() - getTimezoneOffsetInMilliseconds(a);
}

export function getTimezoneOffsetInMilliseconds(a: Date): number
{
  const b = new Date(a.getTime());
  const offsetMinutes = b.getTimezoneOffset();

  b.setSeconds(0, 0);

  const offsetMilliseconds = b.getTime() % Constants.MILLIS_IN_MINUTE;

  return offsetMinutes * Constants.MILLIS_IN_MINUTE + offsetMilliseconds;
}

export function getQuarter(x: Date): number
{
  return Math.floor(x.getMonth() / Constants.MONTHS_IN_QUARTER);
}

export function startOfSecond(x: Date): void
{
  x.setMilliseconds(0);
}

export function startOfMinute(x: Date): void
{
  x.setSeconds(0, 0);
}

export function startOfHour(x: Date): void
{
  x.setMinutes(0, 0, 0);
}

export function startOfDay(x: Date): void
{
  x.setHours(0, 0, 0, 0);
}
export function startOfWeek(x: Date, options: LocaleOptions = Locales.current): void
{
  const dayOfWeek = getDayOfWeek(x, options);

  x.setDate(x.getDate() - dayOfWeek);
  x.setHours(0, 0, 0, 0);
}

export function startOfMonth(x: Date): void
{
  x.setDate(Constants.DAY_MIN);
  x.setHours(0, 0, 0, 0);
}

export function startOfQuarter(x: Date): void
{
  const month = x.getMonth();

  x.setMonth(month - (month % Constants.MONTHS_IN_QUARTER), Constants.DAY_MIN);
  x.setHours(0, 0, 0, 0);
}

export function startOfYear(x: Date): void
{
  const year = x.getFullYear();

  x.setTime(0);
  x.setFullYear(year, 0, 1);
  x.setHours(0, 0, 0, 0);
}

export function endOfSecond(x: Date): void
{
  x.setMilliseconds(Constants.MILLIS_MAX);
}

export function endOfMinute(x: Date): void
{
  x.setSeconds(Constants.SECOND_MAX, Constants.MILLIS_MAX);
}

export function endOfHour(x: Date): void
{
  x.setMinutes(Constants.MINUTE_MAX, Constants.SECOND_MAX, Constants.MILLIS_MAX);
}

export function endOfDay(x: Date): void
{
  x.setHours(Constants.HOUR_MAX, Constants.MINUTE_MAX, Constants.SECOND_MAX, Constants.MILLIS_MAX);
}

export function endOfWeek(x: Date, options: LocaleOptions = Locales.current): void
{
  const dayOfWeek = getDayOfWeek(x, options);

  x.setDate(x.getDate() + (Constants.WEEKDAY_MAX - dayOfWeek));
  endOfDay(x);
}

export function endOfMonth(x: Date): void
{
  x.setFullYear(x.getFullYear(), x.getMonth() + 1, 0);
  endOfDay(x);
}

export function endOfQuarter(x: Date): void
{
  const month = x.getMonth();

  x.setMonth(month - (month % Constants.MONTHS_IN_QUARTER) + Constants.MONTHS_IN_QUARTER, Constants.DAY_MIN);
  endOfDay(x);
}

export function endOfYear(x: Date): void
{
  x.setFullYear(x.getFullYear() + 1, 0, 0);
  endOfDay(x);
}

export function addMilliseconds(x: Date, amount: number): void
{
  x.setTime(x.getTime() + amount);
}

export function addSeconds(x: Date, amount: number): void
{
  addMilliseconds(x, amount * Constants.MILLIS_IN_SECOND);
}

export function addMinutes(x: Date, amount: number): void
{
  addMilliseconds(x, amount * Constants.MILLIS_IN_MINUTE);
}

export function addHours(x: Date, amount: number): void
{
  addMilliseconds(x, amount * Constants.MILLIS_IN_HOUR);
}

export function addDays(x: Date, amount: number): void
{
  x.setDate(x.getDate() + amount);
}

export function addWeeks(x: Date, amount: number): void
{
  addDays(x, amount * Constants.DAYS_IN_WEEK);
}

export function addMonths(x: Date, amount: number): void
{
  const month = x.getMonth() + amount;

  const y = new Date(0)
  y.setFullYear(y.getFullYear(), month, 1)
  y.setHours(0, 0, 0, 0)
  const dayMax = getDaysInMonth(y);

  x.setMonth(month, Math.min(dayMax, x.getDate()));
}

export function addQuarters(x: Date, amount: number): void
{
  addMonths(x, amount * Constants.MONTHS_IN_QUARTER);
}

export function addYears(x: Date, amount: number): void
{
  addMonths(x, amount * Constants.MONTHS_IN_YEAR);
}

export function diffMilliseconds(a: Date, b: Date): number
{
  return a.getTime() - b.getTime();
}

export function diffSeconds(a: Date, b: Date): number
{
  return diffMilliseconds(a, b) / Constants.MILLIS_IN_SECOND;
}

export function diffMinutes(a: Date, b: Date): number
{
  return diffMilliseconds(a, b) / Constants.MILLIS_IN_MINUTE;
}

export function diffHours(a: Date, b: Date): number
{
  return diffMilliseconds(a, b) / Constants.MILLIS_IN_HOUR;
}

export function diffDays(a: Date, b: Date): number 
{
  const left = mutate(a, startOfDay);
  const right = mutate(b, startOfDay);

  const leftTimestamp = getAbsoluteTimestamp(left);
  const rightTimestamp = getAbsoluteTimestamp(right);

  return (leftTimestamp - rightTimestamp) / Constants.MILLIS_IN_DAY;
}

export function diffWeeks(a: Date, b: Date): number
{
  return diffDays(a, b) / Constants.DAYS_IN_WEEK;
}

export function diffMonths(a: Date, b: Date): number
{
  const years = a.getFullYear() - b.getFullYear();
  const months = a.getMonth() - b.getMonth();
  const date = (a.getDate() - b.getDate()) / Constants.DAY_MAX;

  return years * Constants.MONTHS_IN_YEAR + months + date;
}

export function diffQuarters(a: Date, b: Date): number
{
  return diffMonths(a, b) / Constants.MONTHS_IN_QUARTER;
}

export function diffYears(a: Date, b: Date): number
{
  return diffMonths(a, b) / Constants.MONTHS_IN_YEAR;
}
