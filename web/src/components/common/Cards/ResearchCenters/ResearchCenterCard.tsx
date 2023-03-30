import { FC } from "react";
import { Link } from "react-router-dom";
import { scrollTopPage } from "utils";
import { routers } from "routers";
import {Card, Container, Grid, Typography} from "@mui/material";
import {EntityItemProps, DictionaryItemProps, LinkProps} from "types";
import useResearchCenterCardStyle from "./ResearchCenterCard.styles";
import {PinkButton} from "../../Buttons";

const ResearchCenterCard: FC<EntityItemProps> = ({ item }) => {
    const { classes } = useResearchCenterCardStyle();

    const fields = item.map((field) => {
        let val = ''
        for (let index in field.value) {
            if (field.type !== 'entity_reference') {
                val += field.value[index] + ', '
            }
            else {
                const dic = field.value[index] as DictionaryItemProps
                val += `[ ID: ${dic.id}, Name:  ${dic.name}, Bundle: ${dic.bundle}, Description: ${dic.description}], `
            }
        }
        return (
            <Grid key={field.id} className={'max-lines-2'} overflow={'hidden'} textOverflow={'ellipsis'}>
                {`${field.id} => Type: ${field.type}, Label:${field.label}, Value: ${val}`}
            </Grid>
        )
    })

    return (
        <Card>
            <Container>

                <Typography
                    className={classes.title}>{item.filter(x => x.id === 'title')[0].value[0] as string}</Typography>

                <Typography className={'max-lines-2'} style={{
                    width: "650px",
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "20px",
                    lineHeight: "24px",
                    textTransform: "uppercase",
                    color: "#4A4646",
                    wordWrap: "break-word",
                    marginBottom: "10px",
                }} overflow={'hidden'}
                            textOverflow={'ellipsis'}>{item.filter(x => x.id === 'common_org_name')[0].value[0] as string}</Typography>
                <div className={classes.textcols}>
                    <div className={classes.textcolsLeft}>

                        <hr className={classes.line}/>

                        <Typography className={'max-lines-3'} style={{
                            fontFamily: "Inter",
                            fontStyle: "normal",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "25px",
                            textAlign: "justify",
                            color: "#4A4646",
                            wordWrap: "break-word",
                        }} overflow={'hidden'} textOverflow={'ellipsis'}><p style={{
                            fontFamily: "Inter",
                            fontStyle: "normal",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "25px",
                            color: "#5F52FA",
                            textTransform: "uppercase",
                        }}>{item.filter(x => x.id === 'org_okved')[0].label as string}</p>{item.filter(x => x.id === 'org_okved')[0].value[0] as string}
                        </Typography>

                        <hr className={classes.line}/>

                        <Typography className={'max-lines-3'} style={{
                            fontFamily: "Inter",
                            fontStyle: "normal",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "25px",
                            textAlign: "justify",
                            color: "#4A4646",
                        }} overflow={'hidden'}
                                    textOverflow={'ellipsis'}>{item.filter(x => x.id === 'org_desc')[0].value[0] as string}</Typography>

                    </div>
                    <div className={classes.textcolsRight}>
                        <Typography className={classes.status}><p style={{
                            display: "inline",
                            fontFamily: "Inter",
                            fontStyle: "normal",
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: "25px",
                            textTransform: "uppercase",
                            color: "#5F52FA",
                        }}>{item.filter(x => x.id === 'org_status')[0].label as string}&nbsp;&nbsp;&nbsp;&nbsp;</p>{(item.filter(x => x.id === 'org_status')[0].value[0] as DictionaryItemProps).name as string}
                        </Typography>

                        <Typography className={'max-lines-1'} style={{
                            fontFamily: "Inter",
                            fontStyle: "normal",
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: "30px",
                            color: "#4A4646"
                        }} overflow={'hidden'} textOverflow={'ellipsis'}><p style={{
                            display: "inline",
                            fontFamily: "Inter",
                            fontStyle: "normal",
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: "25px",
                            textTransform: "uppercase",
                            color: "#5F52FA",
                        }}>{item.filter(x => x.id === 'org_subject')[0].label as string}&nbsp;&nbsp;&nbsp;&nbsp;</p>{item.filter(x => x.id === 'org_subject')[0].value[0] as string}
                        </Typography>

                        <Typography className={classes.competence}><p style={{
                            display: "inline",
                            fontFamily: "Inter",
                            fontStyle: "normal",
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: "25px",
                            textTransform: "uppercase",
                            color: "#5F52FA",
                        }}>{item.filter(x => x.id === 'org_competence_ai')[0].label as string}&nbsp;&nbsp;&nbsp;&nbsp;</p>{(item.filter(x => x.id === 'org_competence_ai')[0].value[0] as DictionaryItemProps).name as string}
                        </Typography>

                        <Typography className={'max-lines-1'} style={{
                            fontFamily: "Inter",
                            fontStyle: "normal",
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: "30px",
                            color: "#4A4646"
                        }} overflow={'hidden'} textOverflow={'ellipsis'}><p style={{
                            display: "inline",
                            fontFamily: "Inter",
                            fontStyle: "normal",
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: "25px",
                            textTransform: "uppercase",
                            color: "#5F52FA",
                        }}>{item.filter(x => x.id === 'org_method_ai')[0].label as string}&nbsp;&nbsp;&nbsp;&nbsp;</p>{(item.filter(x => x.id === 'org_method_ai')[0].value[0] as DictionaryItemProps).name as string}
                        </Typography>
                        <Typography className={'max-lines-1'} style={{
                            fontFamily: "Inter",
                            fontStyle: "normal",
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: "30px",
                            color: "#4A4646"
                        }} overflow={'hidden'} textOverflow={'ellipsis'}><p style={{
                            display: "inline",
                            fontFamily: "Inter",
                            fontStyle: "normal",
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: "25px",
                            textTransform: "uppercase",
                            color: "#5F52FA",
                        }}>{item.filter(x => x.id === 'org_tools_ai')[0].label as string}&nbsp;&nbsp;&nbsp;&nbsp;</p>{(item.filter(x => x.id === 'org_tools_ai')[0].value[0] as DictionaryItemProps).name as string}
                        </Typography>
                        <Container style={{marginLeft: "78%", marginTop: "24%"}}>
                            <Link to={`${routers.researchCenter}/${item.filter(x => x.id === 'nid')[0].value}`}
                                  onClick={scrollTopPage}>
                                <PinkButton title={'ПОДРОБНЕЕ'}></PinkButton>
                            </Link>
                        </Container>

                    </div>
                </div>
            </Container>
        </Card>
    );
};

export default ResearchCenterCard;
