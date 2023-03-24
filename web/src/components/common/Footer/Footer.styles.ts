import { makeStyles } from 'tss-react/mui'

export const useFooterStyles = makeStyles()((theme) => ({
  root: {
    position: 'relative',
    marginTop: '20px'
  },
  right: {
    position: 'absolute',
    minHeight: 200,
    borderLeft: `100vw solid ${theme.palette.secondary.main}`,
    borderTop: '100px solid transparent'
  },
  left: {
    position: 'absolute',
    minHeight: 200,
    borderRight: `100vw solid ${theme.palette.primary.main}`,
    borderTop: '40px solid transparent'
  }
}))
