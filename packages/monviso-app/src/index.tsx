import {AnyAction, Store, applyMiddleware, createStore, Reducer, combineReducers} from "redux"
import {Provider} from 'react-redux'
import React from 'react';
import ReactDOM from 'react-dom';
import {MapContainer, PersistentDrawer} from './components'
import {composeWithDevTools} from 'redux-devtools-extension'
import {config, imageResponse} from '@monviso/core'

import thunkMiddleware, { ThunkMiddleware } from 'redux-thunk'

const initialConfigState = {
  currentImageId: 'https://iiif.bodleian.ox.ac.uk/iiif/image/6b13a8ee-9abc-43ef-9dac-ed48ce579861/info.json'
}
const configReducer: Reducer = config(initialConfigState)

export const rootReducer = (): Reducer => combineReducers({
  config: configReducer,
  imageResponse
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
    <PersistentDrawer>
      <MapContainer/>
    </PersistentDrawer>
  </Provider>,
  document.getElementById('root'));

