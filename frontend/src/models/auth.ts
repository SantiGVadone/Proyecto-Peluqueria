//PARA EL LOGIN

export interface DecodedToken {
  id: number
  role: 'ADMIN' | 'BOSS' | 'EMPLOYEE'
  business_id: number
  exp: number // Fecha de expiración que agrega JWT solo
}

export interface AuthContextType {
  user: DecodedToken | null
  login: (token: string) => void
  logout: () => void
  isAuthenticated: boolean
}

export type AuthAction =
  | { type: 'LOGIN'; payload: string } // El payload es el token
  | { type: 'LOGOUT' }

// PARA EL REGISTER
export interface RegisterBaseDTO {
  email: string
  password: string
  name: string
  lastname: string
  phone: string
}

// Interfaz para el estado del Reducer
export interface RegisterState extends RegisterBaseDTO {
  isBoss: boolean
  businessName?: string
  location?: string
  business_id?: number
}

// Tipos de acciones para el Reducer
export type RegisterAction =
  | { type: 'UPDATE_FIELD'; field: string; value: any }
  | { type: 'TOGGLE_BOSS' }
  | { type: 'RESET_FORM' }
