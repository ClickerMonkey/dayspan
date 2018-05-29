
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

  private static _CACHE: string[];

  private static _CACHE_SIZE: number = 366;

  public static get CACHE(): string[]
  {
    if (!this._CACHE)
    {
      this._CACHE = [];

      for (let i = 0; i < this._CACHE_SIZE; i++)
      {
        this._CACHE[ i ] = this.get( i, true );
      }
    }

    return this._CACHE;
  }

  public static determine(value: number): string
  {
    return value >= 11 && value <= 13 ? 'th' : this.MAP[ value % this.MAP.length ];
  }

  public static get(value: number, append: boolean = false): string
  {
    let suffix: string = this.determine(value);
    return append ? value + suffix : suffix;
  }

}
