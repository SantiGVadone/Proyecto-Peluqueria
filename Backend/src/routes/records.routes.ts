import { Router } from "express"
import * as RecordsController from '../controllers/records.controller'

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
router.post('/',RecordsController.createRecordsController)

// Update an existing Records
router.patch('/:id',RecordsController.updateRecordsController)

// Delete a Records
router.delete('/:id',RecordsController.deleteRecordsController)

export default router