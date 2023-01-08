import { legacy_createStore as createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
// import reducers from "./index"

import storage from "redux-persist/lib/storage"
import persistStore from "redux-persist/es/persistStore"
import persistReducer from "redux-persist/es/persistReducer"
import { reducers } from "./index"


const persistConfig = {
    key: "vrumies-store",
    whitelist: [],
    storage
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const persistedReducer = persistReducer(persistConfig, reducers)
const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)))

export const persistor = persistStore(store)
export default store




