const React = require('react');

module.exports = {
  View: (props) => React.createElement('View', props, props.children),
  Text: (props) => React.createElement('Text', props, props.children),
  StyleSheet: {
    create: styles => styles,
  },
};
