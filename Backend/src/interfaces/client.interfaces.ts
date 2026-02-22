export interface Client {
    id: number
    name: string 
    lastname: string 
    phone: string 
    isLocal: boolean
    email?: string 
    createdAt: Date | string
}

export type ClientWithOutSensitveInfo = Omit<Client, 'id' | 'email' | 'createdAt'>

export type CreateClientDTO = Omit<Client, 'id' | 'createdAt'>

export type UpdateClientDTO = Partial<CreateClientDTO>