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
    return <>

        {
            loading || !detail.item.length ? (
                <Spinner />
            ) : (
                <>
                    <Header />
                    <Breadcrumb />
                    <Container>
                        <Typography
                            className={classes.title}>{detail.item.filter(x => x.id === 'title')[0].value[0] as string}</Typography>
                        {detail.item.filter(x => x.id === 'project_common_title')[0].value.length === 0 ?
                            <Typography className={classes.title}>{" "}
                            </Typography> :
                            <Typography className={'max-lines-2'} style={{
                                fontWeight: 700,
                                fontSize: "20px",
                                lineHeight: "24px",
                                textTransform: "uppercase",
                                color: "#4A4646",
                                marginBottom: "10px"}}> {detail.item.filter(x => x.id === 'project_common_title')[0].value[0] as string}
                            </Typography>}
                        <div className={classes.textcols}>
                            <div className={classes.textcolsLeft}>
                                {detail.item.filter(x => x.id === 'project_application_area')[0].value.length === 0 ?
                                    <Typography style={{

                                        fontWeight: 400,
                                        fontSize: "16px",
                                        lineHeight: "25px",
                                        textAlign: "justify",
                                        color: "#4A4646",
                                    }}><Typography style={{

                                        fontWeight: 400,
                                        fontSize: "14px",
                                        lineHeight: "25px",
                                        textTransform: "uppercase",
                                        color: "#5F52FA",
                                    }}>{detail.item.filter(x => x.id === 'project_application_area')[0].label as string}</Typography>
                                        <hr className={classes.line}/>
                                        {" "}
                                    </Typography> :
                                    <Typography style={{

                                        fontWeight: 400,
                                        fontSize: "16px",
                                        lineHeight: "25px",
                                        textAlign: "justify",
                                        color: "#4A4646",
                                    }}><Typography style={{

                                        fontWeight: 400,
                                        fontSize: "14px",
                                        lineHeight: "25px",
                                        textTransform: "uppercase",
                                        color: "#5F52FA",
                                    }}>{detail.item.filter(x => x.id === 'project_application_area')[0].label as string}</Typography> {(detail.item.filter(x => x.id === 'project_application_area')[0].value as DictionaryItemProps[]).map(value => value.name as string).join('\n')}
                                    </Typography>}
                            </div>
                            <div className={classes.textcolsRight}>
                                {detail.item.filter(x => x.id === 'domain_ai')[0].value.length === 0 ?
                                    <Typography style={{
                                        fontWeight: 400,
                                        fontSize: "16px",
                                        lineHeight: "25px",
                                        textAlign: "justify",
                                        color: "#4A4646",
                                    }}><Typography style={{
                                        fontWeight: 400,
                                        fontSize: "14px",
                                        lineHeight: "25px",
                                        textTransform: "uppercase",
                                        color: "#5F52FA",
                                    }}>{detail.item.filter(x => x.id === 'domain_ai')[0].label as string}</Typography>
                                        <hr className={classes.line}/>
                                        {" "}
                                    </Typography> :
                                    <Typography style={{
                                        fontWeight: 400,
                                        fontSize: "16px",
                                        lineHeight: "25px",
                                        textAlign: "justify",
                                        color: "#4A4646",
                                    }}><Typography style={{

                                        fontWeight: 400,
                                        fontSize: "14px",
                                        lineHeight: "25px",
                                        textTransform: "uppercase",
                                        color: "#5F52FA",
                                    }}>{detail.item.filter(x => x.id === 'domain_ai')[0].label as string}</Typography> {(detail.item.filter(x => x.id === 'domain_ai')[0].value as DictionaryItemProps[]).map(value => value.name as string).join('\n')}
                                    </Typography>}
                            </div>
                        </div>
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
                                {detail.item.filter(x => x.id === 'project_desc')[0].value.length === 0 ?
                                    <Typography style={{

                                        fontWeight: 400,
                                        fontSize: "14px",
                                        lineHeight: "25px",
                                        textAlign: "justify",
                                        color: "#4A4646",
                                        wordWrap: "break-word",
                                    }}>{" "}</Typography> :
                                    <Typography style={{
                                        fontWeight: 400,
                                        fontSize: "14px",
                                        lineHeight: "25px",
                                        textAlign: "justify",
                                        color: "#4A4646",
                                        wordWrap: "break-word",
                                    }}>{detail.item.filter(x => x.id === 'project_desc')[0].value[0] as string}</Typography>}

                            </AccordionDetails>
                        </Accordion>
                        {detail.item.filter(x => x.id === 'project_subject')[0].value.length === 0 ?
                            <Grid className={'max-lines-1'}>
                                <Typography className={classes.text} style={{display: "inline"}}>
                                    {detail.item.filter(x => x.id === 'project_subject')[0].label as string}&nbsp;&nbsp;&nbsp;&nbsp;
                                </Typography>
                                <Typography style={{
                                    display: "inline",
                                    fontWeight: 400,
                                    fontSize: "14px",
                                    lineHeight: "25px",
                                    textAlign: "justify",
                                    color: "#4A4646",
                                }}>
                                    {" "}&nbsp;&nbsp;&nbsp;&nbsp;
                                </Typography>
                            </Grid> :
                            <Grid className={'max-lines-2'}>
                                <Typography className={classes.text} style={{display: "inline"}}>
                                    {detail.item.filter(x => x.id === 'project_subject')[0].label as string}&nbsp;&nbsp;&nbsp;&nbsp;
                                </Typography>
                                <Typography style={{
                                    display: "inline",

                                    fontWeight: 400,
                                    fontSize: "14px",
                                    lineHeight: "25px",
                                    textAlign: "justify",
                                    color: "#4A4646",
                                }}>
                                    {detail.item.filter(x => x.id === 'project_subject')[0].value[0] as string}&nbsp;&nbsp;&nbsp;&nbsp;
                                </Typography>
                            </Grid>
                        }
                    </Container>
                    <Footer />
                </>
            )
        }
    </>
}

export default observer(ProjectPage)