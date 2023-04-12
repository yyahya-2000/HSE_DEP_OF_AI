import {Box, Grid, Tab} from '@mui/material'
import {Breadcrumb, Filter, FilterAndListContainer, Footer, Spinner} from 'components/common'
import {ProductCard} from 'components/common/Cards/Products'
import {Carousel} from 'components/common/Carousel'
import Header from 'components/common/Header'
import Paging from 'components/common/Paging'
import {useLanguage} from 'context/Translation'
import {observer} from 'mobx-react-lite'
import {FC, useEffect, useState} from 'react'
import {productService} from 'services/product'
import {scrollTopPage} from 'utils'
import Container from "../common/Container/Container";
import useFilterAndListContainerStyle from "../common/Container/FilterAndListContainer/FilterAndListContainer.styles";
import {TabContext, TabList, TabPanel} from "@mui/lab";

const ProductsPage: FC = () => {
    const {language} = useLanguage();
    const {classes} = useFilterAndListContainerStyle();
    const {products, filterFields, paging, loading} = productService;
    const [value, setValue] = useState('1')

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }
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
                <Spinner/>
            ) : (
                <>
                    <Header/>
                    <Carousel/>
                    <Breadcrumb/>
                    <Container>
                        <Grid container>
                            <Grid item width={'25%'} className={classes.root}>
                                {
                                    <Filter onFind={handleFindClick} filterElements={filterFields}
                                            filterParams={productService.getFilterValues()}/>
                                }
                            </Grid>
                            <Grid item width={'75%'} className={classes.root}>
                                {
                                    <Container>
                                        <TabContext value={value}>
                                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                                <TabList aria-label='Tabs example' onChange={handleChange}>
                                                    <Tab label='Продукты' value='1'/>
                                                    <Tab label='Анализ данных' value='2'/>
                                                </TabList>
                                            </Box>
                                            <TabPanel value='1'>
                                                <Grid container spacing={2}>
                                                    {products && products.length ? (
                                                        products.map((product, index) => {
                                                            return (
                                                                <Grid item key={index} width={'100%'}>
                                                                    <ProductCard item={product.item}/>
                                                                </Grid>
                                                            )
                                                        })
                                                    ) : (
                                                        <></>
                                                    )}
                                                </Grid>
                                                <Paging paging={paging} onChange={handlePageChange}/>

                                            </TabPanel>
                                            <TabPanel value='2'>
                                            </TabPanel>
                                        </TabContext>
                                    </Container>
                                }
                            </Grid>
                        </Grid>
                    </Container>
                    <Footer/>
                </>
            )
        }
    </>
}

export default observer(ProductsPage)   