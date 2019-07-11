import {useSelector} from "react-redux"

export const getCurrentImageId = (): string => {
  return useSelector((state: any): any => state.config && state.config.currentImageId)
}

export const getCurrentUser = (): {} => {
  return useSelector((state: any): any => state.config && state.config.currentUser)
}

export const getQueryType = (): {} => {
  return useSelector((state: any): any => state.config && state.config.queryType)
}

export const getPointAnnotations = () => {
  return useSelector((state: any): any => state.annotations && state.annotations.pointAnnotations)
}

export const getImageWidth = (imageId): any => {
  return useSelector((state: any): any => state.imageResponse[imageId] && state.imageResponse[imageId].width)
}

export const getImageHeight = (imageId): any => {
  return useSelector((state: any): any => state.imageResponse[imageId] && state.imageResponse[imageId].height)
}

export const getImageTiles = (imageId): any => {
  return useSelector((state: any): any => state.imageResponse[imageId] && state.imageResponse[imageId].tiles)
}

export const getImageSizes = (imageId): any => {
  return useSelector((state: any): any => state.imageResponse[imageId] && state.imageResponse[imageId].sizes)
}

export const getImageProfile = (imageId): any => {
  return useSelector((state: any): any => state.imageResponse[imageId] && state.imageResponse[imageId].profile)
}

export const getImageServices = (manifestId): any => {
  return useSelector((state: any): any => state.imageServices[manifestId] && state.imageServices[manifestId].imageServices)
}
