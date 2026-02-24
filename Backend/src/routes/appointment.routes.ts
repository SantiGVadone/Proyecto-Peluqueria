import { Router } from "express"
import * as AppointmentController from '../controllers/appointment.controller'

const router = Router()

// routes for appointments

// Get all appointments
router.get('/', AppointmentController.getAllAppointmentsController)

//Get an appointment by ID
router.get('/:id',AppointmentController.getAppointmentByIdController)

// Create a new appointment
 router.post('/',AppointmentController.createAppointmentController)

// // Update an existing appointment
// router.patch('/:id',AppointmentController.updateAppointmentController)

// // Delete an appointment
// router.delete('/:id',AppointmentController.deleteAppointmentController)

// // Get appointments by client ID
// router.get('/client/:id',AppointmentController.getAppointmentsByClientIdController)

// // Get appointments by employee ID
// router.get('/employee/:id',AppointmentController.getAppointmentsByEmployeeIdController)

// // Get appointments by date
// router.get('/date/:date',AppointmentController.getAppointmentsByDateController)

// // Get appointments by status
// router.get('/status/:status',AppointmentController.getAppointmentsByStatusController)

// // Get appointments by date range
// router.get('/date-range/:startDate/:endDate',AppointmentController.getAppointmentsByDateRangeController)

// // Get appointments by client and date range
// router.get('/client/:clientId/date-range/:startDate/:endDate',AppointmentController.getAppointmentsByClientAndDateRangeController)

// // Get appointments by employee and date range
// router.get('/employee/:employeeId/date-range/:startDate/:endDate',AppointmentController.getAppointmentsByEmployeeAndDateRangeController)

// // Get appointments by Service type 
// router.get('/service-type/:serviceType',AppointmentController.getAppointmentsByServiceTypeController)

export default router