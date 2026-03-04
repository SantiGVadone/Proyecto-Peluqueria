import { Router } from "express"
import * as RecordsController from '../controllers/records.controller'
import { validateBody } from "../middlewares/validate.middlewares"
import { recordsSchema, updateRecordsSchema } from "../schemas/records.schemas"

const router = Router()

// routes for Records

// Get all Records
router.get('/', RecordsController.getAllRecordsController)

//Get a Records by ID
router.get('/:id',RecordsController.getRecordsByIdController)

//Get a Records by Client ID
router.get('/client/:id',RecordsController.getRecordsByClientIdController)

//Get a Records by Employee ID
router.get('/employee/:id',RecordsController.getRecordsByEmployeeIdController)

// Create a new Records
router.post('/',validateBody(recordsSchema) ,RecordsController.createRecordsController)

// Update an existing Records
router.patch('/:id',validateBody(updateRecordsSchema) ,RecordsController.updateRecordsController)

// Delete a Records
router.delete('/:id',RecordsController.deleteRecordsController)

export default router