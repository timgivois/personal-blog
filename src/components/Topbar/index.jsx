import React from 'react'
import { Row, Col } from 'react-flexbox-grid'
import { Text, Link } from '@geist-ui/react'

import profileImg from '../../../static/tim-image.png'
import Avatar from '../Avatar'
import { Wrapper } from './style'
import paths from '../../utils/paths'
import './style.css'
import useStickyNavInMainPage from '../../hooks/useStickyNavInMainPage'

const Topbar = ({ switchTheme, isMainPage }) => {
  useStickyNavInMainPage(isMainPage)

  return (
    <>
      {isMainPage ? (
        <Wrapper middle="md" style={{ padding: '20px 0' }}>
          <Col xs={12}>
            <Row center="xs" middle="xs">
              <Col xs={12} md={2}>
                <Row center="xs">
                  <Link href={paths.CONTACT} pure>
                    <Avatar
                      src={profileImg}
                      className="avatar-small"
                      style={{ cursor: 'pointer' }}
                    />
                  </Link>
                </Row>
              </Col>
              <Col xs={12} md={10}>
                <Row center="xs" start="md">
                  <Text h3 style={{ margin: '10px 0 5px 0' }}>
                    Personal Blog
                  </Text>
                </Row>
              </Col>
            </Row>
          </Col>
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
