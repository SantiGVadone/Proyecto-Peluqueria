import { getAllClients, getClientById, newClient, updateClient, deleteClient} from '../repository/client.repository'
import { CreateClientDTO, UpdateClientDTO } from '../interfaces/client.interfaces'

export const getAllClientsServices = async (business_id: number) => {
    const result = await getAllClients(business_id)
    return result
}

export const getClientByIdService = async (id: number, business_id: number) => {
    const client = await getClientById(id, business_id)
    return client
}

export const createClientService = async (data: CreateClientDTO, business_id: number) => {
    //tengo que mandar los datos a la db
    const result = await newClient(data, business_id)
    return result
}

export const updateClientService = async (id:number , data: UpdateClientDTO, business_id: number) => {
    const result = await updateClient(id, data, business_id)
    return result
}

export const deleteClientService = async (id:number, business_id: number) => {
    const result = await deleteClient(id, business_id)
    return result
}


//DATO IMPORTANTE 
// por ahora parece que el service esta al pedo pero el dia de mañana el service tiene que evitar duplicados, normalizar telefonos
//aplicar reglas de negocio, no permitir crear clientes con mismo telefonos, todo eso va en service y no en el controller, el controller solo tiene que recibir la request, mandar los datos al service y devolver la response, nada mas, el service es el que hace toda la logica de negocio, el controller es solo un intermediario entre el cliente y el service, no tiene que tener logica de negocio, esa es la idea, mantener el controller lo mas limpio posible y toda la logica en el service, asi si algun dia quiero cambiar la logica de negocio no tengo que tocar el controller, solo el service, y si quiero cambiar la forma en que recibo los datos en el controller no tengo que tocar el service, asi mantengo una buena separacion de responsabilidades y un codigo mas limpio y mantenible.