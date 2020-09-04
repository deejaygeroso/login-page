import App from './App'
import { Provider } from 'mobx-react'
import React from 'react'
import ReactDOM from 'react-dom'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
)
