import React from 'react'
import { Col } from 'react-flexbox-grid'
import Toggle from 'react-toggle'
import { useTheme } from '@zeit-ui/react'

import Logo from '../Logo'
import Emoji from '../Emoji'
import { Wrapper } from './style'

const Topbar = ({ switchTheme }) => {
  const theme = useTheme();
  return (
    <Wrapper theme={theme} between='xs' middle='xs' center='xs'>
      <Col xs={3}>
        <Logo />
      </Col>
      <Col xs={3}>
        <Toggle
          className='change-mode'
          icons={{
            checked: <Emoji style={{ marginLeft: '-3px' }} symbol='🌙' />,
            unchecked: <Emoji style={{ marginLeft: '-3px' }} symbol='☀️' />,
          }}
          onChange={e => {
            const nextTheme = e.target.checked ? 'dark' : 'light'
            switchTheme(nextTheme)
          }}
        />
      </Col>
    </Wrapper>
  )
}

export default Topbar
