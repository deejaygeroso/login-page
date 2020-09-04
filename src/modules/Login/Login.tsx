import React, { FunctionComponent, ReactElement } from 'react'
import './styles.css'

const Login: FunctionComponent = (): ReactElement => {
  return (
    <div id='login-page'>
      <div id='login-form'>
        <div>
          <input id='firstName' placeholder='First Name' type='text' />
        </div>
        <div>
          <input id='lastName' placeholder='Last Name' type='text' />
        </div>
        <div>
          <input id='email' placeholder='Email' type='email' />
        </div>
        <div>
          <input id='password' placeholder='Password' type='password' />
        </div>
      </div>
    </div>
  )
}

export default Login
