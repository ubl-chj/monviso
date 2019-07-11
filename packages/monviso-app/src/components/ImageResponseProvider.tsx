import {EndAdornment, StartAdornment} from "./SearchBoxInputAdornments"
import React, {ReactElement, useEffect, useState} from "react"
import {TextField, makeStyles} from '@material-ui/core'
import {fetchImageResponse, getCurrentImageId, setCurrentImageId} from "@monviso/core"
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
  const [values, setValues] = React.useState("")

  const handleChange = (e: any): void => {
    setValues(e.target.value)
    dispatch(setCurrentImageId({currentImageId: e.target.value}))
    dispatch(fetchImageResponse.action({requestUri: e.target.value}))
  }

  const handleClear = (): void => {
    setValues('')
    dispatch(setCurrentImageId({currentImageId: ''}))
  }

  const handleSubmit = ((e: any): void => {
    e.preventDefault()
    dispatch(fetchImageResponse.action({requestUri: currentImageId}))
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
      noValidate
      onSubmit={handleSubmit}
    >
      <TextField
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={
          values ? {
            endAdornment: <EndAdornment onClick={handleClear}/>,
            startAdornment: <StartAdornment/>,
          } : {
            startAdornment: <StartAdornment/>,
          }
        }
        className={classes.input}
        fullWidth
        id="standard-full-width"
        margin="normal"
        onChange={handleChange}
        placeholder={'Enter an image URI'}
        type="search"
        value={values}
      />
    </form>
  )
}
