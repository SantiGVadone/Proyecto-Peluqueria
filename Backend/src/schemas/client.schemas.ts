import { z } from 'zod'
import { ClientOrigin } from '../interfaces/client.interfaces'

export const clientSchema = z.object({
    name: z.string().min(2, "El nombre es muy corto").max(50, "El nombre es muy largo"),
    lastname: z.string().min(2, "El apellido es muy corto").max(50, "El apellido es muy largo"),
    phone: z.string().min(7, "El telefono es muy corto").regex(/^\+?[0-9]{7,15}$/, 'El telefono debe incluir el prefijo (ej: +549...)'),
    origin: z.nativeEnum(ClientOrigin),
    businessId: z.number().positive()
})

export const updateClientSchema = clientSchema.partial()