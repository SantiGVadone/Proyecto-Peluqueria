import './TimeSlot.css'

interface TimeSlotProps {
  time: string
  isDark?: boolean
}

export const TimeSlot = ({ time, isDark }: TimeSlotProps) => {
  return (
    <div className='slots'>
      <div className={isDark ? 'dark' : 'light'}>
        <div className='time'>
          <span className='text'>{time}</span>
        </div>
      </div>
    </div>
  )
}
