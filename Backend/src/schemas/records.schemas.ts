import { z } from 'zod'

export const recordsSchema = z.object({
    clientId: z.number().int().positive(),
    employeeId: z.number().int().positive(),
    serviceId: z.number().int().positive(),
    appointmentId: z.number().int().positive(),
    description: z.string().min(1, "La descripcion es obligatoria").max(255, "La descripcion es muy larga"),
    totalCost: z.number().int().positive(),
    date: z.string().refine((date) => !isNaN(Date.parse(date)))
})

export const updateRecordsSchema = recordsSchema.partial()
