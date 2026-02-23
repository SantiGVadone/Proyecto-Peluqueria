import { Router } from "express"
import * as ClientController from '../controllers/client.controller'

const router = Router()

// Rutas para clientes
// Obtener todos los clientes
router.get('/', ClientController.getAllClients)

//Obtener un cliente por ID
router.get('/:id',ClientController.getClientById)

// Crear un nuevo cliente
router.post('/',ClientController.createClient)

// actualizar un cliente existente 
//router.patch('/:id',ClientController.updateClient)

// Eliminar un cliente
//router.delete('/:id',ClientController.deleteClient)

export default router