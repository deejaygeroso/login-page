import { FiMail, IoMdPerson, RiLockPasswordFill } from 'react-icons/all'
import React, { FunctionComponent, ReactElement, useState } from 'react'
import { inject, observer } from 'mobx-react'
import TextInput from './TextInput'
import './styles.css'

interface ILoginStore {
  emailErrorMessage: string
  isEmailValid: boolean
  login: () => void
  validateEmail: (email: string) => void
}

interface IProps {
  store?: {
    LoginStore: ILoginStore
  }
}

const Login: FunctionComponent<IProps> = inject('store')(
  observer(
    (props: IProps): ReactElement => {
      const { store } = props
      const { LoginStore } = store

      const [firstName, setFirstName] = useState('')
      const [lastName, setLastName] = useState('')
      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')

      const onFirstNameChange = (value: string): void => {
        setFirstName(value)
      }
      const onLastNameChange = (value: string): void => {
        setLastName(value)
      }
      const onEmailChange = (value: string): void => {
        setEmail(value)
      }
      const onEmailBlur = (value: string): void => {
        LoginStore.validateEmail(value)
      }
      const onPasswordChange = (value: string): void => {
        setPassword(value)
      }
      const onSubmit = (): void => {
        // LoginStore.login()
        // LoginStore.validateEmail()
      }

      return (
        <div id='login-page'>
          <div id='login-form-container'>
            <h1 id='title'>A Simple Login Page</h1>
            <div id='login-form'>
              <TextInput
                icon={<IoMdPerson />}
                id='firstName'
                onChange={onFirstNameChange}
                placeholder='First Name'
                type='text'
                value={firstName}
              />
              <TextInput
                icon={<IoMdPerson />}
                id='lastName'
                onChange={onLastNameChange}
                placeholder='Last Name'
                type='text'
                value={lastName}
              />
              <TextInput
                errorMessage={LoginStore.emailErrorMessage}
                icon={<FiMail />}
                id='email'
                onChange={onEmailChange}
                onBlur={onEmailBlur}
                placeholder='Email'
                type='email'
                value={email}
              />
              <TextInput
                icon={<RiLockPasswordFill />}
                id='password'
                onChange={onPasswordChange}
                placeholder='Password'
                type='password'
                value={password}
              />
              <button className='submit-button' onClick={onSubmit}>
                Login
              </button>
            </div>
          </div>
        </div>
      )
    },
  ),
)

export default Login
