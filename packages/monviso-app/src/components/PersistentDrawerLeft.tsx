import React, {EventHandler, ReactElement} from 'react'
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar'
import {ChevronLeft, ChevronRight, Home, Menu} from '@material-ui/icons'
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@material-ui/core'
import classNames from 'classnames'
import {ImageResponseProvider} from "./ImageResponseProvider"

const drawerWidth = 240

interface IPersistentDrawerLeftComponent {
  enabled: boolean;
  handleDrawerClose: EventHandler<any>;
  handleDrawerOpen: EventHandler<any>;
  open: boolean;
}

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: '#050531',
    color: theme.palette.primary.contrastText,
    transition: theme.transitions.create(['margin', 'width'], {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.easeOut,
    }),
    width: `calc(100% - ${drawerWidth}px)`,
  },
  drawer: {
    flexShrink: 0,
    width: drawerWidth,
  },
  drawerHeader: {
    alignItems: 'center',
    display: 'flex',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  drawerPaper: {
    width: drawerWidth,
    zIndex: 3000,
  },
  hide: {
    display: 'none',
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
}));

export const PersistentDrawerLeft: React.FC<IPersistentDrawerLeftComponent> = (props): ReactElement => {
  const classes = useStyles();
  const theme: any = useTheme();
  const { enabled, handleDrawerOpen, handleDrawerClose, open } = props

  const listItems = [
    {
      id: 'home',
      index: 0,
      path: '/',
      text: 'Home'
    },
  ]

  const buildListItemIcon = (item: string): any => {
    switch (item) {
      case 'home':
        return <Home/>
    }
  }

  const buildListItems = (items: any): ReactElement => {
    return items.map((item: any) =>
      <ListItem
        button
        key={item.index}
        style={{color: '#2f2c2c', textDecoration: 'none'}}
      >
        <ListItemIcon>
          {buildListItemIcon(item.id)}
        </ListItemIcon>
        <ListItemText primary={item.text} />
      </ListItem>
    )
  }

  return !enabled ? (
    <>
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
            href=''
            onClick={handleDrawerOpen}
          >
            <Menu />
          </IconButton>
          <Typography color="inherit" noWrap={true} variant="h6">
            Monviso
          </Typography>
          <ImageResponseProvider/>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        open={open}
        variant="persistent"
      >
        <div className={classes.drawerHeader}>
          <IconButton
            href=''
            onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </div>
        <Divider />
        <List
          component="nav"
        >
          {buildListItems(listItems)}
        </List>
      </Drawer>)
    </>
  ) : <></>
}


