import { combineReducers } from "redux"

import { userReducer } from "./reducers/userReducer"
import { otherReducer } from "./reducers/otherReducer"
import socketReducer from "./reducers/socketReducer"

export const reducers = combineReducers({ userReducer, otherReducer, socketReducer })



