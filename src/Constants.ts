

export class Constants
{
  public static MILLIS_IN_SECOND: number = 1000;
  public static MILLIS_IN_MINUTE: number = Constants.MILLIS_IN_SECOND * 60;
  public static MILLIS_IN_HOUR: number = Constants.MILLIS_IN_MINUTE * 60;
  public static MILLIS_IN_DAY: number = Constants.MILLIS_IN_HOUR * 24;
  public static MILLIS_IN_WEEK: number = Constants.MILLIS_IN_DAY * 7;

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

  public static DURATION_DEFAULT: number = 1;
  public static DURATION_DEFAULT_UNIT_ALL: string = 'days';
  public static DURATION_DEFAULT_UNIT_TIMES: string = 'hours';
  public static DURATION_DEFAULT_UNIT: (all: boolean) => string = all => all ? Constants.DURATION_DEFAULT_UNIT_ALL : Constants.DURATION_DEFAULT_UNIT_TIMES;
  // worst case not including DST changes
  public static DURATION_TO_MILLIS = {
    minute:   Constants.MILLIS_IN_MINUTE,
    minutes:  Constants.MILLIS_IN_MINUTE,
    hour:     Constants.MILLIS_IN_HOUR,
    hours:    Constants.MILLIS_IN_HOUR,
    day:      Constants.MILLIS_IN_DAY,
    days:     Constants.MILLIS_IN_DAY,
    week:     Constants.MILLIS_IN_WEEK,
    weeks:    Constants.MILLIS_IN_WEEK,
    month:    Constants.MILLIS_IN_DAY * 31,
    months:   Constants.MILLIS_IN_DAY * 31
  };

  public static MAX_EVENTS_PER_DAY: number = 24;

  public static WEEK_OF_MONTH_MINIMUM_WEEKDAY: number = 4; // Thursday by default
}
