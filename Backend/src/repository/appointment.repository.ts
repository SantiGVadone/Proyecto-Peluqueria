import { pool } from '../config/db'

export const getAllAppointments = async () => {
    const result = await pool.query ( `
        SELECT * FROM appointments
        ORDER BY createdAt DESC
        `)
    return result.rows
}

export const getAppointmentById = async (id: number) => {
    const result = await pool.query(`
        SELECT * FROM appointments WHERE id = $1
        `, [ id])
    return result.rows[0]
}