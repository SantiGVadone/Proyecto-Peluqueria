export enum ServiceType {
    HAIR = 'Peluqueria',
    MANICURE = 'Manicura',
    PEDICURE = 'Pedicura',
    HAIR_REMOVAL = 'Depilacion',
    MAKE_UP = 'Maquillaje',
    MASSAGE = 'Masaje'    
}

export interface Services {
    id: number
    name: ServiceType
    businessId: number
}

export type CreateServicesDTO = Omit<Services,'id'>

export type UpdateServicesDTO = Partial<CreateServicesDTO>
