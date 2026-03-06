import express from 'express'
import { pool } from './config/db'
import { corsMiddleware } from './config/cors'

import businessRoutes from './routes/business.routes'
import employeeRoutes from './routes/employee.routes'
import clientRoutes from './routes/client.routes'
import appointmentRoutes from './routes/appointment.routes'
import servicesRoutes from './routes/services.routes'
import recordsRoutes from './routes/records.routes'
import bonusRoutes from './routes/bonus.routes'
import authRoutes from './routes/auth.routes'

const app = express()

// Middlewares
app.use(corsMiddleware)
app.use(express.json()); // Para que entienda los bodies en formato JSON

// Rutas
app.use('/api/business',businessRoutes)
app.use('/api/employee',employeeRoutes)
app.use('/api/clients', clientRoutes)
app.use('/api/appointments', appointmentRoutes)
app.use('/api/services',servicesRoutes)
app.use('/api/bonus',bonusRoutes)
app.use('/api/records',recordsRoutes)
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
});

pool.connect()
  .then(() => console.log('🟢 DB Connected'))
  .catch((err: Error) => console.error(err))