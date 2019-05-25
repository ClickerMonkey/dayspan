

import { Day } from './Day';
import { Functions as fn } from './Functions';
import en from './locales/en';
import { Ref } from './Ref';


/**
 * A locale object for generating a description for a rule. This handles all
 * types of frequencies (every with optional offset, one, or many).
 */
export interface LocaleRule
{
  every (every: number): string;
  offset (offset: number): string;
  oneOf (values: number[]): string;  
}

/**
 * Options that can be passed to date calculation functions that are used
 * in week calculations.
 */
export interface LocaleOptions
{

  /**
   * The first day of the week in the locale.
   */
  // tslint:disable-next-line: no-magic-numbers
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;

  /**
   * The date which determines which day of January decides the first week of 
   * the year. If the first week of the year contains this date it will be the
   * 1st week of the year based on ISO standards. If the first week of the year
   * does not contain this date the weekOfYear will be 0.
   */
  // tslint:disable-next-line: no-magic-numbers
  firstWeekContainsDate: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

/**
 * A definition of constants and functions which provide everything that's 
 * needed for localization/internationalization support.
 */
export interface Locale extends LocaleOptions
{

  suffix (value: number): string;

  am: string;
  pm: string;

  formatLT: string;
  formatLTS: string;
  formatL: string;
  formatl: string;
  formatLL: string;
  formatll: string;
  formatLLL: string;
  formatlll: string;
  formatLLLL: string;
  formatllll: string;

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
  ruleWeek: LocaleRule;
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
   * The reference to the current locale.
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
      this.map[this.normal(k)] = locale;
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
    const aliased = this.map[this.normal(key)];

    for (const k of aliases)
    {
      this.map[this.normal(k)] = aliased;
    }
  }

  /**
   * Sets the current locale to the locale with the given key. If no locale
   * exists with the given key, false is returned.
   * 
   * When the global locale changes all Day instances created with an 
   * unspecified locale will lazily update their locale-based values when they 
   * are accessed following a locale change.
   * 
   * @param key The key of a locale.
   * @returns True if the locale was found, otherwise false.
   */
  public static set (key: string): boolean
  {
    const n = this.normal(key);
    const has = n in this.map;

    if (has)
    {
      this.ref = this.ref.getReplace(this.map[n]);
    }

    return has;
  }

  /**
   * Normalizes a locale code to a map key.
   * 
   * @param x The code to normalize to a key.
   */
  public static normal (x: string): string
  {
    return x.toLowerCase();
  }

  /**
   * Returns the locale with the given code. If the code does not map to a 
   * locale the current locale is returned.
   * 
   * @param key The code to get the locale for.
   */
  public static get (key: string): Locale
  {
    const n = this.normal(key);

    return n in this.map ? this.map[n] : this.current;
  }

  /**
   * The current locale.
   */
  public static get current(): Locale
  {
    return this.ref.value;
  }

}