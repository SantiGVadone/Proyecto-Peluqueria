import {pool} from '../config/db'
import { CreateEmployeeDTO, UpdateEmployeeDTO } from '../interfaces/employee.interfaces'

export const getAllEmployee = async () => {
    const result = await pool.query('SELECT * FROM employee;')
    return result.rows
}

export const getEmployeeById = async (id: number) => {
    const result = await pool.query(
        'SELECT * FROM employee WHERE id = $1;',
        [id]
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

export const updateEmployee = async (id:number, data: UpdateEmployeeDTO) => {
    
    const result = await pool.query(`
        UPDATE employee SET 
        name = COALESCE($1, name),
        lastname = COALESCE($2, lastname),
        phone = COALESCE($3, phone),
        email = COALESCE($4, email),
        role = COALESCE($5, role),
        commission = COALESCE($6, commission),
        salary = COALESCE($7, salary),
        business_id = COALESCE ($8, business_id)
        WHERE id = $9 RETURNING *;`
        ,[data.name, data.lastname, data.phone, data.email, data.role, data.commission, data.salary, data.businessId ,id])
    return result.rows[0]
}

export const deleteEmployee = async (id:number ) => {
    const result = await pool.query(`
        DELETE FROM employee WHERE id = $1 RETURNING *;`, [id])
        // ya puse el on delete cascade en el sql
    return result.rows[0]
}