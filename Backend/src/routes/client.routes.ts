import { Router } from "express"
import * as ClientController from '../controllers/client.controller'

const router = Router()

// routes for clients

// Get all clients
router.get('/', ClientController.getAllClientsController)

//Get a client by ID
router.get('/:id',ClientController.getClientByIdController)

// Create a new client
router.post('/',ClientController.createClientController)

// Update an existing client
router.patch('/:id',ClientController.updateClientController)

// Delete a client
router.delete('/:id',ClientController.deleteClientController)

export default router