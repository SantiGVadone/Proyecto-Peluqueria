import express, { Request, Response } from 'express'
import { Client } from './src/interfaces/client.interfaces'

const app = express()
app.use(express.json())

const clients: Client[] = [] // Base de datos temporal para probar

app.post('/clients', (req: Request, res: Response) => {
    const newClient: Client = req.body
    // Aquí podrías validar con Zod antes de pushear
    clients.push(newClient)
    res.status(201).json({ message: "Cliente creado", data: newClient })
});

app.listen(3000, () => console.log("API corriendo en el puerto 3000"))