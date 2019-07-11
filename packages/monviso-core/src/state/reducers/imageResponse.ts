import {fetchImageResponse} from '../actions'
import {reducerWithInitialState} from 'typescript-fsa-reducers'
import uuidv5 from 'uuidv5'

const initialState = {
}
interface IResponse {

}
export const imageResponse = reducerWithInitialState(initialState)
  .case(fetchImageResponse.async.started, (state): IResponse => ({
    ...state,
    updating: true
  }))
  .case(fetchImageResponse.async.failed, (state, { error }): IResponse => ({
    ...state,
    error,
    updating: false,
  }))
  .case(fetchImageResponse.async.done, (state: IResponse, {params, result}): IResponse => ({
    ...state,
    updating: false,
    [uuidv5('url', params.requestUri)]: {
      context: result['@context'],
      height: result.height,
      profile: result.profile,
      sizes: result.sizes,
      tiles: result.tiles,
      updating: false,
      width: result.width,
    },
  }))
