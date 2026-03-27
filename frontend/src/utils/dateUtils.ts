export const generateTimeSlots = (start: number, end: number) => {
  const slots = []
  for (let hour = start; hour <= end; hour++) {
    // Agregamos la hora en punto
    slots.push(`${hour}:00`)
    // Agregamos la media hora (excepto para la última hora si querés)
    if (hour !== end) {
      slots.push(`${hour}:30`)
    }
  }
  return slots
}
