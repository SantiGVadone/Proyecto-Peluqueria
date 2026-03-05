import { Request, Response, NextFunction } from 'express';

export const checkRole = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = res.locals.user; // Los datos que inyectó authRequired

        if (!user) {
            return res.status(401).json({ message: "No autorizado" });
        }

        // 1. Si el rol es 'ADMIN' (vos), pasa siempre a todos lados
        if (user.role === 'ADMIN') {
            return next();
        }

        // 2. Verificamos si el rol del usuario está en la lista permitida
        // Usamos includes para ver si, por ejemplo, 'BOSS' está en ['BOSS', 'EMPLOYEE']
        if (allowedRoles.includes(user.role)) {
            return next();
        }

        // 3. Si no es admin ni tiene el rol permitido, afuera
        return res.status(403).json({ 
            message: `Acceso denegado. Se requiere rango: ${allowedRoles.join(' o ')}` 
        });
    };
};