import { combineReducers } from "redux"

import { userReducer } from "./reducers/userReducer"
import { otherReducer } from "./reducers/otherReducer"

export const reducers = combineReducers({ userReducer, otherReducer })



