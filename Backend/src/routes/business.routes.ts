import { Router } from "express"
import * as BusinessController from '../controllers/business.controller'
import { validateBody } from "../middlewares/validate.middlewares"
import { businessSchema, updateBusinessSchema } from "../schemas/business.schemas"

const router = Router()

// routes for Business

// Get all Business
router.get('/', BusinessController.getAllBusinessController)

//Get a Business by ID
router.get('/:id',BusinessController.getBusinessByIdController)

// Create a new Business
router.post('/',validateBody(businessSchema) ,BusinessController.createBusinessController)

// Update an existing Business
router.patch('/:id',validateBody(updateBusinessSchema) ,BusinessController.updateBusinessController)

// Delete a Business
router.delete('/:id',BusinessController.deleteBusinessController)

export default router