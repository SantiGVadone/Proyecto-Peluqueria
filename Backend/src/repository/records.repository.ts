import {pool} from '../config/db'
import { CreateRecordsDTO, UpdateRecordsDTO } from '../interfaces/records.interfaces'

export const getAllRecords = async () => {
    const result = await pool.query('SELECT * FROM records;')
    return result.rows
}

export const getRecordsById = async (id: number) => {
    const result = await pool.query(
        'SELECT * FROM records WHERE id = $1;',
        [id]
    )
    return result.rows[0]
}

export const getRecordsByClientId = async (clientId: number) => {
    const result = await pool.query(`
        SELECT * FROM records WHERE client_id = $1;
        `,[clientId])
    return result.rows
}

export const getRecordsByEmployeeId = async (employeeId: number) => {
    const result = await pool.query(`
        SELECT * FROM records WHERE employee_id = $1;
        `,[employeeId])
    return result.rows
}

export const newRecords = async (data: CreateRecordsDTO) => {
    const result = await pool.query(`
        INSERT INTO records (client_id, employee_id, service_id, appointment_id, description, total_cost, date) 
                      VALUES ($1  , $2, $3, $4, $5, $6, $7) RETURNING *;`,[data.clientId, data.employeeId, data.serviceId, data.appointmentId, data.description, data.totalCost, data.date])
    return result.rows[0]
}

export const updateRecords = async (id:number, data: UpdateRecordsDTO) => {
    const result = await pool.query(`
        UPDATE records SET 
        client_id = COALESCE($1, client_id),
        employee_id = COALESCE ($2, employee_id),
        service_id = COALESCE ($3, service_id),
        appointment_id = COALESCE ($4, appointment_id),
        description = COALESCE ($5, description),
        total_cost = COALESCE ($6, total_cost),
        date = COALESCE ($7, date)
        WHERE id = $8 RETURNING *;`
        ,[data.clientId, data.employeeId, data.serviceId, data.appointmentId, data.description, data.totalCost, data.date, id])
    return result.rows[0]
}

export const deleteRecords = async (id:number ) => {
    const result = await pool.query(`
        DELETE FROM records WHERE id = $1 RETURNING *;`, [id])
        // ya puse el on delete cascade en el sql
    return result.rows[0]
}