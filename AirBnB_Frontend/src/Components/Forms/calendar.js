"use client"
import { DateRange,RangeKeyDict,Range } from "react-date-range"
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'; 

const DatePicker = ({value,onChange,bookedDates}) => {
  return (
    <div>
      <DateRange
        className="w-full border border-gray-400 rounded-xl mb-4"
        rangeColors={['#262626']}
        ranges={[value]}
        date={new Date()}
        onChange={onChange}
        direction="vertical"
        showDateDisplay={false}
        minDate={new Date()}
        disabledDates={bookedDates}
      />
    </div>
  )
}

export default DatePicker;
