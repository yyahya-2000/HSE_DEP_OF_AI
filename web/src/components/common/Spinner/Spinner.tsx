import { FC } from "react";
import { SpinnerProps } from "./Spinner.types"
import { SpinnerWrapper } from './Spinner.styles'
import { RingLoader } from 'react-spinners'
import { globalBaseStyles } from 'styles';

const Spinner: FC<SpinnerProps> = ({ hasFone = false }) => (
  <SpinnerWrapper hasFone={hasFone}>
    <RingLoader color={globalBaseStyles.palette.primary.main} size={100} />
  </SpinnerWrapper>
)

export default Spinner
