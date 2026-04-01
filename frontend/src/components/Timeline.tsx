import { TimeSlot } from './TimeSlot'
import { START_HOUR, END_HOUR } from '../constants/calendar'
import { generateTimeSlots } from '../utils/calendarUtils'
import './Timeline.css'

const slots = generateTimeSlots(START_HOUR, END_HOUR)

export const Timeline = () => {
  return (
    <div className='timeline'>
      {slots.map((slot, index) => {
        return <TimeSlot key={index} time={slot} isDark={index % 2 === 0} />
      })}
      <div className='day-footer'>
        <span>Sábado 27-03 </span>
      </div>
    </div>
  )
}
