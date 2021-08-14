import React, { useState } from 'react'
import styled from 'styled-components'
import { CSSBaseline, ZEITUIProvider } from '@zeit-ui/react'
import { Col, Row } from 'react-flexbox-grid'

import './layout.css'
import 'react-toggle/style.css'

export const BarWrapper = styled(Row)`
  box-shadow: ${({ type }) =>
    type === 'light'
      ? '0 -2px rgba(0,0,0,.25)'
      : '0 -2px rgba(255,255,255,.25)'};
  min-height: 70px;
  padding-top: 15px;
  margin-top: 15px;
`

const withStyle = Component => props => {
  // const myTheme = {
  //   // palette: {
  //   //   background: '#FAFAFA',
  //   //   foreground: '#151617'
  //   // }
  // }
  const [type, setType] = useState('dark')

  const switchTheme = theme => {
    setType(theme)
  }

  var d = new Date()

  return (
    <ZEITUIProvider theme={Object.assign({ type })}>
      <CSSBaseline />
      <style>
        @import
        url('https://fonts.googleapis.com/css?family=Maven+Pro&display=swap');
      </style>
      <Component {...props} switchTheme={switchTheme} />
      <footer>
        <BarWrapper type={type} center="xs">
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
    </ZEITUIProvider>
  )
}

export default withStyle
