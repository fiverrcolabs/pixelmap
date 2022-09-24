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


  // ----------------board-------------
  const getBoard = async (token) => {
    // dispatch({ type: 'GETBOARD_BEGIN' })

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await axios.get('/api/v1/pixelmap/getPixels', config)

      return data.pixels

    } catch (error) {

      console.log(error)
    }

    clearAlert()

  }

  const getAvailablePixels = async (currentUser,token) => {
    // dispatch({ type: 'GETBOARD_BEGIN' })
    const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    try {
      // console.log("from context",currentUser)
      const { data } = await axios.post('/api/v1/user/getPoint', currentUser,config)
      //  return data.pixels
      // console.log(data.res.point)
      return data.res.point

    } catch (error) {
      console.log(error)
    }

    clearAlert()

  }

  const saveAvailablePixels = async (currentUser,token) => {
    // dispatch({ type: 'GETBOARD_BEGIN' })
    const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    try {
      const { data } = await axios.post('/api/v1/user/deductPoint', currentUser,config)
      // console.log(data)

    } catch (error) {
      console.log(error)
    }

    clearAlert()

  }



  const savePixel = async (pixel, token) => {

    try {

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await axios.post('/api/v1/pixelmap/addPixel', pixel, config)


      console.log(data)

    } catch (error) {

      console.log(error)
    }

    clearAlert()

  }







  // ----------------login-------------


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

  const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
  }

  const loginUser = async (currentUser) => {

    // console.log('a');
    // console.log('waiting...')
    // let delayres = await delay(5000);
    // console.log('b');

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
        getBoard,
        savePixel,
        getAvailablePixels,
        saveAvailablePixels
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
