import { Router } from "express"
import * as ServicesController from '../controllers/services.controller'

const router = Router()

// routes for Servicess

// Get all Servicess
router.get('/', ServicesController.getAllServicesController)

//Get a Services by ID
router.get('/:id',ServicesController.getServicesByIdController)

// Create a new Services
router.post('/',ServicesController.createServicesController)

// Update an existing Services
router.patch('/:id',ServicesController.updateServicesController)

// Delete a Services
router.delete('/:id',ServicesController.deleteServicesController)

export default router