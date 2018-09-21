import {
  CHANGE_SEARCH_FIELD,
  REQUEST_ROBOTS_FAILED,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS
} from './constants'

export const setSearchField = text => ({
  type: CHANGE_SEARCH_FIELD,
  payload: text
})

export const requestRobots = () => dispatch => {
  dispatch({type: REQUEST_ROBOTS_PENDING})
  window
    .fetch('https://jsonplaceholder.typicode.com/users')
    .then(data => data.json())
    .then(robots => {
      dispatch({type: REQUEST_ROBOTS_SUCCESS, payload: robots})
    })
    .catch(err => dispatch({type: REQUEST_ROBOTS_FAILED, payload: err}))
}
