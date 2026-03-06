import { Router } from "express"
import * as BusinessController from '../controllers/business.controller'
import { validateBody } from "../middlewares/validate.middlewares"
import { businessSchema, updateBusinessSchema } from "../schemas/business.schemas"
import { checkRole } from "../middlewares/role.middlewares"
import { authRequired } from "../middlewares/auth.middlewares"

const router = Router()

// routes for Business

// Get all Business
router.get('/', authRequired, checkRole(['ADMIN']), BusinessController.getAllBusinessController)

//Get a Business by ID
router.get('/:id', authRequired, checkRole(['ADMIN', 'BOSS']),BusinessController.getBusinessByIdController)

// Create a new Business
router.post('/', authRequired, checkRole(['ADMIN']),validateBody(businessSchema) ,BusinessController.createBusinessController)

// Update an existing Business
router.patch('/:id', authRequired, checkRole(['ADMIN', 'BOSS']),validateBody(updateBusinessSchema) ,BusinessController.updateBusinessController)

// Delete a Business
router.delete('/:id', authRequired, checkRole(['ADMIN', 'BOSS']),BusinessController.deleteBusinessController)

export default router