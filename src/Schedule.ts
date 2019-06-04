
import { Iterate, IterateAction } from 'iteratez';

import { Constants } from './Constants';
import { Day, DayInput, DayProperty } from './Day';
import { durations, Unit } from './DayFunctions';
import { DaySpan } from './DaySpan';
import { FrequencyCheck, FrequencyValue } from './Frequency';
import { Functions as fn } from './Functions';
import { Identifier, IdentifierInput } from './Identifier';
import { LocaleRule, Locales } from './Locale';
import { Op } from './Operation';
import { Parse } from './Parse';
import { ScheduleModifier, ScheduleModifierSpan } from './ScheduleModifier';
import { Time, TimeInput } from './Time';
import { Units } from './Units';


/**
 * A tuple which identifies an event on the schedule. The tuple contains the
 * total span of the event occurrence, the day of the event (could be the start
 * day, end day, or any days in between for multi-day events) as well as the
 * identifier for the event.
 */
export type ScheduleEventTuple = [DaySpan, Day, IdentifierInput];


/**
 * A shortcut for the most common type of iterators a Schedule returns.
 */
type Iter<M, T = Day> = Iterate<T, number, Schedule<M>>;


/**
 * Input given by a user which describes an event schedule.
 *
 * @typeparam M The type of metadata stored in the schedule.
 */
export interface ScheduleInput<M>
{

  /**
   * @see [[Schedule.start]]
   */
  start?: DayInput;

  /**
   * @see [[Schedule.end]]
   */
  end?: DayInput;

  /**
   * @see [[Schedule.maxOccurrences]]
   */
  maxOccurrences?: number;

  /**
   * A shortcut to setting the [[Schedule.start]], [[Schedule.end]],
   * [[Schedule.year]], [[Schedule.month]], and [[Schedule.dayOfMonth]].
   */
  on?: DayInput;

  /**
   * @see [[Schedule.times]]
   */
  times?: TimeInput[];

  /**
   * @see [[Schedule.duration]]
   */
  duration?: number;

  /**
   * @see [[Schedule.durationUnit]]
   */
  durationUnit?: string;

  /**
   * An array of days or identifiers which should be excluded from the schedule.
   *
   * @see [[Schedule.exclude]]
   */
  exclude?: (Day | IdentifierInput)[];

  /**
   * An array of days or identifiers which should be included in the schedule.
   *
   * @see [[Schedule.include]]
   */
  include?: (Day | IdentifierInput)[];

  /**
   * An array of days or identifiers which should be canceled in the schedule.
   *
   * @see [[Schedule.cancel]]
   */
  cancel?: (Day | IdentifierInput)[];

  /**
   * @see [[Schedule.meta]]
   */
  meta?: { [identifier: string]: M };

  /**
   * @see [[Schedule.month]]
   */
  month?: FrequencyValue;

  /**
   * @see [[Schedule.year]]
   */
  year?: FrequencyValue;

  /**
   * @see [[Schedule.day]]
   */
  day?: FrequencyValue;

  /**
   * @see [[Schedule.quarter]]
   */
  quarter?: FrequencyValue;

  /**
   * @see [[Schedule.dayOfWeek]]
   */
  dayOfWeek?: FrequencyValue;

  /**
   * @see [[Schedule.dayOfMonth]]
   */
  dayOfMonth?: FrequencyValue;

  /**
   * @see [[Schedule.lastDayOfMonth]]
   */
  lastDayOfMonth?: FrequencyValue;

  /**
   * @see [[Schedule.dayOfYear]]
   */
  dayOfYear?: FrequencyValue;

  /**
   * @see [[Schedule.week]]
   */
  week?: FrequencyValue;

  /**
   * @see [[Schedule.weekOfYear]]
   */
  weekOfYear?: FrequencyValue;

  /**
   * @see [[Schedule.weekspanOfYear]]
   */
  weekspanOfYear?: FrequencyValue;

  /**
   * @see [[Schedule.fullWeekOfYear]]
   */
  fullWeekOfYear?: FrequencyValue;

  /**
   * @see [[Schedule.lastWeekspanOfYear]]
   */
  lastWeekspanOfYear?: FrequencyValue;

  /**
   * @see [[Schedule.lastFullWeekOfYear]]
   */
  lastFullWeekOfYear?: FrequencyValue;

  /**
   * @see [[Schedule.weekOfMonth]]
   */
  weekOfMonth?: FrequencyValue;

  /**
   * @see [[Schedule.weekspanOfMonth]]
   */
  weekspanOfMonth?: FrequencyValue;

  /**
   * @see [[Schedule.fullWeekOfMonth]]
   */
  fullWeekOfMonth?: FrequencyValue;

  /**
   * @see [[Schedule.lastWeekspanOfMonth]]
   */
  lastWeekspanOfMonth?: FrequencyValue;

  /**
   * @see [[Schedule.lastFullWeekOfMonth]]
   */
  lastFullWeekOfMonth?: FrequencyValue;

  /**
   * The function to parse metadata with.
   */
  parseMeta?(input: any): M;
}


/**
 * A class which describes when an event occurs over what time and if it repeats.
 *
 * @typeparam M The type of metadata stored in the schedule.
 */
export class Schedule<M>
{

  /**
   * The earliest an event can occur in the schedule, or `null` if there are no
   * restrictions when the earliest event can occur. This day is inclusive.
   */
  public start: Day;

  /**
   * The latest an event can occur in the schedule, or `null` if there are no
   * restrictions when the latest event can occur. This day is inclusive.
   */
  public end: Day;

  // Private variable maxOccurrences.
  private _maxOccurrences: number;

  /**
   * The maximum number of occurrences allowed in the Schedule. 
   * [[Schedule.start]] is required and [[Schedule.end]] is ignored and 
   * overwritten. This is an expensive check and should be avoided if 
   * possible. If this value is less than 1 it is ignored.
   */
  public get maxOccurrences(): number 
  { 
    return this._maxOccurrences;
  }

  public set maxOccurrences(value: number) 
  { 
    this._maxOccurrences = value;

    if (this.checks) 
    {
      this.updateEnd();
    }
  }

  /**
   * The length of events in this schedule.
   */
  public duration: number;

  /**
   * The unit which describes the duration of the event.
   */
  public durationUnit: Unit;

  /**
   * The times at which the events occur on the days they should. If there are
   * no times specified its assumed to be an all day event - potentially over
   * multiple days or weeks based on [[Schedule.duration]] and
   * [[Schedule.durationUnit]].
   */
  public times: Time[];

  /**
   * The number of days an event in this schedule lasts PAST the starting day.
   * If this is a full day event with a duration greater than zero this value
   * will be greater than one. If this event occurs at a specific time with a
   * given duration that is taken into account and if it passes over into the
   * next day this value will be greater than one. This value is used to look
   * back in time when trying to figure out what events start or overlap on a
   * given day.
   */
  public durationInDays: number;

  /**
   * A set of identifiers which mark what days or times are excluded on the
   * schedule. This typically represents the set of event occurrences removed.
   */
  public exclude: ScheduleModifier<boolean>;

  /**
   * A set of identifiers which mark what days or times are included outside
   * the normal series of days on the schedule. This typically represents
   * an event occurrence which is moved so its added to the exclude and include
   * sets.
   */
  public include: ScheduleModifier<boolean>;

  /**
   * A set of identifiers which mark what days, times, weeks, months, etc that
   * should have all event occurrences cancelled.
   */
  public cancel: ScheduleModifier<boolean>;

  /**
   * A map of metadata keyed by an identifier. The metadata is placed in
   * [[CalendarEvent]].
   */
  public meta: ScheduleModifier<M>;

  /**
   * How frequent the event occurs based on [[Day.day]].
   */
  public day: FrequencyCheck;

