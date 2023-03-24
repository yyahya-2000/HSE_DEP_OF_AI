import { makeStyles } from 'tss-react/mui'

export const useBreadcrumbStyles = makeStyles()((theme) => ({
  navigate: {
    color: theme.palette.secondary.main
  },
  container: {
    height: 50,
    display: 'flex',
    '& .MuiBreadcrumbs-ol': {
      flexWrap: 'inherit',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      '& .MuiBreadcrumbs-li:last-of-type > div': {
        color: theme.palette.text.primary,
      }
    }
  },
  link: {
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}))
