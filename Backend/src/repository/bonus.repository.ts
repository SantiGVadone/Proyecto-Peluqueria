import {pool} from '../config/db'
import { CreateBonusDTO, UpdateBonusDTO } from '../interfaces/bonus.interfaces'

export const getAllBonus = async (business_id: number) => {
    const result = await pool.query('SELECT * FROM bonus WHERE business_id = $1;',[business_id])
    return result.rows
}

export const getBonusById = async (id: number, business_id: number) => {
    const result = await pool.query(
        'SELECT * FROM bonus WHERE id = $1 AND business_id = $2;',
        [id, business_id]
    )
    return result.rows[0]
}

export const getBonusByEmployeeId = async (employeeId: number, business_id: number) => {
    const result = await pool.query(`
        SELECT * FROM bonus WHERE employee_id = $1 AND business_id = $2;
        `,[employeeId, business_id])
    return result.rows
}

export const newBonus = async (data: CreateBonusDTO, business_id: number) => {
    const result = await pool.query(`
        INSERT INTO bonus (amount, description, created_at, business_id, employee_id) 
                VALUES    ($1    , $2         , $3        , $4         , $5         ) RETURNING *;`,
                        [data.amount, data.description, data.createdAt, data.employeeId, business_id])
    return result.rows[0]
}

export const updateBonus = async (id:number, data: UpdateBonusDTO, business_id: number) => {
    const result = await pool.query(`
        UPDATE bonus SET 
        amount = COALESCE ($1, amount),
        description = COALESCE ($2, description),
        created_at = COALESCE ($3, created_at),
        business_id = COALESCE ($4, business_id),
        employee_id = COALESCE ($5, employee_id)
        WHERE id = $5 RETURNING *;`
        ,[data.amount, data.description, data.createdAt, business_id, data.employeeId, id])
    return result.rows[0]
}

export const deleteBonus = async (id:number, business_id: number) => {
    const result = await pool.query(`
        DELETE FROM bonus WHERE id = $1 AND business_id = $2 RETURNING *;`, [id, business_id])
    return result.rows[0]
}