import {AnyAction, Store, applyMiddleware, createStore, Reducer, combineReducers} from "redux"
import {Provider} from 'react-redux'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {MapContainer} from './GMap'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunkMiddleware, { ThunkMiddleware } from 'redux-thunk'

export const rootReducer = (): Reducer => combineReducers({
})
const thunk: ThunkMiddleware<{}, AnyAction> = thunkMiddleware

const store: Store = createStore(
  rootReducer(),
  composeWithDevTools(
    applyMiddleware(
      thunk
    )
  ),
)

ReactDOM.render(
  <Provider store={store}>
    <MapContainer />
  </Provider>,
  document.getElementById('root'));

