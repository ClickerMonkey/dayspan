
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
 * A pairing of a user specified event object and the schedule which defines
 * when it occurs on a calendar.
 */
export interface CalendarSchedule<T>
{

  /**
   * The schedule of events.
   */
  schedule: Schedule;

  /**
   * The user supplied event object.
   */
  event: T;

}

/**
 * A type which an be used to identify a schedule/event pair for removal or
 * retrieval.
 */
export type CalendarScheduleIdentifier<T> = CalendarSchedule<T> | Schedule | T;

/**
 * The input which can be passed to the calendar when adding a schedule and event.
 */
export type CalendarScheduleInput<T> = CalendarSchedule<T> | { schedule: ScheduleInput, event: T };

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
 * Input used to initialize or mass change the properties of a [[Calendar]].
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
 * A collection of [[CalendarDay]]s, the schedules on the calendar, and all
 * [[CalendarEvent]]s generated based on the schedules.
 */
export class Calendar<T>
{

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
  public eventSorter: SortEvent<T> = null;


  /**
   * A selection of days on the calendar. If no days are selected this is `null`.
   * This is merely used to keep the selection flags in [[CalendarDay]] updated
   * via [[Calendar.refreshSelection]].
   */
  public selection: DaySpan = null;

  /**
   * The array of days in this calendar and their events.
   */
  public days: CalendarDay<T>[] = [];

  /**
   * The array of schedule and user event pairs added to the calendar.
   */
  public schedules: CalendarSchedule<T>[] = [];


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
   * Overwrites the properties in this calendar with the given input and
   * optionally refreshes all days and their events with the new settings.
   *
   * @param input The properties to overwrite on this calendar.
   * @param refresh Whether the calendar should have its days and events synced.
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
   * Splits up this calendar into an array of calendars. The resulting array
   * will return [[Calendar.size]] number of calendars.
   *
   * @param by The new size of the resulting calendars.
   * @returns An array of calendars split from this calendar.
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
   * Refreshes the days and events in this calendar based on the start and end
   * days, the calendar properties, and its schedules.
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
   * Updates the days with the current day via [[CalendarDay.updateCurrent]].
   *
   * @param today The new current day.
   */
  public refreshCurrent(today: Day = Day.today()): this
  {
    return this.iterateDays(d =>
    {
      d.updateCurrent(today);
    });
  }

  /**
   * Updates the selection flags in [[CalendarDay]] based on the
   * [[Calendar.selection]] property.
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
   * Updates the [[CalendarDay.events]] based on the schedules in this calendar
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
    this.iterateDays(d =>
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
   * Refreshes the [[CalendarEvent.col]] property as described in the link.
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
   * Iterates over all days in this calendar and passes each day to `iterator`.
   *
   * @param iterator The function to pass [[CalendarDay]]s to.
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
   * Returns the events for the given day optionally looking at schedule times,
   * optionally looking at events which cover multiple days, and optioanlly
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
  public eventsForDay(day: Day, getTimes: boolean = true, covers: boolean = true, sorter: SortEvent<T> = this.eventSorter): CalendarEvent<T>[]
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

    if (sorter)
    {
      events.sort( sorter );
    }

    return events
  }

  /**
   * Finds the schedule & event pair given one of the ways to identify the pair.
   *
   * @param input The value to use to search for a pair.
   * @returns The refrence to the pair or null if not found.
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
   * Removes the list of schedules if they exist in the calendar.
   *
   * @param schedules The array of schedules to remove if they exist. If no
   *    schedules are passed (via `null`) then all schedules will be removed
   *    from the calendar.
   * @param delayRefresh When `true` the [[Calendar.refreshEvents]] will not be
   *    called after the schedules are removed.
   * @see [[Calendar.removeSchedule]]
   * @see [[Calendar.refreshEvents]]
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
   * Removes the given schedule if it exists on the calendar.
   *
   * @param schedule The schedule to remove if it exists.
   * @param delayRefresh When `true` the [[Calendar.refreshEvents]] will not be
   *    called after the schedules are removed.
   * @see [[Calendar.refreshEvents]]
   */
  public removeSchedule(schedule: CalendarScheduleIdentifier<T>, delayRefresh: boolean = false): this
  {
    let found: CalendarSchedule<T> = this.findSchedule(schedule);

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
   * Adds the given schedule to this calendar if it doesn't exist already (or
   * `allowDuplicates` is `true`).
   *
   * @param schedule The schedule & event pair to add to the calendar.
   * @param allowDuplicates If a schedule & event pair can be added more than once.
   * @param delayRefresh When `true` the [[Calendar.refreshEvents]] will not be
   *    called after the schedule is added.
   * @see [[Calendar.refreshEvents]]
   */
  public addSchedule(schedule: CalendarScheduleInput<T>, allowDuplicates: boolean = false, delayRefresh: boolean = false): this
  {
    let parsed: CalendarSchedule<T> = Parse.calendarSchedule(schedule);

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
   * Adds the given schedules to this calendar if they don't exist already (or
   * `allowDuplicates` is `true`).
   *
   * @param schedules The schedule & event pairs to add to the calendar.
   * @param allowDuplicates If a schedule & event pair can be added more than once.
   * @param delayRefresh When `true` the [[Calendar.refreshEvents]] will not be
   *    called after the schedules are added.
   * @see [[Calendar.refreshEvents]]
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
   */
  public static days<T>(days: number = 1, around: Day = Day.today(), focus: number = 0.4999, input?: CalendarInput<T>): Calendar<T>
  {
    let start: Day = around.start().relativeDays( -Math.floor( days * focus ) );
    let end: Day = start.relativeDays( days - 1 ).end();
    let mover: CalendarMover = (day, amount) => day.relativeDays(amount);

    return new Calendar(start, end, Units.DAY, days, mover, mover, input);
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
   */
  public static weeks<T>(weeks: number = 1, around: Day = Day.today(), focus: number = 0.4999, input?: CalendarInput<T>): Calendar<T>
  {
    let start: Day = around.start().startOfWeek().relativeWeeks( -Math.floor( weeks * focus ) );
    let end: Day = start.relativeWeeks( weeks - 1 ).endOfWeek();
    let mover: CalendarMover = (day, amount) => day.relativeWeeks(amount);

    return new Calendar(start, end, Units.WEEK, weeks, mover, mover, input);
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
   */
  public static years<T>(years: number = 1, around: Day = Day.today(), focus: number = 0.4999, input: CalendarInput<T> = {fill: true}): Calendar<T>
  {
    let start: Day = around.start().startOfYear().relativeYears( -Math.floor( years * focus ) );
    let end: Day = start.relativeYears( years - 1 ).endOfYear();
    let mover: CalendarMover = (day, amount) => day.relativeYears(amount);

    return new Calendar(start, end, Units.YEAR, years, mover, mover, input);
  }

}
