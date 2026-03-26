import type { RegisterState, RegisterAction } from '../models/auth'

export const registerInitialState: RegisterState = {
  email: '',
  password: '',
  name: '',
  lastname: '',
  phone: '',
  isBoss: false,
  businessName: '',
  location: '',
  business_id: 0,
}

export function registerReducer(
  state: RegisterState,
  action: RegisterAction,
): RegisterState {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value }
    case 'TOGGLE_BOSS':
      return {
        ...state,
        isBoss: !state.isBoss,
        // Limpiamos campos específicos al cambiar de rol para no mandar basura
        businessName: '',
        location: '',
        business_id: 0,
      }
    case 'RESET_FORM':
      return registerInitialState
    default:
      return state
  }
}
