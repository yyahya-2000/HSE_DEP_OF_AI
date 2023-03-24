import { Box, Button, Grid } from "@mui/material"
import { FC, Fragment } from "react"
import useCarouselSlideStyle from "./CarouselSlide.styles"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { CarouselSlideProps } from "./CarouselSlide.types"

const CarouselSlide: FC<CarouselSlideProps> = ({ title, desc, link, img }) => {
    const { classes } = useCarouselSlideStyle()
    const { t } = useTranslation()
    const navigate = useNavigate()
    return (
        <Fragment >
            <Grid container className={classes.root}>
                <Grid item textAlign={'justify'} width={'70%'} padding={'2%'} position={'relative'}>
                    <Box className={`max-lines-2 ${classes.title}`}>
                        {title}
                    </Box>
                    <Box className={`max-lines-4 ${classes.desc}`}>
                        {desc}
                    </Box>
                    <Box className={classes.btnContianer}>
                        <Button className={classes.btn} variant="contained"
                            onClick={() => {
                                navigate(link);
                            }}>
                            {t("Подробнее")}
                        </Button>
                    </Box>
                </Grid>
                <Grid item width={'30%'} className={classes.rightGrid} style={{ backgroundImage: img, backgroundRepeat: 'round' }}>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default CarouselSlide