import {Request, Response} from 'express'
import { getAllRecordsServices, getRecordsByIdService, getRecordsByClientIdService, getRecordsByEmployeeIdService, createRecordsService, updateRecordsService, deleteRecordsService } from '../services/records.services'

//Get all the clients
export const getAllRecordsController = async (_req: Request, res: Response) => {
    try{
        const result = await getAllRecordsServices()
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
        const result = await getRecordsByIdService(id)
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
        const result = await getRecordsByClientIdService(id)
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
        const result = await getRecordsByEmployeeIdService(id)
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
        //si estoy aca es porque ya valide los datos
        const newRecords = await createRecordsService(data)
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

        const updatedRecords = await updateRecordsService(id , data)

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
        
        const result = await deleteRecordsService(id)
            if(! result ) {
                return res.status(404).json({ message: 'Registro no encontrado'})
            }
        res.status(200).json({ message: 'Registro eliminado correctamente'})
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Error al eliminar el registro'})
    }
 }