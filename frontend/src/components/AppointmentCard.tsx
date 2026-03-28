interface AppointmentCardProps {
  clientName: string
  service: string // deberia poner que sea 'PELUQUERIA'| 'MANICURA'| 'PEDICURA'
  startTime: string
  durationMinutes: number
  state: 'COMPLETED' | 'PENDING'
}

export const AppointmentCard = ({
  clientName,
  service,
  startTime,
  durationMinutes,
  state,
}: AppointmentCardProps) => {
  //tengo que calcular la alura del la card en base a la duracion del turno
  // osea hacer una regla de 3 simple, si 30 minutos es igual a 50px(ALTURA_SLOT), entonces x(durationMinutes) minutos es igual a ->xCantidad de px
  //tengo que calcular la posicion de la card en base a la hora de inicio del turno
  //osea hacer una regla de 3 simple, si el turno empieza a las 8:00 y cada hora es igual a 100px(ALTURA_HORA), entonces si el turno empieza a las 8:30, entonces la posicion de la card va a ser -> xCantidad de px
  return (
    <div>
      <h1>aca va toda la info del turno</h1>
    </div>
  )
}
