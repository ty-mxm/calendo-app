import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function UserProfileScreen() {
  const navigation = useNavigation(); // Ensure this is correctly imported and used

  const handleLogout = () => {
    // Add any logout logic here (e.g., clearing user session)
    navigation.navigate('Login' as never); // Navigate to Login screen
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
        <Text style={styles.headerSubtitle}>Manage your account settings</Text>
      </View>

      {/* Profile Picture and Info */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>johndoe@example.com</Text>
      </View>

      {/* Options */}
      <View style={styles.options}>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate('ChangePassword' as never)}
        >
          <Ionicons name="lock-closed-outline" size={20} color="#FFF" />
          <Text style={styles.optionText}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton}>
          <Ionicons name="person-outline" size={20} color="#FFF" />
          <Text style={styles.optionText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#FFF" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#7F57FF',
    paddingVertical: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFF',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E0E0E0',
    marginTop: 5,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#555',
  },
  options: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7F57FF',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6C6C',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 20,
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
});
