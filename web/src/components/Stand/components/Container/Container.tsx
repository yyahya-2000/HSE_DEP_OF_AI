import { FC } from 'react'
import { ChildrenWrapper, ContainerWrapper, Title } from './Container.styles'
import { ContainerProps } from './Container.types'

const Container: FC<ContainerProps> = ({ title, children}) => (
  <ContainerWrapper>
    <Title>{title}</Title>
    <ChildrenWrapper>
      {children}
    </ChildrenWrapper>
  </ContainerWrapper> 
)

export default Container