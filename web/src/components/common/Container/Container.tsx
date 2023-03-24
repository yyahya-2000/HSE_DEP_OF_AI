import { FC } from "react";
import { Box } from "@mui/material";
import useContainerStyle from "./Container.styles";
import { ChildrenProps } from "types";

const Container: FC<ChildrenProps> = ({ children }) => {
  const { classes } = useContainerStyle();
  return <Box className={classes.root}>{children}</Box>;
};

export default Container;