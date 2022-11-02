import styled from 'styled-components'
import { colors } from '@mui/material'

export const ContainerWrapper = styled.div`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid ${colors.grey[500]};
  background: ${colors.common.white};
`

export const ChildrenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 8px;
`

export const Title = styled.div`
  margin-bottom: 8px;
  text-align: center;
  color: ${colors.grey[700]};
`
