
import { Functions as fn } from './Functions';
import { FrequencyValue, FrequencyCheck, FrequencyValueEvery, FrequencyValueOneOf } from './Frequency';
import { Day, DayInput, DayIterator, DurationInput } from './Day';
import { DaySpan } from './DaySpan';
import { Constants } from './Constants';
import { Parse } from './Parse';
import { Time, TimeInput } from './Time';
import { Suffix } from './Suffix';

// @ts-ignore
import * as moment from 'moment';


/**
 * Input given by a user which describes an event schedule.
 */
export interface ScheduleInput
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
   * An array of days which should be excluded from the schedule.
   *
   * @see [[Schedule.exclude]]
   */
  exclude?: DayInput[];

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
}


/**
 * A map of excluded days where the key is the [[Day.dayIdentifier]] and the
 * value is `true`.
 */
export type ScheduleExclusions = { [dayIdentifier: number]: boolean };


/**
 * A class which describes when an event occurs over what time and if it repeats.
 */
export class Schedule
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
   * A map of excluded days where the key is [[Day.dayIdentifier]] and the value
   * is `true` unless otherwise overriden.
   */
  public exclude: ScheduleExclusions;

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
  public constructor(input?: ScheduleInput)
  {
    if (fn.isDefined(input))
    {
      this.set(input);
    }
  }

  /**
   * Sets the schedule with the given input.
   *
   * @param input The input which describes the schedule of events.
   * @see [[Parse.schedule]]
   */
  public set(input: ScheduleInput): this
  {
    Parse.schedule(input, this);

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
    return (this.start === null || start.isSameOrBefore(this.start)) &&
      (this.end === null || end.isBefore(this.end));
  }

  /**
   * Determines whether the given day is explicitly excluded in the schedule.
   *
   * @param day The day to test.
   * @returns `true` if the day was excluded, otherwise `false`.
   */
  public isExcluded(day: Day): boolean
  {
    return !!this.exclude[ day.dayIdentifier ];
  }

  /**
   * Determines whether the given day is NOT explicitly excluded in the schedule.
   *
   * @param day The day to test.
   * @returns `true` if the day is NOT explicitly excluded, otherwise `false`.
   */
  public isIncluded(day: Day): boolean
  {
    return !this.exclude[ day.dayIdentifier ];
  }

  /**
   * Determines whether the given day is a day on the schedule for the start
   * of an event. If an event is more than one day and the day given is not the
   * start this may return `false`.
   *
   * @param day The day to test.
   * @returns `true` if the day marks the start of an event on the schedule.
   * @see [[Schedule.isExcluded]]
   * @see [[Schedule.matchesSpan]]
   */
  public matchesDay(day: Day): boolean
  {
    if (this.isExcluded( day ) || !this.matchesSpan( day ))
    {
      return false;
    }

    for (let check of this.checks)
    {
      if (!check( day[ check.property ] ))
      {
        return false;
      }
    }

    return true;
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
    return !!this.findStartingDay( day );
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
    let next: Day = null;
    let setNext: DayIterator = d => {
      next = d;
      return false;
    };

    this.iterateDays(day, 1, true, setNext, includeDay, lookAhead);

    return next;
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
    let nexts: Day[] = [];

    this.iterateDays(day, max, true, d => nexts.push(d), includeDay, lookAhead);

    return nexts;
  }

  /**
   * Finds the previous day an event occurs on the schedule given a day to start,
   * optionally including it, and a maximum number of days to look behind.
   *
   * @param day The day to start to search from.
   * @param includeDay If the given day should be included in the search.
   * @param lookAhead The maximum number of days to look behind from the given
   *     day for event occurrences.
   * @returns The previous day on the schedule or `null` if none exists.
   */
  public prevDay(day: Day, includeDay: boolean = false, lookBack: number = 366): Day
  {
    let prev: Day = null;
    let setPrev: DayIterator = d => {
      prev = d;
      return false;
    };

    this.iterateDays(day, 1, false, setPrev, includeDay, lookBack);

    return prev;
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
    let prevs: Day[] = [];

    this.iterateDays(day, max, false, d => prevs.push(d), includeDay, lookBack);

    return prevs;
  }

  /**
   * Iterates over days that events start in the schedule given a day to start,
   * a maximum number of days to find, and a direction to look.
   *
   * @param day The day to start to search from.
   * @param max The maximum number of times to invoke the `onDay` callback.
   * @param next If `true` this searches forward, otherwise `false` is backwards.
   * @param onDay A function to invoke for each matching day found. If this
   *    function returns `false` the iteration stops immediately.
   * @param includeDay If the given day should be included in the search.
   * @param lookup The maximum number of days to look through from the given
   *     day for event occurrences.
   * @see [[Schedule.matchesDay]]
   */
  public iterateDays(day: Day, max: number, next: boolean, onDay: DayIterator, includeDay: boolean = false, lookup: number = 366): this
  {
    let iterated: number = 0;

    for (let days = 0; days < lookup; days++)
    {
      if (!includeDay || days > 0)
      {
        day = next ? day.next() : day.prev();
      }

      if (this.matchesDay(day))
      {
        if (onDay( day ) === false)
        {
          break;
        }

        if (++iterated >= max)
        {
          break;
        }
      }
    }

    return this;
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
    if (!this.matchesDay( day ))
    {
      return false;
    }

    for (let time of this.times)
    {
      if (day.sameTime(time))
      {
        return true;
      }
    }

    return false;
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
    let start: Day = this.findStartingDay(day);

    if (!start)
    {
      return false;
    }

    if (this.isFullDay())
    {
      return this.getFullSpan(start).contains(day);
    }
    else
    {
      for (let time of this.times)
      {
        if (this.getTimeSpan(start, time).contains(day))
        {
          return true;
        }
      }
    }

    return false;
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
   * Returns an array of spans of times that cover the the given day taking into
   * account multi-day events. This does not check if the day is even on the
   * schedule, it assumes it was already passed to [[Schedule.coversDay]] and it
   * returned `true`.
   *
   * @param day The day to return spans over.
   * @returns An array of spans for each event occurrence over the given day.
   */
  public getSpansOver(day: Day): DaySpan[]
  {
    let spans: DaySpan[] = [];
    let start: Day = this.findStartingDay( day );

    if (!start)
    {
      return spans;
    }

    if (this.isFullDay())
    {
      spans.push(this.getFullSpan(start));
    }
    else
    {
      for (let time of this.times)
      {
        let span: DaySpan = this.getTimeSpan( start, time );

        if (span.matchesDay(day))
        {
          spans.push( span );
        }
      }
    }

    return spans;
  }

  /**
   * Returns a span of time over the given day. This does not check if the day
   * is even on the schedule, it assumes it was already passed to
   * [[Schedule.coversDay]] and it returned `true`.
   *
   * @param day The day to return a span over.
   * @returns A span over the given day.
   */
  public getSpanOver(day: Day): DaySpan
  {
    let start: Day = this.findStartingDay( day );

    return start ? this.getFullSpan( start ) : null;
  }

  /**
   * Returns an array of spans of times that start on the given day. This can
   * optionally check to see if th day is on the schedule, or just assume the
   * day is.
   *
   * @param day The day to return a span that starts on.
   * @param check When `true` [[Schedule.matchesDay]] is passed the given day
   *    and an empty array is returned if the day is not on the schedule.
   *    Otherwise its assumed the given day is on the schedule.
   * @returns An array of spans for each event occurrence that start on the
   *    given day.
   */
  public getSpansOn(day: Day, check: boolean = false): DaySpan[]
  {
    let spans: DaySpan[] = [];

    if (check && !this.matchesDay(day))
    {
      return spans;
    }

    if (this.isFullDay())
    {
      spans.push(this.getFullSpan( day ));
    }
    else
    {
      for (let time of this.times)
      {
        spans.push(this.getTimeSpan( day, time ));
      }
    }

    return spans;
  }

  /**
   * If the given day potentially overlaps an event occurrence on the schedule
   * this will find the day when the event occurrence starts.
   *
   * @param day The day to check against the schedule for a starting day.
   * @returns The day that is a start of an event that potentially overlaps
   *    the given day.
   */
  public findStartingDay(day: Day): Day
  {
    let behind: number = this.durationInDays;

    while (behind >= 0)
    {
      if (this.matchesDay(day))
      {
        return day;
      }

      day = day.prev();
      behind--;
    }

    return null;
  }

  /**
   * Converts the map of exclusions to an array of [[Day]] instances or
   * [[Day.dayIdentifier]]s.
   *
   * @param returnDays When `true` [[Day]] instances are returned, otherwise
   *    [[Day.dayIdentifier]]s are returned.
   * @return THe array of excluded days or an empty array if none are excluded.
   */
  public getExclusions(returnDays: boolean = true): DayInput[]
  {
    let exclusions: DayInput[] = [];

    for (let dayIdentifierKey in this.exclude)
    {
      let dayIdentifier: number = parseInt(dayIdentifierKey);

      exclusions.push( returnDays ? Day.fromDayIdentifier(dayIdentifier)  : dayIdentifier );
    }

    return exclusions;
  }

  /**
   * Converts the schedule instance back into input.
   *
   * @param returnDays When `true` the start, end, and array of exclusions will
   *    have [[Day]] instances, otherwise the UNIX timestamp and dayIdentifiers
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
  public toInput(returnDays: boolean = false, returnTimes: boolean = false, timeFormat: string = '', alwaysDuration: boolean = false): ScheduleInput
  {
    let defaultUnit: string = Constants.DURATION_DEFAULT_UNIT( this.isFullDay() );
    let out: ScheduleInput = {};
    let exclusions: DayInput[] = this.getExclusions( returnDays );
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
   * @param includeExcludes When `true` the [[Schedule.exclusions]] are added
   *    to the description if there are any.
   * @returns The descroption of the schedule.
   */
  public describe(thing: string = 'event',
    includeRange: boolean = true,
    includeTimes: boolean = true,
    includeDuration: boolean = false,
    includeExcludes: boolean = false): string
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
      let excludes: Day[] = <Day[]>this.getExclusions( true );

      if (excludes.length)
      {
        out += ' excluding ';
        out += this.describeArray( excludes, x => x.format('MM/DD/YYYY') );
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
