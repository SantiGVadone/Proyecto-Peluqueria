import { Router } from "express"
import * as AppointmentController from '../controllers/appointment.controller'
import { validateBody } from "../middlewares/validate.middlewares"
import { appointmentSchema, updateAppointmentSchema } from "../schemas/appointment.schemas"

const router = Router()

// routes for appointments

// Get all appointments
router.get('/', AppointmentController.getAllAppointmentsController)

//Get an appointment by ID
router.get('/:id',AppointmentController.getAppointmentByIdController)

// Create a new appointment
 router.post('/', validateBody(appointmentSchema) ,AppointmentController.createAppointmentController)

// Update an existing appointment
 router.patch('/:id',validateBody(updateAppointmentSchema) ,AppointmentController.updateAppointmentController)

// // Delete an appointment
 router.delete('/:id',AppointmentController.deleteAppointmentController)

//podria hacer muchas mas rutas pero prefiero hacer todo en el front end despues, osea en ves de hacer aca un get appoitment entre tal fecha y tal otra, prefiero pasarle todos los appointment al frontend, y que el filtre despues

export default router