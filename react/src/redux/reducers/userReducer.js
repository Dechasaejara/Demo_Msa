import { Action_Types } from '../constants'

const initialState = {
  list: [],
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case Action_Types.FETCH_ALL_USER:
      return {
        ...state,
        list: [...action.payload],
      }
    case Action_Types.CREATE_USER:
      return {
        ...state,
        list: [...state.list, action.payload],
      }
    case Action_Types.UPDATE_USER:
      return {
        ...state,
        list: state.list.map((x) =>
          x.id == action.payload.id ? action.payload : x
        ),
      }
    case Action_Types.DELETE_USER:
      return {
        ...state,
        list: state.list.filter((x) => x.customerID != action.payload),
      }

    default:
      return state
  }
}
