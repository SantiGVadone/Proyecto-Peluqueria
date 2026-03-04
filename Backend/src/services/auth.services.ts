import {pool} from '../config/db';
import { LoginDTO, RegisterBossDTO } from '../interfaces/auth.interfaces';
import * as authRepo from '../repository/auth.repository';
import { comparePassword, hashPassword } from '../utils/auth.utils'
import jwt from 'jsonwebtoken'

export const registerBossService = async (data: RegisterBossDTO ) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // crear el negocio y obtener el id
        const businessId = await authRepo.createBusinessRepo(client, data);

        // hasheo la pass 
        const hashedPassword = await hashPassword(data.password);

        // crear el employee con rol boss
        await authRepo.createBossRepo(client, data, businessId, hashedPassword);

        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

export const loginService = async (data: LoginDTO) => {
    const user = await authRepo.getUserByEmailRepo(data.email);
    if (!user) throw new Error('Email no registrado');

    const isMatch = await comparePassword(data.password, user.password);
    if (!isMatch) throw new Error('Contraseña incorrecta o usuario no registrado');

    // Generamos el token con la info de sesión
    const token = jwt.sign(
        { id: user.id, role: user.role, business_id: user.business_id },
        process.env.JWT_SECRET || 'secret_provisorio',
        { expiresIn: '8h' }
    );

    return {
        token,
        user: { name: user.name, role: user.role, business_id: user.business_id }
    };
};