  /**
   * How frequent the event occurs based on [[Day.dayOfWeek]].
   */
  public dayOfWeek: FrequencyCheck;

  /**
   * How frequent the event occurs based on [[Day.dayOfMonth]].
   */
  public dayOfMonth: FrequencyCheck;

  /**
   * How frequent the event occurs based on [[Day.lastDayOfMonth]].
   */
  public lastDayOfMonth: FrequencyCheck;

  /**
   * How frequent the event occurs based on [[Day.dayOfYear]].
   */
  public dayOfYear: FrequencyCheck;

  /**
   * How frequent the event occurs based on [[Day.month]].
   */
  public month: FrequencyCheck;

  /**
   * How frequent the event occurs based on [[Day.week]].
   */
  public week: FrequencyCheck;

  /**
   * How frequent the event occurs based on [[Day.weekOfYear]].
   */
  public weekOfYear: FrequencyCheck;

  /**
   * How frequent the event occurs based on [[Day.weekspanOfYear]].
   */
  public weekspanOfYear: FrequencyCheck;

  /**
   * How frequent the event occurs based on [[Day.fullWeekOfYear]].
   */
  public fullWeekOfYear: FrequencyCheck;

  /**
   * How frequent the event occurs based on [[Day.lastWeekspanOfYear]].
   */
  public lastWeekspanOfYear: FrequencyCheck;

  /**
   * How frequent the event occurs based on [[Day.lastFullWeekOfYear]].
   */
  public lastFullWeekOfYear: FrequencyCheck;

  /**
   * How frequent the event occurs based on [[Day.weekOfMonth]].
   */
  public weekOfMonth: FrequencyCheck;

  /**
   * How frequent the event occurs based on [[Day.weekspanOfMonth]].
   */
  public weekspanOfMonth: FrequencyCheck;

  /**
   * How frequent the event occurs based on [[Day.fullWeekOfMonth]].
   */
  public fullWeekOfMonth: FrequencyCheck;

  /**
   * How frequent the event occurs based on [[Day.lastWeekspanOfMonth]].
   */
  public lastWeekspanOfMonth: FrequencyCheck;

  /**
   * How frequent the event occurs based on [[Day.lastFullWeekOfMonth]].
   */
  public lastFullWeekOfMonth: FrequencyCheck;

  /**
   * How frequent the event occurs based on [[Day.year]].
   */
  public year: FrequencyCheck;

  /**
   * How frequent the event occurs based on [[Day.quarter]].
   */
  public quarter: FrequencyCheck;

  /**
   * The array of frequency functions which had valid frequencies.
   *
   * @see [[FrequencyCheck.given]]
   */
  public checks: FrequencyCheck[];


  /**
   * Creates a schedule based on the given input.
   *
   * @param input The input which describes the schedule of events.
   */
  public constructor(input?: ScheduleInput<M>)
  {
    this.exclude = new ScheduleModifier<boolean>();
    this.include = new ScheduleModifier<boolean>();
    this.cancel = new ScheduleModifier<boolean>();
    this.meta = new ScheduleModifier<M>();

    if (fn.isDefined(input))
    {
      this.set(input);
    }
  }

  /**
   * Sets the schedule with the given input.
   *
   * @param input The input or schedule which describes the schedule of events.
   * @param parseMeta A function to use when parsing meta input into the desired type.
   * @see [[Parse.schedule]]
   */
  public set(input: ScheduleInput<M> | Schedule<M>,
    parseMeta: (input: any) => M = (x => x)): this
  {
    if (input instanceof Schedule)
    {
      Parse.schedule<M>( input.toInput(), undefined, this);
    }
    else
    {
      Parse.schedule<M>(input, fn.coalesce( input.parseMeta, parseMeta ), this);
    }

    return this;
  }

  /**
   * Returns the last event time specified or `undefined` if this schedule is
   * for an all day event.
   */
  public get lastTime(): Time
  {
    return this.times[ this.times.length - 1 ];
  }

  /**
   * The [[Identifier]] for this schedule. Either [[Identifier.Day]] or
   * [[Identifier.Time]].
   */
  public get identifierType(): Identifier
  {
    return this.isFullDay() ? Identifier.Day : Identifier.Time;
  }

  /**
   * Updates the [[Schedule.durationInDays]] variable based on the
   * [[Schedule.lastTime]] (if any), the [[Schedule.duration]] and it's
   * [[Schedule.durationUnit]].
   */
  public updateDurationInDays(): this
  {
    const start: number = this.lastTime ? this.lastTime.toMilliseconds() : 0;
    const duration: number = this.duration * (durations[ this.durationUnit ] || 0);
    const exclude: number = Constants.MILLIS_IN_DAY;
    const day: number = Constants.MILLIS_IN_DAY;

    this.durationInDays = Math.max(0, Math.ceil((start + duration - exclude) / day));

    return this;
  }

  /**
   * Updates [[Schedule.checks]] based on the frequencies that were specified
   * in the schedule input.
   */
  public updateChecks(): this
  {
    this.checks = Parse.givenFrequency([
      this.year,
      this.month,
      this.day,
      this.quarter,
      this.week, 
      this.weekOfYear,
      this.fullWeekOfYear,
      this.weekspanOfYear,
      this.lastFullWeekOfYear,
      this.lastWeekspanOfYear,
      this.weekOfMonth,
      this.weekspanOfMonth,
      this.fullWeekOfMonth,
      this.lastWeekspanOfMonth,
      this.lastFullWeekOfMonth,
      this.dayOfWeek,
      this.dayOfMonth,
      this.lastDayOfMonth,
      this.dayOfYear
    ]);

    return this;
  }

  /**
   * Updates the [[Schedule.end]] based on [[Schedule.maxOccurrences]]
   */
  public updateEnd(): this
  {
    if (this.maxOccurrences > 0 && this.start)
    {
      // Clear so it's not used in calculating maximum years.
      this.end = null;

      const maximumYears = this.getMaximum('year') - this.start.year + 1;
      const lookahead = maximumYears * Constants.DAYS_IN_YEAR;
      const previousOccurrences = this.include.spans().where(({ span }) => span.start.isBefore(this.start)).count();
      const occurrences = this.maxOccurrences - previousOccurrences;
      const last = this.forecast(this.start, false, occurrences, 0, true, lookahead).last();

      if (last)
      {
        this.end = last[0].end;
      }
    }

    return this;
  }

  /**
   * Estimates the maximum number of `prop` from the start date that events 
   * could be happening. If the start date is not specified -1 will be 
   * returned representing potentially infinite `prop`s. If specific `prop`s
   * are specified the difference between the maximum `prop` and the start `prop`
   * will be returned. After that if [[Schedule.maxOccurrences]] is not 
   * specified -1 will be returned unless the end date is specified. In that
   * case the `prop`s between the start and end are returned. Otherwise
   * if events occur every X `prop`s then that calculation is used taking into
   * account [[Schedule.maxOccurrences]]. Finally no year rule is specified
   * so worst case is assumed, [[Schedule.maxOccurrences]].
   * 
   * The returned value is always rounded up, so if the first and last 
   * occurrence happens the same `prop` 1 will be returned.
   */
  public getMaximum (prop: DayProperty): number
  {
    if (!this.start)
    {
      return -1;
    }

    if (this.end)
    {
      return this.end[prop];
    }

    const occurs = this.maxOccurrences;
    const start = this.start[prop];
    const frequency = this[prop];

    if (frequency)
    {
      const input = frequency.input;

      if (fn.isFrequencyValueEquals(input))
      {
        return input;
      }
      else if (fn.isFrequencyValueOneOf(input))
      {
        let max: number = input[0];

        for (let i = 1; i < input.length; i++)
        {
          if (input[i] > max) max = input[i];
        }

        return max;
      }

      if (occurs > 0 && fn.isFrequencyValueEvery(input))
      {
        const { every, offset } = input;

        return start + (offset || 0) + every * occurs;
      }
    }

    return occurs <= 0 ? -1 : start + occurs - 1;
  }

