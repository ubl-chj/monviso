import 'firebase/database'
import {AnyAction, Reducer, Store, applyMiddleware, combineReducers, createStore} from "redux"
import {annotations, config, imageResponse} from '@monviso/core'
import thunkMiddleware, { ThunkMiddleware } from 'redux-thunk'
import {App} from './components'
import {FirebaseAppProvider} from '@use-firebase/app'
import {FirebaseAuthProvider} from '@use-firebase/auth'
import {Provider} from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import {composeWithDevTools} from 'redux-devtools-extension'
import {firebaseConfig} from './config'

const initialAnnotationState = {
  pointAnnotations: []
}

const annotationReducer: Reducer = annotations(initialAnnotationState)

const initialConfigState = {
  currentImageId: 'https://image01.cudl.lib.cam.ac.uk/iiif/PR-ATLAS-00002-00061-00001-000-00003.jp2/info.json'
}
const configReducer: Reducer = config(initialConfigState)

export const rootReducer = (): Reducer => combineReducers({
  annotations: annotationReducer,
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
    <FirebaseAppProvider config={firebaseConfig}>
      <FirebaseAuthProvider>
        <App/>
      </FirebaseAuthProvider>
    </FirebaseAppProvider>
  </Provider>,
  document.getElementById('root'));

