import { combineReducers } from 'redux'
import { foodReducer } from './foodReducer'
import { userReducer } from './userReducer'
import { orderReducer  } from './orderReducer'

export const reducers = combineReducers({
  foodReducer,
  userReducer,
  orderReducer,
})
