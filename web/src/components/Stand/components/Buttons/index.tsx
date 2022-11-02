import { FC, useState } from 'react'
import { PinkButton } from 'components'
import { Container } from '../Container'

const Buttons: FC = () => {
const [open, setOpen] = useState(false)

  const handleMoreClick = () => { console.log('Подробнее') }

  const handleMoreClickWhithState = () => {
    console.log('Подробнее ', !open ? 'Открыть' : 'Закрыть') 
    setOpen(!open)
  }

  const handleFindClick = () => { console.log('Найти') }

  const handleAllFiltersClick = () => { console.log('Все фильтры') }

  return (
    <Container title="Кнопки">
      <PinkButton onClick={handleMoreClick} />
      <PinkButton onClick={handleMoreClickWhithState} endIcon open={open} />
      <PinkButton onClick={handleMoreClick} variant={'contained'} />
      <PinkButton onClick={handleFindClick} variant={'contained'} title="Найти" />
      <PinkButton onClick={handleAllFiltersClick} title="Все фильтры" />
    </Container>
  )
}

export default Buttons