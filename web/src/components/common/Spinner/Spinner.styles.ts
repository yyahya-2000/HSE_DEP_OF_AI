import styled from 'styled-components'
import { colors } from '@mui/material'
import { SpinnerProps } from './Spinner.types'

export const SpinnerWrapper = styled.div<SpinnerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: ${({ hasFone }) => (hasFone ? colors.common.white : 'none')};
`
