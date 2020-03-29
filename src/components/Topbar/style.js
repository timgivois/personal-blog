import styled from 'styled-components'
import { Row } from 'react-flexbox-grid'

export const Wrapper = styled(Row)`
  box-shadow: ${({ type }) => type === 'light' ? '0 2px rgba(0,0,0,.25)' : '0 2px rgba(255,255,255,.25)'};
  min-height: 70px;
`
