import {Accordion, AccordionDetails, AccordionSummary, Grid, Typography} from '@mui/material';
import { Breadcrumb, Container, Footer, Spinner } from 'components/common';
import Header from 'components/common/Header';
import { useLanguage } from 'context/Translation';
import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react'
import { projectService } from 'services/projects';
import { DictionaryItemProps, LinkProps } from 'types';
import { getUrlAdress } from 'utils';
import useProjectStyle from "./ProjectPage.style";

const ProjectPage: FC = () => {
    const { language } = useLanguage();
    const { classes } = useProjectStyle();
    const url = getUrlAdress(window.location.pathname);
    const id = url[url.length - 1].name;
    const { detail, lang, loading } = projectService;
    useEffect(() => {
        if (id === null) return;
        if (!detail.item.length || (detail.item.length && Number(detail.item.filter(x => x.id == 'nid')[0].value[0]) !== Number(id))) {
            projectService.fetchDetail(language, Number(id));
            return;
        }
        if (lang !== language) {
            projectService.fetchDetail(language, Number(id));
            return;
        }
    }, [detail, language, id]);

    useEffect(() => {
        return function cleanupPage() {
            projectService.cleanDetail();
        };
    }, []);

    const fieldsTitles = detail.item.map((field, index) => {
        if ((field.label === 'Название проекта' || field.label === 'Общепринятое название проекта') && field.value.length !== 0) {
            return (
                <Grid item key={index} width={'100%'} style={{overflow: "hidden"}}>
                    <Typography className={classes.title + ' ' + 'max-lines-1'}
                                textOverflow={'ellipsis'}>{field.value.map(value => value)}</Typography>
                </Grid>
            )

        }
    })

    const fieldsLeft = detail.item.map((field, index) => {
        if ((field.label === 'Эффект' || field.label === 'Область применения') && field.value.length !== 0) {
            return (
                <Grid item width={'100%'}>
                    <Typography key={index} className={classes.label}>{field.label}</Typography>
                    <Typography key={index}
                                className={classes.value}>{field.value.map(value => value.name).join(', ')}</Typography>
                </Grid>
            )
        }
    })

    const fieldsRight = detail.item.map((field, index) => {
        if (field.label === 'Предметная область ИИ' && field.value.length !== 0) {
            return (
                <Grid item width={'100%'}>
                    <Typography key={index} className={classes.label}>{field.label}</Typography>
                    <Typography key={index}
                                className={classes.value}>{field.value.map(value => value.name).join(', ')}</Typography>
                </Grid>
            )
        }
        if (field.label === 'Цели проекта'  && field.value.length !== 0) {
            return (
                <Grid item width={'100%'}>
                    <Typography key={index} className={classes.label}>{field.label}</Typography>
                    <Typography key={index}
                                className={classes.value}>{field.value.map(value => value)}</Typography>
                </Grid>
            )
        }
    })

    const fieldsDescription = detail.item.map((field, index) => {
        if (field.label === 'Описание проекта' && field.value.length !== 0) {
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

    const fieldProduct = detail.item.map((field, index) => {
        if ((field.label === 'Метод ИИ' || field.label === 'Инструмент ИИ' || field.label === 'Стадия проекта') && field.value.length !== 0) {
            return (
                <Grid item width={'100%'}>
                    <Typography key={index} className={classes.label}>{field.label}</Typography>
                    <Typography key={index} className={classes.value + ' ' + 'max-lines-1'}
                                textOverflow={'ellipsis'}>{field.value.map(value => value.name).join(', ')}</Typography>
                </Grid>
            )

        }
        if (field.label === 'Бюджет' && field.value.length !== 0) {
            return (
                <Grid item width={'100%'}>
                    <Typography key={index} className={classes.label}>{field.label}</Typography>
                    <Typography key={index} className={classes.value + ' ' + 'max-lines-1'}
                                textOverflow={'ellipsis'}>{field.value.map(value => value)}</Typography>
                </Grid>
            )
        }
        if (field.label === 'Задачи проекта' && field.value.length !== 0) {
            return (
                <Grid item width={'100%'}>
                    <Typography key={index} className={classes.label}>{field.label}</Typography>
                    <Typography key={index} className={classes.value + ' ' + 'max-lines-1'}
                                textOverflow={'ellipsis'}>{field.value.map(value => value)}</Typography>
                </Grid>
            )
        }
        if (field.label === 'Руководитель' && field.value.length !== 0) {
            return (
                <Grid item width={'100%'}>
                    <Typography key={index} className={classes.label}>{field.label}</Typography>
                    <Typography key={index} className={classes.value + ' ' + 'max-lines-1'}
                                textOverflow={'ellipsis'}>{field.value.map(value => value.name)}</Typography>
                </Grid>
            )
        }
        if (field.type === 'file' && field.value.length !== 0) {
            return (
                <Grid item width={'100%'}>
                    <Typography key={index} className={classes.label}>{field.label}</Typography>
                    <Typography key={index} className={classes.value + ' ' + 'max-lines-1'}
                                textOverflow={'ellipsis'}>{field.value.map(value => value.url).join(', ')}</Typography>
                </Grid>
            )
        }
        if (field.label === 'Предмет проекта' && field.value.length !== 0) {
            return (
                <Grid item width={'100%'}>
                    <Typography key={index} className={classes.label}>{field.label}</Typography>
                    <Typography key={index} className={classes.value}>{field.value.map(value => value)}</Typography>
                </Grid>
            )
        }
    })

    const fieldDate = detail.item.map((field, index) => {
        if (field.type === 'datetime' && field.value.length !== 0) {
            return (
                <Grid item key={index} width={'100%'} style={{overflow: "hidden"}}>
                    <Typography key={index} className={classes.label}>{field.label}</Typography>
                    <Typography className={classes.value}
                                textOverflow={'ellipsis'}>{field.value.map(value => value)}</Typography>
                </Grid>
            )
        }
        if (field.label === 'Результаты' && field.value.length !== 0) {
            return (
                <Grid item key={index} width={'100%'} style={{overflow: "hidden"}}>
                    <Typography key={index} className={classes.label}>{field.label}</Typography>
                    <Typography className={classes.value}
                                textOverflow={'ellipsis'}>{field.value.map(value => value)}</Typography>
                </Grid>
            )
        }

    })


    const fields = detail.item.map((field, index) => {
        let val = ''
        for (let index in field.value) {
            if (field.type === 'link') {
                const link = field.value[index] as LinkProps
                val += `[ Url: ${link.url}, Text:  ${link.text} ], `
            }
            else if (field.type !== 'entity_reference') {
                val += field.value[index] + ', '
            }
            else {
                const dic = field.value[index] as DictionaryItemProps
                val += `[ ID: ${dic.id}, Name:  ${dic.name}, Bundle: ${dic.bundle}, Description: ${dic.description}], `
            }
        }
        return (
            <Grid key={index} className={'max-lines-2'} overflow={'hidden'} textOverflow={'ellipsis'}>
                {`${field.id} => Type: ${field.type}, Label:${field.label}, Value: ${val}`}
            </Grid>
        )
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
            loading || !detail.item.length ? (
                <Spinner />
            ) : (
                <>
                    <Header />
                    <Breadcrumb />
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
                        {fieldsDescription}
                        <Accordion defaultExpanded={true}>
                            <AccordionSummary expandIcon={'>'}>
                                <div id="home-carousel">
                                    <div className='carousel__Head'>
                                        <div className='carousel__Head__text'>
                                            {'о проекте'.toUpperCase()}
                                        </div>
                                    </div>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                {fieldProduct}
                            </AccordionDetails>
                        </Accordion>
                        <Accordion defaultExpanded={true}>
                            <AccordionSummary expandIcon={'>'}>
                                <div id="home-carousel">
                                    <div className='carousel__Head'>
                                        <div className='carousel__Head__text'>
                                            {'сроки'.toUpperCase()}
                                        </div>
                                    </div>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                {fieldDate}
                            </AccordionDetails>
                        </Accordion>
                        {fieldsJob}
                    </Container>
                    <Footer />
                </>
            )
        }
    </>
}

export default observer(ProjectPage)