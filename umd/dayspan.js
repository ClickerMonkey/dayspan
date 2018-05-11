(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Dayspan", [], factory);
	else if(typeof exports === 'object')
		exports["Dayspan"] = factory();
	else
		root["Dayspan"] = factory();
})(this, function() {
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


// CONCATENATED MODULE: ./src/Day.ts


var Day_Day = (function () {
    function Day(date) {
        this.date = date;
        this.time = date.getTime();
        this.timeless = Math.floor(this.time / Constants.MILLIS_IN_DAY);
        this.hour = date.getHours();
        this.minute = date.getMinutes();
        this.dayOfWeek = date.getDay();
        this.dayOfMonth = date.getDate();
        this.dayOfYear = Day.getDayOfYear(date);
        this.month = date.getMonth();
        this.weekOfYear = Day.getWeekOfYear(date);
        this.weekOfMonth = Day.getWeekOfMonth(date);
        this.year = date.getFullYear();
        this.seconds = date.getSeconds();
        this.millis = date.getMilliseconds();
    }
    // Same
    Day.prototype.sameDay = function (day) {
        return this.year === day.year && this.month === day.month && this.dayOfMonth === day.dayOfMonth;
    };
    Day.prototype.sameMonth = function (day) {
        return this.year === day.year && this.month === day.month;
    };
    Day.prototype.sameWeek = function (day) {
        return this.year === day.year && this.weekOfYear === day.weekOfYear;
    };
    Day.prototype.sameYear = function (day) {
        return this.year === day.year;
    };
    Day.prototype.sameHour = function (day) {
        return this.sameDay(day) && this.hour === day.hour;
    };
    Day.prototype.sameMinute = function (day) {
        return this.sameDay(day) && this.hour === day.hour && this.minute === day.minute;
    };
    // Between
    Day.prototype.timeBetween = function (day, unitMillis, floor, partial, absolute, round) {
        if (partial === void 0) { partial = true; }
        if (absolute === void 0) { absolute = true; }
        if (round === void 0) { round = true; }
        var start = partial ? floor(this) : this;
        var end = partial ? floor(day) : day;
        var between = (end.time - start.time) / unitMillis;
        if (absolute && between < 0) {
            between = -between;
        }
        if (round) {
            if (between < 0) {
                between = Math.ceil(between);
            }
            else {
                between = Math.floor(between);
            }
        }
        return between;
    };
    Day.prototype.millisBetween = function (day, absolute) {
        if (absolute === void 0) { absolute = true; }
        return this.timeBetween(day, 1, function (d) { return d; }, false, absolute, false);
    };
    Day.prototype.daysBetween = function (day, partialDays, absolute, round) {
        if (partialDays === void 0) { partialDays = true; }
        if (absolute === void 0) { absolute = true; }
        if (round === void 0) { round = true; }
        return this.timeBetween(day, Constants.MILLIS_IN_DAY, function (d) { return d.start(); }, partialDays, absolute, round);
    };
    Day.prototype.weeksBetween = function (day, partialWeeks, absolute, round) {
        if (partialWeeks === void 0) { partialWeeks = true; }
        if (absolute === void 0) { absolute = true; }
        if (round === void 0) { round = true; }
        return this.timeBetween(day, Constants.MILLIS_IN_WEEK, function (d) { return d.startOfWeek(); }, partialWeeks, absolute, round);
    };
    Day.prototype.hoursBetween = function (day, partialHours, absolute, round) {
        if (partialHours === void 0) { partialHours = true; }
        if (absolute === void 0) { absolute = true; }
        if (round === void 0) { round = true; }
        return this.timeBetween(day, Constants.MILLIS_IN_HOUR, function (d) { return d.startOfHour(); }, partialHours, absolute, round);
    };
    Day.prototype.isBetween = function (start, end, inclusive) {
        if (inclusive === void 0) { inclusive = false; }
        return this.time >= start.time && ((inclusive && this.time <= end.time) ||
            (!inclusive && this.time < end.time));
    };
    Day.prototype.getDate = function () {
        return new Date(this.time);
    };
    Day.prototype.relativeTimezoneOffset = function (offset) {
        if (offset === void 0) { offset = 1; }
        return this.mutate(function (d) {
            d.setTime(d.getTime() + d.getTimezoneOffset() * Constants.MILLIS_IN_MINUTE);
        });
    };
    Day.prototype.mutate = function (mutator) {
        var d = this.getDate();
        mutator(d);
        return new Day(d);
    };
    Day.prototype.relative = function (millis) {
        return this.mutate(function (d) {
            d.setTime(d.getTime() + millis);
        });
    };
    // Days
    Day.prototype.relativeDays = function (days) {
        return this.relative(days * Constants.MILLIS_IN_DAY);
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
        return this.mutate(function (d) {
            d.setDate(day);
        });
    };
    Day.prototype.withDayOfWeek = function (dayOfWeek) {
        return this.relativeDays(dayOfWeek - this.dayOfWeek);
    };
    Day.prototype.withDayOfYear = function (dayOfYear) {
        return this.relativeDays(dayOfYear - this.dayOfYear);
    };
    // Month
    Day.prototype.withMonth = function (month) {
        return this.mutate(function (d) {
            d.setMonth(month);
        });
    };
    Day.prototype.relativeMonths = function (months) {
        return this.withMonth(this.month + months);
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
    Day.prototype.withWeek = function (week) {
        var _this = this;
        return this.mutate(function (d) {
            d.setDate((week - _this.weekOfYear) * Constants.DAYS_IN_WEEK);
        });
    };
    Day.prototype.relativeWeeks = function (weeks) {
        return this.relative(weeks * Constants.MILLIS_IN_WEEK);
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
        return this.mutate(function (d) {
            d.setFullYear(year);
        });
    };
    Day.prototype.relativeYears = function (years) {
        return this.withYear(this.year + years);
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
        return this.mutate(function (d) {
            d.setHours(hour);
        });
    };
    Day.prototype.relativeHours = function (hours) {
        return this.withHour(this.hour + hours);
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
    Day.prototype.withTime = function (hour, minute, second, millis) {
        if (hour === void 0) { hour = Constants.HOUR_MIN; }
        if (minute === void 0) { minute = Constants.MINUTE_MIN; }
        if (second === void 0) { second = Constants.SECOND_MIN; }
        if (millis === void 0) { millis = Constants.MILLIS_MIN; }
        return this.mutate(function (d) {
            d.setHours(hour, minute, second, millis);
        });
    };
    // Start & End
    // Time
    Day.prototype.start = function () {
        return this.withTime();
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
            this.withTime(Constants.HOUR_MAX, Constants.MINUTE_MAX, Constants.SECOND_MAX, Constants.MINUTE_MAX) :
            this.next().start();
    };
    Day.prototype.isEnd = function () {
        return this.hour === Constants.HOUR_MAX &&
            this.minute === Constants.MINUTE_MAX &&
            this.seconds === Constants.SECOND_MAX &&
            this.millis === Constants.MILLIS_MAX;
    };
    // Hour
    Day.prototype.startOfHour = function () {
        return this.withTime(this.hour);
    };
    Day.prototype.isStartOfHour = function () {
        return this.minute === Constants.MINUTE_MIN &&
            this.seconds === Constants.SECOND_MIN &&
            this.millis === Constants.MILLIS_MIN;
    };
    Day.prototype.endOfHour = function (inclusive) {
        if (inclusive === void 0) { inclusive = true; }
        return inclusive ?
            this.withTime(this.hour, Constants.MINUTE_MAX, Constants.SECOND_MAX, Constants.MINUTE_MAX) :
            this.withTime(this.hour + 1);
    };
    Day.prototype.isEndOfHour = function () {
        return this.minute === Constants.MINUTE_MAX &&
            this.seconds === Constants.SECOND_MAX &&
            this.millis === Constants.MILLIS_MAX;
    };
    // Week
    Day.prototype.startOfWeek = function () {
        return this.relativeDays(-this.dayOfWeek);
    };
    Day.prototype.isStartOfWeek = function () {
        return this.dayOfWeek === Constants.WEEKDAY_MIN;
    };
    Day.prototype.endOfWeek = function (inclusive) {
        if (inclusive === void 0) { inclusive = true; }
        return inclusive ?
            this.relativeDays(Constants.DAYS_IN_WEEK - this.dayOfWeek - 1) :
            this.startOfWeek().nextWeek();
    };
    Day.prototype.isEndOfWeek = function () {
        return this.dayOfWeek === Constants.WEEKDAY_MAX;
    };
    // Month
    Day.prototype.startOfMonth = function () {
        return this.withDayOfMonth(Constants.DAY_MIN);
    };
    Day.prototype.isStartOfMonth = function () {
        return this.dayOfMonth === Constants.DAY_MIN;
    };
    Day.prototype.endOfMonth = function (inclusive) {
        if (inclusive === void 0) { inclusive = true; }
        return inclusive ?
            this.withDayOfMonth(this.daysInMonth()) :
            this.startOfMonth().nextMonth();
    };
    Day.prototype.isEndOfMonth = function () {
        return this.dayOfMonth === this.daysInMonth();
    };
    // Year
    Day.prototype.startOfYear = function () {
        return this.mutate(function (d) {
            d.setMonth(Constants.MONTH_MIN, Constants.DAY_MIN);
        });
    };
    Day.prototype.isStartOfYear = function () {
        return this.month === Constants.MONTH_MIN && this.dayOfMonth === Constants.DAY_MIN;
    };
    Day.prototype.endOfYear = function (inclusive) {
        if (inclusive === void 0) { inclusive = true; }
        return this.mutate(function (d) {
            d.setMonth(Constants.MONTHS_IN_YEAR, inclusive ? 0 : 1);
        });
    };
    Day.prototype.isEndOfYear = function () {
        return this.month === Constants.MONTH_MAX && this.dayOfMonth === Constants.DAY_MAX;
    };
    // Days In X
    Day.prototype.daysInMonth = function () {
        var d = this.getDate();
        d.setMonth(d.getMonth() + 1, 0);
        return d.getDate();
    };
    Day.prototype.daysInYear = function () {
        return Day.getDayOfYear(this.endOfYear().date);
    };
    Day.now = function () {
        return new Day(new Date());
    };
    Day.today = function () {
        return this.now().start();
    };
    Day.tomorrow = function () {
        return this.today().next();
    };
    Day.utc = function (millis) {
        return new Day(new Date(millis));
    };
    Day.create = function (year, month, date, hour, minute, second, millis) {
        if (date === void 0) { date = Constants.DAY_MIN; }
        if (hour === void 0) { hour = Constants.HOUR_MIN; }
        if (minute === void 0) { minute = Constants.MINUTE_MIN; }
        if (second === void 0) { second = Constants.SECOND_MIN; }
        if (millis === void 0) { millis = Constants.MILLIS_MIN; }
        return new Day(new Date(year, month, date, hour, minute, second, millis));
    };
    Day.getWeekOfYear = function (date) {
        var d = new Date(date.getTime());
        d.setHours(0, 0, 0);
        d.setDate(d.getDate() + 4 - (d.getDay() || Constants.DAYS_IN_WEEK));
        var firstOfYear = new Date(d.getFullYear(), 0, 1);
        return Math.ceil((((d.getTime() - firstOfYear.getTime()) / Constants.MILLIS_IN_DAY) + 1) / Constants.DAYS_IN_WEEK);
    };
    Day.getWeekOfMonth = function (date) {
        var dom = date.getDate();
        var dow = date.getDay();
        var sundayDate = dom - dow;
        return Math.floor((sundayDate + Constants.WEEK_OF_MONTH_MINIMUM_WEEKDAY + 5) / Constants.DAYS_IN_WEEK);
    };
    Day.getDayOfYear = function (date) {
        var start = new Date(date.getFullYear(), 0, 0);
        var diff = date.getTime() - start.getTime();
        var day = Math.floor(diff / Constants.MILLIS_IN_DAY);
        return day;
    };
    return Day;
}());


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
        return day.time >= this.start.time && day.time < this.end.time;
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
    DaySpan.prototype.days = function (partialDays, absolute, round) {
        if (partialDays === void 0) { partialDays = true; }
        if (absolute === void 0) { absolute = true; }
        if (round === void 0) { round = true; }
        return this.start.daysBetween(this.end, partialDays, absolute, round);
    };
    DaySpan.prototype.hours = function (partialHours, absolute, round) {
        if (partialHours === void 0) { partialHours = true; }
        if (absolute === void 0) { absolute = true; }
        if (round === void 0) { round = true; }
        return this.start.hoursBetween(this.end, partialHours, absolute, round);
    };
    DaySpan.prototype.weeks = function (partialWeeks, absolute, round) {
        if (partialWeeks === void 0) { partialWeeks = true; }
        if (absolute === void 0) { absolute = true; }
        if (round === void 0) { round = true; }
        return this.start.weeksBetween(this.end, partialWeeks, absolute, round);
    };
    DaySpan.prototype.intersects = function (span) {
        return !(this.end.time < span.start.time ||
            this.start.time >= span.end.time);
    };
    DaySpan.prototype.intersection = function (span) {
        var start = Math.max(this.start.time, span.start.time);
        var end = Math.min(this.end.time, span.end.time);
        return start >= end ? null : new DaySpan(Day_Day.utc(start), Day_Day.utc(end));
    };
    DaySpan.point = function (day) {
        return new DaySpan(day, day);
    };
    return DaySpan;
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



var CalendarType;
(function (CalendarType) {
    CalendarType[CalendarType["DAY"] = 0] = "DAY";
    CalendarType[CalendarType["WEEK"] = 1] = "WEEK";
    CalendarType[CalendarType["MONTH"] = 2] = "MONTH";
    CalendarType[CalendarType["YEAR"] = 3] = "YEAR";
})(CalendarType = CalendarType || (CalendarType = {}));
var CalendarDay = (function (_super) {
    __extends(CalendarDay, _super);
    function CalendarDay() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
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
        this.covers = time.start.sameDay(actualDay);
    }
    return CalendarEvent;
}());

var Calendar_Calendar = (function () {
    function Calendar(start, end, type, size, mover, fill) {
        this.repeatCovers = true;
        this.listTimes = false;
        this.eventsOutside = false;
        this.selection = null;
        this.days = [];
        this.schedules = [];
        this.span = new DaySpan_DaySpan(start, end);
        this.type = type;
        this.size = size;
        this.mover = mover;
        this.fill = fill;
        this.refresh();
    }
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
    Calendar.prototype.fillStart = function () {
        return this.fill ? this.start.startOfWeek() : this.start;
    };
    Calendar.prototype.fillEnd = function () {
        return this.fill ? this.end.endOfWeek(false) : this.end;
    };
    Calendar.prototype.refresh = function (today) {
        if (today === void 0) { today = Day_Day.today(); }
        this.length = this.span.days();
        this.resetDays();
        this.refreshCurrent(today);
        this.refreshSelection();
        this.refreshEvents();
        return this;
    };
    Calendar.prototype.resetDays = function () {
        var days = this.days;
        var start = this.fillStart();
        var end = this.fillEnd();
        var total = start.daysBetween(end);
        if (days.length !== total) {
            days.length = total;
        }
        var time = start.time;
        for (var i = 0; i < total; i++) {
            var day = days[i];
            if (!day || day.time !== time) {
                day = new CalendarDay(new Date(time));
                days[i] = day;
            }
            day.inCalendar = this.span.contains(day);
            time += Constants.MILLIS_IN_DAY;
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
        var allDay = DaySpan_DaySpan.point(day);
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
                    events.push(new CalendarEvent(entry.event, entry.schedule, allDay, day));
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
        if (!allowDuplicates) {
            var existing = this.findSchedule(schedule);
            if (existing) {
                return this;
            }
        }
        this.schedules.push(schedule);
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
        this.start = this.mover(this.start, jump);
        this.end = this.mover(this.end, jump);
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
    Calendar.days = function (days, around, focus) {
        if (days === void 0) { days = 1; }
        if (around === void 0) { around = Day_Day.today(); }
        if (focus === void 0) { focus = 0.4999; }
        var start = around.start().relativeDays(-Math.floor(days * focus));
        var end = start.relativeDays(days);
        var mover = function (day, amount) { return day.relativeDays(amount); };
        return new Calendar(start, end, CalendarType.DAY, days, mover, false);
    };
    Calendar.weeks = function (weeks, around, focus) {
        if (weeks === void 0) { weeks = 1; }
        if (around === void 0) { around = Day_Day.today(); }
        if (focus === void 0) { focus = 0.4999; }
        var start = around.start().startOfWeek().relativeWeeks(-Math.floor(weeks * focus));
        var end = start.relativeWeeks(weeks);
        var mover = function (day, amount) { return day.relativeWeeks(amount); };
        return new Calendar(start, end, CalendarType.WEEK, weeks, mover, false);
    };
    Calendar.months = function (months, around, focus, fill) {
        if (months === void 0) { months = 1; }
        if (around === void 0) { around = Day_Day.today(); }
        if (focus === void 0) { focus = 0.4999; }
        if (fill === void 0) { fill = true; }
        var start = around.start().startOfMonth().relativeMonths(-Math.floor(months * focus));
        var end = start.relativeMonths(months);
        var mover = function (day, amount) { return day.relativeMonths(amount); };
        return new Calendar(start, end, CalendarType.MONTH, months, mover, fill);
    };
    Calendar.years = function (years, around, focus, fill) {
        if (years === void 0) { years = 1; }
        if (around === void 0) { around = Day_Day.today(); }
        if (focus === void 0) { focus = 0.4999; }
        if (fill === void 0) { fill = true; }
        var start = around.start().startOfMonth().relativeMonths(-Math.floor(years * focus));
        var end = start.relativeMonths(years);
        var mover = function (day, amount) { return day.relativeYears(amount); };
        return new Calendar(start, end, CalendarType.YEAR, years, mover, fill);
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
    Month.NAMES = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];
    Month.CODES = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return Month;
}());


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
    Schedule.prototype.matchesDay = function (day) {
        return this.matchesSpan(day) &&
            this.dayOfWeek(day.dayOfWeek) &&
            this.dayOfMonth(day.dayOfMonth) &&
            this.dayOfYear(day.dayOfYear) &&
            this.month(day.month) &&
            this.weekOfYear(day.weekOfYear) &&
            this.weekOfMonth(day.weekOfMonth) &&
            this.year(day.year);
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
    Parse.schedule = function (input, out) {
        if (out === void 0) { out = new Schedule_Schedule(); }
        out.start = Functions.coalesce(input.start, Constants.START_NONE);
        out.end = Functions.coalesce(input.end, Constants.END_NONE);
        out.duration = Functions.coalesce(input.duration, Constants.DURATION_NONE);
        out.exclude = Functions.coalesce(input.exclude, []);
        out.dayOfWeek = this.frequency(input.dayOfWeek);
        out.dayOfMonth = this.frequency(input.dayOfMonth);
        out.dayOfYear = this.frequency(input.dayOfYear);
        out.month = this.frequency(input.month);
        out.weekOfYear = this.frequency(input.weekOfYear);
        out.weekOfMonth = this.frequency(input.weekOfMonth);
        out.year = this.frequency(input.year);
        out.hour = this.frequency(input.hour, Constants.HOURS_IN_DAY);
        out.minute = Functions.coalesce(input.minute, Constants.MINUTE_MIN);
        out.refreshHours();
        return out;
    };
    return Parse;
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
    Weekday.NAMES = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ];
    Weekday.CODES = [
        'Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'
    ];
    return Weekday;
}());


// CONCATENATED MODULE: ./src/index.ts
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "CalendarType", function() { return CalendarType; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "CalendarDay", function() { return CalendarDay; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "CalendarEvent", function() { return CalendarEvent; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Calendar", function() { return Calendar_Calendar; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Constants", function() { return Constants; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Day", function() { return Day_Day; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "DaySpan", function() { return DaySpan_DaySpan; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Duration", function() { return Duration_Duration; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Functions", function() { return Functions; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Month", function() { return Month; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Parse", function() { return Parse_Parse; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Schedule", function() { return Schedule_Schedule; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Suffix", function() { return Suffix; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Weekday", function() { return Weekday; });














/***/ })
/******/ ]);
});
//# sourceMappingURL=dayspan.js.map