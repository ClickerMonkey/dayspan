
import { Day, DayProperty } from './Day';
import { FrequencyValue, FrequencyValueEvery } from './Frequency';
import { Functions as fn } from './Functions';
import { Locales } from './Locale';
import { Schedule, ScheduleInput } from './Schedule';
import { Weekday } from './Weekday';


/**
 * Describes a [[Pattern]] given a [[Day]] to base it on.
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
  number |                // has array with this number of elements
  number[] |              // is array with same values
  boolean |               // is true or false
  FrequencyValueEvery;    // is object with matching every and offset

/**
 * The set of rules you can specify for determining if a [[ScheduleInput]]
 * matches a pattern.
 */
export interface PatternRules
{
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
  public static PROPS: DayProperty[] =
  [
    'dayOfWeek', 'dayOfMonth', 'lastDayOfMonth', 'dayOfYear',
    'month', 'week', 'year',
    'weekOfYear', 'weekspanOfYear', 'fullWeekOfYear', 'lastWeekspanOfYear', 'lastFullWeekOfYear',
    'weekOfMonth', 'weekspanOfMonth', 'fullWeekOfMonth', 'lastWeekspanOfMonth', 'lastFullWeekOfMonth'
  ];

  /**
   * Whether this pattern should be "listed" or not. Visual schedulers may
   * provide a shortcut to describing and changing a [[Schedule]] through
   * patterns and any pattern where listed is `true` could be an option in a
   * list. The default patterns are all listed.
   */
  public listed: boolean;

  /**
   * The function which describes this pattern given a [[Day]] to base it on.
   */
  public describe: DescribePattern;

  /**
   * The name of this pattern. This is not typically displayed to a user, just
   * to uniquely identify a pattern.
   */
  public name: string;

  /**
   * The rules for matching a pattern to a [[Schedule]] or applying a pattern to
   * a schedule.
   */
  public rules: PatternRules;


  /**
   * Creates a new pattern.
   *
   * @param name The unique name of the pattern.
   * @param listed If the pattern is "listed" [[Pattern.listed]].
   * @param describe A function to describe the pattern given a [[Day]].
   * @param rules The rules which describe how to detect and apply the pattern
   *    to schedule input.
   */
  public constructor(name: string, listed: boolean, describe: DescribePattern, rules: PatternRules)
  {
    this.name = name;
    this.listed = listed;
    this.describe = describe;
    this.rules = rules;
  }

  /**
   * Applies this pattern to a [[Schedule]] or [[ScheduleInput]] removing and
   * adding any necessary properties from the input to match this pattern -
   * based around the day provided.
   *
   * @param schedule The schedule to update to match this pattern.
   * @param day The day to base the schedule on.
   * @returns The reference to the input passed in.
   */
  public apply<M, I extends ScheduleInput<M> | Schedule<M>>(schedule: I, day: Day): I
  {
    if (schedule instanceof Schedule)
    {
      this.applyGeneric(day,
        (prop, frequency) => schedule.setFrequency( prop, frequency ),
        (prop) => schedule.setFrequency( prop )
      );

      schedule.updateChecks();
    }
    else
    {
      this.applyGeneric(day,
        (prop, frequency) => schedule[ prop ] = frequency,
        (prop) => delete schedule[ prop ]
      );
    }

    return schedule;
  }

  /**
   * Applies this pattern to any object provided they implement the
   * `setFrequency` and `removeFrequency` functions.
   *
   * @param day The day to base the schedule on.
   * @param setFrequency The function which sets the frequency on the object.
   * @param removeFrequency The function to remove a frequency from the object.
   */
  public applyGeneric(day: Day,
    setFrequency: (property: DayProperty, frequency: any) => any,
    removeFrequency: (property: DayProperty) => any): void
  {
    for (const prop of Pattern.PROPS)
    {
      const rule = this.rules[ prop ];

      // Should have one value
      if (rule === 1)
      {
        setFrequency( prop, [day[ prop ]] );
      }

      // Can be any of the values in the array
      if (fn.isArray(rule))
      {
        setFrequency( prop, rule );
      }

      // Must not be present
      if (!fn.isDefined(rule))
      {
        removeFrequency( prop );
      }
    }
  }

  /**
   * Determines whether the given [[Schedule]] or [[ScheduleInput]] matches this
   * pattern. Optionally a day can be provided to make sure the day matches the
   * schedule and pattern together.
   *
   * @param schedule The schedule input to test.
   * @param exactlyWith A day to further validate against for matching.
   * @returns `true` if the schedule was a match to this pattern with the
   *    day if one was provided, otherwise `false`.
   */
  public isMatch<M, I extends ScheduleInput<M> | Schedule<M>>(schedule: I, exactlyWith?: Day): boolean
  {
    if (schedule instanceof Schedule)
    {
      return this.isMatchGeneric((prop) => schedule[ prop ].input, exactlyWith);
    }
    else
    {
      return this.isMatchGeneric((prop) => schedule[ prop ], exactlyWith);
    }
  }

