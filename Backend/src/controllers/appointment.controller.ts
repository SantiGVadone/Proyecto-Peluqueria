import { Request, Response } from 'express'
import { getAllAppointmentsServices, getAppointmentByIdServices } from '../services/appointment.services'

export const getAllAppointmentsController = async ( req: Request, res: Response) => {
    try {
        const result = await getAllAppointmentsServices()
        res.status(200).json(result)
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Error al obtener los citas'})
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
            return res.status(404).json({ message: 'Cita no encontrada'})
        }
        return res.status(200).json(result)
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Error al obtener la cita'})
    }
}

export const createAppointmentController = async ( req: Request, res: Response) => {
    try{
        const data = 
    }catch (e){
        console.error(e)
        res.status(500).json({ message: 'Error al crear la cita'})
    }
}