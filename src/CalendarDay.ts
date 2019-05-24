
import { Iterate } from 'iteratez';

import { CalendarEvent } from './CalendarEvent';
import { Day } from './Day';
import { DaySpan } from './DaySpan';
import { Op } from './Operation';


/**
 * A day in a [[Calendar]] with extra information relative to any selection on
 * the calendar, the current date, or events on the day.
 *
 * @typeparam T The type of data stored in the [[Event]] class.
 * @typeparam M The type of metadata stored in the schedule.
 */
export class CalendarDay<T, M> extends Day
{

  /**
   * Whether this day is the current day (ex: today).
   */
  public currentDay: boolean = false;

  /**
   * Whether this day is on the same week as the current day (ex: today).
   */
  public currentWeek: boolean = false;

  /**
   * Whether this day is on the same month as the current day (ex: today).
   */
  public currentMonth: boolean = false;

  /**
   * Whether this day is on the same year as the current day (ex: today).
   */
  public currentYear: boolean = false;

  /**
   * How many days away this day is from the current day (ex: today). If this
   * day is the current day the offset is 0. If this day is before the current
   * day it will be the negative number of days away. Otherwise this will be
   * positive meaning this day is after the current day by the given days.
   */
  public currentOffset: number = 0;

  /**
   * Whether this day is part of a selection on the calendar.
   */
  public selectedDay: boolean = false;

  /**
   * Whether this day is on the same week that the calendar selection is.
   */
  public selectedWeek: boolean = false;

  /**
   * Whether this day is on the same month that the calendar selection is.
   */
  public selectedMonth: boolean = false;

  /**
   * Whether this day is on the same year that the calendar selection is.
   */
  public selectedYear: boolean = false;

  /**
   * Whether this day is in the current calendar or not. Some days are outside
   * the calendar span and used to fill in weeks. Month calendars will fill in
   * days so the list of days in the calendar start on Sunday and end on Saturday.
   */
  public inCalendar: boolean = false;

  /**
   * The list of events on this day based on the settings and schedules in the
   * calendar.
   */
  public events: CalendarEvent<T, M>[] = [];


  /**
   * Creates an iterator for the events on this day.
   *
   * @returns The new iterator for the events on this day.
   */
  public iterateEvents(): Iterate<CalendarEvent<T, M>, number, CalendarEvent<T, M>[]>
  {
    return Iterate.array( this.events );
  }


  /**
   * Updates the current flags on this day given the current day (ex: today).
   *
   * @param current The current day of the calendar.
   */
  public updateCurrent(current: Day): this
  {
    this.currentDay = this.sameDay(current);
    this.currentWeek = this.sameWeek(current);
    this.currentMonth = this.sameMonth(current);
    this.currentYear = this.sameYear(current);
    this.currentOffset = this.daysBetween(current, Op.DOWN, false);

    return this;
  }

  /**
   * Updates the selection flags on this day given the selection range on the
   * calendar.
   *
   * @param selected The span of days selected on the calendar.
   */
  public updateSelected(selected: DaySpan): this
  {
    this.selectedDay = selected.matchesDay(this);
    this.selectedWeek = selected.matchesWeek(this);
    this.selectedMonth = selected.matchesMonth(this);
    this.selectedYear = selected.matchesYear(this);

    return this;
  }

  /**
   * Clears the selection flags on this day. This is done when the selection on
   * the calendar is cleared.
   */
  public clearSelected(): this
  {
    this.selectedDay = this.selectedWeek = this.selectedMonth = this.selectedYear = false;

    return this;
  }

}
