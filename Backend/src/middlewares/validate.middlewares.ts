import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";

export const validateBody = (schema: ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({ error: result.error.format() });
    }

    // Opcional: guardar los datos limpios en req
    res.locals.validatedBody = result.data;
    next();
  };