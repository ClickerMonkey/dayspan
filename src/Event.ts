
import { Schedule, ScheduleInput } from './Schedule';

/**
 * The input which can be passed to the calendar when adding a schedule and event.
 *
 * @typeparam T The type of data stored in the [[Event]] class.
 * @typeparam M The type of metadata stored in the schedule.
 */
export interface EventInput<T, M>
{
  id?: any;
  data?: T;
  schedule: ScheduleInput<M> | Schedule<M>;
}

/**
 * A pairing of a user specified event object and the schedule which defines
 * when it occurs on a calendar.
 *
 * @typeparam T The type of data stored in the [[Event]] class.
 * @typeparam M The type of metadata stored in the schedule.
 */
export class Event<T, M>
{

  /**
   * User specified ID which can be used to find or remove this event from a
   * Calendar.
   */
  public id: any;

  /**
   * User specified object which describes this event.
   */
  public data: T;

  /**
   * The schedule which defines when this event occurs.
   */
  public schedule: Schedule<M>;

  /**
   * If the event is visible on the calendar.
   */
  public visible: boolean;

  /**
   * Creates a new event.
   *
   * @param schedule The schedule which defines when the event occurs.
   * @param data User specified object which describes this event.
   * @param id User specified ID which identifies this event.
   */
  public constructor(schedule: Schedule<M>, data?: T, id?: any, visible: boolean = true)
  {
    this.schedule = schedule;
    this.data = data;
    this.id = id;
    this.visible = visible;
  }

}
