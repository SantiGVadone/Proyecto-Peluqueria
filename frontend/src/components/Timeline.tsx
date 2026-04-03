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

  //aca tendria que tener el fetch de todos los turnos del rango de dias (usando useEffect)
  // const {appointments} = useAppointments (rangoInicio, RangoFin)

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
          {/*appointmants
            .filter((appt) => isSameDay(appt.date, day.fullDate))
            .map((appt) => (
              <AppointmentCard key={appt.id} {...appt} />
            )) */}
        </div>
      ))}
    </div>
  )
}
