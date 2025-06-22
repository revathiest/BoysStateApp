import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function NavigationBar({ navigate }) {
  return (
    <View style={styles.nav} testID="nav-bar">
      <Button title="Home" onPress={() => navigate('Home')} />
      <Button title="Login" onPress={() => navigate('Login')} />
      <Button title="Schedule" onPress={() => navigate('Schedule')} />
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
});
