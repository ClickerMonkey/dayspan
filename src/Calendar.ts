
import { Iterate, IterateAction } from 'iteratez';

import { CalendarDay } from './CalendarDay';
import { CalendarEvent } from './CalendarEvent';
import { Constants } from './Constants';
import { Day, DayInput } from './Day';
import { DaySpan } from './DaySpan';
import { Event, EventInput } from './Event';
import { Functions as fn } from './Functions';
import { Op } from './Operation';
import { Parse } from './Parse';
import { Schedule } from './Schedule';
import { SortEvent } from './Sort';
import { Units } from './Units';



/**
 * A function which moves a given day by some amount and some unit. This is
 * used to shift a calendar's frame via [[Calendar.next]] and [[Calendar.prev]].
 *
 * @param day The day to move.
 * @param amount The amount to move the day by.
 * @returns A new day instance moved by the given amount.
 */
export type CalendarMover = (day: Day, amount: number) => Day;

/**
 * A definition for a given [[Units]] which informs a calendar how to setup the
 * [[Calendar.span]] and how to move with [[Calendar.move]].
 */
export interface CalendarTypeDefinition
{
  getStart(around: Day, size: number, focus: number): Day;
  getEnd(start: Day, size: number, focus: number): Day;
  moveStart(day: Day, amount: number): Day;
  moveEnd(day: Day, amount: number): Day;
  defaultInput: any
}

/**
 * A map of [[CalendarTypeDefinition]] keyed by the [[Units]].
 */
export type CalendarTypeDefinitionMap = { [unit: number]: CalendarTypeDefinition };

/**
 * Input used to initialize or mass change the properties of a [[Calendar]].
 *
 * @typeparam T The type of data stored in the [[Event]] class.
 * @typeparam M The type of metadata stored in the schedule.
 */
export interface CalendarInput<T, M>
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
  eventSorter?: SortEvent<T, M>;
  /**
   * @see [[Calendar.events]]
   */
  events?: EventInput<T, M>[];
  /**
   * @see [[Calendar.type]]
   */
  type?: Units;
  /**
   * @see [[Calendar.size]]
   */
  size?: number; // 1
  /**
   * @see [[Calendar.parseMeta]]
   */
  parseMeta?(input: any): M;
  /**
   * @see [[Calendar.parseData]]
   */
  parseData?(input: any): T;
  /**
   * When morphing a calendar to a fewer number of days, do we want to keep
   * today in the calendar if it is already in the calendar?
   */
  preferToday?: boolean; // true
  /**
   * What day should the calendar be based around (contain)?
   */
  around?: DayInput; // null
  /**
   * When morphing a calendar and `preferToday` is false OR today is not in the
   * calendar AND `around` is not specified, we will pick a day at this number
   * in the current calendar (a value between 0 and 1 signifying the start and
   * and of the current calendar).
   */
  otherwiseFocus?: number; // 0.499999
  /**
   * When morphing or creating passing a value of `true` will avoid calling
   * [[Calendar.refresh]] as is typically done right after each of those
   * functions.
   */
  delayRefresh?: boolean; // false
}

/**
 * A collection of [[CalendarDay]]s, the events on the calendar, and all
 * [[CalendarEvent]]s generated based on the events.
 *
 * @typeparam T The type of data stored in the [[Event]] class.
 * @typeparam M The type of metadata stored in the schedule.
 */
export class Calendar<T, M>
{

  public static readonly DEFAULT_FOCUS = 0.4999;

  /**
   * The span of days in the calendar.
   */
  public span: DaySpan;

  /**
   * The full span of days represented on the calendar. This may be different
   * than the [[Calendar.span]] when [[Calendar.fill]] is `true` and the
   * calendar is representing months or years and the days need to start on
   * Sunday and end on Saturday.
   */
  public filled: DaySpan;

  /**
   * The number of days in the calendar specified by [[Calendar.span]].
   */
  public length: number;

  /**
   * The type of calendar.
   */
  public type: Units;

  /**
   * The size of the calendar. When the calendar type is...
   *
   * - [[Units.DAY]]: The number of days in the calendar.
   * - [[Units.WEEK]]: The number of weeks in the calendar.
   * - [[Units.MONTH]]: The number of months in the calendar.
   * - [[Units.YEAR]]: The number of years in the calendar.
   */
  public size: number;

  /**
   * The function used to move the start day of the calendar when functions like
   * [[Calendar.next]] or [[Calendar.prev]] are called.
   */
  public moveStart: CalendarMover;

  /**
   * The function used to move the end day of the calendar when functions like
   * [[Calendar.next]] or [[Calendar.prev]] are called.
   */
  public moveEnd: CalendarMover;


