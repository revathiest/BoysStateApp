import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getColors, getAssets } from '../branding';
import { lighten } from '../utils/colors';
import Button from '../components/Button';

const { width } = Dimensions.get('window');

const API_BASE = __DEV__
  ? 'http://192.168.1.171:3000'
  : 'https://boysstateappservices.up.railway.app';

export default function LoginScreen({ onLoginSuccess, onCancel, branding = null }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const colors = getColors(branding);
  const { logo } = getAssets(branding);

  const handleLogin = async () => {
    setMessage('');
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.token) {
        const token = data.token;
        const programsRes = await fetch(`${API_BASE}/user-programs/${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const programsData = await programsRes.json();
        const firstProgram = programsData.programs?.[0];
        let brandData = null;
        if (firstProgram) {
          const brandRes = await fetch(
            `${API_BASE}/api/branding-contact/${firstProgram.programId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          brandData = await brandRes.json();
        }
        onLoginSuccess &&
          onLoginSuccess({ token, program: firstProgram, branding: brandData });
        setMessage('Logged in successfully!');
      } else {
        setMessage('Login failed');
      }
    } catch {
      setMessage('Login failed');
    }
  };

  return (
    <LinearGradient
      colors={[colors.primary, lighten(colors.primary, 45)]}
      start={{ x: 0.2, y: 0.2 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.flexGrow}>
        <View
          style={[styles.container, { backgroundColor: colors.transparent }]}
          testID="login-screen"
        >
          <Image
            source={logo}
            style={styles.logo}
            resizeMode="contain"
            accessible
            accessibilityLabel="Boys State App Logo"
          />
          <Text accessibilityRole="header" style={[styles.title, { color: colors.white }]}> 
            Login Screen
          </Text>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
            <Button
              title="Login"
              onPress={handleLogin}
            />
            <Button
              title="Cancel"
              onPress={() => onCancel && onCancel()}
            />
          {!!message && (
            <Text testID="login-message" style={styles.message}>
              {message}
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
    width: 200,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    width: '90%',
    padding: 10,
    marginTop: 12,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  message: {
    marginTop: 12,
    fontSize: 16,
  },
});