  /**
   * Determines whether the given input matches this pattern. Optionally a day
   * can be provided to make sure the day matches the schedule and pattern
   * together.
   *
   * @param input The schedule input to test.
   * @param exactlyWith A day to further validate against for matching.
   * @returns `true` if the schedule input was a match to this pattern with the
   *    day if one was provided, otherwise `false`.
   */
  public isMatchGeneric(getFrequency: (property: DayProperty) => FrequencyValue, exactlyWith?: Day): boolean
  {
    const exactly: boolean = fn.isDefined( exactlyWith );

    for (const prop of Pattern.PROPS)
    {
      const rule = this.rules[ prop ];
      const curr = getFrequency( prop );

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
        if (fn.isArray(curr) && (curr as number[]).length === rule)
        {
          if (exactly && (curr as number[]).indexOf( exactlyWith[ prop ] as number ) === -1)
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

        if (rule.length !== (curr as number[]).length)
        {
          return false;
        }

        for (let i = 0; i < rule.length; i++)
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
      if (fn.isFrequencyValueEvery(rule))
      {
        if (!fn.isFrequencyValueEvery(curr))
        {
          return false;
        }

        const ruleOffset = rule.offset || 0;
        const currOffset = curr.offset || 0;

        if (currOffset !== ruleOffset || curr.every !== rule.every)
        {
          return false;
        }

        if (exactly && ((exactlyWith[ prop ] as number) % rule.every) !== ruleOffset)
        {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Returns the pattern with the given name if one exists. If you add your own
   * patterns make sure to add them to [[PatternMap]].
   *
   * @param name The name of the pattern to return.
   * @return The instance to the pattern with the same name.
   */
  public static withName(name: string): Pattern
  {
    return PatternMap[ name ];
  }

  /**
   * Finds a matching pattern to the given input searching through [[Patterns]]
   * for matches. Optionally it will only look at patterns where listed = `true`.
   *
   * @param input The schedule input to use.
   * @param listedOnly When `true` only patterns with [[Pattern.listed]] set to
   *    `true` will be looked at, otherwise all patterns are looked at.
   * @param exactlyWith  A day to further validate against for matching.
   * @see [[Pattern.isMatch]]
   */
  public static findMatch<M, I extends ScheduleInput<M> | Schedule<M>>(input: I, listedOnly: boolean = true, exactlyWith?: Day): Pattern
  {
    for (const pattern of Patterns)
    {
      if ((pattern.listed || !listedOnly) && pattern.isMatch<M, I>( input, exactlyWith ))
      {
        return pattern;
      }
    }

    return null;
  }

}


/**
 * The list of patterns that can be searched through for matches to schedule
 * input.
 *
 * @see [[Pattern.findMatch]]
 */
export let Patterns: Pattern[] = [
  new Pattern(
    'none', true,
    (day) => Locales.current.patternNone(day),
    {
      year: 1,
      month: 1,
      dayOfMonth: 1
    }
  ),
  new Pattern(
    'daily', true,
    (day) => Locales.current.patternDaily(day),
    {

    }
  ),
  new Pattern(
    'weekly', true,
    (day) => Locales.current.patternWeekly(day),
    {
      dayOfWeek: 1
    }
  ),
  new Pattern(
    'monthlyWeek', true,
    (day) => Locales.current.patternMonthlyWeek(day),
    {
      dayOfWeek: 1,
      weekspanOfMonth: 1
    }
  ),
  new Pattern(
    'annually', true,
    (day) => Locales.current.patternAnnually(day),
    {
      month: 1,
      dayOfMonth: 1
    }
  ),
  new Pattern(
    'annuallyMonthWeek', true,
    (day) => Locales.current.patternAnnuallyMonthWeek(day),
    {
      month: 1,
      dayOfWeek: 1,
      weekspanOfMonth: 1
    }
  ),
  new Pattern(
    'weekday', true,
    (day) => Locales.current.patternWeekday(day),
    {
      dayOfWeek: [Weekday.MONDAY, Weekday.TUESDAY, Weekday.WEDNESDAY, Weekday.THURSDAY, Weekday.FRIDAY]
    }
  ),
  new Pattern(
    'monthly', true,
    (day) => Locales.current.patternMonthly(day),
    {
      dayOfMonth: 1
    }
  ),
  new Pattern(
    'lastDay', false,
    (day) => Locales.current.patternLastDay(day),
    {
      lastDayOfMonth: [1]
    }
  ),
  new Pattern(
    'lastDayOfMonth', false,
    (day) => Locales.current.patternLastDayOfMonth(day),
    {
      month: 1,
      lastDayOfMonth: [1]
    }
  ),
  new Pattern(
    'lastWeekday', false,
    (day) => Locales.current.patternLastWeekday(day),
    {
      lastWeekspanOfMonth: [0],
      dayOfWeek: 1,
      month: 1
    }
  ),
  new Pattern(
    'custom', true,
    (day) => Locales.current.patternCustom(day),
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
 * The map of patterns keyed by their name.
 *
 * @see [[Pattern.withName]]
 */
export let PatternMap: { [name: string]: Pattern } = {};

for (const pattern of Patterns)
{
  PatternMap[ pattern.name ] = pattern;
}
