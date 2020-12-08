import {configureStore, combineReducers} from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import {UsersReducer} from './users-reducers';

const RootReducer = combineReducers({
  users:UsersReducer
})

export type RootStateType = ReturnType<typeof RootReducer>

export const store = configureStore({
  reducer: RootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

