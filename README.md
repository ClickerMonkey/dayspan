mi# Unitz

A unit parser, converter, & calculator for TypeScript and JS.

- [Documentation](https://clickermonkey.github.io/unitz-ts/docs/)
- [Online Tool](https://clickermonkey.github.io/unitz-ts/tester.html)
- Installation `npm install unitz-ts`, `bower install unitz-ts`, [download](https://github.com/ClickerMonkey/unitz-ts/tree/master/umd)

```javascript
// TypeScript
import { uz } from 'unitz';

// Javascript
var uz = Unitz.uz;

// Add built-in units
Unitz.Classes.addDefaults();

// Parsing
uz('2.5 cups'); // parses numbers
uz('1/2 in'); // parses fractions
uz('3 1/4'); // mixed fractions and unitless values
uz('mile'); // implicit values (1)
uz('4-5 seconds'); // parses ranges
uz('4s - 3min'); // parses ranges with mixed units
uz('2c, 4s, 23mi'); // mixed unit classes
uz('23 m/s, 60 mph, 2 1/2 liters per second'); // rates

// Transformations
uz('1.5 pints').normalize(); // = 3 cups: convert to unit in same class which is more human friendly
uz('1c, 1pt').compact(); // = 1.5 pt: join values in the same unit class together
uz('43in').expand(); // = 3 ft, 7 in: pull unit values of the same class apart to be more human friendly

// Operations
uz('1 pt').add('1 cup').normalize(); // = 3 cups
uz('1 pt').sub('1 cup').normalize(); // = 1 cup
uz('1 pt, 3 in').scale(2); // = 2 pt, 6 in
uz('1 pt, 3 in').scaleTo('6 c'); // = 3 pt, 9 in

// Convert
uz('1 - 2 gal').convert('c'); // = 16 - 32 c
uz('3 cup').conversions(); // = 3/16 gal, 3/4 qt, 1 1/2 pt, 3 c, 24 floz, 48 tbsp, 144 tsp

// Mutations
uz('3 cups').preferred(); // = 3 c: convert units to preferred
uz('-2 in, 4 mi, -2 - 2').positive(); // = 4 mi, 0 - 2: we only want positive
uz('-2 in, 4 mi, -2 - 2').negative(); // = -2 in, -2 - 0: we only want negative
uz('-2 in, 4 mi, 0 tacos').nonzero(); // = -2 in, 4 mi: we only want non-zero
uz('-2 in, 4 mi, -2 - 2').min(); // = -2 in, -2: we only the minimum values of a range
uz('-2 in, 4 mi, -2 - 2').max(); // = -2 in, 2: we only the maximum values of a range
uz('0.5 tsp').fractions(); // = 1/2 tsp: convert to fractions
uz('1/2 tsp').numbers(); // = 0.5 tsp: convert to numbers

// Sorting
uz('1 tsp, 1 pt, 4 gal').sort(); // = 4 gal, 1 pt, 1 tsp: sort values

// Dynamic unit groups
uz('1 loaf').add('4 loaves').normalize(); // = 5 loaves

// Output
uz('1 cup').output( options ); // the above functions return objects, to get a string you must call output which can take options to override the global output options.

// Alternative Input Formats
uz({ value: 34, unit: 'ms' }); // a single number value
uz({ num: 4, den: 12, unit: 'c' }); // a single fraction value
uz({ min: '4c', max: '8c' }); // a range with value strings
uz({ min:{value:1}, max:{value:2, unit:'m'} }); // range with value objects
uz([ '4c', '1-2m' ]); // range list of range/value strings
uz([ {value: 34, unit: 'ms'}, {min:'1m', max:'2m' ]); // range list of range/value objects

// Translations
Unitz.Translations.addDefaults();

uz('one pound'); // = 1 pound
uz('dozen tacos'); // = 12 tacos
uz('an eleven meters'); // = 11 meters
uz('a third of an acre'); // = 1/3acre
uz('half a dozen eggs'); // = 6eggs
uz('a seventh of a mile'); // = 1/7mile
uz('23 and a half eggs'); // = 23 1/2eggs
uz('one and a half acres'); // = 1 1/2acres
uz('23 and a third'); // = 23 1/3
uz('12 and one fourth cups'); // = 12 1/4cups
uz('(one and a half) acre'); // = 1 1/2acre
uz('(12) tacos'); // = 12 tacos
uz('1 (6 ounce)'); // = 6ounce
uz('5 (3 liter)'); // = 15liter

// Rates (aliases)
Unitz.Rates.addDefaults();

uz('60 mph');; // 60 miles/hour
uz('23 knots');; // 23 nautical miles/hour
```

### Customization

You can customize exactly how Unitz behaves.

```javascript
// The "distance" used to determine if a value is close enough to 0, 1, or if a calculated fraction is close enough to the real value.
Unitz.Functions.EPSILON = 0.001;

// The default settings for outputting values
Unitz.Core.globalOutput;

// The default settings for transforms
Unitz.Core.globalTransform;

// The default settings for sorting
Unitz.Core.globalSort;

// When preferred() is ran, use this unit
Unitz.Core.setPreferred( 'cup' );

// Set this unit group as common or uncommon
Unitz.Core.setCommon( 'cup', false ); // we don't use cups round these parts

// Set the denominators available for a unit group
Unitz.Core.setDenominators( 'cup', [2, 3, 4, 5, 6] );

// Add some units to an existing group
Unitz.Core.getGroup('cup').addUnits({
  'cupz': Unitz.Plurality.PLURAL
});

// Remove some units from an existing group
Unitz.Core.getGroup('c').removeUnits(['cup', 'cups']);

// Add my own rate
Unitz.Rates.add('feet', 'second', ['fps']);

// Add my own class
Unitz.Core.addClass(new Class('Loaf', [
  {
    system: Unitz.System.ANY,
    common: true,
    unit: 'loaf',
    baseUnit: 'loaf',
    denominators: [2, 3, 4, 5, 6, 7, 8, 9, 10],
    units: {
      'loaf': Unitz.Plurality.SINGULAR,
      'loaf of bread': Unitz.Plurality.SINGULAR,
      'loafs': Unitz.Plurality.PLURAL,
      'loaves': Unitz.Plurality.PLURAL,
      'loaves of bread': Unitz.Plurality.PLURAL
    }
  }
]));

// To create dynamic groups Unitz looks at the first 3 characters to determine if two units are matches. You can override this by figuring out a value which can be used as a key.
Unitz.Core.getDynamicMatch = function(unit) {
  // use soundex instead of the first three characters. cup and kup are equal now!
  return soundex( unit );
};

// To override the logic for determining what value is "normal" (most user friendly)
Unitz.Core.isMoreNormal = function(fromValue, toValue, transform, forOutput) {
  return true;
};
```

### Supported Units

**Angle**:
- deg, °, degree, degrees
- rad, radian, radians

**Area**:
- sqin, sq. in, sq in, in2, in^2, in&sup2;, inch2, inch^2, inch&sup2;, inches2, inches^2, inches&sup2;, square in, square inch, square inches
- sqft, sq. ft, sq ft, ft2, ft^2, ft&sup2;, foot2, foot^2, foot&sup2;, feet2, feet^2, feet&sup2;, square ft, square foot, square feet
- sqyd, sq. yd, sq yd, yd2, yd^2, yd&sup2;, yard2, yard^2, yard&sup2;, yards2, yards^2, yards&sup2;, square yd, square yard, square yards
- acre, acres
- sqmi, sq. mi, sq mi, mi2, mi^2, mi&sup2;, mile2, mile^2, mile&sup2;, miles2, miles^2, miles&sup2;, square mi, square mile, square miles
- sqmm, sq. mm, sq mm, mm2, mm^2, mm&sup2;, millimeter2, millimeter^2, millimeter&sup2;, millimeters2, millimeters^2, millimeters&sup2;, square mm, square millimeter, square millimeters
- sqcm, sq. cm, sq cm, cm2, cm^2, cm&sup2;, centimeter2, centimeter^2, centimeter&sup2;, centimeters2, centimeters^2, centimeters&sup2;, square cm, square centimeter, square centimeters
- sqm, sq. m, sq m, m2, m^2, m&sup2;, meter2, meter^2, meter&sup2;, meters2, meters^2, meters&sup2;, square m, square meter, square meters
- sqkm, sq. km, sq km, km2, km^2, km&sup2;, kilometer2, kilometer^2, kilometer&sup2;, kilometers2, kilometers^2, kilometers&sup2;, square km, square kilometer, square kilometers

**Digital**:
- b, bit, bits
- nibble, nibbles, nybble, nyble, half-byte, half byte, tetrade, semi-octent, quadbit, quartet
- B, byte, bytes
- kB, kilobyte, kilobytes
- mB, megabyte, megabytes
- gB, gigabyte, gigabytes
- tB, terabyte, terabytes
- pB, petabyte, petabytes
- eB, exabyte, exabytes
- zB, zettabyte, zettabytes
- yB, yottabyte, yottabytes
- KB, kibibyte, kibibytes
- MB, mebibyte, mebibytes
- GB, gibibyte, gibibytes
- TB, tebibyte, tebibytes
- PB, pebibyte, pebibytes
- EB, exbibyte, exbibytes
- ZB, zebibyte, zebibytes
- YB, yobibyte, yobibytes
- kb, kilobit, kilobits
- mb, megabit, megabits
- gb, gigabit, gigabits
- tb, terabit, terabits
- pb, petabit, petabits
- eb, exabit, exabits
- zb, zettabit, zettabits
- yb, yottabit, yottabits
- kibit, kibibit, kibibits
- mibit, mebibit, mebibits
- gibit, gibibit, gibibits
- tibit, tebibit, tebibits
- pibit, pebibit, pebibits
- eibit, exbibit, exbibits
- zibit, zebibit, zebibits
- yibit, yobibit, yobibits

**Length**:
- in, inch, inches, "
- ft, foot, feet, '
- yd, yard, yards, yds
- mi, mile, miles
- league, leagues
- mm, millimeter, millimeters, millimetre, millimetres
- cm, centimeter, centimeters, centimetre, centimetres
- dc, decimeter, decimeters, decimetre, decimetres
- m, meter, meters, metre, metres
- km, kms, kilometer, kilometers, kilometre, kilometres
- nm, nmi, nautical mi, nautical mile, nautical miles

**Temperature**:
- F, °F, Fahrenheit
- °C, Celsius
- K, kelvin, kelvins

**Time**:
- ns, nano, nanos, nanosecond, nanoseconds
- us, micro, micros, microsecond, microseconds
- ms, milli, millis, millisecond, milliseconds
- s, sec, secs, second, seconds
- min, mins, minute, minutes
- hr, hrs, hour, hours
- day, days
- wk, wks, week, weeks,
- yr, yrs, year, years
- score
- decade, decades
- biennium, bienniums
- triennium, trienniums
- quadrennium, quadrenniums
- lustrum, lustrums
- decade, decades
- century, centurys, centuries
- millennium, millenniums, millennia, millennias

**Volume**:
- ts, tsp, tsps, teaspoon, teaspoons
- tbsp, tbsp, tablespoon, tablespoons
- floz, fl-oz, fl oz, fluid ounce, fluid ounces, fl. oz, oz. fl, oz fl
- c, cup, cups
- pt, pint, pints,
- qt, quart, quarts
- gal gals, gallon, gallons
- ml, millilitre, millilitres, milliliter, milliliters
- cl, centilitre, centilitre, centiliter, centiliters
- l, litre, litres, liter, liters
- dl, decalitre, decalitres, decaliter, decaliters
- kl, kilolitre, kiloletres, kiloliter, kiloliters
- mm3, mm^3, mm&sup3;, millimeter3, millimeter^3, millimeter&sup3;, millimeters3, millimeters^3, millimeters&sup3;, cubic mm, cubic millimeter, cubic millimeters
- cm3, cm^3, cm&sup3;, centimeter3, centimeter^3, centimeter&sup3;, centimeters3, centimeters^3, centimeters&sup3;, cubic cm, cubic centimeter, cubic centimeters
- m3, m^3, m&sup3;, meter3, meter^3, meter&sup3;, meters3, meters^3, meters&sup3;, cubic m, cubic meter, cubic meters
- km3, km^3, km&sup3;, kilometer3, kilometer^3, kilometer&sup3;, kilometers3, kilometers^3, kilometers&sup3;, cubic km, cubic kilometer, cubic kilometers
- in3, in^3, in&sup3;, inch3, inch^3, inch&sup3;, inches3, inches^3, inches&sup3;, cubic in, cubic inch, cubic inches
- ft3, ft^3, ft&sup3;, foot3, foot^3, foot&sup3;, feet3, feet^3, feet&sup3;, cubic ft, cubic foot, cubic feet
- yd3, yd^3, yd&sup3;, yard3, yard^3, yard&sup3;, yards3, yards^3, yards&sup3;, cubic yd, cubic yard, cubic yards

**Weight**:
- mg, milligram, milligrams
- g, gram, grams
- kg, kilo, kilos, kilogram, kilograms
- oz, ounce, ounces
- lb, lbs, pound, pounds
- ton, tons, tonne, tonnes
