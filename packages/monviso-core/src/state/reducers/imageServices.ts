import {fetchImageServices} from '../actions'
import {reducerWithInitialState} from 'typescript-fsa-reducers'
import uuidv5 from 'uuidv5'

const initialState = {
}
interface IResponse {
}
export const imageServices = reducerWithInitialState(initialState)
  .case(fetchImageServices.async.started, (state): IResponse => ({
    ...state,
    updating: true
  }))
  .case(fetchImageServices.async.failed, (state, { error }): IResponse => ({
    ...state,
    error,
    updating: false,
  }))
  .case(fetchImageServices.async.done, (state: IResponse, {params, result}): IResponse => ({
    ...state,
    updating: false,
    [uuidv5('url', params.manifestId)]: {
      imageServices: result.data && result.data.imageServices
    },
  }))
