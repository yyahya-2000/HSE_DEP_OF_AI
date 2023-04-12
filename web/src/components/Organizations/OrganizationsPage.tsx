import {Breadcrumb, Filter, FilterAndListContainer, Footer, Spinner} from 'components/common'
import {Carousel} from 'components/common/Carousel'
import Header from 'components/common/Header'
import {FC, useEffect, useState} from 'react'
import {useLanguage} from "context/Translation";
import {organizationService} from 'services/organizations'
import {scrollTopPage} from 'utils'
import {Box, Grid, Tab} from '@mui/material'
import {OrganizationCard} from 'components/common'
import {observer} from 'mobx-react-lite'
import Paging from 'components/common/Paging'
import {productService} from "../../services/product";
import Container from "../common/Container/Container";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {ProductCard} from "../common/Cards/Products";
import useFilterAndListContainerStyle from "../common/Container/FilterAndListContainer/FilterAndListContainer.styles";

const OrganizationsPage: FC = () => {
    const {language} = useLanguage();
    const {classes} = useFilterAndListContainerStyle();
    const {organizations, filterFields, paging, loading} = organizationService;
    const [value, setValue] = useState('1')

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }
    useEffect(() => {
        organizationService.fetchPagingOrganizations(0, language);
        organizationService.fetchFilterElements(language)
    }, [language]);

    const handlePageChange = (page: number) => {
        organizationService.fetchPagingOrganizations(page, language);
        scrollTopPage();
    };
    const handleFindClick = (filterParams) => {
        organizationService.fetchOrganizationsFilter(language, filterParams);
    };
    return <>
        {loading || !filterFields.length ? (
            <Spinner/>
        ) : (<>
                <Header/>
                <Carousel/>
                <Breadcrumb/>
                <Container>
                    <Grid container>
                        <Grid item width={'25%'} className={classes.root}>
                            {
                                <Filter onFind={handleFindClick} filterElements={filterFields}
                                        filterParams={organizationService.getFilterValues()}/>
                            }
                        </Grid>
                        <Grid item width={'75%'} className={classes.root}>
                            {
                                <Container>
                                    <TabContext value={value}>
                                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                            <TabList aria-label='Tabs example' onChange={handleChange}>
                                                <Tab label='Организации' value='1'/>
                                                <Tab label='Анализ данных' value='2'/>
                                            </TabList>
                                        </Box>
                                        <TabPanel value='1'>
                                            <Grid container spacing={2}>
                                                {organizations && organizations.length ? (
                                                    organizations.map((org, index) => {
                                                        return (
                                                            <Grid item key={index} width={'100%'}>
                                                                <OrganizationCard item={org.item}/>
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
        )}
    </>
}

export default observer(OrganizationsPage)
