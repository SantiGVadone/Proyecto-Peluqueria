import { FilterIcon } from 'lucide-react'
import './Calendar.css'
import { Timeline } from '../components/Timeline'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'

export const Calendar = () => {
  const { user } = useAuth()
  const [selectedDate, setSelecetedDate] = useState(new Date())

  const handleDateChange = (days: number) => {
    const newDate = new Date(selectedDate)
    newDate.setDate(selectedDate.getDate() + days)
    setSelecetedDate(newDate)
  }

  console.log('Usuario autenticado:', user)
  return (
    <div className='calendar-page'>
      <div className='calendar-header'>
        <div></div> {/* Espacio para centrar el título */}
        <h2 className='header-date'>
          {selectedDate.toLocaleDateString('es-AR', {
            day: '2-digit',
            month: 'long',
          })}
        </h2>
        <button
          className='filter-button'
          //onClick={ handleDateChange }
        >
          <FilterIcon size={30} />
        </button>
      </div>
      <div className='time-line'>
        <Timeline date={selectedDate} />
      </div>
    </div>
  )
}
