import { getAllAppointments, getAppointmentById, createAppointment, updateAppointment, deleteAppointment} from '../repository/appointment.repository'
import { CreateAppointmentDTO, UpdateAppointmentDTO } from '../interfaces/appointment.interfaces'

export const getAllAppointmentsServices = async () => {
    const result = await getAllAppointments()
    return result
}

export const getAppointmentByIdServices = async (id: number) => {
    const result = await getAppointmentById(id)
    return result
}

export const createAppointmentServices = async (data: CreateAppointmentDTO) => {
    const result = await createAppointment(data)
    return result
}

export const updateAppointmentServices = async (id: number, data: UpdateAppointmentDTO) => {
    //aca tendria que verificar que no haya turnos encimados (para el empleado), y ese tipo de cosas
    const result = await updateAppointment(id, data)
    return result
}

export const deleteAppointmentServices = async (id:number ) => {
    const result = await deleteAppointment(id)
    return result
}