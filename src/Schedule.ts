
import { Functions as fn } from './Functions';
import { FrequencyValue, FrequencyCheck, FrequencyValueEvery, FrequencyValueOneOf } from './Types';
import { Day, DayInput, DurationInput } from './Day';
import { DaySpan } from './DaySpan';
import { Constants } from './Constants';
import { Parse } from './Parse';
import { Time, TimeInput } from './Time';
import { Suffix } from './Suffix';
// @ts-ignore
import * as moment from 'moment';


export interface ScheduleInput
{
  start?: DayInput;
  end?: DayInput;
  on?: DayInput;
  duration?: number;
  durationUnit?: DurationInput;
  exclude?: DayInput[];
  month?: FrequencyValue;
  year?: FrequencyValue;
  week?: FrequencyValue;
  times?: TimeInput[];
  dayOfWeek?: FrequencyValue;
  dayOfMonth?: FrequencyValue;
  dayOfYear?: FrequencyValue;
  weekOfYear?: FrequencyValue;
  weekspanOfYear?: FrequencyValue;
  fullWeekOfYear?: FrequencyValue;
  weekOfMonth?: FrequencyValue;
  weekspanOfMonth?: FrequencyValue;
  fullWeekOfMonth?: FrequencyValue;
}

export type ScheduleExclusions = { [dayIdentifier: number]: boolean };


export class Schedule
{

  public start: Day;
  public end: Day;
  public endWithDuration: Day;
  public duration: number;
  public durationUnit: DurationInput;
  public times: Time[];
  public durationInDays: number;
  public exclude: ScheduleExclusions;
  public dayOfWeek: FrequencyCheck;
  public dayOfMonth: FrequencyCheck;
  public dayOfYear: FrequencyCheck;
  public month: FrequencyCheck;
  public week: FrequencyCheck;
  public weekOfYear: FrequencyCheck;
  public weekspanOfYear: FrequencyCheck;
  public fullWeekOfYear: FrequencyCheck;
  public weekOfMonth: FrequencyCheck;
  public weekspanOfMonth: FrequencyCheck;
  public fullWeekOfMonth: FrequencyCheck;
  public year: FrequencyCheck;

  public constructor(input?: ScheduleInput)
  {
    if (fn.isDefined(input))
    {
      this.set(input);
    }
  }

  public get lastTime(): Time
  {
    return this.times[ this.times.length - 1 ];
  }

  public set(input: ScheduleInput): this
  {
    Parse.schedule(input, this);

    return this;
  }

  public updateDurationInDays(): this
  {
    this.durationInDays = !this.lastTime ? 0 : Math.max(0,
      Math.ceil(
        moment.duration(this.lastTime.toMilliseconds(), 'milliseconds')
          .add(this.duration, this.durationUnit)
          .subtract(1, 'day')
          .asDays()
      )
    );

    return this;
  }

  public matchesSpan(day: Day): boolean
  {
    return (this.start === null || day.isSameOrAfter(this.start)) &&
      (this.end === null || day.isBefore(this.endWithDuration));
  }

  public matchesRange(start: Day, end: Day): boolean
  {
    return (this.start === null || start.isSameOrBefore(this.start)) &&
      (this.end === null || end.isBefore(this.endWithDuration));
  }

  public isExcluded(day: Day): boolean
  {
    return !!this.exclude[ day.dayIdentifier ];
  }

  public isIncluded(day: Day): boolean
  {
    return !this.exclude[ day.dayIdentifier ];
  }

  public matchesDay(day: Day): boolean
  {
    return this.isIncluded( day ) &&
      this.matchesSpan( day ) &&
      this.dayOfWeek( day.dayOfWeek ) &&
      this.dayOfMonth( day.dayOfMonth ) &&
      this.dayOfYear( day.dayOfYear ) &&
      this.year( day.year ) &&
      this.month( day.month ) &&
      this.week( day.week ) &&
      this.weekOfYear( day.weekOfYear ) &&
      this.weekspanOfYear( day.weekspanOfYear ) &&
      this.fullWeekOfYear( day.fullWeekOfYear ) &&
      this.weekOfMonth( day.weekOfMonth ) &&
      this.weekspanOfMonth( day.weekspanOfMonth ) &&
      this.fullWeekOfMonth( day.fullWeekOfMonth );
  }

