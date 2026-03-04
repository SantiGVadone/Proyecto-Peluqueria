import { Request, Response } from "express";
import { getAllBusinessServices, getBusinessByIdServices, createBusinessServices, updateBusinessServices, deleteBusinessServices} from '../services/business.services'

export const getAllBusinessController = async (_req: Request, res: Response) => {
    try{
        const result = await getAllBusinessServices()
        res.status(200).json(result)
    }catch(e){
        console.error(e)
        res.status(500).json({ message: 'Error al obtener los negocios'})
    }
}

export const getBusinessByIdController = async (req: Request, res: Response) => {
    try{
        const id = parseInt(req.params.id as string , 10)
        if( isNaN (id)){
            return res.status(400).json({ message: 'ID invalida'})
        }
        const result = getBusinessByIdServices(id)
        res.status(200).json(result)
    }catch(e){
        console.error(e)
        res.status(500).json({message: 'Error al obtener el negocio'})
    }
}

export const createBusinessController = async (req: Request, res: Response) => {
    try{
        const data = res.locals.validatedBody ?? req.body
        const newBusiness = await createBusinessServices(data)

        return res.status(201).json(newBusiness)
    }catch(e){
        console.error(e)
        res.status(500).json({ message: 'Error al crear el negocio'})
    }
}

export const updateBusinessController = async (req: Request, res: Response) => {
    try{
        const id = parseInt(req.params.id as string , 10)
        if( isNaN (id)){
            return res.status(400).json({ message: 'ID invalida'})
        }
        const data = res.locals.validatedBody ?? req.body
        const updatedBusiness = await updateBusinessServices(id, data)

        return res.status(200).json(updatedBusiness)
    }catch(e){
        console.error(e)
        res.status(500).json({message: 'Error al actualizar el negocio' })
    }
}

export const deleteBusinessController = async (req: Request, res: Response) => {
    try{
        const id = parseInt(req.params.id as string , 10)
        if( isNaN (id)){
            return res.status(400).json({ message: 'ID invalida'})
        }
        const deleteBusiness = await deleteBusinessServices(id)
        if( ! deleteBusiness){
            return res.status(400).json({ message: 'Negocio no encontrado'})
        }
        return res.status(200).json(deleteBusiness)

    }catch(e){
        console.error(e)
        res.status(500).json({message: 'Error al eliminar el negocio' })
    }
}