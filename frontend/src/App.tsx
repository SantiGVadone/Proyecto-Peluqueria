import { Routes, Route, Navigate } from 'react-router-dom'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { CalendarPage } from './pages/calendar/CalendarPage'

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/calendar' element={<CalendarPage />} />

      <Route path='*' element={<Navigate to='/login' />} />
    </Routes>
  )
}

export default App
