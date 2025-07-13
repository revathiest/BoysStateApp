import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getColors, DEFAULT_ASSETS, isValidUrl } from '../branding';
import { lighten, getContrastTextColor } from '../utils/colors';
import useCachedImage from '../utils/useCachedImage';
import Button from '../components/Button';

const { width } = Dimensions.get('window');

export default function HomeScreen({
  loggedIn = false,
  program = null,
  branding = null,
  onPressLogin,
  onLogout,
  onSchedule,
}) {
  const colors = getColors(branding);
  const defaultLogo = DEFAULT_ASSETS.logo;
  const remoteUrl = isValidUrl(branding?.logoUrl) ? branding.logoUrl : null;
  const cachedLogo = useCachedImage(remoteUrl);
  const logo = remoteUrl ? cachedLogo || defaultLogo : defaultLogo;

  const handleLoginPress = () => {
    onPressLogin && onPressLogin();
  };

  const handleLogoutPress = () => {
    onLogout && onLogout();
  };

  const handleSchedulePress = () => {
    onSchedule && onSchedule();
  };

  return (
    <LinearGradient
      colors={[colors.primary, lighten(colors.primary, 45)]}
      start={{ x: 0.2, y: 0.2 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <View
        style={[
          styles.headerOuter,
          { backgroundColor: 'rgba(32, 64, 128, 0.09)' },
        ]}
      >
        <View style={styles.headerInner}>
          {!loggedIn ? (
            <Button title="Login" color={colors.secondary} onPress={handleLoginPress} />
          ) : (
            <>
              <Button title="Schedule" color={colors.secondary} onPress={handleSchedulePress} />
              <Button title="Logout" color={colors.secondary} onPress={handleLogoutPress} />
            </>
          )}
        </View>
      </View>

      <View style={styles.flexGrow}>
        <View style={[styles.container, { backgroundColor: colors.transparent }]}> 
          <Image
            source={logo}
            style={styles.logo}
            resizeMode="contain"
            accessible
            accessibilityLabel="Boys State App Logo"
          />
          <Text style={[styles.title, { color: colors.white }]} testID="program-name">
            {program ? `Welcome to ${program.programName}!` : 'Welcome to Boys State!'}
          </Text>
          <Text style={[styles.subtitle, { color: colors.white }] }>
            {loggedIn
              ? 'Check your schedule, explore resources, and make the most of your experience.'
              : "Log in to get started! You'll see your schedule and updates once you're signed in."}
          </Text>
          {program && (
            <Text style={[styles.program, { color: colors.white }]} testID="assigned-program">
              {`Program ID: ${program.programId}`}
            </Text>
          )}
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  headerOuter: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 32 : 48,
    paddingBottom: 0,
    paddingHorizontal: 18,
    width: '100%',
  },
  headerInner: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    minHeight: 54,
  },
  flexGrow: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    width: width - 40,
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
    marginBottom: 14,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.18)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  subtitle: {
    fontSize: 18,
    opacity: 0.97,
    textAlign: 'center',
  },
  program: {
    fontSize: 16,
    marginTop: 6,
    textAlign: 'center',
  },
});
