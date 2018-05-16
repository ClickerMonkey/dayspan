
import { Day } from './Day';
import { DaySpan } from './DaySpan';
import { Schedule } from './Schedule';
import { Op } from './Op';


export type CalendarMover = (day: Day, amount: number) => Day;

export enum CalendarType
{
  DAY,
  WEEK,
  MONTH,
  YEAR
}

export class CalendarDay<T> extends Day
{

  public currentDay: boolean;
  public currentWeek: boolean;
  public currentMonth: boolean;
  public currentYear: boolean;
  public selectedDay: boolean;
  public selectedWeek: boolean;
  public selectedMonth: boolean;
  public selectedYear: boolean;
  public inCalendar: boolean;
  public events: CalendarEvent<T>[] = [];

  public updateCurrent(current: Day): this
  {
    this.currentDay = this.sameDay(current);
    this.currentWeek = this.sameWeek(current);
    this.currentMonth = this.sameMonth(current);
    this.currentYear = this.sameYear(current);

    return this;
  }

  public updateSelected(selected: DaySpan): this
  {
    this.selectedDay = selected.matchesDay(this);
    this.selectedWeek = selected.matchesWeek(this);
    this.selectedMonth = selected.matchesMonth(this);
    this.selectedYear = selected.matchesYear(this);

    return this;
  }

  public clearSelected(): this
  {
    this.selectedDay = this.selectedWeek = this.selectedMonth = this.selectedYear = false;
    return this;
  }

}

export class CalendarEvent<T>
{

  public event: T;
  public schedule: Schedule;
  public time: DaySpan;
  public fullDay: boolean;
  public covers: boolean;

  public constructor(event: T, schedule: Schedule, time: DaySpan, actualDay: Day) {
    this.event = event;
    this.schedule = schedule;
    this.time = time;
    this.fullDay = time.isPoint;
    this.covers = time.start.sameDay( actualDay );
  }

}

export interface CalendarSchedule<T>
{
  schedule: Schedule;
  event: T;
}

export type CalendarScheduleInput<T> = CalendarSchedule<T> | Schedule | T;


export class Calendar<T>
{

  public span: DaySpan;
  public filled: DaySpan;
  public length: number;
  public type: CalendarType;
  public size: number;
  public moveStart: CalendarMover;
  public moveEnd: CalendarMover;
  public fill: boolean;

  public repeatCovers: boolean = true;
  public listTimes: boolean = false;
  public eventsOutside: boolean = false;

  public selection: DaySpan = null;
  public days: CalendarDay<T>[] = [];
  public schedules: CalendarSchedule<T>[] = [];

  public constructor(start: Day, end: Day, type: CalendarType, size: number, moveStart: CalendarMover, moveEnd: CalendarMover, fill: boolean)
  {
    this.span = new DaySpan(start, end);
    this.filled = new DaySpan(start, end);
    this.type = type;
    this.size = size;
    this.moveStart = moveStart;
    this.moveEnd = moveEnd;
    this.fill = fill;
    this.refresh();
  }

  public get start(): Day
  {
    return this.span.start;
  }

  public set start(day: Day)
  {
    this.span.start = day;
  }

  public get end(): Day
  {
    return this.span.end;
  }

  public set end(day: Day)
  {
    this.span.end = day;
  }

/*
  public summary(short: boolean, repeat: boolean, contextual: boolean): string
  {
    let start: Day = this.start;
    let end: Day = this.end;

    switch (this.type) {
      case CalendarType.DAY:
        if (this.size === 1) {
          let format: string = short ? ()
        }
        break;
      case CalendarType.WEEK:

        break;
      case CalendarType.MONTH:

        break;
      case CalendarType.YEAR:

        break;
    }
  }
*/

  public split(by: number = 1): Calendar<T>[]
  {
    let split: Calendar<T>[] = [];
    let start: Day = this.start;
    let end: Day = this.moveEnd( this.end, by - this.size );

    for (let i = 0; i < this.size; i++)
    {
      split.push(new Calendar<T>(start, end, this.type, by, this.moveStart, this.moveEnd, this.fill));
      start = this.moveStart( start, by );
      end = this.moveEnd( end, by );
    }

    return split;
  }

  public refresh(today: Day = Day.today()): this
  {
    this.length = this.span.days(Op.UP, true);
    this.resetDays();
    this.refreshCurrent(today);
    this.refreshSelection();
    this.refreshEvents();

    return this;
  }

  public resetFilled(): this
  {
    this.filled.start = this.fill ? this.start.startOfWeek() : this.start;
    this.filled.end = this.fill ? this.end.endOfWeek() : this.end;

    return this;
  }

  public resetDays(): this
  {
    this.resetFilled();

    let days: CalendarDay<T>[] = this.days;
    let filled: DaySpan = this.filled;
    let current: Day = filled.start;
    let total: number = filled.days(Op.UP);

    if (days.length !== total)
    {
      days.length = total;
    }

    for (let i = 0; i < total; i++)
    {
      let day: CalendarDay<T> = days[ i ];

      if (!day || !day.sameDay( current ))
      {
        day = days[ i ] = new CalendarDay<T>( current.date );
      }

      day.inCalendar = this.span.contains( day );

      current = current.next();
    }

    return this;
  }

  public refreshCurrent(today: Day = Day.today()): this
  {
    return this.iterateDays(d =>
    {
      d.updateCurrent(today);
    });
  }

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

  public refreshEvents(): this
  {
    return this.iterateDays(d =>
    {
      if (d.inCalendar || this.eventsOutside)
      {
        d.events = this.eventsForDay(d, this.listTimes, this.repeatCovers);
      }
    });
  }

