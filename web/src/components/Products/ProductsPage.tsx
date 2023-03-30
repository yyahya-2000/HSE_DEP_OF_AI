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
                    />
                    <Footer />
                </>
            )
        }
    </>
}

export default observer(ProductsPage)   