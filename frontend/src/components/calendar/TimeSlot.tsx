interface TimeSlotProps {
  time: string
  isDark?: boolean
}

export const TimeSlot = ({ time, isDark }: TimeSlotProps) => {
  return (
    <div
      className={`h-20 flex border-b border-gray-100 ${isDark ? 'bg-gray-50' : 'bg-white'}`}
    >
      {/* Columna de la hora */}
      <div className='w-16 flex items-start justify-center pt-2 border-r border-gray-100'>
        <span className='text-xs font-medium text-gray-400'>{time}</span>
      </div>
      {/* Espacio para los turnos */}
      <div className='flex-1 relative'></div>
    </div>
  )
}
