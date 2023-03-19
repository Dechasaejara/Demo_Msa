import { Action_Types } from '../constants'

const initialState = {
  list: [],
}

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case Action_Types.FETCH_ALL_ORDER:
      return {
        ...state,
        list: [...action.payload],
      }
    case Action_Types.CREATE_ORDER:
      return {
        ...state,
        list: [...state.list, action.payload],
      }
    case Action_Types.UPDATE_ORDER:
      return {
        ...state,
        list: state.list.map((x) =>
          x.id == action.payload.id ? action.payload : x
        ),
      }
    case Action_Types.DELETE_ORDER:
      return {
        ...state,
        list: state.list.filter((x) => x.customerID != action.payload),
      }

    default:
      return state
  }
}
