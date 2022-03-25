import { createStore } from 'redux'
import {reducer} from './rootSlice';
import thunk from 'redux-thunk'
import applyMiddleware from 'redux-thunk'
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";

export const config = {
    key: 'root',
    storage: storage,
    blacklist: ['extras'],
};

//const persisted = persistReducer(config, reducer);

export const store = createStore(
  reducer,
)

export type AppDispatch = typeof store.dispatch