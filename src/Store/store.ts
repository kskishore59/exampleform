import { createStore } from 'redux';
import { reducer } from './rootSlice';



//const persisted = persistReducer(config, reducer);

export const store = createStore(
  reducer,
)

export type AppDispatch = typeof store.dispatch