import { FC } from "react";
import { SpinnerProps } from "./Spinner.types"
import { SpinnerWrapper } from './Spinner.styles'
import { RingLoader } from 'react-spinners'
import { globalBaseStyles } from 'styles';
import { Box } from "@mui/material";

const Spinner: FC<SpinnerProps> = ({ hasFone = false }) => (
  <Box
    display={"flex"}
    alignItems={"center"}
    justifyContent={"center"}
    height={"100vh"}
    style={{ background: hasFone ? "white" : "none" }}
  >
    <SpinnerWrapper hasFone={hasFone}>
      <RingLoader color={globalBaseStyles.palette.primary.main} size={100} />
    </SpinnerWrapper>
  </Box>
)

export default Spinner
