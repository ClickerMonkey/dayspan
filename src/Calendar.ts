
import { Functions as fn } from './Functions';
import { Day } from './Day';
import { DaySpan } from './DaySpan';
import { Schedule, ScheduleInput } from './Schedule';
import { Op } from './Op';
import { Units } from './Units';
import { Parse } from './Parse';
import { SortEvent } from './Sort';
import { Constants } from './Constants';
import { CalendarDay } from './CalendarDay';
import { CalendarEvent } from './CalendarEvent';


/**
 *
 */
export interface CalendarSchedule<T>
{
  schedule: Schedule;
  event: T;
}

/**
 *
 */
export type CalendarScheduleIdentifier<T> = CalendarSchedule<T> | Schedule | T;

/**
 *
 */
export type CalendarScheduleInput<T> = CalendarSchedule<T> | { schedule: ScheduleInput, event: T };

/**
 *
 */
export type CalendarMover = (day: Day, amount: number) => Day;

/**
 *
 */
export interface CalendarInput<T>
{
  /**
   * @see [[Calendar.fill]]
   */
  fill?: boolean;
  /**
   * @see [[Calendar.minimumSize]]
   */
  minimumSize?: number;
  /**
   * @see [[Calendar.repeatCovers]]
   */
  repeatCovers?: boolean;
  /**
   * @see [[Calendar.listTimes]]
   */
  listTimes?: boolean;
  /**
   * @see [[Calendar.eventsOutside]]
   */
  eventsOutside?: boolean;
  /**
   * @see [[Calendar.updateRows]]
   */
  updateRows?: boolean;
  /**
   * @see [[Calendar.updateColumns]]
   */
  updateColumns?: boolean;
  /**
   * @see [[Calendar.eventSorter]]
   */
  eventSorter?: SortEvent<T>;
  /**
   * @see [[Calendar.schedules]]
   */
  schedules?: CalendarSchedule<T>[];
}

/**
 *
 */
export class Calendar<T>
{

  /**
   *
   */
  public span: DaySpan;

  /**
   *
   */
  public filled: DaySpan;

  /**
   *
   */
  public length: number;

  /**
   *
   */
  public type: Units;

  /**
   *
   */
  public size: number;

  /**
   *
   */
  public moveStart: CalendarMover;

  /**
   *
   */
  public moveEnd: CalendarMover;


  /**
   *
   */
  public fill: boolean = false;

  /**
   *
   */
  public minimumSize: number = 0;

  /**
   *
   */
  public repeatCovers: boolean = true;

  /**
   *
   */
  public listTimes: boolean = false;

  /**
   *
   */
  public eventsOutside: boolean = false;

  /**
   *
   */
  public updateRows: boolean = false;

  /**
   *
   */
  public updateColumns: boolean = false;

  /**
   *
   */
  public eventSorter: SortEvent<T> = null;


  /**
   *
   */
  public selection: DaySpan = null;

  /**
   *
   */
  public days: CalendarDay<T>[] = [];

  /**
   *
   */
  public schedules: CalendarSchedule<T>[] = [];


  /**
   *
   */
  public constructor(start: Day, end: Day, type: Units, size: number, moveStart: CalendarMover, moveEnd: CalendarMover, input?: CalendarInput<T>)
  {
    this.span = new DaySpan(start, end);
    this.filled = new DaySpan(start, end);
    this.type = type;
    this.size = size;
    this.moveStart = moveStart;
    this.moveEnd = moveEnd;

    if (fn.isDefined(input))
    {
      this.withInput(input, false);
    }

    this.refresh();
  }

  /**
   *
   */
  public withInput(input: CalendarInput<T>, refresh: boolean = true): this
  {
    this.fill = fn.coalesce( input.fill, this.fill );
    this.minimumSize = fn.coalesce( input.minimumSize, this.minimumSize );
    this.repeatCovers = fn.coalesce( input.repeatCovers, this.repeatCovers );
    this.listTimes = fn.coalesce( input.listTimes, this.listTimes );
    this.eventsOutside = fn.coalesce( input.eventsOutside, this.eventsOutside );
    this.updateRows = fn.coalesce( input.updateRows, this.updateRows );
    this.updateColumns = fn.coalesce( input.updateColumns, this.updateColumns );
    this.eventSorter = fn.coalesce( input.eventSorter, this.eventSorter );

    if (fn.isArray(input.schedules))
    {
      this.removeSchedules();
      this.addSchedules(input.schedules, false, true);
    }

    if (refresh)
    {
      this.refresh();
    }

    return this;
  }

