import {IAnnotations, IConfig} from "../.."
import {ReducerBuilder, reducerWithInitialState} from 'typescript-fsa-reducers'
import {setPointAnnotation} from "../actions"

export const annotations = (initialState): ReducerBuilder<IAnnotations> => reducerWithInitialState(initialState)
  .case(setPointAnnotation, (state, {pointAnnotation}): ReducerBuilder<IConfig> => ({
    ...state,
    pointAnnotations: [...state.pointAnnotations, pointAnnotation]
  }))
