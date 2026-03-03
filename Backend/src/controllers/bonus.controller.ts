import {Request, Response} from 'express'
import { bonusSchema, updateBonusSchema } from '../schemas/bonus.schemas'
import { getAllBonusServices, getBonusByIdService, getBonusByEmployeeIdService, createBonusService, updateBonusService, deleteBonusService } from '../services/bonus.services'

//Get all the bonus
export const getAllBonusController = async (_req: Request, res: Response) => {
    try{
        const result = await getAllBonusServices()
        res.status(200).json(result)
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Error al obtener los bonus'})
    }
}

//Get a bonus by Id
export const getBonusByIdController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string, 10)
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido'})
        }
        const result = await getBonusByIdService(id)
        if (!result) {
            return res.status(404).json({ message: 'Bonus no encontrado'})
        }
        return res.status(200).json(result)
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Error al obtener el bonus'})
    }
}

//Get a Bonus by employee id
export const getBonusByEmployeeIdController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string, 10)
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido'})
        }
        const result = await getBonusByEmployeeIdService(id)
        if (!result) {
            return res.status(404).json({ message: 'Bonus no encontrados'})
        }
        return res.status(200).json(result)
    }
    catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Error al obtener los bonus'})
    }
}

//Create a new Bonus
export const createBonusController = async (req: Request, res: Response) => {
    try{
        const validation = bonusSchema.safeParse(req.body)
        if ( !validation.success) {
            return res.status(400).json({ error: validation.error.message})
        }
        //si estoy aca es porque ya valide los datos
        const newBonus = await createBonusService(validation.data)
        res.status(201).json(newBonus)

    }catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Error al crear el bonus'})
    }
}

// Update a existing Bonus
export const updateBonusController = async (req: Request, res: Response) => {
    try{
        const id = parseInt(req.params.id as string, 10)
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido'})
        }
            // Validar los datos de entrada
        const validation = updateBonusSchema.safeParse(req.body)
        if (!validation.success) {
            return res.status(400).json({ error: validation.error.message })
        }
        
        const updatedBonus = await updateBonusService(id , validation.data)
        if (!updatedBonus) {
            return res.status(404).json({ message: 'Bonus no encontrado' })
        }
        res.status(200).json(updatedBonus)
    }catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Error al actualizar los bonus'})
    }
}

// Delete a Bonus by Id
export const deleteBonusController = async (req: Request, res: Response) => {
    try{
        const id = parseInt(req.params.id as string, 10)
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido'})
        }
        
        const result = await deleteBonusService(id)
            if(! result ) {
                return res.status(404).json({ message: 'Registro no encontrado'})
            }
        res.status(200).json({ message: 'Registro eliminado correctamente'})
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Error al eliminar el registro'})
    }
 }