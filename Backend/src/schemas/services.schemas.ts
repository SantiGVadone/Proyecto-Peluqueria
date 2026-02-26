import { z } from 'zod'
import { ServiceType } from '../interfaces/services.interfaces'

export const ServicesSchema = z.object({
    name: z.nativeEnum(ServiceType),
    businessId: z.number().positive()
})

export const updateServicesSchema = ServicesSchema.partial()