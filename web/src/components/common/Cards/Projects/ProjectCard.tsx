import { FC } from "react";
import { Link } from "react-router-dom";
import { scrollTopPage } from "utils";
import { routers } from "routers";
import {Card, Container, Grid, Typography} from "@mui/material";
import { EntityItemProps, DictionaryItemProps } from "types";
import useProjectCardStyle from "./ProjectCard.styles";
import {PinkButton} from "../../Buttons";

const ProjectCard: FC<EntityItemProps> = ({ item }) => {
    const { classes } = useProjectCardStyle();

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
        <Link to={`${routers.projects}/${item.filter(x => x.id === 'nid')[0].value}`} onClick={scrollTopPage}>
            <Card>
                <Container>
                    <Typography
                        className={classes.title}>{item.filter(x => x.id === 'title')[0].value[0] as string}</Typography>

                    {item.filter(x => x.id === 'project_application_area')[0].value.length === 0 ?
                        <Typography style={{
                            fontFamily: "Inter",
                            fontStyle: "normal",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "25px",
                            textAlign: "justify",
                            color: "#4A4646",}}><p style={{
                            display: "inline",
                            fontFamily: "Inter",
                            fontStyle: "normal",
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: "25px",
                            textTransform: "uppercase",
                            color: "#5F52FA",
                        }}>{item.filter(x => x.id === 'project_application_area')[0].label as string}&nbsp;&nbsp;&nbsp;&nbsp;</p>{" "}
                        </Typography> :
                        <Typography style={{
                            fontFamily: "Inter",
                            fontStyle: "normal",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "25px",
                            textAlign: "justify",
                            color: "#4A4646",}}><p style={{
                            display: "inline",
                            fontFamily: "Inter",
                            fontStyle: "normal",
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: "25px",
                            textTransform: "uppercase",
                            color: "#5F52FA",
                        }}>{item.filter(x => x.id === 'project_application_area')[0].label as string}&nbsp;&nbsp;&nbsp;&nbsp;</p> {(item.filter(x => x.id === 'project_application_area')[0].value[0] as DictionaryItemProps).name}
                        </Typography>}

                    <hr className={classes.line}/>

                    {item.filter(x => x.id === 'project_desc')[0].value.length === 0 ?
                        <Typography>{" "}</Typography> :
                        <Typography
                            className={'max-lines-3'} style={{
                            fontFamily: "Inter",
                            fontStyle: "normal",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "25px",
                            textAlign: "justify",
                            color: "#4A4646",
                        }}>{(item.filter(x => x.id === 'project_desc')[0].value[0] as string)}
                        </Typography>}

                    <hr className={classes.line}/>

                    {item.filter(x => x.id === 'project_supervisor')[0].value.length === 0 ?
                        <Typography style={{
                            fontFamily: "Inter",
                            fontStyle: "normal",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "25px",
                            textAlign: "justify",
                            color: "#4A4646",}}><p style={{
                            display: "inline",
                            fontFamily: "Inter",
                            fontStyle: "normal",
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: "25px",
                            textTransform: "uppercase",
                            color: "#5F52FA",
                        }}>{item.filter(x => x.id === 'project_supervisor')[0].label as string}&nbsp;&nbsp;&nbsp;&nbsp;</p>{" "}
                        </Typography> :
                        <Typography style={{
                            fontFamily: "Inter",
                            fontStyle: "normal",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "25px",
                            textAlign: "justify",
                            color: "#4A4646",}}><p style={{
                            display: "inline",
                            fontFamily: "Inter",
                            fontStyle: "normal",
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: "25px",
                            textTransform: "uppercase",
                            color: "#5F52FA",
                        }}>{item.filter(x => x.id === 'project_supervisor')[0].label as string}&nbsp;&nbsp;&nbsp;&nbsp;</p> {(item.filter(x => x.id === 'project_supervisor')[0].value[0] as DictionaryItemProps).name}
                        </Typography>}

                    <Container style={{marginLeft: "85%"}}>
                        <Link to={`${routers.projects}/${item.filter(x => x.id === 'nid')[0].value}`}
                              onClick={scrollTopPage}>
                            <PinkButton title={'ПОДРОБНЕЕ'}></PinkButton>
                        </Link>
                    </Container>
                </Container>
            </Card>
            {/*<Card >*/}
            {/*    {fields}*/}
            {/*</Card>*/}
        </Link>
    );
};

export default ProjectCard;
