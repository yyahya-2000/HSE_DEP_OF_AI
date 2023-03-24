import { FC } from "react";
import { HeaderProps } from "./Header.types";
import MobileHeader from "./MobileHeader";
import DefaultHeader from "./Header";
import { useMediaQuery } from "@mui/material";

const Header: FC<HeaderProps> = ({ withText = false }) => {
  const isMobile = useMediaQuery("(max-width:1024px)");

  return isMobile ? (
    <MobileHeader withText={false} />
  ) : (
    <DefaultHeader withText={withText} />
  );
};

export default Header;