  /**
   *
   */
  public withMinimumSize(minimumSize: number): this
  {
    this.minimumSize = minimumSize;
    this.refresh();

    return this;
  }

  /**
   *
   */
  public withRepeatCovers(repeatCovers: boolean): this
  {
    this.repeatCovers = repeatCovers;
    this.refreshEvents();

    return this;
  }

  /**
   *
   */
  public withListTimes(listTimes: boolean): this
  {
    this.listTimes = listTimes;
    this.refreshEvents();

    return this;
  }

  /**
   *
   */
  public withEventsOutside(eventsOutside: boolean): this
  {
    this.eventsOutside = eventsOutside;
    this.refreshEvents();

    return this;
  }

  /**
   *
   */
  public withUpdateRows(updateRows: boolean, refresh: boolean = true): this
  {
    this.updateRows = updateRows;

    if (refresh && updateRows)
    {
      this.refreshRows();
    }

    return this;
  }

  /**
   *
   */
  public withUpdateColumns(updateColumns: boolean, refresh: boolean = true): this
  {
    this.updateColumns = updateColumns;

    if (refresh && updateColumns)
    {
      this.refreshColumns();
    }

    return this;
  }

  /**
   *
   */
  public get start(): Day
  {
    return this.span.start;
  }

  /**
   *
   */
  public set start(day: Day)
  {
    this.span.start = day;
  }

  /**
   *
   */
  public get end(): Day
  {
    return this.span.end;
  }

  /**
   *
   */
  public set end(day: Day)
  {
    this.span.end = day;
  }

  /**
   *
   */
  public summary(dayOfWeek: boolean = true, short: boolean = false, repeat: boolean = false, contextual: boolean = true, delimiter: string = ' - '): string
  {
    return this.span.summary( this.type, dayOfWeek, short, repeat, contextual, delimiter );
  }

  /**
   *
   */
  public split(by: number = 1): Calendar<T>[]
  {
    let split: Calendar<T>[] = [];
    let start: Day = this.start;
    let end: Day = this.moveEnd( this.end, by - this.size );

    for (let i = 0; i < this.size; i++)
    {
      split.push(new Calendar<T>(start, end, this.type, by, this.moveStart, this.moveEnd, this));
      start = this.moveStart( start, by );
      end = this.moveEnd( end, by );
    }

    return split;
  }

  /**
   *
   */
  public refresh(today: Day = Day.today()): this
  {
    this.length = this.span.days(Op.UP, true);
    this.resetDays();
    this.refreshCurrent(today);
    this.refreshSelection();
    this.refreshEvents();

    return this;
  }

  /**
   *
   */
  public resetFilled(): this
  {
    this.filled.start = this.fill ? this.start.startOfWeek() : this.start;
    this.filled.end = this.fill ? this.end.endOfWeek() : this.end;

    return this;
  }

  /**
   *
   */
  public resetDays(): this
  {
    this.resetFilled();

    let days: CalendarDay<T>[] = this.days;
    let filled: DaySpan = this.filled;
    let current: Day = filled.start;
    let daysBetween: number = filled.days(Op.UP);
    let total: number = Math.max( this.minimumSize, daysBetween );

    for (let i = 0; i < total; i++)
    {
      let day: CalendarDay<T> = days[ i ];

      if (!day || !day.sameDay( current ))
      {
        day = new CalendarDay<T>( current.date );

        if (i < days.length)
        {
          days.splice( i, 1, day );
        }
        else
        {
          days.push( day );
        }
      }

      day.inCalendar = this.span.contains( day );

      current = current.next();
    }

    if (days.length > total)
    {
      days.splice( total, days.length - total );
    }

    return this;
  }

  /**
   *
   */
  public refreshCurrent(today: Day = Day.today()): this
  {
    return this.iterateDays(d =>
    {
      d.updateCurrent(today);
    });
  }

  /**
   *
   */
  public refreshSelection(): this
  {
    return this.iterateDays(d =>
    {
      if (this.selection)
      {
        d.updateSelected( this.selection );
      }
      else
      {
        d.clearSelected();
      }
    });
  }

  /**
   *
   */
  public refreshEvents(): this
  {
    this.iterateDays(d =>
    {
      if (d.inCalendar || this.eventsOutside)
      {
        d.events = this.eventsForDay(d, this.listTimes, this.repeatCovers);

        if (this.eventSorter)
        {
          d.events.sort( this.eventSorter );
        }
      }
    });

    if (this.updateRows)
    {
      this.refreshRows();
    }

    if (this.updateColumns)
    {
      this.refreshColumns();
    }

    return this;
  }

