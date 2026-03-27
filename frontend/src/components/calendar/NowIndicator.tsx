export const NowIndicator = () => {
  return (
    <div className='absolute left-0 right-0 z-30 flex items-center pointer-events-none'>
      <div className='w-3 h-3 bg-red-500 rounded-full -ml-1.5 shadow-sm'></div>
      <div className='flex-1 h-[2px] bg-red-500/50'></div>
    </div>
  )
}