  /**
   * Gets the start date of the schedule. Even if one is not specified, one
   * can be calculated if this is a single event schedule.
   */
  public getStart(): Day | null
  {
    if (this.start)
    {
      return this.start;
    }

    const singleEventSpan = this.getSingleEventSpan();

    if (singleEventSpan)
    {
      return singleEventSpan.start;
    }

    return null;
  }

  /**
   * Gets the end date of the schedule. Even if one is not specified, one
   * can be calculated if this is a single event schedule.
   */
  public getEnd(): Day | null
  {
    if (this.end)
    {
      return this.end;
    }

    const singleEventSpan = this.getSingleEventSpan();

    if (singleEventSpan)
    {
      return singleEventSpan.end;
    }

    return null;
  }

  /**
   * Attempts to calculate the entire range of the schedule taking into account
   * any start date, end date, the included and excluded dates, and also even 
   * if the start and end date aren't specified, it checks to see if this is a 
   * single event schedule. If the start of the result is not defined, that 
   * means this schedule has occurred since the beginning of time. If the end
   * of the result is not defined, that means the schedule will occurr until 
   * the end of time.
   */
  public getRange(useInclude: boolean = true): Partial<DaySpan>
  {
    const hasTimes = this.times.length > 0;
    let start = this.getStart();
    let end = this.getEnd();

    if (useInclude)
    {
      this.include.spans().each(({span}) => 
      {
        if (!this.isExcluded(span.start, hasTimes))
        {
          if (!start || span.start.isBefore(start))
          {
            start = span.start;
          }
          if (!end || span.end.isAfter(end))
          {
            end = span.end;
          }
        }
      });
    }

    return { start, end }
  }

  /**
   * Returns an iterator for all occurrences in this schedule. If a finite 
   * list of occurrences is not possible to generate, an empty iterator will 
   * be returned. A finite set of occurrences can be determine when a start
   * and end date are specified. 
   */
  public getOccurrences(): Iterate<DaySpan, IdentifierInput, Schedule<M> | ScheduleModifier<M>>
  {
    const start = this.getStart();
    const end = this.getEnd();

    if (!start || !end)
    {
      return Iterate.empty();
    }

    const daysBetween = start.daysBetween(end, Op.CEIL, true);

    const beforeStart = this.include
      .spans()
      .where(({span}) => span.start.isBefore(start))
      .sorted((a, b) => a.span.start.time - b.span.start.time)
      .transform(({span}) => span);

    const afterStart = this.forecast(start, false, daysBetween)
      .transform(([span]) => span);

    const afterEnd = this.include
      .spans()
      .where(({span}) => span.start.isAfter(end))
      .sorted((a, b) => a.span.start.time - b.span.start.time)
      .transform(({span}) => span);

    return Iterate.join(beforeStart, afterStart, afterEnd);
  }

  /**
   * Determines whether the given day lies between the earliest and latest
   * valid day in the schedule.
   *
   * @param day The day to test.
   * @returns `true` if the day lies in the schedule, otherwise `false`.
   * @see [[Schedule.start]]
   * @see [[Schedule.end]]
   */
  public matchesSpan(day: Day): boolean
  {
    return (this.start === null || day.isSameOrAfter(this.start)) &&
      (this.end === null || day.isBefore(this.end));
  }

  /**
   * Determines whether the given range overlaps with the earliest and latest
   * valid days in this schedule (if any).
   *
   * @param start The first day in the range.
   * @param end The last day in the range.
   * @returns `true` if the range intersects with the schedule, otherwise `false`.
   * @see [[Schedule.start]]
   * @see [[Schedule.end]]
   */
  public matchesRange(start: Day, end: Day): boolean
  {
    if (this.start && end.isBefore(this.start))
    {
      return false;
    }

    if (this.end && start.isAfter(this.end))
    {
      return false;
    }

    return true;
  }

  /**
   * Determines whether the given day is explicitly excluded in the schedule.
   *
   * @param day The day to test.
   * @param lookAtTime lookAtTime If the specific time of the given day should
   *    be looked at.
   * @returns `true` if the day was excluded, otherwise `false`.
   */
  public isExcluded(day: Day, lookAtTime: boolean = true): boolean
  {
    return this.exclude.get( day, false, lookAtTime );
  }

  /**
   * Determines whether the given day is explicitly included in the schedule.
   *
   * @param day The day to test.
   * @param lookAtTime lookAtTime If the specific time of the given day should
   *    be looked at.
   * @returns `true` if the day is NOT explicitly included, otherwise `false`.
   */
  public isIncluded(day: Day, lookAtTime: boolean = true): boolean
  {
    return this.include.get( day, false, lookAtTime );
  }

  /**
   * Determines whether the given day is cancelled in the schedule.
   *
   * @param day The day to test.
   * @param lookAtTime lookAtTime If the specific time of the given day should
   *    be looked at.
   * @returns `true` if the day was cancelled, otherwise `false`.
   */
  public isCancelled(day: Day, lookAtTime: boolean = true): boolean
  {
    return this.cancel.get( day, false, lookAtTime );
  }

  /**
   * Returns the metadata for the given day or `null` if there is none.
   *
   * @param day The day to return the metadata for.
   * @param otherwise The data to return if none exists for the given day.
   * @param lookAtTime lookAtTime If the specific time of the given day should
   *    be looked at.
   * @returns The metadata or `null`.
   */
  public getMeta(day: Day, otherwise: M = null, lookAtTime: boolean = true): M
  {
    return this.meta.get( day, otherwise, lookAtTime );
  }

  /**
   * Returns all metadata for the given day or an empty array if there is none.
   *
   * @param day The day to return the metadata for.
   * @returns The array of metadata ordered by priority or an empty array.
   */
  public getMetas(day: Day): M[]
  {
    return this.meta.getAll( day );
  }

  /**
   * Returns whether the events in the schedule are all day long or start at
   * specific times. Full day events start at the start of the day and end at
   * the start of the next day (if the duration = `1` and durationUnit = 'days').
   * Full day events have no times specified and should have a durationUnit of
   * either `days` or `weeks`.
   */
  public isFullDay(): boolean
  {
    return this.times.length === 0;
  }

  /**
   * Sets whether this schedule is a full day event if it is not already. If
   * this schedule is a full day event and `false` is passed to this function
   * a single timed event will be added based on `defaultTime`. If this schedule
   * has timed events and `true` is passed to make the schedule full day, the
   * timed events are removed from this schedule. If the durationUnit is not the
   * expected unit based on the new full day flag - the duration is reset to 1
   * and the duration unit is set to the expected unit.
   *
   * @param fullDay Whether this schedule should represent a full day event or
   *    timed events.
   * @param defaultTime If `fullDay` is `false` and this schedule is currently
   *    a full day event - this time will be used as the time of the first event.
   */
  public setFullDay(fullDay: boolean = true, defaultTime: TimeInput = '08:00'): this
  {
    if (fullDay !== this.isFullDay())
    {
      if (fullDay)
      {
        this.times = [];

        if (this.durationUnit !== 'day')
        {
          this.duration = 1;
          this.durationUnit = 'day';
        }
      }
      else
      {
        this.times = [Parse.time( defaultTime )];

        if (this.durationUnit !== 'hour')
        {
          this.duration = 1;
          this.durationUnit = 'hour';
        }
      }
    }

    return this;
  }

