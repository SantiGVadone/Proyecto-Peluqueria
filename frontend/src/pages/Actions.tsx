import { Navbar } from '../components/Navbar'
import { QuickActions } from '../components/QuickActions'
import { useState } from 'react'
import './Actions.css'

export const Actions = () => {
  // Estado para saber qué menú está desplegado
  const [activeMenu, setActiveMenu] = useState<string | null>('clientes')

  const toggleMenu = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu)
  }
  return (
    <div className='Actions'>
      <QuickActions />
      <div className='accordion-section'>
        <div
          className={`accordion-item ${activeMenu === 'clientes' ? 'open' : ''}`}
        >
          <div
            className='accordion-header'
            onClick={() => toggleMenu('clientes')}
          >
            <span>Clientes</span>
            <span className='arrow'>▶</span>
          </div>
          {activeMenu === 'clientes' && (
            <div className='accordion-body'>
              <button className='action-sub-button'>Nuevo Cliente</button>
              <button className='action-sub-button'>Buscar Cliente</button>
              <button className='action-sub-button'>Actualizar Cliente</button>
              <button className='action-sub-button'>Eliminar Cliente</button>
            </div>
          )}
        </div>
        <div
          className={`accordion-item ${activeMenu === 'turnos' ? 'open' : ''}`}
        >
          <div
            className='accordion-header'
            onClick={() => toggleMenu('turnos')}
          >
            <span>Turnos</span>
            <span className='arrow'>▶</span>
          </div>
          {activeMenu === 'turnos' && (
            <div className='accordion-body'>
              <button className='action-sub-button'>Nuevo Turno</button>
              <button className='action-sub-button'>Buscar Turno</button>
              <button className='action-sub-button'>Actualizar Turno</button>
              <button className='action-sub-button'>Eliminar Turno</button>
            </div>
          )}
        </div>
      </div>
      <Navbar />
    </div>
  )
}
