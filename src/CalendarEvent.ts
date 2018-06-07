
import { Constants } from './Constants';
import { Day } from './Day';
import { DaySpan } from './DaySpan';
import { Event } from './Event';
import { Identifier, IdentifierInput } from './Identifier';
import { Schedule } from './Schedule';


/**
 * The calculated bounds of a calendar event on a calendar.
 */
export interface CalendarEventBounds
{

  /**
   * The top of the event within the rectangle of the day.
   */
  top: number;

  /**
   * The bottom of the event within the rectangle of the day.
   */
  bottom: number;

  /**
   * The height of the event within the rectangle of the day. This is equivalent
   * by `bottom - top`.
   */
  height: number;

  /**
   * The left of the event within the rectangle of the day.
   */
  left: number;

  /**
   * The right of the event within the rectangle of the day.
   */
  right: number;

  /**
   * The width of the event within the rectangle of the day. This is equivalent
   * by `right - left`.
   */
  width: number;
}

/**
 * An event on a given day and the schedule that generated the event.
 *
 * @typeparam T The type of data stored in the [[Event]] class.
 * @typeparam M The type of metadata stored in the schedule and in this class.
 */
export class CalendarEvent<T, M>
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
   * The event with the schedule.
   */
  public event: Event<T, M>;

  /**
   * Any metadata specified for this event instance in the schedule.
   */
  public meta: M;

  /**
   * The day this event occurs on.
   */
  public day: Day;

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
   * Whether this event instance was marked as cancelled in the schedule.
   */
  public cancelled: boolean;

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
   * @param event The event which created this instance.
   * @param time The time span of this event.
   * @param actualDay The day on the calendar this event is for.
   */
  public constructor(id: number, event: Event<T, M>, time: DaySpan, actualDay: Day)
  {
    this.id = id;
    this.event = event;
    this.time = time;
    this.day = actualDay;
    this.fullDay = event.schedule.isFullDay();
    this.meta = event.schedule.getMeta( time.start );
    this.cancelled = event.schedule.isCancelled( time.start );
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

  /**
   * The start timestamp of the event.
   */
  public get start(): Day
  {
    return this.time.start;
  }

  /**
   * The end timestamp of the event.
   */
  public get end(): Day
  {
    return this.time.end;
  }

  /**
   * The schedule which generated this event.
   */
  public get schedule(): Schedule<M>
  {
    return this.event.schedule;
  }

  /**
   * The related event data.
   */
  public get data(): T
  {
    return this.event.data;
  }

  /**
   * An [[IdentifierInput]] for the start of this event.
   */
  public get identifier(): IdentifierInput
  {
    return this.identifierType.get( this.start );
  }

  /**
   * The [[Identifier]] for this event. Either [[Identifier.Day]] or
   * [[Identifier.Time]].
   */
  public get identifierType(): Identifier
  {
    return this.fullDay ? Identifier.Day : Identifier.Time;
  }

  /**
   * Returns a delta value between 0 and 1 which represents where the
   * [[Calendar.start]] is relative to [[Calendar.day]]. The delta value would
   * be less than 0 if the start of the event is before [[Calendar.day]].
   */
  public get startDelta(): number
  {
    return (this.start.time - this.day.time) / Constants.MILLIS_IN_DAY;
  }

  /**
   * Returns a delta value between 0 and 1 which represents where the
   * [[Calendar.end]] is relative to [[Calendar.day]]. The delta value would
   * be greater than 1 if the end of the event is after [[Calendar.day]].
   */
  public get endDelta(): number
  {
    return (this.end.time - this.day.time) / Constants.MILLIS_IN_DAY;
  }

  /**
   * Calculates the bounds for this event if it were placed in a rectangle which
   * represents a day (24 hour period). By default the returned values are
   * between 0 and 1 and can be scaled by the proper rectangle dimensions or the
   * rectangle dimensions can be passed to this function.
   *
   * @param dayHeight The height of the rectangle of the day.
   * @param dayWidth The width of the rectangle of the day.
   * @param columnOffset The offset in the rectangle of the day to adjust this
   *    event by if it intersects or is contained in a previous event. This also
   *    reduces the width of the returned bounds to keep the bounds in the
   *    rectangle of the day.
   * @param clip `true` if the bounds should stay in the day rectangle, `false`
   *    and the bounds may go outside the rectangle of the day for multi-day
   *    events.
   * @param offsetX How much to translate the left & right properties by.
   * @param offsetY How much to translate the top & bottom properties by.
   * @returns The calculated bounds for this event.
   */
  public getTimeBounds(dayHeight: number = 1, dayWidth: number = 1, columnOffset: number = 0.1, clip: boolean = true, offsetX: number = 0, offsetY: number = 0): CalendarEventBounds
  {
    let startRaw: number = this.startDelta;
    let endRaw: number = this.endDelta;

    let start: number = clip ? Math.max(0, startRaw) : startRaw;
    let end: number = clip ? Math.min(1, endRaw) : endRaw;

    let left: number = this.col * columnOffset;
    let right: number = dayWidth - left;

    let top: number = start * dayHeight;
    let bottom: number = end * dayHeight;

    return {
      top: top + offsetY,
      bottom: bottom + offsetY,
      height: bottom - top,
      left: left + offsetX,
      right: right + offsetX,
      width: right
    };
  }

  /**
   * Changes the cancellation status of this event. By default this cancels
   * this event - but `false` may be passed to undo a cancellation.
   *
   * @param cancelled Whether the event should be cancelled.
   */
  public cancel(cancelled: boolean = true): this
  {
    this.schedule.cancel.set( this.start, cancelled, this.identifierType );
    this.cancelled = cancelled;

    return this;
  }

  /**
   * Changes the exclusion status of this event. By default this excludes this
   * event - but `false`  may be passed to undo an exclusion.
   *
   * @param excluded Whether the event should be excluded.
   */
  public exclude(excluded: boolean = true): this
  {
    this.schedule.exclude.set( this.start, excluded, this.identifierType );

    return this;
  }

  /**
   * Moves this event to potentially another day and time. A move is
   * accomplished by excluding the current event and adding an inclusion of the
   * new day & time. Any [[CalendarEvent.meta]] on this event will be moved to
   * the new event.
   *
   * @param toTime The timestamp to move this event to.
   */
  public move(toTime: Day): this
  {
    let schedule: Schedule<M> = this.schedule;
    let type: Identifier = this.identifierType;
    let fromTime: Day = this.start;

    schedule.exclude.set( fromTime, true, type );
    schedule.include.set( toTime, true, type );

    if (this.meta !== null)
    {
      schedule.meta.unset( fromTime, type );
      schedule.meta.set( toTime, this.meta, type );
    }

    return this;
  }

}
