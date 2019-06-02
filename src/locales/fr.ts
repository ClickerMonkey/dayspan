
import { UnitRecord } from '../DayFunctions';
import { Locale, Locales } from '../Locale';

// tslint:disable: no-magic-numbers

const unitToWordSingular: UnitRecord<string> = {
  millis: 'milliseconde',
  second: 'seconde',
  minute: 'minute',
  hour: 'heure',
  day: 'journée',
  week: 'la semaine',
  month: 'mois',
  quarter: 'trimestre',
  year: 'année'
};

const unitToWordPlural: UnitRecord<string> = {
  millis: 'millisecondes',
  second: 'secondes',
  minute: 'minutes',
  hour: 'heures',
  day: 'journées',
  week: 'semaines',
  month: 'mois',
  quarter: 'quarts',
  year: 'années'
};

const lc: Locale = 
{
  weekStartsOn: 1,

  firstWeekContainsDate: 4,

  am: '',
  pm: '',

  formatLT: 'HH:mm',
  formatLTS: 'HH:mm:ss',
  formatL: 'DD/MM/Y',
  formatl: 'D/M/Y',
  formatLL: 'D MMMM Y',
  formatll: 'D MMM Y',
  formatLLL: 'D MMMM Y HH:mm',
  formatlll: 'D MMM Y HH:mm',
  formatLLLL: 'dddd D MMMM Y HH:mm',
  formatllll: 'ddd D MMM Y HH:mm',

  suffix: (value) => value + (value === 1 ? 'er' : 'ème'),

  identifierTime: (short) => short ? 'lll' : 'LLL',
  identifierDay: (short) => short ? 'll' : 'LL',
  identifierWeek: (short) => 'wo [semaine de] YYYY',
  identifierMonth: (short) => short ? 'MMM YYYY' : 'MMMM YYYY',
  identifierQuarter: (short) => 'Qo [trimestre de] Y',
  identifierYear: (short) => 'YYYY',

  patternNone: () => `Sans répétition`,
  patternDaily: () => `Journalier`,
  patternWeekly: (day) => `Tous les ${lc.weekdays[0][day.day]}`,
  patternMonthlyWeek: (day) => `Tous les ${lc.suffix(day.weekspanOfMonth + 1)} ${lc.weekdays[0][day.day]} du mois`,
  patternAnnually: (day) => `Tous les ans le ${day.dayOfMonth} ${lc.months[0][day.month]}`,
  patternAnnuallyMonthWeek: (day) => `Tous les ans le ${lc.suffix(day.weekspanOfMonth + 1)} ${lc.weekdays[0][day.day]} de ${lc.months[0][day.month]}`,
  patternWeekday: () => 'Tous les jours de la semaine (du lundi au vendredi)',
  patternMonthly: (day) => `Mensuel le ${day.dayOfMonth} du mois`,
  patternLastDay: () => `Le dernier jour du mois`,
  patternLastDayOfMonth: (day) => `Le dernier jour de ${lc.months[0][day.month]}`,
  patternLastWeekday: (day) => `Le dernier ${lc.weekdays[0][day.day]} d’${lc.months[0][day.month]}`,
  patternCustom: () => `Douane...`,

  scheduleStartingOn: (start) => `Commençant le ${start.dayOfMonth} ${lc.months[0][start.month]} ${start.year}`,
  scheduleEndingOn: (end) => `et finissant le ${end.dayOfMonth} ${lc.months[0][end.month]} ${end.year}`,
  scheduleEndsOn: (end) => `Jusqu'au ${end.dayOfMonth} ${lc.months[0][end.month]} ${end.year}`,
  scheduleThing: (thing, start) => start 
    ? 'L’' + thing + ' va se produire' 
    : ' l’' + thing + ' va se produire',

  scheduleAtTimes: ' à ',

  scheduleDuration: (duration, unit) => ' durant ' + duration + ' ' + (unit ? (duration !== 1 ? unitToWordPlural[unit] : unitToWordSingular[unit]) + ' ' : ''),

  scheduleExcludes: ' excluant le ',
  scheduleIncludes: ' incluant le ',
  scheduleCancels: ' avec annulations le ',

  ruleDayOfWeek: {
    // every 2nd day of the week
    every: (every) => `tous les ${every} jours de la semaine`,
    // starting on the 5th day of the week
    offset: (offset) => `commençant le ${lc.suffix(offset)} jours de la semaine`,
    // on the 1st, 2nd, and 4th day of the week
    oneOf: (values) => `les ${lc.list(values.map(lc.suffix))} jours de la semaine`
  },
  ruleLastDayOfMonth: {
    // every 3rd last day of the month
    every: (every) => `tous les ${lc.suffix(every)} derniers jours du mois`,
    // starting on the 2nd last day of the month
    offset: (offset) => `commençant le ${lc.suffix(offset)} derniers jours du mois`,
    // on the 1st, 2nd, and 3rd last day of the month
    oneOf: (values) => `les ${lc.list(values.map(lc.suffix))} derniers jours du mois`
  },
  ruleDayOfMonth: {
    // every 3rd day of the month
    every: (every) => `chaque ${lc.suffix(every)} jour du mois`,
    // starting on the 2nd day of the month
    offset: (offset) => `à partir du ${lc.suffix(offset)} jour du mois`,
    // on the 1st, 2nd, and 3rd day of the month
    oneOf: (values) => `les ${lc.list(values.map(lc.suffix))} jours du mois`
  },
  ruleDayOfYear: {
    // every 3rd day of the year
    every: (every) => `tous les ${every} jours de l'année`,
    // starting on the 2nd day of the year
    offset: (offset) => `à partir du ${offset + 1} jours de l'année`,
    // on the 1st, 2nd, and 3rd day of the year
    oneOf: (values) => `les ${lc.list(values.map(lc.suffix))} jours de l'année`
  },
  ruleYear: {
    // every 3rd year
    every: (every) => `tous les ${every} ans`,
    // starting in 2018
    offset: (offset) => `à partir de ${offset}`,
    // in 2019, 2020, and 2021
    oneOf: (values) => `en ${lc.list(values.map(x => x.toString()))}`
  },
  ruleMonth: {
    // every 3rd month
    every: (every) => `tous les ${lc.suffix(every)} mois`,
    // starting in February
    offset: (offset) => `à partir de ${lc.months[0][offset]}`,
    // in February, May, and June
    oneOf: (values) => `en ${lc.list(values.map(x => lc.months[0][x]))}`
  },
  ruleDay: {
    // every 2nd day of the week
    every: (every) => `tous les ${lc.suffix(every)} jours de la semaine`,
    // starting on Tuesday
    offset: (offset) => `à partir de ${lc.weekdays[0][offset]}`,
    // on Monday, Wednesday, and Friday
    oneOf: (values) => `les ${lc.list(values.map(v => lc.weekdays[0][v]))}`
  },
  ruleWeek: {
    // every 3rd week of the year
    every: (every) => `chaque ${lc.suffix(every)} semaine de l'année`,
    // starting on the 2nd week of the year
    offset: (offset) => `à partir de la ${lc.suffix(offset)} semaine de l'année`,
    // on the 1st, 2nd, and 3rd week of the year
    oneOf: (values) => `les ${lc.list(values.map(lc.suffix))} semaines de l'année`
  },
  ruleWeekOfYear: {
    // every 3rd week of the year
    every: (every) => `chaque ${lc.suffix(every)} semaine de l'année`,
    // starting on the 2nd week of the year
    offset: (offset) => `à partir de la ${lc.suffix(offset)} semaine de l'année`,
    // on the 1st, 2nd, and 3rd week of the year
    oneOf: (values) => `les ${lc.list(values.map(lc.suffix))} semaines de l'année`
  },
  ruleWeekspanOfYear: {
    // every 3rd weekspan of the year
    every: (every) => `chaque ${lc.suffix(every + 1)} semaine durée de l'année`,
    // starting on the 2nd weekspan of the year
    offset: (offset) => `à partir de la ${lc.suffix(offset + 1)} semaine durée de l'année`,
    // on the 1st, 2nd, and 3rd weekspan of the year
    oneOf: (values) => `les ${lc.list(values.map(x => lc.suffix(x + 1)))} semaines de l'année`
  },
  ruleFullWeekOfYear: {
    // every 3rd full week of the year
    every: (every) => `chaque ${lc.suffix(every)} semaine complète de l'année`,
    // starting on the 2nd full week of the year
    offset: (offset) => `à partir de la ${lc.suffix(offset)} semaine complète de l'année`,
    // on the 1st, 2nd, and 3rd full week of the year
    oneOf: (values) => `les ${lc.list(values.map(lc.suffix))} semaine complète de l'année`
  },
  ruleLastWeekspanOfYear: {
    // every 3rd last weekspan of the year
    every: (every) => `chaque ${lc.suffix(every + 1)} semaine dernière durée de l'année`,
    // starting on the 2nd last weekspan of the year
    offset: (offset) => `à partir de la ${lc.suffix(offset + 1)} semaine dernière durée de l'année`,
    // on the 1st, 2nd, and 3rd last weekspan of the year
    oneOf: (values) => `les ${lc.list(values.map(x => lc.suffix(x + 1)))} semaine dernière durée de l'année`
  },
  ruleLastFullWeekOfYear: {
    // every 3rd last full week of the year
    every: (every) => `chaque ${lc.suffix(every)} dernière semaine complète de l'année`,
    // starting on the 2nd last full week of the year
    offset: (offset) => `à partir de la ${lc.suffix(offset)} dernière semaine complète de l'année`,
    // on the 1st, 2nd, and 3rd last full week of the year
    oneOf: (values) => `les ${lc.list(values.map(lc.suffix))} dernière semaine complète de l'année`
  },
  ruleWeekOfMonth: {
    // every 3rd week of the month
    every: (every) => `chaque ${lc.suffix(every)} semaine du mois`,
    // starting on the 2nd week of the month
    offset: (offset) => `à partir de la ${lc.suffix(offset)} semaine du mois`,
    // on the 1st, 2nd, and 3rd week of the month
    oneOf: (values) => `les ${lc.list(values.map(lc.suffix))} semaines du mois`
  },
  ruleFullWeekOfMonth: {
    // every 3rd full week of the month
    every: (every) => `chaque ${lc.suffix(every)} complet semaine du mois`,
    // starting on the 2nd full week of the month
    offset: (offset) => `à partir de la ${lc.suffix(offset)} complet semaine du mois`,
    // on the 1st, 2nd, and 3rd full week of the month
    oneOf: (values) => `les ${lc.list(values.map(lc.suffix))} complet semaine du mois`
  },
  ruleWeekspanOfMonth: {
    // every 3rd weekspan of the month
    every: (every) => `chaque ${lc.suffix(every + 1)} semaine durée du mois`,
    // starting on the 2nd weekspan of the month
    offset: (offset) => `à partir de la ${lc.suffix(offset + 1)} semaine durée du mois`,
    // on the 1st, 2nd, and 3rd weekspan of the month
    oneOf: (values) => `les ${lc.list(values.map(x => lc.suffix(x + 1)))} semaines durée du mois`
  },
  ruleLastFullWeekOfMonth: {
    // every 3rd last full week of the month
    every: (every) => `chaque ${lc.suffix(every)} dernier complet semaine du mois`,
    // starting on the 2nd last full week of the month
    offset: (offset) => `à partir de la ${lc.suffix(offset)} dernier complet semaine du mois`,
    // on the 1st, 2nd, and 3rd full week of the month
    oneOf: (values) => `les ${lc.list(values.map(lc.suffix))} dernier complet semaine du mois`
  },
  ruleLastWeekspanOfMonth: {
    // every 3rd last weekspan of the month
    every: (every) => `chaque ${lc.suffix(every + 1)} semaine dernière durée du mois`,
    // starting on the 2nd last weekspan of the month
    offset: (offset) => `à partir du ${offset + 1} dernière semaine durée du mois`,
    // on the 1st, 2nd, and 3rd last weekspan of the month
    oneOf: (values) => `les ${lc.list(values.map(x => x.toString()))} la semaine dernière durée du mois`
  },

  summaryDay: (short, dayOfWeek, year) => (dayOfWeek ? (short ? 'ddd ' : 'dddd ') : '') + 'D ' + (short ? 'MMM ' : 'MMMM ') + (year ? 'Y' : ''),
  summaryWeek: (short, dayOfWeek, year) => (dayOfWeek ? (short ? 'ddd ' : 'dddd ') : '') + 'D ' + (short ? 'MMM ' : 'MMMM ') + (year ? 'Y' : ''),
  summaryMonth: (short, dayOfWeek, year) => (short ? 'MMM' : 'MMMM') + (year ? ' YYYY' : ''),
  summaryYear: (short, dayOfWeek, year) => (year ? 'YYYY' : ''),

  list: (items) => {
    const last: number = items.length - 1;
    let out: string = items[0];

    for (let i = 1; i < last; i++) {
      out += ', ' + items[i];
    }

    if (last > 0) {
      out += ' et ' + items[last];
    }

    return out;
  },

  months: [
    ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
    ['janv', 'févr', 'mars', 'avr', 'mai', 'juin', 'juil', 'août', 'sept', 'oct', 'nov', 'déc'],
    ['jan', 'fév', 'mar', 'avr', 'mai', 'jui', 'jui', 'aoû', 'sep', 'oct', 'nov', 'déc'],
    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
  ],

  weekdays: [
    ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
    ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'],
    ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'],
    ['di', 'lu', 'ma', 'me', 'je', 've', 'sa'],
  ],
};

export default lc;

Locales.add(['fr', 'fr-ca', 'fr-ch'], lc);