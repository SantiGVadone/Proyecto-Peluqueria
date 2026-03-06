import { CreateServicesDTO, UpdateServicesDTO } from '../interfaces/services.interfaces'
import { getAllServices, getServicesById, newServices, updateServices, deleteServices} from '../repository/services.repository'


export const getAllServicesServices = async (business_id: number) => {
    const result = await getAllServices(business_id)
    return result
}

export const getServicesByIdService = async (id: number, business_id: number) => {
    const client = await getServicesById(id, business_id)
    return client
}

export const createServicesService = async (data: CreateServicesDTO, business_id: number) => {
    //tengo que fijarme que no seas un servicio ya existente 
    const result = await newServices(data, business_id)
    return result
}

export const updateServicesService = async (id:number , data: UpdateServicesDTO, business_id: number) => {
    const result = await updateServices(id, data, business_id)
    return result
}

export const deleteServicesService = async (id:number, business_id: number) => {
    const result = await deleteServices(id, business_id)
    return result
}