  /**
   * If the calendar should be filled in so the first day of the calendar is
   * Sunday and the last day is Saturday.
   */
  public fill: boolean = false;

  /**
   * The minimum number of days in the calendar no matter what the type or size
   * is. This can be used to display a month with a constant number of weeks -
   * because not all months contain the same number of weeks.
   */
  public minimumSize: number = 0;

  /**
   * When `true` a [[CalendarEvent]] instance exists on each [[CalendarDay]]
   * the event covers even if the event didn't start on that day.
   */
  public repeatCovers: boolean = true;

  /**
   * When `true` an event instance will be created for each time specified on
   * the schedule. If the schedule specifies an all day event then only one
   * event is added to a day. This is typically done when displaying days or
   * weeks and events can be displayed on a timeline.
   */
  public listTimes: boolean = false;

  /**
   * When `true` events will be added to days "outside" the calendar. Days
   * outside the calendar are days filled in when [[Calendar.fill]] is `true`.
   * More specifically days that are in [[Calendar.filled]] and not in
   * [[Calendar.span]].
   */
  public eventsOutside: boolean = false;

  /**
   * When `true` [[CalendarEvent.row]] will be set so when visually displaying
   * the event with others multi-day events will align and not overlap.
   */
  public updateRows: boolean = false;

  /**
   * When `true` [[CalendarEvent.col]] will be set so when visually displaying
   * the event based on start and end time any events that overlap with each
   * other will be "indented" to see the event below it.
   */
  public updateColumns: boolean = false;

  /**
   * The function (if any) which sorts the events on a calendar day.
   */
  public eventSorter: SortEvent<T, M> = null;

  /**
   * A function to use when parsing meta input into the desired type.
   *
   * @param input The input to parse.
   * @returns The meta parsed from the given input, if any.
   */
  public parseMeta: (input: any) => M = (x => x);

  /**
   * A function to use when parsing meta input into the desired type.
   *
   * @param input The input to parse.
   * @returns The meta parsed from the given input, if any.
   */
  public parseData: (input: any) => T = (x => x);

  /**
   * A selection of days on the calendar. If no days are selected this is `null`.
   * This is merely used to keep the selection flags in [[CalendarDay]] updated
   * via [[Calendar.refreshSelection]].
   */
  public selection: DaySpan = null;

  /**
   * The array of days in this calendar and their events.
   */
  public days: CalendarDay<T, M>[] = [];

  /**
   * The array of scheduled events added to the calendar.
   */
  public events: Event<T, M>[] = [];

  /**
   * The array of visible events on the calendar. This is built based on the
   * span of the schedule in the given event and also the [[Event.visible]] flag.
   */
  public visible: Event<T, M>[] = [];


  /**
   * Creates a new calendar given a span, type, size, moving functions, and
   * optionally some default properties for the calendar.
   *
   * @param start The first day on the calendar.
   * @param end The last day on the calendar.
   * @param type The calendar type used for describing the calendar and splitting it.
   * @param size The number of calendar types in this calendar.
   * @param moveStart The function to move the start day.
   * @param moveEnd The function to move the end by.
   * @param input The default properties for this calendar.
   * @see [[Calendar.start]]
   * @see [[Calendar.end]]
   * @see [[Calendar.type]]
   * @see [[Calendar.size]]
   * @see [[Calendar.moveStart]]
   * @see [[Calendar.moveEnd]]
   */
  public constructor(start: Day, end: Day, type: Units, size: number, moveStart: CalendarMover, moveEnd: CalendarMover, input?: CalendarInput<T, M>)
  {
    this.span = new DaySpan(start, end);
    this.filled = new DaySpan(start, end);
    this.type = type;
    this.size = size;
    this.moveStart = moveStart;
    this.moveEnd = moveEnd;

    if (fn.isDefined(input))
    {
      this.set( input );
    }
    else
    {
      this.refresh();
    }
  }

