import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Calendar } from './pages/Calendar'
import { Actions } from './pages/Actions'
import { Dashboard } from './pages/Dashboard'
import { Metrics } from './pages/Metrics'
import { Profile } from './pages/Profile'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Navbar } from './components/Navbar'
import './App.css'

function App() {
  const location = useLocation()

  // Rutas donde NO queremos navbar
  const publicRoutes = ['/login', '/register']
  const hideNavbar = publicRoutes.includes(location.pathname)

  return (
    <div className='main-layout'>
      <div className='app-container'>
        <Routes>
          {/* Rutas públicas */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          {/* Rutas privadas */}
          <Route element={<ProtectedRoute />}>
            <Route path='/calendar' element={<Calendar />} />
            <Route path='/actions' element={<Actions />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/metrics' element={<Metrics />} />
            <Route path='/profile' element={<Profile />} />
          </Route>

          {/* Fallback */}
          <Route path='*' element={<Navigate to='/login' />} />
        </Routes>

        {/* Navbar global */}
        {!hideNavbar && <Navbar />}
      </div>
    </div>
  )
}

export default App
