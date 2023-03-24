import { Breadcrumb, Filter, FilterAndListContainer, Footer, Spinner } from 'components/common'
import { Carousel } from 'components/common/Carousel'
import Header from 'components/common/Header'
import { FC, useEffect, useState } from 'react'
import { useLanguage } from "context/Translation";
import { organizationService } from 'services/organizations'
import { scrollTopPage } from 'utils'
import { Box, Grid } from '@mui/material'
import { OrganizationCard } from 'components/common'
import { observer } from 'mobx-react-lite'
import Paging from 'components/common/Paging'

const OrganizationsPage: FC = () => {
    const { language } = useLanguage();
    const { organizations, paging, loading } = organizationService;
    useEffect(() => {
        organizationService.fetchPagingOrganizations(0, language);
    }, [language]);
    const handlePageChange = (page: number) => {
        organizationService.fetchPagingOrganizations(page, language);
        scrollTopPage();
    };
    const handleFindClick = (filterParams) => {
        organizationService.fetchOrganizationsFilter(language, filterParams);
    };
    return <>
        {loading ? (
            <Spinner />
        ) : (<>
            <Header />
            <Carousel />
            <Breadcrumb />
            <FilterAndListContainer
                filter={
                    <Filter id={'organizations'} onFind={handleFindClick} />
                }
                list={
                    <Box >
                        <Box>
                            <Grid container spacing={2}>
                                {organizations && organizations.length ? (
                                    organizations.map((org, index) => {
                                        return (
                                            <Grid item key={index} width={'100%'}>
                                                <OrganizationCard item={org.item} />
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
        )}
    </>
}

export default observer(OrganizationsPage)
