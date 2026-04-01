import {
  HOUR_HEIGHT_PX,
  START_HOUR,
  serviceIcons,
  type AppointmentCardProps,
  serviceColors,
  stateColors,
  calculateEndTime,
} from '../constants/calendar'

type ServiceType = keyof typeof serviceIcons

import './AppointmentCard.css'

export const AppointmentCard = ({
  clientName,
  service,
  startTime,
  durationMinutes,
  state,
}: AppointmentCardProps) => {
  const cardHeight = (durationMinutes / 60) * HOUR_HEIGHT_PX

  const cardPos =
    (parseInt(startTime.split(':')[0]) -
      START_HOUR +
      parseInt(startTime.split(':')[1]) / 60) *
      HOUR_HEIGHT_PX +
    60

  const IconComponent = serviceIcons[service as ServiceType]

  const backgroundColor =
    state === 'COMPLETED'
      ? stateColors.COMPLETED
      : serviceColors[service as ServiceType]

  const endTime = calculateEndTime(startTime, durationMinutes)

  return (
    <div
      className={`appointment-card-${state.toLowerCase()}`}
      style={{
        backgroundColor: backgroundColor,
        height: `${cardHeight}px`,
        top: `${cardPos}px`,
      }}
    >
      <p>{startTime}</p>
      <div className='icon'>
        <IconComponent size={20} />
      </div>
      <div className='info'>
        <p>{clientName}</p>
      </div>
      <p>{endTime}</p>
    </div>
  )
}

// Primero tengo que pensar que info quiero mostrar en la card
// voy a mostrar el nombre del cliente
// el servicio que va a recibir lo voy a mostrar por el color y con un icono
// la hora de inicio del turno
// la duracion del turno (se va a mostrar con la altura de la card)
// la hora de fin del turno se va a mostrar (en la parte de abajo de la card)
// el estado del turno (
//                      El estado default va a ser pendiente, no va a tener distintivos
//                      Si el turno esta completado (osesa que ya es un turno viejo, quiero que se ponga en color gris)
//                      )
//Osea que se va a mostrar el nombre del cliente, el servicio, hs de inicio, hs de fin y el estado del turno
