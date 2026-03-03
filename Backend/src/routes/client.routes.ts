import { Router } from "express"
import * as ClientController from '../controllers/client.controller'
import { clientSchema, updateClientSchema } from "../schemas/client.schemas"
import { validateBody } from "../middlewares/validate.middlewares"

const router = Router()

// routes for clients

// Get all clients
router.get('/',ClientController.getAllClientsController)

//Get a client by ID
router.get('/:id',ClientController.getClientByIdController)

// Create a new client
router.post('/',validateBody(clientSchema) ,ClientController.createClientController)

// Update an existing client
router.patch('/:id',validateBody(updateClientSchema) ,ClientController.updateClientController)

// Delete a client
router.delete('/:id',ClientController.deleteClientController)

export default router