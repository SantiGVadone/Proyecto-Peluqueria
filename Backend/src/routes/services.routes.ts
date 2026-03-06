import { Router } from "express"
import * as ServicesController from '../controllers/services.controller'
import { validateBody } from "../middlewares/validate.middlewares"
import { ServicesSchema, updateServicesSchema } from "../schemas/services.schemas"
import { authRequired } from "../middlewares/auth.middlewares"
import { checkRole } from "../middlewares/role.middlewares"

const router = Router()

// routes for Servicess

// Get all Servicess
router.get('/', authRequired, checkRole(['ADMIN', 'BOSS', 'EMPLOYEE']), ServicesController.getAllServicesController)

//Get a Services by ID
router.get('/:id', authRequired, checkRole(['ADMIN', 'BOSS', 'EMPLOYEE']), ServicesController.getServicesByIdController)

// Create a new Services
router.post('/', authRequired, checkRole(['ADMIN', 'BOSS']), validateBody(ServicesSchema) ,ServicesController.createServicesController)

// Update an existing Services
router.patch('/:id', authRequired, checkRole(['ADMIN', 'BOSS']), validateBody(updateServicesSchema) ,ServicesController.updateServicesController)

// Delete a Services
router.delete('/:id', authRequired, checkRole(['ADMIN', 'BOSS']), ServicesController.deleteServicesController)

export default router