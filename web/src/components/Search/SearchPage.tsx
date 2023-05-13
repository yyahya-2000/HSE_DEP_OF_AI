import {FC, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {useLanguage} from "../../context/Translation";
import {searchService} from "../../services/search";
import {organizationService} from "../../services/organizations";
import {projectService} from "../../services/projects";
import {productService} from "../../services/product";
import {researchCenterService} from "../../services/researchCenter";
import {scrollTopPage} from "../../utils";
import Spinner from "../common/Spinner/Spinner";
import Header from "../common/Header/Header";
import Carousel from "../common/Carousel/Carousel";
import Breadcrumb from "../common/Breadcrumb/Breadcrumb";
import {TabIOSearch} from "../common/Tabs";
import {Box, Grid} from "@mui/material";
import {OrganizationCard} from "../common";
import Paging from "../common/Paging";
import {ProductCard} from "../common/Cards/Products";
import {ProjectCard} from "../common/Cards/Projects";
import {ResearchCenterCard} from "../common/Cards/ResearchCenters";
import Container from "../common/Container/Container";

const SearchPage: FC = () => {
    const {language} = useLanguage();
    const {organizations, products, projects, ResearchCenters, UseCase, loading, paging} = searchService

    useEffect(() => {
        organizationService.fetchPagingOrganizations(0, language)
        projectService.fetchPagingProjects(0, language)
        productService.fetchPagingProducts(0, language)
        researchCenterService.fetchPagingResearchCenters(0, language)
    }, [language]);

    const handlePageChangeOrganization = (page: number) => {
        organizationService.fetchPagingOrganizations(page, language);
        scrollTopPage();
    };
    const handlePageChangeProduct = (page: number) => {
        productService.fetchPagingProducts(page, language)
        scrollTopPage();
    };
    const handlePageChangeProject = (page: number) => {
        projectService.fetchPagingProjects(page, language)
        scrollTopPage();
    };
    const handlePageChangeResearchCenter = (page: number) => {
        researchCenterService.fetchPagingResearchCenters(page, language)
        scrollTopPage();
    };

    return <>
        {loading ? (
            <Spinner/>
        ) : (<>
                <Header/>
                <Carousel/>
                <Breadcrumb/>
                <Container>
                    <TabIOSearch
                        listOrganizations={<Box>
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
                                {/*<Paging paging={paging} onChange={handlePageChangeOrganization}/>*/}
                            </Box>
                        </Box>}
                        listProducts={<Box>
                            <Box>
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
                                {/*<Paging paging={paging} onChange={handlePageChangeProduct} />*/}
                            </Box>
                        </Box>}
                        listProjects={<Box>
                            <Box>
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
                                {/*<Paging paging={paging} onChange={handlePageChangeProject} />*/}
                            </Box>
                        </Box>}
                        listResearchCenter={<Box>
                            <Box>
                                <Grid container spacing={2}>
                                    {ResearchCenters && ResearchCenters.length ? (
                                        ResearchCenters.map((researchCenter, index) => {
                                            return (
                                                <Grid item key={index} width={'100%'}>
                                                    <ResearchCenterCard item={researchCenter.item}/>
                                                </Grid>
                                            )
                                        })
                                    ) : (
                                        <></>
                                    )}
                                </Grid>
                                {/*<Paging paging={paging} onChange={handlePageChangeResearchCenter} />*/}
                            </Box>
                        </Box>}
                        listUseCases={<Box>
                            <Box>
                                <Grid container spacing={2}>
                                </Grid>
                                {/*<Paging paging={paging} onChange={handlePageChangeProjectUseCases} />*/}
                            </Box>
                        </Box>}/>
                </Container>

            </>

        )}
    </>
}

export default observer(SearchPage)