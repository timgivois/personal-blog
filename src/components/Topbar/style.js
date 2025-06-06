import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-flexbox-grid'
import { SocialIcon } from 'react-social-icons'

export const Wrapper = styled(Row)`
  min-height: 65%;

  @media (min-width: 991px) {
    padding: 20px 35px 0 35px;
  }

  @media (max-width: 991px) {
    padding: 20px 10px 0 10px;
  }
`

export const StyledSocialMediaIconsReact = (props) => {
  const Container = styled.div`
    padding: 0 5px;
  `

  return (
    <Container>
      <SocialIcon {...props} />
    </Container>
  )
}

export const Description = styled(Col)`
  @media screen and (min-width: 600px) {
    border-left: 1px solid;
    padding-left: 45px;
  }
`