  /**
   * Adjusts the [[Schedule.start]] and [[Schedule.end]] dates specified on this
   * schedule if this schedule represents a single event and the `start` and
   * `end` are already set or `addSpan` is `true`.
   *
   * @param addSpan If `true`, the `start` and `end` dates will always be
   *    adjusted if this schedule is a single event.
   */
  public adjustDefinedSpan(addSpan: boolean = false): this
  {
    const single: DaySpan = this.getSingleEventSpan();

    if (single && (addSpan || (this.start && this.end)))
    {
      this.start = single.start.startOf('day');
      this.end = single.end.endOf('day');
    }

    return this;
  }

  /**
   * Returns a span of time for a schedule with full day events starting on the
   * start of the given day with the desired duration in days or weeks.
   *
   * @param day The day the span starts on.
   * @returns The span of time starting on the given day.
   */
  public getFullSpan(day: Day): DaySpan
  {
    const start: Day = day.startOf('day');
    const end: Day = start.add(this.durationUnit, this.duration);

    return new DaySpan( start, end );
  }

  /**
   * Returns a span of time starting on the given day at the given day with the
   * duration specified on this schedule.
   *
   * @param day The day the span starts on.
   * @param time The time of day the span starts.
   * @returns The span of time calculated.
   */
  public getTimeSpan(day: Day, time: Time): DaySpan
  {
    const start: Day = day.withTime( time );
    const end: Day = start.add(this.durationUnit, this.duration);

    return new DaySpan( start, end );
  }

  /**
   * Determines whether the given day is a day on the schedule for the start
   * of an event. If an event is more than one day and the day given is not the
   * start this may return `false`. This does not test for event instances
   * that exist through [[Schedule.include]].
   *
   * @param day The day to test.
   * @returns `true` if the day marks the start of an event on the schedule.
   * @see [[Schedule.isIncluded]]
   * @see [[Schedule.isFullyExcluded]]
   * @see [[Schedule.matchesSpan]]
   */
  public matchesDay(day: Day): boolean
  {
    if (this.isIncluded( day, false ))
    {
      return true;
    }

    if (!this.matchesSpan( day ) || this.isFullyExcluded( day ))
    {
      return false;
    }

    for (const check of this.checks)
    {
      if (!check( day[ check.property ] ))
      {
        return false;
      }
    }

    return true;
  }

  /**
   * Determines whether the given day has events added through
   * [[Schedule.include]].
   *
   * @param day The day to look for included times on.
   * @returns `true` if there are included event instances on the given day,
   *    otherwise `false`.
   */
  public hasIncludedTime(day: Day): boolean
  {
    return !this.iterateIncludeTimes( day ).empty();
  }

  /**
   * Determines whether the given day is fully excluded from the schedule. A
   * fully excluded day is one that has a day-wide exclusion, or the schedule
   * is not an all-day event and all times in the schedule are specifically
   * excluded.
   *
   * @param day The day to test.*
   * @returns `true` if he day is fully excluded, otherwise `false`.
   */
  public isFullyExcluded(day: Day): boolean
  {
    // If exclude object is empty, bail early.
    if (this.exclude.isEmpty()) {
      return false
    }

    if (this.isExcluded(day, false))
    {
      return true;
    }

    if (this.isFullDay())
    {
      return false;
    }

    for (const time of this.times)
    {
      if (!this.isExcluded( day.withTime( time ) ))
      {
        return false;
      }
    }

    return true;
  }

  /**
   * Finds the next day an event occurs on the schedule given a day to start,
   * optionally including it, and a maximum number of days to look ahead.
   *
   * @param day The day to start to search from.
   * @param includeDay If the given day should be included in the search.
   * @param lookAhead The maximum number of days to look ahead from the given
   *     day for event occurrences.
   * @returns The next day on the schedule or `null` if none exists.
   */
  public nextDay(day: Day, includeDay: boolean = false, lookAhead: number = Constants.DAYS_IN_YEAR): Day
  {
    return this.iterateDaycast(day, 1, true, includeDay, lookAhead).first();
  }

  /**
   * Finds the next specified number of days that events occur on the schedule
   * given a day to start, optionally including it, and a maximum number of days
   * to look ahead.
   *
   * @param day The day to start to search from.
   * @param max The maximum number of days to return in the result.
   * @param includeDay If the given day should be included in the search.
   * @param lookAhead The maximum number of days to look ahead from the given
   *     day for event occurrences.
   * @returns An array containing the next days on the schedule that events
   *    start or an empty array if there are none.
   */
  public nextDays(day: Day, max: number, includeDay: boolean = false, lookAhead: number = Constants.DAYS_IN_YEAR): Iter<M>
  {
    return this.iterateDaycast(day, max, true, includeDay, lookAhead);
  }

  /**
   * Finds the previous day an event occurs on the schedule given a day to start,
   * optionally including it, and a maximum number of days to look behind.
   *
   * @param day The day to start to search from.
   * @param includeDay If the given day should be included in the search.
   * @param lookBack The maximum number of days to look behind from the given
   *     day for event occurrences.
   * @returns The previous day on the schedule or `null` if none exists.
   */
  public prevDay(day: Day, includeDay: boolean = false, lookBack: number = Constants.DAYS_IN_YEAR): Day
  {
    return this.iterateDaycast(day, 1, false, includeDay, lookBack).first();
  }

  /**
   * Finds the previous specified number of days that events occur on the
   * schedule given a day to start, optionally including it, and a maximum
   * number of days to look behind.
   *
   * @param day The day to start to search from.
   * @param max The maximum number of days to return in the result.
   * @param includeDay If the given day should be included in the search.
   * @param lookAhead The maximum number of days to look behind from the given
   *     day for event occurrences.
   * @returns An array containing the previous days on the schedule that events
   *    start or an empty array if there are none.
   */
  public prevDays(day: Day, max: number, includeDay: boolean = false, lookBack: number = Constants.DAYS_IN_YEAR): Iter<M>
  {
    return this.iterateDaycast(day, max, false, includeDay, lookBack);
  }

  /**
   * Iterates over days that events start in the schedule given a day to start,
   * a maximum number of days to find, and a direction to look.
   *
   * @param day The day to start to search from.
   * @param max The maximum number of days to iterate.
   * @param next If `true` this searches forward, otherwise `false` is backwards.
   * @param includeDay If the given day should be included in the search.
   * @param lookup The maximum number of days to look through from the given
   *     day for event occurrences.
   * @returns A new Iterator for the days found in the cast.
   * @see [[Schedule.iterateSpans]]
   */
  public iterateDaycast(day: Day, max: number, next: boolean, includeDay: boolean = false, lookup: number = Constants.DAYS_IN_YEAR): Iter<M>
  {
    return new Iterate<Day, number, Schedule<M>>(iterator =>
    {
      let iterated: number = 0;
      let acted: number = 0;

      for (let days = 0; days < lookup; days++)
      {
        if (!includeDay || days > 0)
        {
          day = next ? day.next() : day.prev();
        }

        if (!this.iterateSpans( day, false ).empty())
        {
          const action: IterateAction = iterator.act( day, acted++ );

          if (action === IterateAction.STOP || ++iterated >= max)
          {
            return;
          }
        }
      }
    });
  }

