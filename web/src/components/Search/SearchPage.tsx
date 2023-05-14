import {FC, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {useLanguage} from "../../context/Translation";
import {searchService} from "../../services/search";
import {getUrlAdress, scrollTopPage} from "../../utils";
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
import Footer from "../common/Footer/Footer";

const SearchPage: FC = () => {
    const {language} = useLanguage();
    const {organizations, products, projects, ResearchCenters, UseCase, loading, paging} = searchService
    const url = getUrlAdress(window.location.pathname);
    const key = url[url.length - 1].name

    useEffect(() => {
        searchService.fetchSearchPaging(key, 0, language)
    }, [key, language]);

    useEffect(() => {
        searchService.fetchSearchTotalOrganization(key, language)
    }, [key, language]);

    useEffect(() => {
        searchService.fetchSearchTotalProject(key, language)
    }, [key, language]);

    useEffect(() => {
        searchService.fetchSearchTotalProduct(key, language)
    }, [key, language]);

    useEffect(() => {
        searchService.fetchSearchTotalResearchCenter(key, language)
    }, [key, language]);

    useEffect(() => {
        searchService.fetchSearchTotalUseCase(key, language)
    }, [key, language]);

    const handlePageChange = (page: number) => {
        searchService.fetchSearchPaging(key, page, language)
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
                    <Paging paging={paging} onChange={handlePageChange}/>
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
                            </Box>
                        </Box>}
                        listUseCases={<Box>
                            <Box>
                                <Grid container spacing={2}>
                                </Grid>
                            </Box>
                        </Box>}/>
                </Container>
                <Footer/>

            </>

        )}
    </>
}

export default observer(SearchPage)