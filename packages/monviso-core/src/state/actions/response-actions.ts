import actionCreatorFactory from 'typescript-fsa';
import {asyncFactory} from 'typescript-fsa-redux-thunk';
import {State} from '../..'

const FETCH_INFO_RESPONSE = 'FETCH_INFO_RESPONSE'
const SET_RESPONSE_ERROR = "SET_RESPONSE_ERROR"
const create = actionCreatorFactory()

const createAsync = asyncFactory<State>(create)
export const setResponseError = create<{error: string}>(SET_RESPONSE_ERROR)

interface InfoParams {
  requestUri: string
}

export const fetchImageResponse = createAsync<InfoParams, any>(FETCH_INFO_RESPONSE,
  async (params: InfoParams): Promise<string> => {
    try {
      const res = await fetch(params.requestUri)
      if (!res.ok) {
        setResponseError({error: `${res.status}: ${res.statusText} ${await res.text()}`})
      }
      return res.json()
    } catch (e) {
      throw new Error(e)
    }
  }
)
