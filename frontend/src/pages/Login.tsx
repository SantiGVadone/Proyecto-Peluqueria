import { useState } from 'react'
import api from '../api/axios'
import { useAuth } from '../hooks/useAuth'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.avif'

import './Login.css'

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  const { login } = useAuth()

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      // envio la info a la api
      const response = await api.post('/auth/login', formData)

      const { token } = response.data.response

      login(token)

      console.log(`login exitoso`)

      navigate('/calendar')
    } catch (error: unknown) {
      //el eslint jode con el error tipo any
      let errorMsg = 'Error al conectar con el servidor'

      if (axios.isAxiosError(error)) {
        errorMsg = error.response?.data?.message || errorMsg
      }

      console.error('Error en el login:', errorMsg)
      alert(errorMsg)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <div className='login-container'>
      <img src={logo} alt='Login' className='logo' />
      <form onSubmit={handleSubmit}>
        <h2>Iniciar Sesion</h2>
        <input
          type='email'
          name='email'
          placeholder='ejemplo@email.com'
          onChange={handleChange}
          value={formData.email}
          required
        />
        <input
          type='password'
          name='password'
          placeholder='Contraseña'
          onChange={handleChange}
          value={formData.password}
          required
        />
        <Link className='send-register' to='/register'>
          ¿No tienes cuenta? Regístrate
        </Link>
        <button type='submit'>Entrar</button>
      </form>
    </div>
  )
}
