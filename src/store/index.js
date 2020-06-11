import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware as createRouterMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import createRootReducer from './reducer'

export default function configureStore (history) {
  const routerMiddleware = createRouterMiddleware(history)

  const middlewares = [routerMiddleware, thunk]
  const enhancers = []

  if (process.env.NODE_ENV === 'development' && !window.__REDUX_DEVTOOLS_EXTENSION__) {
    console.warn('Install Redux DevTools Extension to inspect the app state: ' +
      'https://github.com/zalmoxisus/redux-devtools-extension#installation')
  }

  const composeEnhancers = (process.env.NODE_ENV === 'development')
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose

  const store = createStore(
    createRootReducer(history),
    composeEnhancers(
      applyMiddleware(...middlewares),
      ...enhancers
    )
  )

  return store
}
