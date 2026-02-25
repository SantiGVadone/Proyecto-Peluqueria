import {pool} from '../config/db'
import { CreateBusinessDTO, UpdateBusinessDTO } from '../interfaces/business.interfaces'

export const getAllBusiness = async () => {
    const result = await pool.query(`
        SELECT * FROM business;
        `)
    return result.rows
}

export const getBusinessById = async ( id: number) => {
    const result = await pool.query(`
        SELECT * FROM business WHERE id= $1;`,[id])
    return result.rows[0]
}

export const newBusiness = async (data: CreateBusinessDTO) => {
    const result = await pool.query(`
        INSERT INTO business (name, location, phone, inflow, outflow, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
        [data.name, data.location, data.phone, data.inflow, data.outflow ,new Date()])
    return result.rows[0]
}

export const updateBusiness = async (id:number , data: UpdateBusinessDTO) => {
        const result = await pool.query(`
            UPDATE business SET 
            name = COALESCE($1, name),
            location = COALESCE($2, location),
            phone = COALESCE($3, phone),
            inflow = COALESCE($4, inflow)
            outflow = COALESCE($5, outflow)
            WHERE id = $6 RETURNING *;`
            ,[data.name, data.location, data.phone, data.inflow, data.outflow,id])
        return result.rows[0]
}

export const deleteBusiness = async (id: number) => {
    const result = await pool.query(`
        DELETE FROM business WHERE id= $1 RETURNING *;`,[id])
    return result.rows[0]
}