import { pool } from '../config/db'
import {
  CreateAppointmentDTO,
  UpdateAppointmentDTO,
} from '../interfaces/appointment.interfaces'

export const getAllAppointments = async (business_id: number) => {
  const result = await pool.query(
    `
        SELECT * FROM appointments WHERE business_id = $1;`,
    [business_id],
  )
  return result.rows
}

export const getAppointmentByRange = async (
  fromDate: Date,
  toDate: Date,
  business_id: number,
) => {
  const result = await pool.query(
    `SELECT 
    a.*, 
    c.name AS client_name, 
    s.name AS service_name
    FROM appointments a
    JOIN clients c ON a.client_id = c.id
    JOIN services s ON a.service_id = s.id
    WHERE a.date >= $1 AND a.date <= $2
    AND a.business_id = $3;`,
    [fromDate, toDate, business_id],
  )

  return result.rows
}

export const getAppointmentById = async (id: number, business_id: number) => {
  const result = await pool.query(
    `
        SELECT * FROM appointments WHERE id = $1 AND business_id= $2;
        `,
    [id, business_id],
  )
  return result.rows[0]
}

export const createAppointment = async (
  data: CreateAppointmentDTO,
  business_id: number,
) => {
  const result = await pool.query(
    `
        INSERT INTO appointments (client_id, employee_id, service_id, business_id,  date, start_time, duration, status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *;`,
    [
      data.clientId,
      data.employeeId,
      data.serviceId,
      business_id,
      data.date,
      data.startTime,
      data.duration,
      data.status,
    ],
  )
  return result.rows[0]
}

export const updateAppointment = async (
  id: number,
  business_id: number,
  data: UpdateAppointmentDTO,
) => {
  const result = await pool.query(
    `
        UPDATE appointments SET 
        client_id = COALESCE($1, client_id),
        employee_id = COALESCE($2, employee_id),
        service_id = COALESCE($3, service_id),
        date = COALESCE ($4, date),
        start_time = COALESCE ($5, start_time),
        duration = COALESCE ($6, duration),
        status = COALESCE ($7, status),
        total_cost = COALESCE ($8, total_cost )
        WHERE id = $9 AND business_id = $10 
        RETURNING *;`,
    [
      data.clientId,
      data.employeeId,
      data.serviceId,
      data.date,
      data.startTime,
      data.duration,
      data.status,
      data.total,
      id,
      business_id,
    ],
  )
  return result.rows[0]
}

export const deleteAppointment = async (id: number, business_id: number) => {
  const result = await pool.query(
    `
            DELETE FROM appointment WHERE appointment_id = $1 AND business_id = $2;`,
    [id, business_id],
  )
  return result
}
