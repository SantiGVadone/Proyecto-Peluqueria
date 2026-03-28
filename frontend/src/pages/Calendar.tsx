import { Navbar } from '../components/Navbar'
import { FilterIcon } from 'lucide-react'
import './Calendar.css'
import { Timeline } from '../components/Timeline'

export const Calendar = () => {
  return (
    <div className='calendar-page'>
      <div className='calendar-header'>
        <div></div>
        <h2 className='header-date'>27-03-2026</h2>
        <button
          className='filter-button'
          // onClick={handleFilterClick}
        >
          <FilterIcon size={30} />
        </button>
      </div>
      <div className='time-line'>
        <Timeline />
      </div>

      <Navbar />
    </div>
  )
}
