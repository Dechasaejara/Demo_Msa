import { createAPIEndpoint, ENDPIONTS } from '../api'
import { Action_Types } from '../constants'

export const fetchAllfoods = () => (dispatch) => {
  createAPIEndpoint(ENDPIONTS.FOODITEM)
    .fetchAll()
    .then((response) => {
      dispatch({
        type: Action_Types.FETCH_ALL_FOOD,
        payload: response.data,
      })
    })
    .catch((err) => console.log(err))
}

export const CreateFood = (data, onSucess) => (dispatch) => {
  createAPIEndpoint(ENDPIONTS.FOODITEM)
    .create(data)
    .then((res) => {
      dispatch({
        type: Action_Types.CREATE_FOOD,
        payload: res.data,
      })
      onSucess()
    })
    .catch((err) => console.log(err))
}

export const updateFood = (id, data, onSucess) => (dispatch) => {
  createAPIEndpoint(ENDPIONTS.FOODITEM)
    .update(id, data)
    .then((res) => {
      dispatch({
        type: Action_Types.UPDATE_FOOD,
        payload: res.data,
      })
      onSucess()
    })
    .catch((err) => console.log(err))
}

export const deleteFood = (id) => (dispatch) => {
  createAPIEndpoint(ENDPIONTS.FOODITEM)
    .delete(id)
    .then((res) => {
      dispatch({
        type: Action_Types.DELETE_FOOD,
        payload: id,
      })
    })
    .catch((err) => console.log(err))
}
