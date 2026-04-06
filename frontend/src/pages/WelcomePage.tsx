import { useState } from 'react'
import logo from '../assets/logo.avif'
import { useNavigate } from 'react-router-dom'
import './WelcomePage.css'

export const WelcomePage = () => {
  const text = [
    'Bienvenidosa  ..........',
    'Esta es una App diseñada principalmente para facilitar la gestion de turnos de Salones de Belleza',
    'Otro de nuestros propositos es facilitarle a los dueños y empleados la gestion de sus finanzas',
    'Con esta App vas a poder gestionar tus turnos permitiendote optimizar tu tiempo',
    'Tenemos tambien un apartado de Finanzas, donde vas a poder ver tus finanzas y las de tus empleados',
    'Text 5',
    'Text 6',
  ]

  const navigate = useNavigate()

  const [index, setIndex] = useState<number>(0)

  const handleClick = () => {
    if (index >= 5) {
      navigate('/register')
    }
    setIndex(index + 1)
  }
  return (
    <div className='welcome-page'>
      <img src={logo} alt='Logo' className='logo' />
      <h1 className='title'>Nombre de la App</h1>
      <h5 className='text'>{text[index]}</h5>

      <button onClick={handleClick}> Next</button>
    </div>
  )
}
