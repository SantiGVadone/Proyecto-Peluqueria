import { Request, Response } from 'express';
import * as authService from '../services/auth.services'
import { RegisterBossDTO, LoginDTO } from '../interfaces/auth.interfaces';

export const registerBoss = async (req: Request, res: Response) => {
    try {
        const data: RegisterBossDTO = res.locals.validatedBody ?? req.body
        
        await authService.registerBossService(data);
        res.status(201).json({ message: 'Negocio y administrador creados con exito'});
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Error al crear el negocio y administrador' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const data: LoginDTO = res.locals.validatedBody ?? req.body
        // Llamamos al servicio
        await authService.loginService(data);
        
        res.json({message: 'Login exitoso '});
    } catch (e) {
        // Si el servicio tira el error de "Credenciales inválidas", cae acá
        console.log(e)
        res.status(401).json({message: 'Error en el ingreso'});
    }
};