  /**
   * Iterates through the spans (event instances) that start on or covers the
   * given day.
   *
   * @param day The day to look for spans on.
   * @param covers If `true` spans which span multiple days will be looked at
   *    to see if they intersect with the given day, otherwise `false` will
   *    only look at the given day for the start of events.
   * @returns A new Iterator for all the spans found.
   */
  public iterateSpans(day: Day, covers: boolean = false): Iter<M, DaySpan>
  {
    return new Iterate<DaySpan, number, Schedule<M>>(iterator =>
    {
      let current: Day = day;
      let lookBehind: number = covers ? this.durationInDays : 0;
      let key: number = 0;

      // If the events start at the end of the day and may last multiple days....
      if (this.isFullDay())
      {
        // If the schedule has events which span multiple days we need to look
        // backwards for events that overlap with the given day.
        while (lookBehind >= 0)
        {
          // If the current day matches the schedule rules...
          if (this.matchesDay( current ))
          {
            // Build a DaySpan with the given start day and the schedules duration.
            const span: DaySpan = this.getFullSpan( current );

            // If that dayspan intersects with the given day, it's a winner!
            if (span.matchesDay( day ))
            {
              switch (iterator.act( span, key++ ))
              {
                case IterateAction.STOP:
                  return;
              }
            }
          }

          current = current.prev();
          lookBehind--;
        }
      }
      // This schedule has events which start at certain times
      else
      {
        // If the schedule has events which span multiple days we need to look
        // backwards for events that overlap with the given day.
        while (lookBehind >= 0)
        {
          // If the current day matches the schedule rules...
          if (this.matchesDay( current ))
          {
            // Iterate through each daily occurrence in the schedule...
            for (const time of this.times)
            {
              const span: DaySpan = this.getTimeSpan( current, time );

              // If the event intersects with the given day and the occurrence
              // has not specifically been excluded...
              if (span.matchesDay( day ) && !this.isExcluded( span.start, true ))
              {
                switch (iterator.act( span, key++ ))
                {
                  case IterateAction.STOP:
                    return;
                }
              }
            }
          }
          else
          {
            // The current day does not match the schedule, however the schedule
            // might have moved/random event occurrents on the current day.
            // We only want the ones that overlap with the given day.
            this.iterateIncludeTimes(current, day).each((span, i, timeIterator) =>
            {
              switch (iterator.act( span, key++ ))
              {
                case IterateAction.STOP:
                  timeIterator.stop();
                  break;
              }
            })

            if (iterator.action === IterateAction.STOP)
            {
              return;
            }
          }

          lookBehind--;

          // Generating current.prev() is costly.
          // Avoid generating it if looping condition is no longer satisfied.
          if (lookBehind >= 0) {
            current = current.prev()
          }
        }
      }
    });
  }

  /**
   * Determines if the given day is on the schedule and the time specified on
   * the day matches one of the times on the schedule.
   *
   * @param day The day to test.
   * @returns `true` if the day and time match the schedule, otherwise false.
   */
  public matchesTime(day: Day): boolean
  {
    return !!this.iterateSpans( day, true ).where( span => span.start.sameMinute( day ) ).first();
  }

  /**
   * Determines if the given day is covered by this schedule. A schedule can
   * specify events that span multiple days - so even though the day does not
   * match the starting day of a span - it can be a day that is within the
   * schedule.
   *
   * @param day The day to test.
   * @returns `true` if the day is covered by an event on this schedule,
   *    otherwise `false`.
   */
  public coversDay(day: Day): boolean
  {
    return !this.iterateSpans( day, true ).empty();
  }

  /**
   * Determines if the given timestamp lies in an event occurrence on this
   * schedule.
   *
   * @param day The timestamp to test against the schedule.
   * @return `true` if the timestamp lies in an event occurrent start and end
   *    timestamps, otherwise `false`.
   */
  public coversTime(day: Day): boolean
  {
    return !!this.iterateSpans( day, true ).where( span => span.contains( day ) ).first();
  }

  /**
   * Sets the frequency for the given property. This does not update the
   * [[Schedule.checks]] array, the [[Schedule.updateChecks]] function needs
   * to be called.
   *
   * @param property The frequency to update.
   * @param frequency The new frequency.
   */
  public setFrequency(property: DayProperty, frequency?: FrequencyValue): this
  {
    this[ property ] = Parse.frequency( frequency, property );

    return this;
  }

  /**
   * Changes the exclusion status of the event at the given time. By default
   * this excludes this event - but `false`  may be passed to undo an exclusion.
   *
   * @param time The start time of the event occurrence to exclude or include.
   * @param excluded Whether the event should be excluded.
   */
  public setExcluded(time: Day, excluded: boolean = true): this
  {
    const type: Identifier = this.identifierType;

    this.exclude.set( time, excluded, type );
    this.include.set( time, !excluded, type );

    return this;
  }

  /**
   * Changes the cancellation status of the event at the given start time. By
   * default this cancels the event occurrence - but `false` may be passed to
   * undo a cancellation.
   *
   * @param time The start time of the event occurrence to cancel or uncancel.
   * @param cancelled Whether the event should be cancelled.
   */
  public setCancelled(time: Day, cancelled: boolean = true): this
  {
    this.cancel.set( time, cancelled, this.identifierType );

    return this;
  }

  /**
   * Removes the time from this schedule and all related included, excluded,
   * cancelled instances as well as metadata.
   *
   * @param time The time to remove from the schedule.
   * @param removeInclude If any included instances should be removed as well.
   * @returns `true` if the time was removed, otherwise `false`.
   */
  public removeTime(time: Time, removeInclude: boolean = true): boolean
  {
    let found: boolean = false;

    for (let i = 0; i < this.times.length && !found; i++)
    {
      found = time.matches( this.times[ i ] )

      if (found)
      {
        this.times.splice( i, 1 );
      }
    }

    if (found)
    {
      if (removeInclude)
      {
        this.include.removeTime( time );
      }

      this.exclude.removeTime( time );
      this.cancel.removeTime( time );
      this.meta.removeTime( time );
    }

    return found;
  }

  /**
   * Moves the event instance starting at `fromTime` to `toTime` optionally
   * placing `meta` in the schedules metadata for the new time `toTime`.
   * If this schedule has a single event ([[Schedule.isSingleEvent]]) then the
   * only value needed is `toTime` and not `fromTime`.
   *
   * @param toTime The timestamp of the new event.
   * @param fromTime The timestamp of the event on the schedule to move if this
   *    schedule generates multiple events.
   * @returns `true` if the schedule had the event moved, otherwise `false`.
   */
  public move(toTime: Day, fromTime?: Day, meta?: M): boolean
  {
    if (!this.moveSingleEvent( toTime ) && fromTime)
    {
      return this.moveInstance( fromTime, toTime );
    }

    return false;
  }

  /**
   * Moves a time specified in this schedule to the given time, adjusting
   * any cancelled event instances, metadata, and any excluded and included
   * event instances.
   *
   * @param fromTime The time to move.
   * @param toTime The new time in the schedule.
   * @returns `true` if time was moved, otherwise `false`.
   */
  public moveTime(fromTime: Time, toTime: Time): boolean
  {
    let found: boolean = false;

    for (let i = 0; i < this.times.length && !found; i++)
    {
      found = fromTime.matches( this.times[ i ] )
      
      if (found)
      {
        this.times.splice( i, 1, toTime );
      }
    }

    if (found)
    {
      this.include.moveTime( fromTime, toTime );
      this.exclude.moveTime( fromTime, toTime );
      this.cancel.moveTime( fromTime, toTime );
      this.meta.moveTime( fromTime, toTime );

      this.adjustDefinedSpan( false );
    }

    return found;
  }

  /**
   * Moves the event instance starting at `fromTime` to `toTime` optionally
   * placing `meta` in the schedules metadata for the new time `toTime`. A move
   * is accomplished by excluding the current event and adding an inclusion of
   * the new day & time.
   *
   * @param fromTime The timestamp of the event on the schedule to move.
   * @param toTime The timestamp of the new event.
   * @returns `true`.
   * @see [[Schedule.move]]
   */
  public moveInstance(fromTime: Day, toTime: Day): boolean
  {
    const type: Identifier = this.identifierType;

    this.exclude.set( fromTime, true, type );
    this.exclude.set( toTime, false, type );

    this.include.set( toTime, true, type );
    this.include.set( fromTime, false, type );

    if (this.cancel.get( fromTime, false ) && !this.cancel.get( toTime, false ))
    {
      this.cancel.set( toTime, true, type );

      if (this.cancel.getIdentifier( fromTime ) === type)
      {
        this.cancel.unset( fromTime, type );
      }
    }

    const meta: M = this.meta.get( fromTime, null );

    if (meta && meta !== this.meta.get( toTime, null ))
    {
      this.meta.set( toTime, meta, type );

      if (this.meta.getIdentifier( fromTime ) === type)
      {
        this.meta.unset( fromTime, type );
      }
    }

    return true;
  }

