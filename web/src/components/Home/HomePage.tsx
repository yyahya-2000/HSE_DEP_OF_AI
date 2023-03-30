import {Box, Container, Grid, Typography} from '@mui/material'
import {Footer, Spinner} from 'components/common'
import {Carousel} from 'components/common/Carousel'
import Header from 'components/common/Header'
import {FC, useEffect, useState} from 'react'
import {organizationService} from "../../services/organizations";
import {productService} from "../../services/product";
import {projectService} from "../../services/projects";
import {researchCenterService} from "../../services/researchCenter";

const HomePage: FC = () => {
    const {totalOrganization, loading} = organizationService;
    const {totalProduct} = productService;
    const {totalProject} = projectService;
    const {totalResearchCenter} = researchCenterService;

    useEffect(() => {
        organizationService.fetchTotal();
        productService.fetchTotal();
        projectService.fetchTotal();
        researchCenterService.fetchTotal();
    }, []);
    //
    // useEffect(() => {
    //
    // }, []);
    //
    // useEffect(() => {
    //
    // }, []);
    //
    // useEffect(() => {
    //
    // }, [])

    console.log(loading)
    return <>
        {loading ? (
            <Spinner/>
        ) : (<>
                <Header/>
                <Carousel/>
                <Container style={{marginTop: "50px", textAlign: "center"}}>
                    <table style={{marginLeft: 'auto', marginRight: 'auto'}}>
                        <tr>
                            <th style={{
                                padding: "3px",
                                fontFamily: 'Inter',
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "65px",
                                fontSize: "54px",
                                color: "#4A4646",
                                opacity: 0.98
                            }}>{totalOrganization}</th>
                            <th style={{
                                padding: "3px",
                                fontFamily: 'Inter',
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "65px",
                                fontSize: "54px",
                                color: "#4A4646",
                                opacity: 0.98
                            }}>{totalProduct}</th>
                            <th style={{
                                padding: "3px",
                                fontFamily: 'Inter',
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "65px",
                                fontSize: "54px",
                                color: "#4A4646",
                                opacity: 0.98
                            }}>{totalProject}</th>
                            <th style={{
                                padding: "3px",
                                fontFamily: 'Inter',
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "65px",
                                fontSize: "54px",
                                color: "#4A4646",
                                opacity: 0.98
                            }}>{totalResearchCenter}</th>
                        </tr>
                        <tr>
                            <td style={{
                                padding: "3px",
                                fontFamily: 'Inter',
                                fontStyle: "normal",
                                fontWeight: 600,
                                lineHeight: "16px",
                                fontSize: "25px",
                                textAlign: "center",
                                textTransform: "uppercase",
                                color: "#4A4646",
                            }}>организации
                            </td>
                            <td style={{
                                padding: "3px",
                                fontFamily: 'Inter',
                                fontStyle: "normal",
                                fontWeight: 600,
                                lineHeight: "16px",
                                fontSize: "25px",
                                textAlign: "center",
                                textTransform: "uppercase",
                                color: "#4A4646",
                            }}>продукты
                            </td>
                            <td style={{
                                padding: "3px",
                                fontFamily: 'Inter',
                                fontStyle: "normal",
                                fontWeight: 600,
                                lineHeight: "16px",
                                fontSize: "25px",
                                textAlign: "center",
                                textTransform: "uppercase",
                                color: "#4A4646",
                            }}>проекты
                            </td>
                            <td><p style={{
                                padding: "3px",
                                fontFamily: 'Inter',
                                fontStyle: "normal",
                                fontWeight: 600,
                                lineHeight: "16px",
                                fontSize: "25px",
                                textAlign: "center",
                                textTransform: "uppercase",
                                color: "#4A4646",
                            }}>исследовательские</p><p style={{
                                padding: "3px",
                                fontFamily: 'Inter',
                                fontStyle: "normal",
                                fontWeight: 600,
                                lineHeight: "16px",
                                fontSize: "25px",
                                textAlign: "center",
                                textTransform: "uppercase",
                                color: "#4A4646",
                            }}>центры</p></td>
                        </tr>
                    </table>
                </Container>

                <Box minHeight={'25vh'}>


                </Box>

                <Footer/>
            </>
        )}
    </>
}

export default HomePage

