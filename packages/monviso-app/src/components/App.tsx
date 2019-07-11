import {CircularProgress, CssBaseline} from '@material-ui/core'
import React, {Suspense} from 'react'
import {MonvisoAppBar} from '.'
import classNames from 'classnames'
import {makeStyles} from '@material-ui/core/styles'
import {useFirebaseAuth} from "@use-firebase/auth"
const drawerWidth = 240
const AuthorizedMapContainer = React.lazy(() => import('./AuthorizedMapContainer'))
const AnonymousMapContainer = React.lazy(() => import('./AnonymousMapContainer'))

export const styles = (theme: any) => ({
  content: {
    flexGrow: 1,
    marginLeft: -drawerWidth,
    marginTop: 40,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
  },
  contentShift: {
    marginLeft: 0,
    transition: theme.transitions.create('margin', {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.easeOut,
    }),
  },
  progress: {
    margin: theme.spacing(2),
  },
  root: {
    display: 'flex',
  },
})


export const App: React.FC<any> = (props): any => {
  const useStyles = makeStyles(styles)
  const classes = useStyles();
  const {enabled} = props
  const {isSignedIn} = useFirebaseAuth()
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = (): void => {
    setOpen(true)
  }

  const handleDrawerClose = (): void => {
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MonvisoAppBar
        enabled={enabled}
        handleDrawerClose={handleDrawerClose}
        handleDrawerOpen={handleDrawerOpen}
        open={open}
      />
      <Suspense fallback={<CircularProgress className={classes.progress}/>}>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          {isSignedIn ? <AuthorizedMapContainer/> : <AnonymousMapContainer/>}
        </main>
      </Suspense>
    </div>
  )
}
