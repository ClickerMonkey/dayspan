

import { Day } from './Day';
import { Functions as fn } from './Functions';
import en from './locales/en';
import { Ref } from './Ref';


export interface LocaleRule
{
  every (every: number): string;
  offset (offset: number): string;
  oneOf (values: number[]): string;  
}

export interface LocaleOptions
{
  // tslint:disable-next-line: no-magic-numbers
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;

  // tslint:disable-next-line: no-magic-numbers
  firstWeekContainsDate: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

export interface Locale extends LocaleOptions
{

  suffix (value: number): string;

  identifierTime (short: boolean): string;
  identifierDay (short: boolean): string;
  identifierWeek (short: boolean): string; 
  identifierMonth (short: boolean): string;
  identifierQuarter (short: boolean): string;
  identifierYear (short: boolean): string;

  patternNone (day: Day): string;
  patternDaily (day: Day): string;
  patternWeekly (day: Day): string;
  patternMonthlyWeek (day: Day): string;
  patternAnnually (day: Day): string;
  patternAnnuallyMonthWeek (day: Day): string;
  patternWeekday (day: Day): string;
  patternMonthly (day: Day): string;
  patternLastDay (day: Day): string;
  patternLastDayOfMonth (day: Day): string;
  patternLastWeekday (day: Day): string;
  patternCustom (day: Day): string;

  scheduleStartingOn (start: Day): string;
  scheduleEndingOn (end: Day): string;
  scheduleEndsOn (end: Day): string;
  scheduleThing (thing: string, start: boolean): string;
  scheduleAtTimes: string;
  scheduleDuration (duration: number, unit?: string): string;
  scheduleExcludes: string;
  scheduleIncludes: string;
  scheduleCancels: string;

  ruleDayOfWeek: LocaleRule;
  ruleLastDayOfMonth: LocaleRule;
  ruleDayOfMonth: LocaleRule;
  ruleDayOfYear: LocaleRule;
  ruleYear: LocaleRule;
  ruleMonth: LocaleRule;
  ruleDay: LocaleRule;
  ruleWeekOfYear: LocaleRule;
  ruleWeekspanOfYear: LocaleRule;
  ruleFullWeekOfYear: LocaleRule;
  ruleLastWeekspanOfYear: LocaleRule;
  ruleLastFullWeekOfYear: LocaleRule;
  ruleWeekOfMonth: LocaleRule;
  ruleFullWeekOfMonth: LocaleRule;
  ruleWeekspanOfMonth: LocaleRule;
  ruleLastFullWeekOfMonth: LocaleRule;
  ruleLastWeekspanOfMonth: LocaleRule;

  summaryDay (short: boolean, dayOfWeek: boolean, year: boolean): string;
  summaryWeek (short: boolean, dayOfWeek: boolean, year: boolean): string;
  summaryMonth (short: boolean, dayOfWeek: boolean, year: boolean): string;
  summaryYear (short: boolean, dayOfWeek: boolean, year: boolean): string;

  list (items: string[]): string;

  months: [
    [string, string, string, string, string, string, string, string, string, string, string, string],
    [string, string, string, string, string, string, string, string, string, string, string, string],
    [string, string, string, string, string, string, string, string, string, string, string, string],
    [string, string, string, string, string, string, string, string, string, string, string, string]
  ];

  weekdays: [
    [string, string, string, string, string, string, string],
    [string, string, string, string, string, string, string],
    [string, string, string, string, string, string, string],
    [string, string, string, string, string, string, string]
  ];
}


/**
 * A class for holding all supported locales. You can add your own, 
 * add aliases, or set the current locale.
 */
export class Locales
{

  /**
   * The map of locales available.
   */
  public static map: { [key: string]: Locale } = { en };

  /**
   * The current locale.
   */
  public static ref: Ref<Locale> = new Ref<Locale>(en, true);

  /**
   * Adds a new locale under one or many keys.
   * 
   * @param key The locale key or keys.
   * @param locale The locale definition.
   */
  public static add (key: string | string[], locale: Locale): void
  {
    const keys = fn.isArray(key) ? key : [key];

    for (const k of keys)
    {
      this.map[k] = locale;
    }
  }

  /**
   * Aliases an existing locale with other keys.
   * 
   * @param key The existing locale to alias.
   * @param aliases The other keys to use an aliases.
   */
  public static alias(key: string, aliases: string[]): void
  {
    for (const k of aliases)
    {
      this.map[k] = this.map[key];
    }
  }

  /**
   * Sets the current locale to the locale with the given key. If no locale
   * exists with the given key, false is returned.
   * 
   * @param key The key of a locale.
   * @returns True if the locale was found, otherwise false.
   */
  public static set (key: string): boolean
  {
    const has = key in this.map;

    if (has)
    {
      this.ref = this.ref.getReplace(this.map[key]);
    }

    return has;
  }

  public static get (key: string): Locale
  {
    return key in this.map ? this.map[key] : this.current;
  }

  public static get current(): Locale
  {
    return this.ref.value;
  }

}