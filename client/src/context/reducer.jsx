import { initialState } from './appContext'

const reducer = (state, action) => {
  if (action.type === 'SHOW_ALERT') {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values!',
    }
  }

  if (action.type === 'CLEAR_ALERT') {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    }
  }

  if (action.type === 'LOGIN_USER_BEGIN') {
    return { ...state, isLoading: true }
  }

  if (action.type === 'LOGIN_USER_SUCCESS') {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: 'success',
      alertText: 'Login Successfull! Redirecting....',
    }
  }

  if (action.type === 'LOGIN_USER_ERROR') {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }

  if (action.type === 'LOGOUT_USER') {
    return {
      ...initialState,
      user: null,
      token: null,
    }
  }
}

export default reducer
