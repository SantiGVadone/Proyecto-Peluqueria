import { generateTimeSlots } from '../../utils/dateUtils'
import { TimeSlot } from '../../components/calendar/TimeSlot'
import { Navbar } from '../../components/Navbar'

export const CalendarPage = () => {
  // Generamos de 10 a 19
  const slots = generateTimeSlots(10, 19)

  return (
    <div className='flex flex-col min-h-screen bg-white pb-20'>
      {' '}
      {/* pb-20 para que el Navbar no tape nada */}
      {/* Header Fijo */}
      <div className='sticky top-0 z-50 bg-white border-b p-4 flex justify-between items-center'>
        <h1 className='text-xl font-bold'>27-03-2026</h1>
        <button className='p-2 bg-gray-100 rounded-full'>🔍</button>
      </div>
      {/* Contenedor de la Timeline */}
      <div className='flex-1 relative'>
        {slots.map((time, index) => (
          <TimeSlot
            key={time}
            time={time}
            isDark={Math.floor(index / 2) % 2 === 0} // Cambia de color cada hora entera (2 slots)
          />
        ))}

        {/* Acá irán las AppointmentCards flotando con position absolute */}
      </div>
      <Navbar />
    </div>
  )
}
