export const START_HOUR = 10
export const END_HOUR = 19
export const SLOT_DURATION_MINUTES = 30
export const HOUR_HEIGHT_PX = 100
export const SLOT_HEIGHT_PX = (SLOT_DURATION_MINUTES / 60) * HOUR_HEIGHT_PX

import { Scissors, HandIcon } from 'lucide-react'
import { Foot } from '../components/Iconos/Foot'

export const serviceIcons = {
  PELUQUERIA: Scissors,
  MANICURA: HandIcon,
  PEDICURA: Foot,
} as const

export interface AppointmentCardProps {
  clientName: string
  service: 'PELUQUERIA' | 'MANICURA' | 'PEDICURA'
  startTime: string
  durationMinutes: number
  status: 'COMPLETED' | 'PENDING'
}

export const serviceColors = {
  PELUQUERIA: '#FFB6C1',
  MANICURA: '#ADD8E6',
  PEDICURA: '#90EE90',
}

export const statusColors = {
  COMPLETED: '#D3D3D3',
  PENDING: 'transparent',
}

export function calculateEndTime(startTime: string, durationMinutes: number) {
  const [horas, minutos] = startTime.split(':').map(Number)
  const fecha = new Date()
  fecha.setHours(horas, minutos, 0, 0)

  fecha.setMinutes(fecha.getMinutes() + durationMinutes)

  const endHours = fecha.getHours().toString().padStart(2, '0')
  const endMinutes = fecha.getMinutes().toString().padStart(2, '0')

  return `${endHours}:${endMinutes}`
}
