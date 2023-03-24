import { makeStyles } from 'tss-react/mui'

export const useCarouselSlideStyle = makeStyles()((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.light,
    height: '35vh',
    borderRadius: '5px',
    minHeight: '250px',
  },
  rightGrid: {
    '&::before': {
      content: "''",
      float: 'left',
      height: '100%',
      width: '100%',
      backgroundImage: `linear-gradient(105deg, ${theme.palette.primary.light},
         ${theme.palette.primary.light}, ${theme.palette.primary.light}00,
          ${theme.palette.primary.light}00 ,
           ${theme.palette.primary.light}00,
            ${theme.palette.primary.light}00,
             ${theme.palette.primary.light}00);`
    }
  },
  title: {
    fontWeight: 600,
    fontSize: '20px',
    color: theme.palette.text.primary,
    marginBottom: '2%'
  },
  desc: {
    fontWeight: 400,
    fontSize: '14px'
  },
  btnContianer: {
    position: 'absolute',
    left: '40%',
    bottom: '10%'
  },
  btn: {
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark
    }
  }
}))

export default useCarouselSlideStyle
