import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  daysOfWeek,
  createDaysForCurrentMonth,
  createDaysForNextMonth,
  createDaysForPreviousMonth,
  isWeekendDay,
  getMonthDropdownOptions,
  getYearDropdownOptions
} from '../components/calendar_helper';
import styles from '../styles/Calendar.module.css'

Calendar.propTypes = {
  className: PropTypes.string,
  yearAndMonth: PropTypes.arrayOf(PropTypes.number).isRequired, // e.g. [2021, 6] for June 2021
  onYearAndMonthChange: PropTypes.func.isRequired,
  renderDay: PropTypes.func
};
export default function Calendar({
  className = '',
  yearAndMonth = [2021, 6],
  onYearAndMonthChange,
  renderDay = () => null
}: any) {
  const [year, month] = yearAndMonth;

  let currentMonthDays = createDaysForCurrentMonth(year, month);
  let previousMonthDays = createDaysForPreviousMonth(
    year,
    month,
    currentMonthDays
  );
  let nextMonthDays = createDaysForNextMonth(year, month, currentMonthDays);
  let calendarGridDayObjects = [
    ...previousMonthDays,
    ...currentMonthDays,
    ...nextMonthDays
  ];

  const handleMonthNavBackButtonClick = () => {
    let nextYear = year;
    let nextMonth = month - 1;
    if (nextMonth === 0) {
      nextMonth = 12;
      nextYear = year - 1;
    }
    onYearAndMonthChange([nextYear, nextMonth]);
  };

  const handleMonthNavForwardButtonClick = () => {
    let nextYear = year;
    let nextMonth = month + 1;
    if (nextMonth === 13) {
      nextMonth = 1;
      nextYear = year + 1;
    }
    onYearAndMonthChange([nextYear, nextMonth]);
  };

  const handleMonthSelect = (evt: any) => {
    let nextYear = year;
    let nextMonth = parseInt(evt.target.value, 10);
    onYearAndMonthChange([nextYear, nextMonth]);
  };

  const handleYearSelect = (evt: any) => {
    let nextMonth = month;
    let nextYear = parseInt(evt.target.value, 10);
    onYearAndMonthChange([nextYear, nextMonth]);
  };

  return (
    <div className={styles['calendar-root']}>
      <div className={styles['navigation-header']}>
        <div className={styles['month-nav-arrow-buttons']}>
          <button onClick={handleMonthNavBackButtonClick}> prev </button>
          <button onClick={handleMonthNavForwardButtonClick}>next</button>
        </div>
        <select
          className={styles['month-select']}
          value={month}
          onChange={handleMonthSelect}
        >
          {getMonthDropdownOptions().map(({ label, value }: any) => (
            <option value={value} key={value}>
              {label}
            </option>
          ))}
        </select>
        <select
          className={styles['year-select']}
          value={year}
          onChange={handleYearSelect}
        >
          {getYearDropdownOptions(year).map(({ label, value }: any) => (
            <option value={value} key={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className={styles['days-of-week']}>
        {daysOfWeek.map((day, index) => (
          <div
            key={day}
            className={classNames(styles['day-of-week-header-cell'], {
              [styles['weekend-day']]: [6, 0].includes(index)
            })}
          >
            {day}
          </div>
        ))}
      </div>
      <div className={styles['days-grid']}>
        {calendarGridDayObjects.map((day) => (
          <div
            key={day.dateString}
            className={classNames(styles['day-grid-item-container'], {
              [styles['weekend-day']]: isWeekendDay(day.dateString),
              [styles['current-month']]: day.isCurrentMonth
            })}
          >
            <div className={styles['day-content-wrapper']}>{renderDay(day)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

CalendarDayHeader.propTypes = {
  calendarDayObject: PropTypes.object.isRequired
};
export function CalendarDayHeader({ calendarDayObject }: any) {
  return (
    <div className={styles['day-grid-item-header']}>{calendarDayObject.dayOfMonth}</div>
  );
}
