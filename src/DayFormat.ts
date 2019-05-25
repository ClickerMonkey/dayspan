
import { Day } from './Day';
import { Format } from './Format';
import { Functions as fn } from './Functions';
import { Locale } from './Locale';

// tslint:disable: no-magic-numbers

export const DayFormat = new Format<[Day, Locale]>({
  M:          ([day]) => (day.month + 1) + '',
  Mo:         ([day, locale]) => locale.suffix(day.month + 1),
  MM:         ([day]) => fn.padNumber(day.month + 1, 2),
  MMm:        ([day, locale]) => locale.months[3][day.month],
  MMM:        ([day, locale]) => locale.months[2][day.month],
  MMMm:       ([day, locale]) => locale.months[1][day.month],
  MMMM:       ([day, locale]) => locale.months[0][day.month],
  Q:          ([day]) => (day.quarter + 1) + '',
  Qo:         ([day, locale]) => locale.suffix(day.quarter + 1),
  D:          ([day]) => day.dayOfMonth + '',
  Do:         ([day, locale]) => locale.suffix(day.dayOfMonth),
  DD:         ([day]) => fn.padNumber(day.dayOfMonth, 2),
  DDD:        ([day]) => day.dayOfYear + '',
  DDDo:       ([day, locale]) => locale.suffix(day.dayOfYear),
  DDDD:       ([day]) => fn.padNumber(day.dayOfYear, 3),
  d:          ([day]) => day.day + '',
  do:         ([day, locale]) => locale.suffix(day.day),
  dd:         ([day, locale]) => locale.weekdays[3][day.day],
  ddd:        ([day, locale]) => locale.weekdays[2][day.day],
  dddd:       ([day, locale]) => locale.weekdays[0][day.day],
  e:          ([day]) => day.dayOfWeek + '',
  E:          ([day]) => (day.dayOfWeek + 1) + '',
  eo:         ([day, locale]) => locale.suffix(day.dayOfWeek),
  Eo:         ([day, locale]) => locale.suffix(day.dayOfWeek + 1),
  w:          ([day]) => day.week + '',
  wo:         ([day, locale]) => locale.suffix(day.week),
  ww:         ([day]) => fn.padNumber(day.week, 2),
  W:          ([day]) => day.weekOfYear + '',
  Wo:         ([day, locale]) => locale.suffix(day.weekOfYear),
  WW:         ([day]) => fn.padNumber(day.weekOfYear, 2),
  Y:          ([day]) => day.year + '',
  YY:         ([day]) => fn.padNumber(day.year % 100, 2),
  YYYY:       ([day]) => fn.padNumber(day.year, 4, 10),
  gg:         ([day]) => fn.padNumber(day.year % 100, 2),
  gggg:       ([day]) => fn.padNumber(day.year, 4, 10),
  GG:         ([day]) => fn.padNumber(day.year % 100, 2),
  GGGG:       ([day]) => fn.padNumber(day.year, 4, 10),
  a:          ([day, locale]) => day.hour < 12 ? locale.am : locale.pm,
  A:          ([day, locale]) => day.hour < 12 ? locale.am.toUpperCase() : locale.pm.toUpperCase(),
  H:          ([day]) => day.hour + '',
  HH:         ([day]) => fn.padNumber(day.hour, 2),
  h:          ([day]) => ((day.hour % 12) || 12) + '',
  hh:         ([day]) => fn.padNumber((day.hour % 12) || 12, 2),
  k:          ([day]) => (day.hour + 1) + '',
  kk:         ([day]) => fn.padNumber(day.hour + 1, 2),
  m:          ([day]) => day.minute + '',
  mm:         ([day]) => fn.padNumber(day.minute, 2),
  s:          ([day]) => day.seconds + '',
  ss:         ([day]) => fn.padNumber(day.seconds, 2),
  S:          ([day]) => fn.padNumber(day.millis, 3, 1),
  SS:         ([day]) => fn.padNumber(day.millis, 3, 2),
  SSS:        ([day]) => fn.padNumber(day.millis, 3),
  SSSS:       ([day]) => fn.padNumber(day.millis, 3) + '0',
  SSSSS:      ([day]) => fn.padNumber(day.millis, 3) + '00',
  SSSSSS:     ([day]) => fn.padNumber(day.millis, 3) + '000',
  SSSSSSS:    ([day]) => fn.padNumber(day.millis, 3) + '0000',
  SSSSSSSS:   ([day]) => fn.padNumber(day.millis, 3) + '00000',
  SSSSSSSSS:  ([day]) => fn.padNumber(day.millis, 3) + '000000',
  z:          ([day]) => day.date.toLocaleTimeString('en-us', {timeZoneName:'short'}).split(' ')[2],
  zz:         ([day]) => day.date.toLocaleTimeString('en-us', {timeZoneName:'long'}).split(' ')[2],
  Z:          ([day]) => formatOffset(day, ':'),
  ZZ:         ([day]) => formatOffset(day, ''),
  X:          ([day]) => Math.floor(day.time / 1000) + '',
  x:          ([day]) => day.time + '',
  LT:         ([day, locale]) => day.format(locale.formatLT, true),
  LTS:        ([day, locale]) => day.format(locale.formatLTS, true),
  L:          ([day, locale]) => day.format(locale.formatL, true),
  l:          ([day, locale]) => day.format(locale.formatl, true),
  LL:         ([day, locale]) => day.format(locale.formatLL, true),
  ll:         ([day, locale]) => day.format(locale.formatll, true),
  LLL:        ([day, locale]) => day.format(locale.formatLLL, true),
  lll:        ([day, locale]) => day.format(locale.formatlll, true),
  LLLL:       ([day, locale]) => day.format(locale.formatLLLL, true),
  llll:       ([day, locale]) => day.format(locale.formatllll, true),
}, {
  '[': {
    start: '[',
    startEscape: '\\[',
    end: ']',
    endEscape: '\\]'
  },
  "'": {
    start: "'",
    startEscape: "''",
    end: "'",
    endEscape: "''"
  }
});


function formatOffset(day: Day, splitter: string): string
{
  const off = day.offset();
  const hr = Math.floor(Math.abs(off) / 100);
  const mn = Math.abs(off) % 100;

  return (off < 0 ? '-' : '+') + fn.padNumber(hr, 2) + splitter + fn.padNumber(mn, 2);
}