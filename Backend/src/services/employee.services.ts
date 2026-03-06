import { CreateEmployeeDTO, UpdateEmployeeDTO } from '../interfaces/employee.interfaces'
import { getAllEmployee, getEmployeeById, newEmployee, updateEmployee, deleteEmployee} from '../repository/employee.repository'


export const getAllEmployeeServices = async (business_id: number) => {
    const result = await getAllEmployee(business_id)
    return result
}

export const getEmployeeByIdService = async (id: number, business_id: number) => {
    const client = await getEmployeeById(id, business_id)
    return client
}

export const createEmployeeService = async (data: CreateEmployeeDTO) => {
    //tengo que mandar los datos a la db
    const result = await newEmployee(data)
    return result
}

export const updateEmployeeService = async (id:number , data: UpdateEmployeeDTO, business_id: number) => {
    const result = await updateEmployee(id, data, business_id)
    return result
}

export const deleteEmployeeService = async (id:number, business_id: number) => {
    const result = await deleteEmployee(id, business_id)
    return result
}

