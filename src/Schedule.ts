
import { Functions as fn } from './Functions';
import { FrequencyValue, FrequencyCheck } from './Types';
import { Day, DayInput, DurationInput } from './Day';
import { DaySpan } from './DaySpan';
import { Constants } from './Constants';
import { Parse } from './Parse';
import { Time, TimeInput } from './Time';
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

  public nextDay(day: Day, lookAhead: number = 366): Day
  {
    for (let days = 0; days < lookAhead; days++)
    {
      day = day.next();

      if (this.matchesDay(day))
      {
        return day;
      }
    }

    return null;
  }

  public prevDay(day: Day, lookBack: number = 366): Day
  {
    for (let days = 0; days < lookBack; days++)
    {
      day = day.prev();

      if (this.matchesDay(day))
      {
        return day;
      }
    }

    return null;
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

  public toInput(returnDays: boolean = false): ScheduleInput
  {
    let out: ScheduleInput = {};
    let exclusions: DayInput[] = [];
    let times: TimeInput[]  = [];

    for (let dayIdentifierKey in this.exclude)
    {
      let dayIdentifier: number = parseInt(dayIdentifierKey);

      exclusions.push( returnDays ? Day.fromDayIdentifier(dayIdentifier)  : dayIdentifier );
    }

    for (let time of this.times)
    {
      times.push( time.toString() );
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

}
