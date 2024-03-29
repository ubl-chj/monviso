import {
  IconButton,
  Toolbar,
  Typography
} from '@material-ui/core'
import {ImageResponseProvider, PersistentDrawer, ProfileMenu, SignInButton} from "."
import React, {EventHandler, ReactElement} from 'react'
import AppBar from '@material-ui/core/AppBar'
import {Menu} from '@material-ui/icons'
import classNames from 'classnames'
import {makeStyles} from '@material-ui/core/styles'
import {useFirebaseAuth} from '@use-firebase/auth'
import {QueryTypeMenu} from "./QueryTypeMenu"

const drawerWidth = 240

interface IMonvisoAppBar {
  enabled: boolean;
  handleDrawerClose: EventHandler<any>;
  handleDrawerOpen: EventHandler<any>;
  open: boolean;
}

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: '#050531',
    color: theme.palette.primary.contrastText,
    transition: theme.transitions.create(['width', 'margin'], {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
    zIndex: theme.zIndex.drawer + 1,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.easeOut,
    }),
    width: `calc(100% - ${drawerWidth}px)`,
  },
  hide: {
    display: 'none',
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  root: {
    display: 'flex',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
    marginRight: 20,
  },
}))

export const MonvisoAppBar: React.FC<IMonvisoAppBar> = (props): ReactElement => {
  const classes = useStyles();
  const { enabled, handleDrawerOpen, handleDrawerClose, open } = props
  const {isSignedIn} = useFirebaseAuth()

  return !enabled ? (
    <div className={classes.root}>
      <AppBar
        className={classNames(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        position="fixed"
      >
        <Toolbar
          disableGutters={!open}
          variant="dense"
        >
          <IconButton
            aria-label="Open drawer"
            className={classNames(classes.menuButton, open && classes.hide)}
            color="inherit"
            edge="start"
            href=''
            onClick={handleDrawerOpen}
          >
            <Menu />
          </IconButton>
          <Typography color="inherit" noWrap={true} variant="h6">
            Monviso
          </Typography>
          <ImageResponseProvider/>
          <div className={classes.sectionDesktop}>
            <QueryTypeMenu/>
            {isSignedIn ? <ProfileMenu/> : <SignInButton/> }
          </div>
        </Toolbar>
      </AppBar>
      <PersistentDrawer handleDrawerClose={handleDrawerClose} open={open}/>
    </div>
  ) : <></>
}


