import { FC } from "react";
import { Link } from "react-router-dom";
import { scrollTopPage } from "utils";
import { routers } from "routers";
import { Card, Grid } from "@mui/material";
import { EntityItemProps, DictionaryItemProps } from "types";
import useProjectCardStyle from "./ProjectCard.styles";

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
        <Link to={`${routers.projects}/${item.filter(x => x.id == 'nid')[0].value}`} onClick={scrollTopPage}>
            <Card >
                {fields}
            </Card>
        </Link>
    );
};

export default ProjectCard;
