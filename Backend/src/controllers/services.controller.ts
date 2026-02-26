import {Request, Response} from 'express'
import { ServicesSchema, updateServicesSchema} from '../schemas/services.schemas'
import { getAllServicesServices, getServicesByIdService, createServicesService, updateServicesService, deleteServicesService} from '../services/services.services'

//Get all the clients
export const getAllServicesController = async (_req: Request, res: Response) => {
    try{
        const result = await getAllServicesServices()
        res.status(200).json(result)
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Error al obtener los servicios'})
    }
}

//Get a Services by Id
export const getServicesByIdController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string, 10)
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido'})
        }
        const result = await getServicesByIdService(id)
        if (!result) {
            return res.status(404).json({ message: 'Servicio no encontrado'})
        }
        return res.status(200).json(result)
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Error al obtener el servicio'})
    }
}

//Create a new Services
export const createServicesController = async (req: Request, res: Response) => {
    try{
        const validation = ServicesSchema.safeParse(req.body)
        if ( !validation.success) {
            return res.status(400).json({ error: validation.error.message})
        }
        //si estoy aca es porque ya valide los datos
        const newServices = await createServicesService(validation.data)
        res.status(201).json(newServices)

    }catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Error al crear el servicio'})
    }
}

// Update a existing Services
export const updateServicesController = async (req: Request, res: Response) => {
    try{
        const id = parseInt(req.params.id as string, 10)
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido'})
        }
            // Validar los datos de entrada
        const validation = updateServicesSchema.safeParse(req.body)
        if (!validation.success) {
            return res.status(400).json({ error: validation.error.message })
        }
        // Aquí iría la lógica para actualizar el Servicese en la base de datos
        const updatedServices = await updateServicesService(id , validation.data)
        if (!updatedServices) {
            return res.status(404).json({ message: 'Servicio no encontrado' })
        }
        res.status(200).json(updatedServices)
    }catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Error al actualizar el servicio'})
    }
}

// Delete a Services by Id
export const deleteServicesController = async (req: Request, res: Response) => {
    try{
        const id = parseInt(req.params.id as string, 10)
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido'})
        }
        
        const result = await deleteServicesService(id)
            if(! result ) {
                return res.status(404).json({ message: 'Servicio no encontrado'})
            }
        res.status(200).json({ message: 'Servicio eliminado correctamente'})
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Error al eliminar el servicio'})
    }
 }