  /**
   * Determines if the given day is covered by this schedule. A schedule can
   * specify events that span multiple days - so even though the day does not
   * match the starting day of a span - it can be a day that is within the
   * schedule.
   *
   * @param day The day to test.
   * @param
   */
  public coversDay(day: Day): boolean
  {
    let before: number = this.durationInDays;

    while (before >= 0)
    {
      if (this.matchesDay(day))
      {
        return true;
      }

      day = day.prev();
      before--;
    }

    return false;
  }

  public nextDay(day: Day, includeDay: boolean = false, lookAhead: number = 366): Day
  {
    let next: Day = null;

    this.iterateDays(day, 1, true, d => next = d, includeDay, lookAhead);

    return next;
  }

  public nextDays(day: Day, max: number, includeDay: boolean = false, lookAhead: number = 366): Day[]
  {
    let nexts: Day[] = [];

    this.iterateDays(day, max, true, d => nexts.push(d), includeDay, lookAhead);

    return nexts;
  }

  public prevDay(day: Day, includeDay: boolean = false, lookBack: number = 366): Day
  {
    let prev: Day = null;

    this.iterateDays(day, 1, false, d => prev = d, includeDay, lookBack);

    return prev;
  }

  public prevDays(day: Day, max: number, includeDay: boolean = false, lookBack: number = 366): Day[]
  {
    let prevs: Day[] = [];

    this.iterateDays(day, max, false, d => prevs.push(d), includeDay, lookBack);

    return prevs;
  }

  public iterateDays(day: Day, max: number, next: boolean, onDay: (day: Day) => any, includeDay: boolean = false, lookup: number = 366): this
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

  public isFullDay(): boolean
  {
    return this.times.length === 0 || this.duration === Constants.DURATION_NONE;
  }

  public getSpansOver(day: Day): DaySpan[]
  {
    let spans: DaySpan[] = [];
    let start: Day = day.start();

    if (this.isFullDay())
    {
      if (this.matchesDay(day))
      {
        spans.push(DaySpan.point(start));
      }
    }
    else
    {
      let behind: number = this.durationInDays;

      while (behind >= 0)
      {
        if (this.matchesDay(day))
        {
          for (let time of this.times)
          {
            let hourStart: Day = day.withTime(time);
            let hourEnd: Day = hourStart.add(this.duration, this.durationUnit);
            let hourSpan: DaySpan = new DaySpan( hourStart, hourEnd );

            if (hourSpan.matchesDay(start))
            {
              spans.push( hourSpan );
            }
          }
        }

        day = day.prev();
        behind--;
      }
    }
    return spans;
  }

  public getSpanOver(day: Day): DaySpan
  {
    let start: Day = day.start();

    if (this.isFullDay())
    {
      return DaySpan.point(start);
    }
    else
    {
      let behind: number = this.durationInDays;

      while (behind >= 0)
      {
        if (this.matchesDay(day))
        {
          return DaySpan.point(day);
        }

        day = day.prev();
        behind--;
      }
    }

    return null;
  }

  public getSpansOn(day: Day, check: boolean = false): DaySpan[]
  {
    let spans: DaySpan[] = [];

    if (check && !this.matchesDay(day))
    {
      return spans;
    }

    let start: Day = day.start();

    if (this.isFullDay())
    {
      spans.push(DaySpan.point(start));
    }
    else
    {
      for (let time of this.times)
      {
        let hourStart: Day = day.withTime(time);
        let hourEnd: Day = hourStart.add(this.duration, this.durationUnit);
        let hourSpan: DaySpan = new DaySpan( hourStart, hourEnd );

        spans.push(hourSpan);
      }
    }

    return spans;
  }

