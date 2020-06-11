import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import merge from 'lodash/merge'

const available = (state = [], action) => {
  if (action.payload && action.payload.available && action.payload.available) {
    return Object.assign([], state, action.payload.available)
  }
  return state
}

const booked = (state = [], action) => {
  if (action.payload && action.payload.booked && action.payload.booked) {
    return Object.assign([], state, action.payload.booked)
  }
  return state
}

const geo = (state = {}, action) => {
  if (action.payload && action.payload.geo && action.payload.geo) {
    return merge({}, state, action.payload.geo)
  }
  return state
}

export default (history) => combineReducers({
  router: connectRouter(history),
  available,
  booked,
  geo
})
