import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-flexbox-grid'
import { SocialIcon } from 'react-social-icons'

export const Wrapper = styled(Row)`
  min-height: auto;
  padding: 32px 16px 16px;
  row-gap: 32px;

  @media (min-width: 991px) {
    padding: 56px 40px 24px;
    column-gap: 48px;
  }
`

export const StyledSocialMediaIconsReact = (props) => {
  const Container = styled.div`
    display: flex;
    align-items: center;
  `

  return (
    <Container>
      <SocialIcon
        bgColor="transparent"
        fgColor="var(--geist-foreground)"
        style={{ opacity: 0.65 }}
        {...props}
      />
    </Container>
  )
}

export const Description = styled(Col)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: center;

  @media screen and (min-width: 768px) {
    text-align: left;
  }
`
