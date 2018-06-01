
/**
 * A class which takes a number and determines the suffix for that number.
 *
 * ```typescript
 * Suffix.CACHE[ 2 ];         // 2nd
 * Suffix.determine( 3 );     // rd
 * Suffix.get( 4 );           // th
 * Suffix.get( 4, true );     // 4th
 * ```
 */
export class Suffix
{

  /**
   * The array of suffixes used.
   */
  public static MAP: string[] = [
    'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'
  ];

  /**
   * An internal cache of [[Suffix._CACHE_SIZE]] suffixes.
   */
  private static _CACHE: string[];

  /**
   * The number of values to store in the cache (inclusive).
   */
  private static _CACHE_SIZE: number = 366;


  /**
   * The cache of number & suffix pairs.
   */
  public static get CACHE(): string[]
  {
    if (!this._CACHE)
    {
      this._CACHE = [];

      for (let i = 0; i <= this._CACHE_SIZE; i++)
      {
        this._CACHE[ i ] = this.get( i, true );
      }
    }

    return this._CACHE;
  }

  /**
   * Determines the suffix for a given number.
   *
   * @param value The number to find the suffix for.
   * @returns The suffix determined.
   */
  public static determine(value: number): string
  {
    return value >= 11 && value <= 13 ? 'th' : this.MAP[ value % this.MAP.length ];
  }

  /**
   * Gets the suffix for a number and optionally appends it before the suffix.
   *
   * @param value The number to get the suffix for.
   * @param prepend When `true` the value is prepended to the suffix.
   * @returns The suffix or value & suffix pair determined.
   */
  public static get(value: number, prepend: boolean = false): string
  {
    let suffix: string = this.determine(value);

    return prepend ? value + suffix : suffix;
  }

}
