import './AppointmentCard.css'
import { CALENDAR_CONFIG } from '../../constants/calendar'

export const AppointmentCard = ({
  clientName,
  service,
  startTime,
  durationMinutes,
  color,
}: any) => {
  const { START_HOUR, SLOT_HEIGHT, TIME_COLUMN_WIDTH } = CALENDAR_CONFIG

  // Cálculos
  const height = (durationMinutes / 30) * SLOT_HEIGHT
  const [hours, minutes] = startTime.split(':').map(Number)
  const minutesFromStart = (hours - START_HOUR) * 60 + minutes
  const top = (minutesFromStart / 30) * SLOT_HEIGHT

  return (
    <div
      className='appointment-card'
      style={{
        backgroundColor: color,
        top: `${top}px`,
        height: `${height}px`,
        left: `${TIME_COLUMN_WIDTH + 10}px`, // Margen después de la hora
      }}
    >
      <div className='appointment-name'>{clientName}</div>
      <div className='appointment-service'>{service}</div>
    </div>
  )
}
