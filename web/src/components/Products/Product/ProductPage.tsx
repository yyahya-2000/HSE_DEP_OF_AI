import { Grid } from '@mui/material';
import { Breadcrumb, Container, Footer, Spinner } from 'components/common';
import Header from 'components/common/Header';
import { useLanguage } from 'context/Translation';
import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react'
import { productService } from 'services/product';
import { DictionaryItemProps, LinkProps } from 'types';
import { getUrlAdress } from 'utils';

const ProductPage: FC = () => {
    const { language } = useLanguage();

    const url = getUrlAdress(window.location.pathname);
    const id = url[url.length - 1].name;
    const { detail, lang, loading } = productService;
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
            loading ? (
                <Spinner />
            ) : (
                <>
                    <Header />
                    <Breadcrumb />
                    <Container>
                        {fields}
                    </Container>
                    <Footer />
                </>
            )
        }
    </>
}

export default observer(ProductPage)