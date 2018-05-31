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
     * @return True if the variable is an array, otherwise false.
     */
    Functions.isArray = function (input) {
        return input instanceof Array;
    };
    /**
     *
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
     * @return True if the variable is a string, otherwise false.
     */
    Functions.isString = function (input) {
        return typeof (input) === 'string';
    };
    /**
     *
     */
    Functions.isNumber = function (input) {
        return isFinite(input);
    };
    /**
     *
     */
    Functions.isObject = function (input) {
        return !this.isArray(input) && typeof (input) === 'object';
    };
    /**
     * Determines whether the given input is defined.
     *
     * @param input The variable to test.
     * @return True if the variable is defined, otherwise false.
     */
    Functions.isDefined = function (input) {
        return typeof (input) !== 'undefined';
    };
    /**
     *
     */
    Functions.isFrequencyValueEvery = function (input) {
        return this.isObject(input) && this.isNumber(input.every);
    };
    /**
     *
     */
    Functions.isFrequencyValueOneOf = function (input) {
        return this.isArray(input) && input.length > 0;
    };
    /**
     * Returns the first argument which is defined.
     *
     * @param a The first argument to look at.
     * @param b The second argument to look at.
     * @return The first defined argument.
     * @see [[Functions.isDefined]]
     */
    Functions.coalesce = function (a, b, c) {
        return this.isDefined(a) ? a : (this.isDefined(b) ? b : c);
    };
    /**
     *
     */
    Functions.pad = function (x, length, padding, before) {
        while (x.length < length) {
            before ? x = padding + x : x = x + padding;
        }
        return x;
    };
    /**
     *
     */
    Functions.padNumber = function (x, length, first) {
        if (first === void 0) { first = length; }
        return this.pad(x + '', length, '0', true).substring(0, first);
    };
    return Functions;
}());


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
    Constants.DURATION_DEFAULT_UNIT = function (all) { return all ? Constants.DURATION_DEFAULT_UNIT_ALL : Constants.DURATION_DEFAULT_UNIT_TIMES; };
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


// CONCATENATED MODULE: ./src/Op.ts

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
         *
         */
        get: function () {
            if (!this._CACHE) {
                this._CACHE = [];
                for (var i = 0; i < this._CACHE_SIZE; i++) {
                    this._CACHE[i] = this.get(i, true);
                }
            }
            return this._CACHE;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    Suffix.determine = function (value) {
        return value >= 11 && value <= 13 ? 'th' : this.MAP[value % this.MAP.length];
    };
    /**
     *
     */
    Suffix.get = function (value, append) {
        if (append === void 0) { append = false; }
        var suffix = this.determine(value);
        return append ? value + suffix : suffix;
    };
    /**
     * The array of suffixes used.
     */
    Suffix.MAP = [
        'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'
    ];
    /**
     *
     */
    Suffix._CACHE_SIZE = 366;
    return Suffix;
}());


// CONCATENATED MODULE: ./src/Schedule.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_moment__);







// @ts-ignore

/**
 *
 */
