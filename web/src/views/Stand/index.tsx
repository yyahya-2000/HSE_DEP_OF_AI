import { FC, Fragment } from 'react'
import { MoreButton, Search } from 'components'

const Stand: FC = () => {
  const handleMoreClick = () => { console.log('Подробнее') }

  const handleFindeClick = (value: string) => { console.log('Ищем: ', value) }

  return (
    <Fragment>
      <MoreButton onClick={handleMoreClick}/>
      <Search onFind={handleFindeClick} clear />
    </Fragment>
    
  )
}

export default Stand