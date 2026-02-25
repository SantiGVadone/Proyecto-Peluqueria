import { pool } from '../config/db'
import { CreateAppointmentDTO, UpdateAppointmentDTO } from '../interfaces/appointment.interfaces'

export const getAllAppointments = async () => {
    const result = await pool.query ( `
        SELECT * FROM appointments
        `)
    return result.rows
}

export const getAppointmentById = async (id: number) => {
    const result = await pool.query(`
        SELECT * FROM appointments WHERE id = $1
        `, [ id])
    return result.rows[0]
}

export const createAppointment = async (data: CreateAppointmentDTO) => {
    const result = await pool.query(`
        INSERT INTO appointments (client_id, employee_id, service_id, date, start_time, end_time, status) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *;`,
        [data.clientId,data.employeeId,data.serviceId, data.date, data.startTime, data.endTime, data.status])
    return result.rows[0]
}

export const updateAppointment = async (id: number, data: UpdateAppointmentDTO) => {
    // 1. Obtenemos las llaves (campos) que vienen en el objeto
    const keys = Object.keys(data);
    
    if (keys.length === 0) return null // Si no mandaron nada para actualizar, salimos

    // 2. Construimos la parte del "SET campo1 = $1, campo2 = $2"
    // Usamos index + 1 porque en PostgreSQL los parámetros empiezan en $1
    const setClause = keys
        .map((key, index) => `${key} = $${index + 1}`)
        .join(', ');

    // 3. Los valores van en un array aparte para evitar Inyección SQL
    const values = Object.values(data);
    
    // 4. Agregamos el ID al final para el WHERE
    const query = `
        UPDATE appointments 
        SET ${setClause} 
        WHERE id = $${keys.length + 1}
        RETURNING *;
    `;

    const result = await pool.query(query, [...values, id]);
    return result.rows[0];
};

export const deleteAppointment = async (id:number) => {
    const result = await pool.query(`
            DELETE FROM appointment WHERE appointment_id = $1;`,[id]) //aca tengo que hacer el delette del appointment con cascada
    return result
}