  public getExclusions(returnDays: boolean = true)
  {
    let exclusions: DayInput[] = [];

    for (let dayIdentifierKey in this.exclude)
    {
      let dayIdentifier: number = parseInt(dayIdentifierKey);

      exclusions.push( returnDays ? Day.fromDayIdentifier(dayIdentifier)  : dayIdentifier );
    }

    return exclusions;
  }

  public toInput(returnDays: boolean = false, returnTimes: boolean = false, timeFormat: string = ''): ScheduleInput
  {
    let out: ScheduleInput = {};
    let exclusions: DayInput[] = this.getExclusions( returnDays );
    let times: TimeInput[]  = [];

    for (let time of this.times)
    {
      times.push( returnTimes ? time : (timeFormat ? time.format( timeFormat ) : time.toString()) );
    }

    if (this.start) out.start = returnDays ? this.start : this.start.time;
    if (this.end) out.end = returnDays ? this.end : this.end.time;
    if (this.duration !== Constants.DURATION_NONE) out.duration = this.duration;
    if (this.durationUnit !== Constants.DURATION_DEFAULT_UNIT) out.durationUnit = this.durationUnit;
    if (this.dayOfWeek.input) out.dayOfWeek = this.dayOfWeek.input;
    if (this.dayOfMonth.input) out.dayOfMonth = this.dayOfMonth.input;
    if (this.dayOfYear.input) out.dayOfYear = this.dayOfYear.input;
    if (this.month.input) out.month = this.month.input;
    if (this.week.input) out.week = this.week.input;
    if (this.weekOfYear.input) out.weekOfYear = this.weekOfYear.input;
    if (this.weekspanOfYear.input) out.weekspanOfYear = this.weekspanOfYear.input;
    if (this.fullWeekOfYear.input) out.fullWeekOfYear = this.fullWeekOfYear.input;
    if (this.weekOfMonth.input) out.weekOfMonth = this.weekOfMonth.input;
    if (this.weekspanOfMonth.input) out.weekspanOfMonth = this.weekspanOfMonth.input;
    if (this.fullWeekOfMonth.input) out.fullWeekOfMonth = this.fullWeekOfMonth.input;
    if (this.year.input) out.year = this.year.input;
    if (times.length) out.times = times;
    if (exclusions.length) out.exclude = exclusions;

    return out;
  }

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
    out += this.describeRule( this.dayOfMonth.input, 'day of the month', x => Suffix.CACHE[x] );
    out += this.describeRule( this.dayOfYear.input, 'day of the year', x => Suffix.CACHE[x], 1 );
    out += this.describeRule( this.month.input, 'month', x => moment.months()[x], 0, false, ' in ' );
    out += this.describeRule( this.weekOfYear.input, 'week of the year', x => Suffix.CACHE[x] );
    out += this.describeRule( this.weekspanOfYear.input, 'weekspan of the year', x => Suffix.CACHE[x + 1], 1 );
    out += this.describeRule( this.fullWeekOfYear.input, 'full week of the year', x => Suffix.CACHE[x] );
    out += this.describeRule( this.weekOfMonth.input, 'week of the month', x => Suffix.CACHE[x] );
    out += this.describeRule( this.fullWeekOfMonth.input, 'full week of the month', x => Suffix.CACHE[x] );
    out += this.describeRule( this.weekspanOfMonth.input, 'weekspan of the month', x => Suffix.CACHE[x + 1], 1 );
    out += this.describeRule( this.year.input, 'year', x => x, 0, false, ' in ' );

    if (includeTimes && this.times.length)
    {
      out += ' at ';
      out += this.describeArray( this.times, x => x.format('hh:mm a') );
    }

    if (includeDuration && this.duration !== Constants.DURATION_NONE)
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
