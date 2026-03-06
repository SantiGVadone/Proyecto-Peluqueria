import { Router } from "express"
import * as RecordsController from '../controllers/records.controller'
import { validateBody } from "../middlewares/validate.middlewares"
import { recordsSchema, updateRecordsSchema } from "../schemas/records.schemas"
import { checkRole } from "../middlewares/role.middlewares"
import { authRequired } from "../middlewares/auth.middlewares"

const router = Router()

// routes for Records

// Get all Records
router.get('/', authRequired, checkRole(['ADMIN', 'BOSS', 'EMPLOYEE']), RecordsController.getAllRecordsController)

//Get a Records by ID
router.get('/:id', authRequired, checkRole(['ADMIN', 'BOSS', 'EMPLOYEE']), RecordsController.getRecordsByIdController)

//Get a Records by Client ID
router.get('/client/:id', authRequired, checkRole(['ADMIN', 'BOSS', 'EMPLOYEE']), RecordsController.getRecordsByClientIdController)

//Get a Records by Employee ID
router.get('/employee/:id', authRequired, checkRole(['ADMIN', 'BOSS', 'EMPLOYEE']), RecordsController.getRecordsByEmployeeIdController)

// Create a new Records
router.post('/', authRequired, checkRole(['ADMIN', 'BOSS', 'EMPLOYEE']), validateBody(recordsSchema) ,RecordsController.createRecordsController)

// Update an existing Records
router.patch('/:id', authRequired, checkRole(['ADMIN', 'BOSS', 'EMPLOYEE']), validateBody(updateRecordsSchema) ,RecordsController.updateRecordsController)

// Delete a Records
router.delete('/:id', authRequired, checkRole(['ADMIN', 'BOSS', 'EMPLOYEE']), RecordsController.deleteRecordsController)

export default router