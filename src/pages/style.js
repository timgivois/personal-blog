import React from 'react'
import styled from 'styled-components'
import { Row } from 'react-flexbox-grid'
import { SocialMediaIconsReact } from 'social-media-icons-react'

export const Wrapper = styled(Row)`
  padding-top: 20px;
  min-height: 65%;
`

export const StyledSocialMediaIconsReact = (props) => {
  const Container = styled.div`
    padding: 0 5px;
  `

  return (
    <Container>
      <SocialMediaIconsReact {...props} />
    </Container>
  )
}
