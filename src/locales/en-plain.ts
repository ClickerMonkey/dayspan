
import { Locale, LocaleRule } from '../Locale';
import { default as en } from './en';

// tslint:disable: no-magic-numbers

/**
 * English in plain words, for people rather than programmers: "Every month on
 * the 2nd Tuesday", "From November 1, 2026, happens on Tuesday in the 2nd week
 * of the month at 6:00 pm, for 90 minutes". Everything not written here is
 * the same as [[en]]. Use it with `Locales.set('en-plain')` or
 * `day.setLocale('en-plain')`.
 */

const ordinal = (value: number) => en.suffix(value);

/** The name of a `dayOfWeek` value (relative to the week start). */
const weekday = (value: number) => en.weekdays[0][(value + lc.weekStartsOn) % 7];

/** "the last", "the 2nd to last" (`value` 0 is the last). */
const fromLast = (value: number) => value === 0 ? 'the last' : `the ${ordinal(value + 1)} to last`;

const rule = (every: LocaleRule['every'], offset: LocaleRule['offset'], oneOf: LocaleRule['oneOf']): LocaleRule => ({ every, offset, oneOf });

const lc: Locale =
{
  ...en,

  patternNone: (day) => 'Does not repeat',
  patternDaily: (day) => 'Every day',
  patternWeekly: (day) => 'Every week on ' + day.format('dddd'),
  patternMonthlyWeek: (day) => 'Every month on the ' + ordinal(day.weekspanOfMonth + 1) + ' ' + day.format('dddd'),
  patternAnnually: (day) => 'Every year on ' + day.format('MMMM D'),
  patternAnnuallyMonthWeek: (day) => 'Every year on the ' + ordinal(day.weekspanOfMonth + 1) + ' ' + day.format('dddd') + ' of ' + day.format('MMMM'),
  patternWeekday: (day) => 'Every weekday (Monday to Friday)',
  patternMonthly: (day) => 'Every month on the ' + day.format('Do'),
  patternLastDay: (day) => 'Every month on the last day',
  patternLastDayOfMonth: (day) => 'Every year on the last day of ' + day.format('MMMM'),
  patternLastWeekday: (day) => 'Every year on the last ' + day.format('dddd') + ' of ' + day.format('MMMM'),
  patternLastWeekdayOfMonth: (day) => 'Every month on the last ' + day.format('dddd'),
  patternEveryOtherWeek: (day) => 'Every other week on ' + day.format('dddd'),
  patternCustom: (day) => 'Custom…',

  scheduleStartingOn: (start) => 'From ' + start.format('MMMM D, YYYY'),
  scheduleEndingOn: (end) => ' to ' + end.format('MMMM D, YYYY'),
  scheduleEndsOn: (end) => 'Until ' + end.format('MMMM D, YYYY'),
  scheduleThing: (thing, start) => start ? 'Happens' : ', happens',
  scheduleAtTimes: ' at ',
  scheduleTimeFormat: 'h:mm a',
  scheduleDuration: (duration, unit) => ', for ' + duration + (unit ? ' ' + unit + (duration !== 1 ? 's' : '') : ''),
  scheduleExcludes: ', except ',
  scheduleIncludes: ', also ',
  scheduleCancels: ', cancelled on ',

  ruleDayOfWeek: rule(
    (every) => `on every ${ordinal(every)} day of the week`,
    (offset) => `starting on ${weekday(offset)}`,
    (values) => `on ${lc.list(values.map(weekday))}`
  ),
  ruleDay: rule(
    (every) => `on every ${ordinal(every)} day of the week`,
    (offset) => `starting on ${en.weekdays[0][offset]}`,
    (values) => `on ${lc.list(values.map(v => en.weekdays[0][v]))}`
  ),
  ruleDayOfMonth: rule(
    (every) => `on every ${ordinal(every)} day of the month`,
    (offset) => `starting on the ${ordinal(offset)}`,
    (values) => `on the ${lc.list(values.map(ordinal))}`
  ),
  ruleLastDayOfMonth: rule(
    (every) => `on every ${ordinal(every)} day from the end of the month`,
    (offset) => `starting ${offset} days from the end of the month`,
    (values) => `on ${lc.list(values.map(v => fromLast(v - 1)))} day of the month`
  ),
  ruleMonth: rule(
    (every) => `in every ${ordinal(every)} month of the year`,
    (offset) => `starting in ${en.months[0][offset]}`,
    (values) => `in ${lc.list(values.map(v => en.months[0][v]))}`
  ),
  ruleWeekspanOfMonth: rule(
    (every) => `in every ${ordinal(every)} week of the month`,
    (offset) => `starting in the ${ordinal(offset + 1)} week of the month`,
    (values) => `in the ${lc.list(values.map(v => ordinal(v + 1)))} week of the month`
  ),
  ruleLastWeekspanOfMonth: rule(
    (every) => `in every ${ordinal(every)} week from the end of the month`,
    (offset) => `starting in ${fromLast(offset)} week of the month`,
    (values) => `in ${lc.list(values.map(fromLast))} week of the month`
  ),
  ruleWeekspanOfYear: rule(
    (every) => `in every ${ordinal(every)} week of the year`,
    (offset) => `starting in the ${ordinal(offset + 1)} week of the year`,
    (values) => `in the ${lc.list(values.map(v => ordinal(v + 1)))} week of the year`
  ),
  ruleLastWeekspanOfYear: rule(
    (every) => `in every ${ordinal(every)} week from the end of the year`,
    (offset) => `starting in ${fromLast(offset)} week of the year`,
    (values) => `in ${lc.list(values.map(fromLast))} week of the year`
  ),
};

export default lc;
