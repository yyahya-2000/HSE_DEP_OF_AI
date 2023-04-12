import {Box, Grid, Tab} from '@mui/material';
import { Breadcrumb, Filter, FilterAndListContainer, Footer, Spinner } from 'components/common';
import { ResearchCenterCard } from 'components/common/Cards/ResearchCenters';
import { Carousel } from 'components/common/Carousel'
import Header from 'components/common/Header'
import Paging from 'components/common/Paging';
import { useLanguage } from 'context/Translation';
import { observer } from 'mobx-react-lite';
import {FC, useEffect, useState} from 'react'
import { researchCenterService } from 'services/researchCenter';
import { scrollTopPage } from 'utils';
import {projectService} from "../../services/projects";
import Container from "../common/Container/Container";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {ProjectCard} from "../common/Cards/Projects";
import useFilterAndListContainerStyle from "../common/Container/FilterAndListContainer/FilterAndListContainer.styles";

const ResearchCentersPage: FC = () => {
    const { language } = useLanguage();
    const {classes} = useFilterAndListContainerStyle();
    const { ResearchCenters, paging, filterFields, loading } = researchCenterService;
    const [value, setValue] = useState('1')

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }
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
                    <Container>
                        <Grid container>
                            <Grid item width={'25%'} className={classes.root}>
                                {
                                    <Filter onFind={handleFindClick} filterElements={filterFields} filterParams={researchCenterService.getFilterValues()}/>
                                }
                            </Grid>
                            <Grid item width={'75%'} className={classes.root}>
                                {
                                    <Container>
                                        <TabContext value={value}>
                                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                                <TabList aria-label='Tabs example' onChange={handleChange}>
                                                    <Tab label='Исследовательские центры' value='1'/>
                                                    <Tab label='Анализ данных' value='2'/>
                                                </TabList>
                                            </Box>
                                            <TabPanel value='1'>
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
                    <Footer />
                </>
            )
        }
    </>
}

export default observer(ResearchCentersPage)