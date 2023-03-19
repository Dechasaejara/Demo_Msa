import { createAPIEndpoint, ENDPIONTS } from '../api'
import { Action_Types } from '../constants'

export const fetchAllusers = () => (dispatch) => {
  createAPIEndpoint(ENDPIONTS.CUSTOMER)
    .fetchAll()
    .then((response) => {
      dispatch({
        type: Action_Types.FETCH_ALL_USER,
        payload: response.data,
      })
    })
    .catch((err) => console.log(err))
}

export const CreateUser = (data, onSucess) => (dispatch) => {
  createAPIEndpoint(ENDPIONTS.CUSTOMER)
    .create(data)
    .then((response) => {
      dispatch({
        type: Action_Types.CREATE_USER,
        payload: response.data,
      })
      onSucess()
    })
    .catch((err) => console.log(err))
}

export const updateUser = (id, data, onSucess) => (dispatch) => {
  createAPIEndpoint(ENDPIONTS.CUSTOMER)
    .update(id, data)
    .then((res) => {
      dispatch({
        type: Action_Types.UPDATE_USER,
        payload: res.data,
      })
      onSucess()
    })
    .catch((err) => console.log(err))
}

export const deleteUser = (id) => (dispatch) => {
  createAPIEndpoint(ENDPIONTS.CUSTOMER)
    .delete(id)
    .then((res) => {
      dispatch({
        type: Action_Types.DELETE_USER,
        payload: id,
      })
    })
    .catch((err) => console.log(err))
}
