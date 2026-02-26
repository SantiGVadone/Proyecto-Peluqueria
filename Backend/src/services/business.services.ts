import { CreateBusinessDTO, UpdateBusinessDTO } from '../interfaces/business.interfaces'
import { getAllBusiness, getBusinessById, newBusiness, updateBusiness, deleteBusiness} from '../repository/business.repository'

//en este archivo se hacen las validaciones de las reglas del negocio

export const getAllBusinessServices = async () => {
    const result = await getAllBusiness()
    return result
}

export const getBusinessByIdServices = async (id: number) => {
    const result = await getBusinessById(id)
    return result
}

export const createBusinessServices = async (data: CreateBusinessDTO) => {
    const result = await newBusiness(data)
    return result
}

export const updateBusinessServices = async (id: number, data: UpdateBusinessDTO) => {
    const result = await updateBusiness(id,data)
    return result
}

export const deleteBusinessServices = async (id: number) => {
    const result = await deleteBusiness(id)
    return result 
}