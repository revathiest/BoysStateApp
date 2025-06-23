import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function NavButton({ title, onPress }) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

export default function NavigationBar({ navigate }) {
  return (
    <View style={styles.nav} testID="nav-bar">
      <NavButton title="Home" onPress={() => navigate('Home')} />
      <NavButton title="Login" onPress={() => navigate('Login')} />
      <NavButton title="Schedule" onPress={() => navigate('Schedule')} />
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#eee',
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
