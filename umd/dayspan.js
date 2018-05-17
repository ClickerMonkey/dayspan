(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("moment"));
	else if(typeof define === 'function' && define.amd)
		define("ds", ["moment"], factory);
	else if(typeof exports === 'object')
		exports["ds"] = factory(require("moment"));
	else
		root["ds"] = factory(root["moment"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
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
     * Determines whether the given input is a string.
     *
     * @param input The variable to test.
     * @return True if the variable is a string, otherwise false.
     */
    Functions.isString = function (input) {
        return typeof (input) === 'string';
    };
    Functions.isNumber = function (input) {
        return isFinite(input);
    };
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
    Functions.isFrequencyValueEvery = function (input) {
        return this.isObject(input) && this.isNumber(input.every);
    };
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
    return Functions;
}());


// CONCATENATED MODULE: ./src/Constants.ts

var Constants = (function () {
    function Constants() {
    }
    Constants.MILLIS_IN_SECOND = 1000;
    Constants.MILLIS_IN_MINUTE = 1000 * 60;
    Constants.MILLIS_IN_HOUR = 1000 * 60 * 60;
    Constants.MILLIS_IN_DAY = 1000 * 60 * 60 * 24;
    Constants.MILLIS_IN_WEEK = 1000 * 60 * 60 * 24 * 7;
    Constants.DAYS_IN_WEEK = 7;
    Constants.MONTHS_IN_YEAR = 12;
    Constants.HOURS_IN_DAY = 24;
    Constants.MONTH_MIN = 0;
    Constants.MONTH_MAX = 11;
    Constants.DAY_MIN = 1;
    Constants.DAY_MAX = 31;
    Constants.HOUR_MIN = 0;
    Constants.HOUR_MAX = 23;
    Constants.MINUTE_MIN = 0;
    Constants.MINUTE_MAX = 59;
    Constants.SECOND_MIN = 0;
    Constants.SECOND_MAX = 59;
    Constants.MILLIS_MIN = 0;
    Constants.MILLIS_MAX = 999;
    Constants.WEEKDAY_MIN = 0;
    Constants.WEEKDAY_MAX = 6;
    Constants.START_NONE = 0;
    Constants.END_NONE = 0;
    Constants.DURATION_NONE = 0;
    Constants.WEEK_OF_MONTH_MINIMUM_WEEKDAY = 4; // Thursday by default
    return Constants;
}());


// CONCATENATED MODULE: ./src/Op.ts

var Op;
(function (Op) {
    Op[Op["NONE"] = 0] = "NONE";
    Op[Op["FLOOR"] = 1] = "FLOOR";
    Op[Op["CEIL"] = 2] = "CEIL";
    Op[Op["ROUND"] = 3] = "ROUND";
    Op[Op["TRUNCATE"] = 4] = "TRUNCATE";
    Op[Op["UP"] = 5] = "UP";
    Op[Op["DOWN"] = 6] = "DOWN";
})(Op = Op || (Op = {}));
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

// CONCATENATED MODULE: ./src/Day.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);



// @ts-ignore

