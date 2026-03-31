import './QuickActions.css'
export const QuickActions = () => {
  return (
    <div className='quick-actions-container'>
      <div className='quick-action-list'>
        <button className='q-action-button'>
          <span className='button-text'>Crear Cliente</span>
        </button>
        <button className='q-action-button'>
          <span className='button-text'>Edita Cliente</span>
        </button>

        <button className='q-action-button'>
          <span className='button-text'>Crear Turno</span>
        </button>

        <button className='q-action-button'>
          <span className='button-text'>Editar Turno</span>
        </button>

        <button className='q-action-button'>
          <span className='button-text'>Ver Historial</span>
        </button>
      </div>
    </div>
  )
}
