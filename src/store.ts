import { createStore } from 'redux'
import {reducer} from './rootSlice';
import thunk from 'redux-thunk'
import applyMiddleware from 'redux-thunk'

export const store = createStore(
  reducer,
)

export type AppDispatch = typeof store.dispatch