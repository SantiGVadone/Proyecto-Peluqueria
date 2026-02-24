import express from 'express';
import cors from 'cors';
import clientRoutes from './routes/client.routes';
import { pool } from './config/db';
import appointmentRoutes from './routes/appointment.routes';
// import { createClient } from './utils/client.repository';
// createClient().then(data => {
//   console.log(data)
// })


const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Para que entienda los bodies en formato JSON

// Rutas
app.use('/api/clients', clientRoutes);
app.use('/api/appointments', appointmentRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

pool.connect()
  .then(() => console.log('🟢 DB Connected'))
  .catch((err: Error) => console.error(err))