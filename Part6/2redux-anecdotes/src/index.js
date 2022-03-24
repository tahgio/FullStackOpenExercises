import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import st  from './reducers/store'



ReactDOM.render(
  <Provider store={st.store}>
    <App />
  </Provider>,
  document.getElementById('root')
)