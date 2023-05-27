import {FC, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {useLanguage} from "../../context/Translation";
import {searchService} from "../../services/search";
import {getUrlAdress, scrollTopPage} from "../../utils";
import Spinner from "../common/Spinner/Spinner";
import Header from "../common/Header/Header";
import Carousel from "../common/Carousel/Carousel";
import Breadcrumb from "../common/Breadcrumb/Breadcrumb";
import {TabIOSearch} from "../common/Tabs";
import {Box, FormControl, Grid, Input, InputLabel, TextField} from "@mui/material";
import {OrganizationCard, PinkButton} from "../common";
import Paging from "../common/Paging";
import {ProductCard} from "../common/Cards/Products";
import {ProjectCard} from "../common/Cards/Projects";
import {ResearchCenterCard} from "../common/Cards/ResearchCenters";
import Container from "../common/Container/Container";
import Footer from "../common/Footer/Footer";
import {Link, useLocation} from "react-router-dom";
import paging from "../common/Paging";
import {footerService} from "../../services/footer";
import {routers} from "../../routers";


const FeedbackPage: FC = () => {
    const {loading, answer, ok} = footerService
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleChangeName = (event) => {
        setName(event.target.value);
    };
    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };
    const handleChangeSubject = (event) => {
        setSubject(event.target.value);
    };
    const handleChangeMessage = (event) => {
        setMessage(event.target.value);
    };

    const handleClick = () => {
        footerService.fetchTotal(name, email, subject, message)
        return(
            <>
                answer
            </>
        )
    }
    return <>
        {loading ? (
            <Spinner/>
        ) : (<>
                <Header/>
                <Carousel/>
                <Breadcrumb/>
                <Container>
                    {ok ? (
                        <Grid container style={{textAlign: "center"}}>
                            <Grid item width={'100%'}>{       }</Grid>
                            <Grid item width={'100%'}>{answer}</Grid>
                            <Grid item width={'100%'}>{       }</Grid>
                        </Grid>
                    ) : (
                        <form noValidate autoComplete={'off'} style={{textAlign: "center"}}>
                            <Grid container spacing={3} style={{textAlign: "center"}}>
                                <Grid item width={'100%'} style={{textAlign: "center"}}>
                                    <FormControl style={{textAlign: "center"}}>
                                        <InputLabel htmlFor="component-simple">Name</InputLabel>
                                        <Input id="component-simple" value={name} onChange={handleChangeName}/>
                                    </FormControl>
                                </Grid>
                                <Grid item width={'100%'}>
                                    <FormControl>
                                        <InputLabel htmlFor="component-simple">Email</InputLabel>
                                        <Input id="component-simple" value={email} onChange={handleChangeEmail}/>

                                    </FormControl>
                                </Grid>
                                <Grid item width={'100%'}>
                                    <FormControl>
                                        <InputLabel htmlFor="component-simple">Subject</InputLabel>
                                        <TextField multiline id="component-simple" value={subject} onChange={handleChangeSubject}/>

                                    </FormControl>
                                </Grid>
                                <Grid item width={'100%'}>
                                    <FormControl>
                                        <InputLabel htmlFor="component-simple">Message</InputLabel>
                                        <TextField multiline id="component-simple" value={message} onChange={handleChangeMessage}/>
                                    </FormControl>
                                </Grid>
                                <Grid item width={'100%'}>

                                    <PinkButton onClick={handleClick} title={'SEND'}></PinkButton>

                                </Grid>
                            </Grid>
                        </form>
                    )}

                </Container>
                <Footer/>

            </>

        )}
    </>
}

export default observer(FeedbackPage)