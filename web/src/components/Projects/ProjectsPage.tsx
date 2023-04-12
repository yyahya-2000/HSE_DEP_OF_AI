import {Box, Grid, Tab} from '@mui/material';
import {Breadcrumb, Carousel, Filter, FilterAndListContainer, Footer, Spinner} from 'components/common'
import {ProjectCard} from 'components/common/Cards/Projects';
import Header from 'components/common/Header'
import Paging from 'components/common/Paging';
import {useLanguage} from 'context/Translation';
import {observer} from 'mobx-react-lite';
import {FC, useEffect, useState} from 'react'
import {projectService} from 'services/projects';
import {scrollTopPage} from 'utils';
import useFilterAndListContainerStyle from "../common/Container/FilterAndListContainer/FilterAndListContainer.styles";
import {productService} from "../../services/product";
import Container from "../common/Container/Container";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {ProductCard} from "../common/Cards/Products";

const ProjectsPage: FC = () => {
    const {language} = useLanguage();
    const {classes} = useFilterAndListContainerStyle();
    const {projects, paging, filterFields, loading} = projectService;
    const [value, setValue] = useState('1')

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }
    useEffect(() => {
        projectService.fetchPagingProjects(0, language);
        projectService.fetchFilterElements(language)
    }, [language]);
    const handlePageChange = (page: number) => {
        projectService.fetchPagingProjects(page, language);
        scrollTopPage();
    };
    const handleFindClick = (filterParams) => {
        projectService.fetchProjectsFilter(language, filterParams);
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
                                            filterParams={projectService.getFilterValues()}/>
                                }
                            </Grid>
                            <Grid item width={'75%'} className={classes.root}>
                                {
                                    <Container>
                                        <TabContext value={value}>
                                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                                <TabList aria-label='Tabs example' onChange={handleChange}>
                                                    <Tab label='Проекты' value='1'/>
                                                    <Tab label='Анализ данных' value='2'/>
                                                </TabList>
                                            </Box>
                                            <TabPanel value='1'>
                                                <Grid container spacing={2}>
                                                    {projects && projects.length ? (
                                                        projects.map((project, index) => {
                                                            return (
                                                                <Grid item key={index} width={'100%'}>
                                                                    <ProjectCard item={project.item}/>
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

export default observer(ProjectsPage)