
import { Day } from './Day';
import { Suffix } from './Suffix';
import { Weekday } from './Weekday';
import { ScheduleInput } from './Schedule';
import { Functions as fn } from './Functions';


/**
 * Describes a [[Pattern]] given a day to base it on.
 *
 * @param day The day to base the description on.
 * @returns The description of the pattern.
 */
export type DescribePattern = (day: Day) => string;

/**
 * A rule helps parse [[ScheduleInput]] and determines whether it matches the
 * given pattern.
 *
 * - When a number is given, the input MUST be an array of the same length and contain any values.
 * - When an array of numbers is given, the input MUST be an array containing the same values.
 * - When a TRUE is given the input MUST contain that property and can be any value.
 * - When a FALSE is given the input MAY contain that property (optional).
 * - When a property is NOT specified, the input MUST NOT contain that property.
 * - When an object with every is given, the input must match the every and offset values (have the same frequency).
 */
export type PatternRule =
  number |                          // has array with this number of elements
  number[] |                        // is array with same values
  boolean |                         // is true or false
  {every: number, offset?: number}; // is object with matching every and offset

/**
 * The set of rules you can specify for determining if a [[ScheduleInput]]
 * matches a pattern.
 */
export interface PatternRules {
  dayOfWeek?: PatternRule;
  dayOfMonth?: PatternRule;
  lastDayOfMonth?: PatternRule;
  dayOfYear?: PatternRule;
  month?: PatternRule;
  week?: PatternRule;
  year?: PatternRule;
  weekOfYear?: PatternRule;
  weekspanOfYear?: PatternRule;
  fullWeekOfYear?: PatternRule;
  lastWeekspanOfYear?: PatternRule;
  lastFullWeekOfYear?: PatternRule;
  weekOfMonth?: PatternRule;
  weekspanOfMonth?: PatternRule;
  fullWeekOfMonth?: PatternRule;
  lastWeekspanOfMonth?: PatternRule;
  lastFullWeekOfMonth?: PatternRule;
}


/**
 * A class which helps describe [[ScheduleInput]] if it matches a pattern.
 */
export class Pattern
{

  /**
   * The properties in the [[ScheduleInput]] which are compared against the
   * rules of a pattern.
   */
  public static PROPS: string[] =
  [
    'dayOfWeek', 'dayOfMonth', 'lastDayOfMonth', 'dayOfYear',
    'month', 'week', 'year',
    'weekOfYear', 'weekspanOfYear', 'fullWeekOfYear', 'lastWeekspanOfYear', 'lastFullWeekOfYear',
    'weekOfMonth', 'weekspanOfMonth', 'fullWeekOfMonth', 'lastWeekspanOfMonth', 'lastFullWeekOfMonth'
  ];

  /**
   *
   */
  public listed: boolean;

  /**
   *
   */
  public describe: DescribePattern;

  /**
   *
   */
  public name: string;

  /**
   *
   */
  public rules: PatternRules;


  /**
   *
   */
  public constructor(name: string, listed: boolean, describe: DescribePattern, rules: PatternRules)
  {
    this.name = name;
    this.listed = listed;
    this.describe = describe;
    this.rules = rules;
  }

  /**
   *
   */
  public apply(input: ScheduleInput, day: Day): ScheduleInput
  {
    for (let prop of Pattern.PROPS)
    {
      let rule = this.rules[ prop ];

      // Should have one value
      if (rule === 1)
      {
        input[ prop ] = [day[ prop ]];
      }

      // Can be any of the values in the array
      if (fn.isArray(rule))
      {
        input[ prop ] = rule;
      }

      // Must not be present
      if (!fn.isDefined(rule))
      {
        delete input[ prop ];
      }
    }

    return input;
  }