  /**
   * Changes the calendar possibly morphing it to a different type or size if
   * specified in the given input. If the type and size are not morphed then
   * the following properties may be updated:
   *
   * - [[Calendar.fill]]
   * - [[Calendar.minimumSize]]
   * - [[Calendar.repeatCovers]]
   * - [[Calendar.listTimes]]
   * - [[Calendar.eventsOutside]]
   * - [[Calendar.updateRows]]
   * - [[Calendar.updateColumns]]
   * - [[Calendar.eventSorter]]
   * - [[Calendar.events]]
   * - [[Calendar.parseData]]
   * - [[Calendar.parseMeta]]
   *
   * If [[CalendarInput.delayRefresh]] is not given with `true` then
   * [[Calendar.refresh]] will be called once the calendar properties have been
   * updated.
   *
   * @param input The new properties for this calendar to overwrite with.
   */
  public set(input: CalendarInput<T, M>): this
  {
    type CTD = CalendarTypeDefinition;

    const typeChange: boolean = fn.isDefined(input.type) && input.type !== this.type;
    const sizeChange: boolean = fn.isDefined(input.size) && input.size !== this.size;

    if (typeChange || sizeChange)
    {
      const focus: number    = fn.coalesce( input.otherwiseFocus, Calendar.DEFAULT_FOCUS );
      const prefer: boolean  = fn.coalesce( input.preferToday, true );
      const size: number     = fn.coalesce( input.size, this.size );
      const type: Units      = fn.coalesce( input.type, this.type );
      const today: Day       = Day.today();
      let around: DayInput   = fn.coalesce( input.around, this.days[ Math.floor( (this.days.length - 1) * focus ) ] );
      

      if (!around || (prefer && this.span.matchesDay(today)))
      {
        around = today;
      }

      const meta: CTD        = Calendar.TYPES[ type ];
      const start: Day       = meta.getStart( Day.parse( around ), size, focus );
      const end: Day         = meta.getEnd( start, size, focus );

      this.span.start = start;
      this.span.end = end;
      this.type = type;
      this.size = size;
      this.moveStart = meta.moveStart;
      this.moveEnd = meta.moveEnd;
    }
    else if (input.around)
    {
      const focus: number    = fn.coalesce( input.otherwiseFocus, Calendar.DEFAULT_FOCUS );
      const around: Day      = Day.parse( input.around );
      const type: Units      = this.type;
      const size: number     = this.size;
      const meta: CTD        = Calendar.TYPES[ type ];
      const start: Day       = meta.getStart( around, size, focus );
      const end: Day         = meta.getEnd( start, size, focus );

      this.span.start = start;
      this.span.end = end;
    }

    this.fill           = fn.coalesce( input.fill, this.fill );
    this.minimumSize    = fn.coalesce( input.minimumSize, this.minimumSize );
    this.repeatCovers   = fn.coalesce( input.repeatCovers, this.repeatCovers );
    this.listTimes      = fn.coalesce( input.listTimes, this.listTimes );
    this.eventsOutside  = fn.coalesce( input.eventsOutside, this.eventsOutside );
    this.updateRows     = fn.coalesce( input.updateRows, this.updateRows );
    this.updateColumns  = fn.coalesce( input.updateColumns, this.updateColumns );
    this.eventSorter    = fn.coalesce( input.eventSorter, this.eventSorter );
    this.parseMeta      = fn.coalesce( input.parseMeta, this.parseMeta );
    this.parseData      = fn.coalesce( input.parseData, this.parseData );

    if (fn.isArray(input.events))
    {
      this.setEvents(input.events, true);
    }

    if (!input.delayRefresh)
    {
      this.refresh();
    }

    return this;
  }

  /**
   * Sets the [[Calendar.minimumSize]] value and returns `this` for method
   * chaining.
   *
   * @param minimumSize The new value.
   */
  public withMinimumSize(minimumSize: number): this
  {
    this.minimumSize = minimumSize;
    this.refresh();

    return this;
  }

  /**
   * Sets the [[Calendar.repeatCovers]] value and returns `this` for method
   * chaining.
   *
   * @param repeatCovers The new value.
   */
  public withRepeatCovers(repeatCovers: boolean): this
  {
    this.repeatCovers = repeatCovers;
    this.refreshEvents();

    return this;
  }

  /**
   * Sets the [[Calendar.listTimes]] value and returns `this` for method
   * chaining.
   *
   * @param listTimes The new value.
   */
  public withListTimes(listTimes: boolean): this
  {
    this.listTimes = listTimes;
    this.refreshEvents();

    return this;
  }

  /**
   * Sets the [[Calendar.eventsOutside]] value and returns `this` for method
   * chaining.
   *
   * @param eventsOutside The new value.
   */
  public withEventsOutside(eventsOutside: boolean): this
  {
    this.eventsOutside = eventsOutside;
    this.refreshEvents();

    return this;
  }

  /**
   * Sets the [[Calendar.updateRows]] value and returns `this` for method
   * chaining.
   *
   * @param updateRows The new value.
   * @param refresh If the rows should be updated now if `updateRows` is `true`.
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
   * Sets the [[Calendar.updateColumns]] value and returns `this` for method
   * chaining.
   *
   * @param updateColumns The new value.
   * @param refresh If the columns should be updated now if `updateColumns` is
   *    `true`.
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
   * Returns the start day of the calendar. If this calendar is filled, this
   * may not represent the very first day in the calendar.
   */
  public get start(): Day
  {
    return this.span.start;
  }

