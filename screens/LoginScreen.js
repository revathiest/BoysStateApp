import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const API_BASE = __DEV__
  ? 'http://192.168.1.171:3000'
  : 'https://boysstateappservices.up.railway.app';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

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
        setMessage('Logged in successfully!');
      } else {
        setMessage('Login failed');
      }
    } catch {
      setMessage('Login failed');
    }
  };

  return (
    <View style={styles.container} testID="login-screen">
      <Text accessibilityRole="header">Login Screen</Text>
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
      <TouchableOpacity
        onPress={handleLogin}
        style={styles.button}
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {!!message && (
        <Text testID="login-message" style={styles.message}>
          {message}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
    backgroundColor: '#f2f2f2',
  },
  input: {
    width: '90%',
    padding: 10,
    marginTop: 12,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#204080',
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  message: {
    marginTop: 12,
    fontSize: 16,
  },
});
