import { Router } from "express"
import * as ClientController from '../controllers/client.controller'
import { clientSchema, updateClientSchema } from "../schemas/client.schemas"
import { validateBody } from "../middlewares/validate.middlewares"
import { checkRole } from "../middlewares/role.middlewares"
import { authRequired } from "../middlewares/auth.middlewares"

const router = Router()

// routes for clients

// Get all clients
router.get('/', authRequired, checkRole(['EMPLOYEE', 'BOSS', 'ADMIN']), ClientController.getAllClientsController)

//Get a client by ID
router.get('/:id', authRequired, checkRole(['EMPLOYEE', 'BOSS', 'ADMIN']), ClientController.getClientByIdController)

// Create a new client
router.post('/', authRequired, checkRole(['EMPLOYEE', 'BOSS', 'ADMIN']),validateBody(clientSchema), ClientController.createClientController)

// Update an existing client
router.patch('/:id', authRequired, checkRole(['EMPLOYEE', 'BOSS', 'ADMIN']),validateBody(updateClientSchema), ClientController.updateClientController)

// Delete a client
router.delete('/:id', authRequired, checkRole(['EMPLOYEE', 'BOSS', 'ADMIN']), ClientController.deleteClientController) //quisas saque el employee mas adelante

export default router