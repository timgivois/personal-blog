import React from 'react'

const UNIT = 4

const Space = ({ margins, children, fullWidth }) => {
  return (
    <div
      style={{
        margin: margins.map((margin) => `${margin * UNIT}px`).join(' '),
        width: fullWidth ? '100%' : 'inherit',
      }}
    >
      {children}
    </div>
  )
}

export default Space
