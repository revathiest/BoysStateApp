import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getColors } from '../branding';

export default function ScheduleScreen({ branding = null }) {
  const colors = getColors(branding);
  return (
    <View
      style={[styles.container, { backgroundColor: colors.background }]}
      testID="schedule-screen"
    >
      <Text accessibilityRole="header">Schedule Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
});