var Schedule_Schedule = (function () {
    /**
     *
     */
    function Schedule(input) {
        if (Functions.isDefined(input)) {
            this.set(input);
        }
    }
    /**
     *
     */
    Schedule.prototype.set = function (input) {
        Parse_Parse.schedule(input, this);
        return this;
    };
    Object.defineProperty(Schedule.prototype, "lastTime", {
        /**
         *
         */
        get: function () {
            return this.times[this.times.length - 1];
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
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
     *
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
     *
     */
    Schedule.prototype.matchesSpan = function (day) {
        return (this.start === null || day.isSameOrAfter(this.start)) &&
            (this.end === null || day.isBefore(this.end));
    };
    /**
     *
     */
    Schedule.prototype.matchesRange = function (start, end) {
        return (this.start === null || start.isSameOrBefore(this.start)) &&
            (this.end === null || end.isBefore(this.end));
    };
    /**
     *
     */
    Schedule.prototype.isExcluded = function (day) {
        return !!this.exclude[day.dayIdentifier];
    };
    /**
     *
     */
    Schedule.prototype.isIncluded = function (day) {
        return !this.exclude[day.dayIdentifier];
    };
    /**
     *
     */
    Schedule.prototype.matchesDay = function (day) {
        if (!this.isIncluded(day) || !this.matchesSpan(day)) {
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
     * Determines if the given day is covered by this schedule. A schedule can
     * specify events that span multiple days - so even though the day does not
     * match the starting day of a span - it can be a day that is within the
     * schedule.
     *
     * @param day The day to test.
     * @param
     */
    Schedule.prototype.coversDay = function (day) {
        return !!this.findStartingDay(day);
    };
    /**
     *
     */
    Schedule.prototype.nextDay = function (day, includeDay, lookAhead) {
        if (includeDay === void 0) { includeDay = false; }
        if (lookAhead === void 0) { lookAhead = 366; }
        var next = null;
        var setNext = function (d) {
            next = d;
            return false;
        };
        this.iterateDays(day, 1, true, setNext, includeDay, lookAhead);
        return next;
    };
    /**
     *
     */
    Schedule.prototype.nextDays = function (day, max, includeDay, lookAhead) {
        if (includeDay === void 0) { includeDay = false; }
        if (lookAhead === void 0) { lookAhead = 366; }
        var nexts = [];
        this.iterateDays(day, max, true, function (d) { return nexts.push(d); }, includeDay, lookAhead);
        return nexts;
    };
    /**
     *
     */
    Schedule.prototype.prevDay = function (day, includeDay, lookBack) {
        if (includeDay === void 0) { includeDay = false; }
        if (lookBack === void 0) { lookBack = 366; }
        var prev = null;
        var setPrev = function (d) {
            prev = d;
            return false;
        };
        this.iterateDays(day, 1, false, setPrev, includeDay, lookBack);
        return prev;
    };
    /**
     *
     */
    Schedule.prototype.prevDays = function (day, max, includeDay, lookBack) {
        if (includeDay === void 0) { includeDay = false; }
        if (lookBack === void 0) { lookBack = 366; }
        var prevs = [];
        this.iterateDays(day, max, false, function (d) { return prevs.push(d); }, includeDay, lookBack);
        return prevs;
    };
    /**
     *
     */
    Schedule.prototype.iterateDays = function (day, max, next, onDay, includeDay, lookup) {
        if (includeDay === void 0) { includeDay = false; }
        if (lookup === void 0) { lookup = 366; }
        var iterated = 0;
        for (var days = 0; days < lookup; days++) {
            if (!includeDay || days > 0) {
                day = next ? day.next() : day.prev();
            }
            if (this.matchesDay(day)) {
                if (onDay(day) === false) {
                    break;
                }
                if (++iterated >= max) {
                    break;
                }
            }
        }
        return this;
    };
    /**
     *
     */
    Schedule.prototype.matchesTime = function (day) {
        if (!this.matchesDay(day)) {
            return false;
        }
        for (var _i = 0, _a = this.times; _i < _a.length; _i++) {
            var time = _a[_i];
            if (day.sameTime(time)) {
                return true;
            }
        }
        return false;
    };
    /**
     *
     */
    Schedule.prototype.isFullDay = function () {
        return this.times.length === 0;
    };
    /**
     *
     */
    Schedule.prototype.getFullSpan = function (day) {
        var start = day.start();
        var end = start.add(this.duration, this.durationUnit);
        return new DaySpan_DaySpan(start, end);
    };
    /**
     *
     */
    Schedule.prototype.getTimeSpan = function (day, time) {
        var start = day.withTime(time);
        var end = start.add(this.duration, this.durationUnit);
        return new DaySpan_DaySpan(start, end);
    };
    /**
     *
     */
    Schedule.prototype.getSpansOver = function (day) {
        var spans = [];
        var start = this.findStartingDay(day);
        if (!start) {
            return spans;
        }
        if (this.isFullDay()) {
            spans.push(this.getFullSpan(start));
        }
        else {
            for (var _i = 0, _a = this.times; _i < _a.length; _i++) {
                var time = _a[_i];
                var span = this.getTimeSpan(start, time);
                if (span.matchesDay(start)) {
                    spans.push(span);
                }
            }
        }
        return spans;
    };
    /**
     *
     */
    Schedule.prototype.getSpanOver = function (day) {
        var start = this.findStartingDay(day);
        return start ? this.getFullSpan(start) : null;
    };
    /**
     *
     */
    Schedule.prototype.getSpansOn = function (day, check) {
        if (check === void 0) { check = false; }
        var spans = [];
        if (check && !this.matchesDay(day)) {
            return spans;
        }
        if (this.isFullDay()) {
            spans.push(this.getFullSpan(day));
        }
        else {
            for (var _i = 0, _a = this.times; _i < _a.length; _i++) {
                var time = _a[_i];
                var span = this.getTimeSpan(day, time);
                spans.push(span);
            }
        }
        return spans;
    };
    /**
     *
     */
    Schedule.prototype.findStartingDay = function (day) {
        var behind = this.durationInDays;
        while (behind >= 0) {
            if (this.matchesDay(day)) {
                return day;
            }
            day = day.prev();
            behind--;
        }
        return null;
    };
    /**
     *
     */
    Schedule.prototype.getExclusions = function (returnDays) {
        if (returnDays === void 0) { returnDays = true; }
        var exclusions = [];
        for (var dayIdentifierKey in this.exclude) {
            var dayIdentifier = parseInt(dayIdentifierKey);
            exclusions.push(returnDays ? Day_Day.fromDayIdentifier(dayIdentifier) : dayIdentifier);
        }
        return exclusions;
    };
    /**
     *
     */
    Schedule.prototype.toInput = function (returnDays, returnTimes, timeFormat, alwaysDuration) {
        if (returnDays === void 0) { returnDays = false; }
        if (returnTimes === void 0) { returnTimes = false; }
        if (timeFormat === void 0) { timeFormat = ''; }
        if (alwaysDuration === void 0) { alwaysDuration = false; }
        var defaultUnit = Constants.DURATION_DEFAULT_UNIT(this.isFullDay());
        var out = {};
        var exclusions = this.getExclusions(returnDays);
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
     *
     */
    Schedule.prototype.describe = function (thing, includeRange, includeTimes, includeDuration, includeExcludes) {
        if (thing === void 0) { thing = 'event'; }
        if (includeRange === void 0) { includeRange = true; }
        if (includeTimes === void 0) { includeTimes = true; }
        if (includeDuration === void 0) { includeDuration = false; }
        if (includeExcludes === void 0) { includeExcludes = false; }
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
        out += this.describeRule(this.dayOfWeek.input, 'day of the week', function (x) { return __WEBPACK_IMPORTED_MODULE_6_moment__["weekdays"]()[x]; }, 1, false);
        out += this.describeRule(this.lastDayOfMonth.input, 'last day of the month', function (x) { return Suffix.CACHE[x]; });
        out += this.describeRule(this.dayOfMonth.input, 'day of the month', function (x) { return Suffix.CACHE[x]; });
        out += this.describeRule(this.dayOfYear.input, 'day of the year', function (x) { return Suffix.CACHE[x]; }, 1);
        out += this.describeRule(this.year.input, 'year', function (x) { return x; }, 0, false, ' in ');
        out += this.describeRule(this.month.input, 'month', function (x) { return __WEBPACK_IMPORTED_MODULE_6_moment__["months"]()[x]; }, 0, false, ' in ');
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
            var excludes = this.getExclusions(true);
            if (excludes.length) {
                out += ' excluding ';
                out += this.describeArray(excludes, function (x) { return x.format('MM/DD/YYYY'); });
            }
        }
        return out;
    };
    /**
     *
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
     *
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
    return Schedule;
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
    Time.prototype.toIdentifer = function () {
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
     * @returns A function which determines whether a value matches a frequency.
     * @see [[Schedule]]
     */
    Parse.frequency = function (input, property) {
        var check = function (value) {
            return true;
        };
        check.given = false;
        if (Functions.isFrequencyValueEvery(input)) {
            var offset_1 = input.offset || 0;
            var every_1 = input.every;
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
        check.input = input;
        check.property = property;
        return check;
    };
    /**
     * Parses [[DayInput]] into a [[Day]] instance.
     *
     * ```typescript
     * Parse.day( 65342300 );               // unix timestamp
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
        }
        return times;
    };
    /**
     * Parses an array of excluded days into a map of excluded days where the
     * array value and returned object key are [[Day.dayIdentifier]].
     *
     * ```typescript
     * Parse.exclusions( [ 01012018, 05062014 ] ); // {'01012018': true, '05062014': true}
     * ```
     *
     * @param input The input to parse.
     * @returns The object with identifier keys and `true` values.
     * @see [[Day.dayIdentifier]]
     */
    Parse.exclusions = function (input) {
        var exclusions = {};
        if (Functions.isArray(input)) {
            for (var _i = 0, input_2 = input; _i < input_2.length; _i++) {
                var dayIdentifier = input_2[_i];
                if (Functions.isNumber(dayIdentifier)) {
                    exclusions[dayIdentifier] = true;
                }
                else {
                    var day = this.day(dayIdentifier);
                    if (day) {
                        exclusions[day.dayIdentifier] = true;
                    }
                }
            }
        }
        return exclusions;
    };
    /**
     * Parses an object which specifies a schedule where events may or may not
     * repeat and they may be all day events or at specific times.
     *
     * @param input The input to parse into a schedule.
     * @param out The schedule to set the values of and return.
     * @returns An instance of the parsed [[Schedule]].
     */
    Parse.schedule = function (input, out) {
        if (out === void 0) { out = new Schedule_Schedule(); }
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
        out.exclude = this.exclusions(input.exclude);
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
     * Parses [[CalendarScheduleInput]] and returns a [[CalendarSchedule]].
     *
     * @param input The input to parse.
     * @returns The parsed value.
     */
    Parse.calendarSchedule = function (input) {
        if (input.schedule instanceof Schedule_Schedule) {
            return input;
        }
        return {
            schedule: this.schedule(input.schedule),
            event: input.event
        };
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);





// @ts-ignore

/**
 *
 */
var Day_Day = (function () {
    /**
     *
     */
    function Day(date) {
        this.date = date;
        this.time = date.unix();
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
        this.dayIdentifier = Day.getDayIdentifier(date);
        this.weekIdentifier = Day.getWeekIdentifier(date);
        this.monthIdentifier = Day.getMonthIdentifier(date);
        this.quarterIdentifier = Day.getQuarterIdentifier(date);
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
        return this.dayIdentifier === day.dayIdentifier && this.hour === day.hour && this.minute === day.minute;
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
        return new Day(__WEBPACK_IMPORTED_MODULE_4_moment__());
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
        return this.fromMoment(__WEBPACK_IMPORTED_MODULE_4_moment__(millis));
    };
    Day.parse = function (input) {
        return Parse_Parse.day(input);
    };
    Day.fromString = function (input) {
        return this.fromMoment(__WEBPACK_IMPORTED_MODULE_4_moment__(input));
    };
    Day.fromFormat = function (input, formats) {
        return this.fromMoment(__WEBPACK_IMPORTED_MODULE_4_moment__(input, formats));
    };
    Day.fromObject = function (input) {
        return this.fromMoment(__WEBPACK_IMPORTED_MODULE_4_moment__(input));
    };
    Day.fromDate = function (input) {
        return this.fromMoment(__WEBPACK_IMPORTED_MODULE_4_moment__(input));
    };
    Day.fromArray = function (input) {
        return this.fromMoment(__WEBPACK_IMPORTED_MODULE_4_moment__(input));
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
        return new Day(__WEBPACK_IMPORTED_MODULE_4_moment__({ year: year, month: month, date: date, hour: hour, minute: minute, second: second, millisecond: millisecond }));
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
    Day.getWeekIdentifier = function (date) {
        return date.week() + date.year() * 100;
    };
    Day.getMonthIdentifier = function (date) {
        return (date.month() + 1) + date.year() * 100;
    };
    Day.getDayIdentifier = function (date) {
        return date.date() + (date.month() + 1) * 100 + date.year() * 10000;
    };
    Day.getQuarterIdentifier = function (date) {
        return date.quarter() + date.year() * 10;
    };
    /**
     *
     */
    Day.LOAD_TIME = Day.now();
    return Day;
}());


// CONCATENATED MODULE: ./src/CalendarDay.ts

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
 * A day in a [[Calendar]] with extra information relative to any selection on
 * the calendar, the current date, or events on the day.
 */
var CalendarDay_CalendarDay = (function (_super) {
    __extends(CalendarDay, _super);
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
 * An event on a given day and the schedule that generated the event.
 */
var CalendarEvent_CalendarEvent = (function () {
    /**
     * Creates a new event instance given the id, the event paired with the
     * schedule, the schedule, the time span of the event, and the day on the
     * calendar the event belongs to.
     *
     * @param id The relatively unique identifier of this event.
     * @param event The event paired with the schedule.
     * @param schedule The schedule that generated this event.
     * @param time The time span of this event.
     * @param actualDay The day on the calendar this event is for.
     */
    function CalendarEvent(id, event, schedule, time, actualDay) {
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
        this.schedule = schedule;
        this.time = time;
        this.fullDay = schedule.isFullDay();
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
    return CalendarEvent;
}());


// CONCATENATED MODULE: ./src/Calendar.ts










/**
 *
 */
var Calendar_Calendar = (function () {
    /**
     *
     */
    function Calendar(start, end, type, size, moveStart, moveEnd, input) {
        /**
         *
         */
        this.fill = false;
        /**
         *
         */
        this.minimumSize = 0;
        /**
         *
         */
        this.repeatCovers = true;
        /**
         *
         */
        this.listTimes = false;
        /**
         *
         */
        this.eventsOutside = false;
        /**
         *
         */
        this.updateRows = false;
        /**
         *
         */
        this.updateColumns = false;
        /**
         *
         */
        this.eventSorter = null;
        /**
         *
         */
        this.selection = null;
        /**
         *
         */
        this.days = [];
        /**
         *
         */
        this.schedules = [];
        this.span = new DaySpan_DaySpan(start, end);
        this.filled = new DaySpan_DaySpan(start, end);
        this.type = type;
        this.size = size;
        this.moveStart = moveStart;
        this.moveEnd = moveEnd;
        if (Functions.isDefined(input)) {
            this.withInput(input, false);
        }
        this.refresh();
    }
    /**
     *
     */
    Calendar.prototype.withInput = function (input, refresh) {
        if (refresh === void 0) { refresh = true; }
        this.fill = Functions.coalesce(input.fill, this.fill);
        this.minimumSize = Functions.coalesce(input.minimumSize, this.minimumSize);
        this.repeatCovers = Functions.coalesce(input.repeatCovers, this.repeatCovers);
        this.listTimes = Functions.coalesce(input.listTimes, this.listTimes);
        this.eventsOutside = Functions.coalesce(input.eventsOutside, this.eventsOutside);
        this.updateRows = Functions.coalesce(input.updateRows, this.updateRows);
        this.updateColumns = Functions.coalesce(input.updateColumns, this.updateColumns);
        this.eventSorter = Functions.coalesce(input.eventSorter, this.eventSorter);
        if (Functions.isArray(input.schedules)) {
            this.removeSchedules();
            this.addSchedules(input.schedules, false, true);
        }
        if (refresh) {
            this.refresh();
        }
        return this;
    };
    /**
     *
     */
    Calendar.prototype.withMinimumSize = function (minimumSize) {
        this.minimumSize = minimumSize;
        this.refresh();
        return this;
    };
    /**
     *
     */
    Calendar.prototype.withRepeatCovers = function (repeatCovers) {
        this.repeatCovers = repeatCovers;
        this.refreshEvents();
        return this;
    };
    /**
     *
     */
    Calendar.prototype.withListTimes = function (listTimes) {
        this.listTimes = listTimes;
        this.refreshEvents();
        return this;
    };
    /**
     *
     */
    Calendar.prototype.withEventsOutside = function (eventsOutside) {
        this.eventsOutside = eventsOutside;
        this.refreshEvents();
        return this;
    };
    /**
     *
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
     *
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
         *
         */
        get: function () {
            return this.span.start;
        },
        /**
         *
         */
        set: function (day) {
            this.span.start = day;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "end", {
        /**
         *
         */
        get: function () {
            return this.span.end;
        },
        /**
         *
         */
        set: function (day) {
            this.span.end = day;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
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
     *
     */
    Calendar.prototype.split = function (by) {
        if (by === void 0) { by = 1; }
        var split = [];
        var start = this.start;
        var end = this.moveEnd(this.end, by - this.size);
        for (var i = 0; i < this.size; i++) {
            split.push(new Calendar(start, end, this.type, by, this.moveStart, this.moveEnd, this));
            start = this.moveStart(start, by);
            end = this.moveEnd(end, by);
        }
        return split;
    };
    /**
     *
     */
    Calendar.prototype.refresh = function (today) {
        if (today === void 0) { today = Day_Day.today(); }
        this.length = this.span.days(Op.UP, true);
        this.resetDays();
        this.refreshCurrent(today);
        this.refreshSelection();
        this.refreshEvents();
        return this;
    };
    /**
     *
     */
    Calendar.prototype.resetFilled = function () {
        this.filled.start = this.fill ? this.start.startOfWeek() : this.start;
        this.filled.end = this.fill ? this.end.endOfWeek() : this.end;
        return this;
    };
    /**
     *
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
     *
     */
    Calendar.prototype.refreshCurrent = function (today) {
        if (today === void 0) { today = Day_Day.today(); }
        return this.iterateDays(function (d) {
            d.updateCurrent(today);
        });
    };
    /**
     *
     */
    Calendar.prototype.refreshSelection = function () {
        var _this = this;
        return this.iterateDays(function (d) {
            if (_this.selection) {
                d.updateSelected(_this.selection);
            }
            else {
                d.clearSelected();
            }
        });
    };
    /**
     *
     */
    Calendar.prototype.refreshEvents = function () {
        var _this = this;
        this.iterateDays(function (d) {
            if (d.inCalendar || _this.eventsOutside) {
                d.events = _this.eventsForDay(d, _this.listTimes, _this.repeatCovers);
                if (_this.eventSorter) {
                    d.events.sort(_this.eventSorter);
                }
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
     *
     */
    Calendar.prototype.refreshRows = function () {
        var eventToRow = {};
        var onlyFullDay = this.listTimes;
        this.iterateDays(function (d) {
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
     *
     */
    Calendar.prototype.refreshColumns = function () {
        this.iterateDays(function (d) {
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
     *
     */
    Calendar.prototype.iterateDays = function (iterator) {
        var days = this.days;
        for (var i = 0; i < days.length; i++) {
            iterator(days[i]);
        }
        return this;
    };
    /**
     *
     */
    Calendar.prototype.eventsForDay = function (day, getTimes, covers) {
        if (getTimes === void 0) { getTimes = true; }
        if (covers === void 0) { covers = true; }
        var events = [];
        var entries = this.schedules;
        for (var entryIndex = 0; entryIndex < entries.length; entryIndex++) {
            var entry = entries[entryIndex];
            var schedule = entry.schedule;
            var event_4 = entry.event;
            var eventId = entryIndex * Constants.MAX_EVENTS_PER_DAY;
            if ((covers && schedule.coversDay(day)) || (!covers && schedule.matchesDay(day))) {
                if (getTimes) {
                    var times = covers ?
                        entry.schedule.getSpansOver(day) :
                        entry.schedule.getSpansOn(day);
                    for (var timeIndex = 0; timeIndex < times.length; timeIndex++) {
                        events.push(new CalendarEvent_CalendarEvent(eventId + timeIndex, event_4, schedule, times[timeIndex], day));
                    }
                }
                else {
                    var over = schedule.getSpanOver(day);
                    if (over) {
                        events.push(new CalendarEvent_CalendarEvent(eventId, event_4, schedule, over, day));
                    }
                }
            }
        }
        return events;
    };
    /**
     *
     */
    Calendar.prototype.findSchedule = function (input) {
        for (var _i = 0, _a = this.schedules; _i < _a.length; _i++) {
            var schedule = _a[_i];
            if (schedule === input || schedule.schedule === input || schedule.event === input) {
                return schedule;
            }
        }
        return null;
    };
    /**
     *
     */
    Calendar.prototype.removeSchedules = function (schedules, delayRefresh) {
        if (schedules === void 0) { schedules = null; }
        if (delayRefresh === void 0) { delayRefresh = false; }
        if (schedules) {
            for (var _i = 0, schedules_1 = schedules; _i < schedules_1.length; _i++) {
                var schedule = schedules_1[_i];
                this.removeSchedule(schedule, true);
            }
        }
        else {
            this.schedules = [];
        }
        if (!delayRefresh) {
            this.refreshEvents();
        }
        return this;
    };
    /**
     *
     */
    Calendar.prototype.removeSchedule = function (schedule, delayRefresh) {
        if (delayRefresh === void 0) { delayRefresh = false; }
        var found = this.findSchedule(schedule);
        if (found) {
            this.schedules.splice(this.schedules.indexOf(found), 1);
            if (!delayRefresh) {
                this.refreshEvents();
            }
        }
        return this;
    };
    /**
     *
     */
    Calendar.prototype.addSchedule = function (schedule, allowDuplicates, delayRefresh) {
        if (allowDuplicates === void 0) { allowDuplicates = false; }
        if (delayRefresh === void 0) { delayRefresh = false; }
        var parsed = Parse_Parse.calendarSchedule(schedule);
        if (!allowDuplicates) {
            var existing = this.findSchedule(parsed);
            if (existing) {
                return this;
            }
        }
        this.schedules.push(parsed);
        if (!delayRefresh) {
            this.refreshEvents();
        }
        return this;
    };
    /**
     *
     */
    Calendar.prototype.addSchedules = function (schedules, allowDuplicates, delayRefresh) {
        if (allowDuplicates === void 0) { allowDuplicates = false; }
        if (delayRefresh === void 0) { delayRefresh = false; }
        for (var _i = 0, schedules_2 = schedules; _i < schedules_2.length; _i++) {
            var schedule = schedules_2[_i];
            this.addSchedule(schedule, allowDuplicates, true);
        }
        if (!delayRefresh) {
            this.refreshEvents();
        }
        return this;
    };
    /**
     *
     */
    Calendar.prototype.select = function (start, end) {
        this.selection = end ? new DaySpan_DaySpan(start, end) : DaySpan_DaySpan.point(start);
        this.refreshSelection();
        return this;
    };
    /**
     *
     */
    Calendar.prototype.unselect = function () {
        this.selection = null;
        this.refreshSelection();
        return this;
    };
    /**
     *
     */
    Calendar.prototype.move = function (jump) {
        if (jump === void 0) { jump = this.size; }
        this.start = this.moveStart(this.start, jump);
        this.end = this.moveEnd(this.end, jump);
        this.refresh();
        return this;
    };
    /**
     *
     */
    Calendar.prototype.next = function (jump) {
        if (jump === void 0) { jump = this.size; }
        return this.move(jump);
    };
    /**
     *
     */
    Calendar.prototype.prev = function (jump) {
        if (jump === void 0) { jump = this.size; }
        return this.move(-jump);
    };
    /**
     *
     */
    Calendar.days = function (days, around, focus, input) {
        if (days === void 0) { days = 1; }
        if (around === void 0) { around = Day_Day.today(); }
        if (focus === void 0) { focus = 0.4999; }
        var start = around.start().relativeDays(-Math.floor(days * focus));
        var end = start.relativeDays(days - 1).end();
        var mover = function (day, amount) { return day.relativeDays(amount); };
        return new Calendar(start, end, Units.DAY, days, mover, mover, input);
    };
    /**
     *
     */
    Calendar.weeks = function (weeks, around, focus, input) {
        if (weeks === void 0) { weeks = 1; }
        if (around === void 0) { around = Day_Day.today(); }
        if (focus === void 0) { focus = 0.4999; }
        var start = around.start().startOfWeek().relativeWeeks(-Math.floor(weeks * focus));
        var end = start.relativeWeeks(weeks - 1).endOfWeek();
        var mover = function (day, amount) { return day.relativeWeeks(amount); };
        return new Calendar(start, end, Units.WEEK, weeks, mover, mover, input);
    };
    /**
     *
     */
    Calendar.months = function (months, around, focus, input) {
        if (months === void 0) { months = 1; }
        if (around === void 0) { around = Day_Day.today(); }
        if (focus === void 0) { focus = 0.4999; }
        if (input === void 0) { input = { fill: true }; }
        var start = around.start().startOfMonth().relativeMonths(-Math.floor(months * focus));
        var end = start.relativeMonths(months - 1).endOfMonth();
        var moveStart = function (day, amount) { return day.relativeMonths(amount); };
        var moveEnd = function (day, amount) { return day.startOfMonth().relativeMonths(amount).endOfMonth(); };
        return new Calendar(start, end, Units.MONTH, months, moveStart, moveEnd, input);
    };
    /**
     *
     */
    Calendar.years = function (years, around, focus, input) {
        if (years === void 0) { years = 1; }
        if (around === void 0) { around = Day_Day.today(); }
        if (focus === void 0) { focus = 0.4999; }
        if (input === void 0) { input = { fill: true }; }
        var start = around.start().startOfYear().relativeYears(-Math.floor(years * focus));
        var end = start.relativeYears(years - 1).endOfYear();
        var mover = function (day, amount) { return day.relativeYears(amount); };
        return new Calendar(start, end, Units.YEAR, years, mover, mover, input);
    };
    return Calendar;
}());


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
     *
     */
    function Pattern(name, listed, describe, rules) {
        this.name = name;
        this.listed = listed;
        this.describe = describe;
        this.rules = rules;
    }
    /**
     *
     */
    Pattern.prototype.apply = function (input, day) {
        for (var _i = 0, _a = Pattern.PROPS; _i < _a.length; _i++) {
            var prop = _a[_i];
            var rule = this.rules[prop];
            // Should have one value
            if (rule === 1) {
                input[prop] = [day[prop]];
            }
            // Can be any of the values in the array
            if (Functions.isArray(rule)) {
                input[prop] = rule;
            }
            // Must not be present
            if (!Functions.isDefined(rule)) {
                delete input[prop];
            }
        }
        return input;
    };
    /**
     *
     */
    Pattern.prototype.isMatch = function (input, exactlyWith) {
        var exactly = Functions.isDefined(exactlyWith);
        for (var _i = 0, _a = Pattern.PROPS; _i < _a.length; _i++) {
            var prop = _a[_i];
            var rule = this.rules[prop];
            var curr = input[prop];
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
     *
     */
    Pattern.withName = function (name) {
        return PatternMap[name];
    };
    /**
     *
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
 *
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
 *
 */
var PatternMap = {};
for (var Pattern__i = 0, Patterns_2 = Patterns; Pattern__i < Patterns_2.length; Pattern__i++) {
    var Pattern_pattern = Patterns_2[Pattern__i];
    PatternMap[Pattern_pattern.name] = Pattern_pattern;
}

// CONCATENATED MODULE: ./src/Sort.ts

// Sorts.List( Sorts.FullDay, Sorts.Desc( Sorts.Start ) );
var Sorts = (function () {
    function Sorts() {
    }
    Sorts.Start = function (a, b) {
        return a.time.start.time - b.time.start.time;
    };
    Sorts.End = function (a, b) {
        return a.time.end.time - b.time.end.time;
    };
    Sorts.FullDay = function (a, b) {
        var af = a.fullDay ? 0 : 1;
        var bf = b.fullDay ? 0 : 1;
        return af - bf;
    };
    Sorts.Duration = function (a, b) {
        return a.time.millis() - b.time.millis();
    };
    Sorts.Desc = function (sorter) {
        return function (a, b) {
            return sorter(b, a);
        };
    };
    Sorts.Alphabetical = function (getString) {
        return function (a, b) {
            var as = getString(a.event) || '';
            var bs = getString(b.event) || '';
            return as.localeCompare(bs);
        };
    };
    Sorts.Ordered = function (getOrder) {
        return function (a, b) {
            var ao = getOrder(a.event);
            var bo = getOrder(b.event);
            return ao - bo;
        };
    };
    Sorts.List = function (list) {
        return function (a, b) {
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var sorter = list_1[_i];
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
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Constants", function() { return Constants; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Day", function() { return Day_Day; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "DaySpan", function() { return DaySpan_DaySpan; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Functions", function() { return Functions; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Month", function() { return Month; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Op", function() { return Op; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "operate", function() { return operate; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Parse", function() { return Parse_Parse; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Pattern", function() { return Pattern_Pattern; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Patterns", function() { return Patterns; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "PatternMap", function() { return PatternMap; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Schedule", function() { return Schedule_Schedule; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Sorts", function() { return Sorts; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Suffix", function() { return Suffix; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Time", function() { return Time_Time; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Units", function() { return Units; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Weekday", function() { return Weekday; });




















/***/ })
/******/ ]);
});
//# sourceMappingURL=dayspan.js.map