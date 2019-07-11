import {IState} from '../..'
import actionCreatorFactory from 'typescript-fsa';
import {asyncFactory} from 'typescript-fsa-redux-thunk';

const FETCH_IMAGE_RESPONSE = 'FETCH_IMAGE_RESPONSE'
const FETCH_IMAGE_SERVICES = 'FETCH_IMAGE_SERVICES'
const SET_RESPONSE_ERROR = "SET_RESPONSE_ERROR"
const create = actionCreatorFactory()

const createAsync = asyncFactory<IState>(create)
export const setResponseError = create<{error: string}>(SET_RESPONSE_ERROR)

interface IImageResponseParams {
  requestUri: string;
}

export const fetchImageResponse = createAsync<IImageResponseParams, any>(FETCH_IMAGE_RESPONSE,
  async (params: IImageResponseParams): Promise<string> => {
    try {
      const res = await fetch(params.requestUri)
      if (!res.ok) {
        setResponseError({error: `${res.status}: ${res.statusText} ${await res.text()}`})
      }
      return res.json()
    } catch (e) {
      setResponseError({error: e})
    }
  }
)

interface IImageServices {
  url: string;
  json: string;
  manifestId: string;
}

export const fetchImageServices = createAsync<IImageServices, any>(FETCH_IMAGE_SERVICES,
  async (params: IImageServices): Promise<string> => {
    try {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json')
      headers.append('Accept', 'application/json')
      headers.append('Origin', params.url)
      headers.append('Connection', 'keep-alive')
      const cache: RequestCache = 'default'
      const mode: RequestMode = 'cors'
      const init = {
        body: params.json,
        cache,
        headers,
        method: 'POST',
        mode,
      }
      const request = new Request(params.url, init)
      const res = await fetch(request)
      if (!res.ok) {
        setResponseError({error: `${res.status}: ${res.statusText} ${await res.text()}`})
      }
      return res.json()
    } catch (e) {
      setResponseError({error: e})
    }
  }
)