  /**
   * Returns the end day of the calendar. If this calendar is filled, this
   * may not represent the very last day in the calendar.
   */
  public get end(): Day
  {
    return this.span.end;
  }

  /**
   * Returns the summary of the span of time this calendar represents.
   *
   * @param dayOfWeek [[DaySpan.summary]]
   * @param short [[DaySpan.summary]]
   * @param repeat [[DaySpan.summary]]
   * @param contextual [[DaySpan.summary]]
   * @param delimiter [[DaySpan.summary]]
   * @see [[DaySpan.summary]]
   */
  public summary(dayOfWeek: boolean = true, short: boolean = false, repeat: boolean = false, contextual: boolean = true, delimiter: string = ' - '): string
  {
    return this.span.summary( this.type, dayOfWeek, short, repeat, contextual, delimiter );
  }

  /**
   * Splits up this calendar into an iterable collection of calendars. The
   * resulting iterator will return `size / by` number of calendars.
   *
   * @param by The new size of the resulting calendars. If the the size of the
   *    current calendar is not divisible by this value the resulting calendars
   *    may cover more or less than this calendar covers.
   * @returns An iterator for the calendars produced.
   */
  public split(by: number = 1): Iterate<Calendar<T, M>, number, Calendar<T, M>>
  {
    return new Iterate<Calendar<T, M>, number, Calendar<T, M>>(iterator =>
    {
      let start: Day = this.start;
      let end: Day = this.moveEnd( this.end, by - this.size );

      for (let i = 0; i < this.size; i++)
      {
        const calendar = new Calendar(start, end, this.type, by, this.moveStart, this.moveEnd, this);

        if (iterator.act(calendar, i) === IterateAction.STOP)
        {
          return;
        }

        start = this.moveStart( start, by );
        end = this.moveEnd( end, by );
      }
    });
  }

  /**
   * Refreshes the days and events in this calendar based on the start and end
   * days, the calendar properties, and its eventss.
   *
   * @param today The current day to update the calendar days via
   *    [[CalendarDay.updateCurrent]].
   */
  public refresh(today: Day = Day.today()): this
  {
    this.length = this.span.days(Op.UP, true);
    this.resetDays();
    this.refreshCurrent(today);
    this.refreshSelection();
    this.refreshVisible();
    this.refreshEvents();

    return this;
  }

  /**
   * Updates the [[Calendar.filled]] span based on [[Calendar.start]],
   * [[Calendar.end]], and [[Calendar.fill]] properties.
   */
  public resetFilled(): this
  {
    this.filled.start = this.fill ? this.start.startOfWeek() : this.start;
    this.filled.end = this.fill ? this.end.endOfWeek() : this.end;

    return this;
  }

