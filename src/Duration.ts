
import { Constants } from './Constants';


export class Duration
{

  public static millis(x: number): number
  {
    return x;
  }

  public static seconds(x: number): number
  {
    return x * Constants.MILLIS_IN_SECOND;
  }

  public static minutes(x: number): number
  {
    return x * Constants.MILLIS_IN_MINUTE;
  }

  public static hours(x: number): number
  {
    return x * Constants.MILLIS_IN_HOUR;
  }

  public static days(x: number): number
  {
    return x * Constants.MILLIS_IN_DAY;
  }

  public static weeks(x: number): number
  {
    return x * Constants.MILLIS_IN_WEEK;
  }

}
