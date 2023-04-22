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

    const fieldsTitles = detail.item.map((field, index) => {
        if ((field.label === 'Название продукта' || field.label === 'Общепринятое название продукта') && field.value.length !== 0) {
            return (
                <Grid item key={index} width={'100%'} style={{overflow: "hidden"}}>
                    <Typography className={classes.title + ' ' + 'max-lines-1'}
                                textOverflow={'ellipsis'}>{field.value.map(value => value)}</Typography>
                </Grid>
            )

        }
    })
    const fieldsLeft = detail.item.map((field, index) => {
        if ((field.label === 'Категория продукта' || field.label === 'Область применения' || field.label === 'Категория деловых процессов') && field.value.length !== 0) {
            return (
                <Grid item width={'100%'}>
                    <Typography key={index} className={classes.label}>{field.label}</Typography>
                    <Typography key={index}
                                className={classes.value}>{field.value.map(value => value.name) + '\n'}</Typography>
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
        if (field.type === 'entity_reference_revision') {
            field.value.map(value => {
                return (
                    <Grid item width={'100%'}>
                        <Typography key={index} className={classes.label}>{field.label}</Typography>
                        <Typography key={index}
                                    className={classes.value}>{value.para_org.value.map(value => value.name)}</Typography>
                    </Grid>
                )


            })
        }
    })

    const fieldsDescription = detail.item.map((field, index) => {
        if (field.label === 'Описание продукта' && field.value.length !== 0) {
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

    const fieldSubject = detail.item.map((field, index) => {
        if (field.label === 'Предмет продукта' && field.value.length !== 0) {
            return (
                <Grid item width={'100%'}>
                    <Typography key={index} className={classes.label}>{field.label}</Typography>
                    <Typography key={index} className={classes.value + ' ' + 'max-lines-1'}
                                textOverflow={'ellipsis'}>{field.value.map(value => value)}</Typography>
                </Grid>
            )

        }
    })

    const fieldRussian = detail.item.map((field, index) => {
        if (field.label === 'Российская продукция' && field.value.length !== 0) {
            return (
                <Grid item width={'100%'}>
                    <Typography key={index} className={classes.label}>{field.label}</Typography>
                    <Typography key={index} className={classes.value + ' ' + 'max-lines-1'}
                                textOverflow={'ellipsis'}>{field.value.map(value => value)}</Typography>
                </Grid>
            )

        }
    })

    const fieldProject = detail.item.map((field, index) => {
        if (field.label === 'Проект' && field.value.length !== 0) {
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
                        <Typography key={index} className={classes.value + ' ' + 'max-lines-1'}
                                    textOverflow={'ellipsis'}>{field.value.map(value => value.id)}</Typography>
                        <Typography key={index} className={classes.value + ' ' + 'max-lines-1'}
                                    textOverflow={'ellipsis'}>{field.value.map(value => value.name === null ? '' : value.name)}</Typography>
                    </AccordionDetails>
                </Accordion>
            )

        }
    })
    const fieldProduct = detail.item.map((field, index) => {
        if ((field.label === 'Метод ИИ' || field.label === 'Инструмент ИИ' || field.label === 'Стадия продукта') && field.value.length !== 0) {
            return (
                <Grid item width={'100%'}>
                    <Typography key={index} className={classes.label}>{field.label}</Typography>
                    <Typography key={index} className={classes.value + ' ' + 'max-lines-1'}
                                textOverflow={'ellipsis'}>{field.value.map(value => value.name).join(', ')}</Typography>
                </Grid>
            )

        }
        if (field.label === 'Данные' && field.value.length !== 0) {
            return (
                <Grid item width={'100%'}>
                    <Typography key={index} className={classes.label}>{field.label}</Typography>
                    <Typography key={index} className={classes.value + ' ' + 'max-lines-1'}
                                textOverflow={'ellipsis'}>{field.value.map(value => value)}</Typography>
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
    })

    const fieldLevel = detail.item.map((field, index) => {
        if ((field.label === 'Уровень готовности технологии' || field.label === 'Уровень готовности производства' || field.label === 'Уровень рыночной готовности' || field.label === 'Уровень готовности интеграции') && field.value.length !== 0) {
            return (

                <Grid item width={'100%'}>
                    <Typography key={index} className={classes.label}>{field.label}</Typography>
                    <Typography key={index} className={classes.value + ' ' + 'max-lines-1'}
                                textOverflow={'ellipsis'}>{field.value.map(value => value.name). join(', ')}</Typography>
                </Grid>
        )

        }
    })

    const fieldSourceEntity = detail.item.map((field, index) => {
        if ((field.label === 'Способ использования' || field.label === 'Сопутствующие цифровые технологии' || field.label === 'Патент') && field.value.length !== 0) {
            return (

                <Grid item width={'100%'}>
                    <Typography key={index} className={classes.label}>{field.label}</Typography>
                    <Typography key={index} className={classes.value + ' ' + 'max-lines-1'}
                                textOverflow={'ellipsis'}>{field.value.map(value => value.name)}</Typography>
                </Grid>
            )

        }
    })
    const fieldSource = detail.item.map((field, index) => {
        if ((field.label === 'Вычислительные ресурсы' || field.label === 'Телекоммуникационные ресурсы') && field.value.length !== 0) {
            return (

                <Grid item width={'100%'}>
                    <Typography key={index} className={classes.label}>{field.label}</Typography>
                    <Typography key={index} className={classes.value + ' ' + 'max-lines-1'}
                                textOverflow={'ellipsis'}>{field.value.map(value => value)}</Typography>
                </Grid>
            )

        }
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
                        {fieldSubject}
                        {fieldRussian}
                        {fieldProject}
                        <Accordion defaultExpanded={true}>
                            <AccordionSummary expandIcon={'>'}>
                                <div id="home-carousel">
                                    <div className='carousel__Head'>
                                        <div className='carousel__Head__text'>
                                            {'о продукте'.toUpperCase()}
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
                                            {'уровни'.toUpperCase()}
                                        </div>
                                    </div>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                {fieldLevel}
                            </AccordionDetails>
                        </Accordion>
                        <Accordion defaultExpanded={true}>
                            <AccordionSummary expandIcon={'>'}>
                                <div id="home-carousel">
                                    <div className='carousel__Head'>
                                        <div className='carousel__Head__text'>
                                            {'ресурсы'.toUpperCase()}
                                        </div>
                                    </div>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                {fieldSourceEntity}
                                {fieldSource}
                            </AccordionDetails>
                        </Accordion>
                    </Container>
                    <Footer/>
                </>
            )
        }
    </>
}

export default observer(ProductPage)