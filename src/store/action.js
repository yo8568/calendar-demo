import * as types from './constant'
import axios from 'axios'
import config from '../config'

const API_ROOT = `${config.server_url}/api`
const agent = axios.create({ baseURL: API_ROOT, withCredentials: true })

const fetchSchedule = (payload = {}) => (dispatch) => {
  dispatch({ type: types.TEACHER_SCHEDULE_FETCH_REQUEST, payload, meta: { search: '' } })

  const query = payload.start && payload.end ? `?start=${payload.start}&end=${payload.end}` : ''
  
  agent
    .get(`/schedule${query}`)
    .then((res) => dispatch({
      type: types.TEACHER_SCHEDULE_FETCH_SUCCESS,
      payload: res.data
    }))
    .catch((error) => dispatch({
      type: types.TEACHER_SCHEDULE_FETCH_FAILURE,
      payload: error.response ? error.response.data : { message: 'server_error' }
    }))
}

const fetchGeoInfo = (payload = {}) => (dispatch) => {
  dispatch({ type: types.GEO_INFO_FETCH_REQUEST, payload, meta: { search: '' } })
  
  axios
    .get('https://ipapi.co/json/')
    .then((res) => dispatch({
      type: types.GEO_INFO_FETCH_SUCCESS,
      payload: { 
        geo: {
          countryName: res.data.country_name,
          countryCode: res.data.country_code
        }
      }
    }))
    .catch((error) => dispatch({
      type: types.GEO_INFO_FETCH_FAILURE,
      payload: error.response ? error.response.data : { message: 'server_error' }
    }))
}

export { fetchSchedule, fetchGeoInfo }