var Day_Day = (function () {
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
        this.weekOfYear = Day.getWeekOfYear(date);
        this.weekspanOfYear = Day.getWeekspanOfYear(date);
        this.fullWeekOfYear = Day.getFullWeekOfYear(date);
        this.weekOfMonth = Day.getWeekOfMonth(date);
        this.weekspanOfMonth = Day.getWeekspanOfMonth(date);
        this.fullWeekOfMonth = Day.getFullWeekOfMonth(date);
        this.dayIdentifier = Day.getDayIdentifier(date);
        this.weekIdentifier = Day.getWeekIdentifier(date);
        this.monthIdentifier = Day.getMonthIdentifier(date);
        this.quarterIdentifier = Day.getQuarterIdentifier(date);
    }
    // Same
    Day.prototype.sameDay = function (day) {
        return this.dayIdentifier === day.dayIdentifier;
    };
    Day.prototype.sameMonth = function (day) {
        return this.monthIdentifier === day.monthIdentifier;
    };
    Day.prototype.sameWeek = function (day) {
        return this.weekIdentifier === day.weekIdentifier;
    };
    Day.prototype.sameYear = function (day) {
        return this.year === day.year;
    };
    Day.prototype.sameQuarter = function (day) {
        return this.quarterIdentifier === day.quarterIdentifier;
    };
    Day.prototype.sameHour = function (day) {
        return this.dayIdentifier === day.dayIdentifier && this.hour === day.hour;
    };
    Day.prototype.sameMinute = function (day) {
        return this.dayIdentifier === day.dayIdentifier && this.hour === day.hour && this.minute === day.minute;
    };
    // Comparison
    Day.prototype.isBefore = function (day, precision) {
        return this.date.isBefore(day.date, precision);
    };
    Day.prototype.isSameOrBefore = function (day, precision) {
        return this.date.isSameOrBefore(day.date, precision);
    };
    Day.prototype.isAfter = function (day, precision) {
        return this.date.isAfter(day.date, precision);
    };
    Day.prototype.isSameOrAfter = function (day, precision) {
        return this.date.isSameOrAfter(day.date, precision);
    };
    Day.prototype.max = function (day) {
        return this.date.isAfter(day.date) ? this : day;
    };
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
    Day.prototype.withTime = function (hour, minute, second, millisecond) {
        if (hour === void 0) { hour = Constants.HOUR_MIN; }
        if (minute === void 0) { minute = Constants.MINUTE_MIN; }
        if (second === void 0) { second = Constants.SECOND_MIN; }
        if (millisecond === void 0) { millisecond = Constants.MILLIS_MIN; }
        return this.mutate(function (d) { return d.set({ hour: hour, minute: minute, second: second, millisecond: millisecond }); });
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
        return new Day(__WEBPACK_IMPORTED_MODULE_2_moment__());
    };
    Day.today = function () {
        return this.now().start();
    };
    Day.tomorrow = function () {
        return this.today().next();
    };
    Day.unix = function (millis) {
        return new Day(__WEBPACK_IMPORTED_MODULE_2_moment__(millis));
    };
    Day.parse = function (input) {
        return new Day(__WEBPACK_IMPORTED_MODULE_2_moment__(input));
    };
    Day.fromFormat = function (input, formats) {
        return new Day(__WEBPACK_IMPORTED_MODULE_2_moment__(input, formats));
    };
    Day.fromObject = function (input) {
        return new Day(__WEBPACK_IMPORTED_MODULE_2_moment__(input));
    };
    Day.fromDate = function (input) {
        return new Day(__WEBPACK_IMPORTED_MODULE_2_moment__(input));
    };
    Day.fromArray = function (input) {
        return new Day(__WEBPACK_IMPORTED_MODULE_2_moment__(input));
    };
    Day.create = function (year, month, date, hour, minute, second, millisecond) {
        if (date === void 0) { date = Constants.DAY_MIN; }
        if (hour === void 0) { hour = Constants.HOUR_MIN; }
        if (minute === void 0) { minute = Constants.MINUTE_MIN; }
        if (second === void 0) { second = Constants.SECOND_MIN; }
        if (millisecond === void 0) { millisecond = Constants.MILLIS_MIN; }
        return new Day(__WEBPACK_IMPORTED_MODULE_2_moment__({ year: year, month: month, date: date, hour: hour, minute: minute, second: second, millisecond: millisecond }));
    };
    Day.getWeekspanOfYear = function (date) {
        return Math.floor((date.dayOfYear() - 1) / Constants.DAYS_IN_WEEK);
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
    Day.getWeekspanOfMonth = function (date) {
        return Math.floor((date.date() - 1) / Constants.DAYS_IN_WEEK);
    };
    Day.getFullWeekOfMonth = function (date) {
        return Math.floor((date.date() - 1 - date.day() + Constants.DAYS_IN_WEEK) / Constants.DAYS_IN_WEEK);
    };
    Day.getWeekOfMonth = function (date) {
        var dom = date.date();
        var dow = date.day();
        var sundayDate = dom - dow;
        return Math.floor((sundayDate + Constants.WEEK_OF_MONTH_MINIMUM_WEEKDAY + 5) / Constants.DAYS_IN_WEEK);
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
    return Day;
}());


// CONCATENATED MODULE: ./src/Units.ts

var Units;
(function (Units) {
    Units[Units["DAY"] = 0] = "DAY";
    Units[Units["WEEK"] = 1] = "WEEK";
    Units[Units["MONTH"] = 2] = "MONTH";
    Units[Units["YEAR"] = 3] = "YEAR";
})(Units = Units || (Units = {}));

// CONCATENATED MODULE: ./src/DaySpan.ts




var DaySpan_DaySpan = (function () {
    function DaySpan(start, end) {
        this.start = start;
        this.end = end;
    }
    Object.defineProperty(DaySpan.prototype, "isPoint", {
        get: function () {
            return this.start.time === this.end.time;
        },
        enumerable: true,
        configurable: true
    });
    DaySpan.prototype.contains = function (day) {
        return day.time >= this.start.time && day.time <= this.end.time;
    };
    DaySpan.prototype.matchesDay = function (day) {
        return this.contains(day) || day.sameDay(this.start) || day.sameDay(this.end);
    };
    DaySpan.prototype.matchesWeek = function (day) {
        return this.contains(day) || day.sameWeek(this.start) || day.sameWeek(this.end);
    };
    DaySpan.prototype.matchesMonth = function (day) {
        return this.contains(day) || day.sameMonth(this.start) || day.sameMonth(this.end);
    };
    DaySpan.prototype.matchesYear = function (day) {
        return this.contains(day) || day.sameYear(this.start) || day.sameYear(this.end);
    };
    DaySpan.prototype.millis = function (op, absolute) {
        if (op === void 0) { op = Op.DOWN; }
        if (absolute === void 0) { absolute = true; }
        return this.start.millisBetween(this.end, op, absolute);
    };
    DaySpan.prototype.seconds = function (op, absolute) {
        if (op === void 0) { op = Op.DOWN; }
        if (absolute === void 0) { absolute = true; }
        return this.start.secondsBetween(this.end, op, absolute);
    };
    DaySpan.prototype.minutes = function (op, absolute) {
        if (op === void 0) { op = Op.DOWN; }
        if (absolute === void 0) { absolute = true; }
        return this.start.minutesBetween(this.end, op, absolute);
    };
    DaySpan.prototype.hours = function (op, absolute) {
        if (op === void 0) { op = Op.DOWN; }
        if (absolute === void 0) { absolute = true; }
        return this.start.hoursBetween(this.end, op, absolute);
    };
    DaySpan.prototype.days = function (op, absolute) {
        if (op === void 0) { op = Op.DOWN; }
        if (absolute === void 0) { absolute = true; }
        return this.start.daysBetween(this.end, op, absolute);
    };
    DaySpan.prototype.weeks = function (op, absolute) {
        if (op === void 0) { op = Op.DOWN; }
        if (absolute === void 0) { absolute = true; }
        return this.start.weeksBetween(this.end, op, absolute);
    };
    DaySpan.prototype.months = function (op, absolute) {
        if (op === void 0) { op = Op.DOWN; }
        if (absolute === void 0) { absolute = true; }
        return this.start.monthsBetween(this.end, op, absolute);
    };
    DaySpan.prototype.years = function (op, absolute) {
        if (op === void 0) { op = Op.DOWN; }
        if (absolute === void 0) { absolute = true; }
        return this.start.yearsBetween(this.end, op, absolute);
    };
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
    DaySpan.prototype.intersects = function (span) {
        return !(this.end.time < span.start.time ||
            this.start.time > span.end.time);
    };
    DaySpan.prototype.intersection = function (span) {
        var start = Math.max(this.start.time, span.start.time);
        var end = Math.min(this.end.time, span.end.time);
        return start >= end ? null : new DaySpan(Day_Day.unix(start), Day_Day.unix(end));
    };
    DaySpan.point = function (day) {
        return new DaySpan(day, day);
    };
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

// CONCATENATED MODULE: ./src/Schedule.ts





var Schedule_Schedule = (function () {
    function Schedule(input) {
        if (Functions.isDefined(input)) {
            this.set(input);
        }
    }
    Schedule.prototype.set = function (input) {
        Parse_Parse.schedule(input, this);
        return this;
    };
    Schedule.prototype.refreshHours = function () {
        var hours = [];
        for (var i = Constants.HOUR_MIN; i <= Constants.HOUR_MAX; i++) {
            if (this.hour(i)) {
                hours.push(i);
            }
        }
        hours.sort();
        this.hours = hours;
        return this;
    };
    Schedule.prototype.matchesSpan = function (day) {
        return (this.start === Constants.START_NONE || day.time >= this.start) &&
            (this.end === Constants.END_NONE || day.time < this.end + this.duration);
    };
    Schedule.prototype.matchesRange = function (start, end) {
        return (this.start === Constants.START_NONE || start.time <= this.start) &&
            (this.end === Constants.END_NONE || end.time < this.end + this.duration);
    };
    Schedule.prototype.isExcluded = function (day) {
        return !!this.exclude[day.dayIdentifier];
    };
    Schedule.prototype.isIncluded = function (day) {
        return !this.exclude[day.dayIdentifier];
    };
    Schedule.prototype.matchesDay = function (day) {
        return this.isIncluded(day) &&
            this.matchesSpan(day) &&
            this.dayOfWeek(day.dayOfWeek) &&
            this.dayOfMonth(day.dayOfMonth) &&
            this.dayOfYear(day.dayOfYear) &&
            this.year(day.year) &&
            this.month(day.month) &&
            this.week(day.week) &&
            this.weekOfYear(day.weekOfYear) &&
            this.weekspanOfYear(day.weekspanOfYear) &&
            this.fullWeekOfYear(day.fullWeekOfYear) &&
            this.weekOfMonth(day.weekOfMonth) &&
            this.weekspanOfMonth(day.weekspanOfMonth) &&
            this.fullWeekOfMonth(day.fullWeekOfMonth);
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
        var before = this.durationInDays();
        while (before >= 0) {
            if (this.matchesDay(day)) {
                return true;
            }
            day = day.prev();
            before--;
        }
        return false;
    };
    Schedule.prototype.durationInDays = function () {
        var lastHour = this.hours[this.hours.length - 1];
        var durationEnd = lastHour * Constants.MILLIS_IN_HOUR + this.duration;
        var durationPast = durationEnd - Constants.MILLIS_IN_DAY;
        return Math.max(0, Math.ceil(durationPast / Constants.MILLIS_IN_DAY));
    };
    Schedule.prototype.nextDay = function (day, lookAhead) {
        if (lookAhead === void 0) { lookAhead = 366; }
        for (var days = 0; days < lookAhead; days++) {
            day = day.next();
            if (this.matchesDay(day)) {
                return day;
            }
        }
        return null;
    };
    Schedule.prototype.prevDay = function (day, lookBack) {
        if (lookBack === void 0) { lookBack = 366; }
        for (var days = 0; days < lookBack; days++) {
            day = day.prev();
            if (this.matchesDay(day)) {
                return day;
            }
        }
        return null;
    };
    Schedule.prototype.matchesTime = function (day) {
        return this.matchesDay(day) &&
            this.hour(day.hour) &&
            day.minute === this.minute;
    };
    Schedule.prototype.isFullDay = function () {
        return !this.hour.input || this.duration === Constants.DURATION_NONE;
    };
    Schedule.prototype.getSpansOver = function (day) {
        var spans = [];
        var start = day.start();
        if (this.isFullDay()) {
            if (this.matchesDay(day)) {
                spans.push(DaySpan_DaySpan.point(start));
            }
        }
        else {
            var behind = this.durationInDays();
            while (behind >= 0) {
                if (this.matchesDay(day)) {
                    for (var _i = 0, _a = this.hours; _i < _a.length; _i++) {
                        var hour = _a[_i];
                        var hourStart = day.withTime(hour, this.minute);
                        var hourEnd = hourStart.relative(this.duration);
                        var hourSpan = new DaySpan_DaySpan(hourStart, hourEnd);
                        if (hourSpan.matchesDay(start)) {
                            spans.push(hourSpan);
                        }
                    }
                }
                day = day.prev();
                behind--;
            }
        }
        return spans;
    };
    Schedule.prototype.getSpanOver = function (day) {
        var start = day.start();
        if (this.isFullDay()) {
            return DaySpan_DaySpan.point(start);
        }
        else {
            var behind = this.durationInDays();
            while (behind >= 0) {
                if (this.matchesDay(day)) {
                    return DaySpan_DaySpan.point(day);
                }
                day = day.prev();
                behind--;
            }
        }
        return null;
    };
    Schedule.prototype.getSpansOn = function (day, check) {
        if (check === void 0) { check = false; }
        var spans = [];
        if (check && !this.matchesDay(day)) {
            return spans;
        }
        var start = day.start();
        if (this.isFullDay()) {
            spans.push(DaySpan_DaySpan.point(start));
        }
        else {
            for (var _i = 0, _a = this.hours; _i < _a.length; _i++) {
                var hour = _a[_i];
                var hourStart = day.withTime(hour, this.minute);
                var hourEnd = hourStart.relative(this.duration);
                var hourSpan = new DaySpan_DaySpan(hourStart, hourEnd);
                spans.push(hourSpan);
            }
        }
        return spans;
    };
    return Schedule;
}());


// CONCATENATED MODULE: ./src/Parse.ts





/**
 * The class which takes user input and parses it to specific structures.
 */
var Parse_Parse = (function () {
    function Parse() {
    }
    Parse.frequency = function (input, otherwiseEvery, otherwiseOffset) {
        if (otherwiseEvery === void 0) { otherwiseEvery = 1; }
        if (otherwiseOffset === void 0) { otherwiseOffset = 0; }
        var check = function (value) {
            return value % otherwiseEvery === otherwiseOffset;
        };
        if (Functions.isFrequencyValueEvery(input)) {
            var offset_1 = input.offset || 0;
            var every_1 = input.every;
            check = function (value) {
                return value % every_1 === offset_1;
            };
        }
        if (Functions.isFrequencyValueOneOf(input)) {
            var map_1 = {};
            for (var i = 0; i < input.length; i++) {
                map_1[input[i]] = true;
            }
            check = function (value) {
                return !!map_1[value];
            };
        }
        check.input = input;
        return check;
    };
    Parse.utc = function (input, otherwise) {
        if (Functions.isNumber(input)) {
            return input;
        }
        if (input instanceof Day_Day) {
            return input.time;
        }
        return otherwise;
    };
    Parse.day = function (input) {
        if (Functions.isNumber(input)) {
            return Day_Day.unix(input);
        }
        else if (Functions.isString(input)) {
            return Day_Day.parse(input);
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
    Parse.exclusions = function (input) {
        var exclusions = {};
        if (Functions.isArray(input)) {
            for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
                var dayIdentifier = input_1[_i];
                if (Functions.isNumber(dayIdentifier)) {
                    exclusions[dayIdentifier] = true;
                }
                else if (dayIdentifier instanceof Day_Day) {
                    exclusions[dayIdentifier.dayIdentifier] = true;
                }
            }
        }
        return exclusions;
    };
    Parse.schedule = function (input, out) {
        if (out === void 0) { out = new Schedule_Schedule(); }
        var on = this.day(input.on);
        if (on) {
            input.start = on.start();
            input.end = on.end(false);
            input.year = [on.year];
            input.month = [on.month];
            input.dayOfMonth = [on.dayOfMonth];
        }
        out.start = this.utc(input.start, Constants.START_NONE);
        out.end = this.utc(input.end, Constants.END_NONE);
        out.duration = Functions.coalesce(input.duration, Constants.DURATION_NONE);
        out.exclude = Functions.coalesce(input.exclude, []);
        out.dayOfWeek = this.frequency(input.dayOfWeek);
        out.dayOfMonth = this.frequency(input.dayOfMonth);
        out.dayOfYear = this.frequency(input.dayOfYear);
        out.month = this.frequency(input.month);
        out.week = this.frequency(input.week);
        out.weekOfYear = this.frequency(input.weekOfYear);
        out.weekspanOfYear = this.frequency(input.weekspanOfYear);
        out.fullWeekOfYear = this.frequency(input.fullWeekOfYear);
        out.weekOfMonth = this.frequency(input.weekOfMonth);
        out.weekspanOfMonth = this.frequency(input.weekspanOfMonth);
        out.fullWeekOfMonth = this.frequency(input.fullWeekOfMonth);
        out.year = this.frequency(input.year);
        out.hour = this.frequency(input.hour, Constants.HOURS_IN_DAY);
        out.minute = Functions.coalesce(input.minute, Constants.MINUTE_MIN);
        out.exclude = this.exclusions(input.exclude);
        out.refreshHours();
        return out;
    };
    Parse.calendarSchedule = function (input) {
        if (input.schedule instanceof Schedule_Schedule) {
            return input;
        }
        return {
            schedule: this.schedule(input.schedule),
            event: input.event
        };
    };
    Parse.cron = function (pattern, out) {
        if (out === void 0) { out = new Schedule_Schedule(); }
        return out;
    };
    return Parse;
}());


// CONCATENATED MODULE: ./src/Calendar.ts

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






var CalendarDay = (function (_super) {
    __extends(CalendarDay, _super);
    function CalendarDay() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.currentDay = false;
        _this.currentWeek = false;
        _this.currentMonth = false;
        _this.currentYear = false;
        _this.selectedDay = false;
        _this.selectedWeek = false;
        _this.selectedMonth = false;
        _this.selectedYear = false;
        _this.inCalendar = false;
        _this.events = [];
        return _this;
    }
    CalendarDay.prototype.updateCurrent = function (current) {
        this.currentDay = this.sameDay(current);
        this.currentWeek = this.sameWeek(current);
        this.currentMonth = this.sameMonth(current);
        this.currentYear = this.sameYear(current);
        return this;
    };
    CalendarDay.prototype.updateSelected = function (selected) {
        this.selectedDay = selected.matchesDay(this);
        this.selectedWeek = selected.matchesWeek(this);
        this.selectedMonth = selected.matchesMonth(this);
        this.selectedYear = selected.matchesYear(this);
        return this;
    };
    CalendarDay.prototype.clearSelected = function () {
        this.selectedDay = this.selectedWeek = this.selectedMonth = this.selectedYear = false;
        return this;
    };
    return CalendarDay;
}(Day_Day));

var CalendarEvent = (function () {
    function CalendarEvent(event, schedule, time, actualDay) {
        this.event = event;
        this.schedule = schedule;
        this.time = time;
        this.fullDay = time.isPoint;
        this.starting = time.start.sameDay(actualDay);
    }
    return CalendarEvent;
}());

var Calendar_Calendar = (function () {
    function Calendar(start, end, type, size, moveStart, moveEnd, input) {
        this.fill = false;
        this.minimumSize = 0;
        this.repeatCovers = true;
        this.listTimes = false;
        this.eventsOutside = false;
        this.selection = null;
        this.days = [];
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
    Calendar.prototype.withInput = function (input, refresh) {
        if (refresh === void 0) { refresh = true; }
        this.fill = Functions.coalesce(input.fill, this.fill);
        this.minimumSize = Functions.coalesce(input.minimumSize, this.minimumSize);
        this.repeatCovers = Functions.coalesce(input.repeatCovers, this.repeatCovers);
        this.listTimes = Functions.coalesce(input.listTimes, this.listTimes);
        this.eventsOutside = Functions.coalesce(input.eventsOutside, this.eventsOutside);
        if (Functions.isArray(input.schedules)) {
            this.removeSchedules();
            this.addSchedules(input.schedules, false, !refresh);
        }
        if (refresh) {
            this.refresh();
        }
        return this;
    };
    Calendar.prototype.withMinimumSize = function (minimumSize) {
        this.minimumSize = minimumSize;
        this.refresh();
        return this;
    };
    Calendar.prototype.withRepeatCovers = function (repeatCovers) {
        this.repeatCovers = repeatCovers;
        this.refreshEvents();
        return this;
    };
    Calendar.prototype.withListTimes = function (listTimes) {
        this.listTimes = listTimes;
        this.refreshEvents();
        return this;
    };
    Calendar.prototype.withEventsOutside = function (eventsOutside) {
        this.eventsOutside = eventsOutside;
        this.refreshEvents();
        return this;
    };
    Object.defineProperty(Calendar.prototype, "start", {
        get: function () {
            return this.span.start;
        },
        set: function (day) {
            this.span.start = day;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "end", {
        get: function () {
            return this.span.end;
        },
        set: function (day) {
            this.span.end = day;
        },
        enumerable: true,
        configurable: true
    });
    Calendar.prototype.summary = function (dayOfWeek, short, repeat, contextual, delimiter) {
        if (dayOfWeek === void 0) { dayOfWeek = true; }
        if (short === void 0) { short = false; }
        if (repeat === void 0) { repeat = false; }
        if (contextual === void 0) { contextual = true; }
        if (delimiter === void 0) { delimiter = ' - '; }
        return this.span.summary(this.type, dayOfWeek, short, repeat, contextual, delimiter);
    };
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
    Calendar.prototype.refresh = function (today) {
        if (today === void 0) { today = Day_Day.today(); }
        this.length = this.span.days(Op.UP, true);
        this.resetDays();
        this.refreshCurrent(today);
        this.refreshSelection();
        this.refreshEvents();
        return this;
    };
    Calendar.prototype.resetFilled = function () {
        this.filled.start = this.fill ? this.start.startOfWeek() : this.start;
        this.filled.end = this.fill ? this.end.endOfWeek() : this.end;
        return this;
    };
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
                day = new CalendarDay(current.date);
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
            days.splice(total, total - days.length);
        }
        return this;
    };
    Calendar.prototype.refreshCurrent = function (today) {
        if (today === void 0) { today = Day_Day.today(); }
        return this.iterateDays(function (d) {
            d.updateCurrent(today);
        });
    };
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
    Calendar.prototype.refreshEvents = function () {
        var _this = this;
        return this.iterateDays(function (d) {
            if (d.inCalendar || _this.eventsOutside) {
                d.events = _this.eventsForDay(d, _this.listTimes, _this.repeatCovers);
            }
        });
    };
    Calendar.prototype.iterateDays = function (iterator) {
        var days = this.days;
        for (var i = 0; i < days.length; i++) {
            iterator(days[i]);
        }
        return this;
    };
    Calendar.prototype.eventsForDay = function (day, getTimes, covers) {
        if (getTimes === void 0) { getTimes = true; }
        if (covers === void 0) { covers = true; }
        var events = [];
        for (var _i = 0, _a = this.schedules; _i < _a.length; _i++) {
            var entry = _a[_i];
            if ((covers && entry.schedule.coversDay(day)) || (!covers && entry.schedule.matchesDay(day))) {
                if (getTimes) {
                    var times = covers ?
                        entry.schedule.getSpansOver(day) :
                        entry.schedule.getSpansOn(day);
                    for (var _b = 0, times_1 = times; _b < times_1.length; _b++) {
                        var time = times_1[_b];
                        events.push(new CalendarEvent(entry.event, entry.schedule, time, day));
                    }
                }
                else {
                    var over = entry.schedule.getSpanOver(day);
                    if (over) {
                        events.push(new CalendarEvent(entry.event, entry.schedule, over, day));
                    }
                }
            }
        }
        return events;
    };
    Calendar.prototype.findSchedule = function (input) {
        for (var _i = 0, _a = this.schedules; _i < _a.length; _i++) {
            var schedule = _a[_i];
            if (schedule === input || schedule.schedule === input || schedule.event === input) {
                return schedule;
            }
        }
        return null;
    };
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
    Calendar.prototype.select = function (start, end) {
        this.selection = end ? new DaySpan_DaySpan(start, end) : DaySpan_DaySpan.point(start);
        this.refreshSelection();
        return this;
    };
    Calendar.prototype.unselect = function () {
        this.selection = null;
        this.refreshSelection();
        return this;
    };
    Calendar.prototype.move = function (jump) {
        if (jump === void 0) { jump = this.size; }
        this.start = this.moveStart(this.start, jump);
        this.end = this.moveEnd(this.end, jump);
        this.refresh();
        return this;
    };
    Calendar.prototype.next = function (jump) {
        if (jump === void 0) { jump = this.size; }
        return this.move(jump);
    };
    Calendar.prototype.prev = function (jump) {
        if (jump === void 0) { jump = this.size; }
        return this.move(-jump);
    };
    Calendar.days = function (days, around, focus, input) {
        if (days === void 0) { days = 1; }
        if (around === void 0) { around = Day_Day.today(); }
        if (focus === void 0) { focus = 0.4999; }
        var start = around.start().relativeDays(-Math.floor(days * focus));
        var end = start.relativeDays(days - 1).end();
        var mover = function (day, amount) { return day.relativeDays(amount); };
        return new Calendar(start, end, Units.DAY, days, mover, mover, input);
    };
    Calendar.weeks = function (weeks, around, focus, input) {
        if (weeks === void 0) { weeks = 1; }
        if (around === void 0) { around = Day_Day.today(); }
        if (focus === void 0) { focus = 0.4999; }
        var start = around.start().startOfWeek().relativeWeeks(-Math.floor(weeks * focus));
        var end = start.relativeWeeks(weeks - 1).endOfWeek();
        var mover = function (day, amount) { return day.relativeWeeks(amount); };
        return new Calendar(start, end, Units.WEEK, weeks, mover, mover, input);
    };
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
    Calendar.years = function (years, around, focus, input) {
        if (years === void 0) { years = 1; }
        if (around === void 0) { around = Day_Day.today(); }
        if (focus === void 0) { focus = 0.4999; }
        if (input === void 0) { input = { fill: true }; }
        var start = around.start().startOfMonth().relativeMonths(-Math.floor(years * focus));
        var end = start.relativeMonths(years - 1).endOfYear();
        var mover = function (day, amount) { return day.relativeYears(amount); };
        return new Calendar(start, end, Units.YEAR, years, mover, mover, input);
    };
    return Calendar;
}());


// CONCATENATED MODULE: ./src/Duration.ts


var Duration_Duration = (function () {
    function Duration() {
    }
    Duration.millis = function (x) {
        return x;
    };
    Duration.seconds = function (x) {
        return x * Constants.MILLIS_IN_SECOND;
    };
    Duration.minutes = function (x) {
        return x * Constants.MILLIS_IN_MINUTE;
    };
    Duration.hours = function (x) {
        return x * Constants.MILLIS_IN_HOUR;
    };
    Duration.days = function (x) {
        return x * Constants.MILLIS_IN_DAY;
    };
    Duration.weeks = function (x) {
        return x * Constants.MILLIS_IN_WEEK;
    };
    return Duration;
}());


// CONCATENATED MODULE: ./src/Month.ts

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
    return Month;
}());


// CONCATENATED MODULE: ./src/Suffix.ts

var Suffix = (function () {
    function Suffix() {
    }
    Object.defineProperty(Suffix, "CACHE", {
        get: function () {
            if (!this._CACHE) {
                this._CACHE = [];
                for (var i = 0; i < this._CACHE_SIZE; i++) {
                    this._CACHE[i] = this.determine(i);
                }
            }
            return this._CACHE;
        },
        enumerable: true,
        configurable: true
    });
    Suffix.determine = function (value) {
        return value >= 11 && value <= 13 ? 'th' : this.MAP[value % this.MAP.length];
    };
    Suffix.get = function (value, append) {
        if (append === void 0) { append = false; }
        var suffix = this.determine(value);
        return append ? value + suffix : suffix;
    };
    Suffix.MAP = [
        'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'
    ];
    Suffix._CACHE_SIZE = 366;
    return Suffix;
}());


// CONCATENATED MODULE: ./src/Weekday.ts

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
    return Weekday;
}());


// CONCATENATED MODULE: ./src/index.ts
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "CalendarDay", function() { return CalendarDay; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "CalendarEvent", function() { return CalendarEvent; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Calendar", function() { return Calendar_Calendar; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Constants", function() { return Constants; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Day", function() { return Day_Day; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "DaySpan", function() { return DaySpan_DaySpan; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Duration", function() { return Duration_Duration; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Functions", function() { return Functions; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Month", function() { return Month; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Op", function() { return Op; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "operate", function() { return operate; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Parse", function() { return Parse_Parse; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Schedule", function() { return Schedule_Schedule; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Suffix", function() { return Suffix; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Units", function() { return Units; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Weekday", function() { return Weekday; });
















/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=dayspan.js.map