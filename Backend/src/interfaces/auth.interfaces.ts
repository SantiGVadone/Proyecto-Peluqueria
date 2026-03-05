export interface RegisterBossDTO {
    // Datos del Negocio
    businessName: string
    location: string
    businessPhone: string

    // Datos del Dueño
    name: string
    lastname: string
    phone: string
    email: string
    password: string
}

export interface RegisterEmployeeDTO {
    name: string
    lastname: string
    phone: string
    email: string
    password: string
}

export interface LoginDTO {
    email: string
    password: string
}