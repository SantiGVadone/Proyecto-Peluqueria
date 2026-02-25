import { Router } from "express"
import * as EmployeeController from '../controllers/employee.controllers'

const router = Router()

// routes for Employee

// Get all Employee
router.get('/', EmployeeController.getAllEmployeeController)

//Get a Employee by ID
router.get('/:id',EmployeeController.getEmployeeByIdController)

// Create a new Employee
router.post('/',EmployeeController.createEmployeeController)

// Update an existing Employee
router.patch('/:id',EmployeeController.updateEmployeeController)

// Delete a Employee
router.delete('/:id',EmployeeController.deleteEmployeeController)

export default router