import { createAPIEndpoint, ENDPIONTS } from '../api'
import { Action_Types } from '../constants'

export const fetchAllorder = () => (dispatch) => {
  createAPIEndpoint(ENDPIONTS.ORDER)
    .fetchAll()
    .then((response) => {
      dispatch({
        type: Action_Types.FETCH_ALL_ORDER,
        payload: response.data,
      })
    })
    .catch((err) => console.log(err))
}

export const CreateOrder = (data, onSucess) => (dispatch) => {
  createAPIEndpoint(ENDPIONTS.ORDER)
    .create(data)
    .then((res) => {
      dispatch({
        type: Action_Types.CREATE_ORDER,
        payload: res.data,
      })
      onSucess()
    })
    .catch((err) => console.log(err))
}

export const updateOrder = (id, data, onSucess) => (dispatch) => {
  createAPIEndpoint(ENDPIONTS.ORDER)
    .update(id, data)
    .then((res) => {
      dispatch({
        type: Action_Types.UPDATE_ORDER,
        payload: res.data,
      })
      onSucess()
    })
    .catch((err) => console.log(err))
}

export const deleteOrder = (id) => (dispatch) => {
  createAPIEndpoint(ENDPIONTS.ORDER)
    .delete(id)
    .then((res) => {
      dispatch({
        type: Action_Types.DELETE_ORDER,
        payload: id,
      })
    })
    .catch((err) => console.log(err))
}
