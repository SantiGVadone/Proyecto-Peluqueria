export enum ServiceType {
    HAIR = 'PELUQUERIA',
    MANICURE = 'MANICURA',
    PEDICURE = 'PEDICURA',
    HAIR_REMOVAL = 'DEPILACION',
    MAKE_UP = 'MAQUILLAJE',
    MASSAGE = 'MASAJE'    
}

export interface Services {
    id: number
    name: ServiceType
    businessId: number
}

export type CreateServicesDTO = Omit<Services,'id'>

export type UpdateServicesDTO = Partial<CreateServicesDTO>
