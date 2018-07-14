

/**
 * A class that stores commonly used values.
 */
export class Constants
{

  /**
   * The number of milliseconds in a second.
   */
  public static MILLIS_IN_SECOND: number = 1000;

  /**
   * The number of milliseconds in a minute.
   */
  public static MILLIS_IN_MINUTE: number = Constants.MILLIS_IN_SECOND * 60;

  /**
   * The number of milliseconds in an hour.
   */
  public static MILLIS_IN_HOUR: number = Constants.MILLIS_IN_MINUTE * 60;

  /**
   * The number of milliseconds in a day (not including DST days).
   */
  public static MILLIS_IN_DAY: number = Constants.MILLIS_IN_HOUR * 24;

  /**
   * The number of milliseconds in a week (not including ones that include DST).
   */
  public static MILLIS_IN_WEEK: number = Constants.MILLIS_IN_DAY * 7;

  /**
   * The number of minutes in an hour.
   */
  public static MINUTES_IN_HOUR = 60;

  /**
   * The number of minutes in a day (not including DST days).
   */
  public static MINUTES_IN_DAY = 60 * 24;

  /**
   * The number of days in a week.
   */
  public static DAYS_IN_WEEK: number = 7;


  /**
   * The number of months in a year.
   */
  public static MONTHS_IN_YEAR: number = 12;

  /**
   * The number of hours in a day (not including DST days).
   */
  public static HOURS_IN_DAY: number = 24;


  /**
   * The first month of the year.
   */
  public static MONTH_MIN: number = 0;

  /**
   * The last month of the year.
   */
  public static MONTH_MAX: number = 11;

  /**
   * The first day of a month.
   */
  public static DAY_MIN: number = 1;

  /**
   * The last day of the longest month.
   */
  public static DAY_MAX: number = 31;

  /**
   * The first hour of the day.
   */
  public static HOUR_MIN: number = 0;

  /**
   * The last hour of the day.
   */
  public static HOUR_MAX: number = 23;

  /**
   * The first minute of the hour.
   */
  public static MINUTE_MIN: number = 0;

  /**
   * The last minute of the hour.
   */
  public static MINUTE_MAX: number = 59;

  /**
   * The first second of the minute.
   */
  public static SECOND_MIN: number = 0;

  /**
   * The last second of the minute.
   */
  public static SECOND_MAX: number = 59;

  /**
   * The first millisecond of the second.
   */
  public static MILLIS_MIN: number = 0;

  /**
   * The last millisecond of the second.
   */
  public static MILLIS_MAX: number = 999;

  /**
   * The first day of the week.
   */
  public static WEEKDAY_MIN: number = 0;

  /**
   * The last day of the week.
   */
  public static WEEKDAY_MAX: number = 6;


  /**
   * The default duration for an event.
   */
  public static DURATION_DEFAULT: number = 1;

  /**
   * The default duration unit for an all day event.
   */
  public static DURATION_DEFAULT_UNIT_ALL: string = 'days';

  /**
   * The default duration unit for an event at a given time.
   */
  public static DURATION_DEFAULT_UNIT_TIMES: string = 'hours';

  /**
   * Computes the duration unit given its for an all day event.
   *
   * @param all If the event is all day.
   * @return The default unit for the event.
   */
  public static DURATION_DEFAULT_UNIT: (all: boolean) => string =
    all => all ? Constants.DURATION_DEFAULT_UNIT_ALL :
                 Constants.DURATION_DEFAULT_UNIT_TIMES;

  /**
   * The number of milliseconds for various duration units. These are worse case
   * scenario and do not include DST changes.
   */
  public static DURATION_TO_MILLIS = {
    minute:   Constants.MILLIS_IN_MINUTE,
    minutes:  Constants.MILLIS_IN_MINUTE,
    hour:     Constants.MILLIS_IN_HOUR,
    hours:    Constants.MILLIS_IN_HOUR,
    day:      Constants.MILLIS_IN_DAY,
    days:     Constants.MILLIS_IN_DAY,
    week:     Constants.MILLIS_IN_WEEK,
    weeks:    Constants.MILLIS_IN_WEEK,
    month:    Constants.MILLIS_IN_DAY * Constants.DAY_MAX,
    months:   Constants.MILLIS_IN_DAY * Constants.DAY_MAX
  };

  /**
   * The maximum estimated number of events per day. This is used to calculate
   * [[CalendarEvent.id]] to give each event a unique ID. If you think you will
   * have more events than this per day, you can enlarge the value.
   */
  public static MAX_EVENTS_PER_DAY: number = 24;

  /**
   * The day of the week which determines the first week of the year or month.
   * By default this day is Thursday.
   */
  public static WEEK_OF_MONTH_MINIMUM_WEEKDAY: number = 4;

}
