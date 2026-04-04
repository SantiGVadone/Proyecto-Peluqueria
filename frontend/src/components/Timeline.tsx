import { TimeSlot } from './TimeSlot'
import { generateCalendarDays, calculateEndTime } from '../utils/calendarUtils'
import './Timeline.css'
import { AppointmentCard } from './AppointmentCard'
import { useEffect, useMemo, useState } from 'react'
import api from '../api/axios'

const DIAS_DE_VISTA = 10 //vamos a generar 10 por ahora

interface Appointment {
  id: number
  client_id: number
  employee_id: number
  service_id: number
  date: string
  start_time: string
  status: 'COMPLETED' | 'PENDING'
  duration: number
  client_name: string
  service_name: 'MANICURA' | 'PEDICURA' | 'PELUQUERIA'
  // Esto lo uso en el useMemo
  subColumn?: number
  totalSubColumns?: number
}

interface TimelineProps {
  date: Date
}

export const Timeline = ({ date }: TimelineProps) => {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  const appointmentsByDate = useMemo(() => {
    // El mapa ahora es un objeto de objetos: { 'fecha': { 'empId': [turnos] } }
    const map: Record<string, Record<number, Appointment[]>> = {}

    appointments.forEach((appt) => {
      if (!appt.date) return
      const dateKey = appt.date.split('T')[0]
      const empId = appt.employee_id

      // Si no existe la fecha, la creamos
      if (!map[dateKey]) map[dateKey] = {}
      // Si no existe el empleado en esa fecha, le creamos su lista
      if (!map[dateKey][empId]) map[dateKey][empId] = []

      map[dateKey][empId].push(appt)
    })

    // AHORA: Lógica de solapamiento para cada empleado
    Object.values(map).forEach((dateGroup) => {
      Object.values(dateGroup).forEach((empAppts) => {
        // 1. Ordenamos por hora (importante para comparar)
        empAppts.sort((a, b) => a.start_time.localeCompare(b.start_time))

        // 2. Marcamos quién choca con quién
        empAppts.forEach((current, i) => {
          current.subColumn = 0 // Por defecto va a la izquierda

          // Comparamos con los turnos anteriores del MISMO empleado
          for (let j = 0; j < i; j++) {
            const previous = empAppts[j]

            // Calculamos si se pisan (suponiendo que tenés start_time y duration)
            // Esto es una simplificación, después lo pulimos:
            if (
              current.start_time <
              calculateEndTime(previous.start_time, previous.duration)
            ) {
              current.subColumn = (previous.subColumn ?? 0) + 1
            }
          }
        })
      })
    })

    return map
  }, [appointments])

  useEffect(() => {
    const fetchRange = async () => {
      try {
        setLoading(true)
        // consigo el rango
        const from = new Date(date)
        from.setDate(date.getDate() - 5)

        const to = new Date(date)
        to.setDate(date.getDate() + 5)

        const fromStr = from.toISOString().split('T')[0]
        const toStr = to.toISOString().split('T')[0]

        // hago el fetch
        const token = localStorage.getItem('token')

        const response = await api.get('/appointments/range', {
          params: { from: fromStr, to: toStr },
          headers: { Authorization: `Bearer ${token}` },
        })

        //guardo toda la info
        setAppointments(response.data)
      } catch (error) {
        console.error('Error al traer los turnos', error)
      } finally {
        setLoading(false)
      }
    }
    fetchRange()
  }, [date])

  //genero los dias que se van a ver
  const calendarData = generateCalendarDays(date, DIAS_DE_VISTA)
  return (
    <div className='timeline'>
      {calendarData.map((day, dayIndex) => {
        // 1. CLAVE DEL DÍA: Usamos el truco de 'en-CA' para tener YYYY-MM-DD sin líos de zona horaria
        const dateKey = day.fullDate.toLocaleDateString('en-CA')

        // 2. BUSCAMOS LOS TURNOS: Si no hay nada para esa fecha, devolvemos un array vacío []
        const dayAppointments = appointmentsByDate[dateKey] || {}

        return (
          <div
            key={dayIndex}
            className='day-section'
            style={{ position: 'relative' }} // <-- VITAL para que las cards se ubiquen bien
          >
            {/* Header del día (Lunes 30, etc) */}
            <div className='day-footer'>
              <span>{day.dateLabel}</span>
            </div>

            {/* Slots de tiempo (el fondo del calendario) */}
            {day.slots.map((slot, slotIndex) => (
              <TimeSlot
                key={slotIndex}
                time={slot}
                isDark={slotIndex % 2 === 0}
              />
            ))}

            {/* 3. RENDER DE LAS COLUMNAS POR EMPLEADO */}
            <div
              className='employees-container'
              style={{
                display: 'flex',
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            >
              {Object.keys(dayAppointments).map((empId) => {
                const empAppts = dayAppointments[Number(empId)]

                return (
                  <div
                    key={empId}
                    className='employee-lane'
                    style={{
                      flex: 1, // Esto hace que todos los carriles midan lo mismo
                      position: 'relative',
                      borderRight: '1px solid rgba(255,255,255,0.1)', // Opcional: para separar empleados
                    }}
                  >
                    {/* Render de las cards de este empleado específico */}
                    {empAppts.map((appt) => (
                      <AppointmentCard
                        key={appt.id}
                        clientName={appt.client_name}
                        service={appt.service_name}
                        startTime={appt.start_time}
                        durationMinutes={appt.duration}
                        status={appt.status}
                        // PASAMOS LAS PROPS DE SOLAPAMIENTO:
                        subColumn={appt.subColumn}
                        // Necesitamos saber cuántos se pisan en total para el ancho
                        // Calculamos el máximo subColumn + 1 de este grupo de choques
                        totalSubColumns={
                          Math.max(...empAppts.map((a) => a.subColumn ?? 0)) + 1
                        }
                      />
                    ))}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}

      {/* Un indicador visual mientras carga la API */}
      {loading && (
        <div
          style={{
            position: 'fixed',
            top: 20,
            right: 20,
            background: 'rgba(0,0,0,0.5)',
            padding: '10px',
            borderRadius: '8px',
          }}
        >
          Actualizando agenda...
        </div>
      )}
    </div>
  )
}
