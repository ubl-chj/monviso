import {AnyAction, Store, applyMiddleware, createStore, Reducer, combineReducers} from "redux"
import {Provider} from 'react-redux'
import React from 'react';
import ReactDOM from 'react-dom';
import {MapContainer, PersistentDrawer} from './components'
import {composeWithDevTools} from 'redux-devtools-extension'
import {config, imageResponse} from '@monviso/core'

import thunkMiddleware, { ThunkMiddleware } from 'redux-thunk'

const initialConfigState = {
  currentImageId: 'https://image01.cudl.lib.cam.ac.uk/iiif/PR-ATLAS-00002-00061-00001-000-00003.jp2/info.json'
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

