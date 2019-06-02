
import { UnitRecord } from '../DayFunctions';
import { Locale, Locales } from '../Locale';


const unitToWordSingular: UnitRecord<string> = {
  millis: 'milliseconde',
  second: 'seconde',
  minute: 'minuut',
  hour: 'uur',
  day: 'dag',
  week: 'week',
  month: 'maand',
  quarter: 'kwartaal',
  year: 'jaar'
};

const unitToWordPlural: UnitRecord<string> = {
  millis: 'milliseconden',
  second: 'seconden',
  minute: 'minuten',
  hour: 'uur',
  day: 'dagen',
  week: 'weken',
  month: 'maanden',
  quarter: 'vertrekken',
  year: 'jaar'
};

const lc: Locale = 
{
  weekStartsOn: 1,

  firstWeekContainsDate: 4,

  am: '',
  pm: '',

  formatLT: 'HH:mm',
  formatLTS: 'HH:mm:ss',
  formatL: 'DD-MM-Y',
  formatl: 'D-M-Y',
  formatLL: 'D MMMM Y',
  formatll: 'D MMM Y',
  formatLLL: 'D MMMM Y HH:mm',
  formatlll: 'D MMM Y HH:mm',
  formatLLLL: 'dddd D MMMM Y HH:mm',
  formatllll: 'ddd D MMM Y HH:mm',

  suffix: (value: number) => {
    return value + 'e';
  },

  identifierTime: (short) => short ? 'lll' : 'LLL',
  identifierDay: (short) => short ? 'll' : 'LL',
  identifierWeek: (short) => 'wo [week van] Y',
  identifierMonth: (short) => short ? 'MMM Y' : 'MMMM Y',
  identifierQuarter: (short) => 'Qo [kwartaal] Y',
  identifierYear: (short) => 'Y',

  patternNone: () => `Geen herhaling`,
  patternDaily: () => `Dagelijks`,
  patternWeekly: (day) => `Wekelijks op ${lc.weekdays[0][day.day]}`,
  patternMonthlyWeek: (day) => `Maandelijks op de ${lc.suffix(day.weekspanOfMonth + 1)} ${lc.weekdays[0][day.day]}`,
  patternAnnually: (day) => `Jaarlijks op ${day.dayOfMonth} ${lc.months[0][day.month]}`,
  patternAnnuallyMonthWeek: (day) => `Jaarlijks op de ${lc.suffix(day.weekspanOfMonth + 1)} ${lc.weekdays[0][day.day]} van ${lc.months[0][day.month]}`,
  patternWeekday: () => 'Iedere werkdag (maandag tot vrijdag)',
  patternMonthly: (day) => `Maandelijks op de ${lc.suffix(day.dayOfMonth)}`,
  patternLastDay: () => `Laatste dag van de maand`,
  patternLastDayOfMonth: (day) => `Laatste dag van ${lc.months[0][day.month]}`,
  patternLastWeekday: (day) => `Laatste ${lc.weekdays[0][day.day]} van ${lc.months[0][day.month]}`,
  patternCustom: () => `Aangepast...`,

  scheduleStartingOn: (start) => `Vanaf ${start.dayOfMonth} ${lc.months[0][start.month]} ${start.year}`,
  scheduleEndingOn: (end) => `tot en met ${end.dayOfMonth} ${lc.months[0][end.month]} ${end.year}`,
  scheduleEndsOn: (end) => `Tot en met ${end.dayOfMonth} ${lc.months[0][end.month]} ${end.year}`,
  scheduleThing: (thing, start) => start 
    ? 'Zal het ' + thing + ' plaatsvinden' 
    : ' zal het ' + thing + ' plaatsvinden',

  scheduleAtTimes: ' om ',

  scheduleDuration: (duration, unit) => ' gedurende ' + duration + ' ' + (unit ? (duration !== 1 ? unitToWordPlural[unit] : unitToWordSingular[unit]) + ' ' : ''),

  scheduleExcludes: ' met uitzondering van ',
  scheduleIncludes: ' inclusief ',
  scheduleCancels: ' met annuleringen op ',

  ruleDayOfWeek: {
    // every 2nd day of the week
    every: (every) => `iedere ${lc.suffix(every)} dag van de week`,
    // starting on the 5th day of the week
    offset: (offset) => `vanaf de ${lc.suffix(offset)} dag van de week`,
    // on the 1st, 2nd, and 4th day of the week
    oneOf: (values) => `op de ${lc.list(values.map(lc.suffix))} dag van de week`
  },
  ruleLastDayOfMonth: {
    // every 3rd last day of the month
    every: (every) => `iedere ${lc.suffix(every)} laatste dag van de maand`,
    // starting on the 2nd last day of the month
    offset: (offset) => `vanaf de ${lc.suffix(offset)} laatste dag van de maand`,
    // on the 1st, 2nd, and 3rd last day of the month
    oneOf: (values) => `op de ${lc.list(values.map(lc.suffix))} laatste dag van de maand`
  },
  ruleDayOfMonth: {
    // every 3rd day of the month
    every: (every) => `iedere ${lc.suffix(every)} dag van de maand`,
    // starting on the 2nd day of the month
    offset: (offset) => `vanaf de ${lc.suffix(offset)} dag van de maand`,
    // on the 1st, 2nd, and 3rd day of the month
    oneOf: (values) => `op de ${lc.list(values.map(lc.suffix))} dag van de maand`
  },
  ruleDayOfYear: {
    // every 3rd day of the year
    every: (every) => `iedere ${lc.suffix(every)} dag van het jaar`,
    // starting on the 2nd day of the year
    offset: (offset) => `vanaf de ${lc.suffix(offset + 1)} dag van het jaar`,
    // on the 1st, 2nd, and 3rd day of the year
    oneOf: (values) => `op de ${lc.list(values.map(lc.suffix))} dag van het jaar`
  },
  ruleYear: {
    // every 3rd year
    every: (every) => `iedere ${lc.suffix(every)} jaar`,
    // starting in 2018
    offset: (offset) => `vanaf ${offset}`,
    // in 2019, 2020, and 2021
    oneOf: (values) => `in ${lc.list(values.map(x => x.toString()))}`
  },
  ruleMonth: {
    // every 3rd month
    every: (every) => `iedere ${lc.suffix(every)} maand`,
    // starting in February
    offset: (offset) => `vanaf ${lc.months[0][offset]}`,
    // in February, May, and June
    oneOf: (values) => `in ${lc.list(values.map(x => lc.months[0][x]))}`
  },
  ruleDay: {
    // every 2nd day of the week
    every: (every) => `iedere ${lc.suffix(every)} dag van de week`,
    // starting on Tuesday
    offset: (offset) => `vanaf ${lc.weekdays[0][offset]}`,
    // on Monday, Wednesday, and Friday
    oneOf: (values) => `on ${lc.list(values.map(v => lc.weekdays[0][v]))}`
  },
  ruleWeek: {
    // every 3rd week of the year
    every: (every) => `iedere ${lc.suffix(every)} week van het jaar`,
    // starting on the 2nd week of the year
    offset: (offset) => `vanaf de ${lc.suffix(offset)} week van het jaar`,
    // on the 1st, 2nd, and 3rd week of the year
    oneOf: (values) => `op de ${lc.list(values.map(lc.suffix))} week van het jaar`
  },
  ruleWeekOfYear: {
    // every 3rd week of the year
    every: (every) => `iedere ${lc.suffix(every)} week van het jaar`,
    // starting on the 2nd week of the year
    offset: (offset) => `vanaf de ${lc.suffix(offset)} week van het jaar`,
    // on the 1st, 2nd, and 3rd week of the year
    oneOf: (values) => `op de ${lc.list(values.map(lc.suffix))} week van het jaar`
  },
  ruleWeekspanOfYear: {
    // every 3rd weekspan of the year
    every: (every) => `iedere ${lc.suffix(every + 1)} weekspanne van het jaar`,
    // starting on the 2nd weekspan of the year
    offset: (offset) => `vanaf de ${lc.suffix(offset + 1)} weekspanne van het jaar`,
    // on the 1st, 2nd, and 3rd weekspan of the year
    oneOf: (values) => `op de ${lc.list(values.map(x => lc.suffix(x + 1)))} weekspanne van het jaar`
  },
  ruleFullWeekOfYear: {
    // every 3rd full week of the year
    every: (every) => `iedere ${lc.suffix(every)} hele week van het jaar`,
    // starting on the 2nd full week of the year
    offset: (offset) => `vanaf de ${lc.suffix(offset)} hele week van het jaar`,
    // on the 1st, 2nd, and 3rd full week of the year
    oneOf: (values) => `op de ${lc.list(values.map(lc.suffix))} hele week van het jaar`
  },
  ruleLastWeekspanOfYear: {
    // every 3rd last weekspan of the year
    every: (every) => `iedere ${lc.suffix(every + 1)} laatste weekspanne van het jaar`,
    // starting on the 2nd last weekspan of the year
    offset: (offset) => `vanaf de ${lc.suffix(offset + 1)} laatste weekspanne van het jaar`,
    // on the 1st, 2nd, and 3rd last weekspan of the year
    oneOf: (values) => `op de ${lc.list(values.map(x => lc.suffix(x + 1)))} last weekspan van het jaar`
  },
  ruleLastFullWeekOfYear: {
    // every 3rd last full week of the year
    every: (every) => `iedere ${lc.suffix(every)} laatste hele week van het jaar`,
    // starting on the 2nd last full week of the year
    offset: (offset) => `vanaf de ${lc.suffix(offset)} laatste hele week van het jaar`,
    // on the 1st, 2nd, and 3rd last full week of the year
    oneOf: (values) => `op de ${lc.list(values.map(lc.suffix))} laatste hele week van het jaar`
  },
  ruleWeekOfMonth: {
    // every 3rd week of the month
    every: (every) => `iedere ${lc.suffix(every)} week van de maand`,
    // starting on the 2nd week of the month
    offset: (offset) => `vanaf de ${lc.suffix(offset)} week van de maand`,
    // on the 1st, 2nd, and 3rd week of the month
    oneOf: (values) => `op de ${lc.list(values.map(lc.suffix))} week van de maand`
  },
  ruleFullWeekOfMonth: {
    // every 3rd full week of the month
    every: (every) => `iedere ${lc.suffix(every)} hele week van de maand`,
    // starting on the 2nd full week of the month
    offset: (offset) => `vanaf de ${lc.suffix(offset)} hele week van de maand`,
    // on the 1st, 2nd, and 3rd full week of the month
    oneOf: (values) => `op de ${lc.list(values.map(lc.suffix))} hele week van de maand`
  },
  ruleWeekspanOfMonth: {
    // every 3rd weekspan of the month
    every: (every) => `iedere ${lc.suffix(every + 1)} weekspanne van de maand`,
    // starting on the 2nd weekspan of the month
    offset: (offset) => `vanaf de ${lc.suffix(offset + 1)} weekspanne van de maand`,
    // on the 1st, 2nd, and 3rd weekspan of the month
    oneOf: (values) => `op de ${lc.list(values.map(x => lc.suffix(x + 1)))} weekspanne van de maand`
  },
  ruleLastFullWeekOfMonth: {
    // every 3rd last full week of the month
    every: (every) => `iedere ${lc.suffix(every)} laatste hele week van de maand`,
    // starting on the 2nd last full week of the month
    offset: (offset) => `vanaf de ${lc.suffix(offset)} laatste hele week van de maand`,
    // on the 1st, 2nd, and 3rd full week of the month
    oneOf: (values) => `op de ${lc.list(values.map(lc.suffix))} laatste hele week van de maand`
  },
  ruleLastWeekspanOfMonth: {
    // every 3rd last weekspan of the month
    every: (every) => `iedere ${lc.suffix(every + 1)} laatste weekspanne van de maand`,
    // starting on the 2nd last weekspan of the month
    offset: (offset) => `vanaf de ${lc.suffix(offset + 1)} laatste weekspanne van de maand`,
    // on the 1st, 2nd, and 3rd last weekspan of the month
    oneOf: (values) => `op de ${lc.list(values.map(x => lc.suffix(x + 1)))} last weekspanne van de maand`
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
      out += ' en ' + items[last];
    }

    return out;
  },

  months: [
    ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'],
    ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sept', 'okt', 'nov', 'dec'],
    ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sept', 'okt', 'nov', 'dec'],
    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
  ],

  weekdays: [
    ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
    ['zon', 'maan', 'din', 'woen', 'don', 'vrij', 'zat'],
    ['zon', 'maa', 'din', 'woe', 'don', 'vrij', 'zat'],
    ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
  ],
};

export default lc;

Locales.add(['nl', 'nl-be'], lc);