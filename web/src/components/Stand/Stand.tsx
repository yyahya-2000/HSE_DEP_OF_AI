import { FC, Fragment } from 'react'
import { ContainerWrapper, Title } from './Stand.styles'
import Buttons from './components/Buttons'
import Spinners from './components/Spinners'
import SearchStand from './components/Search'
import { Switch, Checkbox } from 'components'

const Stand: FC = () => (
  <Fragment>
    <Title>Стенд компонентов системы</Title>
    <ContainerWrapper>
      <Buttons />
      <Spinners />
      <SearchStand />
      <Switch />
      <div>
        <Checkbox label='Lable'/>
      </div>
    </ContainerWrapper>
  </Fragment>
)

export default Stand