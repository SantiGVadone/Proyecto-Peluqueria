import {pool} from '../config/db'
import { CreateServicesDTO, UpdateServicesDTO } from '../interfaces/services.interfaces'

export const getAllServices = async (business_id: number) => {
    const result = await pool.query('SELECT * FROM services WHERE business_id = $1;',[business_id])
    return result.rows
}

export const getServicesById = async (id: number, business_id: number) => {
    const result = await pool.query(
        'SELECT * FROM services WHERE id = $1 AND business_id = $2;',
        [id, business_id]
    )
    return result.rows[0]
}

export const newServices = async (data: CreateServicesDTO, business_id: number) => {
    const result = await pool.query(`
        INSERT INTO services (name, business_id) 
                      VALUES ($1  , $2         ) RETURNING *;`,[data.name, business_id])
    return result.rows[0]
}

export const updateServices = async (id:number, data: UpdateServicesDTO, business_id: number) => {
    const result = await pool.query(`
        UPDATE services SET 
        name = COALESCE($1, name)
        WHERE id = $2 AND business_id = $3 RETURNING *;`
        ,[data.name, id, business_id])
    return result.rows[0]
}

export const deleteServices = async (id:number, business_id: number) => {
    const result = await pool.query(`
        DELETE FROM services WHERE id = $1 AND business_id = $2 RETURNING *;`, [id, business_id])
        // ya puse el on delete cascade en el sql
    return result.rows[0]
}