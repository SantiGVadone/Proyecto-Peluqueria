export enum AppointmentStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    CANCELED = 'CANCELED'
}

export interface Appointment { 
    id: number 
    clientId: number
    employeeId: number
    serviceId: number
    date: Date | string 
    startTime: string
    endTime: string
    total?: number //solo existe cuando el status es completed
    status: AppointmentStatus
    createdAt : Date | string
}

export type CreateAppointmentDTO = Omit<Appointment, 'id' | 'createdAt' | 'total'>

export type UpdateAppointmentDTO = Partial<CreateAppointmentDTO> & { status?: AppointmentStatus }
