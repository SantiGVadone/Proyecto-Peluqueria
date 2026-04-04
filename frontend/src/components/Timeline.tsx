import { TimeSlot } from './TimeSlot'
import { generateCalendarDays } from '../utils/calendarUtils'
import './Timeline.css'
import { AppointmentCard } from './AppointmentCard'
import { useEffect, useMemo, useState } from 'react'
import api from '../api/axios'

const DIAS_DE_VISTA = 10 //vamos a generar 10 por ahora

interface Appointment {
  id: number
  clientId: number
  serviceId: number
  date: string // O Date
  startTime: string
  status: 'COMPLETED' | 'PENDING'
  durationMinutes: number
  createdAt: string
}

interface TimelineProps {
  date: Date
}

export const Timeline = ({ date }: TimelineProps) => {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  const appointmentsByDate = useMemo(() => {
    const map: Record<string, any[]> = {}

    appointments.forEach((appt) => {
      if (!appt.date) return
      const dateKey = appt.date.split('T')[0]
      if (!map[dateKey]) {
        map[dateKey] = []
      }
      map[dateKey].push(appt)
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
        const dayAppointments = appointmentsByDate[dateKey] || []

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

            {/* 3. RENDER DE LAS CARDS: Solo las de este día específico */}
            {dayAppointments.map((appt) => (
              <AppointmentCard
                key={appt.id}
                clientName={appt.client_name}
                service={appt.service_name}
                startTime={appt.start_time}
                durationMinutes={appt.duration}
                status={appt.status} // Mapeamos 'status' de la DB a 'state' de la Prop
              />
            ))}
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
