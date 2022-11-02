import { Spinner } from 'components'
import { FC } from 'react'
import { Container } from '../Container'

const Spinners: FC = () => (
  <Container title="Спинер">
    <div style={{ background: 'red', width: 150, height: 150, padding: 10}}>
      <Spinner />
    </div>
    <div style={{ background: 'blue', width: 150, height: 150, padding: 10}}>
      <Spinner hasFone />
    </div>
  </Container>
)

export default Spinners