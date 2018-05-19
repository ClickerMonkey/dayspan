

export class Constants
{
  public static MILLIS_IN_SECOND: number = 1000;
  public static MILLIS_IN_MINUTE: number = 1000 * 60;
  public static MILLIS_IN_HOUR: number = 1000 * 60 * 60;
  public static MILLIS_IN_DAY: number = 1000 * 60 * 60 * 24;
  public static MILLIS_IN_WEEK: number = 1000 * 60 * 60 * 24 * 7;

  public static DAYS_IN_WEEK: number = 7;
  public static MONTHS_IN_YEAR: number = 12;
  public static HOURS_IN_DAY: number = 24;

  public static MONTH_MIN: number = 0;
  public static MONTH_MAX: number = 11;
  public static DAY_MIN: number = 1;
  public static DAY_MAX: number = 31;
  public static HOUR_MIN: number = 0;
  public static HOUR_MAX: number = 23;
  public static MINUTE_MIN: number = 0;
  public static MINUTE_MAX: number = 59;
  public static SECOND_MIN: number = 0;
  public static SECOND_MAX: number = 59;
  public static MILLIS_MIN: number = 0;
  public static MILLIS_MAX: number = 999;
  public static WEEKDAY_MIN: number = 0;
  public static WEEKDAY_MAX: number = 6;

  public static START_NONE: number = 0;
  public static END_NONE: number = 0;
  public static DURATION_NONE: number = 0;
  public static DURATION_DEFAULT_UNIT: string = 'minutes';

  public static MAX_EVENTS_PER_DAY: number = 24;

  public static WEEK_OF_MONTH_MINIMUM_WEEKDAY: number = 4; // Thursday by default
}
