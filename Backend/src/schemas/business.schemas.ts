import { z } from 'zod'

export const businessSchema = z.object({
    name: z.string().min(1,'El Nombre es obligatorio').max(100, 'El nombre es muy largo'),
    location: z.string().min(1, 'La ubicacion es obligatoria').max(100, 'La ubicacion es muy larga'),
    phone: z.string().min(5, 'El telefono es demasiado corto'),
    inflow: z.number().nonnegative('No puede ser negativo').optional().default(0),
    outflow: z.number().nonnegative('No puede ser negativo').optional().default(0)
});

export const updateBusinessSchema = businessSchema.partial()