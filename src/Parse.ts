
import { Functions as fn } from './Functions';
import { FrequencyCheck } from './Types';
import { Schedule, ScheduleInput, ScheduleExclusions } from './Schedule';
import { Constants } from './Constants';
import { Day, DayInput, DurationInput } from './Day';
import { CalendarScheduleInput, CalendarSchedule } from './Calendar';
import { Time } from './Time';


/**
 * The class which takes user input and parses it to specific structures.
 */
export class Parse
{

  public static frequency(input: any, otherwiseEvery: number = 1, otherwiseOffset: number = 0): FrequencyCheck
  {
    let check: FrequencyCheck = (value: number) => {
      return value % otherwiseEvery === otherwiseOffset;
    };

    if (fn.isFrequencyValueEvery(input))
    {
      let offset: number = input.offset || 0;
      let every: number = input.every;

      check = (value: number) => {
        return value % every === offset;
      };
    }

    if (fn.isFrequencyValueOneOf(input))
    {
      let map: object = {};

      for (let i = 0; i < input.length; i++) {
        map[ input[ i ] ] = true;
      }

      check = (value: number) => {
        return !!map[ value ];
      };
    }

    check.input = input;

    return check;
  }

  public static utc(input: any, otherwise: number): number
  {
    if (fn.isNumber(input))
    {
      return input;
    }

    if (input instanceof Day)
    {
      return input.time;
    }

    return otherwise;
  }

  public static day(input: DayInput): Day
  {
    if (fn.isNumber(input))
    {
      return Day.unix( <number>input );
    }
    else if (fn.isString(input))
    {
      return Day.parse( input );
    }
    else if (input instanceof Day)
    {
      return input;
    }
    else if (fn.isArray( input ))
    {
      return Day.fromArray( <number[]>input );
    }
    else if (fn.isObject( input ))
    {
      return Day.fromObject( <object>input );
    }
    else if (input === true)
    {
      return Day.today();
    }

    return null;
  }

  public static time(input: any): Time
  {
    if (fn.isNumber(input))
    {
      return Time.fromIdentifier( <number>input );
    }
    if (fn.isString(input))
    {
      return Time.fromString( <string>input );
    }
    if (fn.isObject(input) && fn.isNumber(input.hour))
    {
      return new Time(input.hour, input.minute, input.second, input.millisecond);
    }

    return null;
  }

  public static times(input: any): Time[]
  {
    let times: Time[] = [];

    if (fn.isArray(input))
    {
      for (let timeInput of input)
      {
        let time = this.time( timeInput );

        if (time)
        {
          times.push( time );
        }
      }
    }

    return times;
  }

  public static exclusions(input: any): ScheduleExclusions
  {
    let exclusions: ScheduleExclusions = {};

    if (fn.isArray(input))
    {
      for (let dayIdentifier of input)
      {
        if (fn.isNumber(dayIdentifier))
        {
          exclusions[ dayIdentifier ] = true;
        }
        else
        {
          let day: Day = this.day( dayIdentifier );

          if (day)
          {
            exclusions[ day.dayIdentifier ] = true;
          }
        }
      }
    }

    return exclusions;
  }

  public static schedule(input: ScheduleInput, out: Schedule = new Schedule()): Schedule
  {
    let on = this.day( input.on );

    if (on)
    {
      input.start = on.start();
      input.end = on.end();
      input.year = [on.year];
      input.month = [on.month];
      input.dayOfMonth = [on.dayOfMonth];
    }

    out.duration = fn.coalesce( input.duration, Constants.DURATION_NONE );
    out.durationUnit = <DurationInput>fn.coalesce( input.durationUnit, Constants.DURATION_DEFAULT_UNIT );
    out.start = this.day( input.start );
    out.end = this.day( input.end );
    out.endWithDuration = out.end ? out.end.add(out.duration, out.durationUnit) : null;
    out.dayOfWeek = this.frequency( input.dayOfWeek );
    out.dayOfMonth = this.frequency( input.dayOfMonth );
    out.dayOfYear = this.frequency( input.dayOfYear );
    out.month = this.frequency( input.month );
    out.week = this.frequency( input.week );
    out.weekOfYear = this.frequency( input.weekOfYear );
    out.weekspanOfYear = this.frequency( input.weekspanOfYear );
    out.fullWeekOfYear = this.frequency( input.fullWeekOfYear );
    out.weekOfMonth = this.frequency( input.weekOfMonth );
    out.weekspanOfMonth = this.frequency( input.weekspanOfMonth );
    out.fullWeekOfMonth = this.frequency( input.fullWeekOfMonth );
    out.year = this.frequency( input.year );
    out.times = this.times( input.times );
    out.exclude = this.exclusions( input.exclude );
    out.updateDurationInDays();

    return out;
  }

  public static calendarSchedule<T>(input: CalendarScheduleInput<T>): CalendarSchedule<T>
  {
    if (input.schedule instanceof Schedule)
    {
      return <CalendarSchedule<T>>input;
    }

    return {
      schedule: this.schedule( input.schedule ),
      event: input.event
    };
  }

  public static cron(pattern: string, out: Schedule = new Schedule()): Schedule
  {
    return out;
  }

}
