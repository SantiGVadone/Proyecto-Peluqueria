import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface IPayload {
    id: number;
    role: string;
    business_id: number;
}

export const authRequired = (req: Request, res: Response, next: NextFunction) => {
    try {
        // 1. Buscamos el token en el header
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1]; // Sacamos el 'Bearer'

        if (!token) {
            return res.status(401).json({ message: "No hay token, autorización denegada" });
        }

        // 2. Verificamos el token
        const secret = process.env.JWT_SECRET || 'secret_provisorio';
        const decoded = jwt.verify(token, secret) as IPayload;

        // 3. Pasamos la info al siguiente paso (Controller o Middleware de Rango)
        res.locals.user = {
            id: decoded.id,
            role: decoded.role.toUpperCase(), // Aseguramos las MAYÚSCULAS que elegiste
            business_id: decoded.business_id
        };

        next(); // Le damos el "pase" para que siga
    } catch (error) {
        console.log(error)
        return res.status(403).json({ message: "Token no válido o expirado" });
    }
};