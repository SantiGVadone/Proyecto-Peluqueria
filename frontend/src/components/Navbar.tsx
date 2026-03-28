import { Calendar, PlusSquare, Home, BarChart2, User } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

export const Navbar = () => {
  return (
    <nav className='navbar'>
      <NavLink to='/calendar' className='calendar'>
        <Calendar size={35} />
      </NavLink>

      <NavLink to='/actions' className='actions'>
        <PlusSquare size={35} />
      </NavLink>

      <NavLink to='/dashboard' className='dashboard'>
        <Home size={35} />
      </NavLink>

      <NavLink to='/metrics' className='metrics'>
        <BarChart2 size={35} />
      </NavLink>

      <NavLink to='/profile' className='profile'>
        <User size={35} />
      </NavLink>
    </nav>
  )
}
