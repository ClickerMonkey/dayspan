
import { Format } from './Format';
import { Functions as fn } from './Functions';
import { Locales } from './Locale';
import { Time } from './Time';

// tslint:disable: no-magic-numbers

/**
 * Formats time into a string. The following list describes the available
 * formatting patterns:
 *
 * ### Hour
 * - H: 0-23
 * - HH: 00-23
 * - h: 12,1-12,1-11
 * - hh: 12,01-12,01-11
 * - k: 1-24
 * - kk: 01-24
 * - a: am,pm
 * - A: AM,PM
 * ### Minute
 * - m: 0-59
 * - mm: 00-59
 * ### Second
 * - s: 0-59
 * - ss: 00-59
 * ### Millisecond
 * - S: 0-9
 * - SS: 00-99
 * - SSS: 000-999
 */
export const TimeFormat = new Format<Time>({
  A: (t: Time) => Locales.current[t.hour < 12 ? 'am' : 'pm'].toUpperCase(),
  a: (t: Time) => Locales.current[t.hour < 12 ? 'am' : 'pm'],
  H: (t: Time) => t.hour + '',
  h: (t: Time) => ((t.hour % 12) || 12) + '',
  k: (t: Time) => (t.hour + 1) + '',
  m: (t: Time) => t.minute + '',
  s: (t: Time) => t.second + '',
  S: (t: Time) => fn.padNumber(t.millisecond, 3, 1),
  HH: (t: Time) => fn.padNumber(t.hour, 2),
  hh: (t: Time) => fn.padNumber((t.hour % 12) || 12, 2),
  kk: (t: Time) => fn.padNumber(t.hour + 1, 2),
  mm: (t: Time) => fn.padNumber(t.minute, 2),
  ss: (t: Time) => fn.padNumber(t.second, 2),
  SS: (t: Time) => fn.padNumber(t.millisecond, 3, 2),
  SSS: (t: Time) => fn.padNumber(t.millisecond, 3)
}, {
  '[': {
    start: '[',
    startEscape: '\[',
    end: ']',
    endEscape: '\]'
  },
  "'": {
    start: "'",
    startEscape: "''",
    end: "'",
    endEscape: "''"
  }
});