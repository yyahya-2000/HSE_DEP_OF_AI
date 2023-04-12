import {FC} from "react";
import {Link} from "react-router-dom";
import {scrollTopPage} from "utils";
import {routers} from "routers";
import useOrganizationCardStyle from "./OrganizationCard.styles";
import {Card, Container, Typography} from "@mui/material";
import {EntityItemProps, DictionaryItemProps, LinkProps} from "types";
import {PinkButton} from "../../Buttons";
import {observer} from "mobx-react-lite";

const OrganizationCard: FC<EntityItemProps> = ({item}) => {
    const {classes} = useOrganizationCardStyle();

    return (

        <Card>
            <Container>

                <Typography
                    className={classes.title}>{item.filter(x => x.id === 'title')[0].value[0] as string}</Typography>

                <Typography className={'max-lines-2'} style={{
                    width: "650px",
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
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "25px",
                            textAlign: "justify",
                            color: "#4A4646",
                            wordWrap: "break-word",
                        }} overflow={'hidden'} textOverflow={'ellipsis'}><Typography style={{
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "25px",
                            color: "#5F52FA",
                            textTransform: "uppercase",
                        }}>{item.filter(x => x.id === 'org_okved')[0].label as string}</Typography>{item.filter(x => x.id === 'org_okved')[0].value[0] as string}
                        </Typography>

                        <hr className={classes.line}/>

                        <Typography className={'max-lines-3'} style={{
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "25px",
                            textAlign: "justify",
                            color: "#4A4646",
                        }} overflow={'hidden'}
                                    textOverflow={'ellipsis'}>{item.filter(x => x.id === 'org_desc')[0].value[0] as string}</Typography>


                        <hr className={classes.line}/>

                        <Typography className={'max-lines-2'} style={{
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "25px",
                            color: "#4A4646",
                            wordWrap: "break-word",
                        }} overflow={'hidden'} textOverflow={'ellipsis'}><Typography style={{

                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "25px",
                            color: "#4A4646",
                        }}>{item.filter(x => x.id === 'org_head')[0].label as string}: </Typography>{item.filter(x => x.id === 'org_head')[0].value[0] as string}
                        </Typography>

                        <Typography
                            className={classes.website}>{(item.filter(x => x.id === 'org_website')[0].value[0] as LinkProps).url as string}</Typography>

                        <Typography className={'max-lines-1'} style={{
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: "25px",
                            color: "#4A4646",
                            wordWrap: "break-word",
                        }} overflow={'hidden'}
                                    textOverflow={'ellipsis'}> {item.filter(x => x.id === 'mail_address')[0].value[0] as string}</Typography>
                    </div>
                    <div className={classes.textcolsRight}>
                        <Typography className={classes.status}><Typography style={{
                            display: "inline",
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: "25px",
                            textTransform: "uppercase",
                            color: "#5F52FA",
                        }}>{item.filter(x => x.id === 'org_status')[0].label as string}&nbsp;&nbsp;&nbsp;&nbsp;</Typography>{(item.filter(x => x.id === 'org_status')[0].value[0] as DictionaryItemProps).name as string}
                        </Typography>

                        <Typography className={'max-lines-1'} style={{
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: "30px",
                            color: "#4A4646"
                        }} overflow={'hidden'} textOverflow={'ellipsis'}><Typography style={{
                            display: "inline",
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: "25px",
                            textTransform: "uppercase",
                            color: "#5F52FA",
                        }}>{item.filter(x => x.id === 'org_subject')[0].label as string}&nbsp;&nbsp;&nbsp;&nbsp;</Typography>{item.filter(x => x.id === 'org_subject')[0].value[0] as string}
                        </Typography>

                        <Typography className={classes.competence}><Typography style={{
                            display: "inline",
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: "25px",
                            textTransform: "uppercase",
                            color: "#5F52FA",
                        }}>{item.filter(x => x.id === 'org_competence_ai')[0].label as string}&nbsp;&nbsp;&nbsp;&nbsp;</Typography>{(item.filter(x => x.id === 'org_competence_ai')[0].value[0] as DictionaryItemProps).name as string}
                        </Typography>

                        <Typography className={'max-lines-1'} style={{
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: "30px",
                            color: "#4A4646"
                        }} overflow={'hidden'} textOverflow={'ellipsis'}><Typography style={{
                            display: "inline",
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: "25px",
                            textTransform: "uppercase",
                            color: "#5F52FA",
                        }}>{item.filter(x => x.id === 'org_method_ai')[0].label as string}&nbsp;&nbsp;&nbsp;&nbsp;</Typography>{(item.filter(x => x.id === 'org_method_ai')[0].value[0] as DictionaryItemProps).name as string}
                        </Typography>
                        <Typography className={'max-lines-1'} style={{
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: "30px",
                            color: "#4A4646"
                        }} overflow={'hidden'} textOverflow={'ellipsis'}><Typography style={{
                            display: "inline",
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: "25px",
                            textTransform: "uppercase",
                            color: "#5F52FA",
                        }}>{item.filter(x => x.id === 'org_tools_ai')[0].label as string}&nbsp;&nbsp;&nbsp;&nbsp;</Typography>{(item.filter(x => x.id === 'org_tools_ai')[0].value[0] as DictionaryItemProps).name as string}
                        </Typography>
                        <Container style={{marginLeft: "60%", marginTop: "24%"}}>
                            <Link to={`${routers.organizations}/${item.filter(x => x.id === 'nid')[0].value}`}
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

export default observer(OrganizationCard);
