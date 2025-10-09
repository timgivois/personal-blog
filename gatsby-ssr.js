const React = require("react");
const { CssBaseline } = require("@geist-ui/react");

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([CssBaseline.flush()]);
};
