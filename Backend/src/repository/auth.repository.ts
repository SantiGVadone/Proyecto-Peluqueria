import { PoolClient } from 'pg'
import {pool} from '../config/db'
import { RegisterBossDTO } from '../interfaces/auth.interfaces'

// Usamos el cliente de la transacción para asegurar que ambos inserts funcionen o ninguno
export const createBusinessRepo = async (client: PoolClient, data: RegisterBossDTO) => {
    const query = `
        INSERT INTO business (name, location, phone, inflow, outflow) 
        VALUES ($1, $2, $3, 0, 0) 
        RETURNING id`;
    const result = await client.query(query, [data.businessName, data.location, data.businessPhone]);
    return result.rows[0].id;
};

export const createBossRepo = async (client: PoolClient, data: RegisterBossDTO, businessId: number, hashedPass: string) => {
    const query = `
        INSERT INTO employee (name, lastname, phone, email, password, role, business_id, commission, salary) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, 0, 0)`; //aca deberia sacar esos 2 ceros y que en la db esten como default 
    await client.query(query, [
        data.name, 
        data.lastname, 
        data.phone, 
        data.email, 
        hashedPass, 
        'boss', 
        businessId
    ]);
};

export const getUserByEmailRepo = async (email: string) => {
    const result = await pool.query('SELECT * FROM employee WHERE email = $1', [email]);
    return result.rows[0];
};