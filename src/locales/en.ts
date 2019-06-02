
import { Locale } from '../Locale';

// tslint:disable: no-magic-numbers

const MAP: string[] = [
  'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'
];

const lc: Locale = 
{
  weekStartsOn: 0,

  firstWeekContainsDate: 4,

  am: 'am',
  pm: 'pm',

  formatLT: 'h:mm A',
  formatLTS: 'h:mm:ss A',
  formatL: 'MM/DD/Y',
  formatl: 'M/D/Y',
  formatLL: 'MMMM D, Y',
  formatll: 'MMM D, Y',
  formatLLL: 'MMMM D, Y h:mm A',
  formatlll: 'MMM D, Y h:mm A',
  formatLLLL: 'dddd, MMMM D, Y h:mm A',
  formatllll: 'ddd, MMM D, Y h:mm A',

  suffix: (value: number) => {
    const TH_SPECIAL_MIN = 11;
    const TH_SPECIAL_MAX = 13;
    const suffix = value >= TH_SPECIAL_MIN && value <= TH_SPECIAL_MAX ? 'th' : MAP[ value % MAP.length ];

    return value + suffix;
  },

  identifierTime: (short) => short ? 'lll' : 'LLL',
  identifierDay: (short) => short ? 'll' : 'LL',
  identifierWeek: (short) => 'wo [week of] Y',
  identifierMonth: (short) => short ? 'MMM Y' : 'MMMM Y',
  identifierQuarter: (short) => 'Qo [quarter] Y',
  identifierYear: (short) => 'Y',

  patternNone: (day) => 'Does not repeat',
  patternDaily: (day) => 'Daily',
  patternWeekly: (day) => 'Weekly on ' + day.format('dddd'),
  patternMonthlyWeek: (day) => 'Monthly on the ' + lc.suffix(day.weekspanOfMonth + 1) + ' ' + day.format('dddd'),
  patternAnnually: (day) => 'Annually on ' + day.format('MMMM Do'),
  patternAnnuallyMonthWeek: (day) => 'Annually on the ' + lc.suffix(day.weekspanOfMonth + 1) + ' ' + day.format('dddd') + ' of ' + day.format('MMMM'),
  patternWeekday: (day) => 'Every weekday (Monday to Friday)',
  patternMonthly: (day) => 'Monthly on the ' + day.format('Do') + ' day',
  patternLastDay: (day) => 'Last day of the month',
  patternLastDayOfMonth: (day) => 'Last day of ' + day.format('MMMM'),
  patternLastWeekday: (day) => 'Last ' + day.format('dddd') + ' in ' + day.format('MMMM'),
  patternCustom: (day) => 'Custom...',

  scheduleStartingOn: (start) => 'Starting on ' + start.format('MMMM Do, YYYY'),
  scheduleEndingOn: (end) => ' and ending on ' + end.format('MMMM Do, YYYY'),
  scheduleEndsOn: (end) => 'Up until ' + end.format('MMMM Do, YYYY'),
  scheduleThing: (thing, start) => start ? 'The ' + thing + ' will occur' : ' the ' + thing + ' will occur',

  scheduleAtTimes: ' at ',

  scheduleDuration: (duration, unit) => ' lasting ' + duration + ' ' + (unit ? unit + (duration !== 1 ? 's' : '') + ' ' : ''),

  scheduleExcludes: ' excluding ',
  scheduleIncludes: ' including ',
  scheduleCancels: ' with cancellations on ',

  ruleDayOfWeek: {
    // every 2nd day of the week
    every: (every) => `every ${lc.suffix(every)} day of the week`,
    // starting on the 5th day of the week
    offset: (offset) => `starting on the ${lc.suffix(offset)} day of the week`,
    // on the 1st, 2nd, and 4th day of the week
    oneOf: (values) => `on the ${lc.list(values.map(lc.suffix))} day of the week`
  },
  ruleLastDayOfMonth: {
    // every 3rd last day of the month
    every: (every) => `every ${lc.suffix(every)} last day of the month`,
    // starting on the 2nd last day of the month
    offset: (offset) => `starting on the ${lc.suffix(offset)} last day of the month`,
    // on the 1st, 2nd, and 3rd last day of the month
    oneOf: (values) => `on the ${lc.list(values.map(lc.suffix))} last day of the month`
  },
  ruleDayOfMonth: {
    // every 3rd day of the month
    every: (every) => `every ${lc.suffix(every)} day of the month`,
    // starting on the 2nd day of the month
    offset: (offset) => `starting on the ${lc.suffix(offset)} day of the month`,
    // on the 1st, 2nd, and 3rd day of the month
    oneOf: (values) => `on the ${lc.list(values.map(lc.suffix))} day of the month`
  },
  ruleDayOfYear: {
    // every 3rd day of the year
    every: (every) => `every ${lc.suffix(every)} day of the year`,
    // starting on the 2nd day of the year
    offset: (offset) => `starting on the ${lc.suffix(offset + 1)} day of the year`,
    // on the 1st, 2nd, and 3rd day of the year
    oneOf: (values) => `on the ${lc.list(values.map(lc.suffix))} day of the year`
  },
  ruleYear: {
    // every 3rd year
    every: (every) => `every ${lc.suffix(every)} year`,
    // starting in 2018
    offset: (offset) => `starting in ${offset}`,
    // in 2019, 2020, and 2021
    oneOf: (values) => `in ${lc.list(values.map(x => x.toString()))}`
  },
  ruleMonth: {
    // every 3rd month
    every: (every) => `every ${lc.suffix(every)} month`,
    // starting in February
    offset: (offset) => `starting in ${lc.months[0][offset]}`,
    // in February, May, and June
    oneOf: (values) => `in ${lc.list(values.map(x => lc.months[0][x]))}`
  },
  ruleDay: {
    // every 2nd day of the week
    every: (every) => `every ${lc.suffix(every)} day of the week`,
    // starting on Tuesday
    offset: (offset) => `starting on ${lc.weekdays[0][offset]}`,
    // on Monday, Wednesday, and Friday
    oneOf: (values) => `on ${lc.list(values.map(v => lc.weekdays[0][v]))}`
  },
  ruleWeek: {
    // every 3rd week of the year
    every: (every) => `every ${lc.suffix(every)} week of the year`,
    // starting on the 2nd week of the year
    offset: (offset) => `starting on the ${lc.suffix(offset)} week of the year`,
    // on the 1st, 2nd, and 3rd week of the year
    oneOf: (values) => `on the ${lc.list(values.map(lc.suffix))} week of the year`
  },
  ruleWeekOfYear: {
    // every 3rd week of the year
    every: (every) => `every ${lc.suffix(every)} week of the year`,
    // starting on the 2nd week of the year
    offset: (offset) => `starting on the ${lc.suffix(offset)} week of the year`,
    // on the 1st, 2nd, and 3rd week of the year
    oneOf: (values) => `on the ${lc.list(values.map(lc.suffix))} week of the year`
  },
  ruleWeekspanOfYear: {
    // every 3rd weekspan of the year
    every: (every) => `every ${lc.suffix(every + 1)} weekspan of the year`,
    // starting on the 2nd weekspan of the year
    offset: (offset) => `starting on the ${lc.suffix(offset + 1)} weekspan of the year`,
    // on the 1st, 2nd, and 3rd weekspan of the year
    oneOf: (values) => `on the ${lc.list(values.map(x => lc.suffix(x + 1)))} weekspan of the year`
  },
  ruleFullWeekOfYear: {
    // every 3rd full week of the year
    every: (every) => `every ${lc.suffix(every)} full week of the year`,
    // starting on the 2nd full week of the year
    offset: (offset) => `starting on the ${lc.suffix(offset)} full week of the year`,
    // on the 1st, 2nd, and 3rd full week of the year
    oneOf: (values) => `on the ${lc.list(values.map(lc.suffix))} full week of the year`
  },
  ruleLastWeekspanOfYear: {
    // every 3rd last weekspan of the year
    every: (every) => `every ${lc.suffix(every + 1)} last weekspan of the year`,
    // starting on the 2nd last weekspan of the year
    offset: (offset) => `starting on the ${lc.suffix(offset + 1)} last weekspan of the year`,
    // on the 1st, 2nd, and 3rd last weekspan of the year
    oneOf: (values) => `on the ${lc.list(values.map(x => lc.suffix(x + 1)))} last weekspan of the year`
  },
  ruleLastFullWeekOfYear: {
    // every 3rd last full week of the year
    every: (every) => `every ${lc.suffix(every)} last full week of the year`,
    // starting on the 2nd last full week of the year
    offset: (offset) => `starting on the ${lc.suffix(offset)} last full week of the year`,
    // on the 1st, 2nd, and 3rd last full week of the year
    oneOf: (values) => `on the ${lc.list(values.map(lc.suffix))} last full week of the year`
  },
  ruleWeekOfMonth: {
    // every 3rd week of the month
    every: (every) => `every ${lc.suffix(every)} week of the month`,
    // starting on the 2nd week of the month
    offset: (offset) => `starting on the ${lc.suffix(offset)} week of the month`,
    // on the 1st, 2nd, and 3rd week of the month
    oneOf: (values) => `on the ${lc.list(values.map(lc.suffix))} week of the month`
  },
  ruleFullWeekOfMonth: {
    // every 3rd full week of the month
    every: (every) => `every ${lc.suffix(every)} full week of the month`,
    // starting on the 2nd full week of the month
    offset: (offset) => `starting on the ${lc.suffix(offset)} full week of the month`,
    // on the 1st, 2nd, and 3rd full week of the month
    oneOf: (values) => `on the ${lc.list(values.map(lc.suffix))} full week of the month`
  },
  ruleWeekspanOfMonth: {
    // every 3rd weekspan of the month
    every: (every) => `every ${lc.suffix(every + 1)} weekspan of the month`,
    // starting on the 2nd weekspan of the month
    offset: (offset) => `starting on the ${lc.suffix(offset + 1)} weekspan of the month`,
    // on the 1st, 2nd, and 3rd weekspan of the month
    oneOf: (values) => `on the ${lc.list(values.map(x => lc.suffix(x + 1)))} weekspan of the month`
  },
  ruleLastFullWeekOfMonth: {
    // every 3rd last full week of the month
    every: (every) => `every ${lc.suffix(every)} last full week of the month`,
    // starting on the 2nd last full week of the month
    offset: (offset) => `starting on the ${lc.suffix(offset)} last full week of the month`,
    // on the 1st, 2nd, and 3rd full week of the month
    oneOf: (values) => `on the ${lc.list(values.map(lc.suffix))} last full week of the month`
  },
  ruleLastWeekspanOfMonth: {
    // every 3rd last weekspan of the month
    every: (every) => `every ${lc.suffix(every + 1)} last weekspan of the month`,
    // starting on the 2nd last weekspan of the month
    offset: (offset) => `starting on the ${lc.suffix(offset + 1)} last weekspan of the month`,
    // on the 1st, 2nd, and 3rd last weekspan of the month
    oneOf: (values) => `on the ${lc.list(values.map(x => lc.suffix(x + 1)))} last weekspan of the month`
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
      out += ' and ' + items[last];
    }

    return out;
  },

  months: [
    ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    ['Ja', 'F', 'Mr', 'Ap', 'My', 'Je', 'Jl', 'Ag', 'S', 'O', 'N', 'D']
  ],

  weekdays: [
    ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'],
  ],
};

export default lc;