import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    if (email.trim() === '') {
      Alert.alert('Error', 'Please enter your email address.');
    } else {
      // Placeholder for backend API call
      Alert.alert(
        'Success',
        'A reset link has been sent to your email. Please check your inbox.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login' as never) }]
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1055/1055687.png' }}
        style={styles.logo}
      />

      {/* Title */}
      <Text style={styles.title}>Calendo</Text>
      <Text style={styles.subtitle}>Forgot Password</Text>

      {/* Description */}
      <Text style={styles.description}>
        Enter your email and we'll send you a link to reset your password.
      </Text>

      {/* Input Field */}
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#B3B3F5"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Reset Password Button */}
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>

      {/* Back to Login */}
      <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
        <Text style={styles.linkText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
    justifyContent: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#F0EFFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#7F57FF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#7F57FF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
