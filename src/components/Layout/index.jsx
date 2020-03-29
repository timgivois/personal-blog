import React, { useState } from 'react'
import { CSSBaseline, ZEITUIProvider } from '@zeit-ui/react'

import './layout.css'
import 'react-toggle/style.css'

const withStyle = (Component) => (props) => {
  const [type, setType] = useState('light')

  const switchTheme = (theme) => {
    setType(theme)
  }
  return (
    <ZEITUIProvider theme={{ type }}>
        <CSSBaseline />
        <style>
            @import url('https://fonts.googleapis.com/css?family=Maven+Pro&display=swap');
        </style>
        <Component {...props} switchTheme={switchTheme} />
    </ZEITUIProvider>
    )
}

export default withStyle
