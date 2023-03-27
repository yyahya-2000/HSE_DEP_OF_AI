import { FC } from "react";
import { Link } from "react-router-dom";
import { scrollTopPage } from "utils";
import { routers } from "routers";
import useOrganizationCardStyle from "./OrganizationCard.styles";
import { Card, Grid } from "@mui/material";
import { EntityItemProps, DictionaryItemProps } from "types";
import {OrganizationCardProps} from "./OrganizationCard.types";

const OrganizationCard: FC<EntityItemProps> = ({ item }, props: OrganizationCardProps) => {
    const { classes } = useOrganizationCardStyle();

    const fields = item.map((field) => {
        let val = ''
        for (let index in field.value) {
            if (field.type !== 'entity_reference') {
                switch (field.id) {
                    case "nid":
                        props.nid = Number(field.value[index])
                        break
                    case "common_org_name":
                        props.common_org_name = field.value[index].toString()
                        break
                    case "mail_address":
                        props.mail_address = field.value[index].toString()
                        break
                    case "org_date":
                        props.org_date = field.value[index].toString()
                        break
                    case "org_desc":
                        props.org_desc = field.value[index].toString()
                        break
                    case "org_email":
                        props.org_email = field.value[index].toString()
                        break
                    case "org_form":
                        props.org_form = field.value[index].toString()
                        break
                    case "org_head":
                        props.org_head = field.value[index].toString()
                        break
                    case "org_head_cont":
                        props.org_head_cont = field.value[index].toString()
                        break
                    case "org_inn":
                        props.org_inn = BigInt(Number(field.value[index]))
                        break
                    case "org_location":
                        props.org_location = field.value[index].toString()


                }
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
        <Link to={`${routers.organizations}/${item.filter(x => x.id == 'nid')[0].value}`} onClick={scrollTopPage}>
            <Card >
                {fields}
            </Card>
        </Link>
    );
};

export default OrganizationCard;
