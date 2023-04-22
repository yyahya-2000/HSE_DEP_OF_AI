import {Accordion, AccordionDetails, AccordionSummary, Card, Grid, Typography} from '@mui/material';

import {Breadcrumb, Container, Spinner} from 'components/common';
import {Footer} from 'components/common';
import Header from 'components/common/Header';
import {useLanguage} from 'context/Translation';
import {observer} from 'mobx-react-lite';
import {FC, useEffect} from 'react'
import {organizationService} from 'services/organizations';
import {DictionaryItemProps, LinkProps} from 'types';
import {getUrlAdress} from 'utils';
import useOrganizationStyle from "./OrganizationPage.style";

const OrganizationPage: FC = () => {
    const {language} = useLanguage();
    const {classes} = useOrganizationStyle();

    const url = getUrlAdress(window.location.pathname);
    const id = url[url.length - 1].name;
    const {detail, lang, loading} = organizationService;
    useEffect(() => {
        if (id === null) return;
        if (!detail.item.length || (detail.item.length && Number(detail.item.filter(x => x.id === 'nid')[0].value[0]) !== Number(id))) {
            organizationService.fetchDetail(language, Number(id));
            return;
        }
        if (lang !== language) {
            organizationService.fetchDetail(language, Number(id));
            return;
        }
    }, [detail, language, id]);

    useEffect(() => {
        return function cleanupPage() {
            organizationService.cleanDetail();
        };
    }, []);

    const fieldsTitles = detail.item.map((field, index) => {
        if ((field.label === 'Название организации' || field.label === 'Общепринятое название организации') && field.value.length !== 0) {
            return (
                <Grid item key={index} width={'100%'} style={{overflow: "hidden"}}>
                    <Typography className={classes.title + ' ' + 'max-lines-1'}
                                textOverflow={'ellipsis'}>{field.value.map(value => value)}</Typography>
                </Grid>
            )

        }
    })

    const fieldsDescription = detail.item.map((field, index) => {
        if (field.type === 'text_long' && field.value.length !== 0) {
            return (
                <Accordion defaultExpanded={true}>
                    <AccordionSummary expandIcon={'>'}>
                        <div id="home-carousel">
                            <div className='carousel__Head'>
                                <div className='carousel__Head__text'>
                                    {'описание'.toUpperCase()}
                                </div>
                            </div>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography key={index} className={classes.desc}>{field.value.map(value => value)}</Typography>
                    </AccordionDetails>
                </Accordion>
            )

        }
    })

    const fieldsLeft = detail.item.map((field, index) => {
        if ((field.type === 'bigint' || field.type === 'datetime') && field.value.length !== 0) {
            return (
                <Grid item key={index} width={'100%'} style={{overflow: "hidden"}}>
                    <Typography className={classes.label}>{field.label}</Typography>
                    <Typography className={classes.value}
                                textOverflow={'ellipsis'}>{field.value.map(value => value)}</Typography>
                </Grid>
            )

        }
    })
    const fieldsRight = detail.item.map((field, index) => {
        if ((field.label === 'Размер организации' || field.label === 'Статус') && field.value.length !== 0) {
            return (
                <Grid item key={index} width={'100%'} style={{overflow: "hidden"}}>
                    <Typography className={classes.label}>{field.label}</Typography>
                    <Typography className={classes.value}
                                textOverflow={'ellipsis'}>{field.value.map(value => value.name)}</Typography>
                </Grid>
            )
        }
        if (field.label === 'Организационно-правовая форма' && field.value.length !== 0) {
            return (
                <Grid item key={index} width={'100%'} style={{overflow: "hidden"}}>
                    <Typography className={classes.label}>{field.label}</Typography>
                    <Typography className={classes.value}
                                textOverflow={'ellipsis'}>{field.value.map(value => value)}</Typography>
                </Grid>
            )
        }
    })

    const fieldsLeftContact = detail.item.map((field, index) => {
        if ((field.label === 'Почтовый адрес' || field.label === 'Местоположение' || field.label === 'Юридический  адрес') && field.value.length !== 0) {
            return (
                <Grid item key={index} width={'100%'} style={{overflow: "hidden"}}>
                    <Typography className={classes.label}>{field.label}</Typography>
                    <Typography className={classes.value}
                                textOverflow={'ellipsis'}>{field.value.map(value => value)}</Typography>
                </Grid>
            )
        }
    })
    const fieldsRightContact = detail.item.map((field, index) => {
        if (field.type === 'link' && field.value.length !== 0) {
            return (
                <Grid item key={index} width={'100%'} style={{overflow: "hidden"}}>
                    <Typography className={classes.label}>{field.label}</Typography>
                    <Typography className={classes.value}
                                textOverflow={'ellipsis'}>{field.value.map(value => value.url).join(', ')}</Typography>
                </Grid>
            )
        }
        if (field.type === 'email' && field.value.length !== 0) {
            return (
                <Grid item key={index} width={'100%'} style={{overflow: "hidden"}}>
                    <Typography className={classes.label}>{field.label}</Typography>
                    <Typography className={classes.value}
                                textOverflow={'ellipsis'}>{field.value.map(value => value)}</Typography>
                </Grid>
            )
        }
        if (field.type === 'phone_number' && field.value.length !== 0) {
            return (
                <Grid item key={index} width={'100%'} style={{overflow: "hidden"}}>
                    <Typography className={classes.label}>{field.label}</Typography>
                    <Typography className={classes.value}
                                textOverflow={'ellipsis'}>{field.value.map(value => value)}</Typography>
                </Grid>
            )
        }
        if (field.label === 'ФИО руководителя организации' && field.value.length !== 0) {
            return (
                <Grid item key={index} width={'100%'} style={{overflow: "hidden"}}>
                    <Typography className={classes.label}>{field.label}</Typography>
                    <Typography className={classes.value}
                                textOverflow={'ellipsis'}>{field.value.map(value => value)}</Typography>
                </Grid>
            )
        }
    })

    const fieldsLeftOrganization = detail.item.map((field, index) => {
        if (field.label === 'Основной вид деятельности' && field.value.length !== 0) {
            return (
                <Grid item key={index} width={'100%'} style={{overflow: "hidden"}}>
                    <Typography className={classes.label}>{field.label}</Typography>
                    <Typography className={classes.value}
                                textOverflow={'ellipsis'}>{field.value.map(value => value)}</Typography>
                </Grid>
            )
        }
        if (field.label === 'Сфера применения ' && field.value.length !== 0) {
            return (
                <Grid item key={index} width={'100%'} style={{overflow: "hidden"}}>
                    <Typography className={classes.label}>{field.label}</Typography>
                    <Typography className={classes.value}
                                textOverflow={'ellipsis'}>{field.value.map(value => value.name).join(', ')}</Typography>
                </Grid>
            )
        }
        if (field.label === 'Дополнительный вид деятельности' && field.value.length !== 0) {
            return (
                <Accordion defaultExpanded={true}>
                    <AccordionSummary expandIcon={'>'}>
                        <Typography className={classes.title}>{field.label}</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{overflow: "hidden"}}>
                        <Typography key={index} className={classes.value}
                                    textOverflow={'ellipsis'}>{field.value.map(value => value)}</Typography>
                    </AccordionDetails>
                </Accordion>
            )
        }
        if (field.type === 'string_long' && field.value.length !== 0) {
            return (
                <Accordion defaultExpanded={true}>
                    <AccordionSummary expandIcon={'>'}>
                        <Typography className={classes.title}>{field.label}</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{overflow: "hidden"}}>
                        <Typography key={index} className={classes.value}
                                    textOverflow={'ellipsis'}>{field.value.map(value => value)}</Typography>
                    </AccordionDetails>
                </Accordion>
            )
        }
    })
    const fieldsRightOrganization = detail.item.map((field, index) => {
        if (field.type === 'boolean' && field.value.length !== 0) {
            return (
                <Grid item key={index} width={'100%'} style={{overflow: "hidden"}}>
                    <Typography className={classes.label}>{field.label}</Typography>
                    <Typography className={classes.value}
                                textOverflow={'ellipsis'}>{field.value.map(value => value === '1' ? "ДА" : "НЕТ")}</Typography>
                </Grid>
            )
        }
        if (field.label === 'ИИ-область' && field.value.length !== 0) {
            return (
                <Grid item key={index} width={'100%'} style={{overflow: "hidden"}}>
                    <Typography className={classes.label}>{field.label}</Typography>
                    <Typography className={classes.value}
                                textOverflow={'ellipsis'}>{field.value.map(value => value.name).join(', ')}</Typography>
                </Grid>
            )
        }
        if (field.label === 'Метод ИИ' && field.value.length !== 0) {
            return (
                <Grid item key={index} width={'100%'} style={{overflow: "hidden"}}>
                    <Typography className={classes.label}>{field.label}</Typography>
                    <Typography className={classes.value}
                                textOverflow={'ellipsis'}>{field.value.map(value => value.name).join(', ')}</Typography>
                </Grid>
            )
        }
        if (field.label === 'Инструмент ИИ' && field.value.length !== 0) {
            return (
                <Grid item key={index} width={'100%'} style={{overflow: "hidden"}}>
                    <Typography className={classes.label}>{field.label}</Typography>
                    <Typography className={classes.value}
                                textOverflow={'ellipsis'}>{field.value.map(value => value.name).join(', ')}</Typography>
                </Grid>
            )
        }
    })

    const fieldsLeftCount = detail.item.map((field, index) => {
        if (field.type === 'decimal' && field.value.length !== 0) {
            return (
                <Grid item key={index} width={'100%'} style={{overflow: "hidden"}}>
                    <Typography className={classes.label}>{field.label}</Typography>
                    <Typography className={classes.value}
                                textOverflow={'ellipsis'}>{field.value.map(value => value)}</Typography>
                </Grid>
            )
        }
    })

    const fieldsRightCount = detail.item.map((field, index) => {
        if (field.type === 'integer' && field.label !== 'ID' && field.value.length !== 0) {
            return (
                <Grid item key={index} width={'100%'} style={{overflow: "hidden"}}>
                    <Typography className={classes.label}>{field.label}</Typography>
                    <Typography className={classes.value}
                                textOverflow={'ellipsis'}>{field.value.map(value => value)}</Typography>
                </Grid>
            )
        }
    })
    const fieldsJob = detail.item.map((field, index) => {
        if (field.label === 'Доклады' || field.label === 'Публикации') {
            return (
                <Accordion defaultExpanded={true}>
                    <AccordionSummary expandIcon={'>'}>
                        <div id="home-carousel">
                            <div className='carousel__Head'>
                                <div className='carousel__Head__text'>
                                    {field.label.toUpperCase()}
                                </div>
                            </div>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>


                        <Typography key={index} className={classes.value}
                                    textOverflow={'ellipsis'}>{field.value.map(value => value.name).join(', ')}</Typography>


                    </AccordionDetails>
                </Accordion>
            )

        }
    })

    return <>
        {
            loading ? (
                <Spinner/>
            ) : (
                <>
                    <Header/>
                    <Breadcrumb/>
                    <Container>
                        {fieldsTitles}
                        <Grid container>
                            <Grid item width={'50%'}>
                                {fieldsLeft}
                            </Grid>
                            <Grid item width={'50%'}>
                                {fieldsRight}
                            </Grid>
                        </Grid>

                        <Accordion defaultExpanded={true}>
                            <AccordionSummary expandIcon={'>'}>
                                <div id="home-carousel">
                                    <div className='carousel__Head'>
                                        <div className='carousel__Head__text'>
                                            {'контакты'.toUpperCase()}
                                        </div>
                                    </div>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>

                                <Grid container>
                                    <Grid item width={'50%'}>
                                        {fieldsLeftContact}
                                    </Grid>
                                    <Grid item width={'50%'}>
                                        {fieldsRightContact}
                                    </Grid>
                                </Grid>

                            </AccordionDetails>
                        </Accordion>

                        {fieldsDescription}

                        <Accordion defaultExpanded={true}>
                            <AccordionSummary expandIcon={'>'}>
                                <div id="home-carousel">
                                    <div className='carousel__Head'>
                                        <div className='carousel__Head__text'>
                                            {'информация об организации'.toUpperCase()}
                                        </div>
                                    </div>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>

                                <Grid container>
                                    <Grid item width={'50%'}>
                                        {fieldsLeftOrganization}
                                    </Grid>
                                    <Grid item width={'50%'}>
                                        {fieldsRightOrganization}
                                    </Grid>
                                </Grid>

                            </AccordionDetails>
                        </Accordion>

                        <Accordion defaultExpanded={true}>
                            <AccordionSummary expandIcon={'>'}>
                                <div id="home-carousel">
                                    <div className='carousel__Head'>
                                        <div className='carousel__Head__text'>
                                            {'цифры'.toUpperCase()}
                                        </div>
                                    </div>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container>
                                    <Grid item width={'50%'}>
                                        {fieldsLeftCount}
                                    </Grid>
                                    <Grid item width={'50%'}>
                                        {fieldsRightCount}
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>


                        {fieldsJob}
                    </Container>
                    <Footer/>
                </>
            )
        }
    </>
}

export default observer(OrganizationPage)