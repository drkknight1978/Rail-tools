/**
 * UK Railway Calendar API
 *
 * Implements Network Rail week numbering system:
 * - Railway year runs from 1 April to 31 March
 * - Rail weeks run Saturday to Friday
 * - Week 1 starts on the first Saturday on or after 1 April
 * - Weeks numbered consecutively (typically 52, occasionally 53)
 * - 4-week periods for planning (Period 1 = Weeks 1-4, etc.)
 */

const RailwayCalendarAPI = (function() {
    'use strict';

    /**
     * UK Bank Holidays
     * Generated for multiple years - this should be updated periodically
     */
    const UK_BANK_HOLIDAYS = {
        2023: [
            { date: '2023-01-02', name: 'New Year\'s Day (substitute)' },
            { date: '2023-04-07', name: 'Good Friday' },
            { date: '2023-04-10', name: 'Easter Monday' },
            { date: '2023-05-01', name: 'Early May Bank Holiday' },
            { date: '2023-05-08', name: 'Coronation Bank Holiday' },
            { date: '2023-05-29', name: 'Spring Bank Holiday' },
            { date: '2023-08-28', name: 'Summer Bank Holiday' },
            { date: '2023-12-25', name: 'Christmas Day' },
            { date: '2023-12-26', name: 'Boxing Day' }
        ],
        2024: [
            { date: '2024-01-01', name: 'New Year\'s Day' },
            { date: '2024-03-29', name: 'Good Friday' },
            { date: '2024-04-01', name: 'Easter Monday' },
            { date: '2024-05-06', name: 'Early May Bank Holiday' },
            { date: '2024-05-27', name: 'Spring Bank Holiday' },
            { date: '2024-08-26', name: 'Summer Bank Holiday' },
            { date: '2024-12-25', name: 'Christmas Day' },
            { date: '2024-12-26', name: 'Boxing Day' }
        ],
        2025: [
            { date: '2025-01-01', name: 'New Year\'s Day' },
            { date: '2025-04-18', name: 'Good Friday' },
            { date: '2025-04-21', name: 'Easter Monday' },
            { date: '2025-05-05', name: 'Early May Bank Holiday' },
            { date: '2025-05-26', name: 'Spring Bank Holiday' },
            { date: '2025-08-25', name: 'Summer Bank Holiday' },
            { date: '2025-12-25', name: 'Christmas Day' },
            { date: '2025-12-26', name: 'Boxing Day' }
        ],
        2026: [
            { date: '2026-01-01', name: 'New Year\'s Day' },
            { date: '2026-04-03', name: 'Good Friday' },
            { date: '2026-04-06', name: 'Easter Monday' },
            { date: '2026-05-04', name: 'Early May Bank Holiday' },
            { date: '2026-05-25', name: 'Spring Bank Holiday' },
            { date: '2026-08-31', name: 'Summer Bank Holiday' },
            { date: '2026-12-25', name: 'Christmas Day' },
            { date: '2026-12-28', name: 'Boxing Day (substitute)' }
        ],
        2027: [
            { date: '2027-01-01', name: 'New Year\'s Day' },
            { date: '2027-03-26', name: 'Good Friday' },
            { date: '2027-03-29', name: 'Easter Monday' },
            { date: '2027-05-03', name: 'Early May Bank Holiday' },
            { date: '2027-05-31', name: 'Spring Bank Holiday' },
            { date: '2027-08-30', name: 'Summer Bank Holiday' },
            { date: '2027-12-27', name: 'Christmas Day (substitute)' },
            { date: '2027-12-28', name: 'Boxing Day (substitute)' }
        ]
    };

    /**
     * Get the railway year start date for a given date
     * Railway year starts on 1 April
     *
     * @param {Date} date - The date to find the railway year for
     * @returns {Date} The start date of the railway year (1 April)
     */
    function getRailwayYearStart(date) {
        const year = date.getFullYear();
        const april1st = new Date(year, 3, 1); // Month 3 = April (0-indexed)

        // If date is before April 1st, railway year started previous year
        if (date < april1st) {
            return new Date(year - 1, 3, 1);
        }

        return april1st;
    }

    /**
     * Get the railway year end date
     * Railway year ends on 31 March (last day before next April 1st)
     *
     * @param {Date} yearStart - The start date of the railway year
     * @returns {Date} The end date of the railway year (31 March)
     */
    function getRailwayYearEnd(yearStart) {
        const year = yearStart.getFullYear();
        return new Date(year + 1, 2, 31); // Month 2 = March, day 31
    }

    /**
     * Find the first Saturday on or after a given date
     *
     * @param {Date} date - The starting date
     * @returns {Date} The first Saturday on or after the date
     */
    function getFirstSaturdayOnOrAfter(date) {
        const result = new Date(date);
        const dayOfWeek = result.getDay();

        // Saturday = 6
        // If already Saturday, return as-is
        if (dayOfWeek === 6) {
            return result;
        }

        // Calculate days until next Saturday
        // Sunday (0) -> 6 days, Monday (1) -> 5 days, ..., Friday (5) -> 1 day
        const daysUntilSaturday = (6 - dayOfWeek + 7) % 7;
        result.setDate(result.getDate() + daysUntilSaturday);

        return result;
    }

    /**
     * Get the start date of rail week 1 for a railway year
     * Week 1 starts on the first Saturday on or after 1 April
     *
     * @param {number} railwayYear - The railway year
     * @returns {Date} The start date of week 1 (a Saturday)
     */
    function getWeek1Start(railwayYear) {
        const april1st = new Date(railwayYear, 3, 1);
        return getFirstSaturdayOnOrAfter(april1st);
    }

    /**
     * Calculate the number of weeks in a railway year
     * Usually 52, occasionally 53
     *
     * @param {number} railwayYear - The railway year
     * @returns {number} Number of weeks in the railway year
     */
    function getWeeksInRailwayYear(railwayYear) {
        const week1Start = getWeek1Start(railwayYear);
        const nextYearWeek1Start = getWeek1Start(railwayYear + 1);

        // Calculate days between week 1 starts
        const daysBetween = Math.round((nextYearWeek1Start - week1Start) / (1000 * 60 * 60 * 24));

        // Calculate number of complete weeks
        const weeks = Math.floor(daysBetween / 7);

        return weeks;
    }

    /**
     * Get railway week information for a given date
     *
     * @param {Date} date - The date to get information for
     * @returns {Object} Object containing week, period, railwayYear, dayOfWeek, etc.
     */
    function getRailwayWeekInfo(date) {
        const railwayYearStart = getRailwayYearStart(date);
        const railwayYear = railwayYearStart.getFullYear();
        const week1Start = getWeek1Start(railwayYear);

        // Calculate days since week 1 start
        const daysSinceWeek1 = Math.floor((date - week1Start) / (1000 * 60 * 60 * 24));

        // If date is before week 1 start, it's in the previous railway year
        if (daysSinceWeek1 < 0) {
            return getRailwayWeekInfo(new Date(railwayYear - 1, 11, 31)); // Dec 31 of previous year
        }

        // Calculate week number (1-based)
        const weekNumber = Math.floor(daysSinceWeek1 / 7) + 1;

        // Calculate period number (4 weeks per period)
        const periodNumber = Math.ceil(weekNumber / 4);

        // Calculate day of week (0 = Saturday, 6 = Friday)
        const dayOfWeek = daysSinceWeek1 % 7;

        return {
            week: weekNumber,
            period: periodNumber,
            railwayYear: railwayYear,
            dayOfWeek: dayOfWeek,
            weekStart: getWeekStartDate(railwayYear, weekNumber),
            weekEnd: getWeekEndDate(railwayYear, weekNumber)
        };
    }

    /**
     * Get the start date (Saturday) of a specific rail week
     *
     * @param {number} railwayYear - The railway year
     * @param {number} weekNumber - The week number (1-52/53)
     * @returns {Date} The start date of the week (Saturday)
     */
    function getWeekStartDate(railwayYear, weekNumber) {
        const week1Start = getWeek1Start(railwayYear);
        const startDate = new Date(week1Start);
        startDate.setDate(startDate.getDate() + (weekNumber - 1) * 7);
        return startDate;
    }

    /**
     * Get the end date (Friday) of a specific rail week
     *
     * @param {number} railwayYear - The railway year
     * @param {number} weekNumber - The week number (1-52/53)
     * @returns {Date} The end date of the week (Friday)
     */
    function getWeekEndDate(railwayYear, weekNumber) {
        const startDate = getWeekStartDate(railwayYear, weekNumber);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 6);
        return endDate;
    }

    /**
     * Get start and end dates for a specific rail week
     *
     * @param {number} railwayYear - The railway year
     * @param {number} weekNumber - The week number (1-52/53)
     * @returns {Object} Object with start and end dates
     */
    function getWeekStartEnd(railwayYear, weekNumber) {
        return {
            start: getWeekStartDate(railwayYear, weekNumber),
            end: getWeekEndDate(railwayYear, weekNumber)
        };
    }

    /**
     * Get start and end dates for a Network Rail period
     * Period ends are on Saturdays (which are also the start of the next week)
     *
     * @param {number} railwayYear - The railway year
     * @param {number} periodNumber - The period number (1-13)
     * @returns {Object} Object with start and end dates
     */
    function getPeriodStartEnd(railwayYear, periodNumber) {
        const startWeek = (periodNumber - 1) * 4 + 1;
        const endWeek = Math.min(periodNumber * 4, getWeeksInRailwayYear(railwayYear));

        return {
            start: getWeekStartDate(railwayYear, startWeek),
            end: getWeekEndDate(railwayYear, endWeek),
            startWeek: startWeek,
            endWeek: endWeek
        };
    }

    /**
     * Convert a Gregorian calendar date to railway calendar format
     *
     * @param {Date} date - The date to convert
     * @returns {Object} Railway calendar representation
     */
    function dateToRailwayCalendar(date) {
        const info = getRailwayWeekInfo(date);
        const dayNames = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

        return {
            railwayYear: info.railwayYear,
            week: info.week,
            period: info.period,
            dayOfWeek: info.dayOfWeek,
            dayName: dayNames[info.dayOfWeek],
            gregorianDate: new Date(date),
            formattedString: `Railway Year ${info.railwayYear}, Week ${info.week}, ${dayNames[info.dayOfWeek]}`
        };
    }

    /**
     * Get UK bank holiday for a specific date
     *
     * @param {Date} date - The date to check
     * @returns {string|null} Holiday name if it's a bank holiday, null otherwise
     */
    function getBankHoliday(date) {
        const year = date.getFullYear();
        const dateStr = date.toISOString().split('T')[0];

        if (!UK_BANK_HOLIDAYS[year]) {
            return null;
        }

        const holiday = UK_BANK_HOLIDAYS[year].find(h => h.date === dateStr);
        return holiday ? holiday.name : null;
    }

    /**
     * Get all bank holidays in a railway year
     *
     * @param {number} railwayYear - The railway year
     * @returns {Array} Array of bank holiday objects with date and railInfo
     */
    function getBankHolidaysInRailwayYear(railwayYear) {
        const yearStart = getRailwayYearStart(new Date(railwayYear, 3, 1));
        const yearEnd = getRailwayYearEnd(yearStart);

        const holidays = [];

        // Check both the railway year and the next year (since railway year spans calendar years)
        [railwayYear, railwayYear + 1].forEach(year => {
            if (UK_BANK_HOLIDAYS[year]) {
                UK_BANK_HOLIDAYS[year].forEach(holiday => {
                    const holidayDate = new Date(holiday.date);
                    if (holidayDate >= yearStart && holidayDate <= yearEnd) {
                        holidays.push({
                            date: holidayDate,
                            name: holiday.name,
                            railInfo: getRailwayWeekInfo(holidayDate)
                        });
                    }
                });
            }
        });

        return holidays.sort((a, b) => a.date - b.date);
    }

    /**
     * Check if a date falls on a weekend (Saturday or Sunday)
     *
     * @param {Date} date - The date to check
     * @returns {boolean} True if weekend
     */
    function isWeekend(date) {
        const day = date.getDay();
        return day === 0 || day === 6;
    }

    /**
     * Get period end dates for a railway year
     * Period ends are on Fridays (last day of week 4, 8, 12, etc.)
     *
     * @param {number} railwayYear - The railway year
     * @returns {Array} Array of period end dates
     */
    function getPeriodEndDates(railwayYear) {
        const totalWeeks = getWeeksInRailwayYear(railwayYear);
        const periodEndDates = [];

        for (let period = 1; period <= Math.ceil(totalWeeks / 4); period++) {
            const periodInfo = getPeriodStartEnd(railwayYear, period);
            periodEndDates.push({
                period: period,
                endDate: periodInfo.end,
                endWeek: periodInfo.endWeek
            });
        }

        return periodEndDates;
    }

    /**
     * Calculate the railway year for a given calendar year and check for 53-week years
     *
     * @param {number} year - The calendar year
     * @returns {Object} Information about the railway year
     */
    function getRailwayYearInfo(year) {
        const week1Start = getWeek1Start(year);
        const nextWeek1Start = getWeek1Start(year + 1);
        const yearEnd = getRailwayYearEnd(new Date(year, 3, 1));
        const totalWeeks = getWeeksInRailwayYear(year);

        return {
            railwayYear: year,
            startDate: new Date(year, 3, 1), // April 1st
            endDate: yearEnd,
            week1Start: week1Start,
            totalWeeks: totalWeeks,
            is53WeekYear: totalWeeks === 53,
            daysBeforeWeek1: Math.floor((week1Start - new Date(year, 3, 1)) / (1000 * 60 * 60 * 24))
        };
    }

    // Public API
    return {
        // Core functions
        getRailwayYearStart,
        getRailwayYearEnd,
        getRailwayWeekInfo,
        getWeekStartEnd,
        getPeriodStartEnd,
        getWeeksInRailwayYear,

        // Conversion functions
        dateToRailwayCalendar,

        // Bank holidays
        getBankHoliday,
        getBankHolidaysInRailwayYear,

        // Utility functions
        isWeekend,
        getPeriodEndDates,
        getRailwayYearInfo,

        // Direct access to internal functions for advanced use
        getWeek1Start,
        getFirstSaturdayOnOrAfter
    };
})();

// Export for Node.js if available (for testing)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RailwayCalendarAPI;
}
