import {Accordion, AccordionDetails, AccordionSummary, Grid, Typography} from '@mui/material';
import { Breadcrumb, Container, Footer, Spinner } from 'components/common';
import Header from 'components/common/Header';
import { useLanguage } from 'context/Translation';
import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react'
import { researchCenterService } from 'services/researchCenter';
import { DictionaryItemProps, LinkProps } from 'types';
import { getUrlAdress } from 'utils';
import useResearchCenterStyle from "./ResearchCenter.style";

const ResearchCenterPage: FC = () => {
    const { language } = useLanguage();
    const { classes } = useResearchCenterStyle();
    const url = getUrlAdress(window.location.pathname);
    const id = url[url.length - 1].name;
    const { detail, lang, loading } = researchCenterService;
    useEffect(() => {
        if (id === null) return;
        if (!detail.item.length || (detail.item.length && Number(detail.item.filter(x => x.id == 'nid')[0].value[0]) !== Number(id))) {
            researchCenterService.fetchDetail(language, Number(id));
            return;
        }
        if (lang !== language) {
            researchCenterService.fetchDetail(language, Number(id));
            return;
        }
    }, [detail, language, id]);

    useEffect(() => {
        return function cleanupPage() {
            researchCenterService.cleanDetail();
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
                    <Container >
                        <Typography
                            className={classes.title}>{detail.item.filter(x => x.id === 'title')[0].value[0] as string}</Typography>
                        <Typography className={'max-lines-4'} style={{
                            width: "650px",
                            fontFamily: "Inter",
                            fontStyle: "normal",
                            fontWeight: 600,
                            fontSize: "20px",
                            lineHeight: "20px",
                            textTransform: "uppercase",
                            color: "#4A4646",
                            wordWrap: "break-word",
                            marginBottom: "10px",
                        }} overflow={'hidden'}
                                    textOverflow={'ellipsis'}>{ detail.item.length &&detail.item.filter(x => x.id === 'common_org_name')[0].value[0] as string}</Typography>
                        {/*<Typography><p>{detail.item.filter(x => x.id === 'uid')[0].label as string}</p><p>{detail.item.filter(x => x.id === 'uid')[0].value[0] as string}</p></Typography>*/}
                        <Typography>
                            <p className={classes.text} style={{display: "inline"}}>
                                { detail.item.length &&detail.item.filter(x => x.id === 'org_ogrn')[0].label as string}&nbsp;&nbsp;&nbsp;&nbsp;
                            </p>
                            <p className={classes.value} style={{display: "inline"}}>
                                { detail.item.length && detail.item.filter(x => x.id === 'org_ogrn')[0].value[0] as string}&nbsp;&nbsp;&nbsp;&nbsp;
                            </p>
                            <p className={classes.text} style={{display: "inline"}}>
                                {detail.item.length && detail.item.filter(x => x.id === 'org_inn')[0].label as string}&nbsp;&nbsp;&nbsp;&nbsp;
                            </p>
                            <p className={classes.value} style={{display: "inline"}}>
                                {detail.item.length && detail.item.filter(x => x.id === 'org_inn')[0].value[0] as string}&nbsp;&nbsp;&nbsp;&nbsp;
                            </p>
                            <p className={classes.text} style={{display: "inline"}}>
                                {detail.item.length && detail.item.filter(x => x.id === 'org_date')[0].label as string}&nbsp;&nbsp;&nbsp;&nbsp;
                            </p>
                            <p className={classes.value} style={{display: "inline"}}>
                                {detail.item.length && detail.item.filter(x => x.id === 'org_date')[0].value[0] as string}&nbsp;&nbsp;&nbsp;&nbsp;
                            </p>
                            <p className={classes.text} style={{display: "inline"}}>
                                {detail.item.length && detail.item.filter(x => x.id === 'org_status')[0].label as string}&nbsp;&nbsp;&nbsp;&nbsp;
                            </p>
                            <p className={classes.value} style={{display: "inline"}}>
                                { detail.item.length && (detail.item.filter(x => x.id === 'org_status')[0].value[0] as DictionaryItemProps).name as string}&nbsp;&nbsp;&nbsp;&nbsp;
                            </p>
                        </Typography>
                        <Typography>
                            <p className={classes.text} style={{display: "inline"}}>
                                {detail.item.filter(x => x.id === 'org_form')[0].label as string}&nbsp;&nbsp;&nbsp;&nbsp;
                            </p>
                            <p className={'max-lines-1'} style={{display: "inline",
                                fontFamily: "Inter",
                                fontStyle: "normal",
                                fontWeight: 600,
                                fontSize: "20px",
                                lineHeight: "25px",
                                color: "#5F52FA",
                                wordWrap: "break-word",
                            }} >
                                {detail.item.filter(x => x.id === 'org_form')[0].value[0] as string}&nbsp;&nbsp;&nbsp;&nbsp;
                            </p>
                        </Typography>
                        <Typography>
                            <p className={classes.text} style={{display: "inline"}}>
                                {detail.item.filter(x => x.id === 'org_size')[0].label as string}&nbsp;&nbsp;&nbsp;&nbsp;
                            </p>
                            <p className={classes.value} style={{display: "inline"}}>
                                {(detail.item.filter(x => x.id === 'org_size')[0].value[0] as DictionaryItemProps).name as string}&nbsp;&nbsp;&nbsp;&nbsp;
                            </p>
                        </Typography>
                        <Accordion defaultExpanded={true}>
                            <AccordionSummary expandIcon={'>'}>
                                <div id="home-researchcenter">
                                    <div className='researchcenter__Head'>
                                        <div className='researchcenter__Head__text'>
                                            {'контакты'.toUpperCase()}
                                        </div>
                                    </div>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className={classes.textcols}>
                                    <div className={classes.textcolsLeft}>
                                        <Typography className={'max-lines-1'} style={{fontFamily: "Inter",
                                            fontStyle: "normal",
                                            fontWeight: 600,
                                            fontSize: "20px",
                                            lineHeight: "25px",
                                            textTransform: "uppercase",
                                            color: "#4A4646",
                                            wordWrap: "break-word",
                                        }} overflow={'hidden'}
                                                    textOverflow={'ellipsis'}>{detail.item.filter(x => x.id === 'org_location')[0].label as string}</Typography>
                                        <Typography className={'max-lines-1'} style={{fontFamily: "Inter",
                                            fontStyle: "normal",
                                            fontWeight: 400,
                                            fontSize: "14px",
                                            lineHeight: "25px",
                                            textTransform: "uppercase",
                                            color: "#4A4646",
                                            wordWrap: "break-word",
                                        }} overflow={'hidden'}
                                                    textOverflow={'ellipsis'}>{detail.item.filter(x => x.id === 'org_location')[0].value[0] as string}</Typography>
                                        <Typography className={classes.text}>{detail.item.filter(x => x.id === 'org_website')[0].label as string}</Typography>
                                        <Typography className={'max-lines-1'} style={{fontFamily: "Inter",
                                            fontStyle: "normal",
                                            fontWeight: 400,
                                            fontSize: "14px",
                                            lineHeight: "25px",
                                            textTransform: "uppercase",
                                            color: "#5F52FA",
                                            wordWrap: "break-word",
                                            textDecorationLine: "underline",
                                        }} overflow={'hidden'}
                                                    textOverflow={'ellipsis'}>{(detail.item.filter(x => x.id === 'org_website')[0].value as LinkProps[]).map(urls => urls.url as string)}</Typography>
                                        <Typography className={classes.text}>{detail.item.filter(x => x.id === 'org_email')[0].label as string}</Typography>
                                        <Typography className={'max-lines-1'} style={{fontFamily: "Inter",
                                            fontStyle: "normal",
                                            fontWeight: 400,
                                            fontSize: "14px",
                                            lineHeight: "25px",
                                            textTransform: "uppercase",
                                            color: "#4A4646",
                                            wordWrap: "break-word",
                                        }} overflow={'hidden'}
                                                    textOverflow={'ellipsis'}>{detail.item.filter(x => x.id === 'org_email')[0].value.map(email => email as string).join(', ')}</Typography>
                                    </div>
                                    <div className={classes.textcolsRight}>

                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion defaultExpanded={true}>
                            <AccordionSummary expandIcon={'>'}>
                                <div id="home-researchcenter">
                                    <div className='researchcenter__Head'>
                                        <div className='researchcenter__Head__text'>
                                            {'описание'.toUpperCase()}
                                        </div>
                                    </div>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>

                                <Typography style={{fontFamily: "Inter",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    fontSize: "14px",
                                    lineHeight: "25px",
                                    textAlign: "justify",
                                    color: "#4A4646",
                                    wordWrap: "break-word",
                                }}>{detail.item.filter(x => x.id === 'org_desc')[0].value[0] as string}</Typography>

                            </AccordionDetails>
                        </Accordion>

                        <Accordion defaultExpanded={true}>
                            <AccordionSummary expandIcon={'>'}>
                                <div id="home-researchcenter">
                                    <div className='researchcenter__Head'>
                                        <div className='researchcenter__Head__text'>
                                            {'деятельность'.toUpperCase()}
                                        </div>
                                    </div>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <p className={classes.text} style={{display: "inline",}}>
                                        {detail.item.filter(x => x.id === 'org_okved')[0].label as string}&nbsp;
                                    </p>
                                    <p className={'max-lines-3'} style={{display: "inline",
                                        fontFamily: "Inter",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        fontSize: "14px",
                                        lineHeight: "25px",
                                        textAlign: "justify",
                                        color: "#4A4646",
                                        wordWrap: "break-word",
                                    }}>
                                        {detail.item.filter(x => x.id === 'org_okved')[0].value[0] as string}&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                </Typography>
                                <Accordion defaultExpanded={true}>
                                    <AccordionSummary expandIcon={'>'}>
                                        <Typography className={classes.text}>{detail.item.filter(x => x.id === 'org_okved_add')[0].label as string}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography className={'max-lines-2'}>{detail.item.filter(x => x.id === 'org_okved_add')[0].value.map(value => value as string).join(', ')}</Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion defaultExpanded={true}>
                            <AccordionSummary expandIcon={'>'}>
                                <div id="home-researchcenter">
                                    <div className='researchcenter__Head'>
                                        <div className='researchcenter__Head__text'>
                                            {'искусственный интеллект'.toUpperCase()}
                                        </div>
                                    </div>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography className={'max-lines-1'} >
                                    <p className={classes.text} style={{display: "inline"}}>
                                        {detail.item.filter(x => x.id === 'org_subject')[0].label as string}&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <p style={{display: "inline",
                                        fontFamily: "Inter",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        fontSize: "14px",
                                        lineHeight: "25px",
                                        textAlign: "justify",
                                        color: "#4A4646",}}>
                                        {detail.item.filter(x => x.id === 'org_subject')[0].value[0] as string}&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                </Typography>
                                <Typography className={'max-lines-1'} >
                                    <p className={classes.text} style={{display: "inline"}}>
                                        {detail.item.filter(x => x.id === 'org_competence_ai')[0].label as string}&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <p style={{display: "inline",
                                        fontFamily: "Inter",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        fontSize: "14px",
                                        lineHeight: "25px",
                                        textAlign: "justify",
                                        color: "#4A4646",}}>
                                        {(detail.item.filter(x => x.id === 'org_competence_ai')[0].value as DictionaryItemProps[]).map(value => value.name as string).join(', ')}&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                </Typography>
                                <Typography className={'max-lines-1'} >
                                    <p className={classes.text} style={{display: "inline"}}>
                                        {detail.item.filter(x => x.id === 'org_method_ai')[0].label as string}&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <p className={classes.value} style={{display: "inline",
                                        fontFamily: "Inter",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        fontSize: "14px",
                                        lineHeight: "25px",
                                        textAlign: "justify",
                                        color: "#4A4646",}}>
                                        {(detail.item.filter(x => x.id === 'org_method_ai')[0].value as DictionaryItemProps[]).map(value => value.name as string).join(', ')}&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                </Typography>
                                <Typography className={'max-lines-1'} >
                                    <p className={classes.text} style={{display: "inline"}}>
                                        {detail.item.filter(x => x.id === 'org_tools_ai')[0].label as string}&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <p style={{display: "inline",
                                        fontFamily: "Inter",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        fontSize: "14px",
                                        lineHeight: "25px",
                                        textAlign: "justify",
                                        color: "#4A4646",}}>
                                        {(detail.item.filter(x => x.id === 'org_tools_ai')[0].value as DictionaryItemProps[]).map(value => value.name as string).join(', ')}&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Container>
                    <Footer />
                </>
            )
        }
    </>
}

export default observer(ResearchCenterPage)