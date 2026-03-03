import { z } from 'zod'

export const bonusSchema = z.object({
    amount: z.number().int().positive(),
    description: z.string().min(1, "La descripcion es obligatoria").max(255, "La descripcion es muy larga"),
    employeeId: z.number().int().positive(),
    createdAt: z.string().refine((date) => !isNaN(Date.parse(date)))
})

export const updateBonusSchema = bonusSchema.partial()