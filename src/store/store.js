import { configureStore} from '@reduxjs/toolkit'
import counterReducer from '../store/reducer-slice/auth'
import { combineReducers } from 'redux';
import logger from "redux-logger"
// import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import {applyMiddleware } from "redux"
import thunkMiddleware from "redux-thunk";
import { getMovieApi} from "./rtk-queries/getMovies"
// const persistConfig = {
//   key: 'root',
//   storage,
// }
const rootReducer = combineReducers({ 
  auth: counterReducer,
  [getMovieApi.reducerPath]: getMovieApi.reducer,
})
// const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
  reducer:rootReducer
,middleware:(getDefaultMiddleWare)=>getDefaultMiddleWare(
  {serializableCheck: false}
).concat(logger,thunkMiddleware,getMovieApi.middleware),

}
)

// export const persistor = persistStore(store)