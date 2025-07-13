import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { getContrastTextColor } from '../utils/colors';

// Universal button that uses secondary color from props or fallback
export default function Button({
  title,
  onPress,
  style,
  color, // pass the secondary color here!
  ...rest
}) {
  const backgroundColor = color || '#1A6BC6'; // fallback if color missing
  const textColor = getContrastTextColor(backgroundColor);

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }, style]}
      onPress={onPress}
      activeOpacity={0.7}
      {...rest}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
    borderWidth: 1,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.2,
  },
});
