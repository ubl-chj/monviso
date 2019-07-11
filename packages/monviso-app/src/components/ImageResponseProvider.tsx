import {EndAdornment, StartAdornment} from "./SearchBoxInputAdornments"
import React, {ReactElement, useEffect, useState} from "react"
import {TextField, makeStyles} from '@material-ui/core'
import {fetchImageResponse, fetchImageServices, getCurrentImageId, getQueryType, setCurrentImageId} from "@monviso/core"
import {useDispatch} from "react-redux"

export const useSearchBoxStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flex: '1',
    marginLeft: 0,
    marginRight: theme.spacing(2),
    maxHeight: '48px',
    position: 'relative',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  dense: {
    marginTop: 19,
  },
  input: {
    backgroundColor: 'white', margin: 8
  },
  menu: {
    width: 200,
  },
}))

export const ImageResponseProvider: React.FC<any> = (): ReactElement => {
  const classes: any = useSearchBoxStyles({})
  const [isInitialized, setIsInitialized] = useState(false)
  const dispatch = useDispatch()
  const currentImageId = getCurrentImageId()
  const queryType = getQueryType()
  const [value, setValue] = React.useState("")

  const handleChange = (e: any): void => {
    setValue(e.target.value)
  }

  const handleClear = (): void => {
    setValue('')
    dispatch(setCurrentImageId({currentImageId: ''}))
  }

  const handleSubmit = ((e: any): void => {
    e.preventDefault()
    if (queryType === 'image') {
      dispatch(fetchImageResponse.action({requestUri: currentImageId}))
    } else if (queryType === 'manifest') {
      const query = `
        query {
          imageServices(manifestId: "${value}", type: "ImageService2")  {id, type, profile}
      }`
      const json = JSON.stringify({query})
      dispatch(fetchImageServices.action({json, manifestId: value, url: 'https://apollo.iiif.cloud'}))
    }
  })

  useEffect((): void => {
    if (!isInitialized) {
      dispatch(fetchImageResponse.action({requestUri: currentImageId}))
      setIsInitialized(true)
    }
  }, [isInitialized, dispatch, currentImageId])

  return (
    <form
      autoComplete="off"
      className={classes.container}
      data-testid='standard-searchform'
      onSubmit={handleSubmit}
    >
      <TextField
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={
          value ? {
            endAdornment: <EndAdornment onClick={handleClear}/>,
            startAdornment: <StartAdornment/>,
          } : {
            startAdornment: <StartAdornment/>,
          }
        }
        className={classes.input}
        onChange={handleChange}
        value={value}
        fullWidth
        id="standard-full-width"
        margin="normal"
        placeholder={'Enter an URI'}
        type="search"
      />
    </form>
  )
}
