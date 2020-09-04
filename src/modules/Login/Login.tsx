import { FiMail, IoMdPerson, RiLockPasswordFill } from 'react-icons/all'
import React, { FunctionComponent, ReactElement } from 'react'
import './styles.css'

const Login: FunctionComponent = (): ReactElement => {
  return (
    <div id='login-page'>
      <div id='login-form-container'>
        <div id='login-form'>
          <div className='input-container'>
            <div>
              <IoMdPerson />
              <input id='firstName' placeholder='First Name' type='text' />
            </div>
            <p className='error-message'></p>
          </div>
          <div className='input-container'>
            <div>
              <IoMdPerson />
              <input id='lastName' placeholder='Last Name' type='text' />
            </div>
            <p className='error-message'></p>
          </div>
          <div className='input-container'>
            <div>
              <FiMail />
              <input id='email' placeholder='Email' type='email' />
            </div>
            <p className='error-message'></p>
          </div>
          <div className='input-container'>
            <div>
              <RiLockPasswordFill />
              <input id='password' placeholder='Password' type='password' />
            </div>
            <p className='error-message'></p>
          </div>
          <button className='submit-button'>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Login
