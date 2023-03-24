import { makeStyles } from 'tss-react/mui'

export const usePagingStyles = makeStyles()((theme) => ({
  root: {
    '& .MuiPaginationItem-root': {
      color: theme.palette.primary.main
    },
    '& .MuiPaginationItem-page.Mui-selected': {
      color: theme.palette.secondary.main,
      backgroundColor: theme.palette.grey[50]
    }
  }
}))
