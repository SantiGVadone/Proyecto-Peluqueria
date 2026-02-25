import express from 'express';
import cors from 'cors';
import { pool } from './config/db';

import clientRoutes from './routes/client.routes';
import appointmentRoutes from './routes/appointment.routes';
import businessRoutes from './routes/business.routes'

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Para que entienda los bodies en formato JSON

// Rutas
app.use('/api/clients', clientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/business',businessRoutes)


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

pool.connect()
  .then(() => console.log('🟢 DB Connected'))
  .catch((err: Error) => console.error(err))