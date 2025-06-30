import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Platform, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const COLORS = {
  primary: '#204080',
  secondary: '#1A6BC6',
  accent: '#FFD166',
  text: '#fff',
  white: '#fff',
  transparent: 'rgba(255,255,255,0.08)',
};

export default function HomeScreen() {
  const [loggedIn, setLoggedIn] = useState(false);

  // Handlers
  const handleLogin = () => setLoggedIn(true);
  const handleLogout = () => setLoggedIn(false);
  const handleSchedule = () => alert('Show schedule! (demo)');

  return (
    <LinearGradient
      colors={[COLORS.primary, COLORS.secondary]}
      start={{ x: 0.2, y: 0.2 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      {/* Header */}
      <View style={styles.headerOuter}>
        <View style={styles.headerInner}>
          {!loggedIn ? (
            <HeaderButton label="Login" onPress={handleLogin} />
          ) : (
            <>
              <HeaderButton label="Schedule" onPress={handleSchedule} />
              <HeaderButton label="Logout" onPress={handleLogout} />
            </>
          )}
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.flexGrow}>
        <View style={styles.container}>
          <Image
            source={require('../assets/Boys State App Blue on Transparent.png')}
            style={styles.logo}
            resizeMode="contain"
            accessible
            accessibilityLabel="Boys State App Logo"
          />
          <Text style={styles.title}>Welcome to Boys State!</Text>
          <Text style={styles.subtitle}>
            {loggedIn
              ? "Check your schedule, explore resources, and make the most of your Boys State experience."
              : "Log in to get started! You'll see your schedule and updates once you're signed in."}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}

function HeaderButton({ label, onPress }) {
  return (
    <TouchableOpacity style={styles.headerButton} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.headerButtonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  // Header is OUTSIDE main content, padded for notch/safe area
  headerOuter: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 32 : 48,
    paddingBottom: 0,
    paddingHorizontal: 18,
    width: '100%',
    backgroundColor: 'rgba(32, 64, 128, 0.09)', // slight glass effect
  },
  headerInner: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    minHeight: 54,
  },
  headerButton: {
    marginLeft: 12,
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
  },
  headerButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.2,
    textShadowColor: 'rgba(0,0,0,0.10)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  // Main content fills available space below header, centers card
  flexGrow: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    width: width - 40,
    backgroundColor: COLORS.transparent,
    borderRadius: 22,
    padding: 32,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 7 },
    elevation: 8,
  },
  logo: {
    width: 220,
    height: 110,
    marginBottom: 28,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 14,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.18)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.white,
    opacity: 0.97,
    textAlign: 'center',
  },
});
