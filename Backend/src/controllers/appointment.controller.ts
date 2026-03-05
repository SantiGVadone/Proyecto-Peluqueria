import { Request, Response } from 'express'
import { getAllAppointmentsServices, getAppointmentByIdServices, createAppointmentServices, updateAppointmentServices, deleteAppointmentServices} from '../services/appointment.services'

export const getAllAppointmentsController = async ( req: Request, res: Response) => {
    try {
        const { business_id} = res.locals.user
        const result = await getAllAppointmentsServices(business_id)
        res.status(200).json(result)
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Error al obtener los turnos'})
    }
}

export const getAppointmentByIdController = async ( req: Request, res: Response) => {
    try{
        const id = parseInt(req.params.id as string, 10)
        if (isNaN(id)){
            return res.status(400).json({ message: 'ID invalido'})
        }
        const result = await getAppointmentByIdServices(id)
        if (!result){
            return res.status(404).json({ message: 'Turno no encontrado'})
        }
        return res.status(200).json(result)
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Error al obtener el turno'})
    }
}

export const createAppointmentController = async ( req: Request, res: Response) => {
    try{
        const data = res.locals.validatedBody ?? req.body
        // aca los datos ya estan validados 
        const result = createAppointmentServices(data)
        return res.status(201).json(result)
    }catch (e){
        console.error(e)
        res.status(500).json({ message: 'Error al crear el turno'})
    }
}

export const updateAppointmentController = async (req: Request, res: Response) => {
    try{
        const id = parseInt(req.params.id as string, 10)
        if(isNaN(id)){
            return res.status(400).json({ message: 'ID invalido'})
        }
        //esto quiere decir que la id  es valida
        const data = res.locals.validatedBody ?? req.body

        const updatedAppointment = updateAppointmentServices (id, data)
        return updatedAppointment
    }catch (e) {
        console.error(e)
        res.status(500).json({message: 'Error al actualizar el turno'})
    }
}

export const deleteAppointmentController = async (req: Request, res: Response) => {
    try{
        const id = parseInt(req.params.id as string , 10)
        if(isNaN(id)){
            return res.status(400).json({message: 'ID invalido'})
        }
        const deleteResult = deleteAppointmentServices(id)
        return deleteResult

    }catch(e){
        console.error(e)
        res.status(500).json({message: 'Error al eliminar el turno'})
    }
}