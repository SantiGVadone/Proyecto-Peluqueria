export interface Business {
    id: number
    name: string
    location: string 
    phone: string 
    inflow?: number //hay que ponerles un default 0 en la db
    outflow?: number //hay que ponerles un default 0 en la db
    createdAt: Date | string
}

export type CreateBusinessDTO = Omit<Business, 'id' | 'createdAt' | 'inflow' | 'outflow'> & {
    inflow?: number; 
    outflow?: number;
}

export type UpdateBusinessDTO = Partial<CreateBusinessDTO>