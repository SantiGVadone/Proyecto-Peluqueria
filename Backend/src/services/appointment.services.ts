import { getAllAppointments, getAppointmentById, createAppointment, updateAppointment, deleteAppointment} from '../repository/appointment.repository'
import { CreateAppointmentDTO, UpdateAppointmentDTO } from '../interfaces/appointment.interfaces'

export const getAllAppointmentsServices = async (business_id: number) => {
    const result = await getAllAppointments(business_id)
    return result
}

export const getAppointmentByIdServices = async (id: number, business_id: number) => {
    const result = await getAppointmentById(id, business_id)
    return result
}

export const createAppointmentServices = async (data: CreateAppointmentDTO, business_id: number) => {
    const result = await createAppointment(data, business_id)
    return result
}

export const updateAppointmentServices = async (id: number, business_id: number, data: UpdateAppointmentDTO) => {
    //aca tendria que verificar que no haya turnos encimados (para el empleado), y ese tipo de cosas
    const result = await updateAppointment(id, business_id, data)
    return result
}

export const deleteAppointmentServices = async (id:number, business_id: number) => {
    const result = await deleteAppointment(id, business_id)
    return result
}