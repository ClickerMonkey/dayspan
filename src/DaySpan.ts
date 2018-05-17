
import { Day } from './Day';
import { Op } from './Op';
import { Units } from './Units';


export class DaySpan {

  public start: Day;
  public end: Day;

  public constructor(start: Day, end: Day) {
    this.start = start;
    this.end = end;
  }

  public get isPoint(): boolean {
    return this.start.time === this.end.time;
  }

  public contains(day: Day): boolean {
    return day.time >= this.start.time && day.time <= this.end.time;
  }

  public matchesDay(day: Day): boolean {
    return this.contains( day ) || day.sameDay( this.start ) || day.sameDay( this.end );
  }

  public matchesWeek(day: Day): boolean {
    return this.contains( day ) || day.sameWeek( this.start ) || day.sameWeek( this.end );
  }

  public matchesMonth(day: Day): boolean {
    return this.contains( day ) || day.sameMonth( this.start ) || day.sameMonth( this.end );
  }

  public matchesYear(day: Day): boolean {
    return this.contains( day ) || day.sameYear( this.start ) || day.sameYear( this.end );
  }


  public millis(op: Op = Op.DOWN, absolute: boolean = true): number {
    return this.start.millisBetween(this.end, op, absolute);
  }

  public seconds(op: Op = Op.DOWN, absolute: boolean = true): number {
    return this.start.secondsBetween(this.end, op, absolute);
  }

  public minutes(op: Op = Op.DOWN, absolute: boolean = true): number {
    return this.start.minutesBetween(this.end, op, absolute);
  }

  public hours(op: Op = Op.DOWN, absolute: boolean = true): number {
    return this.start.hoursBetween(this.end, op, absolute);
  }

  public days(op: Op = Op.DOWN, absolute: boolean = true): number {
    return this.start.daysBetween(this.end, op, absolute);
  }

  public weeks(op: Op = Op.DOWN, absolute: boolean = true): number {
    return this.start.weeksBetween(this.end, op, absolute);
  }

  public months(op: Op = Op.DOWN, absolute: boolean = true): number {
    return this.start.monthsBetween(this.end, op, absolute);
  }

  public years(op: Op = Op.DOWN, absolute: boolean = true): number {
    return this.start.yearsBetween(this.end, op, absolute);
  }

  public summary(type: Units, dayOfWeek: boolean = true, short: boolean = false, repeat: boolean = false, contextual: boolean = true, delimiter: string = ' - '): string
  {
    let formats = DaySpan.SUMMARY_FORMATS[ type ];
    let today: Day = Day.today();
    let showStartYear: boolean = !contextual || !this.start.sameYear( today );
    let showEndYear: boolean = !contextual || !this.end.sameYear( today );
    let start: string = this.start.format( formats(short, dayOfWeek, showStartYear) );
    let end: string = this.end.format( formats(short, dayOfWeek, showEndYear) );
    let summary: string = start;

    if (start !== end)
    {
      if (!repeat)
      {
        summary = this.start.format( formats(short, dayOfWeek, !this.start.sameYear(this.end)) );
      }

      summary += delimiter;
      summary += end;
    }
    else
    {
      summary = start;
    }

    return summary;
  }

  public intersects(span: DaySpan): boolean {
    return !(
      this.end.time < span.start.time ||
      this.start.time > span.end.time
    );
  }

  public intersection(span: DaySpan): DaySpan {
    let start: number = Math.max(this.start.time, span.start.time);
    let end: number = Math.min(this.end.time, span.end.time);

    return start >= end ? null : new DaySpan(Day.unix(start), Day.unix(end));
  }

  public static point(day: Day): DaySpan {
    return new DaySpan( day, day );
  }


  public static SUMMARY_FORMATS =
  {
    [Units.DAY]: (short: boolean, dayOfWeek: boolean, year: boolean) => {
      return (dayOfWeek ? (short ? 'ddd, ' : 'dddd, ') : '') + (short ? 'MMM ' : 'MMMM ') + 'Do' + (year ? ' YYYY' : '');
    },
    [Units.WEEK]: (short: boolean, dayOfWeek: boolean, year: boolean) => {
      return (dayOfWeek ? (short ? 'ddd, ' : 'dddd, ') : '') + (short ? 'MMM ' : 'MMMM ') + 'Do' + (year ? ' YYYY' : '');
    },
    [Units.MONTH]: (short: boolean, dayOfWeek: boolean, year: boolean) => {
      return (short ? 'MMM' : 'MMMM') + (year ? ' YYYY' : '');
    },
    [Units.YEAR]: (short: boolean, dayOfWeek: boolean, year: boolean) => {
      return (year ? 'YYYY' : '');
    }
  };

}