  public iterateDays(iterator: (day: CalendarDay<T>) => any): this
  {
    let days: CalendarDay<T>[] = this.days;

    for (let i = 0; i < days.length; i++)
    {
      iterator( days[ i ] );
    }

    return this;
  }

  public eventsForDay(day: Day, getTimes: boolean = true, covers: boolean = true): CalendarEvent<T>[]
  {
    let events: CalendarEvent<T>[] = [];
    let allDay: DaySpan = DaySpan.point(day);

    for (let entry of this.schedules)
    {
      if ((covers && entry.schedule.coversDay(day)) || (!covers && entry.schedule.matchesDay(day)))
      {
        if (getTimes)
        {
          let times: DaySpan[] = covers ?
            entry.schedule.getSpansOver(day) :
            entry.schedule.getSpansOn(day);

          for (let time of times)
          {
            events.push(new CalendarEvent<T>(entry.event, entry.schedule, time, day));
          }
        }
        else
        {
          events.push(new CalendarEvent<T>(entry.event, entry.schedule, allDay, day));
        }
      }
    }

    return events
  }

  public findSchedule(input: CalendarScheduleInput<T>): CalendarSchedule<T>
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

  public removeSchedules(schedules: CalendarScheduleInput<T>[] = null, delayRefresh: boolean = false): this
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

  public removeSchedule(schedule: CalendarScheduleInput<T>, delayRefresh: boolean = false): this
  {
    let found = this.findSchedule(schedule);

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

  public addSchedule(schedule: CalendarSchedule<T>, allowDuplicates: boolean = false, delayRefresh: boolean = false): this
  {
    if (!allowDuplicates)
    {
      let existing = this.findSchedule(schedule);

      if (existing)
      {
        return this;
      }
    }

    this.schedules.push(schedule);

    if (!delayRefresh)
    {
      this.refreshEvents();
    }

    return this;
  }

  public addSchedules(schedules: CalendarSchedule<T>[], allowDuplicates: boolean = false, delayRefresh: boolean = false): this
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

  public select(start: Day, end?: Day): this
  {
    this.selection = end ? new DaySpan( start, end ) : DaySpan.point( start );
    this.refreshSelection();

    return this;
  }

  public unselect(): this
  {
    this.selection = null;
    this.refreshSelection();

    return this;
  }

  public move(jump: number = this.size): this
  {
    this.start = this.moveStart( this.start, jump );
    this.end = this.moveEnd( this.end, jump );
    this.refresh();

    return this;
  }

  public next(jump: number = this.size): this
  {
    return this.move( jump );
  }

  public prev(jump: number = this.size): this
  {
    return this.move( -jump );
  }

  public static days<T>(days: number = 1, around: Day = Day.today(), focus: number = 0.4999): Calendar<T>
  {
    let start: Day = around.start().relativeDays( -Math.floor( days * focus ) );
    let end: Day = start.relativeDays( days - 1 ).end();
    let mover: CalendarMover = (day, amount) => day.relativeDays(amount);

    return new Calendar(start, end, CalendarType.DAY, days, mover, mover, false);
  }

  public static weeks<T>(weeks: number = 1, around: Day = Day.today(), focus: number = 0.4999): Calendar<T>
  {
    let start: Day = around.start().startOfWeek().relativeWeeks( -Math.floor( weeks * focus ) );
    let end: Day = start.relativeWeeks( weeks - 1 ).endOfWeek();
    let mover: CalendarMover = (day, amount) => day.relativeWeeks(amount);

    return new Calendar(start, end, CalendarType.WEEK, weeks, mover, mover, false);
  }

  public static months<T>(months: number = 1, around: Day = Day.today(), focus: number = 0.4999, fill: boolean = true): Calendar<T>
  {
    let start: Day = around.start().startOfMonth().relativeMonths( -Math.floor( months * focus ) );
    let end: Day = start.relativeMonths( months - 1 ).endOfMonth();
    let moveStart: CalendarMover = (day, amount) => day.relativeMonths(amount);
    let moveEnd: CalendarMover = (day, amount) => day.startOfMonth().relativeMonths(amount).endOfMonth();

    return new Calendar(start, end, CalendarType.MONTH, months, moveStart, moveEnd, fill);
  }

  public static years<T>(years: number = 1, around: Day = Day.today(), focus: number = 0.4999, fill: boolean = true): Calendar<T>
  {
    let start: Day = around.start().startOfMonth().relativeMonths( -Math.floor( years * focus ) );
    let end: Day = start.relativeMonths( years - 1 ).endOfYear();
    let mover: CalendarMover = (day, amount) => day.relativeYears(amount);

    return new Calendar(start, end, CalendarType.YEAR, years, mover, mover, fill);
  }

  // [type][short]
  public static SUMMARY_FORMATS = {
    [CalendarType.DAY]: (short: boolean, dayOfWeek: boolean, year: boolean) => {
      return (dayOfWeek ? (short ? 'ddd, ' : 'dddd, ') : '') + (short ? 'MMM ' : 'MMMM ') + 'Do' + (year ? ' YYYY' : '');
    },
    [CalendarType.WEEK]: (short: boolean, dayOfWeek: boolean, year: boolean) => {

    },
    [CalendarType.MONTH]: (short: boolean, dayOfWeek: boolean, year: boolean) => {
      return (short ? 'MMM' : 'MMMM') + (year ? ' YYYY' : '');
    },
    [CalendarType.YEAR]: (short: boolean, dayOfWeek: boolean, year: boolean) => {
      return (year ? 'YYYY' : '');
    }
  };

}
