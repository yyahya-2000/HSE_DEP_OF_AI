import { Box, Grid } from '@mui/material'
import { Breadcrumb, Filter, FilterAndListContainer, Footer, Spinner } from 'components/common'
import { ProductCard } from 'components/common/Cards/Products'
import { Carousel } from 'components/common/Carousel'
import Header from 'components/common/Header'
import Paging from 'components/common/Paging'
import { useLanguage } from 'context/Translation'
import { observer } from 'mobx-react-lite'
import { FC, useEffect } from 'react'
import { productService } from 'services/product'
import { scrollTopPage } from 'utils'
import {TabIO} from "../common/Tabs";

const ProductsPage: FC = () => {
    const { language } = useLanguage();
    const { products, filterFields, paging, loading } = productService;
    useEffect(() => {
        productService.fetchPagingProducts(0, language);
        productService.fetchFilterElements(language);
    }, [language]);
    const handlePageChange = (page: number) => {
        productService.fetchPagingProducts(page, language);
        scrollTopPage();
    };
    const handleFindClick = (filterParams) => {
        productService.fetchProductsFilter(language, filterParams);
    };
    
    return <>
        {
            loading || !filterFields.length ? (
                <Spinner />
            ) : (
                <>
                    <Header />
                    <Carousel />
                    <Breadcrumb />
                    <FilterAndListContainer
                        filter={
                            <Filter onFind={handleFindClick}  filterElements={filterFields} filterParams={productService.getFilterValues()}/>
                        }
                        list={
                        <TabIO
                            list={
                                <Box >
                                    <Box>
                                        <Grid container spacing={2}>
                                            {products && products.length ? (
                                                products.map((product, index) => {
                                                    return (
                                                        <Grid item key={index} width={'100%'}>
                                                            <ProductCard item={product.item} />
                                                        </Grid>
                                                    )
                                                })
                                            ) : (
                                                <></>
                                            )}
                                        </Grid>
                                        <Paging paging={paging} onChange={handlePageChange} />
                                    </Box>
                                </Box>
                            }
                            organizationsBI={
                                <Grid container>
                                    <Grid item width={'100%'} style={{textAlign: "center"}}>
                                        <iframe
                                            width="600"
                                            height="600"
                                            seamless
                                            frameBorder="0"
                                            scrolling="no"
                                            src="https://aiportalbi.infostrategic.com/superset/explore/p/Lbn27QKv7ZX/?standalone=1&height=600"
                                        >
                                        </iframe>
                                    </Grid>
                                </Grid>
                            }
                            name={"Продукты"}/>

                        }
                    />
                    <Footer />
                </>
            )
        }
    </>
}

export default observer(ProductsPage)   