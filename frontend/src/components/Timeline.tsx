import { TimeSlot } from './TimeSlot'
import { generateCalendarDays } from '../utils/calendarUtils'
import './Timeline.css'
import { AppointmentCard } from './AppointmentCard'

const DIAS_DE_VISTA = 7 //vamos a generar una semana por ahora

interface TimelineProps {
  date: Date
}

export const Timeline = ({ date }: TimelineProps) => {
  const calendarData = generateCalendarDays(date, DIAS_DE_VISTA)
  return (
    <div className='timeline'>
      {calendarData.map((day, dayIndex) => (
        <div key={dayIndex} className='day-section'>
          <div className='day-footer'>
            <span>{day.dateLabel}</span>
          </div>
          {day.slots.map((slot, slotIndex) => (
            <TimeSlot
              key={slotIndex}
              time={slot}
              isDark={slotIndex % 2 === 0}
            />
          ))}
          {/*Aca se mapean las AppointmentCard de ESTE DIA */}
          <AppointmentCard
            clientName='Santiago'
            service='PELUQUERIA'
            startTime='11:00'
            durationMinutes={60}
            state='PENDING'
          />
        </div>
      ))}
    </div>
  )
}
