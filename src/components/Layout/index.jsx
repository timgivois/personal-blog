import React, { useState } from 'react'
import styled from 'styled-components'
import { GeistProvider, CssBaseline } from '@geist-ui/react'
import { Col, Row } from 'react-flexbox-grid'

import './layout.css'
import 'react-toggle/style.css'

export const BarWrapper = styled(Row)`
  box-shadow: ${({ theme }) =>
    theme === 'light'
      ? '0 -2px rgba(0,0,0,.25)'
      : '0 -2px rgba(255,255,255,.25)'};
  min-height: 70px;
  padding-top: 15px;
  margin-top: 15px;
`

const withStyle = Component => props => {
  const [theme, setTheme] = useState('dark')

  const switchTheme = theme => {
    setTheme(theme)
  }

  var d = new Date()

  return (
    <GeistProvider themeType={theme}>
      <CssBaseline />
      <style>
        @import
        url('https://fonts.googleapis.com/css?family=Maven+Pro&display=swap');
      </style>
      <Component {...props} switchTheme={switchTheme} theme={theme} />
      <footer>
        <BarWrapper type={theme} center="xs">
          <Col xs={2}>
            <Row>
              <small>&copy; {d.getFullYear()} timgivois</small>
            </Row>
          </Col>
          <Col xs={4}>
            <Row end="xs"></Row>
          </Col>
        </BarWrapper>
      </footer>
    </GeistProvider>
  )
}

export default withStyle
