import { Box, Grid } from '@mui/material';
import { Breadcrumb, Carousel, Filter, FilterAndListContainer, Footer, Spinner } from 'components/common'
import { ProjectCard } from 'components/common/Cards/Projects';
import Header from 'components/common/Header'
import Paging from 'components/common/Paging';
import { useLanguage } from 'context/Translation';
import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react'
import { projectService } from 'services/projects';
import { scrollTopPage } from 'utils';

const ProjectsPage: FC = () => {
    const { language } = useLanguage();
    const { projects, paging, loading } = projectService;
    useEffect(() => {
        projectService.fetchPagingProjects(0, language);
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
            loading ? (
                <Spinner />
            ) : (
                <>
                    <Header />
                    <Carousel />
                    <Breadcrumb />
                    <FilterAndListContainer
                        filter={
                            <Filter id={'projects'} onFind={handleFindClick} />
                        }
                        list={
                            <Box >
                                <Box>
                                    <Grid container spacing={2}>
                                        {projects && projects.length ? (
                                            projects.map((project, index) => {
                                                return (
                                                    <Grid item key={index} width={'100%'}>
                                                        <ProjectCard item={project.item} />
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

export default observer(ProjectsPage)