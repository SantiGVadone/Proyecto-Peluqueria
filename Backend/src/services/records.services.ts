import { CreateRecordsDTO, UpdateRecordsDTO } from '../interfaces/records.interfaces'
import { getAllRecords, getRecordsById, getRecordsByClientId, getRecordsByEmployeeId, newRecords, updateRecords, deleteRecords} from '../repository/records.repository'


export const getAllRecordsServices = async () => {
    const result = await getAllRecords()
    return result
}

export const getRecordsByIdService = async (id: number) => {
    const record = await getRecordsById(id)
    return record
}

export const getRecordsByClientIdService = async (clientId: number) => {
    const records = await getRecordsByClientId(clientId)
    return records
}

export const getRecordsByEmployeeIdService = async (employeeId: number) => {
    const records = await getRecordsByEmployeeId(employeeId)
    return records
}
export const createRecordsService = async (data: CreateRecordsDTO) => {
    //tengo que mandar los datos a la db
    const result = await newRecords(data)
    return result
}

export const updateRecordsService = async (id:number , data: UpdateRecordsDTO) => {
    const result = await updateRecords(id, data)
    return result
}

export const deleteRecordsService = async (id:number) => {
    const result = await deleteRecords(id)
    return result
}

