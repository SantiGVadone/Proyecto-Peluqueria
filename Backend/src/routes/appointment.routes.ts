import { Router } from 'express'
import * as AppointmentController from '../controllers/appointment.controller'
import { validateBody } from '../middlewares/validate.middlewares'
import {
  appointmentSchema,
  updateAppointmentSchema,
} from '../schemas/appointment.schemas'
import { authRequired } from '../middlewares/auth.middlewares'
import { checkRole } from '../middlewares/role.middlewares'

const router = Router()

// routes for appointments

// Get all appointments
router.get(
  '/',
  authRequired,
  checkRole(['ADMIN', 'EMPLOYEE', 'BOSS']),
  AppointmentController.getAllAppointmentsController,
)

// Get all appointmes between a range days
router.get(
  '/range',
  authRequired,
  checkRole(['ADMIN', 'EMPLOYEE', 'BOSS']),
  AppointmentController.getAppointmentByRangeController,
)

//Get an appointment by ID
router.get(
  '/:id',
  authRequired,
  checkRole(['ADMIN', 'EMPLOYEE', 'BOSS']),
  AppointmentController.getAppointmentByIdController,
)

// Create a new appointment
router.post(
  '/',
  authRequired,
  checkRole(['ADMIN', 'EMPLOYEE', 'BOSS']),
  validateBody(appointmentSchema),
  AppointmentController.createAppointmentController,
)

// Update an existing appointment
router.patch(
  '/:id',
  authRequired,
  checkRole(['ADMIN', 'EMPLOYEE', 'BOSS']),
  validateBody(updateAppointmentSchema),
  AppointmentController.updateAppointmentController,
)

// Delete an appointment
router.delete(
  '/:id',
  authRequired,
  checkRole(['ADMIN', 'EMPLOYEE', 'BOSS']),
  AppointmentController.deleteAppointmentController,
)

export default router
