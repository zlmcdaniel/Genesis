import type { NextPage } from 'next'
import { useState } from 'react';
import Calendar, { CalendarDayHeader } from '../components/Calendar'

const Home: NextPage = () => {
  const [yearAndMonth, setYearAndMonth] = useState([2021, 9]);
  return (
    <Calendar
      yearAndMonth={yearAndMonth}
      onYearAndMonthChange={setYearAndMonth}
      renderDay={(calendarDayObject) => (
        <div>
          <CalendarDayHeader calendarDayObject={calendarDayObject} />
        </div>
      )}
    />
  )
}

export default Home
