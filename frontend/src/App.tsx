import { Routes, Route, Navigate } from 'react-router-dom'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Calendar } from './pages/Calendar'
import { Actions } from './pages/Actions'
import './App.css'
import { Dashboard } from './pages/dashboard'
import { Metrics } from './pages/Metrics'
import { Profile } from './pages/Profile'

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/calendar' element={<Calendar />} />
      <Route path='/actions' element={<Actions />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/metrics' element={<Metrics />} />
      <Route path='/profile' element={<Profile />} />

      <Route path='*' element={<Navigate to='/login' />} />
    </Routes>
  )
}

export default App
