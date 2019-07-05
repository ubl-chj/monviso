import actionCreatorFactory from 'typescript-fsa';
const actionCreator = actionCreatorFactory()

const SET_CURRENT_IMAGE_ID = "SET_CURRENT_IMAGE_ID"

export const setCurrentImageId = actionCreator<{currentImageId: string}>(SET_CURRENT_IMAGE_ID)
