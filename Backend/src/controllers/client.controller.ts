import {Request, Response} from 'express'
import { getAllClientsServices, getClientByIdService, createClientService, updateClientService , deleteClientService} from '../services/client.services'

//Get all the clients
export const getAllClientsController = async (_req: Request, res: Response) => {
    try{
        const result = await getAllClientsServices()
        res.status(200).json(result)
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Error al obtener los clientes'})
    }
}

//Get a client by Id
export const getClientByIdController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string, 10)
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido'})
        }
        const result = await getClientByIdService(id)
        if (!result) {
            return res.status(404).json({ message: 'Cliente no encontrado'})
        }
        return res.status(200).json(result)
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Error al obtener el cliente'})
    }
}

//Create a new client
export const createClientController = async (req: Request, res: Response) => {
    try{
        const data = res.locals.validatedBody ?? req.body
        //si estoy aca es porque ya valide los datos
        const newClient = await createClientService(data)
        res.status(201).json(newClient)

    }catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Error al crear el cliente'})
    }
}

// Update a existing client
export const updateClientController = async (req: Request, res: Response) => {
    try{
        const id = parseInt(req.params.id as string, 10)
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido'})
        }
        const data = res.locals.validatedBody ?? req.body
        // Aquí iría la lógica para actualizar el cliente en la base de datos
        const updatedClient = await updateClientService(id , data)
        if (!updatedClient) {
            return res.status(404).json({ message: 'Cliente no encontrado' })
        }
        res.status(200).json(updatedClient)
    }catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Error al actualizar el cliente'})
    }
}

// Delete a client by Id
export const deleteClientController = async (req: Request, res: Response) => {
    try{
        const id = parseInt(req.params.id as string, 10)
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido'})
        }
        
        const result = await deleteClientService(id)
            if(! result ) {
                return res.status(404).json({ message: 'Cliente no encontrado'})
            }
        res.status(200).json({ message: 'Cliente eliminado correctamente'})
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Error al eliminar el cliente'})
    }

 }