  /**
   * Updates [[Calendar.days]] to match the span of days in the calendar.
   */
  public resetDays(): this
  {
    this.resetFilled();

    const days: CalendarDay<T, M>[] = this.days;
    const filled: DaySpan = this.filled;
    const daysBetween: number = filled.days(Op.UP);
    const total: number = Math.max( this.minimumSize, daysBetween );
    let current: Day = filled.start;

    for (let i = 0; i < total; i++)
    {
      let day: CalendarDay<T, M> = days[ i ];

      if (!day || !day.sameDay( current ))
      {
        day = new CalendarDay<T, M>( current.date );

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
   * Updates the list of visible schedules.
   */
  public refreshVisible(): this
  {
    const start: Day = this.filled.start;
    const end: Day = this.filled.end;

    this.visible = this.events.filter(e =>
    {
      return e.visible && e.schedule.matchesRange(start, end);
    });

    return this;
  }

  /**
   * Updates the days with the current day via [[CalendarDay.updateCurrent]].
   *
   * @param today The new current day.
   */
  public refreshCurrent(today: Day = Day.today()): this
  {
    this.iterateDays().each(d => d.updateCurrent(today));

    return this;
  }

  /**
   * Updates the selection flags in [[CalendarDay]] based on the
   * [[Calendar.selection]] property.
   */
  public refreshSelection(): this
  {
    this.iterateDays().each(d =>
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

    return this;
  }

  /**
   * Updates the [[CalendarDay.events]] based on the events in this calendar
   * and the following properties:
   *
   * - [[Calendar.eventsForDay]]
   * - [[Calendar.eventsOutside]]
   * - [[Calendar.listTimes]]
   * - [[Calendar.repeatCovers]]
   * - [[Calendar.updateRows]]
   * - [[Calendar.updateColumns]]
   */
  public refreshEvents(): this
  {
    this.iterateDays().each(d =>
    {
      if (d.inCalendar || this.eventsOutside)
      {
        d.events = this.eventsForDay(d, this.listTimes, this.repeatCovers);
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
   * Refreshes the [[CalendarEvent.row]] property as described in the link.
   */
  public refreshRows(): this
  {
    type EventToRowMap = { [id: number]: number };
    type UsedMap = { [row: number]: boolean };

    const onlyFullDay: boolean = this.listTimes;
    let eventToRow: EventToRowMap = {};

    this.iterateDays().each(d =>
    {
      if (d.dayOfWeek === 0)
      {
        eventToRow = {};
      }

      const used: UsedMap = {};

      for (const event of d.events)
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

      for (const event of d.events)
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
   * Refreshes the [[CalendarEvent.col]] property as described in the link.
   */
  public refreshColumns(): this
  {
    interface Marker {
      time: number,
      event: CalendarEvent<T, M>,
      start: boolean,
      parent: Marker;
    }

    this.iterateDays().each(d =>
    {
      const markers: Marker[] = [];

      for (const event of d.events)
      {
        if (!event.fullDay)
        {
          markers.push({
            event,
            time: event.time.start.time,
            start: true,
            parent: null
          });

          markers.push({
            event,
            time: event.time.end.time - 1,
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

      for (const marker of markers)
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

      for (const marker of markers)
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
   * Gets the calendar day for the given day.
   *
   * @param input The day to get the calendar day for.
   * @returns The reference to the calendar day, or null if the given input
   *    is not on this calendar.
   */
  public getDay(input: DayInput): CalendarDay<T, M>
  {
    const parsed: Day = Day.parse( input );

    if (parsed)
    {
      const dayCount: number = parsed.start().daysBetween( this.days[ 0 ], Op.DOWN, false );

      return this.days[ dayCount ];
    }

    return null;
  }

  /**
   * Iterates over all days in this calendar and passes each day to `iterator`.
   *
   * @param iterator The function to pass [[CalendarDay]]s to.
   */
  public iterateDays(): Iterate<CalendarDay<T, M>, number, Calendar<T, M>>
  {
    return new Iterate<CalendarDay<T, M>, number, Calendar<T, M>>(iterator =>
    {
      const days: CalendarDay<T, M>[] = this.days;

      for (let i = 0; i < days.length; i++)
      {
        switch (iterator.act(days[i], i))
        {
          case IterateAction.STOP:
            return;
        }
      }
    });
  }

  /**
   * Returns the events for the given day optionally looking at schedule times,
   * optionally looking at events which cover multiple days, and optionally
   * sorted with the given function.
   *
   * @param day The day to find events for.
   * @param getTimes When `true` an event is added to the result for each time
   *    specified in the schedule.
   * @param covers When `true` events which don't start on the given day but do
   *    overlap are added to the result.
   * @param sorter The function to sort the events by, if any.
   * @returns An array of events that occurred on the given day.
   */
  public eventsForDay(day: Day, getTimes: boolean = true, covers: boolean = true, sorter: SortEvent<T, M> = this.eventSorter): CalendarEvent<T, M>[]
  {
    const events: CalendarEvent<T, M>[] = [];
    const entries: Event<T, M>[] = this.visible;

    for (let entryIndex = 0; entryIndex < entries.length; entryIndex++)
    {
      const entry: Event<T, M> = entries[ entryIndex ];
      const schedule: Schedule<M> = entry.schedule;
      const eventId: number = entryIndex * Constants.MAX_EVENTS_PER_DAY;
      let timeIndex: number = 0;

      schedule.iterateSpans( day, covers ).each((span, key, iterator) =>
      {
        events.push(new CalendarEvent(eventId + timeIndex++, entry, span, day));

        if (!getTimes)
        {
          iterator.stop();
        }
      });
    }

    if (sorter)
    {
      events.sort( sorter );
    }

    return events
  }

  /**
   * Finds the event given one of the ways to identify the event.
   *
   * @param input The value to use to search for an event.
   * @returns The refrence to the event or null if not found.
   */
  public findEvent(id: any): Event<T, M>
  {
    for (const event of this.events)
    {
      if (event === id || event.schedule === id || event.data === id || event.id === id)
      {
        return event;
      }
    }

    return null;
  }

  /**
   * Removes the list of events if they exist in the calendar.
   *
   * @param events The array of events to remove if they exist. If no
   *    events are passed (via `null`) then all events will be removed
   *    from the calendar.
   * @param delayRefresh When `true` the [[Calendar.refreshEvents]] will not be
   *    called after the events are removed.
   * @see [[Calendar.removeEvent]]
   * @see [[Calendar.refreshEvents]]
   */
  public removeEvents(events: any[] = null, delayRefresh: boolean = false): this
  {
    if (events)
    {
      for (const event of events)
      {
        this.removeEvent( event, true );
      }
    }
    else
    {
      this.events = [];
    }

    this.refreshVisible();

    if (!delayRefresh)
    {
      this.refreshEvents();
    }

    return this;
  }

  /**
   * Removes the given event if it exists on the calendar.
   *
   * @param event The event to remove if it exists.
   * @param delayRefresh When `true` the [[Calendar.refreshEvents]] will not be
   *    called after the event is removed.
   * @see [[Calendar.refreshEvents]]
   */
  public removeEvent(event: any, delayRefresh: boolean = false): this
  {
    const found: Event<T, M> = this.findEvent(event);

    if (found)
    {
      this.events.splice( this.events.indexOf(found), 1 );

      this.refreshVisible();

      if (!delayRefresh)
      {
        this.refreshEvents();
      }
    }

    return this;
  }

  /**
   * Adds the given event to this calendar if it doesn't exist already (or
   * `allowDuplicates` is `true`).
   *
   * @param event The event to add to the calendar.
   * @param allowDuplicates If an event can be added more than once.
   * @param delayRefresh When `true` the [[Calendar.refreshEvents]] will not be
   *    called after the event is added.
   * @see [[Calendar.refreshEvents]]
   */
  public addEvent(event: EventInput<T, M>, allowDuplicates: boolean = false, delayRefresh: boolean = false): this
  {
    const parsed: Event<T, M> = Parse.event<T, M>(event, this.parseData, this.parseMeta);

    if (!allowDuplicates)
    {
      const existing = this.findEvent(parsed);

      if (existing)
      {
        return this;
      }
    }

    this.events.push(parsed);

    this.refreshVisible();

    if (!delayRefresh)
    {
      this.refreshEvents();
    }

    return this;
  }

  /**
   * Adds the given events to this calendar if they don't exist already (or
   * `allowDuplicates` is `true`).
   *
   * @param events The events to add to the calendar.
   * @param allowDuplicates If an event can be added more than once.
   * @param delayRefresh When `true` the [[Calendar.refreshEvents]] will not be
   *    called after the events are added.
   * @see [[Calendar.refreshEvents]]
   */
  public addEvents(events: EventInput<T, M>[], allowDuplicates: boolean = false, delayRefresh: boolean = false): this
  {
    for (const event of events)
    {
      this.addEvent(event, allowDuplicates, true);
    }

    if (!delayRefresh)
    {
      this.refreshEvents();
    }

    return this;
  }

  /**
   * Sets the given events to this calendar replacing the current list of
   * events.
   *
   * @param events The events to set to the calendar.
   * @param delayRefresh When `true` the [[Calendar.refreshEvents]] will not be
   *    called after the events are added.
   * @see [[Calendar.refreshEvents]]
   */
  public setEvents(events: EventInput<T, M>[], delayRefresh: boolean = false): this
  {
    const parsedEvents = [];

    for (const event of events)
    {
      const parsed: Event<T, M> = Parse.event<T, M>(event, this.parseData, this.parseMeta);

      if (parsed)
      {
        parsedEvents.push(parsed);
      }
    }

    this.events = parsedEvents;

    this.refreshVisible();

    if (!delayRefresh)
    {
      this.refreshEvents();
    }

    return this;
  }

  /**
   * Sets the selection point or range of the calendar and updates the flags
   * in the days.
   *
   * @param start The start of the selection.
   * @param end The end of the selection.
   * @see [[Calendar.refreshSelection]]
   */
  public select(start: Day, end: Day = start): this
  {
    this.selection = new DaySpan( start, end );
    this.refreshSelection();

    return this;
  }

  /**
   * Sets the selection of the calendar to nothing.
   *
   * @see [[Calendar.refreshSelection]]
   */
  public unselect(): this
  {
    this.selection = null;
    this.refreshSelection();

    return this;
  }

  /**
   * Shifts the calendar days by the given amount.
   *
   * @param jump The amount to shift the calendar by.
   * @param delayRefresh When `true` [[Calendar.refresh]] will not be called
   *    after calendar is moved.
   */
  public move(jump: number = this.size, delayRefresh: boolean = false): this
  {
    this.span.start = this.moveStart( this.start, jump );
    this.span.end = this.moveEnd( this.end, jump );

    if (!delayRefresh)
    {
      this.refresh();
    }

    return this;
  }

  /**
   * Moves the calenndar to the next set of days.
   *
   * @param jump The amount to shift the calendar by.
   * @param delayRefresh When `true` [[Calendar.refresh]] will not be called
   *    after calendar is moved.
   */
  public next(jump: number = this.size, delayRefresh: boolean = false): this
  {
    return this.move( jump, delayRefresh );
  }

  /**
   * Moves the calenndar to the previous set of days.
   *
   * @param jump The amount to shift the calendar by.
   * @param delayRefresh When `true` [[Calendar.refresh]] will not be called
   *    after calendar is moved.
   */
  public prev(jump: number = this.size, delayRefresh: boolean = false): this
  {
    return this.move( -jump, delayRefresh );
  }

  /**
   * Converts this calendar to input which can be used to later recreate this
   * calendar. The only properties of the calendar which will be loss is the
   * [[Calendar.eventSorter]] property because it is a function.
   *
   * @param plain If the returned input should be plain objects as opposed
   *    to [[Day]] and [[Event]] instances.
   * @param plainData A function to convert [[Event.data]] to a plain object if
   *    it is not already.
   * @param plainMeta A function to convert values in [[Schedule.meta]] to plain
   *    objects if they are not alreday.
   * @returns The input generated from this calendar.
   */
  public toInput(plain: boolean = false,
      plainData: (data: T) => any = d => d,
      plainMeta: (meta: M) => any = m => m): CalendarInput<T, M>
  {
    const out: CalendarInput<T, M> = {};

    out.type = this.type;
    out.size = this.size;
    out.fill = this.fill;
    out.minimumSize = this.minimumSize;
    out.repeatCovers = this.repeatCovers;
    out.listTimes = this.listTimes;
    out.eventsOutside = this.eventsOutside;
    out.updateRows = this.updateRows;
    out.updateColumns = this.updateColumns;
    out.around = plain ? this.span.start.time : this.span.start;
    out.events = [];

    for (const event of this.events)
    {
      if (plain)
      {
        const plainEvent: any = {};

        if (fn.isDefined(event.id))
        {
          plainEvent.id = event.id;
        }

        if (fn.isDefined(event.data))
        {
          plainEvent.data = plainData( event.data );
        }

        if (!event.visible)
        {
          plainEvent.visible = event.visible;
        }

        plainEvent.schedule = event.schedule.toInput();

        const meta = plainEvent.schedule.meta;

        if (meta)
        {
          for (const identifier in meta)
          {
            meta[ identifier ] = plainMeta( meta[ identifier ] );
          }
        }

        out.events.push( plainEvent );
      }
      else
      {
        out.events.push( event );
      }
    }

    return out;
  }

  /**
   * Creates a calendar based on the given input.
   *
   * @param input The input which has at least the `type` specified.
   * @returns A new calendar instance.
   */
  public static fromInput<T, M>(input: CalendarInput<T, M>): Calendar<T, M>
  {
    const initial: Day = Day.today();

    return new Calendar(initial, initial, null, 1, null, null, input);
  }

  /**
   * Creates a calendar based around a given unit optionally focused around a
   * given day.
   *
   * @param type The unit of the calendar.
   * @param days The number of units in the calendar.
   * @param around The day to focus the calendar on.
   * @param focus The value which describes how months are added around the given
   *    day. The default value will center the calendar around the given day.
   *    When the value is `0` the given day is the first day in the calendar,
   *    and when the value is `1` the given day is the last day in the calendar.
   * @param input The default properties for the calendar.
   * @returns A new calendar instance.
   */
  public static forType<T, M>(type: Units, size: number = 1, around: Day = Day.today(), focus: number = 0.49999, input?: CalendarInput<T, M>): Calendar<T, M>
  {
    const meta: CalendarTypeDefinition = this.TYPES[ type ];
    const start: Day = meta.getStart( around, size, focus );
    const end: Day = meta.getEnd( start, size, focus );

    return new Calendar<T, M>(start, end, type, size, meta.moveStart, meta.moveEnd, input || meta.defaultInput);
  }


  /**
   * Creates a calendar based around days optionally focused around a given day.
   *
   * @param days The number of days in the calendar.
   * @param around The day to focus the calendar on.
   * @param focus The value which describes how days are added around the given
   *    day. The default value will center the calendar around the given day.
   *    When the value is `0` the given day is the first day in the calendar,
   *    and when the value is `1` the given day is the last day in the calendar.
   * @param input The default properties for the calendar.
   * @returns A new calendar instance.
   * @see [[Calendar.forType]]
   */
  public static days<T, M>(days: number = 1, around: Day = Day.today(), focus: number = 0.4999, input?: CalendarInput<T, M>): Calendar<T, M>
  {
    return this.forType( Units.DAY, days, around, focus, input );
  }

  /**
   * Creates a calendar based around weeks optionally focused around a given day.
   *
   * @param days The number of weeks in the calendar.
   * @param around The day to focus the calendar on.
   * @param focus The value which describes how weeks are added around the given
   *    day. The default value will center the calendar around the given day.
   *    When the value is `0` the given day is the first day in the calendar,
   *    and when the value is `1` the given day is the last day in the calendar.
   * @param input The default properties for the calendar.
   * @returns A new calendar instance.
   * @see [[Calendar.forType]]
   */
  public static weeks<T, M>(weeks: number = 1, around: Day = Day.today(), focus: number = 0.4999, input?: CalendarInput<T, M>): Calendar<T, M>
  {
    return this.forType( Units.WEEK, weeks, around, focus, input );
  }

  /**
   * Creates a calendar based around months optionally focused around a given day.
   *
   * @param days The number of months in the calendar.
   * @param around The day to focus the calendar on.
   * @param focus The value which describes how months are added around the given
   *    day. The default value will center the calendar around the given day.
   *    When the value is `0` the given day is the first day in the calendar,
   *    and when the value is `1` the given day is the last day in the calendar.
   * @param input The default properties for the calendar.
   * @returns A new calendar instance.
   * @see [[Calendar.forType]]
   */
  public static months<T, M>(months: number = 1, around: Day = Day.today(), focus: number = 0.4999, input?: CalendarInput<T, M>): Calendar<T, M>
  {
    return this.forType( Units.MONTH, months, around, focus, input );
  }

  /**
   * Creates a calendar based around years optionally focused around a given day.
   *
   * @param days The number of years in the calendar.
   * @param around The day to focus the calendar on.
   * @param focus The value which describes how years are added around the given
   *    day. The default value will center the calendar around the given day.
   *    When the value is `0` the given day is the first day in the calendar,
   *    and when the value is `1` the given day is the last day in the calendar.
   * @param input The default properties for the calendar.
   * @returns A new calendar instance.
   * @see [[Calendar.forType]]
   */
  public static years<T, M>(years: number = 1, around: Day = Day.today(), focus: number = 0.4999, input?: CalendarInput<T, M>): Calendar<T, M>
  {
    return this.forType( Units.YEAR, years, around, focus, input );
  }

  /**
   * A map of functions and properties by [[Units]] used to create or morph
   * Calendars.
   */
  public static TYPES: CalendarTypeDefinitionMap =
  {
    [Units.DAY]:
    {
      getStart(around: Day, size: number, focus: number): Day {
        return around.start().relativeDays( -Math.floor( size * focus ) )
      },
      getEnd(start: Day, size: number, focus: number): Day {
        return start.relativeDays( size - 1 ).end();
      },
      moveStart(day: Day, amount: number): Day {
        return day.relativeDays(amount);
      },
      moveEnd(day: Day, amount: number): Day {
        return day.relativeDays(amount);
      },
      defaultInput: undefined
    },
    [Units.WEEK]:
    {
      getStart(around: Day, size: number, focus: number): Day {
        return around.start().startOfWeek().relativeWeeks( -Math.floor( size * focus ) );
      },
      getEnd(start: Day, size: number, focus: number): Day {
        return start.relativeWeeks( size - 1 ).endOfWeek();
      },
      moveStart(day: Day, amount: number): Day {
        return day.relativeWeeks(amount);
      },
      moveEnd(day: Day, amount: number): Day {
        return day.relativeWeeks(amount);
      },
      defaultInput: undefined
    },
    [Units.MONTH]:
    {
      getStart(around: Day, size: number, focus: number): Day {
        return around.start().startOfMonth().relativeMonths( -Math.floor( size * focus ) );
      },
      getEnd(start: Day, size: number, focus: number): Day {
        return start.relativeMonths( size - 1 ).endOfMonth();
      },
      moveStart(day: Day, amount: number): Day {
        return day.relativeMonths(amount);
      },
      moveEnd(day: Day, amount: number): Day {
        return day.startOfMonth().relativeMonths(amount).endOfMonth();
      },
      defaultInput: { fill: true }
    },
    [Units.YEAR]:
    {
      getStart(around: Day, size: number, focus: number): Day {
        return around.start().startOfYear().relativeYears( -Math.floor( size * focus ) );
      },
      getEnd(start: Day, size: number, focus: number): Day {
        return start.relativeYears( size - 1 ).endOfYear();
      },
      moveStart(day: Day, amount: number): Day {
        return day.relativeYears(amount);
      },
      moveEnd(day: Day, amount: number): Day {
        return day.relativeYears(amount);
      },
      defaultInput: { fill: true }
    }
  };

}
