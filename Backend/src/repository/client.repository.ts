import {pool} from '../config/db'
import { CreateClientDTO, UpdateClientDTO } from '../interfaces/client.interfaces'

export const getAllClients = async () => {
    const result = await pool.query('SELECT * FROM clients')
    return result.rows
}

export const getClientById = async (id: number) => {
    const result = await pool.query(
        'SELECT * FROM clients WHERE id = $1',
        [id]
    )

    return result.rows[0]
}

export const newClient = async (data: CreateClientDTO) => {
    const result = await pool.query(`
        INSERT INTO clients (name, lastname, phone, origin, createdAt) VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
        [data.name, data.lastname, data.phone, data.origin, new Date()])
    return result.rows[0]
}

export const updateClient = async (id:number, data: UpdateClientDTO) => {
    const result = await pool.query(`
        UPDATE clients SET 
        name = COALESCE($1, name),
        lastname = COALESCE($2, lastname),
        phone = COALESCE($3, phone),
        origin = COALESCE($4, origin)
        WHERE id = $5 RETURNING *;`
        ,[data.name, data.lastname, data.phone, data.origin, id])
    return result.rows[0]
}

export const deleteClient = async (id:number ) => {
    const result = await pool.query(`
        DELETE FROM clients WHERE id = $1 RETURNING *;`, [id])
        //aca tengo que agregar que al borrar un cliente se borren tambien sus turnos y todo lo relacionado a ese cliente,
        //  sino voy a tener datos huérfanos en la db
        //EN REALIDAD ESTO SE SOLUCIONA DESDE SQL HACIENDO EL DELETE EN CASCADA EN LA RELACION ENTRE CLIENTS Y TURNOS,
        //  ASI CUANDO BORRO UN CLIENTE SE BORRAN AUTOMATICAMENTE SUS TURNOS, PERO POR LAS DUDAS LO DEJO AQUI TAMBIEN
        //  PARA QUE NO SE ME OLVIDE HACERLO DESDE SQL
    return result.rows[0]
}