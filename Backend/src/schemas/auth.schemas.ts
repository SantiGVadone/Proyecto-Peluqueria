import { z } from 'zod'

export const registerBossSchema = z.object({
    //Datos del Negocio 
    businessName: z.string().min(3, "El nombre del negocio debe tener al menos 3 caracteres"),
    location: z.string().min(5, "La ubicación es obligatoria"),
    businessPhone: z.string().min(8, "El teléfono del negocio es obligatorio"),

    // Datos del Dueño (Empleado con rol Boss)
    name: z.string().min(2, "El nombre es obligatorio"),
    lastname: z.string().min(2, "El apellido es obligatorio"),
    phone: z.string().min(8, "El teléfono personal es obligatorio"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
})

export const loginSChema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(1, "La contraseña es obligatoria")
})