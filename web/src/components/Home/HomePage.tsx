import {Accordion, AccordionDetails, AccordionSummary, Box, Grid} from '@mui/material'
import {Footer, Container, Spinner, OrganizationCard} from 'components/common'
import {Carousel} from 'components/common/Carousel'
import Header from 'components/common/Header'
import {FC, useEffect} from 'react'
import {organizationService} from "../../services/organizations";
import {productService} from "../../services/product";
import {projectService} from "../../services/projects";
import {researchCenterService} from "../../services/researchCenter";
import {useLanguage} from "../../context/Translation";
import {observer} from "mobx-react-lite";
import {EntityFieldProps, EntityItemProps} from "../../types";
import {ProductCard} from "../common/Cards/Products";
import {ProjectCard} from "../common/Cards/Projects";
import {ResearchCenterCard} from "../common/Cards/ResearchCenters";

const HomePage: FC = () => {
    const { language } = useLanguage();
    const {totalOrganization} = organizationService;
    const {totalProduct} = productService;
    const {totalProject} = projectService;
    const {totalResearchCenter} = researchCenterService;

    useEffect(() => {
        organizationService.fetchPagingOrganizations(0, language);
        productService.fetchPagingProducts(0, language);
        projectService.fetchPagingProjects(0, language)
        researchCenterService.fetchPagingResearchCenters(0, language)
    }, [language]);


    return <>
        {!researchCenterService.ResearchCenters.length || !projectService.projects.length || !productService.products.length || !organizationService.organizations.length || organizationService.loading || productService.loading || projectService.loading || researchCenterService.loading ? (
            <Spinner/>
        ) : (<>
                <Header/>
                <Carousel/>
                <Box minHeight={'10vh'}></Box>
                <Container>
                    <Grid container style={{marginLeft: 'auto', marginRight: 'auto', textAlign: "center"}}>
                        <Grid item width={"25%"} style={{
                            padding: "3px",
                            fontWeight: 400,
                            lineHeight: "65px",
                            fontSize: "54px",
                            color: "#4A4646",
                            opacity: 0.98,
                        }}>{totalOrganization}</Grid>
                        <Grid item width={"25%"} style={{
                            padding: "3px",
                            fontWeight: 400,
                            lineHeight: "65px",
                            fontSize: "54px",
                            color: "#4A4646",
                            opacity: 0.98
                        }}>{totalProduct}</Grid>
                        <Grid item width={"25%"} style={{
                            padding: "3px",
                            fontWeight: 400,
                            lineHeight: "65px",
                            fontSize: "54px",
                            color: "#4A4646",
                            opacity: 0.98
                        }}>{totalProject}</Grid>
                        <Grid item width={"25%"} style={{
                            padding: "3px",
                            fontWeight: 400,
                            lineHeight: "65px",
                            fontSize: "54px",
                            color: "#4A4646",
                            opacity: 0.98
                        }}>{totalResearchCenter}</Grid>
                        <Grid item width={"25%"} style={{
                            padding: "3px",
                            fontWeight: 600,
                            lineHeight: "16px",
                            fontSize: "22px",
                            textAlign: "center",
                            textTransform: "uppercase",
                            color: "#4A4646",
                        }}>организации</Grid>
                        <Grid item width={"25%"} style={{
                            padding: "3px",
                            fontWeight: 600,
                            lineHeight: "16px",
                            fontSize: "22px",
                            textAlign: "center",
                            textTransform: "uppercase",
                            color: "#4A4646",
                        }}>продукты</Grid>
                        <Grid item width={"25%"} style={{
                            padding: "3px",
                            fontWeight: 600,
                            lineHeight: "16px",
                            fontSize: "22px",
                            textAlign: "center",
                            textTransform: "uppercase",
                            color: "#4A4646",
                        }}>проекты</Grid>
                        <Grid item width={"25%"} style={{
                            padding: "3px",
                            fontWeight: 600,
                            lineHeight: "16px",
                            fontSize: "22px",
                            textAlign: "center",
                            textTransform: "uppercase",
                            color: "#4A4646",
                        }}>исследовательские центры</Grid>
                    </Grid>
                </Container>
                <Box minHeight={'10vh'}></Box>
                <Container>
                    <Grid container spacing={2}>
                        <Accordion defaultExpanded={true}>
                            <AccordionSummary>
                                <div id="home-carousel">
                                    <div className='carousel__Head'>
                                        <div className='carousel__Head__text'>
                                            {'организации'.toUpperCase()}
                                        </div>
                                    </div>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Container >
                                    <Grid container style={{display: "flex", justifyContent: "space-evenly", flexWrap: "wrap"}} spacing={2}>
                                        <Grid item width={"48%"} style={{display: "block", }}><OrganizationCard item={organizationService.organizations[3].item as EntityFieldProps[]}/></Grid>
                                        <Grid item width={"48%"} style={{display: "block", }}><OrganizationCard item={organizationService.organizations[1].item as EntityFieldProps[]}/></Grid>
                                        <Grid item width={"50%"} style={{display: "block", }}><OrganizationCard item={organizationService.organizations[2].item as EntityFieldProps[]}/></Grid>
                                    </Grid>
                                </Container>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion defaultExpanded={true}>
                            <AccordionSummary>
                                <div id="home-carousel">
                                    <div className='carousel__Head'>
                                        <div className='carousel__Head__text'>
                                            {'продукты'.toUpperCase()}
                                        </div>
                                    </div>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Container >
                                    <Grid container style={{display: "flex", justifyContent: "space-evenly", flexWrap: "wrap"}} spacing={2}>
                                        <Grid item width={"48%"} style={{display: "block", }}><ProductCard item={productService.products[3].item as EntityFieldProps[]}/></Grid>
                                        <Grid item width={"48%"} style={{display: "block", }}><ProductCard item={productService.products[4].item as EntityFieldProps[]}/></Grid>
                                        <Grid item width={"50%"} style={{display: "block", }}><ProductCard item={productService.products[2].item as EntityFieldProps[]}/></Grid>
                                    </Grid>
                                </Container>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion defaultExpanded={true}>
                            <AccordionSummary>
                                <div id="home-carousel">
                                    <div className='carousel__Head'>
                                        <div className='carousel__Head__text'>
                                            {'проекты'.toUpperCase()}
                                        </div>
                                    </div>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Container >
                                    <Grid container style={{display: "flex", justifyContent: "space-evenly", flexWrap: "wrap"}} spacing={2}>
                                        <Grid item width={"48%"} style={{display: "block", }}><ProjectCard item={projectService.projects[0].item as EntityFieldProps[]}/></Grid>
                                        <Grid item width={"48%"} style={{display: "block", }}><ProjectCard item={projectService.projects[1].item as EntityFieldProps[]}/></Grid>
                                        <Grid item width={"50%"} style={{display: "block", }}><ProjectCard item={projectService.projects[2].item as EntityFieldProps[]}/></Grid>
                                    </Grid>
                                </Container>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion defaultExpanded={true}>
                            <AccordionSummary>
                                <div id="home-carousel">
                                    <div className='carousel__Head'>
                                        <div className='carousel__Head__text'>
                                            {'исследовательские центры'.toUpperCase()}
                                        </div>
                                    </div>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Container >
                                    <Grid container style={{display: "flex", justifyContent: "space-evenly", flexWrap: "wrap"}} spacing={2}>
                                        <Grid item width={"48%"} style={{display: "block", }}><ResearchCenterCard item={researchCenterService.ResearchCenters[0].item as EntityFieldProps[]}/></Grid>
                                        <Grid item width={"48%"} style={{display: "block", }}><ResearchCenterCard item={researchCenterService.ResearchCenters[1].item as EntityFieldProps[]}/></Grid>
                                        <Grid item width={"50%"} style={{display: "block", }}><ResearchCenterCard item={researchCenterService.ResearchCenters[2].item as EntityFieldProps[]}/></Grid>
                                    </Grid>
                                </Container>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>

                </Container>







                <Footer/>
            </>
        )}
    </>
}

export default observer(HomePage)

