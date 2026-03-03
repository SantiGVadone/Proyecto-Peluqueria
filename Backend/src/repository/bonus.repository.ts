import {pool} from '../config/db'
import { CreateBonusDTO, UpdateBonusDTO } from '../interfaces/bonus.interfaces'

export const getAllBonus = async () => {
    const result = await pool.query('SELECT * FROM bonus;')
    return result.rows
}

export const getBonusById = async (id: number) => {
    const result = await pool.query(
        'SELECT * FROM bonus WHERE id = $1;',
        [id]
    )
    return result.rows[0]
}

export const getBonusByEmployeeId = async (employeeId: number) => {
    const result = await pool.query(`
        SELECT * FROM bonus WHERE employee_id = $1;
        `,[employeeId])
    return result.rows
}

export const newBonus = async (data: CreateBonusDTO) => {
    const result = await pool.query(`
        INSERT INTO bonus (amount, description, created_at, employee_id) 
                VALUES    ($1    , $2         , $3        , $4         ) RETURNING *;`,
                        [data.amount, data.description, data.createdAt, data.employeeId])
    return result.rows[0]
}

export const updateBonus = async (id:number, data: UpdateBonusDTO) => {
    const result = await pool.query(`
        UPDATE bonus SET 
        amount = COALESCE ($1, amount),
        description = COALESCE ($2, description),
        created_at = COALESCE ($3, created_at),
        employee_id = COALESCE ($4, employee_id)
        WHERE id = $5 RETURNING *;`
        ,[data.amount, data.description, data.createdAt, data.employeeId, id])
    return result.rows[0]
}

export const deleteBonus = async (id:number ) => {
    const result = await pool.query(`
        DELETE FROM bonus WHERE id = $1 RETURNING *;`, [id])
    return result.rows[0]
}