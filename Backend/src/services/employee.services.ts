import { CreateEmployeeDTO, UpdateEmployeeDTO } from '../interfaces/employee.interfaces'
import { getAllEmployee, getEmployeeById, newEmployee, updateEmployee, deleteEmployee} from '../repository/employee.repository'


export const getAllEmployeeServices = async () => {
    const result = await getAllEmployee()
    return result
}

export const getEmployeeByIdService = async (id: number) => {
    const client = await getEmployeeById(id)
    return client
}

export const createEmployeeService = async (data: CreateEmployeeDTO) => {
    //tengo que mandar los datos a la db
    const result = await newEmployee(data)
    return result
}

export const updateEmployeeService = async (id:number , data: UpdateEmployeeDTO) => {
    const result = await updateEmployee(id, data)
    return result
}

export const deleteEmployeeService = async (id:number) => {
    const result = await deleteEmployee(id)
    return result
}

