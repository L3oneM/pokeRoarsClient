import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';

import userReducer from './reducers/user.reducer';
import dataReducer from './reducers/data.reducer';
import uiReducer from './reducers/ui.reducer';

const initialState = {};

const middlewares = [thunk];

const reducers = combineReducers({
  user: userReducer,
  data: dataReducer,
  UI: uiReducer
});

const store = createStore(
  reducers,
  initialState,
  applyMiddleware(...middlewares)
);

export default store;
