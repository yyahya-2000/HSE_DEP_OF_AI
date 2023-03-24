import { Box } from '@mui/material'
import { Footer } from 'components/common'
import { Carousel } from 'components/common/Carousel'
import Header from 'components/common/Header'
import { FC } from 'react'

const HomePage: FC = () => {
    return <>
        <Header />
        <Carousel />
        <Box minHeight={'25vh'}></Box>
        <Footer />
    </>
}

export default HomePage