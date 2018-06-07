
import { CalendarEvent } from './CalendarEvent';
import { Event } from './Event';


/**
 * A function which takes two [[CalendarEvent]]s and returns a number which
 * instructs a sort which event goes before the other in a list.
 *
 * @param a The first event.
 * @param b The second event.
 * @returns When both events are considered equal `0` is returned, when the
 *    first event should go before the second event a negative number is
 *    returned, when the second event should go before the first event a
 *    positive number is returned.
 */
export type SortEvent<T, M> = (a: CalendarEvent<T, M>, b: CalendarEvent<T, M>) => number;

/**
 * A class with [[SortEvent]] functions and functions which accept other
 * [[SortEvent]]s and return a new [[SortEvent]].
 *
 * ```typescript
 * // Sorts full day events first, then events in descending order based on start time.
 * Sorts.List([Sorts.FullDay, Sorts.Desc(Sorts.Start)]);
 * ```
 */
export class Sorts
{

  /**
   * Sorts the two events by their start time - the earliest event being first
   * in order.
   *
   * @param a The first event.
   * @param b The second event.
   * @returns The difference in time between the start of `a` and `b`.
   * @see [[CalendarEvent.time]]
   */
  public static Start<T, M>(a: CalendarEvent<T, M>, b: CalendarEvent<T, M>): number
  {
    return a.time.start.time - b.time.start.time;
  }

  /**
   * Sorts the two events by their end time - the earliest to end being first
   * in order.
   *
   * @param a The first event.
   * @param b The second event.
   * @returns The difference in time between the end of `a` and `b`.
   * @see [[CalendarEvent.time]]
   */
  public static End<T, M>(a: CalendarEvent<T, M>, b: CalendarEvent<T, M>): number
  {
    return a.time.end.time - b.time.end.time;
  }

  /**
   * Sorts the two events placing the full day events before the timed events.
   *
   * @param a The first event.
   * @param b The second event.
   * @returns If both are timed or both are full day then `0` is returned,
   *    otherwise `-1` is returned if `a` is full day and `1` is returned if
   *    `b` is full day.
   * @see [[CalendarEvent.fullDay]]
   */
  public static FullDay<T, M>(a: CalendarEvent<T, M>, b: CalendarEvent<T, M>): number
  {
    let af: number = a.fullDay ? 0 : 1;
    let bf: number = b.fullDay ? 0 : 1;

    return af - bf;
  }

  /**
   * Sorts the two events placing the shorter events before the longer events.
   * Full day or multiple day events actually take up a day and will be ordered
   * last.
   *
   * @param a The first event.
   * @param b The second event.
   * @returns The difference in milliseconds between `a` and `b`.
   * @see [[CalendarEvent.time]]
   * @see [[DaySpan.millis]]
   */
  public static Duration<T, M>(a: CalendarEvent<T, M>, b: CalendarEvent<T, M>): number
  {
    return a.time.millis() - b.time.millis();
  }

  /**
   * Returns a [[SortEvent]] that effectively orders the given sorter in the
   * opposite (often descending) order.
   *
   * @param sorter The sorter to reverse.
   * @returns A new sorter which reverses the one passed in.
   */
  public static Desc<T, M>(sorter: SortEvent<T, M>): SortEvent<T, M>
  {
    return (a, b) =>
    {
      return sorter( b, a );
    };
  }

  /**
   * Returns a [[SortEvent]] that orders the events based on a string in each
   * event. A function must be supplied which takes an event of type `T` and
   * returns a string.
   *
   * @param getString A function which returns a string from the event.
   * @returns A sorter which sorts strings alphabetically.
   */
  public static Alphabetical<T, M>(getString: (event: Event<T, M>) => string): SortEvent<T, M>
  {
    return (a, b) =>
    {
      let as: string = getString( a.event ) || '';
      let bs: string = getString( b.event ) || '';

      return as.localeCompare( bs );
    };
  }

  /**
   * Returns a [[SortEvent]] that orders events based on a number in each event.
   * A function must be supplied which takes an event of type `T` and returns
   * a number.
   *
   * @param getOrder A function which returns a number from the event.
   * @returns A sorter which sorts events based on a number in ascending order.
   */
  public static Ordered<T, M>(getOrder: (event: Event<T, M>) => number): SortEvent<T, M>
  {
    return (a, b) =>
    {
      let ao: number = getOrder( a.event );
      let bo: number = getOrder( b.event );

      return ao - bo;
    };
  }

  /**
   * Returns a [[SortEvent]] that orders events based on an array of sorters.
   * The first sorter which returns a non-zero result is used.
   *
   * @param sorters A list of sorting functions to test one at a time.
   * @returns A sorter which sorts based on a list of sorters.
   */
  public static List<T, M>(sorters: SortEvent<T, M>[]): SortEvent<T, M>
  {
    return (a, b) =>
    {
      for (let sorter of sorters)
      {
        let compare: number = sorter(a, b);

        if (compare !== 0)
        {
          return compare;
        }
      }

      return 0;
    };
  }

}
