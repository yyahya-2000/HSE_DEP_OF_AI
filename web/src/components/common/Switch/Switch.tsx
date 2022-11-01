import { Switch, SwitchProps } from '@mui/material';
import { FC } from "react";

const CustomSwitch: FC<SwitchProps> = ({ value, onChange }) => (
  <Switch color={'primary'} value={value} onChange={onChange} />
) 

export default CustomSwitch