  /**
   * Moves the single event in this schedule to the given day/time if applicable.
   * If this schedule is not a single event schedule then `false` is returned.
   * If this schedule is a timed event the time will take the time of the given
   * `toTime` of `takeTime` is `true`.
   *
   * @param toTime The time to move the single event to.
   * @param takeTime If this schedule has a single timed event, should the time
   *    of the event be changed to the time of the given `toTime`?
   * @returns `true` if the schedule was adjusted, otherwise `false`.
   * @see [[Schedule.move]]
   */
  public moveSingleEvent(toTime: Day, takeTime: boolean = true): boolean
  {
    if (!this.isSingleEvent())
    {
      return false;
    }

    for (const check of this.checks)
    {
      const prop: DayProperty  = check.property;
      const value = toTime[ prop ];
      const frequency: FrequencyCheck = Parse.frequency( [value], prop );

      this[ prop ] = frequency;
    }

    if (this.times.length === 1 && takeTime)
    {
      this.times = [toTime.asTime()];
    }

    this.updateChecks();

    const span: DaySpan = this.getSingleEventSpan();

    if (this.start)
    {
      this.start = span.start.startOf('day');
    }

    if (this.end)
    {
      this.end = span.end.endOf('day');
    }

    this.updateEnd();

    return true;
  }

  /**
   * Returns the span of the single event in this schedule if it's that type of
   * schedule, otherwise `null` is returned.
   *
   * @returns A span of the single event, otherwise `null`.
   * @see [[Schedule.isSingleEvent]]
   */
  public getSingleEventSpan(): DaySpan
  {
    if (!this.isSingleEvent())
    {
      return null;
    }

    const startOfYear: Day = Day.build( this.year.input[0], 0, 1 );
    const start: Day = this.iterateDaycast( startOfYear, 1, true, true, Constants.DAYS_IN_YEAR ).first();

    if (!start)
    {
      return null;
    }

    return this.isFullDay() ?
      this.getFullSpan( start ) :
      this.getTimeSpan( start, this.times[ 0 ] );
  }

  /**
   * Determines whether this schedule produces a single event, and no more.
   * If this schedule has any includes, it's assumed to be a multiple event
   * schedule. A single event can be detected in the following scenarios where
   * each frequency has a single occurrence (see [[Schedule.isSingleFrequency]]).
   *
   * - year, day of year
   * - year, month, day of month
   * - year, month, week of month, day of week
   * - year, week of year, day of week
   *
   * @returns `true` if this schedule produces a single event, otherwise `false`.
   */
  public isSingleEvent(): boolean
  {
    // 0 = full day, 1 = once a day, 1+ = multiple events a day
    if (this.times.length > 1)
    {
      return false;
    }

    // Let's assume if there are includes, this is not a single event.
    if (!this.include.isEmpty())
    {
      return false;
    }

    // If this can occur on multiple years, not a single event.
    if (!this.isSingleYear())
    {
      return false;
    }

    // If this is a specific year and day of the year: single!
    if (this.isSingleDayOfYear())
    {
      return true;
    }

    // If this is a specific year, month, and day of month: single!
    if (this.isSingleMonth() && this.isSingleDayOfMonth())
    {
      return true;
    }

    // If this is a specific year, month, week of the month, day of the week: single!
    if (this.isSingleMonth() && this.isSingleWeekOfMonth() && this.isSingleDayOfWeek())
    {
      return true;
    }

    // If this is a specific year, week of the year, day of the week: single!
    if (this.isSingleWeekOfYear() && this.isSingleDayOfWeek())
    {
      return true;
    }

    // Doesn't look like a single event.
    return false;
  }

  /**
   * @returns `true` if this schedule produces events only in a specific year.
   * @see [[Schedule.year]]
   */
  public isSingleYear(): boolean
  {
    return this.isSingleFrequency( this.year );
  }

  /**
   * @returns `true` if this schedule produces events only in a specific month.
   * @see [[Schedule.month]]
   */
  public isSingleMonth(): boolean
  {
    return this.isSingleFrequency( this.month );
  }

  /**
   * @returns `true` if this schedule produces events only in a specific day of
   *    the month.
   * @see [[Schedule.dayOfMonth]]
   * @see [[Schedule.lastDayOfMonth]]
   */
  public isSingleDayOfMonth(): boolean
  {
    return this.isSingleFrequency( this.dayOfMonth ) ||
      this.isSingleFrequency( this.lastDayOfMonth );
  }

  /**
   * @returns `true` if this schedule produces events only in a specific day of
   *    the week.
   * @see [[Schedule.day]]
   * @see [[Schedule.dayOfWeek]]
   */
  public isSingleDayOfWeek(): boolean
  {
    return this.isSingleFrequency( this.dayOfWeek ) ||
      this.isSingleFrequency( this.day );
  }

  /**
   * @returns `true` if this schedule produces events only in a specific day of
   *    the year.
   * @see [[Schedule.dayOfYear]]
   */
  public isSingleDayOfYear(): boolean
  {
    return this.isSingleFrequency( this.dayOfYear );
  }

  /**
   * @returns `true` if this schedule produces events only in a specific week of
   *    the month.
   * @see [[Schedule.weekspanOfMonth]]
   * @see [[Schedule.fullWeekOfMonth]]
   * @see [[Schedule.weekOfMonth]]
   * @see [[Schedule.lastFullWeekOfMonth]]
   * @see [[Schedule.lastWeekspanOfMonth]]
   */
  public isSingleWeekOfMonth(): boolean
  {
    return this.isSingleFrequency( this.weekspanOfMonth ) ||
      this.isSingleFrequency( this.fullWeekOfMonth ) ||
      this.isSingleFrequency( this.weekOfMonth ) ||
      this.isSingleFrequency( this.lastFullWeekOfMonth ) ||
      this.isSingleFrequency( this.lastWeekspanOfMonth );
  }

  /**
   * @returns `true` if this schedule produces events only in a specific week of
   *    the year.
   * @see [[Schedule.weekspanOfYear]]
   * @see [[Schedule.fullWeekOfYear]]
   * @see [[Schedule.week]]
   * @see [[Schedule.weekOfYear]]
   * @see [[Schedule.lastFullWeekOfYear]]
   * @see [[Schedule.lastWeekspanOfYear]]
   */
  public isSingleWeekOfYear(): boolean
  {
    return this.isSingleFrequency( this.weekspanOfYear ) ||
      this.isSingleFrequency( this.fullWeekOfYear ) ||
      this.isSingleFrequency( this.week ) ||
      this.isSingleFrequency( this.weekOfYear ) ||
      this.isSingleFrequency( this.lastFullWeekOfYear ) ||
      this.isSingleFrequency( this.lastWeekspanOfYear );
  }

  /**
   * Determines if the given [[FrequencyCheck]] results in a single occurrence.
   *
   * @returns `true` if the frequency results in a single event, otherwise `false`.
   */
  public isSingleFrequency(frequency: FrequencyCheck): boolean
  {
    return (fn.isFrequencyValueOneOf(frequency.input) && frequency.input.length === 1) || fn.isFrequencyValueEquals(frequency.input);
  }

