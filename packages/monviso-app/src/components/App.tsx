import {CircularProgress, CssBaseline} from '@material-ui/core'
import React, {Suspense} from 'react'
import {MonvisoAppBar} from '.'
import {makeStyles} from '@material-ui/core/styles'
import {useFirebaseAuth} from "@use-firebase/auth"

const AuthorizedMapContainer = React.lazy(() => import('./AuthorizedMapContainer'))
const AnonymousMapContainer = React.lazy(() => import('./AnonymousMapContainer'))

export const styles = (theme: any) => ({
  content: {
    flexGrow: 1,
    marginTop: 40,
    padding: theme.spacing(3),
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
        <main className={classes.content}>
          {isSignedIn ? <AuthorizedMapContainer/> : <AnonymousMapContainer/>}
        </main>
      </Suspense>
    </div>
  )
}
