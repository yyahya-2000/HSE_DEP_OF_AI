import { FC } from 'react'
import { Search } from 'components'
import { Container } from '../Container'

const SearchStand: FC = () => {

  const handleFindeClick = (value: string) => { console.log('Ищем: ', value) }

  return (
    <Container title="Поиск">
      <Search onFind={handleFindeClick} clear />
      <Search onFind={handleFindeClick} />
    </Container>
  )
}

export default SearchStand