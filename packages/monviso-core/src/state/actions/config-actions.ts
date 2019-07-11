import actionCreatorFactory from 'typescript-fsa';
const actionCreator = actionCreatorFactory()

const SET_CURRENT_IMAGE_ID = "SET_CURRENT_IMAGE_ID"
const SET_CURRENT_USER = "SET_CURRENT_USER"
const SET_QUERY_TYPE = "SET_QUERY_TYPE"

interface IUser {
  uid: string;
  displayName: string;
  photoURL: string;
  email?: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  phoneNumber?: string;
}

export const setCurrentImageId = actionCreator<{currentImageId: string}>(SET_CURRENT_IMAGE_ID)

export const setCurrentUser = actionCreator<{currentUser: IUser}>(SET_CURRENT_USER)

export const setQueryType = actionCreator<{queryType: string}>(SET_QUERY_TYPE)
