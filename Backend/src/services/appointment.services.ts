import { getAllAppointments, getAppointmentById, createAppointment, updateAppointment, deleteAppointment} from '../repository/appointment.repository'
import { CreateAppointmentDTO, UpdateAppointmentDTO } from '../interfaces/appointment.interfaces'
import { createRecordsService } from './records.services'

export const getAllAppointmentsServices = async (business_id: number) => {
    const result = await getAllAppointments(business_id)
    return result
}

export const getAppointmentByIdServices = async (id: number, business_id: number) => {
    const result = await getAppointmentById(id, business_id)
    return result
}

export const createAppointmentServices = async (data: CreateAppointmentDTO, business_id: number) => {
    //aca tendria que verificar que no haya turnos encimados (para el empleado), y ese tipo de cosas
    const result = await createAppointment(data, business_id)
    return result
}

export const updateAppointmentServices = async (id: number, business_id: number, data: UpdateAppointmentDTO) => {
    //aca tendria que verificar que no haya turnos encimados (para el empleado), y ese tipo de cosas
    const result = await updateAppointment(id, business_id, data)
        if(result && result.status === 'COMPLETED'){
            await createRecordsService({
                clientId: result.clientId,
                employeeId: result.employeeId,
                serviceId: result.serviceId,
                date: new Date(),
                appointmentId: result.id,
                description: result.description,
                totalCost: result.totalCost,
                businessId: business_id
            }, business_id);
        }
    return result
}

export const deleteAppointmentServices = async (id:number, business_id: number) => {
    const result = await deleteAppointment(id, business_id)
    return result
}