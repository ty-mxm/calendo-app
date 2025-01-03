import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1055/1055687.png' }}
        style={styles.logo}
      />

      {/* Title */}
      <Text style={styles.title}>Calendo</Text>
      <Text style={styles.subtitle}>Connexion</Text>

      {/* Sign Up Text */}
      <Text style={styles.registerText}>
        Si vous n'avez pas de compte{' '}
        <Text
          style={styles.linkText}
          onPress={() => navigation.navigate('SignUp' as never)}
        >
          inscrivez-vous ici !
        </Text>
      </Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Entrez votre e-mail"
        placeholderTextColor="#B3B3F5"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        placeholderTextColor="#B3B3F5"
        secureTextEntry
      />

      {/* Forgot Password */}
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword' as never)}>
        <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('GetStarted' as never)} // Navigate to GetStarted
      >
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>

      {/* Or continue with */}
      <Text style={styles.orText}>ou continuez avec</Text>
      <View style={styles.socialIcons}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/831/831276.png' }} // Apple Icon
          style={styles.icon}
        />
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/281/281764.png' }} // Google Icon
          style={styles.icon}
        />
      </View>
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
  registerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  linkText: {
    color: '#7F57FF',
    fontWeight: 'bold',
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
  forgotPassword: {
    textAlign: 'right',
    color: '#AAA',
    marginBottom: 20,
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
  orText: {
    textAlign: 'center',
    color: '#AAA',
    marginBottom: 10,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
});