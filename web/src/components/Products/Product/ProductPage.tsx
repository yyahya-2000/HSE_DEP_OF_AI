import {Accordion, AccordionDetails, AccordionSummary, Grid, Typography} from '@mui/material';
import {Breadcrumb, Container, Footer, Spinner} from 'components/common';
import Header from 'components/common/Header';
import {useLanguage} from 'context/Translation';
import {observer} from 'mobx-react-lite';
import {FC, useEffect} from 'react'
import {productService} from 'services/product';
import {DictionaryItemProps, LinkProps} from 'types';
import {getUrlAdress} from 'utils';
import {useProductStyle} from "./ProductPage.style";

const ProductPage: FC = () => {
    const {language} = useLanguage();
    const {classes} = useProductStyle();

    const url = getUrlAdress(window.location.pathname);
    const id = url[url.length - 1].name;
    const {detail, lang, loading} = productService;
    useEffect(() => {
        if (id === null) return;
        if (!detail.item.length || (detail.item.length && Number(detail.item.filter(x => x.id == 'nid')[0].value[0]) !== Number(id))) {
            productService.fetchDetail(language, Number(id));
            return;
        }
        if (lang !== language) {
            productService.fetchDetail(language, Number(id));
            return;
        }
    }, [detail, language, id]);

    useEffect(() => {
        return function cleanupPage() {
            productService.cleanDetail();
        };
    }, []);

    const fields = detail.item.map((field, index) => {
        let val = ''
        for (let index in field.value) {
            if (field.type === 'link') {
                const link = field.value[index] as LinkProps
                val += `[ Url: ${link.url}, Text:  ${link.text} ], `
            } else if (field.type !== 'entity_reference') {
                val += field.value[index] + ', '
            } else {
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
                <Spinner/>
            ) : (
                <>
                    <Header/>
                    <Breadcrumb/>
                    <Container>
                        <Typography
                            className={classes.title}>{detail.item.filter(x => x.id === 'title')[0].value[0] as string}</Typography>
                        {detail.item.filter(x => x.id === 'product_type')[0].value.length === 0 ?
                            <Typography style={{
                                fontFamily: "Inter",
                                fontStyle: "normal",
                                fontWeight: 400,
                                fontSize: "16px",
                                lineHeight: "25px",
                                textAlign: "justify",
                                color: "#4A4646",
                            }}>{" "}
                            </Typography> :
                            <Typography style={{
                                fontFamily: "Inter",
                                fontStyle: "normal",
                                fontWeight: 400,
                                fontSize: "16px",
                                lineHeight: "25px",
                                textAlign: "justify",
                                color: "#4A4646",
                            }}> {(detail.item.filter(x => x.id === 'product_type')[0].value[0] as DictionaryItemProps).name}
                            </Typography>}
                        <div className={classes.textcols}>
                            <div className={classes.textcolsLeft}>
                                {detail.item.filter(x => x.id === 'application_area')[0].value.length === 0 ?
                                    <Typography style={{
                                        fontFamily: "Inter",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        fontSize: "16px",
                                        lineHeight: "25px",
                                        textAlign: "justify",
                                        color: "#4A4646",
                                    }}><p style={{
                                        fontFamily: "Inter",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        fontSize: "14px",
                                        lineHeight: "25px",
                                        textTransform: "uppercase",
                                        color: "#5F52FA",
                                    }}>{detail.item.filter(x => x.id === 'application_area')[0].label as string}</p>
                                        <hr className={classes.line}/>
                                        {" "}
                                    </Typography> :
                                    <Typography style={{
                                        fontFamily: "Inter",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        fontSize: "16px",
                                        lineHeight: "25px",
                                        textAlign: "justify",
                                        color: "#4A4646",
                                    }}><p style={{
                                        fontFamily: "Inter",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        fontSize: "14px",
                                        lineHeight: "25px",
                                        textTransform: "uppercase",
                                        color: "#5F52FA",
                                    }}>{detail.item.filter(x => x.id === 'application_area')[0].label as string}</p> {(detail.item.filter(x => x.id === 'application_area')[0].value as DictionaryItemProps[]).map(value => value.name as string).join('\n')}
                                    </Typography>}
                            </div>
                            <div className={classes.textcolsRight}>
                                {detail.item.filter(x => x.id === 'domain_ai')[0].value.length === 0 ?
                                    <Typography style={{
                                        fontFamily: "Inter",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        fontSize: "16px",
                                        lineHeight: "25px",
                                        textAlign: "justify",
                                        color: "#4A4646",
                                    }}><p style={{
                                        fontFamily: "Inter",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        fontSize: "14px",
                                        lineHeight: "25px",
                                        textTransform: "uppercase",
                                        color: "#5F52FA",
                                    }}>{detail.item.filter(x => x.id === 'domain_ai')[0].label as string}</p>
                                        <hr className={classes.line}/>
                                        {" "}
                                    </Typography> :
                                    <Typography style={{
                                        fontFamily: "Inter",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        fontSize: "16px",
                                        lineHeight: "25px",
                                        textAlign: "justify",
                                        color: "#4A4646",
                                    }}><p style={{
                                        fontFamily: "Inter",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        fontSize: "14px",
                                        lineHeight: "25px",
                                        textTransform: "uppercase",
                                        color: "#5F52FA",
                                    }}>{detail.item.filter(x => x.id === 'domain_ai')[0].label as string}</p> {(detail.item.filter(x => x.id === 'domain_ai')[0].value as DictionaryItemProps[]).map(value => value.name as string).join('\n')}
                                    </Typography>}
                            </div>
                        </div>
                        <Accordion defaultExpanded={true}>
                            <AccordionSummary expandIcon={'>'}>
                                <div id="home-organization">
                                    <div className='organization__Head'>
                                        <div className='organization__Head__text'>
                                            {'описание'.toUpperCase()}
                                        </div>
                                    </div>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                {detail.item.filter(x => x.id === 'description')[0].value.length === 0 ?
                                    <Typography style={{
                                        fontFamily: "Inter",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        fontSize: "14px",
                                        lineHeight: "25px",
                                        textAlign: "justify",
                                        color: "#4A4646",
                                        wordWrap: "break-word",
                                    }}>{" "}</Typography> :
                                    <Typography style={{
                                        fontFamily: "Inter",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        fontSize: "14px",
                                        lineHeight: "25px",
                                        textAlign: "justify",
                                        color: "#4A4646",
                                        wordWrap: "break-word",
                                    }}>{detail.item.filter(x => x.id === 'description')[0].value[0] as string}</Typography>}

                            </AccordionDetails>
                        </Accordion>
                        {detail.item.filter(x => x.id === 'subject')[0].value.length === 0 ?
                            <Typography className={'max-lines-1'}>
                                <p className={classes.text} style={{display: "inline"}}>
                                    {detail.item.filter(x => x.id === 'subject')[0].label as string}&nbsp;&nbsp;&nbsp;&nbsp;
                                </p>
                                <p style={{
                                    display: "inline",
                                    fontFamily: "Inter",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    fontSize: "14px",
                                    lineHeight: "25px",
                                    textAlign: "justify",
                                    color: "#4A4646",
                                }}>
                                    {" "}&nbsp;&nbsp;&nbsp;&nbsp;
                                </p>
                            </Typography> :
                            <Typography className={'max-lines-2'}>
                                <p className={classes.text} style={{display: "inline"}}>
                                    {detail.item.filter(x => x.id === 'subject')[0].label as string}&nbsp;&nbsp;&nbsp;&nbsp;
                                </p>
                                <p style={{
                                    display: "inline",
                                    fontFamily: "Inter",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    fontSize: "14px",
                                    lineHeight: "25px",
                                    textAlign: "justify",
                                    color: "#4A4646",
                                }}>
                                    {detail.item.filter(x => x.id === 'subject')[0].value[0] as string}&nbsp;&nbsp;&nbsp;&nbsp;
                                </p>
                            </Typography>
                        }
                        {detail.item.filter(x => x.id === 'product_russian')[0].value.length === 0 ?
                            <Typography className={'max-lines-1'}>
                                <p className={classes.text} style={{display: "inline"}}>
                                    {detail.item.filter(x => x.id === 'product_russian')[0].label as string}&nbsp;&nbsp;&nbsp;&nbsp;
                                </p>
                                <p style={{
                                    display: "inline",
                                    fontFamily: "Inter",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    fontSize: "14px",
                                    lineHeight: "25px",
                                    textAlign: "justify",
                                    color: "#4A4646",
                                }}>
                                    {" "}&nbsp;&nbsp;&nbsp;&nbsp;
                                </p>
                            </Typography> :
                            <Typography className={'max-lines-2'}>
                                <p className={classes.text} style={{display: "inline"}}>
                                    {detail.item.filter(x => x.id === 'product_russian')[0].label as string}&nbsp;&nbsp;&nbsp;&nbsp;
                                </p>
                                <p style={{
                                    display: "inline",
                                    fontFamily: "Inter",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    fontSize: "14px",
                                    lineHeight: "25px",
                                    textAlign: "justify",
                                    color: "#4A4646",
                                }}>
                                    {detail.item.filter(x => x.id === 'product_russian')[0].value[0] as string}&nbsp;&nbsp;&nbsp;&nbsp;
                                </p>
                            </Typography>
                        }
                    </Container>
                    <Footer/>
                </>
            )
        }
    </>
}

export default observer(ProductPage)