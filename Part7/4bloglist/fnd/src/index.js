import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import App from './App'
import st from './store'

ReactDOM.render(
  <Provider store={st.store} >
  <Router>
  <App />
  </Router>
  </Provider>,
  document.getElementById('root'))