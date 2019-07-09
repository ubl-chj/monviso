import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline'
import {PersistentDrawerLeft} from '.'
import React from 'react'
import classNames from 'classnames'

const drawerWidth = 240

export const styles = (theme: any) => ({
  content: {
    flexGrow: 1,
    marginTop: 40,
    marginLeft: -drawerWidth,
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


export const PersistentDrawer: React.FC<any> = (props): any => {
  const useStyles = makeStyles(styles)
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
      <PersistentDrawerLeft
        enabled={enabled}
        handleDrawerClose={handleDrawerClose}
        handleDrawerOpen={handleDrawerOpen}
        open={open}
      />
      <main
        className={classNames(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        {children}
      </main>
    </div>
  )
}
