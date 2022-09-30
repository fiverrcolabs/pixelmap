import { useEffect } from 'react'
import { FormRow, FormSelect, Alert } from '../components'
import Wrapper from '../assets/wrappers/LoginPage'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'
// import './login.css'

const Login = () => {
  const navigate = useNavigate()
  const { user, isLoading, showAlert, displayAlert, loginUser } =
    useAppContext()

  const onSubmit = (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value
    const server = e.target[2].value

    if (!email || !password || !server) {
      displayAlert()
      return
    }
    const currentUser = { email, password, server }
    // console.log(currentUser)
    loginUser(currentUser)
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 1000)
    }
  }, [user, navigate])

  return (
    <Wrapper className='full-page'>
      <form className='form-login' onSubmit={onSubmit}>
        <h3>Login</h3>

        {showAlert && <Alert />}

        {/* email input */}
        <FormRow
          type='email'
          name='email'
          //   value={values.email}
          //   handleChange={handleChange}
        />

        <FormRow
          type='password'
          name='password'
          //   value={values.password}
          //   handleChange={handleChange}
        />

        {/* option input */}
        <FormSelect name='server' />

        <button
          type='submit'
          className='btn-login btn-block'
          disabled={isLoading}
        >
          submit
        </button>
      </form>
    </Wrapper>
  )
}

export default Login
