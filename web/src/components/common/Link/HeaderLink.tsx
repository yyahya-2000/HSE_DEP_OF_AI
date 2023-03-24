import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { LinkProps } from "./Link.types";
import { useLanguage } from "context/Translation";
import { scrollTopPage } from "utils";

const HeaderLink: FC<LinkProps> = ({
  link,
  title,
  isTranslation = true,
  color = "#4D4D4D",
  onHover,
  isActive = false,
  onClick,
}) => {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const titles = isTranslation ? t(title) : title;
  const classes = isActive ? "active-link" : "link-hover-center";

  const handleClick = () => {
    onClick && onClick();
    scrollTopPage();
  };
  return (
    <div className={`${classes} ${language === "en" ? "" : "link-hover-center-ru"}`}>
      <Link
        to={link}
        onClick={handleClick}
        style={{ color }}
        onMouseOver={onHover}
      >
        {titles[0].toUpperCase() + title.slice(1)}
      </Link>
    </div>
  );
};

export default HeaderLink;
