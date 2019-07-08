import {ReducerBuilder, reducerWithInitialState} from 'typescript-fsa-reducers'
import {setPointAnnotation} from "../actions"
import {IAnnotations, IConfig} from "../.."

export const annotations = (initialState): ReducerBuilder<IAnnotations> => reducerWithInitialState(initialState)
  .case(setPointAnnotation, (state, {pointAnnotation}): ReducerBuilder<IConfig> => ({
    ...state,
    pointAnnotations: [...state.pointAnnotations, pointAnnotation]
  }))
