import { makeStyles } from 'tss-react/mui'

export const useFilterStyles = makeStyles()((theme) => ({
  root: {
    paddingRight: '20px',
    display: 'grid'
  },
  textField: {
    marginBottom: '15px',
    width: '100%'
  },
  autocomplete: {
    marginBottom: '15px',
    width: '100%'
  },
  switch: {
    width: '100%'
  },
  dateField: {
    marginBottom: '15px',
    width: '100%'
  }
}))
