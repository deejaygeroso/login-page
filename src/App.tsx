import React, { ReactElement } from 'react'
import { RouteComponentProps, Router } from '@reach/router'
import Login from './modules/Login'
import './common/styles/app.css'
import './common/styles/theme.css'

// Fixed RouteComponent Issue of @reach/router package.
const RouterPage = (props: { pageComponent: JSX.Element } & RouteComponentProps): ReactElement => props.pageComponent

const App = (): ReactElement => {
  return (
    <Router>
      <RouterPage path='/' pageComponent={<Login />} />
    </Router>
  )
}

export default App
