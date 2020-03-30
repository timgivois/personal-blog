import React, { useState } from 'react'
import { CSSBaseline, ZEITUIProvider, useTheme } from '@zeit-ui/react'

import './layout.css'
import 'react-toggle/style.css'

const withStyle = (Component) => (props) => {
  const myTheme = {

  }
  const [type, setType] = useState('light')

  const switchTheme = (theme) => {
    setType(theme)
  }

  console.log(useTheme())
  return (
    <ZEITUIProvider theme={Object.assign({ type }, myTheme)}>
        <CSSBaseline />
        <style>
            @import url('https://fonts.googleapis.com/css?family=Maven+Pro&display=swap');
        </style>
        <Component {...props} switchTheme={switchTheme} />
    </ZEITUIProvider>
    )
}

export default withStyle
