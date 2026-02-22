import { Router } from "express"
import * as ClientController from '../controllers/client.controller'

const router = Router()

// Rutas para clientes
// Obtener todos los clientes
router.get('/', ClientController.getAllClients)

//Obtener un cliente por ID
 router.get('/:id',ClientController.getClientById)

export default router