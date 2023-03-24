import { Language } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useLanguage } from "context/Translation";
import { FC } from "react";
import { useLanguageButtonStyles } from "./LanguageButton.styles";

const LanguageButton: FC = () => {
  const { changeLanguage, isRus } = useLanguage();
  const { classes } = useLanguageButtonStyles({ isRus });
  const language = isRus ? "En" : "Ru";

  const handleClick = () => {
    changeLanguage(isRus ? "en" : "ru");
  };

  return (
    <Button
      className={classes.language}
      startIcon={<Language />}
      onClick={handleClick}
    >
      {language}
    </Button>
  );
};

export default LanguageButton;
