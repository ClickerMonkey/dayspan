
import { Functions as fn } from './Functions';
import { FrequencyValue, FrequencyCheck, FrequencyValueEvery, FrequencyValueOneOf } from './Frequency';
import { Day, DayInput, DurationInput } from './Day';
import { Identifier, IdentifierInput } from './Identifier';
import { DaySpan } from './DaySpan';
import { Constants } from './Constants';
import { Parse } from './Parse';
import { Time, TimeInput } from './Time';
import { Suffix } from './Suffix';
import { ScheduleModifier, ScheduleModifierSpan } from './ScheduleModifier';
import { Units } from './Units';
import { Iterator } from './Iterator';

// @ts-ignore
import * as moment from 'moment';


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
  durationUnit?: DurationInput;

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
   * @see [[Schedule.week]]
   */
  week?: FrequencyValue;

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
  parseMeta?: (input: any) => M;
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

  /**
   * The length of events in this schedule.
   */
  public duration: number;

  /**
   * The unit which describes the duration of the event.
   */
  public durationUnit: DurationInput;

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
   * @param input The input which describes the schedule of events.
   * @param parseMeta A function to use when parsing meta input into the desired type.
   * @see [[Parse.schedule]]
   */
  public set(input: ScheduleInput<M>,
    parseMeta: (input: any) => M = (x => <M>x)): this
  {
    Parse.schedule<M>(input, fn.coalesce( input.parseMeta, parseMeta ), this);

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
   * Updates the [[Schedule.durationInDays]] variable based on the
   * [[Schedule.lastTime]] (if any), the [[Schedule.duration]] and it's
   * [[Schedule.durationUnit]].
   */
  public updateDurationInDays(): this
  {
    let start: number = this.lastTime ? this.lastTime.toMilliseconds() : 0;
    let duration: number = this.duration * (Constants.DURATION_TO_MILLIS[ this.durationUnit ] || 0);
    let exclude: number = Constants.MILLIS_IN_DAY;
    let day: number = Constants.MILLIS_IN_DAY;

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
   * Returns a span of time for a schedule with full day events starting on the
   * start of the given day with the desired duration in days or weeks.
   *
   * @param day The day the span starts on.
   * @returns The span of time starting on the given day.
   */
  public getFullSpan(day: Day): DaySpan
  {
    let start: Day = day.start();
    let end: Day = start.add( this.duration, this.durationUnit );

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
    let start: Day = day.withTime( time );
    let end: Day = start.add( this.duration, this.durationUnit );

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

    for (let check of this.checks)
    {
      if (!check( <number>day[ check.property ] ))
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
    return !this.iterateIncludeTimes( day ).isEmpty();
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
    if (this.isExcluded(day, false))
    {
      return true;
    }

    if (this.isFullDay())
    {
      return false;
    }

    for (let time of this.times)
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
  public nextDay(day: Day, includeDay: boolean = false, lookAhead: number = 366): Day
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
  public nextDays(day: Day, max: number, includeDay: boolean = false, lookAhead: number = 366): Day[]
  {
    return this.iterateDaycast(day, max, true, includeDay, lookAhead).list();
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
  public prevDay(day: Day, includeDay: boolean = false, lookBack: number = 366): Day
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
  public prevDays(day: Day, max: number, includeDay: boolean = false, lookBack: number = 366): Day[]
  {
    return this.iterateDaycast(day, max, false, includeDay, lookBack).list();
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
  public iterateDaycast(day: Day, max: number, next: boolean, includeDay: boolean = false, lookup: number = 366): Iterator<Day>
  {
    return new Iterator<Day>((callback, iterator) =>
    {
      let iterated: number = 0;

      for (let days = 0; days < lookup; days++)
      {
        if (!includeDay || days > 0)
        {
          day = next ? day.next() : day.prev();
        }

        if (!this.iterateSpans( day, false ).isEmpty())
        {
          callback( day, iterator );

          if (!iterator.iterating || ++iterated >= max)
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
  public iterateSpans(day: Day, covers: boolean = false): Iterator<DaySpan>
  {
    return new Iterator<DaySpan>((callback, iterator) =>
    {
      let current: Day = day;
      let lookBehind: number = covers ? this.durationInDays : 0;

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
            let span: DaySpan = this.getFullSpan( current );

            // If that dayspan intersects with the given day, it's a winner!
            if (span.matchesDay( day ))
            {
              callback( span, iterator );

              if (!iterator.iterating)
              {
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
            for (let time of this.times)
            {
              let span: DaySpan = this.getTimeSpan( current, time );

              // If the event intersects with the given day and the occurrence
              // has not specifically been excluded...
              if (span.matchesDay( day ) && !this.isExcluded( span.start, true ))
              {
                callback( span, iterator );

                if (!iterator.iterating)
                {
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
            this.iterateIncludeTimes(current, day).iterate((span, timeIterator) =>
            {
              callback( span, iterator );

              if (!iterator.iterating)
              {
                timeIterator.stop();
              }
            })

            if (!iterator.iterating)
            {
              return;
            }
          }

          current = current.prev();
          lookBehind--;
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
    return !!this.iterateSpans( day, true ).first( span => span.start.sameMinute( day ) );
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
    return !this.iterateSpans( day, true ).isEmpty();
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
    return !!this.iterateSpans( day, true ).first( span => span.contains( day ) );
  }

  /**
   * Iterates timed events that were explicitly specified on the given day.
   * Those events could span multiple days so may be tested against another day.
   *
   * @param day The day to look for included timed events.
   * @param matchAgainst The day to test against the timed event.
   * @returns A new Iterator for all the included spans found.
   */
  public iterateIncludeTimes(day: Day, matchAgainst: Day = day): Iterator<DaySpan>
  {
    let isIncludedTime = (result: [IdentifierInput, boolean]) =>
    {
      let [id, included] = result;

      return included && Identifier.Time.is( id );
    };

    let getSpan = (result: [IdentifierInput, boolean]) =>
    {
      let [id] = result;
      let time: Day = Identifier.Time.start( id );
      let span: DaySpan = this.getTimeSpan( time, time.asTime() );

      if (span.matchesDay( matchAgainst ))
      {
        return span;
      }
    };

    return this.include.query( day.dayIdentifier ).map<DaySpan>( getSpan, isIncludedTime );
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
   * @returns The input that describes this schedule.
   * @see [[Schedule.getExclusions]]
   * @see [[Time.format]]
   */
  public toInput(returnDays: boolean = false, returnTimes: boolean = false, timeFormat: string = '', alwaysDuration: boolean = false): ScheduleInput<M>
  {
    let defaultUnit: string = Constants.DURATION_DEFAULT_UNIT( this.isFullDay() );
    let exclusions: IdentifierInput[] = this.exclude.identifiers(v => v);
    let inclusions: IdentifierInput[] = this.include.identifiers(v => v);
    let cancels: IdentifierInput[] = this.cancel.identifiers(v => v);
    let hasMeta: boolean = !this.meta.isEmpty();
    let out: ScheduleInput<M> = {};
    let times: TimeInput[]  = [];

    for (let time of this.times)
    {
      times.push( returnTimes ? time : (timeFormat ? time.format( timeFormat ) : time.toString()) );
    }

    if (this.start) out.start = returnDays ? this.start : this.start.time;
    if (this.end) out.end = returnDays ? this.end : this.end.time;
    if (times.length) out.times = times;
    if (alwaysDuration || this.duration !== Constants.DURATION_DEFAULT) out.duration = this.duration;
    if (alwaysDuration || this.durationUnit !== defaultUnit) out.durationUnit = this.durationUnit;
    if (exclusions.length) out.exclude = exclusions;
    if (inclusions.length) out.include = inclusions;
    if (cancels.length) out.cancel = cancels;
    if (hasMeta) out.meta = this.meta.map;
    if (this.dayOfWeek.input) out.dayOfWeek = this.dayOfWeek.input;
    if (this.dayOfMonth.input) out.dayOfMonth = this.dayOfMonth.input;
    if (this.lastDayOfMonth.input) out.lastDayOfMonth = this.lastDayOfMonth.input;
    if (this.dayOfYear.input) out.dayOfYear = this.dayOfYear.input;
    if (this.year.input) out.year = this.year.input;
    if (this.month.input) out.month = this.month.input;
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
    let out: string = '';

    if (includeRange)
    {
      if (this.start)
      {
        out += 'Starting on ' + this.start.format('dddd Do, YYYY');

        if (this.end)
        {
          out += ' and ending on ' + this.end.format('dddd Do, YYYY');
        }
      }
      else if (this.end)
      {
        out += 'Up until ' + this.end.format('dddd Do, YYYY');
      }
    }

    if (out)
    {
      out += ' the ' + thing + ' will occur';
    }
    else
    {
      out += 'The ' + thing + ' will occur';
    }

    out += this.describeRule( this.dayOfWeek.input, 'day of the week', x => moment.weekdays()[x], 1, false);
    out += this.describeRule( this.lastDayOfMonth.input, 'last day of the month', x => Suffix.CACHE[x] );
    out += this.describeRule( this.dayOfMonth.input, 'day of the month', x => Suffix.CACHE[x] );
    out += this.describeRule( this.dayOfYear.input, 'day of the year', x => Suffix.CACHE[x], 1 );
    out += this.describeRule( this.year.input, 'year', x => x, 0, false, ' in ' );
    out += this.describeRule( this.month.input, 'month', x => moment.months()[x], 0, false, ' in ' );
    out += this.describeRule( this.weekOfYear.input, 'week of the year', x => Suffix.CACHE[x] );
    out += this.describeRule( this.weekspanOfYear.input, 'weekspan of the year', x => Suffix.CACHE[x + 1], 1 );
    out += this.describeRule( this.fullWeekOfYear.input, 'full week of the year', x => Suffix.CACHE[x] );
    out += this.describeRule( this.lastWeekspanOfYear.input, 'last weekspan of the year', x => Suffix.CACHE[x + 1], 1 );
    out += this.describeRule( this.lastFullWeekOfYear.input, 'last full week of the year', x => Suffix.CACHE[x] );
    out += this.describeRule( this.weekOfMonth.input, 'week of the month', x => Suffix.CACHE[x] );
    out += this.describeRule( this.fullWeekOfMonth.input, 'full week of the month', x => Suffix.CACHE[x] );
    out += this.describeRule( this.weekspanOfMonth.input, 'weekspan of the month', x => Suffix.CACHE[x + 1], 1 );
    out += this.describeRule( this.lastFullWeekOfMonth.input, 'last full week of the month', x => Suffix.CACHE[x] );
    out += this.describeRule( this.lastWeekspanOfMonth.input, 'last weekspan of the month', x => Suffix.CACHE[x + 1], 1 );

    if (includeTimes && this.times.length)
    {
      out += ' at ';
      out += this.describeArray( this.times, x => x.format('hh:mm a') );
    }

    if (includeDuration && this.duration !== Constants.DURATION_DEFAULT)
    {
      out += ' lasting ' + this.duration + ' ';

      if (this.durationUnit)
      {
        out += this.durationUnit + ' ';
      }
    }

    if (includeExcludes)
    {
      let excludes: ScheduleModifierSpan<boolean>[] = this.exclude.spans();

      if (excludes.length)
      {
        out += ' excluding ';
        out += this.describeArray( excludes, x => x.span.summary(Units.DAY) );
      }
    }

    if (includeIncludes)
    {
      let includes: ScheduleModifierSpan<boolean>[] = this.include.spans();

      if (includes.length)
      {
        out += ' including ';
        out += this.describeArray( includes, x => x.span.summary(Units.DAY) );
      }
    }

    if (includeCancels)
    {
      let cancels: ScheduleModifierSpan<boolean>[] = this.cancel.spans();

      if (cancels.length)
      {
        out += ' with cancellations on ';
        out += this.describeArray( cancels, x => x.span.summary(Units.DAY) );
      }
    }

    return out;
  }

  /**
   * Describes the given frequency.
   *
   * @param value The frequency to describe.
   * @param unit The unit of the frequency.
   * @param map How the values in the frequency should be described.
   * @param everyOffset A value to add to a [[FrequencyValueEvery]] offset to
   *    account for zero-based values that should be shifted for human
   *    friendliness.
   * @param the If the word 'the' should be used to describe the unit.
   * @param on The word which preceeds values of the given unit.
   * @param required If the description should always return a non-empty string
   *    even if the frequency was not specified in the original input.
   * @returns A string description of the frequency.
   */
  private describeRule(value: FrequencyValue, unit: string, map: (x: number) => any, everyOffset: number = 0, the: boolean = true, on: string = ' on ', required: boolean = false): string
  {
    let out: string = '';
    let suffix: string = the ? ' ' + unit : '';

    if (fn.isFrequencyValueEvery(value))
    {
      let valueEvery: FrequencyValueEvery = <FrequencyValueEvery>value;

      out += ' every ' + Suffix.CACHE[ valueEvery.every ] + ' ' + unit;

      if (valueEvery.offset)
      {
        out += ' starting at ' + map( valueEvery.offset + everyOffset ) + suffix;
      }
    }
    else if (fn.isFrequencyValueOneOf(value))
    {
      let valueOne: FrequencyValueOneOf = <FrequencyValueOneOf>value;

      if (valueOne.length)
      {
        out += on + (the ? 'the ' : '');
        out += this.describeArray( valueOne, map );
        out += suffix;
      }
    }
    else if (required)
    {
      out +=  on + 'any ' + unit;
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
    let out: string = '';
    let last: number = array.length - 1;

    out += map( array[ 0 ] );

    for (let i = 1; i < last; i++)
    {
      out += ', ' + map( array[ i ] );
    }

    if (last > 0)
    {
      out += ' and ' + map( array[ last ] );
    }

    return out;
  }

}
