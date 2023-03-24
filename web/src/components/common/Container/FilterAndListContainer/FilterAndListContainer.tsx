import { FC } from "react";
import { Box, Grid } from "@mui/material";
import { FilterAndListContainerProps } from "./FilterAndListContainer.types";
import useFilterAndListContainerStyle from "./FilterAndListContainer.styles";
import Container from "../Container";

const FilterAndListContainer: FC<FilterAndListContainerProps> = ({ filter, list }) => {
    const { classes } = useFilterAndListContainerStyle();
    return (
        <Container>
            <Grid container>
                <Grid item width={'20%'} className={classes.root}>{filter}</Grid>
                <Grid item width={'80%'} className={classes.root}>{list}</Grid>
            </Grid>
        </Container>
    );
};

export default FilterAndListContainer;