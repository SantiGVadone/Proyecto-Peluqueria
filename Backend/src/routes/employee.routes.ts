import { Router } from "express"
import * as EmployeeController from '../controllers/employee.controllers'
import { validateBody } from "../middlewares/validate.middlewares"
import { employeeSchema, updateEmployeeSchema } from "../schemas/employee.schemas"

const router = Router()

// routes for Employee

// Get all Employee
router.get('/', EmployeeController.getAllEmployeeController)

//Get a Employee by ID
router.get('/:id',EmployeeController.getEmployeeByIdController)

// Create a new Employee
router.post('/',validateBody(employeeSchema) ,EmployeeController.createEmployeeController)

// Update an existing Employee
router.patch('/:id',validateBody(updateEmployeeSchema) ,EmployeeController.updateEmployeeController)

// Delete a Employee
router.delete('/:id',EmployeeController.deleteEmployeeController)

export default router