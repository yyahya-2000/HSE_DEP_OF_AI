import {FC} from "react";
import {Link} from "react-router-dom";
import {scrollTopPage} from "utils";
import {routers} from "routers";
import useOrganizationCardStyle from "./OrganizationCard.styles";
import {Card, Container, Grid, Typography} from "@mui/material";
import {EntityItemProps, DictionaryItemProps, LinkProps} from "types";
import {PinkButton} from "../../Buttons";
import {observer} from "mobx-react-lite";

const OrganizationCard: FC<EntityItemProps> = ({item}) => {
    const {classes} = useOrganizationCardStyle();
    const fieldsTitles = item.map((field) => {
        if((field.label === 'Название организации' || field.label === 'Общепринятое название организации') && field.label.length !== 0){
            return(
                <Grid item width={'100%'} style={{overflow: "hidden"}}>
                    <Typography className={classes.title + ' ' + 'max-lines-1'} textOverflow={'ellipsis'}>{field.value.map(value => value)}</Typography>
                </Grid>
                )

        }
    })
    const fieldsWithEntityReference = item.map((field) => {
        if (field.type === 'entity_reference' && field.label.length !== 0) {

            return (
                <Grid item width={'100%'}>
                    <Typography className={classes.labelEntity}>{field.label + ': '}</Typography>
                    <Typography className={classes.value + ' ' + 'max-lines-1'}
                                paragraph={false}>{field.value.map(value => value.name).join(', ')}</Typography>
                </Grid>
            )


        }
    })

    const fieldsNoEntityReference = item.map((field) => {

        if (field.type === 'string' && field.label !== 'Название организации' && field.label !== 'Общепринятое название организации' && field.label.length !== 0) {
            if (field.label === 'Основной вид деятельности' || field.label === 'ФИО руководителя организации' ) {
                return (
                    <Grid item width={'100%'} style={{overflow: "hidden"}}>
                        <Typography className={classes.line}/>
                        <Typography className={classes.label}>{field.label}</Typography>
                        <Typography className={classes.value} textOverflow={'ellipsis'}>{field.value.map(value => value)}</Typography>
                    </Grid>
                )
            } else {
                return (
                    <Grid item width={'100%'}>
                        <Typography className={classes.title}>{field.value.map(value => value)}</Typography>
                    </Grid>
                )
            }

        }
        if (field.type === 'text_long' && field.label.length !== 0) {
            if (field.label === 'Описание') {
                return (
                    <Grid item width={'100%'}>
                        <Typography className={classes.line}/>
                        <Typography
                            className={classes.desc + ' ' + 'max-lines-3'}>{field.value.map(value => value)}</Typography>
                    </Grid>
                )
            } else {
                return (
                    <Grid item width={'100%'}>
                        <Typography
                            className={classes.desc + ' ' + 'max-lines-3'}>{field.value.map(value => value)}</Typography>
                    </Grid>
                )
            }

        }
        if (field.type === 'link' && field.label.length !== 0) {
            return (
                <Grid item width={'100%'}>
                    <Typography className={classes.value + ' ' + 'max-lines-1'}
                                paragraph={false}>{field.value.map(value => value.url)}</Typography>
                </Grid>
            )
        }
        if (field.type === 'email' && field.label.length !== 0) {
            return (
                <Grid item width={'100%'}>
                    <Typography className={classes.value + ' ' + 'max-lines-1'}
                                paragraph={false}>{field.value.map(value => value).join(', ')}</Typography>
                </Grid>
            )
        }
    })

    return (
        <Card>
            <Grid container>
                {fieldsTitles}
                <Grid item width={'50%'}>
                    {fieldsNoEntityReference}
                </Grid>
                <Grid item width={'50%'}>
                    {fieldsWithEntityReference}
                </Grid>
                <Grid item width={'20%'}></Grid>
                <Grid item width={'20%'}></Grid>
                <Grid item width={'20%'}></Grid>
                <Grid item width={'20%'}></Grid>
                <Grid item width={'20%'}>
                    <Link to={`${routers.organizations}/${item.filter(x => x.id === 'nid')[0].value}`}
                          onClick={scrollTopPage}>
                        <PinkButton title={'ПОДРОБНЕЕ'}></PinkButton>
                    </Link>
                </Grid>
            </Grid>
        </Card>


    );
};

export default observer(OrganizationCard);
