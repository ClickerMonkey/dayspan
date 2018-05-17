
import { Functions as fn } from './Functions';
import { FrequencyValue, FrequencyCheck } from './Types';
import { Day } from './Day';
import { DaySpan } from './DaySpan';
import { Constants } from './Constants';
import { Parse } from './Parse';


export interface ScheduleInput
{
  start?: number | Day;
  end?: number | Day;
  on?: number | Day;
  duration?: number;
  exclude?: number[];
  minute?: FrequencyValue;
  hour?: FrequencyValue;
  month?: FrequencyValue;
  year?: FrequencyValue;
  week?: FrequencyValue;
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

  public start: number;
  public end: number;
  public duration: number;
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
  public hour: FrequencyCheck;
  public minute: number;
  public hours: number[];

  public constructor(input?: ScheduleInput)
  {
    if (fn.isDefined(input))
    {
      this.set(input);
    }
  }

  public set(input: ScheduleInput): this
  {
    Parse.schedule(input, this);

    return this;
  }

  public refreshHours(): this
  {
    let hours: number[] = [];

    for (let i = Constants.HOUR_MIN; i <= Constants.HOUR_MAX; i++)
    {
      if (this.hour( i ))
      {
        hours.push( i );
      }
    }

    hours.sort();

    this.hours = hours;

    return this;
  }

  public matchesSpan(day: Day): boolean
  {
    return (this.start === Constants.START_NONE || day.time >= this.start) &&
      (this.end === Constants.END_NONE || day.time < this.end + this.duration);
  }

  public matchesRange(start: Day, end: Day): boolean
  {
    return (this.start === Constants.START_NONE || start.time <= this.start) &&
      (this.end === Constants.END_NONE || end.time < this.end + this.duration);
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
    let before: number = this.durationInDays();

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

  public durationInDays(): number
  {
    let lastHour: number = this.hours[ this.hours.length - 1 ];
    let durationEnd: number = lastHour * Constants.MILLIS_IN_HOUR + this.duration;
    let durationPast: number = durationEnd - Constants.MILLIS_IN_DAY;

    return Math.max( 0, Math.ceil( durationPast / Constants.MILLIS_IN_DAY ) );
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
    return this.matchesDay( day ) &&
      this.hour( day.hour ) &&
      day.minute === this.minute;
  }

  public isFullDay(): boolean
  {
    return !this.hour.input || this.duration === Constants.DURATION_NONE;
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
      let behind: number = this.durationInDays();

      while (behind >= 0)
      {
        if (this.matchesDay(day))
        {
          for (let hour of this.hours)
          {
            let hourStart: Day = day.withTime(hour, this.minute);
            let hourEnd: Day = hourStart.relative(this.duration);
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
      let behind: number = this.durationInDays();

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
      for (let hour of this.hours)
      {
        let hourStart: Day = day.withTime(hour, this.minute);
        let hourEnd: Day = hourStart.relative(this.duration);
        let hourSpan: DaySpan = new DaySpan( hourStart, hourEnd );

        spans.push(hourSpan);
      }
    }

    return spans;
  }

}