  /**
   * Creates a forecast for this schedule which returns a number of event
   * occurrences around a given day. A single item could be returned per day, or
   * you could get an item for each timed event occurrence.
   *
   * @param around The day to find a forecast around.
   * @param covers If `true` spans which span multiple days will be looked at
   *    to see if they intersect with the given day, otherwise `false` will
   *    only look at the given day for the start of events.
   * @param daysAfter The number of events to return after the given day.
   * @param daysBefore The number of events to return before the given day.
   * @param times If timed events should be returned, or only one for each day.
   * @param lookAround How many days to look before and after the given day for
   *    event occurrences.
   * @returns A new iterator which provides the event occurence span, the day it
   *    starts (or is covered if `covers` is `true`), and the identifier for the
   *    event.
   */
  public forecast(around: Day,
    covers: boolean = true,
    daysAfter: number,
    daysBefore: number = daysAfter,
    times: boolean = false,
    lookAround: number = Constants.DAYS_IN_YEAR): Iter<M, ScheduleEventTuple>
  {
    const type: Identifier = this.identifierType;

    let tupleIndex: number = 0;

    const tuplesForDay = (day: Day, tuples: Iter<M, ScheduleEventTuple>): boolean =>
    {
      const spans: DaySpan[] = this.iterateSpans( day, covers ).array();
      const last: number = times ? spans.length : Math.min( 1, spans.length );
      const offset: number = times ? 0 : spans.length - 1;

      for (let i = 0; i < last; i++)
      {
        const span: DaySpan = spans[ i + offset ];
        const id: IdentifierInput = type.get( span.start );

        if (tuples.act( [ span, day, id ], tupleIndex++ ) === IterateAction.STOP)
        {
          return false;
        }
      }

      return true;
    };

    const prev = new Iterate<ScheduleEventTuple, number, Schedule<M>>(iterator =>
    {
      let curr: Day = around;

      for (let i = 0; i < lookAround; i++)
      {
        if (!tuplesForDay( curr, iterator ))
        {
          break;
        }

        curr = curr.prev();
      }
    });

    const next = new Iterate<ScheduleEventTuple, number, Schedule<M>>(iterator =>
    {
      let curr: Day = around;

      for (let i = 0; i < lookAround; i++)
      {
        curr = curr.next();

        if (!tuplesForDay( curr, iterator ))
        {
          break;
        }
      }
    });

    return prev.take( daysBefore + 1 ).reverse().append( next.take( daysAfter ) );
  }

  /**
   * Iterates timed events that were explicitly specified on the given day.
   * Those events could span multiple days so may be tested against another day.
   *
   * @param day The day to look for included timed events.
   * @param matchAgainst The day to test against the timed event.
   * @returns A new Iterator for all the included spans found.
   */
  public iterateIncludeTimes(day: Day, matchAgainst: Day = day): Iterate<DaySpan, string, ScheduleModifier<boolean>>
  {
    const isIncludedTime = (result: [IdentifierInput, boolean]) =>
    {
      const [id, included] = result;

      return included && Identifier.Time.is( id );
    };

    const getSpan = (result: [IdentifierInput, boolean]) =>
    {
      const [id] = result;
      const time: Day = Identifier.Time.start( id );
      const span: DaySpan = this.getTimeSpan( time, time.asTime() );

      if (span.matchesDay( matchAgainst ))
      {
        return span;
      }
    };

    return this.include.query( day.dayIdentifier ).where( isIncludedTime ).transform<DaySpan>( getSpan );
  }

  /**
   * Clones this schedule.
   *
   * @returns A new schedule which matches this schedule.
   */
  public clone(): Schedule<M>
  {
    return new Schedule<M>( this.toInput() );
  }

  /**
   * Converts the schedule instance back into input.
   *
   * @param returnDays When `true` the start, end, and array of exclusions will
   *    have [[Day]] instances, otherwise the UTC timestamp and dayIdentifiers
   *    will be used when `false`.
   * @param returnTimes When `true` the times returned in the input will be
   *    instances of [[Time]] otherwise the `timeFormat` is used to convert the
   *    times to strings.
   * @param timeFormat The time format to use when returning the times as strings.
   * @param alwaysDuration If the duration values (`duration` and
   *    `durationUnit`) should always be returned in the input.
   * @param alwaysReturnEnd If end should be in the input even if 
   *    maxOccurrences is specified on the schedule.
   * @returns The input that describes this schedule.
   * @see [[Time.format]]
   */
  public toInput(returnDays: boolean = false, returnTimes: boolean = false, timeFormat: string = '', alwaysDuration: boolean = false, alwaysReturnEnd: boolean = false): ScheduleInput<M>
  {
    const defaultUnit: string = Constants.DURATION_DEFAULT_UNIT( this.isFullDay() );
    const exclusions: IdentifierInput[] = this.exclude.identifiers(v => v).array();
    const inclusions: IdentifierInput[] = this.include.identifiers(v => v).array();
    const cancels: IdentifierInput[] = this.cancel.identifiers(v => v).array();
    const hasMeta: boolean = !this.meta.isEmpty();
    const out: ScheduleInput<M> = {};
    const times: TimeInput[]  = [];

    for (const time of this.times)
    {
      times.push( returnTimes ? time : (timeFormat ? time.format( timeFormat ) : time.toString()) );
    }

    if (this.start) out.start = returnDays ? this.start : this.start.time;
    if (this.end && (alwaysReturnEnd || this.maxOccurrences < 1)) out.end = returnDays ? this.end : this.end.time;
    if (this.maxOccurrences > 0) out.maxOccurrences = this.maxOccurrences;
    if (times.length) out.times = times;
    if (alwaysDuration || this.duration !== Constants.DURATION_DEFAULT) out.duration = this.duration;
    if (alwaysDuration || this.durationUnit !== defaultUnit) out.durationUnit = this.durationUnit;
    if (exclusions.length) out.exclude = exclusions;
    if (inclusions.length) out.include = inclusions;
    if (cancels.length) out.cancel = cancels;
    if (hasMeta) out.meta = fn.extend( {}, this.meta.map );
    if (this.dayOfWeek.input) out.dayOfWeek = this.dayOfWeek.input;
    if (this.dayOfMonth.input) out.dayOfMonth = this.dayOfMonth.input;
    if (this.lastDayOfMonth.input) out.lastDayOfMonth = this.lastDayOfMonth.input;
    if (this.dayOfYear.input) out.dayOfYear = this.dayOfYear.input;
    if (this.year.input) out.year = this.year.input;
    if (this.month.input) out.month = this.month.input;
    if (this.day.input) out.day = this.day.input;
    if (this.week.input) out.week = this.week.input;
    if (this.weekOfYear.input) out.weekOfYear = this.weekOfYear.input;
    if (this.weekspanOfYear.input) out.weekspanOfYear = this.weekspanOfYear.input;
    if (this.fullWeekOfYear.input) out.fullWeekOfYear = this.fullWeekOfYear.input;
    if (this.lastWeekspanOfYear.input) out.lastWeekspanOfYear = this.lastWeekspanOfYear.input;
    if (this.lastFullWeekOfYear.input) out.lastFullWeekOfYear = this.lastFullWeekOfYear.input;
    if (this.weekOfMonth.input) out.weekOfMonth = this.weekOfMonth.input;
    if (this.weekspanOfMonth.input) out.weekspanOfMonth = this.weekspanOfMonth.input;
    if (this.fullWeekOfMonth.input) out.fullWeekOfMonth = this.fullWeekOfMonth.input;
    if (this.lastWeekspanOfMonth.input) out.lastWeekspanOfMonth = this.lastWeekspanOfMonth.input;
    if (this.lastFullWeekOfMonth.input) out.lastFullWeekOfMonth = this.lastFullWeekOfMonth.input;

    return out;
  }

