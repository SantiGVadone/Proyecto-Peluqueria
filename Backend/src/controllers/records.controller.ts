import {Request, Response} from 'express'
import { getAllRecordsServices, getRecordsByIdService, getRecordsByClientIdService, getRecordsByEmployeeIdService, createRecordsService, updateRecordsService, deleteRecordsService } from '../services/records.services'

//Get all the clients
export const getAllRecordsController = async (_req: Request, res: Response) => {
    try{
        const {business_id} = res.locals.user
        const result = await getAllRecordsServices(business_id)
        res.status(200).json(result)
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Error al obtener los registros'})
    }
}

//Get a Records by Id
export const getRecordsByIdController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string, 10)
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido'})
        }
        const {business_id} = res.locals.user
        const result = await getRecordsByIdService(id, business_id)
        if (!result) {
            return res.status(404).json({ message: 'Registros no encontrados'})
        }
        return res.status(200).json(result)
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Error al obtener los registros'})
    }
}

//Get a Records by client id 
export const getRecordsByClientIdController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string, 10)
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido'})
        }
        const {business_id} = res.locals.user

        const result = await getRecordsByClientIdService(id, business_id)
        if (!result) {
            return res.status(404).json({ message: 'Registros no encontrados'})
        }
        return res.status(200).json(result)
    }
    catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Error al obtener los registros'})
    }
}

//Get a Records by employee id
export const getRecordsByEmployeeIdController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string, 10)
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido'})
        }

        const {business_id, user_id, role} = res.locals.user

        if(role !== 'ADMIN' && role !== 'BOSS' && Number(user_id) !== id){
            return res.status(403).json({ 
                message: 'Acceso denegado: No puedes ver los datos de otros empleados' 
            });
        }

        const result = await getRecordsByEmployeeIdService(id, business_id)
        if (!result) {
            return res.status(404).json({ message: 'Registros no encontrados'})
        }
        return res.status(200).json(result)
    }
    catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Error al obtener los registros'})
    }
}

//Create a new Records
export const createRecordsController = async (req: Request, res: Response) => {
    try{
        const data = res.locals.validatedBody ?? req.body
        const { business_id} = res.locals.user

        const newRecords = await createRecordsService(data,business_id)
        res.status(201).json(newRecords)

    }catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Error al crear el registro'})
    }
}

// Update a existing Records
export const updateRecordsController = async (req: Request, res: Response) => {
    try{
        const id = parseInt(req.params.id as string, 10)
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido'})
        }

        // Validar los datos de entrada
        const data = res.locals.validatedBody ?? req.body

        const {business_id} = res.locals.user

        const updatedRecords = await updateRecordsService(id, data, business_id)

        if (!updatedRecords) {
            return res.status(404).json({ message: 'Registro no encontrado' })
        }
        res.status(200).json(updatedRecords)
    }catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Error al actualizar los registros'})
    }
}

// Delete a Records by Id
export const deleteRecordsController = async (req: Request, res: Response) => {
    try{
        const id = parseInt(req.params.id as string, 10)
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido'})
        }
        
        const {business_id} = res.locals.user


        const result = await deleteRecordsService(id, business_id)
            if(! result ) {
                return res.status(404).json({ message: 'Registro no encontrado'})
            }
        res.status(200).json({ message: 'Registro eliminado correctamente'})
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Error al eliminar el registro'})
    }
 }