(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("moment"));
	else if(typeof define === 'function' && define.amd)
		define("ds", ["moment"], factory);
	else if(typeof exports === 'object')
		exports["ds"] = factory(require("moment"));
	else
		root["ds"] = factory(root["moment"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/Functions.ts

/**
 * The class which contains commonly used functions by the library. These
 * functions and variables exist in a class so they may be overridden if
 * desired.
 */
var Functions = (function () {
    function Functions() {
    }
    /**
     * Determines whether the given input is an array.
     *
     * @param input The variable to test.
     * @returns `true` if the variable is an array, otherwise `false`.
     */
    Functions.isArray = function (input) {
        return input instanceof Array;
    };
    /**
     * Determines whether the two arrays given are stricly equivalent. If the
     * arrays are not the same length or contain the same values in the same order
     * then `false` is returned.
     *
     * @param x The first array to test.
     * @param y The second array to test.
     * @returns `true` if they have the same exact values, otherwise `false`.
     */
    Functions.isArrayEquals = function (x, y) {
        if (x === y)
            return true;
        if (x.length !== y.length)
            return false;
        for (var i = 0; i < x.length; i++) {
            if (x[i] !== y[i]) {
                return false;
            }
        }
        return true;
    };
    /**
     * Determines whether the given input is a string.
     *
     * @param input The variable to test.
     * @returns `true` if the variable is a string, otherwise `false`.
     */
    Functions.isString = function (input) {
        return typeof (input) === 'string';
    };
    /**
     * Determines whether the given input is a finite number (a number which is
     * not infinite or not the result of a divide-by-zero operation).
     *
     * @param input The variable to test.
     * @returns `true` if the variable is a finite number, otherwise `false`.
     */
    Functions.isNumber = function (input) {
        return isFinite(input) && typeof input === 'number';
    };
    /**
     * Determines whether the given input is an object and NOT an array.
     *
     * @param input The variable to test.
     * @returns `true` if the variable is a plain object, otherwise `false`.
     */
    Functions.isObject = function (input) {
        return input !== null && !this.isArray(input) && typeof (input) === 'object';
    };
    /**
     * Determines whether the given input is defined.
     *
     * @param input The variable to test.
     * @return `true` if the variable is defined, otherwise `false`.
     */
    Functions.isDefined = function (input) {
        return typeof (input) !== 'undefined';
    };
    /**
     * Determines whether the given input is defined and not null.
     *
     * @param input The variable to test.
     * @return `true` if the variable is defined and not null, otherwise `false`.
     */
    Functions.isValue = function (input) {
        return input !== null && typeof (input) !== 'undefined';
    };
    /**
     * Determines whether the given input appears to be a valid
     * [[FrequencyValueEvery]].
     *
     * ```typescript
     * Functions.isFrequencyValueEvery({});                   // false
     * Functions.isFrequencyValueEvery([]);                   // false
     * Functions.isFrequencyValueEvery([1]);                  // false
     * Functions.isFrequencyValueEvery(null);                 // false
     * Functions.isFrequencyValueEvery({every:2});            // true
     * Functions.isFrequencyValueEvery({offset:1});           // false
     * Functions.isFrequencyValueEvery({every:2, offset:1});  // true
     * ```
     *
     * @param input The variable to test.
     * @returns `true` if the variable appears to be a [[FrequencyValueEvery]],
     *    otherwise false.
     */
    Functions.isFrequencyValueEvery = function (input) {
        return this.isObject(input) && this.isNumber(input.every);
    };
    /**
     * Determines whether the given input appears to be a valid
     * [[FrequencyValueOneOf]].
     *
     * ```typescript
     * Functions.isFrequencyValueOneOf({});    // false
     * Functions.isFrequencyValueOneOf([]);    // false
     * Functions.isFrequencyValueOneOf([1]);   // true
     * Functions.isFrequencyValueOneOf(null);  // false
     * ```
     *
     * @param input The variable to test.
     * @returns `true` if the variable appears to be a [[FrequencyValueOneOf]],
     *    otherwise false.
     */
    Functions.isFrequencyValueOneOf = function (input) {
        return this.isArray(input) && input.length > 0;
    };
    /**
     * Returns the first argument which is defined.
     *
     * ```typescript
     * Functions.coalesce(3, 4);                // 3
     * Functions.coalesce(undefined, 4);        // 4
     * Functions.coalesce(null, 4);             // null
     * Functions.coalesce(void 0, void 0, 5);   // 5
     * ```
     *
     * @param a The first argument to look at.
     * @param b The second argument to look at.
     * @returns The first defined argument.
     * @see [[Functions.isDefined]]
     */
    Functions.coalesce = function (a, b, c) {
        return this.isDefined(a) ? a : (this.isDefined(b) ? b : c);
    };
    /**
     * Copies values from `from` object and sets them to the `target` object.
     *
     * @param target The object to set values to.
     * @param from The object to copy value references from.
     * @returns The reference to `target`.
     */
    Functions.extend = function (target, from) {
        for (var prop in from) {
            target[prop] = from[prop];
        }
        return target;
    };
    /**
     * Pads the string `x` up to `length` characters with the given `padding`
     * optionally placing the `padding` `before` `x`.
     *
     * ```typescript
     * Functions.pad('hey', 5, '_', false);   // 'hey__'
     * Functions.pad('hey', 5, '_', true);    // '__hey'
     * Functions.pad('heyman', 5, '_', true); // 'heyman'
     * ```
     *
     * @param x The string to pad.
     * @param length The length to pad to.
     * @param padding The string to pad with.
     * @param before If the padding should go before the string to pad.
     * @returns The padded string if any padding needed be added.
     */
    Functions.pad = function (x, length, padding, before) {
        while (x.length < length) {
            before ? x = padding + x : x = x + padding;
        }
        return x;
    };
    /**
     * Pads the number `x` up to `length` digits where the padding is `0` and it
     * goes before `x`. This function will only return the first `length`
     * characters of the padding string representation of the number but can return
     * an alternative number of `first` characters.
     *
     * ```typescript
     * Functions.padNumber(29, 3);      // '029'
     * Functions.padNumber(29, 3, 2);   // '02'
     * Functions.padNumber(9573, 3);    // '957'
     * ```
     *
     * @param x The number to pad with zeros in the beginning.
     * @param length The number of digits the number should be padded to.
     * @param first The number of digits to return from the start of the string.
     * @returns A padded number.
     */
    Functions.padNumber = function (x, length, first) {
        if (first === void 0) { first = length; }
        return this.pad(x + '', length, '0', true).substring(0, first);
    };
    return Functions;
}());


// CONCATENATED MODULE: ./src/Operation.ts

/**
 * An operation that can be performed on a single number.
 */
var Op;
(function (Op) {
    /**
     * The number is returned unmodified.
     */
    Op[Op["NONE"] = 0] = "NONE";
    /**
     * The number is rounded down to the nearest whole number.
     */
    Op[Op["FLOOR"] = 1] = "FLOOR";
    /**
     * The number is rounded up to the nearest whole number.
     */
    Op[Op["CEIL"] = 2] = "CEIL";
    /**
     * The number is rounded up or down depending on if the fractional value is
     * greater than or less than 0.5 respectively.
     */
    Op[Op["ROUND"] = 3] = "ROUND";
    /**
     * The fractional part of the number is dropped.
     */
    Op[Op["TRUNCATE"] = 4] = "TRUNCATE";
    /**
     * The number is rounded up when positive and down when negative. This is
     * effectively ceiling the absolute value where the result preserves the sign.
     */
    Op[Op["UP"] = 5] = "UP";
    /**
     * The number is rounded down when positive and up when negative. This is
     * effectively floor the absolute value where the result preserves the sign.
     */
    Op[Op["DOWN"] = 6] = "DOWN";
})(Op = Op || (Op = {}));
/**
 * Performs the requested operation on the given number, optionally taking
 * the absolute value of the number before the operation.
 *
 * @param value The number to operate on.
 * @param op The operation to perform.
 * @param absolute If the number should be positive before the operation.
 * @return The operated result, or the original value if its not a valid number.
 */
function operate(value, op, absolute) {
    if (absolute === void 0) { absolute = false; }
    if (isFinite(value)) {
        if (absolute) {
            value = Math.abs(value);
        }
        switch (op) {
            case Op.NONE:
                return value;
            case Op.FLOOR:
                return Math.floor(value);
            case Op.CEIL:
                return Math.ceil(value);
            case Op.ROUND:
                return Math.round(value);
            case Op.TRUNCATE:
            case Op.DOWN:
                return value < 0 ? Math.ceil(value) : Math.floor(value);
            case Op.UP:
                return value < 0 ? Math.floor(value) : Math.ceil(value);
        }
    }
    return value;
}

// CONCATENATED MODULE: ./src/Units.ts

/**
 * Units of time that are compromised of 1 or more days for the [[Calendar]] class.
 */
var Units;
(function (Units) {
    Units[Units["DAY"] = 0] = "DAY";
    Units[Units["WEEK"] = 1] = "WEEK";
    Units[Units["MONTH"] = 2] = "MONTH";
    Units[Units["YEAR"] = 3] = "YEAR";
})(Units = Units || (Units = {}));

// CONCATENATED MODULE: ./src/Constants.ts

/**
 * A class that stores commonly used values.
 */
var Constants = (function () {
    function Constants() {
    }
    /**
     * The number of milliseconds in a second.
     */
    Constants.MILLIS_IN_SECOND = 1000;
    /**
     * The number of milliseconds in a minute.
     */
    Constants.MILLIS_IN_MINUTE = Constants.MILLIS_IN_SECOND * 60;
    /**
     * The number of milliseconds in an hour.
     */
    Constants.MILLIS_IN_HOUR = Constants.MILLIS_IN_MINUTE * 60;
    /**
     * The number of milliseconds in a day (not including DST days).
     */
    Constants.MILLIS_IN_DAY = Constants.MILLIS_IN_HOUR * 24;
    /**
     * The number of milliseconds in a week (not including ones that include DST).
     */
    Constants.MILLIS_IN_WEEK = Constants.MILLIS_IN_DAY * 7;
    /**
     * The number of minutes in an hour.
     */
    Constants.MINUTES_IN_HOUR = 60;
    /**
     * The number of minutes in a day (not including DST days).
     */
    Constants.MINUTES_IN_DAY = 60 * 24;
    /**
     * The number of days in a week.
     */
    Constants.DAYS_IN_WEEK = 7;
    /**
     * The number of months in a year.
     */
    Constants.MONTHS_IN_YEAR = 12;
    /**
     * The number of hours in a day (not including DST days).
     */
    Constants.HOURS_IN_DAY = 24;
    /**
     * The first month of the year.
     */
    Constants.MONTH_MIN = 0;
    /**
     * The last month of the year.
     */
    Constants.MONTH_MAX = 11;
    /**
     * The first day of a month.
     */
    Constants.DAY_MIN = 1;
    /**
     * The last day of the longest month.
     */
    Constants.DAY_MAX = 31;
    /**
     * The first hour of the day.
     */
    Constants.HOUR_MIN = 0;
    /**
     * The last hour of the day.
     */
    Constants.HOUR_MAX = 23;
    /**
     * The first minute of the hour.
     */
    Constants.MINUTE_MIN = 0;
    /**
     * The last minute of the hour.
     */
    Constants.MINUTE_MAX = 59;
    /**
     * The first second of the minute.
     */
    Constants.SECOND_MIN = 0;
    /**
     * The last second of the minute.
     */
    Constants.SECOND_MAX = 59;
    /**
     * The first millisecond of the second.
     */
    Constants.MILLIS_MIN = 0;
    /**
     * The last millisecond of the second.
     */
    Constants.MILLIS_MAX = 999;
    /**
     * The first day of the week.
     */
    Constants.WEEKDAY_MIN = 0;
    /**
     * The last day of the week.
     */
    Constants.WEEKDAY_MAX = 6;
    /**
     * The default duration for an event.
     */
    Constants.DURATION_DEFAULT = 1;
    /**
     * The default duration unit for an all day event.
     */
    Constants.DURATION_DEFAULT_UNIT_ALL = 'days';
    /**
     * The default duration unit for an event at a given time.
     */
    Constants.DURATION_DEFAULT_UNIT_TIMES = 'hours';
    /**
     * Computes the duration unit given its for an all day event.
     *
     * @param all If the event is all day.
     * @return The default unit for the event.
     */
    Constants.DURATION_DEFAULT_UNIT = function (all) { return all ? Constants.DURATION_DEFAULT_UNIT_ALL :
        Constants.DURATION_DEFAULT_UNIT_TIMES; };
    /**
     * The number of milliseconds for various duration units. These are worse case
     * scenario and do not include DST changes.
     */
    Constants.DURATION_TO_MILLIS = {
        minute: Constants.MILLIS_IN_MINUTE,
        minutes: Constants.MILLIS_IN_MINUTE,
        hour: Constants.MILLIS_IN_HOUR,
        hours: Constants.MILLIS_IN_HOUR,
        day: Constants.MILLIS_IN_DAY,
        days: Constants.MILLIS_IN_DAY,
        week: Constants.MILLIS_IN_WEEK,
        weeks: Constants.MILLIS_IN_WEEK,
        month: Constants.MILLIS_IN_DAY * Constants.DAY_MAX,
        months: Constants.MILLIS_IN_DAY * Constants.DAY_MAX
    };
    /**
     * The maximum estimated number of events per day. This is used to calculate
     * [[CalendarEvent.id]] to give each event a unique ID. If you think you will
     * have more events than this per day, you can enlarge the value.
     */
    Constants.MAX_EVENTS_PER_DAY = 24;
    /**
     * The day of the week which determines the first week of the year or month.
     * By default this day is Thursday.
     */
    Constants.WEEK_OF_MONTH_MINIMUM_WEEKDAY = 4;
    return Constants;
}());


// CONCATENATED MODULE: ./src/DaySpan.ts





/**
 * A class for a range of time between two [[Day]] timestamps.
 */
var DaySpan_DaySpan = (function () {
    /**
     * Creates a new span of time.
     *
     * @param start The starting timestamp.
     * @param end The ending timestamp.
     */
    function DaySpan(start, end) {
        this.start = start;
        this.end = end;
    }
    Object.defineProperty(DaySpan.prototype, "isPoint", {
        /**
         * Whether this span starts and ends on the same timestamp.
         */
        get: function () {
            return this.start.time === this.end.time;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Determines whether the given timestamp lies between the start and end
     * timestamp.
     *
     * @param day The timestamp to test.
     * @returns True if the day is >= the start and <= the end of this span.
     */
    DaySpan.prototype.contains = function (day) {
        return day.time >= this.start.time && day.time <= this.end.time;
    };
    /**
     * Compares the given timestamp to this span. If the timestamp is before this
     * span then `-1` is returned, if the timestamp is after this span then `1`
     * us returned, otherwise `0` is returned when the timestamp is in this span.
     *
     * @param day The timestamp to compare to.
     * @returns `-1`, `0`, or `1` depending on the given timestamp relative to
     *    this span.
     */
    DaySpan.prototype.compareTo = function (day) {
        return day.time < this.start.time ? -1 : (day.time > this.end.time ? 1 : 0);
    };
    /**
     * Determines whether the given timestamp is between the start and end
     * timestamp or lies on the same day as the start or end timestamp.
     *
     * @param day The timestamp to test.
     * @see [[Day.sameDay]]
     */
    DaySpan.prototype.matchesDay = function (day) {
        return this.contains(day) || day.sameDay(this.start) || day.sameDay(this.end);
    };
    /**
     * Determines whether the given timestamp is between the start and end
     * timestamp or lies on the same week as the start or end timestamp.
     *
     * @param day The timestamp to test.
     * @see [[Day.sameWeek]]
     */
    DaySpan.prototype.matchesWeek = function (day) {
        return this.contains(day) || day.sameWeek(this.start) || day.sameWeek(this.end);
    };
    /**
     * Determines whether the given timestamp is between the start and end
     * timestamp or lies on the same month as the start or end timestamp.
     *
     * @param day The timestamp to test.
     * @see [[Day.sameMonth]]
     */
    DaySpan.prototype.matchesMonth = function (day) {
        return this.contains(day) || day.sameMonth(this.start) || day.sameMonth(this.end);
    };
    /**
     * Determines whether the given timestamp is between the start and end
     * timestamp or lies on the same year as the start or end timestamp.
     *
     * @param day The timestamp to test.
     * @see [[Day.sameYear]]
     */
    DaySpan.prototype.matchesYear = function (day) {
        return this.contains(day) || day.sameYear(this.start) || day.sameYear(this.end);
    };
    /**
     * Calculates the number of milliseconds between the start and end timestamp.
     *
     * @param op The operation to perform on the result.
     * @param absolute Whether the result should always be positive.
     * @returns The time between the start and end timestamp.
     * @see [[Day.millisBetween]]
     */
    DaySpan.prototype.millis = function (op, absolute) {
        if (op === void 0) { op = Op.DOWN; }
        if (absolute === void 0) { absolute = true; }
        return this.start.millisBetween(this.end, op, absolute);
    };
    /**
     * Calculates the number of seconds between the start and end timestamp.
     *
     * @param op The operation to perform on the result.
     * @param absolute Whether the result should always be positive.
     * @returns The time between the start and end timestamp.
     * @see [[Day.secondsBetween]]
     */
    DaySpan.prototype.seconds = function (op, absolute) {
        if (op === void 0) { op = Op.DOWN; }
        if (absolute === void 0) { absolute = true; }
        return this.start.secondsBetween(this.end, op, absolute);
    };
    /**
     * Calculates the number of minutes between the start and end timestamp.
     *
     * @param op The operation to perform on the result.
     * @param absolute Whether the result should always be positive.
     * @returns The time between the start and end timestamp.
     * @see [[Day.minutesBetween]]
     */
    DaySpan.prototype.minutes = function (op, absolute) {
        if (op === void 0) { op = Op.DOWN; }
        if (absolute === void 0) { absolute = true; }
        return this.start.minutesBetween(this.end, op, absolute);
    };
    /**
     * Calculates the number of hours between the start and end timestamp.
     *
     * @param op The operation to perform on the result.
     * @param absolute Whether the result should always be positive.
     * @returns The time between the start and end timestamp.
     * @see [[Day.hoursBetween]]
     */
    DaySpan.prototype.hours = function (op, absolute) {
        if (op === void 0) { op = Op.DOWN; }
        if (absolute === void 0) { absolute = true; }
        return this.start.hoursBetween(this.end, op, absolute);
    };
    /**
     * Calculates the number of days between the start and end timestamp.
     *
     * @param op The operation to perform on the result.
     * @param absolute Whether the result should always be positive.
     * @returns The time between the start and end timestamp.
     * @see [[Day.daysBetween]]
     */
    DaySpan.prototype.days = function (op, absolute) {
        if (op === void 0) { op = Op.DOWN; }
        if (absolute === void 0) { absolute = true; }
        return this.start.daysBetween(this.end, op, absolute);
    };
    /**
     * Calculates the number of weeks between the start and end timestamp.
     *
     * @param op The operation to perform on the result.
     * @param absolute Whether the result should always be positive.
     * @returns The time between the start and end timestamp.
     * @see [[Day.weeksBetween]]
     */
    DaySpan.prototype.weeks = function (op, absolute) {
        if (op === void 0) { op = Op.DOWN; }
        if (absolute === void 0) { absolute = true; }
        return this.start.weeksBetween(this.end, op, absolute);
    };
    /**
     * Calculates the number of months between the start and end timestamp.
     *
     * @param op The operation to perform on the result.
     * @param absolute Whether the result should always be positive.
     * @returns The time between the start and end timestamp.
     * @see [[Day.monthsBetween]]
     */
    DaySpan.prototype.months = function (op, absolute) {
        if (op === void 0) { op = Op.DOWN; }
        if (absolute === void 0) { absolute = true; }
        return this.start.monthsBetween(this.end, op, absolute);
    };
    /**
     * Calculates the number of years between the start and end timestamp.
     *
     * @param op The operation to perform on the result.
     * @param absolute Whether the result should always be positive.
     * @returns The time between the start and end timestamp.
     * @see [[Day.yearsBetween]]
     */
    DaySpan.prototype.years = function (op, absolute) {
        if (op === void 0) { op = Op.DOWN; }
        if (absolute === void 0) { absolute = true; }
        return this.start.yearsBetween(this.end, op, absolute);
    };
    /**
     * Returns a delta value between 0 and 1 which represents where the
     * [[DaySpan.start]] is relative to the given day. The delta value would
     * be less than 0 if the start of the event is before the given day.
     *
     * @param relativeTo The day to find the start delta relative to.
     * @return A number between 0 and 1 if the start of this span is in the
     *    24-hour period starting at the given timestamp, otherwise the value
     *    returned may be less than 0 or greater than 1.
     */
    DaySpan.prototype.startDelta = function (relativeTo) {
        return (this.start.time - relativeTo.time) / Constants.MILLIS_IN_DAY;
    };
    /**
     * Returns a delta value between 0 and 1 which represents where the
     * [[DaySpan.end]] is relative to the given day. The delta value would
     * be greater than 1 if the end of the event is after the given day.
     *
     * @param relativeTo The day to find the end delta relative to.
     * @return A number between 0 and 1 if the end of this span is in the
     *    24-hour period starting at the given timestamp, otherwise the value
     *    returned may be less than 0 or greater than 1.
     */
    DaySpan.prototype.endDelta = function (relativeTo) {
        return (this.end.time - relativeTo.time) / Constants.MILLIS_IN_DAY;
    };
    /**
     * Calculates the bounds for span event if it were placed in a rectangle which
     * represents a day (24 hour period). By default the returned values are
     * between 0 and 1 and can be scaled by the proper rectangle dimensions or the
     * rectangle dimensions can be passed to this function.
     *
     * @param relativeTo The day to find the bounds relative to. If this is not the
     *    start of the day the returned bounds is relative to the given time.
     * @param dayHeight The height of the rectangle of the day.
     * @param dayWidth The width of the rectangle of the day.
     * @param columnOffset The offset in the rectangle of the day to adjust this
     *    span by. This also reduces the width of the returned bounds to keep the
     *    bounds in the rectangle of the day.
     * @param clip `true` if the bounds should stay in the day rectangle, `false`
     *    and the bounds may go outside the rectangle of the day for multi-day
     *    spans.
     * @param offsetX How much to translate the left & right properties by.
     * @param offsetY How much to translate the top & bottom properties by.
     * @returns The calculated bounds for this span.
     */
    DaySpan.prototype.getBounds = function (relativeTo, dayHeight, dayWidth, columnOffset, clip, offsetX, offsetY) {
        if (dayHeight === void 0) { dayHeight = 1; }
        if (dayWidth === void 0) { dayWidth = 1; }
        if (columnOffset === void 0) { columnOffset = 0; }
        if (clip === void 0) { clip = true; }
        if (offsetX === void 0) { offsetX = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        var startRaw = this.startDelta(relativeTo);
        var endRaw = this.endDelta(relativeTo);
        var start = clip ? Math.max(0, startRaw) : startRaw;
        var end = clip ? Math.min(1, endRaw) : endRaw;
        var left = columnOffset;
        var right = dayWidth - left;
        var top = start * dayHeight;
        var bottom = end * dayHeight;
        return {
            top: top + offsetY,
            bottom: bottom + offsetY,
            height: bottom - top,
            left: left + offsetX,
            right: right + offsetX,
            width: right
        };
    };
    /**
     * Summarizes this span given an approximate unit of time and a few other
     * options. If the start and end are on the same unit, a single value will
     * be returned. Otherwise a start and end will be returned with a `delimiter`.
     *
     * @param type The unit of time this span is for.
     * @param dayOfWeek When `true` the weekday of the start and end are included.
     * @param short When `true` the short form of weekdays and months will be used.
     * @param repeat When `true` the year will be repeated on the start and end
     *  timestamp even if they are the same year.
     * @param contextual When `true` the year will be hidden if it's the current
     *  year.
     * @param delimiter The string to separate the start and end timestamps with.
     * @returns The summary of this span.
     */
    DaySpan.prototype.summary = function (type, dayOfWeek, short, repeat, contextual, delimiter) {
        if (dayOfWeek === void 0) { dayOfWeek = true; }
        if (short === void 0) { short = false; }
        if (repeat === void 0) { repeat = false; }
        if (contextual === void 0) { contextual = true; }
        if (delimiter === void 0) { delimiter = ' - '; }
        var formats = DaySpan.SUMMARY_FORMATS[type];
        var today = Day_Day.today();
        var showStartYear = !contextual || !this.start.sameYear(today);
        var showEndYear = !contextual || !this.end.sameYear(today);
        var start = this.start.format(formats(short, dayOfWeek, showStartYear));
        var end = this.end.format(formats(short, dayOfWeek, showEndYear));
        var summary = start;
        if (start !== end) {
            if (!repeat) {
                summary = this.start.format(formats(short, dayOfWeek, !this.start.sameYear(this.end)));
            }
            summary += delimiter;
            summary += end;
        }
        else {
            summary = start;
        }
        return summary;
    };
    /**
     * Determines whether the gven span intersects with this span.
     *
     * @param span The span to test.
     * @returns `true` if the spans intersect, otherwise `false`.
     */
    DaySpan.prototype.intersects = function (span) {
        return !(this.end.time < span.start.time ||
            this.start.time > span.end.time);
    };
    /**
     * Calculates the intersection between this span and the given span. If there
     * is no intersection between the two spans then `null` is returned.
     *
     * @param span The span to calculate the intersection with.
     * @returns The intersection or `null` if none exists.
     */
    DaySpan.prototype.intersection = function (span) {
        var start = this.start.max(span.start);
        var end = this.end.min(span.end);
        return start.isAfter(end) ? null : new DaySpan(start, end);
    };
    /**
     * Calculates the union between this span and the given span.
     *
     * @param span The span to calculate the union with.
     * @returns The union of the two spans.
     */
    DaySpan.prototype.union = function (span) {
        var start = this.start.min(span.start);
        var end = this.end.max(span.end);
        return new DaySpan(start, end);
    };
    /**
     * Returns a point [[DaySpan]] with the same start and end timestamp.
     *
     * @param day The timestamp which will be the start and end.
     * @returns The new instance.
     * @see [[DaySpan.isPoint]]
     */
    DaySpan.point = function (day) {
        return new DaySpan(day, day);
    };
    /**
     * Formatting functions which assist the [[DaySpan.summary]] function.
     */
    DaySpan.SUMMARY_FORMATS = (DaySpan__a = {},
        DaySpan__a[Units.DAY] = function (short, dayOfWeek, year) {
            return (dayOfWeek ? (short ? 'ddd, ' : 'dddd, ') : '') + (short ? 'MMM ' : 'MMMM ') + 'Do' + (year ? ' YYYY' : '');
        },
        DaySpan__a[Units.WEEK] = function (short, dayOfWeek, year) {
            return (dayOfWeek ? (short ? 'ddd, ' : 'dddd, ') : '') + (short ? 'MMM ' : 'MMMM ') + 'Do' + (year ? ' YYYY' : '');
        },
        DaySpan__a[Units.MONTH] = function (short, dayOfWeek, year) {
            return (short ? 'MMM' : 'MMMM') + (year ? ' YYYY' : '');
        },
        DaySpan__a[Units.YEAR] = function (short, dayOfWeek, year) {
            return (year ? 'YYYY' : '');
        },
        DaySpan__a);
    return DaySpan;
}());

var DaySpan__a;

// CONCATENATED MODULE: ./src/Identifier.ts

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



/**
 * A class for detecting, parsing, and building identifiers to and from days.
 *
 * An identifier is a simple value which represents a span of time. It may
 * represent an entire year, a quarter (3 months) of a year, a week of a year,
 * a month in a year, a specific day of a month of a year, or a specific hour,
 * minute, day, and month of a year.
 *
 * For example:
 * - `2018`: The year 2018
 * - `201801`: January 2018
 * - `2014023`: The 23rd week of 2014
 * - `20170311`: March 11th, 2017
 * - `201406151651`: June 15th 2016 at 4:51 pm
 * - `'0525'`: Year 525 of the first age, Elrond and Elros are born
 */
var Identifier_Identifier = (function () {
    function Identifier() {
    }
    /**
     * Determines whether the given identifier is this type.
     *
     * @param id The identifier to test.
     * @returns `true` if the identifier is this type, otherwise `false`.
     */
    Identifier.prototype.is = function (id) {
        return (id + '').length === this.getLength();
    };
    /**
     * Computes the identifier given values taken from a [[Day]].
     *
     * @param values The values to compute.
     * @returns The computed identifier.
     */
    Identifier.prototype.compute = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var scales = this.getScales();
        var total = 0;
        for (var i = 0; i < values.length; i++) {
            total += values[i] * scales[i];
        }
        return this.is(total) ? total : Functions.padNumber(total, this.getLength());
    };
    /**
     * Decomputes the given identifier and returns values which describe a span
     * of time.
     *
     * @param id The identifier to decompute.
     * @returns The original values which computed the identifier.
     */
    Identifier.prototype.decompute = function (id) {
        var scales = this.getScales();
        var total = Functions.isNumber(id) ? id : parseInt(id);
        var values = [];
        for (var i = 0; i < scales.length - 1; i++) {
            var curr = scales[i + 0];
            var next = scales[i + 1];
            var mod = next / curr;
            var value = total % mod;
            values.push(value);
            total = Math.floor(total / mod);
        }
        values.push(total);
        return values;
    };
    /**
     * Finds which identifier type matches the given identifier, if any.
     *
     * @param id The identifier to find the type of.
     * @returns The found identifier type, otherwise `null` if none exists.
     */
    Identifier.find = function (id) {
        if (this.Time.is(id))
            return this.Time;
        if (this.Day.is(id))
            return this.Day;
        if (this.Week.is(id))
            return this.Week;
        if (this.Month.is(id))
            return this.Month;
        if (this.Year.is(id))
            return this.Year;
        return null;
    };
    /**
     * Determines whether the given time span `outer` contains the time span
     * `inner`.
     *
     * @param outer The potentially larger time span `inner` must be contained in.
     * @param inner The time span to test is contained inside `outer`.
     * @returns `true` if `inner` is equal to or contained in `outer`, otherwise
     *    `false`.
     */
    Identifier.contains = function (outer, inner) {
        var outerString = outer + '';
        return (inner + '').substring(0, outerString.length) === outerString;
    };
    /**
     * The identifier type for an hour of time on a specific day.
     */
    Identifier.Time = null;
    /**
     * The identifier type for a specific day.
     */
    Identifier.Day = null;
    /**
     * The identifier type for a specific week of a year.
     */
    Identifier.Week = null;
    /**
     * The identifier type for a specific month of a year.
     */
    Identifier.Month = null;
    /**
     * The identifier type for a specific quarter of a year.
     */
    Identifier.Quarter = null;
    /**
     * The identifier type for a specific year.
     */
    Identifier.Year = null;
    return Identifier;
}());

// YYYYMMddHHmm (12)
var Identifier_IdentifierTime = (function (_super) {
    __extends(IdentifierTime, _super);
    function IdentifierTime() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IdentifierTime.prototype.getScales = function () {
        return IdentifierTime.SCALES;
    };
    IdentifierTime.prototype.getLength = function () {
        return IdentifierTime.LENGTH;
    };
    IdentifierTime.prototype.get = function (day) {
        return this.compute(day.minute, day.hour, day.dayOfMonth, day.month + 1, day.year);
    };
    IdentifierTime.prototype.object = function (id) {
        var values = this.decompute(id);
        return {
            minute: values[0],
            hour: values[1],
            day: values[2],
            month: values[3] - 1,
            year: values[4]
        };
    };
    IdentifierTime.prototype.start = function (id) {
        var obj = this.object(id);
        var start = Day_Day.build(obj.year, obj.month, obj.day, obj.hour, obj.minute);
        return start;
    };
    IdentifierTime.prototype.span = function (id, endInclusive) {
        if (endInclusive === void 0) { endInclusive = false; }
        var start = this.start(id);
        var end = start.endOfHour(endInclusive);
        return new DaySpan_DaySpan(start, end);
    };
    IdentifierTime.prototype.describe = function (id, short) {
        if (short === void 0) { short = false; }
        var start = this.start(id);
        var format = short ? IdentifierTime.DESCRIBE_FORMAT_SHORT : IdentifierTime.DESCRIBE_FORMAT_LONG;
        return start.format(format);
    };
    IdentifierTime.prototype.matches = function (day, id) {
        return day.timeIdentifier === id;
        /*
        let obj: IdentifierObject = this.object(id);
    
        return (
          day.year === obj.year &&
          day.month === obj.month &&
          day.dayOfMonth === obj.day &&
          day.hour === obj.hour &&
          day.minute === obj.minute
        );
        */
    };
    IdentifierTime.DESCRIBE_FORMAT_LONG = 'LLL';
    IdentifierTime.DESCRIBE_FORMAT_SHORT = 'lll';
    IdentifierTime.SCALES = [
        1 /* minute */,
        100 /* hour   */,
        10000 /* day    */,
        1000000 /* month  */,
        100000000 /* year   */
    ];
    IdentifierTime.LENGTH = 12;
    return IdentifierTime;
}(Identifier_Identifier));
// YYYYMMdd (8)
var Identifier_IdentifierDay = (function (_super) {
    __extends(IdentifierDay, _super);
    function IdentifierDay() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IdentifierDay.prototype.getScales = function () {
        return IdentifierDay.SCALES;
    };
    IdentifierDay.prototype.getLength = function () {
        return IdentifierDay.LENGTH;
    };
    IdentifierDay.prototype.get = function (day) {
        return this.compute(day.dayOfMonth, day.month + 1, day.year);
    };
    IdentifierDay.prototype.object = function (id) {
        var values = this.decompute(id);
        return {
            day: values[0],
            month: values[1] - 1,
            year: values[2]
        };
    };
    IdentifierDay.prototype.start = function (id) {
        var obj = this.object(id);
        var start = Day_Day.build(obj.year, obj.month, obj.day);
        return start;
    };
    IdentifierDay.prototype.span = function (id, endInclusive) {
        if (endInclusive === void 0) { endInclusive = false; }
        var start = this.start(id);
        var end = start.end(endInclusive);
        return new DaySpan_DaySpan(start, end);
    };
    IdentifierDay.prototype.describe = function (id, short) {
        if (short === void 0) { short = false; }
        var start = this.start(id);
        var format = short ? IdentifierDay.DESCRIBE_FORMAT_SHORT : IdentifierDay.DESCRIBE_FORMAT_LONG;
        return start.format(format);
    };
    IdentifierDay.prototype.matches = function (day, id) {
        return day.dayIdentifier === id;
        /*
        let obj: IdentifierObject = this.object(id);
    
        return (
          day.year === obj.year &&
          day.month === obj.month &&
          day.dayOfMonth === obj.day
        );
        */
    };
    IdentifierDay.DESCRIBE_FORMAT_LONG = 'LL';
    IdentifierDay.DESCRIBE_FORMAT_SHORT = 'll';
    IdentifierDay.SCALES = [
        1 /* day     */,
        100 /* month   */,
        10000 /* year    */
    ];
    IdentifierDay.LENGTH = 8;
    return IdentifierDay;
}(Identifier_Identifier));
// YYYY0ww (7)
var Identifier_IdentifierWeek = (function (_super) {
    __extends(IdentifierWeek, _super);
    function IdentifierWeek() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IdentifierWeek.prototype.getScales = function () {
        return IdentifierWeek.SCALES;
    };
    IdentifierWeek.prototype.getLength = function () {
        return IdentifierWeek.LENGTH;
    };
    IdentifierWeek.prototype.get = function (day) {
        return this.compute(day.week, day.year);
    };
    IdentifierWeek.prototype.object = function (id) {
        var values = this.decompute(id);
        return {
            week: values[0],
            year: values[1]
        };
    };
    IdentifierWeek.prototype.start = function (id) {
        var obj = this.object(id);
        var start = Day_Day.build(obj.year, 0).withWeek(obj.week);
        return start;
    };
    IdentifierWeek.prototype.span = function (id, endInclusive) {
        if (endInclusive === void 0) { endInclusive = false; }
        var start = this.start(id);
        var end = start.endOfWeek(endInclusive);
        return new DaySpan_DaySpan(start, end);
    };
    IdentifierWeek.prototype.describe = function (id, short) {
        if (short === void 0) { short = false; }
        var start = this.start(id);
        var format = short ? IdentifierWeek.DESCRIBE_FORMAT_SHORT : IdentifierWeek.DESCRIBE_FORMAT_LONG;
        return start.format(format);
    };
    IdentifierWeek.prototype.matches = function (day, id) {
        return day.weekIdentifier === id;
        /*
        let obj: IdentifierObject = this.object(id);
    
        return (
          day.year === obj.year &&
          day.week === obj.week
        );
        */
    };
    IdentifierWeek.DESCRIBE_FORMAT_LONG = 'wo [week of] YYYY';
    IdentifierWeek.DESCRIBE_FORMAT_SHORT = 'wo [week of] YYYY';
    IdentifierWeek.SCALES = [
        1 /* week   */,
        1000 /* year   */
    ];
    IdentifierWeek.LENGTH = 7;
    return IdentifierWeek;
}(Identifier_Identifier));
// YYYYMM (6)
var Identifier_IdentifierMonth = (function (_super) {
    __extends(IdentifierMonth, _super);
    function IdentifierMonth() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IdentifierMonth.prototype.getScales = function () {
        return IdentifierMonth.SCALES;
    };
    IdentifierMonth.prototype.getLength = function () {
        return IdentifierMonth.LENGTH;
    };
    IdentifierMonth.prototype.get = function (day) {
        return this.compute(day.month + 1, day.year);
    };
    IdentifierMonth.prototype.object = function (id) {
        var values = this.decompute(id);
        return {
            month: values[0] - 1,
            year: values[1]
        };
    };
    IdentifierMonth.prototype.start = function (id) {
        var obj = this.object(id);
        var start = Day_Day.build(obj.year, obj.month);
        return start;
    };
    IdentifierMonth.prototype.span = function (id, endInclusive) {
        if (endInclusive === void 0) { endInclusive = false; }
        var start = this.start(id);
        var end = start.endOfMonth(endInclusive);
        return new DaySpan_DaySpan(start, end);
    };
    IdentifierMonth.prototype.describe = function (id, short) {
        if (short === void 0) { short = false; }
        var start = this.start(id);
        var format = short ? IdentifierMonth.DESCRIBE_FORMAT_SHORT : IdentifierMonth.DESCRIBE_FORMAT_LONG;
        return start.format(format);
    };
    IdentifierMonth.prototype.matches = function (day, id) {
        return day.monthIdentifier === id;
        /*
        let obj: IdentifierObject = this.object(id);
    
        return (
          day.year === obj.year &&
          day.month === obj.month
        );
        */
    };
    IdentifierMonth.DESCRIBE_FORMAT_LONG = 'MMMM YYYY';
    IdentifierMonth.DESCRIBE_FORMAT_SHORT = 'MMM YYYY';
    IdentifierMonth.SCALES = [
        1 /* month  */,
        100 /* year   */
    ];
    IdentifierMonth.LENGTH = 6;
    return IdentifierMonth;
}(Identifier_Identifier));
// YYYYQ (5)
var Identifier_IdentifierQuarter = (function (_super) {
    __extends(IdentifierQuarter, _super);
    function IdentifierQuarter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IdentifierQuarter.prototype.getScales = function () {
        return IdentifierQuarter.SCALES;
    };
    IdentifierQuarter.prototype.getLength = function () {
        return IdentifierQuarter.LENGTH;
    };
    IdentifierQuarter.prototype.get = function (day) {
        return this.compute(day.quarter, day.year);
    };
    IdentifierQuarter.prototype.object = function (id) {
        var values = this.decompute(id);
        return {
            quarter: values[0],
            year: values[1]
        };
    };
    IdentifierQuarter.prototype.start = function (id) {
        var obj = this.object(id);
        var start = Day_Day.build(obj.year, (obj.quarter - 1) * 3);
        return start;
    };
    IdentifierQuarter.prototype.span = function (id, endInclusive) {
        if (endInclusive === void 0) { endInclusive = false; }
        var start = this.start(id);
        var end = start.relativeMonths(3).endOfMonth(endInclusive);
        return new DaySpan_DaySpan(start, end);
    };
    IdentifierQuarter.prototype.describe = function (id, short) {
        if (short === void 0) { short = false; }
        var start = this.start(id);
        var format = short ? IdentifierQuarter.DESCRIBE_FORMAT_SHORT : IdentifierQuarter.DESCRIBE_FORMAT_LONG;
        return start.format(format);
    };
    IdentifierQuarter.prototype.matches = function (day, id) {
        return day.quarterIdentifier === id;
        /*
        let obj: IdentifierObject = this.object(id);
    
        return (
          day.year === obj.year &&
          day.quarter === obj.quarter
        );
        */
    };
    IdentifierQuarter.DESCRIBE_FORMAT_LONG = 'Qo [quarter] YYYY';
    IdentifierQuarter.DESCRIBE_FORMAT_SHORT = 'Qo [quarter] YYYY';
    IdentifierQuarter.SCALES = [
        1 /* quarter  */,
        10 /* year   */
    ];
    IdentifierQuarter.LENGTH = 5;
    return IdentifierQuarter;
}(Identifier_Identifier));
// YYYY (4)
var Identifier_IdentifierYear = (function (_super) {
    __extends(IdentifierYear, _super);
    function IdentifierYear() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IdentifierYear.prototype.getScales = function () {
        return IdentifierYear.SCALES;
    };
    IdentifierYear.prototype.getLength = function () {
        return IdentifierYear.LENGTH;
    };
    IdentifierYear.prototype.get = function (day) {
        return this.compute(day.year);
    };
    IdentifierYear.prototype.object = function (id) {
        var values = this.decompute(id);
        return {
            year: values[0]
        };
    };
    IdentifierYear.prototype.start = function (id) {
        var obj = this.object(id);
        var start = Day_Day.build(obj.year, 0);
        return start;
    };
    IdentifierYear.prototype.span = function (id, endInclusive) {
        if (endInclusive === void 0) { endInclusive = false; }
        var start = this.start(id);
        var end = start.endOfYear(endInclusive);
        return new DaySpan_DaySpan(start, end);
    };
    IdentifierYear.prototype.describe = function (id, short) {
        if (short === void 0) { short = false; }
        var start = this.start(id);
        var format = short ? IdentifierYear.DESCRIBE_FORMAT_SHORT : IdentifierYear.DESCRIBE_FORMAT_LONG;
        return start.format(format);
    };
    IdentifierYear.prototype.matches = function (day, id) {
        return day.year === id;
        /*
        let obj: IdentifierObject = this.object(id);
    
        return (
          day.year === obj.year
        );
        */
    };
    IdentifierYear.DESCRIBE_FORMAT_LONG = 'YYYY';
    IdentifierYear.DESCRIBE_FORMAT_SHORT = 'YYYY';
    IdentifierYear.SCALES = [
        1 /* year  */
    ];
    IdentifierYear.LENGTH = 4;
    return IdentifierYear;
}(Identifier_Identifier));
// Sets the Identifier types
Identifier_Identifier.Time = new Identifier_IdentifierTime();
Identifier_Identifier.Day = new Identifier_IdentifierDay();
Identifier_Identifier.Week = new Identifier_IdentifierWeek();
Identifier_Identifier.Month = new Identifier_IdentifierMonth();
Identifier_Identifier.Quarter = new Identifier_IdentifierQuarter();
Identifier_Identifier.Year = new Identifier_IdentifierYear();

// CONCATENATED MODULE: ./src/Suffix.ts

/**
 * A class which takes a number and determines the suffix for that number.
 *
 * ```typescript
 * Suffix.CACHE[ 2 ];         // 2nd
 * Suffix.determine( 3 );     // rd
 * Suffix.get( 4 );           // th
 * Suffix.get( 4, true );     // 4th
 * ```
 */
var Suffix = (function () {
    function Suffix() {
    }
    Object.defineProperty(Suffix, "CACHE", {
        /**
         * The cache of number & suffix pairs.
         */
        get: function () {
            if (!this._CACHE) {
                this._CACHE = [];
                for (var i = 0; i <= this._CACHE_SIZE; i++) {
                    this._CACHE[i] = this.get(i, true);
                }
            }
            return this._CACHE;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Determines the suffix for a given number.
     *
     * @param value The number to find the suffix for.
     * @returns The suffix determined.
     */
    Suffix.determine = function (value) {
        return value >= 11 && value <= 13 ? 'th' : this.MAP[value % this.MAP.length];
    };
    /**
     * Gets the suffix for a number and optionally appends it before the suffix.
     *
     * @param value The number to get the suffix for.
     * @param prepend When `true` the value is prepended to the suffix.
     * @returns The suffix or value & suffix pair determined.
     */
    Suffix.get = function (value, prepend) {
        if (prepend === void 0) { prepend = false; }
        var suffix = this.determine(value);
        return prepend ? value + suffix : suffix;
    };
    /**
     * The array of suffixes used.
     */
    Suffix.MAP = [
        'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'
    ];
    /**
     * The number of values to store in the cache (inclusive).
     */
    Suffix._CACHE_SIZE = 366;
    return Suffix;
}());


// CONCATENATED MODULE: ./src/Iterator.ts


/**
 * An action to perform on the source as instructed by the iterator.
 */
var IteratorAction;
(function (IteratorAction) {
    /**
     * Continue iteration.
     */
    IteratorAction[IteratorAction["Continue"] = 0] = "Continue";
    /**
     * Stop iteration.
     */
    IteratorAction[IteratorAction["Stop"] = 1] = "Stop";
    /**
     * Remove the current item if possible, and continue iteration.
     */
    IteratorAction[IteratorAction["Remove"] = 2] = "Remove";
    /**
     * Replace the current item with the provided value.
     */
    IteratorAction[IteratorAction["Replace"] = 3] = "Replace";
})(IteratorAction = IteratorAction || (IteratorAction = {}));
/**
 * A class that allows an iteratable source to be iterated any number of times
 * by providing the following functionality:
 *
 * - [[Iterator.isEmpty]]: Determines whether the source contains any items.
 * - [[Iterator.first]]: Gets the first item in the source.
 * - [[Iterator.count]]: Counds the number of items in the source.
 * - [[Iterator.list]]: Builds a list of the items in the source.
 * - [[Iterator.object]]: Builds an object of the items in the source.
 * - [[Iterator.reduce]]: Reduces the items in the source down to a single value.
 * - [[Iterator.purge]]: Removes items from the source which meet some criteria.
 * - [[Iterator.filter]]: Returns a subset of items that meet some criteria by
 *    returning a new Iterator.
 * - [[Iterator.map]]: Maps each item in the source to another item by returning
 *    a new Iterator.
 * - [[Iterator.iterate]]: Invokes a function for each item in the source.
 *
 * The following static functions exist to help iterate simple sources:
 *
 * - [[Iterator.forArray]]: Iterates an array, optionally reverse
 * - [[Iterator.forObject]]: Iterates the properties of an object, optionally
 *    just the properties explicitly set on the object.
 *
 * ```typescript
 * let iter = object.iterateThings();
 * iter.isEmpty();              // no items?
 * iter.isEmpty(d => d.flag);   // no items that meet some criteria?
 * iter.count();                // number of items
 * iter.count(d => d.flag);     // number of items that meet some criteria
 * iter.first();                // first item
 * iter.first(d => d.flag);     // first item that meets some criteria
 * iter.list();                 // get all items as array
 * iter.list(myArray);          // add all items to given array
 * iter.list([], d => d.flag);  // get all items as array that meet some criteria
 * iter.object(d => d.id);      // get all items as an object keyed by a value (ex: id)
 * iter.object(d => d.id, {},
 *    d => d.flag);             // get all items as an object keyed by a value where the item meets some criteria (ex: key id if flag is truthy)
 * iter.purge(d => d.flag);     // remove all items from source that meet some criteria
 * iter.filter(d => d.flag);    // returns an iterator which iterates a subset of items which meet some criteria
 * iter.reduce<number>(0,
 *   (d, t) => t + d.size);     // reduces all items to a single value (ex: sums all size)
 * iter.reduce<number>(0,
 *   (d, t) => t + d.size,
 *   d => d.flag);              // reduces all items to a single value (ex: sums all size) where the item meets some criteria
 * iter.map<S>(d => d.subitem); // return an iterator for subitems if they exist
 * iter.iterate(d => log(d));   // do something for each item
 * ```
 *
 * @typeparam T The type of item being iterated.
 */
var Iterator_Iterator = (function () {
    /**
     * Creates a new Iterator given a source.
     *
     * @param source The source of items to iterator.
     */
    function Iterator(source) {
        /**
         * A result of the iteration passed to [[Iterator.stop]].
         */
        this.result = null;
        this.source = source;
    }
    /**
     * Returns a clone of this iterator with the same source. This is necessary
     * if you want to iterate all or a portion of the source while already
     * iterating it (like a nested loop).
     */
    Iterator.prototype.clone = function () {
        return new Iterator(this.source);
    };
    /**
     * Passes the given item to the iterator callback and returns the action
     * requested at this point in iteration.
     *
     * @param item The current item being iterated.
     */
    Iterator.prototype.act = function (item) {
        this.action = IteratorAction.Continue;
        this.replaceWith = null;
        this.callback(item, this);
        return this.action;
    };
    /**
     * Stops iteration and optionally sets the result of the iteration.
     *
     * @param result The result of the iteration.
     */
    Iterator.prototype.stop = function (result) {
        this.result = result;
        this.action = IteratorAction.Stop;
        return this;
    };
    /**
     * Stops iteration and optionally sets the result of the iteration.
     *
     * @param result The result of the iteration.
     */
    Iterator.prototype.replace = function (replaceWith) {
        this.replaceWith = replaceWith;
        this.action = IteratorAction.Replace;
        return this;
    };
    /**
     * Signals to the iterator source that the current item wants to be removed.
     */
    Iterator.prototype.remove = function () {
        this.action = IteratorAction.Remove;
        return this;
    };
    /**
     * Determines with this iterator is empty. A filter function can be specified
     * to only check for items which match certain criteria.
     *
     * @param filter A function to the checks items for certain criteria.
     * @returns `true` if no valid items exist in the source.
     */
    Iterator.prototype.isEmpty = function (filter) {
        if (filter === void 0) { filter = null; }
        var empty = true;
        this.iterate(function (item, iterator) {
            if (filter && !filter(item)) {
                return;
            }
            empty = false;
            iterator.stop();
        });
        return empty;
    };
    /**
     * Counts the number of items in the iterator. A filter function can be
     * specified to only count items which match certain criteria.
     *
     * @param filter A function to count items for certain criteria.
     * @returns The number of items in the source that optionally match the given
     *    criteria.
     */
    Iterator.prototype.count = function (filter) {
        if (filter === void 0) { filter = null; }
        var total = 0;
        this.iterate(function (item, iterator) {
            if (filter && !filter(item)) {
                return;
            }
            total++;
        });
        return total;
    };
    /**
     * Returns the first item in the iterator. A filter function can be specified
     * to only return the first item which matches certain criteria.
     *
     * @param filter A function to compare items to to match certain criteria.
     * @returns The first item found that optonally matches the given criteria.
     */
    Iterator.prototype.first = function (filter) {
        if (filter === void 0) { filter = null; }
        var first = null;
        this.iterate(function (item, iterator) {
            if (filter && !filter(item)) {
                return;
            }
            first = item;
            iterator.stop();
        });
        return first;
    };
    /**
     * Builds a list of items from the source. A filter function can be specified
     * so the resulting list only contain items that match certain criteria.
     *
     * @param out The array to place the items in.
     * @param filter The function which determines which items are added to the list.
     * @returns The reference to `out` which has had items added to it which
     *    optionally match the given criteria.
     */
    Iterator.prototype.list = function (out, filter) {
        if (out === void 0) { out = []; }
        if (filter === void 0) { filter = null; }
        this.iterate(function (item, iterator) {
            if (filter && !filter(item)) {
                return;
            }
            out.push(item);
        });
        return out;
    };
    /**
     * Builds an object of items from the source keyed by a result returned by
     * a `getKey` function.
     *
     * @param getKey The function which returns the key of the object.
     * @param out The object to place the items in.
     * @param filter The function which determines which items are set on the object.
     * @returns The reference to `out` which has had items set to it which
     *    optionally match the given criteria.
     */
    Iterator.prototype.object = function (getKey, out, filter) {
        if (out === void 0) { out = {}; }
        if (filter === void 0) { filter = null; }
        this.iterate(function (item, iterator) {
            if (filter && !filter(item)) {
                return;
            }
            var key = getKey(item);
            out[key] = item;
        });
        return out;
    };
    /**
     * Returns a new iterator that only returns a maximum number of items.
     *
     * @param amount The maximum number of items to return.
     * @returns A new iterator which returns a maximum number of items.
     */
    Iterator.prototype.take = function (amount) {
        var _this = this;
        return new Iterator(function (next) {
            _this.iterate(function (item, prev) {
                switch (next.act(item)) {
                    case IteratorAction.Stop:
                        prev.stop();
                        break;
                    case IteratorAction.Remove:
                        prev.remove();
                        break;
                    case IteratorAction.Replace:
                        prev.replace(next.replaceWith);
                        break;
                }
                if (--amount <= 0) {
                    prev.stop();
                }
            });
        });
    };
    /**
     * Returns a new iterator that skips the given number of items from the items
     * in this iterator.
     *
     * @param amount The number of items to skip.
     * @returns A new iterator which skipped the given number of items.
     */
    Iterator.prototype.skip = function (amount) {
        var _this = this;
        return new Iterator(function (next) {
            var skipped = 0;
            _this.iterate(function (item, prev) {
                if (skipped >= amount) {
                    switch (next.act(item)) {
                        case IteratorAction.Stop:
                            prev.stop();
                            break;
                        case IteratorAction.Remove:
                            prev.remove();
                            break;
                        case IteratorAction.Replace:
                            prev.replace(next.replaceWith);
                            break;
                    }
                }
                skipped++;
            });
        });
    };
    /**
     * Returns a new iterator thats items are the items in this iterator followed
     * by the items in the given iterators.
     *
     * @param iterators The iterators to append after this one.
     * @returns A new iterator based on this iterator followed by the given.
     */
    Iterator.prototype.append = function () {
        var iterators = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            iterators[_i] = arguments[_i];
        }
        return Iterator.join.apply(Iterator, [this].concat(iterators));
    };
    /**
     * Returns a new iterator thats items are the items in the given iterators
     * followed by the items in this iterator.
     *
     * @param iterators The iterators to prepend before this one.
     * @returns A new iterator based on the given iterators followed by this.
     */
    Iterator.prototype.prepend = function () {
        var iterators = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            iterators[_i] = arguments[_i];
        }
        return Iterator.join.apply(Iterator, iterators.concat([this]));
    };
    /**
     * Removes items from the source that match certain criteria.
     *
     * @param filter The function which determines which items to remove.
     */
    Iterator.prototype.purge = function (filter) {
        this.iterate(function (item, iterator) {
            if (filter(item)) {
                iterator.remove();
            }
        });
        return this;
    };
    /**
     * Returns an iterator which takes items from this iterator and presents them
     * in reverse.
     *
     * @returns A new iterator with the items in this iterator in reverse.
     */
    Iterator.prototype.reverse = function () {
        var _this = this;
        return new Iterator(function (iterator) {
            var items = _this.list();
            var modifies = false;
            var actions = [];
            var replaces = [];
            for (var i = items.length - 1; i >= 0; i--) {
                var item = items[i];
                var action = iterator.act(item);
                if (action === IteratorAction.Stop) {
                    break;
                }
                if (action !== IteratorAction.Continue) {
                    modifies = true;
                    actions[i] = action;
                    replaces[i] = iterator.replaceWith;
                }
            }
            if (modifies) {
                var index_1 = 0;
                _this.iterate(function (item, iterator) {
                    switch (actions[index_1]) {
                        case IteratorAction.Remove:
                            iterator.remove();
                            break;
                        case IteratorAction.Replace:
                            iterator.replace(replaces[index_1]);
                            break;
                    }
                    index_1++;
                });
            }
        });
    };
    /**
     * Reduces all the items in the source to a single value given the initial
     * value and a function to convert an item and the current reduced value
     */
    Iterator.prototype.reduce = function (initial, reducer, filter) {
        if (filter === void 0) { filter = null; }
        var reduced = initial;
        this.iterate(function (item, iterator) {
            if (filter && !filter(item)) {
                return;
            }
            reduced = reducer(item, reduced);
        });
        return reduced;
    };
    /**
     * Returns an iterator where this iterator is the source and the returned
     * iterator is built on a subset of items which pass a `filter` function.
     *
     * @param filter The function which determines if an item should be iterated.
     * @returns A new iterator for the filtered items from this iterator.
     */
    Iterator.prototype.filter = function (filter) {
        var _this = this;
        return new Iterator(function (next) {
            _this.iterate(function (prevItem, prev) {
                if (filter(prevItem)) {
                    switch (next.act(prevItem)) {
                        case IteratorAction.Stop:
                            prev.stop();
                            break;
                        case IteratorAction.Remove:
                            prev.remove();
                            break;
                        case IteratorAction.Replace:
                            prev.replace(next.replaceWith);
                            break;
                    }
                }
            });
        });
    };
    /**
     * Returns an iterator where this iterator is the source and the returned
     * iterator is built from mapped items pulled from items in the source
     * of this iterator. If the given callback `outerCallback` does not return
     * a mapped value then the returned iterator will not see the item. A filter
     * function can be specified to only look at mapping items which match
     * certain criteria.
     *
     * @param mapper The function which maps an item to another.
     * @param filter The function which determines if an item should be mapped.
     * @param unmapper The function which unmaps a value when replace is called.
     * @returns A new iterator for the mapped items from this iterator.
     */
    Iterator.prototype.map = function (mapper, filter, unmapper) {
        var _this = this;
        if (filter === void 0) { filter = null; }
        if (unmapper === void 0) { unmapper = null; }
        return new Iterator(function (next) {
            _this.iterate(function (prevItem, prev) {
                if (filter && !filter(prevItem)) {
                    return;
                }
                var nextItem = mapper(prevItem, prev);
                if (Functions.isDefined(nextItem)) {
                    switch (next.act(nextItem)) {
                        case IteratorAction.Stop:
                            prev.stop();
                            break;
                        case IteratorAction.Remove:
                            prev.remove();
                            break;
                        case IteratorAction.Replace:
                            if (unmapper) {
                                prev.replace(unmapper(next.replaceWith, nextItem, prevItem));
                            }
                            break;
                    }
                }
            });
        });
    };
    /**
     * Invokes the callback for each item in the source of this iterator. The
     * second argument in the callback is the reference to this iterator and
     * [[Iterator.stop]] can be called at anytime to cease iteration.
     *
     * @param callback The function to invoke for each item in this iterator.
     */
    Iterator.prototype.iterate = function (callback) {
        this.result = undefined;
        this.callback = callback;
        this.action = IteratorAction.Continue;
        this.source(this);
        this.callback = null;
        return this;
    };
    /**
     * Passes the result of the iteration to the given function if a truthy
     * result was passed to [[Iterator.stop]].
     *
     * @param getResult The function to pass the result to if it exists.
     */
    Iterator.prototype.withResult = function (getResult) {
        if (this.result) {
            getResult(this.result);
        }
        return this;
    };
    /**
     * Returns an iterator for the given array optionally iterating it in reverse.
     *
     * @param items The array of items to iterate.
     * @param reverse If the array should be iterated in reverse.
     * @returns A new iterator for the given array.
     */
    Iterator.forArray = function (items, reverse) {
        if (reverse === void 0) { reverse = false; }
        return new Iterator(function (iterator) {
            if (reverse) {
                for (var i = items.length - 1; i >= 0; i--) {
                    switch (iterator.act(items[i])) {
                        case IteratorAction.Stop:
                            return;
                        case IteratorAction.Remove:
                            items.splice(i, 1);
                            break;
                        case IteratorAction.Replace:
                            items.splice(i, 1, iterator.replaceWith);
                            break;
                    }
                }
            }
            else {
                for (var i = 0; i < items.length; i++) {
                    switch (iterator.act(items[i])) {
                        case IteratorAction.Stop:
                            return;
                        case IteratorAction.Remove:
                            items.splice(i, 1);
                            i--;
                            break;
                        case IteratorAction.Replace:
                            items.splice(i, 1, iterator.replaceWith);
                            break;
                    }
                }
            }
        });
    };
    /**
     * Returns an iterator for the given object optionally checking the
     * `hasOwnProperty` function on the given object.
     *
     * @param items The object to iterate.
     * @param hasOwnProperty If `hasOwnProperty` should be checked.
     * @returns A new iterator for the given object.
     */
    Iterator.forObject = function (items, hasOwnProperty) {
        if (hasOwnProperty === void 0) { hasOwnProperty = true; }
        return new Iterator(function (iterator) {
            for (var key in items) {
                if (hasOwnProperty && !items.hasOwnProperty(key)) {
                    continue;
                }
                switch (iterator.act(items[key])) {
                    case IteratorAction.Stop:
                        return;
                    case IteratorAction.Remove:
                        delete items[key];
                        break;
                    case IteratorAction.Replace:
                        items[key] = iterator.replaceWith;
                        break;
                }
            }
        });
    };
    /**
     * Joins all the given iterators into a single iterator where the items
     * returned are in the same order as passed to this function. If any items
     * are removed from the returned iterator they will be removed from the given
     * iterator if it supports removal.
     *
     * @param iterators The array of iterators to join as one.
     * @returns A new iterator for the given iterators.
     */
    Iterator.join = function () {
        var iterators = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            iterators[_i] = arguments[_i];
        }
        return new Iterator(function (parent) {
            for (var _i = 0, iterators_1 = iterators; _i < iterators_1.length; _i++) {
                var child = iterators_1[_i];
                child.iterate(function (item, childIterator) {
                    switch (parent.act(item)) {
                        case IteratorAction.Remove:
                            childIterator.remove();
                            break;
                        case IteratorAction.Stop:
                            childIterator.stop();
                            break;
                        case IteratorAction.Replace:
                            childIterator.replace(parent.replaceWith);
                            break;
                    }
                });
                if (child.action === IteratorAction.Stop) {
                    return;
                }
            }
        });
    };
    /**
     * Returns a new iterator with no items.
     *
     * @returns A new iterator with no items.
     */
    Iterator.empty = function () {
        return new Iterator(function (parent) { });
    };
    return Iterator;
}());


// CONCATENATED MODULE: ./src/ScheduleModifier.ts




/**
 * A class that can modify the events of a schedule by storing [[Identifier]]s
 * and an associated value.
 *
 * @typeparam T The type of data that modifies the schedule.
 */
var ScheduleModifier_ScheduleModifier = (function () {
    /**
     * Creates a new schedule modifier.
     */
    function ScheduleModifier() {
        this.map = {};
    }
    /**
     * Clears the modifier of all modifications.
     */
    ScheduleModifier.prototype.clear = function () {
        this.map = {};
        return this;
    };
    /**
     * Returns `true` if this modifier lacks any modifications, otherwise `false`.
     */
    ScheduleModifier.prototype.isEmpty = function () {
        // @ts-ignore
        for (var id in this.map) {
            return !id;
        }
        return true;
    };
    /**
     * Gets the most specific value in this modifier for the given day, if none
     * exists `otherwise` is returned. A modifier can have multiple values for a
     * given day because [[Identifier]]s represent a span of time.
     *
     * @param day The day to get a value for.
     * @param otherwise What to return if no value exists for the given day.
     * @param lookAtTime If the specific time of the given day should be looked at.
     * @returns The most specific value for the given day, or `otherwise`.
     */
    ScheduleModifier.prototype.get = function (day, otherwise, lookAtTime) {
        if (lookAtTime === void 0) { lookAtTime = true; }
        var map = this.map;
        return (lookAtTime && map[day.timeIdentifier]) ||
            map[day.dayIdentifier] ||
            map[day.monthIdentifier] ||
            map[day.weekIdentifier] ||
            map[day.quarterIdentifier] ||
            otherwise;
    };
    /**
     * Gets the most specific identifier type for the span over the given day.
     * If the day does not have a modification, `null` is returned.
     *
     * @param day The day to get the type for.
     * @param lookAtTime If the specific time of the given day should be looked at.
     * @returns The most specific identifier for the given day, otherwise `null`.
     */
    ScheduleModifier.prototype.getIdentifier = function (day, lookAtTime) {
        if (lookAtTime === void 0) { lookAtTime = true; }
        var map = this.map;
        if (lookAtTime && Functions.isDefined(map[day.timeIdentifier]))
            return Identifier_Identifier.Time;
        if (Functions.isDefined(map[day.dayIdentifier]))
            return Identifier_Identifier.Day;
        if (Functions.isDefined(map[day.monthIdentifier]))
            return Identifier_Identifier.Month;
        if (Functions.isDefined(map[day.weekIdentifier]))
            return Identifier_Identifier.Week;
        if (Functions.isDefined(map[day.quarterIdentifier]))
            return Identifier_Identifier.Quarter;
        if (Functions.isDefined(map[day.year]))
            return Identifier_Identifier.Year;
        return null;
    };
    /**
     * Gets all values in this modifier for the given day. If none exist, an empty
     * array is returned. The values returned in the array are returned in most
     * specific to least specific.
     *
     * @param day The day to get the values for.
     * @returns An array of values (modifications) for the given day.
     */
    ScheduleModifier.prototype.getAll = function (day) {
        var map = this.map;
        var all = [];
        if (map[day.timeIdentifier])
            all.push(map[day.timeIdentifier]);
        if (map[day.dayIdentifier])
            all.push(map[day.dayIdentifier]);
        if (map[day.monthIdentifier])
            all.push(map[day.monthIdentifier]);
        if (map[day.weekIdentifier])
            all.push(map[day.weekIdentifier]);
        if (map[day.quarterIdentifier])
            all.push(map[day.quarterIdentifier]);
        return all;
    };
    /**
     * Moves the value/modification from one identifier to another.
     *
     * @param from The day to take the identifier from.
     * @param fromType The identifier type.
     * @param to The day to move the value to.
     * @param toType The identifier type to move the value to.
     */
    ScheduleModifier.prototype.move = function (from, fromType, to, toType) {
        var fromIdentifier = fromType.get(from);
        var toIdentifier = toType.get(to);
        this.map[toIdentifier] = this.map[fromIdentifier];
        delete this.map[fromIdentifier];
        return this;
    };
    /**
     * Moves any identifiers with the matching time `fromTime` to `toTime` and
     * returns the number of moves.
     *
     * @param fromTime The time to move from.
     * @param toTime The time to move to.
     * @returns The number of modifiers moved.
     */
    ScheduleModifier.prototype.moveTime = function (fromTime, toTime) {
        var type = Identifier_Identifier.Time;
        var moveIds = [];
        this.iterate().iterate(function (_a) {
            var id = _a[0], value = _a[1];
            if (type.is(id)) {
                var start = type.start(id);
                if (start.sameTime(fromTime)) {
                    moveIds.push(id);
                }
            }
        });
        var moved = 0;
        for (var _i = 0, moveIds_1 = moveIds; _i < moveIds_1.length; _i++) {
            var id = moveIds_1[_i];
            var value = this.map[id];
            var start = type.start(id);
            var newStart = start.withTime(toTime);
            var newId = type.get(newStart);
            if (!this.map[newId]) {
                this.map[newId] = value;
                delete this.map[id];
                moved++;
            }
        }
        return moved;
    };
    /**
     * Removes any identifiers and modifications that are at the given time.
     *
     * @param time The time to remove.
     * @returns The number of modifiers removed.
     */
    ScheduleModifier.prototype.removeTime = function (time) {
        var type = Identifier_Identifier.Time;
        var removed = 0;
        this.iterate().iterate(function (_a, iterator) {
            var id = _a[0];
            if (type.is(id)) {
                var start = type.start(id);
                if (start.sameTime(time)) {
                    iterator.remove();
                    removed++;
                }
            }
        });
        return removed;
    };
    /**
     * Sets the value/modification in this map given a day, the value, and the
     * identifier type.
     *
     * @param day The day to take an identifier from.
     * @param value The value/modification to set.
     * @param type The identifier type.
     */
    ScheduleModifier.prototype.set = function (day, value, type) {
        this.map[type.get(day)] = value;
        return this;
    };
    /**
     * Removes the value/modification from this modifier based on the identifier
     * pulled from the day.
     *
     * @param day The day to take an identifier from.
     * @param type The identifier type.
     */
    ScheduleModifier.prototype.unset = function (day, type) {
        delete this.map[type.get(day)];
        return this;
    };
    /**
     * Iterates through the modifiers passing the identifier and the related value.
     *
     * @returns A new instance of an [[Iterator]].
     */
    ScheduleModifier.prototype.iterate = function () {
        var _this = this;
        return new Iterator_Iterator(function (iterator) {
            var map = _this.map;
            for (var rawId in map) {
                var asNumber = parseInt(rawId);
                var validAsNumber = asNumber + '' === rawId;
                var id = validAsNumber ? asNumber : rawId;
                switch (iterator.act([id, map[rawId]])) {
                    case IteratorAction.Stop:
                        return;
                    case IteratorAction.Remove:
                        delete map[rawId];
                        break;
                }
            }
        });
    };
    /**
     * Queries the modifier for all values/modifications which fall in the time
     * span that the given identifier represents. All identifiers and their value
     * are passed to the given callback.
     *
     * @param prefix The identifier
     * @returns A new instance of an [[Iterator]].
     */
    ScheduleModifier.prototype.query = function (query) {
        return this.iterate()
            .filter(function (_a) {
            var id = _a[0], value = _a[1];
            return Identifier_Identifier.contains(query, id);
        });
        ;
    };
    /**
     * Returns all identifiers stored in this modifier.
     */
    ScheduleModifier.prototype.identifiers = function (filter) {
        return this.iterate()
            .filter(function (_a) {
            var id = _a[0], value = _a[1];
            return !filter || filter(value, id);
        })
            .map(function (_a) {
            var id = _a[0];
            return id;
        });
    };
    /**
     * Builds a list of spans and the associated values. The spans are calculated
     * from the identiier key via [[Identifier.span]].
     *
     * @param endInclusive If the end date in the spans should be the last
     *    millisecond of the timespan or the first millisecond of the next.
     * @returns An array of spans calculated from the identifiers with the
     *    associated values/modifications.
     */
    ScheduleModifier.prototype.spans = function (endInclusive) {
        if (endInclusive === void 0) { endInclusive = false; }
        return this.iterate()
            .map(function (_a) {
            var id = _a[0], value = _a[1];
            var type = Identifier_Identifier.find(id);
            if (type) {
                var span = type.span(id, endInclusive);
                return { span: span, value: value };
            }
        });
    };
    /**
     * Builds a list of the descriptions of the identifiers in this modifier.
     *
     * @param short If the description should use shorter language or longer.
     * @returns The built list of descriptions.
     */
    ScheduleModifier.prototype.describe = function (short) {
        if (short === void 0) { short = false; }
        return this.iterate()
            .map(function (_a) {
            var id = _a[0];
            var type = Identifier_Identifier.find(id);
            if (type) {
                return type.describe(id, short);
            }
        });
    };
    /**
     * Builds a map of the values/modifications keyed by the descripton of the
     * identifier computed via [[Identifier.describe]].
     *
     * @param short If the description should use shorter language or longer.
     * @returns The built map of description to values/modifications.
     */
    ScheduleModifier.prototype.describeMap = function (short) {
        if (short === void 0) { short = false; }
        var map = this.map;
        var out = {};
        for (var id in map) {
            var type = Identifier_Identifier.find(id);
            if (type) {
                out[type.describe(id, short)] = map[id];
            }
        }
        return out;
    };
    return ScheduleModifier;
}());


// CONCATENATED MODULE: ./src/Schedule.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_moment__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_moment__);











// @ts-ignore

/**
 * A class which describes when an event occurs over what time and if it repeats.
 *
 * @typeparam M The type of metadata stored in the schedule.
 */
var Schedule_Schedule = (function () {
    /**
     * Creates a schedule based on the given input.
     *
     * @param input The input which describes the schedule of events.
     */
    function Schedule(input) {
        this.exclude = new ScheduleModifier_ScheduleModifier();
        this.include = new ScheduleModifier_ScheduleModifier();
        this.cancel = new ScheduleModifier_ScheduleModifier();
        this.meta = new ScheduleModifier_ScheduleModifier();
        if (Functions.isDefined(input)) {
            this.set(input);
        }
    }
    /**
     * Sets the schedule with the given input.
     *
     * @param input The input or schedule which describes the schedule of events.
     * @param parseMeta A function to use when parsing meta input into the desired type.
     * @see [[Parse.schedule]]
     */
    Schedule.prototype.set = function (input, parseMeta) {
        if (parseMeta === void 0) { parseMeta = (function (x) { return x; }); }
        if (input instanceof Schedule) {
            Parse_Parse.schedule(input.toInput(), undefined, this);
        }
        else {
            Parse_Parse.schedule(input, Functions.coalesce(input.parseMeta, parseMeta), this);
        }
        return this;
    };
    Object.defineProperty(Schedule.prototype, "lastTime", {
        /**
         * Returns the last event time specified or `undefined` if this schedule is
         * for an all day event.
         */
        get: function () {
            return this.times[this.times.length - 1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Schedule.prototype, "identifierType", {
        /**
         * The [[Identifier]] for this schedule. Either [[Identifier.Day]] or
         * [[Identifier.Time]].
         */
        get: function () {
            return this.isFullDay() ? Identifier_Identifier.Day : Identifier_Identifier.Time;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates the [[Schedule.durationInDays]] variable based on the
     * [[Schedule.lastTime]] (if any), the [[Schedule.duration]] and it's
     * [[Schedule.durationUnit]].
     */
    Schedule.prototype.updateDurationInDays = function () {
        var start = this.lastTime ? this.lastTime.toMilliseconds() : 0;
        var duration = this.duration * (Constants.DURATION_TO_MILLIS[this.durationUnit] || 0);
        var exclude = Constants.MILLIS_IN_DAY;
        var day = Constants.MILLIS_IN_DAY;
        this.durationInDays = Math.max(0, Math.ceil((start + duration - exclude) / day));
        return this;
    };
    /**
     * Updates [[Schedule.checks]] based on the frequencies that were specified
     * in the schedule input.
     */
    Schedule.prototype.updateChecks = function () {
        this.checks = Parse_Parse.givenFrequency([
            this.year,
            this.month,
            this.week,
            this.weekOfYear,
            this.fullWeekOfYear,
            this.weekspanOfYear,
            this.lastFullWeekOfYear,
            this.lastWeekspanOfYear,
            this.weekOfMonth,
            this.weekspanOfMonth,
            this.fullWeekOfMonth,
            this.lastWeekspanOfMonth,
            this.lastFullWeekOfMonth,
            this.dayOfWeek,
            this.dayOfMonth,
            this.lastDayOfMonth,
            this.dayOfYear
        ]);
        return this;
    };
    /**
     * Determines whether the given day lies between the earliest and latest
     * valid day in the schedule.
     *
     * @param day The day to test.
     * @returns `true` if the day lies in the schedule, otherwise `false`.
     * @see [[Schedule.start]]
     * @see [[Schedule.end]]
     */
    Schedule.prototype.matchesSpan = function (day) {
        return (this.start === null || day.isSameOrAfter(this.start)) &&
            (this.end === null || day.isBefore(this.end));
    };
    /**
     * Determines whether the given range overlaps with the earliest and latest
     * valid days in this schedule (if any).
     *
     * @param start The first day in the range.
     * @param end The last day in the range.
     * @returns `true` if the range intersects with the schedule, otherwise `false`.
     * @see [[Schedule.start]]
     * @see [[Schedule.end]]
     */
    Schedule.prototype.matchesRange = function (start, end) {
        if (this.start && end.isBefore(this.start)) {
            return false;
        }
        if (this.end && start.isAfter(this.end)) {
            return false;
        }
        return true;
    };
    /**
     * Determines whether the given day is explicitly excluded in the schedule.
     *
     * @param day The day to test.
     * @param lookAtTime lookAtTime If the specific time of the given day should
     *    be looked at.
     * @returns `true` if the day was excluded, otherwise `false`.
     */
    Schedule.prototype.isExcluded = function (day, lookAtTime) {
        if (lookAtTime === void 0) { lookAtTime = true; }
        return this.exclude.get(day, false, lookAtTime);
    };
    /**
     * Determines whether the given day is explicitly included in the schedule.
     *
     * @param day The day to test.
     * @param lookAtTime lookAtTime If the specific time of the given day should
     *    be looked at.
     * @returns `true` if the day is NOT explicitly included, otherwise `false`.
     */
    Schedule.prototype.isIncluded = function (day, lookAtTime) {
        if (lookAtTime === void 0) { lookAtTime = true; }
        return this.include.get(day, false, lookAtTime);
    };
    /**
     * Determines whether the given day is cancelled in the schedule.
     *
     * @param day The day to test.
     * @param lookAtTime lookAtTime If the specific time of the given day should
     *    be looked at.
     * @returns `true` if the day was cancelled, otherwise `false`.
     */
    Schedule.prototype.isCancelled = function (day, lookAtTime) {
        if (lookAtTime === void 0) { lookAtTime = true; }
        return this.cancel.get(day, false, lookAtTime);
    };
    /**
     * Returns the metadata for the given day or `null` if there is none.
     *
     * @param day The day to return the metadata for.
     * @param otherwise The data to return if none exists for the given day.
     * @param lookAtTime lookAtTime If the specific time of the given day should
     *    be looked at.
     * @returns The metadata or `null`.
     */
    Schedule.prototype.getMeta = function (day, otherwise, lookAtTime) {
        if (otherwise === void 0) { otherwise = null; }
        if (lookAtTime === void 0) { lookAtTime = true; }
        return this.meta.get(day, otherwise, lookAtTime);
    };
    /**
     * Returns all metadata for the given day or an empty array if there is none.
     *
     * @param day The day to return the metadata for.
     * @returns The array of metadata ordered by priority or an empty array.
     */
    Schedule.prototype.getMetas = function (day) {
        return this.meta.getAll(day);
    };
    /**
     * Returns whether the events in the schedule are all day long or start at
     * specific times. Full day events start at the start of the day and end at
     * the start of the next day (if the duration = `1` and durationUnit = 'days').
     * Full day events have no times specified and should have a durationUnit of
     * either `days` or `weeks`.
     */
    Schedule.prototype.isFullDay = function () {
        return this.times.length === 0;
    };
    /**
     * Sets whether this schedule is a full day event if it is not already. If
     * this schedule is a full day event and `false` is passed to this function
     * a single timed event will be added based on `defaultTime`. If this schedule
     * has timed events and `true` is passed to make the schedule full day, the
     * timed events are removed from this schedule. If the durationUnit is not the
     * expected unit based on the new full day flag - the duration is reset to 1
     * and the duration unit is set to the expected unit.
     *
     * @param fullDay Whether this schedule should represent a full day event or
     *    timed events.
     * @param defaultTime If `fullDay` is `false` and this schedule is currently
     *    a full day event - this time will be used as the time of the first event.
     */
    Schedule.prototype.setFullDay = function (fullDay, defaultTime) {
        if (fullDay === void 0) { fullDay = true; }
        if (defaultTime === void 0) { defaultTime = '08:00'; }
        if (fullDay !== this.isFullDay()) {
            if (fullDay) {
                this.times = [];
                if (this.durationUnit !== 'days' && this.durationUnit !== 'day') {
                    this.duration = 1;
                    this.durationUnit = 'days';
                }
            }
            else {
                this.times = [Parse_Parse.time(defaultTime)];
                if (this.durationUnit !== 'hours' && this.durationUnit !== 'hour') {
                    this.duration = 1;
                    this.durationUnit = 'hours';
                }
            }
        }
        return this;
    };
    /**
     * Adjusts the [[Schedule.start]] and [[Schedule.end]] dates specified on this
     * schedule if this schedule represents a single event and the `start` and
     * `end` are already set or `addSpan` is `true`.
     *
     * @param addSpan If `true`, the `start` and `end` dates will always be
     *    adjusted if this schedule is a single event.
     */
    Schedule.prototype.adjustDefinedSpan = function (addSpan) {
        if (addSpan === void 0) { addSpan = false; }
        var single = this.getSingleEventSpan();
        if (single && (addSpan || (this.start && this.end))) {
            this.start = single.start.start();
            this.end = single.end.end();
        }
        return this;
    };
    /**
     * Returns a span of time for a schedule with full day events starting on the
     * start of the given day with the desired duration in days or weeks.
     *
     * @param day The day the span starts on.
     * @returns The span of time starting on the given day.
     */
    Schedule.prototype.getFullSpan = function (day) {
        var start = day.start();
        var end = start.add(this.duration, this.durationUnit);
        return new DaySpan_DaySpan(start, end);
    };
    /**
     * Returns a span of time starting on the given day at the given day with the
     * duration specified on this schedule.
     *
     * @param day The day the span starts on.
     * @param time The time of day the span starts.
     * @returns The span of time calculated.
     */
    Schedule.prototype.getTimeSpan = function (day, time) {
        var start = day.withTime(time);
        var end = start.add(this.duration, this.durationUnit);
        return new DaySpan_DaySpan(start, end);
    };
    /**
     * Determines whether the given day is a day on the schedule for the start
     * of an event. If an event is more than one day and the day given is not the
     * start this may return `false`. This does not test for event instances
     * that exist through [[Schedule.include]].
     *
     * @param day The day to test.
     * @returns `true` if the day marks the start of an event on the schedule.
     * @see [[Schedule.isIncluded]]
     * @see [[Schedule.isFullyExcluded]]
     * @see [[Schedule.matchesSpan]]
     */
    Schedule.prototype.matchesDay = function (day) {
        if (this.isIncluded(day, false)) {
            return true;
        }
        if (!this.matchesSpan(day) || this.isFullyExcluded(day)) {
            return false;
        }
        for (var _i = 0, _a = this.checks; _i < _a.length; _i++) {
            var check = _a[_i];
            if (!check(day[check.property])) {
                return false;
            }
        }
        return true;
    };
    /**
     * Determines whether the given day has events added through
     * [[Schedule.include]].
     *
     * @param day The day to look for included times on.
     * @returns `true` if there are included event instances on the given day,
     *    otherwise `false`.
     */
    Schedule.prototype.hasIncludedTime = function (day) {
        return !this.iterateIncludeTimes(day).isEmpty();
    };
    /**
     * Determines whether the given day is fully excluded from the schedule. A
     * fully excluded day is one that has a day-wide exclusion, or the schedule
     * is not an all-day event and all times in the schedule are specifically
     * excluded.
     *
     * @param day The day to test.*
     * @returns `true` if he day is fully excluded, otherwise `false`.
     */
    Schedule.prototype.isFullyExcluded = function (day) {
        if (this.isExcluded(day, false)) {
            return true;
        }
        if (this.isFullDay()) {
            return false;
        }
        for (var _i = 0, _a = this.times; _i < _a.length; _i++) {
            var time = _a[_i];
            if (!this.isExcluded(day.withTime(time))) {
                return false;
            }
        }
        return true;
    };
    /**
     * Finds the next day an event occurs on the schedule given a day to start,
     * optionally including it, and a maximum number of days to look ahead.
     *
     * @param day The day to start to search from.
     * @param includeDay If the given day should be included in the search.
     * @param lookAhead The maximum number of days to look ahead from the given
     *     day for event occurrences.
     * @returns The next day on the schedule or `null` if none exists.
     */
    Schedule.prototype.nextDay = function (day, includeDay, lookAhead) {
        if (includeDay === void 0) { includeDay = false; }
        if (lookAhead === void 0) { lookAhead = 366; }
        return this.iterateDaycast(day, 1, true, includeDay, lookAhead).first();
    };
    /**
     * Finds the next specified number of days that events occur on the schedule
     * given a day to start, optionally including it, and a maximum number of days
     * to look ahead.
     *
     * @param day The day to start to search from.
     * @param max The maximum number of days to return in the result.
     * @param includeDay If the given day should be included in the search.
     * @param lookAhead The maximum number of days to look ahead from the given
     *     day for event occurrences.
     * @returns An array containing the next days on the schedule that events
     *    start or an empty array if there are none.
     */
    Schedule.prototype.nextDays = function (day, max, includeDay, lookAhead) {
        if (includeDay === void 0) { includeDay = false; }
        if (lookAhead === void 0) { lookAhead = 366; }
        return this.iterateDaycast(day, max, true, includeDay, lookAhead);
    };
    /**
     * Finds the previous day an event occurs on the schedule given a day to start,
     * optionally including it, and a maximum number of days to look behind.
     *
     * @param day The day to start to search from.
     * @param includeDay If the given day should be included in the search.
     * @param lookBack The maximum number of days to look behind from the given
     *     day for event occurrences.
     * @returns The previous day on the schedule or `null` if none exists.
     */
    Schedule.prototype.prevDay = function (day, includeDay, lookBack) {
        if (includeDay === void 0) { includeDay = false; }
        if (lookBack === void 0) { lookBack = 366; }
        return this.iterateDaycast(day, 1, false, includeDay, lookBack).first();
    };
    /**
     * Finds the previous specified number of days that events occur on the
     * schedule given a day to start, optionally including it, and a maximum
     * number of days to look behind.
     *
     * @param day The day to start to search from.
     * @param max The maximum number of days to return in the result.
     * @param includeDay If the given day should be included in the search.
     * @param lookAhead The maximum number of days to look behind from the given
     *     day for event occurrences.
     * @returns An array containing the previous days on the schedule that events
     *    start or an empty array if there are none.
     */
    Schedule.prototype.prevDays = function (day, max, includeDay, lookBack) {
        if (includeDay === void 0) { includeDay = false; }
        if (lookBack === void 0) { lookBack = 366; }
        return this.iterateDaycast(day, max, false, includeDay, lookBack);
    };
    /**
     * Iterates over days that events start in the schedule given a day to start,
     * a maximum number of days to find, and a direction to look.
     *
     * @param day The day to start to search from.
     * @param max The maximum number of days to iterate.
     * @param next If `true` this searches forward, otherwise `false` is backwards.
     * @param includeDay If the given day should be included in the search.
     * @param lookup The maximum number of days to look through from the given
     *     day for event occurrences.
     * @returns A new Iterator for the days found in the cast.
     * @see [[Schedule.iterateSpans]]
     */
    Schedule.prototype.iterateDaycast = function (day, max, next, includeDay, lookup) {
        var _this = this;
        if (includeDay === void 0) { includeDay = false; }
        if (lookup === void 0) { lookup = 366; }
        return new Iterator_Iterator(function (iterator) {
            var iterated = 0;
            for (var days = 0; days < lookup; days++) {
                if (!includeDay || days > 0) {
                    day = next ? day.next() : day.prev();
                }
                if (!_this.iterateSpans(day, false).isEmpty()) {
                    var action = iterator.act(day);
                    if (action === IteratorAction.Stop || ++iterated >= max) {
                        return;
                    }
                }
            }
        });
    };
    /**
     * Iterates through the spans (event instances) that start on or covers the
     * given day.
     *
     * @param day The day to look for spans on.
     * @param covers If `true` spans which span multiple days will be looked at
     *    to see if they intersect with the given day, otherwise `false` will
     *    only look at the given day for the start of events.
     * @returns A new Iterator for all the spans found.
     */
    Schedule.prototype.iterateSpans = function (day, covers) {
        var _this = this;
        if (covers === void 0) { covers = false; }
        return new Iterator_Iterator(function (iterator) {
            var current = day;
            var lookBehind = covers ? _this.durationInDays : 0;
            // If the events start at the end of the day and may last multiple days....
            if (_this.isFullDay()) {
                // If the schedule has events which span multiple days we need to look
                // backwards for events that overlap with the given day.
                while (lookBehind >= 0) {
                    // If the current day matches the schedule rules...
                    if (_this.matchesDay(current)) {
                        // Build a DaySpan with the given start day and the schedules duration.
                        var span = _this.getFullSpan(current);
                        // If that dayspan intersects with the given day, it's a winner!
                        if (span.matchesDay(day)) {
                            switch (iterator.act(span)) {
                                case IteratorAction.Stop:
                                    return;
                            }
                        }
                    }
                    current = current.prev();
                    lookBehind--;
                }
            }
            else {
                // If the schedule has events which span multiple days we need to look
                // backwards for events that overlap with the given day.
                while (lookBehind >= 0) {
                    // If the current day matches the schedule rules...
                    if (_this.matchesDay(current)) {
                        // Iterate through each daily occurrence in the schedule...
                        for (var _i = 0, _a = _this.times; _i < _a.length; _i++) {
                            var time = _a[_i];
                            var span = _this.getTimeSpan(current, time);
                            // If the event intersects with the given day and the occurrence
                            // has not specifically been excluded...
                            if (span.matchesDay(day) && !_this.isExcluded(span.start, true)) {
                                switch (iterator.act(span)) {
                                    case IteratorAction.Stop:
                                        return;
                                }
                            }
                        }
                    }
                    else {
                        // The current day does not match the schedule, however the schedule
                        // might have moved/random event occurrents on the current day.
                        // We only want the ones that overlap with the given day.
                        _this.iterateIncludeTimes(current, day).iterate(function (span, timeIterator) {
                            switch (iterator.act(span)) {
                                case IteratorAction.Stop:
                                    timeIterator.stop();
                                    break;
                            }
                        });
                        if (iterator.action === IteratorAction.Stop) {
                            return;
                        }
                    }
                    current = current.prev();
                    lookBehind--;
                }
            }
        });
    };
    /**
     * Determines if the given day is on the schedule and the time specified on
     * the day matches one of the times on the schedule.
     *
     * @param day The day to test.
     * @returns `true` if the day and time match the schedule, otherwise false.
     */
    Schedule.prototype.matchesTime = function (day) {
        return !!this.iterateSpans(day, true).first(function (span) { return span.start.sameMinute(day); });
    };
    /**
     * Determines if the given day is covered by this schedule. A schedule can
     * specify events that span multiple days - so even though the day does not
     * match the starting day of a span - it can be a day that is within the
     * schedule.
     *
     * @param day The day to test.
     * @returns `true` if the day is covered by an event on this schedule,
     *    otherwise `false`.
     */
    Schedule.prototype.coversDay = function (day) {
        return !this.iterateSpans(day, true).isEmpty();
    };
    /**
     * Determines if the given timestamp lies in an event occurrence on this
     * schedule.
     *
     * @param day The timestamp to test against the schedule.
     * @return `true` if the timestamp lies in an event occurrent start and end
     *    timestamps, otherwise `false`.
     */
    Schedule.prototype.coversTime = function (day) {
        return !!this.iterateSpans(day, true).first(function (span) { return span.contains(day); });
    };
    /**
     * Sets the frequency for the given property. This does not update the
     * [[Schedule.checks]] array, the [[Schedule.updateChecks]] function needs
     * to be called.
     *
     * @param property The frequency to update.
     * @param frequency The new frequency.
     */
    Schedule.prototype.setFrequency = function (property, frequency) {
        this[property] = Parse_Parse.frequency(frequency, property);
        return this;
    };
    /**
     * Changes the exclusion status of the event at the given time. By default
     * this excludes this event - but `false`  may be passed to undo an exclusion.
     *
     * @param time The start time of the event occurrence to exclude or include.
     * @param excluded Whether the event should be excluded.
     */
    Schedule.prototype.setExcluded = function (time, excluded) {
        if (excluded === void 0) { excluded = true; }
        var type = this.identifierType;
        this.exclude.set(time, excluded, type);
        this.include.set(time, !excluded, type);
        return this;
    };
    /**
     * Changes the cancellation status of the event at the given start time. By
     * default this cancels the event occurrence - but `false` may be passed to
     * undo a cancellation.
     *
     * @param time The start time of the event occurrence to cancel or uncancel.
     * @param cancelled Whether the event should be cancelled.
     */
    Schedule.prototype.setCancelled = function (time, cancelled) {
        if (cancelled === void 0) { cancelled = true; }
        this.cancel.set(time, cancelled, this.identifierType);
        return this;
    };
    /**
     * Removes the time from this schedule and all related included, excluded,
     * cancelled instances as well as metadata.
     *
     * @param time The time to remove from the schedule.
     * @param removeInclude If any included instances should be removed as well.
     * @returns `true` if the time was removed, otherwise `false`.
     */
    Schedule.prototype.removeTime = function (time, removeInclude) {
        if (removeInclude === void 0) { removeInclude = true; }
        var found = false;
        for (var i = 0; i < this.times.length && !found; i++) {
            if (found = time.matches(this.times[i])) {
                this.times.splice(i, 1);
            }
        }
        if (found) {
            if (removeInclude) {
                this.include.removeTime(time);
            }
            this.exclude.removeTime(time);
            this.cancel.removeTime(time);
            this.meta.removeTime(time);
        }
        return found;
    };
    /**
     * Moves the event instance starting at `fromTime` to `toTime` optionally
     * placing `meta` in the schedules metadata for the new time `toTime`.
     * If this schedule has a single event ([[Schedule.isSingleEvent]]) then the
     * only value needed is `toTime` and not `fromTime`.
     *
     * @param toTime The timestamp of the new event.
     * @param fromTime The timestamp of the event on the schedule to move if this
     *    schedule generates multiple events.
     * @returns `true` if the schedule had the event moved, otherwise `false`.
     */
    Schedule.prototype.move = function (toTime, fromTime, meta) {
        if (!this.moveSingleEvent(toTime) && fromTime) {
            return this.moveInstance(fromTime, toTime);
        }
        return false;
    };
    /**
     * Moves a time specified in this schedule to the given time, adjusting
     * any cancelled event instances, metadata, and any excluded and included
     * event instances.
     *
     * @param fromTime The time to move.
     * @param toTime The new time in the schedule.
     * @returns `true` if time was moved, otherwise `false`.
     */
    Schedule.prototype.moveTime = function (fromTime, toTime) {
        var found = false;
        for (var i = 0; i < this.times.length && !found; i++) {
            if (found = fromTime.matches(this.times[i])) {
                this.times.splice(i, 1, toTime);
            }
        }
        if (found) {
            this.include.moveTime(fromTime, toTime);
            this.exclude.moveTime(fromTime, toTime);
            this.cancel.moveTime(fromTime, toTime);
            this.meta.moveTime(fromTime, toTime);
            this.adjustDefinedSpan(false);
        }
        return found;
    };
    /**
     * Moves the event instance starting at `fromTime` to `toTime` optionally
     * placing `meta` in the schedules metadata for the new time `toTime`. A move
     * is accomplished by excluding the current event and adding an inclusion of
     * the new day & time.
     *
     * @param fromTime The timestamp of the event on the schedule to move.
     * @param toTime The timestamp of the new event.
     * @returns `true`.
     * @see [[Schedule.move]]
     */
    Schedule.prototype.moveInstance = function (fromTime, toTime) {
        var type = this.identifierType;
        this.exclude.set(fromTime, true, type);
        this.exclude.set(toTime, false, type);
        this.include.set(toTime, true, type);
        this.include.set(fromTime, false, type);
        if (this.cancel.get(fromTime, false) && !this.cancel.get(toTime, false)) {
            this.cancel.set(toTime, true, type);
            if (this.cancel.getIdentifier(fromTime) === type) {
                this.cancel.unset(fromTime, type);
            }
        }
        var meta = this.meta.get(fromTime, null);
        if (meta && meta !== this.meta.get(toTime, null)) {
            this.meta.set(toTime, meta, type);
            if (this.meta.getIdentifier(fromTime) === type) {
                this.meta.unset(fromTime, type);
            }
        }
        return true;
    };
    /**
     * Moves the single event in this schedule to the given day/time if applicable.
     * If this schedule is not a single event schedule then `false` is returned.
     * If this schedule is a timed event the time will take the time of the given
     * `toTime` of `takeTime` is `true`.
     *
     * @param toTime The time to move the single event to.
     * @param takeTime If this schedule has a single timed event, should the time
     *    of the event be changed to the time of the given `toTime`?
     * @returns `true` if the schedule was adjusted, otherwise `false`.
     * @see [[Schedule.move]]
     */
    Schedule.prototype.moveSingleEvent = function (toTime, takeTime) {
        if (takeTime === void 0) { takeTime = true; }
        if (!this.isSingleEvent()) {
            return false;
        }
        for (var _i = 0, _a = this.checks; _i < _a.length; _i++) {
            var check = _a[_i];
            var prop = check.property;
            var value = toTime[prop];
            var frequency = Parse_Parse.frequency([value], prop);
            this[prop] = frequency;
        }
        if (this.times.length === 1 && takeTime) {
            this.times = [toTime.asTime()];
        }
        this.updateChecks();
        var span = this.getSingleEventSpan();
        if (this.start) {
            this.start = span.start.start();
        }
        if (this.end) {
            this.end = span.end.end();
        }
        return true;
    };
    /**
     * Returns the span of the single event in this schedule if it's that type of
     * schedule, otherwise `null` is returned.
     *
     * @returns A span of the single event, otherwise `null`.
     * @see [[Schedule.isSingleEvent]]
     */
    Schedule.prototype.getSingleEventSpan = function () {
        if (!this.isSingleEvent()) {
            return null;
        }
        var startOfYear = Day_Day.build(this.year.input[0], 0, 1);
        var start = this.iterateDaycast(startOfYear, 1, true, true, 366).first();
        if (!start) {
            return null;
        }
        return this.isFullDay() ?
            this.getFullSpan(start) :
            this.getTimeSpan(start, this.times[0]);
    };
    /**
     * Determines whether this schedule produces a single event, and no more.
     * If this schedule has any includes, it's assumed to be a multiple event
     * schedule. A single event can be detected in the following scenarios where
     * each frequency has a single occurrence (see [[Schedule.isSingleFrequency]]).
     *
     * - year, day of year
     * - year, month, day of month
     * - year, month, week of month, day of week
     * - year, week of year, day of week
     *
     * @returns `true` if this schedule produces a single event, otherwise `false`.
     */
    Schedule.prototype.isSingleEvent = function () {
        // 0 = full day, 1 = once a day, 1+ = multiple events a day
        if (this.times.length > 1) {
            return false;
        }
        // Let's assume if there are includes, this is not a single event.
        if (!this.include.isEmpty()) {
            return false;
        }
        // If this can occur on multiple years, not a single event.
        if (!this.isSingleYear()) {
            return false;
        }
        // If this is a specific year and day of the year: single!
        if (this.isSingleDayOfYear()) {
            return true;
        }
        // If this is a specific year, month, and day of month: single!
        if (this.isSingleMonth() && this.isSingleDayOfMonth()) {
            return true;
        }
        // If this is a specific year, month, week of the month, day of the week: single!
        if (this.isSingleMonth() && this.isSingleWeekOfMonth() && this.isSingleDayOfWeek()) {
            return true;
        }
        // If this is a specific year, week of the year, day of the week: single!
        if (this.isSingleWeekOfYear() && this.isSingleDayOfWeek()) {
            return true;
        }
        // Doesn't look like a single event.
        return false;
    };
    /**
     * @returns `true` if this schedule produces events only in a specific year.
     * @see [[Schedule.year]]
     */
    Schedule.prototype.isSingleYear = function () {
        return this.isSingleFrequency(this.year);
    };
    /**
     * @returns `true` if this schedule produces events only in a specific month.
     * @see [[Schedule.month]]
     */
    Schedule.prototype.isSingleMonth = function () {
        return this.isSingleFrequency(this.month);
    };
    /**
     * @returns `true` if this schedule produces events only in a specific day of
     *    the month.
     * @see [[Schedule.dayOfMonth]]
     * @see [[Schedule.lastDayOfMonth]]
     */
    Schedule.prototype.isSingleDayOfMonth = function () {
        return this.isSingleFrequency(this.dayOfMonth) ||
            this.isSingleFrequency(this.lastDayOfMonth);
    };
    /**
     * @returns `true` if this schedule produces events only in a specific day of
     *    the week.
     * @see [[Schedule.dayOfWeek]]
     */
    Schedule.prototype.isSingleDayOfWeek = function () {
        return this.isSingleFrequency(this.dayOfWeek);
    };
    /**
     * @returns `true` if this schedule produces events only in a specific day of
     *    the year.
     * @see [[Schedule.dayOfYear]]
     */
    Schedule.prototype.isSingleDayOfYear = function () {
        return this.isSingleFrequency(this.dayOfYear);
    };
    /**
     * @returns `true` if this schedule produces events only in a specific week of
     *    the month.
     * @see [[Schedule.weekspanOfMonth]]
     * @see [[Schedule.fullWeekOfMonth]]
     * @see [[Schedule.weekOfMonth]]
     * @see [[Schedule.lastFullWeekOfMonth]]
     * @see [[Schedule.lastWeekspanOfMonth]]
     */
    Schedule.prototype.isSingleWeekOfMonth = function () {
        return this.isSingleFrequency(this.weekspanOfMonth) ||
            this.isSingleFrequency(this.fullWeekOfMonth) ||
            this.isSingleFrequency(this.weekOfMonth) ||
            this.isSingleFrequency(this.lastFullWeekOfMonth) ||
            this.isSingleFrequency(this.lastWeekspanOfMonth);
    };
    /**
     * @returns `true` if this schedule produces events only in a specific week of
     *    the year.
     * @see [[Schedule.weekspanOfYear]]
     * @see [[Schedule.fullWeekOfYear]]
     * @see [[Schedule.week]]
     * @see [[Schedule.weekOfYear]]
     * @see [[Schedule.lastFullWeekOfYear]]
     * @see [[Schedule.lastWeekspanOfYear]]
     */
    Schedule.prototype.isSingleWeekOfYear = function () {
        return this.isSingleFrequency(this.weekspanOfYear) ||
            this.isSingleFrequency(this.fullWeekOfYear) ||
            this.isSingleFrequency(this.week) ||
            this.isSingleFrequency(this.weekOfYear) ||
            this.isSingleFrequency(this.lastFullWeekOfYear) ||
            this.isSingleFrequency(this.lastWeekspanOfYear);
    };
    /**
     * Determines if the given [[FrequencyCheck]] results in a single occurrence.
     *
     * @returns `true` if the frequency results in a single event, otherwise `false`.
     */
    Schedule.prototype.isSingleFrequency = function (frequency) {
        return Functions.isArray(frequency.input) && frequency.input.length === 1;
    };
    /**
     * Creates a forecast for this schedule which returns a number of event
     * occurrences around a given day. A single item could be returned per day, or
     * you could get an item for each timed event occurrence.
     *
     * @param around The day to find a forecast around.
     * @param covers If `true` spans which span multiple days will be looked at
     *    to see if they intersect with the given day, otherwise `false` will
     *    only look at the given day for the start of events.
     * @param daysAfter The number of events to return before the given day.
     * @param daysBefore The number of events to return after the given day.
     * @param times If timed events should be returned, or only one for each day.
     * @param lookAround How many days to look before and after the given day for
     *    event occurrences.
     * @returns A new iterator which provides the event occurence span, the day it
     *    starts (or is covered if `covers` is `true`), and the identifier for the
     *    event.
     */
    Schedule.prototype.forecast = function (around, covers, daysAfter, daysBefore, times, lookAround) {
        var _this = this;
        if (covers === void 0) { covers = true; }
        if (daysBefore === void 0) { daysBefore = daysAfter; }
        if (times === void 0) { times = false; }
        if (lookAround === void 0) { lookAround = 366; }
        var type = this.identifierType;
        var tuplesForDay = function (day, tuples) {
            var spans = _this.iterateSpans(day, covers).list();
            var last = times ? spans.length : Math.min(1, spans.length);
            var offset = times ? 0 : spans.length - 1;
            for (var i = 0; i < last; i++) {
                var span = spans[i + offset];
                var id = type.get(span.start);
                if (tuples.act([span, day, id]) === IteratorAction.Stop) {
                    return false;
                }
            }
            return true;
        };
        var prev = new Iterator_Iterator(function (iterator) {
            var curr = around;
            for (var i = 0; i < lookAround; i++) {
                if (!tuplesForDay(curr, iterator)) {
                    break;
                }
                curr = curr.prev();
            }
        });
        var next = new Iterator_Iterator(function (iterator) {
            var curr = around;
            for (var i = 0; i < lookAround; i++) {
                curr = curr.next();
                if (!tuplesForDay(curr, iterator)) {
                    break;
                }
            }
        });
        return prev.take(daysBefore + 1).reverse().append(next.take(daysAfter));
    };
    /**
     * Iterates timed events that were explicitly specified on the given day.
     * Those events could span multiple days so may be tested against another day.
     *
     * @param day The day to look for included timed events.
     * @param matchAgainst The day to test against the timed event.
     * @returns A new Iterator for all the included spans found.
     */
    Schedule.prototype.iterateIncludeTimes = function (day, matchAgainst) {
        var _this = this;
        if (matchAgainst === void 0) { matchAgainst = day; }
        var isIncludedTime = function (result) {
            var id = result[0], included = result[1];
            return included && Identifier_Identifier.Time.is(id);
        };
        var getSpan = function (result) {
            var id = result[0];
            var time = Identifier_Identifier.Time.start(id);
            var span = _this.getTimeSpan(time, time.asTime());
            if (span.matchesDay(matchAgainst)) {
                return span;
            }
        };
        return this.include.query(day.dayIdentifier).map(getSpan, isIncludedTime);
    };
    /**
     * Clones this schedule.
     *
     * @returns A new schedule which matches this schedule.
     */
    Schedule.prototype.clone = function () {
        return new Schedule(this.toInput());
    };
    /**
     * Converts the schedule instance back into input.
     *
     * @param returnDays When `true` the start, end, and array of exclusions will
     *    have [[Day]] instances, otherwise the UTC timestamp and dayIdentifiers
     *    will be used when `false`.
     * @param returnTimes When `true` the times returned in the input will be
     *    instances of [[Time]] otherwise the `timeFormat` is used to convert the
     *    times to strings.
     * @param timeFormat The time format to use when returning the times as strings.
     * @param alwaysDuration If the duration values (`duration` and
     *    `durationUnit`) should always be returned in the input.
     * @returns The input that describes this schedule.
     * @see [[Time.format]]
     */
    Schedule.prototype.toInput = function (returnDays, returnTimes, timeFormat, alwaysDuration) {
        if (returnDays === void 0) { returnDays = false; }
        if (returnTimes === void 0) { returnTimes = false; }
        if (timeFormat === void 0) { timeFormat = ''; }
        if (alwaysDuration === void 0) { alwaysDuration = false; }
        var defaultUnit = Constants.DURATION_DEFAULT_UNIT(this.isFullDay());
        var exclusions = this.exclude.identifiers(function (v) { return v; }).list();
        var inclusions = this.include.identifiers(function (v) { return v; }).list();
        var cancels = this.cancel.identifiers(function (v) { return v; }).list();
        var hasMeta = !this.meta.isEmpty();
        var out = {};
        var times = [];
        for (var _i = 0, _a = this.times; _i < _a.length; _i++) {
            var time = _a[_i];
            times.push(returnTimes ? time : (timeFormat ? time.format(timeFormat) : time.toString()));
        }
        if (this.start)
            out.start = returnDays ? this.start : this.start.time;
        if (this.end)
            out.end = returnDays ? this.end : this.end.time;
        if (times.length)
            out.times = times;
        if (alwaysDuration || this.duration !== Constants.DURATION_DEFAULT)
            out.duration = this.duration;
        if (alwaysDuration || this.durationUnit !== defaultUnit)
            out.durationUnit = this.durationUnit;
        if (exclusions.length)
            out.exclude = exclusions;
        if (inclusions.length)
            out.include = inclusions;
        if (cancels.length)
            out.cancel = cancels;
        if (hasMeta)
            out.meta = Functions.extend({}, this.meta.map);
        if (this.dayOfWeek.input)
            out.dayOfWeek = this.dayOfWeek.input;
        if (this.dayOfMonth.input)
            out.dayOfMonth = this.dayOfMonth.input;
        if (this.lastDayOfMonth.input)
            out.lastDayOfMonth = this.lastDayOfMonth.input;
        if (this.dayOfYear.input)
            out.dayOfYear = this.dayOfYear.input;
        if (this.year.input)
            out.year = this.year.input;
        if (this.month.input)
            out.month = this.month.input;
        if (this.week.input)
            out.week = this.week.input;
        if (this.weekOfYear.input)
            out.weekOfYear = this.weekOfYear.input;
        if (this.weekspanOfYear.input)
            out.weekspanOfYear = this.weekspanOfYear.input;
        if (this.fullWeekOfYear.input)
            out.fullWeekOfYear = this.fullWeekOfYear.input;
        if (this.lastWeekspanOfYear.input)
            out.lastWeekspanOfYear = this.lastWeekspanOfYear.input;
        if (this.lastFullWeekOfYear.input)
            out.lastFullWeekOfYear = this.lastFullWeekOfYear.input;
        if (this.weekOfMonth.input)
            out.weekOfMonth = this.weekOfMonth.input;
        if (this.weekspanOfMonth.input)
            out.weekspanOfMonth = this.weekspanOfMonth.input;
        if (this.fullWeekOfMonth.input)
            out.fullWeekOfMonth = this.fullWeekOfMonth.input;
        if (this.lastWeekspanOfMonth.input)
            out.lastWeekspanOfMonth = this.lastWeekspanOfMonth.input;
        if (this.lastFullWeekOfMonth.input)
            out.lastFullWeekOfMonth = this.lastFullWeekOfMonth.input;
        return out;
    };
    /**
     * Describes the schedule in a human friendly string taking into account all
     * possible values specified in this schedule.
     *
     * @param thing A brief description of the things (events) on the schedule.
     * @param includeRange When `true` the [[Schedule.start]] and [[Schedule.end]]
     *    are possibly included in the description if they have values.
     * @param includeTimes When `true` the [[Schedule.times]] are possibly included
     *    in the description.
     * @param includeDuration When `true` the [[Schedule.duration]] and
     *    [[Schedule.durationUnit]] are added to the description if
     *    [[Schedule.duration]] is not equal to `1`.
     * @param includeExcludes When `true` the [[Schedule.exclude]] are added
     *    to the description if there are any.
     * @param includeIncludes When `true` the [[Schedule.include]] are added
     *    to the description if there are any.
     * @param includeCancels When `true` the [[Schedule.cancel]] are added
     *    to the description if there are any.
     * @returns The descroption of the schedule.
     */
    Schedule.prototype.describe = function (thing, includeRange, includeTimes, includeDuration, includeExcludes, includeIncludes, includeCancels) {
        if (thing === void 0) { thing = 'event'; }
        if (includeRange === void 0) { includeRange = true; }
        if (includeTimes === void 0) { includeTimes = true; }
        if (includeDuration === void 0) { includeDuration = false; }
        if (includeExcludes === void 0) { includeExcludes = false; }
        if (includeIncludes === void 0) { includeIncludes = false; }
        if (includeCancels === void 0) { includeCancels = false; }
        var out = '';
        if (includeRange) {
            if (this.start) {
                out += 'Starting on ' + this.start.format('dddd Do, YYYY');
                if (this.end) {
                    out += ' and ending on ' + this.end.format('dddd Do, YYYY');
                }
            }
            else if (this.end) {
                out += 'Up until ' + this.end.format('dddd Do, YYYY');
            }
        }
        if (out) {
            out += ' the ' + thing + ' will occur';
        }
        else {
            out += 'The ' + thing + ' will occur';
        }
        out += this.describeRule(this.dayOfWeek.input, 'day of the week', function (x) { return __WEBPACK_IMPORTED_MODULE_10_moment__["weekdays"]()[x]; }, 1, false);
        out += this.describeRule(this.lastDayOfMonth.input, 'last day of the month', function (x) { return Suffix.CACHE[x]; });
        out += this.describeRule(this.dayOfMonth.input, 'day of the month', function (x) { return Suffix.CACHE[x]; });
        out += this.describeRule(this.dayOfYear.input, 'day of the year', function (x) { return Suffix.CACHE[x]; }, 1);
        out += this.describeRule(this.year.input, 'year', function (x) { return x; }, 0, false, ' in ');
        out += this.describeRule(this.month.input, 'month', function (x) { return __WEBPACK_IMPORTED_MODULE_10_moment__["months"]()[x]; }, 0, false, ' in ');
        out += this.describeRule(this.weekOfYear.input, 'week of the year', function (x) { return Suffix.CACHE[x]; });
        out += this.describeRule(this.weekspanOfYear.input, 'weekspan of the year', function (x) { return Suffix.CACHE[x + 1]; }, 1);
        out += this.describeRule(this.fullWeekOfYear.input, 'full week of the year', function (x) { return Suffix.CACHE[x]; });
        out += this.describeRule(this.lastWeekspanOfYear.input, 'last weekspan of the year', function (x) { return Suffix.CACHE[x + 1]; }, 1);
        out += this.describeRule(this.lastFullWeekOfYear.input, 'last full week of the year', function (x) { return Suffix.CACHE[x]; });
        out += this.describeRule(this.weekOfMonth.input, 'week of the month', function (x) { return Suffix.CACHE[x]; });
        out += this.describeRule(this.fullWeekOfMonth.input, 'full week of the month', function (x) { return Suffix.CACHE[x]; });
        out += this.describeRule(this.weekspanOfMonth.input, 'weekspan of the month', function (x) { return Suffix.CACHE[x + 1]; }, 1);
        out += this.describeRule(this.lastFullWeekOfMonth.input, 'last full week of the month', function (x) { return Suffix.CACHE[x]; });
        out += this.describeRule(this.lastWeekspanOfMonth.input, 'last weekspan of the month', function (x) { return Suffix.CACHE[x + 1]; }, 1);
        if (includeTimes && this.times.length) {
            out += ' at ';
            out += this.describeArray(this.times, function (x) { return x.format('hh:mm a'); });
        }
        if (includeDuration && this.duration !== Constants.DURATION_DEFAULT) {
            out += ' lasting ' + this.duration + ' ';
            if (this.durationUnit) {
                out += this.durationUnit + ' ';
            }
        }
        if (includeExcludes) {
            var excludes = this.exclude.spans().list();
            if (excludes.length) {
                out += ' excluding ';
                out += this.describeArray(excludes, function (x) { return x.span.summary(Units.DAY); });
            }
        }
        if (includeIncludes) {
            var includes = this.include.spans().list();
            if (includes.length) {
                out += ' including ';
                out += this.describeArray(includes, function (x) { return x.span.summary(Units.DAY); });
            }
        }
        if (includeCancels) {
            var cancels = this.cancel.spans().list();
            if (cancels.length) {
                out += ' with cancellations on ';
                out += this.describeArray(cancels, function (x) { return x.span.summary(Units.DAY); });
            }
        }
        return out;
    };
    /**
     * Describes the given frequency.
     *
     * @param value The frequency to describe.
     * @param unit The unit of the frequency.
     * @param map How the values in the frequency should be described.
     * @param everyOffset A value to add to a [[FrequencyValueEvery]] offset to
     *    account for zero-based values that should be shifted for human
     *    friendliness.
     * @param the If the word 'the' should be used to describe the unit.
     * @param on The word which preceeds values of the given unit.
     * @param required If the description should always return a non-empty string
     *    even if the frequency was not specified in the original input.
     * @returns A string description of the frequency.
     */
    Schedule.prototype.describeRule = function (value, unit, map, everyOffset, the, on, required) {
        if (everyOffset === void 0) { everyOffset = 0; }
        if (the === void 0) { the = true; }
        if (on === void 0) { on = ' on '; }
        if (required === void 0) { required = false; }
        var out = '';
        var suffix = the ? ' ' + unit : '';
        if (Functions.isFrequencyValueEvery(value)) {
            var valueEvery = value;
            out += ' every ' + Suffix.CACHE[valueEvery.every] + ' ' + unit;
            if (valueEvery.offset) {
                out += ' starting at ' + map(valueEvery.offset + everyOffset) + suffix;
            }
        }
        else if (Functions.isFrequencyValueOneOf(value)) {
            var valueOne = value;
            if (valueOne.length) {
                out += on + (the ? 'the ' : '');
                out += this.describeArray(valueOne, map);
                out += suffix;
            }
        }
        else if (required) {
            out += on + 'any ' + unit;
        }
        return out;
    };
    /**
     * Describes the array by adding commas where appropriate and 'and' before the
     * last value of the array (if its more than `1`).
     *
     * @param array The array of items to describe.
     * @param map The function which converts an item to a string.
     * @returns The final description of the array items.
     */
    Schedule.prototype.describeArray = function (array, map) {
        var out = '';
        var last = array.length - 1;
        out += map(array[0]);
        for (var i = 1; i < last; i++) {
            out += ', ' + map(array[i]);
        }
        if (last > 0) {
            out += ' and ' + map(array[last]);
        }
        return out;
    };
    /**
     * Generates a schedule for an event which occurs once all day for a given day
     * optionally spanning multiple days starting on the given day.
     *
     * @param input The day the event starts.
     * @param days The number of days the event lasts.
     * @returns A new schedule that starts on the given day.
     */
    Schedule.forDay = function (input, days) {
        if (days === void 0) { days = 1; }
        var day = Day_Day.parse(input);
        if (!day) {
            return null;
        }
        return new Schedule({
            year: [day.year],
            month: [day.month],
            dayOfMonth: [day.dayOfMonth],
            duration: days,
            durationUnit: 'days'
        });
    };
    /**
     * Generates a schedule for an event which occurs once at a given time on a
     * given day optionally spanning any amount of time (default is 1 hour).
     *
     * @param input The day the event starts.
     * @param time The time the event starts.
     * @param duration The duration of the event.
     * @param durationUnit The unit for the duration of the event.
     * @returns A new schedule that starts on the given day and time.
     */
    Schedule.forTime = function (input, time, duration, durationUnit) {
        if (duration === void 0) { duration = 1; }
        if (durationUnit === void 0) { durationUnit = 'hours'; }
        var day = Day_Day.parse(input);
        if (!day) {
            return null;
        }
        return new Schedule({
            year: [day.year],
            month: [day.month],
            dayOfMonth: [day.dayOfMonth],
            times: [time],
            duration: duration,
            durationUnit: durationUnit
        });
    };
    /**
     * Generates a schedule for an event which occurs once over a given span.
     *
     * @param span The span of the event.
     * @returns A new schedule that starts and ends at the given timestamps.
     */
    Schedule.forSpan = function (span) {
        var start = span.start;
        var minutes = span.minutes();
        var isDay = minutes % Constants.MINUTES_IN_DAY === 0;
        var isHour = minutes % Constants.MINUTES_IN_HOUR === 0;
        var duration = isDay ? minutes / Constants.MINUTES_IN_DAY : (isHour ? minutes / Constants.MINUTES_IN_HOUR : minutes);
        var durationUnit = isDay ? 'days' : (isHour ? 'hours' : 'minutes');
        return this.forTime(start, start.asTime(), duration, durationUnit);
    };
    return Schedule;
}());


// CONCATENATED MODULE: ./src/Event.ts

/**
 * A pairing of a user specified event object and the schedule which defines
 * when it occurs on a calendar.
 *
 * @typeparam T The type of data stored in the [[Event]] class.
 * @typeparam M The type of metadata stored in the schedule.
 */
var Event = (function () {
    /**
     * Creates a new event.
     *
     * @param schedule The schedule which defines when the event occurs.
     * @param data User specified object which describes this event.
     * @param id User specified ID which identifies this event.
     */
    function Event(schedule, data, id, visible) {
        if (visible === void 0) { visible = true; }
        this.schedule = schedule;
        this.data = data;
        this.id = id;
        this.visible = visible;
    }
    return Event;
}());


// CONCATENATED MODULE: ./src/Time.ts




/**
 * A class which holds a specific time during in any day.
 */
var Time_Time = (function () {
    /**
     * Creates a new Time instance given an hour and optionally a minute, second,
     * and millisecond. If they have not been specified they default to 0.
     *
     * @param hour The hour.
     * @param minute The minute.
     * @param second The second.
     * @param millisecond The millisecond.
     */
    function Time(hour, minute, second, millisecond) {
        if (minute === void 0) { minute = Constants.MINUTE_MIN; }
        if (second === void 0) { second = Constants.SECOND_MIN; }
        if (millisecond === void 0) { millisecond = Constants.MILLIS_MIN; }
        this.hour = hour;
        this.minute = minute;
        this.second = second;
        this.millisecond = millisecond;
    }
    /**
     * Formats this time into a string. The following list describes the available
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
     *
     * @param format The format to output.
     * @returns The formatted time.
     */
    Time.prototype.format = function (format) {
        var formatterEntries = Time.FORMATTERS;
        var out = '';
        for (var i = 0; i < format.length; i++) {
            var handled = false;
            for (var k = 0; k < formatterEntries.length && !handled; k++) {
                var entry = formatterEntries[k];
                var part = format.substring(i, i + entry.size);
                if (part.length === entry.size) {
                    var formatter = entry.formats[part];
                    if (formatter) {
                        out += formatter(this);
                        i += entry.size - 1;
                        handled = true;
                    }
                }
            }
            if (!handled) {
                out += format.charAt(i);
            }
        }
        return out;
    };
    /**
     * Determines whether this time is an exact match for the given time.
     *
     * @param time The given time to test against.
     * @returns `true` if the time matches this time, otherwise `false`.
     */
    Time.prototype.matches = function (time) {
        return this.hour === time.hour &&
            this.minute === time.minute &&
            this.second === time.second &&
            this.millisecond === time.millisecond;
    };
    /**
     * Determines whether this time has the same hour as the given time.
     *
     * @param time The given time to test against.
     * @returns `true` if the given hour matches this hour, otherwise `false`.
     */
    Time.prototype.matchesHour = function (time) {
        return this.hour === time.hour;
    };
    /**
     * Determines whether this time has the same hour and minute as the given time.
     *
     * @param time The given time to test against.
     * @returns `true` if the given hour and minute matches, otherwise `false`.
     */
    Time.prototype.matchesMinute = function (time) {
        return this.hour === time.hour &&
            this.minute === time.minute;
    };
    /**
     * Determines whether this time has the same hour, minute, and second as the
     * given time.
     *
     * @param time The given time to test against.
     * @returns `true` if the given hour, minute, and second matches, otherwise
     *    `false`.
     */
    Time.prototype.matchesSecond = function (time) {
        return this.hour === time.hour &&
            this.minute === time.minute &&
            this.second === time.second;
    };
    /**
     * Sets the time of this instance to the same time of the given input.
     *
     * @param input The time to set this to.
     * @returns `true` if this time was set, otherwise `false` (invalid input).
     */
    Time.prototype.set = function (input) {
        var parsed = Time.parse(input);
        var valid = !!parsed;
        if (valid) {
            this.hour = parsed.hour;
            this.minute = parsed.minute;
            this.second = parsed.second;
            this.millisecond = parsed.millisecond;
        }
        return valid;
    };
    /**
     * @returns The number of milliseconds from the start of the day until this
     *  time.
     */
    Time.prototype.toMilliseconds = function () {
        return this.hour * Constants.MILLIS_IN_HOUR +
            this.minute * Constants.MILLIS_IN_MINUTE +
            this.second * Constants.MILLIS_IN_SECOND +
            this.millisecond;
    };
    /**
     * @returns The time formatted using the smallest format that completely
     *  represents this time.
     */
    Time.prototype.toString = function () {
        if (this.millisecond)
            return this.format('HH:mm:ss.SSS');
        if (this.second)
            return this.format('HH:mm:ss');
        if (this.minute)
            return this.format('HH:mm');
        return this.format('HH');
    };
    /**
     * @returns A unique identifier for this time. The number returned is in the
     *  following format: SSSssmmHH
     */
    Time.prototype.toIdentifier = function () {
        return this.hour +
            this.minute * 100 +
            this.second * 10000 +
            this.millisecond * 10000000;
    };
    /**
     * @returns An object with hour, minute, second, a millisecond properties if
     *  they are non-zero on this time.
     */
    Time.prototype.toObject = function () {
        var out = {
            hour: this.hour
        };
        if (this.minute)
            out.minute = this.minute;
        if (this.second)
            out.second = this.second;
        if (this.millisecond)
            out.millisecond = this.millisecond;
        return out;
    };
    /**
     * Parses a value and tries to convert it to a Time instance.
     *
     * @param input The input to parse.
     * @returns The instance parsed or `null` if it was invalid.
     * @see [[Parse.time]]
     */
    Time.parse = function (input) {
        return Parse_Parse.time(input);
    };
    /**
     * Parses a string and converts it to a Time instance. If the string is not
     * in a valid format `null` is returned.
     *
     * @param time The string to parse.
     * @returns The instance parsed or `null` if it was invalid.
     * @see [[Time.REGEX]]
     */
    Time.fromString = function (time) {
        var matches = this.REGEX.exec(time);
        if (!matches) {
            return null;
        }
        var h = parseInt(matches[1]) || 0;
        var m = parseInt(matches[2]) || 0;
        var s = parseInt(matches[3]) || 0;
        var l = parseInt(matches[4]) || 0;
        return this.build(h, m, s, l);
    };
    /**
     * Parses a number and converts it to a Time instance. The number is assumed
     * to be in the [[Time.toIdentifier]] format.
     *
     * @param time The number to parse.
     * @returns The instance parsed.
     */
    Time.fromIdentifier = function (time) {
        var h = time % 100;
        var m = Math.floor(time / 100) % 100;
        var s = Math.floor(time / 10000) % 100;
        var l = Math.floor(time / 10000000) % 1000;
        return this.build(h, m, s, l);
    };
    /**
     * Returns a new instance given an hour and optionally a minute, second,
     * and millisecond. If they have not been specified they default to 0.
     *
     * @param hour The hour.
     * @param minute The minute.
     * @param second The second.
     * @param millisecond The millisecond.
     * @returns A new instance.
     */
    Time.build = function (hour, minute, second, millisecond) {
        if (minute === void 0) { minute = Constants.MINUTE_MIN; }
        if (second === void 0) { second = Constants.SECOND_MIN; }
        if (millisecond === void 0) { millisecond = Constants.MILLIS_MIN; }
        return new Time(hour, minute, second, millisecond);
    };
    /**
     * The regular expression used to parse a time from a string.
     *
     * - ## = hour
     * - ##:## = hour & minute
     * - ##:##:## = hour, minute, & second
     * - ##:##:##.### = hour, minute, second, and milliseconds
     */
    Time.REGEX = /^(\d\d?):?(\d\d)?:?(\d\d)?\.?(\d\d\d)?$/;
    /**
     * A set of formatting functions keyed by their format string.
     */
    Time.FORMATTERS = [
        {
            size: 3,
            formats: {
                SSS: function (t) { return Functions.padNumber(t.millisecond, 3); }
            }
        },
        {
            size: 2,
            formats: {
                HH: function (t) { return Functions.padNumber(t.hour, 2); },
                hh: function (t) { return Functions.padNumber((t.hour % 12) || 12, 2); },
                kk: function (t) { return Functions.padNumber(t.hour + 1, 2); },
                mm: function (t) { return Functions.padNumber(t.minute, 2); },
                ss: function (t) { return Functions.padNumber(t.second, 2); },
                SS: function (t) { return Functions.padNumber(t.millisecond, 3, 2); }
            }
        },
        {
            size: 1,
            formats: {
                A: function (t) { return t.hour < 12 ? 'AM' : 'PM'; },
                a: function (t) { return t.hour < 12 ? 'am' : 'pm'; },
                H: function (t) { return t.hour + ''; },
                h: function (t) { return ((t.hour % 12) || 12) + ''; },
                k: function (t) { return (t.hour + 1) + ''; },
                m: function (t) { return t.minute + ''; },
                s: function (t) { return t.second + ''; },
                S: function (t) { return Functions.padNumber(t.millisecond, 3, 1); }
            }
        }
    ];
    return Time;
}());


// CONCATENATED MODULE: ./src/Parse.ts








/**
 * The class which takes user input and parses it to specific structures.
 */
var Parse_Parse = (function () {
    function Parse() {
    }
    /**
     * Parses a value and converts it to a [[FrequencyCheck]].
     *
     * @param input The input to parse into a function.
     * @param property The [[Day]] property the frequency is for.
     * @returns A function which determines whether a value matches a frequency.
     * @see [[Schedule]]
     */
    Parse.frequency = function (input, property) {
        var check = function (value) {
            return true;
        };
        check.given = false;
        if (Functions.isFrequencyValueEvery(input)) {
            var every_1 = input.every;
            var offset_1 = (input.offset || 0) % every_1;
            check = function (value) {
                return value % every_1 === offset_1;
            };
            check.given = true;
        }
        if (Functions.isFrequencyValueOneOf(input)) {
            var map_1 = {};
            for (var i = 0; i < input.length; i++) {
                map_1[input[i]] = true;
            }
            check = function (value) {
                return !!map_1[value];
            };
            check.given = true;
        }
        check.input = Functions.coalesce(input, null);
        check.property = property;
        return check;
    };
    /**
     * Parses [[DayInput]] into a [[Day]] instance.
     *
     * ```typescript
     * Parse.day( 65342300 );               // UTC timestamp
     * Parse.day( '01/02/2014' );           // strings in many formats
     * Parse.day( day );                    // return a passed instance
     * Parse.day( [2018, 0, 2] );           // array: 01/02/2018
     * Parse.day( {year: 2018, month: 2} ); // object: 03/01/2018
     * Parse.day( true );                   // today
     * ```
     *
     * @param input The input to parse.
     * @returns The Day parsed or `null` if the value is not valid.
     */
    Parse.day = function (input) {
        if (Functions.isNumber(input)) {
            return Day_Day.unix(input);
        }
        else if (Functions.isString(input)) {
            return Day_Day.fromString(input);
        }
        else if (input instanceof Day_Day) {
            return input;
        }
        else if (Functions.isArray(input)) {
            return Day_Day.fromArray(input);
        }
        else if (Functions.isObject(input)) {
            return Day_Day.fromObject(input);
        }
        else if (input === true) {
            return Day_Day.today();
        }
        return null;
    };
    /**
     * Parses a value and tries to convert it to a Time instance.
     *
     * ```typescript
     * Parse.time( time );      // return a passed instance
     * Parse.time( 9 );         // 09:00:00.000
     * Parse.time( 3009 );      // 09:30:00.000
     * Parse.time( 593009 );    // 09:30:59.000
     * Parsetime( '09' );       // 09:00:00.000
     * Parse.time( '9:30' );    // 09:30:00.000
     * Parse.time( '9:30:59' ); // 09:30:59.000
     * Parse.time( {hour: 2} ); // 02:00:00.000
     * ```
     *
     * @param input The input to parse.
     * @returns The instance parsed or `null` if it was invalid.
     * @see [[Time.fromIdentifier]]
     * @see [[Time.fromString]]
     */
    Parse.time = function (input) {
        if (input instanceof Time_Time) {
            return input;
        }
        if (Functions.isNumber(input)) {
            return Time_Time.fromIdentifier(input);
        }
        if (Functions.isString(input)) {
            return Time_Time.fromString(input);
        }
        if (Functions.isObject(input) && Functions.isNumber(input.hour)) {
            return new Time_Time(input.hour, input.minute, input.second, input.millisecond);
        }
        return null;
    };
    /**
     * Parses a value and tries to convert it to an array of Time instances.
     * If any of the given values are not a valid time value then the resulting
     * array will not contain a time instance.
     *
     * @param input The input to parse.
     * @returns A non-null array of time instances.
     * @see [[Parse.time]]
     */
    Parse.times = function (input) {
        var times = [];
        if (Functions.isArray(input)) {
            for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
                var timeInput = input_1[_i];
                var time = this.time(timeInput);
                if (time) {
                    times.push(time);
                }
            }
            // Sort times from earliest to latest.
            times.sort(function (a, b) {
                return a.toMilliseconds() - b.toMilliseconds();
            });
        }
        return times;
    };
    /**
     * Parses an array of excluded days into a map of excluded days where the
     * array value and returned object key are [[Day.dayIdentifier]].
     *
     * ```typescript
     * Parse.modifier( [ 20180101, 20140506 ] );            // {'20180101': true, '20140506': true}
     * Parse.modifier( [ 20180101, Day.build(2014,4,6) ] ); // {'20180101': true, '20140506': true}
     * ```
     *
     * @param input The input to parse.
     * @param value The default value if the input given is an array of identifiers.
     * @param parseMeta A function to use to parse a modifier.
     * @param out The modifier to set the identifiers and values of and return.
     * @returns The object with identifier keys and `true` values.
     * @see [[Day.dayIdentifier]]
     */
    Parse.modifier = function (input, value, parseMeta, out) {
        if (parseMeta === void 0) { parseMeta = (function (x) { return x; }); }
        if (out === void 0) { out = new ScheduleModifier_ScheduleModifier(); }
        var map = {};
        if (Functions.isArray(input)) {
            for (var _i = 0, input_2 = input; _i < input_2.length; _i++) {
                var identifier = input_2[_i];
                if (identifier instanceof Day_Day) {
                    map[identifier.dayIdentifier] = value;
                }
                else if (Functions.isNumber(identifier)) {
                    map[identifier] = value;
                }
                else if (Functions.isString(identifier)) {
                    map[identifier] = value;
                }
            }
        }
        if (Functions.isObject(input)) {
            for (var identifier in input) {
                map[identifier] = parseMeta(input[identifier]);
            }
        }
        out.map = map;
        return out;
    };
    /**
     * Parses an object which specifies a schedule where events may or may not
     * repeat and they may be all day events or at specific times.
     *
     * @param input The input to parse into a schedule.
     * @param parseMeta A function to use when parsing meta input into the desired type.
     * @param out The schedule to set the values of and return.
     * @returns An instance of the parsed [[Schedule]].
     */
    Parse.schedule = function (input, parseMeta, out) {
        if (parseMeta === void 0) { parseMeta = (function (x) { return x; }); }
        if (out === void 0) { out = new Schedule_Schedule(); }
        if (input instanceof Schedule_Schedule) {
            return input;
        }
        var on = this.day(input.on);
        var times = this.times(input.times);
        var fullDay = times.length === 0;
        if (on) {
            input.start = on.start();
            input.end = on.end();
            input.year = [on.year];
            input.month = [on.month];
            input.dayOfMonth = [on.dayOfMonth];
        }
        out.times = times;
        out.duration = Functions.coalesce(input.duration, Constants.DURATION_DEFAULT);
        out.durationUnit = Functions.coalesce(input.durationUnit, Constants.DURATION_DEFAULT_UNIT(fullDay));
        out.start = this.day(input.start);
        out.end = this.day(input.end);
        out.exclude = this.modifier(input.exclude, true, undefined, out.exclude);
        out.include = this.modifier(input.include, true, undefined, out.include);
        out.cancel = this.modifier(input.cancel, true, undefined, out.cancel);
        out.meta = this.modifier(input.meta, null, parseMeta, out.meta);
        out.year = this.frequency(input.year, 'year');
        out.month = this.frequency(input.month, 'month');
        out.week = this.frequency(input.week, 'week');
        out.weekOfYear = this.frequency(input.weekOfYear, 'weekOfYear');
        out.weekspanOfYear = this.frequency(input.weekspanOfYear, 'weekspanOfYear');
        out.fullWeekOfYear = this.frequency(input.fullWeekOfYear, 'fullWeekOfYear');
        out.lastWeekspanOfYear = this.frequency(input.lastWeekspanOfYear, 'lastWeekspanOfYear');
        out.lastFullWeekOfYear = this.frequency(input.lastFullWeekOfYear, 'lastFullWeekOfYear');
        out.weekOfMonth = this.frequency(input.weekOfMonth, 'weekOfMonth');
        out.weekspanOfMonth = this.frequency(input.weekspanOfMonth, 'weekspanOfMonth');
        out.fullWeekOfMonth = this.frequency(input.fullWeekOfMonth, 'fullWeekOfMonth');
        out.lastWeekspanOfMonth = this.frequency(input.lastWeekspanOfMonth, 'lastWeekspanOfMonth');
        out.lastFullWeekOfMonth = this.frequency(input.lastFullWeekOfMonth, 'lastFullWeekOfMonth');
        out.dayOfWeek = this.frequency(input.dayOfWeek, 'dayOfWeek');
        out.dayOfMonth = this.frequency(input.dayOfMonth, 'dayOfMonth');
        out.lastDayOfMonth = this.frequency(input.lastDayOfMonth, 'lastDayOfMonth');
        out.dayOfYear = this.frequency(input.dayOfYear, 'dayOfYear');
        out.updateDurationInDays();
        out.updateChecks();
        return out;
    };
    /**
     * Parses an array of [[FrequencyCheck]] functions and returns an array of
     * functions for only the checks that were specified by the user.
     *
     * @param checks The array of check functions to filter through.
     * @returns The array of user specified checks.
     */
    Parse.givenFrequency = function (checks) {
        var out = [];
        for (var _i = 0, checks_1 = checks; _i < checks_1.length; _i++) {
            var check = checks_1[_i];
            if (check.given) {
                out.push(check);
            }
        }
        return out;
    };
    /**
     * Parses [[EventInput]] and returns an [[Event]].
     *
     * @param input The input to parse.
     * @param parseData A function to use when parsing data input into the desired type.
     * @param parseMeta A function to use when parsing meta input into the desired type.
     * @returns The parsed value.
     */
    Parse.event = function (input, parseData, parseMeta) {
        if (parseData === void 0) { parseData = (function (x) { return x; }); }
        if (parseMeta === void 0) { parseMeta = (function (x) { return x; }); }
        if (input instanceof Event) {
            return input;
        }
        if (!input.schedule) {
            return null;
        }
        var schedule = this.schedule(input.schedule, parseMeta);
        return new Event(schedule, parseData(input.data), input.id, input.visible);
    };
    /**
     * Parses a schedule from a CRON pattern. TODO
     */
    Parse.cron = function (pattern, out) {
        if (out === void 0) { out = new Schedule_Schedule(); }
        return out;
    };
    return Parse;
}());


// CONCATENATED MODULE: ./src/Day.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);






// @ts-ignore

/**
 * A class which represents a point in time as
 */
var Day_Day = (function () {
    /**
     *
     */
    function Day(date) {
        this.date = date;
        this.time = date.valueOf();
        this.millis = date.millisecond();
        this.seconds = date.second();
        this.minute = date.minute();
        this.hour = date.hour();
        this.month = date.month();
        this.year = date.year();
        this.quarter = date.quarter();
        this.dayOfWeek = date.day();
        this.dayOfMonth = date.date();
        this.dayOfYear = date.dayOfYear();
        this.week = date.week();
        this.lastDayOfMonth = Day.getLastDayOfMonth(date);
        this.weekOfYear = Day.getWeekOfYear(date);
        this.weekspanOfYear = Day.getWeekspanOfYear(date);
        this.fullWeekOfYear = Day.getFullWeekOfYear(date);
        this.lastWeekspanOfYear = Day.getLastWeekspanOfYear(date);
        this.lastFullWeekOfYear = Day.getLastFullWeekOfYear(date);
        this.weekOfMonth = Day.getWeekOfMonth(date);
        this.weekspanOfMonth = Day.getWeekspanOfMonth(date);
        this.fullWeekOfMonth = Day.getFullWeekOfMonth(date);
        this.lastWeekspanOfMonth = Day.getLastWeekspanOfMonth(date);
        this.lastFullWeekOfMonth = Day.getLastFullWeekOfMonth(date);
        this.timeIdentifier = Identifier_Identifier.Time.get(this);
        this.dayIdentifier = Identifier_Identifier.Day.get(this);
        this.weekIdentifier = Identifier_Identifier.Week.get(this);
        this.monthIdentifier = Identifier_Identifier.Month.get(this);
        this.quarterIdentifier = Identifier_Identifier.Quarter.get(this);
    }
    // Same
    /**
     *
     */
    Day.prototype.sameDay = function (day) {
        return this.dayIdentifier === day.dayIdentifier;
    };
    /**
     *
     */
    Day.prototype.sameMonth = function (day) {
        return this.monthIdentifier === day.monthIdentifier;
    };
    /**
     *
     */
    Day.prototype.sameWeek = function (day) {
        return this.weekIdentifier === day.weekIdentifier;
    };
    /**
     *
     */
    Day.prototype.sameYear = function (day) {
        return this.year === day.year;
    };
    /**
     *
     */
    Day.prototype.sameQuarter = function (day) {
        return this.quarterIdentifier === day.quarterIdentifier;
    };
    /**
     *
     */
    Day.prototype.sameHour = function (day) {
        return this.dayIdentifier === day.dayIdentifier && this.hour === day.hour;
    };
    /**
     *
     */
    Day.prototype.sameMinute = function (day) {
        return this.timeIdentifier === day.timeIdentifier;
    };
    /**
     *
     */
    Day.prototype.sameTime = function (time) {
        return this.hour === time.hour && this.minute === time.minute && this.seconds === time.second && this.millis === time.millisecond;
    };
    // Comparison
    /**
     *
     */
    Day.prototype.isBefore = function (day, precision) {
        return this.date.isBefore(day.date, precision);
    };
    /**
     *
     */
    Day.prototype.isSameOrBefore = function (day, precision) {
        return this.date.isSameOrBefore(day.date, precision);
    };
    /**
     *
     */
    Day.prototype.isAfter = function (day, precision) {
        return this.date.isAfter(day.date, precision);
    };
    /**
     *
     */
    Day.prototype.isSameOrAfter = function (day, precision) {
        return this.date.isSameOrAfter(day.date, precision);
    };
    /**
     *
     */
    Day.prototype.max = function (day) {
        return this.date.isAfter(day.date) ? this : day;
    };
    /**
     *
     */
    Day.prototype.min = function (day) {
        return this.date.isBefore(day.date) ? this : day;
    };
    // Between
    Day.prototype.millisBetween = function (day, op, absolute) {
        if (op === void 0) { op = Op.DOWN; }
        if (absolute === void 0) { absolute = true; }
        return operate(this.date.diff(day.date, 'milliseconds', true), op, absolute);
    };
    Day.prototype.secondsBetween = function (day, op, absolute) {
        if (op === void 0) { op = Op.DOWN; }
        if (absolute === void 0) { absolute = true; }
        return operate(this.date.diff(day.date, 'seconds', true), op, absolute);
    };
    Day.prototype.minutesBetween = function (day, op, absolute) {
        if (op === void 0) { op = Op.DOWN; }
        if (absolute === void 0) { absolute = true; }
        return operate(this.date.diff(day.date, 'minutes', true), op, absolute);
    };
    Day.prototype.hoursBetween = function (day, op, absolute) {
        if (op === void 0) { op = Op.DOWN; }
        if (absolute === void 0) { absolute = true; }
        return operate(this.date.diff(day.date, 'hours', true), op, absolute);
    };
    Day.prototype.daysBetween = function (day, op, absolute) {
        if (op === void 0) { op = Op.DOWN; }
        if (absolute === void 0) { absolute = true; }
        return operate(this.date.diff(day.date, 'days', true), op, absolute);
    };
    Day.prototype.weeksBetween = function (day, op, absolute) {
        if (op === void 0) { op = Op.DOWN; }
        if (absolute === void 0) { absolute = true; }
        return operate(this.date.diff(day.date, 'weeks', true), op, absolute);
    };
    Day.prototype.monthsBetween = function (day, op, absolute) {
        if (op === void 0) { op = Op.DOWN; }
        if (absolute === void 0) { absolute = true; }
        return operate(this.date.diff(day.date, 'months', true), op, absolute);
    };
    Day.prototype.yearsBetween = function (day, op, absolute) {
        if (op === void 0) { op = Op.DOWN; }
        if (absolute === void 0) { absolute = true; }
        return operate(this.date.diff(day.date, 'years', true), op, absolute);
    };
    Day.prototype.isBetween = function (start, end, inclusive) {
        if (inclusive === void 0) { inclusive = true; }
        return this.date.isBetween(start.date, end.date, null, inclusive ? '[]' : '[)');
    };
    Day.prototype.mutate = function (mutator) {
        var d = this.toMoment();
        mutator(d);
        return new Day(d);
    };
    Day.prototype.add = function (amount, unit) {
        return this.mutate(function (d) { return d.add(amount, unit); });
    };
    Day.prototype.relative = function (millis) {
        return this.mutate(function (d) { return d.add(millis, 'milliseconds'); });
    };
    // Days
    Day.prototype.relativeDays = function (days) {
        return this.mutate(function (d) { return d.add(days, 'days'); });
    };
    Day.prototype.prev = function (days) {
        if (days === void 0) { days = 1; }
        return this.relativeDays(-days);
    };
    Day.prototype.next = function (days) {
        if (days === void 0) { days = 1; }
        return this.relativeDays(days);
    };
    Day.prototype.withDayOfMonth = function (day) {
        return this.mutate(function (d) { return d.date(day); });
    };
    Day.prototype.withDayOfWeek = function (dayOfWeek) {
        return this.mutate(function (d) { return d.day(dayOfWeek); });
    };
    Day.prototype.withDayOfYear = function (dayOfYear) {
        return this.mutate(function (d) { return d.dayOfYear(dayOfYear); });
    };
    // Month
    Day.prototype.withMonth = function (month) {
        return this.mutate(function (d) { return d.month(month); });
    };
    Day.prototype.relativeMonths = function (months) {
        return this.mutate(function (d) { return d.add(months, 'months'); });
    };
    Day.prototype.prevMonth = function (months) {
        if (months === void 0) { months = 1; }
        return this.relativeMonths(-months);
    };
    Day.prototype.nextMonth = function (months) {
        if (months === void 0) { months = 1; }
        return this.relativeMonths(months);
    };
    // Week Of Year
    Day.prototype.withWeek = function (week, relativeWeek) {
        if (relativeWeek === void 0) { relativeWeek = this.week; }
        return this.mutate(function (d) { return d.add((week - relativeWeek) * Constants.DAYS_IN_WEEK, 'days'); });
    };
    Day.prototype.withWeekOfYear = function (week) {
        return this.withWeek(week, this.weekOfYear);
    };
    Day.prototype.withFullWeekOfYear = function (week) {
        return this.withWeek(week, this.fullWeekOfYear);
    };
    Day.prototype.withWeekspanOfYear = function (week) {
        return this.withWeek(week, this.weekspanOfYear);
    };
    Day.prototype.withWeekOfMonth = function (week) {
        return this.withWeek(week, this.weekOfMonth);
    };
    Day.prototype.withWeekspanOfMonth = function (week) {
        return this.withWeek(week, this.weekspanOfMonth);
    };
    Day.prototype.withFullWeekOfMonth = function (week) {
        return this.withWeek(week, this.fullWeekOfMonth);
    };
    Day.prototype.relativeWeeks = function (weeks) {
        return this.mutate(function (d) { return d.add(weeks, 'weeks'); });
    };
    Day.prototype.prevWeek = function (weeks) {
        if (weeks === void 0) { weeks = 1; }
        return this.relativeWeeks(-weeks);
    };
    Day.prototype.nextWeek = function (weeks) {
        if (weeks === void 0) { weeks = 1; }
        return this.relativeWeeks(weeks);
    };
    // Year
    Day.prototype.withYear = function (year) {
        return this.mutate(function (d) { return d.year(year); });
    };
    Day.prototype.relativeYears = function (years) {
        return this.mutate(function (d) { return d.add(years, 'year'); });
    };
    Day.prototype.prevYear = function (years) {
        if (years === void 0) { years = 1; }
        return this.relativeYears(-years);
    };
    Day.prototype.nextYear = function (years) {
        if (years === void 0) { years = 1; }
        return this.relativeYears(years);
    };
    // Hour
    Day.prototype.withHour = function (hour) {
        return this.mutate(function (d) { return d.hour(hour); });
    };
    Day.prototype.relativeHours = function (hours) {
        return this.mutate(function (d) { return d.add(hours, 'hours'); });
    };
    Day.prototype.prevHour = function (hours) {
        if (hours === void 0) { hours = 1; }
        return this.relativeHours(-hours);
    };
    Day.prototype.nextHour = function (hours) {
        if (hours === void 0) { hours = 1; }
        return this.relativeHours(hours);
    };
    // Time
    Day.prototype.withTimes = function (hour, minute, second, millisecond) {
        if (hour === void 0) { hour = Constants.HOUR_MIN; }
        if (minute === void 0) { minute = Constants.MINUTE_MIN; }
        if (second === void 0) { second = Constants.SECOND_MIN; }
        if (millisecond === void 0) { millisecond = Constants.MILLIS_MIN; }
        return this.mutate(function (d) { return d.set({ hour: hour, minute: minute, second: second, millisecond: millisecond }); });
    };
    Day.prototype.withTime = function (time) {
        return this.withTimes(time.hour, time.minute, time.second, time.millisecond);
    };
    Day.prototype.asTime = function () {
        return new Time_Time(this.hour, this.minute, this.seconds, this.millis);
    };
    // Start & End
    // Time
    Day.prototype.start = function () {
        return this.mutate(function (d) { return d.startOf('day'); });
    };
    Day.prototype.isStart = function () {
        return this.hour === Constants.HOUR_MIN &&
            this.minute === Constants.MINUTE_MIN &&
            this.seconds === Constants.SECOND_MIN &&
            this.millis === Constants.MILLIS_MIN;
    };
    Day.prototype.end = function (inclusive) {
        if (inclusive === void 0) { inclusive = true; }
        return inclusive ?
            this.mutate(function (d) { return d.endOf('day'); }) :
            this.mutate(function (d) { return d.startOf('day').add(1, 'day'); });
    };
    Day.prototype.isEnd = function () {
        return this.hour === Constants.HOUR_MAX &&
            this.minute === Constants.MINUTE_MAX &&
            this.seconds === Constants.SECOND_MAX &&
            this.millis === Constants.MILLIS_MAX;
    };
    // Hour
    Day.prototype.startOfHour = function () {
        return this.mutate(function (d) { return d.startOf('hour'); });
    };
    Day.prototype.isStartOfHour = function () {
        return this.minute === Constants.MINUTE_MIN &&
            this.seconds === Constants.SECOND_MIN &&
            this.millis === Constants.MILLIS_MIN;
    };
    Day.prototype.endOfHour = function (inclusive) {
        if (inclusive === void 0) { inclusive = true; }
        return inclusive ?
            this.mutate(function (d) { return d.endOf('hour'); }) :
            this.mutate(function (d) { return d.startOf('hour').add(1, 'hour'); });
    };
    Day.prototype.isEndOfHour = function () {
        return this.minute === Constants.MINUTE_MAX &&
            this.seconds === Constants.SECOND_MAX &&
            this.millis === Constants.MILLIS_MAX;
    };
    // Week
    Day.prototype.startOfWeek = function () {
        return this.mutate(function (d) { return d.startOf('week'); });
    };
    Day.prototype.isStartOfWeek = function () {
        return this.dayOfWeek === Constants.WEEKDAY_MIN;
    };
    Day.prototype.endOfWeek = function (inclusive) {
        if (inclusive === void 0) { inclusive = true; }
        return inclusive ?
            this.mutate(function (d) { return d.endOf('week'); }) :
            this.mutate(function (d) { return d.startOf('week').add(1, 'week'); });
    };
    Day.prototype.isEndOfWeek = function () {
        return this.dayOfWeek === Constants.WEEKDAY_MAX;
    };
    // Month
    Day.prototype.startOfMonth = function () {
        return this.mutate(function (d) { return d.startOf('month'); });
    };
    Day.prototype.isStartOfMonth = function () {
        return this.dayOfMonth === Constants.DAY_MIN;
    };
    Day.prototype.endOfMonth = function (inclusive) {
        if (inclusive === void 0) { inclusive = true; }
        return inclusive ?
            this.mutate(function (d) { return d.endOf('month'); }) :
            this.mutate(function (d) { return d.startOf('month').add(1, 'month'); });
    };
    Day.prototype.isEndOfMonth = function () {
        return this.dayOfMonth === this.daysInMonth();
    };
    // Year
    Day.prototype.startOfYear = function () {
        return this.mutate(function (d) { return d.startOf('year'); });
    };
    Day.prototype.isStartOfYear = function () {
        return this.month === Constants.MONTH_MIN && this.dayOfMonth === Constants.DAY_MIN;
    };
    Day.prototype.endOfYear = function (inclusive) {
        if (inclusive === void 0) { inclusive = true; }
        return inclusive ?
            this.mutate(function (d) { return d.endOf('year'); }) :
            this.mutate(function (d) { return d.startOf('year').add(1, 'year'); });
    };
    Day.prototype.isEndOfYear = function () {
        return this.month === Constants.MONTH_MAX && this.dayOfMonth === Constants.DAY_MAX;
    };
    // Days In X
    Day.prototype.daysInMonth = function () {
        return this.date.daysInMonth();
    };
    Day.prototype.daysInYear = function () {
        return this.endOfYear().dayOfYear;
    };
    Day.prototype.weeksInYear = function () {
        return this.date.weeksInYear();
    };
    // Display
    Day.prototype.format = function (format) {
        return this.date.format(format);
    };
    Day.prototype.utc = function (keepLocalTime) {
        return this.mutate(function (d) { return d.utc(keepLocalTime); });
    };
    Day.prototype.toMoment = function () {
        return this.date.clone();
    };
    Day.prototype.toDate = function () {
        return this.date.toDate();
    };
    Day.prototype.toArray = function () {
        return this.date.toArray();
    };
    Day.prototype.toJSON = function () {
        return this.date.toJSON();
    };
    Day.prototype.toISOString = function (keepOffset) {
        if (keepOffset === void 0) { keepOffset = false; }
        return this.date.toISOString(keepOffset);
    };
    Day.prototype.toObject = function () {
        return this.date.toObject();
    };
    Day.prototype.toString = function () {
        return this.date.toString();
    };
    // State
    Day.prototype.isDST = function () {
        return this.date.isDST();
    };
    Day.prototype.isLeapYear = function () {
        return this.date.isLeapYear();
    };
    // Instances
    Day.now = function () {
        return new Day(__WEBPACK_IMPORTED_MODULE_5_moment__());
    };
    Day.today = function () {
        return this.now().start();
    };
    Day.tomorrow = function () {
        return this.today().next();
    };
    Day.fromMoment = function (moment) {
        return moment && moment.isValid() ? new Day(moment) : null;
    };
    Day.unix = function (millis) {
        return this.fromMoment(__WEBPACK_IMPORTED_MODULE_5_moment__(millis));
    };
    Day.unixSeconds = function (millis) {
        return this.fromMoment(__WEBPACK_IMPORTED_MODULE_5_moment__["unix"](millis));
    };
    Day.parse = function (input) {
        return Parse_Parse.day(input);
    };
    Day.fromString = function (input) {
        return this.fromMoment(__WEBPACK_IMPORTED_MODULE_5_moment__(input));
    };
    Day.fromFormat = function (input, formats) {
        return this.fromMoment(__WEBPACK_IMPORTED_MODULE_5_moment__(input, formats));
    };
    Day.fromObject = function (input) {
        return this.fromMoment(__WEBPACK_IMPORTED_MODULE_5_moment__(input));
    };
    Day.fromDate = function (input) {
        return this.fromMoment(__WEBPACK_IMPORTED_MODULE_5_moment__(input));
    };
    Day.fromArray = function (input) {
        return this.fromMoment(__WEBPACK_IMPORTED_MODULE_5_moment__(input));
    };
    Day.fromDayIdentifier = function (id) {
        var date = id % 100;
        var month = (Math.floor(id / 100) % 100) - 1;
        var year = Math.floor(id / 10000);
        return this.build(year, month, date);
    };
    Day.build = function (year, month, date, hour, minute, second, millisecond) {
        if (date === void 0) { date = Constants.DAY_MIN; }
        if (hour === void 0) { hour = Constants.HOUR_MIN; }
        if (minute === void 0) { minute = Constants.MINUTE_MIN; }
        if (second === void 0) { second = Constants.SECOND_MIN; }
        if (millisecond === void 0) { millisecond = Constants.MILLIS_MIN; }
        return new Day(__WEBPACK_IMPORTED_MODULE_5_moment__({ year: year, month: month, date: date, hour: hour, minute: minute, second: second, millisecond: millisecond }));
    };
    Day.getWeekspanOfYear = function (date) {
        return Math.floor((date.dayOfYear() - 1) / Constants.DAYS_IN_WEEK);
    };
    Day.getLastWeekspanOfYear = function (date) {
        var lastOfYear = date.clone().endOf('year');
        var daysInYear = lastOfYear.dayOfYear();
        return Math.floor((daysInYear - date.dayOfYear()) / Constants.DAYS_IN_WEEK);
    };
    Day.getWeekOfYear = function (date) {
        var firstOfYear = date.clone().startOf('year');
        var weeks = date.week();
        return firstOfYear.day() > Constants.WEEK_OF_MONTH_MINIMUM_WEEKDAY ? weeks - 1 : weeks;
    };
    Day.getFullWeekOfYear = function (date) {
        var firstOfYear = date.clone().startOf('year');
        var weeks = date.week();
        return firstOfYear.day() === Constants.WEEKDAY_MIN ? weeks : weeks - 1;
    };
    Day.getLastFullWeekOfYear = function (date) {
        var firstOfYear = date.clone().startOf('year');
        var weeks = date.week();
        var weeksMax = date.weeksInYear();
        var lastWeek = weeksMax - weeks;
        return firstOfYear.day() === Constants.WEEKDAY_MIN ? lastWeek + 1 : lastWeek;
    };
    Day.getWeekspanOfMonth = function (date) {
        return Math.floor((date.date() - 1) / Constants.DAYS_IN_WEEK);
    };
    Day.getLastWeekspanOfMonth = function (date) {
        return Math.floor((date.daysInMonth() - date.date()) / Constants.DAYS_IN_WEEK);
    };
    Day.getFullWeekOfMonth = function (date) {
        return Math.floor((date.date() - 1 - date.day() + Constants.DAYS_IN_WEEK) / Constants.DAYS_IN_WEEK);
    };
    Day.getLastFullWeekOfMonth = function (date) {
        return Math.floor((date.daysInMonth() - date.date() - (Constants.WEEKDAY_MAX - date.day()) + Constants.DAYS_IN_WEEK) / Constants.DAYS_IN_WEEK);
    };
    Day.getWeekOfMonth = function (date) {
        var dom = date.date();
        var dow = date.day();
        var sundayDate = dom - dow;
        return Math.floor((sundayDate + Constants.WEEK_OF_MONTH_MINIMUM_WEEKDAY + 5) / Constants.DAYS_IN_WEEK);
    };
    Day.getLastDayOfMonth = function (date) {
        return date.daysInMonth() - date.date() + 1;
    };
    return Day;
}());


// CONCATENATED MODULE: ./src/CalendarDay.ts

var CalendarDay___extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



/**
 * A day in a [[Calendar]] with extra information relative to any selection on
 * the calendar, the current date, or events on the day.
 *
 * @typeparam T The type of data stored in the [[Event]] class.
 * @typeparam M The type of metadata stored in the schedule.
 */
var CalendarDay_CalendarDay = (function (_super) {
    CalendarDay___extends(CalendarDay, _super);
    function CalendarDay() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Whether this day is the current day (ex: today).
         */
        _this.currentDay = false;
        /**
         * Whether this day is on the same week as the current day (ex: today).
         */
        _this.currentWeek = false;
        /**
         * Whether this day is on the same month as the current day (ex: today).
         */
        _this.currentMonth = false;
        /**
         * Whether this day is on the same year as the current day (ex: today).
         */
        _this.currentYear = false;
        /**
         * How many days away this day is from the current day (ex: today). If this
         * day is the current day the offset is 0. If this day is before the current
         * day it will be the negative number of days away. Otherwise this will be
         * positive meaning this day is after the current day by the given days.
         */
        _this.currentOffset = 0;
        /**
         * Whether this day is part of a selection on the calendar.
         */
        _this.selectedDay = false;
        /**
         * Whether this day is on the same week that the calendar selection is.
         */
        _this.selectedWeek = false;
        /**
         * Whether this day is on the same month that the calendar selection is.
         */
        _this.selectedMonth = false;
        /**
         * Whether this day is on the same year that the calendar selection is.
         */
        _this.selectedYear = false;
        /**
         * Whether this day is in the current calendar or not. Some days are outside
         * the calendar span and used to fill in weeks. Month calendars will fill in
         * days so the list of days in the calendar start on Sunday and end on Saturday.
         */
        _this.inCalendar = false;
        /**
         * The list of events on this day based on the settings and schedules in the
         * calendar.
         */
        _this.events = [];
        return _this;
    }
    /**
     * Creates an iterator for the events on this day.
     *
     * @returns The new iterator for the events on this day.
     */
    CalendarDay.prototype.iterateEvents = function () {
        return Iterator_Iterator.forArray(this.events);
    };
    /**
     * Updates the current flags on this day given the current day (ex: today).
     *
     * @param current The current day of the calendar.
     */
    CalendarDay.prototype.updateCurrent = function (current) {
        this.currentDay = this.sameDay(current);
        this.currentWeek = this.sameWeek(current);
        this.currentMonth = this.sameMonth(current);
        this.currentYear = this.sameYear(current);
        this.currentOffset = this.daysBetween(current, Op.DOWN, false);
        return this;
    };
    /**
     * Updates the selection flags on this day given the selection range on the
     * calendar.
     *
     * @param selected The span of days selected on the calendar.
     */
    CalendarDay.prototype.updateSelected = function (selected) {
        this.selectedDay = selected.matchesDay(this);
        this.selectedWeek = selected.matchesWeek(this);
        this.selectedMonth = selected.matchesMonth(this);
        this.selectedYear = selected.matchesYear(this);
        return this;
    };
    /**
     * Clears the selection flags on this day. This is done when the selection on
     * the calendar is cleared.
     */
    CalendarDay.prototype.clearSelected = function () {
        this.selectedDay = this.selectedWeek = this.selectedMonth = this.selectedYear = false;
        return this;
    };
    return CalendarDay;
}(Day_Day));


// CONCATENATED MODULE: ./src/CalendarEvent.ts


/**
 * An instance of an [[Event]] on a given day of a [[Calendar]] generated by
 * the event's [[Schedule]].
 *
 * @typeparam T The type of data stored in the [[Event]] class.
 * @typeparam M The type of metadata stored in the schedule and in this class.
 */
var CalendarEvent_CalendarEvent = (function () {
    /**
     * Creates a new event instance given the id, the event paired with the
     * schedule, the schedule, the time span of the event, and the day on the
     * calendar the event belongs to.
     *
     * @param id The relatively unique identifier of this event.
     * @param event The event which created this instance.
     * @param time The time span of this event.
     * @param actualDay The day on the calendar this event is for.
     */
    function CalendarEvent(id, event, time, actualDay) {
        /**
         * The row this event is on in a visual calendar. An event can span multiple
         * days and it is desirable to have the occurrence on each day to line up.
         * This is only set when [[Calendar.updateRows]] is true or manually set.
         * This value makes sense for visual calendars for all day events or when the
         * visual calendar is not positioning events based on their time span.
         */
        this.row = 0;
        /**
         * The column this event is on in a visual calendar. An event can have its
         * time overlap with another event displaying one of the events in another
         * column. This is only set when [[Calendar.updateColumns]] is true or
         * manually set. This value makes sense for visual calendars that are
         * displaying event occurrences at specific times positioned accordingly.
         */
        this.col = 0;
        this.id = id;
        this.event = event;
        this.time = time;
        this.day = actualDay;
        this.fullDay = event.schedule.isFullDay();
        this.meta = event.schedule.getMeta(time.start);
        this.cancelled = event.schedule.isCancelled(time.start);
        this.starting = time.isPoint || time.start.sameDay(actualDay);
        this.ending = time.isPoint || time.end.relative(-1).sameDay(actualDay);
    }
    Object.defineProperty(CalendarEvent.prototype, "scheduleId", {
        /**
         * The id of the schedule uniqe within the calendar which generated this event.
         */
        get: function () {
            return Math.floor(this.id / Constants.MAX_EVENTS_PER_DAY);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarEvent.prototype, "start", {
        /**
         * The start timestamp of the event.
         */
        get: function () {
            return this.time.start;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarEvent.prototype, "end", {
        /**
         * The end timestamp of the event.
         */
        get: function () {
            return this.time.end;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarEvent.prototype, "schedule", {
        /**
         * The schedule which generated this event.
         */
        get: function () {
            return this.event.schedule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarEvent.prototype, "data", {
        /**
         * The related event data.
         */
        get: function () {
            return this.event.data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarEvent.prototype, "identifier", {
        /**
         * An [[IdentifierInput]] for the start of this event.
         */
        get: function () {
            return this.identifierType.get(this.start);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarEvent.prototype, "identifierType", {
        /**
         * The [[Identifier]] for this event. Either [[Identifier.Day]] or
         * [[Identifier.Time]].
         */
        get: function () {
            return this.schedule.identifierType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarEvent.prototype, "startDelta", {
        /**
         * Returns a delta value between 0 and 1 which represents where the
         * [[CalendarEvent.start]] is relative to [[CalendarEvent.day]]. The delta
         * value would be less than 0 if the start of the event is before
         * [[CalendarEvent.day]].
         */
        get: function () {
            return this.time.startDelta(this.day);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarEvent.prototype, "endDelta", {
        /**
         * Returns a delta value between 0 and 1 which represents where the
         * [[CalendarEvent.end]] is relative to [[CalendarEvent.day]]. The delta value
         * would be greater than 1 if the end of the event is after
         * [[CalendarEvent.day]].
         */
        get: function () {
            return this.time.endDelta(this.day);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Calculates the bounds for this event if it were placed in a rectangle which
     * represents a day (24 hour period). By default the returned values are
     * between 0 and 1 and can be scaled by the proper rectangle dimensions or the
     * rectangle dimensions can be passed to this function.
     *
     * @param dayHeight The height of the rectangle of the day.
     * @param dayWidth The width of the rectangle of the day.
     * @param columnOffset The offset in the rectangle of the day to adjust this
     *    event by if it intersects or is contained in a previous event. This also
     *    reduces the width of the returned bounds to keep the bounds in the
     *    rectangle of the day.
     * @param clip `true` if the bounds should stay in the day rectangle, `false`
     *    and the bounds may go outside the rectangle of the day for multi-day
     *    events.
     * @param offsetX How much to translate the left & right properties by.
     * @param offsetY How much to translate the top & bottom properties by.
     * @returns The calculated bounds for this event.
     */
    CalendarEvent.prototype.getTimeBounds = function (dayHeight, dayWidth, columnOffset, clip, offsetX, offsetY) {
        if (dayHeight === void 0) { dayHeight = 1; }
        if (dayWidth === void 0) { dayWidth = 1; }
        if (columnOffset === void 0) { columnOffset = 0.1; }
        if (clip === void 0) { clip = true; }
        if (offsetX === void 0) { offsetX = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        return this.time.getBounds(this.day, dayHeight, dayWidth, this.col * columnOffset, clip, offsetX, offsetY);
    };
    /**
     * Changes the cancellation status of this event. By default this cancels
     * this event - but `false` may be passed to undo a cancellation.
     *
     * @param cancelled Whether the event should be cancelled.
     */
    CalendarEvent.prototype.cancel = function (cancelled) {
        if (cancelled === void 0) { cancelled = true; }
        this.schedule.setCancelled(this.start, cancelled);
        this.cancelled = cancelled;
        return this;
    };
    /**
     * Changes the exclusion status of this event. By default this excludes this
     * event - but `false`  may be passed to undo an exclusion.
     *
     * @param excluded Whether the event should be excluded.
     */
    CalendarEvent.prototype.exclude = function (excluded) {
        if (excluded === void 0) { excluded = true; }
        this.schedule.setExcluded(this.start, excluded);
        return this;
    };
    /**
     * Moves this event to potentially another day and time. A move is
     * accomplished by excluding the current event and adding an inclusion of the
     * new day & time. Any [[CalendarEvent.meta]] on this event will be moved to
     * the new event. If the schedule represents a single event
     * ([[Schedule.isSingleEvent]]) then the schedule frequencies are updated
     * to match the timestamp provided.
     *
     * @param toTime The timestamp to move this event to.
     * @returns Whether the event was moved to the given time.
     */
    CalendarEvent.prototype.move = function (toTime) {
        return this.schedule.move(toTime, this.start);
    };
    return CalendarEvent;
}());


// CONCATENATED MODULE: ./src/Calendar.ts











/**
 * A collection of [[CalendarDay]]s, the events on the calendar, and all
 * [[CalendarEvent]]s generated based on the events.
 *
 * @typeparam T The type of data stored in the [[Event]] class.
 * @typeparam M The type of metadata stored in the schedule.
 */
var Calendar_Calendar = (function () {
    /**
     * Creates a new calendar given a span, type, size, moving functions, and
     * optionally some default properties for the calendar.
     *
     * @param start The first day on the calendar.
     * @param end The last day on the calendar.
     * @param type The calendar type used for describing the calendar and splitting it.
     * @param size The number of calendar types in this calendar.
     * @param moveStart The function to move the start day.
     * @param moveEnd The function to move the end by.
     * @param input The default properties for this calendar.
     * @see [[Calendar.start]]
     * @see [[Calendar.end]]
     * @see [[Calendar.type]]
     * @see [[Calendar.size]]
     * @see [[Calendar.moveStart]]
     * @see [[Calendar.moveEnd]]
     */
    function Calendar(start, end, type, size, moveStart, moveEnd, input) {
        /**
         * If the calendar should be filled in so the first day of the calendar is
         * Sunday and the last day is Saturday.
         */
        this.fill = false;
        /**
         * The minimum number of days in the calendar no matter what the type or size
         * is. This can be used to display a month with a constant number of weeks -
         * because not all months contain the same number of weeks.
         */
        this.minimumSize = 0;
        /**
         * When `true` a [[CalendarEvent]] instance exists on each [[CalendarDay]]
         * the event covers even if the event didn't start on that day.
         */
        this.repeatCovers = true;
        /**
         * When `true` an event instance will be created for each time specified on
         * the schedule. If the schedule specifies an all day event then only one
         * event is added to a day. This is typically done when displaying days or
         * weeks and events can be displayed on a timeline.
         */
        this.listTimes = false;
        /**
         * When `true` events will be added to days "outside" the calendar. Days
         * outside the calendar are days filled in when [[Calendar.fill]] is `true`.
         * More specifically days that are in [[Calendar.filled]] and not in
         * [[Calendar.span]].
         */
        this.eventsOutside = false;
        /**
         * When `true` [[CalendarEvent.row]] will be set so when visually displaying
         * the event with others multi-day events will align and not overlap.
         */
        this.updateRows = false;
        /**
         * When `true` [[CalendarEvent.col]] will be set so when visually displaying
         * the event based on start and end time any events that overlap with each
         * other will be "indented" to see the event below it.
         */
        this.updateColumns = false;
        /**
         * The function (if any) which sorts the events on a calendar day.
         */
        this.eventSorter = null;
        /**
         * A function to use when parsing meta input into the desired type.
         *
         * @param input The input to parse.
         * @returns The meta parsed from the given input, if any.
         */
        this.parseMeta = (function (x) { return x; });
        /**
         * A function to use when parsing meta input into the desired type.
         *
         * @param input The input to parse.
         * @returns The meta parsed from the given input, if any.
         */
        this.parseData = (function (x) { return x; });
        /**
         * A selection of days on the calendar. If no days are selected this is `null`.
         * This is merely used to keep the selection flags in [[CalendarDay]] updated
         * via [[Calendar.refreshSelection]].
         */
        this.selection = null;
        /**
         * The array of days in this calendar and their events.
         */
        this.days = [];
        /**
         * The array of scheduled events added to the calendar.
         */
        this.events = [];
        /**
         * The array of visible events on the calendar. This is built based on the
         * span of the schedule in the given event and also the [[Event.visible]] flag.
         */
        this.visible = [];
        this.span = new DaySpan_DaySpan(start, end);
        this.filled = new DaySpan_DaySpan(start, end);
        this.type = type;
        this.size = size;
        this.moveStart = moveStart;
        this.moveEnd = moveEnd;
        if (Functions.isDefined(input)) {
            this.set(input);
        }
        else {
            this.refresh();
        }
    }
    /**
     * Changes the calendar possibly morphing it to a different type or size if
     * specified in the given input. If the type and size are not morphed then
     * the following properties may be updated:
     *
     * - [[Calendar.fill]]
     * - [[Calendar.minimumSize]]
     * - [[Calendar.repeatCovers]]
     * - [[Calendar.listTimes]]
     * - [[Calendar.eventsOutside]]
     * - [[Calendar.updateRows]]
     * - [[Calendar.updateColumns]]
     * - [[Calendar.eventSorter]]
     * - [[Calendar.events]]
     * - [[Calendar.parseData]]
     * - [[Calendar.parseMeta]]
     *
     * If [[CalendarInput.delayRefresh]] is not given with `true` then
     * [[Calendar.refresh]] will be called once the calendar properties have been
     * updated.
     *
     * @param input The new properties for this calendar to overwrite with.
     */
    Calendar.prototype.set = function (input) {
        var typeChange = Functions.isDefined(input.type) && input.type !== this.type;
        var sizeChange = Functions.isDefined(input.size) && input.size !== this.size;
        if (typeChange || sizeChange) {
            var focus_1 = Functions.coalesce(input.otherwiseFocus, 0.4999);
            var prefer = Functions.coalesce(input.preferToday, true);
            var size = Functions.coalesce(input.size, this.size);
            var type = Functions.coalesce(input.type, this.type);
            var around = Functions.coalesce(input.around, this.days[Math.floor((this.days.length - 1) * focus_1)]);
            var today = Day_Day.today();
            if (!around || (prefer && this.span.matchesDay(today))) {
                around = today;
            }
            var meta = Calendar.TYPES[type];
            var start = meta.getStart(Day_Day.parse(around), size, focus_1);
            var end = meta.getEnd(start, size, focus_1);
            this.span.start = start;
            this.span.end = end;
            this.type = type;
            this.size = size;
            this.moveStart = meta.moveStart;
            this.moveEnd = meta.moveEnd;
        }
        else if (input.around) {
            var focus_2 = Functions.coalesce(input.otherwiseFocus, 0.4999);
            var around = Day_Day.parse(input.around);
            var type = this.type;
            var size = this.size;
            var meta = Calendar.TYPES[type];
            var start = meta.getStart(around, size, focus_2);
            var end = meta.getEnd(start, size, focus_2);
            this.span.start = start;
            this.span.end = end;
        }
        this.fill = Functions.coalesce(input.fill, this.fill);
        this.minimumSize = Functions.coalesce(input.minimumSize, this.minimumSize);
        this.repeatCovers = Functions.coalesce(input.repeatCovers, this.repeatCovers);
        this.listTimes = Functions.coalesce(input.listTimes, this.listTimes);
        this.eventsOutside = Functions.coalesce(input.eventsOutside, this.eventsOutside);
        this.updateRows = Functions.coalesce(input.updateRows, this.updateRows);
        this.updateColumns = Functions.coalesce(input.updateColumns, this.updateColumns);
        this.eventSorter = Functions.coalesce(input.eventSorter, this.eventSorter);
        this.parseMeta = Functions.coalesce(input.parseMeta, this.parseMeta);
        this.parseData = Functions.coalesce(input.parseData, this.parseData);
        if (Functions.isArray(input.events)) {
            this.setEvents(input.events, true);
        }
        if (!input.delayRefresh) {
            this.refresh();
        }
        return this;
    };
    /**
     * Sets the [[Calendar.minimumSize]] value and returns `this` for method
     * chaining.
     *
     * @param minimumSize The new value.
     */
    Calendar.prototype.withMinimumSize = function (minimumSize) {
        this.minimumSize = minimumSize;
        this.refresh();
        return this;
    };
    /**
     * Sets the [[Calendar.repeatCovers]] value and returns `this` for method
     * chaining.
     *
     * @param repeatCovers The new value.
     */
    Calendar.prototype.withRepeatCovers = function (repeatCovers) {
        this.repeatCovers = repeatCovers;
        this.refreshEvents();
        return this;
    };
    /**
     * Sets the [[Calendar.listTimes]] value and returns `this` for method
     * chaining.
     *
     * @param listTimes The new value.
     */
    Calendar.prototype.withListTimes = function (listTimes) {
        this.listTimes = listTimes;
        this.refreshEvents();
        return this;
    };
    /**
     * Sets the [[Calendar.eventsOutside]] value and returns `this` for method
     * chaining.
     *
     * @param eventsOutside The new value.
     */
    Calendar.prototype.withEventsOutside = function (eventsOutside) {
        this.eventsOutside = eventsOutside;
        this.refreshEvents();
        return this;
    };
    /**
     * Sets the [[Calendar.updateRows]] value and returns `this` for method
     * chaining.
     *
     * @param updateRows The new value.
     * @param refresh If the rows should be updated now if `updateRows` is `true`.
     */
    Calendar.prototype.withUpdateRows = function (updateRows, refresh) {
        if (refresh === void 0) { refresh = true; }
        this.updateRows = updateRows;
        if (refresh && updateRows) {
            this.refreshRows();
        }
        return this;
    };
    /**
     * Sets the [[Calendar.updateColumns]] value and returns `this` for method
     * chaining.
     *
     * @param updateColumns The new value.
     * @param refresh If the columns should be updated now if `updateColumns` is
     *    `true`.
     */
    Calendar.prototype.withUpdateColumns = function (updateColumns, refresh) {
        if (refresh === void 0) { refresh = true; }
        this.updateColumns = updateColumns;
        if (refresh && updateColumns) {
            this.refreshColumns();
        }
        return this;
    };
    Object.defineProperty(Calendar.prototype, "start", {
        /**
         * Returns the start day of the calendar. If this calendar is filled, this
         * may not represent the very first day in the calendar.
         */
        get: function () {
            return this.span.start;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "end", {
        /**
         * Returns the end day of the calendar. If this calendar is filled, this
         * may not represent the very last day in the calendar.
         */
        get: function () {
            return this.span.end;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns the summary of the span of time this calendar represents.
     *
     * @param dayOfWeek [[DaySpan.summary]]
     * @param short [[DaySpan.summary]]
     * @param repeat [[DaySpan.summary]]
     * @param contextual [[DaySpan.summary]]
     * @param delimiter [[DaySpan.summary]]
     * @see [[DaySpan.summary]]
     */
    Calendar.prototype.summary = function (dayOfWeek, short, repeat, contextual, delimiter) {
        if (dayOfWeek === void 0) { dayOfWeek = true; }
        if (short === void 0) { short = false; }
        if (repeat === void 0) { repeat = false; }
        if (contextual === void 0) { contextual = true; }
        if (delimiter === void 0) { delimiter = ' - '; }
        return this.span.summary(this.type, dayOfWeek, short, repeat, contextual, delimiter);
    };
    /**
     * Splits up this calendar into an iterable collection of calendars. The
     * resulting iterator will return `size / by` number of calendars.
     *
     * @param by The new size of the resulting calendars. If the the size of the
     *    current calendar is not divisible by this value the resulting calendars
     *    may cover more or less than this calendar covers.
     * @returns An iterator for the calendars produced.
     */
    Calendar.prototype.split = function (by) {
        var _this = this;
        if (by === void 0) { by = 1; }
        return new Iterator_Iterator(function (iterator) {
            var start = _this.start;
            var end = _this.moveEnd(_this.end, by - _this.size);
            for (var i = 0; i < _this.size; i++) {
                var calendar = new Calendar(start, end, _this.type, by, _this.moveStart, _this.moveEnd, _this);
                if (iterator.act(calendar) === IteratorAction.Stop) {
                    return;
                }
                start = _this.moveStart(start, by);
                end = _this.moveEnd(end, by);
            }
        });
    };
    /**
     * Refreshes the days and events in this calendar based on the start and end
     * days, the calendar properties, and its eventss.
     *
     * @param today The current day to update the calendar days via
     *    [[CalendarDay.updateCurrent]].
     */
    Calendar.prototype.refresh = function (today) {
        if (today === void 0) { today = Day_Day.today(); }
        this.length = this.span.days(Op.UP, true);
        this.resetDays();
        this.refreshCurrent(today);
        this.refreshSelection();
        this.refreshVisible();
        this.refreshEvents();
        return this;
    };
    /**
     * Updates the [[Calendar.filled]] span based on [[Calendar.start]],
     * [[Calendar.end]], and [[Calendar.fill]] properties.
     */
    Calendar.prototype.resetFilled = function () {
        this.filled.start = this.fill ? this.start.startOfWeek() : this.start;
        this.filled.end = this.fill ? this.end.endOfWeek() : this.end;
        return this;
    };
    /**
     * Updates [[Calendar.days]] to match the span of days in the calendar.
     */
    Calendar.prototype.resetDays = function () {
        this.resetFilled();
        var days = this.days;
        var filled = this.filled;
        var current = filled.start;
        var daysBetween = filled.days(Op.UP);
        var total = Math.max(this.minimumSize, daysBetween);
        for (var i = 0; i < total; i++) {
            var day = days[i];
            if (!day || !day.sameDay(current)) {
                day = new CalendarDay_CalendarDay(current.date);
                if (i < days.length) {
                    days.splice(i, 1, day);
                }
                else {
                    days.push(day);
                }
            }
            day.inCalendar = this.span.contains(day);
            current = current.next();
        }
        if (days.length > total) {
            days.splice(total, days.length - total);
        }
        return this;
    };
    /**
     * Updates the list of visible schedules.
     */
    Calendar.prototype.refreshVisible = function () {
        var start = this.filled.start;
        var end = this.filled.end;
        this.visible = this.events.filter(function (e) {
            return e.visible && e.schedule.matchesRange(start, end);
        });
        return this;
    };
    /**
     * Updates the days with the current day via [[CalendarDay.updateCurrent]].
     *
     * @param today The new current day.
     */
    Calendar.prototype.refreshCurrent = function (today) {
        if (today === void 0) { today = Day_Day.today(); }
        this.iterateDays().iterate(function (d) {
            d.updateCurrent(today);
        });
        return this;
    };
    /**
     * Updates the selection flags in [[CalendarDay]] based on the
     * [[Calendar.selection]] property.
     */
    Calendar.prototype.refreshSelection = function () {
        var _this = this;
        this.iterateDays().iterate(function (d) {
            if (_this.selection) {
                d.updateSelected(_this.selection);
            }
            else {
                d.clearSelected();
            }
        });
        return this;
    };
    /**
     * Updates the [[CalendarDay.events]] based on the events in this calendar
     * and the following properties:
     *
     * - [[Calendar.eventsForDay]]
     * - [[Calendar.eventsOutside]]
     * - [[Calendar.listTimes]]
     * - [[Calendar.repeatCovers]]
     * - [[Calendar.updateRows]]
     * - [[Calendar.updateColumns]]
     */
    Calendar.prototype.refreshEvents = function () {
        var _this = this;
        this.iterateDays().iterate(function (d) {
            if (d.inCalendar || _this.eventsOutside) {
                d.events = _this.eventsForDay(d, _this.listTimes, _this.repeatCovers);
            }
        });
        if (this.updateRows) {
            this.refreshRows();
        }
        if (this.updateColumns) {
            this.refreshColumns();
        }
        return this;
    };
    /**
     * Refreshes the [[CalendarEvent.row]] property as described in the link.
     */
    Calendar.prototype.refreshRows = function () {
        var eventToRow = {};
        var onlyFullDay = this.listTimes;
        this.iterateDays().iterate(function (d) {
            if (d.dayOfWeek === 0) {
                eventToRow = {};
            }
            var used = {};
            for (var _i = 0, _a = d.events; _i < _a.length; _i++) {
                var event_1 = _a[_i];
                if (onlyFullDay && !event_1.fullDay) {
                    continue;
                }
                if (event_1.id in eventToRow) {
                    used[event_1.row = eventToRow[event_1.id]] = true;
                }
            }
            var rowIndex = 0;
            for (var _b = 0, _c = d.events; _b < _c.length; _b++) {
                var event_2 = _c[_b];
                if ((onlyFullDay && !event_2.fullDay) || event_2.id in eventToRow) {
                    continue;
                }
                while (used[rowIndex]) {
                    rowIndex++;
                }
                eventToRow[event_2.id] = event_2.row = rowIndex;
                rowIndex++;
            }
        });
        return this;
    };
    /**
     * Refreshes the [[CalendarEvent.col]] property as described in the link.
     */
    Calendar.prototype.refreshColumns = function () {
        this.iterateDays().iterate(function (d) {
            var markers = [];
            for (var _i = 0, _a = d.events; _i < _a.length; _i++) {
                var event_3 = _a[_i];
                if (!event_3.fullDay) {
                    markers.push({
                        time: event_3.time.start.time,
                        event: event_3,
                        start: true,
                        parent: null
                    });
                    markers.push({
                        time: event_3.time.end.time - 1,
                        event: event_3,
                        start: false,
                        parent: null
                    });
                }
            }
            markers.sort(function (a, b) {
                return a.time - b.time;
            });
            var parent = null;
            for (var _b = 0, markers_1 = markers; _b < markers_1.length; _b++) {
                var marker = markers_1[_b];
                if (marker.start) {
                    marker.parent = parent;
                    parent = marker;
                }
                else if (parent) {
                    parent = parent.parent;
                }
            }
            for (var _c = 0, markers_2 = markers; _c < markers_2.length; _c++) {
                var marker = markers_2[_c];
                if (marker.start) {
                    marker.event.col = marker.parent ? marker.parent.event.col + 1 : 0;
                }
            }
        });
        return this;
    };
    /**
     * Gets the calendar day for the given day.
     *
     * @param input The day to get the calendar day for.
     * @returns The reference to the calendar day, or null if the given input
     *    is not on this calendar.
     */
    Calendar.prototype.getDay = function (input) {
        var parsed = Day_Day.parse(input);
        if (parsed) {
            var dayCount = parsed.start().daysBetween(this.days[0], Op.DOWN, false);
            return this.days[dayCount];
        }
        return null;
    };
    /**
     * Iterates over all days in this calendar and passes each day to `iterator`.
     *
     * @param iterator The function to pass [[CalendarDay]]s to.
     */
    Calendar.prototype.iterateDays = function () {
        var _this = this;
        return new Iterator_Iterator(function (iterator) {
            var days = _this.days;
            for (var i = 0; i < days.length; i++) {
                switch (iterator.act(days[i])) {
                    case IteratorAction.Stop:
                        return;
                }
            }
        });
    };
    /**
     * Returns the events for the given day optionally looking at schedule times,
     * optionally looking at events which cover multiple days, and optionally
     * sorted with the given function.
     *
     * @param day The day to find events for.
     * @param getTimes When `true` an event is added to the result for each time
     *    specified in the schedule.
     * @param covers When `true` events which don't start on the given day but do
     *    overlap are added to the result.
     * @param sorter The function to sort the events by, if any.
     * @returns An array of events that occurred on the given day.
     */
    Calendar.prototype.eventsForDay = function (day, getTimes, covers, sorter) {
        if (getTimes === void 0) { getTimes = true; }
        if (covers === void 0) { covers = true; }
        if (sorter === void 0) { sorter = this.eventSorter; }
        var events = [];
        var entries = this.visible;
        var _loop_1 = function (entryIndex) {
            var entry = entries[entryIndex];
            var schedule = entry.schedule;
            var eventId = entryIndex * Constants.MAX_EVENTS_PER_DAY;
            var timeIndex = 0;
            schedule.iterateSpans(day, covers).iterate(function (span, iterator) {
                events.push(new CalendarEvent_CalendarEvent(eventId + timeIndex++, entry, span, day));
                if (!getTimes) {
                    iterator.stop();
                }
            });
        };
        for (var entryIndex = 0; entryIndex < entries.length; entryIndex++) {
            _loop_1(entryIndex);
        }
        if (sorter) {
            events.sort(sorter);
        }
        return events;
    };
    /**
     * Finds the event given one of the ways to identify the event.
     *
     * @param input The value to use to search for an event.
     * @returns The refrence to the event or null if not found.
     */
    Calendar.prototype.findEvent = function (id) {
        for (var _i = 0, _a = this.events; _i < _a.length; _i++) {
            var event_4 = _a[_i];
            if (event_4 === id || event_4.schedule === id || event_4.data === id || event_4.id === id) {
                return event_4;
            }
        }
        return null;
    };
    /**
     * Removes the list of events if they exist in the calendar.
     *
     * @param events The array of events to remove if they exist. If no
     *    events are passed (via `null`) then all events will be removed
     *    from the calendar.
     * @param delayRefresh When `true` the [[Calendar.refreshEvents]] will not be
     *    called after the events are removed.
     * @see [[Calendar.removeEvent]]
     * @see [[Calendar.refreshEvents]]
     */
    Calendar.prototype.removeEvents = function (events, delayRefresh) {
        if (events === void 0) { events = null; }
        if (delayRefresh === void 0) { delayRefresh = false; }
        if (events) {
            for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
                var event_5 = events_1[_i];
                this.removeEvent(event_5, true);
            }
        }
        else {
            this.events = [];
        }
        this.refreshVisible();
        if (!delayRefresh) {
            this.refreshEvents();
        }
        return this;
    };
    /**
     * Removes the given event if it exists on the calendar.
     *
     * @param event The event to remove if it exists.
     * @param delayRefresh When `true` the [[Calendar.refreshEvents]] will not be
     *    called after the event is removed.
     * @see [[Calendar.refreshEvents]]
     */
    Calendar.prototype.removeEvent = function (event, delayRefresh) {
        if (delayRefresh === void 0) { delayRefresh = false; }
        var found = this.findEvent(event);
        if (found) {
            this.events.splice(this.events.indexOf(found), 1);
            this.refreshVisible();
            if (!delayRefresh) {
                this.refreshEvents();
            }
        }
        return this;
    };
    /**
     * Adds the given event to this calendar if it doesn't exist already (or
     * `allowDuplicates` is `true`).
     *
     * @param event The event to add to the calendar.
     * @param allowDuplicates If an event can be added more than once.
     * @param delayRefresh When `true` the [[Calendar.refreshEvents]] will not be
     *    called after the event is added.
     * @see [[Calendar.refreshEvents]]
     */
    Calendar.prototype.addEvent = function (event, allowDuplicates, delayRefresh) {
        if (allowDuplicates === void 0) { allowDuplicates = false; }
        if (delayRefresh === void 0) { delayRefresh = false; }
        var parsed = Parse_Parse.event(event, this.parseData, this.parseMeta);
        if (!allowDuplicates) {
            var existing = this.findEvent(parsed);
            if (existing) {
                return this;
            }
        }
        this.events.push(parsed);
        this.refreshVisible();
        if (!delayRefresh) {
            this.refreshEvents();
        }
        return this;
    };
    /**
     * Adds the given events to this calendar if they don't exist already (or
     * `allowDuplicates` is `true`).
     *
     * @param events The events to add to the calendar.
     * @param allowDuplicates If an event can be added more than once.
     * @param delayRefresh When `true` the [[Calendar.refreshEvents]] will not be
     *    called after the events are added.
     * @see [[Calendar.refreshEvents]]
     */
    Calendar.prototype.addEvents = function (events, allowDuplicates, delayRefresh) {
        if (allowDuplicates === void 0) { allowDuplicates = false; }
        if (delayRefresh === void 0) { delayRefresh = false; }
        for (var _i = 0, events_2 = events; _i < events_2.length; _i++) {
            var event_6 = events_2[_i];
            this.addEvent(event_6, allowDuplicates, true);
        }
        if (!delayRefresh) {
            this.refreshEvents();
        }
        return this;
    };
    /**
     * Sets the given events to this calendar replacing the current list of
     * events.
     *
     * @param events The events to set to the calendar.
     * @param delayRefresh When `true` the [[Calendar.refreshEvents]] will not be
     *    called after the events are added.
     * @see [[Calendar.refreshEvents]]
     */
    Calendar.prototype.setEvents = function (events, delayRefresh) {
        if (delayRefresh === void 0) { delayRefresh = false; }
        var parsedEvents = [];
        for (var i = 0; i < events.length; i++) {
            var parsed = Parse_Parse.event(events[i], this.parseData, this.parseMeta);
            if (parsed) {
                parsedEvents.push(parsed);
            }
        }
        this.events = parsedEvents;
        this.refreshVisible();
        if (!delayRefresh) {
            this.refreshEvents();
        }
        return this;
    };
    /**
     * Sets the selection point or range of the calendar and updates the flags
     * in the days.
     *
     * @param start The start of the selection.
     * @param end The end of the selection.
     * @see [[Calendar.refreshSelection]]
     */
    Calendar.prototype.select = function (start, end) {
        if (end === void 0) { end = start; }
        this.selection = new DaySpan_DaySpan(start, end);
        this.refreshSelection();
        return this;
    };
    /**
     * Sets the selection of the calendar to nothing.
     *
     * @see [[Calendar.refreshSelection]]
     */
    Calendar.prototype.unselect = function () {
        this.selection = null;
        this.refreshSelection();
        return this;
    };
    /**
     * Shifts the calendar days by the given amount.
     *
     * @param jump The amount to shift the calendar by.
     * @param delayRefresh When `true` [[Calendar.refresh]] will not be called
     *    after calendar is moved.
     */
    Calendar.prototype.move = function (jump, delayRefresh) {
        if (jump === void 0) { jump = this.size; }
        if (delayRefresh === void 0) { delayRefresh = false; }
        this.span.start = this.moveStart(this.start, jump);
        this.span.end = this.moveEnd(this.end, jump);
        if (!delayRefresh) {
            this.refresh();
        }
        return this;
    };
    /**
     * Moves the calenndar to the next set of days.
     *
     * @param jump The amount to shift the calendar by.
     * @param delayRefresh When `true` [[Calendar.refresh]] will not be called
     *    after calendar is moved.
     */
    Calendar.prototype.next = function (jump, delayRefresh) {
        if (jump === void 0) { jump = this.size; }
        if (delayRefresh === void 0) { delayRefresh = false; }
        return this.move(jump, delayRefresh);
    };
    /**
     * Moves the calenndar to the previous set of days.
     *
     * @param jump The amount to shift the calendar by.
     * @param delayRefresh When `true` [[Calendar.refresh]] will not be called
     *    after calendar is moved.
     */
    Calendar.prototype.prev = function (jump, delayRefresh) {
        if (jump === void 0) { jump = this.size; }
        if (delayRefresh === void 0) { delayRefresh = false; }
        return this.move(-jump, delayRefresh);
    };
    /**
     * Converts this calendar to input which can be used to later recreate this
     * calendar. The only properties of the calendar which will be loss is the
     * [[Calendar.eventSorter]] property because it is a function.
     *
     * @param plain If the returned input should be plain objects as opposed
     *    to [[Day]] and [[Event]] instances.
     * @param plainData A function to convert [[Event.data]] to a plain object if
     *    it is not already.
     * @param plainMeta A function to convert values in [[Schedule.meta]] to plain
     *    objects if they are not alreday.
     * @returns The input generated from this calendar.
     */
    Calendar.prototype.toInput = function (plain, plainData, plainMeta) {
        if (plain === void 0) { plain = false; }
        if (plainData === void 0) { plainData = function (d) { return d; }; }
        if (plainMeta === void 0) { plainMeta = function (m) { return m; }; }
        var out = {};
        out.type = this.type;
        out.size = this.size;
        out.fill = this.fill;
        out.minimumSize = this.minimumSize;
        out.repeatCovers = this.repeatCovers;
        out.listTimes = this.listTimes;
        out.eventsOutside = this.eventsOutside;
        out.updateRows = this.updateRows;
        out.updateColumns = this.updateColumns;
        out.around = plain ? this.span.start.time : this.span.start;
        out.events = [];
        for (var _i = 0, _a = this.events; _i < _a.length; _i++) {
            var event_7 = _a[_i];
            if (plain) {
                var plainEvent = {};
                if (Functions.isDefined(event_7.id)) {
                    plainEvent.id = event_7.id;
                }
                if (Functions.isDefined(event_7.data)) {
                    plainEvent.data = plainData(event_7.data);
                }
                if (!event_7.visible) {
                    plainEvent.visible = event_7.visible;
                }
                plainEvent.schedule = event_7.schedule.toInput();
                var meta = plainEvent.schedule.meta;
                if (meta) {
                    for (var identifier in meta) {
                        meta[identifier] = plainMeta(meta[identifier]);
                    }
                }
                out.events.push(plainEvent);
            }
            else {
                out.events.push(event_7);
            }
        }
        return out;
    };
    /**
     * Creates a calendar based on the given input.
     *
     * @param input The input which has at least the `type` specified.
     * @returns A new calendar instance.
     */
    Calendar.fromInput = function (input) {
        var initial = Day_Day.today();
        return new Calendar(initial, initial, null, 1, null, null, input);
    };
    /**
     * Creates a calendar based around a given unit optionally focused around a
     * given day.
     *
     * @param type The unit of the calendar.
     * @param days The number of units in the calendar.
     * @param around The day to focus the calendar on.
     * @param focus The value which describes how months are added around the given
     *    day. The default value will center the calendar around the given day.
     *    When the value is `0` the given day is the first day in the calendar,
     *    and when the value is `1` the given day is the last day in the calendar.
     * @param input The default properties for the calendar.
     * @returns A new calendar instance.
     */
    Calendar.forType = function (type, size, around, focus, input) {
        if (size === void 0) { size = 1; }
        if (around === void 0) { around = Day_Day.today(); }
        if (focus === void 0) { focus = 0.49999; }
        var meta = this.TYPES[type];
        var start = meta.getStart(around, size, focus);
        var end = meta.getEnd(start, size, focus);
        return new Calendar(start, end, type, size, meta.moveStart, meta.moveEnd, input || meta.defaultInput);
    };
    /**
     * Creates a calendar based around days optionally focused around a given day.
     *
     * @param days The number of days in the calendar.
     * @param around The day to focus the calendar on.
     * @param focus The value which describes how days are added around the given
     *    day. The default value will center the calendar around the given day.
     *    When the value is `0` the given day is the first day in the calendar,
     *    and when the value is `1` the given day is the last day in the calendar.
     * @param input The default properties for the calendar.
     * @returns A new calendar instance.
     * @see [[Calendar.forType]]
     */
    Calendar.days = function (days, around, focus, input) {
        if (days === void 0) { days = 1; }
        if (around === void 0) { around = Day_Day.today(); }
        if (focus === void 0) { focus = 0.4999; }
        return this.forType(Units.DAY, days, around, focus, input);
    };
    /**
     * Creates a calendar based around weeks optionally focused around a given day.
     *
     * @param days The number of weeks in the calendar.
     * @param around The day to focus the calendar on.
     * @param focus The value which describes how weeks are added around the given
     *    day. The default value will center the calendar around the given day.
     *    When the value is `0` the given day is the first day in the calendar,
     *    and when the value is `1` the given day is the last day in the calendar.
     * @param input The default properties for the calendar.
     * @returns A new calendar instance.
     * @see [[Calendar.forType]]
     */
    Calendar.weeks = function (weeks, around, focus, input) {
        if (weeks === void 0) { weeks = 1; }
        if (around === void 0) { around = Day_Day.today(); }
        if (focus === void 0) { focus = 0.4999; }
        return this.forType(Units.WEEK, weeks, around, focus, input);
    };
    /**
     * Creates a calendar based around months optionally focused around a given day.
     *
     * @param days The number of months in the calendar.
     * @param around The day to focus the calendar on.
     * @param focus The value which describes how months are added around the given
     *    day. The default value will center the calendar around the given day.
     *    When the value is `0` the given day is the first day in the calendar,
     *    and when the value is `1` the given day is the last day in the calendar.
     * @param input The default properties for the calendar.
     * @returns A new calendar instance.
     * @see [[Calendar.forType]]
     */
    Calendar.months = function (months, around, focus, input) {
        if (months === void 0) { months = 1; }
        if (around === void 0) { around = Day_Day.today(); }
        if (focus === void 0) { focus = 0.4999; }
        return this.forType(Units.MONTH, months, around, focus, input);
    };
    /**
     * Creates a calendar based around years optionally focused around a given day.
     *
     * @param days The number of years in the calendar.
     * @param around The day to focus the calendar on.
     * @param focus The value which describes how years are added around the given
     *    day. The default value will center the calendar around the given day.
     *    When the value is `0` the given day is the first day in the calendar,
     *    and when the value is `1` the given day is the last day in the calendar.
     * @param input The default properties for the calendar.
     * @returns A new calendar instance.
     * @see [[Calendar.forType]]
     */
    Calendar.years = function (years, around, focus, input) {
        if (years === void 0) { years = 1; }
        if (around === void 0) { around = Day_Day.today(); }
        if (focus === void 0) { focus = 0.4999; }
        return this.forType(Units.YEAR, years, around, focus, input);
    };
    /**
     * A map of functions and properties by [[Units]] used to create or morph
     * Calendars.
     */
    Calendar.TYPES = (Calendar__a = {},
        Calendar__a[Units.DAY] = {
            getStart: function (around, size, focus) {
                return around.start().relativeDays(-Math.floor(size * focus));
            },
            getEnd: function (start, size, focus) {
                return start.relativeDays(size - 1).end();
            },
            moveStart: function (day, amount) {
                return day.relativeDays(amount);
            },
            moveEnd: function (day, amount) {
                return day.relativeDays(amount);
            },
            defaultInput: undefined
        },
        Calendar__a[Units.WEEK] = {
            getStart: function (around, size, focus) {
                return around.start().startOfWeek().relativeWeeks(-Math.floor(size * focus));
            },
            getEnd: function (start, size, focus) {
                return start.relativeWeeks(size - 1).endOfWeek();
            },
            moveStart: function (day, amount) {
                return day.relativeWeeks(amount);
            },
            moveEnd: function (day, amount) {
                return day.relativeWeeks(amount);
            },
            defaultInput: undefined
        },
        Calendar__a[Units.MONTH] = {
            getStart: function (around, size, focus) {
                return around.start().startOfMonth().relativeMonths(-Math.floor(size * focus));
            },
            getEnd: function (start, size, focus) {
                return start.relativeMonths(size - 1).endOfMonth();
            },
            moveStart: function (day, amount) {
                return day.relativeMonths(amount);
            },
            moveEnd: function (day, amount) {
                return day.startOfMonth().relativeMonths(amount).endOfMonth();
            },
            defaultInput: { fill: true }
        },
        Calendar__a[Units.YEAR] = {
            getStart: function (around, size, focus) {
                return around.start().startOfYear().relativeYears(-Math.floor(size * focus));
            },
            getEnd: function (start, size, focus) {
                return start.relativeYears(size - 1).endOfYear();
            },
            moveStart: function (day, amount) {
                return day.relativeYears(amount);
            },
            moveEnd: function (day, amount) {
                return day.relativeYears(amount);
            },
            defaultInput: { fill: true }
        },
        Calendar__a);
    return Calendar;
}());

var Calendar__a;

// CONCATENATED MODULE: ./src/Month.ts

/**
 * The months in a year.
 */
var Month = (function () {
    function Month() {
    }
    Month.JANUARY = 0;
    Month.FEBRUARY = 1;
    Month.MARCH = 2;
    Month.APRIL = 3;
    Month.MAY = 4;
    Month.JUNE = 5;
    Month.JULY = 6;
    Month.AUGUST = 7;
    Month.SEPTEMBER = 8;
    Month.OCTOBER = 9;
    Month.NOVEMBER = 10;
    Month.DECEMBER = 11;
    /**
     * The full list of months in a year.
     */
    Month.LIST = [
        Month.JANUARY,
        Month.FEBRUARY,
        Month.MARCH,
        Month.APRIL,
        Month.MAY,
        Month.JUNE,
        Month.JULY,
        Month.AUGUST,
        Month.SEPTEMBER,
        Month.OCTOBER,
        Month.NOVEMBER,
        Month.DECEMBER
    ];
    return Month;
}());


// CONCATENATED MODULE: ./src/Weekday.ts

/**
 * The days in a week.
 */
var Weekday = (function () {
    function Weekday() {
    }
    Weekday.SUNDAY = 0;
    Weekday.MONDAY = 1;
    Weekday.TUESDAY = 2;
    Weekday.WEDNESDAY = 3;
    Weekday.THURSDAY = 4;
    Weekday.FRIDAY = 5;
    Weekday.SATURDAY = 6;
    /**
     * The full list of days in a week.
     */
    Weekday.LIST = [
        Weekday.SUNDAY,
        Weekday.MONDAY,
        Weekday.TUESDAY,
        Weekday.WEDNESDAY,
        Weekday.THURSDAY,
        Weekday.FRIDAY,
        Weekday.SATURDAY
    ];
    /**
     * The list of days starting with Monday and ending on Friday.
     */
    Weekday.WEEK = [
        Weekday.MONDAY,
        Weekday.TUESDAY,
        Weekday.WEDNESDAY,
        Weekday.THURSDAY,
        Weekday.FRIDAY
    ];
    /**
     * The days on the weekend, starting with Saturday and ending with Sunday.
     */
    Weekday.ENDS = [
        Weekday.SATURDAY,
        Weekday.SUNDAY
    ];
    return Weekday;
}());


// CONCATENATED MODULE: ./src/Pattern.ts





/**
 * A class which helps describe [[ScheduleInput]] if it matches a pattern.
 */
var Pattern_Pattern = (function () {
    /**
     * Creates a new pattern.
     *
     * @param name The unique name of the pattern.
     * @param listed If the pattern is "listed" [[Pattern.listed]].
     * @param describe A function to describe the pattern given a [[Day]].
     * @param rules The rules which describe how to detect and apply the pattern
     *    to schedule input.
     */
    function Pattern(name, listed, describe, rules) {
        this.name = name;
        this.listed = listed;
        this.describe = describe;
        this.rules = rules;
    }
    /**
     * Applies this pattern to a [[Schedule]] or [[ScheduleInput]] removing and
     * adding any necessary properties from the input to match this pattern -
     * based around the day provided.
     *
     * @param schedule The schedule to update to match this pattern.
     * @param day The day to base the schedule on.
     * @returns The reference to the input passed in.
     */
    Pattern.prototype.apply = function (schedule, day) {
        if (schedule instanceof Schedule_Schedule) {
            this.applyGeneric(day, function (prop, frequency) { return schedule.setFrequency(prop, frequency); }, function (prop) { return schedule.setFrequency(prop); });
            schedule.updateChecks();
        }
        else {
            this.applyGeneric(day, function (prop, frequency) { return schedule[prop] = frequency; }, function (prop) { return delete schedule[prop]; });
        }
        return schedule;
    };
    /**
     * Applies this pattern to any object provided they implement the
     * `setFrequency` and `removeFrequency` functions.
     *
     * @param day The day to base the schedule on.
     * @param setFrequency The function which sets the frequency on the object.
     * @param removeFrequency The function to remove a frequency from the object.
     */
    Pattern.prototype.applyGeneric = function (day, setFrequency, removeFrequency) {
        for (var _i = 0, _a = Pattern.PROPS; _i < _a.length; _i++) {
            var prop = _a[_i];
            var rule = this.rules[prop];
            // Should have one value
            if (rule === 1) {
                setFrequency(prop, [day[prop]]);
            }
            // Can be any of the values in the array
            if (Functions.isArray(rule)) {
                setFrequency(prop, rule);
            }
            // Must not be present
            if (!Functions.isDefined(rule)) {
                removeFrequency(prop);
            }
        }
    };
    /**
     * Determines whether the given [[Schedule]] or [[ScheduleInput]] matches this
     * pattern. Optionally a day can be provided to make sure the day matches the
     * schedule and pattern together.
     *
     * @param schedule The schedule input to test.
     * @param exactlyWith A day to further validate against for matching.
     * @returns `true` if the schedule was a match to this pattern with the
     *    day if one was provided, otherwise `false`.
     */
    Pattern.prototype.isMatch = function (schedule, exactlyWith) {
        if (schedule instanceof Schedule_Schedule) {
            return this.isMatchGeneric(function (prop) { return schedule[prop].input; }, exactlyWith);
        }
        else {
            return this.isMatchGeneric(function (prop) { return schedule[prop]; }, exactlyWith);
        }
    };
    /**
     * Determines whether the given input matches this pattern. Optionally a day
     * can be provided to make sure the day matches the schedule and pattern
     * together.
     *
     * @param input The schedule input to test.
     * @param exactlyWith A day to further validate against for matching.
     * @returns `true` if the schedule input was a match to this pattern with the
     *    day if one was provided, otherwise `false`.
     */
    Pattern.prototype.isMatchGeneric = function (getFrequency, exactlyWith) {
        var exactly = Functions.isDefined(exactlyWith);
        for (var _i = 0, _a = Pattern.PROPS; _i < _a.length; _i++) {
            var prop = _a[_i];
            var rule = this.rules[prop];
            var curr = getFrequency(prop);
            // Optional, skip it
            if (rule === false) {
                continue;
            }
            // Requires any value
            if (rule === true && !curr) {
                return false;
            }
            // Must not be present
            if (!Functions.isDefined(rule) && curr) {
                return false;
            }
            // Must be an array of the same size
            if (Functions.isNumber(rule)) {
                if (Functions.isArray(curr) && curr.length === rule) {
                    if (exactly && curr.indexOf(exactlyWith[prop]) === -1) {
                        return false;
                    }
                }
                else {
                    return false;
                }
            }
            // Must be an array of the same values
            if (Functions.isArray(rule)) {
                if (!Functions.isArray(curr)) {
                    return false;
                }
                if (rule.length !== curr.length) {
                    return false;
                }
                for (var i = 0; i < rule.length; i++) {
                    if (rule[i] !== curr[i]) {
                        return false;
                    }
                }
                if (exactly && rule.indexOf(exactlyWith[prop]) === -1) {
                    return false;
                }
            }
            // Must be an object with same over & offset.
            if (Functions.isObject(rule)) {
                if (!Functions.isObject(curr)) {
                    return false;
                }
                var ruleOffset = rule.offset || 0;
                var currOffset = curr.offset || 0;
                if (currOffset !== ruleOffset || curr.every !== rule.every) {
                    return false;
                }
                if (exactly && (exactlyWith[prop] % rule.every) !== ruleOffset) {
                    return false;
                }
            }
        }
        return true;
    };
    /**
     * Returns the pattern with the given name if one exists. If you add your own
     * patterns make sure to add them to [[PatternMap]].
     *
     * @param name The name of the pattern to return.
     * @return The instance to the pattern with the same name.
     */
    Pattern.withName = function (name) {
        return PatternMap[name];
    };
    /**
     * Finds a matching pattern to the given input searching through [[Patterns]]
     * for matches. Optionally it will only look at patterns where listed = `true`.
     *
     * @param input The schedule input to use.
     * @param listedOnly When `true` only patterns with [[Pattern.listed]] set to
     *    `true` will be looked at, otherwise all patterns are looked at.
     * @param exactlyWith  A day to further validate against for matching.
     * @see [[Pattern.isMatch]]
     */
    Pattern.findMatch = function (input, listedOnly, exactlyWith) {
        if (listedOnly === void 0) { listedOnly = true; }
        for (var _i = 0, Patterns_1 = Patterns; _i < Patterns_1.length; _i++) {
            var pattern = Patterns_1[_i];
            if ((pattern.listed || !listedOnly) && pattern.isMatch(input, exactlyWith)) {
                return pattern;
            }
        }
        return null;
    };
    /**
     * The properties in the [[ScheduleInput]] which are compared against the
     * rules of a pattern.
     */
    Pattern.PROPS = [
        'dayOfWeek', 'dayOfMonth', 'lastDayOfMonth', 'dayOfYear',
        'month', 'week', 'year',
        'weekOfYear', 'weekspanOfYear', 'fullWeekOfYear', 'lastWeekspanOfYear', 'lastFullWeekOfYear',
        'weekOfMonth', 'weekspanOfMonth', 'fullWeekOfMonth', 'lastWeekspanOfMonth', 'lastFullWeekOfMonth'
    ];
    return Pattern;
}());

/**
 * The list of patterns that can be searched through for matches to schedule
 * input.
 *
 * @see [[Pattern.findMatch]]
 */
var Patterns = [
    new Pattern_Pattern('none', true, function (day) { return 'Does not repeat'; }, {
        year: 1,
        month: 1,
        dayOfMonth: 1
    }),
    new Pattern_Pattern('daily', true, function (day) { return 'Daily'; }, {}),
    new Pattern_Pattern('weekly', true, function (day) { return 'Weekly on ' + day.format('dddd'); }, {
        dayOfWeek: 1
    }),
    new Pattern_Pattern('monthlyWeek', true, function (day) { return 'Monthly on the ' + Suffix.CACHE[day.weekspanOfMonth + 1] + ' ' + day.format('dddd'); }, {
        dayOfWeek: 1,
        weekspanOfMonth: 1
    }),
    new Pattern_Pattern('annually', true, function (day) { return 'Annually on ' + day.format('MMMM Do'); }, {
        month: 1,
        dayOfMonth: 1
    }),
    new Pattern_Pattern('annuallyMonthWeek', true, function (day) { return 'Annually on the ' + Suffix.CACHE[day.weekspanOfMonth + 1] + ' ' + day.format('dddd') + ' of ' + day.format('MMMM'); }, {
        month: 1,
        dayOfWeek: 1,
        weekspanOfMonth: 1
    }),
    new Pattern_Pattern('weekday', true, function (day) { return 'Every weekday (Monday to Friday)'; }, {
        dayOfWeek: [Weekday.MONDAY, Weekday.TUESDAY, Weekday.WEDNESDAY, Weekday.THURSDAY, Weekday.FRIDAY]
    }),
    new Pattern_Pattern('monthly', true, function (day) { return 'Monthly on the ' + day.format('Do') + ' day'; }, {
        dayOfMonth: 1
    }),
    new Pattern_Pattern('custom', true, function (day) { return 'Custom...'; }, {
        dayOfWeek: false,
        dayOfMonth: false,
        lastDayOfMonth: false,
        dayOfYear: false,
        year: false,
        month: false,
        week: false,
        weekOfYear: false,
        weekspanOfYear: false,
        fullWeekOfYear: false,
        lastWeekspanOfYear: false,
        lastFullWeekOfYear: false,
        weekOfMonth: false,
        weekspanOfMonth: false,
        fullWeekOfMonth: false,
        lastWeekspanOfMonth: false,
        lastFullWeekOfMonth: false
    })
];
/**
 * The map of patterns keyed by their name.
 *
 * @see [[Pattern.withName]]
 */
var PatternMap = {};
for (var Pattern__i = 0, Patterns_2 = Patterns; Pattern__i < Patterns_2.length; Pattern__i++) {
    var Pattern_pattern = Patterns_2[Pattern__i];
    PatternMap[Pattern_pattern.name] = Pattern_pattern;
}

// CONCATENATED MODULE: ./src/Sort.ts

/**
 * A class with [[SortEvent]] functions and functions which accept other
 * [[SortEvent]]s and return a new [[SortEvent]].
 *
 * ```typescript
 * // Sorts full day events first, then events in descending order based on start time.
 * Sorts.List([Sorts.FullDay, Sorts.Desc(Sorts.Start)]);
 * ```
 */
var Sorts = (function () {
    function Sorts() {
    }
    /**
     * Sorts the two events by their start time - the earliest event being first
     * in order.
     *
     * @param a The first event.
     * @param b The second event.
     * @returns The difference in time between the start of `a` and `b`.
     * @see [[CalendarEvent.time]]
     */
    Sorts.Start = function (a, b) {
        return a.time.start.time - b.time.start.time;
    };
    /**
     * Sorts the two events by their end time - the earliest to end being first
     * in order.
     *
     * @param a The first event.
     * @param b The second event.
     * @returns The difference in time between the end of `a` and `b`.
     * @see [[CalendarEvent.time]]
     */
    Sorts.End = function (a, b) {
        return a.time.end.time - b.time.end.time;
    };
    /**
     * Sorts the two events placing the full day events before the timed events.
     *
     * @param a The first event.
     * @param b The second event.
     * @returns If both are timed or both are full day then `0` is returned,
     *    otherwise `-1` is returned if `a` is full day and `1` is returned if
     *    `b` is full day.
     * @see [[CalendarEvent.fullDay]]
     */
    Sorts.FullDay = function (a, b) {
        var af = a.fullDay ? 0 : 1;
        var bf = b.fullDay ? 0 : 1;
        return af - bf;
    };
    /**
     * Sorts the two events placing the shorter events before the longer events.
     * Full day or multiple day events actually take up a day and will be ordered
     * last.
     *
     * @param a The first event.
     * @param b The second event.
     * @returns The difference in milliseconds between `a` and `b`.
     * @see [[CalendarEvent.time]]
     * @see [[DaySpan.millis]]
     */
    Sorts.Duration = function (a, b) {
        return a.time.millis() - b.time.millis();
    };
    /**
     * Returns a [[SortEvent]] that effectively orders the given sorter in the
     * opposite (often descending) order.
     *
     * @param sorter The sorter to reverse.
     * @returns A new sorter which reverses the one passed in.
     */
    Sorts.Desc = function (sorter) {
        return function (a, b) {
            return sorter(b, a);
        };
    };
    /**
     * Returns a [[SortEvent]] that orders the events based on a string in each
     * event. A function must be supplied which takes an event of type `T` and
     * returns a string.
     *
     * @param getString A function which returns a string from the event.
     * @returns A sorter which sorts strings alphabetically.
     */
    Sorts.Alphabetical = function (getString) {
        return function (a, b) {
            var as = getString(a.event) || '';
            var bs = getString(b.event) || '';
            return as.localeCompare(bs);
        };
    };
    /**
     * Returns a [[SortEvent]] that orders events based on a number in each event.
     * A function must be supplied which takes an event of type `T` and returns
     * a number.
     *
     * @param getOrder A function which returns a number from the event.
     * @returns A sorter which sorts events based on a number in ascending order.
     */
    Sorts.Ordered = function (getOrder) {
        return function (a, b) {
            var ao = getOrder(a.event);
            var bo = getOrder(b.event);
            return ao - bo;
        };
    };
    /**
     * Returns a [[SortEvent]] that orders events based on an array of sorters.
     * The first sorter which returns a non-zero result is used.
     *
     * @param sorters A list of sorting functions to test one at a time.
     * @returns A sorter which sorts based on a list of sorters.
     */
    Sorts.List = function (sorters) {
        return function (a, b) {
            for (var _i = 0, sorters_1 = sorters; _i < sorters_1.length; _i++) {
                var sorter = sorters_1[_i];
                var compare = sorter(a, b);
                if (compare !== 0) {
                    return compare;
                }
            }
            return 0;
        };
    };
    return Sorts;
}());


// CONCATENATED MODULE: ./src/index.ts
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Calendar", function() { return Calendar_Calendar; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "CalendarDay", function() { return CalendarDay_CalendarDay; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "CalendarEvent", function() { return CalendarEvent_CalendarEvent; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Event", function() { return Event; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Constants", function() { return Constants; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Day", function() { return Day_Day; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "DaySpan", function() { return DaySpan_DaySpan; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Functions", function() { return Functions; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Identifier", function() { return Identifier_Identifier; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "IteratorAction", function() { return IteratorAction; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Iterator", function() { return Iterator_Iterator; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Month", function() { return Month; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Op", function() { return Op; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "operate", function() { return operate; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Parse", function() { return Parse_Parse; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Pattern", function() { return Pattern_Pattern; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Patterns", function() { return Patterns; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "PatternMap", function() { return PatternMap; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Schedule", function() { return Schedule_Schedule; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ScheduleModifier", function() { return ScheduleModifier_ScheduleModifier; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Sorts", function() { return Sorts; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Suffix", function() { return Suffix; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Time", function() { return Time_Time; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Units", function() { return Units; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Weekday", function() { return Weekday; });
























/***/ })
/******/ ]);
});
//# sourceMappingURL=dayspan.js.map