import {Request, Response} from 'express'
import { getAllBonusServices, getBonusByIdService, getBonusByEmployeeIdService, createBonusService, updateBonusService, deleteBonusService } from '../services/bonus.services'

//Get all the bonus
export const getAllBonusController = async (_req: Request, res: Response) => {
    try{
        const {business_id} = res.locals.user
        const result = await getAllBonusServices(business_id)
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
        const {business_id} = res.locals.user

        const result = await getBonusByIdService(id, business_id)

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
        const {role, business_id, id: loggedUserId} = res.locals.user
        const { id: targetEmployeeId } = req.params

        if (role === 'EMPLOYEE' && Number(loggedUserId) !== Number(targetEmployeeId)) {
            return res.status(403).json({ 
                message: 'Acceso denegado: No puedes ver los bonos de otro empleado' 
            });
        }

        const result = await getBonusByEmployeeIdService(id, business_id)

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
        const data = res.locals.validatedBody ?? req.body
        const {business_id} = res.locals.user
        //si estoy aca es porque ya valide los datos
        const newBonus = await createBonusService(data, business_id)
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
        const data = res.locals.validatedBody ?? req.body

        const {business_id} = res.locals.user
        
        const updatedBonus = await updateBonusService(id , data, business_id)
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
        
        const {business_id} = res.locals.user

        const result = await deleteBonusService(id, business_id)
            if(! result ) {
                return res.status(404).json({ message: 'Registro no encontrado'})
            }
        res.status(200).json({ message: 'Registro eliminado correctamente'})
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Error al eliminar el registro'})
    }
 }