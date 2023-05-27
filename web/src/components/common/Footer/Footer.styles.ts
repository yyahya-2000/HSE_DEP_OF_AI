import { makeStyles } from 'tss-react/mui'

export const useFooterStyles = makeStyles()((theme) => ({
  root: {
    position: 'relative',
    marginTop: '20px'
  },
  right: {
    position: 'absolute',
    minHeight: 600,
    borderLeft: `100vw solid ${theme.palette.secondary.main}`,
    borderTop: '100px solid transparent'
  },
  left: {
    position: 'absolute',
    minHeight: 600,
    borderRight: `100vw solid ${theme.palette.primary.main}`,
    borderTop: '40px solid transparent'
  },
  text: {
    position: 'absolute',
    minHeight: 600,
    zIndex: 100,
    color: `${theme.palette.secondary.main}`
    // padding: '1rem 1rem',
    // paddingBottom: '1px'
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
}))
