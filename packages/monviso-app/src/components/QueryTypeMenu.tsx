import {IconButton, Menu, MenuItem, makeStyles} from "@material-ui/core"
import React, {ReactElement} from "react"
import {getQueryType, setQueryType} from "@monviso/core"
import Settings from "@material-ui/icons/Settings"
import {useDispatch} from "react-redux"

const useStyles = makeStyles((theme): any => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}))

export const QueryTypeMenu: React.FC<any> = (): ReactElement => {
  const classes: any = useStyles()
  const dispatch = useDispatch()
  const queryType = getQueryType()
  const queryTypes = [
    {
      key: 'manifest',
      label: 'manifest'
    },
    {
      key: 'image',
      label: 'image'
    }
  ]
  const [anchorEl, setAnchorEl] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)

  const handleMenuOpen = (event: any): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuAction = (queryType: any): void => {
    dispatch(setQueryType({queryType}))
    setAnchorEl(null)
  }

  const handleMenuClose = (): void => {
    setAnchorEl(null)
  }

  const buildMenuItems = (): ReactElement[] => {
    return queryTypes && queryTypes.map((parser, i): ReactElement =>
      <MenuItem
        button={true}
        component='div'
        data-testid={`search-settings-menu-item-${i}`}
        divider
        key={i}
        onClick={(): void => handleMenuAction(parser.key)}
        selected={queryType === parser.key}
      >{parser.label}
      </MenuItem>)
  }

  const renderMenu: ReactElement = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "center",
        vertical: "bottom",
      }}
      getContentAnchorEl={null}
      onClose={handleMenuClose}
      open={isMenuOpen}
      transformOrigin={{
        horizontal: 'center',
        vertical: 'top',
      }}
    >
      {buildMenuItems()}
    </Menu>
  )

  return (
    <>
      <IconButton
        aria-haspopup="true"
        aria-owns={isMenuOpen ? 'material-appbar' : undefined}
        className={classes.menuButton}
        color="inherit"
        data-testid='search-settings-menu'
        edge="end"
        href=''
        onClick={handleMenuOpen}
      >
        <Settings/>
      </IconButton>
      {renderMenu}
    </>
  )
}
