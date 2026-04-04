import { z } from 'zod'
import { AppointmentStatus } from '../interfaces/appointment.interfaces'

export const appointmentSchema = z.object({
  clientId: z.number().int().positive(),
  employeeId: z.number().int().positive(),
  serviceId: z.number().int().positive(),
  date: z.string().refine((date) => !isNaN(Date.parse(date))),
  startTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'El formato de hora debe ser HH:mm'),
  duration: z.number().int().positive().min(15).max(540),
  status: z.nativeEnum(AppointmentStatus),
  total: z.number().positive().optional(),
})

export const updateAppointmentSchema = appointmentSchema.partial()
