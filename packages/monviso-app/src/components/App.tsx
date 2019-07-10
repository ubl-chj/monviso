import CssBaseline from '@material-ui/core/CssBaseline'
import {MonvisoAppBar} from '.'
import React from 'react'
import {Typography} from "@material-ui/core"
import classNames from 'classnames'
import {makeStyles} from '@material-ui/core/styles'
import {useFirebaseAuth} from "@use-firebase/auth"

const drawerWidth = 240

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
  root: {
    display: 'flex',
  },
})


export const App: React.FC<any> = (props): any => {
  const useStyles = makeStyles(styles)
  const {isSignedIn} = useFirebaseAuth()
  const classes = useStyles();
  const {enabled, children} = props
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
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
      {isSignedIn ?
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          {children}
        </main> :
        <div style={{alignContent: 'center', display: 'flex', justifyContent: 'center', marginTop: 200, width: '100%'}}>
          <Typography variant="h6" component="h2" gutterBottom>Please Sign In</Typography>
        </div>}
    </div>
  )
}
