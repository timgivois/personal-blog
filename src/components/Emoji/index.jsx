import React from 'react'

const Emoji = props => (
    <span
        className="emoji"
        role="img"
        aria-label={props.label ? props.label : ""}
        aria-hidden={props.label ? "false" : "true"}
        style={Object.assign({lineHeight: '.7'}, props.style)}
    >
        {props.symbol}
    </span>
);

Emoji.defaultProps = {
  style: {}
}
export default Emoji
