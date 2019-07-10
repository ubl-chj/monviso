import {IPointAnnotation} from "../../index"
import actionCreatorFactory from 'typescript-fsa';
const actionCreator = actionCreatorFactory()

const SET_POINT_ANNOTATION = "SET_POINT_ANNOTATION"

export const setPointAnnotation = actionCreator<{pointAnnotation: IPointAnnotation}>(SET_POINT_ANNOTATION)
