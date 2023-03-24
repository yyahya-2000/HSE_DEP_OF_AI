import { FC } from "react";
import { Grid } from "@mui/material";
import { useFooterStyles } from "./Footer.styles";

const Footer: FC = () => {
    const { classes } = useFooterStyles()
    return (
        <Grid className={classes.root}>
            <Grid className={classes.right}></Grid>
            <Grid className={classes.left}></Grid>
        </Grid>
    );
};

export default Footer;