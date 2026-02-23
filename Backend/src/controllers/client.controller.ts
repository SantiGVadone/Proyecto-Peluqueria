import {Request, Response} from 'express'
import { Client } from '../interfaces/client.interfaces'
import clientsData from '../data/clients.json'
import { clientSchema } from '../schemas/client.schemas'

// Casteamos los datos al tipo Client para que TS nos ayude
const clients: Client[] = clientsData as Client[];

//obtener todos los clientes
export const getAllClients = (req: Request, res: Response) => {
    res.status(200).json(clients);
};

//obtener un cliente por ID
export const getClientById = (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string, 10)
    const client = clients.find (c => c.id === id)
    if (!client) {
        return res.status(404).json({ message: 'Cliente no encontrado' })
    }
    res.status(200).json(client)
}

//Crear un nuevo cliente
export const createClient = (req: Request, res: Response) => {
    const validation = clientSchema.safeParse(req.body)
    if ( !validation.success) {
        return res.status(400).json({ error: validation.error.message})
    }

    //si estamos aca es porque los datos fueron validos
    const newClient: Client = { //junto los datos validados y el id y date de creacion
        ...validation.data,
        id: clients.length + 1,
        createdAt: new Date()
    }
    //tengo que mandar los datos a la db 
    clients.push(newClient)
    res.status(201).json(newClient)
}

//actualizar un cliente existente 
export const updateClient = (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string, 10)
    const clientIndex = clients.findIndex( c => c.id === id) //busca el cliente por id y devuelve la pos 
    if ( clientIndex === -1 ) {
        return res.status(404).json({ message: 'Cliente no encontrado'})
    }
    const updatedClient = { ...clients[clientIndex], ...req.body }
    clients[clientIndex] = updatedClient
    return res.status(200).json({ message: 'Cliente actualizado correctamente', client: updatedClient })
}

export const deleteClient = (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string, 10)
    const clientIndex = clients.findIndex( c => c.id === id) //busca el cliente por id y devuelve la pos 
    if ( clientIndex === -1 ) {
        return res.status(404).json({ message: 'Cliente no encontrado'})
    }
    clients.splice(clientIndex, 1) //elimina el cliente del array
    return res.status(200).json({ message: 'Cliente eliminado correctamente'})
}

