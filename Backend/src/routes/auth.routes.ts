import {Router} from 'express'
import { validateBody } from '../middlewares/validate.middlewares'
import { registerBossSchema, loginSChema, registerEmployeeSchema} from '../schemas/auth.schemas'
import * as AuthController from '../controllers/auth.controller'

const router = Router ()

//Ruta para que un dueño cree su negocio y su cuenta de empleado tambien
router.post ('/register-boss', validateBody(registerBossSchema), AuthController.registerBoss)

//ruta para que un empleado cree su cuenta 
router.post('/register-employee', validateBody(registerEmployeeSchema), AuthController.registerEmployee)

//ruta para el login general de dueños y empleados
router.post ('/login', validateBody(loginSChema), AuthController.login)