import {pool} from '../config/db'
import { CreateEmployeeDTO, UpdateEmployeeDTO } from '../interfaces/employee.interfaces'

export const getAllEmployee = async (business_id: number) => {
    const result = await pool.query('SELECT * FROM employee WHERE business_id = $1;',[business_id])
    return result.rows
}

export const getEmployeeById = async (id: number, business_id: number) => {
    const result = await pool.query(
        'SELECT * FROM employee WHERE id = $1 AND business_id = $2;',
        [id,business_id]
    )
    return result.rows[0]
}

export const newEmployee = async (data: CreateEmployeeDTO) => {
    const result = await pool.query(`
        INSERT INTO employee (name, lastname, phone, email, role, commission, salary, business_id, created_at) 
                      VALUES ($1  , $2      , $3   , $4   , $5  , $6        , $7    , $8         , $9        ) RETURNING *;`,
        [data.name, data.lastname, data.phone, data.email, data.role, data.commission, data.salary, data.businessId, new Date()])
    return result.rows[0]
}

export const updateEmployee = async (id:number, data: UpdateEmployeeDTO, business_id: number) => {
    
    const result = await pool.query(`
        UPDATE employee SET 
        name = COALESCE($1, name),
        lastname = COALESCE($2, lastname),
        phone = COALESCE($3, phone),
        email = COALESCE($4, email),
        role = COALESCE($5, role), 
        commission = COALESCE($6, commission),
        salary = COALESCE($7, salary)
        WHERE id = $8 AND business_id = $9 RETURNING *;`
        ,[data.name, data.lastname, data.phone, data.email, 'EMPLOYEE', data.commission, data.salary, id, business_id])//creo que no lo deberia dejar actualizar el role por si se ponen admin, o lo dejo actualizarlo pero le mando el role employee
    return result.rows[0]
}

export const deleteEmployee = async (id: number, business_id: number) => {
    const result = await pool.query(`
        DELETE FROM employee WHERE id = $1 AND business_id = $2 RETURNING *;`, [id, business_id])
    return result.rows[0]
}