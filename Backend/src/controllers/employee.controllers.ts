import {Request, Response} from 'express'
import { getAllEmployeeServices, getEmployeeByIdService, createEmployeeService, updateEmployeeService, deleteEmployeeService} from '../services/employee.services'

//Get all the clients
export const getAllEmployeeController = async (_req: Request, res: Response) => {
    try{
        const {business_id} = res.locals.user

        const result = await getAllEmployeeServices(business_id)
        res.status(200).json(result)
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Error al obtener los empleados'})
    }
}

//Get a Employee by Id
export const getEmployeeByIdController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string, 10)
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido'})
        }

        const {business_id} = res.locals.user

        const result = await getEmployeeByIdService(id, business_id)
        if (!result) {
            return res.status(404).json({ message: 'Empleado no encontrado'})
        }
        return res.status(200).json(result)
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Error al obtener el empleado'})
    }
}

//Create a new Employee
export const createEmployeeController = async (req: Request, res: Response) => {
    try{
        const data = res.locals.validatedBody ?? req.body
        //si estoy aca es porque ya valide los datos
        const newEmployee = await createEmployeeService(data)

        res.status(201).json(newEmployee)

    }catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Error al crear el empleado'})
    }
}

// Update a existing Employee
export const updateEmployeeController = async (req: Request, res: Response) => {
    try{
        const id = parseInt(req.params.id as string, 10)
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido'})
        }
            // Validar los datos de entrada
        const data = res.locals.validatedBody ?? req.body

        const {business_id} = res.locals.user

        // Aquí iría la lógica para actualizar el Employeee en la base de datos
        const updatedEmployee = await updateEmployeeService(id , data, business_id)
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Empleado no encontrado' })
        }
        res.status(200).json(updatedEmployee)
    }catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Error al actualizar el empleado'})
    }
}

// Delete a Employee by Id
export const deleteEmployeeController = async (req: Request, res: Response) => {
    try{
        const id = parseInt(req.params.id as string, 10)
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido'})
        }
        const {business_id, userId, role} = res.locals.user

        if(role !== 'ADMIN' && role !== 'BOSS' && Number(userId) !== id ) { //solo boss o admin pueden borrar a otros
            return res.status(403).json({ 
                message: 'Acceso denegado: No puedes eliminar los datos de otros empleados' 
            });
        }

        const result = await deleteEmployeeService(id, business_id)
            if(! result ) {
                return res.status(404).json({ message: 'Empleado no encontrado'})
            }
        res.status(200).json({ message: 'Empleado eliminado correctamente'})
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Error al eliminar el empleado'})
    }

 }

