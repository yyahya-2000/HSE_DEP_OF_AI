import { Box, Grid } from '@mui/material';
import { Breadcrumb, Filter, FilterAndListContainer, Footer, Spinner } from 'components/common';
import { ResearchCenterCard } from 'components/common/Cards/ResearchCenters';
import { Carousel } from 'components/common/Carousel'
import Header from 'components/common/Header'
import Paging from 'components/common/Paging';
import { useLanguage } from 'context/Translation';
import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react'
import { researchCenterService } from 'services/researchCenter';
import { scrollTopPage } from 'utils';

const ResearchCentersPage: FC = () => {
    const { language } = useLanguage();
    const { ResearchCenters, paging, filterFields, loading } = researchCenterService;
    useEffect(() => {
        researchCenterService.fetchPagingResearchCenters(0, language);
        researchCenterService.fetchFilterElements(language)

    }, [language]);
    const handlePageChange = (page: number) => {
        researchCenterService.fetchPagingResearchCenters(page, language);
        scrollTopPage();
    };
    const handleFindClick = (filterParams) => {
        researchCenterService.fetchResearchCentersFilter(language, filterParams);
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
                            <Filter onFind={handleFindClick} filterElements={filterFields} filterParams={researchCenterService.getFilterValues()}/>
                        }
                        list={
                            <Box >
                                <Box>
                                    <Grid container spacing={2}>
                                        {ResearchCenters && ResearchCenters.length ? (
                                            ResearchCenters.map((researchCenter, index) => {
                                                return (
                                                    <Grid item key={index} width={'100%'}>
                                                        <ResearchCenterCard item={researchCenter.item} />
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

export default observer(ResearchCentersPage)