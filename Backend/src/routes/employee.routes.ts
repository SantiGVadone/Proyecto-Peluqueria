import { Router } from "express"
import * as EmployeeController from '../controllers/employee.controllers'
import { validateBody } from "../middlewares/validate.middlewares"
import { employeeSchema, updateEmployeeSchema } from "../schemas/employee.schemas"
import { checkRole } from "../middlewares/role.middlewares"
import { authRequired } from "../middlewares/auth.middlewares"

const router = Router()

// routes for Employee

// Get all Employee
router.get('/',authRequired ,checkRole(['ADMIN', 'BOSS']), EmployeeController.getAllEmployeeController)

//Get a Employee by ID
router.get('/:id',authRequired ,checkRole(['ADMIN', 'BOSS', 'EMPLOYEE']), EmployeeController.getEmployeeByIdController)

// Create a new Employee
router.post('/',authRequired ,checkRole(['ADMIN']), validateBody(employeeSchema) ,EmployeeController.createEmployeeController)

// Update an existing Employee
router.patch('/:id',authRequired ,checkRole(['ADMIN', 'BOSS', 'EMPLOYEE']), validateBody(updateEmployeeSchema) ,EmployeeController.updateEmployeeController)

//EN UN FUTURO DEBERIA HACER UN RUTA UPDATE PROFILE O ALGO ASI PARA LOS CAMBIOS MENORES,
//  Y DARLE ACCESO A LOS 3, Y EN LA RUTA DE UPDATE EMPLOYEE QUE SOLO TENGA ACCESO EL BOSS O EL ADMIN 

// Delete a Employee
router.delete('/:id',authRequired ,checkRole(['ADMIN', 'BOSS', 'EMPLOYEE']),EmployeeController.deleteEmployeeController)

export default router