  /**
   *
   */
  public isMatch(input: ScheduleInput, exactlyWith?: Day): boolean
  {
    let exactly: boolean = fn.isDefined( exactlyWith );

    for (let prop of Pattern.PROPS)
    {
      let rule = this.rules[ prop ];
      let curr = input[ prop ];

      // Optional, skip it
      if (rule === false)
      {
        continue;
      }

      // Requires any value
      if (rule === true && !curr)
      {
        return false;
      }

      // Must not be present
      if (!fn.isDefined(rule) && curr)
      {
        return false;
      }

      // Must be an array of the same size
      if (fn.isNumber(rule))
      {
        if (fn.isArray(curr) && curr.length === rule)
        {
          if (exactly && curr.indexOf( exactlyWith[ prop ] ) === -1)
          {
            return false;
          }
        }
        else
        {
          return false;
        }
      }

      // Must be an array of the same values
      if (fn.isArray(rule))
      {
        if (!fn.isArray(curr))
        {
          return false;
        }

        if (rule.length !== curr.length)
        {
          return false;
        }

        for (var i = 0; i < rule.length; i++)
        {
          if (rule[ i ] !== curr[ i ])
          {
            return false;
          }
        }

        if (exactly && rule.indexOf( exactlyWith[ prop ] ) === -1)
        {
          return false;
        }
      }

      // Must be an object with same over & offset.
      if (fn.isObject(rule))
      {
        if (!fn.isObject(curr))
        {
          return false;
        }

        var ruleOffset = rule.offset || 0;
        var currOffset = curr.offset || 0;

        if (currOffset !== ruleOffset || curr.every !== rule.every)
        {
          return false;
        }

        if (exactly && (exactlyWith[ prop ] % rule.every) !== ruleOffset)
        {
          return false;
        }
      }
    }

    return true;
  }

  /**
   *
   */
  public static withName(name: string): Pattern
  {
    return PatternMap[ name ];
  }

  /**
   *
   */
  public static findMatch(input: ScheduleInput, listedOnly: boolean = true, exactlyWith?: Day): Pattern
  {
    for (let pattern of Patterns)
    {
      if ((pattern.listed || !listedOnly) && pattern.isMatch( input, exactlyWith ))
      {
        return pattern;
      }
    }

    return null;
  }


}


/**
 *
 */
export let Patterns: Pattern[] = [
  new Pattern(
    'none', true,
    (day: Day) => 'Does not repeat',
    {
      year: 1,
      month: 1,
      dayOfMonth: 1
    }
  ),
  new Pattern(
    'daily', true,
    (day: Day) => 'Daily',
    {

    }
  ),
  new Pattern(
    'weekly', true,
    (day: Day) =>  'Weekly on ' + day.format('dddd'),
    {
      dayOfWeek: 1
    }
  ),
  new Pattern(
    'monthlyWeek', true,
    (day: Day) => 'Monthly on the ' + Suffix.CACHE[day.weekspanOfMonth + 1] + ' ' + day.format('dddd'),
    {
      dayOfWeek: 1,
      weekspanOfMonth: 1
    }
  ),
  new Pattern(
    'annually', true,
    (day: Day) => 'Annually on ' + day.format('MMMM Do'),
    {
      month: 1,
      dayOfMonth: 1
    }
  ),
  new Pattern(
    'annuallyMonthWeek', true,
    (day: Day) => 'Annually on the ' + Suffix.CACHE[day.weekspanOfMonth + 1] + ' ' + day.format('dddd') + ' of ' + day.format('MMMM'),
    {
      month: 1,
      dayOfWeek: 1,
      weekspanOfMonth: 1
    }
  ),
  new Pattern(
    'weekday', true,
    (day: Day) => 'Every weekday (Monday to Friday)',
    {
      dayOfWeek: [Weekday.MONDAY, Weekday.TUESDAY, Weekday.WEDNESDAY, Weekday.THURSDAY, Weekday.FRIDAY]
    }
  ),
  new Pattern(
    'monthly', true,
    (day: Day) => 'Monthly on the ' + day.format('Do') + ' day',
    {
      dayOfMonth: 1
    }
  ),
  new Pattern(
    'custom', true,
    (day: Day) => 'Custom...',
    {
      dayOfWeek: false,
      dayOfMonth: false,
      lastDayOfMonth: false,
      dayOfYear: false,
      year: false,
      month: false,
      week: false,
      weekOfYear: false,
      weekspanOfYear: false,
      fullWeekOfYear: false,
      lastWeekspanOfYear: false,
      lastFullWeekOfYear: false,
      weekOfMonth: false,
      weekspanOfMonth: false,
      fullWeekOfMonth: false,
      lastWeekspanOfMonth: false,
      lastFullWeekOfMonth: false
    }
  )
];

/**
 *
 */
export let PatternMap: { [name: string]: Pattern } = {};

for (let pattern of Patterns)
{
  PatternMap[ pattern.name ] = pattern;
}
