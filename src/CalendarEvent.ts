
import { Constants } from './Constants';
import { Day } from './Day';
import { DaySpan } from './DaySpan';
import { Schedule } from './Schedule';


/**
 * An event on a given day and the schedule that generated the event.
 */
export class CalendarEvent<T>
{

  /**
   * The relatively unique identifier of this event. It is generated based on
   * the index of the schedule in the calendar and the time of day listed in the
   * schedule. This number will no longer be unique if the schedule has more
   * than [[Constants.MAX_EVENTS_PER_DAY]] occurrences in a single day
   * (based on number of times in [[Schedule.times]]).
   */
  public id: number;

  /**
   * The event paired with the schedule. This can be any value which describes
   * the event. A string for a simple title-only event, or an object with title,
   * colors, icons, notification settings, etc.
   */
  public event: T;

  /**
   * The schedule which generated this event.
   */
  public schedule: Schedule;

  /**
   * The span of time this event occurs. If this is an all day event this span
   * will start at the beginning of the day and end at the beginning of the
   * next day.
   *
   * @see [[Schedule.isFullDay]]
   */
  public time: DaySpan;

  /**
   * Whether this event is an all day event.
   *
   * @see [[Schedule.isFullDay]]
   */
  public fullDay: boolean;

  /**
   * Whether this event is the first day of an occurrence. A calendar can
   * generate multiple [[CalendarEvent]] instances over each day it covers if
   * [[Calendar.repeatCovers]] is true. These instances have matching
   * [[CalendarEvent.id]] values.
   */
  public starting: boolean;

  /**
   * Whether this event is the last day of an occurrence. A calendar can
   * generate multiple [[CalendarEvent]] instances over each day it covers if
   * [[Calendar.repeatCovers]] is true. These instances have matching
   * [[CalendarEvent.id]] values.
   */
  public ending: boolean;

  /**
   * The row this event is on in a visual calendar. An event can span multiple
   * days and it is desirable to have the occurrence on each day to line up.
   * This is only set when [[Calendar.updateRows]] is true or manually set.
   * This value makes sense for visual calendars for all day events or when the
   * visual calendar is not positioning events based on their time span.
   */
  public row: number = 0;

  /**
   * The column this event is on in a visual calendar. An event can have its
   * time overlap with another event displaying one of the events in another
   * column. This is only set when [[Calendar.updateColumns]] is true or
   * manually set. This value makes sense for visual calendars that are
   * displaying event occurrences at specific times positioned accordingly.
   */
  public col: number = 0;


  /**
   * Creates a new event instance given the id, the event paired with the
   * schedule, the schedule, the time span of the event, and the day on the
   * calendar the event belongs to.
   *
   * @param id The relatively unique identifier of this event.
   * @param event The event paired with the schedule.
   * @param schedule The schedule that generated this event.
   * @param time The time span of this event.
   * @param actualDay The day on the calendar this event is for.
   */
  public constructor(id: number, event: T, schedule: Schedule, time: DaySpan, actualDay: Day) {
    this.id = id;
    this.event = event;
    this.schedule = schedule;
    this.time = time;
    this.fullDay = schedule.isFullDay();
    this.starting = time.isPoint || time.start.sameDay( actualDay );
    this.ending = time.isPoint || time.end.relative(-1).sameDay( actualDay );
  }


  /**
   * The id of the schedule uniqe within the calendar which generated this event.
   */
  public get scheduleId(): number
  {
    return Math.floor( this.id / Constants.MAX_EVENTS_PER_DAY );
  }

}
