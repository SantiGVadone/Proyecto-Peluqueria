import {pool} from '../config/db'
import { CreateClientDTO, UpdateClientDTO } from '../interfaces/client.interfaces'

export const getAllClients = async () => {
    const result = await pool.query('SELECT * FROM clients;')
    return result.rows
}

export const getClientById = async (id: number) => {
    const result = await pool.query(
        'SELECT * FROM clients WHERE id = $1;',
        [id]
    )

    return result.rows[0]
}

export const newClient = async (data: CreateClientDTO) => {
    const result = await pool.query(`
        INSERT INTO clients (name, lastname, phone, origin, created_at, business_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
        [data.name, data.lastname, data.phone, data.origin, new Date(), data.businessId])
    return result.rows[0]
}

export const updateClient = async (id:number, data: UpdateClientDTO) => {
    
    const result = await pool.query(`
        UPDATE clients SET 
        name = COALESCE($1, name),
        lastname = COALESCE($2, lastname),
        phone = COALESCE($3, phone),
        origin = COALESCE($4, origin),
        business_id = COALESCE ($5, business_id)
        WHERE id = $6 RETURNING *;`
        ,[data.name, data.lastname, data.phone, data.origin, data.businessId ,id])
    return result.rows[0]
}

export const deleteClient = async (id:number ) => {
    const result = await pool.query(`
        DELETE FROM clients WHERE id = $1 RETURNING *;`, [id])
        // ya puse el on delete cascade en el sql
    return result.rows[0]
}