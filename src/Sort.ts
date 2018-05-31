
import { CalendarEvent } from './CalendarEvent';



export type SortEvent<T> = (a: CalendarEvent<T>, b: CalendarEvent<T>) => number;

// Sorts.List( Sorts.FullDay, Sorts.Desc( Sorts.Start ) );
export class Sorts
{

  public static Start<T>(a: CalendarEvent<T>, b: CalendarEvent<T>): number
  {
    return a.time.start.time - b.time.start.time;
  }

  public static End<T>(a: CalendarEvent<T>, b: CalendarEvent<T>): number
  {
    return a.time.end.time - b.time.end.time;
  }

  public static FullDay<T>(a: CalendarEvent<T>, b: CalendarEvent<T>): number
  {
    let af: number = a.fullDay ? 0 : 1;
    let bf: number = b.fullDay ? 0 : 1;

    return af - bf;
  }

  public static Duration<T>(a: CalendarEvent<T>, b: CalendarEvent<T>): number
  {
    return a.time.millis() - b.time.millis();
  }

  public static Desc<T>(sorter: SortEvent<T>): SortEvent<T>
  {
    return (a, b) =>
    {
      return sorter( b, a );
    };
  }

  public static Alphabetical<T>(getString: (event: T) => string): SortEvent<T>
  {
    return (a, b) =>
    {
      let as: string = getString( a.event ) || '';
      let bs: string = getString( b.event ) || '';

      return as.localeCompare( bs );
    };
  }

  public static Ordered<T>(getOrder: (event: T) => number): SortEvent<T>
  {
    return (a, b) =>
    {
      let ao: number = getOrder( a.event );
      let bo: number = getOrder( b.event );

      return ao - bo;
    };
  }

  public static List<T>(list: SortEvent<T>[]): SortEvent<T>
  {
    return (a, b) =>
    {
      for (let sorter of list)
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
