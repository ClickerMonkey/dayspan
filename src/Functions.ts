

/**
 * The class which contains commonly used functions by the library. These
 * functions and variables exist in a class so they may be overridden if
 * desired.
 */
export class Functions
{

  /**
   * Determines whether the given input is an array.
   *
   * @param input The variable to test.
   * @return True if the variable is an array, otherwise false.
   */
  public static isArray(input: any): boolean
  {
    return input instanceof Array;
  }

  /**
   * Determines whether the given input is a string.
   *
   * @param input The variable to test.
   * @return True if the variable is a string, otherwise false.
   */
  public static isString(input: any): boolean
  {
    return typeof(input) === 'string';
  }


  public static isNumber(input: any): boolean
  {
    return isFinite(input);
  }

  public static isObject(input: any): boolean
  {
    return !this.isArray(input) && typeof(input) === 'object';
  }

  /**
   * Determines whether the given input is defined.
   *
   * @param input The variable to test.
   * @return True if the variable is defined, otherwise false.
   */
  public static isDefined(input: any): boolean
  {
    return typeof(input) !== 'undefined';
  }

  public static isFrequencyValueEvery(input: any): boolean
  {
    return this.isObject( input ) && this.isNumber( input.every );
  }

  public static isFrequencyValueOneOf(input: any): boolean
  {
    return this.isArray( input ) && input.length > 0;
  }



  /**
   * Returns the first argument which is defined.
   *
   * @param a The first argument to look at.
   * @param b The second argument to look at.
   * @return The first defined argument.
   * @see [[Functions.isDefined]]
   */
  public static coalesce(a: any, b: any, c?: any): any
  {
    return this.isDefined( a ) ? a : (this.isDefined( b ) ? b : c);
  }

  public static pad(x: string, length: number, padding: string, before: boolean): string
  {
    while (x.length < length)
    {
      before ? x = padding + x : x = x + padding;
    }

    return x;
  }

  public static padNumber(x: number, length: number, first: number = length)
  {
    return this.pad(x + '', length, '0', true).substring( 0, first );
  }

}
