import { START_HOUR, END_HOUR } from '../constants/calendar'

export const generateCalendarDays = (
  startDate: Date,
  daysToGenerate: number,
) => {
  const days = []

  for (let i = -4; i < daysToGenerate; i++) {
    // CLAVE: Creamos una copia de la fecha de inicio y le sumamos i días
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)

    const slots = []
    for (let h = START_HOUR; h <= END_HOUR; h++) {
      slots.push(`${h}:00`)
      if (h !== END_HOUR) slots.push(`${h}:30`)
    }

    days.push({
      dateLabel: date.toLocaleDateString('es-AR', {
        weekday: 'long',
        day: 'numeric',
        month: 'numeric',
      }),
      // Guardamos la fecha real también, la vamos a necesitar para filtrar turnos
      fullDate: date,
      slots: slots,
    })
  }
  return days
}
