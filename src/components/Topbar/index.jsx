import React from 'react'
import { Row, Col } from 'react-flexbox-grid'
import { Text, Link } from '@geist-ui/react'

import profileImg from '../../../static/tim-image.png'
import Avatar from '../Avatar'
import { Wrapper, StyledSocialMediaIconsReact, Description } from './style'
import paths from '../../utils/paths'
import './style.css'
import useStickyNavInMainPage from '../../hooks/useStickyNavInMainPage'

const Topbar = ({ switchTheme, isMainPage }) => {
  useStickyNavInMainPage(isMainPage)

  return (
    <>
      {isMainPage ? (
        <Wrapper middle="md">
          <Col xs={12} lg={3}>
            <Row center="xs">
              <Avatar src={profileImg} />
            </Row>
            <Row center="xs" align="center">
              <Text>Tim Givois – Software Engineer</Text>
            </Row>
            <Row center="xs" align="center">
              <StyledSocialMediaIconsReact
                borderColor="rgba(0,0,0,0.25)"
                borderWidth="0"
                borderStyle="solid"
                icon="twitter"
                iconColor="rgba(255,255,255,1)"
                backgroundColor="rgba(28,186,223,1)"
                iconSize="4"
                roundness="50%"
                url="https://twitter.com/timgivois"
                size="25"
              />
              •
              <StyledSocialMediaIconsReact
                borderColor="rgba(0,0,0,0.25)"
                borderWidth="0"
                borderStyle="solid"
                icon="github"
                iconColor="rgba(255,255,255,1)"
                backgroundColor="rgba(0,0,0,1)"
                iconSize="4"
                roundness="50%"
                url="https://github.com/timgivois"
                size="25"
              />
              •
              <StyledSocialMediaIconsReact
                borderColor="rgba(0,0,0,0.25)"
                borderWidth="0"
                borderStyle="solid"
                icon="linkedin"
                iconColor="rgba(255,255,255,1)"
                backgroundColor="#0e76a8"
                iconSize="4"
                roundness="50%"
                url="https://linkedin.com/in/timgivois"
                size="25"
              />
            </Row>
          </Col>
          <Description
            center="xs"
            start="md"
            xs={10}
            xsOffset={1}
            md={9}
            mdOffset={0}
          >
            <Row center="xs" start="lg">
              <Text h2>Hey! Welcome to my blog.</Text>
            </Row>
            <Row center="xs">
              <Text>
                <Link href={paths.ROOT} pure underline>
                  About
                </Link>{' '}
                |{' '}
                <Link href={paths.CONTACT} pure underline>
                  Contact
                </Link>
              </Text>
            </Row>
          </Description>
        </Wrapper>
      ) : null}
    </>
  )
}

Topbar.defaultProps = {
  isMainPage: false,
  switchTheme: () => {},
}
export default Topbar
