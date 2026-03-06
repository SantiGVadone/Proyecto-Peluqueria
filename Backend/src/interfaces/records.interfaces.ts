export interface Records {
    id: number
    clientId: number
    employeeId: number
    serviceId: number
    appointmentId: number
    description: string
    totalCost: number
    date: Date | string
    businessId: number
}

export type CreateRecordsDTO = Omit<Records, 'id'> //el date va porque es el dia de hoy casi siempre

export type UpdateRecordsDTO = Partial<CreateRecordsDTO>