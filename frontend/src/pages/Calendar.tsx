import { FilterIcon } from 'lucide-react'
import './Calendar.css'
import { Timeline } from '../components/Timeline'
import { useState } from 'react'

export const Calendar = () => {
  const [selectedDate, setSelecetedDate] = useState(new Date())

  const handleDateChange = (days: number) => {
    const newDate = new Date(selectedDate)
    newDate.setDate(selectedDate.getDate() + days)
    setSelecetedDate(newDate)
  }

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
          <FilterIcon size={30} />{' '}
          {/*esto hay que cambiarlo quiero que sea un calendario, no un filter*/}
        </button>
      </div>
      <div className='time-line'>
        <Timeline date={selectedDate} />
      </div>
    </div>
  )
}
