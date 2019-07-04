import React, {ReactElement} from "react"
import {TextField, makeStyles} from '@material-ui/core'
import {useDispatch} from "react-redux"

export const useSearchBoxStyles = makeStyles((theme: any): any => ({
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

export const InputForm: React.FC<any> = (): ReactElement => {
  const classes: any = useSearchBoxStyles({})
  const dispatch = useDispatch()
  const [values, setValues] = React.useState("")

  const handleChange = (e: any): void => {
    setValues(e.target.value)
  }

  const handleClear = (): void => {
    setValues('')
  }

  const handleSubmit = ((e: any): void => {
    e.preventDefault()
  })

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
        className={classes.input}
        fullWidth
        id="standard-full-width"
        margin="normal"
        onChange={handleChange}
        placeholder={'search'}
        type="search"
        value={values}
      />
    </form>
  )
}
