import { FC } from 'react'
import { Button } from '@mui/material'
import { PinkButtonProps } from './PinkButton.types'
import { Down, Up } from './PinkButton.styles'

const PinkButton: FC<PinkButtonProps> = ({ onClick, variant, title = 'Подробнее', endIcon = false, open }) => {
  
  const icon = () => {
    if (!endIcon) return null
    return open ? <Up /> : <Down /> 
  }

  return (
    <Button
      variant={variant}
      color={'secondary'}
      onClick={onClick}
      endIcon={icon()}
    >
      {title}
    </Button>
  )
}

export default PinkButton