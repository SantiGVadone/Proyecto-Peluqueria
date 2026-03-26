import type { AuthAction, DecodedToken } from '../models/auth'
import { jwtDecode } from 'jwt-decode'

export const authInitialState = null as DecodedToken | null

export const authReducer = (
  state: DecodedToken | null,
  action: AuthAction,
): DecodedToken | null => {
  const { type } = action

  switch (type) {
    case 'LOGIN': {
      const token = action.payload
      return jwtDecode<DecodedToken>(token)
    }
    case 'LOGOUT': {
      return null
    }
    default:
      return state
  }
}
