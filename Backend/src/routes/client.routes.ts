import { Router } from "express"
import * as ClientController from '../controllers/client.controller'

const router = Router()

// Rutas para clientes
// Obtener todos los clientes
router.get('/', ClientController.getAllClientsController)

//Obtener un cliente por ID
router.get('/:id',ClientController.getClientByIdController)

// Crear un nuevo cliente
router.post('/',ClientController.createClientController)

// actualizar un cliente existente 
router.patch('/:id',ClientController.updateClientController)

// Eliminar un cliente
router.delete('/:id',ClientController.deleteClientController)

export default router