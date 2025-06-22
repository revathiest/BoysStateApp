const React = require('react');

module.exports = {
  View: (props) => React.createElement('View', props, props.children),
  Text: (props) => React.createElement('Text', props, props.children),
  Button: ({ onPress, title, testID }) =>
    React.createElement('Text', { onPress, testID }, title),
  StyleSheet: {
    create: styles => styles,
    flatten: style => style,
  },
};
