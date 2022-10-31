import { FC } from 'react'
import { Button, ButtonProps } from '@mui/material'

const MoreButton: FC<ButtonProps> = ({ onClick }) => (
  <Button
    variant={'contained'}
    color={'secondary'}
    onClick={onClick}>
      Подробнее
  </Button>
)

export default MoreButton