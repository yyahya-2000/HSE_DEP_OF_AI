import { FC } from 'react'
import { IconButton as MUIIconButton, IconButtonProps } from '@mui/material'

const IconButton: FC<IconButtonProps> = ({
  children,
  onClick,
  size = 'small',
  disabled
}) => (
    <MUIIconButton
      onClick={onClick}
      size={size}
      disabled={disabled}
    >
      {children}
    </MUIIconButton>
)

export default IconButton
