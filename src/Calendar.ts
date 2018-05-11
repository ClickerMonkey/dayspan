
import { Day } from './Day';
import { DaySpan } from './DaySpan';
import { Schedule } from './Schedule';
import { Constants } from './Constants';


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
  public length: number;
  public type: CalendarType;
  public size: number;
  public mover: CalendarMover;
  public fill: boolean;

  public repeatCovers: boolean = true;
  public listTimes: boolean = false;
  public eventsOutside: boolean = false;

  public selection: DaySpan = null;
  public days: CalendarDay<T>[] = [];
  public schedules: CalendarSchedule<T>[] = [];

  public constructor(start: Day, end: Day, type: CalendarType, size: number, mover: CalendarMover, fill: boolean)
  {
    this.span = new DaySpan(start, end);
    this.type = type;
    this.size = size;
    this.mover = mover;
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

  public fillStart(): Day
  {
    return this.fill ? this.start.startOfWeek() : this.start;
  }

  public fillEnd(): Day
  {
    return this.fill ? this.end.endOfWeek(false) : this.end;
  }

  public refresh(today: Day = Day.today()): this
  {
    this.length = this.span.days();
    this.resetDays();
    this.refreshCurrent(today);
    this.refreshSelection();
    this.refreshEvents();

    return this;
  }

  public resetDays(): this
  {
    let days: CalendarDay<T>[] = this.days;
    let start: Day = this.fillStart();
    let end: Day = this.fillEnd();
    let total: number = start.daysBetween(end);

    if (days.length !== total)
    {
      days.length = total;
    }

    let time: number = start.time;

    for (let i = 0; i < total; i++)
    {
      let day: CalendarDay<T> = days[ i ];

      if (!day || day.time !== time)
      {
        day = new CalendarDay<T>( new Date( time ) );
        days[ i ] = day;
      }

      day.inCalendar = this.span.contains( day );

      time += Constants.MILLIS_IN_DAY;
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
    this.start = this.mover( this.start, jump );
    this.end = this.mover( this.end, jump );
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
    let end: Day = start.relativeDays( days );
    let mover: CalendarMover = (day, amount) => day.relativeDays(amount);

    return new Calendar(start, end, CalendarType.DAY, days, mover, false);
  }

  public static weeks<T>(weeks: number = 1, around: Day = Day.today(), focus: number = 0.4999): Calendar<T>
  {
    let start: Day = around.start().startOfWeek().relativeWeeks( -Math.floor( weeks * focus ) );
    let end: Day = start.relativeWeeks( weeks );
    let mover: CalendarMover = (day, amount) => day.relativeWeeks(amount);

    return new Calendar(start, end, CalendarType.WEEK, weeks, mover, false);
  }

  public static months<T>(months: number = 1, around: Day = Day.today(), focus: number = 0.4999, fill: boolean = true): Calendar<T>
  {
    let start: Day = around.start().startOfMonth().relativeMonths( -Math.floor( months * focus ) );
    let end: Day = start.relativeMonths( months );
    let mover: CalendarMover = (day, amount) => day.relativeMonths(amount);

    return new Calendar(start, end, CalendarType.MONTH, months, mover, fill);
  }

  public static years<T>(years: number = 1, around: Day = Day.today(), focus: number = 0.4999, fill: boolean = true): Calendar<T>
  {
    let start: Day = around.start().startOfMonth().relativeMonths( -Math.floor( years * focus ) );
    let end: Day = start.relativeMonths( years );
    let mover: CalendarMover = (day, amount) => day.relativeYears(amount);

    return new Calendar(start, end, CalendarType.YEAR, years, mover, fill);
  }

}
