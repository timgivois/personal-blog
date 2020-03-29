import React from 'react'
import { Link } from '@zeit-ui/react'

import paths from '../../utils/paths'
import LogoImage from '../../../static/tim.png'

const Logo = () => {
  return (
    <Link to={paths.ROOT} pure>
        <img alt='tim givois' src={LogoImage} style={{ height: '30px'}} />
    </Link>

  )
}

export default Logo
