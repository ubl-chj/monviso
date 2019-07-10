import {ChevronLeft, ChevronRight, Home} from "@material-ui/icons"
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

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
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

  return (
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
    </Drawer>
  )
}
