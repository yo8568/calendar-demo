import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import history from './history'
import App from './App'
import configureStore from './store'
import * as serviceWorker from './serviceWorker'
import 'moment/locale/zh-tw'
import 'element-theme-default'
import countries from 'i18n-iso-countries'
import './i18n'

countries.registerLocale(require('i18n-iso-countries/langs/en.json'))
countries.registerLocale(require('i18n-iso-countries/langs/zh.json'))

const store = configureStore(history)

ReactDOM.render(
    <Provider store={store}>
      <App history={history} />
    </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
