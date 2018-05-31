

/**
 * A frequency that occurs at a constant rate with an optional offset.
 */
export interface FrequencyValueEvery
{

  /**
   * How every
   */
  every: number;

  /**
   *
   */
  offset?: number;
}

/**
 * A frequency that occurs only on specific values.
 */
export type FrequencyValueOneOf = number[];

/**
 * A frequency
 */
export type FrequencyValue = FrequencyValueEvery | FrequencyValueOneOf;

/**
 *
 */
export interface FrequencyCheck
{

  /**
   *
   *
   * @param value
   * @returns
   */
  (value: number): boolean;

  /**
   *
   */
  input?: FrequencyValue;

  /**
   *
   */
  given?: boolean;

  /**
   *
   */
  property?: string;

}
