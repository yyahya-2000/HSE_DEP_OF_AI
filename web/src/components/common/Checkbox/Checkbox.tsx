import { FC } from 'react'
import { Checkbox } from '@mui/material'
import { FormControlLabel } from './Checkbox.styles'
import { CustomCheckboxProps } from './Checkbox.types'

const CustomCheckbox: FC<CustomCheckboxProps> = ({ value, onChange, label }) => (
  <FormControlLabel
    control={
      <Checkbox 
        color={'primary'} 
        value={value} 
        onChange={onChange} 
      />
    } 
    label={label} 
    labelPlacement={'end'}
  />
) 

export default CustomCheckbox
