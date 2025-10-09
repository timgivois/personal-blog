import React from 'react'
import { Col } from 'react-flexbox-grid'
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
        <Wrapper middle="md" center="xs">
          <Col xs={12} lg={4}>
            <div className="topbar__profile">
              <Avatar src={profileImg} />
              <div className="topbar__profile-text">
                <Text h2 style={{ margin: 0 }}>
                  Tim Givois
                </Text>
                <Text type="secondary" small>
                  Software engineer focused on shipping thoughtful web
                  experiences.
                </Text>
              </div>
              <div className="topbar__socials">
                <StyledSocialMediaIconsReact
                  url="https://twitter.com/timgivois"
                  network="twitter"
                  size="26"
                />
                <StyledSocialMediaIconsReact
                  url="https://github.com/timgivois"
                  network="github"
                  size="26"
                />
                <StyledSocialMediaIconsReact
                  url="https://linkedin.com/in/timgivois"
                  network="linkedin"
                  size="26"
                />
              </div>
            </div>
          </Col>
          <Description xs={12} lg={8}>
            <Text h3 style={{ margin: 0 }}>
              Sharing notes on building resilient platforms, useful tools, and
              the lessons learned along the way.
            </Text>
            <div className="topbar__links">
              <Link href={paths.ROOT} pure underline>
                About
              </Link>
              <span aria-hidden="true">/</span>
              <Link href={paths.CONTACT} pure underline>
                Contact
              </Link>
            </div>
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