  /**
   *
   */
  public refreshRows(): this
  {
    type EventToRowMap = { [id: number]: number };
    type UsedMap = { [row: number]: boolean };

    let eventToRow: EventToRowMap = {};
    let onlyFullDay: boolean = this.listTimes;

    this.iterateDays(d =>
    {
      if (d.dayOfWeek === 0)
      {
        eventToRow = {};
      }

      let used: UsedMap = {};

      for (let event of d.events)
      {
        if (onlyFullDay && !event.fullDay)
        {
          continue;
        }

        if (event.id in eventToRow)
        {
          used[ event.row = eventToRow[ event.id ] ] = true;
        }
      }

      let rowIndex: number = 0;

      for (let event of d.events)
      {
        if ((onlyFullDay && !event.fullDay) || event.id in eventToRow)
        {
          continue;
        }

        while (used[ rowIndex ])
        {
          rowIndex++;
        }

        eventToRow[ event.id ] = event.row = rowIndex;

        rowIndex++;
      }
    });

    return this;
  }

  /**
   *
   */
  public refreshColumns(): this
  {
    interface Marker {
      time: number,
      event: CalendarEvent<T>,
      start: boolean,
      parent: Marker;
    }

    this.iterateDays(d =>
    {
      let markers: Marker[] = [];

      for (let event of d.events)
      {
        if (!event.fullDay)
        {
          markers.push({
            time: event.time.start.time,
            event: event,
            start: true,
            parent: null
          });

          markers.push({
            time: event.time.end.time - 1,
            event: event,
            start: false,
            parent: null
          });
        }
      }

      markers.sort((a, b) =>
      {
        return a.time - b.time;
      });

      let parent = null;

      for (let marker of markers)
      {
        if (marker.start)
        {
          marker.parent = parent;
          parent = marker;
        }
        else if (parent)
        {
          parent = parent.parent;
        }
      }

      for (let marker of markers)
      {
        if (marker.start)
        {
          marker.event.col = marker.parent ? marker.parent.event.col + 1 : 0;
        }
      }
    });

    return this;
  }

  /**
   *
   */
  public iterateDays(iterator: (day: CalendarDay<T>) => any): this
  {
    let days: CalendarDay<T>[] = this.days;

    for (let i = 0; i < days.length; i++)
    {
      iterator( days[ i ] );
    }

    return this;
  }

  /**
   *
   */
  public eventsForDay(day: Day, getTimes: boolean = true, covers: boolean = true): CalendarEvent<T>[]
  {
    let events: CalendarEvent<T>[] = [];
    let entries: CalendarSchedule<T>[] = this.schedules;

    for (let entryIndex = 0; entryIndex < entries.length; entryIndex++)
    {
      let entry: CalendarSchedule<T> = entries[ entryIndex ];
      let schedule: Schedule = entry.schedule;
      let event: T = entry.event;
      let eventId: number = entryIndex * Constants.MAX_EVENTS_PER_DAY;

      if ((covers && schedule.coversDay(day)) || (!covers && schedule.matchesDay(day)))
      {
        if (getTimes)
        {
          let times: DaySpan[] = covers ?
            entry.schedule.getSpansOver(day) :
            entry.schedule.getSpansOn(day);

          for (let timeIndex = 0; timeIndex < times.length; timeIndex++)
          {
            events.push(new CalendarEvent<T>(eventId + timeIndex, event, schedule, times[ timeIndex ], day));
          }
        }
        else
        {
          let over: DaySpan = schedule.getSpanOver(day);

          if (over)
          {
            events.push(new CalendarEvent<T>(eventId, event, schedule, over, day));
          }
        }
      }
    }

    return events
  }

  /**
   *
   */
  public findSchedule(input: CalendarScheduleIdentifier<T>): CalendarSchedule<T>
  {
    for (let schedule of this.schedules)
    {
      if (schedule === input || schedule.schedule === input || schedule.event === input)
      {
        return schedule;
      }
    }

    return null;
  }

  /**
   *
   */
  public removeSchedules(schedules: CalendarScheduleIdentifier<T>[] = null, delayRefresh: boolean = false): this
  {
    if (schedules)
    {
      for (let schedule of schedules)
      {
        this.removeSchedule( schedule, true );
      }
    }
    else
    {
      this.schedules = [];
    }

    if (!delayRefresh)
    {
      this.refreshEvents();
    }
    return this;
  }

