import { START_HOUR, END_HOUR } from '../constants/calendar'

export const calculateEndTime = (
  startTime: string,
  durationMinutes: number,
): string => {
  // 1. Separamos horas y minutos del string "16:00:00"
  const [hours, minutes] = startTime.split(':').map(Number)

  // 2. Creamos un objeto fecha base (no importa el día, solo los números)
  const date = new Date()
  date.setHours(hours)
  date.setMinutes(minutes + durationMinutes) // Sumamos la duración
  date.setSeconds(0)

  // 3. Devolvemos el formato HH:mm:ss para poder comparar strings
  const h = String(date.getHours()).padStart(2, '0')
  const m = String(date.getMinutes()).padStart(2, '0')
  const s = String(date.getSeconds()).padStart(2, '0')

  return `${h}:${m}:${s}`
}

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
