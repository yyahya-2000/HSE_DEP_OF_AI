import {FC, useState} from "react";
import {Link} from "react-router-dom";
import {scrollTopPage} from "utils";
import {routers} from "routers";
import {Box, Card, Container, Grid, Tab, Typography} from "@mui/material";
import {EntityItemProps, DictionaryItemProps} from "types";
import useProductCardStyle from "./ProductCard.styles";
import {PinkButton} from "../../Buttons";


const ProductCard: FC<EntityItemProps> = ({item}) => {
    const {classes} = useProductCardStyle();


    return (



        <Card>
            <Container>
                <Typography
                    className={classes.title}>{item.filter(x => x.id === 'title')[0].value[0] as string}</Typography>
                {item.filter(x => x.id === 'product_type')[0].value.length === 0 ?
                    <Typography style={{
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "25px",
                        textAlign: "justify",
                        color: "#4A4646",}}><Typography style={{
                        display: "inline",
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "25px",
                        textTransform: "uppercase",
                        color: "#5F52FA",
                    }}>{item.filter(x => x.id === 'product_type')[0].label as string}&nbsp;&nbsp;&nbsp;&nbsp;</Typography>{" "}
                    </Typography> :
                    <Typography style={{
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "25px",
                        textAlign: "justify",
                        color: "#4A4646",}}><Typography style={{
                        display: "inline",
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "25px",
                        textTransform: "uppercase",
                        color: "#5F52FA",
                    }}>{item.filter(x => x.id === 'product_type')[0].label as string}&nbsp;&nbsp;&nbsp;&nbsp;</Typography> {(item.filter(x => x.id === 'product_type')[0].value[0] as DictionaryItemProps).name}
                    </Typography>}
                {item.filter(x => x.id === 'application_area')[0].value.length === 0 ?
                    <Typography style={{
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "25px",
                        textAlign: "justify",
                        color: "#4A4646",}}><Typography style={{
                        display: "inline",
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "25px",
                        textTransform: "uppercase",
                        color: "#5F52FA",
                    }}>{item.filter(x => x.id === 'application_area')[0].label as string}&nbsp;&nbsp;&nbsp;&nbsp;</Typography>{" "}
                    </Typography> :
                    <Typography style={{
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "25px",
                        textAlign: "justify",
                        color: "#4A4646",}}><Typography style={{
                        display: "inline",
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "25px",
                        textTransform: "uppercase",
                        color: "#5F52FA",
                    }}>{item.filter(x => x.id === 'application_area')[0].label as string}&nbsp;&nbsp;&nbsp;&nbsp;</Typography> {(item.filter(x => x.id === 'application_area')[0].value[0] as DictionaryItemProps).name}
                    </Typography>}

                <hr className={classes.line}/>

                {item.filter(x => x.id === 'description')[0].value.length === 0 ?
                    <Typography>{" "}</Typography> :
                    <Typography
                        className={'max-lines-3'} style={{
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "25px",
                        textAlign: "justify",
                        color: "#4A4646",
                    }}>{(item.filter(x => x.id === 'description')[0].value[0] as string)}
                    </Typography>}

                <Container style={{marginLeft: "76%"}}>
                    <Link to={`${routers.products}/${item.filter(x => x.id === 'nid')[0].value}`}
                          onClick={scrollTopPage}>
                        <PinkButton title={'ПОДРОБНЕЕ'}></PinkButton>
                    </Link>
                </Container>
            </Container>
        </Card>
    );
};

export default ProductCard;