  /**
   *
   */
  public removeSchedule(schedule: CalendarScheduleIdentifier<T>, delayRefresh: boolean = false): this
  {
    let found = this.findSchedule(schedule);

    if (found)
    {
      this.schedules.splice( this.schedules.indexOf(found), 1 );

      if (!delayRefresh)
      {
        this.refreshEvents();
      }
    }
    return this;
  }

  /**
   *
   */
  public addSchedule(schedule: CalendarScheduleInput<T>, allowDuplicates: boolean = false, delayRefresh: boolean = false): this
  {
    let parsed = Parse.calendarSchedule(schedule);

    if (!allowDuplicates)
    {
      let existing = this.findSchedule(parsed);

      if (existing)
      {
        return this;
      }
    }

    this.schedules.push(parsed);

    if (!delayRefresh)
    {
      this.refreshEvents();
    }

    return this;
  }

  /**
   *
   */
  public addSchedules(schedules: CalendarScheduleInput<T>[], allowDuplicates: boolean = false, delayRefresh: boolean = false): this
  {
    for (let schedule of schedules)
    {
      this.addSchedule(schedule, allowDuplicates, true);
    }

    if (!delayRefresh)
    {
      this.refreshEvents();
    }

    return this;
  }

  /**
   *
   */
  public select(start: Day, end?: Day): this
  {
    this.selection = end ? new DaySpan( start, end ) : DaySpan.point( start );
    this.refreshSelection();

    return this;
  }

  /**
   *
   */
  public unselect(): this
  {
    this.selection = null;
    this.refreshSelection();

    return this;
  }

  /**
   *
   */
  public move(jump: number = this.size): this
  {
    this.start = this.moveStart( this.start, jump );
    this.end = this.moveEnd( this.end, jump );
    this.refresh();

    return this;
  }

  /**
   *
   */
  public next(jump: number = this.size): this
  {
    return this.move( jump );
  }

  /**
   *
   */
  public prev(jump: number = this.size): this
  {
    return this.move( -jump );
  }


  /**
   *
   */
  public static days<T>(days: number = 1, around: Day = Day.today(), focus: number = 0.4999, input?: CalendarInput<T>): Calendar<T>
  {
    let start: Day = around.start().relativeDays( -Math.floor( days * focus ) );
    let end: Day = start.relativeDays( days - 1 ).end();
    let mover: CalendarMover = (day, amount) => day.relativeDays(amount);

    return new Calendar(start, end, Units.DAY, days, mover, mover, input);
  }

  /**
   *
   */
  public static weeks<T>(weeks: number = 1, around: Day = Day.today(), focus: number = 0.4999, input?: CalendarInput<T>): Calendar<T>
  {
    let start: Day = around.start().startOfWeek().relativeWeeks( -Math.floor( weeks * focus ) );
    let end: Day = start.relativeWeeks( weeks - 1 ).endOfWeek();
    let mover: CalendarMover = (day, amount) => day.relativeWeeks(amount);

    return new Calendar(start, end, Units.WEEK, weeks, mover, mover, input);
  }

  /**
   *
   */
  public static months<T>(months: number = 1, around: Day = Day.today(), focus: number = 0.4999, input: CalendarInput<T> = {fill: true}): Calendar<T>
  {
    let start: Day = around.start().startOfMonth().relativeMonths( -Math.floor( months * focus ) );
    let end: Day = start.relativeMonths( months - 1 ).endOfMonth();
    let moveStart: CalendarMover = (day, amount) => day.relativeMonths(amount);
    let moveEnd: CalendarMover = (day, amount) => day.startOfMonth().relativeMonths(amount).endOfMonth();

    return new Calendar(start, end, Units.MONTH, months, moveStart, moveEnd, input);
  }

  /**
   *
   */
  public static years<T>(years: number = 1, around: Day = Day.today(), focus: number = 0.4999, input: CalendarInput<T> = {fill: true}): Calendar<T>
  {
    let start: Day = around.start().startOfYear().relativeYears( -Math.floor( years * focus ) );
    let end: Day = start.relativeYears( years - 1 ).endOfYear();
    let mover: CalendarMover = (day, amount) => day.relativeYears(amount);

    return new Calendar(start, end, Units.YEAR, years, mover, mover, input);
  }

}
