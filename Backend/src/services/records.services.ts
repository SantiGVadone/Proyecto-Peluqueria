import { CreateRecordsDTO, UpdateRecordsDTO } from '../interfaces/records.interfaces'
import { getAllRecords, getRecordsById, getRecordsByClientId, getRecordsByEmployeeId, newRecords, updateRecords, deleteRecords} from '../repository/records.repository'


export const getAllRecordsServices = async (business_id: number) => {
    const result = await getAllRecords(business_id)
    return result
}

export const getRecordsByIdService = async (id: number, business_id: number) => {
    const record = await getRecordsById(id, business_id)
    return record
}

export const getRecordsByClientIdService = async (clientId: number, business_id: number) => {
    const records = await getRecordsByClientId(clientId, business_id)
    return records
}

export const getRecordsByEmployeeIdService = async (employeeId: number, business_id: number) => {
    const records = await getRecordsByEmployeeId(employeeId, business_id)
    return records
}
export const createRecordsService = async (data: CreateRecordsDTO, business_id: number) => {
    //tengo que mandar los datos a la db
    const result = await newRecords(data, business_id)
    return result
}

export const updateRecordsService = async (id:number , data: UpdateRecordsDTO, business_id: number) => {
    const result = await updateRecords(id, data, business_id)
    return result
}

export const deleteRecordsService = async (id:number, business_id: number) => {
    const result = await deleteRecords(id, business_id)
    return result
}

