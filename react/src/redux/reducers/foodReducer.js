import { Action_Types } from '../constants'

const initialState = {
  list: [],
}

export const foodReducer = (state = initialState, action) => {
  switch (action.type) {
    case Action_Types.FETCH_ALL_FOOD:
      return {
        ...state,
        list: [...action.payload],
      }
    case Action_Types.CREATE_FOOD:
      return {
        ...state,
        list: [...state.list, action.payload],
      }
    case Action_Types.UPDATE_FOOD:
      return {
        ...state,
        list: state.list.map((x) =>
          x.id == action.payload.id ? action.payload : x
        ),
      }
    case Action_Types.DELETE_FOOD:
      return {
        ...state,
        list: state.list.filter((x) => x.id != action.payload),
      }

    default:
      return state
  }
}
