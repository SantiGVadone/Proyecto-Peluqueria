import {pool} from '../config/db'
import { CreateServicesDTO, UpdateServicesDTO } from '../interfaces/services.interfaces'

export const getAllServices = async () => {
    const result = await pool.query('SELECT * FROM services;')
    return result.rows
}

export const getServicesById = async (id: number) => {
    const result = await pool.query(
        'SELECT * FROM services WHERE id = $1;',
        [id]
    )
    return result.rows[0]
}

export const newServices = async (data: CreateServicesDTO) => {
    const result = await pool.query(`
        INSERT INTO services (name, business_id) 
                      VALUES ($1  , $2         ) RETURNING *;`,[data.name, data.businessId])
    return result.rows[0]
}

export const updateServices = async (id:number, data: UpdateServicesDTO) => {
    const result = await pool.query(`
        UPDATE services SET 
        name = COALESCE($1, name),
        business_id = COALESCE ($2, business_id)
        WHERE id = $3 RETURNING *;`
        ,[data.name, data.businessId ,id])
    return result.rows[0]
}

export const deleteServices = async (id:number ) => {
    const result = await pool.query(`
        DELETE FROM services WHERE id = $1 RETURNING *;`, [id])
        // ya puse el on delete cascade en el sql
    return result.rows[0]
}