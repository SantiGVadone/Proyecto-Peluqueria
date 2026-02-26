import { CreateServicesDTO, UpdateServicesDTO } from '../interfaces/services.interfaces'
import { getAllServices, getServicesById, newServices, updateServices, deleteServices} from '../repository/services.repository'


export const getAllServicesServices = async () => {
    const result = await getAllServices()
    return result
}

export const getServicesByIdService = async (id: number) => {
    const client = await getServicesById(id)
    return client
}

export const createServicesService = async (data: CreateServicesDTO) => {
    //tengo que fijarme que no seas un servicio ya existente 
    const result = await newServices(data)
    return result
}

export const updateServicesService = async (id:number , data: UpdateServicesDTO) => {
    const result = await updateServices(id, data)
    return result
}

export const deleteServicesService = async (id:number) => {
    const result = await deleteServices(id)
    return result
}

