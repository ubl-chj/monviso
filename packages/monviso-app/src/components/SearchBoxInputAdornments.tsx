import {Clear, Search} from "@material-ui/icons"
import {IconButton, InputAdornment} from "@material-ui/core"
import React, {ReactElement} from "react"

export const StartAdornment = (): ReactElement => {
  return (
    <InputAdornment position="start">
      <Search />
    </InputAdornment>
  )
}

export const EndAdornment = (props: any): ReactElement => {
  return (
    <InputAdornment position="end">
      <IconButton
        data-testid='clear-searchbox'
        href=''
        onClick={props.onClick}
      >
        <Clear />
      </IconButton>
    </InputAdornment>
  )
}
