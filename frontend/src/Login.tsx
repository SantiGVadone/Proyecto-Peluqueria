import { useState } from 'react'
import api from './api/axios'

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      // envio la info a la api
      const response = await api.post('/auth/login', formData)
      console.log('Login exitoso:', response.data)

      const { token, user } = response.data

      //importantisimo hay que guardar el token en el LocalStorage
      localStorage.setItem('token', token)

      alert(`Bienvenido de nuevo: ${user}`)

      console.log('Datos:', formData)
    } catch (error: any) {
      //el eslint jode con el error tipo any
      const errorMsg =
        error.response?.data?.message || 'Error al conectar con el servidor'
      console.log('Error en el login:', errorMsg)
      alert(errorMsg)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <div className='login-container'>
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

        <button type='submit'>Entrar</button>
      </form>
    </div>
  )
}
