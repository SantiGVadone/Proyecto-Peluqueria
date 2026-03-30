import cors, { CorsOptions } from 'cors'

const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173', '*']

const corsOptions: CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
}

export const corsMiddleware = cors(corsOptions)
