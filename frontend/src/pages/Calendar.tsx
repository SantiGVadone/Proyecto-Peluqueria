import { FilterIcon } from 'lucide-react'
import './Calendar.css'
import { Timeline } from '../components/Timeline'
import { useAuth } from '../hooks/useAuth'
import { AppointmentCard } from '../components/AppointmentCard'

export const Calendar = () => {
  const { user } = useAuth()
  console.log('Usuario autenticado:', user)
  return (
    <div className='calendar-page'>
      <div className='calendar-header'>
        <div></div> {/* Espacio para centrar el título */}
        <h2 className='header-date'>27 de Marzo</h2>
        <button
          className='filter-button'
          // onClick={handleFilterClick}
        >
          <FilterIcon size={30} />
        </button>
      </div>
      <div className='time-line'>
        <Timeline />
        <AppointmentCard
          clientName='Santiago'
          service='PELUQUERIA'
          startTime='11:00'
          durationMinutes={60}
          state='PENDING'
        />
      </div>
    </div>
  )
}
