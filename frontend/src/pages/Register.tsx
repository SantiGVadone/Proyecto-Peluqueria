import { useReducer } from 'react'
import api from '../api/axios'
import { Link } from 'react-router-dom'
import {
  registerReducer,
  registerInitialState,
} from '../reducers/registerReducer'

import './Register.css'

export const Register = () => {
  const [state, dispatch] = useReducer(registerReducer, registerInitialState)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'UPDATE_FIELD',
      field: e.target.name,
      value: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Elegimos el endpoint según el estado del reducer
    const endpoint = state.isBoss
      ? '/auth/register-boss'
      : '/auth/register-employee'

    try {
      await api.post(endpoint, state)
      alert('¡Registro exitoso! Ahora ya podés loguearte.')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='register-container'>
      <form onSubmit={handleSubmit}>
        <h2>Crear Cuenta</h2>
        <label className='switch'>
          <input
            type='checkbox'
            checked={state.isBoss}
            onChange={() => dispatch({ type: 'TOGGLE_BOSS' })}
          />
          <span>Soy dueño de un negocio</span>
        </label>

        {/* Campos Comunes */}
        <input
          name='name'
          placeholder='Nombre'
          onChange={handleChange}
          required
        />
        <input
          name='lastname'
          placeholder='Apellido'
          onChange={handleChange}
          required
        />
        <input
          name='phone'
          placeholder='Telefono'
          onChange={handleChange}
          required
        />
        <input
          name='email'
          type='email'
          placeholder='Email'
          onChange={handleChange}
          required
        />
        <input
          name='password'
          type='password'
          placeholder='Contraseña'
          onChange={handleChange}
          required
        />

        {/* Campos Condicionales */}
        {state.isBoss ? (
          <div className='boss-fields'>
            <h3>Datos del Negocio</h3>
            <input
              name='businessName'
              placeholder='Nombre del Local'
              onChange={handleChange}
              required
            />
            <input
              name='location'
              placeholder='Dirección'
              onChange={handleChange}
              required
            />
            <input
              name='businessPhone'
              placeholder='Telefono'
              onChange={handleChange}
              required
            />
          </div>
        ) : (
          <div className='employee-fields'>
            <input
              name='business_id'
              type='number'
              placeholder='ID del Negocio'
              onChange={handleChange}
              required
            />
          </div>
        )}

        <button className='register-button' type='submit'>
          Registrarme
        </button>
        <Link to='/login' className='send-login'>
          Ya tengo una Cuenta
        </Link>
      </form>
    </div>
  )
}
