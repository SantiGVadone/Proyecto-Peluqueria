import { Calendar, PlusSquare, Home, BarChart2, User } from 'lucide-react'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav className='fixed bottom-0 left-0 right-0 bg-[#1e1e1e] border-t border-gray-800 px-6 py-3 flex justify-between items-center z-50'>
      <NavLink
        to='/calendar'
        className={({ isActive }) =>
          isActive ? 'text-blue-500' : 'text-gray-400'
        }
      >
        <Calendar size={28} />
      </NavLink>

      <NavLink
        to='/actions'
        className={({ isActive }) =>
          isActive ? 'text-blue-500' : 'text-gray-400'
        }
      >
        <PlusSquare size={28} />
      </NavLink>

      <NavLink
        to='/dashboard'
        className={({ isActive }) =>
          isActive ? 'text-blue-500' : 'text-gray-400'
        }
      >
        <Home size={28} />
      </NavLink>

      <NavLink
        to='/metrics'
        className={({ isActive }) =>
          isActive ? 'text-blue-500' : 'text-gray-400'
        }
      >
        <BarChart2 size={28} />
      </NavLink>

      <NavLink
        to='/profile'
        className={({ isActive }) =>
          isActive ? 'text-blue-500' : 'text-gray-400'
        }
      >
        <User size={28} />
      </NavLink>
    </nav>
  )
}
