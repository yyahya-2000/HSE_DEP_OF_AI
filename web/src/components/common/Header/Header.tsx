import { FC, useEffect, useRef, useState } from "react";
import { HeaderLink } from "components/common/Link";
import LanguageButton from "components/common/Buttons/LanguageButton";
import { navigation } from "enums/navigation";
import { Home, Search } from "@mui/icons-material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  IconButton,
  Grid,
  Collapse,
  Fade,
  Popper,
  TextField,
  useTheme,
} from "@mui/material";
import { scrollTopPage } from "utils";
import { useMenuState } from "context/MenuState";
import { routers } from "routers";
import useContainerStyle from "../Container/Container.styles";
import { HeaderProps } from "./Header.types";
import { useHeaderStyles } from "./Header.styles";
import { AnchorElType } from "types";

const DefaultHeader: FC<HeaderProps> = ({ withText = false }) => {
  const theme = useTheme();
  const { classes } = useHeaderStyles();
  const containerStyle = useContainerStyle().classes
  const { isOpen, setOpenMenu } = useMenuState();
  const [searchValue, setSearchValue] = useState("");
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const anchorEl = useRef<AnchorElType>(null);
  const [isDown, setIsDown] = useState(true);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const handleChangeSearch = ({ target: { value } }) => {
    setSearchValue(value);
  };

  useEffect(() => {
    anchorEl.current = null;
    setOpenMenu(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleClick = () => {
    if (isOpenSearch) {
      if (searchValue.length) {
        navigate(`${routers.searchByKey}?key=${searchValue}`);
      }
    }
    setIsOpenSearch(!isOpenSearch);
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

  const handleClickOnLink = () => {
    anchorEl.current = null;
    setOpenMenu(false);
  };

  const Navigation = navigation.map(
    ({ title, link, childrenLinks, isLink }, index) => (
      <Grid item key={link} style={{ padding: '1rem 1rem', paddingBottom: '1px' }}>
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
    )
  );

  const activeMenu = navigation[index]?.childrenLinks;

  const handleMouseOver = () => {
    if (!isDown) {
      setIsDown(true);
      setOpenMenu(false);
    }
  };

  const handleKeyPress = (event) => {
    const isPressEnter = event.keyCode === 13 || event.key === "Enter";
    if (isPressEnter && searchValue.length) {
      handleClick();
    }
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  const gridColumns = () => {
    if (!activeMenu || activeMenu?.length <= 4) {
      return "1fr";
    }
    return `repeat(${activeMenu?.length / 4}, 350px)`;
  };
  return (
    <header className={`${classes.root} ${containerStyle.root}`}>
      <Grid container justifyContent="space-between" marginBottom={'2%'}>
        <Grid
          id="site-menu"
          item
          container
          alignItems="flex-end"
          justifyContent="flex-start"
          spacing={5}
          margin={0}
          width={'auto'}
          borderBottom={theme.palette.text.primary + " 1px solid"}
          paddingLeft={5}
          >
          {Navigation}
          {activeMenu ? (
            <Popper
              anchorEl={anchorEl.current}
              open={true}
              className={classes.hoverMenu}
              placement={"bottom"}
            >
              <Fade in={isOpen} timeout={350}>
                <div
                  className={classes.menuGrid}
                  style={{ gridTemplateColumns: gridColumns() }}
                >
                  {activeMenu?.map(({ title, link }) => (
                    <HeaderLink
                      key={link}
                      title={title}
                      link={link}
                      onClick={handleCloseMenu}
                    />
                  ))}
                </div>
              </Fade>
            </Popper>
          ) : null}
        </Grid>
        <Grid
          item
          container
          alignItems="flex-end"
          width={'auto'}
          spacing={2}
          onMouseOver={handleMouseOver}
        >
          <Grid item className={classes.searchContainer} alignItems="center">
            <Collapse timeout={300} in={isOpenSearch}>
              <TextField
                classes={{ root: classes.search }}
                size="small"
                variant="outlined"
                value={searchValue}
                onChange={handleChangeSearch}
                onKeyPress={handleKeyPress}
              />
            </Collapse>
            <IconButton
              size="small"
              className={classes.icon}
              onClick={handleClick}
            >
              <Search />
            </IconButton>
          </Grid>
          <Grid item>
            <LanguageButton />
          </Grid>
        </Grid>
      </Grid>
    </header>
  );
};

export default DefaultHeader;