  /**
   * Describes the schedule in a human friendly string taking into account all
   * possible values specified in this schedule.
   *
   * @param thing A brief description of the things (events) on the schedule.
   * @param includeRange When `true` the [[Schedule.start]] and [[Schedule.end]]
   *    are possibly included in the description if they have values.
   * @param includeTimes When `true` the [[Schedule.times]] are possibly included
   *    in the description.
   * @param includeDuration When `true` the [[Schedule.duration]] and
   *    [[Schedule.durationUnit]] are added to the description if
   *    [[Schedule.duration]] is not equal to `1`.
   * @param includeExcludes When `true` the [[Schedule.exclude]] are added
   *    to the description if there are any.
   * @param includeIncludes When `true` the [[Schedule.include]] are added
   *    to the description if there are any.
   * @param includeCancels When `true` the [[Schedule.cancel]] are added
   *    to the description if there are any.
   * @returns The descroption of the schedule.
   */
  public describe(thing: string = 'event',
    includeRange: boolean = true,
    includeTimes: boolean = true,
    includeDuration: boolean = false,
    includeExcludes: boolean = false,
    includeIncludes: boolean = false,
    includeCancels: boolean = false): string
  {
    const lang = Locales.current;
    let out: string = '';

    if (includeRange)
    {
      if (this.start)
      {
        out += lang.scheduleStartingOn(this.start);

        if (this.end)
        {
          out += lang.scheduleEndingOn(this.end);
        }
      }
      else if (this.end)
      {
        out += lang.scheduleEndsOn(this.end);
      }
    }

    out += lang.scheduleThing(thing, !out);

    out += this.describeRule( this.dayOfWeek.input, lang.ruleDayOfWeek );
    out += this.describeRule( this.day.input, lang.ruleDay );
    out += this.describeRule( this.lastDayOfMonth.input, lang.ruleLastDayOfMonth );
    out += this.describeRule( this.dayOfMonth.input, lang.ruleDayOfMonth );
    out += this.describeRule( this.dayOfYear.input, lang.ruleDayOfYear );
    out += this.describeRule( this.year.input, lang.ruleYear );
    out += this.describeRule( this.month.input, lang.ruleMonth );
    out += this.describeRule( this.week.input, lang.ruleWeek );
    out += this.describeRule( this.weekOfYear.input, lang.ruleWeekOfYear );
    out += this.describeRule( this.weekspanOfYear.input, lang.ruleWeekspanOfYear );
    out += this.describeRule( this.fullWeekOfYear.input, lang.ruleFullWeekOfYear );
    out += this.describeRule( this.lastWeekspanOfYear.input, lang.ruleLastWeekspanOfYear );
    out += this.describeRule( this.lastFullWeekOfYear.input, lang.ruleLastFullWeekOfYear );
    out += this.describeRule( this.weekOfMonth.input, lang.ruleWeekOfMonth );
    out += this.describeRule( this.fullWeekOfMonth.input, lang.ruleFullWeekOfMonth );
    out += this.describeRule( this.weekspanOfMonth.input, lang.ruleWeekspanOfMonth );
    out += this.describeRule( this.lastFullWeekOfMonth.input, lang.ruleLastFullWeekOfMonth );
    out += this.describeRule( this.lastWeekspanOfMonth.input, lang.ruleLastWeekspanOfMonth );

    if (includeTimes && this.times.length)
    {
      out += lang.scheduleAtTimes;
      out += this.describeArray( this.times, x => x.format('hh:mm a') );
    }

    if (includeDuration && this.duration !== Constants.DURATION_DEFAULT)
    {
      out += lang.scheduleDuration(this.duration, this.durationUnit);
    }

    if (includeExcludes)
    {
      const excludes: ScheduleModifierSpan<boolean>[] = this.exclude.spans().array();

      if (excludes.length)
      {
        out += lang.scheduleExcludes;
        out += this.describeArray( excludes, x => x.span.summary(Units.DAY) );
      }
    }

    if (includeIncludes)
    {
      const includes: ScheduleModifierSpan<boolean>[] = this.include.spans().array();

      if (includes.length)
      {
        out += lang.scheduleIncludes;
        out += this.describeArray( includes, x => x.span.summary(Units.DAY) );
      }
    }

    if (includeCancels)
    {
      const cancels: ScheduleModifierSpan<boolean>[] = this.cancel.spans().array();

      if (cancels.length)
      {
        out += lang.scheduleCancels;
        out += this.describeArray( cancels, x => x.span.summary(Units.DAY) );
      }
    }

    return out;
  }

  /**
   * Describes the given frequency.
   *
   * @param value The frequency to describe.
   * @param localeRule The locale rule used to describe the frequency.
   * @returns A string description of the frequency.
   */
  private describeRule(value: FrequencyValue, localeRule: LocaleRule): string
  {
    let out = '';

    if (fn.isFrequencyValueEvery(value))
    {
      out += ' ' + localeRule.every(value.every);

      if (value.offset)
      {
        out += ' ' + localeRule.offset(value.offset);
      }
    }
    else if (fn.isFrequencyValueOneOf(value))
    {
      if (value.length)
      {
        out += ' ' + localeRule.oneOf(value);
      }
    }
    else if (fn.isFrequencyValueEquals(value))
    {
      out += ' ' + localeRule.oneOf([value]);
    }

    return out;
  }

  /**
   * Describes the array by adding commas where appropriate and 'and' before the
   * last value of the array (if its more than `1`).
   *
   * @param array The array of items to describe.
   * @param map The function which converts an item to a string.
   * @returns The final description of the array items.
   */
  private describeArray<T>(array: T[], map: (item: T) => string): string
  {
    return Locales.current.list(array.map(map));
  }

  /**
   * Generates a schedule for an event which occurs once all day for a given day
   * optionally spanning multiple days starting on the given day.
   *
   * @param input The day the event starts.
   * @param days The number of days the event lasts.
   * @returns A new schedule that starts on the given day.
   */
  public static forDay<M>(input: DayInput, days: number = 1): Schedule<M>
  {
    const day: Day = Day.parse( input );

    if (!day)
    {
      return null;
    }

    return new Schedule<M>({
      year: [ day.year ],
      month: [ day.month ],
      dayOfMonth: [ day.dayOfMonth ],
      duration: days,
      durationUnit: 'day'
    });
  }

  /**
   * Generates a schedule for an event which occurs once at a given time on a
   * given day optionally spanning any amount of time (default is 1 hour).
   *
   * @param input The day the event starts.
   * @param time The time the event starts.
   * @param duration The duration of the event.
   * @param durationUnit The unit for the duration of the event.
   * @returns A new schedule that starts on the given day and time.
   */
  public static forTime<M>(input: DayInput, time: TimeInput, duration: number = 1, durationUnit: Unit = 'hour'): Schedule<M>
  {
    const day: Day = Day.parse( input );

    if (!day)
    {
      return null;
    }

    return new Schedule<M>({
      year: [ day.year ],
      month: [ day.month ],
      dayOfMonth: [ day.dayOfMonth ],
      times: [ time ],
      duration,
      durationUnit
    });
  }

  /**
   * Generates a schedule for an event which occurs once over a given span.
   *
   * @param span The span of the event.
   * @returns A new schedule that starts and ends at the given timestamps.
   */
  public static forSpan<M>(span: DaySpan): Schedule<M>
  {
    const start = span.start;
    const minutes = span.minutes();
    const isDay = minutes % Constants.MINUTES_IN_DAY === 0;
    const isHour = minutes % Constants.MINUTES_IN_HOUR === 0;
    const duration = isDay ? minutes / Constants.MINUTES_IN_DAY : (isHour ? minutes / Constants.MINUTES_IN_HOUR : minutes);
    const durationUnit: Unit = isDay ? 'day' : (isHour ? 'hour' : 'minute');

    return this.forTime<M>( start, start.asTime(), duration, durationUnit );
  }

}
