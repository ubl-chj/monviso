import {AppBar, IconButton, Toolbar, makeStyles} from "@material-ui/core"
import {Autorenew, Close, VerticalSplit, ZoomOutMap} from "@material-ui/icons"
import {
  MosaicContext,
  MosaicWindowContext,
} from 'react-mosaic-component'
import React, {ReactElement} from "react"

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: '#FFF'
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  root: {
    flexGrow: 1,
  },
}))

export const MosaicWindowToolbar = (): ReactElement => {
  const classes = useStyles({})
  return (
    <AppBar
      classes={{colorPrimary: classes.appBar}}
      position="static"
    >
      <MosaicContext.Consumer>
        {({mosaicActions}) => (
          <MosaicWindowContext.Consumer>
            {({mosaicWindowActions}) => (
              <Toolbar variant="dense">
                <div className={classes.grow}/>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="primary"
                  aria-label="Replace"
                  href=''
                  onClick={() => mosaicWindowActions.replaceWithNew()}>
                  <Autorenew/>
                </IconButton>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="primary"
                  aria-label="Split"
                  href=''
                  onClick={() => mosaicWindowActions.split()}>
                  <VerticalSplit/>
                </IconButton>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="primary"
                  aria-label="Expand"
                  href=''
                  onClick={() => mosaicActions.expand(mosaicWindowActions.getPath())}>
                  <ZoomOutMap/>
                </IconButton>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="primary"
                  aria-label="Remove"
                  href=''
                  onClick={() => mosaicActions.remove(mosaicWindowActions.getPath())}>
                  <Close/>
                </IconButton>
              </Toolbar>
            )}
          </MosaicWindowContext.Consumer>)}
      </MosaicContext.Consumer>
    </AppBar>
  )
}
