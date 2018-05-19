
import { Functions as fn } from './Functions';
import { Constants } from './Constants';
import { Parse } from './Parse';


export type TimeInput = number | string | {hour: number, minute?: number, second?: number, millisecond?: number};

export class Time
{

  public static REGEX = /^(\d\d?):?(\d\d)?:?(\d\d)?\.?(\d\d\d)?$/;

  public hour: number;
  public minute: number;
  public second: number;
  public millisecond: number;

  public constructor(hour: number, minute: number = Constants.MINUTE_MIN, second: number = Constants.SECOND_MIN, millisecond: number = Constants.MILLIS_MIN)
  {
    this.hour = hour;
    this.minute = minute;
    this.second = second;
    this.millisecond = millisecond;
  }

  public format(format: string): string
  {
    let formatterEntries = Time.FORMATTERS;
    let out: string = '';

    for (let i = 0; i < format.length; i++)
    {
      let handled: boolean = false;

      for (let k = 0; k < formatterEntries.length && !handled; k++)
      {
        let entry = formatterEntries[ k ];
        let part: string = format.substring( i, i + entry.size );

        if (part.length === entry.size)
        {
          let formatter = entry.formats[ part ];

          if (formatter)
          {
            out += formatter(this);
            i += entry.size - 1;
            handled = true;
          }
        }
      }

      if (!handled)
      {
        out += format.charAt(i);
      }
    }

    return out;
  }

  public toMilliseconds(): number
  {
    return this.hour * Constants.MILLIS_IN_HOUR +
      this.minute * Constants.MILLIS_IN_MINUTE +
      this.second * Constants.MILLIS_IN_SECOND +
      this.millisecond;
  }

  public toString(): string
  {
    if (this.millisecond) return this.format('HH:mm:ss.SSS');
    if (this.second) return this.format('HH:mm:ss');
    if (this.minute) return this.format('HH:mm');

    return this.format('HH');
  }

  public toIdentifer(): number
  {
    return this.hour +
      this.minute * 100 +
      this.second * 10000 +
      this.millisecond * 10000000;
  }

  public toObject(): TimeInput
  {
    let out: TimeInput = {
      hour: this.hour
    };

    if (this.minute) out.minute = this.minute;
    if (this.second) out.second = this.second;
    if (this.millisecond) out.millisecond = this.millisecond;

    return out;
  }

  public static parse(input: any): Time
  {
    return Parse.time(input);
  }

  public static fromString(time: string): Time
  {
    let matches: string[] = this.REGEX.exec( time );

    if (!matches)
    {
      return null;
    }

    let h: number = parseInt(matches[1]) || 0;
    let m: number = parseInt(matches[2]) || 0;
    let s: number = parseInt(matches[3]) || 0;
    let l: number = parseInt(matches[4]) || 0;

    return this.build(h, m, s, l);
  }

  public static fromIdentifier(time: number): Time
  {
    let h: number = time % 100;
    let m: number = Math.floor(time / 100) % 100;
    let s: number = Math.floor(time / 10000) % 100;
    let l: number = Math.floor(time / 10000000) % 1000;

    return this.build(h, m, s, l);
  }

  public static build(hour: number, minute: number = Constants.MINUTE_MIN, second: number = Constants.SECOND_MIN, millisecond: number = Constants.MILLIS_MIN): Time
  {
    return new Time(hour, minute, second, millisecond)
  }

  public static FORMATTERS = [
    {
      size: 3,
      formats: {
        SSS: (t: Time) => fn.padNumber(t.millisecond, 3)
      }
    },
    {
      size: 2,
      formats: {
        HH: (t: Time) => fn.padNumber(t.hour, 2),
        hh: (t: Time) => fn.padNumber((t.hour % 12) || 12, 2),
        kk: (t: Time) => fn.padNumber(t.hour + 1, 2),
        mm: (t: Time) => fn.padNumber(t.minute, 2),
        ss: (t: Time) => fn.padNumber(t.second, 2),
        SS: (t: Time) => fn.padNumber(t.millisecond, 3, 2)
      }
    },
    {
      size: 1,
      formats: {
        A: (t: Time) => t.hour < 12 ? 'AM' : 'PM',
        a: (t: Time) => t.hour < 12 ? 'am' : 'pm',
        H: (t: Time) => t.hour + '',
        h: (t: Time) => ((t.hour % 12) || 12) + '',
        k: (t: Time) => (t.hour + 1) + '',
        m: (t: Time) => t.minute + '',
        s: (t: Time) => t.second + '',
        S: (t: Time) => fn.padNumber(t.millisecond, 3, 1)
      }
    }
  ];

}
