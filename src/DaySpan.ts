
import { Day } from './Day';


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
    return day.time >= this.start.time && day.time < this.end.time;
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

  public days(partialDays: boolean = true, absolute: boolean = true, round: boolean = true): number {
    return this.start.daysBetween(this.end, partialDays, absolute, round);
  }

  public hours(partialHours: boolean = true, absolute: boolean = true, round: boolean = true): number {
    return this.start.hoursBetween(this.end, partialHours, absolute, round);
  }

  public weeks(partialWeeks: boolean = true, absolute: boolean = true, round: boolean = true): number {
    return this.start.weeksBetween(this.end, partialWeeks, absolute, round);
  }

  public intersects(span: DaySpan): boolean {
    return !(
      this.end.time < span.start.time ||
      this.start.time >= span.end.time
    );
  }

  public intersection(span: DaySpan): DaySpan {
    let start: number = Math.max(this.start.time, span.start.time);
    let end: number = Math.min(this.end.time, span.end.time);

    return start >= end ? null : new DaySpan(Day.utc(start), Day.utc(end));
  }

  public static point(day: Day): DaySpan {
    return new DaySpan( day, day );
  }

}
