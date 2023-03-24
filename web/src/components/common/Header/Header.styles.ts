import { makeStyles } from 'tss-react/mui'

export const useHeaderStyles = makeStyles()((theme) => ({
  root: {
    padding: '10px 0',
    border: 'none',
    [theme.breakpoints.between(300, 600)]: {
      padding: '10px 5% 0px 5%'
    },
  },
  icon: {
    color: theme.palette.text.primary
  },
  hoverMenu: {
    minWidth: '100px',
    marginTop: 10,
    zIndex: 2
  },
  menuGrid: {
    background: theme.palette.common.white,
    padding: '10px 50px',
    borderRadius: 5,
    width: '100%',
    display: 'grid',
    gridTemplateRows: 'auto auto auto auto',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
  },
  commonMenu: {
    background: theme.palette.common.white,
    padding: 10,
    borderRadius: 5,
    width: '100%',
    height: 150
  },
  mobileMenuTootip: {
    width: '100%',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    zIndex: 11,
    position: 'absolute',
    transform: 'translate3d(-5%, 0px, 0px)'
  },
  search: {
    width: 300
  },
  searchContainer: {
    display: 'flex'
  },
  mobileInput: {
    width: '100%',
    marginRight: 10,
    borderRadius: 5
  }
}))
