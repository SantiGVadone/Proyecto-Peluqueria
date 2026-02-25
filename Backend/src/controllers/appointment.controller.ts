import { Request, Response } from 'express'
import { getAllAppointmentsServices, getAppointmentByIdServices, createAppointmentServices, updateAppointmentServices, deleteAppointmentServices} from '../services/appointment.services'
import {appointmentSchema, updateAppointmentSchema} from '../schemas/appointment.schemas'

export const getAllAppointmentsController = async ( req: Request, res: Response) => {
    try {
        const result = await getAllAppointmentsServices()
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
        const validation = appointmentSchema.safeParse(req.body)
        if ( !validation.success) {
            return res.status(400).json({ error: validation.error.message})
        }
        // aca los datos ya estan validados 
        const result = createAppointmentServices(validation.data)
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

        const validate= updateAppointmentSchema.safeParse(req.body)
        if(!validate.success){
            return res.status(400).json({ error: validate.error.message })
        }
        //esto quiere decir que la req es valida
        const updatedAppointment = updateAppointmentServices (id, validate.data)
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