const React = require('react');

module.exports = {
  View: (props) => React.createElement('View', props, props.children),
  Text: (props) => React.createElement('Text', props, props.children),
  Button: ({ onPress, title, testID }) =>
    React.createElement('Text', { onPress, testID }, title),
  TouchableOpacity: (props) =>
    React.createElement('Text', { onPress: props.onPress, testID: props.testID }, props.children),
  SafeAreaView: (props) => React.createElement('View', props, props.children),
  StyleSheet: {
    create: styles => styles,
    flatten: style => style,
  },
};
