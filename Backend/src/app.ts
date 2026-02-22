import express from 'express';
import cors from 'cors';
import clientRoutes from './routes/client.routes';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Para que entienda los bodies en formato JSON

// Rutas
app.use('/api/clients', clientRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});