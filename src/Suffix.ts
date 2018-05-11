
export class Suffix
{

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
        this._CACHE[ i ] = this.determine(i);
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
