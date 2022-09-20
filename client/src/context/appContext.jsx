import React, { useReducer, useContext } from 'react'
import axios from 'axios'

import reducer from './reducer'

const user = localStorage.getItem('user')
const token = localStorage.getItem('token')

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const displayAlert = () => {
    dispatch({ type: 'SHOW_ALERT' })
    clearAlert()
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: 'CLEAR_ALERT' })
    }, 3000)
  }

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
  }

  const removeUserToLocalStorage = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  const loginUser = async (currentUser) => {
    dispatch({ type: 'LOGIN_USER_BEGIN' })

    try {
      const { data } = await axios.post('/api/v1/auth/login', currentUser)
      const { user, token } = data
      dispatch({
        type: 'LOGIN_USER_SUCCESS',
        payload: {
          user,
          token,
        },
      })
      // local storage
      addUserToLocalStorage({
        user,
        token,
      })
    } catch (error) {
      dispatch({
        type: 'LOGIN_USER_ERROR',
        payload: {
          msg: error.response.data.msg,
        },
      })
    }

    clearAlert()
  }

  const logoutUser = () => {
    dispatch({ type: 'LOGOUT_USER' })
    removeUserToLocalStorage()
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }
