
import { DayProperty } from './Day';

/**
 * A frequency that occurs at a constant rate with an optional offset.
 */
export interface FrequencyValueEvery
{

  /**
   * How often the value occurs. For example, if this value is `2` the event will
   * occur on every other unit of time.
   */
  every: number;

  /**
   * The offset of the frequency which is between `0` and less than `every`.
   * This is `0` by default which means the frequency starts on `0` and occurs
   * on `every`, `every * 2`, `every * 3`, etc. For example if this value is `1`
   * and `every` is 3 the sequence will be: 1, 4, 7, 11, ...
   */
  offset?: number;
}

/**
 * A frequency that occurs only on specific values.
 */
export type FrequencyValueOneOf = number[];

/**
 * A frequency that occurs once.
 */
export type FrequencyValueEquals = number;

/**
 * A frequency that occurs at a constant rate or only on specific values.
 */
export type FrequencyValue = FrequencyValueEvery | FrequencyValueOneOf | FrequencyValueEquals;

/**
 * A function which takes a value and returns whether it coincides with the
 * desired frequency (based on [[FrequencyCheck.input]] and parsed by
 * [[Parse.frequency]]). This is loosely tied to a property on the [[Day]]
 * object through the [[FrequencyCheck.property]] value.
 */
export interface FrequencyCheck
{

  /**
   * Tests if the value coincides with the specified frequency.
   *
   * @param value The number to test.
   * @returns `true` if the value occurs, otherwise `false`.
   */
  (value: number): boolean;

  /**
   * The original input passed to [[Parse.frequency]] which generated this
   * function.
   */
  input?: FrequencyValue;

  /**
   * Whether the [[FrequencyCheck.input]] given was a valid frequency value and
   * this function will produce desirable results. If given is false, the input
   * was missing or was not valid and this function will always return true.
   */
  given?: boolean;

  /**
   * The property on the [[Day]] object this function evaluates.
   */
  property?: DayProperty;

}
