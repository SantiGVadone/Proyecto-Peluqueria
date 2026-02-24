import { getAllAppointments, getAppointmentById} from '../repository/appointment.repository'

export const getAllAppointmentsServices = async () => {
    const result = await getAllAppointments()
    return result
}

export const getAppointmentByIdServices = async (id: number) => {
    const result = await getAppointmentById(id)
    return result
}