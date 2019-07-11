import {ReducerBuilder, reducerWithInitialState} from 'typescript-fsa-reducers'
import {setCurrentImageId, setCurrentUser, setQueryType} from "../actions"
import {IConfig} from "../.."

export const config = (initialState): ReducerBuilder<IConfig> => reducerWithInitialState(initialState)
  .case(setCurrentImageId, (state, {currentImageId}): ReducerBuilder<IConfig> => ({
    ...state,
    currentImageId
  }))
  .case(setCurrentUser, (state, {currentUser}): ReducerBuilder<IConfig> => ({
    ...state,
    currentUser
  }))
  .case(setQueryType, (state, {queryType}): ReducerBuilder<IConfig> => ({
    ...state,
    queryType
  }))
