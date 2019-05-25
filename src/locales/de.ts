
import { Functions as fn } from '../Functions';
import { Locale, Locales } from '../Locale';



const de: Locale = 
{
  weekStartsOn: 1,

  firstWeekContainsDate: 4,

  suffix: (value: number) => value + '.',

  am: '',
  pm: '',

  formatLT: 'HH:mm',
  formatLTS: 'HH:mm:ss',
  formatL: 'DD.MM.Y',
  formatl: 'D.M.Y',
  formatLL: 'D. MMMM Y',
  formatll: 'D. MMM Y',
  formatLLL: 'D. MMMM Y HH:mm',
  formatlll: 'D. MMM Y HH:mm',
  formatLLLL: 'dddd, D. MMMM Y HH:mm',
  formatllll: 'ddd, D. MMM Y HH:mm',

  identifierTime: (short) => short ? 'lll' : 'LLL',
  identifierDay: (short) => short ? 'll' : 'LL',
  identifierWeek: (short) => 'wo [Woche in] YYYY',
  identifierMonth: (short) => short ? 'MMM YYYY' : 'MMMM YYYY',
  identifierQuarter: (short) => short ? 'Qo [Quartal] YYYY' : 'Qo [Quartal] YYYY',
  identifierYear: (short) => 'YYYY',

  patternNone: () => `Nicht wiederholend`,
  patternDaily: () => `Täglich`,
  patternWeekly: (day) => `Wöchentlich am ${de.weekdays[0][day.day]}`,
  patternMonthlyWeek: (day) => `Monatlich am ${day.weekspanOfMonth + 1}. ${de.weekdays[0][day.day]}`,
  patternAnnually: (day) => `Jährlich am ${day.dayOfMonth}. ${de.months[0][day.month]}`,
  patternAnnuallyMonthWeek: (day) => `Jährlich am ${day.weekspanOfMonth + 1}. ${de.weekdays[0][day.day]} im ${de.months[0][day.month]}`,
  patternWeekday: () => 'Jeden Werktag (Montag bis Freitag)',
  patternMonthly: (day) => `Monatlich am ${day.dayOfMonth}. Tag`,
  patternLastDay: () => `Am letzten Tag im Monat`,
  patternLastDayOfMonth: (day) => `Am letzten Tag im ${de.months[0][day.month]}`,
  patternLastWeekday: (day) => `Am letzten ${de.weekdays[0][day.day]} im ${de.months[0][day.month]}`,
  patternCustom: () => `Benutzerdefiniert...`,

  scheduleStartingOn: (start) => `Startend am ${fn.padNumber(start.dayOfMonth, 2)}. ${de.months[0][start.month]} ${start.year}`,
  scheduleEndingOn: (end) => `und endend am ${fn.padNumber(end.dayOfMonth, 2)}. ${de.months[0][end.month]} ${end.year}`,
  scheduleEndsOn: (end) => `Bis zum ${fn.padNumber(end.dayOfMonth, 2)}. ${de.months[0][end.month]} ${end.year}`,
  scheduleThing: (thing, start) => start 
    ? 'Wird das ' + thing + ' stattfinden' 
    : ' wird das ' + thing + ' stattfinden',

  scheduleAtTimes: ' um ',

  scheduleDuration: (duration, unit) => ' mit einer Dauer von ' + duration + ' ' + (unit ? unit + ' ' : ''),

  scheduleExcludes: ' mit Ausnahme vom ',
  scheduleIncludes: ' mit Einnahme vom ',
  scheduleCancels: ' mit einer Aussetzung am ',

  ruleDayOfWeek: {
    // jeden 2nd Tag der Woche
    every: (every) => `jeden ${de.suffix(every)} Tag der Woche`,
    // startend am the 5th Tag der Woche
    offset: (offset) => `startend am the ${de.suffix(offset)} Tag der Woche`,
    // am 1st, 2nd, and 4th Tag der Woche
    oneOf: (values) => `am ${de.list(values.map(de.suffix))} Tag der Woche`
  },
  ruleLastDayOfMonth: {
    // jeden 3rd letzten Tag des Monats
    every: (every) => `jeden ${de.suffix(every)} letzten Tag des Monats`,
    // startend am the 2nd letzten Tag des Monats
    offset: (offset) => `startend am the ${de.suffix(offset)} letzten Tag des Monats`,
    // am 1st, 2nd, and 3rd letzten Tag des Monats
    oneOf: (values) => `am ${de.list(values.map(de.suffix))} letzten Tag des Monats`
  },
  ruleDayOfMonth: {
    // jeden 3rd Tag des Monats
    every: (every) => `jeden ${de.suffix(every)} Tag des Monats`,
    // startend am the 2nd Tag des Monats
    offset: (offset) => `startend am the ${de.suffix(offset)} Tag des Monats`,
    // am 1st, 2nd, and 3rd Tag des Monats
    oneOf: (values) => `am ${de.list(values.map(de.suffix))} Tag des Monats`
  },
  ruleDayOfYear: {
    // jeden 3rd Tag des Jahres
    every: (every) => `jeden ${de.suffix(every)} Tag des Jahres`,
    // startend am the 2nd Tag des Jahres
    offset: (offset) => `startend am the ${de.suffix(offset + 1)} Tag des Jahres`,
    // am 1st, 2nd, and 3rd Tag des Jahres
    oneOf: (values) => `am ${de.list(values.map(de.suffix))} Tag des Jahres`
  },
  ruleYear: {
    // jeden 3rd year
    every: (every) => `jeden ${de.suffix(every)} Jahr`,
    // startend in 2018
    offset: (offset) => `startend in ${offset}`,
    // in 2019, 2020, and 2021
    oneOf: (values) => `in ${de.list(values.map(x => x.toString()))}`
  },
  ruleMonth: {
    // jeden 3rd month
    every: (every) => `jeden ${de.suffix(every)} Monat`,
    // startend in Februar
    offset: (offset) => `startend in ${de.months[0][offset]}`,
    // in Februar, Mai, and Juni
    oneOf: (values) => `in ${de.list(values.map(x => de.months[0][x]))}`
  },
  ruleDay: {
    // jeden 2nd Tag der Woche
    every: (every) => `jeden ${de.suffix(every)} Tag der Woche`,
    // startend am Tuesday
    offset: (offset) => `startend am ${de.weekdays[0][offset]}`,
    // on Monday, Wednesday, and Friday
    oneOf: (values) => `on ${de.list(values.map(v => de.weekdays[0][v]))}`
  },
  ruleWeek: {
    // jeden 3rd Woche des Jahres
    every: (every) => `jeden ${de.suffix(every)} Woche des Jahres`,
    // startend am the 2nd Woche des Jahres
    offset: (offset) => `startend am the ${de.suffix(offset)} Woche des Jahres`,
    // am 1st, 2nd, and 3rd Woche des Jahres
    oneOf: (values) => `am ${de.list(values.map(de.suffix))} Woche des Jahres`
  },
  ruleWeekOfYear: {
    // jeden 3rd Woche des Jahres
    every: (every) => `jeden ${de.suffix(every)} Woche des Jahres`,
    // startend am the 2nd Woche des Jahres
    offset: (offset) => `startend am the ${de.suffix(offset)} Woche des Jahres`,
    // am 1st, 2nd, and 3rd Woche des Jahres
    oneOf: (values) => `am ${de.list(values.map(de.suffix))} Woche des Jahres`
  },
  ruleWeekspanOfYear: {
    // jeden 3rd Wochenspanne des Jahres
    every: (every) => `jeden ${de.suffix(every + 1)} Wochenspanne des Jahres`,
    // startend am the 2nd Wochenspanne des Jahres
    offset: (offset) => `startend am the ${de.suffix(offset + 1)} Wochenspanne des Jahres`,
    // am 1st, 2nd, and 3rd Wochenspanne des Jahres
    oneOf: (values) => `am ${de.list(values.map(x => de.suffix(x + 1)))} Wochenspanne des Jahres`
  },
  ruleFullWeekOfYear: {
    // jeden 3rd vollen Woche des Jahres
    every: (every) => `jeden ${de.suffix(every)} vollen Woche des Jahres`,
    // startend am the 2nd vollen Woche des Jahres
    offset: (offset) => `startend am the ${de.suffix(offset)} vollen Woche des Jahres`,
    // am 1st, 2nd, and 3rd vollen Woche des Jahres
    oneOf: (values) => `am ${de.list(values.map(de.suffix))} vollen Woche des Jahres`
  },
  ruleLastWeekspanOfYear: {
    // jeden 3rd last Wochenspanne des Jahres
    every: (every) => `jeden ${de.suffix(every + 1)} last Wochenspanne des Jahres`,
    // startend am the 2nd last Wochenspanne des Jahres
    offset: (offset) => `startend am the ${de.suffix(offset + 1)} last Wochenspanne des Jahres`,
    // am 1st, 2nd, and 3rd last Wochenspanne des Jahres
    oneOf: (values) => `am ${de.list(values.map(x => de.suffix(x + 1)))} last Wochenspanne des Jahres`
  },
  ruleLastFullWeekOfYear: {
    // jeden 3rd letzte volle Woche des Jahres
    every: (every) => `jeden ${de.suffix(every)} letzte volle Woche des Jahres`,
    // startend am the 2nd letzte volle Woche des Jahres
    offset: (offset) => `startend am the ${de.suffix(offset)} letzte volle Woche des Jahres`,
    // am 1st, 2nd, and 3rd letzte volle Woche des Jahres
    oneOf: (values) => `am ${de.list(values.map(de.suffix))} letzte volle Woche des Jahres`
  },
  ruleWeekOfMonth: {
    // jeden 3rd week des Monats
    every: (every) => `jeden ${de.suffix(every)} Woche des Monats`,
    // startend am the 2nd week des Monats
    offset: (offset) => `startend am the ${de.suffix(offset)} Woche des Monats`,
    // am 1st, 2nd, and 3rd week des Monats
    oneOf: (values) => `am ${de.list(values.map(de.suffix))} Woche des Monats`
  },
  ruleFullWeekOfMonth: {
    // jeden 3rd vollen Woche des Monats
    every: (every) => `jeden ${de.suffix(every)} vollen Woche des Monats`,
    // startend am the 2nd vollen Woche des Monats
    offset: (offset) => `startend am the ${de.suffix(offset)} vollen Woche des Monats`,
    // am 1st, 2nd, and 3rd vollen Woche des Monats
    oneOf: (values) => `am ${de.list(values.map(de.suffix))} vollen Woche des Monats`
  },
  ruleWeekspanOfMonth: {
    // jeden 3rd weekspan des Monats
    every: (every) => `jeden ${de.suffix(every + 1)} Wochenspanne des Monats`,
    // startend am the 2nd weekspan des Monats
    offset: (offset) => `startend am the ${de.suffix(offset + 1)} Wochenspanne des Monats`,
    // am 1st, 2nd, and 3rd weekspan des Monats
    oneOf: (values) => `am ${de.list(values.map(x => de.suffix(x + 1)))} Wochenspanne des Monats`
  },
  ruleLastFullWeekOfMonth: {
    // jeden 3rd letzte volle week des Monats
    every: (every) => `jeden ${de.suffix(every)} letzte volle week des Monats`,
    // startend am the 2nd letzte volle week des Monats
    offset: (offset) => `startend am the ${de.suffix(offset)} letzte volle week des Monats`,
    // am 1st, 2nd, and 3rd vollen Woche des Monats
    oneOf: (values) => `am ${de.list(values.map(de.suffix))} letzte volle week des Monats`
  },
  ruleLastWeekspanOfMonth: {
    // jeden 3rd letzten Wochenspanne des Monats
    every: (every) => `jeden ${de.suffix(every + 1)} letzten Wochenspanne des Monats`,
    // startend am the 2nd letzten Wochenspanne des Monats
    offset: (offset) => `startend am the ${de.suffix(offset + 1)} letzten Wochenspanne des Monats`,
    // am 1st, 2nd, and 3rd letzten Wochenspanne des Monats
    oneOf: (values) => `am ${de.list(values.map(x => de.suffix(x + 1)))} letzten Wochenspanne des Monats`
  },

  summaryDay: (short, dayOfWeek, year) => (dayOfWeek ? (short ? 'ddd, ' : 'dddd, ') : '') + (short ? 'MMM ' : 'MMMM ') + 'Do' + (year ? ' YYYY' : ''),
  summaryWeek: (short, dayOfWeek, year) => (dayOfWeek ? (short ? 'ddd, ' : 'dddd, ') : '') + (short ? 'MMM ' : 'MMMM ') + 'Do' + (year ? ' YYYY' : ''),
  summaryMonth: (short, dayOfWeek, year) => (short ? 'MMM' : 'MMMM') + (year ? ' YYYY' : ''),
  summaryYear: (short, dayOfWeek, year) => (year ? 'YYYY' : ''),

  list: (items) => {
    const last: number = items.length - 1;
    let out: string = items[0];

    for (let i = 1; i < last; i++) {
      out += ', ' + items[i];
    }

    if (last > 0) {
      out += ' und ' + items[last];
    }

    return out;
  },

  months: [
    ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktoboer', 'November', 'Dezember'],
    ['Jan', 'Feb', 'Mrz', 'Apr', 'Mai', 'Juni', 'Juli', 'Aug', 'Sept', 'Okt', 'Nov', 'Dez'],
    ['Jan', 'Feb', 'Mrz', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
    ['J', 'F', 'Mä', 'A', 'Ma', 'Ju', 'Jl', 'Ag', 'S', 'O', 'N', 'D']
  ],

  weekdays: [
    ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
    ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
  ],
};

export default de;

Locales.add(['de', 'de-at', 'de-de', 'de-li', 'de-lu', 'de-ch'], de);