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
      <div className='appointments'>
        {/*
          {turnosMocks.map((turno) => {
            return (
              <AppointmentCard
                key={turno.id}
                {...turno}
              />
            )
          })
          }
          .appointments-layer {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            
            .appointment-card {
              pointer-events: auto;
            }
*/}
      </div>
      <div className='day-footer'>
        <span>Sábado 27-03 </span>
      </div>
    </div>
  )
}
