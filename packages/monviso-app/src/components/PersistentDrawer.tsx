import {ChevronLeft, ChevronRight, Collections, EditLocation, Home} from "@material-ui/icons"
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  useTheme
} from "@material-ui/core"
import React, {ReactElement} from "react"
import clsx from 'clsx'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  drawer: {
    flexShrink: 0,
    whiteSpace: 'nowrap',
    width: drawerWidth,
  },
  drawerClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  drawerOpen: {
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.sharp,
    }),
    width: drawerWidth,
  },
  toolbar: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0 12px',
    ...theme.mixins.toolbar,
  },
}))

export const PersistentDrawer: React.FC<any> = (props): ReactElement => {
  const classes = useStyles()
  const {handleDrawerClose, open} = props
  const theme: any = useTheme();
  const listItems = [
    {
      id: 'home',
      index: 0,
      path: '/',
      text: 'Home'
    },
    {
      id: 'albums',
      index: 1,
      path: '/',
      text: 'Albums'
    },
    {
      id: 'editAnnotations',
      index: 2,
      path: '/',
      text: 'Edit Annotations'
    },
  ]

  const buildListItemIcon = (item: string): any => {
    switch (item) {
      case 'home':
        return <Home/>
      case 'albums':
        return <Collections/>
      case 'editAnnotations':
        return <EditLocation/>
    }
  }

  const buildListItems = (items: any): ReactElement[] => {
    return items.map((item: any): ReactElement =>
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

  return (
    <Drawer
      anchor="left"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
      open={open}
      variant="permanent"
    >
      <div className={classes.toolbar}>
        <IconButton
          href=''
          onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </div>
      <Divider />
      <List style={{padding: 8}}>
        {buildListItems(listItems)}
      </List>
    </Drawer>
  )
}
