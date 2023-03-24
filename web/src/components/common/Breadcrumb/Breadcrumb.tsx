import { Box, Breadcrumbs, useMediaQuery } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { getUrlAdress, scrollTopPage } from "utils";
import { useBreadcrumbStyles } from "./Breadcrumb.style";
import { BreadcrumbProps } from "./Breadcrumb.types";
import { NavigateNext } from "@mui/icons-material";
import { useMenuState } from "context/MenuState";
import { Container } from "../Container";

const Breadcrumb: FC<BreadcrumbProps> = ({ title, castomLink = "" }) => {
    const location = useLocation();
    const urls = getUrlAdress(location.pathname);
    const { setOpenMenu } = useMenuState();
    const { t } = useTranslation();
    let titles = title ? title : t(urls[urls.length - 1].name);
    const { classes } = useBreadcrumbStyles();
    const isMobile = useMediaQuery("(max-width:767px)");

    const Finish = castomLink.length ? (
        <Link
            color="inherit"
            to={`${castomLink}`}
            className={classes.link}
            onClick={scrollTopPage}
        >
            {t(titles[0].toUpperCase() + titles.slice(1))}
        </Link>
    ) : (
        <Box className={classes.link}>{t(titles[0].toUpperCase() + titles.slice(1))}</Box>
    );

    return (
        <Container>
            <Breadcrumbs
                id="breadcrumbs"
                className={classes.container}
                separator={<NavigateNext fontSize="small" className={classes.navigate} />}
                onMouseOver={() => setOpenMenu(false)}
            >
                <Link
                    color="inherit"
                    to="/"
                    className={classes.link}
                    onClick={scrollTopPage}
                >
                    {t("Home")}
                </Link>
                {urls.map(({ name, link }, index) => {
                    name = name[0].toUpperCase() + name.slice(1)
                    if (isMobile && index > 1) return null;
                    if (
                        location.pathname.indexOf("analytics") !== -1 &&
                        location.search.length
                    ) {
                        return (
                            <Link
                                key={name}
                                color="inherit"
                                to={`${link}`}
                                className={classes.link}
                                onClick={scrollTopPage}
                            >
                                {t(name)}
                            </Link>
                        );
                    }
                    if (index === urls.length - 1) return null;
                    return (
                        <Link
                            key={name}
                            color="inherit"
                            to={`${link}`}
                            className={classes.link}
                            onClick={scrollTopPage}
                        >
                            {t(name)}
                        </Link>
                    );
                })}
                {isMobile ? null : Finish}
            </Breadcrumbs>
        </Container>
    );
};

export default Breadcrumb;
