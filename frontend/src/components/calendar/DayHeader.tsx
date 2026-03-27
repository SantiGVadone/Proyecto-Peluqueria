export const DayHeader = ({ date }: { date: string }) => {
  return (
    <header className='sticky top-0 bg-white z-40 p-4 border-b flex justify-between items-center'>
      <h1 className='text-xl font-bold text-gray-800'>{date}</h1>
      <button className='p-2 bg-gray-100 rounded-lg'>
        {/* Ícono de Filtro de Lucide */}
      </button>
    </header>
  )
}
