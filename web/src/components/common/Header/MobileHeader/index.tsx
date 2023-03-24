import { FC, useState } from "react";
import { ExpandMore, Menu, Search } from "@mui/icons-material";
import {
  IconButton,
  Box,
  Collapse,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { navigation } from "enums/navigation";
import { useNavigate, useLocation } from "react-router-dom";
// import { searchService } from "services/search/search.service";
import { useLanguage } from "context/Translation";
import { routers } from "routers";
import { useHeaderStyles } from "components/common/Header/Header.styles";
import { HeaderProps } from "../Header.types";
import useContainerStyle from "components/common/Container/Container.styles";
import LanguageButton from "components/common/Buttons/LanguageButton";
import { HeaderLink } from "components/common/Link";
import Line from "components/common/Line";

const MobileHeader: FC<HeaderProps> = () => {
  const { classes } = useHeaderStyles();
  const containerStyle = useContainerStyle().classes
  // const { language } = useLanguage();
  const [searchValue, setSearchValue] = useState("");
  const [expanded, setExpanded] = useState<number | boolean>(0);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const handleChangeSearch = ({ target: { value } }) => {
    setSearchValue(value);
  };
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (searchValue.length) {
      navigate(`${routers.searchByKey}?key=${searchValue}`);
      // searchService.fetchSearchInfo(language, searchValue);
    }
  };

  const handleChange = (panel: number) => (_, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleKeyPress = (event) => {
    const isPressEnter = event.keyCode === 13 || event.key === "Enter";
    if (isPressEnter && searchValue.length) {
      handleClick();
    }
  };

  const handleChangeOpenMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const withText = useMediaQuery("(min-width:480px)");

  return (
    <header className={`${classes.root} ${containerStyle.root}`}>
      <Box display="flex">
        <input
          className={classes.mobileInput}
          value={searchValue}
          onChange={handleChangeSearch}
          onKeyPress={handleKeyPress}
        />
        <IconButton size="small" className={classes.icon} onClick={handleClick}>
          <Search htmlColor="#fff" />
        </IconButton>
      </Box>
      <Box
        display="flex"
        justifyContent={"space-between"}
        mt={"10px"}
        id="mobile-menu"
      >
        {/* <Logo withText={withText} /> */}
        <IconButton
          size="small"
          className={classes.icon}
          onClick={handleChangeOpenMenu}
        >
          <Menu htmlColor="#fff" />
        </IconButton>
      </Box>
      <Box className={classes.mobileMenuTootip}>
        <Collapse in={isOpenMenu} style={{ minWidth: 320 }}>
          <Box width={"100%"} style={{ background: "white" }} padding={"5px"}>
            <LanguageButton />
            <Line />
            {navigation.map(({ title, link, isLink, childrenLinks }, index) =>
              childrenLinks ? (
                <Box key={link}>
                  <Accordion
                    expanded={expanded === index}
                    onChange={handleChange(index)}
                    style={{ boxShadow: "none" }}
                  >
                    <AccordionSummary
                      aria-controls="panel1d-content"
                      id="panel1d-header"
                      expandIcon={<ExpandMore fontSize={"large"} />}
                      style={{ display: "flex" }}
                    >
                      <HeaderLink
                        title={title}
                        link={link}
                        isLink={isLink}
                        isActive={location.pathname.includes(link)}
                        onClick={() => setIsOpenMenu(false)}
                      />
                    </AccordionSummary>
                    <AccordionDetails style={{ display: "block" }}>
                      {childrenLinks.map(({ title, link }) => (
                        <Box key={link} padding={"10px"} display={"flex"}>
                          <HeaderLink
                            title={title}
                            link={link}
                            isActive={location.pathname.includes(link)}
                            onClick={() => setIsOpenMenu(false)}
                          />
                        </Box>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                </Box>
              ) : (
                <Box key={link} display={"flex"} padding={"10px"}>
                  <HeaderLink
                    title={title}
                    link={link}
                    isLink={isLink}
                    isActive={location.pathname.includes(link)}
                    onClick={() => setIsOpenMenu(false)}
                  />
                </Box>
              )
            )}
          </Box>
        </Collapse>
      </Box>
    </header>
  );
};

export default MobileHeader;
