import { Request, Response } from 'express'
import * as authService from '../services/auth.services'
import {
  RegisterBossDTO,
  RegisterEmployeeDTO,
  LoginDTO,
} from '../interfaces/auth.interfaces'

export const registerBoss = async (req: Request, res: Response) => {
  try {
    const data: RegisterBossDTO = res.locals.validatedBody ?? req.body

    await authService.registerBossService(data)
    res
      .status(201)
      .json({ message: 'Negocio y administrador creados con exito' })
  } catch (e) {
    console.log(e)
    res
      .status(500)
      .json({ message: 'Error al crear el negocio y administrador' })
  }
}

export const registerEmployee = async (req: Request, res: Response) => {
  try {
    const data: RegisterEmployeeDTO = res.locals.validatedBody ?? req.body

    await authService.registerEmployeeService(data)

    res.status(201).json({ message: 'Usuario creado con exito' })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Error al crear el usuario' })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const data: LoginDTO = res.locals.validatedBody ?? req.body
    // Llamamos al servicio
    const response = await authService.loginService(data)

    //const { token, user } = response

    res.json({ message: 'Login exitoso ', response })
  } catch (e) {
    // Si el servicio tira el error de "Credenciales inválidas", cae acá
    console.log(e)
    res.status(401).json({ message: 'Error en el login' })
  }
}
