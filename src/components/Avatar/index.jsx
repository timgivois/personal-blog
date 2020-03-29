import React from 'react'
import { Avatar } from '@zeit-ui/react'

import { Wrapper } from './style'

const PersonalAvatar = (props) => (
  <Wrapper>
    <Avatar
      {...props}
      />
  </Wrapper>
)

export default PersonalAvatar;
