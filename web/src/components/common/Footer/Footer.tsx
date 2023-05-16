import {FC, useRef, useState} from "react";
import {Fade, Grid, Popper, useTheme} from "@mui/material";
import { useFooterStyles } from "./Footer.styles";
import {footers, navigation} from "../../../enums/navigation";
import {HeaderLink} from "../Link";
import {AnchorElType} from "../../../types";
import {useMenuState} from "../../../context/MenuState";
import {useLocation} from "react-router-dom";
const Footer: FC = () => {
    const { classes } = useFooterStyles()
    const anchorEl = useRef<AnchorElType>(null);
    const theme = useTheme();
    const { isOpen, setOpenMenu } = useMenuState();
    const [index, setIndex] = useState(0);
    const [isDown, setIsDown] = useState(true);
    const location = useLocation();
    const handleClickOnLink = () => {
        anchorEl.current = null;
        setOpenMenu(false);
    };
    const handleHoverMenuItem = (event, index) => {
        setIndex(index);
        if (!event || typeof event === undefined) {
            anchorEl.current = null;
            setOpenMenu(false);
            return;
        }
        anchorEl.current = event?.currentTarget;
        setOpenMenu(true);
        setIsDown(false);
    };
    const Navigation = footers.map(
        ({title, link, childrenLinks, isLink}, index) => (
            <Grid item key={link} width={'20%'} style={{textAlign: "center"}}>
                <HeaderLink
                    title={title}
                    link={link}
                    isLink={isLink}
                    onHover={(event) =>
                        handleHoverMenuItem(childrenLinks ? event : null, index)
                    }
                    isActive={(link != '/' && location.pathname.includes(link)) || (link == '/' && location.pathname == link) }
                    onClick={handleClickOnLink}
                />
            </Grid>
        ))

    return (
        <Grid container className={classes.root}>
            <Grid item width={'100%'} className={classes.right}></Grid>
            <Grid item width={'100%'} className={classes.left}></Grid>
            <Grid item width={'100%'}>Try to make tab</Grid>
            <Grid item width={'100%'}>Try to make tab</Grid>
            <Grid item width={'100%'}>Try to make tab</Grid>
            <Grid item width={'100%'}>Try to make tab</Grid>
            <Grid item width={'100%'}>Try to make tab</Grid>
            <Grid item width={'100%'}>
                <Grid container>
                    {Navigation}
                </Grid>
            </Grid>

        </Grid>
    );
};

export default Footer;