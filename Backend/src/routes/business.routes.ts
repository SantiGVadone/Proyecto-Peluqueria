import { Router } from "express"
import * as BusinessController from '../controllers/business.controller'

const router = Router()

// routes for Business

// Get all Business
router.get('/', BusinessController.getAllBusinessController)

//Get a Business by ID
router.get('/:id',BusinessController.getBusinessByIdController)

// Create a new Business
router.post('/',BusinessController.createBusinessController)

// Update an existing Business
router.patch('/:id',BusinessController.updateBusinessController)

// Delete a Business
router.delete('/:id',BusinessController.deleteBusinessController)

export default router