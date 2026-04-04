export enum ClientOrigin {
  LOCAL = 'LOCAL',
  TOURIST = 'TOURIST',
}

export interface Client {
  id: number
  name: string
  lastname: string
  phone: string
  origin: ClientOrigin
  businessId: number
  createdAt: Date | string
}

export type CreateClientDTO = Omit<Client, 'id' | 'createdAt'>

export type UpdateClientDTO = Partial<CreateClientDTO>
