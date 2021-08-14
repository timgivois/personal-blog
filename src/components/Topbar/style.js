import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-flexbox-grid'
import { SocialMediaIconsReact } from 'social-media-icons-react'

export const BarWrapper = styled(Row)`
  box-shadow: ${({ type }) =>
    type === 'light' ? '0 2px rgba(0,0,0,.25)' : '0 2px rgba(255,255,255,.25)'};
  min-height: 70px;
  background-color: ${({ type }) => (type === 'light' ? 'white' : 'black')};
`

export const Wrapper = styled(Row)`
  min-height: 65%;

  @media (min-width: 991px) {
    padding: 20px 35px 0 35px;
  }

  @media (max-width: 991px) {
    padding: 20px 10px 0 10px;
  }
`

export const StyledSocialMediaIconsReact = props => {
  const Container = styled.div`
    padding: 0 5px;
  `

  return (
    <Container>
      <SocialMediaIconsReact {...props} />
    </Container>
  )
}

export const Description = styled(Col)`
  @media screen and (min-width: 600px) {
    border-left: 1px solid;
    padding-left: 45px;
  }
`
