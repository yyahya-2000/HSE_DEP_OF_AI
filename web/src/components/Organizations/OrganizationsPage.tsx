import {Breadcrumb, Filter, FilterAndListContainer, Footer, Spinner} from 'components/common'
import {Carousel} from 'components/common/Carousel'
import Header from 'components/common/Header'
import {FC, useEffect, useState} from 'react'
import {useLanguage} from "context/Translation";
import {organizationService} from 'services/organizations'
import {scrollTopPage} from 'utils'
import {Box, Grid} from '@mui/material'
import {OrganizationCard} from 'components/common'
import {observer} from 'mobx-react-lite'
import Paging from 'components/common/Paging'
import {TabIO} from "../common/Tabs";

const OrganizationsPage: FC = () => {
    const {language} = useLanguage();
    const {organizations, filterFields, paging, loading} = organizationService;
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
                <FilterAndListContainer
                    filter={
                        <Filter onFind={handleFindClick} filterElements={filterFields}
                                filterParams={organizationService.getFilterValues()}/>
                    }
                    list={
                        <TabIO
                            list={
                                <Box>
                                    <Box>
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
                                    </Box>
                                </Box>
                            }
                            organizationsBI={
                                <iframe
                                    width="600"
                                    height="400"
                                    seamless
                                    frameBorder="0"
                                    scrolling="no"
                                    src="https://aiportalbilive.infostrategic.com/superset/explore/p/Bg0pDjwyWOY/?standalone=1&height=400"

                                >

                                </iframe>
                        }

                            name={"Организации"}/>

                    }
                />
                <Footer/>
            </>
        )}
    </>
}

export default observer(OrganizationsPage)
