
import { Locale, Locales } from '../Locale';
import de from './de';

// tslint:disable: no-magic-numbers

const deAt: Locale = 
{
  ...de,
  months: [
    ['Jänner', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktoboer', 'November', 'Dezember'],
    ['Jän', 'Feb', 'Mrz', 'Apr', 'Mai', 'Juni', 'Juli', 'Aug', 'Sept', 'Okt', 'Nov', 'Dez'],
    ['Jän', 'Feb', 'Mrz', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
    ['J', 'F', 'Mä', 'A', 'Ma', 'Ju', 'Jl', 'Ag', 'S', 'O', 'N', 'D']
  ],
}

export default deAt;

Locales.add('de-at', deAt);